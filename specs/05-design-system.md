# 05 — Design system (Meraki landing page)

| | |
|---|---|
| Status | Phase A documentation. Nothing is built: there is no code, no `globals.css` and no `brand.ts` yet. |
| Date | 2026-10-29 |
| Brand | "Meraki" is a **temporary** name. Every value below is **Provisional** until the owner approves it (open questions 4 and 8). |
| Source of truth | This document is canonical for design tokens; [specs/01](01-product-requirements.md) is canonical for scope and section map, and [specs/06](06-feature-status.md) for feature status. The Phase A decisions brief (2026-10-29; §7 design system, §5 section map) is not kept in the repo; its decisions are folded into these specs, and "brief §n" only names where a value came from. Deliberate changes to brief values are listed in §3.3 and §21. |
| Visual reference | Clarion Health homepage (https://www.clarionhealth.com/), captured 2026-10-29. |
| Related | Reference analysis: [specs/02-ui-ux-reference.md](02-ui-ux-reference.md) · Architecture: [specs/03-technical-architecture.md](03-technical-architecture.md) · Feature status classes: [specs/06-feature-status.md](06-feature-status.md). |

**Citation convention.** "ref: tokens.md §2.1" means a section of the verified reference analyses from the Phase A capture (2026-10-29): `structure.md`, `tokens.md`, `components.md` and `responsive.md`. These files and the raw evidence (screenshots, `clarion.css`, computed-style dumps) live in a temporary scratch area and are **not** committed, so the citations name the capture, not a path. Where an analysis has a "(verified-corrected)" value, this document uses the corrected value.

**What we take from Clarion.** We take the *relationships*: warm cream bases, one deep accent for dark bands, near-black warm ink, a light display serif with Geist body text, square cards, pill controls, no shadows and hard horizontal section cuts. We do **not** take its brand hexes, wordmark, healthcare copy, photos, illustrations, stats, logos, raster gradients or the trial font "Moderat Serif Trial" (ref: structure.md §6).

---

## 1. Principles

1. **Tokens only.** Components never contain raw hex values, font names or magic pixel sizes. Every value comes from `@theme` in `src/app/globals.css`, and all brand words come from `src/config/brand.ts`.
2. **Flat and calm.** There are no shadows and no rounded cards or bands. Surfaces are separated by colour blocks and 1px lines (ref: tokens.md §4).
3. **Accessible by default.** Text meets WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text and for UI parts). Every interactive element has a visible `:focus-visible` ring, which the reference lacks (ref: tokens.md §8; components.md §11). Touch targets are at least 44px.
4. **Honest previews.** Product previews are illustrative. Each one carries a visible caption, "Illustrative preview · sample data", and uses obviously fictional data (§13).
5. **Mobile first.** Layouts use `min-width` breakpoints and never scroll the page horizontally at any width.

---

## 2. Brand configuration

| Concern | Lives in | Contents | Never in |
|---|---|---|---|
| Name and words | `src/config/brand.ts` | The canonical shape from [specs/03](03-technical-architecture.md) §10.1: `name` ("Meraki"), `tagline`, `description` (meta), `nav` links (4: Product `#platform`, Features `#features`, How it works `#how-it-works`, Contact `#early-access`), `primaryCta` ("Get early access"), `secondaryCta` ("See how it works"), `submitLabel` ("Request early access"), `contact` (read from optional `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE`; may be absent), `social: []` (none exist), `logo: null`. No separate wordmark field: the wordmark is rendered from `name` | Component files, `site-content.ts` literals |
| Section copy and sample data | `src/config/site-content.ts` | Copy built by interpolating `brand.name`, the FAQ, tab data, and illustrative data flagged `illustrative: true` | Components |
| Colours, type, spacing, radii, breakpoints, easing | `@theme` in `src/app/globals.css` | All tokens in §§3–9 and the snippet in §19 | `brand.ts`, components |
| Font families | `src/app/layout.tsx` (next/font) | Newsreader and Geist loaded as CSS variables, then mapped to `--font-display` and `--font-sans` in `@theme inline` | `<link>` tags to Google Fonts, CDNs |
| Logo | — (none exists) | Text wordmark: `brand.name` set in `--font-display` 400 (open question 3) | Image files, until the owner supplies a logo |

### Rename procedure (when the final brand name is chosen)

1. Change `name`, `tagline` and `description` in `brand.ts` (the wordmark follows `name`).
2. Run `grep -rniw "meraki" src --exclude=brand.ts`. The expected result is no matches; any match is a hard-coded name that must move into config.
3. Optionally change `"name": "meraki-landing"` in `package.json` (internal only; it is not shown to users).
4. Check that the metadata title, the OG image text (`opengraph-image.tsx` reads `brand`), the footer wordmark, the © line and the preview chrome label (§13) all show the new name.
5. If the colours change, edit only the `--color-*` values in `@theme`, then re-run the contrast script (§3.3) and update the table in §3.3.

---

## 3. Colour

### 3.1 Core tokens

All values are **Provisional** (open question 4). The reference column shows Clarion's observed colour in the same role.

| Token | Meraki value | Derives from (observed reference value, evidence) | Usage |
|---|---|---|---|
| `--color-canvas` | `#FAF9F6` | `#fbfaf8` page background (ref: tokens.md §2.1) | Page background, footer, light sections |
| `--color-canvas-tint` | `#F3F1EA` | `#f6f5ec` alternate band and practice-card fill (ref: tokens.md §2.1) | Alternate bands (attention, why, FAQ), outcome cards, feature media panels, nav-sheet link hover |
| `--color-surface` | `#FFFFFF` | `#ffffff` nav pill and light button; `#fdfcfb` modal (ref: tokens.md §2.1) | Nav pill, light button, form card, inputs, preview frame |
| `--color-line` | `#E4E0D5` | `#e7e4da` logo-cell hairlines and nav hover pill (ref: tokens.md §2.1) | Decorative dividers, cell borders, preview table rules, card and frame borders, nav-link hover background |
| `--color-line-strong` | `#8C8476` (**new**) | No equivalent. The reference field border `#eeece3` fails non-text contrast (ref: components.md §9) | Borders of inputs, selects, textareas and checkboxes, which must reach 3:1 (WCAG 1.4.11) |
| `--color-rule` | `rgb(31 27 22 / .16)` (**new**) | `.revenue_stat` 2px left border at 10% of the text colour (ref: tokens.md §3) | Decorative 2px left rules in the problem and attention lists |
| `--color-ink` | `#1F1B16` | `#361700` warm dark-brown text (ref: tokens.md §2.1) | Body text, headings on light surfaces, icons |
| `--color-ink-muted` | `#5E574D` | `#361700` at opacity .6, which **fails AA** at 4.32:1 (ref: tokens.md §7) | Secondary text, card bodies, help text, captions, placeholders. It is a solid colour, never an opacity |
| `--color-accent-900` | `#172A46` (deep indigo) | `#072d35` deep teal: hero, compliance band, CTA (ref: tokens.md §2.1) | Hero band, getting-started band, final CTA, links on light surfaces, focus ring on light surfaces, checked checkbox, occupied bed tile |
| `--color-accent-800` | `#1F375C` | `#361700` / `#3c210c` dark platform panel (ref: tokens.md §2.1) | Platform tab panel, step cards on the accent-900 band, top of the hero gradient |
| `--color-accent-tint` | `#DCE6F2` | Raster mint gradient `#faf9f7 → #d0eaea` on the icon discs (ref: tokens.md §2.2) | Bottom stop of the icon-disc gradient, why-card wash, how-it-works wash, text selection |
| `--color-primary` | `#1F1B16` | `#3c210c` dark button (ref: tokens.md §5) | Dark pill button background |
| `--color-primary-hover` | `#3A332A` | `#684300` dark-button hover (ref: tokens.md §5; button-hover capture) | Dark pill hover. Like the reference, it is a lighter warm tone |
| `--color-on-dark` | `#FAF9F6` | `#fdfcfb` / `#fbfaf8` text on dark (ref: tokens.md §2.1) | Text and icons on accent and primary surfaces; focus ring on dark surfaces |
| `--color-on-dark-muted` | `rgb(250 249 246 / .78)` | `#fbfaf8` at .8 on dark cards (ref: tokens.md §1.4) | Secondary text on dark surfaces |
| `--color-highlight` | `#C98A2B` (saffron) | No direct equivalent. Clarion's brightest accent is the hover ochre `#684300` (ref: tokens.md §2.2) | **Dark surfaces only**, used sparingly: an optional accent rule or dot in the hero or final CTA. **Never text or a meaningful indicator on light surfaces** (fails; see §3.3). Not used for focus |

### 3.2 Status colours (product previews and form feedback)

| Token | Meraki value | Derives from | Usage |
|---|---|---|---|
| `--color-success` | `#2F6B4F` | None; Clarion has no status UI | "Paid" (recorded) chip text, the form success icon and rule |
| `--color-success-tint` | `#E6F0EA` (**new**) | — | Success chip and success message background |
| `--color-warning` | **`#8A5A12`** (adjusted from `#A86A12`) | — | "Due" chip text, the not-configured notice icon |
| `--color-warning-tint` | `#F8EEDC` (**new**) | — | Warning chip, not-configured banner |
| `--color-danger` | `#A23B2A` | `#e3342f` form error text in the reference modal (ref: components.md §9) | "Overdue" chip text, field error text, invalid-field border |
| `--color-danger-tint` | `#F7E6E2` (**new**) | — | Overdue chip and error-summary background |

