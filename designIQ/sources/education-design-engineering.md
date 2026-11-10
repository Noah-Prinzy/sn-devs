# Education — Design Engineering

> The best free teaching resources for frontend craft: CSS, animation, design, and practice.
> Curated for designIQ — the permanent design knowledge base for Isagi (AI frontend developer).
> All content analyzed from live fetches (Nov 2026) + supplementary search. Note: animations.dev is taught by **Emil Kowalski** (Linear design engineer, creator of Sonner & Vaul) — not Sam Selikoff (who runs buildui.com). The current web.dev Learn Design course is **Learn Responsive Design** by Jeremy Keith (Google, w/ Rachel Andrew, Una Kravets, Adam Argyle).

---

### Josh W. Comeau — https://www.joshwcomeau.com

- **What it is:** The gold standard for interactive CSS/animation/React teaching. Long-form tutorials where every concept is a live, playable demo. Written by a former Gatsby staff engineer; free blog + paid courses (css-for-js.dev, Joy of React, Whimsical Animations). Teaches the *why* behind CSS mechanics, not just properties.
- **Canonical lessons (condensed):**
  - **An Interactive Guide to Flexbox / CSS Grid** — layout algorithms are systems with rules, not magic; mental models (main/cross axis, grid lines, implicit tracks) beat memorizing properties. When layout surprises you, the algorithm followed its rules — you just didn't know them.
  - **Designing Beautiful Shadows in CSS** — (1) pick one global light source (commonly above, slightly left) and give every shadow the same offset ratio; (2) layer 4–5 box-shadows with doubling offsets/blur and low opacity instead of one blurry blob; (3) color-match shadows (same hue, lowered saturation/lightness) instead of transparent black — black desaturates the background; (4) elevation scale: higher elevation → larger offset, larger blur, lower opacity; (5) `filter: drop-shadow` contours transparent shapes (tooltips with tips!) and is GPU-accelerated; (6) tokenize elevation scales with CSS variables so `--shadow-color` re-matches per background.
  - **An Interactive Guide to CSS Transitions / Squash and Stretch** — animation feels alive when it borrows Disney's first principle: deform objects during motion (squash on impact, stretch in flight). Small physicality cues have outsized perceived-quality impact.
  - **Springs and Bounces in Native CSS (`linear()`)** — the `linear()` timing function encodes sampled spring physics in vanilla CSS; model overshoot/bounce without JS libraries; know its quirks (long functions, interpolation limits).
  - **CSS Variables for React Devs** — CSS custom properties are the bridge between JS state and CSS: theme tokens, dynamic values (e.g., `--shadow-color`, stagger indices) inherit through the DOM; set them once at a wrapper, let descendants consume.
  - **A Modern CSS Reset / How To Center a Div** — small foundational artifacts matter: a sane reset (box-sizing, sensible defaults) and knowing 3+ centering methods (grid `place-items`, flex, `margin: auto`) as fluency markers.
  - **Scroll-Driven Animations / Anchor Positioning / Subgrid / @starting-style** — modern CSS platform tour: animate on scroll with zero JS (`animation-timeline: scroll()/view()`), anchor tooltips/menus natively, extend grid templates into nested DOM, and transition *enter* animations with `@starting-style` (mind its gotchas).
