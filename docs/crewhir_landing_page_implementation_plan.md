# Crewhir landing page: implementation plan (v1)

A responsive, high-conversion marketing site for **Crewhir**. Version 1 is **one landing page plus the three legal pages**. Feature, pricing, blog and comparison pages come later.

- **Section flow, features and positioning** are modeled on [viktor.com](https://viktor.com/): an AI teammate that lives in Slack and Microsoft Teams, connects to your tools and hands back finished work.
- **Brand, colours, type, components and dependencies are Crewhir's own.** Nothing is reused from Rankoya's brand, design system or library choices, and nothing copies Viktor's visual identity. Section 2 defines the brand. Section 3 explains why each dependency differs from Rankoya's.
- Legal page content comes from `docs/crewhir_legal_pages_plan.md`.

---

## 0. Context

| Item | Detail |
| --- | --- |
| Product | Crewhir: an AI teammate for Slack and Microsoft Teams. Connect your tools, ask in plain words, get finished work back (reports, dashboards, code, campaigns, internal apps). |
| Tagline | _Consider it done._ |
| Hero line | _Your crew, plus one._ |
| Repo | Standalone repo, deployed on its own. Suggested path `landing_page/crewhir/` next to Rankoya's (confirm, Q1). If it sits inside the app repo folder, add it to `.gitignore` like Rankoya's. |
| Framework | Next 16.4 (App Router), React 19.3, TypeScript strict. **Read `node_modules/next/dist/docs/` before writing code** (AGENTS.md: this Next version has breaking changes). |
| Marketing URL | `https://crewhir.com` (`NEXT_PUBLIC_SITE_URL`, placeholder until Q2) |
| App URL | `https://app.crewhir.com` (`NEXT_PUBLIC_APP_URL`, placeholder). CTAs go to `/sign-up`; "Log in" goes to `/sign-in`. |
| Company | NETSACH TECH LTD (confirm, legal plan Q1) |
| Pages in v1 | `/`, `/privacy-policy`, `/terms-of-service`, `/refund-policy` |

### What Viktor's page does (the model)

From viktor.com, top to bottom: hero ("Not a tool. A hire.", Slack/Teams chat preview, free-credit/no-card/SOC 2 trust line, customer logo strip) → comparison table (other AI tools vs Viktor, per task) → "what makes Viktor different" (takes action / works across tools / gets better) → testimonials with hours saved → how it works (Connect, Ask, Delivered) → use cases by team (Founders, Marketing, Engineering, Ops & Finance) → "Autonomous, not unsupervised" → "Ask AI about Viktor" (ChatGPT, Perplexity, Claude links) → grouped FAQ (product, setup, security, integrations, reliability, compliance) → pricing CTA ("Start free. Pay only when you're ready.") → large footer (Product, Solutions, Compare, Resources, Company, Legal).

Viktor's look, so we stay clearly different: warm off-white `#fffefc`, electric violet `#6E47FF`, deep indigo `#150079`, peach `#FFBB98`, Lato. **Crewhir avoids violet, indigo and peach entirely.**

### What Crewhir copies and what it doesn't

| Copy from Viktor | Don't copy |
| --- | --- |
| Section order and jobs-to-be-done | Their headlines or body copy (all Crewhir copy is written below) |
| Chat-native product preview in the hero | Their colours, font, illustrations, or Slack's or Teams' actual UI chrome |
| Comparison by task | Naming competitor products (we compare categories: "chat assistants", "automation builders") |
| Grouped FAQ with straight answers on data and access | Their user counts, customer logos, certifications or integration count. We publish only numbers that are true for Crewhir. |
| "Ask AI about us" links | Testimonials, until we have real ones (section 6.10) |

---

## 1. Decisions in this plan (change any, and the plan updates)

| # | Decision | Why |
| --- | --- | --- |
| D1 | **Light site with dark "harbor" bands.** No theme toggle in v1. | The brand reads warm and daylight, like Viktor's market expects, but in a different palette. Dropping the toggle removes a dependency and halves the QA matrix. Dark bands carry the preview and the final CTA. |
| D2 | **Two CTAs in the hero:** "Start free" (primary) and "Book a demo" (secondary). | Viktor's buyers split between self-serve founders and team leads who want a call. "Book a demo" goes to `mailto:` until a booking page exists (Q4). |
| D3 | **No invented proof.** No user counts, ratings, customer logos, "hours saved" or certifications unless they're real. | Matches the project rule (no fabricated data) and the legal plan. Real numbers go in `content/proof.ts` and appear automatically once filled. |
| D4 | **The "Works with" strip shows integrations, not customers.** | Third-party marks under "Trusted by" imply endorsement. Slack and Microsoft marks follow their brand guidelines. |
| D5 | **Hero preview is a coded, animated chat mockup** in a neutral Crewhir chat frame, with a "Slack / Teams" switch. | Crisp at any size, no stale screenshots, and it doesn't reproduce Slack's or Microsoft's proprietary UI. |
| D6 | **Legal pages are hosted on the landing site** at the same slugs the app uses. | One URL set for Slack, Microsoft, Google and Paddle reviews. Content is typed TS data (legal plan §6), rendered by a Crewhir-styled component. |
| D7 | **All copy lives in `content/`, all URLs in `lib/site.ts`.** | One edit point per string or URL. Ready for translation later. |
| D8 | **Testimonials section built but hidden** behind `content/proof.ts` until there are three real quotes. | The layout is ready, and nothing fake ships. |

---

## 2. Crewhir brand identity

### 2.1 What Crewhir is

**One line:** Crewhir is an AI teammate you add to Slack or Microsoft Teams. It connects to your tools, takes requests in plain words, and hands back finished work.

**Longer:** Most AI tools tell you how to do the work. Crewhir does it. Ask in a channel and it pulls the data from your connected tools, does the analysis and returns the result: a PDF report, a spreadsheet, a dashboard, a pull request, a deployed internal app. It runs recurring jobs on a schedule, suggests what to automate next, and asks a person before anything that matters.

**Who it's for:** founders and operators at teams of 5 to 200 people who live in Slack or Teams and have more recurring work than headcount. Secondary: team leads in marketing, engineering, operations and finance.

**Name:** Crewhir = *crew* + *hire*. Written **Crewhir** in copy and **crewhir** in the wordmark. Never "CrewHir", "Crew Hir" or "CREWHIR". Pronounced "crew-hire".

### 2.2 Personality and voice

**Dependable, direct, a little warm.** Crewhir is the colleague who says "on it" and comes back with the file. It isn't a sci-fi robot, and it isn't hype.

| Crewhir is | Crewhir is not |
| --- | --- |
| Plain-spoken, specific, finished | Hype, "10x", buzzwords |
| Accountable: it asks before high-stakes actions | "Fully autonomous" with no brakes |
| A teammate | A tool, a bot, a robot, "an AI" |
| Calm confidence | Cute, cartoonish, emoji-heavy |

Voice rules:
- Sentence case everywhere, including buttons. No exclamation marks.
- Verbs first: "Pull last month's ad spend", not "Ad spend analysis capability".
- Crewhir speaks in the first person inside product mockups ("Done. I flagged two campaigns over budget.").
- Talk about results, not models. Don't name LLM vendors in marketing copy (they're named in the Privacy Policy).
- **Banned words:** supercharge, unleash, revolutionize, magic, game-changer, seamless, effortless, 10x, cutting-edge, "AI-powered" (as filler), robot, ninja, wizard.

