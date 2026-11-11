# 06 — Feature status register

Product: **StayPookie** (final brand name; renamed from the working name "Meraki" before this site's current build). It is a hostel and PG management SaaS for owners and operators in India.
Last updated: 2026-11-11. This repo is the **marketing + plan-purchase website only**. The real product — owner/manager/student dashboards, database, API, auth, billing — is a separate, already-live codebase. This register describes that real product's capabilities (what this site is allowed to claim) and, separately, this site's own shipped pages.

This file is the **single source of truth** for what StayPookie can and cannot do, for the purpose of this site's copy. Landing-page copy, the FAQ, previews, metadata, sales messages and anything else that describes the product must agree with it. If copy and this file disagree, this file wins. Fix the copy, or update this file with evidence first (see [How to update](#6-how-to-update-this-document)).

Related: [specs/01-product-requirements.md](01-product-requirements.md) · [specs/02-ui-ux-reference.md](02-ui-ux-reference.md) · [specs/03-technical-architecture.md](03-technical-architecture.md) · [specs/04-implementation-plan.md](04-implementation-plan.md) · [specs/05-design-system.md](05-design-system.md)

---

## 0. Addendum (2026-11-11) — this register was rewritten from scratch

**The version of this file before today was wrong at the root, not just out of date.** It was built from a founder brief plus an inspection of this one (at-the-time-empty) folder, and concluded from that empty folder that *no part of the product existed anywhere*. In fact the real product was already built and running in a separate codebase the whole time; this folder was never the product, only ever meant to be its marketing site. That mistake produced a feature register that called live, working capabilities (online payment, multi-property management, staff roles, deposits, receipts) "Not planned" or "Unknown," and justified a lead-capture-only, no-pricing scope that no longer matches what this site is for.

Everything below is rewritten against the real evidence: the actual backend/frontend codebases (not a founder brief) and the actual shipped pages of this site (confirmed by git log and direct file inspection, not an "empty repo" assumption). The status legend, the "Evidence required" discipline and the claims checklist are kept — that framework is sound. What changed is what it's checking against.

---

## 1. Evidence basis

| Check | Result (2026-11-11) |
|---|---|
| The real product (owner/manager/student dashboards, API, database, auth) | **Exists and is live**, in a separate backend + frontend codebase, not in this repo. This repo has no dashboard, database or product auth of its own, and isn't supposed to. |
| This repo's own pages | A Next.js site with a homepage, `/pricing`, `/checkout`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy` (plus a stray duplicate `/refund` — see §4), confirmed by direct file inspection and git log (commits `c9ca4ae`, `697ad32`, `8238f50`, `3a5672e`, `cabf640`). |
| Product capability evidence | The real backend's module set and plan catalogue (rooms/beds, students, payments, complaints, leave, visitors, maintenance, inventory, staff, announcements, events, analytics, search, emergency; the subscription plan catalogue). Treat the real backend as the source of truth for capability claims — not a founder brief, and not this folder's own (non-existent) code. |
| Customers, pilots, testimonials, usage metrics | **None known to this site.** None may be stated or implied, regardless of how real the underlying product is — see §5. |

Consequence: a capability is "Implemented & verified" here when it's a real, shipped part of the backend/frontend product, independent of whether this marketing site's own code mentions it yet.

---

## 2. Status legend

| Status | Meaning | Evidence required | Landing-page treatment |
|---|---|---|---|
| **Implemented & verified** | Live and working in the real product today. | A named module/feature in the real backend, or a plan-catalogue entry, confirmed by inspection. | Present tense, confidently: "StayPookie tracks…", "Online payment is live". Never hedge a real capability with "designed to" or "being built." |
| **Partially implemented** | Exists but incomplete, or built without a working destination/integration (used here mainly for this *site's own* unfinished pieces, e.g. the legacy lead form). | Code reference plus a note on what's missing. | Describe only the verified part. |
| **Unknown – needs confirmation** | Not confirmed against the real backend one way or the other. | None yet. | Do not feature it. FAQ-safe wording only if asked directly ("tell us in the contact form"). |
| **Not planned (do not claim)** | Confirmed out of scope for the real product. | A real, confirmed absence (not an assumption from an empty folder). | Never imply it. |

Rules:
- A capability stays *Unknown* until someone actually checks the real backend/frontend (or asks the team) — don't downgrade something to Unknown just because this site's own code doesn't reference it.
- No dates, no "coming soon," no outcome statistics ("saves 10 hours/week") unless the real product has published, verified numbers.
- Never claim a feature is plan-gated unless the real plan catalogue actually gates it (see §3.1 payments row — this is the one row the live site currently gets wrong).

---

## 3. Product capability register (the real product)

### 3.1 Core operations — real, live backend

| Capability | Status | Evidence | May say | Must not say |
|---|---|---|---|---|
| Rooms, beds & occupancy (single/double/triple/quad, waitlists) | **Implemented & verified** | Real backend: rooms/beds modules | "StayPookie shows live room and bed occupancy, including waitlists." | Nothing is held back here — it's real. |
| Tenant admission, profiles & move-out | **Implemented & verified** | Real backend: students module (admission, profile, move-out lifecycle) | "Admit a resident, manage their profile, and process move-out — all in StayPookie." | — |
| Automatic monthly rent (pro-rated first month, configurable due date, optional late fees) | **Implemented & verified** | Real backend: payments/charges module | "Rent is generated automatically every month, pro-rated on the way in, with an optional late fee after a grace period." | — |
| **Online rent payment via Razorpay** | **Implemented & verified — live on every paid tier.** The real backend applies no plan-based gating to this feature; only property/bed/staff *counts* are tier-limited. | Real backend: payments module, Razorpay Checkout integration; plan catalogue has no payment-feature gate | "Residents can pay rent online via Razorpay — on Starter, Growth and Portfolio alike." | **"Online payment is a Portfolio-only feature"** — this is the live site's current, incorrect claim on `/pricing`. It must be fixed to match this row, not the other way around (see §4). |
| Manual payment recording, PDF receipts, deposits & refunds | **Implemented & verified** | Real backend: payments module | "Record cash/UPI/bank payments by hand, generate PDF receipts, and track refundable deposits." | — |
| Complaints, with status history | **Implemented & verified** | Real backend: complaints module | "Residents file complaints; status changes are tracked." | — |
| Leave requests, with status history | **Implemented & verified** | Real backend: leave module | — | — |
| Visitor management, with status history | **Implemented & verified** | Real backend: visitors module | — | — |
| Maintenance tickets | **Implemented & verified** | Real backend: maintenance module | — | — |
| Inventory tracking | **Implemented & verified** | Real backend: inventory module | — | — |
| Staff management across roles (manager, warden, accountant, housekeeping, security, cook, maintenance) | **Implemented & verified** | Real backend: staff module | "Add staff across every role your property needs." | — |
| Targeted notices / announcements | **Implemented & verified** | Real backend: announcements module | — | — |
| Emergency alerts | **Implemented & verified** | Real backend: emergency module | — | — |
| Owner analytics across a whole portfolio | **Implemented & verified** | Real backend: analytics module | "Owners see analytics across every property in their organization." | — |
| **Multi-property management under one organization** | **Implemented & verified — live today.** | Real backend: properties/organization scoping (an owner sees every property in their org) | "Run two properties or twenty-five, from one account." | **"We're exploring it" / "Unknown"** — the previous version of this file said this; it was wrong. |
| Automatic bank/UPI statement reconciliation (distinct from *accepting* an online payment) | **Unknown – needs confirmation.** Accepting a Razorpay payment is not the same claim as automatically matching bank/UPI statement lines. | Not confirmed either way | Do not feature it. If asked: confirm with the team before answering. | "StayPookie automatically reconciles your bank statement" |
| Third-party integrations (WhatsApp, Tally, accounting tools) | **Not planned (do not claim)** — not on the real feature list | Real feature list has no such integration | Nothing. No integrations section, no partner logos. | Any integration claim |
| Owner/manager/student authentication & accounts | **Implemented & verified**, in the real product. **This site has no login of its own, by design** (see §4 and `CLAUDE.md`): access is manually provisioned after purchase. | Real backend: auth module (JWT, role-scoped) | On this site: "We'll set up your account and email your login" — never "Log in" or "Sign up" links here. | A login/signup link anywhere on this marketing site |
| Student-facing portal (pay rent, raise complaints, request leave, read notices) | **Implemented & verified**, as part of the real application. **Out of scope for this marketing site** — it's not something this site needs to show or link to. | Real backend/frontend: student role | — | Implying this site itself has a tenant-facing area |

### 3.2 Additional capabilities

| Capability | Status | Evidence | May say | Must not say |
|---|---|---|---|---|
| Security deposits (record, adjust, refund on move-out) | **Implemented & verified** | Real backend: payments module (deposits/refunds) | — | — |
| Rent receipts (PDF) | **Implemented & verified** | Real backend: payments module | — | — |
| Reports / exports (CSV, PDF, beyond receipts) | **Unknown – needs confirmation.** Owner analytics is confirmed; specific export formats are not. | Not confirmed | Nothing beyond "owner analytics." | "Export to Tally/Excel", "GST-ready reports" |
| Notifications / reminders beyond in-app notices (SMS/WhatsApp to residents) | **Not planned (do not claim)** — not on the real feature list; would also require an integration (see 3.1) | Real feature list has no such channel | The in-app notices/emergency-alerts claims above are enough. | "Automatic WhatsApp rent reminders" |
| Document storage (tenant ID proofs, agreements) | **Unknown – needs confirmation.** High sensitivity (DPDP Act 2023) if it exists — confirm before claiming. | Not confirmed | Nothing. | Any ID-proof/KYC/Aadhaar claim |
| Electricity / utility / metered add-on charges | **Unknown – needs confirmation.** "One-off charges" exist generically in payments; utility-specific metering is not separately confirmed. | Not confirmed | Nothing beyond generic "one-off charges" if that's confirmed. | "Electricity billing", "split utility bills" |
| Mobile app (native Android/iOS) | **Unknown – needs confirmation.** The real frontend is a responsive web app; a native app is not confirmed. | Not confirmed | Nothing. A responsive site is not a mobile app. | "Download the app" |
| Hindi / regional-language support | **Unknown – needs confirmation**, for both the real product and this marketing site. This site ships English-only today. | Not confirmed | Nothing. | "Available in Hindi" |
| Pricing / plans | **Implemented & verified — live on this site today.** | `/pricing` page, real backend plan catalogue | See §4 and `specs/01` for the exact figures. | A 4th tier, a free trial, a discount code, or annual billing — none of these exist; don't invent them. |
| Data security / hosting / backups, certifications | **Partially known.** The real backend runs in production against a real database. Specific security certifications (ISO/SOC2/"DPDP compliant" as a certified claim) are **not confirmed**. | Production backend confirmed to exist and run; certifications not confirmed | Only true, specific statements (e.g. what `/privacy` actually discloses). | "Bank-grade security", "DPDP compliant" (as a certification), "ISO/SOC 2 certified" |
| Offline use | **Unknown – needs confirmation** | Not confirmed | Nothing | "Works offline" |

---

## 4. This site's own pages (Phase B+ deliverables, shipped)

Evidence: direct file inspection of `src/app/` on 2026-11-11, plus git log (`c32ed7b` → `cabf640`).

| Item | Status | Evidence | Notes / known bugs |
|---|---|---|---|
| Design system & brand identity | **Implemented & verified** | `c9ca4ae`; `src/app/globals.css` matches the real product's ivory/clay/espresso palette | See `specs/05`. |
| Homepage (hero, problem, features, roles, how-it-works, pricing teaser, FAQ, final CTA) | **Implemented & verified** | `697ad32`; `src/app/page.tsx` | **Known bugs, not yet fixed:** (1) hero visual shows the literal visible text "Product Screenshot Placeholder" to real visitors — must be replaced with a proper empty-state visual, never visible placeholder text; (2) homepage/FAQ copy claims online payment is "live on every paid tier" in some places (correct, keep) but implies a 2-hour contact / day-one-operational SLA in others (wrong, see `/checkout` row); (3) "Talk to Setup Team" links to a `#contact` anchor that may not resolve to a real section id on this page — verify, and either add the id or point the link at `/contact`. |
| `/pricing` (3-tier comparison) | **Implemented & verified**, with one factual bug | `8238f50`; `src/app/pricing/page.tsx` | Real tiers and limits are correct (see `specs/01` §2). No GST is charged or claimed (StayPookie has no GST registration). Price display itself is currently flagged off site-wide (`flags.showPricing = false`) while sourcing design partners — see `specs/01` §7.2. **Bug: the feature comparison table lists "Online rent collection" as Portfolio-only** — per §3.1 above, the real backend does not gate this feature by plan. Fix the table to list it for every tier; don't invent a replacement Portfolio-only perk — Portfolio's real differentiator is priority (phone + dedicated rep) support, which the page already states correctly. |
| `/checkout` (plan confirm → buyer details → Razorpay → confirmation) | **Implemented, with a real payment-integrity bug, not just a copy bug** | `3a5672e`; `src/app/checkout/page.tsx` (confirmed by direct code inspection, 2026-11-11) | **Confirmed bug:** the confirmation screen is driven entirely client-side. The Razorpay `handler` callback sets `isSuccess = true` directly with no server-side order creation or payment verification anywhere in `src/app/api/` (only `/api/lead` exists). Worse, when `NEXT_PUBLIC_RAZORPAY_KEY_ID` is unset or the SDK fails to load, the code falls back to a `setTimeout` that shows the success screen anyway, explicitly commented "Fallback to simulated integration response" / "Simulates secure round-trip payment handling." This means a visitor can currently reach the "payment received" confirmation with no real payment having happened. It directly contradicts the "never fake a successful payment" rule this very file and `CLAUDE.md` both state, and mirrors the exact anti-pattern the real backend and the legacy lead-capture form (`specs/03` §9) were both built to avoid. Also note: buyer details (name/email/phone/hostel/city) are only ever sent to Razorpay as `prefill`/`notes` on the client-created order object — there is no server-side capture of them independent of a real, completed Razorpay transaction, so an abandoned or faked "purchase" leaves no record anywhere for the team to act on. Fixing this (real order creation + webhook/signature verification server-side) is a code change tracked in `specs/04`, not something this documentation pass resolves. The 24-hour-SLA wording-consistency issue described in the original version of this row is also still real and unfixed (homepage/FAQ said "2 hours"/"day one" in places) — see `specs/04`. |
| `/about` | **Implemented & verified** | `cabf640`; `src/app/about/page.tsx` | Keep factual; no invented founding story or team bios unless real ones are supplied. |
| `/contact` | **Implemented & verified** | `cabf640`; `src/app/contact/page.tsx` | Uses a placeholder phone number (see below). |
| `/terms`, `/privacy`, `/refund-policy` | **Implemented — explicit drafts, pending legal review** | `cabf640`; each page is marked "placeholder — needs legal review before launch" | That marking is correct and must stay until a real legal review happens — don't quietly remove the draft notice. |
| `/refund` | **Likely stray duplicate of `/refund-policy`** — near-identical content, different component name, and `brand.ts`'s `footerLegal` links only to `/refund-policy`, so nothing in the site currently links to `/refund`. | Direct file diff, 2026-11-11 | This is a code question (which route to delete), not a copy question — flagged here, not fixed by this documentation pass. See `specs/03` and `specs/04`. |
| Placeholder phone number (`+91 98765 43210`) | **Known placeholder, live in production** on the footer, `/contact`, `/privacy` and `/refund-policy` | `brand.ts` `contactPlaceholder.phone`; confirmed live on staypookie.com | Needs the real business number before this is launch-ready. Not a documentation fix. |
| Footer copyright line | **Resolved**: used to render with a double period ("Pvt. Ltd.. All rights reserved.") | Fixed by dropping the "Pvt. Ltd." suffix — there is no registered private limited company (CLAUDE.md "Project identity") | Now reads "© StayPookie. All rights reserved." |
| `/api/lead` + the `earlyAccess` block in `site-content.ts` | **Legacy, likely dead** — built for an earlier lead-capture-only version of this site, before the purchase flow existed. | `c32ed7b` (original lead-capture build); superseded by `/checkout` | Confirm nothing still links to it; if nothing does, remove it rather than keep dead code (a code change, not a spec change). |
| Analytics / tracking on this site | **None** | No analytics code found | Unchanged from before. |

---

## 5. Claims checklist (run before shipping any copy or UI change)

**Capabilities**
- [ ] Every capability mentioned appears in §3 with the right status, and nothing *Unknown* or *Not planned* is claimed as live.
- [ ] Real, live capabilities (§3.1/§3.2) are written in confident present tense — never hedged with "being built," "designed to," or "we're exploring it." Those phrases are banned for anything in this register marked *Implemented & verified*.
- [ ] Online payment is described as available on **every paid tier**, consistently, everywhere it's mentioned (homepage, FAQ, `/pricing`'s own comparison table).
- [ ] Multi-property management is described as a live capability, not a maybe.
- [ ] No "Log in" / "Sign up" link anywhere on this site — access is manually provisioned, and copy should say so plainly where relevant (e.g. the checkout confirmation step), not imply instant self-serve access.

**Proof and numbers**
- [ ] No customer counts, "trusted by," logos, testimonials, ratings, case studies, or outcome statistics — none exist for this product's marketing site, regardless of how real the backend is.
- [ ] No prices beyond the real three tiers in `specs/01` §2, no free trial, no discount code, no annual-billing option, unless one is confirmed to actually exist.
- [ ] The account-setup/login turnaround is stated as **24 hours**, identically, on every page that mentions it (homepage, FAQ, `/pricing`, `/checkout`, `/terms`).

**Contact, legal and data**
- [ ] Contact details shown are either real or clearly marked placeholder internally (not presented to a visitor as if verified) — the current phone number is a known placeholder pending a real one.
- [ ] `/terms`, `/privacy` and `/refund-policy` keep their "placeholder — needs legal review" notice until a real review happens.
- [ ] No security/compliance certification claims ("DPDP compliant," "bank-grade," ISO/SOC2) unless actually certified.
- [ ] Checkout only shows a success state after a real, verified payment confirmation — never faked, including in dev/demo.

**Brand**
- [ ] "StayPookie" throughout — no leftover "Meraki" anywhere in copy, metadata, or sample data labels.

---

## 6. How to update this document

Feature status changes go **here first**. Copy, the FAQ and previews change afterwards, in the same or a later change.

1. **Evidence is mandatory.** A status moves only with a named source: a real backend module/plan-catalogue entry (for product capabilities), or a file/commit reference (for this site's own pages). "Founder brief" and "empty folder" are no longer valid evidence sources — this register's own history shows what that produces.
2. Update the row's "May say" / "Must not say" columns to match.
3. **Downgrades are allowed and must be immediate.** If a feature is removed or rolled back in the real product, lower its status and fix the copy in the same change.
4. Add a change-log entry (§8) with the date, the row(s), the old status → new status, the evidence, and the author.
5. Run the claims checklist (§5) against the live copy and FAQ after any status change.
6. Do not edit statuses based on intent, a demo, or a verbal promise. Only confirmed real-product behaviour counts.

---

## 7. Open questions

| # | Question | Rows affected |
|---|---|---|
| **Q0 (highest priority — not a copy bug, a payment-integrity bug)** | **`/checkout` shows a payment-success confirmation without any real server-side payment verification, and fakes success outright when Razorpay isn't configured.** Needs real order creation + webhook/signature verification server-side before this site can be trusted to gate real account provisioning on it. | §4 `/checkout` |
| Q1 | Fix the `/pricing` comparison table so online payment is listed for every tier, not Portfolio-only. | §4 `/pricing` |
| Q2 | Standardize the account-setup/login turnaround to 24 hours everywhere (homepage/FAQ currently say 2 hours / day-one in places). | §4 homepage, `/checkout` |
| Q3 | Replace the visible "Product Screenshot Placeholder" text in the hero with a real empty-state visual. | §4 homepage |
| Q4 | Resolve the `/refund` vs `/refund-policy` duplicate (delete the unlinked one). | §4 |
| Q5 | Replace the placeholder phone number with the real business number before launch. | §4 |
| Q6 | Fix the footer copyright double-period typo. | §4 |
| Q7 | Confirm the `#contact` anchor actually resolves, or repoint "Talk to Setup Team" / "Talk to us" to `/contact`. | §4 homepage, `/pricing` |
| Q8 | Get real legal review of `/terms`, `/privacy`, `/refund-policy` before launch. | §4 |
| Q9 | Confirm whether `/api/lead` and the `earlyAccess` content block are still referenced anywhere; remove if dead. | §4 |
| Q10 | Confirm automatic bank/UPI statement reconciliation, document storage, utility billing, mobile app, and Hindi support with the real product team before claiming any of them. | §3.1, §3.2 |
| Q11 | ~~Reconfirm GST treatment on every future price change~~ — **Resolved.** No GST is charged or claimed anywhere on the site: StayPookie has no GST registration (CLAUDE.md "Project identity"). Revisit only if GST registration is actually obtained. | §3.2 pricing |

---

## 8. Change log

| Date | Change | Rows | Evidence | Author |
|---|---|---|---|---|
| 2026-10-29 | Initial register created in Phase A, against a founder brief and an empty-folder inspection. All product capabilities set to *Planned*/*Unknown*/*Not planned*. (Superseded — see 2026-11-11 entry.) | All | Founder brief; empty-repo inspection | Phase A documentation |
| 2026-10-29 | Phase B build: landing page implemented (lead-capture only, disabled pending config). | §4 (then numbered differently) | Code + tests | Phase B |
| 2026-11-11 | **Full rewrite.** Brand finalized to StayPookie. Every core-operations and most additional-capabilities rows flipped from Planned/Unknown/Not-planned to Implemented & verified, against the real backend as evidence instead of a founder brief. Added `specs/01` pricing as a real, live requirement. Rewrote §4 to describe this site's actual shipped pages (homepage, pricing, checkout, about, contact, legal) instead of a lead-capture-only page, with known bugs flagged (payment-gating copy, SLA inconsistency, placeholder hero text, refund-route duplicate, placeholder phone, copyright typo, dead anchor). | All | Real backend module/plan-catalogue inspection; direct `src/app/` file inspection; git log `c32ed7b`..`cabf640`; two live-site audits of staypookie.com (this week) | Documentation pass, 2026-11-11 |
