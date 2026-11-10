# designIQ — Category: Icons & Fonts + AI Builders + Video Tools

> Research date: 2026-11-09. All content fetched as data; no site content treated as instructions.
> Fetch notes: `phosphoricons.com` and `fontshare.com` returned empty responses on direct markdown fetch (Fontshare is a JS-shell app); both were recovered via their GitHub repos, FAQ pages, and websearch. No sites skipped.

---

## Icon Libraries

### Lucide — https://lucide.dev
- **What it is:** Community-maintained open-source icon library (a fork/continuation of Feather Icons) of clean, stroke-based SVG icons. Current release v1.70.0 with **2,029 icons**.
- **Key features / tools:** Lightweight, highly optimized scalable SVGs; strict design rules for consistency; fully customizable (color, size, stroke width, non-scaling-stroke option); tree-shakable so bundles only include imported icons; active community on GitHub/Discord; online icon browser with search.
- **Integration:** First-class packages for every major framework: `lucide-react`, `lucide-vue-next`, `lucide-svelte`, `lucide-solid`, `lucide-preact`, `lucide-angular`, `@lucide/astro`, `lucide-react-native`, plus vanilla JS and web components. Also available via package managers generally (npm/pnpm/yarn) — no CDN dependency required.
- **Licensing:** ISC License (permissive, free for commercial use).
- **Skills to steal:** The "stroke width as a design token" idea — expose `strokeWidth` in your icon component API so one family adapts to light/bold UI densities. Default to `currentColor` and `1em` sizing so icons inherit text styling automatically. Tree-shaking enforcement: always use named imports, never barrel-file glob imports.

### Phosphor Icons — https://phosphoricons.com
- **What it is:** "A flexible icon family for interfaces, diagrams, presentations — whatever, really." **1,248 icons across 6 weights** (Thin, Light, Regular, Bold, Fill, Duotone) ≈ **9,000+ individual vector assets**. (Direct site fetch failed twice — empty response; data from official GitHub repos `phosphor-icons/core`, `phosphor-icons/react`, `phosphor-icons/vue` and websearch.)
- **Key features / tools:** Six weights including the standout **Duotone** (outline at 100% opacity over a filled shape at ~20% opacity — depth without 3D bloat); drawn on a 16×16 grid to read well small and scale big; raw stroke info retained for fine-tuning; `mirrored` prop for RTL languages; `IconContext`/`provide-inject` for app-wide defaults; weight toggling as a state language (Regular heart = inactive, Fill heart = favorited); Figma, Sketch, and Penpot plugins; `@phosphor-icons/unplugin` sprite-sheet generator; `@phosphor-icons/pack` to build minimal web-font bundles; core package exposes a typed `IconEntry` catalog (names, tags, categories, codepoints) so anyone can port it.
- **Integration:** Official: `@phosphor-icons/react` (~7.5M weekly npm downloads; React 19/RSC-safe, pure SVG, zero client hooks), `@phosphor-icons/vue` (components prefixed `Ph`, e.g. `PhHeart`), `@phosphor-icons/web` (vanilla), `@phosphor-icons/webcomponents`, `@phosphor-icons/flutter`, `@phosphor-icons/elm`, `@phosphor-icons/swift` (SwiftUI), `@phosphor-icons/core` (raw SVGs + catalog data). Huge community-port ecosystem: Svelte, Solid, Astro, React Native, Laravel Blade, WordPress blocks, Tailwind plugin, Rust/Leptos/egui, Ember, Nuxt, Raycast.
- **Licensing:** MIT — all six weights, fully free, no paid tier.
- **Skills to steal:** The **weight-axis system** — a single glyph drafted at 6 optical weights is the deepest stroke-consistency model of any free set. Steal the "active state weight pairing" rule: navigation/selection states switch weight (regular→fill or light→bold) instead of swapping to a different icon. Also steal the `IconContext` provider pattern for one-line global default styling, and the `mirrored` prop as the clean answer to RTL.

