import { getRecentLeads, getAllLeadsStats } from "../tools/leads";

// Lead monitor is purpose-built — no LLM needed for the core check
// Just pulls fresh leads and formats them for Slack

export async function runLeadMonitor(userMessage: string): Promise<string> {
  const lower = userMessage.toLowerCase();

  if (lower.includes("stat") || lower.includes("total") || lower.includes("breakdown")) {
    const stats = await getAllLeadsStats();
    return `*Lead Stats — All Time*\n\n${stats}`;
  }

  // Default: last 24 hours
  const hoursMatch = lower.match(/last\s+(\d+)\s+hour/);
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 24;

  const leads = await getRecentLeads(hours);
  return `*New Leads — Last ${hours} Hours*\n\n${leads}`;
}

// Called by the 30-minute cron monitor — posts proactively if new leads exist
export async function checkAndAlertLeads(): Promise<string | null> {
  const leads = await getRecentLeads(0.5); // last 30 min
  if (leads.startsWith("No leads")) return null;
  return `🔔 *New Lead Alert*\n\n${leads}`;
}