Status is never shown by colour alone: every chip has a text label, and every bed-grid tile state has a text legend.

### 3.3 Contrast ratios (computed 2026-10-29)

Method: WCAG 2.x relative luminance, `(L1 + 0.05) / (L2 + 0.05)`. Opacity colours are first alpha-blended onto their background. Command used, with pairs passed in the same way:

```sh
node -e 'const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)),L=c=>{const[r,g,b]=c.map(v=>(v/=255)<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b},cr=(a,b)=>{const[x,y]=[L(h(a)),L(h(b))].sort((p,q)=>q-p);return((x+.05)/(y+.05)).toFixed(2)};console.log(cr("#5E574D","#F3F1EA"))'
# 6.31
```

Targets: **T** = text (4.5:1 normal; 3:1 for large text, meaning ≥24px regular or ≥18.66px bold). **UI** = non-text component or state indicator (3:1). **Dec** = decorative, no requirement.

| Foreground | Background | Ratio | Target | Result |
|---|---|---|---|---|
| ink `#1F1B16` | canvas `#FAF9F6` | 16.26 | T 4.5 | Pass |
| ink | canvas-tint `#F3F1EA` | 15.15 | T 4.5 | Pass |
| ink | surface `#FFFFFF` | 17.12 | T 4.5 | Pass |
| ink | accent-tint `#DCE6F2` (icon disc bottom) | 13.57 | UI 3 | Pass |
| ink-muted `#5E574D` | canvas | 6.77 | T 4.5 | Pass |
| ink-muted | canvas-tint | 6.31 | T 4.5 | Pass |
| ink-muted | surface | 7.13 | T 4.5 | Pass |
| ink-muted | accent-tint (why-card wash, worst case) | 5.65 | T 4.5 | Pass |
| ink-muted | line `#E4E0D5` (disabled button) | 5.40 | T 4.5 (disabled controls are exempt) | Pass |
| accent-900 `#172A46` (link text) | canvas / canvas-tint / surface | 13.70 / 12.76 / 14.42 | T 4.5 | Pass |
| on-dark `#FAF9F6` | accent-900 | 13.70 | T 4.5 | Pass |
| on-dark | accent-800 `#1F375C` | 11.34 | T 4.5 | Pass |
| on-dark-muted (.78, blends to `#C8CBCF`) | accent-900 | 8.86 | T 4.5 | Pass |
| on-dark-muted (.78, blends to `#CACED4`) | accent-800 | 7.55 | T 4.5 | Pass |
| Inactive tab: on-dark at .6 (blends to `#A2ABB8`) | accent-800 | 5.15 | T 3 (24–32px) | Pass. The reference uses .4, giving 3.58 (ref: tokens.md §7) |
| Button: on-dark on primary `#1F1B16` | — | 16.26 | T 4.5 | Pass |
| Button: on-dark on primary-hover `#3A332A` | — | 11.82 | T 4.5 | Pass |
| Button: ink on light button `#FFFFFF` | — | 17.12 | T 4.5 | Pass |
| Button: ink on light-button hover `#E4E0D5` | — | 12.98 | T 4.5 | Pass |
| Button: ink on ghost-on-dark hover `#F3F1EA` | — | 15.15 | T 4.5 | Pass |
| Ghost-on-dark border (on-dark at .5, blends to `#89929E`) | accent-900 | 4.58 | UI 3 | Pass |
| success `#2F6B4F` | success-tint `#E6F0EA` / surface / canvas | 5.40 / 6.29 / 5.98 | T 4.5 | Pass |
| **warning `#A86A12` (brief value)** | warning-tint `#F8EEDC` | **3.85** | T 4.5 | **Fail → adjusted** |
| warning `#8A5A12` (adjusted) | warning-tint / surface / canvas / canvas-tint | 5.14 / 5.91 / 5.62 / 5.23 | T 4.5 | Pass |
| danger `#A23B2A` | danger-tint `#F7E6E2` / surface / canvas / canvas-tint | 5.44 / 6.57 / 6.24 / 5.82 | T 4.5 | Pass |
| **highlight `#C98A2B`** | canvas / surface | **2.79 / 2.94** | T 4.5 or UI 3 | **Fail → restricted to dark surfaces** |
| highlight | accent-900 / accent-800 | 4.91 / 4.07 | UI 3 | Pass (decorative or UI use only on dark) |
| Focus ring: accent-900 | canvas / canvas-tint / surface | 13.70 / 12.76 / 14.42 | UI 3 | Pass |
| Focus ring: on-dark | accent-900 / accent-800 | 13.70 / 11.34 | UI 3 | Pass |
| line-strong `#8C8476` (input border) | surface / canvas / canvas-tint | 3.70 / 3.51 / 3.27 | UI 3 | Pass |
| line `#E4E0D5` | canvas / surface | 1.25 / 1.32 | Dec | Decorative only; it must never be the sole boundary of a control |
| Dark-panel divider: on-dark at .12 | accent-800 | 1.41 | Dec | Decorative (the reference renders `#4a2e1a` on `#361700`) |

**Adjustments made in this document:**

1. `--color-warning` changes from `#A86A12` to `#8A5A12` (3.85 → 5.14 on its tint).
2. `--color-highlight` keeps the brief's value but is restricted to dark surfaces and non-text use.
3. `--color-line-strong` is added, because `--color-line` cannot mark input boundaries.
4. Inactive tab opacity is set to .6, not the reference's .4.

### 3.4 Gradients (CSS only; the reference uses raster AVIF images)

| Name | Meraki value | Derives from | Usage |
|---|---|---|---|
| Hero band | `linear-gradient(180deg, var(--color-accent-800) 0%, var(--color-accent-900) 70%)` | Hero overlay `linear-gradient(#072d3500 18%, #072d35 92%)` (ref: tokens.md §2.2) | Hero background. There is no photo (open question 3) |
| Final CTA | ≥768: `linear-gradient(139deg, var(--color-accent-900) 12%, var(--color-accent-800) 100%)`. <768: `160deg` | CTA overlay at 139° (base) and 160° (≤767) (ref: tokens.md §2.2) | Final CTA band |
| Icon disc | `linear-gradient(180deg, var(--color-canvas-tint) 0%, var(--color-accent-tint) 100%)` | `.revenue_icon` raster, top `#faf9f7` to bottom `#d0eaea` (ref: tokens.md §2.2) | Problem-row icon discs |
| Card wash | `radial-gradient(120% 80% at 0% 100%, color-mix(in srgb, var(--color-accent-tint) 70%, transparent), transparent 60%)` | `.choose_card-gradient` mint wash at the lower left (ref: tokens.md §2.2) | Why cards |
| Section wash | `radial-gradient(60% 50% at 100% 100%, color-mix(in srgb, var(--color-accent-tint) 60%, transparent), transparent 70%)` | `.integrations_gradient` glow at the lower right (ref: tokens.md §2.2) | How-it-works background (optional) |

---

## 4. Typography

### 4.1 Families (loaded with next/font, self-hosted at build time, no runtime Google request)

| Token | Meraki value | Derives from | Usage |
|---|---|---|---|
| `--font-display` | **Newsreader** (Google Fonts, OFL), variable `wght` and `opsz`. Loaded with `Newsreader({ subsets: ["latin"], axes: ["opsz"], variable: "--font-newsreader", display: "swap" })`; `font-optical-sizing: auto` | Moderat Serif Trial Light 300 (H2s) **and** Bpmf Zihi Kai Std 400 (H1, H3, tabs, stats), two near-identical serifs merged into one free family (ref: tokens.md §1.1–1.2). Moderat is a trial licence and is not used | H1, H2, H3, tab labels, preview numerals, wordmark |
| `--font-sans` | **Geist** (Google Fonts, OFL). Loaded with `Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })` | Geist, the same family as the reference (ref: tokens.md §1.1) | Body, buttons, navigation, forms, previews, captions |
| Fallbacks | display: `"Iowan Old Style", Georgia, serif`; sans: `ui-sans-serif, system-ui, sans-serif` | — | Shown before the fonts load; next/font adjusts fallback metrics to limit layout shift |

Weights in use: Newsreader **300** (H2) and **400** (H1, H3, tabs, numerals, wordmark). Geist **400** (body, buttons) and **500** (nav links, labels, eyebrows, chips, captions). No other weights are used. Neither family covers Devanagari (open question 8).

### 4.2 Scale

Fluid sizes are `clamp()` values fitted to the reference's observed sizes at 390, 768 and 1024px (ref: responsive.md §2, §5). "Min at / max at" is the viewport width where the clamp reaches its floor or ceiling.

