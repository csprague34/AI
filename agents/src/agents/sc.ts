import Anthropic from "@anthropic-ai/sdk";
import { anthropic, MODEL, ADAPTIVE_THINKING } from "../lib/anthropic";
import { readCampaignFile, writeCampaignNote } from "../tools/campaigns";
import { getAllLeadsStats } from "../tools/leads";

const SYSTEM = `You are SC (Strategic Consultant) for Drew Nicoll Real Estate in Mendocino and Sonoma County, California. DRE#01784460.

You have deep expertise in:
- Distressed property acquisition (tax liens, violations, probate, inherited, deferred repairs)
- Facebook/Meta advertising strategy for real estate
- Off-market lead generation (garage sale sniper, estate sales)
- Campaign analysis and optimization

You have access to campaign files, lead stats, and can write strategy documents.
Be direct, specific, and actionable. No fluff. Think like a growth operator, not a consultant.`;

const tools: Anthropic.Tool[] = [
  {
    name: "read_campaign_file",
    description: "Read a campaign or strategy file from the Clients/DrewNicoll/campaigns directory",
    input_schema: {
      type: "object",
      properties: {
        filename: { type: "string", description: "Filename to read (e.g. distressed-property-campaign.md)" },
      },
      required: ["filename"],
    },
  },
  {
    name: "get_lead_stats",
    description: "Get total lead count and breakdown by issue type from Supabase",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "write_strategy_doc",
    description: "Write a strategy document to the campaigns folder",
    input_schema: {
      type: "object",
      properties: {
        filename: { type: "string" },
        content: { type: "string" },
      },
      required: ["filename", "content"],
    },
  },
];

async function executeTool(name: string, input: Record<string, string>): Promise<string> {
  switch (name) {
    case "read_campaign_file":
      return readCampaignFile(input.filename);
    case "get_lead_stats":
      return getAllLeadsStats();
    case "write_strategy_doc":
      return writeCampaignNote(input.filename, input.content);
    default:
      return `Unknown tool: ${name}`;
  }
}

export async function runSC(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let output = "";

  while (true) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
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
      const result = await executeTool(tool.name, tool.input as Record<string, string>);
      results.push({ type: "tool_result", tool_use_id: tool.id, content: result });
    }
    messages.push({ role: "user", content: results });
  }

  return output.trim() || "Done.";
}