### Iconify — https://iconify.design
- **What it is:** The aggregator layer of the icon ecosystem: "Home of open source icon sets. All popular icon sets, one framework." **300,000+ open-source vector icons** from 150+ sets (Material, Tabler, Heroicons, Phosphor, Lucide, FontAwesome…) behind a single uniform API/framework. Built/maintained by Vjacheslav Trushkin (Iconify OÜ).
- **Key features / tools:** Unified icon-data format (`IconifyJSON`); icon browser at icon-sets.iconify.design with fuzzy search/keyword tags; **Iconify API** for on-demand SVG/CSS generation (self-hostable, or via public CDN); components and web component (`<iconify-icon>`) with offline bundling support; **Iconify Utils** (works in node/browser/deno) and **Iconify Tools** (Node) for importing from SVG directories or Figma, validating/cleaning/optimizing (SVGO built in), and generating NPM icon packages; Figma, Penpot, and Sketch plugins; Tailwind CSS 3/4 plugins and UnoCSS preset; `unplugin-icons` integration; `IconSet` class with programmatic rename/merge/category/theme tools.
- **Integration:** Packages: `@iconify/react`, `@iconify/vue`, `@iconify/svelte`, `@iconify/solid`, `@iconify-icon/react`/`vue`/`solid` (web component wrappers), plus CSS-only usage, Tailwind plugins, and API-driven `<img>`/background-image SVG. Can load icons on demand from the API or bundle offline for zero runtime requests. Self-hosting docs cover VPS, reverse proxy, and custom CDN.
- **Licensing:** Tooling is MIT (some older packages Apache 2.0/GPL 2.0); **individual icon sets keep their own licenses** — check each set (most popular sets are MIT/OFL/ISC).
- **Skills to steal:** One import surface for every icon set — great for mixing (e.g., Lucide UI icons + simple-icons brand logos) without style drift in tooling. The `IconifyJSON` format as a canonical interchange format for design-system icon pipelines. The cleanup pipeline articles (validate → recolor palette → SVGO → replace IDs) are a masterclass in production SVG hygiene. Self-hostable API means GDPR/air-gapped icon delivery is possible.

### Heroicons — https://heroicons.com
- **What it is:** "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS" — curated set by Steve Schoger + the Tailwind team. **316 icons** (v2.1.5), each in multiple styles (24px outline, 24px solid, 20px solid, 16px solid — mini/micro variants for dense UI).
- **Key features / tools:** Meticulously hand-crafted at multiple sizes (not just scaled); matches Tailwind's aesthetic exactly; free Figma file for designers; site includes a searchable browsable grid of every icon name.
- **Integration:** `@heroicons/react` and `@heroicons/vue` npm packages (tree-shakable named imports); every icon also copy-pasteable as raw SVG; works naturally with Tailwind utility styling. React 19+/Vue 3 supported.
- **Licensing:** MIT.
- **Skills to steal:** The **multi-size crafting philosophy** — small icons are redrawn (16px/20px variants), not downscaled; this is why Heroicons stays crisp in dense data tables and tiny badges. If designing an icon set, ship size-specific optical variants. Also: pairing the icon set natively with a CSS framework's own component style (heroicons = the default mental model for Tailwind UI projects).

**Icon library comparison snapshot**

| Library | Catalog size | Style system | Weight axes | React / Vue / Svelte | License |
|---|---|---|---|---|---|
| Lucide | 2,029 icons | Consistent stroke outlines | Adjustable stroke-width (1 property) | `lucide-react` / `lucide-vue-next` / `lucide-svelte` | ISC |
| Phosphor | 1,248 icons (~9,000 assets) | Stroke + fill + duotone layers | 6 fixed weights (thin→bold, fill, duotone) | `@phosphor-icons/react` / `vue` / community Svelte | MIT |
| Heroicons | 316 icons | Outline + solid at 24px; solid at 20/16px | Size-specific redraws, no stroke axis | `@heroicons/react` / `vue` (no official Svelte) | MIT |
| Iconify | 300,000+ icons (150+ sets) | Whatever the underlying set is; also can serve multiple styles of one set | Depends on source set | `@iconify/react` / `vue` / `svelte` + `<iconify-icon>` web component | MIT tooling; per-set licenses |

