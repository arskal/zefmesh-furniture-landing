# Zefmesh Furniture — design plan

## 1. The idea in one line

**"The showroom after dark."** The page is lit like the shop floor at 11:00 with the lamps on
and the daylight gone: near-black walnut ground, warm off-white text, brass hairlines doing the
structural work that borders and drop-shadows usually do. Furniture photography is the only
bright thing on the page, so it carries the eye.

The organising metaphor is **drawn brass line-work** — the kind of thin scribed line you get on a
brass inlay or an architect's plan. It appears as: section rules, the 1px scroll-progress line,
card edges, the numbered how-to-buy spine, and — at full strength — the plan-view showroom map.

## 2. Palette

Starting point was the brief's table. I kept its logic and its two anchor colours, then measured
every pairing (`scratchpad/contrast.js`, WCAG relative-luminance) and changed three things.

| Token | Hex | Contrast on its ground | Use |
|---|---|---|---|
| `--c-base` | `#14110E` | — | Page ground. Deep near-black walnut. |
| `--c-base-deep` | `#0D0B09` | — | Scrims, nav backdrop, lightbox. |
| `--c-surface` | `#1F1A16` | — | Raised cards and panels. |
| `--c-surface-2` | `#2A231D` | — | Nested panels, chip rest state. |
| `--c-ink` | `#F2EDE6` | **16.15:1** on base | Primary text. |
| `--c-ink-muted` | `#B9AE9E` | **8.61:1** on base | Secondary text, still far past AA. |
| `--c-brass` | `#C08A3E` | **6.22:1** on base | CTAs, rules, active states. |
| `--c-brass-lt` | `#D9A24E` | **8.27:1** on base | Brass *text* and links — see note. |
| `--c-brass-deep` | `#8A5F22` | **4.57:1** on light | Brass for the inverted light sections. |
| `--c-green` | `#5A6B5D` | 3.31:1 — fill only | Badge/tag fills, with `--c-ink` on top (4.88:1). |
| `--c-green-lt` | `#8FA391` | **7.00:1** on base | Green as *text* (origin badges, meta). |
| `--c-light` | `#EDE7DE` | — | The two inverted sections. |
| `--c-light-ink` | `#14110E` | **15.31:1** on light | Text in inverted sections. |

**Three changes from the brief, and why:**

1. **Brass is now three values, not one.** `#C08A3E` is correct as a *fill* and passes 6.22:1 as
   text on the dark base, but at 2.46:1 on the light `#EDE7DE` section it fails outright. One brass
   cannot serve a CTA fill, a hairline at 20% alpha, and a link on an inverted band. Added
   `--c-brass-lt` for small brass text on dark and `--c-brass-deep` for anything brass on light.
2. **The muted green got a text-safe sibling.** `#5A6B5D` at 3.31:1 is not a text colour. It stays
   as a badge *fill*; `#8FA391` (7.00:1) does the job wherever green needs to be read.
3. **Hairlines are alpha-derived brass, not a separate hex** — `rgba(192,138,62,.22)` and `.45`.
   A hairline reads as brass *dimmed by the dark* rather than as a fourth colour, which is what
   actually happens to brass in a low-lit room.

Deliberately absent: any cream-plus-terracotta pairing. `#EDE7DE` appears twice on the whole page,
as a hard inversion for rhythm, never as ground.

## 3. Typography

Both scripts need a display face, so the pairing is chosen on shared *skeleton*, not shared mood.

| Role | Amharic | Latin |
|---|---|---|
| Display | **Noto Serif Ethiopic** 600–700 (variable) | **Fraunces** variable, `opsz` + `WONK` |
| Body | **Noto Sans Ethiopic** 400–700 (variable) | **Public Sans** variable 400–700 |
| Utility (numerals) | **IBM Plex Mono** 500 — tabular by construction, both languages |

**Why Fraunces, committed.** Noto Serif Ethiopic is a high-contrast serif with flared, slightly
soft terminals. Fraunces with `WONK` on at display sizes has the same slightly-off, drawn quality
— they read as siblings rather than as a system font next to a Google font. Instrument Serif is
crisper and colder and would make the Ethiopic look like the compromise. Fraunces' `opsz` axis is
driven off the type step so display sizes get tight, high-contrast forms and the 20px sizes get
sturdier ones.

**Scale.** One modular scale, `--step--1` … `--step-6`, each a `clamp()` fluid between 380px and
1280px, ratio ≈1.2 rising to ≈1.28. Nothing on the page sets a font-size that is not a step.

**Bilingual type rules, all scoped, never hand-tuned per element:**

- `--display-scale` is `1` on `[lang="en"]` and `0.92` on `[lang="am"]`. Every display size is
  `calc(var(--step-n) * var(--display-scale))`, so Ethiopic headings step down once across the
  whole page and land at the same optical weight as the Latin.
- Line-height is a variable, not a value: `--lh-display` `1.08` → `1.34`, `--lh-heading` `1.2` →
  `1.42`, `--lh-body` `1.45` → `1.62` when the subtree is `[lang="am"]`.