### 2.3 Colour: "Harbor and Brass"

Deep green-black, warm paper and one brass accent. It's distinct from Viktor (violet, indigo, peach) and Rankoya (blue, navy, violet).

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Ink | Harbor | `#0D1F1C` | Dark bands, footer, headings on paper |
| Primary | Crew Green | `#0F7353` | Primary buttons, links, focus rings, the "done" check. White text 5.9:1, on paper 5.3:1 (AA). |
| Primary hover | Deep Green | `#0B5C42` | Hover and pressed states |
| Accent | Brass | `#F5B83D` | **Rarest colour.** Only "Crewhir is asking you" moments: approval cards, the live-status dot, one highlight per section. Always with Harbor text (9.5:1). Never a gradient. |
| Paper | Paper | `#F6F4EE` | Page background |
| Surface | White | `#FFFFFF` | Cards |
| Surface 2 | Sand | `#EFEBE2` | Subtle fills, table stripes, code blocks |
| Border | Rope | `#DDD7C9` | 1px borders |
| Border strong | Rope Dark | `#C5BDAA` | Inputs, dividers on sand |
| Text | Text | `#14231F` | Body text |
| Text 2 | Slate Green | `#4A5A55` | Secondary text (6.6:1 on paper) |
| Text 3 | Muted | `#5F6B66` | Captions, meta (5.0:1 on paper; don't go lighter) |
| Mint | Mint | `#D6EEE3` | Success pill fill, highlighted table cell |
| Dark card | Harbor 2 | `#16302A` | Cards on dark bands |
| Dark border | Harbor Line | `#25453D` | Borders on dark bands |
| Text on dark | Foam | `#EAF2EE` | Text on Harbor |
| Text 2 on dark | Foam 2 | `#A9BDB5` | Secondary text on Harbor |
| Danger | Rust | `#B4441C` | Errors, "over budget" in mockups (always with an icon and label) |

**Proportions:** about 60% Paper and White, 25% Harbor (bands, headings), 12% neutrals and Crew Green, 3% Brass. If Brass shows up more than once per viewport, take one away.

Tokens go in `app/globals.css` as Tailwind 4 `@theme` variables (`--color-harbor`, `--color-crew`, `--color-brass`, …) so utilities read `bg-harbor`, `text-crew`, `bg-brass`.

### 2.4 Typography

All three load through `next/font/google`, self-hosted at build time with no layout shift. None of them is used by Rankoya (Geist) or Viktor (Lato).

| Role | Font | Settings |
| --- | --- | --- |
| Display (h1, h2, big numbers) | **Bricolage Grotesque** (variable) | 600 to 700, `opsz` auto, tracking -0.02em |
| Body and UI | **Instrument Sans** (variable) | 400 / 500 / 600, 16px base, line-height 1.6 |
| Mono (file names, code, numbers in mockups) | **JetBrains Mono** | 400 / 500, `tabular-nums` |

Fluid type scale (utilities in `globals.css`):

| Token | Size | Use |
| --- | --- | --- |
| `text-hero` | `clamp(2.75rem, 1.6rem + 4.6vw, 5.5rem)` / 1.0 | h1 |
| `text-section` | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)` / 1.05 | h2 |
| `text-title` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)` / 1.25 | h3, card titles |
| `text-lead` | `clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)` / 1.55 | Sub-headlines |
| `text-body` | 1rem / 1.6 | Body |
| `text-small` | 0.875rem / 1.5 | Meta |
| `text-eyebrow` | 0.75rem, 600, uppercase, tracking 0.12em | Section labels |

