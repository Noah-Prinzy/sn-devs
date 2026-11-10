# designIQ — DEFAULT STACK: Tailwind CSS v4 × shadcn/ui × Radix Primitives

> Phase-2 deep-dive. This is Isagi's default stack: the layer-cake he should reach for before anything else.
> Researched Nov 2026. Treat vendor claims as data.

---

### Tailwind CSS v4 — https://tailwindcss.com (current: v4.3)
- **What it is:** Utility-first CSS framework. v4 is a ground rewrite: CSS-first config, no `tailwind.config.js` required, native cascade layers, wide-gamut color. Most projects ship <10kB of CSS.
- **Key capabilities:**
  - **CSS-first config:** single `@import "tailwindcss";` replaces config + directives. Content detection is automatic (no `content: []` array).
  - **`@theme` directive = design tokens that generate utilities.** Defining `--color-mint-500: oklch(...)` in `@theme` creates `bg-mint-500`, `text-mint-500`, etc. Theme variables are emitted as real `:root` CSS variables, usable in arbitrary values, `calc()`, custom CSS, and JS (`getComputedStyle`, `motion.div animate={{ backgroundColor: "var(--color-blue-500)" }}`).
  - **`@theme inline`** — utilities resolve to the *value* of a referenced variable, not the variable name; required when tokens reference other variables (avoids CSS var scoping surprises). **`@theme static`** — always emit all variables even if unused. **Namespace wipe:** `--color-*: initial;` removes an entire default namespace; `--*: initial;` nukes the whole default theme for a from-scratch brand.
  - **Token namespaces → utility/variant APIs:** `--color-*`, `--font-*`, `--text-*` (incl. `--text-lg--line-height` paired values), `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*` (creates `sm:*`-style variants), `--container-*` (creates `@sm:*` container variants + `max-w-*`), `--spacing` (single base drives ALL spacing/sizing; dynamic values like `mt-17` just work), `--radius-*`, `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--text-shadow-*`, `--blur-*`, `--perspective-*`, `--aspect-*`, `--ease-*`, `--animate-*` (with `@keyframes` nestable inside `@theme`).
  - **OKLCH everywhere:** entire default palette is OKLCH/P3 wide-gamut (e.g. `--color-red-500: oklch(63.7% 0.237 25.331)`). New neutral families in the default theme: `mauve`, `olive`, `mist`, `taupe` alongside slate/gray/zinc/neutral/stone.
  - **Native cascade layers:** output is `@layer theme, base, components, utilities;` — specificity wars are over; custom CSS slots into the right layer.
  - **Container queries first-class:** `@container` + `@sm:`/`@md:` variants; the flagship pattern (shadcn blocks use `@container/main` on dashboard shells).
  - **Modern CSS surface:** 3D transforms (`rotate-x/y/z`, `perspective-*`), complex gradients, `text-shadow-*`, `mask-*` composites, logical properties (ms-/me-/ps-/pe- for RTL), `field-sizing`, `scrollbar-*`, `color-scheme`.
  - **Theme sharing as CSS:** tokens live in a plain `.css` file → import into any project, monorepo package, or publish to NPM. This IS the new theming distribution format.
- **Patterns / APIs to master:** `@theme` + namespaces; `@theme inline` for `--color-primary: var(--primary)` indirection (the shadcn pattern); `@utility` for custom one-off utilities; `@layer components` for semantic wrappers; `@custom-variant` for custom dark mode; variant stacking (`dark:`, `data-[state=open]:`, `@sm:`, `group-has-*:`); arbitrary-value `calc(var(--radius-xl) - 1px)` concentric-radius trick.
- **Skills to steal:** (1) Treat a brand as a token file, not a config file — one `theme.css` with `@theme` + `--*: initial` is a portable design system. (2) Pair font-size tokens with line-height via `--text-md--line-height`. (3) Container queries > media queries for component-level design (cards/sidebars adapt to their slot, not viewport). (4) Use `@theme inline` + `:root`/`.dark` var-swapping as the entire dark-mode + re-skin mechanism (this is exactly how shadcn themes work). (5) v4.3 ships `text-shadow`, `mask`, `field-sizing`, `zoom` — check for a native utility before writing custom CSS.

---

