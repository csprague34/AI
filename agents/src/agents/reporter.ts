import Anthropic from "@anthropic-ai/sdk";
import { anthropic, MODEL, ADAPTIVE_THINKING } from "../lib/anthropic";
import { getAllLeadsStats, getRecentLeads } from "../tools/leads";
import { getCampaignPerformance } from "../tools/campaigns";
import fs from "fs";
import path from "path";

const SYSTEM = `You are the Reporter agent for Drew Nicoll Real Estate. DRE#01784460.

Every Monday you produce a weekly performance report covering:
1. New leads (count, breakdown by issue type, quality notes)
2. Facebook campaign performance (CPL by angle, spend, top performer)
3. Garage sale sniper activity (contacts made, warm leads)
4. Recommendations for the coming week

Format reports clearly with sections, bullet points, and key numbers bolded.
Save reports to Clients/DrewNicoll/leads/ with date in filename.`;

const tools: Anthropic.Tool[] = [
  {
    name: "get_lead_stats",
    description: "Get all-time and recent lead statistics from Supabase",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_recent_leads",
    description: "Get leads from the last N hours",
    input_schema: {
      type: "object",
      properties: {
        hours: { type: "number", description: "Hours to look back (168 = 1 week)" },
      },
      required: ["hours"],
    },
  },
  {
    name: "get_campaign_performance",
    description: "Get Facebook ad performance for last N days",
    input_schema: {
      type: "object",
      properties: {
        days: { type: "number" },
      },
      required: [],
    },
  },
  {
    name: "save_report",
    description: "Save the weekly report to the leads folder",
    input_schema: {
      type: "object",
      properties: {
        content: { type: "string" },
      },
      required: ["content"],
    },
  },
];

function saveReport(content: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const p = path.join(
    __dirname,
    `../../../../Clients/DrewNicoll/leads/weekly-report-${date}.md`
  );
  fs.writeFileSync(p, content, "utf-8");
  return `Report saved to weekly-report-${date}.md`;
}

export async function runReporter(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let output = "";

  while (true) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 6000,
      thinking: ADAPTIVE_THINKING,
      system: SYSTEM,
      tools,
      messages,
    });

    const toolUses = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
    );
    const texts = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    if (texts) output += texts + "\n";

    if (response.stop_reason === "end_turn" || toolUses.length === 0) break;

    messages.push({ role: "assistant", content: response.content });

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const tool of toolUses) {
      const input = tool.input as Record<string, number | string>;
      let result = "";
      switch (tool.name) {
        case "get_lead_stats":
          result = await getAllLeadsStats();
          break;
        case "get_recent_leads":
          result = await getRecentLeads(Number(input.hours) || 168);
          break;
        case "get_campaign_performance":
          result = await getCampaignPerformance(Number(input.days) || 7);
          break;
        case "save_report":
          result = saveReport(String(input.content));
          break;
        default:
          result = `Unknown tool: ${tool.name}`;
      }
      results.push({ type: "tool_result", tool_use_id: tool.id, content: result });
    }
    messages.push({ role: "user", content: results });
  }

  return output.trim() || "Done.";
}