| Token | Size | Min at / max at | Computed at 390 · 768 · 992 · 1440 | Line height | Letter spacing | Family / weight | Derives from (observed) | Usage |
|---|---|---|---|---|---|---|---|---|
| `--text-h1` | `clamp(2.5rem, 1.75rem + 2.34vw, 4rem)` | ≤513px / ≥1538px | 40 · 46.0 · 51.2 · 61.7px | 1.1 | −0.03em | Newsreader 400 | Hero H1: the same clamp, 61.7px at 1440 and 40px at 390 (ref: tokens.md §1.4) | Hero H1 only |
| `--text-h2` | `clamp(2.25rem, 1.79rem + 1.89vw, 3rem)` | ≤389px / ≥1024px | 36 · 43.2 · 47.4 · 48px | 1.1 | −0.02em | Newsreader 300 | `.heading-3xl`, stepped 36/44/48px (ref: responsive.md §2). Meraki makes it fluid | Section H2s |
| `--text-cta` | `clamp(2.5rem, 2.19rem + 1.26vw, 3rem)` | ≤394px / ≥1029px | 40 · 44.7 · 47.5 · 48px | 1.1 at ≥992; **1.2 at <992** | −0.03em | Newsreader 400 | `.h2-2.cc-cta`: 40/44/48px, line height 1.2 at ≤991 (ref: tokens.md §1.4) | Final CTA H2 |
| `--text-tab` | `clamp(1.5rem, 1.19rem + 1.26vw, 2rem)` | ≤394px / ≥1029px | 24 · 28.7 · 31.5 · 32px | 1.1 | −0.03em | Newsreader 400 | `.platform_tab`: 24/26/32px (ref: tokens.md §1.4) | Platform tab labels |
| `--text-h3` | `1.5rem` (24px), fixed | — | 24px | 1.1 | −0.02em (the reference uses −0.03em with Bpmf; tune for Newsreader) | Newsreader 400 | `.h3-2`: 24/26.4px at every width (ref: tokens.md §1.4) | Card, feature-row and step titles; FAQ question text is Geist (below) |
| `--text-lead` | `1.125rem` (18px) | — | 18px | 1.5 | −0.01em | Geist 400 | **New**; the reference lead is 16px | Hero sub only |
| `--text-body` | `1rem` (16px) | — | 16px | 1.5 | −0.01em | Geist 400 | `.paragraph-body` 16/24 (ref: tokens.md §1.4) | Body, section subs, FAQ questions (Geist 500) and answers, buttons (line height 1.4) |
| `--text-small` | `0.875rem` (14px) | — | 14px | 1.5 | −0.01em | Geist 400 | Card body 14/21 (ref: tokens.md §1.4) | Card bodies, help text, field errors, footer legal |
| `--text-caption` | `0.8125rem` (13px) | — | 13px | 1.4 | 0 | Geist 500 | Eyebrow .8rem (ref: tokens.md §1.3) | Preview sample-data caption, step counters, character counters, labels inside previews |
| `--text-eyebrow` | `0.8125rem`, uppercase | — | 13px | 1.2 | 0.1em | Geist 500 | `.eyebrow-2` (Geist 500, .1em, uppercase), defined but unused in the reference (ref: tokens.md §1.4) | Optional, at most one per section header. Do not overuse |
| `--text-preview` | `0.8125rem` body; `0.75rem` minimum | — | 13 / 12px | 1.4 | 0 | Geist 400/500 | — | Text inside product previews. **Never below 12px** |
| `--text-preview-num` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | ≤400px / ≥1200px | 20 · 23.7 · 26 · 28px | 1.1 | −0.02em | Newsreader 400, `tabular-nums` | Stat numerals `.revenue_stat-value` 32px (ref: tokens.md §1.4). In Meraki these appear only inside illustrative previews | Summary-tile values (sample data) |
| Nav link | `1rem` | — | 16px | 1 | 0 | Geist 500 | `.nav-link` 500 16px (ref: tokens.md §1.4) | Nav pill links; 18px in the mobile sheet |

### 4.3 Measure and line-length rules

| Element | Rule | Derives from |
|---|---|---|
| Hero H1 | `max-width: 12em; text-wrap: balance`. This gives two lines ("Run your hostel. / Not your paperwork.") of about 17–19 characters at ≥768. The width is in `em`, so line breaks stay stable as the size scales | Hero copy box 48ch, 2 lines of about 17 characters (ref: tokens.md §1.5; responsive.md §5 recommends em) |
| Section H2 (centred) | `max-width: 16em; text-wrap: balance; margin-inline: auto`. Target 1–2 lines and 3–8 words | H2s of 16–19 characters per line, 2–4 words (ref: tokens.md §1.5) |
| Section H2 (in a split) | Limited by its column (4 of 12 columns at ≥992). `text-wrap: balance` | 434px revenue column (ref: structure.md §4) |
| Final CTA H2 | `max-width: 12em; text-wrap: balance`; line height 1.2 below 992, 1.1 from 992. Meraki's 31-character line ("Make hostel management simpler.") wraps to about 2 lines at every width; no line count is required | CTA content 50ch, 3 lines of about 19 characters for a 56-character line (ref: tokens.md §1.5) |
| Hero sub and section subs | `max-width: 36rem` (576px), about 60–70 characters; `text-wrap: pretty` | Hero subhead max 36.9375rem (ref: tokens.md §3) |
| Body paragraphs and FAQ answers | `max-width: 65ch` | Body leads at 55–70 characters per line (ref: tokens.md §1.5) |
| Card bodies | Limited by the card; aim for 2–3 lines; `max-width: 37ch` inside why cards so text clears the badge | `.choose_card` copy max 37ch at ≤767 (ref: components.md §3.3) |
| Headings that wrap to 4 or more lines on mobile | Line height rises to 1.2 | Reference CTA behaviour (ref: responsive.md §5) |
| Numerals (previews, ₹ amounts) | `font-variant-numeric: tabular-nums`; ₹ formatted with `Intl.NumberFormat("en-IN")` (₹8,500; ₹1,25,000) | — |

---

## 5. Spacing

Base unit is 4px. Tailwind v4's default `--spacing: 0.25rem` gives every multiple of 4px as a utility (`p-6` = 24px), so no custom numeric scale is needed. The named tokens below hold the values that carry the page's rhythm.

| Token | Meraki value | Derives from (observed) | Usage |
|---|---|---|---|
| `--spacing` | `0.25rem` (4px) | Values cluster on a 4/8px base: 4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 96, 100 (ref: tokens.md §3) | All utilities |
| `--spacing-section` | `clamp(3rem, 1.79rem + 4.95vw, 6.25rem)`: 48px at ≤391, 67 at 768, 78 at 992, 100 at ≥1442 | 100px at **every** width, because the reference's responsive override is scoped to `h1,h2,h3` by mistake (ref: responsive.md §0.3). Meraki applies the intended reduction | Top and bottom padding of every section |
| `--spacing-gutter` | `clamp(1.25rem, 0.75rem + 2.2vw, 2.5rem)`: 20px at ≤364, 29 at 768, 34 at 992, 40 at ≥1273 | Container 96% / 88%, giving gutters of 20.5px at 1024 and 46px at 768. The dip at 1024 is a reference defect (ref: responsive.md §0.4) | Container inline padding |
| `--spacing-header` | `3.5rem` (56px) at ≥768; `2.5rem` (40px) below | Header to content: margin-bottom 3.5rem, 2.5rem at ≤767 (ref: tokens.md §3) | Centred section header to content |
| `--spacing-gap-main` | `2.5rem` (40px) | `--grid--gap-main` 40px (ref: tokens.md §3) | 12-column grid gutter, split columns |
| `--spacing-gap-md` | `1.25rem` (20px) | `row-gap-md` 20px, used by the choose cards (ref: tokens.md §3) | Why cards, form field gap, step rail (≥768: 24px; see §15) |
| `--spacing-gap-sm` | `0.5rem` (8px) | `row-gap-sm` 8px, used by the practice cards (ref: tokens.md §3) | Outcome cards |
| `--spacing-card` | `1.5rem` (24px); small cards `1.25rem` (20px) | Practice card 1.5rem; choose card 1.25rem (ref: tokens.md §3) | Card padding |
| `--spacing-stack` | `1rem` (16px) within cards; `1.5rem` (24px) between a header block and its body | Card internal gap 1rem / 1.5rem (ref: tokens.md §3) | Vertical rhythm inside components |
| `--spacing-btn-group` | column gap `1rem` (16px), row gap `0.75rem` (12px) | `.hero_btn-group` 1rem / .75rem (ref: tokens.md §5) | Button pairs |
| `--spacing-nav-offset` | `5.5rem` (88px) | Nav top 8px + height 56px (ref: tokens.md §4), plus 24px of air | `scroll-margin-top` on every anchored section; hero top padding is `calc(var(--spacing-nav-offset) + var(--spacing-section) * .5)` |

---

## 6. Content widths and grid

| Token / rule | Meraki value | Derives from (observed) | Usage |
|---|---|---|---|
| `--container-site` | `87.5rem` (1400px) | `.container` max-width 87.5rem (ref: tokens.md §3) | Content width cap |
| Container | `width: min(100% - 2 * var(--spacing-gutter), var(--container-site)); margin-inline: auto` | 96% / 88% widths (ref: tokens.md §3). Meraki uses one fluid gutter instead (ref: responsive.md §5) | Every section's inner wrapper |
| Grid | 12 columns at ≥992, gap `--spacing-gap-main`; a single column below 768 unless a section says otherwise | `.row`/`.col` 12-column system (ref: tokens.md §3) | Splits |
| Narrow column | `max-width: 48rem` (768px), centred | `col-lg-8` integrations header (ref: structure.md §5) | FAQ list, centred section headers |
| Form card | `max-width: 35rem` (560px) | Modal card 560px (ref: components.md §9) | Early-access form |

**Column splits by section.** The numbers in brackets are grid columns at ≥992 unless noted.

