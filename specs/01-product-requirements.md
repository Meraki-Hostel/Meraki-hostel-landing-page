# 01 — Product requirements: StayPookie marketing & purchase site

## 0. Addendum (2026-11-11) — read this first

**The premise this document was originally written against was wrong, not just out of date.** It was written as if StayPookie ("Meraki," at the time) had no product at all yet — "pre-product, greenfield," every capability "Planned" or "Unknown," no pricing, no login because nothing existed to log into. That was never true in the way the document assumed: the real product (owner/manager/student dashboards, a full backend, a database, auth, billing) already existed in a separate codebase the whole time. This folder was only ever meant to be its **marketing and plan-purchase website** — it was never the product, and was never going to contain one.

Since then, two things happened: (1) the brand finalized as **StayPookie** (not "Meraki"), and (2) this site was rebuilt — homepage, `/pricing`, `/checkout`, `/about`, `/contact`, and legal pages — into a **live, purchasable-today** site, confirmed shipped by git log (`c32ed7b` → `cabf640`) and direct file inspection on 2026-11-11.

**What this means for the rest of this document:**
- §0.1 below (the original "Owner decisions, 2026-10-29") is kept as a **historical record** of real decisions made at the time, under the premise above. Several of those decisions (no pricing, no login ever, early-access-only framing) are superseded by what's actually shipped. Don't edit that table to pretend it always said something different — read it as "what was decided when we thought nothing existed yet," and read everything from §1 onward as the current, corrected requirement.
- §1 (stage/positioning), §7 (page/route map), §8 (functional requirements), §9 (FAQ) and §10 (claims policy) are rewritten below to match the real product and the real, shipped site. Evidence basis is now the real backend (see `specs/06`), not a founder brief.
- Pricing and checkout are now **in scope** and **already built** (§7.2, §8.6) — this is no longer a lead-capture-only page.

---

## 0.1 Owner decisions (2026-10-29) — historical record, premise superseded

These were the real decisions made when this project believed no product existed yet. Kept for history; do not treat as current requirements where they conflict with §1 onward.

| # | Decision (as made 2026-10-29) | Effect at the time |
|---|---|---|
| D-1 (OQ-1) | Keep lead submission disabled until configured. Build the API route and webhook integration with validation and error handling; never pretend leads are saved. | Became the legacy `/api/lead` route — likely dead now that `/checkout` exists (see `specs/06` §4, §7 open questions). |
| D-2 (OQ-5, OQ-14) | Contact email from configuration, never a placeholder; lead capture stays disabled until reviewed. | Superseded: this site now has a real (if placeholder-pending-replacement) contact number on `/contact` and in the footer, and a real purchase flow, not a gated lead form. |
| D-3 (OQ-2) | After early access: manual follow-up, no promised demo or date. | The underlying idea (manual, human-reviewed setup) carried forward correctly into the real checkout confirmation copy — see §8.6 — but "early access" framing itself is gone. |
| D-4 (OQ-3) | Dashboard-preview hero and text wordmark, illustrative previews, no photos/logo yet. | Superseded in part: the hero now shows real product-style visuals, though one known bug (a literal "Product Screenshot Placeholder" label) needs fixing — see `specs/06` §4. |
| D-5 (OQ-4) | Provisional indigo + cream palette, configurable. | Superseded: the shipped palette is the real product's own ivory/clay/espresso system — see `specs/05`. |
| D-6 (OQ-5, OQ-10) | `/privacy` and `/terms` are drafts, clearly marked for review. | Still true and still correct today — `/privacy`, `/terms` and `/refund-policy` are still explicitly marked "placeholder — needs legal review before launch." This one decision is **not** superseded; keep it until a real review happens. |
| D-7 (OQ-6) | Scope is the MVP landing page only; maintenance, multi-property and staff roles not presented as live. | **Superseded.** Multi-property, staff roles and maintenance are real, live, confirmed features of the real product (see `specs/06` §3.1) and must be presented as live. |
| D-8 (OQ-7) | Git/hosting deferred. | Superseded: the site is live at staypookie.com with real hosting and a real git history. |
| D-9 | Clarion-style animations (marquees, pinned rail). | Carried forward in spirit (motion system exists — see `specs/05`), though the exact shipped motion (hero-load stagger, checkmark draw-in) differs in detail from the original Clarion-matching plan. |
| D-10 | Unsplash stock photography, generic, never presented as real customers/properties. | Still the right default rule for any real estate still using stock imagery; apply it to whatever imagery remains. |

