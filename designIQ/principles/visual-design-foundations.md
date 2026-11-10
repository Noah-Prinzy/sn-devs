# Visual Design Foundations

## Visual hierarchy

The order the eye follows. Controlled by four levers (in power order):

1. **Size** — biggest element wins attention first
2. **Weight/contrast** — bold, high-contrast elements pop
3. **Color** — saturated/accent color draws the eye; use sparingly
4. **Space** — isolation creates importance; whitespace is a spotlight

**Rules:**
- Every screen has exactly ONE primary action (1 CTA). Secondary actions are visually quieter (ghost/outline buttons).
- Use a 3-tier hierarchy on every view: primary (1 element), secondary (2–4 elements), tertiary (everything else).
- Squint test: blur the design — can you still tell what the page is about and where the CTA is?

## Spacing system

Use a consistent scale — 4pt base, powers/rational steps:

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128
```

(Tailwind equivalents: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32)

**Rules:**
- Related things sit close (proximity = grouping). Section padding ≥ 64–96px on marketing pages; card padding 16–24px.
- Spacing between sections should be larger than spacing within sections (the grouping rule).
- Never use magic numbers. If a value isn't on the scale, justify it or change it.

## Layout & composition

- **Grid:** 12-column grid for desktop, 8–12px gutters, max-width containers: 1200–1280px (marketing), 1440px+ (dashboards often full-width with maxed content areas).
- **Optical alignment:** align text to its visual edge (cap height/x-height), not the bounding box. Nudge icons 1–2px to center optically.
- **The rule of thirds & asymmetry:** centered hero text is safe; left-weighted asymmetric layouts feel more designed. Break the grid deliberately, not accidentally.
- **Rhythm:** keep a consistent vertical rhythm — line-height multiples of 4pt.

## Responsive strategy

- **Mobile-first.** Base styles = mobile; `min-width` media queries layer up.
- Breakpoints (Tailwind defaults): `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Design 3 layouts per page mentally: mobile (<768), tablet (768–1023), desktop (1024+).
- Fluid type & space: `clamp(min, preferred, max)` — e.g. `font-size: clamp(2.5rem, 6vw, 4.5rem)` for heroes.
- Touch targets ≥ 44×44px (Apple) / 24×24px minimum (WCAG 2.2).

## Depth & materiality

- **Elevation:** shadows communicate layering. Use a shadow scale (sm/md/lg) with low-opacity, large-blur shadows: `0 1px 2px rgb(0 0 0 / 0.05)`, `0 4px 12px rgb(0 0 0 / 0.08)`, `0 20px 40px rgb(0 0 0 / 0.12)`.
- **Modern surface styles:** glassmorphism (backdrop-blur + translucent bg + 1px light border), soft UI, flat-with-border. Pick ONE material language per product and stick to it.
- **Borders over shadows in dark mode** — shadows barely read on dark backgrounds; use 1px `white/10` borders and subtle surface-lightening instead.

## Dark mode

- Never invert. Desaturate and elevate: dark surfaces go from `#0a0a0a` (page) → `#141414` (card) → `#1e1e1e` (elevated).
- Reduce saturation of brand colors by ~10–20% for text/backgrounds; keep accents vivid for interactive elements only.
- Contrast direction flips: instead of dark-on-light shadows, use light borders + lighter surface steps.

## Polish checklist

- [ ] One clear focal point and one CTA per view
- [ ] All spacing on the 4pt scale
- [ ] Alignment is pixel-perfect; optical alignment on icons/text
- [ ] Consistent corner radius scale (e.g., 6/10/16 or full-round)
- [ ] Consistent border width (1px default, 2px for emphasis)
- [ ] Images have aspect ratios reserved (no CLS)
- [ ] Hover/focus/active/disabled states designed for EVERY interactive element
