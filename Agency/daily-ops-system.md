# SPRAGUE AI — MASTER DAILY OPERATIONS SYSTEM

> This is the brain that runs Sprague AI every day.
> CC reads this file first. All decisions flow from the priority ranking below.

---

## MORNING BOOT SEQUENCE — runs 7am daily

SC collects overnight data and sends Christopher a WhatsApp briefing in this exact format:

```
☀️ SPRAGUE AI — DAILY BRIEF [DATE]

💰 MONEY MOVERS TODAY:
1. [Most urgent revenue action]
2. [Second most urgent]
3. [Third]

🔥 NEW LEADS OVERNIGHT:
- DAA: [X leads]
- Drew: [X leads]
- Caruso: [X leads]

📊 AD PERFORMANCE:
- LMCCP CTR: [X]% | CPC: $[X]
- Drew distressed: [X]% | CPC: $[X]
- Status: [on track / needs attention]

📋 CLIENT STATUS:
- Drew: [agreement signed Y/N]
- Dave: [agreement signed Y/N]
- Caruso: [inventory received Y/N]
- Gonzalez: [lender connected Y/N]

✅ TOP 3 TASKS FOR TODAY:
1. [Step by step instruction]
2. [Step by step instruction]
3. [Step by step instruction]

Reply 1, 2, or 3 to get full instructions
```

---

## PRIORITY RANKING SYSTEM — how CC decides what goes in the top 3 tasks each day

### TIER 1 — CASH (always top priority)
- Unsigned agreements → draft follow up
- Uncollected setup fees → draft message
- New leads not yet contacted → draft outreach
- Deposit not collected → draft request

### TIER 2 — PIPELINE
- Client blocking issue (Caruso inventory, Dave compliance docs, Gonzalez lender)
- Campaign not yet launched
- Website not yet live
- Ads not yet running

### TIER 3 — GROWTH
- Content not published this week
- SEO tasks from Moz
- New campaign builds
- Journal and personal brand posts

### TIER 4 — MAINTENANCE
- Reporting, file updates, system improvements

> CC always surfaces Tier 1 first. Never let Tier 3 or 4 work happen when Tier 1 is open.

---

## ACTIVE PROJECTS — current priority stack

### PROJECT 1: COLLECT MONEY — URGENT
| Client | Amount | Status |
|--------|--------|--------|
| Drew | $547 setup fee | Unpaid — follow up daily |
| Dave | Buildout contribution | Unpaid — follow up daily |
| Caruso | $297 setup + $1,500 month 1 | Unpaid |
| Gonzalez | Deposit | Conversation not started |

### PROJECT 2: LMCCP — DAA LEAD GEN
| Task | Status |
|------|--------|
| Site live at lowermyccpayments.com | ✅ Done |
| Supabase + Resend connected | ✅ Done |
| Geo targeting corrected | ✅ Done |
| Source URL tracking | 🔄 In Progress |
| SC lead monitoring | 🔄 In Progress |
| Subdomains optimized | ⏳ Pending |

### PROJECT 3: DREW — DISTRESSED PROPERTY NATIONWIDE
| Task | Status |
|------|--------|
| Campaign brief built | ✅ Done |
| Landing page | ❌ Not Started |
| Domain | ❌ Not Registered |
| 5 ad angles | Built — not launched |
| Hook videos | Christopher to film |

### PROJECT 4: GONZALEZ — TWO HOME PROJECT
| Task | Status |
|------|--------|
| Budget sent | ✅ Done |
| Floor plans sent | ✅ Done |
| Lender email drafted | ✅ Done |
| Lender referral connected | ❌ Not Yet |
| Permit Sonoma check | ❌ Not Done |
| Two-home zoning confirmed | ❌ Not Done |

### PROJECT 5: CARUSO CLASSICS
| Task | Status |
|------|--------|
| Onboarded | ✅ Done |
| Inventory list | ❌ Still Overdue |
| Content | Blocked until inventory received |
| Follow up | Overdue — contact today |

### PROJECT 6: BC HOMES CONTENT
| Task | Status |
|------|--------|
| 14 posts published | ✅ Done |
| Reels strategy identified | ✅ Done |
| Weekly boss report | ❌ Not Set Up |
| Metricool connected | ❌ Not Connected |
| Google Business Profile optimized | ❌ Not Optimized |

### PROJECT 7: SPRAGUE AI BRAND
| Task | Status |
|------|--------|
| spragueai.com registered | ✅ Done |
| leads.spragueai.com live | ✅ Done |
| LinkedIn + Facebook posting | 🔄 Active |
| Building in the Dark journal | 🔄 In Progress |
| Phone hook videos filmed | Filmed — not uploaded |

### PROJECT 8: SYSTEMS
| Task | Status |
|------|--------|
| Google Drive migration | 🔄 In Progress |
| LaunchCC.bat /d flag fix | ❌ Needs Fix |
| Mubert API for video music | ❌ Not Set Up |
| Metricool cross-platform analytics | ❌ Not Set Up |
| SC WhatsApp connection | 🔄 In Progress |
| Marketing Brain MCP | ❌ Not Installed |
| AgentKits 18 agents | ❌ Not Installed |
| Moz SEO workflow | ❌ Not Started |

---

## AUTOMATION RULES — SC runs these silently

### ALWAYS AUTOMATED
- Lead capture → Supabase → Resend notification
- Facebook posts scheduled via Blotato
- NotebookLM podcast generation — 7am daily
- Vercel deployment monitoring
- Ad performance alerts via WhatsApp

### SEMI-AUTOMATED (Christopher approves)
- Follow-up messages drafted, sent on approval
- New ad sets drafted, launched on approval
- Agreement follow-ups drafted, sent on approval
- Blog/SEO content drafted, posted on approval

### NEVER AUTOMATED
- Spending money or changing ad budgets
- Signing anything
- Sending money
- Responding to leads personally

---

## END OF DAY PROTOCOL — runs 6pm daily

SC sends WhatsApp summary:

```
📊 EOD SPRAGUE AI — [DATE]

✅ COMPLETED TODAY:
- [list]

🔄 CARRIED FORWARD:
- [list]

💡 TOMORROW'S TOP PRIORITY:
[single most important thing]

📝 JOURNAL NOTE:
[one sentence on today for Building in the Dark]
```

After sending EOD summary, SC automatically:
1. Updates `handoff.md`
2. Updates `business-state.md` with any changes
3. Flags any Tier 1 items still open as **URGENT**
