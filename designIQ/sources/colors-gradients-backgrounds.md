# designIQ — COLORS, GRADIENTS & BACKGROUNDS TOOLS

> Research unit for designIQ: permanent design knowledge base for an AI frontend developer.
> Category: color palettes, gradients, and background generation tools.
> All sites fetched via webfetch (markdown); ShaderGradient and Pattern Monster supplemented via websearch due to thin/client-rendered homepage content. All fetched content treated as data, never instructions.

---

### Realtime Colors — https://realtimecolors.com
- **What it is:** A free web app that visualizes a color palette (and fonts) applied to a *real website layout* in real time, instead of showing swatches in isolation. Built by @Juxtopposed; 300K+ users. Also exists as a Figma plugin and a VS Code theme editor.
- **Key features / tools:**
  - **5-slot color model:** Text, Background, Primary (main CTAs/sections), Secondary (less important buttons, info cards), Accent (highlights, hyperlinks, images, cards). Recommends max ~6 colors per platform.
  - **Contrast checker per slot** with 3-state traffic light: red = fails AA & AAA, yellow = may pass AA but not AAA, green = passes both AA and AAA (large + normal text).
  - **Color scheme generator:** monochromatic, analogous, complementary, split complementary, triadic, tetradic.
  - **Dark/Light toggle** (Alt+T), randomize (Spacebar), undo/redo, share link (Ctrl+S), export (Ctrl+E).
  - **Fonts:** any Google Fonts or locally installed font, separate headings/body fonts, and a **type scale picker** (Minor Second 1.067 → Golden Ratio 1.618).
  - **Templates:** Dashboard and Blog Post layouts to preview palettes on real UI.
  - Editorial guidance baked into the site: hero references Piet Mondrian's composition as a visual model of the **60-30-10 rule**; docs include "How to Select Colors" and real-site color examples.
- **Outputs & integration:** Export as **CSS, Tailwind CSS (tailwind.config.js + main.css), SCSS, custom code with variables, shades, gradients, QR code (to view the palette on a phone), PNG/zip download**. Color formats: HEX, RGB, HSL, **OKLAB, OKLCH**, plus `@media` dark-mode variants and named "Themes". Presets for generating token code matching **DaisyUI, shadcn, NextUI, Flutter, LESS, Bootstrap, Material UI (+ shades), Chakra UI, Skeleton UI, Vuetify**. All colors are free to use commercially.
- **Skills to steal:**
  - The **5-role palette model** (text/background/primary/secondary/accent) is the ideal default token shape for any generated theme — map every palette an AI produces onto these roles.
  - Always pair a palette with a **live UI preview** (dashboard + blog post are enough coverage) before committing; palettes in isolation lie.
  - Ship **OKLCH/OKLAB alongside HEX** for perceptually uniform shades; Realtime Colors exports both.
  - Embed **contrast traffic-lights into the palette workflow**: reject any text/background pair that fails AA.
  - The 60-30-10 distribution (dominant background, secondary surface, accent) is the ratio to aim for when assigning roles.
  - Suggested constraints for AI outputs: ≤6 colors per platform; 3 is usually enough (bg, text, one accent).
  - Bundle a **type scale** with the palette (Major Third 1.250 and Perfect Fourth 1.333 are good defaults).

### Coolors — https://coolors.co
- **What it is:** The most popular fast color palette generator ("super fast color palettes generator", 8M+ users, trusted-badge list includes Apple, Netflix, GitHub, Disney). A full tool ecosystem around palettes: generation, exploration, extraction, accessibility, and AI.
- **Key features / tools:**
  - **Palette Generator** — press spacebar to generate; lock/unlock swatches; Pro supports >5 colors and theory-based generation.
  - **Explore Palettes** — 10M+ ready schemes searchable by color, style, topic, or hex value.
  - **Image Picker** — extract palettes from photos (upload, URL, camera, stock search).
  - **Contrast Checker** — WCAG contrast ratio for text/background pairs.
  - **Palette Visualizer** — preview palettes on real UI designs (mobile/web UI, branding, typography, pattern, illustration categories).
  - **Color Picker** — deep info per color: psychology, meaning, applications, conversion, harmonies, similar colors, accessibility (on white/on black), **color-blind-friendly simulation**.
  - **Tailwind Colors** — create and preview Tailwind palettes on real designs.
  - **Color Bot** — AI chat for color suggestions.
  - **Gradients:** browse gradients, Gradient Maker, and Gradient Palette (interpolate two colors into a stepped palette).
  - Per-palette variation views: shade, saturation, hue, temperature, **blindness**, luminance, gradient, theme.