| Section (`id`) | <768 | 768–991 | ≥992 | ≥1200 |
|---|---|---|---|---|
| `hero` | Centred stack; preview at full container width | Same | Same; preview `max-width: 70rem` | Same |
| `problem` | 1 column of 4 items | 2 × 2 | 4-up (3 columns each) | 4-up |
| `outcomes` | 1 column, gap 8px | 2 + 1 (third card spans both columns, as in the reference; ref: components.md §3.1) | 3-up (4 columns each), gap 8px | 3-up |
| `platform` | Stacked: heading → tab list (horizontal scroll) → panel with description, CTA and preview | Stacked | Inset split `1fr 1fr`: preview media left, dark panel right | Same |
| `attention` | Stacked: text then preview | Stacked | Asymmetric 4 / 7: text in columns 1–4, preview in columns 6–12 | Same |
| `features` | Stacked: text then media | Stacked | 5 / 7 (text in 5, media in 7), alternating sides per row | Same |
| `how-it-works` | 1-column vertical flow of 5 cells | 5-up row of cells | 5-up row (`max-width: 62rem`, centred) | Same |
| `getting-started` | Horizontal rail of 18rem cards | Rail of 22rem cards | 4-up grid (3 columns each) | Same |
| `why` | 1 column | 2 × 2 | 2 × 2 | 4-up (3 columns each); 4-up at 1024 is too cramped (ref: responsive.md §3, defect 3) |
| `early-access` | Stacked: intro then form card | Stacked; form card centred | 5 / 7: intro in columns 1–5, form card in columns 7–12 | Same |
| `faq` | Narrow column | Narrow column | Narrow column (48rem) | Same |
| `final-cta` | Left-aligned stack | Same | Content in columns 1–6 | Same |
| Footer | Stacked, left-aligned, wordmark last (as in the reference ≤767) | Stacked | Wordmark in columns 1–4; three link columns in columns 6–12 | Same |

---

## 7. Borders and radii

| Token | Meraki value | Derives from (observed) | Usage |
|---|---|---|---|
| `--radius-pill` | `2.5rem` (40px) | `.button-primary` radius 40px (ref: tokens.md §4) | All buttons, **including the form submit**. The reference uses a mismatched 12px radius on its form button (ref: components.md §2.1); Meraki keeps one radius system |
| `--radius-nav` | `8.5rem` (136px) | Nav pill radius 136px (ref: tokens.md §4) | Nav pill, nav-link hover pill (`9999px`), hamburger |
| `--radius-sheet` | `1rem` (16px) | Mobile menu panel 1rem (ref: tokens.md §4) | Mobile nav sheet |
| `--radius-form` | `1rem` (16px) at every width | Modal 16px, 0 at ≤479 (ref: tokens.md §4). The reference goes square on phones only because its modal fills the screen; Meraki's form card is inline | Form card |
| `--radius-input` | `0.75rem` (12px) | Field radius .5rem (ref: components.md §9), raised to 12px per the brief | Inputs, selects, textareas, error summary, notice banner |
| `--radius-preview` | `0.75rem` (12px). **Deliberate deviation**: product UI needs subtle rounding to read as software | Raster UI chips of about 8–12px baked into images (ref: tokens.md §4) | Preview frame. Inner tiles use 8px, bed cells 4px |
| `--radius-checkbox` | `0.25rem` (4px) | Dropdown .25rem (ref: tokens.md §4) | Checkbox |
| Cards, bands, images, feature media panels | **0** (square) | Square corners on every card and band (ref: tokens.md §4) | Outcome, why, step and feature cards; every section band |
| Icon discs, why badge, chips | `9999px` (full circle or pill) | Icon circles are full circles (ref: tokens.md §4) | Discs, badges, status chips |
| Border widths | 1px for lines, dividers, inputs and frames; 2px for left-rule list motifs and the invalid-field border | 1px `#e7e4da` cells; 2px `.revenue_stat` left rule (ref: tokens.md §3) | — |

---

## 8. Shadows and elevation

| Token | Meraki value | Derives from (observed) | Usage |
|---|---|---|---|
| `--shadow-*` | **None**. Reset Tailwind's defaults (`--shadow-*: initial`) so shadows cannot slip in | No visible shadows on the homepage (ref: tokens.md §4) | — |
| Preview separation | `border: 1px solid var(--color-line)` on `--color-surface` | Flat colour blocks (ref: tokens.md §4) | Preview frames. On dark bands the frame is also surface with a line border, so it separates by value |
| Nav separation | 1px `--color-line` border on the white pill | The reference pill has no edge over light sections, a noted weakness (ref: components.md §1.5) | Nav pill |
| Mobile sheet separation | 1px `--color-line` border | The reference panel matches the page background (ref: responsive.md §5) | Nav sheet |
| Z-index | skip link 60 · nav 50 · nav sheet 49 · content auto | Nav z-index 999 (ref: components.md §1.1) | — |

---

## 9. Buttons

### 9.1 Base

| Property | Meraki value | Derives from (observed) |
|---|---|---|
| Height | **42px** on fine pointers (16px × 1.4 line height + 9px × 2 padding + 1px × 2 border). **44px** under `@media (pointer: coarse)` (`min-height: 44px`). This is a **deviation** to meet the touch-target size | 42px computed height (ref: tokens.md §5) |
| Padding | `0.5625rem 1rem` (9px 16px) | Same (ref: tokens.md §5) |
| Type | Geist 400, 16px, line height 1.4, −0.01em | Same (ref: tokens.md §5) |
| Radius / border | `--radius-pill`; 1px border (transparent unless the variant says otherwise) | Same (ref: tokens.md §5) |
| Icon | Optional 16px inline SVG, gap 6px (`0.375rem`) | `.button-primary_icon` 16×16, gap .375rem (ref: tokens.md §5) |
| Width | Natural width. **Full width below 480px** for in-content CTAs; the nav CTA is never full width | `.button-primary { width: 100% }` at ≤479; nav CTA stays 96px (ref: components.md §2.1) |
| Transition | `background-color, color, border-color` 300ms `--ease-out-quart`. The reference snaps colour and border at 0s; Meraki eases all three | `background-color .3s cubic-bezier(.165,.84,.44,1)` (ref: tokens.md §5) |
| Hover | Background (and text) change only. No lift, scale or shadow | `button-hover.json`: no transform, no shadow (ref: tokens.md §5) |

### 9.2 Variants

| Variant | Surface | Rest | Hover | Derives from |
|---|---|---|---|---|
| `primary-dark` | Light surfaces: nav CTA, the centred "Get early access" below the why cards | bg `--color-primary`, text `--color-on-dark`, border same as bg | bg `--color-primary-hover` | Filled dark `#3c210c` → `#684300` |
| `primary-light` | Dark surfaces: hero "Get early access", final CTA, platform panel | bg `--color-surface`, text `--color-ink` | bg `--color-line` (`#E4E0D5`) | White default → `#cbc6bc` |
| `ghost-on-dark` | Dark surfaces: hero "See how it works" → `#how-it-works` | transparent; text `--color-on-dark`; border 1px `--color-on-dark` at .5 opacity | bg `--color-canvas-tint`, text `--color-ink` | Outline on dark → `#eeece3` |
| `ghost-on-light` | Light surfaces | transparent; text and border `--color-ink` | bg `--color-primary`, text `--color-on-dark` | Outline on light (defined, unused in the reference) |

### 9.3 Sizes

| Size | Height | Padding | Use |
|---|---|---|---|
| `md` (default) | 42px (44px on coarse pointers) | 9px 16px | All CTAs |
| `lg` | 48px | 12px 24px | Form submit "Request early access" (matches the 48px input height) |

### 9.4 States

| State | Treatment |
|---|---|
| `:focus-visible` | `outline: 2px solid var(--focus-ring); outline-offset: 2px`. `--focus-ring` is `--color-accent-900` on light surfaces and `--color-on-dark` inside any `[data-surface="dark"]` container. The reference has no button focus style (ref: tokens.md §8) |
| `:active` | Same as hover. No transform |
| Disabled (`disabled` or `aria-disabled="true"`) | bg `--color-line`, text `--color-ink-muted`, border transparent, `cursor: not-allowed`, no hover change. Ghost variants: text and border at `--color-ink-muted` |
| Loading (form submit) | Button `disabled` + `aria-busy="true"` (duplicate-submit guard). Label changes to "Sending…" with a 16px spinner icon before it; the width is held with `min-width` set to the rest width. Under reduced motion the spinner does not rotate; the label text alone carries the state. A separate `aria-live="polite"` status region announces the outcome (lead-capture rules: [specs/01](01-product-requirements.md) FR-34–FR-41) |
| Link styled as button | Same visuals; uses `<a>` for in-page anchors such as `#early-access`, and `<button>` only for actions |

---

## 10. Form controls (early-access form)

Fields come from [specs/01](01-product-requirements.md) §8.5 (brief §5 row 10): full name, property or business name, phone and email (at least one is required), city, approximate beds (select), number of properties (select), biggest challenge (optional textarea, 500 characters), consent checkbox (unticked) and a hidden honeypot `website`.

