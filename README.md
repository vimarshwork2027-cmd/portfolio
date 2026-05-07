# Vimarsh Tiwari — Portfolio

Production-ready Next.js 15 portfolio. Data-driven architecture means adding a new case study takes ~5 minutes: edit one data file, the homepage grid, case study page, and SEO metadata all update automatically.

**Live:** [vimarsh.design](https://vimarsh.design)

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion
- **Typography:** Fraunces (serif) + Geist (sans) + JetBrains Mono — all self-hosted via `next/font`
- **Deployment:** Vercel

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## Project structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Homepage (Hero + Work + Testimonial)
│   ├── globals.css             # Design tokens, base styles
│   ├── not-found.tsx           # Custom 404
│   ├── about/page.tsx          # About page
│   ├── funnel-redesign/page.tsx
│   ├── map-discovery/page.tsx
│   ├── viral-contest/page.tsx
│   └── things-to-do/page.tsx
│
├── components/
│   ├── Nav.tsx                 # Top nav with status pill
│   ├── Footer.tsx              # Footer with CTA + socials
│   ├── Hero.tsx                # Homepage hero + stat card
│   ├── WorkSection.tsx         # Case study grid wrapper
│   ├── CaseStudyCard.tsx       # Individual card in the grid
│   ├── CaseStudyPage.tsx       # Reusable case study template
│   └── Testimonial.tsx         # Achyuth's quote block
│
├── lib/
│   ├── case-studies.ts         # ⭐ ALL case study data lives here
│   ├── site.ts                 # Personal info, socials, hero copy
│   └── utils.ts                # cn() helper, formatDate()
│
├── public/
│   ├── resume.pdf              # Drop your resume here
│   └── images/                 # Case study images go here
│
└── [config files]
```

---

## ⭐ How to add a new case study

This is the core pattern you'll use again and again.

### Step 1 — Add the data

Open `lib/case-studies.ts` and add a new object to the `caseStudies` array:

```ts
{
  slug: "new-project",
  title: "My New Project",
  tagline: "One-line hook that appears on the card",
  hero: "Longer punchy sentence that appears on the case study page...",
  company: "AllEvents",
  role: "Lead Product Designer",
  team: "1 designer · 2 engineers",
  timeline: "4 weeks · shipped Mar 2026",
  scope: "End-to-end design",
  status: "live",
  date: "2026-03-01",
  tags: ["Growth", "B2C Mobile"],
  metrics: [
    { value: "30", unit: "%", label: "Some lift", source: "Internal · 2026" },
  ],
  context: "Product background...",
  problem: "The problem statement...",
  decisions: [
    {
      title: "Decision name",
      options: "We had options A, B, C...",
      pick: "We picked B.",
      reason: "Because...",
      tradeoff: "The tradeoff was...",
    },
  ],
  miss: "What didn't work...",
  learnings: ["Thing 1", "Thing 2"],
}
```

### Step 2 — Add the route

Create `app/new-project/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/CaseStudyPage";

const SLUG = "new-project";

export function generateMetadata(): Metadata {
  const cs = getCaseStudy(SLUG);
  if (!cs) return {};
  return { title: cs.title, description: cs.tagline };
}

export default function Page() {
  const cs = getCaseStudy(SLUG);
  if (!cs) notFound();
  return <CaseStudyPage caseStudy={cs} />;
}
```

That's it. The homepage grid, the case study page, and the SEO metadata all update automatically.

---

## Customization cheat sheet

### Change your personal info (name, email, socials, hero copy)
→ Edit `lib/site.ts`

### Change colors or typography
→ Edit CSS variables in `app/globals.css` and font config in `app/layout.tsx`

### Change the headline
→ Edit `site.headline` in `lib/site.ts`

### Update the hero stats
→ Edit `site.heroStats` in `lib/site.ts`

### Change testimonial
→ Edit `site.testimonial` in `lib/site.ts`

---

## Design tokens

Defined in `app/globals.css` as CSS variables:

```css
--bg: 0 0% 4%;              /* near-black background */
--bg-2: 0 0% 7%;             /* card surfaces */
--ink: 48 20% 96%;           /* primary text */
--ink-dim: 40 4% 55%;        /* body text */
--ink-faint: 40 4% 25%;      /* metadata */
--accent: 72 100% 62%;       /* lime — primary accent */
--accent-warm: 16 100% 56%;  /* orange — secondary accent */
--rule: 40 4% 14%;           /* dividers */
```

All colors are HSL, so you can change the hue in one line and the whole site updates.

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Vercel auto-detects Next.js → Deploy
4. Once deployed, add your custom domain:
   - Project → Settings → Domains → Add `vimarsh.design`
   - Follow DNS instructions

First deploy takes ~90 seconds. Subsequent deploys are instant.

---

## Todo (from the roadmap we discussed)

- [ ] Add resume PDF to `public/resume.pdf`
- [ ] Add hero images/videos for each case study (`public/images/`)
- [ ] Write & ship Things to Do case study (Feb 2026)
- [ ] Set up custom domain on Vercel
- [ ] Add OG image (`public/og-image.png`)
- [ ] Add favicon (`app/icon.png`)

---

## Built with

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS · Framer Motion
- Deployed on Vercel

Built by Vimarsh, with Claude.
