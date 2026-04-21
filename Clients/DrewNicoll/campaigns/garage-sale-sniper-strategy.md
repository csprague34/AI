# SC Strategy Review: Garage Sale Sniper
**Status: STRATEGY PHASE**
**Date: 2026-04-21**
**Prepared for: Drew Nicoll Real Estate**

---

## The Core Insight

Garage sales and estate sales are behavioral signals — not ads, not keywords. They are real-world events that indicate a household in transition. The person holding the sale is often:

- Downsizing (moving, often selling the house too)
- Settling an estate (inherited property — our exact distressed target)
- Going through divorce or separation
- Moving a parent to assisted living (property now empty and likely for sale)
- Financially stressed (selling possessions before selling property)

These are warm leads hiding in plain sight. The seller hasn't posted the house yet. They haven't called an agent. They're in the middle of a life transition — and that's exactly when a non-pressured, helpful outreach lands.

**This is pre-market prospecting at the moment of maximum signal.**

---

## Why This Works

### Estate Sales = Direct Overlap With Drew's Target
Estate sale listings are public, contain an address, and signal one of two things:
1. A family settling a deceased person's estate (inherited property)
2. Someone liquidating a home before moving

Both are prime distressed seller candidates. The estate sale company does the work of flagging them. We just have to show up.

### Garage Sales = Volume + Early Signal
Garage sales are noisier (not every garage sale = property sale) but there are far more of them. The script needs to be softer — curiosity-based rather than direct. A small percentage will convert, but the volume makes it worthwhile.

### No Competition Is Doing This Systematically
Every agent in Mendocino and Sonoma County is watching Zillow and Redfin. Nobody is monitoring EstateSales.net and calling addresses on a Saturday morning before the sign goes in the yard.

---

## Phase 1: Manual Execution (Start Here)

### Data Sources to Monitor Daily

| Source | Type | Signal Strength |
|---|---|---|
| EstateSales.net | Estate sales | Very High |
| Estatesale.com | Estate sales | Very High |
| Facebook Marketplace → Garage Sales | Both | High |
| Craigslist → Garage & Moving Sales | Both | Medium |
| NextDoor (watch for sale posts) | Both | Medium |
| Local newspaper classifieds | Both | Low-Medium |

**Target geography:** Mendocino County + Sonoma County — cast wide, don't restrict to specific cities.

### Daily Monitoring Protocol

1. Check all sources each morning by 8am
2. Flag any new listings in Mendocino or Sonoma County
3. Log address, contact info, sale type (estate vs. garage), and date
4. Save to `Clients/DrewNicoll/leads/garage-sale-sniper-log.md`
5. Drew or Christopher calls same day — before the sale if possible, or day-of

---

## Call Scripts

### Script A — Estate Sale (High Intent)

> "Hi, my name is [Name] — I'm calling because I saw you have an estate sale listed at [address] this weekend. I work with Drew Nicoll Real Estate and we specialize in helping families in exactly this situation. I don't want to intrude — I'm just wondering, once the sale wraps up, is the property itself something the family might be open to selling? We buy as-is, no repairs needed, and we've worked with a lot of families going through this process. Would it make sense to have a five-minute conversation with Drew?"

**Goal:** Get a yes to a callback with Drew. Not a full conversation — just a warm handoff.

### Script B — Garage Sale (Softer, Lower Intent)

> "Hey, this is [Name] — I saw your garage sale listing online. Quick question: I know this might be a long shot, but are you by any chance thinking about selling the property itself? We work with homeowners in Mendocino and Sonoma County who are in transition, and we buy as-is. No pressure at all — just wanted to ask while I saw the listing. If it's not the right time, totally understand."

**Goal:** Plant the seed. If no, ask if they know anyone else in the area with a property that might be a fit. Referral fishing.

### Script C — If They Say "Not Yet But Maybe"

> "That's totally fine. Would it be okay if Drew gave you a call in a few weeks just to stay in touch? He's very low-key — he's not going to push anything. He just likes to know who's out there so when you're ready, you're not starting from scratch."

