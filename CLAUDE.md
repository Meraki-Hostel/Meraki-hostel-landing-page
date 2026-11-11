# CLAUDE.md — StayPookie Landing & Purchase Site

Persistent guidance for Claude Code and contributors. Keep this file short; details live in `specs/`. Last updated 2026-11-11.

## Project identity

- **Name:** StayPookie (final; renamed from the working name "Meraki" before this site's current build). Brand identity stays configurable from one place (`src/config/brand.ts`).
- **Purpose:** the public marketing + plan-purchase website for StayPookie, hostel & PG management SaaS for owners and operators in India.
- **Problem it sells against:** operators track occupancy, tenants, rent and operations across notebooks, spreadsheets, chat messages and memory — scattered records, manual rent tracking, unclear occupancy, repeated follow-ups.
- **Stage:** the real product is live. StayPookie's actual application (owner/manager/student dashboards, database, API, auth, billing) is a separate, fully-built codebase — not this repo. **This repo is the marketing + purchase site only**: it describes the real product and lets a visitor buy a plan. It has no dashboard and no product data of its own.
- **Positioning:** "Run your hostel. Not your paperwork."

## Product boundaries

- StayPookie is real operator software — not a marketplace or listing site, not for accommodation seekers, no tenant-facing app from this site. (The real product does have a student-facing portal, but that's part of the actual application, not this marketing site.)
- **This site sells access, it doesn't provide it.** There is no self-serve login or signup here by design: a visitor picks a plan, pays, and the StayPookie team manually provisions their account afterward (an internal admin tool exists for this, in a separate repo) and emails login details. Never add a login/signup form to this site.
- Copy is confident and present-tense — StayPookie is a live, working product, not something "being built" or "designed to." Never hedge a real capability.
- The real, currently-live feature set (confirm against the real backend before adding anything not on this list, and update this list the day a new feature ships): rooms, beds and occupancy across single/double/triple/quad rooms with waitlists; tenant admission, profiles and move-out; automatic monthly rent generation with pro-rating, configurable due dates and optional late fees; **online rent payment via Razorpay is live today, on every paid tier** — never gate this claim to one plan; manual payment recording, PDF receipts, deposits and refunds; complaints, leave requests and visitor management with status history; maintenance tickets and inventory tracking; staff management across roles; targeted notices/announcements and emergency alerts; owner analytics across a whole portfolio; **multi-property management under one organization is live today**, not "unknown" or "planned."
- Never invent customer counts, testimonials, stats, logos, or claims not on the list above. Never claim a free trial, discount code, or annual-billing option unless one actually exists.

## Pricing & purchase (live on this site)

**Pricing disclosure is currently flagged off** (`src/config/flags.ts`, `flags.showPricing = false`): StayPookie is sourcing design partners rather than selling directly right now, and the ₹ amounts are hidden on the homepage pricing teaser and `/pricing` (cards, comparison table, and the Terms subscription-billing clause), replaced with `pricingFallbackLabel` ("Contact us for pricing"). `/checkout` is intentionally untouched by this flag — a visitor who already has a checkout link must still see the exact charge. Flip `showPricing` back to `true` once prices can be disclosed again; don't hand-edit the individual pages to hide/show prices, they all read from this one flag.

Three real monthly tiers, defined in the real backend's plan catalogue — treat this as the source of truth, and update it here the day pricing changes there:

- **Starter** — ₹1,999/mo: 2 properties, 120 beds, 10 staff.
- **Growth** — ₹4,999/mo ("Most Popular"): 6 properties, 400 beds, 40 staff.
- **Portfolio** — ₹14,999/mo: 25 properties, 2,500 beds, 250 staff; adds priority (phone + dedicated rep) support.
- Prices exclude 18% GST, billed monthly. No tier gates a *feature* like online payment — tier limits are property/bed/staff counts only.
- Purchase flow: plan confirm → buyer details → Razorpay Checkout/Payment Link → confirmation. The confirmation screen and every page near a Pay button must state the same thing: **account setup and login are emailed within 24 hours of payment** — this number must match everywhere (pricing, checkout, Terms). Never let two pages promise different turnaround times.

## Current state (2026-11-11)

- Phases shipped (see git log): design system/brand setup → homepage rebuild (hero, problem, features, roles, how-it-works) → `/pricing` (3-tier comparison) → `/checkout` (Razorpay integration point) → `/about`, `/contact`, `/terms`, `/privacy`, `/refund-policy`. The site is live at staypookie.com.
- Known open issues from the latest QA pass, not yet fixed in code:
  - Homepage/FAQ copy says online payment is available on every tier; the pricing page's feature table still lists it as Portfolio-only — **fix the pricing table to match** (online payment is NOT plan-gated; see "Pricing & purchase" above).
  - Homepage/FAQ promise the team "connects within 2 hours" / "operational day one"; Pricing, Checkout and Terms say "within 24 hours" — **standardize everywhere on 24 hours**.
  - The hero product mockup shows the literal visible text "Product Screenshot Placeholder" to real visitors — replace with a proper empty-state visual, never visible placeholder text.
  - Footer copyright line has a stray double period ("Pvt. Ltd.. All rights").
  - "Talk to Setup Team" / "Talk to us" links point to a `#contact` anchor that may not resolve to a real section id — verify and fix, or point to `/contact` instead.
  - The placeholder phone number (+91 98765 43210) is live on the footer, `/contact`, `/privacy` and `/refund-policy` — replace with the real number before launch.
  - Both `src/app/refund/` and `src/app/refund-policy/` exist — `brand.ts`'s footer links to `/refund-policy`, so check whether `/refund` is a stray duplicate and remove it rather than shipping two routes for the same policy.
  - **The homepage's own design has unaddressed problems independent of any copy/content bug**, found by a first-party audit of the real shipped components (not a Clarion comparison) — see `specs/02` §22 and `specs/04` F11: every section (Problem/Features/Roles/HowItWorks/PricingTeaser/FAQ) uses one identical centred-header-plus-card-grid template with no visual hierarchy between sections; real product photos exist in `src/assets/photos/` but are entirely unused; several sections repeat decorative "status" footer copy that carries no real information; status-tag colours (moss/amber/slate-ink/brick) are used decoratively on non-status cards, diluting their meaning where they're genuine (the hero ledger); four separate CTAs all point at `/pricing` with no escalation in framing; two-thirds of Features content is hidden behind tabs; scroll-reveal motion exists only on Hero and Problem, not the rest of the page; the Roles grid gives the Owner (the actual buyer) the same visual weight as Student (who can't buy anything).
  - `/terms`, `/privacy` and `/refund-policy` are explicitly marked "placeholder — needs legal review before launch" — they need real legal review before this is launch-ready.
- `/api/lead` and the `earlyAccess` block in `site-content.ts` are leftover from an earlier lead-capture-only version of this site, superseded by the real `/checkout` purchase flow. Confirm whether anything still links to them; if nothing does, remove them rather than keeping dead code.

## Technical architecture

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4.3 (App Router, `src/`, Turbopack default), React 19.3.x |
| Language | TypeScript ^5 (5.9.3), strict, alias `@/*` → `./src/*` |
| Styling | Tailwind CSS 4.3.3, CSS-first: tokens in `@theme` in `src/app/globals.css` — the warm ivory/clay/espresso palette shared with the real product's frontend (`staypookie-frontend/src/styles/index.css`), not a separate scheme |
| Lint/format | ESLint flat config + `eslint-config-next` 16.4.3, Prettier 3.9.10 |
| Runtime deps | `zod` only. No UI kit, animation library, form library or icon CDN — icons are inline SVG components |
| Tests | Vitest + @vitejs/plugin-react + jsdom + Testing Library |
| Types | `@types/node` ^22 |
| Hosting | Server-capable (Vercel, or Netlify + `@netlify/plugin-nextjs`) — `/checkout` and `/api/lead` need a server runtime; the rest prerenders static |

**Structure:**

- `src/app/`: `layout.tsx`, `page.tsx` (homepage sections), `pricing/`, `checkout/`, `about/`, `contact/`, `privacy/`, `terms/`, `refund-policy/` (confirm `refund/` isn't a stray duplicate — see "Current state"), `api/lead/route.ts` (legacy, confirm still in use).
- `src/config/`: `brand.ts` (name, nav, CTAs, contact placeholders — already correctly says "StayPookie"), `site-content.ts` (section copy, FAQ, sample/demo data flagged `illustrative: true`), `legal.ts` (draft legal text + review status).
- `src/components/`: `layout/` (SiteHeader, SiteFooter), `ui/`, `preview/` (illustrative product previews), `sections/` (Hero … FinalCta).
- `src/lib/`: schema/validation, env reads, lead/rate-limit helpers.
- `cacheComponents` is on: anything time- or request-dependent in a server component must be cached (`'use cache'` + `cacheLife`, see `CopyrightYear.tsx`) or the page stops prerendering. `server-only` resolves without a package in Next; Vitest aliases it to a stub.
- Every illustrative product preview carries a visible "Illustrative preview · sample data" label and uses obviously fictional names/amounts — keep this honest-disclosure pattern for any mockup, including the hero visual once its placeholder text is replaced.

## Coding conventions

- Follow established project conventions; reuse existing UI components and design tokens. Prefer small, reusable, maintainable components.
- Avoid unnecessary dependencies; justify any new one in `specs/03`.
- **Server Components by default.** Client components only where state/interaction requires it (SiteHeader menu, checkout form steps, FAQ if `<details>` isn't accessible enough).
- **Tokens:** colours, type, spacing and radii live only in `@theme` in `globals.css`. No hard-coded hex values or one-off sizes in components.
- **Brand & content:** name, tagline, nav, CTA labels and contact live in `src/config/brand.ts`; section copy, FAQ and sample data live in `src/config/site-content.ts`. Don't hard-code brand strings or copy in components.
- **Accessibility:** semantic HTML and landmarks, one `h1`, skip link, visible `:focus-visible` rings, ≥44px touch targets, AA contrast, labelled form fields, `prefers-reduced-motion` respected.
- **States:** implement loading, error, empty and success states wherever data or submission is involved — especially checkout and the contact form. Disable the Pay button and show a spinner the instant it's clicked, to prevent double charges.

## UI/UX rules

- Visual identity: warm ivory/sand/cream backgrounds, espresso/bark/dust text, clay accent for CTAs/links, slate-ink/moss/amber/brick as sparing secondary accents for icons/tags only — the same palette as the real product's frontend. Square cards, pill buttons/nav, soft layered shadows (never hard drop-shadows), hard section cuts.
- Motion: ease `cubic-bezier(0.2, 0.8, 0.2, 1)`, 180–240ms for UI-scale transitions, up to 500ms for scroll reveals, nothing slower. Respect `prefers-reduced-motion`. No infinite-loop animation anywhere, especially near the Pay button.
- Copy voice: confident, present-tense, specific over buzzwordy, written to "you" the owner/manager. Never fabricate testimonials, logos, review scores, customer counts, or urgency/scarcity.

## Security & privacy

- Never put secrets or credentials in docs, code, logs or commits. Reference env vars by name only; `.env*` stays git-ignored.
- Never log PII (name, phone, email) on the server or client beyond what's needed to process a purchase or lead.
- **Never fake a successful submission, payment, or integration** — in dev/demo included. Show success on checkout only after Razorpay has actually confirmed payment (webhook or verified signature, never the client's word alone) — this mirrors the real backend's payment rule (verified webhook/signature, never trusted client-side). Show the contact form as disabled with an honest notice if its destination isn't configured, rather than pretending it submitted.
- DPDP Act 2023: notice at collection, unticked consent checkbox linking `/privacy`, data minimisation on the checkout and contact forms. This is not legal advice — the real legal pages need real review before launch (see "Current state").

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint flat config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run format` | Prettier |

## Workflow rules

- **Docs first:** check or update the relevant spec before changing scope or design. When reality changes (a feature ships, a price changes, a bug gets fixed), update this file and the affected spec in the same change.
- Keep the "Current state" open-issues list accurate — remove an item the day it's actually fixed in code, don't let it go stale again.
- Before claiming a product capability in copy, check it against the real backend (or ask) — this file's feature list is the fast check; `specs/06` has the fuller register.

## Documentation index

1. [specs/01-product-requirements.md](specs/01-product-requirements.md): product, audience, goals, conversion, content requirements
2. [specs/02-ui-ux-reference.md](specs/02-ui-ux-reference.md): section map and design reference — **two references, not one**: §§1–21 are a structural comparison against the third-party Clarion Health site; §22 is an independent, first-party design audit of StayPookie's own shipped homepage, equally authoritative and the one to read for homepage-specific design issues
3. [specs/03-technical-architecture.md](specs/03-technical-architecture.md): stack, structure, checkout/lead APIs, env vars, hosting
4. [specs/04-implementation-plan.md](specs/04-implementation-plan.md): shipped phases, remaining tasks, testing, acceptance
5. [specs/05-design-system.md](specs/05-design-system.md): tokens, type, layout, components, motion
6. [specs/06-feature-status.md](specs/06-feature-status.md): real feature register, sourced from the actual backend
