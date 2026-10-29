# 04 — Implementation plan (Phase B)

Status: **Plan only.** Phase B starts only after the user explicitly approves it (T0). Date: 2026-10-29.
Canonical inputs: [specs/01-product-requirements.md](01-product-requirements.md), [specs/02-ui-ux-reference.md](02-ui-ux-reference.md), [specs/03-technical-architecture.md](03-technical-architecture.md), [specs/05-design-system.md](05-design-system.md), [specs/06-feature-status.md](06-feature-status.md), [CLAUDE.md](../CLAUDE.md). The Phase A decisions brief (2026-10-29) is not kept in the repo; its decisions are recorded in specs/01 (scope, copy, ids), specs/05 (tokens) and specs/06 (statuses), which are the in-repo authority. "Decisions brief §n" below names where a decision came from.

Reference evidence (Clarion Health, https://www.clarionhealth.com/) is cited as `ref: <file> §<n>`. These are the Phase A analyses (`structure.md`, `tokens.md`, `components.md`, `responsive.md`, `stack.md`) plus screenshots at 1440×900, 1024×768, 768×1024 and 390×844 (DPR 1). All of it is **Phase A capture (2026-10-29)**, held in a temporary directory that may be deleted. See T0 item P2.

## How to read this plan

- Tasks are numbered **T0–T26**. Numbers follow the brief's order, with landing sections in page order. **Execution order follows the dependency graph** (§ Dependency graph), which differs from the numbers in one place: **T19 (lead schema + API) should run before T16 (form UI).**
- Every task lists: Objective · Files/components · Dependencies · Expected behaviour · Acceptance criteria (checkable) · Validation steps.
- "Gate" means: run `npm run lint && npm run typecheck && npm run test && npm run build`. All four must exit 0. The gate exists from T1 onwards.
- Section ids and nav links come from specs/01 §7, and statuses from specs/06. They must not drift. Section ids are `hero`, `problem`, `outcomes`, `platform`, `attention`, `features`, `how-it-works`, `getting-started`, `why`, `early-access`, `faq`, `final-cta`.
- **Provisional** marks a decision that can change without re-planning. The default is applied if nobody answers.
- Copy must use intent phrasing ("is being built to", "designed to"). Never invent customer counts, testimonials, stats, logos, integrations, contact details, a domain or legal text (see [specs/06](06-feature-status.md)).

---

## T0 — Approvals & open-question checkpoint

**Objective.** Get explicit user approval for Phase B and record answers to the open questions, or record that the default applies.

**Files/components.** No code. Record answers in the specs they affect: specs/01 for scope and copy, specs/03 for hosting and lead destination, specs/05 for colour and brand. Record git in CLAUDE.md.

**Dependencies.** None.

**Expected behaviour.** Nothing is scaffolded, installed or created until the user says "approve Phase B" or equivalent. A question that blocks *launch* does not block *building*: the build continues with the default and the honest unconfigured state.

**Open questions → tasks they block → default if unanswered**

| # | Question (decisions brief §8) | Blocks | Default if unanswered |
|---|---|---|---|
| Q1 | Lead destination (webhook → Sheet/CRM/automation tool, or email) + fallback contact email/phone. The destination must reply JSON `{ok:true}` only after storing the lead (specs/03 §9.2); plain Zapier Catch Hooks cannot, Make/n8n need an explicit webhook-response step | **Live** capture in T25 scenario 4 (real destination) and the T26 status upgrade. Does **not** block T16/T19. | `LEAD_WEBHOOK_URL` unset → 503 `not_configured` + honest UI notice (disabled form). No mailto/tel links (no contact invented). After T26, lead capture becomes **Partially implemented** in specs/06 (it is **Not started (Phase B)** today). |
| Q2 | Real early-access onboarding process | T14 copy, T17 FAQ 8; **blocks public launch of the step-2/3 wording** | Build with the decisions-brief steps: Request early access → We get in touch to understand your property → Try Meraki early and share feedback → Help shape what we build (flagged in content). If Q2 is still unanswered at launch, switch to the non-committal variant in specs/01 OQ-2: Request early access → We review requests as early access opens → Selected operators are invited to try it and share feedback → Help shape what we build. |
| Q3 | Imagery & logo | T7 (hero variant), T18 (final CTA art), T6 (wordmark), T21 (OG image, favicon) | UI-led hero (gradient band + DashboardPreview), CSS-only final CTA, text wordmark from `brand.name`, generated OG image and icon. |
| Q4 | Brand colour approval + final brand name | T2 (token values), T3 (`brand.ts`) | Provisional tokens from specs/05 (deep indigo `#172A46` + warm creams). Name "Meraki" set **only** in `src/config/brand.ts`. |
| Q5 | Privacy notice / terms text, grievance contact, retention | T20, T16 consent copy; **blocks public launch** | `/privacy` gives an honest notice (what, why, withdrawal) and shows a contact only if `NEXT_PUBLIC_CONTACT_EMAIL` is set; otherwise it says the contact will be published before launch. **Enforced in code (Provisional):** lead capture is enabled only when both `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are set (specs/03 §9.4), so no personal data is collected before a withdrawal/grievance contact is published. `/terms` is an honest "Terms will be published before launch" page. Both carry a visible "Draft — pending owner review" note. |
| Q6 | Product scope: maintenance/complaints, multi-property, staff roles | T11 (attention list item), T12 (rows), T17 (FAQ answers) | Stays **Unknown**. Use "Notes to follow up", not "Open issues". No multi-property row. FAQ: "We're exploring it; tell us in the early-access form." Maintenance only in FAQ-safe "where supported" phrasing. |
| Q7 | `git init` before Phase B? Hosting (Vercel/Netlify)? | T1 (git), T21 (`NEXT_PUBLIC_SITE_URL`), deploy (out of scope) | **No `git init`** without an explicit yes (but strongly recommended). No hosting chosen: validate with `npm run start` locally. No deploy. |
| Q8 | Hindi/regional language support? | T2 (font subsets), T3 (content shape) | English only. `subsets: ["latin"]`. Content stays in one module, so translation can be added later. |

**Plan-level decisions (raised by this plan, not in the decisions brief)**

| # | Decision | Default if unanswered |
|---|---|---|
| P1 | Approve network downloads: npm packages and `npx playwright install chromium` (chromium build v1248 is not cached locally; ref: stack.md §1) | Required for T1 and T25. If refused, T25 screenshot QA becomes manual browser checks at the 4 widths. |
| P2 | Preserve the Clarion reference screenshots for T25? The Phase A capture directory is temporary. | Before Phase A cleanup, copy them to a **git-ignored** `reference/clarion/` folder (never committed, since they are third-party content). If they are gone, recapture the live site at the same 4 viewports during T25. |
| P3 | App location: repo root (decisions brief) vs. a lowercase subfolder (ref: stack.md §2 alternative) | Repo root, via scaffold-then-rsync (T1). |
| P4 | Commit checkpoints after each task (only if git is approved) | Commit only when the user asks. Otherwise, leave changes uncommitted. |
| P5 | Search indexing while the brand name is temporary. Concern: indexing a temporary name may be undesirable. Not covered by the decisions brief. | Follow specs/03 §11.3: indexing allowed, `/api/` disallowed. No extra env var added. Raise again before launch (specs/01 OQ-11). |

**Acceptance criteria.**
- [ ] The user's approval of Phase B appears in the conversation (quote or link).
- [ ] Each row in Q1–Q8 and P1–P5 is marked *answered* (with the answer) or *default applied*.
- [ ] Answers are written into the affected spec(s) before the dependent task starts.

**Validation.** Manual: re-read this table against the user's reply. `ls -A` in the repository root still shows only `CLAUDE.md` and `specs` until T1 begins.

---

## T1 — (Optional) git init, scaffold, post-scaffold deps & scripts

**Objective.** Create a building, linting, type-checking Next.js 16 app in the repo root. Do not touch `CLAUDE.md` or `specs/`.

**Files/components.** Generated by the scaffold: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `next-env.d.ts`, `.gitignore`, `AGENTS.md`, `README.md`, `src/app/{layout.tsx,page.tsx,globals.css,favicon.ico}`, `public/*.svg`. Added: `vitest.config.mts`, `vitest.setup.ts`, `.prettierrc.json`, `.prettierignore`, `.env.example`, `.nvmrc` (`22`), and `"engines": { "node": ">=20.9.0" }` in `package.json` (**Provisional**, specs/03 §3.4 #12).

**Dependencies.** T0 (approval, Q7, P1, P3).

**Steps (exact commands).**
```bash
# Run from the repository root.
REPO="$(pwd)"

# 0. Only if Q7 = yes
git init

# 1. Scaffold in a lowercase scratch dir. `create-next-app .` inside HostPG fails:
#    uppercase npm-name error (ref: stack.md §2).
mkdir -p "$TMPDIR/meraki-scaffold" && cd "$TMPDIR/meraki-scaffold"
CI=1 NEXT_TELEMETRY_DISABLED=1 npx -y create-next-app@16.4.3 meraki-landing \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/*" \
  --use-npm --no-agent-feedback --disable-git --yes

# 2. Copy into the root without overwriting existing files (specs/03 §3.3).
#    2a. Dry run first: review what would be created.
rsync -an --itemize-changes --ignore-existing \
  --exclude 'node_modules/' --exclude '.next/' \
  --exclude 'CLAUDE.md' --exclude 'specs/' \
  "$TMPDIR/meraki-scaffold/meraki-landing/" "$REPO/"
#    2b. Real copy (same flags, without -n).
rsync -a --ignore-existing \
  --exclude 'node_modules/' --exclude '.next/' \
  --exclude 'CLAUDE.md' --exclude 'specs/' \
  "$TMPDIR/meraki-scaffold/meraki-landing/" "$REPO/"
cd "$REPO" && npm ci

# 3. Post-scaffold deps (the @types/node bump must share the install with vitest, or ERESOLVE;
#    ref: stack.md §1)
npm i -E zod@4.6.7   # -E writes the exact version, no caret
npm i -D @types/node@^22 eslint@^10 vitest@5.0.5 @vitejs/plugin-react@6.1.2 jsdom@30.1.3 \
  @testing-library/react@16.3.3 @testing-library/dom@10.4.2 \
  @testing-library/user-event@14.6.8 @testing-library/jest-dom@7.0.1 prettier@3.9.10
# For T25 (P1 approved):
npm i -D @playwright/test@1.64.1 && npx playwright install chromium

# 4. Scripts
npm pkg set scripts.typecheck="tsc --noEmit" scripts.test="vitest run --passWithNoTests" \
  scripts.format="prettier --write ." scripts.test:e2e="playwright test" \
  engines.node=">=20.9.0"
echo 22 > .nvmrc
```

**Expected behaviour.**
- `package.json` name is `meraki-landing`.
- The scaffold's `AGENTS.md` is kept; it points to `node_modules/next/dist/docs/`.
- `next.config.ts` keeps `cacheComponents` and `partialPrefetching` unless they cause friction. Any removal must be recorded in specs/03.
- Demo content is removed: the starter markup in `page.tsx` and the Next/Vercel SVGs in `public/`.
- The scaffold `README.md` is replaced by a short project README that points to CLAUDE.md.
- `vitest.config.mts` uses `@vitejs/plugin-react`, `resolve.tsconfigPaths: true`, environment `jsdom`, and setup file `vitest.setup.ts` (jest-dom matchers). Route tests opt into `// @vitest-environment node`.
- `.env.example` lists `LEAD_WEBHOOK_URL=`, `NEXT_PUBLIC_CONTACT_EMAIL=`, `NEXT_PUBLIC_CONTACT_PHONE=` and `NEXT_PUBLIC_SITE_URL=` with empty values. `.gitignore` already ignores `.env*`; add `!.env.example`, `reference/`, `test-results/`, `playwright-report/` and `qa/`.

**Acceptance criteria.**
- [ ] `CLAUDE.md` and `specs/*` are byte-identical to before T1. Check with `shasum` before and after.
- [ ] `package.json` shows `"eslint": "^10…"`, `"@types/node": "^22…"`, `"zod": "4.6.7"` (exact, from `npm i -E`), `"engines": { "node": ">=20.9.0" }`, and the scripts `dev build start lint typecheck test format test:e2e`. `.nvmrc` reads `22`.
- [ ] `node_modules/typescript/package.json` reads 5.9.x (`typescript ^5` kept; TS 7 not adopted).
- [ ] The gate passes on the cleaned scaffold. `npm run test` is `vitest run --passWithNoTests`, so the gate command is identical in every task, even before tests exist.
- [ ] `git status` works if git was approved. Nothing is committed unless the user asked (P4).

**Validation.**
```bash
shasum CLAUDE.md specs/*.md   # compare with a copy taken before step 2
npm run lint && npm run typecheck && npm run test && npm run build
npm ls zod eslint @types/node typescript vitest --depth=0
git check-ignore -v .env.local reference/x   # both ignored; .env.example not ignored
```

---

## T2 — Design tokens in `globals.css` + fonts

**Objective.** Define tokens once, in `@theme` in `src/app/globals.css`, and load Newsreader and Geist via `next/font`. Token values come from specs/05 (**Provisional**, Q4).

**Files/components.** `src/app/globals.css`, `src/app/layout.tsx` (font variables on `<html>`), `scripts/check-contrast.mjs` (small node script; no dependency).

**Dependencies.** T1. Uses the defaults for Q4 and Q8.

**Expected behaviour.**
- **Copy the token block from specs/05 §19 verbatim.** specs/05 §19 is the only token list; do not retype values here. It includes every `--color-*` token (surface, line-strong, rule, on-dark-muted, the `*-tint` status backgrounds, and `--color-warning: #8A5A12`, adjusted from `#A86A12`, which fails AA at 3.85:1 on its tint; specs/05 §3.3). `--color-highlight` is for dark surfaces only (specs/05 §3.1).
- **Type:** `--font-display` is Newsreader and `--font-sans` is Geist, each with the fallback stack in specs/05 §19. Newsreader loads as a variable font with **no `weight` option** and `axes: ["opsz"]` (this covers 300 and 400; passing `weight` together with `axes` throws in next/font). The scale uses the `--text-*` namespace (`--text-h1`, `--text-h2`, `--text-cta`, `--text-tab`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`, `--text-caption`, `--text-eyebrow`, `--text-preview`, `--text-preview-num`), because Tailwind v4 generates `text-*` utilities only from that namespace (ref: responsive.md §5, tokens.md §1).
- **Layout:** `--container-site: 87.5rem`, `--spacing-gutter: clamp(1.25rem, 0.75rem + 2.2vw, 2.5rem)` and `--spacing-section: clamp(3rem, 1.79rem + 4.95vw, 6.25rem)`, applied globally (not scoped to headings). This avoids the reference's padding bug (ref: responsive.md §0.3). Gaps are 40/20/8.
- **Radii:** `--radius-pill` 40px, `--radius-nav` 136px, `--radius-input` 12px, `--radius-form` 16px, `--radius-preview` 12px, cards 0. **No shadows.**
- **Breakpoints:** `sm 480`, `md 768`, `lg 992`, `xl 1200`, mobile-first (`--breakpoint-*` in `@theme`).
- **Motion:** `--ease-out-quart: cubic-bezier(.165,.84,.44,1)` at 300ms. One global `@media (prefers-reduced-motion: reduce)` block, copied from specs/05 §17, sets `transition-duration` and `animation-duration` to `0.01ms !important` (effectively off).
- Base `:focus-visible` is a 2px outline with 2px offset. Sections get `scroll-margin-top: var(--spacing-nav-offset)` (5.5rem, specs/05 §5) to clear the fixed pill.
- The scaffold's dark-mode override and `Geist_Mono` are removed. **Provisional:** light theme only, with dark *bands*; no dark mode.
- Fonts: `next/font/google` with `display: "swap"` and `subsets: ["latin"]`. Check option names against `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`. The build needs network access to fetch fonts (ref: stack.md §5).
- `scripts/check-contrast.mjs` reads a list of pairs mirroring the specs/05 §3.3 table. Each pair carries a `target` of `text` (4.5), `large` (3), `ui` (3) or `dec` (not checked), plus `excluded: true` for rows specs/05 documents as rejected or restricted (the rejected warning `#A86A12`, highlight on light surfaces). The script exits non-zero only when a non-excluded `text`, `large` or `ui` pair falls below its target. Results are recorded in specs/05. If a value fails, adjust it there first, then here.

**Acceptance criteria.**
- [ ] `grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.tsx --include=*.ts` returns nothing, except the documented OG/icon mirror (T21).
- [ ] `node scripts/check-contrast.mjs` exits 0, and the ratios appear in specs/05.
- [ ] Utilities resolve, e.g. `bg-canvas`, `text-ink-muted`, `font-display`.
- [ ] The built HTML has no `fonts.googleapis` reference, and `/_next/static/media/*.woff2` files are preloaded.

**Validation.**
```bash
node scripts/check-contrast.mjs
npm run build && grep -c "fonts.googleapis" .next/server/app/index.html   # expect 0
grep -o '_next/static/media/[^"]*\.woff2' .next/server/app/index.html | head
```
Manual: `npm run dev` and inspect `<html>` for the font variables. Under DevTools "Emulate prefers-reduced-motion", hover transitions are off.

---

## T3 — Brand & content config

**Objective.** Put every brand string and every piece of copy in two typed modules, and put all env reads in one helper.

**Files/components.** `src/config/brand.ts`, `src/config/site-content.ts`, `src/lib/env.ts`, plus tests `src/config/site-content.test.ts` and `src/lib/env.test.ts`.

**Dependencies.** T1. Uses the defaults for Q2, Q4, Q6 and Q8.

**Expected behaviour.**
- **`brand.ts`** has the canonical shape from specs/03 §10.1: `name` ("Meraki", temporary), `tagline` ("Run your hostel. Not your paperwork."), `description`, `nav`, `primaryCta`, `secondaryCta`, `submitLabel`, `contact`, `social: []` and `logo: null`. There is no separate wordmark field: the wordmark is rendered from `name`.
  - Nav links are exactly 4: Product → `#platform`, Features → `#features`, How it works → `#how-it-works`, Contact → `#early-access`.
  - CTA labels: "Get early access", "See how it works", "Request early access".
  - `contact` comes from env, and each field is optional.
  - `social: []` is empty because no profiles exist; no icons are rendered.
- **`site-content.ts`** holds all section copy, plus:
  - Problem items: Notebook, Spreadsheet, Chat messages, Memory.
  - 3 outcomes.
  - 4 platform tabs.
  - Attention labels.
  - 3 feature rows.
  - Month flow: New tenant → Allocate bed → Record rent → Follow up dues → Move-out.
  - 4 getting-started steps.
  - 4 Why cards.
  - Form copy and select options.
  - The 8 FAQ entries from specs/01, with answers that match specs/06 statuses.
  - Footer columns.
  - Sample data, typed `Illustrative<T> = T & { illustrative: true }`, using obviously fictional Indian names and ₹ amounts.
- **`env.ts`** exports typed, optional getters. `NEXT_PUBLIC_*` must be referenced as literal `process.env.NEXT_PUBLIC_…` so Next inlines them at **build time**; changing them needs a rebuild. `LEAD_WEBHOOK_URL` is read at **request time**, server-only. Malformed values are treated as unset. Nothing is logged.
- **Provisional** select options:
  - Beds: "Under 20", "20–50", "51–150", "More than 150" (values `under-20 | 20-50 | 51-150 | over-150` per specs/03 §9.1; **Provisional**, specs/01 OQ-13).
  - Properties: "1", "2–3", "4+".

**Acceptance criteria.**
- [ ] `grep -rn "Meraki" src | grep -v "^src/config/"` returns nothing.
- [ ] Changing `brand.name` to "TestBrand" and rebuilding changes title, header, footer, metadata and OG text, and `grep -c TestBrand .next/server/app/index.html` ≥ 3. Revert afterwards.
- [ ] A test asserts the FAQ has 8 entries, every preview dataset has `illustrative: true`, and nav links are exactly the 4 listed, with hrefs matching section ids.
- [ ] A test asserts no forbidden claims in content: no "UPI reconciliation", "WhatsApp", "Tally", "integration", "login", "sign in", "customers", "trusted by", "testimonial", and no percentage strings. Negated FAQ answers are allow-listed explicitly.
- [ ] `env.ts` tests: an unset/empty/malformed email resolves to `undefined`. No `console` calls in `env.ts`.

**Validation.** `npm run test -- src/config src/lib/env`; then the grep and rename checks above.

---

## T4 — UI primitives

**Objective.** Build small, token-driven building blocks that sections compose.

**Files/components.** `src/components/ui/`: `Button`, `Container`, `Section`, `SectionHeader`, `Eyebrow`, `Icon` (inline SVG set), `IconBadge`, `VisuallyHidden`, plus co-located `*.test.tsx`. Also `src/components/preview/PreviewFrame.tsx` (+ test): it lives in `preview/` per specs/03 §4 but is built here because T5 depends on it.

**Dependencies.** T2, T3.

**Expected behaviour.**
- **Button** renders `<a>` when it has `href`, otherwise `<button>`.
  - Variants: `primary-dark`, `primary-light`, `ghost-on-dark`, `ghost-on-light`.
  - Size: 42px visual height, 44px minimum hit area. Padding 9px 16px, Geist 16/1.4, pill radius.
  - Hover changes background only, over 300ms.
  - Takes a `fullWidthOnMobile` prop (default true for in-content CTAs) that makes it full width below 480.
  - ref: components.md §2, tokens.md §5.
- **Container**: max 87.5rem with fluid gutter.
- **Section**: `<section id aria-labelledby>`, tones `canvas | tint | dark`, applies `--spacing-section` and `scroll-margin-top: var(--spacing-nav-offset)`.
- **SectionHeader**: optional Eyebrow, H2 (Newsreader 300), one supporting sentence, `align: center | left`. Header-to-content gap is 3.5rem (ref: components.md §15.3).
- **Icon**: hand-authored or MIT-licensed (Phosphor/Lucide) SVG paths. `aria-hidden` by default; takes `title` when meaningful. No icon font, no CDN.
- **IconBadge**: two variants. `disc` is a gradient circle, `linear-gradient(180deg, canvas-tint → accent-tint)` (cream top, tint bottom; specs/05 §3.4; ref: components.md §3.2). `corner` is a clipped circle bleeding off the bottom-right (ref: components.md §3.3).
- **PreviewFrame**: `<figure>` with a 12px radius and 1px `--color-line` border, no shadow, and a visible `<figcaption>`: "Illustrative preview · sample data".
  - The inner preview is presentational (`aria-hidden="true"`, nothing focusable). The figure has an `aria-label` describing what it illustrates.
  - **Provisional:** this avoids screen readers reading fake rows as data.

**Acceptance criteria.**
- [ ] Each primitive has a test: Button renders `a`/`button` correctly with accessible names, and PreviewFrame always renders the caption text.
- [ ] Keyboard focus shows a visible ring on Button (manual check plus a `:focus-visible` CSS assertion review).
- [ ] No hex values or arbitrary px values that duplicate a token (code review against specs/05).
- [ ] No `"use client"` in `src/components/ui/`.

**Validation.** `npm run test -- src/components/ui src/components/preview/PreviewFrame`; `grep -rl '"use client"' src/components/ui` returns nothing. Manual: render a temporary showcase in `page.tsx` during development. It must be removed before T7, so no test route is committed.

---

## T5 — Preview components (labelled sample data)

**Objective.** Build HTML/SVG mini-UIs of the *planned* product. Every one is wrapped in PreviewFrame and fed only `Illustrative<…>` data.

**Files/components.** `src/components/preview/`: `DashboardPreview` (summary tiles + recent recorded payments + dues list), `OccupancyGrid` (bed grid with occupied/vacant states), `RentLedger` (rows with Paid/Due/Overdue chips), `TenantList` (tenant + room allocation), `OpsList` (property operational records), plus tests.

**Dependencies.** T3, T4.

**Expected behaviour.**
- Vocabulary per specs/05 §13: status chips "Paid", "Due", "Overdue" (plus a neutral chip such as "Move-out") use the status tokens on tint backgrounds, with text and colour both present (not colour alone). Bed states are **Occupied / Vacant only**, with a text legend. No reserved or notice-period states (reservations and notice periods are not in specs/06).
- Amounts are formatted with `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })`.
- Names are obviously fictional.
- No real-looking KPIs or growth percentages. Totals in previews are sums of the sample rows, not marketing stats.
- Nothing implies online collection or UPI reconciliation. Payments read as "recorded".
- Every preview is responsive down to 320px (it scales or truncates columns; no horizontal page scroll).

**Acceptance criteria.**
- [ ] The prop types accept only `Illustrative<T>`. Passing plain data fails `npm run typecheck` (checked with a `// @ts-expect-error` test).
- [ ] Each preview renders the caption via PreviewFrame (tested).
- [ ] No preview contains "UPI", "collect", "auto" or "sync" (content test).
- [ ] At 320px width, no preview causes `scrollWidth > innerWidth` (checked in T22).

**Validation.** `npm run test -- src/components/preview && npm run typecheck`. Manual: view each preview at 390 and 1440.

---

## T6 — SiteHeader (desktop pill + mobile menu) & SiteFooter

**Objective.** Build the global chrome: a fixed pill nav, an accessible mobile sheet, and a semantic footer.

**Files/components.** `src/components/layout/SiteHeader.tsx` (client), `SiteFooter.tsx` (server), `src/app/layout.tsx` (skip link → `#main`, `<main id="main">`), tests.

**Dependencies.** T3, T4. Uses the Q3 default (text wordmark).

**Expected behaviour.**
- **Desktop (≥992):** a fixed white pill, max 54.5rem wide, 56px tall, 136px radius, 8px from the top. Text wordmark on the left, 4 centred links, a dark pill CTA "Get early access" → `#early-access` on the right. No dropdown, no auth links. ref: structure.md §0, components.md §1.1–1.2, responsive.md §1.1.
- **Mobile (<992):**
  - The hamburger is a `<button aria-expanded aria-controls>`, at least 44×44. The CTA stays visible in the pill.
  - Sheet geometry per specs/05 §12.2: `position: fixed`, top = pill bottom + 8px, `inset-inline: 16px` (24px from 768), `max-height: calc(100svh - 5.5rem)`, 1px `--color-line` border, `--radius-sheet` (1rem). Focus is trapped within the header (toggle, sheet links, CTA), **Esc** closes it and returns focus to the toggle, body scroll is locked, and clicking a link closes it.
  - ref: components.md §1.4, responsive.md §5 rule 1.
- **Pill inset:** 16px below 768, 24px from 768 (ref: responsive.md §5).
- **Skip link:** hidden until focused, then targets `<main id="main">` (fixes the reference defect; ref: components.md §11).
- **Footer:** a `<footer>` element.
  - Big wordmark on the left. Columns: Product (Platform `#platform`, Features `#features`, How it works `#how-it-works`), Company (Early access `#early-access`, Contact `#early-access`, FAQ `#faq`), Legal (Privacy `/privacy`, Terms `/terms`).
  - Email and phone appear **only if** the env vars are set. No social icons.
  - Layout is 2 columns ≥992 and stacked below, with padding 56/80 (ref: responsive.md §1.10, components.md §10).
- **© year (Provisional):** computed in a way that works with Cache Components. If `new Date()` in a Server Component triggers a prerender error under `cacheComponents`, compute the year in a `"use cache"` helper or at build time, then record the choice in specs/03.

**Acceptance criteria.**
- [ ] Tests: the toggle flips `aria-expanded`, Esc closes the sheet and focus returns to the toggle, Tab cycles only within the header (toggle, sheet links, CTA), and clicking a link closes it.
- [ ] The header has exactly 4 nav links plus 1 CTA. No "Log in" or "Sign up" (tested).
- [ ] Footer contact lines are absent when the env vars are unset and present when set (tested via a mocked `env.ts`).
- [ ] Landmarks: one `banner`, one `navigation` (with `aria-label`), one `main`, one `contentinfo`.

**Validation.** `npm run test -- src/components/layout`. Manual at 390/768/1024/1440: tab from page load, and confirm the first Tab shows the skip link. Open and close the menu with keyboard only.

---

## T7–T18 — Landing sections (page order)

These rules apply to all section tasks:
- Each section is a Server Component in `src/components/sections/` unless noted otherwise. Copy comes only from `site-content.ts`. Each uses `Section` + `SectionHeader`, has the listed `id`, has a single H2 (H3s inside), and is composed in `src/app/page.tsx` in this order.
- Every section task has a co-located render test. The test checks the id and heading, checks that CTAs point at the right anchors, and checks that previews carry the caption.
- **Validation for every section:** `npm run test -- <Section>`, the gate, and a manual check at 390 / 768 / 1024 / 1440 in `npm run dev`, next to the matching reference slice.
- **Dependencies for every section:** T3, T4, T6 (page shell), plus anything listed per task.

### T7 — Hero (`#hero`)
- **Objective:** Promise + CTAs + the product view rising out of the band. ref: structure.md › 1 Hero, components.md §15.1, responsive.md §1.2.
- **Files:** `sections/Hero.tsx`. Deps: + T5 (DashboardPreview). Q3 default.
- **Expected behaviour:**
  - Full-bleed band with a vertical gradient into `--color-accent-900`.
  - A single page `<h1>` "Run your hostel. Not your paperwork." in Newsreader 400, `--text-h1`, `max-width: 12em; text-wrap: balance` (specs/05 §4.3), centred. A 1–2 line sub.
  - CTAs: "Get early access" (primary-light) → `#early-access` and "See how it works" (ghost-on-dark) → `#how-it-works`. Stacked with a 12px gap below 480, inline from 480.
  - A large DashboardPreview straddles the band's bottom edge (half on dark, half on canvas, using the 50% split wrapper in specs/05 §13 "Hero placement") with the caption visible.
  - Min-height `min(95svh, 54rem)` on desktop, about 40–45rem on phones.
  - No logo marquee, no photo.
- **Acceptance:**
  - [ ] Exactly one `h1` on the page.
  - [ ] Both CTA hrefs are correct.
  - [ ] The caption is visible at all 4 widths.
  - [ ] The LCP element is the H1 or preview text, not an image.

### T8 — Problem (`#problem`)
- **Objective:** Name the fragmentation pain. There is no Clarion equivalent; it borrows the centred header (ref: structure.md › 2) and the left-rule list motif (ref: structure.md › 4).
- **Files:** `sections/Problem.tsx`.
- **Expected behaviour:**
  - H2 "Running a hostel shouldn't mean chasing information across multiple tools."
  - 4 items (Notebook, Spreadsheet, Chat messages, Memory), each with a 2px left rule and a one-line pain: fragmented records, manual rent tracking, unclear occupancy, repetitive follow-ups.
  - 1 column below 768, 2×2 from 768, 4-up from 992 (specs/05 §6). No cards, no stats.
- **Acceptance:**
  - [ ] 4 items rendered from content.
  - [ ] No numerals that read as statistics.

### T9 — Outcomes (`#outcomes`)
- **Objective:** Three outcome cards. ref: structure.md › 2, components.md §3.1, responsive.md §1.3.
- **Files:** `sections/Outcomes.tsx`. Deps: + T5 (mini illustrations).
- **Expected behaviour:**
  - Cards: Know your occupancy / Track rent with clarity / Keep operations organized.
  - Tinted square cards, 250px illustration area (200px below 768), serif H3, 14px body in solid `--color-ink-muted` (no opacity text).
  - Each card has its own mini-UI: bed grid, ledger rows, record card.
  - Grid is 1 column, then 2 + 1 from 768 (the third card spans both columns), then 3-up from 992 (specs/05 §6).
- **Acceptance:**
  - [ ] 3 cards.
  - [ ] Muted text passes the contrast check (T2).
  - [ ] Illustrations are `aria-hidden` with no caption needed. **Provisional:** they are abstract mini-illustrations, not previews of data. If they show names or amounts, wrap them in PreviewFrame.

### T10 — PlatformTabs (`#platform`) — client
- **Objective:** Tabbed overview where the media really changes per tab. ref: structure.md › 3, components.md §4.1, responsive.md §1.4.
- **Files:** `sections/PlatformTabs.tsx` (`"use client"`). Deps: + T5 (OccupancyGrid, TenantList, RentLedger, OpsList).
- **Expected behaviour:**
  - H2 "Everything your hostel needs to stay organized."
  - Inset 1fr/1fr split: media on the left, a dark panel (`--color-accent-800`) on the right.
  - 4 large serif tabs: Rooms & occupancy / Tenants & allocations / Rent & payments / Property operations. Inactive tabs at .6 opacity of `--color-on-dark` (5.15:1 on accent-800, per specs/05 §3.3); active 1, 300ms `--ease-out-quart`.
  - A divider, then the per-tab description. **One shared** "Get early access" CTA → `#early-access` sits below the tab panels (not one per pane; specs/01 §7 row 4, specs/02 §21 #8).
  - WAI-ARIA tabs: `role=tablist/tab/tabpanel`, `aria-selected`, `aria-controls`, roving tabindex, Left/Right/Up/Down/Home/End.
  - The media swaps to the matching preview.
  - Crossfade is 300ms in / 100ms out, and none under reduced motion.
  - Mobile: stacked, with the tablist as a horizontal scroll row above the panel.
- **Acceptance:**
  - [ ] Tests: arrow keys move focus and selection, exactly one `aria-selected="true"`, the panel's `aria-labelledby` matches, the preview changes per tab, and Home/End work.
  - [ ] Copy differs from the T12 rows (overview, not specifics).

### T11 — Attention (`#attention`)
- **Objective:** Show what an owner would watch, using labels and no numbers. ref: structure.md › 4, components.md §3.2/§7, responsive.md §1.5.
- **Files:** `sections/AttentionDashboard.tsx`. Deps: + T5 (DashboardPreview). Q6 default.
- **Expected behaviour:**
  - Full-bleed tint band. 4/7 split from 992, stacked below.
  - Left: H2 "Know what needs your attention." + sub + a list with 2px left rules: Vacant beds, Dues outstanding, Move-ins/outs this week, and **"Notes to follow up"** ("Open issues" only if Q6 confirms maintenance).
  - Right: the full DashboardPreview with caption.
- **Acceptance:**
  - [ ] The list contains no numerals.
  - [ ] The fourth item follows the Q6 status in specs/06 (tested against content).

### T12 — Features (`#features`)
- **Objective:** Specifics of the *intended* capability in alternating rows. Derived from ref: structure.md › 3 split geometry and › 2 imagery.
- **Files:** `sections/FeatureShowcase.tsx`. Deps: + T5.
- **Expected behaviour:**
  - Exactly 3 rows: Occupancy & rooms; Rent & payment records; Tenant & property records.
  - Square edges. The preview sits on a tinted panel. The text side has an H3 and 2–3 bullets in intent phrasing.
  - The side alternates from 992; below that, the order is text then preview.
  - No multi-property row (Unknown).
- **Acceptance:**
  - [ ] 3 rows.
  - [ ] Every bullet passes the forbidden-claims test (T3).
  - [ ] Every preview has its caption.

### T13 — HowItWorks (`#how-it-works`)
- **Objective:** The owner's month in Meraki. This replaces Clarion's integrations section. ref: structure.md › 5, components.md §15.4, responsive.md §1.6.
- **Files:** `sections/DailyWorkflow.tsx`.
- **Expected behaviour:**
  - Centred header, then a chip flow in bordered cells (`--color-line`): New tenant → Allocate bed → Record rent → Follow up dues → Move-out.
  - Wraps or stacks on mobile. Arrows are decorative (`aria-hidden`), and the sequence is an `<ol>`.
  - No logos, no compliance band. An optional "Your data" note only if each statement is true per specs/03.
- **Acceptance:**
  - [ ] The `<ol>` has 5 items.
  - [ ] No `<img>` elements in the section.
  - [ ] The nav "How it works" link and the hero ghost CTA land here, below the fixed header (manual).

### T14 — GettingStarted (`#getting-started`)
- **Objective:** Honest early-access steps on a dark band. ref: structure.md › 6, components.md §3.5/§5.3, responsive.md §1.7.
- **Files:** `sections/GettingStarted.tsx`. Q2 default.
- **Expected behaviour:**
  - Dark `--color-accent-900` band, H2 "Getting started should be simple."
  - The 4 step cards from T0 Q2, with sentence headlines ("You…/We…").
  - Below 992: native `overflow-x: auto` + `scroll-snap-type: x mandatory`. Cards are 18rem below 768 and 22rem from 768, with gaps of 12/24px. A step counter or dots are added (fixes ref defect 6), and focusing an off-screen card scrolls it into view.
  - From 992: a 4-up row.
  - **No scroll-hijacking pin** (deliberate deviation for a11y/perf; record it in specs/05).
- **Acceptance:**
  - [ ] Steps are an `<ol>` of 4.
  - [ ] The rail scrolls with keyboard (it is focusable with an `aria-label`) and touch.
  - [ ] No JS scroll listeners.

### T15 — WhyMeraki (`#why`)
- **Objective:** 4 true benefits + CTA. ref: structure.md › 7, components.md §3.3, responsive.md §1.8.
- **Files:** `sections/WhyMeraki.tsx`.
- **Expected behaviour:**
  - Tint band. Cards: Built for hostels & PGs / Everything in one place / Clear view of occupancy & dues / Shaped with operators who join early access.
  - Cards are `height: 20rem` from 768 and `min-height: 16rem; height: auto` below (specs/05 §11), with a `corner` IconBadge (9rem circle; 7rem below 992).
  - Grid is 1 → 2 (768) → 4 (1200) columns. At 992–1199 it stays 2×2 (fixes ref defect 3).
  - A centred dark CTA "Get early access" → `#early-access`, full width below 480.
  - No competitor comparisons, no "enterprise-grade".
  - The H2 uses `brand.name` (e.g. "Why {brand.name}").
- **Acceptance:**
  - [ ] 4 cards.
  - [ ] The heading is built from `brand.name`.
  - [ ] The CTA href is correct.

### T16 — EarlyAccess form UI (`#early-access`) — client
- **Objective:** An honest, accessible lead form wired to `/api/lead`. ref: components.md §9 (Clarion modal card placed inline).
- **Files:** `sections/EarlyAccess.tsx` (server wrapper: heading, notice text, configured flag) + `components/sections/EarlyAccessForm.tsx` (`"use client"`), tests.
- **Deps:** + **T19** (schema + endpoint; run T19 first). Q1 and Q5 defaults.
- **Expected behaviour:**
  - H2 "Help us build a better way to manage hostels."
  - The card is 560px max, 40px padding (24px below 480), 16px radius, inputs 12px radius, 3rem tall.
  - **Fields:**
    - Required: Full name, Property/business name, Phone and Email (at least one required, with a group hint), City, Approx. beds (select).
    - Optional: Number of properties (select 1 / 2–3 / 4+), Biggest challenge (textarea, 500 chars with a live counter).
    - Consent checkbox, **unticked** and required, linking `/privacy`. Honeypot `website` (visually hidden, `tabindex=-1`, `autocomplete=off`, `aria-hidden`).
    - Real `<label for>` on every field. Required marked in text, not colour only. Email is optional, and Gmail is not blocked.
  - Notice at collection: what is collected, why, and how to withdraw. The withdrawal contact appears only if configured.
  - **Client validation** uses the shared zod schema. On submit errors, an error summary gets focus and links to the fields, and each invalid field gets `aria-invalid` + `aria-describedby`.
  - **Pending:** the button is disabled, `aria-busy="true"`, and the label reads "Sending…". This prevents duplicate submits. The client timeout is 15s (**Provisional**).
  - **Status handling:**

    | Response | UI |
    |---|---|
    | 200 + `{ok:true}` | Success message receives focus. This is the **only** success path. |
    | 400 with `fieldErrors` | Field errors from the server mapped to the fields + error summary, input kept |
    | 400 without `fieldErrors` (bad body, or a honeypot hit) | "We couldn't accept this submission. Please reload the page and try again." + fallback links if configured. Input kept. |
    | 429 | "Too many attempts. Please wait a minute and try again." Input kept. |
    | 503 `not_configured` | "Our early-access form isn't connected yet." + prefilled `mailto:`/`tel:` fallback **only** if `NEXT_PUBLIC_CONTACT_*` is set, else "Please try again later." Input kept. |
    | 502 / 500 / network error / non-JSON / timeout / 200 without `{ok:true}` | "We couldn't send your request. Your details are still here — please try again." + fallback links if configured. Input kept. |

    Status is announced in an `aria-live="polite"` region.
  - **Unconfigured state (Provisional; specs/03 §9.4 option b):** `page.tsx` computes `leadCaptureEnabled = Boolean(LEAD_WEBHOOK_URL && NEXT_PUBLIC_CONTACT_EMAIL)` server-side and passes only the boolean. When it is `false`, the form renders visibly inside a **disabled `<fieldset>`** (it cannot be submitted), with the honest notice banner ("Our early-access form isn't connected yet…") and the fallback contact links if configured. The client still handles a 503 in case build-time and runtime env drift. Recorded caveat: the boolean reflects build-time env, so host env changes require a redeploy.
- **Acceptance (component tests, `fetch` mocked):**
  - [ ] An empty submit shows the summary, focus lands on it, and nothing is sent.
  - [ ] Neither phone nor email filled → the group error is shown.
  - [ ] Unticked consent blocks the submit.
  - [ ] During pending, a second click sends nothing (`fetch` called once).
  - [ ] Each of 200/`{ok:true}`, 200/`{ok:false}`, 400 with and without `fieldErrors`, 429, 502, 503, a rejected fetch and an HTML body yields exactly the row above. **Success appears only for 200 + `{ok:true}`.**
  - [ ] `leadCaptureEnabled=false` renders the disabled fieldset and the notice; nothing can be submitted.
  - [ ] Input values survive every failure.
  - [ ] Fallback links render only with env set.

### T17 — FAQ (`#faq`)
- **Objective:** Answer the 8 brief questions honestly.
- **Files:** `sections/Faq.tsx`. Q6 default.
- **Expected behaviour:**
  - Centred header, rows divided by 1px `--color-line`.
  - Answers derive from specs/06, e.g. UPI reconciliation → "No. Payments are recorded by you."; tenant app → "Meraki is for owners & operators"; multi-property → "We're exploring it; tell us in the early-access form."
  - **Default (Provisional): native `<details>/<summary>`**, zero JS, with a custom marker, a visible focus ring and a ≥44px summary hit area. Fall back to button + `aria-expanded` + region (client) only if the styling cannot stay accessible, and record that in specs/03.
- **Acceptance:**
  - [ ] 8 items.
  - [ ] Each answer matches its specs/06 status (content test maps question → status).
  - [ ] Keyboard Enter/Space toggles.
  - [ ] No `"use client"` (unless the fallback is used).

### T18 — FinalCta (`#final-cta`)
- **Objective:** The final ask. ref: structure.md › 8, components.md §15.2, responsive.md §1.9.
- **Files:** `sections/FinalCta.tsx`. Q3 default.
- **Expected behaviour:**
  - Full-bleed band with a 139° gradient from `--color-accent-900`.
  - Left-aligned H2 "Make hostel management simpler." at `--text-cta`, `max-width: 12em; text-wrap: balance` (about 2 lines for this 31-character line), line-height 1.2 below 992 and 1.1 from 992 (specs/05 §4.2).
  - One `primary-light` pill → `#early-access`.
  - CSS-only abstract art or a cropped preview on the right. If the preview is used, its caption is visible.
  - Min-height 45rem desktop / 36rem tablet.
- **Acceptance:**
  - [ ] One CTA with the correct href.
  - [ ] No `<img>` from external sources.
  - [ ] Text contrast on the gradient passes AA at the lightest gradient stop behind the text (checked in T23).

---

## T19 — Lead schema + `/api/lead` route + tests

**Objective.** The only backend: validate, forward, report honestly. Hardened pattern: ref stack.md §4. Full contract: specs/03.

**Files/components.** `src/lib/lead-schema.ts`, `src/app/api/lead/route.ts`, `src/lib/rate-limit.ts` (in-memory), `src/app/api/lead/route.test.ts` (`// @vitest-environment node`), `src/lib/lead-schema.test.ts`, `tests/fixtures/lead-valid.json`, `tests/mock-webhook.mjs` (local test server for T25).

**Dependencies.** T1, T3 (`env.ts`). Q1 default.

**Expected behaviour.**
- **Schema (zod 4):**
  - Trimmed strings with the specs/01 §8.5 / specs/03 §9.1 limits: name 2–80, property 2–120, city 2–60, challenge ≤ 500 (**Provisional**).
  - Phone: optional. Strip spaces and hyphens, then match `^(?:\+91|0)?[6-9]\d{9}$` (**Provisional**, Indian mobiles only).
  - Email: optional, `z.email()`. A refine enforces phone **or** email.
  - `beds` and `properties` are enums from content. `consent: z.literal(true)`. Honeypot `website: z.string().max(0)`.
  - Exported for client and server use.
- **Route `POST`:**
  Order per specs/03 §9.2:
  1. Per-IP limit exceeded → **429** `{ok:false,error:"rate_limited"}` + `Retry-After`. Key on the platform-trusted client IP (`x-real-ip` on Vercel, `x-nf-client-connection-ip` on Netlify); fall back to the **last** (proxy-appended) `x-forwarded-for` hop, never the first. Best-effort, per instance; **Provisional** 5 per 10 min.
  2. Content type is not JSON, the body is oversize, or it fails to parse → **400** `{ok:false,error:"invalid"}` (no `fieldErrors`).
  3. Schema failure → **400** `{ok:false,error:"invalid",fieldErrors:{…}}` (visible fields only). A filled honeypot returns `{ok:false,error:"invalid"}` with **no** `fieldErrors` (never `fieldErrors.website`). **Never a fake 200.**
  4. `LEAD_WEBHOOK_URL` unset or invalid, **or** `NEXT_PUBLIC_CONTACT_EMAIL` unset (**Provisional** gate, specs/03 §9.4) → **503** `{ok:false,error:"not_configured"}`.
  5. `fetch` the webhook with `AbortSignal.timeout(8000)` and a body of **explicitly picked fields** plus `submittedAt` (no honeypot, no IP). Require a JSON `{ok:true}` ack. A non-2xx status, missing ack, non-JSON body, timeout or network error → **502** `{ok:false,error:"upstream"}`.
  6. Ack received → **200** `{ok:true}`.
- **Webhook URL scheme:** `https:` only, except `http://localhost`/`http://127.0.0.1` for local tests (**Provisional**; specs/03 §10.4). Anything else is treated as unconfigured.
- **Logging:** never log request bodies or PII. Logging an error *category* is allowed.
- Only `POST` is exported; other methods get 405 from Next.

**Acceptance criteria.**
- [ ] Route tests pass for: unset env → 503; webhook set + contact email unset → 503 and `fetch` not called; non-JSON → 400 without `fieldErrors`; invalid → 400 with `fieldErrors`; honeypot → 400 with no `fieldErrors`; upstream 500 → 502; upstream 200 + HTML → 502; upstream 200 + `{ok:false}` → 502; fetch reject → 502; timeout (fake timers or an aborted signal) → 502; ack → 200; rate limit → 429.
- [ ] A test asserts the forwarded body has exactly the allowed keys.
- [ ] A test spies on `console.*` and asserts no call contains the fixture's name, phone or email.
- [ ] The build output lists `/api/lead` as `ƒ (Dynamic)` and `/` as `○ (Static)`.

**Validation.**
```bash
npm run test -- src/app/api/lead src/lib/lead-schema
npm run build   # check the route table symbols
```

---

## T20 — `/privacy` and `/terms`

**Objective.** Honest legal pages that support DPDP-style notice and consent, clearly marked as drafts pending owner review.

**Files/components.** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` (copy in `site-content.ts`), tests.

**Dependencies.** T3, T4, T6. Q5 default.

**Expected behaviour.**
- **`/privacy`** covers:
  - What the early-access form collects (the exact field list from T19).
  - Purpose: contacting you about early access.
  - Where data goes: "a service chosen by the {brand} team to store early-access requests (named here once selected)". Name the processor once Q1 is answered.
  - "Our hosting provider processes your IP address briefly to deliver the page and limit abuse; we don't store it." (specs/03 §9.2, §9.5.)
  - Retention: "to be confirmed". No invented period.
  - Withdrawal and grievance contact: rendered from `NEXT_PUBLIC_CONTACT_EMAIL`. Lead capture is disabled unless it is set (T19 step 4), so a live form always has this contact. Without it, the page says the contact "will be published before launch".
  - "Giving consent is voluntary and the box is never pre-ticked. We can't accept an early-access request without it, and you can withdraw consent at any time using the contact below."
  - A visible "Draft — pending owner review. Not legal advice." banner.
- **`/terms`:** "Terms of use will be published before launch." + the same banner. No invented clauses.
- Both pages use the site header and footer, have their own `metadata` titles, and contain no invented company name, address or registration number.

**Acceptance criteria.**
- [ ] Both routes are prerendered `○` and return 200.
- [ ] Tests show contact lines only when env is set.
- [ ] `grep -niE "pvt|ltd|llp|registered office|gst" src/app/privacy src/app/terms src/config` returns nothing invented.

**Validation.** `npm run build && npm run start`, then `curl -sI localhost:3000/privacy | head -1` and `curl -sI localhost:3000/terms | head -1` should both show 200. Manual read-through against specs/03 DPDP notes.

---

## T21 — SEO, metadata, OG, robots, sitemap

**Objective.** Correct, brand-config-driven metadata with no invented domain.

**Files/components.** `src/app/layout.tsx` (`metadata`), `src/app/opengraph-image.tsx` (`next/og` ImageResponse; no external assets), `src/app/icon.tsx` or `icon.svg` (wordmark initial; replaces the scaffold favicon), `src/app/robots.ts`, `src/app/sitemap.ts`, optional `src/app/not-found.tsx` (branded 404; specs/03 §4/§5).

**Dependencies.** T3, T20. Q3, Q7 and P5 defaults.

**Expected behaviour.**
- Title is `${brand.name} — Hostel & PG Management Software` (template `%s · ${brand.name}` for sub-pages), per specs/01 S-01 and specs/03 §11.3. Description comes from `brand.description`. Open Graph and Twitter `summary_large_image` are set. `lang="en"`.
- `metadataBase` is set **only** when `NEXT_PUBLIC_SITE_URL` is set. No `canonical` otherwise.
- `robots.ts` allows `/` and disallows `/api/` (specs/03 §11.3). The `sitemap` line and `sitemap.ts` entries are emitted only when the site URL is set (otherwise the sitemap is empty).
- OG image and icon cannot read CSS variables, so they mirror token hexes from one exported constant. A test asserts the constant equals the values in `globals.css`. This is the documented exception to the "no hex outside globals.css" rule.

**Acceptance criteria.**
- [ ] With env unset, the built HTML contains no absolute URL with an invented domain: `grep -oE "https?://[a-z0-9.-]+\.(com|in|io|app|co)" .next/server/app/index.html` prints nothing. Review any hit by hand.
- [ ] With `NEXT_PUBLIC_SITE_URL=https://example.test` at build, `og:url`/`og:image` are absolute on that host and the sitemap lists `/`, `/privacy` and `/terms`.
- [ ] The token-mirror test passes.
- [ ] `/opengraph-image` returns a 1200×630 PNG.
- [ ] If `not-found.tsx` is added: an unknown path returns 404, the page links back to `/`, and it repeats no product claims.

**Validation.**
```bash
npm run build && npm run start &   # then:
curl -s localhost:3000/robots.txt; curl -s localhost:3000/sitemap.xml
curl -s localhost:3000/opengraph-image -o /tmp/og.png && sips -g pixelWidth -g pixelHeight /tmp/og.png
NEXT_PUBLIC_SITE_URL=https://example.test npm run build   # repeat the checks
```
(Stop the server afterwards.)

---

## T22 — Responsive pass

**Objective.** Match the specs/05 and responsive.md §5 rules from 320 to 1920px.

**Files/components.** Section and layout components (fixes only), `e2e/responsive.spec.ts`, and `playwright.config.ts` (created here, since T22 is the first task that runs Playwright): projects at 1440×900, 1024×768, 768×1024 and 390×844 (DPR 1), plus touch projects (`hasTouch: true, isMobile: true`, so `pointer: coarse` applies) for every width below 992; `webServer: npm run start`.

**Dependencies.** T6–T18.

**Expected behaviour.** Breakpoints sm 480 / md 768 / lg 992 / xl 1200. The nav switches at 992. Grids follow specs/05 §6. Why cards are not 4-up at 992–1199 (2×2 until xl); getting-started and problem are 4-up from 992 (specs/05 §6). Button full width below 480 (never the nav CTA). Long headings don't overflow.

**Acceptance criteria.**
- [ ] At widths 320, 390, 480, 767, 768, 991, 992, 1024, 1199, 1200, 1440 and 1920, Playwright asserts `document.documentElement.scrollWidth <= innerWidth`.
- [ ] In the touch projects (coarse pointer) below 992, all interactive elements are ≥44px tall and buttons ≥44×44 (Playwright bounding-box check on `a, button, summary, input, select, textarea, [role=tab]`; inline text links in paragraphs are exempt). Footer links and platform tabs use the 44px min-height rules in specs/05 §12.3 and §14.
- [ ] At 390, outside `figure[data-preview] [aria-hidden=true]` no text is below 14px except caption/eyebrow (13px); inside previews no text is below 12px (specs/05 §4.2 `--text-preview`).

**Validation.** `npm run build && npx playwright test e2e/responsive.spec.ts`. Manual: the DevTools device toolbar at 390/768/1024/1440, with the mobile menu opened at 390 and 768.

---

## T23 — Accessibility pass

**Objective.** WCAG 2.2 AA, and fixes for each reference defect listed in components.md §11.

**Files/components.** Any component (fixes only), `e2e/a11y.spec.ts` (uses the `playwright.config.ts` from T22).

**Dependencies.** T6–T21.

**Expected behaviour / checklist.**
- Landmarks and skip link work; there is one `h1` and heading levels do not skip.
- Every interactive element has a visible `:focus-visible` ring.
- The tabs pattern is complete, the mobile menu traps focus and closes on Esc, and the form has labels, an error summary and live status.
- Previews are captioned, and decorative SVGs are `aria-hidden`.
- Contrast is AA for every text/background pair, including text on gradients and inactive tabs (large-text 3:1).
- `prefers-reduced-motion` removes all transitions.
- 200% zoom and 400% reflow at 1280 → 320 CSS px work without loss.

**Acceptance criteria.**
- [ ] `node scripts/check-contrast.mjs` exits 0.
- [ ] Keyboard-only walkthrough completes: skip link → nav → each section CTA → tabs (arrows) → rail → form submit with errors → FAQ → footer links. No focus traps outside the menu, and focus is never lost.
- [ ] Chrome DevTools Lighthouse Accessibility = 100 on `/`, `/privacy` and `/terms` (target; any deviation is explained in specs/05).
- [ ] VoiceOver (macOS) spot check: the tab change is announced, form errors are announced, the success message is announced, and the preview caption is read.
- [ ] **Optional (Provisional, needs approval as an extra dev dependency):** `@axe-core/playwright` scan with 0 serious/critical violations.

**Validation.** `npx playwright test e2e/a11y.spec.ts` (emulates `reducedMotion: "reduce"` and checks that computed `transition-duration` on Button satisfies `parseFloat(duration) <= 0.00001`, i.e. the 0.01ms override from specs/05 §17). Then the manual keyboard and VoiceOver passes above.

---

## T24 — Performance pass

**Objective.** A fast static page with minimal client JS.

**Files/components.** Fixes only.

**Dependencies.** T7–T21.

**Expected behaviour.**
- `/` is prerendered static. Only the expected client components exist: SiteHeader, PlatformTabs, EarlyAccessForm, plus Faq only under the T17 fallback.
- No runtime third-party requests: no font CDN, analytics or icon CDN.
- Fonts are preloaded with `display: swap` and fallback metrics, so CLS from fonts stays near 0.
- No images in the LCP path.

**Acceptance criteria.**
- [ ] `grep -rl '"use client"' src` lists only the allowed files.
- [ ] The build route table shows `○ /`, `○ /privacy`, `○ /terms` and `ƒ /api/lead`.
- [ ] DevTools Network on a hard reload of `/` shows zero requests to origins other than localhost.
- [ ] Lighthouse mobile (`npm run start`, incognito): Performance ≥ 90, CLS < 0.1, LCP < 2.5 s, TBT < 200 ms. These targets are **Provisional**; record the actual numbers in specs/05 or the README.

**Validation.** `npm run build` (read the route table). `grep -rl '"use client"' src`. Lighthouse in Chrome DevTools against `localhost:3000`. Optional: `npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,seo,best-practices` (downloads the lighthouse package; P1).

---

## T25 — QA

**Objective.** End-to-end verification against the reference, the CTA/link contract and the honest form scenarios.

**Files/components.** `e2e/screenshots.spec.ts` (uses the T22 `playwright.config.ts`), `e2e/links.spec.ts`, `e2e/lead.spec.ts`, `tests/mock-webhook.mjs`. Output goes to git-ignored `qa/`.

**Dependencies.** T19–T24, plus P1 and P2.

**1. Visual comparison with the reference (4 widths).**
- Full-page and per-section screenshots go to `qa/screenshots/<width>/<section-id>.png`.
- Compare them **manually side by side** with the Clarion captures (P2) at the same viewport. A pixel diff is meaningless, because brand and content deliberately differ.
- Check per section: the same *relationships* hold (band order and tones, header-to-content spacing, split ratios, card proportions, pill controls, square cards, no shadows) and the documented deviations are present (UI-led hero, no pin, no marquee, previews at 12px radius).
- Record findings in a QA table in the README. Fix or log anything that doesn't match.

**2. CTA/link audit** (`e2e/links.spec.ts`):
- Every `a[href^="#"]` resolves to an existing id.
- Every link with text "Get early access" or "Request early access" targets `#early-access`. "See how it works" targets `#how-it-works`.
- The 4 nav hrefs are exactly as in T3.
- No `href="#"`, empty href or `javascript:`.
- `/privacy` and `/terms` return 200.
- No `mailto:`/`tel:` links when contact env is unset.
- No external links except those in content (expected: none).
- After an anchor jump, the target heading is not hidden under the fixed header (its bounding box top ≥ header bottom).

**3. Form scenarios** (`e2e/lead.spec.ts` + curl). A separate production server runs per env setup:

| # | Setup | Action | Expected |
|---|---|---|---|
| 1 | `LEAD_WEBHOOK_URL` unset | Load the page; curl a valid POST | The form is disabled (fieldset) with the "isn't connected yet" notice and cannot be submitted. curl → 503 `not_configured`. No fallback links (contact env unset). No success. |
| 1b | Same + `NEXT_PUBLIC_CONTACT_EMAIL=test@example.test` (rebuild) | Same | Form still disabled; `mailto:` fallback link present |
| 1c | `LEAD_WEBHOOK_URL=http://127.0.0.1:4010/ok`, contact email unset | curl a valid POST | 503 `not_configured`; the mock receives nothing (T19 contact gate) |
| 2 | As 4 | Submit invalid (empty / no phone+email / bad phone / unticked consent); also curl invalid JSON and a filled honeypot | Client blocks with error summary; curl → 400 `invalid` |
| 3 | `LEAD_WEBHOOK_URL=http://127.0.0.1:4010/fail` (mock returns 500), then `/html` (200 + HTML), then a closed port `:4011`; built with `NEXT_PUBLIC_CONTACT_EMAIL=test@example.test` | Submit valid | 502 `upstream` for all three. UI retry message + `mailto:` fallback. Input kept. No success. |
| 4 | `LEAD_WEBHOOK_URL=http://127.0.0.1:4010/ok` (mock answers `{"ok":true}`), built with `NEXT_PUBLIC_CONTACT_EMAIL=test@example.test` | Submit valid | 200 `{ok:true}`. Success message focused. The mock received exactly the allowed fields (the mock writes a count and the key list, **not values**, to stdout). |
| 5 | Same as 4 | Double-click submit | Exactly 1 request reaches the mock |

```bash
node tests/mock-webhook.mjs &        # listens on 127.0.0.1:4010 (/ok, /fail, /html)
LEAD_WEBHOOK_URL=http://127.0.0.1:4010/ok NEXT_PUBLIC_CONTACT_EMAIL=test@example.test npm run build
LEAD_WEBHOOK_URL=http://127.0.0.1:4010/ok NEXT_PUBLIC_CONTACT_EMAIL=test@example.test npm run start &
curl -s -w '\n%{http_code}\n' -X POST localhost:3000/api/lead \
  -H 'content-type: application/json' -d @tests/fixtures/lead-valid.json   # expect {"ok":true} 200
curl -s -w '\n%{http_code}\n' -X POST localhost:3000/api/lead -H 'content-type: application/json' -d '{}'  # 400
npx playwright test
```
(Restart `npm run start` with each `LEAD_WEBHOOK_URL` value, and stop the background processes afterwards. If Q1 is answered, repeat scenario 4 once against the **real** destination with a clearly labelled test lead, then delete that lead at the destination.)

**4. Claims audit (manual + grep).**
```bash
grep -rniE "upi|whatsapp|tally|integrat|log ?in|sign ?up|customers|trusted|testimonial|[0-9]+ ?%|lakh|crore|guarantee" src/config src/components
```
Every hit must be a negation that matches specs/06, or sample data inside a PreviewFrame.

**Acceptance criteria.**
- [ ] `npx playwright test` passes all projects.
- [ ] The screenshot comparison table is filled for 4 widths × 14 blocks (nav, 12 sections, footer).
- [ ] Form scenarios 1–5 pass.
- [ ] The claims audit is clean.
- [ ] The gate passes.

---

## T26 — Final docs update

**Objective.** Make the docs match reality.

**Files/components.** [specs/06-feature-status.md](06-feature-status.md), [CLAUDE.md](../CLAUDE.md), `README.md`. Also [specs/03](03-technical-architecture.md) and [specs/05](05-design-system.md) for recorded deviations and decisions.

**Dependencies.** T25.

**Expected behaviour.**
- **specs/06 statuses:**
  - Marketing landing page → **Implemented & verified** (with the date, and the T25 evidence named).
  - Early-access lead capture → **Implemented & verified** only if scenario 4 passed against the real destination. Otherwise **Partially implemented: endpoint built and tested, destination not configured**.
  - All product capabilities stay **Planned / Unknown / Not planned** as before. No change.
- **CLAUDE.md:** "Development commands" moves from "available after scaffold" to verified-working commands with the date, and lists only commands that actually ran (`dev`, `build`, `start`, `lint`, `typecheck`, `test`, `format`, `test:e2e` if adopted). "Current state" is updated (scaffolded, git yes/no, hosting). It references `AGENTS.md`.
- **specs/03 and specs/05:** record the decisions made during implementation:
  - The form notice approach (T16).
  - FAQ `<details>` vs. fallback (T17).
  - The © year approach (T6).
  - Rate-limit numbers.
  - The webhook scheme rule.
  - Actual contrast and Lighthouse numbers.
  - Deviations from the reference: no pin, 12px previews, 44px touch targets, no marquee, UI-led hero.
- **README:** setup, env var names (no values), scripts, deploy notes (server-capable host), the QA table, and the open questions still pending.

**Acceptance criteria.**
- [ ] Every command listed in CLAUDE.md has been run successfully on the final tree on the stated date.
- [ ] Statuses in specs/06 match the copy and FAQ: `npm run test` content tests still pass.
- [ ] Unanswered open questions are still listed, each with its applied default.

**Validation.** Run each CLAUDE.md command once. `grep -n "Partially implemented\|Implemented & verified" specs/06-feature-status.md`. Manual diff review of the docs.

---

## Dependency graph

```
T0 ─► T1 ─┬─► T2 ─┐
          ├─► T3 ─┼─► T4 ─► T5 ─┐
          │       │      └─► T6 ─┼─► T7..T15, T17, T18 (sections, parallelisable)
          └─► T19 (needs T3) ────┴─► T16 (form UI)
T3,T4,T6 ─► T20 ─► T21
T6..T21 ─► T22 ─► T23 ─► T24 ─► T25 ─► T26
```

| Task | Depends on | Notes |
|---|---|---|
| T0 | — | Hard gate |
| T1 | T0 | |
| T2, T3 | T1 | Can run in parallel |
| T4 | T2, T3 | |
| T5 | T3, T4 | |
| T6 | T3, T4 | |
| T7, T9, T10, T11, T12 | T3, T4, T5, T6 | Need previews |
| T8, T13, T14, T15, T17, T18 | T3, T4, T6 | |
| T19 | T1, T3 | **Run before T16** |
| T16 | T3, T4, T6, T19 | |
| T20 | T3, T4, T6 | |
| T21 | T3, T20 | |
| T22 | T6–T18 | |
| T23 | T6–T21 | |
| T24 | T7–T21 | |
| T25 | T19–T24 | Needs P1 and P2 |
| T26 | T25 | |

Critical path: T0 → T1 → T3 → T4 → T5 → T10 (most complex section) → T22 → T23 → T24 → T25 → T26.

---

## Definition of done (Phase B)

This mirrors the founder brief's acceptance rules, as captured in the decisions brief and specs/01. Every box must be checked.

1. **Complete page:** nav + 12 sections in the order of specs/02, with the ids listed above, + footer, + `/privacy` and `/terms`. Exactly 4 nav links + 1 CTA. No auth links.
2. **No invented facts:** no customer counts, testimonials, stats, logos, integrations, contact details, domain or legal entity. The T25 claims audit is clean, and contact and fallback links appear only from env.
3. **Implemented vs planned is clear:** product copy uses intent phrasing. Every product preview shows "Illustrative preview · sample data". The FAQ and features match specs/06. Lead capture status in specs/06 reflects reality (T26).
4. **Brand centrally configurable:** the name, tagline, nav, CTAs and contact live only in `src/config/brand.ts`, and the T3 rename test passes. Colours, type and spacing live only in `@theme` in `globals.css` (with the T21 mirror exception, tested).
5. **Visual fidelity without copying:** Clarion's relationships are reproduced and the deviations are documented (T25 table). None of Clarion's brand, hexes, healthcare copy, logos, photos, stats or trial fonts are used. Fonts are Newsreader and Geist (OFL), self-hosted.
6. **Responsive:** no horizontal scroll from 320 to 1920. The layout matches the 4 reference widths, the nav switches at 992, and touch targets are ≥44px (T22).
7. **Accessible:** WCAG 2.2 AA per T23, covering keyboard, focus-visible, landmarks, the tabs pattern, the accessible menu and form, AA contrast and reduced motion.
8. **Honest lead capture:** form scenarios 1–5 pass. Success appears only on 200 + `{ok:true}` after an upstream ack. No PII in logs. Unticked consent links `/privacy`.
9. **Performance:** static `/`, minimal client components, no third-party runtime requests, and the T24 targets met or their deviation recorded.
10. **Quality gate:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` and `npx playwright test` all exit 0 on the final tree.
11. **Docs current:** specs/06 statuses and CLAUDE.md commands are updated (T26). Open questions are listed with their applied defaults. No secrets in the repo (`git grep -nE "hooks\.|script\.google|https://.*webhook"` is clean if git is used; otherwise run the same grep with `grep -rn`).

## Open questions (this plan)

All decisions-brief questions Q1–Q8 and plan items P1–P5 are in T0. Additional concerns, kept aligned with the decisions brief:
- **Build-time vs runtime config:** `NEXT_PUBLIC_*` values and the T16 `leadCaptureEnabled` boolean (disabled form + notice) are fixed at build time. Changing contact or webhook env on the host requires a redeploy for the page to reflect it (the API itself reads `LEAD_WEBHOOK_URL` at runtime). Confirm this is acceptable.
- **429 status:** the decisions brief requires a best-effort rate limit but does not name a status code. This plan uses 429 `rate_limited` (**Provisional**). Confirm the limit values.
- **Playwright becomes required for T22, T23 and T25,** although the decisions brief lists it as optional. If it is not adopted, these checks become manual at the same widths.
- **Contact-email gate on lead capture (Provisional):** this plan enables live capture only when both `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are set, so a withdrawal/grievance contact exists at collection (DPDP notice). The decisions brief names only `LEAD_WEBHOOK_URL`. Confirm.
