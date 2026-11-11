# 04 — Implementation plan: shipped phases and remaining fixes

Status: this document previously planned a single-page, lead-capture-only build that hadn't started yet. That build happened, then grew well past its original scope into a real multi-page purchase site. This version replaces the forward-looking plan with (1) a record of what actually shipped, confirmed against git log, and (2) the concrete remaining-fixes task list for what's still broken, confirmed by direct code/file inspection on 2026-11-11.

---

## 0. Addendum (2026-11-11)

The original T0–T26 task breakdown (approvals → scaffold → tokens → brand/content → primitives → previews → header/footer → 12 landing sections → lead API → legal/SEO → responsive/a11y/performance passes → QA → final docs) was written for a page that never shipped in that exact form — events moved faster than the plan. What actually happened, per git log:

| Commit | What it shipped |
|---|---|
| `c32ed7b` | Initial commit: the original lead-capture-only landing page (Phase A/B as originally planned). |
| `c9ca4ae` | Design system tokens, brand identity, global layout — the real ivory/clay/espresso system and "StayPookie" branding (see `specs/05`). |
| `697ad32` | Homepage rebuilt: role-scoped sections and interactive previews, replacing the early-access-only homepage. |
| `8238f50` | `/pricing`: dedicated 3-tier comparison matrix with GST disclosure. |
| `3a5672e` | `/checkout`: assisted-onboarding checkout flow with a Razorpay integration point. |
| `cabf640` | `/about`, `/contact`, and the legal policy pages (terms, privacy, refund). |

That's five real feature phases shipped on top of the original lead-capture build, in the span the original plan allotted to finishing one page. The quality-gate discipline, testing approach, and acceptance-criteria habit from the original T0–T26 are still good practice (§3 below) — they just need to be pointed at what's actually left to fix, not at a page that no longer exists in its original form.

---

## 1. Shipped phases — what's done, what to verify before calling it fully done

| Phase | Shipped in | Status |
|---|---|---|
| Design system / brand setup | `c9ca4ae` | **Done.** Real tokens in `src/app/globals.css`, real brand in `src/config/brand.ts`. See `specs/05` for the one open item (two contrast failures found when the tokens were recomputed against the real palette). |
| Homepage rebuild (hero, problem, features, roles, how-it-works, pricing teaser, FAQ, final CTA) | `697ad32` | **Done, with known bugs** — see §2 tasks F1–F4 below. |
| `/pricing` | `8238f50` | **Done, with one factual bug** — §2 task F1. |
| `/checkout` | `3a5672e` | **Done as a UI flow, but not done as a trustworthy payment flow** — §2 task F0 (highest priority). |
| `/about`, `/contact`, legal pages | `cabf640` | **Done**, with two known gaps — §2 tasks F5 (placeholder phone) and F8 (legal review), plus F9 (`/refund` duplicate) and F10 (confirm `/contact`'s form destination). |

---

## 2. Remaining fixes (not yet done) — the actual next phase

Numbered F0–F10 by severity, not by dependency order; most are independent and can be done in any order except where noted.

### F0 — Checkout payment verification (highest priority; a trust/integrity bug, not a copy bug)

**Objective.** Stop showing a "payment received" confirmation without a real, server-verified payment.

**Confirmed problem** (`specs/03` §6.1, §7.2, §8.1): `checkout/page.tsx`'s success state is set directly by the Razorpay client-side `handler` callback. When `NEXT_PUBLIC_RAZORPAY_KEY_ID` is unset or the SDK fails to load, it falls back to a `setTimeout` that shows success anyway — explicitly commented in the source as a "simulated integration response." There is no server route anywhere (`src/app/api/`) that creates a Razorpay order or verifies a payment.

**Fix.**
1. Add a server route that creates the real Razorpay order (server-side secret key, real amount from the real plan catalogue — never trust a client-supplied amount).
2. After the client-side Checkout flow reports success, verify it server-side — either via Razorpay's webhook (signature-verified) or by posting the payment id/signature back to a server route that verifies it against Razorpay's API. This mirrors the real backend's own rule (`backend/CLAUDE.md`: paid state comes only from a verified source, never the client's word alone) and the legacy lead-capture form's "destination must ack before success" rule (`specs/03` §9.2) — both already-proven patterns in this codebase.
3. Only show the confirmation screen after that server-side verification succeeds.
4. **Delete the `setTimeout` fake-success fallback entirely.** If Razorpay isn't configured, show an honest "payment isn't set up yet" state (same honesty principle as the old lead form's "isn't connected yet" notice) — never a fake success.
5. Capture buyer details (name/email/phone/hostel/city/plan) server-side at order-creation time, independent of whether the payment completes, so an abandoned checkout still leaves a record the team can follow up on manually.

