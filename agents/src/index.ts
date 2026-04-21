import "dotenv/config";
import { App } from "@slack/bolt";
import { detectAgent, runAgent, AGENT_META, AgentName } from "./router";
import { checkAndAlertLeads } from "./agents/lead-monitor";
import { toSlackBlocks, agentHeader, divider } from "./lib/slack-helpers";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const ALERT_CHANNEL = process.env.SLACK_ALERT_CHANNEL || "#drew-leads";

// Handle @mentions in channels
app.event("app_mention", async ({ event, say, client }) => {
  const text = (event as { text: string }).text;
  const agent = detectAgent(text);
  const meta = AGENT_META[agent];

  // Acknowledge immediately
  await say({
    blocks: [
      agentHeader(meta.label, meta.emoji),
      { type: "section", text: { type: "mrkdwn", text: "_Thinking..._" } },
    ],
  });

  try {
    const result = await runAgent(agent, text);
    await say({
      blocks: [
        agentHeader(meta.label, meta.emoji),
        divider(),
        ...toSlackBlocks(result),
      ],
    });
  } catch (err) {
    await say(`❌ ${meta.emoji} ${meta.label} error: ${err instanceof Error ? err.message : String(err)}`);
  }
});

// Handle DMs — route to agent based on content
app.message(async ({ message, say }) => {
  const msg = message as { text?: string; channel_type?: string };
  if (msg.channel_type !== "im" || !msg.text) return;

  const agent = detectAgent(msg.text);
  const meta = AGENT_META[agent];

  await say(`_${meta.emoji} Routing to ${meta.label}..._`);

  try {
    const result = await runAgent(agent, msg.text);
    await say({
      blocks: [
        agentHeader(meta.label, meta.emoji),
        divider(),
        ...toSlackBlocks(result),
      ],
    });
  } catch (err) {
    await say(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
  }
});

// Lead monitor — 30-minute proactive check
function startLeadMonitor() {
  const INTERVAL_MS = 30 * 60 * 1000;

  async function check() {
    try {
      const alert = await checkAndAlertLeads();
      if (alert) {
        await app.client.chat.postMessage({
          channel: ALERT_CHANNEL,
          blocks: [
            agentHeader("Lead Monitor", "🔔"),
            divider(),
            ...toSlackBlocks(alert),
          ],
        });
      }
    } catch (err) {
      console.error("[lead-monitor]", err);
    }
  }

  // Run immediately on startup, then every 30 min
  check();
  setInterval(check, INTERVAL_MS);
}

// Weekly report — every Monday at 9am
function startWeeklyReporter() {
  async function scheduleNextMonday() {
    const now = new Date();
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
    nextMonday.setHours(9, 0, 0, 0);
    const msUntil = nextMonday.getTime() - now.getTime();

    setTimeout(async () => {
      try {
        const { runReporter } = await import("./agents/reporter");
        const report = await runReporter("Generate the weekly performance report for Drew Nicoll Real Estate. Pull all data, compile the full report, and save it.");
        await app.client.chat.postMessage({
          channel: ALERT_CHANNEL,
          blocks: [
            agentHeader("Weekly Report", "📋"),
            divider(),
            ...toSlackBlocks(report),
          ],
        });
      } catch (err) {
        console.error("[reporter]", err);
      }
      scheduleNextMonday();
    }, msUntil);

    console.log(`[reporter] Next report scheduled for ${nextMonday.toLocaleString()}`);
  }

  scheduleNextMonday();
}

(async () => {
  await app.start();
  console.log("⚡ Agent hub running");

  startLeadMonitor();
  startWeeklyReporter();

  console.log("✅ Lead monitor active (30-min checks)");
  console.log("✅ Weekly reporter scheduled");
  console.log("\nAgents available:");
  console.log("  🧠 SC — mention strategy, advise, recommend, plan, @sc");
  console.log("  📊 Campaign Manager — mention facebook, meta ads, cpl, @campaign");
  console.log("  🔔 Lead Monitor — mention leads, @leads");
  console.log("  🎯 Garage Sale Sniper — mention estate sale, garage sale, @sniper");
  console.log("  📋 Reporter — mention report, @reporter");
})();