| Element | Spec | Derives from (observed) |
|---|---|---|
| Form card | bg `--color-surface`; 1px `--color-line` border; `--radius-form`; padding 40px (24px below 480); max-width 35rem; field gap 20px | Modal card 560px, 40px padding, 16px radius (ref: components.md §9) |
| Label | `<label for>` always visible above the field; Geist 500, 14px, ink; 6px gap to the control. Required fields show the visible text "(required)" after the label (e.g. "Full name (required)") in ink-muted, per 01 FR-31; no asterisk-only marking | Labels are `div` 12px in the reference, an a11y defect (ref: components.md §11) |
| Input | Height 48px; padding 12px 16px; Geist 400, **16px** (prevents iOS zoom on focus); bg surface; 1px `--color-line-strong` border; `--radius-input`. `autocomplete` set (`name`, `organization`, `tel`, `email`, `address-level2`); `inputmode="tel"` for phone | Field height 3rem, padding .875rem 1rem (ref: components.md §9) |
| Placeholder | `--color-ink-muted`; examples only (for example "e.g. Pune"). Never a substitute for a label | — |
| Select | Same box as input; `appearance: none`; 20px inline SVG chevron 16px from the right; padding-right 44px | — |
| Textarea | Same box; `min-height: 7.5rem`; `resize: vertical`; counter "0 / 500" below on the right in `--text-caption` ink-muted, announced politely only at 450 and 500 | — |
| Checkbox | 20px box, `--radius-checkbox`, 1.5px `--color-line-strong` border, bg surface. Checked: bg `--color-accent-900` with a 14px `--color-on-dark` check icon. The whole label row is the hit target (min 44px tall). The label is 14px ink and links to `/privacy` (accent-900, underlined) | — |
| Help text | `--text-small`, ink-muted, below the control, linked with `aria-describedby` | — |
| Hover | Border `--color-ink-muted` | Hover border change (ref: components.md §9) |
| Focus | Border `--color-accent-900` + `outline: 2px solid var(--focus-ring); outline-offset: 2px` | — |
| Error (field) | `aria-invalid="true"`; 2px `--color-danger` border (padding reduced by 1px so nothing shifts); message below in `--text-small` `--color-danger` with a 16px warning icon, linked by `aria-describedby`. Messages say how to fix the problem ("Enter a 10-digit mobile number or an email address") | Reference error text `#e3342f` at 13px (ref: components.md §9) |
| Error summary | Shown at the top of the card after a failed submit; bg `--color-danger-tint`, 2px left rule `--color-danger`, `--radius-input`, padding 16px; heading "Please fix the following" plus a list of links to the fields; `tabindex="-1"`, receives focus | — |
| Success | Replaces the form only on HTTP 200 + `{ ok: true }`. Panel: bg `--color-success-tint`, 2px left rule `--color-success`, 24px check icon in success, H3 in ink, body in ink. Receives focus | The reference's Lottie success state is dropped (ref: components.md §9) |
| Not-configured notice | When lead capture is not enabled ([specs/03](03-technical-architecture.md) §9.4): banner above the fields, bg `--color-warning-tint`, ink text, 20px warning icon in `--color-warning`, `--radius-input`. The fields sit in a **disabled `<fieldset>`** (Disabled field styling below) and the submit button is disabled, so the form cannot be submitted. Copy and fallback rules: [specs/01](01-product-requirements.md) FR-37 | — |
| Disabled field | bg `--color-canvas-tint`, text ink-muted, border `--color-line` | — |
| Sizes | One size (48px). The form is the page's only form | — |
| Honeypot | Visually hidden with `position: absolute; left: -10000px`, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden="true"`. Not `display: none` | — |

---

## 11. Cards

| Card | Spec | Derives from (observed) |
|---|---|---|
| **Outcome card** (`outcomes`, 3 cards) | bg `--color-canvas-tint`; radius 0; no border or shadow; padding 24px (≥992) or 32px 24px (<992); vertical gap 16px. Illustration area 250px tall at ≥768 and 200px below, holding a mini-UI built in HTML/SVG (bed grid, rent-ledger rows, record card) styled with the preview tokens from §13. Title H3; body `--text-small` ink-muted. No hover state | `.practice-card-item` `#f6f5ec`, padding 1.5rem, image 250px → 200px (12.5rem at ≤767) (ref: components.md §3.1) |
| **Why card** (`why`, 4 cards) | bg `--color-canvas` + card wash (§3.4); radius 0; padding 20px; `height: 20rem` at ≥768 (`min-height: 16rem; height: auto` below); `position: relative; overflow: hidden`. **Clipped badge:** a `--color-surface` circle at bottom-right, `bottom/right: -2.5rem`, padding 2.5rem around a 4rem icon (9rem circle); below 992: padding 2rem, icon 3rem, offsets −1.5rem. Copy at the top, max 37ch. Badge `aria-hidden` | `.choose_card` 25rem tall, padding 1.25rem, white badge with padding 3rem at −2.5rem, icon 6rem (ref: components.md §3.3). Shortened because Meraki's copy is short |
| **Feature row** (`features`, max 3 rows) | Grid 5/7 at ≥992, sides alternating. Text side: H3, one sentence in `--text-body`, then 2–3 bullets with a 6px square `--color-ink` marker (**not** check marks, which would imply "done"). Media side: `--color-canvas-tint` panel, radius 0, padding `clamp(1.5rem, 1rem + 2vw, 3rem)`, containing a preview frame (§13). Row gap `--spacing-section` | Derived from the platform split geometry (ref: structure.md §3) and the card imagery (ref: components.md §3.1). Clarion has no equivalent |
| **Step card** (`getting-started`, 4 cards) | On the `--color-accent-900` band. bg `--color-accent-800`; radius 0; padding 24px; `min-height: 16rem`. Top: "Step 1 of 4" in `--text-caption` on-dark-muted (this also serves as the rail position indicator). Then an optional 40px line icon in on-dark, an H3 sentence headline ("We get in touch…", "You try Meraki early…") in on-dark, and the body in `--text-small` on-dark-muted | `.implementation_card` on `#361700`: sentence headlines, body at .8 (ref: components.md §3.5). The 450px photo area is dropped (no imagery) |
| **Problem item** (`problem`, 4 items) | Not a card. 2px left rule `--color-rule`, padding-left 16px; 56px icon disc (gradient §3.4, 28px icon); label in Geist 500 16px; one-line pain point in `--text-small` ink-muted | `.revenue_stat` 2px left rule + padding-left 1rem (ref: tokens.md §3) |
| **Attention list item** (`attention`) | Same left-rule motif on `--color-canvas-tint`: label (Geist 500) + one line. Labels only, no numbers | `.revenue_stat` pattern (ref: structure.md §4) |
| **How-it-works cell** | 1px `--color-line` border, collapsed with `margin-left: -1px` (≥768) or `margin-top: -1px` (<768); bg `--color-canvas`; min-height 5rem; padding 16px; content centred. Step number in `--text-caption` ink-muted plus the label in Geist 500. At ≥768 a 16px arrow icon (`aria-hidden`) sits on each shared border: `position: absolute; right: -9px; top: 50%; translate: 0 -50%`, bg `--color-canvas`, z-index 1, so it masks the line without pushing cells apart (cells are `position: relative`). No arrow after the last cell or below 768 | `.logo-cell` 182.9 × 80px, 1px `#e7e4da`, `margin-right: -1px` (ref: tokens.md §3, verified-corrected) |
| **FAQ row** | `<details>`/`<summary>` (preferred, zero JS) or button + region. 1px `--color-line` top border (and bottom on the last row). Summary: Geist 500, 18px, ink, padding 20px 0, min-height 44px, 20px chevron on the right that rotates 180°. Answer: `--text-body` ink-muted, max 65ch, padding-bottom 20px | Clarion has no FAQ. Divider style from `#e7e4da` hairlines (ref: tokens.md §2.1) |

---

## 12. Navigation

### 12.1 Pill (≥992)

| Property | Meraki value | Derives from (observed) |
|---|---|---|
| Wrapper | `position: fixed; top: 8px; inset-inline: 0; padding-inline: 24px` (16px below 768); z 50 | `.nav-v2.cc-pill` top .5rem, padding 0 1.5rem → 1rem at ≤767 (ref: components.md §1.1) |
| Pill | bg `--color-surface`; 1px `--color-line` border; `--radius-nav`; height 56px; `max-width: 54.5rem` (872px); padding 0 10px 0 24px (0 8px 0 16px below 992). It does not change on scroll | Pill 872 × 56, radius 136px, padding 0 .625rem 0 1.5rem (ref: tokens.md §4) |
| Wordmark | `brand.name` in Newsreader 400, 22px, ink; links to `#hero` (01 FR-10); `aria-label` = `brand.name` + " home" | Logo inline SVG left (ref: components.md §1.1) |
| Links | Exactly 4, centred in the pill (`position: absolute; left: 50%; translate: -50%`), gap 4px. Geist 500 16px ink; padding 11px 16px; radius 9999px; hover bg `--color-line` (text stays ink, 12.98:1); 300ms colour and background transition. `@media (pointer: coarse) { min-height: 44px; padding-block: 14px }` (fits inside the 56px pill). No dropdown | `.nav-link` 500, padding .7em 1em, hover `#e7e4da` (ref: components.md §1.2) |
| CTA | `primary-dark` md, "Get early access" → `#early-access`. Visible at every width | Nav "Try it out" dark pill (ref: components.md §1.1) |
| Current section | Not shown (single page with no scroll-spy). Optional later | The reference shows none |
| Skip link | First focusable element: "Skip to content" → `#main`. Hidden until focused, then fixed top-left at 8px, `primary-dark` styling, z 60 | `.nav-skip-link` pattern, whose target `<main>` is missing in the reference (ref: components.md §11) |

