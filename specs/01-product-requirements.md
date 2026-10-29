# 01 — Product requirements: Meraki landing page

| | |
|---|---|
| Status | Phase A approved 2026-10-29; Phase B (landing page build) in progress. The product itself is still not implemented. |
| Date | 2026-10-29 |
| Product | "Meraki" (**temporary** brand name; must be renamable from central config, see FR-01) |
| Scope | Marketing landing page (`/`), `/privacy`, `/terms`, and the early-access lead endpoint `POST /api/lead` |
| Related | [specs/02-ui-ux-reference.md](./02-ui-ux-reference.md) · [specs/03-technical-architecture.md](./03-technical-architecture.md) · [specs/04-implementation-plan.md](./04-implementation-plan.md) · [specs/05-design-system.md](./05-design-system.md) · [specs/06-feature-status.md](./06-feature-status.md) · [CLAUDE.md](../CLAUDE.md) |

**Conventions**

- **Provisional** = a decision we are proposing that still needs owner approval. It may change without breaking the spec.
- "ref: structure.md §N" (and the same for tokens.md, components.md and responsive.md) cites the verified analysis of the visual reference, Clarion Health (https://www.clarionhealth.com/). That analysis is the Phase A capture (2026-10-29) and is summarised in [specs/02-ui-ux-reference.md](./02-ui-ux-reference.md). Facts taken from it are *observed*. Everything else in this document is a requirement or a proposal.
- MUST / SHOULD / MAY carry their RFC 2119 meanings.

---

## 0. Owner decisions (2026-10-29)

These answers close or narrow the open questions in §14. Where they conflict with older text below, **this section wins**.

| # | Decision | Effect |
|---|---|---|
| D-1 (OQ-1) | Keep lead submission **disabled until configured**. Build the API route and webhook integration with validation and error handling; never pretend leads are saved. | FR-37 option (b) is final. |
| D-2 (OQ-5, OQ-14) | The contact email comes from configuration (`NEXT_PUBLIC_CONTACT_EMAIL`), never a placeholder. Lead capture stays disabled until a real contact email is supplied **and the privacy workflow has been reviewed**. | Lead capture is enabled only when **all three** hold: `LEAD_WEBHOOK_URL` is valid, `NEXT_PUBLIC_CONTACT_EMAIL` is valid, and the privacy notice is marked reviewed **in code** (`legal.privacy.reviewStatus === "reviewed"` in `src/config/legal.ts`, specs/03 §9.4). An env var alone cannot switch it on. |
| D-3 (OQ-2) | After early access: **manual follow-up**. Tell applicants the team will contact them after reviewing their request. Do not promise a product demo or an onboarding date. | Getting-started steps, FAQ 8 and the success message use the manual-review wording in §7 and §9. |
| D-4 (OQ-3) | Dashboard-preview hero and text wordmark, with clearly labelled illustrative previews. No waiting for photos or a logo. | UI-led hero is final for now. |
| D-5 (OQ-4) | Provisional indigo + cream palette. Keep the palette configurable and the name easy to rename. | Tokens in specs/05 stand; rename via `brand.ts`. |
| D-6 (OQ-5, OQ-10) | `/privacy` and `/terms` are **drafts, clearly marked for review**. No invented retention period; unreviewed legal text is never presented as approved. | Both pages show a "Draft — pending review" notice; the retention section says the period has not been decided. |
| D-7 (OQ-6) | Scope is the **MVP landing page only**. Planned capabilities shown honestly; maintenance, multi-property and staff roles are not presented as live. | Unchanged from specs/06. |
| D-8 (OQ-7) | Development setup (git, hosting) is deferred: "we will do later". | No `git init` and no deploy in Phase B. |
| D-10 | Use stock photos from Unsplash (owner request, 2026-10-29). | Six free-licence Unsplash photos, self-hosted in `src/assets/photos/` and listed with alt text and photographer credits in `src/config/images.ts`: hero background, final CTA background and the four getting-started cards, in Clarion's photo positions. Photos are generic stock; copy never presents them as Meraki customers, staff or properties. The illustrative dashboard stays below the hero. Photographers are credited in the footer. Photos showing third-party branding were rejected. |
| D-9 | Add animations "exactly like" the Clarion reference (owner request, 2026-10-29). | Supersedes the no-marquee / no-pinning parts of FR-66 and FR-67: hero marquee (100s), two bordered-cell marquees (60s LTR, 44s RTL) and a pinned horizontal rail for getting-started at ≥992px. Content stays honest: the marquees show planned capability labels, never logos. Each marquee has a pause button; all motion stops under reduced motion. Still no scroll reveals, count-ups or autoplaying carousels (Clarion has none). |

---

## 1. Product overview

Meraki is a **hostel and PG (paying guest) management platform for owners and operators in India**. It is being built to simplify daily administrative work: rooms and beds, occupancy, tenant records and allocations, monthly rent records, outstanding dues, and property operational records.

Meraki is **not** an accommodation marketplace, a rental-classifieds site, a hotel booking platform or a property-discovery portal. It is **not** for tenants or students looking for a place to stay.

**Current stage (verified 2026-10-29).** The repository is empty, so no product exists: no dashboard, API, database, authentication or lead backend. The Phase B deliverable is a landing page whose main job is to collect **early-access requests** honestly. Every product capability is either **Planned** or **Unknown**. The canonical inventory is [specs/06-feature-status.md](./06-feature-status.md), summarised here:

| Capability | Status | How the landing page may present it |
|---|---|---|
| Room & bed inventory | Planned | Intent phrasing ("being built to…") plus illustrative preview |
| Occupancy & vacancy tracking | Planned | Same |
| Tenant records & room allocations | Planned | Same |
| Monthly rent tracking (what is due or paid) | Planned | Same |
| Payment records & outstanding dues | Planned | Same. The operator records payments by hand; Meraki does no collection |
| Property operational records | Planned | Same |
| Maintenance requests & complaints | Unknown – needs confirmation | Not featured as core. FAQ-safe phrasing only |
| Multi-property management | Unknown – needs confirmation | FAQ: "We're exploring it; tell us in the early-access form" |
| Automatic UPI reconciliation | Not planned (do not claim) | FAQ: No. Payments are recorded by you |
| Online rent collection / payment gateway | Not planned (do not claim) | Never imply it |
| Tenant-facing app/portal, tenant applications | Not planned (do not claim) | FAQ: Meraki is for owners & operators |
| Integrations (WhatsApp, Tally, banks, etc.) | Not planned (do not claim) | No integrations section, no logos |
| Owner authentication / accounts | Not implemented (no app exists) | No Log in / Sign up links |
| Early-access lead capture | To be built in Phase B; destination **unconfigured** | Honest states only (FR-30 to FR-41) |

"Planned" means the founder brief names the capability as intended product direction. It is **not** a commitment to availability or a date.

## 2. Business problem

Small and medium hostel/PG operators run the business from **notebooks, spreadsheets, chat messages and memory**. As a result:

| Pain (from founder brief) | Consequence |
|---|---|
| Records are scattered across notebooks, spreadsheets and messages | No single source of truth. Information gets lost when staff change |
| It is hard to tell which beds are occupied and which are vacant | Vacant beds go unnoticed, allocations clash, and move-ins are slow |
| Outstanding rent is uncertain | Dues are missed or disputed |
| Payments are tracked by hand | Time goes into reconciling a notebook against bank or UPI statements |
| Follow-ups are repetitive | Owners chase the same tenants and details every month |
| Tenant information is disorganised | Contact and allocation details are hard to find |
| Information across properties is hard to review | Operators with several properties have no combined view (multi-property support is **Unknown**) |

Meraki's proposition: **keep occupancy, rent records, tenant information and everyday hostel operations organised in one place.** The page states this as intent, not as a shipped capability.

## 3. Target audience

The primary audience is people who **run** hostels and PGs. The founder brief names these segments:

| Segment | Typical context | What they most need from the page |
|---|---|---|
| Independent PG owners | 1 property, often run by the owner personally. Notebook or WhatsApp records | Plain language, a clear picture of rent and occupancy, low effort to join early access |
| Hostel owners | Student or working-professional hostels, sometimes with a warden | Room/bed visibility and dues overview |
| Small & medium hostel operators | Several buildings or floors, small staff | Organised records, so the business does not depend on one person's memory |
| Property managers | Manage on behalf of an owner | Ability to report occupancy and dues to the owner |
| Administrators (day-to-day operations) | Handle move-ins, allocations and rent entries | Fast, practical workflows |
| Operators managing multiple properties | 2+ properties | An honest answer on multi-property support (currently **Unknown**: "We're exploring it") |

**Not the audience:** tenants, students or travellers looking for accommodation; brokers; hotel guests. The page MUST NOT court them (no search box, no listings, no "find a PG").

**Locale.** India, English copy, `₹` amounts, Indian phone formats. Hindi and regional-language support is an open question (OQ-8).

## 4. User needs (jobs to be done)

| # | When… | I want to… | So that… | Capability status |
|---|---|---|---|---|
| J1 | A prospective tenant calls asking for a bed | See which beds are vacant right now | I can answer immediately and fill the bed | Planned |
| J2 | Rent falls due each month | See who has paid and who still owes, per tenant | I chase only the people who actually owe | Planned (manual recording) |
| J3 | A tenant pays by UPI, cash or bank transfer | Record the payment against that tenant | My dues list stays correct | Planned (manual recording, **no** UPI reconciliation) |
| J4 | A tenant moves in or out | Allocate or free a bed and keep their details | My records and occupancy stay accurate | Planned |
| J5 | I need a tenant's or the property's details | Find them in one place | I stop searching notebooks and chats | Planned |
| J6 | I evaluate a new tool | Understand quickly what it does, what it does not do, and what it will cost me in effort | I don't waste time or get misled | **This page** (Phase B) |
| J7 | I am interested but the product isn't ready | Register interest and describe my biggest problem | I get access early and influence what is built | **This page**: early-access form |
| J8 | I run several properties | Know whether Meraki will support that | I can decide whether it fits | Unknown. The FAQ answers honestly |

J6 and J7 are the jobs this landing page itself must do. J1–J5 and J8 are what the page *describes* as intended product direction.

## 5. Landing page objectives

| # | Objective | Served by |
|---|---|---|
| O-1 | Within the first viewport, communicate that Meraki is hostel/PG management software for owners and operators | Hero (H1, sub-copy, preview) |
| O-2 | Show that we understand the operator's real problems | Problem section |
| O-3 | Explain the intended capabilities concretely, without overclaiming | Outcomes, Platform tabs, Attention, Features, How it works |
| O-4 | Be explicit about the product stage (early access) and what Meraki does **not** do | Getting started, FAQ, preview labels |
| O-5 | Convert qualified visitors into early-access requests | Nav CTA, hero CTA, Why CTA, form, final CTA |
| O-6 | Match the quality and composition of the reference while keeping an original identity | Design system ([specs/05-design-system.md](./05-design-system.md)) |
| O-7 | Be fast, accessible and indexable | §11, §12 |

## 6. Conversion goals and measurement

| Goal | Type | Definition of a conversion | How it can be measured |
|---|---|---|---|
| **Request early access** | Primary | A form submission that returns HTTP 200 with `{ok:true}`, which the server sends only after the configured destination has acknowledged the lead (FR-36) | Count the leads received at the destination (webhook target, e.g. a Sheet or CRM). This needs no analytics on the page. It is possible only once OQ-1 is resolved |
| **Understand the product** | Secondary | The visitor engages with explanatory content: reaches `#platform` or `#how-it-works`, switches tabs, opens FAQ items | Needs analytics. **None is installed or planned for Phase B** (OQ-9) |
| CTA intent | Diagnostic | Clicks on "Get early access" / "See how it works" | Needs analytics (OQ-9) |
| Lead quality | Diagnostic | Bed range, number of properties and stated challenge on each lead | Read from the lead payload at the destination |

**Phase B rule:** no analytics, tracking pixels, cookies or third-party scripts are added. Before any analytics is added, the owner must choose a tool (OQ-9) and the `/privacy` text must be updated to disclose it. The conversion *rate* (leads ÷ visits) therefore cannot be measured at launch. Hosting-platform request logs may give rough visit counts, but this spec does not depend on them.

**CTA wording.** The brief allows "Get Early Access" or "Request a Demo", depending on the real onboarding process. We use **early access** everywhere, because no product exists to demo. Button labels are "Get early access" in nav and CTAs, and "Request early access" on the form submit button.

## 7. Page sections

Section order and anchor ids are fixed here (they record the Phase A decisions brief, 2026-10-29, which is not kept in the repo; this table is the in-repo authority). Every id below is a stable public anchor and MUST NOT be renamed without updating nav, footer and tests. Clarion patterns are cited for orientation; the full rationale is in [specs/02-ui-ux-reference.md](./02-ui-ux-reference.md).

| # | id | Section (working heading) | Purpose | Key content | CTA(s) | Ref pattern |
|---|---|---|---|---|---|---|
| 0 | — (`<header>`) | Nav | Orientation plus a persistent primary action | Text wordmark (from brand config). Links: Product → `#platform`, Features → `#features`, How it works → `#how-it-works`, Contact → `#early-access`. No auth links, no dropdown | "Get early access" → `#early-access` | ref: structure.md §0, components.md §1 |
| 1 | `hero` | "Run your hostel. Not your paperwork." | Category and promise (O-1) | H1. Sub-copy: "Being built to keep occupancy, rent records, tenant information and everyday operations organized in one place." Dark accent gradient band (no photo). Large DashboardPreview rising out of the bottom edge, captioned "Illustrative preview · sample data". No logo marquee | Primary "Get early access" → `#early-access`; secondary "See how it works" → `#how-it-works` | ref: structure.md §1 |
| 2 | `problem` | "Running a hostel shouldn't mean chasing information across multiple tools." | Problem recognition (O-2) | Centred header, then a 4-item row of where information lives today (Notebook, Spreadsheet, Chat messages, Memory), each with a 2px left rule and a one-line pain: fragmented records, manual rent tracking, unclear occupancy, repetitive follow-ups. Text-led. No stats | — | ref: structure.md §5 (no Clarion equivalent; §2 header + §4 rule motif) |
| 3 | `outcomes` | Three outcomes | What the owner gets (O-3) | Three cards: **Know your occupancy** ("Designed to keep room and bed availability visible and organized."), **Track rent with clarity** ("Designed to help you review recorded payments and outstanding dues."), **Keep operations organized** ("Designed to make tenant and property information easier to find."). Each has a distinct HTML/SVG mini-UI (bed grid, rent ledger rows, tenant/property record card) | — | ref: structure.md §2 |
| 4 | `platform` | "Everything your hostel needs to stay organized." | Mechanism: how it fits together (O-3) | Four tabs: Rooms & occupancy / Tenants & allocations / Rent & payments / Property operations. Each tab changes both the description **and** the preview (a real state change) | One shared "Get early access" → `#early-access` below the tab panels (not one per pane) | ref: structure.md §3, components.md §4.1 |
| 5 | `attention` | "Know what needs your attention." | Operational visibility without stats (O-3) | Left: H2, sub-copy and a label list (Vacant beds, Dues outstanding, Move-ins/outs this week, and "Open issues" **only if** maintenance is confirmed, else "Notes to follow up"). Labels only, no numbers. Right: full DashboardPreview (summary tiles, recent recorded payments, dues list), captioned | — | ref: structure.md §4 |
| 6 | `features` | Detailed feature showcases | Specifics behind the overview (O-3) | At most 3 alternating rows: Occupancy & rooms; Rent & payment records; Tenant & property records. Each row has an H3, 2–3 bullets of *intended* capability, and a preview on a tinted panel. Multi-property row omitted (Unknown). Copy must not repeat the tab copy | — | ref: structure.md §3 split geometry, §5 |
| 7 | `how-it-works` | "How it works" (the owner's month in Meraki) | Shows how Meraki fits the owner's routine. Replaces Clarion's integrations section | Centred header plus a bordered chip flow: New tenant → Allocate bed → Record rent → Follow up dues → Move-out. **No third-party logos or integrations, no compliance band.** An optional "Your data" note may appear only with true statements | — | ref: structure.md §5 (integrations layout without logos) |
| 8 | `getting-started` | "Getting started should be simple." | Sets honest expectations about the early-access process (O-4) | Steps (D-3, manual follow-up): 1 You request early access → 2 We review your request → 3 We contact you to learn how you run your property → 4 You help shape what we build. No demo or onboarding date is promised. Dark full-bleed band. Native scroll-snap rail below 992px, 4-up row from 992px. **No scroll-pinning** | — | ref: structure.md §6, components.md §5.3 |
| 9 | `why` | "Why Meraki" | True differentiators (O-3, O-5) | Four cards: Built for hostels & PGs / Everything in one place / Clear view of occupancy & dues / Shaped with operators who join early access. No competitor comparisons, no "enterprise-grade" | "Get early access" → `#early-access` | ref: structure.md §7 |
| 10 | `early-access` | "Help us build a better way to manage hostels." | Primary conversion (O-5) | Supporting copy: "Join the Meraki early-access list and help shape a simpler way to manage hostel and PG operations." Inline form card (FR-30 to FR-41). Short privacy notice with a link to `/privacy` | Submit: "Request early access" | ref: components.md §9 (modal card styling, placed inline) |
| 11 | `faq` | FAQ | Answers objections honestly (O-4) | The 8 questions and answers in §9, as an accessible accordion | Answer 8 links to `#early-access` | none in ref (structure.md §3 "Absent") |
| 12 | `final-cta` | "Make hostel management simpler." | Close (O-5) | Supporting copy: "Get early access to Meraki and help shape a better way to manage hostel operations." Diagonal gradient band with a CSS abstract shape or a cropped preview. No photo | "Get early access" → `#early-access` | ref: structure.md §8 |
| 13 | — (`<footer>`) | Footer | Exits and legal | Large wordmark. Columns: **Product** (Platform → `#platform`, Features → `#features`, How it works → `#how-it-works`), **Company** (Early access → `#early-access`, Contact → `#early-access`, FAQ → `#faq`), **Legal** (Privacy → `/privacy`, Terms → `/terms`). Contact email or phone shown only if the env var is set. No social icons. © year computed at render | — | ref: structure.md §9, components.md §10 |

**Copy rules (all sections).** H2s are 3–8 words, followed by at most one supporting sentence. Use the "X, not Y" pattern sparingly. Product statements use intent phrasing ("is being built to", "designed to"), including card bodies, the hero sub and metadata, which can be read without the early-access context. "Meraki helps you…" is allowed only next to early-access framing. Sample data uses obviously fictional Indian names and `₹` amounts.

## 8. Functional requirements

IDs are stable; tests and the implementation plan reference them.

### 8.1 Brand, content and links

| ID | Requirement |
|---|---|
| FR-01 | Brand name, tagline, description, nav links, CTA labels, optional contact details and metadata MUST come from one config module (`src/config/brand.ts`). All section copy, FAQ entries, tab data and sample data MUST come from `src/config/site-content.ts`. Renaming the product MUST require edits only to these files and the colour tokens in `globals.css`. Copy files MUST NOT hard-code "Meraki" when they can interpolate the configured name. |
| FR-02 | The wordmark is text rendered from the brand name until a logo is supplied (OQ-3). |
| FR-03 | Every `href` on the page MUST resolve to an existing in-page id (§7) or an existing route (`/`, `/privacy`, `/terms`). Bare `href="#"`, `javascript:` links and buttons without handlers are forbidden. |
| FR-04 | No Log in, Sign up, Dashboard or Pricing links, because none of these exist. |
| FR-05 | Contact email and phone appear (footer, form fallback) **only** when `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE` are set. When they are unset, the page renders no empty `mailto:`/`tel:` link and no placeholder text. |

### 8.2 Navigation and anchors

| ID | Requirement |
|---|---|
| FR-10 | The header is a fixed pill (ref: structure.md §0) containing the wordmark (link to `/#hero`, or top of page), exactly 4 links (Product, Features, How it works, Contact), and the "Get early access" CTA. The CTA stays visible in the pill at every width. |
| FR-11 | Anchor navigation scrolls to the section. The target heading MUST NOT be hidden under the fixed header: use `scroll-margin-top: var(--spacing-nav-offset)` (5.5rem, per [specs/05](./05-design-system.md) §5; **Provisional**). |
| FR-12 | Smooth scrolling MAY be used only when `prefers-reduced-motion: no-preference`. Otherwise the jump is instant. |
| FR-13 | After anchor navigation, keyboard focus MUST land in the target section, so that the next Tab continues from there. Native fragment navigation is acceptable if it behaves this way in Chromium, Firefox and Safari. Otherwise move focus programmatically to the section heading (`tabindex="-1"`). |
| FR-14 | Direct loads of `/#<id>` for every id in §7 land on the correct section. |
| FR-15 | A skip link ("Skip to content") is the first focusable element and targets `<main id="main">`. |

### 8.3 Mobile menu (viewport < 992px)

| ID | Requirement |
|---|---|
| FR-16 | Below 992px the 4 links collapse behind a `<button>` with `aria-expanded`, `aria-controls` and an accessible name that switches between "Open menu" and "Close menu". Tap target ≥ 44×44px (the reference's is 40×43; ref: responsive.md §3 item 8). |
| FR-17 | Opening shows a sheet panel with the 4 links. While it is open, focus is trapped inside the header (toggle + panel + CTA), body scroll is locked, and the page behind is inert to pointer and keyboard. |
| FR-18 | The menu closes on Esc, on toggle press, on selecting a link (navigation then proceeds), and when the viewport grows to ≥ 992px. On close via Esc or toggle, focus returns to the toggle. |
| FR-19 | With JS disabled, the nav links are still reachable (for example, the menu is rendered open or as a plain list) and the CTA works. **Provisional** technique, decided in implementation. |

### 8.4 Platform tabs (`#platform`)

| ID | Requirement |
|---|---|
| FR-20 | Implements the WAI-ARIA Tabs pattern: `role="tablist"` (labelled by the section H2), `role="tab"` with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby`. |
| FR-21 | Keyboard: roving `tabindex`. Left/Right (and Up/Down) arrows move between tabs, Home/End jump to the first/last tab, and activation is automatic on focus (**Provisional**; manual activation is also acceptable). Tab moves focus from the tab list into the active panel. |
| FR-22 | Selecting a tab swaps **both** the text panel and the preview to the matching content (Rooms & occupancy ↔ occupancy grid; Tenants & allocations ↔ tenant list; Rent & payments ↔ rent ledger; Property operations ↔ ops list). This deliberately differs from the reference, whose single image never changes (ref: components.md §4.1). |
| FR-23 | The panel height does not jump when tabs switch (stacked-grid technique; ref: components.md §4.1). Crossfade is 300ms in and 100ms out, and none under reduced motion. |
| FR-24 | The default selected tab is the first. Without JS, all four panels render in sequence, readable as plain content (progressive enhancement). |
| FR-25 | Below 992px the layout stacks. The tab list becomes a horizontally scrollable row above the panel. It MUST NOT cause page-level horizontal overflow. |

### 8.5 Early-access form (`#early-access`)

The behaviour follows decisions §6. The architecture is in [specs/03-technical-architecture.md](./03-technical-architecture.md).

**Fields**

| Field | Name | Control | Required | Validation (client and server, one shared zod schema) |
|---|---|---|---|---|
| Full name | `name` | text, `autocomplete="name"` | Yes | Trimmed, 2–80 chars (**Provisional**) |
| Property / business name | `property` | text, `autocomplete="organization"` | Yes | Trimmed, 2–120 chars (**Provisional**) |
| Phone | `phone` | `type="tel"`, `inputmode="tel"`, `autocomplete="tel"` | One of phone/email | Indian mobile: 10 digits starting 6–9, optional `+91`/`0` prefix, spaces and hyphens ignored (**Provisional**) |
| Email | `email` | `type="email"`, `autocomplete="email"` | One of phone/email | Valid email, ≤ 254 chars. Personal domains (e.g. Gmail) MUST be accepted |
| City | `city` | text, `autocomplete="address-level2"` | Yes | Trimmed, 2–60 chars |
| Approx. beds | `beds` | `<select>` | Yes | One of: Under 20 / 20–50 / 51–150 / More than 150 (**Provisional** ranges, OQ-13) |
| Number of properties | `properties` | `<select>` | No | One of: 1 / 2–3 / 4+ |
| Biggest challenge | `challenge` | `<textarea>` with a visible character counter | No | ≤ 500 chars |
| Consent | `consent` | checkbox, **unticked** by default, label links to `/privacy` | Yes | Must be `true` |
| Honeypot | `website` | text, visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden="true"` | — | Must be empty |

| ID | Requirement |
|---|---|
| FR-30 | Collect only the fields above (data minimisation, DPDP Act 2023). No Aadhaar/ID, no address, no pre-ticked boxes, no marketing opt-in bundled with consent. |
| FR-31 | Every control has a visible `<label for>`. Placeholders are never the only label. Required fields are marked in text ("required"), not by colour or asterisk alone. The phone/email pair sits in a `<fieldset>` whose `<legend>` says that at least one is needed. |
| FR-32 | A notice at the point of collection, next to the consent checkbox, states what is collected, why ("to contact you about Meraki early access"), and how to withdraw. It links to `/privacy`. The final text needs owner/legal review (OQ-5). |
| FR-33 | Validation runs on submit. After the first failed submit, each field re-validates on blur/change. Errors appear (a) inline under the field, linked with `aria-describedby` and `aria-invalid="true"`, and (b) in an error summary at the top of the form with links to each invalid field. Focus moves to the summary. |
| FR-34 | **Duplicate-submit guard.** While a request is pending, the submit button is disabled and its label changes to "Sending…". The form has `aria-busy="true"`, and further submits (button, Enter key) are ignored. The guard is released on any response or error. |
| FR-35 | Every failure keeps everything the user typed. |
| FR-36 | **Success is shown only** when the server answers HTTP 200 with JSON `{ok:true}`. The server sends that only after the destination returned a JSON `{ok:true}` acknowledgement within 8 seconds. On success, the form is replaced by a confirmation message that receives focus. The message does not promise a response time or a call-back (wording depends on OQ-2), for example: "Thank you — your request has reached us. Our team will contact you after reviewing it. We'll use these details only for that." |
| FR-37 | **Not configured (503).** If `LEAD_WEBHOOK_URL` is unset, the server returns 503 `{ok:false,error:"not_configured"}`. The UI shows "Our early-access form isn't connected yet." If contact env vars are set, it adds a `mailto:` link (prefilled subject and body built from the user's input) and/or a `tel:` link. If not, it says "Please try again later." Implementation MUST choose between (a) this submit-time message and (b) rendering the form with an honest notice banner when the destination is known to be unconfigured, and MUST document the choice in [specs/03-technical-architecture.md](./03-technical-architecture.md). **Recommended (Provisional): option (b)**, a disabled `<fieldset>` with the notice and optional fallback links (specs/03 §9.4). **Contact gate (Provisional):** lead capture counts as configured only when both `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are set, so a withdrawal/grievance contact exists whenever personal data is collected; otherwise the route returns 503 `not_configured`. Faking a 200 is never acceptable. |
| FR-38 | **Upstream failure (502).** A destination timeout (8s), network error, non-2xx status, or missing/invalid acknowledgement makes the server return 502 `{ok:false,error:"upstream"}`. The UI says "We couldn't send your request. Your details are still here — please try again." and shows the fallback links only if they are configured. |
| FR-39 | **Invalid input (400).** The server returns field-level errors (`fieldErrors`, visible fields only), which are shown as in FR-33. A honeypot hit returns the **same generic 400** as other invalid input, with no `fieldErrors`. It never returns a fake 200. A 400 with no `fieldErrors` shows "We couldn't accept this submission. Please reload the page and try again." plus the fallback contact links if configured. |
| FR-40 | **Client-side failures.** A rejected fetch (offline), a non-JSON response (e.g. a platform HTML error page), or any status other than 200+`{ok:true}` is a failure, shown like FR-38. A best-effort per-IP rate limit returns 429. The UI then says "Too many attempts. Please wait a minute and try again." (**Provisional** status code and copy.) |
| FR-41 | All status messages are announced through one `aria-live="polite"` region (`role="alert"` for errors is acceptable). The server never logs PII (names, phones, emails, challenge text). Only the explicitly picked lead fields are forwarded upstream, never the honeypot. |

### 8.6 FAQ accordion (`#faq`)

| ID | Requirement |
|---|---|
| FR-50 | Renders exactly the 8 questions in §9, in that order, from `site-content.ts`. |
| FR-51 | Accessible disclosure. Either native `<details>/<summary>` (preferred, no JS) or `<button aria-expanded aria-controls>` toggling a region. The choice is made in implementation and documented. Each question is inside a heading element (h3) or a `<summary>` that conveys the question. |
| FR-52 | All items are collapsed by default (**Provisional**). Several may be open at once. Enter/Space toggles. The state indicator (chevron or plus) is decorative and `aria-hidden`. |
| FR-53 | Answer text is server-rendered in the HTML (indexable). Open/close animation is disabled under reduced motion. |

### 8.7 Previews, footer routes and other components

| ID | Requirement |
|---|---|
| FR-60 | Every product preview (hero, outcomes, tabs, attention, features, final CTA if used) shows the visible caption **"Illustrative preview · sample data"**, and its data is flagged `illustrative: true` in config. |
| FR-61 | Sample data uses obviously fictional Indian names and `₹` amounts. It MUST NOT be framed as Meraki usage, customer results or performance ("₹4.2L collected by our users" is forbidden). Labels describe recorded data ("Recorded payments", "Outstanding dues"), never collection ("Collected via Meraki"). |
| FR-62 | Previews are HTML/SVG (no raster screenshots, no external images). For assistive technology, each preview is a `<figure>` with the caption as `<figcaption>` and a short text description. The inner sample values are hidden from the accessibility tree, so fictional numbers are not read out as facts (**Provisional**). |
| FR-63 | `/privacy` exists and contains an honest notice for the early-access form: what is collected, purpose, processors ("a service chosen by the {brand} team to store early-access requests", named once OQ-1 is answered; and the hosting provider, which processes the visitor's IP address briefly to deliver the page and limit abuse, without storing it), retention, and how to withdraw or contact. It is marked "Draft — pending review" until the owner/legal review is recorded in `src/config/legal.ts` (D-2, D-6). No retention period is invented: until one is decided the page says so. |
| FR-64 | `/terms` exists, is marked "Draft — pending review" (D-6), and honestly states that terms of service will be published before the product is available. It contains no invented legal terms. |
| FR-65 | Both routes reuse the header and footer, have their own `<title>`, and are linked from the footer Legal column. No other routes are linked. |
| FR-66 | (Amended by D-9: from 992px, without reduced motion, the rail pins and scrolls sideways with page scroll, as on Clarion; a focused card is scrolled into view.) The `#getting-started` rail below 992px uses native horizontal scroll with snap. It is operable by keyboard (focusable scroll region with an accessible name, or every card focusable) and needs no dragging gesture. It shows a position cue (e.g. "1 / 4" or dots). From 992px all 4 cards are visible. No scroll-hijacking or pinning. |
| FR-67 | (Amended by D-9.) Marquees only as specified in D-9, each pausable. No count-up, no scroll-reveal animations, no autoplaying carousels. |

## 9. FAQ answers (draft)

These answers are consistent with §1 and [specs/06-feature-status.md](./06-feature-status.md). If a status changes, the answer MUST be updated in the same change. `{brand}` is the configured product name.

1. **What is {brand}?**
   {brand} is hostel and PG management software being built for owners and operators in India. It's designed to keep rooms and beds, occupancy, tenant records, rent records and outstanding dues organised in one place. We're opening early access, and it isn't available yet. We're building it with operators who join early access.

2. **Who is {brand} built for?**
   People who run hostels and PGs: independent PG owners, hostel owners, small and medium operators, property managers and the administrators who handle day-to-day operations. {brand} is not a site for finding accommodation, and it isn't designed for tenants.

3. **Can I track rent and outstanding payments?**
   That's a core part of what we're building: recording the rent due each month and the payments you receive, and showing which tenants have dues outstanding. Payments are recorded by you. {brand} doesn't collect rent or process payments.

4. **Can I manage rooms and bed occupancy?**
   That's central to what {brand} is being built to do: set up your rooms and beds, allocate tenants to beds, and see at a glance which beds are occupied and which are vacant. Operators who join early access will help us shape how it works.

5. **Can I manage multiple properties?**
   We're exploring it. If you run more than one property, tell us in the early-access form. It helps us decide how to support it.

6. **Does {brand} automatically reconcile UPI payments?**
   No. {brand} won't connect to UPI apps, payment gateways or bank accounts. Payments are recorded by you.

7. **Can tenants use {brand} directly?**
   No. {brand} is for owners and operators. There's no tenant app or portal, and tenants can't apply or pay through it.

8. **How can I get early access?**
   Fill in the [early-access form](#early-access) on this page with a few details about your property. Our team reviews each request and will contact you after reviewing it. We can't promise a demo or an onboarding date yet.

Excluded on purpose: pricing, timelines, launch dates, Hindi support, mobile apps, data-security certifications, maintenance/complaints (Unknown; not featured as core).

## 10. Content and claims policy

All copy, previews, metadata and the OG image MUST follow this policy. Reviewers check it at AC-40.

### 10.1 Allowed

| Allowed | Example |
|---|---|
| Describing operators' problems | "Records scattered across notebooks, spreadsheets and messages." |
| Intended capability in intent phrasing, for **Planned** items only | "Meraki is being built to show which beds are vacant." / "Designed to help you track recorded payments and dues." |
| Early-access framing | "Join early access and help shape what we build." |
| Honest negatives | "Payments are recorded by you." / "Meraki is for owners and operators." |
| Illustrative previews with the required caption and fictional data | "Illustrative preview · sample data" |
| True statements about the page's own behaviour | "We'll use these details only to contact you about early access." (only if true per `/privacy`) |

### 10.2 Forbidden (do not claim)

| Forbidden | Reason |
|---|---|
| Customer or user counts ("500+ hostels", "trusted by…"), customer logos, testimonials, ratings, case studies | None exist |
| Any numeric outcome or performance stat ("save 10 hours/week", "reduce dues by 40%", "go live in a day") | No data. Clarion's stat pattern is not reused (ref: structure.md §6) |
| Present-tense availability of any Planned feature ("Track rent in Meraki today") | Nothing is implemented |
| UPI reconciliation, online rent collection, payment gateway, payment links | Not planned |
| Automatic reminders, WhatsApp/SMS messages, notifications | Not planned or Unknown |
| Integrations (WhatsApp, Tally, banks, UPI apps, accounting tools) and their logos | Not planned |
| Tenant app/portal, tenant applications, online booking | Not planned |
| Multi-property support or maintenance/complaints as available features | Unknown |
| Security or compliance claims ("bank-grade security", "DPDP compliant", ISO/SOC 2) | Not verified. Do not swap in Indian-equivalent compliance badges (ref: structure.md §6) |
| Pricing, "free", "₹0 setup fee", trial lengths, launch dates, response-time promises ("we'll call within 24 hours") | Not decided |
| Competitor comparisons, "#1", "best", "enterprise-grade", "AI-powered" | Unsupported |
| Mobile app, Hindi/regional language interface, offline mode | Unknown (OQ-8) |
| Invented contact details, address, domain, social profiles, team or founder bios | None exist |
| Clarion's brand, copy lines, healthcare vocabulary, photos, logos, illustrations, stats, trial fonts (Moderat Serif Trial) | ref: structure.md §6 |

## 11. Accessibility requirements

Target: **WCAG 2.2 Level AA** for `/`, `/privacy` and `/terms`. The reference has several failures that we must not copy (ref: components.md §11, tokens.md §7).

| ID | Requirement | WCAG |
|---|---|---|
| A-01 | Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`. The reference has no `<main>` or `<footer>`. Footer link groups are in a labelled `<nav>`. | 1.3.1 |
| A-02 | One `<h1>` (hero). One `<h2>` per section. Card, tab-panel, feature-row and FAQ titles use `<h3>`. No skipped levels. | 1.3.1, 2.4.6 |
| A-03 | `<html lang="en">` (**Provisional**: `en-IN`). | 3.1.1 |
| A-04 | Text contrast ≥ 4.5:1, large text ≥ 3:1, UI component and focus-indicator contrast ≥ 3:1. Muted text uses a solid token (`--color-ink-muted`), not opacity. The reference's opacity-.6 body text fails at about 4.3:1 (ref: tokens.md §7). Inactive tab labels must still meet 3:1 as large text, or 4.5:1 below 24px. Every pair is recorded in [specs/05-design-system.md](./05-design-system.md). | 1.4.3, 1.4.11 |
| A-05 | A visible `:focus-visible` indicator on every interactive element: 2px outline, 2px offset, ≥ 3:1 against adjacent colours, on light and dark bands alike. The reference resets focus outlines (ref: components.md §11). | 2.4.7, 2.4.13 (advisory) |
| A-06 | Focus is never fully hidden by the fixed header (FR-11) or by the open mobile menu. | 2.4.11 |
| A-07 | Everything is operable by keyboard, with logical focus order and no traps except the intentional, escapable mobile-menu trap (FR-17/18). | 2.1.1, 2.1.2, 2.4.3 |
| A-08 | Interactive targets ≥ 24×24px (AA minimum). Project standard is ≥ 44px height for buttons and the menu toggle on touch. | 2.5.8 |
| A-09 | Tabs, accordion and menu follow the APG patterns (FR-20/21, FR-51, FR-16). | 4.1.2 |
| A-10 | Form: visible labels, `autocomplete` tokens (FR-30 table), error identification in text, error summary, suggestions in messages ("Enter a 10-digit mobile number"), status messages via live region. | 1.3.5, 3.3.1, 3.3.2, 3.3.3, 4.1.3 |
| A-11 | No information by colour alone (status chips in previews carry text, e.g. "Due", "Paid"). | 1.4.1 |
| A-12 | `prefers-reduced-motion: reduce` disables smooth scroll, crossfades, menu and accordion transitions. No auto-moving content exists (FR-67). | 2.3.3 (advisory), 2.2.2 |
| A-13 | Reflow: no horizontal page scroll at 320 CSS px wide or at 400% zoom. Text stays readable with WCAG text-spacing overrides. | 1.4.10, 1.4.12, 1.4.4 |
| A-14 | Decorative SVG/icons have `aria-hidden="true"`. Meaningful graphics have text alternatives. Previews follow FR-62. | 1.1.1 |
| A-15 | Link text is descriptive out of context. Repeated "Get early access" links share one destination, which is acceptable. | 2.4.4 |
| A-16 | Dragging is never required (scroll rail, FR-66). | 2.5.7 |

## 12. Performance and SEO requirements

### 12.1 Performance budgets

| ID | Requirement | Budget |
|---|---|---|
| P-01 | Largest Contentful Paint, mobile (Lighthouse mobile preset: mid-range device, throttled 4G) on a production build | **< 2.5 s** |
| P-02 | Cumulative Layout Shift | **< 0.1** (fonts via `next/font` with fallback metric adjustment; previews have reserved dimensions) |
| P-03 | Interaction to Next Paint (field data when available; lab proxy: Total Blocking Time < 200 ms) | **< 200 ms** |
| P-04 | Lighthouse mobile scores on `/` | Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (**Provisional**) |
| P-05 | Client JavaScript: Server Components by default. Client components only for the header menu, platform tabs and early-access form (plus the FAQ only if native `<details>` is not used). No UI kit, animation, form or icon-font libraries. zod is the only added runtime dependency | First-load JS for `/` ≤ framework baseline + **30 KB gzip** of app code (**Provisional**; measure from `next build` output) |
| P-06 | Fonts: Newsreader + Geist through `next/font/google`, self-hosted at build time, Latin subset only, only the weights in use (no requests to Google from the browser) | ≤ 4 font files on first load (**Provisional**) |
| P-07 | Images: none in the critical path. The hero LCP element is text (H1) or the HTML preview. Any later raster image uses `next/image` with explicit sizes and lazy loading below the fold. No third-party image hosts | — |
| P-08 | The page prerenders as static HTML. Only `/api/lead` is dynamic | — |
| P-09 | No third-party scripts, analytics, chat widgets or tag managers in Phase B | 0 third-party requests |

### 12.2 SEO and metadata

| ID | Requirement |
|---|---|
| S-01 | `<title>`: **"Meraki — Hostel & PG Management Software"**, built from brand config as `` `${brand.name} — Hostel & PG Management Software` ``. |
| S-02 | Meta description: **"Meraki is hostel and PG management software being built for owners and operators in India. Join early access to help shape a clearer view of occupancy, rent records and tenant details."** (from brand config, built from `brand.name`). It appears alone in search results, so it must carry the early-access framing. |
| S-03 | Open Graph: `og:title`, `og:description`, `og:type=website`, `og:site_name` (brand name), `og:locale=en_IN`, and `og:image` generated by `opengraph-image.tsx` from brand name and tokens, with no external assets or claims. Twitter card `summary_large_image`. |
| S-04 | **No canonical URL, sitemap or absolute URLs** until the production domain is known. `metadataBase` is set only from `NEXT_PUBLIC_SITE_URL` when present. No invented domain anywhere. |
| S-05 | Semantic, server-rendered HTML. All copy, including FAQ answers and tab panels, is present in the initial HTML. |
| S-06 | No structured data (Organization, Product, FAQPage) in Phase B, because truthful required fields (logo, URL, contact) do not exist yet. Revisit when the domain and brand are final. |
| S-07 | `/privacy` and `/terms` have unique titles and descriptions. Whether preview and pre-launch deployments should be `noindex` is open (OQ-11). |
| S-08 | Favicon: a simple generated or text-based mark from brand config. No reference assets. |

## 13. Acceptance criteria

Each criterion can be checked by a manual or automated test (Vitest/Testing Library for units and routes, optional Playwright for browser checks). The FR, A and P ids in brackets are what it verifies.

**Structure and content**

| ID | Criterion |
|---|---|
| AC-01 | `/` renders the 12 content sections in the §7 order. Each has the exact id listed (`hero`, `problem`, `outcomes`, `platform`, `attention`, `features`, `how-it-works`, `getting-started`, `why`, `early-access`, `faq`, `final-cta`), plus a `<header>` and `<footer>`. |
| AC-02 | Changing the brand name in `src/config/brand.ts` changes the wordmark, footer wordmark, `<title>`, OG title/site name and FAQ copy, with no other file edited. [FR-01] |
| AC-03 | A crawl of all `<a href>` on `/`, `/privacy` and `/terms` finds no `#` or empty hrefs. Every fragment matches an existing id and every path returns 200. [FR-03, FR-65] |
| AC-04 | The nav has exactly 4 links (Product → `#platform`, Features → `#features`, How it works → `#how-it-works`, Contact → `#early-access`) and one CTA → `#early-access`. There are no login, sign-up or pricing links. [FR-04, FR-10] |
| AC-05 | With `NEXT_PUBLIC_CONTACT_EMAIL`/`PHONE` unset, the HTML contains no `mailto:` or `tel:` link. With them set, the footer shows them. [FR-05] |
| AC-06 | Every preview on the page has a visible "Illustrative preview · sample data" caption. [FR-60] |

**Navigation, tabs, menu, FAQ**

| ID | Criterion |
|---|---|
| AC-10 | At 1440px and 390px, activating each nav and footer anchor scrolls so that the target section's heading is fully visible below the fixed header. [FR-11] |
| AC-11 | With reduced motion emulated, anchor navigation jumps without smooth scrolling and no transitions run. [FR-12, A-12] |
| AC-12 | The first Tab press focuses "Skip to content". Activating it moves focus into `<main>`. [FR-15] |
| AC-13 | At 390px: the toggle has `aria-expanded="false"`. Activating it opens the panel and sets `"true"`. Tab cycles only within the header. Esc closes it and focus returns to the toggle. Choosing a link closes the menu and navigates. The body does not scroll while open. Resizing to 1200px closes it. [FR-16–18] |
| AC-14 | In `#platform`, each of the 4 tabs, activated by click or arrow keys, sets `aria-selected="true"` on itself only, shows its panel, and swaps the preview to the matching one. Home/End jump to the first/last tab. [FR-20–22] |
| AC-15 | Switching tabs causes no layout shift outside the panel (CLS contribution 0). [FR-23] |
| AC-16 | The FAQ shows 8 questions in §9 order, all collapsed on load. Each opens and closes with mouse, Enter and Space, and exposes its expanded state to assistive technology. [FR-50–52] |
| AC-17 | Every FAQ answer matches §9 and agrees with [specs/06-feature-status.md](./06-feature-status.md). [FR-50, §10] |

**Early-access form** (route tests mock the destination)

| ID | Criterion |
|---|---|
| AC-20 | Submitting an empty form produces no network request. It shows an error summary that receives focus and lists every required field plus "phone or email". Each invalid field has `aria-invalid="true"` and an associated message. [FR-33] |
| AC-21 | A valid form with only a phone, or only an email, passes client validation. Both empty fails. [FR-30, FR-31] |
| AC-22 | During a pending request, the submit button is disabled and the form has `aria-busy="true"`. Triggering submit twice quickly sends exactly one request. [FR-34] |
| AC-23 | `POST /api/lead` with `LEAD_WEBHOOK_URL` unset (or `NEXT_PUBLIC_CONTACT_EMAIL` unset) returns 503 `{ok:false,error:"not_configured"}`. With the recommended option (b), the page renders the form disabled with "Our early-access form isn't connected yet.". If a 503 still reaches the client (env drift), the UI shows the same message and keeps all input. No success message appears. [FR-35, FR-37] |
| AC-24 | With the destination mocked to time out after 8 s, return non-2xx, return 200 with a non-JSON body, or return JSON without `ok:true`, the route returns 502 `{ok:false,error:"upstream"}` and the UI shows the retry message with input preserved. [FR-38] |
| AC-25 | With the destination mocked to return `{ok:true}`, the route returns 200 `{ok:true}`. The UI replaces the form with the confirmation and focuses it. This is the **only** path that shows success. [FR-36] |
| AC-26 | Invalid payloads (missing consent, overlong `challenge` > 500, bad phone) return 400 with `fieldErrors`; a non-JSON body returns 400 without them. A filled honeypot returns 400 without `fieldErrors` and is never forwarded. [FR-39, FR-41] |
| AC-27 | The upstream request body contains only the lead fields, never `website`. Server logs captured during tests contain no submitted name, phone, email or challenge text. [FR-41] |
| AC-28 | The consent checkbox is unticked on load, and its label links to `/privacy`. [FR-30, FR-32] |
| AC-29 | The browser being offline, or the response being an HTML 500 page, results in the FR-40 failure message and never in success. [FR-40] |

**Accessibility, performance, SEO and policy**

| ID | Criterion |
|---|---|
| AC-30 | An automated axe scan of `/`, `/privacy` and `/terms` (desktop and 390px, menu open and closed, form in error state) reports 0 serious or critical violations. |
| AC-31 | Every text/background token pair used on the page meets A-04. The ratios are recorded in [specs/05-design-system.md](./05-design-system.md). |
| AC-32 | At widths 320, 390, 768, 1024 and 1440, `document.documentElement.scrollWidth` ≤ viewport width (no horizontal overflow), and no content overlaps. [A-13] |
| AC-33 | One `<h1>`. The heading outline has no skipped levels. Landmarks `header`, `main` and `footer` exist exactly once. [A-01, A-02] |
| AC-34 | A keyboard-only walkthrough reaches every interactive element, with a visible focus indicator on light and dark bands. [A-05, A-07] |
| AC-35 | Lighthouse mobile on a production build of `/`: LCP < 2.5 s, CLS < 0.1, TBT < 200 ms, and the P-04 scores met. [P-01–P-04] |
| AC-36 | The `next build` output shows `/` as static (prerendered). The network panel shows no request to a third-party origin, including fonts. [P-06, P-08, P-09] |
| AC-37 | `<head>` on `/` contains the S-01 title, the S-02 description and the S-03 OG/Twitter tags, and contains **no** `<link rel="canonical">`. [S-01–S-04] |
| AC-38 | With `NEXT_PUBLIC_SITE_URL` unset, the HTML contains no absolute URL to an invented domain. [S-04] |
| AC-39 | `/privacy` and `/terms` return 200, use the shared header and footer, and contain no invented contact details or legal terms. [FR-63, FR-64] |
| AC-40 | A content review against §10.2 finds no forbidden claim in page copy, preview data, metadata or OG image. No Clarion copy, assets or brand colours are used verbatim. |

## 14. Open questions

Status 2026-10-29: OQ-1, 2, 3, 4, 5, 6, 7, 10 and 14 are answered or narrowed by §0 (D-1 to D-8). The table is kept for history; §0 wins.

Items 1–8 come from the decisions brief and block launch to varying degrees. Items 9 onwards are specific to this document.

| # | Question | Blocks | Default until answered |
|---|---|---|---|
| OQ-1 | Lead destination (webhook → Google Sheet/CRM/automation tool, or email) and the fallback contact email/phone. The destination must reply JSON `{ok:true}` only after storing the lead (specs/03 §9.2); plain Zapier Catch Hooks cannot, Make/n8n need an explicit webhook-response step | **Live** lead capture (not the build) | Form returns honest 503 (FR-37) |
| OQ-2 | The real early-access onboarding process: who makes contact, and how setup happens | Getting-started copy, FAQ 8, success message; **public launch of the step-2/3 wording** | Build with the draft copy in §7 and §9, flagged. If still unanswered at launch, use non-committal steps: 1 Request early access → 2 We review requests as early access opens → 3 Selected operators are invited to try it and share feedback → 4 Help shape what we build; and the FAQ 8 fallback sentence |
| OQ-3 | Imagery and logo. None exist. A photo-led, Clarion-exact hero needs licensed photography of an Indian hostel/PG context | Visual fidelity of the hero and final CTA | UI-led hero, text wordmark |
| OQ-4 | Approval of brand colours (provisional deep indigo + warm creams) and the final brand name | Final visuals, metadata | Provisional tokens, "Meraki" via config |
| OQ-5 | Privacy notice and terms text, grievance contact, data retention: owner/legal review (DPDP Act 2023) | Launch with live lead capture | `/privacy` draft marked pending review |
| OQ-6 | Product scope: maintenance/complaints, multi-property, roles (staff/manager). All currently Unknown | Attention list label, Features rows, FAQ 5 | Treated as Unknown, not featured |
| OQ-7 | Initialise git before Phase B? Hosting choice (Vercel or Netlify, server-capable) | Phase B start / deploy | — |
| OQ-8 | Is Hindi or regional-language support needed? (affects font subsets and copy) | Fonts, locale | English, Latin subset only |
| OQ-9 | Analytics: is any wanted, and which privacy-friendly tool? It must be disclosed in `/privacy`. Without it, the secondary goal and the conversion rate cannot be measured | Measuring §6 secondary goal | None installed. Primary goal measured at the destination |
| OQ-10 | Terms of service: publish a placeholder (FR-64) or real terms before launch? | Footer legal completeness | Honest placeholder |
| OQ-11 | Should preview and pre-launch deployments be `noindex` until the domain is final? | SEO at launch | Indexable. Revisit with OQ-7 |
| OQ-12 | Nav "Contact" points to the early-access form, the same destination as the CTA, because no contact details exist. Should it change to "About", or to real contact details, once OQ-1 is answered? | Nav clarity | Contact → `#early-access` (per decisions brief) |
| OQ-13 | Bed-range options and whether "Number of properties" should be required for lead qualification | Form schema | Ranges in §8.5 (**Provisional**). Properties optional |
| OQ-14 | Unconfigured-destination UX: honest error on submit, or a pre-emptive notice banner (FR-37 option b)? Also: is the contact-email gate (FR-37) acceptable? | Form UX | Option (b), disabled form + notice (specs/03 §9.4, **Provisional**); contact gate on |
