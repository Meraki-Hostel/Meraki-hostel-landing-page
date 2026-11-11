# 02 — UI/UX reference analysis

## 0. Addendum (2026-11-11)

**This document's reference is no longer Clarion Health alone.** §§1–21 below remain a valid competitive/structural capture of that one third-party site, kept for its still-useful observations (good and bad) about Clarion's own markup and CSS — but Clarion was never an audit of *this* site, and treating it as the only design reference let real problems in StayPookie's own shipped homepage go unrecorded. **§22 adds a second, independent reference: a first-party design audit of StayPookie's actual shipped homepage**, done by reading its real components and content (not Clarion's), covering things Clarion-comparison was never going to surface — section-template monotony, unused product photography, decorative status-tag overuse, CTA redundancy, and more. Read §22 as equally authoritative to §§1–21, not as a lesser addendum.

This document is also still a competitive/structural analysis of a **third-party** reference site (Clarion Health) and is mostly still accurate on its own terms — it describes Clarion's markup and CSS, not StayPookie's product. What needed correction was everywhere this file proposed a "Meraki" design/CTA system of its own, under the same wrong premise as the rest of the original spec set: that nothing existed yet, pricing was forbidden, and every CTA had to point at one disabled early-access form. Specifically:

- **Brand is "StayPookie," final**, not "Meraki."
- **The shipped visual system is not the provisional Clarion-indigo scheme this file originally proposed.** It's the real product's own ivory/sand/cream + clay-accent palette, Fraunces + Figtree type, and **soft rounded cards with layered shadows** — the opposite of the "flat, square, no-shadow" rule this file inherited from Clarion. See `specs/05` for the full, recomputed token set.
- **Pricing and payment are real and live**, so §18's list of "superseded" Clarion ideas (a Pricing link, "Paid via UPI" chips, Razorpay/UPI rows) needs its own correction — see the note inside §18 below, which quotes the original rejection and explains why it no longer holds.
- **CTAs no longer point at one destination.** The original "everything → `#early-access`" rule (§11, §19 #14) is replaced by a real funnel: "See Plans" → `/pricing`, a plan's "Choose [Plan]" → `/checkout`, and "Talk to us" → `/contact` for anything that doesn't fit a listed tier.

Everything else below — the Clarion capture itself (§§1–4, 7–10.2, 11's Clarion-observed half, 12's Clarion-observed half, 13–16, 20) — is an analysis of Clarion's own site and is unchanged and still accurate. Only the "how Meraki/StayPookie adapts this" asides needed fixing, and they're fixed in place below rather than collected in one patch note, so the correction sits next to what it corrects.

---

| | |
|---|---|
| Document | `specs/02-ui-ux-reference.md` |
| Product | **StayPookie** (final brand name): hostel & PG management SaaS for owners/operators in India |
| Reference | Two references, not one: (1) Clarion Health homepage, https://www.clarionhealth.com/ (third-party structural comparison, §§1–21); (2) **StayPookie's own shipped homepage** (first-party independent audit, §22) — the real `src/components/sections/*.tsx` and `src/app/page.tsx` as they exist today, judged on their own design merits, not against Clarion. |
| Captured | 2026-10-29 (Clarion capture, §§1–21; unchanged — not re-run). 2026-11-11 (first-party homepage audit, §22). |
| Status | Both references are final. StayPookie's own design decisions are **implemented**, not provisional — see `specs/05` for the real, shipped tokens. §22's findings are open design-improvement candidates, not yet actioned — see `specs/04` for tracking. |
| Source of truth | [specs/01](01-product-requirements.md) (scope, route map), [specs/05](05-design-system.md) (tokens — now the real shipped ones) and [specs/06](06-feature-status.md) (feature status). |

**Purpose.** This is a curated, evidence-based synthesis of the Clarion homepage, used as the *visual and structural* reference for this site. It records what the reference does, with exact values, and what StayPookie adapted, changed, or must never copy. The provisional-vs-shipped token values live in `specs/05`; feature claims are governed by `specs/06`.

**Labels used**
- **Observed**: read directly from the Clarion capture (computed styles, stylesheet, markup or screenshot).
- **Inferred**: an interpretation of the evidence not confirmed in a live browser.
- A "Meraki (Provisional…)" aside in the original document meant a proposed decision awaiting approval. Those have been updated in place below to describe what's **actually shipped**, and no longer say "Provisional" where the decision is final.

---

## Contents
1. [Reference and capture method](#1-reference-and-capture-method)
2. [Page structure](#2-page-structure)
3. [Hero composition](#3-hero-composition)
4. [Navigation](#4-navigation)
5. [Typography](#5-typography)
6. [Colour and background treatments](#6-colour-and-background-treatments)
7. [Spacing and layout](#7-spacing-and-layout)
8. [Component styles](#8-component-styles)
9. [Product showcase patterns](#9-product-showcase-patterns)
10. [Feature storytelling and narrative arc](#10-feature-storytelling-and-narrative-arc)
11. [CTA placement](#11-cta-placement)
12. [Footer](#12-footer)
13. [Responsive observations](#13-responsive-observations)
14. [Animations and interactions](#14-animations-and-interactions)
15. [Accessibility observations of the reference](#15-accessibility-observations-of-the-reference)
16. [Reference defects not to replicate](#16-reference-defects-not-to-replicate)
17. [Elements adapted for StayPookie](#17-elements-adapted-for-staypookie)
18. [Elements not to copy](#18-elements-not-to-copy)
19. [Deliberate deviations](#19-deliberate-deviations)
20. [Inspection limitations and unresolved observations](#20-inspection-limitations-and-unresolved-observations)
21. [Open questions raised by this analysis](#21-open-questions-raised-by-this-analysis)
22. [Independent design audit of the shipped homepage (2026-11-11)](#22-independent-design-audit-of-the-shipped-homepage-2026-11-11)

---

## 1. Reference and capture method

| Item | Detail |
|---|---|
| URL | https://www.clarionhealth.com/ (homepage only). `<title>` "Clarion is the AI front office for healthcare". Built on Webflow. |
| Browser | Playwright, headless Chromium |
| Viewports (w×h, DPR 1) | **1440×900** (desktop), **1024×768** (laptop), **768×1024** (tablet, portrait), **390×844** (mobile). |
| Screenshots | Viewport-height slices down the full page at each width. |
| Computed-style dumps | One `dump.json` per width: `docHeight`, `viewport`, `body`, `sections`, `headings`, `paragraphs`, `links`, `buttons`, `containers`, `images` and `fontsLoaded`. |
| Stylesheet and markup | The full `clarion.css` and `index.html` (including inline `<style>`/`<script>` embeds). |
| Interaction probes | Nav hover, dropdown open, dark-button hover, mobile menu open, header after scrolling 1200px, top-of-page state, `prefers-reduced-motion` rule check. |
| Analysis | Four analyses (structure, tokens, components, responsive), each re-verified against the raw evidence. |
| Evidence location | Phase A capture (2026-10-29). Not committed to this repo. |

**What the capture cannot show:** motion over time, tab clicks, and the 480–767, 1025–1279 and ≥1920px ranges.

---

## 2. Page structure

Document height (Observed): 8,239px at 1440, 8,516 at 1024, 7,912 at 768 and 10,035 at 390.

### 2.1 Global chrome
A fixed white pill nav floats over every section at `top: 8px` and never changes on scroll. Every section boundary is a hard horizontal colour cut.

### 2.2 Nine-block inventory (Observed, 1440)

| # | Block (Webflow class) | Doc y-range | Height | Background | Width type | Header alignment | CTA |
|---|---|---|---|---|---|---|---|
| 1 | Hero `section-hero` | 0–855 | 855 | Full-bleed photo + vertical teal gradient | Full-bleed | Centred, bottom-anchored | 2 pills |
| 2 | Outcomes "Scale your practice" `cc-practice` | 855–1601 | 746 | Page `#fbfaf8` | Inset (1382px) | Centred | — |
| 3 | Platform tabs `cc-features` | 1601–2455 | 854 | Inset `#3c210c`/`#361700` split | Inset 1382px (754px tall) | Left, inside panel | 1 per tab pane |
| 4 | Revenue: stats + 2×2 `cc-revenue` | 2455–3264 | 809 | `#f6f5ec` | Full-bleed band | Left (4/7 split) | — |
| 5 | Integrations + compliance `cc-integrations` | 3263–4355 | 1092 | `#fbfaf8` + raster wash | Full-bleed section | Centred | — |
| 6 | Implementation rail `cc-implementation cc-scroll` | 4355–6104 | 1749 (pinned) | `#361700` | Full-bleed | Centred | — |
| 7 | Why choose `cc-choose` | 6104–7066 | 962 | `#f6f5ec` | Full-bleed band | Centred | 1 dark pill |
| 8 | Final CTA `section-cta` | 7067–7787 | 720 | Full-bleed photo + diagonal gradient | Full-bleed | Left | 1 white pill |
| 9 | Footer `section-footer-main` | 7787–8240 | 453 | `#fbfaf8` | Inset | Left/right split | Contact link (modal) |

### 2.3 Rhythm (Observed)
Teal photo → cream ×2 → tint → cream+teal band → dark brown → tint → teal photo → cream. Full-bleed and inset widths alternate as a deliberate visual beat. Three dark moments plus two teal photo bookends.

---

## 3. Hero composition

All values Observed.

| Aspect | Value |
|---|---|
| Box | `min-height: 95vh`; padding `8rem 0 7rem`. Flex column, bottom-anchored, centred. |
| Content anchor | Bottom-anchored. H1 at about 52% down the hero. |
| H1 | "The front office / that runs itself." `clamp(2.5rem, 1.75rem + 2.34vw, 4rem)`, line-height 1.1, −0.03em, white. |
| Subhead | One sentence, 16/24px white, max 591px. |
| CTAs | White filled pill "Schedule a demo" → Calendly; ghost pill "Try it out" → modal. Stack full width ≤479. |
| Background | Photo + `linear-gradient(#072d3500 18%, #072d35 92%)` overlay. |
| Social proof | A logo marquee, 19 logos, opacity .6, `100s linear infinite`. |
| Measured contrast | White subhead over photo: 7.61:1. |

**Defect (Observed):** the hero `<img>` (the LCP element) carries `loading="lazy"` with a 500w smallest srcset candidate.

---

## 4. Navigation

### 4.1 Desktop (≥992)
Fixed `top: .5rem` transparent wrapper; white pill max 872px wide, 56px tall, 136px radius; logo left; links absolutely centred (Home · Company · "By specialty ▾"); dark CTA pill "Try it out" right. No shadow, no border, no change on scroll.

### 4.2 Dropdown
Opens on hover with 0 delay; a `div`, not a `<button>`; open panel `#e7e4da`, 8px radius, no border.

### 4.3 Mobile (≤991)
Hamburger is a `div`, 40×43 (below 44px target); 3 bars morph to an X; CTA stays visible beside it. Sheet 90vw, 16px radius, appears instantly (no transition).

---

## 5. Typography

### 5.1 Families and licences (Observed)
| Family | Role on page | Licence | StayPookie use |
|---|---|---|---|
| **Moderat Serif Trial** Light 300 | Section H2s, modal H3 | Trial licence | **Never used** — not licensed for production. |
| **Bpmf Zihi Kai Std** | Hero H1, card H3s, tab labels, stat values | CJK/Bopomofo family | Not used — not a Latin display face. |
| **Geist** | Body, buttons, nav, footer | OFL | Considered during planning; **not what shipped** — see below. |

**What actually shipped:** **Fraunces** (display/heading) and **Figtree** (body/sans), loaded via `next/font` and mapped to `--font-display`/`--font-heading` and `--font-sans`/`--font-body` in `src/app/globals.css`. This replaces the original plan's "Newsreader + Geist" pairing — neither of those ended up in the real tokens. Collapsing Clarion's two near-identical serifs into one display family is still the right instinct; StayPookie just landed on a different one than originally proposed.

### 5.2 Sizes per width (Observed, Clarion)
| Role | 1440 | 1024 | 768 | 390 | Notes |
|---|---|---|---|---|---|
| Hero H1 | 61.7 | 52.0 | 46.0 | 40 | Only the hero H1 is fluid at every width |
| Section H2 | 48 | 48 | 44 | 36 | Steps at 991/767 |
| Body / lead | 16 | 16 | 16 | 16 | Never changes |
| Card body | 14 | 14 | 14 | 14 | **Opacity .6** — fails AA, see §15 |

StayPookie's real fluid scale (shipped, see `specs/05` §4) uses the same "fit a clamp to observed step points" method this section originally proposed, just against Fraunces/Figtree metrics rather than Newsreader/Geist.

### 5.3 Line lengths (Observed, Clarion)
Hero H1 2 lines/~17 chars; section H2 1–2 lines/16–19 chars; final CTA H2 3 lines/~19 chars; body leads 55–70 chars. StayPookie sizes heading measure in `em` of the heading font rather than `ch` of the body font, avoiding Clarion's cross-width line-break instability — this reasoning is unchanged and still applies with Fraunces in place of the originally planned Newsreader.

---

## 6. Colour and background treatments

### 6.1 Palette (Observed Clarion values, with StayPookie's real shipped counterpart)

| Reference hex | Role on page | StayPookie's real shipped token |
|---|---|---|
| `#fbfaf8` | Page background, footer | `--color-ivory` / `--color-canvas` `#f6efe4` |
| `#f6f5ec` | Alternate bands, outcome-card fill | `--color-sand` / `--color-canvas-tint` `#efe4d4` |
| `#fdfcfb` / `#ffffff` | Text on dark; modal/nav pill | `--color-cream` / `--color-surface` `#fffaf2` |
| `#361700` | Body text and dark-section fill | `--color-espresso` / `--color-ink` `#3b2622` (text only — StayPookie's dark surfaces use the clay accent, not a near-black fill) |
| `#3c210c` | Dark button, section H2 colour | `--color-clay-600` / `--color-primary` `#8c5850` |
| `#684300` | Dark-button hover | `--color-primary-hover` `#7b4c44` |
| `#072d35` | Deep teal: hero, compliance band, final CTA | *(no deep-indigo/teal equivalent shipped — StayPookie has no separate "accent-900" dark brand colour; the clay accent itself (`#8c5850`) plays this role where a strong accent is needed)* |
| `#e7e4da` | Nav hover pill, logo-cell hairlines | `--color-line` `#e6d8c5` |
| `#7b7468` | Footer link hover (**4.43:1, fails AA**) | Not reused at this contrast — see `specs/05` §3.3 for StayPookie's own (also imperfect) contrast findings |
| `#36170099` / opacity .6 | Muted text (**fails AA**, §15) | `--color-dust` / `--color-ink-muted` `#7d6b63`, a **solid** colour, not an opacity — though recomputing it against the real backgrounds in `specs/05` §3.3 found it *still* fails AA on two of its three actual usage backgrounds. Using a solid colour fixed the *mechanism* of the Clarion bug but not every instance of the *result*. |
| mint tints | Icon-disc/wash gradients (raster) | CSS gradient between `--color-canvas-tint` and `--color-clay-100` (cream→tint relationship kept; exact stops differ, see `specs/05` §3) |

The "no saturated accent, one cool accent against warm cream/greige/espresso" relationship Clarion uses is the one StayPookie kept — just with clay standing in for Clarion's teal, and no separate deep-indigo "accent-900" scale ever getting built. Treat any reference elsewhere in this document (or in `specs/01`'s historical §0.1) to "deep indigo," "accent-900" or "accent-800" as describing a plan that was superseded before shipping — `specs/05` is the real token list.

### 6.2 Gradients and overlays (Observed, Clarion)
Hero overlay, final-CTA overlay, icon-disc gradients, choose-card wash, integrations wash, logo-row edge fades — all as originally captured (unchanged; these describe Clarion's CSS, not StayPookie's).

### 6.3 Alternation rhythm (Observed)
Dark-photo → cream → cream+inset-dark → tint → cream(+teal band) → dark → tint → dark-photo → cream. Unchanged observation.

---

## 7. Spacing and layout

### 7.1 Container and gutters (Observed, Clarion)
Gutters are **not monotonic** across Clarion's own breakpoints (1024 gets half the tablet gutter — a defect). StayPookie's real shipped container is `--container-site: 82rem` with a fluid `--spacing-gutter: clamp(1.25rem, 0.75rem + 2vw, 2.5rem)` (see `specs/05` §5) — close in spirit to what this section originally proposed, at a different final container width (82rem shipped vs. the 87.5rem once proposed).

### 7.2 Section padding, including the reference's bug (Observed; Clarion)
Clarion's own responsive section-padding override is scoped to `h1,h2,h3` instead of `:root`, so it never actually applies — mobile keeps the full 100px padding Clarion intended only for desktop. This is still a real Clarion defect, unchanged.

StayPookie's real shipped token is `--spacing-section: clamp(3.5rem, 2rem + 5vw, 6.5rem)` (`specs/05` §5) — applied globally, not scoped to headings, so it doesn't repeat Clarion's bug. (The exact clamp values differ from what this document originally proposed; the shipped CSS is the source of truth.)

### 7.3 Internal spacing (Observed, Clarion)
Unchanged observations: header-to-content 56px (2.5rem ≤767), card padding patterns, 4/8px spacing base.

---

## 8. Component styles

### 8.1 Buttons (Observed, Clarion)
Unchanged — Clarion's own button system, including its genuine inconsistency (a 40px-pill system plus a separate 12px-radius modal-submit button) and its missing `:focus-visible` style, both flagged as defects not to replicate (§16).

StayPookie's real shipped button system is documented in `specs/05` §7 — one radius system (`--radius-btn` 0.75rem for standard, `--radius-pill` for pill variants), soft `--shadow-sm` at rest, a visible focus ring, and (unlike Clarion) exactly one button system used everywhere, including the checkout "Pay" button and the pricing "Choose [Plan]" CTAs.

### 8.2 Cards (Observed, Clarion)
Unchanged observations (outcome cards, revenue capability blocks, why-choose cards, implementation cards — all Clarion's own square, no-shadow, no-hover treatment).

**What StayPookie actually shipped is the opposite of this pattern**: rounded cards (`--radius-card` 1.125rem) with soft layered shadows and a hover-lift shadow change (`--shadow-card` → `--shadow-card-hover`) — see `specs/05` §6, §9. Don't read this section's Clarion observations as a description of StayPookie's own cards.

### 8.3 Icon discs (Observed, Clarion)
Clarion's 120px raster gradient disc, unchanged observation. StayPookie's real shipped equivalent is a CSS gradient between `--color-canvas-tint` and `--color-clay-100` with an inline SVG icon (not the originally-proposed canvas-tint→accent-tint indigo-scheme naming, which never shipped under those exact token names — see `specs/05` §3).

### 8.4 Clipped corner badge (Observed, Clarion)
Unchanged Clarion observation (the white clipped-circle badge motif). Confirm against the real shipped "Why StayPookie" cards whether this motif was actually carried over, or whether it was dropped along with the square-card system it depended on — not verified in this pass.

### 8.5 Compliance band (Observed, Clarion)
Unchanged. StayPookie has no certification badges to show (`specs/06` §3.2 — security certifications are unconfirmed, don't claim them), so this section is correctly unused either way.

### 8.6 Logo cells (Observed, Clarion)
Unchanged Clarion observation. The "How it works" chip-flow adaptation (bordered cells without logos) is still the right idea in principle; confirm it against what `homepage §how-it-works` actually renders today.

### 8.7 Stat rail (Observed, Clarion)
Unchanged Clarion observation. The "left-rule list, labels not numbers" adaptation for the Problem section is still correct in spirit — StayPookie genuinely has no outcome statistics to show, same as before, just for a live product instead of a pre-launch one.

### 8.8 Modal form (Observed, Clarion)
Unchanged Clarion observation (the hidden duplicated modal, business-email blocklist, forced `+1`, Lottie success state — none of this is reused).

**This section's original "Meraki reuses the card styling inline in the early-access section" note describes the legacy lead-capture form, which is likely dead code today** (`specs/06` §4) — superseded by the real `/checkout` buyer-details form. If the early-access form is removed per that spec's open question, this subsection becomes purely historical.

### 8.9 Radius and shadow summary (Observed, Clarion)
Unchanged — this accurately describes Clarion's own square-everything, no-shadow system. **It does not describe StayPookie**, whose shipped system is rounded cards with soft layered shadows (`specs/05` §6). Read this subsection as "what Clarion does," not "what StayPookie does" — the earlier version of this document blurred that line by calling StayPookie's (never-shipped) plan "flat and calm" too.

---

## 9. Product showcase patterns

### 9.1 Vertical text tabs (Observed, Clarion)
Unchanged — inset 1fr/1fr split, dark panel, stacked-grid crossfade so height never jumps, single static image across all tab panes (a real Clarion limitation).

### 9.2 Illustrations (Observed, Clarion)
Unchanged Clarion observation (raster AVIF product-UI illustrations).

StayPookie's real shipped previews are HTML/SVG, built in code, each still captioned "Illustrative preview · sample data" with obviously fictional Indian names and ₹ amounts — this principle is unchanged and still correctly implemented, with one known exception: the hero currently shows the **literal visible text** "Product Screenshot Placeholder" instead of a real illustrative preview, which is a bug, not a design choice (`specs/06` §4 Q3).

### 9.3 Horizontal rail (Observed, Clarion)
Unchanged — Clarion's scroll-jacked implementation rail (sticky-pin + Swiper, no dots/arrows/counter, GSAP/ScrollTrigger loaded twice and mostly unused).

---

## 10. Feature storytelling and narrative arc

### 10.1 Arc (Clarion, Observed/Inferred)
Unchanged: promise → outcomes → mechanism → proof (ROI stats) → objections (technical, then commercial) → why us → ask.

### 10.2 Copy patterns (Observed, Clarion)
Unchanged.

### 10.3 StayPookie's adaptation (current)
StayPookie keeps the overall arc but makes the same structural swaps this document originally proposed, now for a live, purchasable product rather than a pre-launch one: "proof in numbers" is still replaced by an illustrative operational view with no fabricated stats (StayPookie genuinely has none to show); the integrations objection is replaced by the owner's monthly workflow (how-it-works); and Clarion's "commercial objection" step (Clarion's implementation rail: pricing model, setup, support) is now answered for real, by an actual **Pricing** page and **Checkout** flow — not by early-access steps, since there's no longer anything "early" about it. Problem, detailed Features and an FAQ are still additions Clarion doesn't have.

---

## 11. CTA placement

### 11.1 Observed (Clarion), unchanged
Two destinations only (Calendly, or the call-me modal), three labels, positioned at roughly 0%/8%/27%/84%/89%/97% down the page, with no in-content CTA across the 27%–84% stretch.

### 11.2 StayPookie's real CTA map (current — supersedes the original "one destination" plan)

The original version of this document specified "one destination for every CTA: `#early-access`." **That's superseded.** The real, shipped site has a proper funnel with several real destinations:

| CTA | Label | Destination |
|---|---|---|
| Nav (persistent) | "See Plans" | `/pricing` |
| Hero primary | "See Plans" | `/pricing` |
| Hero secondary | "See how it works" | `#how-it-works` (same page) |
| Pricing-teaser / pricing-page cards | "Choose Starter / Growth / Portfolio" | `/checkout?plan=…` |
| "Talk to Setup Team" / "Talk to us" | — | `#contact` or `/contact` (currently a known bug — the anchor may not resolve; see `specs/06` §4 Q7) |
| Final CTA | "See Plans" | `/pricing` |
| Footer | Legal links | `/terms`, `/privacy`, `/refund-policy` |

Platform/feature tabs, if still present on the homepage in their original per-tab form, should carry one shared CTA below the panels rather than one per pane — that specific piece of the original guidance is unchanged.

---

## 12. Footer

### 12.1 Observed (Clarion), unchanged
A `section`, not `<footer>` (no landmark); large wordmark left, one "Company" column right (About us/Careers/Contact, fails AA on hover colour), social icons with swapped `aria-label`s; bottom row with copyright and legal links.

### 12.2 StayPookie's real shipped footer (current)
A real `<footer>` landmark with the logo + text wordmark (just "StayPookie" — there is no registered private limited company to name, see CLAUDE.md "Project identity"), and legal links to `/terms`, `/privacy`, `/refund-policy` (plus FAQ). Contact shows a real email (`hello@staypookie.com`) and a phone — the phone is a **known placeholder** (`+91 98765 43210`) pending the real number (`specs/06` §4 Q5). The copyright line's former double-period typo is fixed now that it reads "© StayPookie" instead of a "Pvt. Ltd." suffix. No social icons (none exist to show, same reasoning as the original plan).

---

## 13. Responsive observations

Unchanged — this entire section (breakpoint system, per-breakpoint table, responsive lessons) describes Clarion's own site and the general lessons StayPookie's engineering already drew from it (fluid mobile-first `min-width` queries, an `xl` 1200 tier, avoiding the 992–1279 squeeze). The actual shipped breakpoint values are in `specs/05` §13 and match what this section originally proposed (`sm` 480 / `md` 768 / `lg` 992 / `xl` 1200).

---

## 14. Animations and interactions

### 14.1 Observed (Clarion), unchanged
The full motion inventory (nav hover, dropdown, hamburger morph, button hover, tab crossfade, three marquees — one with a real loop-jump bug, the pinned rail, the modal fade/slide, the Lottie success state) is unchanged; it describes Clarion's own site.

### 14.2 StayPookie's actual shipped motion (current — supersedes the original "no entrance motion, no scroll-reveal" rule)

The original version of this document said StayPookie would add *no* scroll-reveal, marquee, pin, or entrance animation beyond simple hover transitions. **That's no longer accurate.** The real shipped motion system (`specs/05` §11) includes:
- a **hero load-stagger** (5 elements fading/rising in with increasing delay on page load — a deliberate entrance animation Clarion doesn't have and the original plan explicitly ruled out);
- a **checkmark draw-in** animation on the checkout success state;
- a marquee component is still present in the codebase (pause-on-hover, reduced-motion-safe), though whether it's actually used anywhere on the live site wasn't confirmed in this pass;
- the tab-panel crossfade technique is kept, just at different durations (200ms in / 120ms out, vs. the originally planned 300/100).

`prefers-reduced-motion: reduce` is still fully respected — that principle is unchanged.

---

## 15. Accessibility observations of the reference

Unchanged — this entire section is Clarion's own accessibility audit (muted-text contrast failures, missing button focus styles, the broken skip link targeting a non-existent `<main>`, the un-ARIA'd modal, duplicate form IDs, mismatched logo alts, swapped social labels). None of it describes StayPookie.

For StayPookie's own, separately-computed contrast findings against its real shipped palette — which found its own (different) set of AA failures — see `specs/05` §3.3.

---

## 16. Reference defects not to replicate

Unchanged — this is the "do not repeat Clarion's mistakes" checklist (28 items: the section-padding bug, gutter dip, missing 992–1279 tier, marquee loop-jump, missing touch targets, broken skip link, two inconsistent button systems, opacity-based muted text, no button focus style, and more). Each "StayPookie rule" column entry is still the right engineering rule; where a specific token name in that column (e.g. `--color-ink-muted`) now points at a different real hex value than originally planned, see `specs/05` for the current value — the *rule* (solid colour, not opacity) is what this table is really recording, and it still holds.

---

## 17. Elements adapted for StayPookie

The section map below is updated for the real, shipped CTAs and brand name. Treat any remaining reference to "Meraki," "early access," or a single `#early-access` destination elsewhere in this table as superseded by §11.2 and `specs/01` §7 — the structural/visual adaptation each row describes is otherwise still accurate.

| # | Section | Clarion pattern adapted (Observed) | How StayPookie adapts it (current) |
|---|---|---|---|
| 0 | Nav | Fixed white pill, logo left, centred links, CTA right, hamburger ≤991 with the CTA kept in the pill | 6 links (Home, Pricing, How it Works, FAQ, About, Contact) — more than the original 4, because Pricing and About are now real pages. CTA "See Plans" → `/pricing`. Mobile sheet with focus trap, Esc, body scroll lock. Text wordmark reads "StayPookie." |
| 1 | Hero | Full-bleed dark band, bottom-anchored H1, white + ghost CTA pair | H1 "Run your hostel. Not your paperwork." CTAs "See Plans" (primary) and "See how it works" (ghost, same-page anchor). A product preview should rise out of the hero — currently shows a literal "Product Screenshot Placeholder" bug instead of a real illustrative preview (fix pending, `specs/06` §4). |
| 2 | Problem | Centred header + 2px left-rule list motif | Unchanged in spirit: 4 "where information lives today" pain items, no stats. |
| 3 | Outcomes/features | 3 tinted cards with distinct mini-illustrations | "Know your occupancy / Track rent with clarity / Keep operations organized" or equivalent, now describing **live** capabilities in present tense, not "being built to" phrasing (`specs/01` §10). |
| 4 | Platform tabs (if still present) | Inset split, dark panel, large serif tabs, stacked-grid crossfade | If this section exists on the current homepage, confirm its CTA is a single shared link rather than one per pane, and that tab copy describes real, live features. |
| 5 | Attention / roles | Asymmetric split, left-rule label list | "Built for every role" (Owner/Manager/Student) is the real current equivalent — confirm whether this literally replaced the old "attention" section or sits alongside it. |
| 6 | Features (detail) | Alternating rows, tinted media panel | Real feature detail rows, grouped (Billing/Operations/Communication per `specs/01` §1), present tense throughout. |
| 7 | How it works | Centred header + bordered-cell flow | The owner's real month with StayPookie: add property → invite staff/residents → billing/requests run automatically → one view across properties. |
| 8 | Getting started / after you buy | Dark band, tall cards with sentence headlines | Now describes **what happens after checkout**, not "early access" steps — i.e. the 24-hour manual account-setup promise (`specs/06` §4), consistently worded with `/checkout`, `/pricing` and `/terms`. |
| 9 | Why StayPookie | Tinted band, 4 cards, clipped badge motif | Real differentiators; CTA "See Plans" → `/pricing`. |
| 10 | Pricing | *(no Clarion equivalent — Clarion has no pricing page; this is the section the original document explicitly said StayPookie would never have, see §18)* | Full 3-tier comparison, real prices, GST disclosure, one "Choose [Plan]" CTA per tier → `/checkout?plan=…`. This is a genuinely new section with no Clarion-derived pattern to credit. |
| 11 | Checkout | *(no Clarion equivalent — reusing only the modal-form *card styling*, inline rather than as a modal)* | Plan confirm → buyer details → Razorpay → confirmation, with the 24-hour setup promise stated consistently. |
| 12 | FAQ | No Clarion equivalent; centred header style + hairline dividers | 8 questions, answers matching `specs/01` §9 (now confident/present-tense, not hedged). |
| 13 | Final CTA | Full-bleed diagonal gradient band, left-aligned H2, one pill | "See Plans" → `/pricing`. |
| 14 | Footer | Minimal wordmark + link column | Real `<footer>`, real company name, contact (placeholder phone pending replacement), legal links including `/refund-policy`. |

---

## 18. Elements not to copy

Unchanged from the original — none of this needs correction; it's a "never copy Clarion's own brand/IP" list:

| Category | Do not copy |
|---|---|
| Brand | The name "Clarion," its wordmark, favicon, and exact palette as an identity. |
| Fonts | Moderat Serif Trial (trial licence); Bpmf Zihi Kai Std (CJK family). |
| Healthcare copy | EHR/patient/referral vocabulary, every verbatim marketing line. |
| Statistics | Clarion's specific ROI numbers. StayPookie still shows no fabricated numeric outcome claims — that rule is unchanged (`specs/01` §10). |
| Logos and badges | Clarion's customer logos, integration logos, compliance badges. |
| Imagery | Clarion's photos, illustrations, raster textures. |
| Commercial claims | Clarion's own pricing model language ("pay when a call is handled"). |
| Flows | Clarion's AI call-me modal, email blocklist, `+1`-forcing, Lottie success state, Calendly destinations. |
| Engineering | Webflow markup, Swiper/GSAP/Lottie, the scroll-jack script, dead/duplicated scripts. |

### 18.1 Superseded rejection — read this before trusting the list below

The original version of this document also listed ideas the Phase A analysis floated and the (then-current, pre-launch) decisions explicitly rejected as *out of scope for Meraki*, verbatim:

> "a Pricing link, 'Pay per occupied bed', '₹0 setup fee', 'Refund policy'... 'Paid via UPI ✓' chips and UPI/Razorpay/Cashfree/Tally/WhatsApp integration rows..."

**This rejection is superseded and must not be followed today.** A pricing page, a refund policy, and "online payment via Razorpay" are now all real, live, required parts of this site (`specs/01` §7.2, `specs/06` §3.1/§4) — the rejection made sense only under the premise that no product or pricing existed yet, which was never actually true. Treat a Pricing link and Razorpay-related copy as **required**, not forbidden. The rest of that original list — a WhatsApp contact line, a "For: Boys' PG/Girls' PG" dropdown, Tally/bank integrations, a `+91`-only phone field with Gmail blocking, an IntersectionObserver entrance fade — is **still correctly rejected**, for reasons unrelated to the pricing mistake (no such integrations exist; the field-validation ideas were simply bad; and StayPookie's real shipped motion does now include an entrance effect, just not that specific Clarion-derived technique — see §14.2).

---

## 19. Deliberate deviations

| # | Deviation | Reference behaviour (Observed) | Current StayPookie reality |
|---|---|---|---|
| 1 | UI-led hero instead of a photo | Full-bleed photo hero | Still the approach taken — a product-preview visual rather than a stock photo. Currently shipped with a bug (literal "Product Screenshot Placeholder" text instead of a real preview; `specs/06` §4). |
| 2 | No logo marquee | 19 customer logos scrolling | Still correct — no real customers/logos exist to show, regardless of how real the product itself is. |
| 3 | No scroll-pinned rail | Sticky pin + JS translate | Still correct — native scroll-snap, no scroll-hijacking. |
| 4 | Per-tab media swap (if tabs are still used) | One static image for all tabs | Still the right idea if a tabbed section exists on the current homepage — confirm it's implemented that way. |
| 5 | Solid muted colour instead of opacity | Opacity .6 fails AA | Done (`--color-dust`), but recomputing it against the real palette found it *still* fails AA on two of three real backgrounds (`specs/05` §3.3) — the mechanism was fixed, the result needs another look. |
| 6 | 44px touch targets | 42px buttons, 40×43 hamburger | Still the target; not independently re-verified in this pass. |
| 7 | Visible focus | No button focus style in Clarion | Shipped: 2px outline, `--focus-ring` (clay-600 on light, cream on dark). |
| 8 | Rounded preview frames | Square raster chips in Clarion | Superseded by a bigger shift: StayPookie's whole card system is rounded with soft shadows (`specs/05` §6), not just previews. |
| 9 | Inline form, not a modal | A hidden, duplicated Clarion modal | The *principle* (inline, accessible, no modal) carried into the checkout flow; the original early-access form this specifically referred to is likely legacy/dead now (`specs/06` §4). |
| 10 | Problem, Features, FAQ added; proof-in-numbers removed | Clarion has ROI stats, no Problem/FAQ | Still correct — StayPookie shows no fabricated stats, still has Problem/Features/FAQ sections. |
| 11 | Fluid spacing scale, mobile-first tiers | Clarion's section-padding bug, gutter dip, missing 992–1279 tier | Shipped with StayPookie's own real values (`specs/05` §5, §13), not the exact clamp values originally proposed, but the same fix pattern. |
| 12 | One serif family | Clarion's two near-identical trial/CJK serifs | Shipped as **Fraunces**, not the originally-planned Newsreader (`specs/05` §4). |
| 13 | No nav dropdown | Clarion's hover-only dropdown | Still correct — StayPookie has no sub-pages needing a dropdown. |
| 14 | **Single CTA destination** | Calendly + modal, 3 labels | **Superseded.** StayPookie now has a real funnel with several destinations — Pricing, Checkout, Contact (§11.2) — not one disabled early-access form. |

---

## 20. Inspection limitations and unresolved observations

Unchanged — this entire section describes what the Clarion capture itself couldn't show (motion over time, uncaptured viewport ranges, unclicked tab panes, unconfirmed ARIA roles, unconfirmed font-weight synthesis, etc.). None of it concerns StayPookie's own product.

---

## 21. Open questions raised by this analysis

Updated: several of the original items are now resolved by real decisions; closed ones are marked so the list doesn't keep asking settled questions.

1. ~~Imagery and brand colour/name~~ — **Resolved.** Brand name is "StayPookie," final. The real shipped palette is in `specs/05`, not a provisional indigo scheme. Imagery is still mostly illustrative/placeholder-pending (the hero bug in §9.2/§19 row 1) rather than licensed photography — that part is still genuinely open.
2. ~~Onboarding reality~~ — **Resolved in principle, inconsistent in execution.** The real process is: buy on `/checkout`, get manually set up within 24 hours. The remaining open item is purely a copy-consistency bug (some pages still say "2 hours"/"day one") — tracked in `specs/06` §4 Q2, not a UX design question anymore.
3. ~~Product scope (maintenance/complaints, multi-property)~~ — **Resolved.** Both are real, live features (`specs/06` §3.1) — no longer "Unknown," and should be shown as a selling point, not hedged.
4. **Still open: Hindi/regional-language support.** Unconfirmed for both the real product and this site (`specs/06` §3.2) — this site ships English-only for now.
5. **Still open, and worth re-checking against the live site rather than assuming either way:** whether the inactive-tab-opacity concern this document originally raised (Clarion's own .4 opacity failing large-text contrast on a dark panel) was ever relevant to StayPookie's shipped tabs component, given the tab section's exact current implementation wasn't independently re-verified in this documentation pass.
6. **Still open:** whether the nav pill has a visible border on cream sections in the real shipped CSS (the original concern was that Clarion's borderless pill nearly disappears over light bands) — not independently re-verified here.
7. **Resolved by the real route map, not by a shared anchor CTA:** the original "platform-pane CTA" and "single CTA destination" concerns are superseded by §11.2's real funnel.
8. **Still open:** whether the getting-started/after-you-buy rail has a visible position cue (dots or "n / 4") at narrow widths — not independently re-verified here.

---

## 22. Independent design audit of the shipped homepage (2026-11-11)

**Method.** Unlike §§1–21, this section is not a comparison against Clarion or any third-party site. It is a direct read of StayPookie's own real homepage source — `src/app/page.tsx` and every component in `src/components/sections/` (Hero, Problem, Features, Roles, HowItWorks, PricingTeaser, Faq, FinalCta, plus the inline About section) — evaluated purely on its own visual and structural merits. `specs/05`'s token audit (§3.3 contrast findings) is a separate, already-tracked workstream; this section does not repeat it and focuses on layout, pacing, repetition and content structure instead.

### 22.1 Findings (Observed, direct from source)

| # | Finding | Evidence |
|---|---|---|
| 1 | **Every content section uses one identical template**: centred eyebrow pill → centred `h2` → centred lead paragraph → a grid of cards. Problem, Features, Roles, HowItWorks, PricingTeaser and FAQ all follow this with no layout variation — seven sections in a row read as one repeating block rather than a paced page. | `Problem.tsx`, `Features.tsx`, `Roles.tsx`, `HowItWorks.tsx`, `PricingTeaser.tsx`, `Faq.tsx` |
| 2 | **Real product photography exists and is entirely unused.** `src/assets/photos/` contains `hero-hostel-room.jpg`, `cta-phone-call.jpg`, and four `step-*.jpg` files. No component in `src/components/sections/` references any of them — the whole homepage is built from icon chips and text, with zero real imagery. | `src/assets/photos/*`, confirmed via `grep -rl "assets/photos" src` returning no matches in `sections/` |
| 3 | **Decorative "status" footer repeated across unrelated sections, carrying no real information.** Problem cards append "Resolved on day 1 with dedicated account setup"; Features cards append "Active in all paid tiers" / "Live feature"; HowItWorks cards append "Step X of 4". Four different sections each add a bottom micro-copy line whose only job is vague reassurance — repeated across roughly 15 cards it reads as filler, not signal. | `Problem.tsx` (bottom quote block), `Features.tsx` (bottom status line), `HowItWorks.tsx` (progress connector line) |
| 4 | **Status-tag colours (`tag-info`/`tag-success`/`tag-attention`/`tag-error`, i.e. slate-ink/moss/amber/brick) are applied decoratively, not just as real state**, on Problem cards, Feature cards, Role badges and HowItWorks step tags. This dilutes the one place these colours carry genuine meaning: the Paid/Due/Overdue chips in the hero's illustrative ledger preview. | `Problem.tsx` `getTagClass`, `Features.tsx` `getTagClass`, `Roles.tsx` `getRoleBadgeClass`, `HowItWorks.tsx` step `tag` |
| 5 | **No visual hierarchy between sections.** Every section header (`h2` + lead paragraph) uses the identical scale and centred treatment, so Problem (the core motivation) and Pricing (the money section) look exactly as visually "important" as FAQ — nothing signals which section the page wants the visitor to weight most. | Shared header pattern across all section components |
| 6 | **Hero product mockup is dense on first view**: a 4-tile stat bar, a 2-column bed-allocation matrix + rent ledger, and a status ribbon all appear in one scene, inside window chrome, above the fold — competing with the headline and primary CTA for attention before the visitor has read what the product does. | `Hero.tsx` lines ~88–413 |
| 7 | **Four near-identical calls to the same destination with no escalation in framing**: Hero primary "See Plans" → `/pricing`; HowItWorks closing CTA "See Plans & Pricing" → `/pricing`; PricingTeaser CTA "View full plans" → `/pricing`; FinalCta "See Plans" → `/pricing`. All four are the same destination with only cosmetic label changes — no variation in framing between an early nudge and a late, decisive close. | `Hero.tsx`, `HowItWorks.tsx`, `PricingTeaser.tsx`, `FinalCta.tsx` CTA labels/hrefs |
| 8 | **Two-thirds of the Features content is click-gated.** Billing/Operations/Communication groups are tabs; only one group's cards render at a time, so a visitor who doesn't click sees only a third of the real feature set — weak for a page whose job is to demonstrate depth. | `Features.tsx` `activeGroup` state, single `currentGroup` rendered |
| 9 | **Motion is front-loaded, then stops.** Only Hero (load-stagger) and Problem (scroll-triggered reveal via `IntersectionObserver`) have entrance animation; Features, Roles, HowItWorks, PricingTeaser and FAQ render with no reveal motion, only static hover transitions — the page feels "alive" for the first two sections and flat for the rest. | `Hero.tsx` `hero-stagger-*` classes, `Problem.tsx` `IntersectionObserver`; absence of equivalent logic in the later section components |
| 10 | **Roles section gives Owner, Manager/Warden and Student equal visual weight** (identical card size, same grid column share) despite the Owner being the actual buyer of the product and the Student being unable to purchase anything — the page's real audience isn't visually prioritised over a role that only observes. | `Roles.tsx` `roles.columns.map(...)` — one undifferentiated card markup for all three roles |

### 22.2 Suggested improvements (not yet actioned — track in `specs/04`)

| # | Addresses finding(s) | Suggestion |
|---|---|---|
| 1 | 1, 2 | Break the template in 2–3 sections — e.g. Problem or Roles as a photo-left/text-right split using the real hostel/step photos from `src/assets/photos/`, instead of another centred card grid. |
| 2 | 2 | Use at least one real photo (hero room or a step photo) somewhere on the homepage before shipping any further copy changes — it's the single cheapest fix for the page's current "icon-kit" sameness. |
| 3 | 3 | Remove the repeated decorative footer lines on Problem/Features/HowItWorks cards. Keep real status micro-copy only where it is actually status (the hero's live ledger). |
| 4 | 4 | Reserve moss/amber/slate-ink/brick tag colours for genuine state differences; give purely illustrative/decorative cards a neutral clay/sand treatment instead, so colour keeps meaning where it still appears. |
| 5 | 5 | Give Problem and Pricing visually heavier treatment (larger heading scale, or a tinted full-width band) than lighter sections like FAQ, so the page has peaks and valleys instead of uniform weight throughout. |
| 6 | 6 | Trim the hero mockup to its two strongest elements (stat bar + ledger); move the bed-allocation matrix down into the Features section as supporting proof rather than cramming everything above the fold. |
| 7 | 7 | Collapse the four `/pricing` CTAs to two with genuinely different framing — one early, exploratory nudge and one late, decisive close — and free the other two slots for a different action (e.g. "Talk to Setup Team" earlier in the page, not only at HowItWorks). |
| 8 | 8 | Default-expand the three feature groups stacked (or show one open plus a jump-to tab control) instead of hiding two-thirds of the real feature set behind a click. |
| 9 | 9 | Extend the `Problem.tsx` scroll-reveal pattern (it already exists and works) to Features, Roles, HowItWorks and PricingTeaser, so motion pacing is consistent for the whole scroll, not just the first two sections. |
| 10 | 10 | Make the Owner card the lead/larger card in the Roles grid (e.g. wider column span or elevated styling), since Owner is the real buyer persona. |
