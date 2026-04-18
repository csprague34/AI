# Skill: sc-remotion — Programmatic Video Creation

Auto-generate promo clips, daily recaps, and brand stories using Remotion (React-based video).

---

## Stack

- **Remotion** — React components rendered to MP4
- **Blotato** — receives rendered clips for scheduling
- **Data sources** — Supabase (leads), Meta Ads API (stats), journal markdown

---

## Video Types

| Type | Length | Trigger | Output |
|---|---|---|---|
| Day Recap | 30–45s | Daily at 17:00 | Good/Bad/Ugly summary reel |
| Origin Story | 60s | One-time / evergreen | "Why 34?" brand identity clip |
| Ads Alert Clip | 15s | CPC spike or budget burn | Stat callout with CTA |
| Lead Milestone | 15s | Every 10 leads | Social proof count update |

---

## Origin Story Script — "Why 34?" (60s)

```
[0–5s]   Black screen. White text fades in:
         "Most people pick a number. Mine picked me."

[5–15s]  Fast-cut: football field, scoreboard, jersey #34
         VO: "34 was my number. Small town. Big dreams.
              Rushing records. Touchdown records.
              Championship game — we won."

[15–25s] Slow zoom on jersey number
         VO: "That number taught me something most people
              learn the hard way — showing up every single
              day, even when it's ugly, is the whole game."

[25–40s] Cut to desk / build montage (app, ads dashboard, laptop)
         VO: "Now I'm 34 days into building something new.
              Same number. Same mindset.
              Different field."

[40–50s] Stats on screen — rushing yards style but for the build:
         "34 days  |  3 products  |  leads growing  |  0 quit days"

[50–58s] Logo / product name fades in
         VO: "The scoreboard looks different. The work ethic doesn't."

[58–60s] CTA text: "Follow the build. Day by day."
```

---

## Day Recap Template (30–45s)

```
[0–5s]   "Day {N}" — bold, centered, athletic font

[5–15s]  THE GOOD — green text, bullet points animate in

[15–25s] THE BAD / THE UGLY — amber/red, same animation

[25–35s] Key stat of the day (leads, spend, CPC, milestone)

[35–42s] Takeaway quote from journal

[42–45s] CTA: "Reply Y to follow tomorrow's update."
```

---

## Remotion Component Skeleton

```tsx
// compositions/DayRecap.tsx
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const DayRecap: React.FC<{
  day: number;
  good: string[];
  bad: string[];
  ugly: string[];
  takeaway: string;
}> = ({ day, good, bad, ugly, takeaway }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ background: '#0a0a0a', color: 'white', padding: 60, fontFamily: 'Inter' }}>
      <div style={{ opacity, fontSize: 72, fontWeight: 900 }}>Day {day}</div>
      {/* animate good/bad/ugly sections by frame offset */}
    </AbsoluteFill>
  );
};
```

---

## Render & Send Pipeline

```bash
# Render Day 34 recap
npx remotion render DayRecap out/day-34-recap.mp4 \
  --props='{"day":34,"good":["Team momentum","Visibility up","34 days compounding"],"bad":["Under-delegating","Inconsistent messaging"],"ugly":["Accountability talk","Wasted ad spend"],"takeaway":"Showing up through the messy middle IS the job."}'

# Send to Blotato
BLOTATO_API_KEY=... python journal/blotato_send.py --video out/day-34-recap.mp4
```
