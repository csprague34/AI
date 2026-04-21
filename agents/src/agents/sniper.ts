import Anthropic from "@anthropic-ai/sdk";
import { anthropic, MODEL } from "../lib/anthropic";
import { logSniperContact } from "../tools/leads";
import fs from "fs";
import path from "path";

const SYSTEM = `You are the Garage Sale Sniper agent for Drew Nicoll Real Estate. DRE#01784460.

Your job: help identify and reach out to homeowners at estate sales and garage sales in Mendocino and Sonoma County who might be open to selling their property.

Data sources to monitor:
- EstateSales.net — search Mendocino County, Sonoma County
- Craigslist garage/estate sales section
- Facebook Marketplace garage sales

Call scripts are in the sniper strategy file. Use them.

When logging contacts, be precise: address, sale type, result, follow-up date.
Remind Drew/Christopher to follow up on warm leads.`;

const tools: Anthropic.Tool[] = [
  {
    name: "read_sniper_log",
    description: "Read the current garage sale sniper contact log",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "log_contact",
    description: "Log a new contact attempt in the sniper log",
    input_schema: {
      type: "object",
      properties: {
        date: { type: "string", description: "YYYY-MM-DD" },
        address: { type: "string" },
        saleType: { type: "string", enum: ["Estate", "Garage"] },
        contact: { type: "string", description: "Phone or email" },
        result: { type: "string", description: "Interested / Not Now / No / VM" },
        notes: { type: "string" },
      },
      required: ["date", "address", "saleType", "contact", "result", "notes"],
    },
  },
  {
    name: "read_strategy",
    description: "Read the garage sale sniper strategy document including call scripts",
    input_schema: { type: "object", properties: {}, required: [] },
  },
];

function readSniperLog(): string {
  const p = path.join(__dirname, "../../../../Clients/DrewNicoll/leads/garage-sale-sniper-log.md");
  try { return fs.readFileSync(p, "utf-8"); } catch { return "Log not found."; }
}

function readStrategy(): string {
  const p = path.join(__dirname, "../../../../Clients/DrewNicoll/campaigns/garage-sale-sniper-strategy.md");
  try { return fs.readFileSync(p, "utf-8"); } catch { return "Strategy file not found."; }
}

export async function runSniper(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let output = "";

  while (true) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 3000,
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
      const input = tool.input as Record<string, string>;
      let result = "";
      switch (tool.name) {
        case "read_sniper_log":
          result = readSniperLog();
          break;
        case "log_contact":
          result = logSniperContact(input as Parameters<typeof logSniperContact>[0]);
          break;
        case "read_strategy":
          result = readStrategy();
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
