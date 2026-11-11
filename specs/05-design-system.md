# 05 — Design system (StayPookie marketing & purchase site)

| | |
|---|---|
| Status | **Implemented — matches the real, shipped tokens in `src/app/globals.css`.** Not provisional, not pending owner approval; this is the design system already live on staypookie.com. |
| Date | Rewritten 2026-11-11 (previous version dated 2026-10-29, written against a provisional Clarion-derived indigo scheme that was never shipped). |
| Brand | "StayPookie," final. |
| Source of truth for values | `src/app/globals.css` in this repo. This document explains and organizes those tokens; if the two ever disagree, the CSS file is correct and this document is stale — fix this document, don't "correct" the CSS to match old documentation. |
| Historical reference | [specs/02-ui-ux-reference.md](02-ui-ux-reference.md) still holds the original Clarion Health competitive analysis that shaped the *structural* decisions (section rhythm, pill nav, no-shadow-vs-shadow debate, breakpoints) — read it for *why* a pattern exists. The *colour, font and shadow* values it originally proposed are superseded; see its own addendum. |

**What changed from the original (provisional) version of this document, in one paragraph.** The original was written for a Clarion-Health-inspired, flat/square/no-shadow, deep-indigo system that was never actually built. What's actually shipped is the real product's own warm ivory/sand/cream + clay-accent system, with **soft layered shadows and rounded corners** (1.125rem cards, 0.75rem inputs/buttons) — the opposite of "flat and calm, no shadows, square cards." Fonts are **Fraunces** (display) and **Figtree** (body), not Newsreader/Geist. Motion uses a single easing curve `cubic-bezier(0.2, 0.8, 0.2, 1)`, not the old `cubic-bezier(.165,.84,.44,1)`. Everything below reflects that reality.

---

## 1. Principles (updated)

1. **Tokens only.** Components never contain raw hex values, font names or magic pixel sizes — every value comes from `@theme` in `src/app/globals.css`, and all brand words come from `src/config/brand.ts`. (Unchanged — this discipline was already correct.)
2. **Warm and soft, not flat.** Unlike the original Clarion-derived plan, the shipped system uses **soft, layered shadows** (`--shadow-card`, `--shadow-card-hover`, etc. — never a single hard drop-shadow) and **rounded corners** (`--radius-card: 1.125rem`, `--radius-btn`/`--radius-input: 0.75rem`, `--radius-pill: 9999px`) throughout. There is no "square cards, no shadows" rule anymore.
3. **Accessible by default.** Text should meet WCAG 2.2 AA (4.5:1 normal, 3:1 large/UI). §3.3 below recomputes real contrast ratios against the shipped palette and found some that currently **fail** — see the "known contrast issues" table. Every interactive element should have a visible `:focus-visible` ring (shipped: 2px solid `--focus-ring`, which resolves to clay-600 on light surfaces and cream on dark).
4. **Honest previews.** Any illustrative/sample-data preview still carries a visible "Illustrative preview · sample data" caption and uses obviously fictional data — unchanged from the original rule, and still correct.
5. **Mobile first.** Layouts use `min-width` breakpoints and must never cause horizontal page scroll at any width.

---

## 2. Brand configuration

| Concern | Lives in | Notes |
|---|---|---|
| Name and words | `src/config/brand.ts` | Already correctly says `name: "StayPookie"`, `companyName: "StayPookie Technologies Pvt. Ltd."`, real nav (Home, Pricing, How it Works, FAQ, About, Contact), real CTA labels ("See Plans", "Choose Plan"), `footerLegal` links, and a `contactPlaceholder` (phone is a known placeholder — see `specs/06`). |
| Section copy and sample data | `src/config/site-content.ts` | Copy interpolates `brand.name`; FAQ, tab data, illustrative sample data (flagged `illustrative: true`) live here. |
| Colours, type, spacing, radii, breakpoints, easing | `@theme` in `src/app/globals.css` | All tokens in §§3–9 below. |
| Font families | `src/app/layout.tsx` (next/font) | **Fraunces** (display) and **Figtree** (body/sans), mapped to `--font-display`/`--font-heading` and `--font-sans`/`--font-body` in `@theme inline`. |
| Logo | — (none exists) | Text wordmark from `brand.name` until a logo is supplied. |