- **Skills to steal:** Explain systems, not syntax (teach the algorithm's intent). Interactive illustration as documentation. Treat visual details (shadows, easing, spring physics) as engineering artifacts to be tokenized, layered, and versioned. Use physical intuition (light sources, lifted hands) as design reasoning. Keep a "modern CSS" watchlist — his new-feature articles land months before adoption.

### animations.dev (Emil Kowalski) — https://animations.dev

- **What it is:** The definitive paid course on UI animation theory + practice (CSS Animations + Motion/Framer Motion), from the Linear design engineer who built Sonner and Vaul (90M+ weekly downloads). 4 modules: Animation Theory → CSS Animations → Motion → Good vs Great; plus walkthroughs (Family drawer, Dynamic Island), expert interviews, and 15 AI skills. Note: paid course, but his free essay **"Good vs Great Animations"** (emilkowal.ski/ui/good-vs-great-animations) condenses the core doctrine; waitlist gives 2 free preview lessons.
- **Canonical lessons (condensed):**
  - **Good vs Great Animations (free essay)** — great animation passes three tests: **natural** (mirrors real physics; nothing in nature moves at constant speed), **purposeful** (user understands why it exists), **tasteful** (learnable rules, not gut feeling). Often the best animation is *no* animation — the more you animate, the less each is worth.
  - **Use the right easing** — easing is the single most important lever and drives *perceived speed* (300ms feels slower with ease-in than ease-out). Default: **ease-out for entries/exits** (fast start = instant feel, settles like the real world); **ease-in-out for elements already on screen** (tabs indicator, morphs); `ease` only for subtle hover color changes; `linear` only for constant motion (spinners, marquees); **avoid ease-in** (sluggish starts).
  - **Use custom easing curves** — built-in CSS curves are almost always too weak/flat; use custom `cubic-bezier()` curves (easing.dev, easings.co). Asymmetric curves feel more alive than symmetric ones. Pick easing first, then tune duration.
  - **Springs for interactive feedback** — for position-tracking UI, never tie visuals directly to the pointer; interpolate through a spring (`useSpring`) because nothing in the real world changes instantly.
  - **Timing tables & orchestration** — micro-interactions 100–150ms; standard UI 150–250ms; dialogs ~150ms enter / ~100ms exit (exits shorter than entries); drawers/page transitions 300–450ms max. Product UI stays under 300ms. Frequency decides: never animate keyboard-initiated or 100×/day actions. Stagger children as a wave (`animation-delay: calc(var(--index) * 60ms)`). Paired elements (dialog + overlay) must share easing + duration.
  - **Know your tools / polish details** — animating `clip-path` (not just color) makes tabs transitions coherent; ~2px blur bridges state swaps, never exceed ~20px (expensive, esp. Safari); origin-aware animations (`transform-origin: bottom center`); review by scrubbing frame-by-frame or in slow motion; give a new animation a day with fresh eyes before shipping.
- **Skills to steal:** Vocalize *why* an animation feels right ("ease-out decelerates like real objects"). Duration ∝ size/distance; easing drives perceived speed. Animation is brand voice (slow+eased = premium; instant = fast product). Treat animation as an accessibility/performance surface (respect `prefers-reduced-motion`, animate only transform/opacity). "Proof of care": polish past where most people stop — invisible details exist only in use.

### web.dev Learn Design (Google) — https://web.dev/learn/design

- **What it is:** Google's free, no-account "Learn Responsive Design" course by Jeremy Keith, reviewed by Rachel Andrew, Una Kravets, Adam Argyle. 16 modules with demos + self-assessments: media queries, internationalization, macro layouts, micro layouts, typography, responsive images, picture element, icons, theming, accessibility, interaction, UI patterns, media features, screen configurations. (Correction to the brief: color/spacing basics live in the sibling **web.dev/learn/css** course; Learn Design is responsive-design-first.) Zero JS required.
- **Canonical lessons (condensed):**
  - **Typography** — the web is responsive by default (text reflows); your job is readability. Fluid type: `font-size: clamp(1rem, 0.75rem + 1.5vw, 2rem)` — never bare `vw` (user can't resize); mix relative units into `calc()`. Line length: 45–75 characters, 66 ideal (Bringhurst) via `max-inline-size: 66ch`, never fixed px. Ship woff2; web fonts cost load time, which is UX.
  - **Macro vs Micro layouts** — separate page-level structure (grid/regions) from component-level flexibility ("build flexible components that can be placed anywhere" — the container-query mindset). Content, not devices, determines breakpoints: start small, expand until content breaks, add a breakpoint there.
  - **Media queries & media features** — modern range syntax `(400px <= width <= 700px)`; respond to user preferences (`prefers-color-scheme`, `prefers-reduced-motion`) as first-class design inputs, not afterthoughts.
  - **Theming** — dark mode and theming are adaptations to user preference; declare `color` and `background-color` together (never assume browser defaults).
  - **Accessibility** — don't rely on color alone (add underline/weight to links); test contrast (VisBug, DevTools rendering emulation, Firefox Accessibility Inspector); use relative units so 200–400% font scaling doesn't break layout — a 400% zoom user deserves the small-screen layout.
  - **Internationalization** — prepare for writing modes beyond LTR horizontal: logical properties, `dir`, scripts that render vertically or RTL change everything about spacing and layout.
- **Skills to steal:** "Let content determine breakpoints." `clamp()` for fluid everything (type, spacing). Logical properties as default vocabulary. User preferences (light/dark, reduced motion, font size) are design requirements. Line-length in `ch`. Every module ends with a self-assessment — a template for self-study loops.

### CSS-Tricks — https://css-tricks.com

- **What it is:** The 19-year-old (since 2007) canonical front-end reference, recently under new ownership (Geoff Graham, 2026). Three pillars: **Guides** (the famous complete layout guides), the **Almanac** (every CSS property/rule/function documented with a snippet), and community articles/bytes tracking new CSS weekly. The reference layer of frontend education.
- **Canonical lessons (condensed):**
  - **A Complete Guide to Flexbox** (Chris Coyier) — the single most-linked CSS reference on the web: every container/item property diagrammed (`justify-content` vs `align-items`, flex shorthand gotchas, `flex: 1` ≠ `flex: 1 1 auto` nuances). Core lesson: learn the two axes mentally once, then read the diagrams forever.
  - **A Complete Guide to CSS Grid** (Chris House) — grid tracks, areas, lines, auto-placement, implicit vs explicit; now kept current (subgrid, masonry debates). Core lesson: grid is 2D template thinking — name your areas, place by line.
  - **CSS Anchor Positioning Guide** — the modern replacement for JS-positioned tooltips/popovers: `anchor-name` + `position-anchor` + `position-area`, with fallbacks. Pair with Josh's tutorial for the practical cut.
  - **CSS Container Queries** (Geoff Graham) — component-responsive rather than viewport-responsive styling; the mental shift from page to component as the unit of design.
  - **Cascade Layers Guide** (Miriam Suzanne) — `@layer` to control the cascade deliberately: reset < base < components < utilities, ending specificity wars.
  - **Classic Tricks** — "Greatest CSS Tricks" book: scroll-driven effects with `animation-timeline`, scroll shadows (`background-attachment: local` gradient trick), self-drawing shapes (stroke-dashoffset), pure-CSS border triangles, editable style blocks. Core lesson: constrain cleverness — most "wow" tricks are one property deep.
  - **The Almanac** — one-page-per-property habit: when meeting a new CSS feature (`random()`, `@function`, `calc-size()`, gap decorations), the Almanac is the canonical "what is it + minimal snippet" stop.
- **Skills to steal:** Maintain a personal Almanac habit (one canonical snippet per feature). Diagram-based documentation (axes, tracks, lines). Keep guides living — his flexbox/grid guides get updated, not archived. Track "Bytes" for platform churn (Chrome/Firefox/Safari releases) weekly.

### Smashing Magazine — https://www.smashingmagazine.com

- **What it is:** Since 2006, the professional practice layer: deep UI/UX + frontend articles, Vitaly Friedman's evidence-based design guides, books, workshops, and checklists. Less "how to center a div," more "how design decisions affect humans and systems." Founded by Vitaly Friedman (Smart Interface Design Patterns).
- **Canonical lessons (condensed):**
  - **Accordion Icons: Which Work Best?** (Vitaly Friedman) — icon choices are researchable, not taste: the caret is the safest accordion icon; split menus (two actions in one control) harm usability; icons and labels must not link to different actions. Lesson: micro-decisions deserve evidence.
  - **A Practical Guide To Naming Things** (Vitaly) — naming UI components is architecture: consistent BEM-ish conventions, nouns over verbs, names that survive redesigns; a searchable naming convention is a design-system accelerant.
  - **Stop Treating CSS Container Queries Like Traditional Media Queries** (Victor Ayomipo) — container queries are underused/misunderstood: components should respond to *their container's* context (sidebar vs main vs modal), not the viewport; design components as context-independent units.
  - **Modern CSS Might Make Your Front-End More Complex** (Gabriel Shoyombo) — new CSS isn't automatically simpler: each feature carries cognitive cost; choose the boring solution when it's clearer. Anti-hype discipline for a modern-CSS era.
  - **Complete Guide to Accessible Front-End Components** — the working reference for accessible modals, date pickers, nav, tables, buttons, focus states; accessibility is a component-implementation concern, not a checkbox.
  - **CSS Generators & Tools** — curated generators for shadows, cubic-beziers, easing gradients, type scales: use generators to *learn* the parameter space, then internalize it.
- **Skills to steal:** Evidence over opinion (run micro-usability reasoning on icons/labels). Checklists as engineering artifacts (Smart Interface Design Patterns deck). Component context-independence as a design rule. Skepticism as craft: adopt new CSS only when it reduces total complexity. Naming conventions are design-system work.

### Ahmad Shadeed (ishadeed.com) — https://ishadeed.com

- **What it is:** 169+ visual, figure-driven articles by Ahmad Shadeed (design engineer, author of *Debugging CSS*, creator of Defensive CSS and RTL Styling 101, now teaching The Layout Maestro course). The single best free corpus on **context-based styling, layout rebuilding, and CSS debugging** — short, surgical posts that solve one real UI problem each.
- **Canonical lessons (condensed):**
  - **Defensive CSS (defensivecss.dev)** — write future-proof CSS: anticipate long labels, variable content length, missing avatars, overflow, wrapping. Every component will eventually meet its worst-case data; style for it in advance. This is the canonical "design for real content" playbook.
  - **RTL Styling 101 (rtlstyling.com)** — the definitive guide to RTL layouts: use logical properties (`margin-inline-start`, not `margin-left`), mirror flex/grid direction, handle icons, numbers, and mixed-direction text. Direction-aware styling is a core design-engineering skill, not an edge case.
  - **An Interactive Guide to CSS Container Queries** — interactive, per-property container-query teaching: components that adapt to their container unlock truly reusable design systems.
  - **Designing Better Target Sizes** — touch/click target sizing from first principles: measure, don't guess; targets below ~44px/24px thresholds create real error rates; spacing between targets is part of the target.
  - **Solved By Modern CSS series + layout rebuilds** (FIFA standings w/ subgrid, Time.com hero, section layouts, feature images) — take real production UI and rebuild it with modern CSS, narrating every decision (`calc-size()`, `round()`, range syntax, `flex-wrap: balance`, anchor positioning, `lh` units). Debugging CSS is a mindset: isolate, inspect computed styles, question assumptions — the `* { outline: 1px solid red }` reflex is only the start.
- **Skills to steal:** Defensive mindset: style for worst-case content first. Logical properties by default (makes RTL/i18n nearly free). Rebuild real UI to learn (FIFA, Time) — case studies beat tutorials. One-figure-one-lesson writing: each article = one problem, one solution, one visual. Free companion assets: defensivecss.dev, rtlstyling.com, lab.ishadeed.com, headers-css repo.

---

## Category Synthesis

### Self-study curriculum for a frontend developer (ordered: CSS → animation → design → practice)

**Phase 1 — CSS foundations (weeks 1–4)**
1. **web.dev/learn/design: Media queries, Macro layouts, Micro layouts** — responsive thinking from the start; content-driven breakpoints, range syntax.
2. **CSS-Tricks: Complete Guide to Flexbox, then Complete Guide to Grid** — read the diagrams; build each example from memory.
3. **Josh Comeau: An Interactive Guide to Flexbox / Grid / How To Center a Div / A Modern CSS Reset** — convert reference knowledge into mental models.
4. **CSS-Tricks: Cascade Layers Guide + Container Queries Guide** and **Shadeed: Interactive Guide to Container Queries** — modern architecture: `@layer`, component-scoped responsiveness.
5. **Shadeed: Defensive CSS** — ship nothing that breaks on real data.

**Phase 2 — Animation (weeks 5–8)**
1. **Emil Kowalski: Good vs Great Animations (free essay)** — the theory spine: natural, purposeful, tasteful; easing tables; timing tables.
2. **Josh Comeau: An Interactive Guide to CSS Transitions → Squash and Stretch → linear() springs → Scroll-Driven Animations** — CSS-native motion, from transitions to physics.
3. **animations.dev waitlist preview lessons** — two free chapters; if budget allows, the full course (theory module + CSS module are the transferable parts; Motion module optional).
4. **CSS-Tricks Classic Tricks: scroll animation, self-drawing shapes** — playful consolidation.

**Phase 3 — Design (weeks 9–12)**
1. **web.dev/learn/design: Typography → Theming → Accessibility → Internationalization** — fluid `clamp()` type, 66ch measures, dark mode as preference-handling, color-independence, RTL/writing modes.
2. **Josh Comeau: Designing Beautiful Shadows** + **CSS Variables for React Devs** — build a tokenized elevation + theme system.
3. **Shadeed: Designing Better Target Sizes + RTL Styling 101** — human-factors and direction-aware craft.
4. **Smashing: Accordion Icons + Accessible Front-End Components** — evidence-based micro-decisions and component accessibility.

**Phase 4 — Practice (ongoing)**
1. **Shadeed: Solved By Modern CSS series + layout rebuilds** — rebuild one real-world UI (FIFA standings, Time hero, a dashboard header) per week.
2. **Smashing: Naming Things + Container Queries mindset** — systematize: naming convention, context-independent components.
3. **Smashing: Modern CSS complexity + CSS Generators** — adopt only complexity-reducing features; use generators to internalize parameter spaces.
4. **CSS-Tricks Almanac + Bytes** — weekly platform watch: one new feature, one minimal snippet, logged.
5. Capstone: ship one component (toast, drawer, command palette) applying *all* layers — defensive CSS, tokenized theming, ease-out motion, reduced-motion support — then review it frame-by-frame like Emil would.

### The 10 most valuable transferable lessons

1. **Default to ease-out for anything entering; ease-in-out for things already on screen; never ease-in.** Easing is the #1 lever on perceived quality and perceived speed. (animations.dev)
2. **Exits should be shorter than entries; product UI stays under 300ms; never animate high-frequency/keyboard-driven actions.** Timing is proportional to size, distance, and frequency. (animations.dev)
3. **Pick one global light source and keep every shadow on the same offset ratio; layer 4–5 shadows; color-match the shadow to the background hue.** Realism comes from systemized subtlety, not one big blur. (Josh Comeau)
4. **Let content determine breakpoints — start small, expand until it breaks.** And separate macro (page) from micro (component) responsiveness; container queries make components context-independent. (web.dev + Smashing + Shadeed)
5. **Fluid type via `clamp(1rem, Xrem + Yvw, Zrem)`, measure in `ch` (45–75, 66 ideal), units always relative.** Typography that respects the user beats typography that impresses the designer. (web.dev)
6. **Write defensive CSS: every component will eventually meet its worst-case data.** Long labels, missing images, overflow, wrapping — design for failure modes first. (Shadeed)
7. **Use logical properties by default.** RTL/internationalization becomes nearly free, and it future-proofs every layout. (Shadeed)
8. **Don't rely on color alone, declare color+background together, and respect user preferences (dark mode, reduced motion, 400% font scaling) as requirements — not edge cases.** (web.dev)
9. **Taste is a trainable skill: expose → analyze → practice.** Great animation is natural, purposeful, tasteful — and often the best animation is none. The more you animate, the less each one is worth. (animations.dev)
10. **Learn systems and algorithms, not syntax; adopt new CSS only when it reduces total complexity.** Mental models (layout algorithms, the cascade, elevation) compound; feature-chasing doesn't. And polish past where everyone else stops — animation is proof of care precisely because it's invisible in screenshots. (Comeau + Smashing + Emil)