### 12.2 Mobile sheet (<992)

| Property | Meraki value | Derives from (observed) |
|---|---|---|
| Bar contents | Wordmark · CTA (`primary-dark`, natural width) · menu button | CTA stays beside the hamburger (ref: components.md §1.4) |
| Menu button | `<button aria-expanded aria-controls="nav-sheet" aria-label="Open menu">` (label changes to "Close menu"); 44 × 44px; radius 9999px; three 20 × 1.5px ink bars stacked with 4.5px gaps (6px centre-to-centre) so `translateY(±6px)` meets at the middle bar, morphing to an X (`translateY(±6px) rotate(±45deg)`, middle bar fades) over 300ms `--ease-out-quart`; focus ring per §9.4 | `div` hamburger, 40 × 43px (below target), X morph .3s (ref: components.md §1.4; responsive.md §3 defect 8) |
| Sheet | `position: fixed`; top = pill bottom + 8px; `inset-inline: 16px` (24px at ≥768); `max-height: calc(100svh - 5.5rem)`; `overflow-y: auto`; bg `--color-canvas`; 1px `--color-line` border; `--radius-sheet`; padding 8px | Panel 90vw, `calc(100svh - 4rem)`, 1rem radius, `#fbfaf8` (ref: tokens.md §4) |
| Sheet links | Stacked, full width; Geist 500 18px; min-height 48px; padding 12px 16px; radius 12px; hover bg `--color-canvas-tint`. Selecting a link closes the sheet and scrolls to the section | Links stacked left (ref: components.md §1.4) |
| Behaviour | Focus moves to the first link on open; focus is trapped in the bar + sheet; Esc and outside click close it; focus returns to the menu button; body scroll is locked (`overflow: hidden` on `<html>`) | `body:has(.w--open){overflow:hidden}` (ref: components.md §1.4) |
| Motion | Opacity 0 → 1 and `translateY(-8px)` → 0 over 200ms `--ease-out-quart`; none under reduced motion | The reference panel appears instantly (`data-duration="0"`) |

### 12.3 Footer links

| Property | Meraki value | Derives from (observed) |
|---|---|---|
| Links | Geist 400, 16px, ink; column gap 4px; hover underline. Below 992: `display: inline-flex; align-items: center; min-height: 44px` so each link is a full touch target | Footer link columns, 16/24 (ref: components.md §10) |

---

## 13. Product preview styling

Previews are coded HTML/SVG and show **illustrative sample data only**. They render through `PreviewFrame` and its variants (DashboardPreview, OccupancyGrid, RentLedger, TenantList, OpsList).

| Part | Spec |
|---|---|
| Semantics | `<figure data-preview>` with a `<figcaption>`. The mock UI inside is `aria-hidden="true"` and `inert`, with no focusable elements and no links. The figcaption holds the visible caption plus a visually hidden one-sentence summary ("Sample dashboard showing vacant beds, rent due and recent payments for a fictional hostel") |
| Caption (required) | Text "Illustrative preview · sample data" in `--text-caption` (13px, Geist 500), always visible, placed **below** the frame and left-aligned. Colour ink-muted on light surfaces and on-dark-muted on dark. It is never overlaid on the frame, so it cannot be cropped |
| Frame | bg `--color-surface`; 1px `--color-line` border; `--radius-preview` (12px); `overflow: clip`; no shadow |
| Chrome bar | 40px tall; bg `--color-canvas`; 1px bottom `--color-line`; left: `brand.name` in Newsreader 15px plus an obviously fictional property name with no real city in `--text-preview` ink-muted (for example "Sample: Example Residency (demo)"). No fake URL bar, browser dots or app-store marks |
| Sidebar (only when the container is ≥48rem) | 180px; bg `--color-canvas`; right border line; nav items in Geist 13px, active item bg `--color-canvas-tint` |
| Summary tiles | Grid of 4 (2 below a 40rem container). bg `--color-canvas`; 1px line border; radius 8px; padding 12px 16px. Label `--text-preview` ink-muted; value `--text-preview-num` ink, `tabular-nums` |
| Tables | Geist 13px ink; header row in `--text-caption` uppercase, 0.04em, ink-muted; row height 40px; 1px `--color-line` row dividers; amounts right-aligned in `tabular-nums` with en-IN ₹ grouping. Columns are dropped at narrow container sizes (below) |
| Status chips | Height 22px; padding 2px 8px; radius 9999px; Geist 500 12px; always text. Paid = success on success-tint. Due = warning on warning-tint. Overdue = danger on danger-tint. Neutral (for example "Move-out") = ink-muted on canvas-tint. Contrast is in §3.3. **No** "Paid via UPI", "Auto-reconciled" or any wording that implies online collection (see [06](06-feature-status.md)) |
| Bed grid | Square cells 28px (24px below a 28rem container), radius 4px, gap 6px. Occupied = accent-900 fill. Vacant = surface fill + 1px line-strong border. Only these two states: no reserved or notice-period states, because reservations and notice periods are not in [specs/06](06-feature-status.md). A text legend is always shown |
| Inner mini-cards (outcome illustrations) | bg surface, 1px line border, radius 8px, padding 12px, `--text-preview` |
| Sample data | Obviously fictional Indian names and ₹ amounts from `site-content.ts`, flagged `illustrative: true` |
| Hero placement | The preview sits half on dark, half on canvas (brief §5 #1). The hero band (gradient ending at accent-900) holds the text; the preview follows in a full-bleed wrapper whose background is `linear-gradient(180deg, var(--color-accent-900) 50%, var(--color-canvas) 50%)`, so the frame's upper half is on dark and its lower half on canvas whatever its height. No negative margins |

**Scaling on small screens (no horizontal page overflow).** Every preview root sets `container-type: inline-size`. Layouts switch on the container's width, not the viewport's:

| Container width | Variant |
|---|---|
| ≥48rem (768px) | Full: sidebar + 4 tiles + table (4–5 columns) |
| 28–48rem | No sidebar; 2 × 2 tiles; table limited to 3 columns (name, amount, status) |
| <28rem (448px) | **Simplified mobile variant:** 2 tiles; the table becomes a stacked list of rows (name + chip on line 1, amount on line 2); bed grid limited to 2 rooms |

Rules: grid children get `min-width: 0`; no element has a fixed width larger than its container; long names truncate with `text-overflow: ellipsis`; **no `transform: scale()` on text** (it would push text below 12px and blur it); frame `overflow: clip`. Responsive tests check `document.documentElement.scrollWidth <= innerWidth` at 360, 390, 768, 1024 and 1440.

---

## 14. Section layout patterns

| Pattern | Spec | Derives from (observed) | Used by |
|---|---|---|---|
| **Centred header** | Optional eyebrow, H2 (centred, max 16em), one-sentence sub (max 36rem, ink-muted), then `--spacing-header` to the content | Practice, integrations, implementation and choose headers centred, margin-bottom 3.5rem (ref: structure.md §2) | problem, outcomes, how-it-works, getting-started, why, faq |
| **Asymmetric split** | 12-column grid at ≥992: text in columns 1–4 (H2 left-aligned, sub, left-rule list), content in columns 6–12, top-aligned | Revenue `col-lg-4` + `col-lg-7`, `row-justify-between` (ref: structure.md §4) | attention, early-access (5/7 variant) |
| **Inset split** | Inside the container (not full bleed): `grid-template-columns: 1fr 1fr`, no gap. Media cell on `--color-canvas-tint`; panel on `--color-accent-800`, padding 60px 60px 0 at ≥992; stacked below 992 with panel padding 40px 32px at 768–991 and 40px 24px 16px below 768; `data-surface="dark"`. The H2 sits in the panel. Tabs: `padding-block: .5rem; min-height: 44px`. One shared "Get early access" CTA below the tab panels | `.feature_component` 1fr 1fr, panel padding 3.75rem 3.75rem 0 (ref: tokens.md §3; structure.md §3) | platform |
| **Full-bleed band** | Background spans the viewport; content stays in the container; hard horizontal cuts, no curves or overlaps | Revenue, implementation, choose and CTA bands (ref: structure.md §2) | hero, attention, getting-started, why, faq, final-cta |
| **Alternating rows** | Feature rows at 5/7, with media on the right for row 1, left for row 2 and right for row 3 (CSS `order`; DOM order is always text then media, for reading order) | Derived from the inset-split geometry (ref: structure.md §3) | features |
| **Rail** | <992: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--spacing-gutter)`; cards `scroll-snap-align: start; flex: 0 0 18rem` (22rem at ≥768); gap 12px (24px at ≥768); the rail bleeds to the viewport edge with an equal right gutter (a trailing spacer). Each card's "Step n of 4" is the position cue. It is a labelled region, focusable for keyboard scrolling. ≥992: a 4-column grid. **No scroll-jacking or pinning** (deliberate deviation) | Implementation rail: native scroll-snap at ≤991, card widths 18/22rem, gaps 12/24px; pinned at ≥992 (ref: components.md §5.3; responsive.md §5) | getting-started |

---

## 15. Background sequence (Meraki page)

This keeps Clarion's rhythm: a dark opening, light and tinted alternation with dark punctuation, an inset/full-bleed width beat, a dark closing and a light footer (ref: structure.md §2).

| # | Section (`id`) | Background | Width type | Clarion analogue |
|---|---|---|---|---|
| 0 | Nav | `--color-surface` pill, floating | Floating pill (max 54.5rem) | Fixed white pill |
| 1 | `hero` | Hero gradient (accent-800 → accent-900); the preview wrapper below is split 50/50 accent-900 / canvas (§13) | Full bleed | Teal photo hero |
| 2 | `problem` | `--color-canvas` | Inset container | — (new) |
| 3 | `outcomes` | `--color-canvas`; cards canvas-tint | Inset container | Practice cards on `#fbfaf8` |
| 4 | `platform` | `--color-canvas`; inset split with accent-800 panel | **Inset** split (dark punctuation) | Inset brown platform split |
| 5 | `attention` | `--color-canvas-tint` | Full bleed | `#f6f5ec` revenue band |
| 6 | `features` | `--color-canvas`; media panels canvas-tint | Inset container | — (new) |
| 7 | `how-it-works` | `--color-canvas` + optional section wash | Inset container | Integrations on `#fbfaf8` with mint glow |
| 8 | `getting-started` | `--color-accent-900` | Full bleed (dark punctuation) | `#361700` implementation rail |
| 9 | `why` | `--color-canvas-tint`; cards canvas | Full bleed | `#f6f5ec` choose band |
| 10 | `early-access` | `--color-canvas`; form card surface | Inset container | (Clarion modal, placed inline) |
| 11 | `faq` | `--color-canvas-tint` | Full bleed | — (new) |
| 12 | `final-cta` | Final CTA gradient (139°, 160° below 768); right side at ≥992 holds either a subtle CSS-only abstract or a cropped preview with its caption (**Provisional**, decide in Phase B) | Full bleed | Teal CTA band |
| 13 | Footer | `--color-canvas`; padding 80px (56px below 768) | Inset container | `#fbfaf8` footer, 80 → 56px |

