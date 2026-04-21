import { supabase } from "../lib/supabase";
import fs from "fs";
import path from "path";

export async function getRecentLeads(hours = 24): Promise<string> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("distressed_leads")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (error) return `Error fetching leads: ${error.message}`;
  if (!data || data.length === 0) return `No leads in the last ${hours} hours.`;

  return data
    .map(
      (l) =>
        `• ${l.full_name} | ${l.phone} | ${l.property_address} | Issue: ${l.primary_issue} | ${new Date(l.created_at).toLocaleString()}`
    )
    .join("\n");
}

export async function getAllLeadsStats(): Promise<string> {
  const { data, error } = await supabase
    .from("distressed_leads")
    .select("primary_issue, created_at");

  if (error) return `Error: ${error.message}`;
  if (!data || data.length === 0) return "No leads yet.";

  const byIssue: Record<string, number> = {};
  for (const l of data) {
    byIssue[l.primary_issue] = (byIssue[l.primary_issue] || 0) + 1;
  }

  const lines = Object.entries(byIssue)
    .sort((a, b) => b[1] - a[1])
    .map(([issue, count]) => `${issue}: ${count}`);

  return `Total leads: ${data.length}\n\nBy issue:\n${lines.join("\n")}`;
}

export function logSniperContact(entry: {
  date: string;
  address: string;
  saleType: string;
  contact: string;
  result: string;
  notes: string;
}): string {
  const logPath = path.join(
    __dirname,
    "../../../../Clients/DrewNicoll/leads/garage-sale-sniper-log.md"
  );

  const row = `| ${entry.date} | ${entry.address} | ${entry.saleType} | ${entry.contact} | Y | ${entry.result} | | ${entry.notes} |`;

  try {
    const existing = fs.readFileSync(logPath, "utf-8");
    const updated = existing.replace(
      "| | | Estate / Garage | | Y/N | Interested / Not Now / No / VM | | |",
      `| | | Estate / Garage | | Y/N | Interested / Not Now / No / VM | | |\n${row}`
    );
    fs.writeFileSync(logPath, updated);
    return `Logged contact for ${entry.address}`;
  } catch {
    return `Error writing to sniper log`;
  }
}
