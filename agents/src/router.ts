import { runSC } from "./agents/sc";
import { runCampaignManager } from "./agents/campaign-manager";
import { runLeadMonitor } from "./agents/lead-monitor";
import { runSniper } from "./agents/sniper";
import { runReporter } from "./agents/reporter";

export type AgentName = "sc" | "campaign" | "leads" | "sniper" | "reporter";

const AGENT_KEYWORDS: { agent: AgentName; keywords: string[] }[] = [
  { agent: "campaign", keywords: ["@campaign", "facebook", "meta ads", "ad set", "cpl", "ctr", "ad copy", "campaign manager"] },
  { agent: "leads", keywords: ["@leads", "lead monitor", "new leads", "lead stats", "check leads"] },
  { agent: "sniper", keywords: ["@sniper", "garage sale", "estate sale", "sniper log", "call script"] },
  { agent: "reporter", keywords: ["@reporter", "weekly report", "generate report", "performance report"] },
  // SC is the catch-all — always last
  { agent: "sc", keywords: ["@sc", "strategy", "strategize", "advise", "recommend", "plan", "analyze"] },
];

export function detectAgent(text: string): AgentName {
  const lower = text.toLowerCase();
  for (const { agent, keywords } of AGENT_KEYWORDS) {
    if (keywords.some((k) => lower.includes(k))) return agent;
  }
  return "sc"; // default
}

export const AGENT_META: Record<AgentName, { label: string; emoji: string }> = {
  sc:       { label: "SC — Strategic Consultant", emoji: "🧠" },
  campaign: { label: "Campaign Manager",          emoji: "📊" },
  leads:    { label: "Lead Monitor",              emoji: "🔔" },
  sniper:   { label: "Garage Sale Sniper",        emoji: "🎯" },
  reporter: { label: "Reporter",                  emoji: "📋" },
};

export async function runAgent(agent: AgentName, message: string): Promise<string> {
  switch (agent) {
    case "sc":       return runSC(message);
    case "campaign": return runCampaignManager(message);
    case "leads":    return runLeadMonitor(message);
    case "sniper":   return runSniper(message);
    case "reporter": return runReporter(message);
  }
}