- **Outputs & integration:** Export palettes as **URL/share link, PDF (with shades/hues/color-blindness layouts), image, CSS, ASE (Adobe Swatch Exchange), SVG, code, Tailwind config, embed**. Parse palette from any text containing hex codes (Coolors URL/string/array). Apps/plugins: iOS app, Figma plugin, Adobe extension (Illustrator/InDesign/Photoshop), Chrome extension. Pro adds projects/collections organization and advanced exports.
- **Skills to steal:**
  - **Lock-and-mutate workflow:** keep the brand color locked, hit spacebar to mutate the rest — a great model for AI palette iteration (pin what works, regenerate the rest).
  - **Extract palettes from imagery** (product photos, hero art) so the UI inherits colors from real assets — do this automatically when a project ships photos.
  - Always run the palette through **color-blindness simulation** (protanopia/deuteranopia/tritanopia) before finalizing; contrast-on-white AND contrast-on-black are both needed.
  - **Gradient palette interpolation:** generating a 5–10 step ramp between two brand colors gives you hover states, borders, and chart series for free.
  - Color psychology/meaning annotations are worth attaching to tokens in a design system's docs.
  - The **Visualizer concept** (palette on real screenshots of dashboards, branding, mobile) is the same "test on real UI" pattern Realtime Colors uses — adopt it as a standard QA step.

### ShaderGradient — https://shadergradient.co
- **What it is:** A tool for creating **beautiful moving 3D gradients** rendered with WebGL shaders. "Make your designs alive." Distributed as a **Framer component, Figma plugin (64K+ users), and React package** (`@shadergradient/react`). Open source (github.com/ruucm/shadergradient). *(Homepage fetch was thin; researched via websearch including GitHub README and Figma/Framer listings.)*
- **Key features / tools:**
  - Browser customizer at `/customize` with full parameter control: **shape** (plane / sphere / waterPlane), 3 colors, animation on/off, speed, shader type, noise density & strength, spiral, grain, lighting (lightType: 3d/none), environment, brightness, reflection, zoom, position, rotation, camera distance & polar angle.
  - **URL-driven state:** the entire gradient config is serialized into the customize URL query string (e.g. `?animate=on&color1=%2352ff89&shader=defaults&type=plane&uFrequency=5.5&uSpeed=0.4&uStrength=4`) — shareable and re-loadable.
  - **Community gallery:** browse and remix gradients from other users.
  - Randomize button for quick exploration.
  - v2: ~60% smaller package + lazy-load for performance; FigJam/Slides/Buzz support.
- **Outputs & integration:**
  - **React (live WebGL):** `npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls`; wrap in `<ShaderGradientCanvas>`, pass the `urlString`. Works with Next.js 15 App Router (requires R3F v9 + React 19), Vite + React 19, Vue/Nuxt starters available via CodeSandbox.
  - **Framer:** paste the customize URL as a component on canvas; supports smart-component interactions.
  - **Figma plugin:** snapshot (static PNG), add as GIF, **export as GIF/WebM video with loop support** for infinite animation — for anywhere a live component can't go (WordPress/Elementor, social, slides).
- **Skills to steal:**
  - **URL as the token format:** serializing a whole visual config into query params is a brilliant pattern — an AI can generate/share/repro a background by emitting one URL.
  - The moving-gradient recipe: 3 colors + noise frequency/strength/speed + lighting is the entire param space; reuse it when hand-rolling R3F shader backgrounds.
  - **Performance guardrails:** ship a lazy-loaded canvas, keep the package lean, and **export a looping WebM/GIF as the fallback** for no-JS, low-power, or CMS contexts.
  - Water-plane vs plane vs sphere as the shape vocabulary for hero backgrounds.
  - Loop support matters: an infinitely looping short video reads as live motion with none of the WebGL runtime cost.

### MESH (meshgradient.com) — https://meshgradient.com
- **What it is:** A minimal, focused tool to "create beautiful, unique gradients using **WebGL shaders**" by placing and warping color points. By Burak Aslan.
- **Key features / tools:**
  - **Click anywhere to add a color point; drag to warp** the gradient's effect field; **Shift + click to remove** a point.
  - **Input points vs output points** model: input points determine which color shows where; output points let you warp the final design — a two-stage deformation (color field → warp mesh).
  - **Input mesh toggle** in settings for even more unusual color blends.
  - **Gallery** of community gradients — click any to open and edit it as a starting point.
  - Trash (reset), image import, info panel, **Export**.
