# Crewhir landing site

Marketing site for Crewhir (one landing page and three legal pages), built
from `docs/crewhir_landing_page_implementation_plan.md` and
`docs/crewhir_legal_pages_plan.md`.

The plan was written for Next.js. This repo is the existing **Vite + React 19**
app instead, with the plan's Next-specific pieces swapped out:

| Plan (Next)                           | Here (Vite)                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| App Router routes                     | `src/pages/*` plus static prerendering (`scripts/prerender.mjs`): each route is built to its own HTML file and hydrated |
| `next/font/google`                    | `@fontsource-variable/*` (self-hosted, imported in `src/styles/globals.css`)                                            |
| `metadata`, `robots.ts`, `sitemap.ts` | Head tags, JSON-LD, `robots.txt` and `sitemap.xml` written by the prerender                                             |
| `opengraph-image.tsx`, `icon.*`       | `npm run assets` (`scripts/brand-assets.mjs`, satori + resvg) writes them to `public/`                                  |
| `NEXT_PUBLIC_*`                       | `VITE_*` (see `.env.example`)                                                                                           |
| ESLint                                | oxlint (already in the repo)                                                                                            |

## Scripts

```bash
npm run dev       # dev server (client-rendered)
npm run build     # typecheck, client + SSR build, prerender to dist/
npm run preview   # serve dist/
npm run assets    # re-render icons, favicon and OG image after changing the mark
npm run logos     # copy official integration marks (@iconify-json/logos) into src/assets/integrations
pwsh scripts/avatars.ps1  # re-crop mockup avatars from ../flowcasta/public/avatars
npm run check     # lint, typecheck, format check and build
```

## Where things live

- Copy: `src/content/` (home, FAQ, legal). Unconfirmed claims sit in
  `src/content/proof.ts` and stay hidden while `null`.
- URLs, company facts and nav: `src/lib/site.ts`.
- Brand tokens and type scale: `src/styles/globals.css` (`@theme`).
- Motion: `src/lib/motion.ts` loads GSAP after hydration; reduced motion gets final states.
- Product mockups: `src/components/mockups/platform.tsx` renders one thread as a
  Slack or Microsoft Teams window. The people in them (`src/content/people.ts`)
  are a fictional team at a fictional company, Lumen Bikes.
- Integrations shown on the page: `integrations` in `src/content/home.ts`. Set
  `live: false` on anything that won't ship at launch.