---

## 3. Colour

### 3.1 Core tokens (from `src/app/globals.css`)

| Token | Value | Role |
|---|---|---|
| `--color-ivory` / `--color-canvas` | `#f6efe4` | Page background |
| `--color-sand` / `--color-canvas-tint` | `#efe4d4` | Alternate band / tinted card fill |
| `--color-cream` / `--color-surface` | `#fffaf2` | Card/surface background, form fields |
| `--color-espresso` / `--color-ink` | `#3b2622` | Primary text, headings |
| `--color-bark` / `--color-ink-bark` | `#5a4540` | Secondary text |
| `--color-dust` / `--color-ink-muted` | `#7d6b63` | Muted/help text, placeholders — **see contrast note in §3.3, this one has a real AA problem on two of its three backgrounds** |
| `--color-clay` / `--color-clay-600` / `--color-primary` / `--color-accent-900` | `#8c5850` | Primary accent: buttons, links, focus ring |
| `--color-primary-hover` / `--color-accent-800` | `#7b4c44` | Hover state for the primary accent |
| `--color-primary-active` | `#6e433c` | Active/pressed state |
| `--color-clay-100` / `--color-primary-tint` / `--color-accent-tint` | `#f0d9d2` | Light tint: hover backgrounds, selection colour |
| `--color-line` | `#e6d8c5` | Decorative borders/dividers |
| `--color-line-strong` | `#cfc1ad` | Meant for input/control borders — **see contrast note in §3.3, this one fails the UI 3:1 requirement** |
| `--color-rule` | `rgb(59 38 34 / 0.12)` | Decorative left-rule motifs |
| `--color-on-dark` | `#fffaf2` | Text on the clay/dark surfaces |
| `--color-on-dark-muted` | `rgb(255 250 242 / 0.78)` | Secondary text on dark/clay surfaces |

### 3.2 Secondary/status tokens

| Token | Value | Usage |
|---|---|---|
| `--color-slate-ink` / `--color-info` | `#3f5784` | Info tag/icon text, on `--color-info-tint` `#e6ecf5` |
| `--color-moss` / `--color-success` | `#4c7a58` | "Paid" chip text, success states, on `--color-success-tint` `#eaf2ec` |
| `--color-amber` / `--color-warning`/`--color-attention` | `#a6731f` | "Due" chip text, attention states, on `--color-warning-tint` `#faf1e2` |
| `--color-brick` / `--color-danger`/`--color-error` | `#b0473e` | "Overdue" chip text, field errors, on `--color-danger-tint` `#fae9e7` |

These are for **icons and tags only**, per `CLAUDE.md` — never the primary action colour, which stays clay.

### 3.3 Contrast ratios — recomputed 2026-11-11 against the real shipped palette

Same WCAG 2.x relative-luminance method as the original document, just run against the actual colours instead of the old provisional indigo set. **T** = text (4.5:1 normal, 3:1 large ≥24px/≥18.66px bold). **UI** = non-text component (3:1). **Dec** = decorative, no requirement.

| Foreground | Background | Ratio | Target | Result |
|---|---|---|---|---|
| espresso | ivory | 12.37 | T 4.5 | Pass |
| espresso | cream | 13.60 | T 4.5 | Pass |
| espresso | sand | 11.25 | T 4.5 | Pass |
| bark | ivory | 7.79 | T 4.5 | Pass |
| bark | cream | 8.56 | T 4.5 | Pass |
| bark | sand | 7.08 | T 4.5 | Pass |
| dust (ink-muted) | ivory | **4.42** | T 4.5 | **Fail** (just under) |
| dust (ink-muted) | cream | 4.86 | T 4.5 | Pass |
| dust (ink-muted) | sand | **4.02** | T 4.5 | **Fail** |
| clay-600 as text | ivory | 5.07 | T 4.5 | Pass |
| clay-600 as text | cream | 5.57 | T 4.5 | Pass |
| clay-600 as text | sand | 4.61 | T 4.5 | Pass (marginal) |
| clay-600 as text | clay-100 (tint) | **4.29** | T 4.5 | **Fail** (marginal) |
| cream (button text) | clay-600 (button bg) | 5.57 | T 4.5 | Pass |
| cream (button text) | primary-hover `#7b4c44` | 6.83 | T 4.5 | Pass |
| cream (button text) | primary-active `#6e433c` | 7.98 | T 4.5 | Pass |
| espresso | clay-100 | 10.47 | T 4.5 | Pass |
| slate-ink | info-tint | 6.08 | T 4.5 | Pass |
| moss | success-tint | **4.35** | T 4.5 | **Fail** (marginal) |
| amber | warning-tint | **3.68** | T 4.5 | **Fail** |
| brick | danger-tint | 4.68 | T 4.5 | Pass (marginal) |
| line (decorative) | ivory | 1.23 | Dec | N/A — decorative only, correctly never used as a control boundary |
| **line-strong (input border)** | ivory | **1.55** | **UI 3** | **Fail** |
| **line-strong (input border)** | cream | **1.70** | **UI 3** | **Fail** |

