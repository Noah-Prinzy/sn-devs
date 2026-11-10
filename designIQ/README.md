# designIQ — Isagi's Design Knowledge Base

> A dataset of skills distilled from ~70 hand-picked frontend/design resources (`design_base.md`) plus my own engineering expertise. This is the permanent operating knowledge of **Isagi**, the workspace's official frontend developer.

## Directory

```
designIQ/
├── ISAGI.md                    # Who I am, how I think, operating loop
├── README.md                   # This index
├── principles/                 # Foundation layer — distilled expertise
│   ├── visual-design-foundations.md      # hierarchy, spacing, layout, depth, dark mode
│   ├── typography-and-color.md           # type scales, pairing, palette building, tokens, gradients
│   ├── motion-and-interaction.md         # timing, easing, choreography, scroll, performance
│   ├── ux-and-accessibility.md           # UX laws, states, forms, flows, WCAG 2.2
│   ├── app-shells-and-blocks.md          # 5 shells, marketing block library, dashboard blocks
│   └── component-design-and-architecture.md  # component APIs, tokens, structure, state, perf, SEO
└── sources/                    # Field layer — per-website intelligence
    ├── design-inspiration.md             # Godly, Mobbin, Cosmos, Savee, Layers, Figma Community…
    ├── ui-component-libraries-1.md       # shadcn/ui, HeroUI, Aceternity, Watermelon, Componentry…
    ├── ui-component-libraries-2.md       # React Bits deep-dive, 21st.dev, Preline, Cult, Hyper…
    ├── elite-design-engineering.md        # Linear, Vercel, Stripe, Raycast teardowns + premium checklist
    ├── stack-tailwind-shadcn-radix.md     # Tailwind v4, shadcn registry protocol, Base UI/Radix
    ├── education-design-engineering.md    # Comeau, animations.dev, web.dev — condensed curriculum
    ├── conversion-ux-evidence.md          # GoodUI tests, 30 UX laws, NN/g heuristics, ethics
    ├── design-systems-templates.md       # design prompts/skills, Astro, HTML5 UP, templates
    ├── colors-gradients-backgrounds.md   # Realtime Colors, Coolors, Shader Gradient, Vanta…
    ├── 3d-animation-graphics.md          # Spline, GSAP, Motion, Theatre.js, Unicorn Studio…
    ├── icons-fonts-tooling.md            # Lucide, Phosphor, Iconify, Fontshare, Bunny, Manus
    └── asset-tools-portfolio.md          # React Bits tools + award-grade portfolio teardowns
```

## How knowledge is used

1. **Principles layer** = the rules (what good looks like, and why).
2. **Sources layer** = the vocabulary (real patterns, tools, and techniques from the field).
3. When building for you, I combine both: principles govern decisions; sources supply patterns, libraries, and assets to reach for.

## Dataset build status

| Unit | Scope | Status |
|---|---|---|
| Foundations | 6 principle files | ✅ Complete |
| Unit A | Design inspiration (11 sites) | ✅ Complete — all 11 covered |
| Unit B | UI libraries 1 (8 sites) | ✅ Complete — Amicro recovered via search (HTTP 429) |
| Unit C | UI libraries 2 + React Bits deep-dive (8 sites + 5 tools) | ✅ Complete — no failures |
| Unit D | Design systems & templates (8 sites) | ✅ Complete — no failures |
| Unit E | Colors & backgrounds (8 sites) | ✅ Complete — 2 supplemented via search |
| Unit F | 3D & animation (8 sites) | ✅ Complete — 2 recovered via search |
| Unit G | Icons, fonts & tooling (8 sites) | ✅ Complete — 2 JS-shell sites recovered |
| Unit H | Asset tools & portfolios (10 URLs) | ✅ Complete — sirio.online dead (documented) |

**Dataset total (Phase 1):** ~235 KB. All ~65 unique sites from `design_base.md` researched; every failure documented with its recovery method.

## Phase 2 status (expansion beyond the base file) — ✅ COMPLETE

| Unit | Scope | Status |
|---|---|---|
| Elite design engineering | Linear, Vercel, Stripe, Raycast, Awwwards trends, Refactoring UI | ✅ 12-bullet DNA do-list + 12-item premium-feel checklist |
| Stack deep-dive | Tailwind v4 `@theme`, shadcn registry protocol, Base UI/Radix | ✅ 5-layer cake architecture; Base UI now default primitive layer (2026) |
| Education curriculum | Comeau, animations.dev (Emil Kowalski), web.dev, iShadeed, CSS-Tricks, Smashing | ✅ 4-phase ordered curriculum + 10 transferable lessons |
| Conversion & UX evidence | GoodUI (tested, n-sampled), 30 Laws of UX, NN/g, CXL, Growth.Design | ✅ 20-item conversion checklist + dark-pattern ethics framework |

Dataset now: **20 files** — 12 sources + 6 principles + ISAGI + README.

## Phase 3 candidates (future expansion)

- Award-site case studies (Awwwards, Godly picks, Linear/Vercel/Stripe design engineering blogs)
- Tailwind + shadcn advanced patterns, Radix primitives deep-dive
- Landing page & dashboard teardown series (block-by-block)
- Micro-copy and content design resources
- WebGL/Three.js for developers (react-three-fiber)
