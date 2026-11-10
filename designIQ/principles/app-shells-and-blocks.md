# App Shells & Block Patterns

## App shell = the permanent chrome

Choose the shell BEFORE building pages. The five canonical shells:

| Shell | Anatomy | Use for |
|---|---|---|
| **Sidebar dashboard** | fixed left sidebar (240–280px, collapsible to icons) + top bar (search, actions, avatar) + scrollable content | SaaS apps, admin, analytics |
| **Top-nav marketing** | sticky translucent top bar + full-bleed sections + rich footer | landing pages, product sites |
| **Docs 3-pane** | left TOC nav + centered content (65–75ch) + right "on this page" | documentation, guides |
| **Mobile tab bar** | bottom 4–5 tabs + stack navigation | mobile apps / PWA |
| **E-commerce** | top nav w/ mega-menu + faceted filters sidebar + grid + sticky buy bar on PDP | shops |

**Shell rules:**
- Sidebar: group items under section labels; max ~8 visible items per group; active state = tinted bg + accent left-edge or text color.
- Top bar: 56–64px tall; primary search in the middle (⌘K palette is the modern upgrade); avatar/menu right.
- Sticky headers: add a border/backdrop-blur only AFTER scroll (`scrolled` state), never by default.
- Content max-width: 1200–1280px marketing; dashboards fluid but cap text-heavy zones at ~75ch.

## Block library (marketing pages)

Build pages from proven blocks — each has variants; pick by message:

- **Hero:** (1) centered statement + dual CTA + product shot; (2) left copy / right visual (screenshot, 3D, video); (3) full-bleed media with overlaid text. Include: benefit-driven headline (outcome, not feature), subline with mechanism, primary + secondary CTA, trust signal (logos, rating, "no credit card").
- **Logo bar:** grayscale logos, opacity 60%, height-consistent, "Trusted by 1,000+ teams".
- **Feature grid:** 3-col cards with icon + title + one-line benefit; alternate with bento grids (asymmetric cell spans) for visual richness — bento is the 2024+ premium pattern.
- **Social proof:** testimonial cards (photo, name, role, company, specific result), pull-quote feature, or stats row ("10x faster · 50k users · 99.9% uptime").
- **Pricing:** 2–4 tiers, recommended tier highlighted (ring + badge + slight scale), annual/monthly toggle with ~20% savings, feature lists with check icons, FAQ below.
- **CTA band:** high-contrast full-width block near page end, single button.
- **FAQ:** accordion (details/summary or Radix), 5–8 questions that handle objections.
- **Footer:** 4-column sitemap + newsletter + socials + legal row; big-word footer (giant brand name) is the premium touch.

**Page assembly order:** Hero → social proof → features (problem→solution order) → how it works → testimonials → pricing → FAQ → final CTA → footer.

## Dashboard blocks

- **KPI stat cards:** label, big number, delta badge (+12% green/red), sparkline. 4 per row desktop.
- **Data tables:** sticky header, row hover, sortable columns, zebra optional, bulk-select, pagination or virtualization >200 rows, column visibility for density.
- **Filter bar:** search + facet dropdowns/chips + date range; active filters as removable chips.
- **Charts:** one metric per chart, direct labels over legends, tooltips on hover, 12px axis text, muted gridlines.
- **Detail drawer/sheet:** side panel for inspecting a row without losing table context.
- **Command palette (⌘K):** global navigation + actions; the modern power-user pattern.

## Portfolio/showcase blocks

- Giant-type hero with role statement; case-study grid with large imagery (3:2 or 16:10), hover video/GIF preview; case study = problem → process → outcome with metrics; about page with personality; contact CTA repeated 3× per page.

## Page-level patterns

- **Above the fold** must communicate: what it is, who it's for, what to do next — in < 5 seconds.
- **Scroll depth:** place a CTA roughly every 2 viewports on marketing pages.
- **Whitespace budget:** premium = generous. When in doubt, double the padding.