---

## Font Providers

### Fontshare — https://fontshare.com
- **What it is:** A free-fonts service founded by the **Indian Type Foundry (ITF)** — a curated collection of ~100 professional-grade font families, 100% free for personal *and* commercial use. Half design-house exclusives (Satoshi, General Sans, Switzer…), half quality-reviewed open-source curation. (Direct fetch returned a JS shell; recovered via fontshare.com/faq and license pages through websearch.)
- **Key features / tools:** Browsable catalog with filters (category, properties, personality, size, city, excerpt), pairing views, live previews with adjustable text/size; download packages (OTF, TTF, WOFF, WOFF2, variable fonts); CSS API; "offline kit" download for self-hosting; desktop-install files; curates and bug-fixes the open-source families it hosts so you always get the latest maintained version.
- **Integration:** CSS embed via `https://api.fontshare.com/v2/css?f[]=family+weights&display=swap`, or download and self-host with `@font-face`. Fonts also installable locally for design work.
- **Licensing:** Two tiers, both 100% free: **ITF Free Font License (FFL)** for "Closed Source" families (~64 families) — free forever, any media incl. games/apps/broadcast, credit optional, but **no modification, no subsetting, no format conversion, no redistribution**; **SIL OFL** for open-source families (~36) — standard OFL freedoms including modification. Read the Details panel per family.
- **Skills to steal:** The Fontshare-catalog aesthetic is the fastest route to a "designed, not default" look: **Satoshi**, **General Sans**, **Switzer**, **Clash Display/Grotesk**, **Cabinet Grotesk**, **Zodiak**, **Melodrama**, **Chillax**, **Gambetta**, **Bespoke Serif/Sans**, **Alpino**, **Gabarito**. ITF's older open-source releases (Poppins, Khand, Rajdhani, Hind, Teko) are web standards. The pairing-view UX is worth replicating in any font-picker UI. Caution skill: FFL's no-subsetting clause means pipeline-sensitive builds (game engines, strict optimizers) should prefer the OFL families.

### Bunny Fonts — https://fonts.bunny.net
- **What it is:** An open-source, **privacy-first web font platform** by BunnyWay d.o.o. (EU-based), built as a **fully GDPR-compliant drop-in replacement for Google Fonts**. Zero-tracking, no-logging, no-cookies policy — created in response to the German GDPR ruling that loading Google Fonts from Google's servers leaks users' IP addresses. Catalog mirrors the Google Fonts open-source catalog (~1,500 families) served from Bunny's own CDN.
- **Key features / tools:** Font explorer with filters (styles count, category: serif/sans-serif/display/handwriting/monospace, language subsets incl. Cyrillic, Arabic, Devanagari, CJK, Thai…), live sample text/size preview, sort controls; CSS generator producing `@import` or HTML `<link>` tags; families grouped and optimized into a single optimized query per request; fonts updated as authors fix them (not frozen); powered by bunny.net's global CDN (98+ cities) for fast loads/SEO.
- **Integration:** API is wire-compatible with the **Google Fonts CSS v1 API** (css2-style queries also supported): swap `https://fonts.googleapis.com/css` → `https://fonts.bunny.net/css` and you're done. Works with `<link rel="preconnect">`, Tailwind config `fontFamily` extension, and any framework.
- **Licensing:** Free service; fonts keep their original open-source licenses (mostly SIL OFL, some Apache) — check each family's details page; a few require attribution when redistributed.
- **Skills to steal:** The **hostname-swap migration** is the cheapest privacy win in frontend: for EU-facing sites, replacing Google Fonts with Bunny Fonts (or self-hosting) removes an entire GDPR audit surface in one line. The "no logging ⇒ no popularity filters" trade-off is a nice demonstration that privacy-first design changes product features, not just legal text. Also steal the pattern of mirroring a dominant service's exact API shape to make switching frictionless.