**What this means, honestly stated (this is a documentation pass, not a code fix — see `specs/04` for where to track remediation):**
- `--color-dust` / `--color-ink-muted` fails AA as normal text on the ivory and sand backgrounds it's actually used against (card bodies, help text, captions on those surfaces). It only reliably passes on cream.
- `--color-clay-600` as text on its own `--color-clay-100` tint is marginal-fail (4.29 vs 4.5) — relevant if a label is ever set in clay-600 on a clay-100 chip/badge background.
- `--color-line-strong`, which is positioned (by name) to mark input/control borders needing a 3:1 UI-component contrast, badly fails that threshold against both light backgrounds it's used on (1.55 / 1.70) — it currently reads almost the same as the page background. This is a genuine accessibility gap in the shipped tokens, not a documentation error; flag it in `specs/04` as a fix candidate rather than silently living with it.
- `--color-moss` on its own tint and `--color-amber` on its own tint (the "Paid"/"Due" status-chip colours) are also marginal-to-clear AA failures for text that size.

This document doesn't prescribe replacement hex values (that's a design/code decision outside this pass's scope) — it records the real, current numbers so whoever picks new values next has the actual evidence, the same way the original version of this file caught and fixed two failures in its own (never-shipped) palette.

---

## 4. Typography

| Token | Family | Role |
|---|---|---|
| `--font-display` / `--font-heading` / `--font-serif` | **Fraunces** (fallback Georgia, serif) | All headings |
| `--font-sans` / `--font-body` | **Figtree** (fallback system-ui, sans-serif) | Body, buttons, nav, forms |

Scale (from `globals.css`, fluid where `clamp()` is used):

| Token | Size | Line-height | Letter-spacing | Weight |
|---|---|---|---|---|
| `--text-h1` | `clamp(2.5rem, 1.75rem + 2.34vw, 4rem)` | 1.1 | −0.025em | 500 |
| `--text-h2` | `clamp(2rem, 1.6rem + 1.6vw, 3rem)` | 1.15 | −0.02em | 500 |
| `--text-cta` | `clamp(2.25rem, 1.8rem + 1.5vw, 3rem)` | 1.2 | −0.025em | 500 |
| `--text-tab` | `clamp(1.375rem, 1.15rem + 1vw, 1.875rem)` | 1.2 | −0.02em | 500 |
| `--text-h3` | `1.5rem` | 1.25 | −0.015em | 500 |
| `--text-lead` | `1.125rem` | 1.55 | −0.01em | — |
| `--text-body` | `1rem` | 1.55 | −0.005em | — |
| `--text-small` | `0.875rem` | 1.5 | −0.005em | — |
| `--text-caption` | `0.8125rem` | 1.4 | — | 500 |
| `--text-eyebrow` | `0.75rem` | 1.2 | 0.08em | 600 |
| `--text-preview` | `0.8125rem` | 1.4 | — | — |
| `--text-preview-num` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | 1.1 | −0.02em | — |
| `--text-micro` | `0.6875rem` | 1.3 | — | 500 |
| `--text-button` | `0.9375rem` | 1.4 | −0.01em | — |
| `--text-price` | `clamp(2.25rem, 2.1rem + 0.5vw, 2.5rem)` | 1 | −0.02em | — |
| `--text-faq-q` | `clamp(1.125rem, 1.05rem + 0.5vw, 1.25rem)` | 1.4 | — | 500 |

