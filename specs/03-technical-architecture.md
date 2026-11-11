# 03 · Technical architecture: StayPookie marketing & purchase site

| | |
|---|---|
| Status | **Documents the real, shipped site** (commits `c32ed7b` → `cabf640`), confirmed by direct file inspection on 2026-11-11 — not a Phase A plan for code that doesn't exist yet. |
| Brand | "StayPookie," final. `src/config/brand.ts` already holds the real name, company name, nav and CTAs. |
| Source of truth | `specs/01` (requirements/route map), `specs/06` (feature status, including the known bugs this file cross-references), `specs/05` (design tokens). |
| Scope reminder | This repo is the marketing + purchase site **only**. It has no database of its own and never should — tenant/property/billing data lives in the real product's separate backend. The only thing this site's own code needs to get right is collecting a buyer's intent to purchase, taking payment, and (eventually) notifying the real team to provision access. |

---

## 0. Addendum (2026-11-11) — what changed from the original plan

The original version of this document described a **lead-capture-only** landing page: one Next.js route, one API handler (`POST /api/lead`), gated behind an unconfigured webhook, with explicit statements like "there are no other routes: no `/login`, `/signup`, `/pricing`, `/blog` or `/dashboard`." That was written under the same wrong premise as the rest of the original spec set (see `specs/01` §0) — that nothing beyond a waitlist page would ever exist here. It's since been superseded by a real multi-page purchase site. Concretely:

- There is now a real `/pricing` and a real `/checkout` — the exact routes the original document said would never exist.
- The original `/api/lead` contract (§9 below) was genuinely well-built: honeypot, shared zod schema, rate limiting, a "destination must positively acknowledge before you can show success" rule, no PII logging, an 8-second timeout. **That contract is kept below, verbatim in most of its detail, and is now explicitly the pattern checkout's buyer-details step and payment confirmation should follow** — not because the old form is still central, but because the discipline it encoded ("never fake success") is exactly what checkout is currently *failing* to do (see §8.1's flagged bug).
- `/api/lead` itself is likely dead code now, superseded by `/checkout` — confirm before touching it (`specs/06` §4 Q9).

---

## 1. Current state (confirmed 2026-11-11, by direct inspection)

| Item | State |
|---|---|
| Repository root | A real, built Next.js 16 app — not an empty folder. `package.json`, `src/`, `specs/`, `CLAUDE.md`, a real git history (`c32ed7b` → `cabf640`), `node_modules/`, `.next/` build output. |
| Git | A real repository, with six commits documenting the build phases (see `specs/04`). |
| Dependencies (from `package.json`, confirmed current) | `next@16.4.3`, `react@19.3.0`, `react-dom@19.3.0`, `zod@4.6.7` (the only extra runtime dependency — unchanged from the original plan). Dev: `typescript@^5`, `tailwindcss@^4` + `@tailwindcss/turbopack`, `eslint@^10.13.0` + `eslint-config-next@16.4.3`, `vitest@^5.0.5` + `@vitejs/plugin-react` + `jsdom` + Testing Library, `prettier@^3.9.10`, `@types/node@^22.20.5`. |
| Runtime | Node ≥20.9.0 (per `engines`). |
| Routes (confirmed by file listing) | `/` (homepage), `/pricing`, `/checkout`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, **and `/refund`** (see §4 — likely a stray duplicate), plus `/api/lead` (legacy). |
| Product (dashboard, API, database, auth) | **Does not exist in this repo, and never should** — it's the real, separate backend/frontend codebase. This repo has no product data of its own. |

---

## 2. Stack (confirmed, not provisional)

### 2.1 Packages (as actually installed — see `package.json` for the current, authoritative versions; don't re-verify these by re-running a scaffold probe, just read the file)

| Package | Version | Kind | Notes |
|---|---|---|---|
| `next` | 16.4.3 | dep | App Router, `src/`, Turbopack default. |
| `react` / `react-dom` | 19.3.0 | dep | |
| `zod` | 4.6.7 | dep | The only added runtime dependency — shared validation schema, originally built for the lead form, now the pattern to extend to checkout's buyer-details step. |
| `typescript` | ^5 | dev | Strict mode, alias `@/*` → `./src/*`. |
| `tailwindcss` + `@tailwindcss/turbopack` | ^4 | dev | CSS-first: tokens in `@theme` in `src/app/globals.css` (see `specs/05` — this is the real, shipped token file, not a sketch). |
| `eslint` + `eslint-config-next` | ^10.13.0 / 16.4.3 | dev | Flat config. |
| `vitest` + `@vitejs/plugin-react` + `jsdom` + Testing Library | ^5.0.5 / current | dev | Unit/component/route-handler tests. |
| `prettier` | ^3.9.10 | dev | |
| `@types/node` | ^22.20.5 | dev | |

