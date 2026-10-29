# 02 — UI/UX reference analysis: Clarion Health

| | |
|---|---|
| Document | `specs/02-ui-ux-reference.md` (Phase A, documentation only) |
| Product | Meraki (temporary brand name): hostel & PG management SaaS for owners/operators in India |
| Reference | Clarion Health homepage, https://www.clarionhealth.com/ |
| Captured | 2026-10-29 |
| Status | Reference analysis is final for Phase A. Every Meraki recommendation in it is **Provisional** until the owner approves Phase B. |
| Source of truth | [specs/01](01-product-requirements.md) (scope, section map), [specs/05](05-design-system.md) (tokens) and [specs/06](06-feature-status.md) (feature status). They record the Phase A decisions brief (`DECISIONS.md`, Phase A capture (2026-10-29)), which is not kept in the repo; "DECISIONS §n" below only names where a decision came from. Concerns are listed in [§21 Open questions](#21-open-questions-raised-by-this-analysis). |

**Purpose.** This is a curated, evidence-based synthesis of the Clarion homepage, used as the *visual and structural* reference for the Meraki landing page. It records what the reference does, with exact values. It also records what Meraki adapts, what it deliberately changes, and what it must never copy. It is not a design system. The provisional Meraki tokens live in the design-system spec (`specs/05-*.md`), and feature claims are governed by the feature-status spec ([06-feature-status.md](06-feature-status.md)). The section map is also restated in [01-product-requirements.md](01-product-requirements.md).

**Labels used**
- **Observed**: read directly from the capture (computed styles, stylesheet, markup or screenshot). Cited as `ref: <analysis>.md §n`. The four analyses (`structure.md`, `tokens.md`, `components.md`, `responsive.md`) are Phase A capture (2026-10-29) working files, and each closes with an adversarial verification pass. Where an analysis marks a value "(verified-corrected)", this doc uses the corrected value.
- **Inferred**: an interpretation of the evidence that was not confirmed in a live browser.
- **Provisional**: a Meraki decision awaiting owner approval.

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
15. [Accessibility observations](#15-accessibility-observations-of-the-reference)
16. [Reference defects not to replicate](#16-reference-defects-not-to-replicate)
17. [Elements to adapt for Meraki](#17-elements-to-adapt-for-meraki)
18. [Elements not to copy](#18-elements-not-to-copy)
19. [Deliberate deviations](#19-deliberate-deviations)
20. [Inspection limitations and unresolved observations](#20-inspection-limitations-and-unresolved-observations)
21. [Open questions raised by this analysis](#21-open-questions-raised-by-this-analysis)

---

## 1. Reference and capture method

| Item | Detail |
|---|---|
| URL | https://www.clarionhealth.com/ (homepage only). `<title>` "Clarion is the AI front office for healthcare". Built on Webflow. |
| Browser | Playwright, headless Chromium |
| Viewports (w×h, DPR 1) | **1440×900** (desktop), **1024×768** (laptop), **768×1024** (tablet, portrait), **390×844** (mobile). DPR is 1 because every slice PNG matches its viewport size in pixels (ref: responsive.md §0.1). |
| Screenshots | Viewport-height slices down the full page at each width. At 1440 there are 10 slices; slice N starts at y = N×900 and the last is bottom-aligned. |
| Computed-style dumps | One `dump.json` per width: `docHeight`, `viewport`, `body`, `sections`, `headings`, `paragraphs`, `links`, `buttons`, `containers`, `images` and `fontsLoaded`, each with boxes, fonts, colours, padding, radius and shadow. |
| Stylesheet and markup | The full `clarion.css` (parsed into rules with their `@media` context and line numbers) and `index.html` (including inline `<style>`/`<script>` embeds). |
| Interaction probes | Nav hover (7 states), dropdown open, dark-button hover (before/after computed JSON), mobile menu open, header after scrolling 1200px, top-of-page state, and a check for `prefers-reduced-motion` rules (`reducedMotionRulesPresent: true`). |
| Analysis | Four analyses (structure, tokens, components, responsive) each re-verified against the raw evidence. Contrast was computed with the WCAG 2.x relative-luminance formula, with opacity text alpha-blended onto its background first. |
| Evidence location | Phase A capture (2026-10-29), stored in a temporary session directory. Do not rely on those paths persisting. |

**What the capture cannot show:** motion over time, tab clicks, and the 480–767, 1025–1279 and ≥1920px ranges. See [§20](#20-inspection-limitations-and-unresolved-observations).

---

## 2. Page structure

Document height (Observed): **8,239px** at 1440, 8,516 at 1024, 7,912 at 768 and **10,035 at 390** (ref: structure.md §8). At ≥992 this includes 849px of height added by JavaScript for the pinned rail.

### 2.1 Global chrome
A fixed white pill nav floats over every section at `top: 8px` and never changes on scroll (§4). Every boundary between sections is a hard horizontal colour cut, with no overlaps, curves, waves or negative-margin cards (ref: structure.md §1, §2).

### 2.2 Nine-block inventory (Observed, 1440)

| # | Block (Webflow class) | Doc y-range | Height | Background | Width type | Header alignment | CTA |
|---|---|---|---|---|---|---|---|
| 1 | Hero `section-hero` | 0–855 | 855 | Full-bleed photo + vertical teal gradient (`#072d35`) | Full-bleed | Centred, bottom-anchored | 2 pills |
| 2 | Outcomes "Scale your practice" `cc-practice` | 855–1601 | 746 | Page `#fbfaf8` | Inset (container 1382px) | Centred | — |
| 3 | Platform tabs `cc-features` | 1601–2455 | 854 | Page bg around an inset `#3c210c` / `#361700` split block | Inset 1382px (block 754px tall) | Left, inside dark panel | 1 per tab pane |
| 4 | Revenue: stats + 2×2 `cc-revenue` | 2455–3264 | 809 | `#f6f5ec` | Full-bleed band | Left (4/7 split) | — |
| 5 | Integrations + compliance `cc-integrations` | 3263–4355 | 1092 | `#fbfaf8` + raster mint wash; inner teal compliance band | Full-bleed section; band inset at about 1146px | Centred | — |
| 6 | Implementation rail `cc-implementation cc-scroll` | 4355–6104 | 1749 (pinned) | `#361700` | Full-bleed | Centred | — |
| 7 | Why choose `cc-choose` | 6104–7066 | 962 | `#f6f5ec` | Full-bleed band | Centred | 1 dark pill |
| 8 | Final CTA `section-cta` | 7067–7787 | 720 | Full-bleed photo + diagonal 139° teal gradient | Full-bleed | **Left** | 1 white pill |
| 9 | Footer `section-footer-main` | 7787–8240 | 453 | `#fbfaf8` | Inset | Left/right split | Contact link (modal) |

Source: ref: structure.md §1; components.md §15.0. The "Try it out" modal is a hidden extra layer, and its markup appears twice in the DOM (ref: structure.md §0).

### 2.3 Rhythm (Observed)
- **Background sequence:** teal photo, then cream ×2, then tint, then cream with a teal inner band, then dark brown, then tint, then teal photo, then cream (ref: structure.md §2).
- **Width beats:** full-bleed bands alternate with inset blocks. The platform split and the compliance band are deliberately narrower than the bands around them, and the change in width is itself a visual beat.
- **Dark punctuation:** three dark moments mid-page (platform panel, compliance band, implementation rail) plus two teal photo bookends (hero and final CTA).

---

## 3. Hero composition

All values Observed (ref: structure.md §1; components.md §15.1; responsive.md §1.2).

| Aspect | Value |
|---|---|
| Box | `min-height: 95vh`; padding `8rem 0 7rem` (128/112). Flex column, `justify-content: flex-end`, centred. Rendered 855 / 730 / 680 / 720px at 1440 / 1024 / 768 / 390. |
| Content anchor | **Bottom-anchored and centred.** At 1440 the H1 box sits at y 445 (about 52% down the hero), the subhead at y 605–653 and the buttons at y 685–727. |
| H1 | "The front office / that runs itself." 6 words over 2 lines, ending with a full stop. `clamp(2.5rem, 1.75rem + 2.34vw, 4rem)`: 61.7 / 52 / 46 / 40px, line-height 1.1, `-0.03em`, white. Box width 509px (`.hero_copy-wrap { max-width: 48ch }`, where `ch` is measured in 16px Geist, so the width stays fixed while the H1 scales). |
| Subhead | One sentence, 16/24px, white, `max-width: 36.9375rem` (591px). 2 lines on desktop, 4 at 390. |
| Vertical rhythm | `.hero_content` gap 2rem (32px); `.hero_copy` gap 1.5rem (24px). |
| CTAs | `.hero_btn-group` gap `.75rem 1rem`. (1) White filled pill "Schedule a demo" (158×42) linking to Calendly. (2) Ghost pill "Try it out" (118×42): 1px white border and a 16px mic icon, opening the modal. At ≤479 both stack full width (343×42). |
| Background | `img.hero_bg` cover (a receptionist on the phone, right of centre) on a `#072d35` base. The overlay is `linear-gradient(#072d3500 18%, #072d35 92%)`, and its start stop moves to 50% at ≤767 and 45% at ≤479. `object-position: 63% 50%` at ≤479. |
| Social proof | A white monochrome customer-logo marquee absolutely positioned over the bottom ~110px at `opacity: .6`. 19 logos × 2 groups, `100s linear infinite`. (verified-corrected) No edge fade renders, because the mask rule targets a class absent from the markup (ref: tokens.md §2.2). |
| Exit | A hard cut to `#fbfaf8` at y 855. |
| Measured contrast | White subhead over the overlaid photo (sampled `#3d585f`): 7.61:1 (ref: tokens.md §7). |

**Defect (Observed):** the hero `<img>`, which is the LCP element, carries `loading="lazy"`, and the smallest srcset candidate is 500w. The mobile hero renders soft (ref: responsive.md §1.2, §3 #7).

---

## 4. Navigation

### 4.1 Desktop (≥992). Observed (ref: components.md §1.1–1.2; structure.md §0)
| Part | Value |
|---|---|
| Wrapper | `position: fixed; top: .5rem; padding: 0 1.5rem` (1rem at ≤767); `z-index: 999`; transparent. |
| Pill | White, `max-width: 54.5rem` (872px), `min-height: 3.5rem` (56px), `border-radius: 8.5rem` (136px), padding `0 .625rem 0 1.5rem`. Box `284,8 872×56`. **No shadow, no border, no change on scroll.** |
| Logo | Inline SVG wordmark, 101×27, left. |
| Links | Home · Company · "By specialty ▾". The menu is centred absolutely (`left: 50%; translateX(-50%)`, `column-gap: .9375rem`), so it sits in the true centre whatever the logo and CTA widths. Geist **500** 16px, padding `.7em 1em`, radius 50px. |
| Link hover | Beige pill `#e7e4da` with text `#71604e` (4.74:1). Only `color` transitions (.3s easeOutQuart), so the background snaps on (Inferred). |
| Current page | `.w--current` gets no visible indicator. |
| CTA | "Try it out": dark pill `#3c210c` with white text, 96×42, `9px 16px`. Hover `#684300`. Opens the modal. |
| Separation | Over the cream sections the white pill has almost no edge (Inferred: weak separation). |

### 4.2 Dropdown. Observed (ref: components.md §1.3; structure.md §0, verified-corrected)
- Opens on **hover with 0 delay** (`data-hover=true data-delay=0`). The toggle is a `div`, not a `<button>`.
- Open panel: `#e7e4da`, radius 8px, **no border**, padding `1rem 0`, gap 16px, 2 columns × 4 links (`.75rem 1em` padding each). The 4px radius and `1px #888680` border exist only on the closed 0×0 shell.
- The chevron rotates 180° with no transition.
- A "dim page on open" overlay rule is swallowed by an unterminated CSS comment, so the overlay never shows.

### 4.3 Mobile (≤991, `data-collapse="medium"`). Observed (ref: components.md §1.4; responsive.md §1.1)
| Part | Value |
|---|---|
| Pill | `max-width: none`; padding `0 .5rem 0 1rem`. Box x24/w720 at 768 and x16/w358 at 390. Logo shrinks to 80×22 at ≤479. |
| Hamburger | A `div`, 40×43 (**below 44px**). 3 bars of 24×1px `#361700` 8px apart. Radius 5rem. Morphs to an X via `translateY(±9px) rotate(±45deg)` (.3s easeOutQuart), and gets a `#fbfaf8` fill when open. Focus ring `2px solid #71604e`. |
| CTA | "Try it out" **stays visible** in the pill beside the hamburger (96×42). |
| Sheet | `#fbfaf8`, radius 1rem (16px), `width: 90vw`, 5px below the pill, `height: calc(100svh - 4rem)`, `overflow-y: auto`. Links stack left-aligned and the dropdown expands inline. Appears **instantly** (`data-duration="0"`). Its bottom edge is invisible against the page background. |
| Scroll lock | `body:has(.w-nav-button.w--open) { overflow: hidden }`. |

---

## 5. Typography

### 5.1 Families and licences (Observed; ref: tokens.md §1.1)
| Family | Role on page | Loading | Licence | Meraki use |
|---|---|---|---|---|
| **Moderat Serif Trial** Light 300 | Section H2s (`.heading-3xl`), modal H3 | Self-hosted OTF named `…Moderat-Serif-Trial-Light.otf`, weight 300 only | Commercial (Tighttype); **trial build** | **Never.** Not licensed for production. |
| **Bpmf Zihi Kai Std** | Hero H1, CTA H2, all card H3s, tab labels, stat values, compliance title | Google Fonts via WebFont loader, **400 only** | Free on Google Fonts (OFL inferred, not checked) | Not used. It is a CJK/Bopomofo family, and Meraki needs a Latin display serif. |
| **Geist** | Body, buttons, nav, footer | Google Fonts, 100–900 | OFL | **Adopt** (DECISIONS §7) via `next/font`. |
| Geistvf (self-hosted), Phosphor icon font | Declared, never used | — | OFL / MIT | Not used. |

Observed quirks:
- Every Bpmf rule requests **500**, but only 400 is loaded. The headings therefore render a regular-weight face; whether 500 is synthesised could not be confirmed.
- The two serifs are nearly indistinguishable at display size.
- `body` line-height computes to **16px** (a token bug, `line-height: var(--paragraph-body)` = 1rem). Every `p` overrides it to 1.5.

**Meraki (Provisional, DECISIONS §7):** one display serif, **Newsreader** (OFL, variable `opsz`), at 300 for H2s and 400 for H1/H3/tabs, plus **Geist** for body. Collapsing the reference's two serifs into one family removes a font download.

### 5.2 Sizes per width (computed, Observed; ref: responsive.md §2; tokens.md §1.4)
| Role | 1440 | 1024 | 768 | 390 | Line-height | Tracking | Weight / colour |
|---|---|---|---|---|---|---|---|
| Hero H1 | **61.7** | 52.0 | 46.0 | **40** | 1.1 | −0.03em | 500 requested; white |
| Section H2 | **48** | 48 | 44 | **36** | 1.1 | −0.02em | 300; `#3c210c`, or `#fdfcfb` on dark |
| Final CTA H2 | 48 | 48 | 44 | 40 | 1.1 (1.2 at ≤991) | −0.03em | 500; `#fbfaf8` |
| Platform tab labels | 32 | 32 | 26 | 24 | 1.1 | −0.03em | 500; inactive at opacity .4 |
| Compliance title / stat value | 32 | 32 | 32 | 32 | 1.1 | −0.03em | 500 |
| Card H3 | 24 | 24 | 24 | 24 | 1.1 | −0.03em | 500; `#361700` |
| Modal H3 | 28 | 28 | **36** | 32 | 1.2 | normal | 300 (**grows on tablet**: a defect) |
| Body / lead | 16 | 16 | 16 | 16 | 1.5 (24px) | −0.01em | 400 Geist |
| Card body / small | 14 | 14 | 14 | 14 | 1.5 (21px) | −0.01em | 400; **opacity .6** |
| Buttons | 16 | 16 | 16 | 16 | 1.4 (22.4px) | −0.01em | 400 Geist |
| Nav links | 16 | 16 | 16 (sheet) | 16 | 1 | — | **500** Geist |
| Eyebrow `.eyebrow-2` | defined: 12.8px, .1em, uppercase, 500 | — | — | — | 1.2 | .1em | **Not used on the homepage** |

- Only the hero H1 is fluid at every width (it hits the 40px floor at ≤513px and the 64px ceiling at ≥1538px). Every other heading steps at 991 and 767, and body copy never changes size.
- **Fitted fluid scale** (Inferred from the steps; adopted in DECISIONS §7, Provisional): H2 `clamp(2.25rem, 1.79rem + 1.89vw, 3rem)`; CTA H2 `clamp(2.5rem, 2.19rem + 1.26vw, 3rem)`; tab labels `clamp(1.5rem, 1.19rem + 1.26vw, 2rem)`.

### 5.3 Line lengths (Observed; ref: tokens.md §1.5)
| Text | Desktop | Mobile |
|---|---|---|
| Hero H1 | 2 lines, about 17 chars / 3 words per line (509px box) | 2 lines, about 17 chars |
| Section H2 | 1–2 lines, about **16–19 chars / 2–4 words per line**. Breaks come from narrow columns (col-lg-5/7/8 or a 434px column), never from `<br>` | 2 lines of 12–19 chars |
| Final CTA H2 (56 chars) | 3 lines, about 19 chars per line (`max-width: 50ch`) | 4 lines, about 14 chars |
| Card H3 | 1 line, 7–36 chars | Long titles wrap to 2 |
| Body leads | 55–70 chars per line (hero subhead about 70) | 34–40 chars per line |

Line breaks in the hero shift between widths ("The front office / that runs itself." at 1440, "…office that / runs itself." at 1024 and 768) because the box is sized in body `ch`, not in the heading's own font (ref: responsive.md §1.2). **Meraki (Provisional):** size the H1 measure in `em` of the heading font: `max-width: 12em; text-wrap: balance` (specs/05 §4.3).

---

## 6. Colour and background treatments

### 6.1 Palette (Observed; ref: tokens.md §2.1)
| Reference hex | Role on page | Meraki counterpart (**Provisional**, DECISIONS §7) |
|---|---|---|
| `#fbfaf8` | Page background, footer | `--color-canvas` `#FAF9F6` |
| `#f6f5ec` | Alternate bands (revenue, choose), outcome-card fill | `--color-canvas-tint` `#F3F1EA` |
| `#fdfcfb` / `#ffffff` | Text on dark; modal card / nav pill, white button, badge circle | `--color-on-dark` `#FAF9F6`; white for the nav pill |
| `#361700` | Body text **and** dark-section fill (implementation, platform panel) | `--color-ink` `#1F1B16` (text only) |
| `#3c210c` | Dark button, section H2 colour, platform block | `--color-primary` `#1F1B16` (dark pill) |
| `#684300` | Dark-button hover | `--color-primary` hover `#3A332A` |
| `#072d35` | Deep teal: hero, compliance band, final CTA | `--color-accent-900` `#172A46` (deep indigo) |
| (`#361700` platform panel role) | Dark panel variant | `--color-accent-800` `#1F375C` |
| `#e7e4da` | Nav hover pill, logo-cell hairlines | `--color-line` `#E4E0D5` |
| `#eeece3` / `#cbc6bc` | Ghost-on-dark hover / white-button hover | Derive in 05 |
| `#71604e` | Nav hover text, skip-link and hamburger focus outline | — (Meraki uses its own focus ring) |
| `#7b7468` | Footer link hover (**4.43:1, fails AA**) | Do not reuse the role at this contrast |
| `#36170099` / `opacity: .6` | Muted text (**fails AA**, §15) | `--color-ink-muted` `#5E574D`, a solid colour (quick check: 6.77:1 on `#FAF9F6` and 6.31:1 on `#F3F1EA`; to be formally recorded in 05) |
| `#3617001a` | 2px stat left rule | Line colour at about 10% ink |
| `#ffffff1a` | 1px divider in the dark tab panel | Same relationship on the accent panel |
| mint tints `#d0eaea` / `#c9edde` | Icon-disc and wash gradients (raster) | CSS gradient `linear-gradient(180deg, canvas-tint #F3F1EA → accent-tint #DCE6F2)` (cream top, tint bottom; specs/05 §3.4) |

The reference has **no saturated accent**: about 85% of the surface is warm cream, greige or espresso, against one cool deep teal (Inferred; ref: tokens.md §2.2). Meraki keeps this relationship. A sparing saffron `--color-highlight` and the status colours for preview chips are Meraki additions (DECISIONS §7).

### 6.2 Gradients and overlays (Observed; ref: tokens.md §2.2, verified-corrected)
| Element | Value |
|---|---|
| Hero overlay | `linear-gradient(#072d3500 18%, #072d35 92%)`; 50% start at ≤767 and 45% at ≤479 |
| Final CTA overlay | `linear-gradient(139deg, #072d35 12%, #072d3500 55%)` at the base (1024). ≥1280: 19%/55%. ≥1920: 16%/60%. ≤991: 4%/70%. ≤767: `160deg, #072d35, #072d3566 60%`. ≤670 (inline) / ≤479: `190deg, #072d35 22%, …` with the photo moved to `top: 41%; height: 70%` and masked in from the top. Also a `.cc-shade` black 91° layer at opacity .2. |
| Icon discs | Raster `gradient.avif`, not CSS. Sampled `#faf9f7` at the top to `#d0eaea` at the bottom |
| Choose-card wash | Raster image, 160% wide at opacity .9: a very faint mint at the bottom left |
| Integrations wash | Raster image: a pale teal glow at the bottom right (`#d1e9e5`), 260% wide at ≤767 |
| Logo-row edge fades | `linear-gradient(90deg, #fbfaf8, #fbfaf800)`, 5rem |

### 6.3 Alternation rhythm (Observed)
`dark-photo → cream → cream+inset-dark → tint → cream(+teal band) → dark → tint → dark-photo → cream`. The cream/tint pair is very low contrast (`#fbfaf8` against `#f6f5ec`). The rhythm comes mostly from the **dark punctuation** and the **width changes**, not from the light alternation.

---

## 7. Spacing and layout

### 7.1 Container and gutters (Observed; ref: responsive.md §0.4; tokens.md §3)
| Width | Container rule | Content x / width | Side gutter |
|---|---|---|---|
| 1440 | `width: 96%; max-width: 87.5rem` (1400) | 29 / 1382 | 28.8px |
| 1024 | 96% | 20 / 983 | **20.5px (narrowest)** |
| 768 | `width: 88%` (≤991) | 46 / 676 | 46px |
| 390 | 88% | 23 / 343 | 23.4px |

- Gutters are **not monotonic**: the laptop width gets half the tablet gutter (defect).
- The platform block (`.container.cc-full`) goes full-bleed at ≤991.
- Grid: 12-column flex rows. `--grid-gap-main` is **40px**, `row-gap-md` **20px** (choose cards) and `row-gap-sm` **8px** (outcome cards). None of these change by breakpoint.

**Meraki (Provisional, DECISIONS §7):** `max-width: 87.5rem` with fluid inline padding `clamp(1.25rem, 0.75rem + 2.2vw, 2.5rem)` (about 20 / 29 / 35 / 40px at 390 / 768 / 1024 / 1440). Grid gaps 40 / 20 / 8px.

### 7.2 Section padding, including the reference's bug (Observed; ref: responsive.md §0.3; tokens.md §0, §3)
| Section | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|
| Outcomes, revenue, integrations, choose | **100 / 100** | 100 / 100 | **100 / 100** | **100 / 100** |
| Hero | 128 / 112 | 128 / 112 | 112 / 112 | 96 / 96 |
| Platform (`cc-features`) | 0 / 100 | 0 / 100 | 0 / 0 | 0 / 0 |
| Implementation | 96 / 96 (sides `max(2%, 50vw − 43.75rem)`) | 96 | `0 6% 2rem` | `0 6% 2rem` |
| Final CTA | 100 / 100 | 100 / 100 | 64 / 100 | 64 / 100 |
| Footer | 80 / 80 | 80 / 80 | 80 / 80 | 56 / 56 |

**The bug.** `:root` defines `--_responsive---padding--section: 6.25rem`. The responsive overrides (5rem at ≤991, 4rem at ≤767, 3rem at ≤479) are declared on `h1, h2, h3 { }` rather than on `:root`, and the sections read the variable on themselves, so the intended 100 → 80 → 64 → 48px scale **never applies**. Mobile keeps 100px on every content section. This is a major reason the 390px page is 10,035px long (1.22× desktop).

**Meraki (Provisional, DECISIONS §7):** define `--spacing-section: clamp(3rem, 1.79rem + 4.95vw, 6.25rem)` globally (named `--section-pad` in the brief; renamed in specs/05 §21 #10) (about 48 / 67 / 79 / 100px at 390 / 768 / 1024 / 1440).

### 7.3 Internal spacing (Observed; ref: tokens.md §3)
| Pattern | Value |
|---|---|
| Header to content | `margin-bottom: 3.5rem` (**56px**), 2.5rem at ≤767; the outcomes header uses 3em (48px). Header internal gap 1.5rem (2rem on the integrations header). |
| Card padding | Outcome cards 24px (32/24 at ≤991); choose cards **20px**; compliance band 40px (32 at ≤991); platform panel `60 60 0` → `40 32` → `40 24 16` |
| Card internal gap | 16–24px |
| Revenue grid | 40px column gutter; rows 88px apart (40 + 48 card margin) |
| Implementation rail | 24px between cards (12px under 768); `slidesOffsetAfter: 60` |
| Spacing base | Clusters on a 4/8px base: 4, 8, 12, 16, 20, 24, 32, 40, 56, 60, 80, 96, 100 (Inferred) |

---

## 8. Component styles

### 8.1 Buttons (Observed; ref: components.md §2; tokens.md §5)
Base `.button-primary`:
- **Shape:** `inline-flex; gap: .375rem; padding: .5625rem 1rem` (9×16), 1px transparent border, `border-radius: 2.5rem`, so the height is **42px**.
- **Text:** Geist 400 16/22.4, `-0.01em`.
- **Transition:** `all .2s, background-color .3s cubic-bezier(.165,.84,.44,1), color, border-color`. `color` and `border-color` have no duration, so they snap.
- **Hover:** no lift, no shadow (`transform: none`, `shadow: none` before and after).

| Variant | Rest | Hover | Hover contrast | Used for |
|---|---|---|---|---|
| Solid white (default) | bg `#fff`, text `#361700` | bg `#cbc6bc` | 9.65:1 | Hero, tab panes and final CTA on dark |
| Solid dark | bg/border `#3c210c`, text white | bg `#684300` | 8.78:1 | Nav CTA, "Speak with our team" |
| Outline on dark + icon | transparent, 1px white border, white text, 16px icon inverted | bg `#eeece3`, text `#3c210c`, icon flips dark (200ms) | 12.54:1 | Hero secondary |
| Outline on light | transparent, `#361700` border and text | bg `#3c210c`, text `#f9f9f4` | — | Defined, unused on the homepage |
| Modal submit `input.button` | `#3c210c`, radius **12px**, 48px tall, Geist 500, `12px 20px` | `#453d30`, `all .35s` | — | **A second, inconsistent button system** |

- At ≤479 every in-content `.button-primary` is `width: 100%` (343px). The nav CTA stays 96px.
- **No `:focus-visible` style exists for `.button-primary`** (§15).

### 8.2 Cards
| Card | Observed spec | Ref |
|---|---|---|
| Outcome ("Scale your practice") | `#f6f5ec` fill, padding 24px, gap 16px, **square, no shadow, no hover**. Illustration area `15.625rem` (250px) at `object-fit: contain` (200px at ≤767). Title is a 1-word verb (24px serif); body 1 sentence, 14/21 at opacity .6. Three columns of 455px with an 8px gutter, 2+1 at 768, stacked at 390. | components.md §3.1 |
| Revenue capability (no card fill) | 120px gradient icon disc, then a 24px serif title of 2–3 words, then a 14px body of 2 sentences. Internal gap 24px. 2×2 grid inside a 7/12 column. | components.md §3.2 |
| Why choose | `#fbfaf8` + raster wash, **400px tall** (352 at ≤991, auto with `min-height: 18rem` at ≤767), padding 20px, `overflow: hidden`. Copy sits at the top. Four across with a 20px gap at ≥992 (cramped at 1024), 2×2 at 768, stacked at 390. | components.md §3.3 |
| Implementation | 424px wide (352 / 288), media 450px (368 / 304), cover, square. H3 24px on `#361700`; body 14px at opacity .8 (10.43:1). | components.md §3.5 |

### 8.3 Icon discs (Observed)
`.revenue_icon` is a 7.5rem (**120px**) circle (radius 6rem) with a raster mint-to-cream gradient and a **4rem (64px)** inline-SVG line icon in dark brown, about 1.5px monoline with rounded caps. It shrinks to 80px at ≤991 and 72px at ≤479 (glyph 3rem, then 2.5rem). **Meraki (Provisional):** a CSS gradient disc, `linear-gradient(180deg, canvas-tint → accent-tint)` (cream top, tint bottom; specs/05 §3.4), with inline SVG icons (DECISIONS §3).

### 8.4 Clipped corner badge (Observed; the signature motif)
`.choose_card-badge` is a white circle (`border-radius: 62.5rem; padding: 3rem`) positioned `bottom: -2.5rem; right: -2.5rem` inside an `overflow: hidden` card, so the card corner clips it into a partial circle. It holds a 96px line icon. At ≤991: padding 2.25rem, offsets −1.4rem / −1.1rem, icon 72px. It is the **only overlap motif on the page**. Meraki reuses it on the Why Meraki cards (DECISIONS §5 #9).

### 8.5 Compliance band (Observed)
Sits inside the integrations section, below the logo rows, not as its own section. `#072d35`, padding 40px, `margin-top: 5rem`, `col-lg-10` (about 1146px), square. A 32px serif title with a 2-line body on the left; three 96px certification badges (gap 1.5rem) on the right. At 768 the badges are `flex: none`, which squeezes the copy to 236px (defect). It becomes a column at ≤767 and is centred at ≤479. **Meraki: not used** (no certifications; DECISIONS §5 #7).

### 8.6 Logo cells (Observed)
`.logo-cell` is `11.4286rem × 5rem` (**182.9×80px**, verified-corrected), with a 1px `#e7e4da` border, a `#fbfaf8` fill and `margin-right: -1px` so neighbouring borders collapse into a single hairline. Logos are capped at `max-height: 2rem; max-width: 65%`, with 5rem edge fades. **Meraki adapts the bordered-cell geometry, without logos,** for the "How it works" chip flow (DECISIONS §5 #7).

### 8.7 Stat rail (Observed)
A vertical list with gap 1rem and `margin-top: 3.5rem`. Each item has a `2px solid #3617001a` left rule and 16px padding-left. Value: serif 32/1.1; label: 16/24 at opacity .6. It becomes a row at ≤991 and 2×2 at ≤767, where labels hyphen-break ("no-/shows"). **Meraki:** the left-rule *list* motif is reused for the Problem and Attention sections, carrying **labels, not numbers** (DECISIONS §5 #2, #5).

### 8.8 Modal form (Observed; ref: components.md §9)
| Part | Value |
|---|---|
| Card | `.modal-container`: `max-width: 560px; padding: 40px; border-radius: 16px; background: #fdfcfb; gap: 52px`. Radius 0 and full height at ≤479. |
| Backdrop | `#131313` at opacity .5 |
| Fields | 48px tall (`3rem`), 1px `#eeece3` border, radius 8px (`.5rem`), padding `.875rem 1rem`, `#fdfcfb`. Hover and focus change the border to `#5d4b0029`. |
| Labels | 12px `div`s (not `<label>`), with a red `*` |
| Validation | Blocks free-mail domains ("Please use a business email address.", `#e3342f` 13px); phone forced to `+1` |
| Motion | Fade `.4s ease`; card slides up from `translate3d(0,100vh,0)` over `.5s cubic-bezier(.32,.72,0,1)` |
| Success | A looping Lottie: "Clarion is calling you" |

**Meraki (DECISIONS §5 #10):** reuse the **card styling inline** in the `early-access` section (560px, 40px padding, 16px radius; inputs 12px radius, Provisional). Not a modal, no domain blocking, no Lottie. Behaviour is defined in DECISIONS §6.

### 8.9 Radius and shadow summary (Observed)
Square (0) on every card, band, image and section. Rounded only on interactive or chrome elements: nav pill 136px, nav hover pill 50px, buttons 40px, dropdown 8px, mobile sheet 16px, hamburger 5rem, modal 16px, modal submit 12px, form fields 8px, icon discs and badges as full circles. **No shadows** render on the homepage; separation comes from colour blocks.

---

## 9. Product showcase patterns

### 9.1 Vertical text tabs (Observed; ref: components.md §4.1; structure.md §3)
- **Geometry:** inset `1fr 1fr` grid, `min-height: 45rem` (754px rendered). Photo on the left (`object-fit: cover`); dark panel on the right (`#361700`, padding `60 60 0`, `justify-content: space-between`).
- **Panel content:** a white 48px H2 with **no subhead**, then 3 stacked serif tab labels at 32px (inactive `opacity: .4`, active 1; .3s easeOutQuart), then a 1px `#ffffff1a` divider (`padding-bottom: 2.5rem`), then the pane: one sentence (16/24, `max-width: 28.5rem`) and a white "Schedule a demo" pill **repeated in every pane**.
- **Pane switch:** every pane is stacked in one grid cell (`grid-area: 1/1`), with `visibility` and `opacity` crossfading over 300ms, so **the height never jumps**. Webflow `data-duration-in="300" data-duration-out="100"`. Reduced motion sets `transition: none`.
- **Media does not change per tab:** there is only one `img.platform_img` in the markup. No autoplay.
- **Responsive:** at ≤991 it stays 2 columns but goes full-bleed with a `40 32` panel padding and 26px tabs. At ≤767 it stacks: media first (`height: 25rem`, 3:2), then the panel (`40 24 16`), with 24px tabs and a full-width CTA.
- **Defect:** about 157px of dead space between the H2 and the tabs at 1024, caused by `space-between` plus `min-height`.
- **Not determinable:** runtime ARIA roles (the static HTML has none) and hover styling (no hover CSS exists).

### 9.2 Illustrations (Observed; ref: components.md §3.1; structure.md §2)
The outcome cards use **light product-UI illustrations, not photos**: floating white chips with dotted connectors, mint accents and small avatar photos. Examples: a phone → app → check flow with an appointment chip; referral documents feeding into an EHR notes chip; a calendar grid with a cancelled slot and a "+$" disc. They are raster AVIFs, the chip rounding (about 8–12px) is baked into the images, and each image has a descriptive `alt`. The implementation rail mixes real photos, photos with frosted-glass UI overlays (a "Receive → Verify → Schedule → Follow-up" chip flow), and abstract chip illustrations on pale gradients.

**Meraki (DECISIONS §4, §5):** all product visuals are **HTML/SVG previews built in code** (DashboardPreview, OccupancyGrid, RentLedger, TenantList, OpsList inside a PreviewFrame), each captioned "Illustrative preview · sample data", using obviously fictional Indian names and ₹ amounts.

### 9.3 Horizontal rail (Observed; ref: components.md §5.3; responsive.md §1.7)
| Width | Mechanism | Card | Gap | Visible |
|---|---|---|---|---|
| ≥992 (no reduced motion) | **Scroll-jacked.** `.carousel-pin { position: sticky; top: 0; height: 100vh }`; JavaScript sets the section height to `innerHeight + overflow` (1749 at 1440, 2000 at 1024), and vertical scroll drives `swiper.translateTo()`. Drag is disabled. | 424px, media 450 | 24 | about 3.2 cards |
| 768 | Swiper free-mode drag, no pin | 352, media 368 | 24 | 2, the second cut off at the edge |
| 390 | Same | 288, media 304 | 12 | 1 + a 67px peek |

- Headlines are full first-person sentences: "We set it all up for you." / "We stay with you."
- A `focusin` handler scrolls a focused off-screen card into view.
- **There are no dots, arrows or counter at any width.**
- Under reduced motion the pin is disabled.
- Dependencies: Swiper `@11` (floating major version), plus GSAP and ScrollTrigger loaded **twice** and unused here.

---

## 10. Feature storytelling and narrative arc

### 10.1 Arc (Inferred labels from observed order; ref: structure.md §4)
| Step | Clarion block | Persuasion job |
|---|---|---|
| 1 | Hero | Promise + social proof (category claim, human photo, customer logos) |
| 2 | Outcomes | What you get: a 3-step funnel (Capture → Convert → Recover) |
| 3 | Platform tabs | How: one platform, three modules, plus the first mid-page CTA |
| 4 | Revenue | Proof in numbers: ROI stats next to the four jobs automated |
| 5 | Integrations + compliance | Technical objection: it works with your stack and it is safe |
| 6 | Implementation rail | Commercial objection: pricing model, setup, breadth, founder, support |
| 7 | Why choose | Differentiation + trust, plus a soft CTA |
| 8 | Final CTA | Close: echoes the hero visually, with a single action |
| 9 | Footer | Minimal exits |

Pattern: **promise → outcomes → mechanism → proof → objections (technical, then commercial) → why us → ask.**

### 10.2 Copy patterns (Observed; ref: structure.md §3)
- **H2s** are 3–6 words over 1–2 lines; the final CTA is the longest at 8 words over 3 lines. Only the H1 and the rail H3s end with full stops.
- **Subheads:** 5 of 7 section H2s have one supporting sentence (16/24). The platform and final-CTA H2s have none, and the integrations subhead runs 3 sentences.
- **Card titles** are 1–3 words. Bodies are 1–2 sentences, often in the "X, not Y" pattern ("in hours, not weeks").
- **Absent:** testimonials, case studies, a pricing table, an FAQ, team photos, a newsletter, an inline form.

### 10.3 Meraki adaptation (DECISIONS §5)
Meraki keeps the arc but makes four changes. It replaces "proof in numbers" with an **illustrative operational view with no stats** (#5 attention). It replaces the integrations objection with the **owner's monthly workflow** (#7 how-it-works). It turns the commercial objection into **honest early-access steps** (#8 getting-started). And it **adds** Problem (#2), detailed Features (#6), an inline Form (#10) and an FAQ (#11), none of which Clarion has. Copy rules: H2s of 3–8 words, one supporting sentence, the "X, not Y" pattern sparingly, and future/intent phrasing for the product ("is being built to", "designed to").

---

## 11. CTA placement

Observed button positions at 1440 (`buttons` boxes in the dump ÷ docHeight 8,239). Note that the docHeight includes the 849px of pin height added by JavaScript.

| CTA | Label → destination | y | Depth |
|---|---|---|---|
| Nav (fixed, always visible) | "Try it out" → modal | 15 (viewport) | 0% / persistent |
| Hero primary + secondary | "Schedule a demo" → Calendly; "Try it out" → modal | 685 | **8%** |
| Platform tab pane (×3 in the DOM, one visible) | "Schedule a demo" → Calendly | 2248 | **27%** |
| Why choose | "Speak with our team" → Calendly | 6924 | **84%** |
| Final CTA | "Schedule a demo" → Calendly | 7357 | **89%** |
| Footer "Contact" link | → modal | about 7966 | about 97% |

- There are only **two destinations** (Calendly or the call-me modal) and three labels. "Schedule a demo" appears ×5 in the DOM, "Try it out" ×2 and "Speak with our team" ×1.
- The **27% → 84% stretch has no in-content CTA** (the nav pill stays available). The middle of the page is uninterrupted argument.

**Meraki (DECISIONS §5; Provisional where noted):**
- One destination for every CTA: `#early-access`, with the label "Get early access".
- Placements: nav CTA (persistent); hero "Get early access" plus the ghost "See how it works" → `#how-it-works`; Why Meraki (#9) CTA; the inline form itself (#10); final CTA (#12); footer "Early access" / "Contact" links.
- Platform tabs carry **one shared** "Get early access" CTA below the tab panels, not one per pane (decided in specs/01 §7 row 4; DECISIONS cites Clarion's "per-tab description + CTA" only as the source pattern).

---

## 12. Footer

Observed (ref: structure.md §9; components.md §10; responsive.md §1.10):
- **Element:** a `section`, **not `<footer>`** (no `contentinfo` landmark). `#fbfaf8`, padding 80px (56px at ≤767).
- **Top row:** a large wordmark on the left (`col-lg-4`, 168×40). On the right, **one** right-aligned column: label "Company" (14px at opacity .6, 4.39:1, fails AA), links About us / Careers / Contact (16/24, gap 8px, hover `#7b7468` at 4.43:1, fails AA), and LinkedIn and X icons (20px, gap 16px, hover opacity .6).
- **Bottom row:** `margin-top: 6rem` (3.5rem at ≤991). "© 2026 Clarion. All rights reserved" on the left (14px); Terms of Use and Privacy Policy on the right (14px, gap 24px).
- **≤991:** stacked and left-aligned, with the link column gaining a 1px `#3617001a` left rule. At ≤767 the brand column moves last.
- **Bugs:** the social `aria-label`s are swapped. An animated-underline link style (`.footer-link-v2`, `.735s cubic-bezier(.625,.05,0,1)`) is defined but used 0 times.
- **Absent:** newsletter, address, multi-column sitemap.

**Meraki (DECISIONS §5 #13):** a real `<footer>` with a text wordmark and three columns: Product (Platform, Features, How it works), Company (Early access, Contact → `#early-access`, FAQ) and Legal (Privacy → `/privacy`, Terms → `/terms`). Contact email and phone appear only if their env values are set. No social icons. The © year is computed.

---

## 13. Responsive observations

### 13.1 Breakpoint system (Observed; ref: responsive.md §0)
Webflow uses desktop-first `max-width` tiers: **≤991** (tablet, nav collapses, container 88%), **≤767** (single-column grids, type step 2) and **≤479** (full-width buttons, type step 3). There are also `min-width` 1280 and 1920 tiers (used here only to change the CTA overlay stops) and a hand-written **≤670** inline query for the CTA photo. **No tier sits between 992 and 1279**, so 1024 renders the full desktop layout.

### 13.2 Per breakpoint (Observed)
| Area | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|
| Nav | Pill 872px, centred links | Same (pill x76) | Hamburger + CTA; pill w720 | Same; pill w358; logo 80×22 |
| Hero h / H1 | 855 / 61.7px | 730 / 52px | 680 / 46px | 720 / 40px; 4-line subhead; stacked full-width buttons |
| Outcome cards | 3-up, 8px gutter | 3-up (274px text) | 2 + 1 full-width | 1-up; image 200px |
| Platform | Inset 1fr/1fr | Same (157px dead space) | Full-bleed 1fr/1fr, tabs 26px | Stacked: media 400px, then panel; tabs 24px |
| Revenue | 4/7 split; stats vertical | H2 wraps to **3 lines** (301px column) | Stacked; stats 4-up row (hyphen breaks) | Stats 2×2; cards 1-up; disc 72px |
| Integrations | About 7.5 logo cells visible | — | About 4 cells; compliance copy squeezed to 236px | About 2 cells; compliance stacked and centred |
| Rail | Pinned, 1749px tall | Pinned, 2000px tall | Drag, 352px cards | Drag, 288px cards + 67px peek |
| Why cards | 4-up, 400px tall | 4-up, 191px text, **3 of 4 titles wrap** | 2×2, 352px | 1-up, `min-height` 288px; full-width CTA |
| Final CTA | 720px; H2 3 lines on the left half | H2 **4 lines** | 576px; 44px H2 | 800px; copy on solid teal, photo below and masked in |
| Footer | Two columns | Same | Stacked, left rule | Same; 56px padding |
| Doc height | 8,239 | 8,516 | 7,912 | **10,035** |

### 13.3 Responsive lessons (Inferred)
- 1024 is squeezed because of the missing 992–1279 tier. Meraki adds `xl` 1200 for 4-up grids (DECISIONS §7 breakpoints: sm 480, md 768, lg 992, xl 1200; the nav switches at lg).
- 480–767 is under-served, because the mobile treatments start at ≤479 only. Meraki's mobile-first `min-width` queries avoid that cliff.
- The mobile length is driven by the padding bug (§7.2).

---

## 14. Animations and interactions

### 14.1 Complete motion inventory (Observed; ref: components.md §12; tokens.md §5)
| Motion | Trigger | Spec | Reduced-motion guard |
|---|---|---|---|
| Nav link colour | hover | `color .3s` easeOutQuart; background snaps | No |
| Dropdown open | hover, 0 delay | Instant; chevron rotates 180° with no transition | No |
| Hamburger → X | click | transform + opacity `.3s` easeOutQuart, ±9px / ±45° | No |
| Mobile sheet | click | Instant (`data-duration="0"`) | n/a |
| Button background | hover | `.3s cubic-bezier(.165,.84,.44,1)`; colour and border snap; icon filter 200ms | No |
| Platform tab label | click | opacity .4 → 1, `.3s` easeOutQuart | — |
| Platform pane | click | 300ms opacity crossfade in a stacked grid | **Yes** |
| Hero logo marquee | always | `100s linear infinite`, −50% over 2 groups, about 32px/s, paused on hover | **Yes** |
| EHR logo marquee | always | `60s linear`, left to right, 3 groups × 8 cells (seamless), about 24px/s | **Yes** |
| Phones logo marquee | always | `44s linear`, right to left, 3 groups × 10 cells shifted by 1/4, so **the loop jumps** (Inferred) | **Yes** |
| Implementation rail | scroll at ≥992 | Sticky pin; horizontal translate tied 1:1 to scroll | **Yes** (pin off) |
| Modal open/close | click | Fade `.4s ease` + slide-up `.5s cubic-bezier(.32,.72,0,1)`; hidden after 500ms | No |
| Modal success | submit | Looping Lottie | No |
| Footer links / social | hover | colour `.3s` / opacity `.35s` | No |
| Scroll reveal, parallax, video, count-up | — | **None** (`data-w-id` ×2, both on the Lottie; count-up script matches 0 elements) | — |

- **Motion tokens:** one easing curve, `cubic-bezier(.165,.84,.44,1)` (easeOutQuart, 15 uses), with 0.2–0.3s durations. The modal has its own curve.
- **Reduced motion:** `clarion.css` itself has **0** `prefers-reduced-motion` rules. Every guard is in an inline embed, and they cover only the marquees, the tab fade and the pin.
- **Dead code** (Observed selectors, Inferred effect): GSAP and ScrollTrigger loaded twice; 3 JavaScript marquee scripts and a Swiper autoplay initialiser targeting absent selectors; Phosphor linked twice and unused. The `SPEED = 60` / `80` scripts noted in structure.md belong to these dead marquees; the live speeds are the CSS values above.

**Meraki (DECISIONS §7):** hover colour transitions (300ms on the same easeOutQuart); tab crossfade 300ms in / 100ms out; **no scroll-reveal, no marquee, no pin, no animation library**; a mobile sheet with no dependency on motion; **all motion disabled under `prefers-reduced-motion`** in a single global block.

---

## 15. Accessibility observations of the reference

Observed unless marked (ref: components.md §11; tokens.md §7, §8; responsive.md §3).

| Area | Observation | Severity |
|---|---|---|
| Contrast: muted text | `#361700` at **opacity .6** blends to about `#83705e`. **4.32:1** on `#f6f5ec` (card bodies, stat labels), **4.39:1** on `#fbfaf8` (footer label), about 4.37:1 on the choose-card wash. **All fail AA** for normal text (14–16px). | High (systemic) |
| Contrast: footer link hover | `#7b7468` on `#fbfaf8` = **4.43:1**, fails AA | Medium |
| Contrast: inactive tabs | White at .4 on `#361700` = **3.58:1**. Passes only as large text (32px desktop, 24px mobile). | Low (passes large-text) |
| Contrast: passes | Body 15.73:1; H2 14.23:1; white on teal 14.63:1; buttons 8.78–16.41:1; nav hover 4.74:1 | — |
| Focus: buttons | **No `:focus-visible` rule for `.button-primary`**, so it falls back to the browser default | High |
| Focus: links and tabs | `.nav-link:focus-visible` changes colour only. Webflow resets `outline: 0` on `.w-tab-link`, `.w-dropdown-toggle`, `.w-dropdown-link` and `.w-nav-button` focus, so tab focus may be invisible (Inferred). Only the skip link, the hamburger and the dropdown items have a 2px `#71604e` outline. | High |
| Skip link | Targets `#main`, but **no `<main>` exists**; its handler calls `querySelector('main')` and would throw (Inferred). | High |
| Landmarks | No `<main>`, no `<footer>` / `contentinfo`. `role="banner"` and `role="navigation"` are present; `<html lang="en">` is present. | Medium |
| Heading order | The modal `h3` comes before the `h1` in DOM order (twice). Integration labels are `h3`s inside `<a>` elements with no `href`. | Medium |
| Modal | A plain `div`: no `role="dialog"`, no `aria-modal`, no focus management. The close control is an `<img alt="">` (not focusable). Esc and backdrop clicks do close it. | High |
| Form | Labels are `div`s (accessible names come from placeholders, Inferred). The duplicated modal produces duplicate IDs (`firstName`, `email`, `submitBtn`, the form ID). | High |
| Images | 65 of 120 images have empty or no alt (mostly decorative). Logo alts are **mismatched** (for example, weinfuse → "Epic"; the HITRUST badge → "HIPAA compliant"). Duplicated marquee groups are not `aria-hidden`, so logos are announced 2–3 times. | Medium |
| Social links | `aria-label`s swapped between LinkedIn and X | Low |
| Controls | The dropdown toggle and hamburger are `div`s (runtime ARIA could not be confirmed). The hamburger target is **40×43px**. | Medium |
| Motion | Marquees run for more than 5s with hover-pause only, and no pause control (WCAG 2.2.2, Inferred). Reduced-motion coverage is partial (§14). | Medium |
| Current page | No visible current-page state in the nav | Low |

---

## 16. Reference defects not to replicate

| # | Defect | Evidence | Meraki rule |
|---|---|---|---|
| 1 | Section-padding variable overridden on `h1,h2,h3` instead of `:root`, so it never scales | responsive.md §0.3 | `--spacing-section` defined globally (§7.2) |
| 2 | Gutter dips to 20.5px at 1024 (96% vs 88% widths) | responsive.md §0.4 | Fluid `padding-inline` clamp |
| 3 | No tier between 992 and 1279: 4-up cards with 191px text, 3–4-line H2s at 1024 | responsive.md §3 #3 | `xl` 1200 for 4-up |
| 4 | Mobile treatments only at ≤479; 480–767 is a hybrid, patched with a custom 670px query | responsive.md §3 #4 | Mobile-first `min-width` queries |
| 5 | Phones marquee shifts by 1/4 across 3 groups, so the loop jumps | responsive.md §3 #5 | No marquee |
| 6 | Rail has no position indicator below 992 | responsive.md §3 #6 | Add a visible position cue (**Provisional**: dots or an "n / 4" counter) |
| 7 | LCP hero image is `loading="lazy"` | responsive.md §3 #7 | Hero has no photo; any above-the-fold image is eager |
| 8 | Hamburger 40×43px | responsive.md §3 #8 | ≥44×44 targets |
| 9 | Hyphen breaks in stat labels | responsive.md §3 #9 | No stats; use non-breaking hyphens where a hyphen is needed |
| 10 | Compliance copy squeezed to 236px at 768 | responsive.md §3 #10 | Stack below lg rather than squeeze |
| 11 | About 157px of dead space in the tab panel at 1024 | responsive.md §3 #11 | Content-driven height, no `space-between` filler |
| 12 | Mobile page 10,035px (1.22× desktop) | responsive.md §3 #12 | Fluid padding; keep the mobile page lean |
| 13 | `body` line-height token = 16px | tokens.md §1.4 | Body 1.5 set at the root |
| 14 | Heading weight 500 requested, only 400 loaded | tokens.md §1.1 | Load exactly the weights used (`next/font`) |
| 15 | Modal H3 grows on tablet (28 → 36 → 32px) | responsive.md §2 | No heading grows at a narrower width |
| 16 | Two button systems (40px pills + a 12px-radius submit) | components.md §2.1 | One pill system, including the form submit |
| 17 | Muted text via opacity .6, which fails AA | tokens.md §7 | Solid `--color-ink-muted` |
| 18 | No button focus style; `outline: 0` resets | tokens.md §8 | Visible `:focus-visible` everywhere |
| 19 | Skip link to a missing `<main>`; no `<footer>` | components.md §11 | Real landmarks |
| 20 | Div modal, img close, div labels, duplicated DOM / IDs | components.md §9, §11 | Inline form, real `<label for>`, rendered once |
| 21 | Wrong logo alts; swapped social labels; non-hidden duplicate marquee groups | components.md §6, §11 | No logos; no social icons |
| 22 | Nav link background snaps (only `color` transitions); dropdown chevron snaps | components.md §1.2–1.3 | Transition `background-color` and `color` together |
| 23 | Unterminated CSS comment swallows the dropdown overlay rule | components.md §1.3 | No dropdown; lint the CSS |
| 24 | GSAP/ScrollTrigger ×2, dead marquee/autoplay/count-up scripts, Phosphor ×2 unused, floating `swiper@11` | components.md §0, §5.1 | No animation or carousel libraries; pinned versions only (DECISIONS §3) |
| 25 | Scroll-jacked rail adds about 849–1,232px of "dead" vertical scroll | components.md §5.3 | Native scroll-snap below lg, static row at lg and up |
| 26 | White pill has almost no edge on cream sections; mobile sheet edge invisible | components.md §1.1; responsive.md §1.1 | **Provisional:** 1px `--color-line` border on the pill and sheet |
| 27 | No visible current-page state in the nav | components.md §1.2 | Anchor nav: optional active-section state (implementation decision) |
| 28 | Business-email blocklist; phone forced to `+1` | components.md §9 | Not applicable (DECISIONS §5 #10, §6) |

---

## 17. Elements to adapt for Meraki

Consistent with DECISIONS §5 (section map) and §7 (tokens). All rows are **Provisional** until the owner approves Phase B.

| # | Meraki section (`id`) | Clarion pattern adapted (Observed values) | How Meraki adapts it |
|---|---|---|---|
| 0 | Nav (—) | Fixed white pill: `top: 8px`, max 54.5rem (872px), 56px tall, 136px radius; logo left, absolutely centred links, dark pill CTA right; hamburger ≤991 with the CTA kept in the pill; 90vw 16px-radius sheet with scroll lock | Exactly 4 links: Product (`#platform`), Features (`#features`), How it works (`#how-it-works`), Contact (`#early-access`). CTA "Get early access" → `#early-access`. **No dropdown, no auth links.** Mobile sheet with focus trap, Esc closes it, body scroll lock, CTA stays in the pill. Text wordmark. |
| 1 | Hero (`hero`) | Full-bleed dark band, vertical gradient to the deep accent, centred bottom-anchored H1 `clamp(2.5rem, 1.75rem + 2.34vw, 4rem)`/1.1, 1–2 line subhead (max about 591px), white pill + ghost pill, gap 16px, stacked full-width ≤479 | Dark accent gradient band (no photo), H1 "Run your hostel. Not your paperwork.", CTAs "Get early access" (white) and "See how it works" (ghost → `#how-it-works`). A large DashboardPreview rises out of the hero's bottom edge (half on dark, half on page bg), labelled "Illustrative preview · sample data". No logo marquee. |
| 2 | Problem (`problem`) | Centred section header (outcomes style) + the 2px left-rule list motif from the stat rail | Text-led: a centred header, then 4 "where information lives today" items (Notebook, Spreadsheet, Chat messages, Memory), each with a 2px left rule and a one-line pain. No stats, no card grid. |
| 3 | Outcomes (`outcomes`) | 3 tinted square cards, 24px padding, 250px illustration area, serif title, 14px body, 8px gutter; 2+1 at md, stacked at base | Know your occupancy / Track rent with clarity / Keep operations organized. Each card has a distinct HTML/SVG mini-UI (bed grid; rent ledger rows; tenant/property record card). Body text in solid muted ink. |
| 4 | Platform tabs (`platform`) | Inset 1fr/1fr split; dark panel with large serif tabs (inactive .4 → 1, .3s); 1px divider; per-tab description + CTA; stacked-grid crossfade 300 in / 100 out so height never jumps; stacks media-first ≤767 | 4 tabs: Rooms & occupancy / Tenants & allocations / Rent & payments / Property operations. **The left media swaps per tab** to the matching preview. WAI-ARIA tabs (roving tabindex, arrow keys, `aria-controls`). Mobile: stacked; tabs become a horizontal scroll or a list above the panel. |
| 5 | Attention (`attention`) | Full-bleed tint band, asymmetric 4/7 split; left H2 + subhead + list with 2px left rules; right content | The left list holds **labels, not numbers**: Vacant beds, Dues outstanding, Move-ins/outs this week, Open issues (only if maintenance is confirmed; otherwise "Notes to follow up"). On the right, a full DashboardPreview with a sample-data label. |
| 6 | Features (`features`) | No Clarion equivalent; derived from the §9.1 split geometry and the §8.2 card imagery | Up to 3 alternating rows (Occupancy & rooms; Rent & payment records; Tenant & property records). Square edges, preview on a tinted panel, H3 + 2–3 bullets of *intended* capability. No multi-property row. Must not duplicate the tab copy. |
| 7 | How it works (`how-it-works`) | Centred header (`col-lg-8`, gap 2rem) + bordered-cell row (1px `#e7e4da`, collapsed borders, 80px cells) | Chip flow of the owner's month: New tenant → Allocate bed → Record rent → Follow up dues → Move-out, in `--color-line` cells. **No logos, no compliance band.** An optional "Your data" note only with true statements. |
| 8 | Getting started (`getting-started`) | Dark full-bleed band; centred header; tall cards with sentence headlines ("We…/You…"); 24px gap (12px under 768) | 4 honest early-access steps (Request early access → We get in touch → Try Meraki early and share feedback → Help shape what we build). Native scroll-snap rail below 992, 4-up row at ≥992. **No pin.** |
| 9 | Why Meraki (`why`) | Tinted band; 4 cards 400px tall, 20px padding, 20px gap; clipped white circle badge (`padding: 3rem`, offset −2.5rem) at the bottom-right; centred dark CTA (`margin-top: 3.5rem`) | Built for hostels & PGs / Everything in one place / Clear view of occupancy & dues / Shaped with operators. CTA "Get early access". 4-up only from xl (1200); 2×2 at md. No comparisons, no "enterprise-grade". |
| 10 | Early access (`early-access`) | Modal card: 560px, 40px padding, 16px radius, `#fdfcfb` fill; 48px fields | Placed **inline**. Fields, consent, honeypot and honest states per DECISIONS §5 #10 and §6. Button "Request early access" in the shared pill system; inputs 12px radius. |
| 11 | FAQ (`faq`) | No equivalent; centred header style + 1px hairline dividers | 8 questions from the brief, with answers bound to the DECISIONS §2 statuses. Accessible accordion (button + `aria-expanded`, or native `<details>`). |
| 12 | Final CTA (`final-cta`) | Full-bleed band, diagonal 139° gradient (accent 12% → transparent 55%), left-aligned 3-line H2 (`max-width: 50ch`), one white pill; text on solid colour on mobile | "Make hostel management simpler." Gradient + subtle CSS abstract or a cropped preview at the right; CTA → `#early-access`. Mobile: copy on solid accent. |
| 13 | Footer (—) | Minimal: large wordmark left, link column right, legal row 6rem below; stacks with a left rule ≤991 | 3 columns (Product / Company / Legal), contact only from env, no social icons, © year computed (§12). |

**Cross-cutting adaptations:**
- Warm cream bases with one deep accent.
- Light display serif + Geist.
- Square cards and bands, no shadows, pill controls.
- Hard section cuts, plus width beats (inset against full-bleed).
- Header-to-content 56px.
- One easing curve.
- Dark punctuation bands (hero, platform panel, getting-started, final CTA).

---

## 18. Elements not to copy

| Category | Do not copy | Source |
|---|---|---|
| Brand | The name "Clarion", the wordmark SVG, the favicon, and the exact palette as an identity (`#361700`/`#3c210c` browns, `#072d35` teal, `#f6f5ec`/`#fbfaf8` creams). Borrow the *relationships* only. | structure.md §6 |
| Fonts | **Moderat Serif Trial** (a trial licence). **Bpmf Zihi Kai Std** (a CJK family; use a purpose-built Latin serif). | tokens.md §1.1 |
| Healthcare copy | EHR, referrals, patients, no-shows, refills, payer logic, escalations, "Built by a doctor", every verbatim line ("The front office that runs itself", "revenue engine", "Why leading practices choose…") | structure.md §6 |
| Statistics | "71% reduction in no-shows", "99% decrease in hold time", "2x referral conversion", "60% calls resolved", "Cut no-shows in half". **Meraki shows no numeric outcome claims.** | structure.md §6 |
| Logos and badges | 19 customer logos, about 18 integration logos, and the HITRUST/HIPAA/SOC 2 badges. No third-party logos at all, and no substitute Indian compliance claims (DPDP, ISO and so on) presented as certifications. | structure.md §6; components.md §3.4 |
| Imagery | Every photo, every raster illustration, the avatar names inside illustrations, and the `gradient.avif` / `integrations.avif` textures. Gradients are rebuilt in CSS. | structure.md §6 |
| Commercial claims | "You only pay when a call is handled" / per-resolution pricing | structure.md §6 |
| Flows | The AI "call me" modal, business-email blocklist, `+1` phone forcing, Lottie success state, Calendly destinations | components.md §9 |
| Engineering | Webflow markup, Swiper/GSAP/Lottie, the scroll-jack script, duplicated libraries, dead scripts | components.md §0, §5 |

**Analysis suggestions superseded by DECISIONS.** The analyses floated ideas that Meraki must **not** adopt, because they claim capabilities, data or channels that are Planned, Unknown or Not planned (DECISIONS §2):
- "Book a demo" / "Talk to us on WhatsApp" CTAs, and a WhatsApp contact line;
- a Pricing link, "Pay per occupied bed", "₹0 setup fee", "Refund policy";
- "Paid via UPI ✓" chips and UPI/Razorpay/Cashfree/Tally/WhatsApp integration rows;
- KYC/agreements and complaints/notices as core modules or tabs;
- "Hindi and English", "Live in a day", "We import your Excel register";
- a stat rail with numbers or count-ups, and testimonials;
- a "For: Boys' PG / Girls' PG…" dropdown;
- a `+91`-only phone field with Gmail blocking;
- the `@phosphor-icons/web` stylesheet (Meraki uses inline SVG only);
- an IntersectionObserver entrance fade (DECISIONS §7 says no scroll-reveal);
- a full-bleed photo hero (only if licensed photography is supplied; see §21).

---

## 19. Deliberate deviations

All **Provisional** (DECISIONS §5, §7).

| # | Deviation | Reference behaviour (Observed) | Meraki decision | Reason |
|---|---|---|---|---|
| 1 | **UI-led hero instead of a photo** | Full-bleed photo of a person + vertical teal gradient | Accent gradient band + a DashboardPreview rising out of the hero bottom (labelled "Illustrative preview · sample data"). This deliberately breaks the reference's "no overlap" rule once. | No licensed photography exists, and the product UI is the clearest promise. The photo-led variant stays available if the owner supplies licensed photos. |
| 2 | **No logo marquee** | 19 customer logos scrolling over the hero bottom at opacity .6 | None, and no "trusted by" area | No customers exist; inventing social proof is forbidden. It also removes ambient motion. |
| 3 | **No scroll-pinned rail** | Sticky pin + JavaScript translate (1749–2000px section height), Swiper + GSAP | Native `scroll-snap` rail below 992; static 4-up row at ≥992; a visible position cue below 992 | Accessibility (no scroll hijack, keyboard-friendly), performance (no libraries) and only 4 cards |
| 4 | **Per-tab media swap** | One static photo for all 3 tabs | The left media swaps to the matching preview per tab, crossfaded 300ms in the same stacked-grid technique | A real state change makes the tabs informative; the reference's static image wastes half the block |
| 5 | **Solid muted colour for AA** | Muted text = ink at opacity .6 → 4.32–4.39:1 (fails AA) | Solid `--color-ink-muted` `#5E574D` (quick check 6.77:1 / 6.31:1 on the two canvases; recorded formally in 05) | WCAG 2.x AA 4.5:1 for normal text |
| 6 | **44px touch targets** | Buttons 42px; hamburger 40×43 | Buttons 42px visual with a **44px** minimum on touch; hamburger ≥44×44 | Touch ergonomics guidance (44px) |
| 7 | **Visible focus** | No button focus style; `outline: 0` resets on tabs and dropdown; links change colour only | `:focus-visible` 2px outline, offset 2px, on every interactive element, with the colour verified against both light and dark surfaces | Keyboard accessibility (WCAG 2.4.7) |
| 8 | **Preview frames 12px radius** | Everything non-interactive is square; UI-chip rounding only inside raster images | Product preview frames use a 12px radius and a 1px line border (no shadow); cards and bands stay square | Product UI needs some rounding to read as UI, kept subtle and limited to previews |
| 9 | Inline form, not a modal | A hidden, duplicated div modal | Inline `early-access` section reusing the modal card styling | An honest, discoverable, accessible conversion point |
| 10 | Problem, Features, FAQ added; proof-in-numbers removed | Arc without Problem/FAQ; ROI stats | DECISIONS §5 section map | Early-stage honesty; owner audience questions |
| 11 | Fluid spacing scale, mobile-first tiers, `xl` 1200 | Padding bug, gutter dip, no 992–1279 tier | `--spacing-section` and `--spacing-gutter` clamps defined globally; sm/md/lg/xl tiers | Fixes reference defects 1–4 |
| 12 | One serif family | Two near-identical serifs (one a trial build) | Newsreader 300/400 | Licensing; one fewer font download |
| 13 | No nav dropdown | Hover-only dropdown with 8 sub-pages | 4 anchor links | No sub-pages exist |
| 14 | Single CTA destination | Calendly + modal, 3 labels | Everything → `#early-access`, "Get early access" | No demo booking exists; simpler funnel |

---

## 20. Inspection limitations and unresolved observations

### 20.1 Capture-wide
- **Stills only.** Motion feel, loop seams, pinned-scroll feel and touch momentum were not observed over time.
- **No tab clicks were captured.** The per-tab pane content is known from the markup only.
- **Widths not captured:** 480–767, 1025–1279 and ≥1920. Behaviour there is inferred from the CSS.
- `docHeight` at 1440 and 1024 includes the JavaScript-set pin height; a no-JS layout was not captured.
- The dumps do not record element attributes, so the **runtime ARIA** that Webflow adds (tabs, dropdown, hamburger) is unknown.

### 20.2 From structure.md (§7 and the verification log)
- Whether the platform photo changes per tab via script. Very likely not, since there is a single `img`, but it was not clicked.
- The rest positions of the rail (the captures show mid-scroll states).
- Whether Bpmf weight 500 is synthesised or renders the 400 face.
- Hover states of the logo cells, tabs and cards (not captured).
- Nav on scroll: no visible change in any capture, but there is no trace of a scrolled-state class.
- Bpmf's OFL licence is inferred, not checked.
- *Resolved by other analyses:* the hero marquee edge mask is **not applied**, because it targets an absent class (tokens.md §2.2, verified-corrected). The structure.md `SPEED = 60 / 80` values belong to dead JavaScript marquees; the live speeds are the CSS `60s` / `44s` (components.md §6).

### 20.3 From tokens.md (§8 and the verification log)
- The Latin glyph provenance of Bpmf Zihi Kai Std. The visual match to Moderat is a judgement from screenshots.
- Exact gradient stops of the icon discs and washes: these are raster images, so only pixel samples exist.
- Image corner radii are not in the dump; "square" comes from the screenshots and from the CSS having no radius on those classes.
- Hover and focus states other than the dark button and nav link come from the CSS only.
- Which overlay wins at 390 between the ≤479 CSS (`…64%`) and the inline ≤670 rule (`…100%`). Cascade order suggests the inline rule; not confirmed.
- The rendered height of the mobile sheet: `calc(100svh - 4rem)` is declared, but the screenshot shows it ending around y 720 of 844.
- The choose-card effective background varies across the raster wash, so its contrast (about 4.37:1) is approximate.

### 20.4 From components.md (§14 and the verification log)
- Whether the outcome-card AVIFs are animated.
- The exact keyboard tab order, and whether the dropdown opens on keyboard focus.
- Platform tab hover: there is no hover CSS, so presumably none.
- Swiper's resolved minor version (`swiper@11` floats).
- Marquee speeds are computed from dump boxes, not measured over time.
- Lottie and modal smoothness; the double-bound handlers and the skip-link TypeError are inferred from source, not executed.
- The nav-link background snap is inferred from `transition-property: color`.

### 20.5 From responsive.md (§4 and the verification log)
- Which srcset candidate was fetched, so whether the soft mobile hero comes from srcset choice or lazy loading.
- Mobile menu behaviour with "By specialty" expanded, and its bottom edge.
- Landscape phone layouts; safe-area and notch handling.
- Whether the nav CTA keeps 96px at ≤479 because of its variant class or a shrink-to-fit parent.
- The phones-marquee loop jump: the maths is confirmed, but the jump was not observed in motion.

---

## 21. Open questions raised by this analysis

These come from DECISIONS §8 (the items relevant to UI/UX) plus concerns found while synthesising the reference. None of them blocks Phase B's build.

1. **Imagery** (DECISIONS §8.3). No photos or logo exist. Default is the UI-led hero (deviation 1). A Clarion-style photo hero and final-CTA photo need licensed photography of an Indian hostel/PG context. Until a logo is supplied, the wordmark is text.
2. **Brand colour and name** (DECISIONS §8.4). The deep indigo + warm creams and the name "Meraki" are provisional.
3. **Onboarding reality** (DECISIONS §8.2). The Getting-started rail copy depends on the actual early-access process.
4. **Product scope** (DECISIONS §8.6). Maintenance/complaints and multi-property are Unknown. They affect the Attention list label ("Open issues" vs "Notes to follow up") and whether a fourth Feature row could ever appear.
5. **Hindi/regional language** (DECISIONS §8.8). This affects font subsets: Newsreader and Geist have no Devanagari, so a Noto Devanagari pairing would be needed.
6. **Concern: inactive tab-label opacity on the Meraki accent.** Reusing the reference's `.4` opacity gives about **3.45:1** on `#172A46` and **3.19:1** on `#1F375C` (quick check), which passes only as large text (≥24px regular). The tab clamp floor is exactly 24px, so the margin is thin. **Recommendation (Provisional):** inactive labels at ≥.6 opacity (5.88:1 / 5.15:1) or a solid muted-on-dark colour. **Adopted:** .6 (specs/05 §3.3, §20).
7. **Concern: nav pill edge on cream sections.** The reference pill has no border or shadow and nearly disappears over light bands. DECISIONS §7 forbids marketing shadows but allows 1px line borders on previews. **Recommendation (Provisional):** a 1px `--color-line` border on the pill and the mobile sheet. Owner/design approval needed.
8. **Concern: platform-pane CTA.** DECISIONS §5 #4 cites Clarion's "per-tab description + CTA" as the source pattern but does not state whether Meraki's panes carry a CTA. **Recommendation:** at most one shared "Get early access" link below the panes, not one per pane (§11). **Adopted** in specs/01 §7 row 4 and specs/03 §6.2.
9. **Concern: rail position cue.** DECISIONS §5 #8 specifies the scroll-snap rail but no indicator. The reference's lack of one is a defect (16 #6). **Recommendation (Provisional):** dots or an "n / 4" counter below 992.
10. **Muted-on-dark** `rgba(250,249,246,.78)` (DECISIONS §7) calculates to about 8.86:1 on `#172A46` and 7.55:1 on `#1F375C` (quick check). It still needs formal recording in 05 alongside every other text/background pair.