**2026-11-11 font-size audit.** A pass over every `text-[...]` arbitrary Tailwind value in `src/components` and `src/app` found 11 ad hoc sizes that either duplicated an existing token under a raw value, or used two near-identical raw values for the same semantic role. Fixed by adding four tokens above and replacing every arbitrary value with a token class:
- `--text-micro` (0.6875rem) replaces two inconsistent raw values (`0.6875rem` and `0.7rem`) that were both used for the same role — tiny chip/tag/stat-sublabel text in the hero preview, Features group-count badge, HowItWorks step tag, and checkout disclaimers.
- Hero's stat-card secondary line (`0.75rem`) now uses `text-caption` (0.8125rem) to match its sibling label in the same card, which already used `text-caption` — the two lines previously used two different sizes for the same visual hierarchy level.
- Hero's stat numbers (`1.5rem`) now use `text-h3`, an exact match for the token that already existed at that size.
- `--text-price` replaces two raw sizes (2.25rem on the homepage pricing teaser, 2.5rem on `/pricing`) used for the *same* element — the plan price — on two different pages; it's now one fluid token used in both places.
- FinalCta's `text-h2 md:text-[2.75rem]` override is removed — it was pinning the heading at 2.75rem from `md` upward, capping growth that `--text-h2`'s own clamp was designed to continue to 3rem on larger viewports. It now uses `text-h2` alone.
- SiteHeader's wordmark (`1.4375rem`, no documented reason for that exact value) now uses `text-h3` (1.5rem), removing a one-off size with no token.
- Faq's question text (`1.125rem` / `md:1.25rem`, a hard breakpoint jump) now uses `--text-faq-q`, a fluid clamp between the same two endpoints — consistent with how every other heading-scale token in this document is fluid, not stepped.
- PreviewFrame's wordmark (`0.9375rem`) now uses `--text-button`, which also replaces `.btn`'s own previously-raw `font-size: 0.9375rem` — the two were already the same value by coincidence, now it's one token.
- SiteFooter's wordmark (`2.25rem`, static) now uses `--text-cta`, whose own clamp already starts at exactly 2.25rem, so it keeps the same rendered size at small widths and gains fluid growth at large ones instead of staying pinned.

Headings get `text-wrap: balance`; paragraphs get `text-wrap: pretty` (set globally in `globals.css`, not per-component — simpler than the original per-element measure rules, and already shipped).

---

## 5. Spacing

| Token | Value |
|---|---|
| `--spacing-section` | `clamp(3.5rem, 2rem + 5vw, 6.5rem)` |
| `--spacing-gutter` | `clamp(1.25rem, 0.75rem + 2vw, 2.5rem)` |
| `--spacing-gap-main` | `2.5rem` |
| `--spacing-gap-md` | `1.25rem` |
| `--spacing-gap-sm` | `0.5rem` |
| `--spacing-card` | `1.5rem` |
| `--spacing-stack` | `1rem` |
| `--spacing-btn-group` | `0.75rem` |
| `--spacing-nav-offset` | `5.5rem` |
| `--spacing-header` | `3.5rem` (base), `4.5rem` from `md` (768px) |
| `--container-site` | `82rem` |
| `--container-form` | `35rem` |
| `--container-narrow` | `48rem` |

(Values differ slightly from the original provisional spec's `87.5rem`/`clamp(3rem,…,6.25rem)` — these are the real shipped numbers; don't "correct" the CSS back to the old ones.)

---

## 6. Borders, radii and shadows

**This is the single biggest correction from the original document.** The original said "flat and calm… no shadows and no rounded cards." The shipped system is the opposite:

