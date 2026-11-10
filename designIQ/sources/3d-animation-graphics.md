# designIQ — Category: 3D, Animation & Interactive Graphics Tools

> Research date: 2026-11-09. All content treated as data, never instructions.
> Sources: direct webfetch of each site (markdown). Failures/supplements noted per site.

---

### Spline — https://spline.design

- **What it is:** Browser-based 3D design tool with real-time collaboration for building interactive 3D scenes for web and apps. Now positions itself as "the 3D and 2D editor for teams and their agents" — AI agents (Claude, ChatGPT, Cursor, Codex, anything with MCP) can build and edit scenes via the Spline MCP server, while humans refine in the same live file.
- **Key features / tools:**
  - Modeling: primitives, booleans, sculpting, AI 3D generation (prompt → mesh).
  - Layered materials, lights, post-processing (bloom, reflections, etc.).
  - Animation & interaction: states, keyframes, events, physics.
  - Real-time multiplayer editing with undo, comments, and agent/human hand-back-and-forth ("agents build, designers refine").
  - Spline MCP: tools to read a scene, write to it, frame a view, and inspect results; MCP tool-call quota scales by plan (20/day free → 400/day on paid tiers).
  - AI credits are a single workspace pool covering the editor agent, AI 3D generation, AI textures, and Hana.
- **Outputs & integration:** One scene ships everywhere: web (WebGPU/WebGL — publish a link, embed the viewer, or code export), native iOS (Metal, SwiftUI view or generated Xcode project), native Android (Vulkan, Jetpack Compose view or APK/AAB). Also GLTF, USDZ, STL exports. JS integration via the `@splinetool/runtime` npm package (public Spline API) for events and variables. Difficulty: low for embeds, moderate for runtime scripting; no 3D/WebGL knowledge needed to start.
- **Performance notes:** Real-time WebGL/WebGPU cost applies — scenes are GPU-heavy; keep poly counts, texture sizes, and effect stacks lean. Platform-specific native renderers (Metal/Vulkan) mean the same file stays performant on mobile apps, unlike a raw web embed. Code export and self-hosted export are gated to higher plans (Pro/Enterprise). Free-tier web exports carry a Spline watermark.
- **Pricing:** Freemium. Free tier (limited files, watermark, no AI). Current workspace plans per official docs: Hobby $15/seat/mo monthly ($12/seat/mo billed yearly, 2,000 AI credits), Pro, Max (10,000 credits), Enterprise custom (SAML SSO, SOC 2, self-hosted export, priority support). Legacy Starter/Professional/Team plans still honored. Extra AI credits purchasable in 1,000-credit increments.
- **Skills to steal:**
  - The **states + events + physics** interaction model: define named visual states, wire them to hover/click/scroll triggers, blend with springs — replicable in any Three.js scene.
  - Prompt-to-scene MCP workflow: agent scaffolds the scene, designer polishes — a production pattern for AI-assisted 3D.
  - Post-processing as a brand layer (grain, bloom, DOF) rather than an afterthought.
  - "One scene, many renderers" distribution: same source, per-platform output.

### Vectary — https://vectary.com