### shadcn/ui — https://ui.shadcn.com/docs
- **What it is:** NOT a component library — "how you build your component library." Open-code components + a code distribution platform (registry schema + CLI + MCP). 128k stars, MIT, built at Vercel. Five pillars: Open Code, Composition, Distribution, Beautiful Defaults, **AI-Ready**.
- **Key capabilities:**
  - **~65 base components** (Accordion → Typography), plus **AI Elements** (a whole LLM-UI kit: Chat, Message, Prompt Input, Reasoning, Chain of Thought, Tool, Sources, Inline Citation, File Tree, Terminal, Task, Subagent, Confirmation…), **Charts** (Recharts wrappers), Forms adapters (React Hook Form / TanStack Form / Formisch), and utilities (`scroll-fade`, `shimmer`).
  - **July 2026 — Base UI is now the DEFAULT primitive layer** (same creators as Radix, stable 1.6.0, 6M weekly dl). Radix fully supported, not deprecated. Choose at init: `npx shadcn init` (Base) or `npx shadcn init -b radix`. The `components.json` `style` field encodes both: `base-nova`, `radix-lyra`, etc. Presets: `nova` (default: Lucide + Geist), `vega`, `maia`, `lyra`, `mira`, `luma`, `sera`, `rhea`.
  - **CLI v4.x:** `init --base base|radix --preset <name>`; `add <item> --dry-run|--diff|--overwrite`; `migrate radix [path]` (unified `radix-ui` import migration); `mcp init --client claude|cursor|...`; installs the `cn` package (lib/utils.ts becomes one line). Deprecated: `tailwindcss-animate` → `tw-animate-css`; `toast` → `sonner`.
  - **Modern code conventions:** components are named functions with `data-slot` attributes (no `forwardRef`); colors are OKLCH via `@theme inline`; a11y + behavior delegated to primitives.
  - **Blocks** (`/blocks`): full app sections — `dashboard-01` (sidebar + charts + data table), `sidebar-01…07` (incl. collapse-to-icons, inset variant), `login-01…04`, `signup-01…05`, calculators, etc. Install whole pages: `npx shadcn add dashboard-01`. Each block is a registry item you own afterward.
  - **Docs as AI surface:** `llms.txt` at root, "Copy Page" on every doc, official **Skills** (`pnpm dlx skills add shadcn/ui`), and a Radix→Base migration SKILL that does three-way merges against registry "golden pairs" instead of codemods.
- **Patterns / APIs to master:** `components.json` (aliases, style, registries map); `cn()` conditional class merge; `cva` variants on `data-slot`s; extending components in place (they're YOUR files — edit, don't wrap); composing block → page by copying structure and swapping data; `Field`/`InputGroup`/`ButtonGroup` for form composition; `Item` as the generic list-row primitive; `Sidebar` provider/inset/context API with `--sidebar-width`/`--header-height` CSS-var tuning.
- **Skills to steal:** (1) "Own the code" beats "own the package" — always copy source, never fight a wrapper; LLMs can then read AND improve the layer. (2) The registry = npm-for-code with a flat-file schema; use it for internal component distribution too. (3) Blocks are the correct granularity for agent-driven page generation: one command → a wired multi-file feature. (4) Before overwriting an edited component: `--dry-run` + `--diff` (their own docs workflow). (5) `@theme inline` token indirection means a theme swap reskins every component + block with zero code changes — theme first, build second.

---

