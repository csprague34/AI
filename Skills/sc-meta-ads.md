# sc-meta-ads — Meta Ads Skill

Manages Meta ad campaigns with automated WhatsApp alerts via OpenClaw.

---

## WhatsApp Alerts via OpenClaw

All alerts are sent through the OpenClaw API to the configured WhatsApp number.
Messages must stay under 160 characters and always end with the approval prompt.

### Alert Templates

| Trigger | Message Template |
|---|---|
| New Supabase lead | `New lead: [name] from [source]. Reply Y to approve action or N to skip.` |
| CPC spikes >20% | `Alert: CPC up 20% on [campaign]. Reply Y to approve action or N to skip.` |
| Budget ≥80% before noon | `Warning: budget burning fast on [ad set]. Reply Y to approve action or N to skip.` |
| Vercel deploy fails | `Deploy failed on [project]. Reply Y to approve action or N to skip.` |

---

## Trigger Conditions

### 1. New Lead — Supabase
- **When:** INSERT event on `leads` table (Supabase Webhook / Realtime)
- **Message:** `New lead: {lead.name} from {lead.source}. Reply Y to approve action or N to skip.`
- **Max length:** 160 chars

### 2. CPC Spike — Meta Ads
- **When:** Campaign CPC increases >20% vs previous 24h window (checked every hour)
- **Message:** `Alert: CPC up 20% on {campaign.name}. Reply Y to approve action or N to skip.`
- **Max length:** 160 chars

### 3. Budget Burn — Meta Ads
- **When:** Ad set spend reaches ≥80% of daily budget before 12:00 local time
- **Message:** `Warning: budget burning fast on {ad_set.name}. Reply Y to approve action or N to skip.`
- **Max length:** 160 chars

### 4. Vercel Deploy Failure
- **When:** Vercel webhook fires with `deployment.error` or status `ERROR`
- **Message:** `Deploy failed on {project.name}. Reply Y to approve action or N to skip.`
- **Max length:** 160 chars

---

## OpenClaw Integration

```python
import httpx

OPENCLAW_API_URL = "https://api.openclaw.io/v1/messages"  # replace with actual endpoint
OPENCLAW_API_KEY = "<OPENCLAW_API_KEY>"
WHATSAPP_TO     = "<WHATSAPP_NUMBER>"   # E.164 format, e.g. +15551234567

def send_whatsapp_alert(message: str) -> dict:
    assert len(message) <= 160, "Message exceeds 160 characters"
    response = httpx.post(
        OPENCLAW_API_URL,
        headers={"Authorization": f"Bearer {OPENCLAW_API_KEY}"},
        json={"to": WHATSAPP_TO, "body": message},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()
```

### Trigger helpers

```python
def alert_new_lead(name: str, source: str) -> None:
    msg = f"New lead: {name} from {source}. Reply Y to approve action or N to skip."
    send_whatsapp_alert(msg)

def alert_cpc_spike(campaign: str) -> None:
    msg = f"Alert: CPC up 20% on {campaign}. Reply Y to approve action or N to skip."
    send_whatsapp_alert(msg)

def alert_budget_burn(ad_set: str) -> None:
    msg = f"Warning: budget burning fast on {ad_set}. Reply Y to approve action or N to skip."
    send_whatsapp_alert(msg)

def alert_deploy_failed(project: str) -> None:
    msg = f"Deploy failed on {project}. Reply Y to approve action or N to skip."
    send_whatsapp_alert(msg)
```

---

## Notes

- Truncate dynamic fields (name, campaign, etc.) if the rendered message would exceed 160 chars.
- The approval prompt `Reply Y to approve action or N to skip.` is mandatory on every alert.
- Store `OPENCLAW_API_KEY` and `WHATSAPP_TO` in environment variables / secrets — never hardcode.