**Goal:** Get permission for a follow-up. Add to Drew's CRM with a 30/60/90 day touchback.

---

## Phase 1 Workflow (No Tech Required)

```
Morning Check (8am)
       |
New listings found?
       |
      YES → Log address + contact in sniper log
              |
              Call same day (Drew or Christopher)
              |
              Result → Interested / Not Now / No
              |
              Interested → Drew follow-up call within 24hrs
              Not Now → 30-day follow-up reminder
              No → Log and close
```

No automation needed yet. Spreadsheet or the markdown log works fine to start.

---

## Phase 2: Semi-Automated (When Volume Justifies It)

Once Phase 1 proves conversion rate, invest in light automation:

- **Scraper:** Pull new listings from EstateSales.net + Craigslist Mendocino/Sonoma daily via RSS or simple Python script
- **Skip tracing:** Use BatchSkipTracing or PropStream to get owner phone from property address (estate sales give us the address)
- **SMS outreach:** For garage sales where calling feels too aggressive, a soft text first:
  > "Hey — saw your garage sale at [address]. Quick question: is the house itself something you might consider selling? —Drew Nicoll, local RE buyer. No pressure."
- **CRM:** Move from markdown log to a lightweight CRM (Notion or Airtable) with follow-up reminders

---

## Phase 3: Full Automation (When Resources Allow)

- Daily scrape of all sources → auto-enriched with owner data via PropStream API
- Leads auto-entered into Supabase pipeline
- Automated SMS sequence with Drew's number as sender
- Positive replies routed to Drew's phone immediately
- Weekly report: contacts made, response rate, deals in pipeline

**This is the upgrade path — build Phase 1 with zero tech, prove it works, then invest.**

---

## Objections and How to Handle Them

| Objection | Response |
|---|---|
| "We're using an agent already" | "No problem at all — Drew works with agents too. Just wanted to make sure you knew there's a buyer if you ever need one." |
| "We're not selling the house" | "Totally understood. Would you mind if Drew stayed in touch in case things change?" |
| "How did you get this number?" | "From your garage sale listing — your contact info was on the post. If you'd prefer I don't call, I won't." |
| "What's your offer?" | "Drew would need to see the property first. But he's bought homes in any condition in this area — he can give you a real answer fast." |

---

## Metrics to Track (Phase 1)

| Metric | Target |
|---|---|
| Listings checked per week | All in Mendocino + Sonoma |
| Calls made per week | Track every one |
| Contact rate (reached a human) | Goal: 40%+ |
| Warm lead rate (expressed interest) | Goal: 10-15% of contacts |
| Conversion to Drew conversation | Goal: 50% of warm leads |
| Deals sourced from channel | Track monthly |

---

## Risk Notes

- **DRE compliance:** Drew must be identified in every call — name and license number if asked
- **Do Not Call registry:** Skip trace results may include DNC numbers — use a DNC scrubber before dialing at scale (Phase 2+). At Phase 1 volume, document each call
- **Tone is everything:** This channel dies if it feels predatory. Scripts must feel helpful, not opportunistic. Estate families especially — they're grieving
- **Estate sale companies:** Build relationships with estate sale operators in the area. They know 6-12 months out who has a property that'll need to sell. That's a referral pipeline worth cultivating

---

## Immediate Next Steps

- [ ] Set up daily monitoring checklist across all sources
- [ ] Create `Clients/DrewNicoll/leads/garage-sale-sniper-log.md` tracking file
- [ ] Finalize call scripts with Drew — he should adjust to his own voice
- [ ] Determine who is making calls: Drew, Christopher, or VA
- [ ] Week 1: manual calls only, track every contact
- [ ] Week 3: review results and decide if Phase 2 investment is warranted

---

*Tag: STRATEGY PHASE → READY TO EXECUTE (Phase 1)*
*DRE#01784460 | Drew Nicoll Real Estate*
