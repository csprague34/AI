# Skill: sc-marketing — Marketing Operations

Full-stack marketing ops for GarageSaleSniper and personal brand.

---

## Stack

| Layer | Tool | Purpose |
|---|---|---|
| Paid Ads | Meta Ads | Lead gen and retargeting |
| CRM / Leads | Supabase | Lead capture and pipeline |
| Alerts | OpenClaw → WhatsApp | Real-time ops notifications |
| Content | Blotato | Schedule and publish posts |
| Video | Remotion | Programmatic promo clips |
| Deploy | Vercel | App and landing page hosting |

---

## Lead Flow

```
Meta Ad click
  → Landing page (Vercel)
  → Supabase INSERT (leads table)
  → OpenClaw WhatsApp alert fired
  → Reply Y → auto-tag lead + queue follow-up
  → Reply N → skip, log reason
```

---

## Content Calendar (Daily)

| Time | Action |
|---|---|
| 07:00 | Pull overnight ad stats, check for alerts |
| 09:00 | Post personal brand update (Blotato) |
| 12:00 | Budget burn check — adjust if needed |
| 17:00 | Render + queue Remotion day recap clip |
| 20:00 | Review leads, send follow-ups |

---

## Personal Promotion Principles

1. Document the build — show the process, not just the wins.
2. One post per platform per day minimum (X, LinkedIn, IG).
3. Every post ends with a soft CTA tied to the current campaign.
4. Repurpose daily journal into short-form video via Remotion.

---

## KPIs (Daily Targets)

| Metric | Target |
|---|---|
| Leads/day | 10+ |
| CPL | < $8.00 |
| CPC | < $1.10 |
| Budget utilization | 85–100% (by EOD, not before noon) |
| Content posts published | 3+ |
| Follow-up response time | < 2 hours |