| Token | Value | Usage |
|---|---|---|
| `--radius-card` / `--radius-sheet` / `--radius-form` / `--radius-preview` | `1.125rem` | Cards, previews, form card, mobile sheet |
| `--radius-btn` / `--radius-button` / `--radius-input` / `--radius-nav` | `0.75rem` | Buttons (non-pill variant), inputs, (nav uses this value too, despite the name suggesting a pill) |
| `--radius-pill` | `9999px` | Fully pill buttons |
| `--radius-tag` | `0.5rem` | Status chips, tags |
| `--radius-checkbox` | `0.375rem` | Checkbox |
| `--shadow-xs` | `0 1px 2px 0 rgb(59 38 34 / .04)` | Smallest lift (e.g. light buttons) |
| `--shadow-sm` | two-layer, ~0.04 alpha | Default button shadow |
| `--shadow-card` | two-layer, ~0.03–0.05 alpha | Resting card shadow |
| `--shadow-card-hover` | two-layer, ~0.04–0.07 alpha | Card hover/lift |
| `--shadow-dropdown`, `--shadow-modal` | progressively stronger two-layer shadows | Dropdowns, modals |

All shadows are **soft and layered** (two offset/blur layers at low opacity, warm-tinted from `rgb(59 38 34 / …)` — the espresso colour at low alpha, not pure black). Never use a single hard drop-shadow.

---

## 7. Buttons

| Property | Shipped value |
|---|---|
| Base height | `min-height: 42px`, `44px` under `@media (pointer: coarse)` |
| Large size | `min-height: 48px` (`.btn-lg`) |
| Padding | `0.625rem 1.25rem` (base), `0.75rem 1.5rem` (lg) |
| Radius | `--radius-btn` (0.75rem) for standard buttons |
| Type | Figtree 500, ~15px (`0.9375rem`), line-height 1.4, −0.01em |
| Shadow | `--shadow-sm` at rest |
| Transition | background-color, color, border-color, box-shadow, transform — all on `--dur-ui` (200ms) `--ease-standard` |
| Primary (`.btn-primary`/`.btn-primary-dark`) | bg clay-600, text cream at rest; **hover inverts to bg clay-100 / text clay-600** (a tint-swap, not a simple darken) |
| Secondary/tint (`.btn-secondary`/`.btn-tint`) | bg clay-100, text clay-600 at rest; hover inverts to bg clay-600 / text cream |
| Outline/ghost-on-light | transparent bg, line border, espresso text; hover → clay-100 bg, clay-600 border/text |
| Primary-light | cream bg, line border, espresso text (for use on dark/clay surfaces) |
| Ghost-on-dark | transparent, line border, cream text; hover → clay-100 bg, espresso text |
| Active/pressed | `transform: scale(0.98)` on primary variants |
| Disabled | bg line, text dust, no shadow, `cursor: not-allowed` |
| Full-width-on-mobile | `.btn-full-mobile`: 100% width below 480px (`sm` breakpoint), auto above |

---

## 8. Form controls

| Element | Shipped value |
|---|---|
| Field height | `min-height: 48px`, padding `0.75rem 1rem` |
| Border | 1px `--color-line` at rest; **intended** to go to `--color-line-strong` on hover and `--color-clay-600` on focus — see the §3.3 contrast note: `--color-line-strong` is too low-contrast to read as a visible state change on these backgrounds. |
| Radius | `--radius-input` (0.75rem) |
| Focus | 2px outline `--color-clay-600`, offset 1px, plus a border-colour change |
| Invalid | 2px solid `--color-brick` border |
| Disabled | bg sand, border line, text dust |
| Select | custom chevron (inline SVG, espresso stroke), `appearance: none` |
| Textarea | `min-height: 7.5rem`, vertical resize only |
| Checkbox | 20px box, 1.5px `--color-line-strong` border (same contrast caveat as above), `--radius-checkbox`; checked state fills clay-600 with a cream check icon |
| Error text | `--color-brick`, `--text-small` |
| Help text | `--color-dust`, `--text-small` — on a sand/ivory background this inherits the §3.3 contrast fail; prefer `--color-bark` for help text that must stay readable on those surfaces until the token itself is revisited |

This section reuses the original document's good instincts (labelled fields, visible required-marker text not colour/asterisk-only, autocomplete tokens, a live error summary) — those process rules are still correct and still apply to the checkout buyer-details form and the `/contact` form, not just the old early-access form.

---

## 9. Cards and status chips

