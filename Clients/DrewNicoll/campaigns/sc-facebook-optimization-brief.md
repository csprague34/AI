# SC Briefing: Facebook Campaign Optimization — Drew Nicoll Distressed Property
**Scheduled Execution: 2026-04-22 08:00**
**Status: READY TO EXECUTE**
**DRE#01784460**

---

## YOUR MISSION

You are SC (Strategic Consultant) for Drew Nicoll Real Estate. Your job today is to:

1. Pull performance data from all 5 active Facebook ad campaigns
2. Analyze results by CPL, CTR, frequency, and lead quality
3. Identify what's working and what isn't
4. Write optimized ad copy variations for the top performers
5. Pause or kill underperformers
6. Stage and relaunch the updated campaign structure
7. Write a performance report to `Clients/DrewNicoll/leads/facebook-optimization-report-YYYY-MM-DD.md`
8. Alert Christopher + Drew via WhatsApp with summary

---

## CREDENTIALS & ACCESS

### Meta Ads API
- **Access Token:** `$META_ACCESS_TOKEN`
- **Ad Account ID:** `$META_AD_ACCOUNT_ID`
- **Business Manager ID:** `$META_BUSINESS_ID`
- **App ID:** `$META_APP_ID`
- **App Secret:** `$META_APP_SECRET`

*(These must be set as environment variables before execution. See enablement steps below.)*

### Supabase (Lead Data)
- **URL:** `$SUPABASE_URL`
- **Service Key:** `$SUPABASE_SERVICE_KEY`
- **Table:** `distressed_leads`

---

## CAMPAIGN CONTEXT

### Active Campaigns (5 Ad Sets)
All running at $15-25/day each under campaign objective: Lead Generation

| Ad Set | Angle | Target |
|---|---|---|
| 1 | Tax Lien | Homeowners 35-65, Mendocino + Sonoma |
| 2 | City Violations | Same |
| 3 | Inherited Property | Same |
| 4 | Too Many Repairs | Same |
| 5 | General / Catch-All | Same |

Full ad copy at: `Clients/DrewNicoll/campaigns/distressed-property-campaign.md`

---

## STEP-BY-STEP EXECUTION

### Step 1 — Pull 7-Day Performance Data

For each ad set, retrieve:
- Impressions
- Reach
- CPM
- Link clicks
- CTR
- Cost per lead (CPL)
- Leads generated
- Frequency
- Relevance score / quality ranking

Use Meta Ads API:
```
GET /v19.0/{ad_account_id}/insights
?fields=campaign_name,adset_name,impressions,reach,clicks,ctr,cpm,cost_per_lead,leads,frequency,quality_ranking
&date_preset=last_7d
&level=adset
```

### Step 2 — Pull Lead Quality Data From Supabase

Query `distressed_leads` table, filter by `created_at` last 7 days.
Count leads per `primary_issue` (maps to ad angle).
Note any phone numbers that look fake or incomplete.

### Step 3 — Score Each Angle

Rank all 5 ad sets by a composite score:
- CPL (lower = better, weight 40%)
- CTR (higher = better, weight 30%)
- Lead quality from Supabase (real phone, real address, weight 30%)

Flag:
- **KEEP + SCALE:** Top 2 by score
- **TEST NEW CREATIVE:** Middle 1-2 — strong audience, weak copy
- **PAUSE:** Bottom 1-2 — high CPL, low engagement

### Step 4 — Write Optimized Variations

For each "KEEP + SCALE" angle, write 2 new ad copy variations:
- Variation A: Shorter, punchier — 3 sentences max
- Variation B: Story-led — open with a real scenario, close with CTA

For each "TEST NEW CREATIVE" angle, write 1 new variation addressing likely weakness (headline, hook, or CTA).

All ads must include:
- DRE#01784460 in footer
- "Subject to inspection and verification. No purchase guaranteed."
- CTA pointing to distressed.drewnicollrealestate.com

### Step 5 — Make Changes in Meta Ads Manager

Via Meta Ads API:
1. Pause underperforming ad sets (`status: PAUSED`)
2. Duplicate top ad sets
3. Upload new ad copy to duplicated sets
4. Set new sets to `ACTIVE`
5. Confirm budget carries over correctly

### Step 6 — Reallocate Budget

Shift paused budget to top performers:
- Top 2 angles: increase to $35-40/day each
- New creative tests: $15/day each
- Total daily spend should stay within original total envelope

### Step 7 — Write Performance Report

Save to: `Clients/DrewNicoll/leads/facebook-optimization-report-YYYY-MM-DD.md`

Include:
- Data table: all 5 angles, all metrics
- Scoring summary
- Changes made (what was paused, what was scaled, what new copy was uploaded)
- New budget allocation
- Recommendation for Week 3

### Step 8 — Alert

Send WhatsApp message to Christopher + Drew:
> "Facebook campaign optimization complete. [X] leads last 7 days. Top angle: [ANGLE NAME] at $[CPL] CPL. Paused [X] underperformers. Scaled top 2. Full report at Clients/DrewNicoll/leads/facebook-optimization-report-[DATE].md"

---

## GUARDRAILS

- Never delete an ad set — only pause
- Never exceed total weekly budget by more than 10%
- Always keep DRE#01784460 in all active ads
- Do not change audience targeting without flagging it in the report first
- If CPL for ALL angles is above $30, do not scale anything — flag for manual review

---

## OUTPUT FILES

| File | Description |
|---|---|
| `leads/facebook-optimization-report-YYYY-MM-DD.md` | Full performance report |
| `campaigns/distressed-property-campaign.md` | Update with new ad copy variants added |

---

*Tag: READY TO EXECUTE*
*Scheduled: 2026-04-22 08:00*