---

## 1. Product overview (current, 2026-11-11)

StayPookie is a **real, live hostel and PG (paying guest) management platform for owners and operators in India**. It is not a concept and not "being built" — it runs today, with real owners, managers and students using it, in a separate product codebase from this one.

StayPookie is **not** an accommodation marketplace, a rental-classifieds site, a hotel booking platform or a property-discovery portal, and this marketing site is not for tenants or students looking for a place to stay. (The real product does have a student-facing portal as part of the application itself — that's real and live, but it's not something this marketing site shows or links to; see `specs/06` §3.1.)

**This repo's job.** This repo is **StayPookie's public marketing and plan-purchase website** — not the product. A visitor reads what StayPookie does, picks one of three real paid plans, and buys it through `/checkout`. There is no self-serve login or signup anywhere on this site, by design: StayPookie's team manually provisions the account afterward (a separate internal admin tool exists for this) and emails login details within 24 hours of payment. This site has no dashboard, no database of tenant/property data, and no product auth of its own — and isn't supposed to.

**Real, live capability summary** (full detail and evidence in `specs/06`):

| Capability | Status | How this site may present it |
|---|---|---|
| Rooms, beds & occupancy (single/double/triple/quad, waitlists) | Live | Present tense: "StayPookie shows live room and bed occupancy." |
| Tenant admission, profiles, move-out | Live | Present tense |
| Automatic monthly rent (pro-rated, due dates, optional late fees) | Live | Present tense |
| **Online rent payment via Razorpay** | Live, **on every paid tier** — not plan-gated | Present tense, and consistently *not* gated to one tier anywhere it's mentioned |
| Manual payment recording, PDF receipts, deposits & refunds | Live | Present tense |
| Complaints, leave, visitor management (with status history) | Live | Present tense |
| Maintenance tickets, inventory tracking | Live | Present tense |
| Staff management across roles | Live | Present tense |
| Notices/announcements, emergency alerts | Live | Present tense |
| Owner analytics across a portfolio | Live | Present tense |
| **Multi-property management under one organization** | Live | Present tense — never "unknown" or "exploring it" |
| Automatic bank/UPI statement reconciliation | Unknown — do not claim | Don't feature |
| Third-party integrations (WhatsApp, Tally, banks) | Not planned | Don't claim |
| Document storage, utility billing, mobile app, Hindi support, export formats beyond PDF receipts | Unknown — confirm before claiming | Don't feature until confirmed |

## 2. Business problem

Small and medium hostel/PG operators run the business from **notebooks, spreadsheets, chat messages and memory**. This is still the real pain StayPookie solves, and it's still what this site should lead with:

| Pain | Consequence |
|---|---|
| Records are scattered across notebooks, spreadsheets and messages | No single source of truth; information gets lost when staff change |
| Hard to tell which beds are occupied and which are vacant | Vacant beds go unnoticed, allocations clash, move-ins are slow |
| Outstanding rent is uncertain | Dues are missed or disputed |
| Payments are tracked by hand | Time goes into reconciling a notebook against bank or UPI statements |
| Follow-ups are repetitive | Owners chase the same tenants and details every month |
| Tenant information is disorganised | Contact and allocation details are hard to find |
| Multiple properties, no combined view | Operators with several properties have no single picture (StayPookie now actually solves this — see §1) |

StayPookie's proposition, correctly stated now: **StayPookie already keeps occupancy, rent, tenant information and day-to-day hostel operations organised in one place — for owners who buy it today.**

## 3. Target audience

| Segment | Typical context | What they most need from the page |
|---|---|---|
| Independent PG owners | 1 property, notebook or WhatsApp records | Plain language, a clear picture of rent/occupancy, a fast path to a price and a purchase |
| Hostel owners | Student/working-professional hostels, sometimes with a warden | Room/bed visibility, dues overview, confidence the product is real and working today |
| Small & medium hostel operators | Several buildings or floors, small staff | Organised records; proof multi-property is actually supported |
| Property managers | Manage on behalf of an owner | Occupancy/dues reporting to the owner |
| Administrators | Handle move-ins, allocations, rent entries | Fast, practical workflows |
| Operators managing multiple properties | 2+ properties | Confidence multi-property is live (it is — pick the right tier by property/bed/staff count) |

