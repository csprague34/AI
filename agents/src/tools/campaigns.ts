import fs from "fs";
import path from "path";

// Meta Ads API helpers — all calls gated behind env var check
function metaHeaders() {
  return {
    Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export async function getCampaignPerformance(days = 7): Promise<string> {
  const adAccountId = process.env.META_AD_ACCOUNT_ID;
  if (!adAccountId || !process.env.META_ACCESS_TOKEN) {
    return "Meta credentials not configured. Set META_AD_ACCOUNT_ID and META_ACCESS_TOKEN in .env";
  }

  const fields = [
    "campaign_name",
    "adset_name",
    "impressions",
    "reach",
    "clicks",
    "ctr",
    "cpm",
    "cost_per_lead",
    "leads",
    "frequency",
    "spend",
  ].join(",");

  const url =
    `https://graph.facebook.com/v19.0/${adAccountId}/insights` +
    `?fields=${fields}&date_preset=last_${days}d&level=adset` +
    `&access_token=${process.env.META_ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, { headers: metaHeaders() });
    const json = (await res.json()) as {
      data?: Record<string, string>[];
      error?: { message: string };
    };

    if (json.error) return `Meta API error: ${json.error.message}`;
    if (!json.data || json.data.length === 0) return "No campaign data returned.";

    return json.data
      .map(
        (d) =>
          `*${d.adset_name}*\n` +
          `  Spend: $${parseFloat(d.spend || "0").toFixed(2)} | ` +
          `Leads: ${d.leads || 0} | ` +
          `CPL: $${parseFloat(d.cost_per_lead || "0").toFixed(2)} | ` +
          `CTR: ${parseFloat(d.ctr || "0").toFixed(2)}%`
      )
      .join("\n\n");
  } catch (e) {
    return `Fetch error: ${e instanceof Error ? e.message : String(e)}`;
  }
}

export function readCampaignFile(filename: string): string {
  const base = path.join(
    __dirname,
    "../../../../Clients/DrewNicoll/campaigns"
  );
  try {
    return fs.readFileSync(path.join(base, filename), "utf-8");
  } catch {
    const files = fs.readdirSync(base);
    return `File not found. Available: ${files.join(", ")}`;
  }
}

export function writeCampaignNote(filename: string, content: string): string {
  const base = path.join(
    __dirname,
    "../../../../Clients/DrewNicoll/campaigns"
  );
  const full = path.join(base, filename);
  fs.writeFileSync(full, content, "utf-8");
  return `Written to ${filename}`;
}