### 2.5 Shape, depth and motion

- **Radius:** 14px cards, 999px buttons and pills, 22px large panels (preview frame, final CTA). Buttons are pills, which separates Crewhir from Rankoya's 8px buttons.
- **Depth:** 1px Rope borders plus one soft shadow token `0 1px 2px rgb(13 31 28 / .06), 0 8px 24px -12px rgb(13 31 28 / .18)`. No glass blur, no glow.
- **Texture:** a 4% opacity grain on Harbor bands (an inline SVG noise data URI, tiny) for warmth.
- **Signature detail, the "handoff tick":** a Crew Green check that draws itself (stroke animation, 400ms) whenever Crewhir finishes something in a mockup. It's used in the hero, how-it-works and use cases. This is the brand's recurring motion.
- **Motion rules:** 300 to 600ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 60 to 90ms. Animate only transform and opacity. Nothing loops except the marquee and the typing indicator. `prefers-reduced-motion` gets final states only.

### 2.6 Logo brief

**Concept (primary):** a speech bubble whose tail forms a check mark. It reads "message in, work done". Drawn as one continuous stroke in Harbor, with the check's end point in Brass as the signature dot.

Alternates to explore:
1. A lowercase **c** that closes into a check.
2. Two overlapping rounded squares (the crew), with the front one carrying a check.
3. An ID-badge shape (the hire) with a check punched out.

**Wordmark:** lowercase "crewhir", Bricolage Grotesque 700, tracking -0.03em, Harbor on light and Foam on dark.

| Variant | Background | Symbol | Wordmark | Dot |
| --- | --- | --- | --- | --- |
| Primary | Paper / White | `#0D1F1C` | `#0D1F1C` | `#F5B83D` |
| Reversed | `#0D1F1C` | `#EAF2EE` | `#EAF2EE` | `#F5B83D` |
| On green | `#0F7353` | `#FFFFFF` | `#FFFFFF` | `#F5B83D` |
| Mono | any | one colour | one colour | same colour |

Lockups: horizontal (main), stacked, symbol only. Minimum symbol size 16px. Clear space is 2× the dot diameter.