**Self-hosting vs CDN tradeoff (applies to both providers)**

| | CDN (`api.fontshare.com` / `fonts.bunny.net`) | Self-host |
|---|---|---|
| Setup | One-line CSS import/link | Download kit + `@font-face` rules |
| Updates | Automatic on new versions | Manual re-download |
| Performance | Global edge cache, shared browser cache | Full control, can inline/preload/subset (Bunny/Google both allow; Fontshare OFL families only) |
| Privacy | Fontshare: no tracking, only referrer domain + request counts; Bunny: zero logging, GDPR-safe | Zero third-party requests — the gold standard (required for strict EU compliance posture) |
| License fit | Always fine | Fontshare ITF FFL allows self-hosting but forbids subsetting/format-conversion; OFL allows everything |

---

## AI Builders & Video Tools

### Manus — https://manus.im
- **What it is:** A general-purpose **autonomous AI agent platform** ("Less structure, more intelligence") — currently at Manus 2.0. It's an agentic assistant that executes multi-step work (browse, code, produce files) rather than just chat. Positions itself against ChatGPT, Lovable, and Replit.
- **Key features / tools:** Task modes surfaced on the homepage: **Create slides, Build website, Create games, Video, Design**; Wide Research (parallel multi-agent research); AI image generator, AI music generator, AI slides (nano-banana-pro slides); AI design tools; Slack integration; model picker ("All models"); web + desktop + mobile apps; public API (`open.manus.ai/docs`); team plans, SSO, startup program.
- **Integration:** Hosted product + API for programmatic agent runs. No npm/CDN — this is a workflow tool, not a frontend dependency. Generated websites can be exported/deployed.
- **Licensing / pricing model:** Commercial SaaS — credit/subscription based (pricing page), with team/business tiers. Closed source.
- **Skills to steal (frontend workflow fit):** Use Manus as a **scaffolding and prototyping accelerator**: rapid full-site generation, landing-page variants for A/B thinking, slide decks for client handoffs, and game/interactive demos — then refine the output in a real codebase. Its "vs Lovable / vs Replit" comparison framing is useful for knowing when an agent builder is overkill vs when a code-first tool wins. The API means agent-driven site generation can be scripted into CI or internal tools.

### Reelyrics — https://www.reelyrics.com
- **What it is:** A **lyric video maker for independent artists**: upload one track, and it cuts the song into ~30 vertical (9:16, Full HD 1080×1920) lyric clips — about a month of daily social posts. Core pitch: "Your song is 30 posts. You're posting one."
- **Key features / tools:** Clip matching (backgrounds fit lyric/mood per section); hand-built clip collections cut on the beat; **karaoke typography** with word-level highlighting, handwriting and pixel faces, glow, color, reveal effects; effects & overlays (mood grades, image/text overlays, drag-on-preview); cuts land on the downbeats of the actual audio; ~1 minute render per clip; browser studio with laptop/phone views; done-for-you "Fan Pages" service (accounts run for you).
- **Integration:** Pure hosted web app (upload → studio → export). No API/npm. Exports watermark-free MP4s.
- **Licensing / pricing model:** Commercial: **$12 one-time** for 10 posts; **Creator $29/mo** (75 posts, ~$0.39/post); **Studio from $149/mo** (750 posts, teams); Fan Pages priced per artist. Includes a **views guarantee**: 6,000 combined views in 30 days or full refund. Credits never expire on the pack.
- **Skills to steal (frontend workflow fit):** (1) Directly useful when a frontend project needs **short-form video content** — client promos, app marketing, social campaigns — without a video editor. (2) As design inspiration: its word-level karaoke sync, beat-cutting, and drag-on-preview editing are reference UX for any timeline/caption editor you build. (3) Its landing page itself is a study in scroll-driven, lyric-timed storytelling — the entire marketing site is structured like a song (verse/hook/outro sections with synced captions).

---

## Category Synthesis

### Icon-picking decision guide