- **What it is:** Browser-based no-code 3D design studio + WebAR platform ( Vectary Studio for building interactive 3D/AR, Vectary Canvas for AI-accelerated ideation boards). Positioned at product/agency/e-commerce teams: configurators, AR previews, interactive manuals. *(Direct fetch returned 403 — content recovered via websearch of Vectary's own pages; treat pricing as volatile.)*
- **Key features / tools:**
  - Studio "Design mode": 3D import & automatic optimization (mesh formats and CAD/STEP on Team+), HDRi environments, PBR materials (refraction, subsurface scattering, clearcoat, thinfilm), stickers/decals, cameras, lighting, post effects (anti-aliasing, bloom, reflections, soft shadows).
  - Interactions built from **triggers → conditions → actions**; floating UIs; 3D configurators (material switchers, product variations, annotations, language localization); animations and transitions.
  - App-free WebAR (ARKit/ARCore, no install, share by link), WebXR on Business.
  - Vectary Canvas: collaborative AI moodboard/ideation space (image + 3D generation with credits).
  - Figma plugin (frames in/out), CSV/database import for linked product data.
- **Outputs & integration:** Primarily an **embed/link platform**, not a code library: iframe 3D viewer that live-syncs with Studio edits, private/public share links, AR links, 2D renders, glb/gltf/usdz export. Vectary Viewer API, CDN + domain masking, SSO, version history on Business. Integration difficulty: very low (paste an embed); programmatic depth is limited unless on Business.
- **Performance notes:** Automated mesh/material optimization and a "project analyzer" to catch heavy scenes; CDN-hosted viewers. Real-time 360° rendering means every embedded viewer is a full WebGL context — budget one per page, mind the browser's ~16-context limit, and avoid stacking many configurators.
- **Pricing:** Freemium, per-workspace. Free (5 projects, 1 seat), Starter $25/mo (3,000 AI credits, 25 projects, 2 seats), Team $250/mo (40,000 credits, 250 projects, 5 seats, CAD import), Business custom (unlimited, Viewer API, WebXR, SSO). Credits refresh monthly, don't roll over; top-up packs available. (Older third-party trackers show a $12/mo tier — plans changed during 2026; verify at checkout.)
- **Skills to steal:**
  - **Trigger → condition → action** interaction grammar — a clean mental model for declarative 3D interactions.
  - Configurator patterns: material switchers, variation matrices, annotations, localized viewers, cart-connected commerce flows.
  - CAD-to-web pipeline as an engineer↔designer handoff technique.
  - Floating UI anchored to 3D objects (specs, hotspots, CTAs).

### Unicorn Studio — https://unicorn.studio

- **What it is:** Visual (no-code-first) design tool for production-ready interactive WebGL graphics: shader effects, images, text, video, shapes, and 3D models on a layer-based spatial canvas, with a built-in AI agent (Unicorn Agent) and MCP support. *(Direct fetch returned empty — recovered via site docs, llms.txt, and pricing pages via websearch.)*
- **Key features / tools:**
  - 75+ configurable WebGL effects, stackable/mixable with render-target chaining (stacked effects, masks, child effects).
  - Layer-based editing (Figma/Photoshop style), not node graphs: shapes, images, text (Google/custom fonts), 3D models, extruded SVGs, video-in-effects.
  - Native interactivity on every layer: mouse tracking (0–100% intensity), momentum, 3D-axis tilt; events: appear, scroll, hover, mousemove, click.
  - **Variables**: expose any property as a runtime API (`scene.setVariable`, `getVariableManifest()`) — an authored integration surface for CMS/agent control.
  - Custom GLSL ES 3.00 shader editor (multi-pass, dynamic uniforms, pingpong, downsampling, frame cache) + Custom Effects Library.
  - Unicorn Agent (AI): creates/edits/animates/publishes scenes from prompts, credit-metered (up to 30 credits/run); MCP for agent-driven edits.
  - Performance test suite; video export (WebM/MP4 with codec control); image export.
- **Outputs & integration:** Publish → embed snippet (`data-us-project` script tag) for Framer, Webflow, Wix, Figma Sites, React, or plain HTML; or **JSON scene export for self-hosting** with the JS SDK (~50 KB gzipped runtime). Runtime handles render loop, resizing, pausing, cleanup. Difficulty: very low to embed, moderate for variables-driven runtime control. Not a Three.js host — you can't inject your own rendering code, only shaders + variables.
- **Performance notes:** WebGL2 required; one shader pass per layer (use **Flatten** to collapse into a single pass); runtime knobs: render `scale` (0.25–1), fps throttling, visibility pausing; scenes deliberately leave 2 of the browser's ~16 WebGL contexts free for other canvases. Use production-mode embeds and CDN/asset optimization (Legend). Interactive scenes cost GPU continuously — pause offscreen.
- **Pricing:** Free $0 (all 75+ effects, 8 publishes with Unicorn branding, 50 trial AI credits); Legend $168/yr or $20/mo (unlimited watermark-free publishes, commercial license, 200 AI credits/mo, unlimited MCP agent changes, JSON export, high-quality video, custom 3D/fonts, CDN).
- **Skills to steal:**
  - **Layer-stack shader composition** — treating GLSL effects like blend layers instead of node graphs.
  - Variables-as-API: author a scene with named, ranged controls so developers/CMS/agents drive it without re-exporting.
  - Interaction defaults per breakpoint, host overrides at runtime; events as temporary presentation over variable state.
  - Particles as an interaction surface (formation, attract/repel on pointer).
  - Ship-hero-graphics-as-JSON: deterministic scenes, diffable, agent-editable.

### Theatre.js — https://theatrejs.com

- **What it is:** Free, open-source JavaScript animation library with a professional motion-design toolset that runs in the browser: sequence editor with dope sheet, graph editor, easing presets, property editor, and extension system. "Code vs *plus* Art: it is not either/or — create in code, perfect in the browser." Works with any stack because "all it does is change JS variables."
- **Key features / tools:**
  - Sequence editor: block out timing fast, then fine-tune per-frame in the graph editor.
  - Dope sheet + graph editor + easing presets (After Effects-style motion craft in the browser).
  - Official integrations: React Three Fiber, THREE.js, HTML/CSS/SVG; custom WebGPU stacks work too.
  - Extensions API: camera rigging, light tweaking, shader adjusting, custom UI/tools/workflows.
- **Outputs & integration:** JS packages (`@theatre/core` + `@theatre/studio`). You wire sequenced values to your own render loop; project state is saved as JSON (versionable, diffable). The Studio editor UI is dev-only — stripped from production bundles, so prod ships just the core + your scene. Integration difficulty: moderate — developer setup required; it complements (not replaces) Three.js/R3F.
- **Performance notes:** Negligible overhead of its own (no renderer); performance is whatever your scene does. Only animation *values* change per frame. Ideal for cinematic scroll-scrubbed THREE.js sequences where the GPU cost lives in your 3D, not the library.
- **Pricing:** Free, open source (MIT ecosystem; ~7,700 GitHub stars; company Theatre.js Oy, Helsinki).
- **Skills to steal:**
  - **Keyframe-and-graph editing over your live code scene** — the fastest path from "programmer art timing" to director-grade motion.
  - Animation-as-data: exportable project JSON you can review and version like code.
  - The extension pattern for camera/light/shader control panels.
  - Treating easing curves as a design deliverable (graph editor screenshots as spec).

### GSAP — https://gsap.com

- **What it is:** The industry-standard, professional-grade JavaScript animation library ("Animate Anything JS can touch"). Owned by Webflow; **now 100% free for everyone — all plugins included** (previously paid "Club GreenSock" plugins are free).
- **Key features / tools:**
  - **Core:** tweens, timelines (choreography), CustomEase/custom curve builder.
  - **Scroll:** ScrollTrigger (scroll-scrubbed/pinned storytelling), ScrollSmoother, ScrollTo.
  - **SVG:** DrawSVG (stroke drawing), MorphSVG (shape morphing), MotionPath (+Helper).
  - **UI:** Flip (layout-change transitions), Draggable, Inertia, Observer (unified input).
  - **Text:** SplitText (char/word/line stagger reveals), ScrambleText, TextPlugin.
  - Extras: Physics2D, PhysicsProps, GSDevTools (timeline scrubber/debugger).
- **Outputs & integration:** Pure JS library (npm/CDN; UMD/ESM). Works with React (`useGSAP` hook), Vue, Webflow, vanilla, and can drive WebGL/Three.js values too. Difficulty: low-to-moderate; huge community and docs. It is deliberately *not* a component system — you write the wiring.
- **Performance notes:** Ticker-driven, GPU-friendly transform animations, famously smooth under load. Bundle: core is small but plugins add up — import only what you use (tree-shakeable ESM). ScrollTrigger pinning can cause layout thrash if misused; prefer transforms over layout properties. Slightly heavier than Motion for simple UI work.
- **Pricing:** Free — all tools and plugins (Webflow funds it). Enterprise support/community remains free/open.
- **Skills to steal:**
  - **Timelines as choreography**: nested, labeled, sequenced motion instead of scattered setTimeout chains.
  - ScrollTrigger scrub + pin patterns for scroll-told stories.
  - **Flip plugin** for DOM-position-change animations (filters, reorders, expanding cards).
  - SplitText stagger architectures for kinetic typography.
  - `matchMedia()` for responsive animation variants; GSDevTools habit for debugging any animation, not just GSAP's.

### Motion — https://motion.dev

- **What it is:** Fast, production-grade animation library for React, Vue, and vanilla JS — formerly Framer Motion, now framework-agnostic and free/open source. "Small APIs. Expressive interfaces." Sponsors: Framer and Cursor.
- **Key features / tools:**
  - Layout animations (`layoutId` shared-element transitions, `AnimatePresence` exit animations).
  - Native-feel gestures: drag with momentum + snap, `whileHover`/`whileTap`/`whileDrag`, keyboard-accessible press, hover that ignores touch.
  - Scroll: `useScroll` linking any value to scroll progress — uses the browser's native **ScrollTimeline** for hardware-accelerated scroll effects.
  - Physics springs with real stiffness/damping/mass that carry velocity through mid-flight retargeting.
  - 3D: animate Three.js meshes, materials, and shader uniforms with the same springs/timelines as the DOM.
  - Hybrid engine: most animations run on the browser's own animation engine (WAAPI) — stays smooth while JS is busy.
  - Ecosystem: Motion+ premium UI components/examples vault; **Motion Studio** (visual timeline editor on your real site → one-click handoff to a coding agent); **Performance Doctor** (AI skill that audits and fixes slow animations); AI Kit (docs/examples for agents).
- **Outputs & integration:** npm library (`npm install motion && npx motion-ai`). React-first DX, also Vue + vanilla `animate` API. Difficulty: very low for React teams; declarative props.
- **Performance notes:** Starts at **3.2 KB** with the mini `animate` function; scale up with **LazyMotion** (load full features lazily). Hardware acceleration via WAAPI/ScrollTimeline. Official performance doctrine: animate transforms not layout (`scaleX` instead of `width`), batch reads in `frame.read()`, respect reduced motion.
- **Pricing:** Free and open source (core). **Motion+** is a paid tier (price not listed on the fetched page) for premium components, the examples vault, and Motion Studio.
- **Skills to steal:**
  - **Springs over easings** for anything interactive — velocity continuity makes UI feel physical.
  - `layoutId` shared-element transitions as the default pattern for modals, galleries, list→detail.
  - `AnimatePresence` exit-animation discipline (element leaves *after* animating out).
  - Scroll-linked values via native ScrollTimeline rather than JS scroll handlers.
  - Transform-first performance rules + automated animation auditing as a CI habit.

### Barba.js — https://barba.js.org

- **What it is:** Small, dependency-free PJAX library that turns a multi-page site into an SPA-like experience so pages can swap with fluid animated transitions instead of hard reloads. Free, MIT, mature project (~1,000 commits since 2015; docs last updated Dec 2024 — stable, not fast-moving). *(Homepage fetch was thin; filled from barba.js.org docs pages and GitHub via websearch.)*
- **Key features / tools:**
  - PJAX lifecycle: intercept clicks, fetch next page, swap `data-barba="container"` inside the `wrapper`, remove old container when the transition finishes.
  - `leave`/`enter` transition hooks with full hook system (`before`, `beforeLeave`, `afterLeave`, `beforeEnter`, `after`…).
  - **Sync mode** (leave+enter play together = crossfade) vs default sequential mode.
  - Transition resolution rules by namespace/route/custom logic; "self" transitions for same-page links.
  - **Prefetch + cache** on mouseover/touchstart; timeout + `preventRunning` strategies.
  - **Views**: per-page init/destroy logic (namespace-keyed) for re-initializing scripts.
  - Plugin system: Router, Prefetch, Css, Head, Preset. Utilities for scroll restoration (`history.scrollRestoration = 'manual'`), container positioning, logging.
- **Outputs & integration:** JS library (~7 KB min+gzip for v2; v1 was 4 KB), npm or CDN. You supply markup attributes and bring your own animation library (docs recommend GSAP, anime.js, mo.js…). Difficulty: moderate — requires static-ish server-rendered pages; docs explicitly say to prefer framework routing (Next/Vue) for SPAs. Long-lived scripts and third-party widgets must be re-initialized in views.
- **Performance notes:** Tiny footprint and fewer HTTP requests (CSS/JS don't reload per page). The risks are architectural, not bundle-size: duplicate containers during transitions (position them absolute for sync mode), scroll position resets, stale event listeners, and re-running analytics/scripts. Use prefetch wisely on heavy pages; configure a sane timeout so slow loads fall back to a normal navigation.
- **Pricing:** Free, open source (MIT), GitHub-sponsor maintained.
- **Skills to steal:**
  - **Prefetch-on-hover caching** — instant-feel navigation even without Barba (the technique ports to any MPA).
  - The leave/enter hook lifecycle as a contract for orchestrating exit→swap→enter animations.
  - Sync crossfade vs sequential wipe — a vocabulary for choosing transition grammar per route pair.
  - Views pattern for per-page JS lifecycle (init/destroy discipline).
  - Scroll restoration + container-stacking recipes for transition polish.

### SVGator — https://svgator.com

- **What it is:** Online no-code SVG animation editor with a timeline, targeted at product teams/agencies shipping animated logos, icons, loaders, and interactive SVG graphics. Exports single-file animated SVGs (the native web standard — no player library needed) plus Lottie and video formats.
- **Key features / tools:**
  - Timeline editor with keyframes, easing presets (+custom curves), hold keyframes (step-end).
  - Animators: transform, morphing (node tool), motion paths, stroke (dash/offset drawing), color/gradient fills, masks (static and animated).
  - **Interactive exports**: start-on-hover with defined mouse-out behavior, start-on-click with second-click response, multiple triggers, and programmatic control via the **SVGator Player JS API**.
  - Import static SVG *or* Lottie; copy/paste SVG between projects and vector tools.
  - Figma plugin (animate designs in place), WordPress plugin, **MCP server for AI animations**, team collaboration (edit roles, shared folders, timestamped comments on keyframes, public review links).
- **Outputs & integration:** Animated `.svg` (CSS or JS flavor), Lottie JSON, React Native and Flutter components (webview-based), raster: GIF/WebP/APNG and MP4/MOV/WEBM. Integration difficulty: minimal — a single file drops into any site builder, email, or app asset pipeline; Player API for JS control when needed.
- **Performance notes:** Best-in-class: SVG animation is natively rendered by the browser, infinitely scalable, responsive, and needs no runtime — file weight is the only cost (keep paths/beziers lean). The FAQ's own guidance: prefer SVG for web (no player), Lottie when you need cross-platform/mobile parity. Avoid dozens of separate JS-driven SVGs on one page; prefer the CSS export when interactivity isn't required (no script, styleable).
- **Pricing:** Freemium: Free (full editor, unlimited *static* SVG exports, templates); **Starter $20/mo** billed yearly (animated SVG CSS/JS export, Lottie, React Native/Flutter, Player API, interactive animations); **Pro $24/mo** billed yearly (unlimited animations, video/GIF export, max quality, commenting, public links); **Team $27/seat/mo** billed yearly, min 3 seats (team workspace, SLA, MSA, priority support).
- **Skills to steal:**
  - Stroke-dash "self-drawing" line techniques (also achievable via GSAP DrawSVG) for logos and icons.
  - Morph + motion-path combinations for organic logo stings.
  - **Hover-in/hover-out behavior contracts** and second-click responses — interaction design for stateful vector animations.
  - CSS-export-first discipline: reserve JS exports for when programmatic triggers are truly needed.
  - Hold keyframes via step-end easing for sprite-like, snappy motion.

---

## Category Synthesis

### No-code scene tools vs code animation libraries

**Reach for no-code scene tools (Spline, Vectary, Unicorn Studio) when:**
- The centerpiece is a *visual scene* — a 3D hero, product configurator, AR preview, or shader-driven background — and the visual quality bar exceeds what code-first workflows produce quickly.
- Designers own the iteration loop and developers should only embed, or drive a small set of exposed controls (Unicorn Variables, Spline runtime API).
- Budget is monthly-subscription-shaped (per seat / per publish) rather than engineering-time-shaped. Watch the lock-in: watermark/branding on free tiers, credit-metered AI, and proprietary scene formats (Unicorn and Vectary scenes are not portable code; Spline at least ships a real JS runtime and exports GLTF/USDZ).

**Reach for code animation libraries (GSAP, Motion, Theatre.js, Barba.js) when:**
- Motion is *structural* to the UI — scroll choreography, layout transitions, gestures, page transitions — not a decorative island.
- You need version control, code review, tree-shaking, and zero recurring cost; these libs are free and travel with your bundle.
- AI agents maintain the code: GSAP/Motion/Theatre are plain npm dependencies an agent can read and edit; a Spline/Unicorn scene is a cloud asset an agent can only touch through MCP/variables.

**The grey zone:** Theatre.js is the bridge — a code library whose editing surface is visual. Use it when a THREE.js scene needs director-grade keyframing without abandoning the codebase.

### Performance decision guide

Budget in order of cost: **CSS/SVG file animations (SVGator, ~KBs, zero runtime) < Motion (3.2 KB→~18 KB) < Barba (7 KB) < GSAP (core + chosen plugins) < Unicorn runtime (~50 KB + continuous GPU) < Spline/Three.js scenes (hundreds of KB to MBs + continuous GPU)**.

Rules:
1. **One WebGL context per page.** Browsers cap ~16, but the real limit is GPU memory and compositing. Never stack Spline + Unicorn + a Three.js canvas on one route; Unicorn deliberately leaves 2 contexts free for exactly this reason.
2. **Reserve WebGL for hero moments.** Interactive 3D/shader backgrounds pay a constant GPU tax — pause them offscreen (all three scene tools support lifecycle pausing; Unicorn exposes fps/scale knobs, use render `scale` 0.25–1 on mobile).
3. **Match the library to the motion type.** UI micro-interactions → Motion (springs, WAAPI offload); scroll narratives and DOM choreography → GSAP ScrollTrigger; page-to-page flow in an MPA → Barba + GSAP; THREE.js cinematics → Theatre.js; icons/logos/loaders → SVGator file (or hand-written CSS). Don't ship GSAP to do what a 5 KB animated SVG does.
4. **Animate transforms, not layout.** `transform`/`opacity` only (Motion's Performance Doctor doctrine: `scaleX` not `width`); batch reads in rAF; use native `ScrollTimeline` where available; always honor `prefers-reduced-motion`.
5. **Loading order:** LCP content first; lazy-init 3D scenes on idle/intersection with a poster frame; `LazyMotion`/per-plugin imports to keep initial JS small.

### Combining them in one production site

A proven layered architecture:

- **Global motion language:** GSAP core + one timeline per page section; SplitText for headings; CustomEase curve reused everywhere as the brand's motion signature.
- **Scroll:** ScrollTrigger for pinned/scrubbed storytelling; Motion's `useScroll` for lightweight scroll-linked values in React islands (native ScrollTimeline when the browser supports it).
- **UI transitions (React/Next):** Motion everywhere in components — `layoutId` shared elements, `AnimatePresence` exits, spring-based drag. If the site is a classic MPA instead: Barba orchestrates page swaps, with GSAP tweens inside its leave/enter hooks, prefetch-on-hover enabled, and per-route Views re-initializing scripts.
- **The hero (at most one WebGL island):** a Spline or Unicorn Studio scene, lazy-mounted on intersection with a static poster fallback; interactions exposed to the app via variables/runtime API so React state can drive the scene. If the hero is bespoke THREE.js, skip both and use Theatre.js to art-direct it.
- **Vector accents:** SVGator exports for logo stings, loaders, and icon micro-animations — CSS flavor by default, JS flavor only where the Player API is genuinely needed; Lottie JSON only for RN/Flutter twins of the same asset.
- **Governance:** single motion-tokens module (durations, springs/eases), a reduced-motion global kill switch, an offscreen-pause wrapper for every canvas, and periodic automated audits (Motion Performance Doctor or Lighthouse trace) as a release gate.

This stack keeps recurring SaaS costs near zero (Spline/Unicorn/Vectary subscriptions only if you adopt them; everything else is free OSS), holds initial JS to tens of KB outside the hero route, and gives each motion problem exactly one owner.