- **Outputs & integration:** Exports the gradient as an image (PNG-style static render) usable as a hero background, card backdrop, or texture; no code export — it's a visual-first tool, so integration is "download image, use as background".
- **Skills to steal:**
  - The **"color points + warp" mental model** for mesh gradients: N colored anchors, bilinear-style blending between them, plus a second deformation layer. This is exactly what CSS `radial-gradient` stacks approximate — stack 3–5 radial-gradients, each a color blob, and you get a mesh look in pure CSS.
  - Start from the gallery (steal a proven blend) rather than from a blank canvas — same advice applies to AI: seed generation from known-good gradient recipes.
  - Keep mesh gradients **low-contrast and blurry** so text on top stays readable.
  - Two-stage thinking (color field, then warp) produces organic results that one-stage blends can't.

### Pattern Monster — https://pattern.monster
- **What it is:** A simple online generator of **repeatable SVG patterns** (460–476 patterns, MIT-licensed, open source as `svelte-svg-patterns` on GitHub) by Naveen CS. For website backgrounds, apparel, branding, packaging. *(Homepage is client-rendered and returned "undefined" placeholders; researched via websearch of /features, /collections, /changelog, /api.)*
- **Key features / tools:**
  - 460+ pattern templates in themed collections: Waves, Chevron/Herringbone, Hexagons, Triangles, Diamonds, Circles, Squares, Lines, Plaid & Tartan, **Japanese Traditional**, Memphis Style, African & Tribal, Batik, Floral, Egyptian, Pixel Art, 3D Illusion, and more.
  - Per-pattern controls: **foreground/background colors (2–5 colors per pattern), stroke width, angle, scale/zoom** — each pattern lists how many colors it supports.
  - Random pattern generation from preloaded color palettes (Pro: lock individual controls while randomizing, inspiration browser).
  - Pro extras: **Pantone color picker** with nearest-Pantone download.
  - Available in ~30 languages.
- **Outputs & integration:**
  - **Copy CSS and SVG code** straight to clipboard; download a **tileable SVG or high-res seamless PNG** (print-ready; Figma/CorelDRAW-compatible).
  - **Public API** (`https://api.pattern.monster/v1`, CORS-enabled, API key via header or `?key=`): list patterns, fetch one pattern's metadata + rendered SVG + seamless tile + **ready-made CSS `background-image` snippet**, with query params for `colors`, `stroke`, `scale`, `angle`, `tile=true`. Free tier 500 req/month; Pro 50K.
  - **MCP server** (`https://mcp.pattern.monster/mcp`) so AI assistants can fetch/generate patterns directly.
- **Skills to steal:**
  - **SVG patterns as a performance strategy:** tiny tileable SVGs tiled via CSS beat large background images — zero image weight beyond the tile, crisp at every DPI.
  - **Parametric pattern model:** one template × {colors, stroke, scale, angle} = infinite variants; structure any generated pattern library the same way.
  - A CSS `background-image: url("data:image/svg+xml,...")` snippet per pattern is the ideal delivery unit for code-minded users.
  - Constrain patterns to **2–3 colors drawn from the site's palette** (matching background color = seamless integration).
  - Shipping both an HTTP API *and* an MCP server is the modern distribution pattern for design assets — AI agents are a first-class consumer.