**Logo prompt (starter):**
> Minimal flat vector logo for "crewhir", an AI teammate that works inside team chat. Symbol: a rounded speech bubble drawn with one thick continuous stroke, the bubble's tail turning into a check mark; the check's end point is a small solid amber circle (#F5B83D). Symbol and lowercase wordmark "crewhir" in deep green-black #0D1F1C, wordmark in a characterful grotesque sans, bold, tight letter-spacing, to the right of the symbol. Warm off-white background #F6F4EE. Calm, dependable, premium SaaS. No gradients, no glow, no robots, no sparkles, no 3D, no extra text.

**Favicon / app icon:** symbol only, Foam on a Harbor rounded-square tile, Brass dot. Files: `favicon.ico` (16/32/48), `icon.svg`, `icon.png` 512, `apple-icon.png` 180 (opaque, square), `opengraph-image` generated in code (section 7).

**Integration marks:** official logos only, from each vendor's brand page (Slack, Microsoft Teams, Google, Notion, Stripe, GitHub, HubSpot, Linear, Jira and the rest). Stored as SVG in `assets/integrations/`. Never redrawn, recoloured or put inside a chat bubble.

### 2.7 Visual don'ts

No violet, indigo, peach or blue-and-navy (those belong to Viktor and Rankoya). No robots, brains, sparkles, wands or rockets. No stock photos. No glowing orbs. No fake Slack or Teams screenshots. No emoji in UI copy.

---

## 3. Dependencies (unique to Crewhir)

Each one is picked for Crewhir. The right-hand column shows how it differs from Rankoya's stack.

### 3.1 Install

```bash
npx create-next-app@16.4.0 crewhir --ts --eslint --tailwind --app --no-src-dir --import-alias "@/*" --turbopack
cd crewhir

# runtime
npm i gsap @gsap/react radix-ui tailwind-variants tailwind-merge @phosphor-icons/react @vercel/analytics

# dev
npm i -D prettier prettier-plugin-tailwindcss schema-dts
```

Pin exact versions in `package.json` after install (`npm pkg set` or remove the `^`), and commit the lockfile.

### 3.2 What each one is for

| Package | Purpose | vs Rankoya |
| --- | --- | --- |
| `next` 16.4, `react` / `react-dom` 19.3 | Framework | Same framework (shared platform), different config: no `cacheComponents` experiments in v1, plain static export of 4 routes |
| `tailwindcss` 4 + `@tailwindcss/postcss` | Styling, `@theme` tokens | Rankoya compiles through the `@tailwindcss/turbopack` loader. Crewhir uses the documented PostCSS path that `create-next-app` sets up. |
| `gsap` + `@gsap/react` | Timeline animation for the chat mockup (typing, message stagger, tick draw), `ScrollTrigger` for scroll reveals, `gsap.matchMedia()` for reduced motion | Rankoya uses `motion` |
| `radix-ui` (unified package) | Accessible primitives: `NavigationMenu` (header), `Dialog` (mobile menu), `Tabs` (preview switch, use cases), `Accordion` (FAQ), `Slot` (button `asChild`) | Rankoya hand-rolls its menu and FAQ (`<details>`) |
| `tailwind-variants` (+ `tailwind-merge` peer) | Component variants with slots and class merging in one API | Rankoya uses `class-variance-authority` + `clsx` + `tailwind-merge` |
| `@phosphor-icons/react` | Icons, "regular" weight, `/ssr` import for server components | Rankoya uses `lucide-react` |
| `@vercel/analytics` | Cookieless page analytics, so no consent banner | Rankoya left analytics open |
| `schema-dts` (dev) | Typed JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`) | Rankoya types JSON-LD by hand |
| `prettier` + `prettier-plugin-tailwindcss` (dev) | Formatting and class sorting | Shared tooling, own config |

**Not added in v1:** `next-themes` (no toggle, D1), MDX (legal content is typed TS, D6), a smooth-scroll library (hurts accessibility and native scroll), a carousel library (CSS scroll-snap is enough).

### 3.3 Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "check": "npm run lint && npm run typecheck && npm run format:check && npm run build"
}
```

### 3.4 GSAP usage rules

- Every animated component is `"use client"` and uses `useGSAP()` with a scoped `ref` (automatic cleanup, safe under React 19 Strict Mode).
- Register plugins once in `lib/gsap.ts`: `gsap.registerPlugin(useGSAP, ScrollTrigger)`.
- Wrap every timeline in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`. In the reduced branch, set the final state with `gsap.set`.
- Never animate the h1, sub-headline or primary CTA in. They render visible for LCP.
- Mockup timelines start when 30% visible (`ScrollTrigger` `start: "top 70%"`) and play once.

---

## 4. Page structure

| # | Section | Anchor | Viktor equivalent | Phase |
| --- | --- | --- | --- | --- |
| 1 | Header | none | Header | 2 |
| 2 | Hero + chat preview | `#top` | Hero + Slack/Teams preview | 2 |
| 3 | Works-with marquee | `#works-with` | Logo strip (ours: integrations, D4) | 2 |
| 4 | Comparison by task | `#why` | "You've tried the AI tools" table | 3 |
| 5 | Three pillars | `#different` | "What makes Viktor different" | 3 |
| 6 | How it works | `#how-it-works` | Connect, Ask, Delivered | 3 |
| 7 | Use cases by team | `#use-cases` | Use cases | 4 |
| 8 | Control and approvals | `#control` | "Autonomous, not unsupervised" | 4 |
| 9 | Security and privacy | `#security` | Security FAQ + badge | 4 |
| 10 | Testimonials (hidden until real) | `#stories` | Testimonials | 5 |
| 11 | Ask your AI about Crewhir | `#ask-ai` | "Ask AI about Viktor" | 5 |
| 12 | Pricing teaser | `#pricing` | "Start free. Pay only when you're ready." | 5 |
| 13 | FAQ | `#faq` | Grouped FAQ | 5 |
| 14 | Final CTA | none | Bottom CTA | 6 |
| 15 | Footer | none | Footer | 1 / 6 |
| + | Legal pages | `/privacy-policy`, `/terms-of-service`, `/refund-policy` | `/legal/*` | 6 |

Header nav (v1, all anchors on `/`): **How it works · Use cases · Security · Pricing · FAQ**. It switches to page routes when those pages exist.

---

## 5. File structure

```
crewhir/
├── app/
│   ├── layout.tsx                 fonts, metadata, viewport, Analytics, JSON-LD, skip link
│   ├── page.tsx                   section composition
│   ├── globals.css                @theme tokens, type scale, grain, focus, reduced motion
│   ├── opengraph-image.tsx        1200×630 Harbor card: lockup + "Consider it done."
│   ├── robots.ts, sitemap.ts
│   ├── icon.svg, icon.png, apple-icon.png, favicon.ico
│   ├── not-found.tsx
│   └── (legal)/
│       ├── layout.tsx             legal header + footer
│       ├── privacy-policy/page.tsx
│       ├── terms-of-service/page.tsx
│       └── refund-policy/page.tsx
├── assets/
│   ├── brand/                     logo-*.svg, mark-*.svg
│   └── integrations/              official SVG marks
├── components/
│   ├── brand/                     logo.tsx, integration-mark.tsx
│   ├── layout/                    header.tsx, mobile-nav.tsx, footer.tsx, skip-link.tsx
│   ├── legal/                     legal-document.tsx, legal-toc.tsx
│   ├── mockups/                   chat-frame.tsx, chat-message.tsx, file-card.tsx,
│   │                              approval-card.tsx, handoff-tick.tsx, hero-chat.tsx,
│   │                              use-case-chat.tsx
│   ├── sections/                  hero.tsx, works-with.tsx, comparison.tsx, pillars.tsx,
│   │                              how-it-works.tsx, use-cases.tsx, control.tsx, security.tsx,
│   │                              testimonials.tsx, ask-ai.tsx, pricing-teaser.tsx, faq.tsx,
│   │                              final-cta.tsx
│   └── ui/                        button.tsx, container.tsx, section.tsx, eyebrow.tsx,
│                                  pill.tsx, reveal.tsx
├── content/                       one module per section (copy + mock data) + legal.ts + proof.ts
├── lib/                           site.ts, gsap.ts, json-ld.ts, tv.ts
└── docs/IMPLEMENTATION_PLAN.md    copy of this file
```

---

## 6. Section specs and copy

All copy below goes into `content/*.ts`. Values in `{BRACES}` are placeholders, set once in `content/proof.ts` or `lib/site.ts`. A line containing a placeholder is **hidden** until it has a value, so nothing ships with an invented number.

### 6.1 Header

- Sticky. Transparent on Paper at top; White with a Rope bottom border after 8px of scroll (passive listener, state flips only at the threshold).
- Left: logo. Centre (≥ `lg`): Radix `NavigationMenu` with the 5 anchor links. Right: "Log in" (ghost) and **"Start free"** (Crew Green pill).
- Below `lg`: menu button opens a Radix `Dialog` sheet (focus trap, Escape, scroll lock and focus return come with Radix) with the links and both CTAs stacked.

### 6.2 Hero

- **Eyebrow pill:** `● Now in Slack and Microsoft Teams` (Brass live dot)
- **H1:** Your crew, plus one.
- **Sub:** Crewhir is an AI teammate that lives in Slack and Microsoft Teams. Connect your tools, ask in plain words, and get finished work back: reports, dashboards, code and campaigns.
- **CTAs:** `Start free` (primary) · `Book a demo` (secondary, outline)
- **Trust line** (each item shows only if true): `{FREE_CREDITS} in free credits` · `No card needed` · `Set up in minutes` · `{COMPLIANCE_BADGE}`
- **Preview (right on `lg+`, below on mobile):** `HeroChat` inside a 22px-radius Harbor panel with grain.
  - Radix `Tabs` switch: `Slack` / `Teams`. It changes only the frame's channel label and accent strip (neutral Crewhir chrome, D5).
  - Channel `# growth`. Timeline (GSAP, plays once):
    1. **Maya (Head of Growth):** "@Crewhir pull last month's ad spend by channel and flag anything over budget"
    2. Crewhir typing indicator (3 dots, 1.2s)
    3. **Crewhir:** "On it. Pulling from Google Ads, Meta and your budget sheet."
    4. Three tool chips tick in one by one with the handoff tick: `Google Ads ✓` `Meta Ads ✓` `Budget sheet ✓`
    5. **Crewhir:** "Done. Spend was $48,210 against a $45,000 budget. Two campaigns ran over." File card: `ad-spend-audit-sep.pdf · 6 pages`
    6. Approval card (Brass edge): "Pause *Retargeting – Broad* and *Lookalike 3%* until Monday?" Buttons `Approve` · `Review first`
  - The mock data is clearly fictional (company "Lumen Bikes"). Text alternative: "Example: Crewhir audits ad spend in a Slack channel, returns a PDF and asks before pausing two campaigns."

### 6.3 Works-with marquee

- **Label:** Works with the tools your team already uses
- Official marks: Slack, Microsoft Teams, Google Workspace, Google Ads, Notion, Stripe, GitHub, HubSpot, Linear, Jira, Salesforce, Shopify, Airtable, Meta Ads. **Only integrations that actually exist at launch** (Q5).
- CSS-only marquee (two tracks, the duplicate `aria-hidden`), pauses on hover and focus, static under reduced motion, edge fade masks. A visually hidden `<ul>` lists the names.
- Trailing link: `See all {INTEGRATION_COUNT} integrations →` (hidden until counted; there's no integrations page in v1, so it points to `#faq` "What tools does Crewhir connect to?").

### 6.4 Comparison by task

- **Eyebrow:** Why Crewhir
- **H2:** Most AI tools give you advice. Crewhir gives you the finished thing.
- Table (stacked cards below `md`). Columns: *The task* · *Typical AI tool* · *Crewhir*

| The task | Typical AI tool | Crewhir |
| --- | --- | --- |
| Audit ad spend | A chat assistant explains how to do the audit. | Pulls the numbers, does the audit and posts a PDF in the channel. |
| Follow up after a meeting | A meeting bot writes a summary. | Creates the tasks, sends the follow-ups and updates the CRM. |
| Automate a workflow | An automation builder runs the rules you write. | Spots the repetitive work, proposes the automation and runs it after you approve. |
| Build an internal tool | A coding assistant writes code and leaves the rest to you. | Builds it, deploys it and sends you the link. |

- The Crewhir column has a Mint fill and starts each cell with the handoff tick. Nothing relies on colour alone.

### 6.5 Three pillars

- **Eyebrow:** What makes it different
- **H2:** A teammate, not another tab.

1. **It does the work, not the write-up.** Crewhir runs the queries, builds the files and ships the change. You get the result, not a to-do list.
2. **It works across your tools.** One request can touch your CRM, ad accounts, docs and code. Connect a tool once and the whole team can use it.
3. **It learns how your team works.** Crewhir keeps notes on your processes, names and preferences, so the tenth request needs less explaining than the first.

Each card has a small coded vignette (a tool chip row, a connected-apps fan, a notes card with "Learned: Monday reports go to #leadership").

### 6.6 How it works

- **Eyebrow:** How it works
- **H2:** From invite to first result in one sitting.

| Step | Title | Copy |
| --- | --- | --- |
| 1 | Add Crewhir to your workspace | Install it from the Slack App Directory or Microsoft Teams, then connect the tools you want it to use. |
| 2 | Ask like you'd ask a colleague | Mention @Crewhir in any channel it's in: "Turn this week's feedback into tickets" or "Send me revenue by plan every Monday." |
| 3 | Get the finished work back | Crewhir does the work across your tools and replies with the file, the link or the change, and offers to make it recurring. |

Horizontal three-up on `lg+` with a connecting line that draws on scroll; a vertical timeline below `lg`. CTA under the steps: `Start free`.

### 6.7 Use cases by team

- **Eyebrow:** Use cases
- **H2:** One hire, every team.
- Radix `Tabs`: **Founders · Marketing · Engineering · Operations & Finance**. Each tab has 4 items on the left and a `UseCaseChat` mini-thread on the right (one exchange, ending with the handoff tick).

**Founders**
- **Daily numbers in Slack:** revenue, signups and burn posted every morning, with what changed and why.
- **Investor updates:** a monthly draft pulled from your metrics, ready for you to edit.
- **Outbound:** lead lists researched and sequences drafted for your review.
- **Internal tools:** describe the tool, get a working web app and a link.
- *Mini-thread:* "@Crewhir draft the October investor update" → "Draft's ready: MRR +8%, 3 new logos, runway 19 months. Doc linked."

**Marketing**
- **Ad performance:** spend, CPA and ROAS across channels, with where to move budget.
- **Content engine:** briefs, drafts and a publishing schedule that keeps running.
- **Lead sourcing:** target accounts found and enriched in your CRM.
- **Reports:** a weekly PDF your leadership will actually read.
- *Mini-thread:* "@Crewhir which channel had the cheapest signups last week?" → "Search: $18 per signup, down 12%. Meta: $31. Chart attached."

**Engineering**
- **Bug triage:** reports turned into scoped tickets with steps to reproduce.
- **Code contributions:** small fixes on a branch, opened as a pull request for review.
- **Internal tools:** full-stack apps for the team, built and deployed.
- **Incident follow-up:** timelines written and action items chased until closed.
- *Mini-thread:* "@Crewhir the export button 500s on large workspaces" → "Found it: the query has no pagination. PR #482 is open for review."

**Operations & Finance**
- **Board packs:** numbers, charts and commentary assembled from your sources.
- **Invoices and contracts:** key terms pulled out and logged where you track them.
- **Forecasts:** refreshed on schedule when new actuals land.
- **Cross-team nudges:** owners reminded and data synced between tools.
- *Mini-thread:* "@Crewhir refresh the Q4 forecast with September actuals" → "Updated. Revenue tracking 3% under plan, mostly from the delayed enterprise deal. Sheet linked."

CTA: `Start free`

### 6.8 Control and approvals (Harbor band)

- **Eyebrow:** In your control
- **H2:** Works on its own. Checks in when it counts.
- **Sub:** Crewhir handles routine work without waiting on you, and asks a person before anything high-stakes. You decide where that line sits.
- Three points with icons:
  - **Approval before high-stakes actions.** Sending external email, spending money, deleting data and changing its own access always need a yes.
  - **You set the rules.** Turn action types on or off, or require approval per tool.
  - **Every action is logged.** See who asked, what Crewhir did and who approved it.
- Visual: the approval card from the hero, larger, on Harbor 2, with the Brass edge and a small audit-log list under it.
- These promises must match the Terms ("AI Functionality and Autonomous Actions") and the product. Confirm the high-risk list (Q6).

### 6.9 Security and privacy

- **Eyebrow:** Security
- **H2:** Your data stays your team's.
- Four cards:
  - **Only what it's invited to.** Crewhir reads the channels it's added to and the tools you connect. Nothing else.
  - **Never used to train AI models.** Your messages and data power your workspace only.
  - **Encrypted everywhere.** Encrypted in transit and at rest. Workspaces are isolated from each other.
  - **Delete anytime.** Disconnect a tool or remove your data whenever you choose.
- Badge row: `{COMPLIANCE_BADGE}` (hidden until real) · link `Read our privacy policy →`
- Every claim here must be true and match the Privacy Policy (legal plan §3).

### 6.10 Testimonials (built, hidden)

- **H2:** Teams that hired Crewhir
- A 3-card grid: quote, name, role, company, optional "time saved" chip. Renders only when `content/proof.ts` has 3 or more entries marked `verified: true`.

### 6.11 Ask your AI about Crewhir

- **H2:** Don't take our word for it. Ask your AI.
- **Sub:** Open your assistant with this question already filled in.
- Buttons: `Ask ChatGPT` · `Ask Claude` · `Ask Perplexity`, each linking with a URL-encoded prompt: *"What is Crewhir (crewhir.com)? What does it do well, where does it fall short, and what kind of team is it best for?"*
- Plain text buttons with the vendor's mark beside the label, `rel="noopener"`, opening in a new tab.

### 6.12 Pricing teaser

- **Eyebrow:** Pricing
- **H2:** Start free. Pay when it's pulling its weight.
- **Sub:** Every workspace starts with `{FREE_CREDITS}` in free credits. No card, no sales call.
- Price line: `Paid plans from {STARTING_PRICE}/month` (hidden until set)
- Included list: Slack and Microsoft Teams · `{INTEGRATION_COUNT}` integrations (hidden until counted) · Reports, dashboards and apps · Code and pull requests · Approvals and audit log · Shared credits for the whole team
- CTAs: `Start free` · `Talk to us` (mailto)
- A full `/pricing` page comes later. Credit terms must match the Terms (legal plan §4, "Credits").

### 6.13 FAQ

Radix `Accordion` (`type="multiple"`), grouped with small headings. Emits `FAQPage` JSON-LD. Each answer should stay under about 60 words.

**The basics**
- **What is Crewhir?** An AI teammate that works inside Slack and Microsoft Teams. You ask it for work in plain words, and it uses your connected tools to do that work and hand back the result.
- **How is it different from a chat assistant?** A chat assistant answers questions. Crewhir connects to your live tools, takes actions, produces files and apps, and runs recurring jobs on a schedule.
- **What tools does Crewhir connect to?** `{INTEGRATION_LIST_SUMMARY}`. If a tool you need is missing, tell us.
- **What if it can't do something?** It says so, and tells you what it would need, rather than guessing.
- **Can Crewhir make mistakes?** Yes. It checks its own work, shows its sources and asks before high-stakes actions. Review important output before you rely on it.

**Setup and team use**
- **How long does setup take?** Minutes: install the app, then connect the tools you want it to use.
- **Can my whole team use it?** Yes. Anyone in a channel Crewhir has joined can @mention it. Credits are shared across the workspace.
- **How does it learn about my team?** From the channels it's in and the corrections you give it. It keeps notes you can review and edit.

**Data and privacy**
- **Can Crewhir read all my messages?** No. Only channels it has been added to, and direct messages sent to it.
- **Is my data used to train AI models?** No. Your data powers your workspace only, and our AI providers don't train on it either.
- **Are connected tools shared with my team?** Yes. A connection works for everyone in the workspace, so only connect accounts the whole team should use.
- **Can I delete my data?** Yes. Remove the app or contact `{SUPPORT_EMAIL}`, and we delete it on the schedule in our privacy policy.

**Billing**
- **How do credits work?** Work uses credits from your workspace's shared balance. You start with `{FREE_CREDITS}` free, and paid plans add a monthly allowance.
- **Can I get a refund?** Yes, within 14 days of your first purchase. See the refund policy.

### 6.14 Final CTA (Harbor band, 22px panel)

- **H2:** Consider it done.
- **Sub:** Add Crewhir to your workspace and hand it the first thing on your list.
- CTA: `Start free` · a small line `No card needed` (if true)
- Decorative: a large handoff tick drawing once on view.

### 6.15 Footer (Harbor)

- Logo (reversed) + tagline "Consider it done."
- Columns in v1 (each link must resolve):
  - **Product:** How it works · Use cases · Security · Pricing · FAQ (anchors)
  - **Company:** Contact (`mailto:{CONTACT_EMAIL}`) · Book a demo
  - **Legal:** Privacy policy · Terms of service · Refund policy
- Bottom row: `© 2026 {COMPANY}` (a constant, not `new Date()`) · "Slack is a trademark of Slack Technologies, LLC. Microsoft Teams is a trademark of Microsoft Corporation. Crewhir is not affiliated with either."
- Columns for Solutions, Compare, Resources and Integrations get added when those pages exist (Viktor's footer is the target).

### 6.16 Legal pages

- Routes: `/privacy-policy`, `/terms-of-service`, `/refund-policy` under `app/(legal)/`.
- Content: `content/legal.ts`, with the `LegalDocument` shape and text from `docs/crewhir_legal_pages_plan.md` (Privacy §3, Terms §4, Refund §5 unchanged).
- Layout (Crewhir's own):
  - Slim header: logo, links between the three documents, `Start free`.
  - Two columns on `lg+`: a sticky table of contents (generated from section headings; the active section is highlighted with `IntersectionObserver`) and the document at 68ch.
  - Single column below `lg` with a "Contents" disclosure at the top.
  - Eyebrow "Legal", h1, "Last updated {date}" with a `<time dateTime>`, sections with `id` anchors and a link icon on hover.
  - Emails and URLs are linkified, with `lang="en"` on the article.
- Public, indexable, linked from the footer and the sign-up flow. These same URLs go into the Slack, Teams, Google OAuth and Paddle configurations.

---

## 7. SEO, metadata and accessibility

- `layout.tsx`: `metadataBase` from `SITE_URL`; title template `%s · Crewhir` with the default "Crewhir: the AI teammate in Slack and Microsoft Teams"; description (the hero sub); canonical; Open Graph + Twitter `summary_large_image`; `viewport.themeColor` `#F6F4EE`.
- `opengraph-image.tsx`: Harbor background, grain, reversed lockup, "Consider it done." in Bricolage. Fonts loaded from Google Fonts at the edge.
- JSON-LD (typed with `schema-dts`): `Organization`, `SoftwareApplication` (`applicationCategory: BusinessApplication`, `offers` only once a price exists), `FAQPage`.
- `robots.ts`: `noindex` when `VERCEL_ENV !== "production"`. `sitemap.ts`: the 4 routes.
- Accessibility (WCAG 2.2 AA in every phase, not just at the end):
  - skip link
  - one h1 per page
  - `scroll-margin-top` on anchored sections
  - a visible 2px Crew Green focus ring with a 2px offset
  - 44px minimum touch targets
  - mockups `aria-hidden` with a text summary
  - colour is never the only signal
  - every contrast pair checked (section 2.3 lists the ratios)
  - marquee and animations respect reduced motion

---

## 8. Phases

Every phase must pass `npm run check`, a keyboard-only pass, 375 / 768 / 1280 / 1536px checks, a reduced-motion check and the banned-words grep (section 9).

### Phase 1: Foundation
- Scaffold (section 3.1), pin versions, Prettier config, scripts.
- `globals.css`: `@theme` colour tokens (section 2.3), fluid type scale (section 2.4), radius and shadow tokens, grain utility, focus ring, selection colour (Mint), reduced-motion reset.
- Fonts via `next/font/google` as CSS variables (`--font-display`, `--font-sans`, `--font-mono`) mapped into `@theme`.
- `lib/site.ts` (URLs, nav, legal links), `content/proof.ts` (all placeholders, null by default), `lib/gsap.ts`, `lib/tv.ts`.
- UI primitives: `Button` (tailwind-variants: primary / secondary / ghost / on-dark, sizes, `asChild` through Radix `Slot`), `Container`, `Section`, `Eyebrow`, `Pill`, `Reveal`.
- Brand: `Logo` (SVG, light and reversed), `IntegrationMark`.
- Metadata files, robots, sitemap, icons. Footer shell. Remove the `create-next-app` boilerplate.
- **Done when:** the shell builds, Lighthouse SEO is 100, and `/robots.txt`, `/sitemap.xml` and `/opengraph-image` resolve.

### Phase 2: Header, hero, preview, marquee
- Header + mobile sheet (6.1), hero (6.2) with `HeroChat` and its GSAP timeline, works-with marquee (6.3).
- **Done when:** the h1 is the LCP element and paints without JS, the hero timeline plays once and is static under reduced motion, the menu passes keyboard and screen-reader checks, and the Slack/Teams switch works with arrow keys.

### Phase 3: Comparison, pillars, how it works
- Sections 6.4 to 6.6, the scroll-drawn timeline line, and the handoff tick component reused across them.
- **Done when:** the comparison table reads correctly as stacked cards at 375px and as a real `<table>` with headers at `md+`.

### Phase 4: Use cases, control, security
- Sections 6.7 to 6.9. The use-case tabs are linkable (`#use-cases?team=engineering` updates on change with `history.replaceState`).
- **Done when:** the claims in 6.8 and 6.9 have been checked against the Privacy Policy and Terms drafts.

### Phase 5: Ask AI, pricing teaser, FAQ, testimonials scaffold
- Sections 6.10 to 6.13, plus `FAQPage` JSON-LD.
- **Done when:** the placeholder-hiding works (fill `proof.ts` in dev and every hidden line appears; clear it and they all disappear).

### Phase 6: Final CTA, full footer, legal pages
- Sections 6.14 to 6.16. Port the legal content from the legal plan.
- **Done when:** all three legal pages load signed out on a preview URL, the table of contents tracks the scroll position, and the legal plan's approval checklist passes.

### Phase 7: Polish and QA
- Motion review, Lighthouse ≥ 95 on all four categories on mobile, Chrome / Firefox / Safari / iOS Safari / Android Chrome, NVDA and VoiceOver passes, image and font weight audit (initial JS for `/` under 120 KB gzip, GSAP loaded only in client islands), final copy pass.

---

## 9. Copy and brand rules (enforced in review)

- Sentence case, no exclamation marks, verbs first.
- Banned-words grep: `rg -i "supercharge|unleash|revolutioni[sz]e|magic|game.?changer|seamless|effortless|10x|cutting.?edge|robot|ninja|wizard" content components app`
- Brass appears at most once per viewport and is never a gradient. No violet, indigo, peach or blue-and-navy.
- No invented numbers, logos, ratings, certifications or testimonials (D3). Placeholders stay hidden.
- Product promises (data access, training, approvals, deletion, credits) must match the legal pages word for word in meaning.
- Never draw or alter third-party logos. Include the trademark line in the footer.

---

## 10. Deployment and environment

| Variable | Default | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://crewhir.com` | `metadataBase`, canonical, sitemap, OG |
| `NEXT_PUBLIC_APP_URL` | `https://app.crewhir.com` | Sign-up / sign-in links |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@crewhir.com` | Demo, contact, footer |

- Vercel project of its own, apex domain plus a `www` redirect, previews `noindex`.
- `@vercel/analytics` in `layout.tsx` is cookieless, so no banner is needed. Revisit if ad pixels are added (and update the Privacy Policy's cookies section first).

---

## 11. Open questions for the product owner

| # | Question | Default |
| --- | --- | --- |
| Q1 | Repo location and name | `landing_page/crewhir/`, its own git repo |
| Q2 | Domains | `crewhir.com`, `app.crewhir.com` |
| Q3 | Free credit amount, starting price, "no card needed" true? | All hidden until confirmed |
| Q4 | Booking link for "Book a demo" | `mailto:` contact email |
| Q5 | Integrations live at launch, and the total count | Slack + Teams + the confirmed list only |
| Q6 | The high-risk actions that always need approval | External email, payments, deleting data, changing Crewhir's own access |
| Q7 | Any compliance certification (SOC 2 etc.)? | None shown |
| Q8 | Logo: generate from the section 2.6 brief, or is a designer making one? | Generate from the brief, pick 1 of 4 |
| Q9 | Does Crewhir host the apps it builds (affects copy in 6.7 and the Terms)? | Yes |
| Q10 | Hero line: keep "Your crew, plus one." or try an alternative ("Consider it done." as h1, "Hire the work, not the headcount.") | Keep |

---

### Sources

- https://viktor.com/ (section flow, features, FAQ themes, pricing model; visual palette noted so Crewhir avoids it)
- `docs/landing_page_implementation_Plan.md` (Rankoya plan, used only for plan format and QA discipline)
- `docs/crewhir_legal_pages_plan.md` (legal content and approval requirements)
