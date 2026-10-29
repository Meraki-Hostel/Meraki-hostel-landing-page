# 06 — Feature status register

Product: **Meraki** (temporary brand name). It is a hostel and PG management SaaS for owners and operators in India.
Last updated: 2026-10-29. Phase: A (documentation only).

This file is the **single source of truth** for what Meraki can and cannot do. Landing-page copy, the FAQ, previews, metadata, sales messages and anything else that describes the product must agree with it. If copy and this file disagree, this file wins. Fix the copy, or update this file with evidence first (see [How to update](#6-how-to-update-this-document)).

Related: [specs/01-product-requirements.md](01-product-requirements.md) · [specs/02-ui-ux-reference.md](02-ui-ux-reference.md) · [specs/03-technical-architecture.md](03-technical-architecture.md) · [specs/04-implementation-plan.md](04-implementation-plan.md) · [specs/05-design-system.md](05-design-system.md)

---

## 1. Evidence basis (read this first)

| Check | Result (2026-10-29) |
|---|---|
| Repository inspection of the repository root | **The directory was empty.** There was no source code, no `package.json`, no git repository, no env files, no tests and no docs. The only files now present are the Phase A docs (`CLAUDE.md`, `specs/`). |
| Product application (owner dashboard, API, database, auth) | **Does not exist.** |
| UI mockups / designs | **None exist**, and there is no UI mockup either. Every product visual on the landing page will be an *illustrative preview built from sample data*. |
| Lead-capture backend / destination | **Does not exist.** The destination is unconfigured. |
| Brand assets (logo, photography), contact details, domain, legal text | **None exist.** |
| Customers, pilots, testimonials, usage metrics | **None known.** None may be stated or implied. |

Consequence: **no capability in this register is "Implemented & verified" or "Partially implemented".** The highest status any product capability holds today is *Planned*.

Sources: the founder brief, as summarised in the Phase A decisions brief (2026-10-29, §2 and §8), and the repository inspection (Phase A capture, 2026-10-29). The decisions brief is not kept in the repo: every founder-brief item it carried is recorded in this file itself as of 2026-10-29, so "Brief" in the Evidence column means "founder brief, as recorded here".

---

## 2. Status legend

| Status | Meaning | Evidence required | Landing-page treatment |
|---|---|---|---|
| **Implemented & verified** | Works in a deployed or runnable build, and someone has checked it. | A link to code, a PR and a passing test or recorded manual check (see §6). | May be described in the present tense ("Meraki shows…"). |
| **Partially implemented** | Some of it exists, but it is incomplete, unverified or behind a flag. | Code/PR link plus a note on what is missing. | Describe only the verified part, with a qualifier ("early version", "in early access"). |
| **Planned** | The founder brief names it as intended product direction. **It is not a commitment to availability or a date.** | Founder brief reference. | Intent phrasing only: "Meraki is being built to…", "designed to…", "in early access we're working on…". Visuals may appear only as an *Illustrative preview · sample data*. |
| **Unknown – needs confirmation** | Not decided. The owner must answer the question in the row. | None yet. | Do not feature it. Mention it only in FAQ-safe wording ("We're exploring it; tell us in the early-access form"). |
| **Not planned (do not claim)** | Explicitly out of scope. | Founder brief / decisions brief. | Never imply it. When the FAQ addresses it, the answer is a plain "No". |

Web-delivery items in §4 use one extra label, **Not started (Phase B)**. It means the item is scheduled for the Phase B build ([specs/04](04-implementation-plan.md)) and no work exists yet. The decisions brief calls the same thing "To be built in Phase B".

Rules that apply to every status:

- "Planned" never becomes present-tense copy. "Meraki tracks your rent" is forbidden. "Meraki is being built to help you track rent" is allowed.
- No dates, no "coming soon in Q_", no "launching in…", unless the owner has supplied a confirmed date that is recorded in the change log.
- No numbers that describe outcomes, customers, beds managed, time saved or similar. Meraki has no data.

---

## 3. Product capability register

Columns: **Status** · **Evidence** · **May say** (the landing page and FAQ) · **Must not say** · **Owner question** (what resolves the status).

"Brief" = founder brief, as summarised in the Phase A decisions brief §2 (2026-10-29). "Empty repo" = repository inspection on 2026-10-29 found an empty directory.

### 3.1 Core operations (from the decisions brief §2)

| Capability | Status | Evidence | May say | Must not say | Owner question to resolve |
|---|---|---|---|---|---|
| Room & bed inventory | **Planned** | Brief; empty repo | "Meraki is being built to keep every room and bed in one place." Illustrative bed grid with sample data. | "Manage all your rooms today", any count of rooms or beds managed | Which unit types are needed in v1 (room, bed, floor, sharing type)? |
| Occupancy & vacancy tracking | **Planned** | Brief; empty repo | "Designed to show which beds are occupied and which are free." The "Vacant beds" *label* (no number) in the attention list. | Real-time or live occupancy claims, occupancy percentages presented as results | Is vacancy derived only from allocations, or are bookings/reservations needed? |
| Tenant records & room allocations | **Planned** | Brief; empty repo | "Being built to keep tenant details and bed allocations together." Sample tenant list with obviously fictional Indian names. | Tenant self-onboarding, KYC/verification, police-verification support | Which tenant fields are required? (See §3.2 document storage for ID proofs.) |
| Monthly rent tracking (recording what's due and what's paid) | **Planned** | Brief; empty repo | "Designed to help you record monthly rent and see what's due." | "Collect rent", "get paid faster", "automatic rent", any reconciliation claim | Fixed monthly cycle per tenant or one common due date? Pro-rating on mid-month moves? |
| Payment records & outstanding dues | **Planned**. Records are entered **manually by the operator**. Meraki does **not** collect money. | Brief; empty repo | "Record payments you receive and see outstanding dues in one place." Sample ledger rows in ₹ with the preview label. | Payment processing, UPI/online collection, "auto-matched payments", bank sync | Which payment modes should a record capture (cash/UPI/bank transfer as a *label* only)? |
| Property operational records | **Planned** | Brief; empty repo | "Being built to keep property records and day-to-day notes organised." | Compliance or licensing management, any regulatory claim | What exactly counts as an "operational record" in v1 (notices, inventory, expenses, staff notes)? |
| Maintenance requests & complaints | **Unknown – needs confirmation** (the brief says "where supported") | Brief (qualified); empty repo | Do not feature it as core. If it is mentioned at all: FAQ-safe wording only. In the attention list, use "Notes to follow up", **not** "Open issues", until confirmed (see [specs/02](02-ui-ux-reference.md) §17 row 5 (attention) and [specs/01](01-product-requirements.md) §7). | "Track and resolve complaints", "tenants raise requests", ticket counts | Is maintenance/complaint tracking in v1 scope? Operator-entered only, or tenant-raised? |
| Multi-property management | **Unknown – needs confirmation** | Empty repo; open question 6 | FAQ: "We're exploring it; tell us in the early-access form." The form asks for "Number of properties" to learn demand. | "Manage all your properties from one dashboard", portfolio views. The feature showcase omits the multi-property row. | Is multi-property in v1? Is it per-account or per-property billing (if pricing exists)? |
| Automatic UPI reconciliation | **Not planned (do not claim)** | Brief | FAQ: "No. Payments are recorded by you." | Any form of automatic matching, UPI statement import, "reconcile in one click" | — (decided; it reopens only via the change log) |
| Online rent collection / payment gateway | **Not planned (do not claim)** | Brief | Nothing. Do not raise it in copy. If a FAQ is needed, answer as for UPI. | "Pay rent online", "payment links", gateway or bank names, "cashless" | — |
| Tenant-facing app / portal; tenant applications | **Not planned (do not claim)** | Brief | FAQ: "Meraki is for owners and operators." | "Tenants can log in / pay / apply", "tenant app", "online booking for tenants" | — |
| Integrations (WhatsApp, Tally, banks, accounting, etc.) | **Not planned (do not claim)** | Brief | Nothing. The "How it works" section shows Meraki's own workflow with no third-party logos. | Any integration section, partner logos, "works with WhatsApp/Tally/your bank", "send reminders on WhatsApp" | — |
| Owner authentication / accounts | **Not implemented (no app exists)**: the decisions brief's wording, kept verbatim (see open question Q-A) | Empty repo | Nothing. Early access goes through the form. | "Log in", "Sign up", "Create account", "Start free" links or buttons anywhere (nav, hero, footer) | When an app exists: phone OTP, email or both? |

### 3.2 Additional capabilities (added in Phase A because owners commonly ask about them; none are in the brief)

All of these are **Unknown – needs confirmation**. They exist so that copywriters have an explicit "do not claim" boundary.

| Capability | Status | Evidence | May say | Must not say | Owner question to resolve |
|---|---|---|---|---|---|
| Staff roles & permissions (manager, warden, staff logins) | **Unknown – needs confirmation** | Not in brief; empty repo; open question 6 | Nothing, or FAQ-safe: "Tell us how your team works in the early-access form." | "Give your manager access", "role-based permissions", "multi-user" | Is single-owner login enough for v1? If not, which roles and what each can see or do? |
| Reports & exports (CSV/PDF/Excel of dues, occupancy, payments) | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. Previews may show summary tiles labelled as sample data, but no "Export" or "Download report" buttons. | "Export to Excel/Tally", "monthly reports", "GST-ready", "accountant-ready" | Which reports or exports are needed, in which format, and for whom (owner, accountant)? |
| Notifications & reminders (rent-due reminders to the owner or tenants; SMS/WhatsApp/email) | **Unknown – needs confirmation** (WhatsApp/SMS delivery would also need an integration, which is **Not planned**) | Not in brief; empty repo | The problem section may name "repetitive follow-ups" as a *pain*. It must not promise to automate them. | "Automatic reminders", "Meraki reminds your tenants", "never chase rent again", any channel name | Are in-app due lists enough, or are outbound reminders wanted? Through which channel? |
| Document storage (tenant ID proofs such as Aadhaar, PAN; agreements; photos) | **Unknown – needs confirmation**. **High sensitivity**: identity documents are personal data under the DPDP Act 2023, and Aadhaar has extra handling restrictions. A decision needs owner and legal review of storage, access, retention and deletion. | Not in brief; empty repo | Nothing. The sample tenant data in previews must not show ID numbers or document thumbnails. | "Store ID proofs securely", "digital KYC", "Aadhaar verification", "police verification", any security or encryption claim | Is document storage in scope? If yes: which documents, who can view them, the retention period, where data is hosted, and the consent wording. |
| Security deposits (record, adjust, refund on move-out) | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing beyond the generic "payment records". | "Deposit tracking", "automatic refunds/deductions" | Should deposits be a distinct record type in v1? |
| Electricity / utility / extra charges (meter-based or fixed add-ons) | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. Sample ledger rows show rent only. | "Electricity billing", "split utility bills" | Are add-on charges recorded alongside rent in v1? |
| Rent receipts (generate or share receipts) | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. | "Send receipts", "digital rent receipts", "HRA receipts" | Are receipts needed? Printable only, or shared? |
| Mobile app (native Android/iOS) | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. Do not show app-store badges or phone-app mockups as the product. (A responsive marketing page is not a mobile app.) | "Download the app", "available on Android/iOS", "manage on the go with our app" | Is v1 a responsive web app, a native app or both? |
| Hindi / regional language support (UI and/or landing page) | **Unknown – needs confirmation** (open question 8; it affects font subsets in [specs/05](05-design-system.md)) | Not in brief; empty repo | Nothing. The landing page is English-only in Phase B (**Provisional**, pending Q8). | "Available in Hindi", "use Meraki in your language" | Is Hindi or another regional language needed for the landing page, the product or both? Which languages? |
| Pricing / plans / free trial | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. The CTA is "Get early access" / "Request early access" only. | Any price, "free", "free trial", "free during early access", "no credit card", plan names, a pricing section | Will early access be free? When and how will pricing be communicated? |
| Data security, hosting location, backups | **Unknown – needs confirmation** | Empty repo (no infrastructure exists) | Only true statements about the **early-access form** (what is collected, why, how to withdraw), via /privacy. | "Bank-grade security", "encrypted", "data stored in India", "daily backups", "DPDP compliant", certifications | Hosting region, backup policy and security commitments, once the product exists. |
| Offline use | **Unknown – needs confirmation** | Not in brief; empty repo | Nothing. | "Works offline" | Is offline or poor-connectivity use a requirement? |

---

## 4. Landing-page & web capabilities (Phase B deliverables)

Updated 2026-10-29 after the Phase B build. Evidence is the code in this repository plus `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` (41 tests) and a Playwright QA pass at 360/390/768/1024/1440 (0px horizontal overflow, no dead links, 19/19 interaction checks).

| Item | Status | Evidence | Notes / constraints | Blocking owner input |
|---|---|---|---|---|
| Marketing landing page (12 sections, order and ids per [specs/01](01-product-requirements.md) §7) | **Implemented & verified** (not deployed) | `src/app/page.tsx`, `src/components/sections/*`; build prerenders `/` as static | Every product visual carries a visible "Illustrative preview · sample data" caption (13/13 checked in QA). Copy and tokens are Provisional (D-5). | Brand colours and final name |
| Early-access lead capture (`POST /api/lead` + form) | **Partially implemented — built, deliberately disabled** | `src/app/api/lead/route.ts`, `src/lib/lead-config.ts`, `src/components/sections/EarlyAccessForm.tsx`; route tests in `src/app/api/lead/__tests__/route.test.ts`; live `next start` returns 503 `not_configured` | Enabled only when **all three** hold (D-1/D-2): valid `LEAD_WEBHOOK_URL`, valid `NEXT_PUBLIC_CONTACT_EMAIL`, and `privacy.reviewStatus === "reviewed"` in `src/config/legal.ts`. Until then the form renders inside a disabled fieldset with "Our early-access form isn't connected yet." The destination must reply JSON `{ok:true}` after storing the lead (plain Zapier Catch Hooks cannot); anything else is a 502. Success shows only on 200 + `{ok:true}`; never faked, including for honeypot hits. PII is never logged (tested). | Webhook destination, contact email, privacy review |
| Privacy notice page (`/privacy`) | **Implemented — draft, pending review** | `src/app/privacy/page.tsx`, `src/config/legal.ts` | Shows "Draft — pending review". States that no retention period has been decided and that the storage service will be named before the form opens (D-6). Not legal advice. | Owner/legal review, retention period, processor name |
| Terms page (`/terms`) | **Implemented — draft placeholder, pending review** | `src/app/terms/page.tsx` | Says terms will be published before the product is available. No invented terms. | Terms text before product launch |
| Analytics / tracking | **None** | No analytics code, cookies or third-party scripts | If one is added later, update /privacy first and record it here. | Whether analytics is wanted |
| SEO metadata | **Implemented** | `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.tsx` | Title "{name} — Hostel & PG Management Software". No canonical, no sitemap entries until `NEXT_PUBLIC_SITE_URL` is set. Without it, OG image URLs fall back to `http://localhost:3000` (Next warns at build) except on Vercel, which supplies its own URL. | Domain |
| Hosting / deployment, git | **Deferred by owner (D-8)** | — | Needs a server-capable host (Vercel, or Netlify with the Next.js runtime) so `/api/lead` can run. Static export is rejected. | Hosting choice; `git init` |
| Contact details (email/phone) in footer and fallbacks | **Not configured** | None supplied | Rendered only from env vars. Never invented. | Real contact email |
| Login / sign-up links | **Excluded** (no app exists) | Nav and footer contain no auth links | — | — |

---

## 5. Claims checklist (run before shipping any copy or UI change)

Copywriters and implementers must tick every item for every PR that touches user-visible text, previews, metadata or the FAQ. Paste the checklist into the PR description.

**Capabilities**
- [ ] Every capability mentioned appears in §3 and the wording matches its "May say" column.
- [ ] *Planned* items use intent phrasing ("being built to", "designed to"). Nothing Planned is written in the present tense as if live.
- [ ] Nothing *Unknown* is featured. If it is mentioned at all, the wording is FAQ-safe.
- [ ] Nothing *Not planned* is implied: no UPI reconciliation, online collection, payment gateway, tenant app/portal or integrations.
- [ ] No "Log in", "Sign up", "Start free trial" or "Download the app" anywhere.

**Proof and numbers**
- [ ] No customer counts, bed or property counts, "trusted by", logos, testimonials, quotes, case studies, ratings, awards or press mentions.
- [ ] No outcome statistics (percentages, "2x", hours saved, "cut dues by…").
- [ ] No prices, "free", trial terms or launch dates (unless recorded in the change log with owner confirmation).

**Previews and sample data**
- [ ] Every product preview shows the visible caption **"Illustrative preview · sample data"**.
- [ ] Sample data uses obviously fictional Indian names and ₹ amounts. It contains no real people, no ID numbers (Aadhaar/PAN) and no real phone numbers or emails. Sample property names must not combine a plausible business name with a real city (use e.g. "Example Residency (demo)").
- [ ] Bed states in previews are Occupied / Vacant only. No reserved/booked or notice-period states (bookings/reservations and notice periods are unconfirmed; see the occupancy row's owner question).
- [ ] Preview UI has no controls that suggest unconfirmed features (e.g. "Export", "Send reminder", "Pay now", "Add property" when multi-property is Unknown).
- [ ] The attention list says "Notes to follow up", not "Open issues", unless maintenance/complaints has moved to Planned or higher.

**Contact, legal and data**
- [ ] No invented email, phone, address, domain, social handle or company registration details. Contact details render only from env vars.
- [ ] The form copy matches the real lead-capture state (unconfigured → honest notice; success only on an acknowledged 200).
- [ ] No security or compliance claims ("encrypted", "DPDP compliant", "data stored in India", certifications).
- [ ] /privacy accurately lists the fields the form actually collects. If the fields changed, /privacy was updated in the same PR.
- [ ] Any new third-party script (analytics, fonts from a CDN, embeds) is reflected in /privacy and in §4 of this file.

**Brand and reference**
- [ ] The brand name, tagline and CTA labels come from the central brand config (`src/config/brand.ts`, planned), not from hard-coded strings.
- [ ] Nothing from the Clarion Health reference is copied: no brand name, healthcare copy, logos, photos, illustrations, statistics or trial fonts (ref: structure.md §6 *Do not copy*; see [specs/02](02-ui-ux-reference.md)).

**FAQ**
- [ ] Each FAQ answer is consistent with the current status in §3 (for example, the UPI answer is "No. Payments are recorded by you.").

---

## 6. How to update this document

Feature status changes go **here first**. Copy, the FAQ and previews change afterwards, in the same or a later PR.

1. **Evidence is mandatory.** A status may move up only with evidence linked in the *Evidence* column:
   - **Implemented & verified**: a link to the code (file path at a commit), the merged PR, **and** a passing automated test or a dated manual verification note (who, when, environment, steps). All three are required.
   - **Partially implemented**: code/PR links plus a one-line statement of what is missing or unverified.
   - **Planned**: a reference to the founder or owner decision (date, and where it was recorded).
   - **Unknown → anything**: the owner's answer to the row's question, dated and recorded in the change log.
   - **→ Not planned**: the owner's decision, dated.
2. **Update the row's "May say" / "Must not say" columns** to match the new status, using the legend in §2.
3. **Downgrades are allowed and must be immediate.** If a feature is removed, broken or rolled back, lower its status and fix the copy in the same change.
4. **Add a change-log entry** (§8) with the date, the row(s), the old status → new status, the evidence link and the author.
5. **Run the claims checklist** (§5) against the live copy and the FAQ after any status change.
6. Do not edit statuses based on intent, a demo, a design mockup or a verbal promise. Only shipped and verified behaviour counts as implemented.
7. If this file and the decisions brief or another spec disagree, raise it as an open question (§7). Do not silently pick one.

---

## 7. Open questions

Numbered Q1–Q8 to match the Phase A decisions brief §8. Q-A and Q-B are register-specific.

| # | Question | Rows affected |
|---|---|---|
| Q1 | Lead destination (webhook → Google Sheet/CRM/automation tool, or email) and a fallback contact email/phone. The destination must reply JSON `{ok:true}` after storing the lead (specs/03 §9.2), which plain Zapier Catch Hooks cannot. It blocks *live* lead capture, not the build. | §4 lead capture, contact details |
| Q2 | The real onboarding process for early access (who makes contact, how setup happens). | Getting Started copy; pricing row |
| Q3 | Imagery and logo: none exist. The default is a UI-led hero and a text wordmark. | §4 landing page |
| Q4 | Brand colour approval and the final brand name ("Meraki" is temporary). | All copy; brand config |
| Q5 | Privacy notice and terms text, grievance contact, data retention: owner/legal review (DPDP Act 2023). | §4 privacy/terms; §3.2 document storage |
| Q6 | Confirm product scope: maintenance/complaints, multi-property, staff roles. All are currently Unknown. | §3.1 maintenance, multi-property; §3.2 staff roles |
| Q7 | Initialise git before Phase B? Hosting choice (Vercel/Netlify)? Domain? | §4 hosting, domain |
| Q8 | Is Hindi/regional language support needed? | §3.2 language row |
| Q-A | **Vocabulary concern.** The decisions brief lists owner authentication as "Not implemented (no app exists)" and the web items as "To be built in Phase B". Neither is in the five-class vocabulary. This register keeps the brief's auth wording verbatim and uses "Not started (Phase B)" for web items, as Phase A instructed. Proposal: when product scoping happens, classify owner auth as *Planned* (any owner-facing SaaS needs it), subject to owner confirmation. | §3.1 auth; §4 |
| Q-B | Which of the §3.2 additions (deposits, utilities, receipts, reports, reminders, document storage) does the owner want in v1? Answers will move rows out of *Unknown*. | §3.2 |

---

## 8. Change log

| Date | Change | Rows | Evidence | Author |
|---|---|---|---|---|
| 2026-10-29 | Initial register created in Phase A. All product capabilities set per the decisions brief §2: six *Planned*, two *Unknown*, four *Not planned*, auth *Not implemented*. Added §3.2 rows (all *Unknown*) and §4 web items (*Not started (Phase B)*; analytics *None*). | All | Repository inspection 2026-10-29: the directory was empty and no UI mockup exists. Founder brief as summarised in the Phase A decisions brief (Phase A capture, 2026-10-29). | Phase A documentation |
| 2026-10-29 | Owner answers recorded (specs/01 §0, D-1–D-8). Lead capture: built in Phase B but **disabled** until webhook, real contact email and a reviewed privacy notice all exist. `/privacy` and `/terms`: drafts marked for review. Maintenance, multi-property and staff roles stay *Unknown*, not presented as live. Git and hosting deferred. | §4 lead capture, privacy/terms | Owner message 2026-10-29 | Phase B |
| 2026-10-29 | Phase B build: landing page **Implemented & verified** (not deployed); lead capture **Partially implemented** (built, disabled behind the three-condition gate); /privacy and /terms implemented as drafts. | §4 | Code + build/lint/typecheck/tests + Playwright QA (see §4) | Phase B |
| 2026-10-29 | D-9 animations (marquees, pinned rail) and D-10 Unsplash stock photos added to the landing page. No status change: photos are generic stock and never presented as customers or properties. | §4 | Code + QA | Phase B |