**Still deliberately excluded**, same as the original plan: UI kits, animation libraries, form libraries, icon fonts/CDNs, analytics SDKs, a CMS. Icons are inline SVG. This discipline held up through the real build.

### 2.2 What changed from the original "recommended" stack
Nothing substantive — the real build landed on almost exactly what the original scratch-probe recommended (`next@16.4.3`, `react@19.3.0`, `zod@4.6.7`, the same dev-tool versions). The original document's verification work (the uppercase-scaffold-directory bug, the `@types/node`/vitest ERESOLVE conflict, the Newsreader `axes`/`weight` conflict) is accurate history of how this app was actually built and is kept below (§3) for that reason, even though its font-related findings (Newsreader) don't apply to the real shipped fonts (Fraunces/Figtree — see `specs/05` §4).

---

## 3. Scaffold procedure — historical record, already executed

This section (originally "Phase B, step 1") describes commands that were actually run to produce the real app — not a plan for the future. Kept as an accurate record of real, verified gotchas, useful if the app is ever re-scaffolded or a similar project is started:

- `create-next-app` cannot target a directory whose name contains uppercase letters (verified: fails with an npm-naming error) — scaffold into a lowercase scratch dir and `rsync` in, excluding `CLAUDE.md`/`specs/`.
- Installing `vitest` while `@types/node` is still on an older major fails with ERESOLVE — bump both together.
- The scaffold's generated `AGENTS.md` (pointing at `node_modules/next/dist/docs/`) is still present and still correctly describes the local Next.js docs — keep it; `next dev` re-adds it if deleted.
- `next.config.ts` keeps `cacheComponents: true` and `partialPrefetching: true` — confirmed still relevant: anything time/request-dependent in a server component (e.g. a footer copyright year) must be cached (`'use cache'` + `cacheLife`) or the page stops prerendering as static.

Full original command sequence is preserved in git history / this document's prior revisions if ever needed again; it isn't repeated verbatim here since it's not actionable today (the scaffold already happened).

---

## 4. Application structure (real, confirmed 2026-11-11)

```
src/
  app/
    layout.tsx            # <html lang="en">, root metadata, header/footer, skip link
    page.tsx               # Homepage: composes sections (hero, problem, features, roles, how-it-works, pricing teaser, FAQ, final CTA)
    globals.css            # @theme tokens — the real shipped design system (specs/05)
    pricing/page.tsx        # Real 3-tier comparison + GST disclosure
    checkout/page.tsx       # Plan confirm → buyer details → Razorpay → confirmation (853 lines; see §8.1 for a confirmed bug)
    about/page.tsx
    contact/page.tsx
    privacy/page.tsx        # Draft, marked "needs legal review"
    terms/page.tsx          # Draft, marked "needs legal review"
    refund-policy/page.tsx  # Draft, marked "needs legal review" — linked from brand.ts's footerLegal
    refund/page.tsx         # Near-duplicate of refund-policy/page.tsx (different component name only) — NOT linked from footerLegal or anywhere else found. Flagged as a likely stray route to delete (a code decision — see specs/04 and specs/06 §4 Q4).
    api/lead/route.ts       # Legacy lead-capture endpoint from before /checkout existed (see §9 below) — likely dead, confirm before touching
    icon.tsx, opengraph-image.tsx, robots.ts, sitemap.ts, not-found.tsx
  config/
    brand.ts                # Real: name "StayPookie", companyName, nav (Home/Pricing/How it Works/FAQ/About/Contact), CTAs, footerLegal, contactPlaceholder (phone is a known placeholder — specs/06 §4 Q5)
    site-content.ts          # Section copy, FAQ, sample/demo data (flagged illustrative: true); still contains an `earlyAccess` block — confirm it's unused (specs/06 §4 Q9)
    legal.ts                 # Draft legal text + review status
  components/
    layout/   SiteHeader, SiteFooter
    ui/       Button, Container, Section, etc.
    preview/  Illustrative product previews
    sections/ Hero … FinalCta
  lib/
    (schema/validation, env reads, lead/rate-limit helpers — originally built for /api/lead)
```

---

## 5. Routing (real, confirmed)

