import type { KnownBlock } from "@slack/types";

// Chunks long text into Slack message blocks (max 3000 chars per block)
export function toSlackBlocks(text: string): KnownBlock[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push(remaining.slice(0, 3000));
    remaining = remaining.slice(3000);
  }
  return chunks.map((chunk): KnownBlock => ({
    type: "section",
    text: { type: "mrkdwn", text: chunk },
  }));
}

export function agentHeader(name: string, emoji: string): KnownBlock {
  return {
    type: "header",
    text: { type: "plain_text", text: `${emoji} ${name}`, emoji: true },
  };
}

export function divider(): KnownBlock {
  return { type: "divider" };
}