**Not the audience:** tenants, students or travellers looking for accommodation; brokers; hotel guests. No search box, no listings, no "find a PG."

**Locale.** India, English copy, ₹ amounts, Indian phone formats. Hindi/regional-language support is unconfirmed (`specs/06` §3.2) — ship English-only until confirmed.

## 4. User needs (jobs to be done)

| # | When… | I want to… | So that… | Status |
|---|---|---|---|---|
| J1 | A prospective tenant calls asking for a bed | See which beds are vacant right now | I can answer immediately and fill the bed | **Live** |
| J2 | Rent falls due each month | See who has paid and who still owes | I chase only the people who actually owe | **Live** |
| J3 | A tenant pays by UPI, cash, bank transfer, or online | Record or accept the payment against that tenant | My dues list stays correct | **Live** — including online payment via Razorpay, on every tier |
| J4 | A tenant moves in or out | Allocate or free a bed and keep their details | My records and occupancy stay accurate | **Live** |
| J5 | I need a tenant's or the property's details | Find them in one place | I stop searching notebooks and chats | **Live** |
| J6 | I evaluate the product | Understand quickly what it does, what it costs, and whether it fits my number of properties/beds/staff | I can decide to buy without a sales call | **This site's job** — `/pricing` |
| J7 | I've decided to buy | Pick a plan and pay, without a demo or a waiting list | I get set up fast | **This site's job** — `/checkout` |
| J8 | I run several properties | Know StayPookie supports that, and which tier fits | I pick the right plan | **Live** — multi-property is real; tier choice is a property/bed/staff-count decision, not a feature gate |

## 5. Landing/site page objectives

| # | Objective | Served by |
|---|---|---|
| O-1 | In the first viewport, communicate StayPookie is live, working hostel/PG management software | Hero |
| O-2 | Show StayPookie understands the operator's real problems | Problem section |
| O-3 | Explain real capabilities concretely, confidently, present tense | Outcomes, features, roles, how-it-works |
| O-4 | Be explicit about what buying means: pick a plan, pay, get manually set up within 24 hours — no instant self-serve login | Pricing, checkout, FAQ |
| O-5 | Convert qualified visitors into a completed purchase | Nav CTA, hero CTA, pricing CTA, checkout flow, final CTA |
| O-6 | Match the real product's visual identity (ivory/clay/espresso), not a separate provisional scheme | `specs/05` |
| O-7 | Be fast, accessible and indexable | §11, §12 |

## 6. Conversion goals and measurement