| Route | Rendering (expected) | Notes |
|---|---|---|
| `/` | Static prerender | Homepage. |
| `/pricing` | Static prerender (no reason it needs to be dynamic) | 3-tier comparison; has the "online payment Portfolio-only" bug (`specs/06` §4 Q1). |
| `/checkout` | **Should be a mix of static shell + dynamic/server-verified payment step; currently appears to be entirely client-rendered** (`"use client"`), with no server route backing payment confirmation at all — see §8.1. This is a real architecture gap, not a rendering-mode nuance. |
| `/about`, `/contact` | Static prerender | `/contact`'s form destination/behaviour wasn't independently verified in this pass. |
| `/privacy`, `/terms`, `/refund-policy` | Static prerender | Each correctly marked as a legal-review draft. |
| `/refund` | Static prerender | Likely a stray duplicate of `/refund-policy` — see §4. |
| `/api/lead` | Dynamic (`ƒ`) | Legacy; see §9. |
| 404, `/opengraph-image`, `/icon`, `/robots.txt`, `/sitemap.xml` | Static/generated | Unchanged in principle from the original plan. |

There is still, correctly, no `/login`, `/signup`, or `/dashboard` — that part of the original "no other routes" rule is the one part that's still accurate and still intentional (`specs/01` §8.1 FR-04): this site never provides self-serve access, by design, not by omission.

---

## 6. Component architecture

