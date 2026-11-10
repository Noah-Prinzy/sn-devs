# Typography & Color

## Typography

### Type scale

Pick a ratio and generate the scale (Tailwind's default ≈ 1.25 "major third" with tweaks):

```
xs 0.75rem · sm 0.875rem · base 1rem · lg 1.125rem · xl 1.25rem
2xl 1.5rem · 3xl 1.875rem · 4xl 2.25rem · 5xl 3rem · 6xl 3.75rem · 7xl 4.5rem+
```

- Body text: 16px minimum (1rem), 15px acceptable for dense UI, never below 12px.
- Hero headings: 40–72px desktop, 32–40px mobile, `clamp()` for fluidity.

### Readability rules

- **Line length (measure):** 45–75 characters for body text; ~60 is ideal. `max-width: 65ch`.
- **Line height:** 1.5–1.6 body, 1.2–1.3 headings, 1.0–1.1 display. Tighten line-height as size increases.
- **Letter spacing:** negative tracking on large headings (-0.02em to -0.04em) — this alone makes type look professional. Slight positive tracking on ALL-CAPS labels (+0.05–0.1em).
- **Font weight contrast:** pair a heavy heading (600–800) with regular body (400). Two weights are usually enough; three max.

### Pairing (proven recipes)

| Style | Heading | Body |
|---|---|---|
| Modern SaaS | Inter / Geist | same family, 400 |
| Editorial premium | serif: General Sans / Fraunces / Instrument Serif | sans: Satoshi / Inter |
| Technical/dev | mono accents: JetBrains Mono / Geist Mono | Inter / IBM Plex Sans |
| Bold brutalist | Archivo / Space Grotesk (700) | same, 400 |

Free high-quality families live on Fontshare (Satoshi, General Sans, Cabinet Grotesk) and Bunny Fonts (GDPR-friendly Google Fonts mirror). Self-host with `font-display: swap`; subset to needed weights.

## Color

### Building a palette

1. **Brand hue** — the primary. Generate 9–11 steps (50→950) like Tailwind: 500 = base brand, 600 = hover, 400/300 for dark mode.
2. **Neutrals** — gray with a HINT of the brand hue (e.g., blue-gray for a blue brand). Pure gray feels dead; tinted neutrals feel designed.
3. **Semantic** — success `emerald/green`, warning `amber`, danger `red`, info `blue`. Also define their dark-mode variants.
4. **Accent** (optional) — one saturated secondary for highlights/illustrations.

### The 60-30-10 rule

60% dominant (backgrounds, surfaces) · 30% secondary (text, cards, borders) · 10% accent (CTAs, links, highlights). If your accent is everywhere, it's not an accent.

### Semantic tokens (always do this)

Define colors by ROLE, not value, so re-theming is trivial:

```css
--background / --foreground / --card / --muted / --border
--primary / --primary-foreground / --secondary / --accent
--destructive / --ring
```

(shadcn/ui convention — components reference tokens; themes swap token values.)

### Contrast (WCAG)

- Body text: ≥ 4.5:1 against its background (AA); large text (≥24px or 18.66px bold): ≥ 3:1.
- UI components & graphical objects (borders, icons): ≥ 3:1.
- AAA is 7:1 — aim for it on body text when feasible.
- Placeholder text is exempt from nothing — it must still pass contrast.
- Test both modes: a palette that passes on white often fails on `#0a0a0a`.

### Gradient recipes

- Subtle surface wash: `radial-gradient(120% 120% at 50% 0%, brand-500/15, transparent)` on dark heroes.
- Mesh gradients: 2–3 blurred radial blobs on a dark/neutral base — cheap, gorgeous, performant if blurred via CSS not images.
- Text gradients: `bg-clip-text` with 90–120° linear between two adjacent hues; reserve for ONE display element per view.
- Grain/noise overlay (SVG feTurbulence at 3–6% opacity) kills banding and adds tactility to large gradient areas.

### Color checklist

- [ ] 9–11 step brand scale + tinted neutrals + 4 semantic colors
- [ ] Semantic token names, not raw values, in components
- [ ] 60-30-10 respected; accent used on ≤10% of the surface
- [ ] All text passes 4.5:1 (3:1 large) in light AND dark mode
- [ ] Focus ring color defined and visible on both modes
