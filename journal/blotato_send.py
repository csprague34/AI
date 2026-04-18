"""
Send a journal entry to Blotato for scheduling/publishing.
Set BLOTATO_API_KEY in your environment before running.
"""

import os
import httpx

BLOTATO_API_URL = "https://api.blotato.com/v1/posts"
BLOTATO_API_KEY = os.environ["BLOTATO_API_KEY"]

DAY_34_POST = """\
Day 34: Marketing Team & Personal Promotion 🗓️

✅ THE GOOD
- Team momentum is real — collaboration is tightening
- Personal promotion is getting noticed by the right people
- 34 days of showing up is compounding

⚠️ THE BAD
- Need to delegate more — stop hoarding tasks
- Brand messaging still inconsistent across channels
- Follow-up on leads needs to be faster

💀 THE UGLY
- Hard accountability talk with the team today
- Wasted ad spend on an un-QA'd campaign
- Imposter syndrome hit — acknowledged it, kept moving

Day 34 is proof that showing up through the messy middle IS the job.

#Day34 #MarketingLife #PersonalPromotion #BuildInPublic
"""


def send_to_blotato(content: str) -> dict:
    response = httpx.post(
        BLOTATO_API_URL,
        headers={
            "Authorization": f"Bearer {BLOTATO_API_KEY}",
            "Content-Type": "application/json",
        },
        json={"content": content, "status": "draft"},
        timeout=15,
    )
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    result = send_to_blotato(DAY_34_POST)
    print(f"Posted to Blotato: {result}")