Server-vs-client split is largely unchanged in principle from the original plan (server components by default; client islands only where state/interaction requires it — the header menu, the checkout flow, the FAQ accordion if `<details>` isn't sufficient). What's new:

### 6.1 Checkout's client components
`checkout/page.tsx` is a large (853-line) client component handling plan selection, buyer-details validation, and the Razorpay integration inline. **Reuse the architecture lesson from the original lead-capture form** (§9 below) rather than the current checkout implementation as it stands today: the lead-capture contract split "client-side pre-validation for UX" from "server-side authority for the real decision" — checkout currently only has the client half. A corrected architecture would:
- Keep client-side form validation for responsiveness (this part is fine as shipped).
- Add a real server route (e.g. `POST /api/checkout/order`) that creates the Razorpay order server-side, using a server-only secret key — never trusting `NEXT_PUBLIC_RAZORPAY_KEY_ID` alone for anything but opening the Checkout widget.
- Add a real verification step (Razorpay webhook with signature verification, or the client posting the payment id/signature back to a server route that verifies it against Razorpay's API) before ever setting a "payment confirmed" state — mirroring exactly the "the destination must positively acknowledge before you show success" rule the lead-capture contract already enforces in §9.2 below, and mirroring the real backend's own payment rule (`backend/CLAUDE.md`: "paid state comes only from `/payments/verify` or the signature-verified webhook — never from the client's word alone").
- Never fall back to a `setTimeout`-simulated success when Razorpay isn't configured — that's the one existing pattern this file should explicitly say **not** to copy, even though it clearly was modeled on the lead-capture form's "honest unconfigured state" idea; the difference is the lead form's unconfigured state showed an honest "not connected yet" notice, while checkout's unconfigured state currently shows a **fake success**, which is the opposite of honest.

This is a design note for whoever picks up the fix in `specs/04` — not a change made by this documentation pass.

---

## 7. Data flow

### 7.1 Static content → page (build time) — unchanged in principle
`brand.ts` + `site-content.ts` + `globals.css` → pages, same pattern as the original plan.

### 7.2 Checkout payment flow — current (buggy) state vs. the target state

**Current, confirmed by code inspection:**
```
buyer fills form (client validation only)
  → clicks Pay
  → Razorpay Checkout.js opens (if key configured) OR a setTimeout fires immediately (if not)
  → Razorpay's own client-side `handler` callback (or the timeout) sets isSuccess = true
  → confirmation screen shown
```
No server round-trip exists anywhere in this flow today. Buyer details reach Razorpay only as order `prefill`/`notes` (visible in the Razorpay dashboard for a *real* transaction); when the fake-success fallback path fires, nothing is recorded anywhere.

**Target, matching the real backend's own payment rule and the lead-capture form's "never fake success" discipline:**
```
buyer fills form (client validation, same as today)
  → POST /api/checkout/order (server creates the real Razorpay order, server-side key)
  → Razorpay Checkout.js opens with that real order id
  → on the client's reported success, POST the payment id + signature to a server route
  → server verifies the signature against Razorpay (or waits for/validates a webhook)
  → confirmation is shown ONLY after that server-side verification succeeds
```
This is a scope note for `specs/04`, not a change this pass makes.

### 7.3 Legacy lead submission (request time) — unchanged, if `/api/lead` is still live
Same sequence as the original document: client zod pre-validation → `POST /api/lead` → rate limit → parse → zod → config check → forward to webhook (8s timeout, must ack `{ok:true}`) → honest 200/400/429/502/503. This is still a good pattern; it's just unclear whether this route is still reachable from any UI (`specs/06` §4 Q9).

---

## 8. Known issues (confirmed by code/file inspection, 2026-11-11)

These are documented here as architecture-level findings; fixing them is `specs/04`'s job, not this file's.

### 8.1 Checkout payment confirmation is not actually verified (highest severity)
See §6.1 and §7.2. `checkout/page.tsx`'s success state is set directly by a client-side Razorpay `handler` callback, with an explicit `setTimeout`-based fake-success fallback when Razorpay isn't configured (commented in the source as "Fallback to simulated integration response"). No server route verifies any payment. This is a real payment-integrity gap, not a copy/consistency issue — see `specs/06` §4 Q0.

### 8.2 `/refund` vs `/refund-policy`
Near-identical page content (confirmed by direct file diff — the only difference found was the exported component's name), and only `/refund-policy` is linked from `brand.ts`'s `footerLegal`. `/refund` appears to be an orphaned duplicate route. A code decision for `specs/04`: delete the one nothing links to, don't maintain two copies of the same policy.

### 8.3 `/api/lead` and the `earlyAccess` content block
Likely dead code, superseded by `/checkout`. Confirm nothing in the current UI still renders or links to them before removing.

---

## 9. `/api/lead` contract — kept as the reusable pattern, status: likely legacy

This section is preserved essentially as originally written, because the *discipline* it encodes is exactly what §6.1/§7.2/§8.1 are asking checkout to adopt — not because this specific endpoint is necessarily still load-bearing.

### 9.1 Request
`POST /api/lead`, JSON, ~8KB max body. Fields: `name`, `property`, `phone`/`email` (at least one), `city`, `beds` (enum), `properties` (enum, optional), `challenge` (optional, ≤500 chars), `consent` (must be `true`), `website` (honeypot, must be empty). Shared zod schema (`lib/lead-schema.ts`) used by both client and server.

### 9.2 Processing order
1. Rate limit by trusted client IP (best-effort, in-memory, ~5 requests/10 min) → 429.
2. Parse (wrong content-type / bad JSON / oversize) → 400.
3. Validate with zod (schema failure or honeypot hit) → 400.
4. Config check (webhook/contact/privacy-review gate) → 503.
5. Forward only the picked fields (never the honeypot) to the configured webhook, 8s timeout.
6. **Success only if the destination replies 2xx with JSON `{ok:true}`** — this is the core rule to reuse for checkout: a client-reported "it worked" is never enough; something authoritative (here, the webhook's ack; for checkout, Razorpay's verified server-side confirmation) must confirm it first.

### 9.3 Responses
200 `{ok:true}` (only after a real ack) · 400 `invalid` (with/without `fieldErrors`) · 429 `rate_limited` · 502 `upstream` (destination failed, timed out, or returned a non-JSON/non-`{ok:true}` 2xx — e.g. a Google Apps Script HTML error page, explicitly tested for) · 503 `not_configured`.

### 9.4 Privacy and logging
Never logs PII (name/phone/email/challenge text or the webhook URL itself). Logs an outcome code and upstream status only. The honeypot field is never forwarded. This "no PII in logs, only outcome codes" rule should extend to checkout too (never log full card/payment details; log payment status/order id only, and only server-side).

---

## 10. Build, deployment and testing

Unchanged in principle from the original plan: `npm run lint && npm run typecheck && npm test && npm run build` as the quality gate; static export remains the wrong choice (it would drop the dynamic routes checkout needs once it has a real server verification step, same reasoning as the original document gave for `/api/lead`); hosting must be server-capable (Vercel, or Netlify with the Next.js runtime). `cacheComponents`/`partialPrefetching` stay on unless they cause friction, per the original scaffold decision.

---

## 11. Open items for this document

See `specs/06` §7 and `specs/04` for the full list; the architecture-specific subset is:
1. Build the real server-side Razorpay order-creation + verification routes (§6.1, §7.2, §8.1) — the single highest-priority fix.
2. Resolve `/refund` vs `/refund-policy` (§8.2).
3. Confirm and likely remove `/api/lead` + the `earlyAccess` content block (§8.3).
4. Confirm `/contact`'s form actually has a working destination (not independently verified in this pass).