- `--ls-display`, `--ls-eyebrow` and `--tt-eyebrow` (`uppercase`) are declared on `[lang="en"]`
  and **reset to `0` / `none` on `[lang="am"]`**. Ethiopic has no case and letter-spacing wrecks
  the rhythm of the syllabary. Because both `[lang="am"]` and `[lang="en"]` blocks are written,
  an English fragment inside an Amharic page (a phone number, the `EN` label) gets the Latin
  values back without any element-level override.
- No fixed widths on buttons, nav items or chips anywhere. Amharic strings run ~15–30% longer;
  every control is `min-width` + padding so both lengths fit without reflow.

**Self-hosted, no CDN.** Six `.woff2` in `/assets/fonts/`, `font-display: swap`, disjoint
`unicode-range` per face. Latin faces are `latin`-only subsets; both Ethiopic faces are the full
unsubsetted Ethiopic block. Practical consequence: on the default Amharic page the browser fetches
the two Ethiopic faces plus Public Sans and Plex Mono, and **never fetches Fraunces at all** —
which is why the wordmark is an inline SVG monogram plus Plex Mono, not a Fraunces logotype.

## 4. Layout

Mobile-first at 380px, then two breakpoints (`48rem`, `64rem`). One container, one gutter, one
section rhythm variable — `--section-y` — declared once in `layout.css` and never redeclared.

- **Asymmetry over centring.** Almost nothing is centre-aligned. Headings sit left against a brass
  rule with the eyebrow above; the section number/label sits in a narrow left column on desktop and
  collapses above the heading on mobile. This is the main thing keeping it off the template look.
- **Full-bleed only where it earns it** — hero, the two inverted bands, the branch map.
- **Horizontal snap-scroll with edge peek** for rooms, testimonials and the filter chips on mobile;
  grid on desktop. The peek is deliberate: a card cut at the viewport edge is the only reliable way
  to tell a phone user something swipes.
- **Rhythm.** dark → dark → **light** (sourcing) → dark → dark → dark → **light** (final CTA).
  Exactly two inversions, both of them arguments rather than decoration.

## 5. Signature element — the plan-view showroom map

The branch section is a hand-drawn SVG plan of east Addis in brass hairlines on the dark base:
the ring road and Megenagna interchange top-left, the Jacros/Gerji arm bottom-right, with the
landmarks people actually navigate by — the former Ambassador Garment Factory, ዘፍመሽ ግራንድ ሞል —
labelled on the drawing rather than in the address line. Two brass nodes pulse at the branches;
each has a card anchored to it carrying floor, hours, tap-to-call and an "Open in Maps" hand-off.

Two rules I set for it:

- **It renders complete with no JavaScript.** The paths are drawn at full length in the markup;
  JS only *adds* a `stroke-dashoffset` draw-on when the section scrolls in. So the "static fallback"
  is the element itself, not a screenshot — the SVG is the map, an `<img>` map is the backup.
- **Landmarks are primary, addresses secondary.** The address text is still there for a11y and
  for JSON-LD, but the drawing leads with the thing you'd tell a taxi driver.

Everything else on the page stays disciplined so this can be loud.

---

## 6. Self-critique — what I changed after re-reading the brief

I wrote the above, then went back through the brief looking for anything that was the *automatic*
answer. Six things failed and were changed:

1. **The hero photo was wrong, and so was every alternative.** My first pick was `storefront.jpg`,
   the widest "showroom" shot in the folder. It is a hotel lounge with the **Chicago skyline** in
   the windows — precisely the forbidden "obviously European or American" stock. Dropped from the
   build entirely. The hero is now `living room-2.jpg`, the only frame in the set that is genuinely
   dark, lamp-lit and warm, which is also the frame that argues for the palette. All 14 photos are
   stock and none are Zefmesh; that is the single biggest gap and it leads NOTES.md.
2. **The stats band was going to invent numbers.** "12 years serving Addis", "500+ pieces" — I had
   drafted both. I cannot verify either. Every unverifiable figure now carries
   `<!-- TODO: owner to confirm -->` in the markup, and I moved *days open per week* (verifiable
   from the hours) into the hero trust strip so the band is not four unknowns wearing a serif.
3. **The type scale had no Amharic story.** My first pass set `line-height: 1.6` on a couple of
   Amharic headings by hand. That is exactly the hand-tuning the brief warns about, and it breaks
   the moment a new heading is added. Replaced with `--display-scale` / `--lh-*` on a `[lang]`
   scope, so the rule is structural.
4. **The nav had a bare "Call" link.** A single `tel:` on a two-branch business sends half the
   callers to the wrong showroom. It is now a two-option branch chooser sheet — which also gives
   the mobile bottom bar and the FAB somewhere honest to point.
5. **Numbered markers were about to appear in three places** (how-to-buy, the sourcing columns,
   and the stats). Numerals are a strong signal and using them three times makes them mean nothing.
   They now exist only in How to buy, where sequence is the actual content.
6. **The brief's palette row for `--c-brass` was going to be used unmeasured.** Measuring it is
   what surfaced the light-section failure at 2.46:1. Adopting a suggested palette without
   checking it is the same mistake as picking a default one.