Two dark bands never touch, and two canvas-tint bands never touch.

---

## 16. Breakpoints and responsive tokens

Mobile-first `min-width` queries replace the reference's desktop-first `max-width: 479/767/991px` tiers (ref: tokens.md §6). Tailwind's default breakpoints are reset.

| Token | Value | Reference equivalent | What switches |
|---|---|---|---|
| base | <480px | ≤479 | Single column; full-width in-content CTAs; button pairs stacked with a 12px gap; form card padding 24px |
| `--breakpoint-sm` | `30rem` (480px) | >479 | Button pairs go inline and wrap; CTAs return to natural width; form card padding 40px |
| `--breakpoint-md` | `48rem` (768px) | >767 | 2-column card grids (outcomes 2 + 1, why and problem 2 × 2); how-it-works 5-up; rail cards 22rem with 24px gaps; header spacing 56px; footer padding 80px; nav inset 24px |
| `--breakpoint-lg` | `62rem` (992px) | >991 (the nav collapses at ≤991 in the reference too) | Full pill nav replaces the menu button; 12-column splits (platform, attention, features, early-access); outcomes 3-up; problem 4-up; rail becomes a 4-up grid; CTA H2 line height 1.1 |
| `--breakpoint-xl` | `75rem` (1200px) | None. The reference squeezes desktop layouts into 1024 (ref: responsive.md §3, defect 3) | Why cards 4-up |

Fluid tokens: `--spacing-gutter` and `--spacing-section` (§5), `--text-h1`, `--text-h2`, `--text-cta`, `--text-tab` and `--text-preview-num` (§4.2). Previews use container queries (§13), not these breakpoints.

---

## 17. Motion

| Token | Meraki value | Derives from (observed) | Usage |
|---|---|---|---|
| `--ease-out-quart` | `cubic-bezier(.165, .84, .44, 1)` | The site's only easing curve, used 15 times (ref: components.md §0) | Every transition |
| `--dur-fast` | 200ms | 0.2s (ref: tokens.md §5) | Icon colour, FAQ chevron, sheet open/close |
| `--dur-base` | 300ms | Button background, nav-link colour, tab opacity .3s (ref: components.md §12) | Button and link hover, tab label opacity, hamburger morph, tab panel fade-in |
| `--dur-out` | 100ms | Tabs `data-duration-out="100"` (ref: components.md §4.1) | Tab panel fade-out |

**What animates:** button and link background/colour/border on hover; nav-link hover pill; inactive → active tab label opacity (.6 → 1); platform panel crossfade (all panels stacked in one grid cell so the height never jumps; the outgoing panel fades out in 100ms, the incoming one fades in over 300ms); hamburger → X; mobile sheet fade and 8px slide; FAQ chevron rotation (the answer appears instantly, with no height animation).

