import Anthropic from "@anthropic-ai/sdk";
import { anthropic, MODEL, ADAPTIVE_THINKING } from "../lib/anthropic";
import { getCampaignPerformance, readCampaignFile, writeCampaignNote } from "../tools/campaigns";

const SYSTEM = `You are the Campaign Manager agent for Drew Nicoll Real Estate. DRE#01784460.

You manage the 5 active Facebook ad campaigns targeting distressed property sellers in Mendocino and Sonoma County:
- Ad Set 1: Tax Lien
- Ad Set 2: City Violations
- Ad Set 3: Inherited Property
- Ad Set 4: Too Many Repairs
- Ad Set 5: General / Catch-All

Your job:
- Pull and analyze Meta Ads performance data
- Score ad sets by CPL, CTR, lead quality
- Recommend what to scale, test, or kill
- Write optimized ad copy when asked
- Always comply: DRE#01784460 in all ads, no price guarantees, "subject to inspection and verification"

Be concise. Use data. Give clear recommendations.`;

const tools: Anthropic.Tool[] = [
  {
    name: "get_campaign_performance",
    description: "Pull 7-day performance data from Meta Ads API for all ad sets",
    input_schema: {
      type: "object",
      properties: {
        days: { type: "number", description: "Number of days to look back (default 7)" },
      },
      required: [],
    },
  },
  {
    name: "read_campaign_file",
    description: "Read a campaign file",
    input_schema: {
      type: "object",
      properties: {
        filename: { type: "string" },
      },
      required: ["filename"],
    },
  },
  {
    name: "write_campaign_note",
    description: "Save optimization notes or new ad copy to a file",
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

async function executeTool(name: string, input: Record<string, string | number>): Promise<string> {
  switch (name) {
    case "get_campaign_performance":
      return getCampaignPerformance(Number(input.days) || 7);
    case "read_campaign_file":
      return readCampaignFile(String(input.filename));
    case "write_campaign_note":
      return writeCampaignNote(String(input.filename), String(input.content));
    default:
      return `Unknown tool: ${name}`;
  }
}

export async function runCampaignManager(userMessage: string): Promise<string> {
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
      const result = await executeTool(tool.name, tool.input as Record<string, string | number>);
      results.push({ type: "tool_result", tool_use_id: tool.id, content: result });
    }
    messages.push({ role: "user", content: results });
  }

  return output.trim() || "Done.";
}