### Haikei — https://haikei.app
- **What it is:** A free web app (by z creative labs) to **generate unique SVG design assets** — "stunning visual content ready to use with your design tools and workflow." Free, no signup, no credit card. Editor at app.haikei.app.
- **Key features / tools:**
  - **15 generators** for data-driven shapes: **layered waves, stacked waves, blob scene, low poly grid**, steps, peaks, blobs, symbols, grids, gradients, and more (per the site's generator list).
  - **Randomize ("dice") button** to generate a new unique visual every time; play with parameters to fine-tune.
  - **Canvas presets** for common sizes (banners, social, slides); compare generators across formats.
  - Stated use cases: **UI design** (login screens, banner backgrounds, product showcases, marketing pages), **slide decks** (batch-generate same-style visuals), **blog covers**, **social media** (Twitter/LinkedIn/Instagram formats).
  - Deep-linkable generator URLs (e.g. `app.haikei.app?generator=blob-scene`).
- **Outputs & integration:** Export as **PNG or SVG**; SVG continues into any vector editor, CMS, or codebase. Add brand colors to make assets yours. No code export — integration is image-based.
- **Skills to steal:**
  - **Layered-waves and blob-scene as hero-section recipes:** 3–5 stacked translucent wave/blob layers in analogous brand colors is a proven, tasteful landing-page background — reproducible in pure SVG.
  - **Generate in sets:** pick one generator + palette and produce a whole batch of same-style visuals (blog covers, section dividers, CTA banners) for visual consistency across a site.
  - Section-divider waves between page sections (footer top edge, hero bottom edge) are the highest-value single use of this tool.
  - Brand-color-first workflow: pick the generator shape first, then force the palette — never let the asset introduce new colors.

### Vanta.js — https://vantajs.com
- **What it is:** "Animated website backgrounds in a few lines of code." An open-source (github.com/tengbao/vanta) collection of interactive WebGL background effects built on **three.js (and p5.js)**, by the folks from Strikingly.
- **Key features / tools:**
  - Live customizer on the homepage: pick an effect, tweak colors/style, **Randomize!**, then grab the exact code snippet.
  - Effect gallery (Waves shown on homepage; the library includes Net, Dots, Cloud, Fog, Cells, Birds, Halo, Rings, Topology, Trunk, and similar — all interactive).
  - Stated advantages: **mouse/touch interactivity**, brand-matching colors, **no pixelation** (full-resolution canvas), **smaller than background video** (three.js ≈120KB min+gzip), **60fps** on most laptops/desktops.
  - Stated cautions: some WebGL effects are slow on older computers; **use at most 1–2 per page**; not all effects work on mobile — **set a background image/color fallback**.
- **Outputs & integration:** Vanilla JS snippet: include `three.min.js` (specific legacy versions, e.g. r134/r121) + optional `p5.min.js` from CDN, then `vanta.[EFFECT].min.js` from `cdn.jsdelivr.net/npm/vanta@latest/dist/`, then init with `VANTA.EFFECT({ el: "#your-element-selector", color1: ..., ... })`. Every effect parameter (colors, background, spacing, speed) is a JS option.
- **Skills to steal:**
  - **The fallback discipline:** any WebGL background must ship with a solid-color/image fallback for mobile and for reduced-capability devices — treat this as non-negotiable in generated code.
  - **Budget rule: at most 1–2 animated WebGL backgrounds per page**, and prefer them only in the hero.
  - Interactivity (mouse-reactive waves/nets) is what separates "alive" from "video": if adding Vanta-style effects, wire pointer events.
  - Pin exact three.js versions — Vanta breaks with mismatched three builds; in modern stacks prefer the newer ShaderGradient/R3F route and reserve Vanta for plain-HTML pages.
  - Sell the size argument: a 120KB interactive canvas is lighter than a background video — pick WebGL over `<video>` for subtle motion.

### Gradient Studio (gurade.netlify.app) — https://gurade.netlify.app
- **What it is:** A Japanese-language WebGL gradient studio by Cast Japan (UI inspired by feralui.dev/gradients, fully original implementation). Tagline: pick 形 (shape)・色 (color)・質感 (texture) to make flowing gradients and glow-on-black effects, overlay text in 104 typefaces, and export **CSS and PNG**. All processing is client-side; nothing is sent to a server.
- **Key features / tools:**
  - **8 styles × 12 shapes × 7 textures**, plus 104 Google-Fonts typefaces to layer text over the gradient.
  - **Color field:** shuffle + add colors; **Field controls** (scale 50%, distortion/ゆがみ 55%); **Direction** and **Ratio** controls.
  - **Interactive color pinning:** drag rings on the canvas so a given color "stays" at that spot (same idea as MESH's color points).
  - **Presets** that fill in color/shape/style/texture/direction while preserving ratio and text.
  - Texture options for glossy/matte/grain surface feel; "black-ground glow" (発光) styles.
- **Outputs & integration:** **Copy CSS** (live `background` you can paste into any stylesheet) or **export PNG**. Honest accuracy labels: linear, radial, conic, and reflection gradients export **exact** CSS; diamond, flow, multi-point, and free-placement export **static approximations**; the 4 glow styles export **color values only**. Free for commercial and non-commercial use, no attribution required, no warranty.
- **Skills to steal:**
  - **Know which gradients are CSS-exact:** linear/radial/conic translate perfectly to CSS; organic multi-point meshes only approximate in CSS — when a design needs a true mesh, export the PNG instead of faking it in code.
  - The **shape × style × texture × direction parameter grid** is a good generation scaffold for an AI producing background variants.
  - **Glow-on-black style:** dark backgrounds + a luminous gradient core are ideal for dev-tool/landing aesthetics; steal the recipe (near-black base, 2–3 saturated glow anchors, soft distortion).
  - Overlay **large display type directly on the gradient** (the tool bakes text into exports) — gradient + typography as one composition, not separate layers.
  - Distortion ("ゆがみ") + scale as explicit knobs: adding slight distortion to a linear gradient instantly removes the generic "AI gradient" look.

---

## Category Synthesis

### Practical color-palette workflow (build → test in realtime on real UI → export tokens)

1. **BUILD the palette.**
   - Start from **Coolors**: generate with spacebar (lock any brand color and mutate the rest), or **extract from imagery** with the Image Picker if the project has hero photos/product shots. Seed from a curated Explore palette when starting from zero.
   - Map the result onto **Realtime Colors' 5-role model**: Text, Background, Primary (CTAs), Secondary (less-important buttons/cards), Accent (links/highlights). Cap at ~6 colors; 3–5 is usually right.
   - Use color-theory schemes (complementary, triadic, analogous…) as the starting structure, then verify each text/background pair with the contrast checker — **reject anything below AA** (green light or nothing). Check both on-white and on-black, plus a color-blindness simulation pass (Coolors provides both).

2. **TEST on real UI, not swatches.**
   - Paste the palette into **Realtime Colors** and flip through its Dashboard and Blog Post templates — those two layouts cover most component variety (nav, hero, cards, tables, forms, footer). Toggle dark/light (Alt+T) and confirm *both* themes pass contrast.
   - Cross-check with **Coolors' Palette Visualizer** (mobile/web UI, branding, typography views) for a second opinion.
   - Iterate: keep what works locked, regenerate the rest — swatches in isolation systematically mislead.

3. **EXPORT tokens, not colors.**
   - Export from Realtime Colors as **CSS variables / Tailwind config / SCSS**, choosing the preset that matches the stack (shadcn, Bootstrap, Chakra, DaisyUI…). Prefer **OKLCH/OKLCH-inclusive exports** for perceptually uniform shades; export **shades** (5–10 steps) of primary/secondary for hovers, borders, charts, and states — or build the ramp with Coolors' Gradient Palette between two brand colors.
   - Carry the same tokens into backgrounds: every background tool (Haikei, Pattern Monster, gradients) gets colors *only* from the exported palette — assets never introduce new hues.
   - Share/version the palette via its shareable URL (both Coolors and Realtime Colors serialize state in the link — a URL is the lightest "design token file" a team can pass around).

**Background-tool decision guide by project type:**

| Project type | Recommended background stack | Why |
|---|---|---|
| **SaaS dashboard / app UI** | **Pattern Monster** (subtle SVG tiles) + flat colors from tokens | Dashboards need calm, texture-level backgrounds that never compete with data. A 2-color tile at low contrast adds depth for ~zero bytes; no JS runtime, no WebGL battery cost behind dense UI. |
| **Landing page / marketing** | Hero: **ShaderGradient** (React/Framer, live) or **Vanta.js** (plain HTML); section dividers: **Haikei** layered waves/blob scene; glow accents: **Gradient Studio** glow-on-black | Landing pages earn attention through motion. A single interactive WebGL hero (respect the 1–2-per-page cap, ship the mobile/color fallback), Haikei SVG waves as dividers between sections, and a CSS-exact conic/radial glow for CTA emphasis. |
| **Portfolio / creative** | **MESH** or **Gradient Studio** static gradients as full-bleed art; **ShaderGradient** looping WebM export; **Haikei** blob/low-poly covers | Portfolios can afford bolder, art-directed backgrounds since text density is low. Static mesh-gradient PNGs keep pages fast; a looping ShaderGradient video gives "alive" motion with zero WebGL runtime on the visitor's machine; Haikei covers unify project thumbnails. |

Cross-cutting rules (all project types): always ship a static color/image fallback for any WebGL background; pin exact library versions (three.js/Vanta); at most 1–2 animated backgrounds per page; verify text contrast over *every* background — gradient hotspots silently kill AA compliance; and keep every asset's colors inside the exported token palette.
