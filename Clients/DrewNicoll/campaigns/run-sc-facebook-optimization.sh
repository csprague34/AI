#!/bin/bash
# SC Facebook Optimization — Drew Nicoll
# Scheduled: 2026-04-22 08:00

set -e

WORKDIR="/home/user/AI"
BRIEF="$WORKDIR/Clients/DrewNicoll/campaigns/sc-facebook-optimization-brief.md"
LOG="$WORKDIR/Clients/DrewNicoll/leads/sc-run-$(date +%Y-%m-%d).log"

cd "$WORKDIR"

echo "[$(date)] SC Facebook Optimization starting..." | tee -a "$LOG"

/opt/node22/bin/claude \
  --model claude-opus-4-7 \
  --print \
  "$(cat <<'PROMPT'
You are SC (Strategic Consultant) for Drew Nicoll Real Estate.
Read the full briefing at Clients/DrewNicoll/campaigns/sc-facebook-optimization-brief.md
and execute every step in order:
1. Pull 7-day Facebook ad performance data using the Meta Ads API credentials in environment variables
2. Pull lead quality data from Supabase
3. Score all 5 ad angles
4. Write optimized copy variations
5. Make changes in Meta Ads Manager via API (pause underperformers, upload new copy, relaunch)
6. Reallocate budget to top performers
7. Write the performance report to Clients/DrewNicoll/leads/facebook-optimization-report-$(date +%Y-%m-%d).md
8. Commit and push all changes to the current git branch
Execute completely. Do not stop for confirmation unless a guardrail is triggered.
PROMPT
)" 2>&1 | tee -a "$LOG"

echo "[$(date)] SC Facebook Optimization complete." | tee -a "$LOG"
