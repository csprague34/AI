# Skill: sc-meta-ads — Meta Ads Operations

Manages Meta ad campaigns with automated monitoring and WhatsApp alerts via OpenClaw.

---

## Triggers & Alerts

| Event | Condition | WhatsApp Message (≤160 chars) |
|---|---|---|
| New Supabase lead | INSERT on `leads` table | `New lead: {name} from {source}. Reply Y to approve action or N to skip.` |
| CPC spike | CPC up >20% vs prior 24h | `Alert: CPC up 20% on {campaign}. Reply Y to approve action or N to skip.` |
| Budget burn | ≥80% spent before noon | `Warning: budget burning fast on {ad set}. Reply Y to approve action or N to skip.` |
| Deploy failure | Vercel `deployment.error` | `Deploy failed on {project}. Reply Y to approve action or N to skip.` |

---

## Campaign Structure (GarageSaleSniper)

```
Account
├── GSS_Cold_Interest_v3     $50/day   Broad interest targeting
├── GSS_Retarget_v2          $30/day   Site visitors + app openers
└── GSS_LAL_Buyers_1pct      $40/day   1% lookalike of buyer list
```

---

## Rules

- Cap daily budget increases at 20% — Meta penalizes larger jumps.
- Rotate creative every 7 days or when frequency hits 3.0+.
- Pause ad sets where CPL > 2× target CPL for 2 consecutive days.
- All alerts require Y/N approval before automated budget changes execute.

---

## OpenClaw Integration

```python
import httpx, os

def send_whatsapp_alert(message: str) -> dict:
    assert len(message) <= 160
    r = httpx.post(
        "https://api.openclaw.io/v1/messages",
        headers={"Authorization": f"Bearer {os.environ['OPENCLAW_API_KEY']}"},
        json={"to": os.environ["WHATSAPP_TO"], "body": message},
        timeout=10,
    )
    r.raise_for_status()
    return r.json()
```