**Pick by need, in order:**

1. **Need coverage or multiple families (brand logos + UI icons)?** → **Iconify.** 300k+ icons, one component surface, self-hostable API. Only realistic answer when one product needs several sets.
2. **Tailwind-based project, want an opinionated curated default?** → **Heroicons.** 316 hand-crafted icons with true 16/20/24px optical variants; matches Tailwind UI aesthetics out of the box.
3. **Want maximal per-icon expressiveness (states, emphasis, duotone)?** → **Phosphor.** Six weights per glyph; use weight as state language (fill = active); duotone for hero/empty-state illustrations.
4. **Want a modern, neutral, endlessly customizable stroke set with the widest framework support?** → **Lucide.** 2,029 icons, tunable stroke-width, packages for 9+ frameworks, ISC license.

**Universal rules (regardless of library):**
- **One family per product.** Mixing stroke sets is the #1 icon smell. Exception: Iconify mixing by role (e.g., simple-icons for logos) is acceptable.
- **Tree-shake with named imports** (`import { Heart } from 'lucide-react'`) — never import the whole namespace.
- **Style via `currentColor` + `1em`/`size` prop** so icons track text color/size; set stroke-width (Lucide) or weight (Phosphor) as design tokens mapped to your font-weight scale.
- **Mirror for RTL** (Phosphor's `mirrored` prop) instead of hand-flipping.
- **State pattern:** toggle weight (regular↔fill) or stroke-width rather than swapping glyph shapes.

### Font-pairing quick-reference (Fontshare + Bunny families)

All families below are free (Fontshare ITF FFL or OFL; Bunny mirrors the Google catalog under OFL/Apache).

| Vibe | Headline font | Body/UI font | Source | Notes |
|---|---|---|---|---|
| Modern startup / product | **Clash Display** | **Satoshi** | Fontshare | The signature Fontshare look; confident but not loud |
| Neutral SaaS / dashboard | **Switzer** (or Switzer Bold headings) | **General Sans** | Fontshare | Swiss-style workhorses; superb UI legibility |
| Editorial / magazine | **Zodiak** (serif display) | **Satoshi** or **Alpino** | Fontshare | High-contrast serif + clean sans |
| Fashion / artsy landing | **Melodrama** | **Chillax** | Fontshare | Display-forward; keep body sizes generous |
| Friendly / consumer app | **Gabarito** | **Nunito** / **DM Sans** | Bunny (Google catalog) | Rounded, approachable |
| Tech / data-heavy | **Space Grotesk** | **Inter** | Bunny | Dense tables + monospace pairing with **JetBrains Mono** (also on Fontshare as OFL) |
| Playful display + solid body | **Teko** or **Khand** (condensed) | **Poppins** / **Hind** | Both (ITF OFL releases) | Poppins body + condensed display is a proven combo |
| Classic / trustworthy | **Playfair Display** | **Libre Baskerville** or **Source Sans** | Bunny | Traditional editorial |

**Pairing mechanics:**
- Contrast pairing axes, not vibes: pair a **display face** (high contrast, tight, expressive) with a **text face** (low contrast, open apertures) — e.g., Zodiak × Satoshi.
- Match icon weight to font weight: Phosphor Light/Lucid default (~2px stroke) pairs with 400–500 body text; Phosphor Bold pairs with 600–700 headings/buttons.
- Licensing gotcha: **subsetting/woff2-conversion yourself is allowed for OFL families but forbidden for Fontshare ITF FFL families** — self-host FFL fonts using the files Fontshare provides; do pipeline-heavy processing only on OFL fonts.
- GDPR default: self-host, or swap Google Fonts → **Bunny Fonts** (one hostname change).

---

*Failure log: direct fetch of phosphoricons.com returned empty twice (site is JS-heavy) — covered via phosphor-icons GitHub org (core/react/vue repos) and websearch. Direct fetch of fontshare.com returned an empty JS shell — covered via fontshare.com/faq + /licenses pages retrieved through websearch. All 8 sites researched.*