| Goal | Type | Definition | Measurement |
|---|---|---|---|
| **Plan purchased** | Primary | A completed `/checkout` flow: Razorpay payment confirmed (webhook or verified signature — never the client's word alone) | Count completed checkouts / payment confirmations |
| Buyer-details submitted, payment not yet confirmed | Diagnostic | Checkout step 2 completed, no confirmed payment | Funnel drop-off signal |
| Understand the product | Secondary | Visitor reaches `/pricing`, `#how-it-works`, opens FAQ items | Needs analytics (none installed — unchanged from before) |
| Contact/pre-sales enquiry | Diagnostic | `/contact` form submission | Read from the contact destination |

**CTA wording.** "Get early access" / "Request early access" are retired. Use **"See Plans"** (nav, hero secondary), **"Choose [Plan]"** (pricing cards → `/checkout?plan=…`), and **"Talk to us"** / **"Contact"** only for pre-sales questions and custom/above-Portfolio needs — never as a substitute for buying a plan that already fits.

## 7. Page/route map

### 7.1 Homepage (`/`) sections, in order

Same anchor-id discipline as before (every anchor must resolve; no `href="#"`); CTA labels updated throughout.

| id | Section | Purpose | CTA(s) |
|---|---|---|---|
| — (`<header>`) | Nav | Wordmark, 6 links (Home, Pricing, How it Works, FAQ, About, Contact), persistent CTA | "See Plans" → `/pricing` |
| `hero` | "Run your hostel. Not your paperwork." | Confident, present-tense promise; real or clearly-labelled product visual (fix the visible "Product Screenshot Placeholder" bug — see `specs/06`) | Primary "See Plans" → `/pricing`; secondary "See how it works" → `#how-it-works` |
| `problem` | Pain recognition | Same 4-pain pattern as before (notebooks, spreadsheets, chat, memory) — still true | — |
| `outcomes`/features | What the owner gets, present tense | Real capabilities from §1, grouped (Billing / Operations / Communication) | — |
| `roles` | "Built for every role" | Owner / Manager / Student columns — what each one sees (real role-scoping, a genuine trust signal) | — |
| `how-it-works` | The owner's month with StayPookie | Add property → invite staff & residents → billing/requests run → one view across properties | → `/pricing` |
| `pricing-teaser` | Compact 3-card summary with real prices | Starter/Growth/Portfolio prices, "Most Popular" on Growth | "View full plans" → `/pricing` |
| `faq` | 4–5 confident, correct FAQ items (full 8-answer set lives in §9 / on-page) | — | Last item links to `/pricing` or `/contact` |
| `final-cta` | Close | One line, one button | "See Plans" → `/pricing` |
| — (`<footer>`) | Footer | Wordmark, Product/Company/Legal columns, real company name, contact (placeholder phone pending replacement), © year | Links to `/terms`, `/privacy`, `/refund-policy` |

### 7.2 Other routes (already shipped — document what's there, per `specs/06` §4)

| Route | Purpose | Status |
|---|---|---|
| `/pricing` | Full 3-tier comparison: Starter ₹1,999/mo (2 properties/120 beds/10 staff), Growth ₹4,999/mo "Most Popular" (6/400/40), Portfolio ₹14,999/mo (25/2,500/250, + priority phone/dedicated-rep support), billed monthly, no GST charged (no GST registration — see CLAUDE.md "Project identity"). **No tier gates a feature** — only property/bed/staff counts. One "Choose [Plan]" CTA per tier → `/checkout?plan=…`; a "Talk to us" link for anything bigger/different instead of inventing a 4th tier. Price display itself is currently flagged off site-wide (`flags.showPricing`, `specs/06` §5) while StayPookie sources design partners. | **Live, with one bug**: the comparison table currently lists online payment as Portfolio-only — fix to list it on every tier (`specs/06` §4 Q1). |
| `/checkout` | Plan confirm → buyer details (name, email, phone, org/hostel name, property count, city) → Razorpay Checkout/Payment Link → confirmation. Confirmation (and every nearby page) states: **"Payment received. Our team will set up your StayPookie account and email your login within 24 hours."** Pay button disables + shows a spinner on click (no double charges). Success only shown after Razorpay actually confirms. | **Live, with one bug**: the 24-hour figure isn't consistent everywhere yet (`specs/06` §4 Q2). |
| `/about` | Short, factual: what StayPookie is, who it's for. No invented founding story/team bios unless real. | Live |
| `/contact` | Pre-sales/support form (name, email/phone, message) | Live; placeholder phone number pending replacement |
| `/terms`, `/privacy`, `/refund-policy` | Real policy content, each explicitly marked "placeholder — needs legal review before launch" | Live as drafts; keep the draft marking until real review happens |
| `/refund` | Likely stray duplicate of `/refund-policy` | Flagged for removal — see `specs/06` §4, `specs/03`, `specs/04` |
| `/api/lead` | Legacy lead-capture endpoint from before `/checkout` existed | Likely dead; confirm and remove if unused |

## 8. Functional requirements

### 8.1 Brand, content and links

| ID | Requirement |
|---|---|
| FR-01 | Brand name is **"StayPookie," final** (not temporary). Name, tagline, nav, CTA labels, contact and metadata come from `src/config/brand.ts`; all section copy/FAQ/sample data from `src/config/site-content.ts`. |
| FR-02 | The wordmark is text rendered from the brand name unless/until a logo is supplied. |
| FR-03 | Every `href` resolves to an existing in-page id or an existing route (`/`, `/pricing`, `/checkout`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`). No `href="#"`, no dead anchors — this is a known current gap on `#contact` (see `specs/06` §4 Q7) that must be fixed, not a rule the site is exempt from. |
| FR-04 | **No Log in, Sign up, or Dashboard link, ever** — not because nothing exists (it does, in the real product), but because this site never provides self-serve access by design. A Pricing link is required (it was forbidden in the old version of this file; that's superseded). |
| FR-05 | Contact email/phone appear in the footer and on `/contact`. They should be real; the current phone number is a known placeholder pending replacement, not a design choice. |

### 8.2 Navigation

| ID | Requirement |
|---|---|
| FR-10 | Header nav has exactly 6 links — Home, Pricing, How it Works, FAQ, About, Contact — plus a persistent "See Plans" CTA. |
| FR-11 | Anchor navigation on the homepage scrolls to the section, not hidden under the fixed header. |
| FR-12–15 | Unchanged from the original accessibility/behaviour rules: reduced-motion-aware smooth scroll, focus lands in the target section, direct `/#id` loads work, a skip link is the first focusable element. |

### 8.3 Mobile menu

Unchanged in substance from the original FR-16–19 (accessible disclosure button, focus trap, Esc/close behaviour, reachable without JS).

### 8.4 Pricing page (`/pricing`)

| ID | Requirement |
|---|---|
| FR-50 | Shows exactly the three real tiers (§7.2) with correct prices, limits and feature lists. No invented 4th tier, free trial, discount code, or annual-billing option. |
| FR-51 | **No feature is plan-gated except by property/bed/staff count.** In particular, online payment via Razorpay must be listed as included on every tier — currently a bug (see `specs/06` §4 Q1), must be fixed. |
| FR-52 | One "Choose [Plan]" CTA per tier, linking to `/checkout?plan=<starter|growth|portfolio>`. |
| FR-53 | States plainly that subscriptions are billed monthly. No GST charge, GST invoice, or GSTIN claim anywhere — StayPookie has no GST registration (see CLAUDE.md "Project identity"). |
| FR-54 | States, near the CTAs, what happens after payment (see FR-61) — the same wording as `/checkout` and `/terms`. |

### 8.5 Checkout (`/checkout`)

| ID | Requirement |
|---|---|
| FR-60 | Three steps: confirm/switch plan → buyer details (name, email, phone, org/hostel name, property count, city) → payment via Razorpay. |
| FR-61 | **Account setup/login is emailed within 24 hours of payment** — this exact figure must be stated identically on `/checkout`, `/pricing`, the homepage/FAQ, and `/terms`. This is currently inconsistent (homepage/FAQ say "2 hours"/"day one" in places) — a known bug to fix, not a free choice between numbers. |
| FR-62 | Pay button disables and shows a loading state the instant it's clicked, to prevent double charges. |
| FR-63 | Success is shown **only** after Razorpay actually confirms payment (webhook or verified signature) — never on the client's word alone. This mirrors the real backend's own payment-verification rule (`specs/06` §3.1) and the original lead-capture form's "never fake success" discipline (§8.6) — both are the same principle applied to a new flow. **This is currently violated in the shipped code** (a client-side `setTimeout` fakes success when Razorpay isn't configured) — see `specs/03` §8.1 and `specs/06` §4 Q0. Fixing it is the single highest-priority open item across all of these specs. |
| FR-64 | No login link or dashboard link anywhere in the confirmation state — there's nothing to log into from this site. |

### 8.6 Legacy: early-access form (`/api/lead`) — likely dead, confirm before touching

The original FR-30–41 (collect-only-listed-fields, honest 503/502/400 states, duplicate-submit guard, honeypot, no PII logging, single `aria-live` region) described a real, well-built security/honesty contract. **Keep this contract as the pattern to reuse** for the checkout buyer-details step (FR-60) and the `/contact` form — but confirm whether `/api/lead` itself and the `earlyAccess` content block are still linked from anywhere; if not, they're dead code superseded by `/checkout`, and removing them is a code decision for `specs/04`, not something to keep requiring here.

### 8.7 FAQ accordion (`#faq`)

Same accessible-disclosure requirements as the original FR-50–53 (now renumbered implicitly since FR-50+ is reused above — treat this as "FAQ-70+" if IDs need to stay unique). Content is the 8 answers in §9 below, rewritten for the real product.

### 8.8 Previews, footer, legal routes

| ID | Requirement |
|---|---|
| FR-80 | Any illustrative/sample-data preview still carries a visible "Illustrative preview · sample data" caption and uses obviously fictional names/amounts — this discipline from the original spec is still correct and still required for anything that isn't a real screenshot. |
| FR-81 | `/privacy`, `/terms`, `/refund-policy` exist, reuse the header/footer, and each is marked "placeholder — needs legal review before launch" until a real review happens — do not quietly remove that marking. |
| FR-82 | `/refund` is flagged as a likely stray duplicate of `/refund-policy` (see `specs/06`) — a code decision, not something this spec mandates keeping. |

## 9. FAQ answers (current, confident, correct)

1. **What is StayPookie?**
   StayPookie is hostel and PG management software, live today, for owners and operators in India. It keeps rooms and beds, occupancy, tenant records, rent and outstanding dues organised in one place — across one property or many.

2. **Who is StayPookie built for?**
   People who run hostels and PGs: independent PG owners, hostel owners, small and medium operators, property managers, and the administrators who handle day-to-day operations. StayPookie is not a site for finding accommodation, and it isn't for tenants to apply or book through.

3. **Can I track rent and outstanding payments?**
   Yes. Rent is generated automatically every month, pro-rated on the way in, with an optional late fee. You can record cash/UPI/bank payments by hand, and residents can pay online through Razorpay — on every paid tier, not just one.

4. **Can I manage rooms and bed occupancy?**
   Yes — set up your rooms and beds, allocate tenants, and see at a glance which beds are occupied and which are vacant.

5. **Can I manage multiple properties?**
   Yes. An owner's account covers every property in their organization from one place. Pick the plan whose property/bed/staff limits fit what you run today.

6. **Does StayPookie accept online rent payments?**
   Yes — via Razorpay, live on every paid tier. Residents can pay by UPI, card or net banking; you can also record payments by hand.

7. **Can tenants use StayPookie directly?**
   The real product does have a student-facing portal for residents to pay rent, raise complaints and see notices — but that's part of the application itself, not something you sign into from this site.

8. **How do I get started?**
   Choose a plan on [Pricing](/pricing) and check out. After payment, our team sets up your account and emails your login within 24 hours — there's no self-serve signup.

Excluded on purpose, same as before: customer counts, testimonials, case studies, outcome statistics, launch-date language (there's no launch — it's live), a free trial, a discount code, or annual billing — none of these exist; don't invent any of them.

## 10. Content and claims policy

### 10.1 Required (this is new — the old version of this file forbade all of this)

| Required | Example |
|---|---|
| Present-tense statements for every capability in `specs/06` §3.1/§3.2 marked *Implemented & verified* | "StayPookie tracks recorded and online rent payments." |
| Multi-property support stated as live | "Run every property you own from one account." |
| Online payment stated as available on every paid tier, everywhere it's mentioned | Never "Portfolio only" |
| A real price shown wherever "pricing" is implied | Never route a pricing question to "contact us" when `/pricing` already answers it |
| Clear statement of what happens after payment (24-hour manual setup) near every Pay button | — |

### 10.2 Forbidden (unchanged in spirit from the original policy — still correct)

| Forbidden | Reason |
|---|---|
| Customer/user counts, "trusted by," logos, testimonials, ratings, case studies | None exist for this site to show |
| Outcome statistics ("save 10 hours/week," "cut dues by 40%") | No published, verified numbers |
| A 4th pricing tier, a free trial, a discount code, annual billing | None of these exist; don't invent them |
| Security/compliance certification claims ("bank-grade," "DPDP compliant" as a certification, ISO/SOC2) | Not confirmed/certified |
| Competitor comparisons, "#1," "best," "enterprise-grade," "AI-powered" | Unsupported |
| Automatic bank/UPI reconciliation, third-party integrations (WhatsApp, Tally, banks), document/KYC storage, mobile app, Hindi support | Unknown or not planned — see `specs/06` §3 |
| Any login/signup link | By design — access is manually provisioned |
| A different account-setup turnaround on different pages | Must be 24 hours, everywhere, consistently |
| A "payment successful" state without a real, server-verified payment | This is a confirmed, shipped bug today (`specs/06` §4 Q0) — not a hypothetical to guard against |

## 11. Accessibility requirements

Unchanged in substance from the original (WCAG 2.2 AA target across `/`, `/pricing`, `/checkout`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy`): landmarks, heading levels, `lang="en-IN"`, AA contrast (recomputed against the real shipped palette — see `specs/05`), visible focus rings, operable-by-keyboard, ≥44px touch targets, accessible tabs/accordion/menu patterns, labelled form fields (now including the checkout buyer-details form), no information by colour alone, `prefers-reduced-motion` respected, no horizontal overflow at any width, descriptive link text.

## 12. Performance and SEO requirements

Mostly unchanged in principle, with two real changes from the original (which assumed no domain and no dynamic routes beyond one API handler):
- The domain is real and live (staypookie.com) — `NEXT_PUBLIC_SITE_URL`, canonical URLs and sitemap entries should be set for real, not conditionally omitted "until a domain exists."
- `/checkout` needs a server runtime (Razorpay confirmation, possibly server-side order creation) — it is not expected to prerender fully static the way `/`, `/pricing`, `/about` can. Document the actual route table (`○` vs `ƒ`) from a real `next build` rather than assuming everything is static.
- Performance budgets (LCP < 2.5s, CLS < 0.1, TBT < 200ms, Lighthouse ≥ 90/95/95/95) still apply as targets.

## 13. Acceptance criteria (selected, updated)

| ID | Criterion |
|---|---|
| AC-01 | Homepage renders the sections in §7.1's order, each with its documented id. |
| AC-02 | Changing `brand.name` updates the wordmark, footer, `<title>`, OG title, and FAQ copy, with no other file edited. |
| AC-03 | A crawl of `<a href>` across `/`, `/pricing`, `/checkout`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund-policy` finds no dead anchors (currently fails for `#contact` — must be fixed, see `specs/06`). |
| AC-04 | Nav has exactly 6 links plus the "See Plans" CTA; there is no login/signup link anywhere. |
| AC-50 | `/pricing` shows the three real tiers with correct prices/limits, and online payment appears on every tier's feature list (currently fails — see `specs/06` §4 Q1). |
| AC-60 | `/checkout` completes a full plan-confirm → buyer-details → payment → confirmation flow, and the confirmation states the 24-hour setup promise using wording identical to `/pricing` and `/terms` (currently fails for the homepage/FAQ side — see `specs/06` §4 Q2). |
| AC-61 | Checkout never shows a success state without a confirmed Razorpay payment (**currently fails — see `specs/06` §4 Q0, the highest-priority open item**). |
| AC-80 | `/terms`, `/privacy`, `/refund-policy` each return 200, reuse the shared header/footer, and each still shows its "placeholder — needs legal review" notice. |

## 14. Open questions (current, 2026-11-11)

Superseding the original OQ-1..OQ-14 (those were about whether a lead-capture backend should ever go live; the product already has a purchase flow, so most of them are moot). Current open items, duplicated from `specs/06` §7 so this file and the feature register don't drift apart:

| # | Question |
|---|---|
| Q0 | **Highest priority:** `/checkout` shows payment success without real server-side verification, and fakes success when Razorpay isn't configured — fix before this site can be trusted with real purchases. |
| Q1 | Fix `/pricing`'s comparison table so online payment is listed on every tier. |
| Q2 | Standardize the account-setup/login turnaround to 24 hours everywhere. |
| Q3 | Replace the visible "Product Screenshot Placeholder" hero text with a real empty-state visual. |
| Q4 | Resolve `/refund` vs `/refund-policy` (remove the unlinked duplicate). |
| Q5 | Replace the placeholder phone number with the real one. |
| Q6 | Fix the footer copyright double-period typo. |
| Q7 | Fix or repoint the `#contact` anchor. |
| Q8 | Get real legal review of `/terms`, `/privacy`, `/refund-policy`. |
| Q9 | Confirm whether `/api/lead` / the `earlyAccess` content block are still referenced; remove if dead. |
| Q10 | Confirm bank/UPI reconciliation, document storage, utility billing, mobile app, Hindi support with the product team before claiming any of them. |
| Q11 | Confirm Hindi/regional-language need for this site specifically (currently English-only, unconfirmed either way). |