| Element | Shipped value |
|---|---|
| Card | `--radius-card` (1.125rem), 1px `--color-line` border, cream background, `--shadow-card` at rest, `--shadow-card-hover` on hover, with a smooth transition on shadow/border/transform |
| Tag / badge | `--radius-tag` (0.5rem), status-tinted background + matching status text colour (info/success/attention/error) |
| Status chip (previews) | 22px tall, `--radius-tag`, status-tinted bg + text — "Paid" (success/moss), "Due" (warning/amber), "Overdue" (danger/brick), neutral (sand bg, dust text) |

Every status is still shown by colour **and** text label together (never colour alone) — unchanged, still correct, and still required for the §3.3 contrast issues above not to become an accessibility failure on top of a legibility one.

---

## 10. Navigation

Structural rules carried over from the original Clarion-informed plan (see `specs/02`): a persistent header with the wordmark, 6 links (Home, Pricing, How it Works, FAQ, About, Contact — more than the original 4, because Pricing and About are now real routes), one CTA ("See Plans"), collapsing to an accessible mobile menu below the `lg` breakpoint (992px). Visual treatment (radius, shadow, colour) follows §§3, 6–7 above, not the original square/no-shadow/indigo plan.

---

## 11. Motion

| Token | Value |
|---|---|
| `--ease-standard` / `--ease-motion` / `--ease-out-quart` | `cubic-bezier(0.2, 0.8, 0.2, 1)` — **one curve, used everywhere** (name `--ease-out-quart` is kept from the old doc but now points at the new curve) |
| `--dur-fast` | 180ms |
| `--dur-ui` / `--dur-base` | 200ms |
| `--dur-ui-long` | 240ms |
| `--dur-out` | 120ms |
| `--dur-reveal` | 450ms |

What's actually shipped, concretely:
- **Hero load-stagger**: `hero-enter` keyframe (opacity 0→1, translateY 18px→0), applied to 5 elements via `.hero-stagger-1..5` with increasing delay (40ms → 360ms) and slightly longer duration on the last (440ms) — a genuine entrance animation, not something the old "no scroll-reveal, no entrance motion" rule anticipated.
- **Checkmark draw-in**: `stroke-dashoffset` animation, ~350ms, used on the checkout success state — matches the "calm, one-time, no confetti" brief given for the purchase flow.
- **Marquee**: still present (`marquee-rtl`/`marquee-ltr` keyframes, pause-on-hover, pause-on-`data-paused`), reduced-motion-safe.
- **Tab panel crossfade**: stacked-grid technique (all panels in one grid cell), active panel fades in over `--dur-ui`/`--dur-base`, inactive fades out over `--dur-out` — same technique the original document specified, just faster (200ms/120ms vs the old 300ms/100ms).
- **`prefers-reduced-motion: reduce`** is fully respected: one global block collapses all transition/animation durations to 0.01ms and disables animation iteration and smooth scroll — unchanged in spirit from the original, and still correctly implemented.

This is a real departure from the original principle of "no scroll reveals, no entrance motion, nothing Clarion doesn't do" — the shipped site deliberately adds a calm hero entrance and a checkmark success moment. Treat `specs/02`'s old "what does not animate" list as superseded on this point.

---

## 12. Iconography

Unchanged in substance from the original: inline SVG components, no icon font, no runtime CDN. 24×24 viewBox, `stroke="currentColor"`, round caps/joins, decorative icons `aria-hidden="true"`.

---

## 13. Breakpoints

| Token | Value |
|---|---|
| `--breakpoint-sm` | `30rem` (480px) |
| `--breakpoint-md` | `48rem` (768px) |
| `--breakpoint-lg` | `62rem` (992px) |
| `--breakpoint-xl` | `75rem` (1200px) |

Unchanged from the original plan — the nav still switches at `lg` (992px), still mobile-first `min-width` queries, still no horizontal page scroll at any width down to 320px.

---

## 14. Open items for this document

1. **Contrast fixes needed** (§3.3): `--color-dust` on ivory/sand, `--color-clay-600`-as-text on `--color-clay-100`, `--color-line-strong` as an input/checkbox border, and the moss/amber status-chip-on-tint pairs. Track as a fix candidate in `specs/04`; this document only records the evidence.
2. Confirm whether `--color-line-strong`'s low contrast is a deliberate "subtle" choice someone accepted, or an oversight — worth a real answer before treating it as "known and fine."
3. If a logo is ever supplied, update §2 accordingly; the wordmark stays text-only until then.