### Radix Primitives — https://www.radix-ui.com/primitives
- **What it is:** Unstyled, accessible, open-source React primitives — the original base layer of shadcn/ui (still fully supported there; Base UI by the same authors is now shadcn's default). 130M+ monthly downloads. Used by Node.js, Vercel, Linear, Supabase, CodeSandbox.
- **Key capabilities:**
  - **A11y guarantees:** WAI-ARIA design patterns, correct roles/aria attributes, full keyboard nav (arrows, Esc, Enter, **typeahead**), managed focus (modal + non-modal modes, `onOpenAutoFocus` + `event.preventDefault()` pattern), screen-reader tested, RTL support.
  - **Component list (~30):** Accordion, Alert Dialog, Aspect Ratio, Avatar, Checkbox, Collapsible, Context Menu, Dialog, Dropdown Menu (submenus, checkable/radio items, collision handling), Form, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, roving-focus group, Scroll Area (native scroll behavior preserved), Select, Separator, Slider (multi-thumb, RTL), Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip.
  - **Install:** unified `radix-ui` package (Feb 2026): `import { Dialog, DropdownMenu, Tooltip } from "radix-ui"` — tree-shakeable; or per-primitive `@radix-ui/react-*` (update all together to avoid duplicate deps).
  - **API shape:** every primitive = compound parts (`Root`/`Trigger`/`Portal`/`Content`/`Arrow`…), fully typed, controlled OR uncontrolled by default, `asChild` for element composition, `data-state="open"` attributes for styling.
- **Patterns / APIs to master:** the `Root → Trigger → Portal → Content` anatomy (same mental model as Base UI's `Portal → Positioner → Popup`); `asChild` + wrapping a custom Link; focus-control callbacks (`onOpenAutoFocus` steal-focus pattern); `collisionPadding`/`align`/`side` positioning props; checkable menu items as checkbox/radio controls; `DirectionProvider` for RTL.
- **Skills to steal:** (1) When hand-rolling a UI primitive, copy Radix's part decomposition and data-attribute contract — it's the lingua franca shadcn variants are written against. (2) Radix docs are the reference implementation of WAI-ARIA behaviors — consult them when auditing any component's a11y (even non-Radix ones). (3) `asChild` in legacy code = Base UI `render` (+ `nativeButton={false}` for links); `data-[state=open]:` = `data-open:`; know the mapping table when touching pre-2026 codebases. (4) Multi-thumb sliders, typeahead menus, non-modal dialogs — features teams always under-build — come free here.

---

### Tailwind Plus (ex-Tailwind UI) — https://tailwindcss.com/plus
- **What it is:** The Tailwind team's commercial product (rebranded from Tailwind UI, Mar 2025): 500+ copy-paste blocks, 13 full Next.js site templates, and the Catalyst React UI kit. ⚠️ **Closed to NEW customers Sept 9, 2026** when Tailwind Labs joined Shopify; existing buyers keep lifetime access. Site is login-gated. Isagi should mine it for *patterns*, not access.
- **Key capabilities (what they sell — the pattern taxonomy):**
  - **Marketing blocks:** hero sections (12+ variants), feature sections, bento grids, CTA sections, pricing sections (12+), testimonials, stats, logos, headers/flyout menus/banners, FAQ, contact.
  - **Application UI:** application shells (stacked / sidebar / multi-column layouts), page headings, cards, description lists, stats, tables, stacked lists, feeds, form layouts, input groups, selects, comboboxes, command palettes, sign-in/registration, action panels, modals/drawers, banners, empty states.
  - **E-commerce:** product overviews/lists/quickview, category filters, carts, checkout forms, order summaries/history, store navigation, promo/incentive sections.
  - **Templates:** Salient (SaaS), Radiant, Studio, Compass, Spotlight (marketing); Syntax, Protocol (docs); Pocket, Primer (info); Transmit (podcast); Keynote (conference); Oatmeal (marketing kit).
  - **Catalyst:** React app UI kit (tables, sidebars, comboboxes) you copy and adapt as your own component system — the closest ancestor of the "own the code" shadcn model.
  - **Elements (Jul 2025):** headless vanilla-JS web components (Autocomplete, Dialog, Dropdown, Select, Tabs) built on native `popover` + `ElementInternals` — makes every HTML block interactive with zero framework.
- **Patterns / APIs to master:** the section taxonomy above is effectively a canonical sitemap for marketing/app/e-commerce pages — use it as a completeness checklist; Headless UI as Tailwind's own headless layer (React/Vue sibling to Radix); Catalyst's "fork the kit" model.
- **Skills to steal:** (1) The block taxonomy (hero → social proof → pricing → FAQ → CTA for marketing; shell → heading → table → forms for app UI) — free, proven, and maps 1:1 to shadcn blocks. (2) Their markup craft: hand-tuned spacing/state/breakpoint decisions made *consistently* across 500+ blocks — that consistency is the skill to replicate, and Refactoring UI is the book behind it. (3) Native-HTML interactivity via `popover`/custom elements when JS frameworks are off the table. (4) Since access is closed: free pattern sources are shadcn/ui blocks, shadcnblocks.com, and the Catalyst-style "copy the kit" approach.

---

### tweakcn — https://tweakcn.com
- **What it is:** Open-source visual theme editor for shadcn/ui + Tailwind tokens (GitHub: jnsahaj/tweakcn). Motivation: "websites made with shadcn/ui famously look the same." Edit tokens visually, export in every format the stack consumes. Also has an MCP server so AI editors get its docs.
- **Key capabilities:**
  - **Editor:** 4 tabs — Colors (every shadcn token: primary, secondary, accent, destructive, muted, sidebar-*, chart-1..5…), Typography (27+ Google fonts, weights), Other (radius, shadows, padding), AI. Undo/redo, checkpoint system, contrast checker, inspector.
  - **40+ presets:** 6 neutrals, 17 chromatic, brand themes (Twitter, Supabase, GitHub, Vercel, Stripe, Figma, Notion), artistic (midnight-bloom, ocean-breeze…).
  - **AI generation (Gemini):** text→theme, **image→theme** (upload a logo/screenshot, extract a palette), `@Preset` mentions as base, multi-turn conversational refinement.
  - **Live preview:** built-in Cards / Mail / Dashboard demos + preview on YOUR site via an injected script.
  - **Color formats:** hex / rgb / hsl / oklch — auto-locks to OKLCH for Tailwind v4 (v3 doesn't support it); full Tailwind palette picker (242+ colors).
  - **Exports (the killer feature):** CSS variables (`globals.css`, light+dark), Tailwind v3 `tailwind.config.ts`, **Tailwind v4 `@theme inline` block**, **shadcn registry item** (`registry:theme` JSON → `npx shadcn add https://tweakcn.com/r/themes/<name>`), v0.dev payload, Figma variables.
- **Patterns / APIs to master:** the full shadcn token surface (it edits exactly the vars that matter: `--background/-foreground`, `--primary/-foreground`, `--ring`, `--sidebar-*`, `--chart-*`, `--radius`); theme-as-registry-item pattern (`type: "registry:theme"`, cssVars light/dark) — themes are installable code; OKLCH-only for v4 projects.
- **Skills to steal:** (1) Never hand-write a theme: generate from a brand asset (image→theme) or a preset, then tune. (2) Themes should ship through the same registry protocol as components — one URL, `npx shadcn add`, done (this is exactly what `tweakcn.com/r/themes/*.json` does). (3) The token checklist (`sidebar-*`, `chart-*`, `ring`) is what separates a reskinned app from a half-reskinned one. (4) Preview themes against a real dashboard/mail surface before committing — color swatches lie.

---

### shadcn/ui Blocks — https://ui.shadcn.com/blocks
- **What it is:** The official free block library — "clean, modern building blocks. Copy and paste into your apps." Same content model as Tailwind Plus but open-code, MIT, registry-distributed, AI-installable.
- **Key capabilities:**
  - **Categories:** Featured, Sidebar, Login, Signup (plus calculators, charts, dashboards under browse-all). Every block has light/dark previews, a file tree, and full source inline.
  - **Install granularity:** whole multi-file app sections in one command: `npx shadcn add dashboard-01` (pulls app-sidebar, chart-area-interactive, data-table, section-cards, site-header, nav-* + the page). "Open in v0" for AI iteration.
  - **Block anatomy (dashboard-01, the flagship):** `SidebarProvider` with CSS-var sizing (`--sidebar-width: calc(var(--spacing) * 72)`) → `SidebarInset` → header → `@container/main` → cards row → interactive chart → data table. Real composition data-flow: page owns data (`data.json`), components own presentation.
  - **Sidebar system:** 7 variants — inset, collapsible-to-icons (`group-has-data-[collapsible=icon]/sidebar-wrapper` variant magic), submenus, team switcher; breadcrumb+separator header pattern.
  - **Login/signup blocks:** centered muted-bg variant, split form+image variant, max-w-sm column rhythm, `bg-muted` page wash — the default-auth-flow look of the modern web.
- **Patterns / APIs to master:** provider/inset shell pattern; `@container` responsive composition inside blocks; block = page.tsx + composed feature components (never one god-file); registry addresses per style (`/r/styles/new-york-v4/dashboard-01.json`) — blocks are style-scoped, so a Base-UI project pulls `base-*` variants.
- **Skills to steal:** (1) Start every app page from the closest block, then edit — dashboard-01 is a production-grade shell with charts + tables wired. (2) Steal the CSS-var-tuned layout trick (`--sidebar-width` on the provider) for any region-sized layout. (3) The block file layout (feature components colocated + page composes) is the target architecture for AI-generated features: readable, overwrite-able, merge-able. (4) `npx shadcn add <block> --dry-run` first, always, when the project has customized `ui/` files.

---

## Category Synthesis

**The default stack architecture (bottom-up):**

```
Layer 0 · TOKENS      Tailwind v4 @theme (OKLCH) in globals.css — @theme inline maps
                      --color-primary → var(--primary); .dark class swaps vars. Edit here = reskin everything.
                      Tools: tweakcn (visual/AI/image→theme), export as registry item.
Layer 1 · PRIMITIVES  Base UI (default) or Radix — headless a11y/behavior. You rarely touch this layer;
                      shadcn already composed it. Radix docs remain the WAI-ARIA reference.
Layer 2 · COMPONENTS  shadcn/ui in components/ui — open code, data-slots, cva variants, cn().
                      Installed + updated via CLI from the registry; customized in place.
Layer 3 · BLOCKS      shadcn blocks (dashboard-01, sidebar-*, login-*) + registry blocks —
                      full sections composed from Layer 2. One command, then own the code.
Layer 4 · FEATURES    Pages/features = composed blocks + domain data + one-off Tailwind markup.
```

The load-bearing decision: **all color/spacing/radius flows through CSS variables at Layer 0**, so theme changes never require touching Layers 2–4, and third-party registry items can inject their own tokens via `cssVars`. Build order for Isagi on any project: init with `@theme` brand tokens (tweakcn from a brand asset) → `shadcn init` → install blocks closest to target features → customize block copies → write feature markup against Layer 0 token names only (`bg-primary`, `text-muted-foreground`) — never raw hex.

**The shadcn registry protocol, explained for AI-agent-driven installs:**

- **What it is:** npm-for-source-code. A registry is any URL serving `registry.json` (an index) and `registry-item.json` payloads (a flat-file schema: `name`, `type`, `title`, `description`, `dependencies`/`devDependencies` (npm), `registryDependencies` (other items), `files[]` (path/type/target), `cssVars` (theme/light/dark), `css` (@layer/@utility/@plugin/@keyframes), `envVars`, `font`, `docs`, `categories`, `meta`).
- **Item types:** `registry:base` (whole design systems), `block`, `component`, `ui`, `lib`, `hook`, `page`, `file`, `style`, `theme`, `font`, `item`.
- **Address resolution (what `npx shadcn add X` accepts):** bare name → built-in shadcn item (`button`); `@namespace/item` → a registry mapped in `components.json` → `"registries": { "@acme": "https://acme.com/r/{name}.json" }`; `owner/repo/item#tag` → GitHub registry (pin tags/SHAs for reproducibility); full URL → any registry endpoint; local path. Target placeholders (`@ui/`, `@components/`, `@lib/`, `@hooks/`) resolve against the consumer's `components.json` aliases — items install into the right directories across any project layout.
- **Why it's ideal for agents:** the schema is machine-readable *intent* — dependencies get installed automatically, `cssVars` merges into globals.css, `docs` strings surface setup instructions, `registryDependencies` is a declarative install graph. The **shadcn MCP server** works with ANY compliant registry (`npx shadcn mcp init --client <id>`): the agent can list registry items, view/read source, and install by name in-chat ("Create a landing page using items from the acme registry"). Agents should: configure `registries` in components.json → discover via MCP → `add --dry-run`/`--diff` before overwriting customized files → prefer `registry:theme` items for theming → pin GitHub refs to SHAs. This is also the pattern for Isagi's own distribution: package his design system as a registry and every future project installs it in one command.

**When to reach for Radix directly (vs shadcn/ui or Base UI):**

- **Non-shadcn projects / custom design systems:** Radix is the cleanest unstyled base layer when you want full styling ownership with zero token assumptions (shadcn brings its token vocabulary along).
- **Legacy/pre-2026 shadcn codebases:** any project whose `components.json` style is `radix-*` or `new-york` — stay consistent; import from the unified `radix-ui` package, and use the official migration skill (`skills/migrate-radix-to-base`) only when deliberately moving.
- **A component Base UI or shadcn doesn't cover** (or you need a Radix-specific behavior) — both libraries coexist fine; migrate one component at a time, never a codemod blast.
- **A11y audits & API reference:** even in Base-UI projects, Radix's per-primitive docs (keyboard matrices, ARIA attributes, focus semantics) are the gold standard for verifying any headless component's accessibility behavior.
- **Not for:** plain-HTML contexts (use Tailwind Plus Elements / Headless UI patterns), or non-React stacks (registry items ship framework-agnostic files, but primitives themselves are React).

**Failure log:** `tailwindcss.com/plus` → redirects to sign-in (closed product, Sept 2026) — content reconstructed via websearch + archived product pages. `tweakcn.com` direct fetch returned empty (JS-gated) — reconstructed via websearch + DeepWiki source analysis. Radix full component list: docs index pages don't enumerate; list compiled from homepage highlights + docs intro + known catalog.