**Acceptance criteria.**
- [ ] No code path can reach the confirmation screen without a server-verified Razorpay payment.
- [ ] Buyer details are captured server-side before payment, not only inside the Razorpay order's `notes`.
- [ ] Payment details (card numbers, full payment payloads) are never logged; only an outcome/status and order id are.

### F1 — Pricing table payment-gating fix
`/pricing`'s comparison table lists online payment as Portfolio-only; the real backend doesn't gate it by plan (`specs/06` §3.1). Fix the table to list it on every tier; keep Portfolio's real differentiator (priority phone/dedicated-rep support) as-is.

### F2 — 24-hour SLA consistency
Homepage/FAQ currently say the team "connects within 2 hours" / "operational day one" in places; `/pricing`, `/checkout` and `/terms` say 24 hours. Standardize on **24 hours**, everywhere it's mentioned.

### F3 — Hero "Product Screenshot Placeholder" text
The hero shows this literal text to real visitors. Replace with a real illustrative preview (same "Illustrative preview · sample data" captioning convention used elsewhere) or a proper empty-state visual — never visible placeholder-labelled text in production.

### F4 — `#contact` anchor
"Talk to Setup Team" (homepage) and "Talk to us" (pricing) link to a `#contact` anchor that may not resolve to a real section id. Either add the id to a real section, or point these links at `/contact` directly.

### F5 — Placeholder phone number
`+91 98765 43210` is live on the footer, `/contact`, `/privacy` and `/refund-policy`. Replace with StayPookie's real business number before launch.

### F6 — Footer copyright typo (resolved)
Was "...Pvt. Ltd.. All rights reserved." (double period). Fixed by dropping the "Pvt. Ltd." suffix entirely — there is no registered private limited company (see CLAUDE.md "Project identity"); the line now reads "© StayPookie. All rights reserved."

### F7 — `/refund` vs `/refund-policy`
Near-duplicate pages (`specs/03` §8.2); only `/refund-policy` is linked anywhere. Delete `/refund` unless something still depends on it.

### F8 — Legal review
`/terms`, `/privacy`, `/refund-policy` are correctly marked "placeholder — needs legal review before launch." Get that real review before launch; don't remove the marking before then.

### F9 — Confirm/remove legacy lead-capture code
`/api/lead` and the `earlyAccess` block in `site-content.ts` predate `/checkout`. Confirm nothing in the current UI still links to or renders them; if nothing does, remove them rather than keep dead code.

### F10 — Confirm `/contact`'s form destination
Not independently verified in this documentation pass — confirm the contact form actually submits somewhere real, or apply the same "honest disabled state" pattern as the original lead form if it doesn't yet.

### F11 — Homepage design audit findings (`specs/02` §22)
A 2026-11-11 first-party design audit of the real shipped homepage components (not a Clarion comparison) found 10 design issues — section-template monotony, unused real product photography (`src/assets/photos/`), decorative status-tag/footer overuse, hero mockup density, redundant pricing CTAs, click-gated feature content, front-loaded motion, and undifferentiated role cards. Full findings and suggested fixes are in `specs/02` §22.1–22.2; not yet actioned. Lowest-risk, highest-impact starting point: use the real photos somewhere, trim the repeated card footers, and de-duplicate the four `/pricing` CTA labels.

---

## 3. Testing and quality-gate practices worth keeping

The original plan's process discipline is still good practice for whichever of F0–F10 gets picked up next — not stale, just needs re-pointing:

- **Gate:** `npm run lint && npm run typecheck && npm test && npm run build` must exit 0 before considering any fix done.
- **Route-handler test pattern** (originally written for `/api/lead`, directly reusable for F0's new checkout API routes): mock `fetch`/the payment-provider SDK, assert the exact response for each outcome (success only after a real ack; a non-2xx or malformed response from the payment provider must never produce a success response; PII/payment details never appear in `console.*` calls during tests).
- **Claims audit grep**, extended for the new pages: a scan of `src/config` and `src/components` for forbidden terms (adapted from the original list) plus a check that online payment and multi-property are *not* described as tier-gated or "unknown" anywhere (`specs/06` §5).
- **Responsive/a11y passes** (originally T22/T23): still valid targets — no horizontal overflow 320–1920px, ≥44px touch targets, visible focus rings, WCAG 2.2 AA contrast. Re-run these against `/pricing` and `/checkout` specifically, since those are the two routes added after the original a11y pass was written and weren't covered by it.
- **Claims/content review before shipping copy**: still the right process, now checked against `specs/06` instead of the old founder-brief-based register.

## 4. Open questions

Duplicated from `specs/06` §7 and `specs/03` §11 so the three documents don't drift:
1. Real fix for F0 (see above) — architecture decision on webhook vs. client-verify-then-check pattern.
2. Whether `/contact`'s form has a real destination today (F10).
3. Whether Hindi/regional-language support is wanted for this site specifically (unconfirmed either way, `specs/06` §3.2).
4. Whether analytics should ever be added — none exists today, and none was asked for.
