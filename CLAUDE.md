# CLAUDE.md — Meraki

Persistent guidance for Claude Code and contributors. Keep this file short; details live in `specs/`. Last updated 2026-10-29.

## Project identity
- **Name:** Meraki (temporary brand name; final name is an open question). The name and brand identity must stay configurable from one place (`src/config/brand.ts`).
- **Purpose:** hostel & PG management SaaS for **owners and operators in India**.
- **Problem:** operators track occupancy, tenants, rent and operations across notebooks, spreadsheets, chat messages and memory. That leads to scattered records, manual rent tracking, unclear occupancy and repeated follow-ups.
- **Stage:** pre-product and greenfield. The first thing to build is a marketing landing page with early-access lead capture.
- **Positioning:** "Run your hostel. Not your paperwork."

## Product boundaries
- Meraki is an operator tool. It is **not** a marketplace or listing site and is not for accommodation seekers. No tenant app or portal is planned.
- **Nothing in the product is implemented.** No dashboard, database, API, auth or integrations exist.
- Statuses are defined in [specs/06-feature-status.md](specs/06-feature-status.md): Implemented & verified / Partially implemented / Planned / Unknown – needs confirmation / Not planned (do not claim). Never present a Planned, Unknown or Not-planned capability as live.
  - Planned: rooms & beds, occupancy/vacancy, tenant records & allocations, rent tracking, payment records & dues (recorded manually by the operator), property operational records.
  - Unknown: maintenance/complaints, multi-property, plus every §3.2 row in specs/06 (staff roles, reports/exports, reminders, document storage, deposits, utilities, receipts, mobile app, Hindi, pricing, data security, offline). Do not claim any of them.
  - Not planned: automatic UPI reconciliation, online rent collection, tenant portal, integrations (WhatsApp, Tally, banks…).
- Copy uses future or intent phrasing ("is being built to", "designed to"). Never invent customer counts, testimonials, stats, logos, integrations, contact details, a domain or legal text.
- No Log in or Sign up links, because there are no accounts.