**Added by owner decision D-9 (2026-10-29), matching the reference:**
- Hero marquee: planned-capability words, `100s linear infinite` right-to-left, 60% opacity, 5rem edge mask, pause on hover, plus a visible pause button (ref: components.md §6, hero 100s).
- How-it-works cell marquees: 11.4286rem × 5rem bordered cells, row 1 `60s` left-to-right, row 2 `44s` right-to-left. Two identical groups shifted by exactly −50%, so there is no loop jump (fixes the reference's 44s row bug).
- Getting-started pinned rail at ≥992 (no reduced motion): a sticky 100svh stage; the section height is extended by the track overflow, and scroll maps 1:1 to `translate3d` (ref: components.md §5.3). Cards are 26.5rem wide at ≥992. Below 992 it is the native scroll-snap rail.

**What does not animate:** no scroll reveals, parallax, counters, autoplay, Lottie, or hover lift or scale (Clarion has none).

**Reduced motion.** One global block:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

The reference guards only some of its motion, all through inline embeds (ref: components.md §11).

---

## 18. Iconography

| Property | Meraki value | Derives from (observed) |
|---|---|---|
| Format | Inline SVG React components in `src/components/ui/Icon*`. Hand-authored, or copied as SVG from an MIT set (Phosphor or Lucide) with the licence noted in the file header. **No icon font and no runtime CDN** | Inline SVG line icons; the Phosphor CDN is loaded but unused (ref: components.md §13) |
| Grid and stroke | 24 × 24 viewBox; `fill="none"`; `stroke="currentColor"`; `stroke-width="1.5"`; round caps and joins | About 1.5px monoline with round caps (ref: components.md §13) |
| Large sizes | At ≥40px, add `vector-effect: non-scaling-stroke` with stroke 2, so lines do not become heavy | — |
| Sizes | 16 (buttons, inline errors) · 20 (form, chevrons, FAQ) · 24 (lists, tables) · 28 (problem disc) · 40 (step cards) · 48 / 64 (why badge: 3rem below 992, 4rem above) | Button icon 16px; disc glyph 4rem; badge icon 6rem (ref: tokens.md §3) |
| Colour | Inherits `currentColor`: ink on light, on-dark on dark, status colours only next to a text label | — |
| Accessibility | Decorative: `aria-hidden="true" focusable="false"`. A meaningful standalone icon (the menu button) gets an `aria-label` on its button, not on the SVG | Wrong and mismatched alts in the reference (ref: components.md §11) |
| Not allowed | Third-party brand logos (WhatsApp, UPI, banks, Tally), social icons (none exist), certification badges | Brief §2: no integrations; no social |

Suggested set (names only): bed, door, users, user-plus, currency-inr, receipt, notebook, table (spreadsheet), chat-circle, brain (memory), calendar, clipboard-text, buildings, arrow-right, caret-down, check, warning, x, list.

---

## 19. Tailwind v4 `@theme` sketch (documentation only; not a file yet)

This is a sketch to guide Phase B. Verify the exact syntax against the installed Tailwind 4.3.3 before using it.

```css
/* src/app/globals.css (Phase B) */
@import "tailwindcss";

@theme {
  /* reset defaults so only Meraki tokens exist (Provisional; check bg-transparent / currentColor still work) */
  --breakpoint-*: initial;
  --shadow-*: initial;

  --breakpoint-sm: 30rem;   /* 480 */
  --breakpoint-md: 48rem;   /* 768 */
  --breakpoint-lg: 62rem;   /* 992 */
  --breakpoint-xl: 75rem;   /* 1200 */

  /* colour (Provisional, owner approval pending) */
  --color-canvas: #FAF9F6;
  --color-canvas-tint: #F3F1EA;
  --color-surface: #FFFFFF;
  --color-line: #E4E0D5;
  --color-line-strong: #8C8476;
  --color-rule: rgb(31 27 22 / .16);
  --color-ink: #1F1B16;
  --color-ink-muted: #5E574D;
  --color-accent-900: #172A46;
  --color-accent-800: #1F375C;
  --color-accent-tint: #DCE6F2;
  --color-primary: #1F1B16;
  --color-primary-hover: #3A332A;
  --color-on-dark: #FAF9F6;
  --color-on-dark-muted: rgb(250 249 246 / .78);
  --color-highlight: #C98A2B;            /* dark surfaces only */
  --color-success: #2F6B4F;  --color-success-tint: #E6F0EA;
  --color-warning: #8A5A12;  --color-warning-tint: #F8EEDC;   /* adjusted from #A86A12 */
  --color-danger:  #A23B2A;  --color-danger-tint:  #F7E6E2;

  /* type */
  --text-h1: clamp(2.5rem, 1.75rem + 2.34vw, 4rem);
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.03em;
  --text-h1--font-weight: 400;
  --text-h2: clamp(2.25rem, 1.79rem + 1.89vw, 3rem);
  --text-h2--line-height: 1.1;
  --text-h2--letter-spacing: -0.02em;
  --text-h2--font-weight: 300;
  --text-cta: clamp(2.5rem, 2.19rem + 1.26vw, 3rem);
  --text-cta--line-height: 1.2;           /* set leading-[1.1] at lg */
  --text-cta--letter-spacing: -0.03em;
  --text-cta--font-weight: 400;
  --text-tab: clamp(1.5rem, 1.19rem + 1.26vw, 2rem);
  --text-tab--line-height: 1.1;
  --text-tab--letter-spacing: -0.03em;
  --text-tab--font-weight: 400;
  --text-h3: 1.5rem;
  --text-h3--line-height: 1.1;
  --text-h3--letter-spacing: -0.02em;
  --text-h3--font-weight: 400;
  --text-lead: 1.125rem;   --text-lead--line-height: 1.5;  --text-lead--letter-spacing: -0.01em;
  --text-body: 1rem;       --text-body--line-height: 1.5;  --text-body--letter-spacing: -0.01em;
  --text-small: 0.875rem;  --text-small--line-height: 1.5; --text-small--letter-spacing: -0.01em;
  --text-caption: 0.8125rem; --text-caption--line-height: 1.4; --text-caption--font-weight: 500;
  --text-eyebrow: 0.8125rem; --text-eyebrow--line-height: 1.2; --text-eyebrow--letter-spacing: 0.1em; --text-eyebrow--font-weight: 500;  /* + uppercase in the component */
  --text-preview: 0.8125rem; --text-preview--line-height: 1.4;   /* 0.75rem (12px) minimum inside previews */
  --text-preview-num: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  --text-preview-num--line-height: 1.1; --text-preview-num--letter-spacing: -0.02em;

  /* spacing & layout */
  --spacing-section: clamp(3rem, 1.79rem + 4.95vw, 6.25rem);
  --spacing-gutter: clamp(1.25rem, 0.75rem + 2.2vw, 2.5rem);
  --spacing-gap-main: 2.5rem;
  --spacing-gap-md: 1.25rem;
  --spacing-gap-sm: 0.5rem;
  --spacing-card: 1.5rem;          /* small cards: 1.25rem */
  --spacing-stack: 1rem;           /* header block → body: 1.5rem */
  --spacing-btn-group: 1rem;       /* column gap; row gap 0.75rem */
  --container-site: 87.5rem;
  --container-form: 35rem;
  --container-narrow: 48rem;

  /* radii */
  --radius-pill: 2.5rem;
  --radius-nav: 8.5rem;
  --radius-sheet: 1rem;
  --radius-form: 1rem;
  --radius-input: 0.75rem;
  --radius-preview: 0.75rem;
  --radius-checkbox: 0.25rem;

  /* motion */
  --ease-out-quart: cubic-bezier(.165, .84, .44, 1);
}

/* next/font variables come from layout.tsx */
@theme inline {
  --font-display: var(--font-newsreader), "Iowan Old Style", Georgia, serif;
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
}

:root {
  --dur-fast: 200ms;
  --dur-base: 300ms;
  --dur-out: 100ms;
  --focus-ring: var(--color-accent-900);
  --spacing-nav-offset: 5.5rem;
  --spacing-header: 2.5rem;        /* responsive, so it lives on :root; use mb-(--spacing-header) */
}
@media (width >= 48rem) { :root { --spacing-header: 3.5rem; } }
[data-surface="dark"] { --focus-ring: var(--color-on-dark); color: var(--color-on-dark); }

@utility container-page {
  width: min(100% - 2 * var(--spacing-gutter), var(--container-site));
  margin-inline: auto;
}
```

Guardrail (Phase B): a lint or test step fails if `src/components/**` contains a hex colour literal or the literal brand name.

---

## 20. Deviations from the reference (deliberate)

| Deviation | Reason |
|---|---|
| One serif (Newsreader) instead of two (Moderat trial + Bpmf) | Licensing (trial font); fewer downloads (ref: tokens.md §1.2) |
| Solid `--color-ink-muted` instead of opacity .6 | The reference fails AA at 4.32–4.39:1 (ref: tokens.md §7) |
| Inactive tabs at .6 opacity instead of .4 | Raises the ratio from 3.58 to 5.15 |
| Visible `:focus-visible` on all controls | The reference has none on buttons, links or tabs (ref: tokens.md §8) |
| 44px touch height on coarse pointers; 44px menu button | The reference's 42px buttons and 40 × 43 hamburger fall below 44px (ref: responsive.md §3) |
| Fluid section padding and gutter | Fixes the reference's frozen 100px padding and its 1024 gutter dip (ref: responsive.md §0.3–0.4) |
| 12px radius on preview frames | Product UI needs to read as UI |
| Pinned rail without Swiper, and a pause button on every marquee | D-9 asks for Clarion's motion; it is rebuilt with CSS and about 60 lines of JS, and the pause control meets WCAG 2.2.2 |
| Platform tab media changes per tab | The reference image is static (ref: components.md §4.1) |
| 1px borders on the nav pill and mobile sheet | The reference pill and panel have no edge on light backgrounds (ref: components.md §1.5) |
| Platform split stacks below 992 (not 767) and stays inset | The reference keeps 1fr/1fr full-bleed at 768–991 and stacks only at ≤767 (ref: tokens.md §3 `.container.cc-full`). Four tabs plus a per-tab preview need more than about 384px per column, so Meraki stacks earlier; panel padding is 40px 32px at 768–991 and 40px 24px 16px below 768 (§14) |
| Hero preview split 50/50 dark / canvas by a wrapper gradient | The reference has a photo hero with no product view (ref: structure.md §1) |
| Photo overlays (D-10) | Hero: full-bleed Unsplash photo under `accent-900` at 45% → 70% (35%) → solid (88%), denser at the top than Clarion's transparent → solid so white text stays readable. Final CTA: 139° wash from accent-900 at 12% to transparent at 70%; below 768px the photo sits in the lower 59% with a top fade mask, under a 190° wash (ref: Clarion CTA ≤670px). Step cards: square-cornered cover photos. |
| Marquees show capability words, not logos; no stats, compliance band or photos | Nothing true exists to show (brief §2, §5) |

---

## 21. Open questions

From the decisions brief (§8), where they affect this document:

1. **Brand colour approval and final name** (open question 4). Every token here is Provisional. A rename follows §2; a recolour re-runs §3.3.
2. **Imagery and logo** (open question 3). The UI-led hero is the default. A photo-led, Clarion-style hero needs licensed photography of an Indian hostel or PG and a photo overlay token (hero gradient over the image). The wordmark stays text until a logo exists.
3. **Hindi or regional language** (open question 8). Newsreader and Geist have no Devanagari. If it is needed, add Noto Serif Devanagari and Noto Sans Devanagari through next/font with the `devanagari` subset, and re-check line heights.
4. **Product scope** (open question 6). The "Open issues" attention label and any maintenance preview stay out unless maintenance is confirmed (otherwise "Notes to follow up").

Raised by this document (the brief is followed; these are concerns to confirm):

5. **`--color-highlight` `#C98A2B`** fails on light surfaces (2.79:1 on canvas, below even the 3:1 UI threshold). It is kept as the brief specifies but restricted to dark surfaces. Confirm, or choose a darker saffron (for example `#A9741F`, 3.83:1 on canvas, which suits UI use but not small text).
6. **`--color-warning`** is changed from `#A86A12` to `#8A5A12` to pass AA on its tint. Confirm the brief should be updated.
7. **Fluid H2** (`clamp(…)`) replaces the reference's stepped 36/44/48px. It predicts 43.2px at 768 against the observed 44px (ref: responsive.md §2). This is acceptable, but confirm the visual result in Phase B.
8. **H3 letter-spacing** is −0.02em instead of the reference's −0.03em, which was set on a different typeface. Tune it in the browser.
9. **The brief's button height is 42px** and touch devices get 44px here. Confirm that two heights by pointer type are acceptable, or use 44px everywhere. (The 44px responsive checks in [specs/04](04-implementation-plan.md) T22 run in coarse-pointer touch projects for this reason.)
10. **Token names differ from the brief.** The brief §7 names the section padding `--section-pad`. This document uses Tailwind-namespaced names instead: `--spacing-section`, `--spacing-gutter`, `--spacing-nav-offset`, `--container-site`, `--radius-form`, `--ease-out-quart` and `--text-*` (Tailwind v4 generates `text-*` utilities only from `--text-*`). specs/02, 03 and 04 use these names. Values are unchanged.
11. **`--text-tab` fit.** The clamp predicts 28.7px at 768 against the observed 26px (ref: tokens.md §1.4, 26/28.6 at ≤991), about 10% over. Accepted for a smooth scale; if it looks heavy in Phase B, step it instead (`1.5rem` base → `1.625rem` at md → `2rem` at lg).
12. **Getting-started 4-up at 992 may be cramped.** The brief (§5 #8) and specs/01 FR-66 fix a 4-up row from 992. At 1024 that leaves about 161px of text width per card for 24px sentence headlines, narrower than the 191px that [specs/02](02-ui-ux-reference.md) §13.2 flags as a reference defect for the Why cards. This document follows the brief; if Phase B screenshots confirm the squeeze, switch to a 2×2 grid or keep the rail at 992–1199 and go 4-up from xl (as for the Why cards).