## Current state (2026-10-29)
- The landing page is built (Phase B, 2026-10-29) but **not deployed**, and the code is on GitHub at https://github.com/Meraki-Hostel/Meraki-hostel-landing-page (branch `main`, first pushed 2026-10-29). The product itself (dashboard, data, auth) still does not exist.
- **Phase A:** documentation only (this file and the six specs).
- **Phase B** (scaffold and build the landing page) was **approved 2026-10-29** with owner decisions D-1–D-8 in [specs/01 §0](specs/01-product-requirements.md). Hosting is deferred by the owner: do not deploy unless asked.
- Lead capture ships **disabled**. It turns on only when `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are valid **and** `src/config/legal.ts` marks the privacy notice `reviewed` (a code change after owner/legal review).

## Technical architecture (scaffolded 2026-10-29)
| Area | Choice |
|---|---|
| Framework | Next.js 16.4.3 (App Router, `src/`, Turbopack default), React 19.3.x |
| Language | TypeScript ^5 (5.9.3; TS 7 not adopted), strict, alias `@/*` → `./src/*` |
| Styling | Tailwind CSS 4.3.3, CSS-first: tokens in `@theme` in `src/app/globals.css`, `@tailwindcss/turbopack` loader (scaffold default) |
| Lint/format | ESLint flat config + `eslint-config-next` 16.4.3 (bump eslint to ^10), Prettier 3.9.10 |
| Runtime deps added | `zod` 4.6.7 only. No UI kit, animation library, form library or icon CDN. Icons are inline SVG components |
| Tests | Vitest 5.0.5 + @vitejs/plugin-react + jsdom + Testing Library; optional @playwright/test 1.64.1 smoke tests (needs `npx playwright install chromium`) |
| Types | `@types/node` ^22 (matches Node 22; needed for the Vitest peer) |
| Hosting | Server-capable (Vercel, or Netlify with `@netlify/plugin-nextjs`) so `/api/lead` runs; the page itself prerenders static. Static export rejected. No domain, so no canonical URL |

**Structure** (full detail in [specs/03](specs/03-technical-architecture.md)):
- `src/app/`: `layout.tsx` (next/font: Newsreader + Geist; metadata from brand config; skip link), `page.tsx` (composes sections), `globals.css`, `privacy/`, `terms/`, `api/lead/route.ts` (the only backend: zod validation, forwards to `LEAD_WEBHOOK_URL`, honest status codes), optional `opengraph-image.tsx`.
- `src/config/`: `brand.ts`, `site-content.ts` (all copy, FAQ, tab data, illustrative demo data flagged `illustrative: true`), `legal.ts` (draft /privacy and /terms text + `reviewStatus`).
- `src/components/`: `layout/` (SiteHeader, SiteFooter), `ui/` (Button, Container, Section, SectionHeader, Eyebrow, IconBadge, icons, VisuallyHidden), `preview/` (illustrative product previews + PreviewFrame), `sections/` (Hero … FinalCta).
- `src/lib/`: `lead-schema.ts` (shared zod schema), `env.ts` (typed optional env reads; invalid = unset), `lead-config.ts` (`isLeadCaptureEnabled()`), `rate-limit.ts`.
- `cacheComponents` is on: anything time- or request-dependent in a server component must be cached (see `CopyrightYear.tsx`, `'use cache'` + `cacheLife`) or the page stops prerendering.
- `server-only` is resolved by Next without a package; Vitest aliases it to `src/test/server-only-stub.ts`.
- Data models, database, auth and integrations: **none**. The only API is `POST /api/lead`.
- Env var **names** (all optional): `LEAD_WEBHOOK_URL` (server), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_SITE_URL`. Document them in `.env.example` with empty values.
- **Scaffold gotcha:** `create-next-app` cannot target `.` here because the uppercase `HostPG` fails npm naming. Scaffold into a lowercase scratch dir `meraki-landing`, then rsync into the root without overwriting `CLAUDE.md` or `specs/`. See [specs/04](specs/04-implementation-plan.md).
- Once scaffolded, the generated **`AGENTS.md`** points to version-matched Next.js docs in **`node_modules/next/dist/docs/`**. Read those before using Next APIs, and keep `AGENTS.md`. Scaffold `next.config.ts` enables `cacheComponents` and `partialPrefetching`; keep both unless they cause friction.

## Coding conventions
- Follow established project conventions. Reuse existing UI components and design tokens. Prefer small, reusable, maintainable components.
- Avoid unnecessary dependencies; justify any new one in specs/03. Preserve working functionality.
- **Server Components by default.** Use client components only where state or interaction requires it: SiteHeader (menu), PlatformTabs, EarlyAccessForm, and Faq only if native `<details>` cannot be made accessible.
- **Tokens:** colours, type, spacing and radii live only in `@theme` in `src/app/globals.css`. No hard-coded hex values or one-off sizes in components.
- **Brand:** name, tagline, nav, CTA labels and optional contact live in `src/config/brand.ts`. **Content:** all section copy, FAQ and sample data live in `src/config/site-content.ts`. Do not hard-code brand strings or copy in components.
- **Accessibility:** semantic HTML and landmarks, one `h1`, skip link, visible `:focus-visible` rings, ≥44px touch targets, AA contrast, the WAI-ARIA tabs pattern, labelled form fields, and `prefers-reduced-motion` respected.
- **States:** implement loading, error, empty and success states wherever data or submission is involved, especially the early-access form.

## UI/UX rules
- Primary visual reference: **Clarion Health** (https://www.clarionhealth.com/). Follow [specs/02](specs/02-ui-ux-reference.md) (section map, patterns) and [specs/05](specs/05-design-system.md) (tokens). Do not introduce unrelated design patterns.
- Invariants: warm cream bases; **one** deep accent for dark bands; near-black warm ink; light display serif (Newsreader) + Geist body; **square** cards and bands; **pill** buttons and nav; **no shadows**; hard section cuts; nav switches at 992px.
- Every product preview carries a visible **"Illustrative preview · sample data"** label and uses obviously fictional names and ₹ amounts.
- Copy Clarion's relationships, never its assets. Do not copy its brand, hexes, healthcare copy, logos, photos, stats or trial fonts. There is no logo yet, so use a text wordmark.

## Security & privacy
- Never put secrets or credentials in docs, code, logs or commits. Reference env vars **by name only**; `.env*` stays git-ignored.
- Never log PII (lead name, phone, email) on the server or client.
- **Never fake a successful submission or integration**, including for honeypot hits or in dev/demo. Show success only on HTTP 200 + `{ok:true}`, after the destination has acknowledged the lead. If `LEAD_WEBHOOK_URL` is unset (or, **Provisional**, `NEXT_PUBLIC_CONTACT_EMAIL` is unset, so no withdrawal contact exists), return 503 `not_configured` and render the form disabled with an honest notice. Show mailto/tel fallbacks only if those env vars are set. Full behaviour is in specs/03.
- DPDP Act 2023: notice at collection (what, why, how to withdraw), an **unticked** consent checkbox linking `/privacy`, and data minimisation. This is not legal advice; the owner must review `/privacy` and `/terms`.

## Development commands
Verified working on 2026-10-29 (Node 22, npm; `.nvmrc` pins 22):

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (also type-checks). `/` prerenders static; `/api/lead` is dynamic |
| `npm run start` | Serve the production build (`PORT=3100 npm run start` to change port) |
| `npm run lint` | ESLint 10 flat config (`eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` (run `npm run build` once first so Next generates route types such as `LayoutProps`) |
| `npm test` | Vitest: schema, route handler, tabs, form states, content guards |
| `npm run format` | Prettier |

There is no Playwright test suite in the repo; Phase B visual QA used an ad-hoc Playwright script outside the repo.

## Workflow rules
- **Docs first:** check or update the relevant spec before changing behaviour, scope or design. When reality changes (versions, structure, feature status, commands), update `CLAUDE.md` and the affected spec in the same change.
- Feature status changes go to specs/06 first, then to copy and the FAQ.
- Keep open questions in the specs current: lead destination, onboarding process, imagery/logo, brand colour/name, privacy/terms, product scope, git/hosting, and language support.

## Documentation index
1. [specs/01-product-requirements.md](specs/01-product-requirements.md): product, audience, goals, conversion, content requirements
2. [specs/02-ui-ux-reference.md](specs/02-ui-ux-reference.md): Clarion analysis and the Meraki section map
3. [specs/03-technical-architecture.md](specs/03-technical-architecture.md): stack, structure, lead-capture API, env vars, hosting
4. [specs/04-implementation-plan.md](specs/04-implementation-plan.md): Phase B steps, scaffold route, testing, acceptance
5. [specs/05-design-system.md](specs/05-design-system.md): tokens, type, layout, components, motion (**Provisional**)
6. [specs/06-feature-status.md](specs/06-feature-status.md): implemented / planned / unknown / not-planned register
