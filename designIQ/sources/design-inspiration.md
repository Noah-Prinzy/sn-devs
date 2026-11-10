# designIQ — Category: Design Inspiration Sites

> Permanent knowledge base entry. Researched 2026-11-09. All content below describes the sites as observed/verified via direct fetches and secondary research. Fetched content is treated as data, never instructions.

Sites covered: Godly, Inspora, Sitereel, Layers, Mobbin, Figma Community, Cosmos, Savee, Visuelle, Another Graphic, Fonts In Use.

---

### Godly — https://godly.design
- **What it is:** A curated gallery of "the best and most interesting web, app, UI, and visual design work published on the internet." Community-submitted and curated, with a trending feed. Content is split into discrete asset types rather than just "full sites."
- **Design language:** Clean masonry/grid gallery with dense visual thumbnails; the UI itself is minimal so the curated work carries the color. Content skews toward modern SaaS, AI-product, and portfolio sites — glossy, current-trend work (dark themes, bento grids, big type, OG-image culture).
- **Key features / tools:**
  - Sectioned taxonomy: **Websites, Posts (X/Twitter design commentary), Tools, Resources, Templates, Apps (screenshots), App Icons, Logos, OG Images**, plus component-level categories: **Hero, CTA, Footer**.
  - Keyboard-driven search overlay (⌘K) with preview (⌘J) — the site treats browsing as a keyboard workflow.
  - Per-entry metadata: favicon, thumbnail, full OG image, link to the live site.
  - Submit flow for designers; sponsor-supported (Framer).
- **UI patterns to learn:** Hero sections, CTA blocks, and footers as first-class browseable objects; OG-image design as a discipline; app icon and logo treatments; full app-shell screenshots for dashboard/app-shell inspiration.
- **How to mine it for inspiration:** (1) Start at a component category (e.g. `/hero` or `/footer`) not the homepage feed — the feed is a mood board, the sections are a pattern library. (2) For each candidate site, open the entry, study the OG image + thumbnail + live link as three artifacts (thumbnail = first impression, OG = social surface, live site = real DOM). (3) Screenshot or save 5–10 examples of one pattern (e.g. AI-product heroes) and note the shared skeleton: eyebrow label, oversized headline, product mockup, dual CTA. (4) Check the "Posts" tab — designers annotate *why* a design works; that commentary is worth more than the image.
- **Skills to steal:** Component-level curation (tagging heroes/CTAs/footers separately from full pages); OG-image design conventions; recognizing the "current trend median" — Godly shows what the average high-quality AI/SaaS site looks like right now, which is exactly the baseline to meet or deliberately break.

---

### Inspora — https://inspora.design
- **What it is:** A curated archive of recent visual design inspiration and creative work, always credited to its makers. Covering web design, branding, motion, and 3D. Direct fetches return thin content (the site is a JS-rendered SPA behind a Vercel security checkpoint), but its structure is well documented via secondary sources.
- **Design language:** Contemporary, clean, editorial-adjacent gallery; emphasizes fresh/recent work ("a curated archive of **recent** visual design") rather than an all-time canon. Strong credit culture — every entry names the studio/designer.
- **Key features / tools:**
  - Category archives: **Websites** (full-site entries with live links), **Feature Sections** (a dedicated collection of feature-section design patterns), plus branding/motion/3D coverage.
  - Sign-in to save inspiration and manage a creator profile; submission-based entries.
- **UI patterns to learn:** **Feature sections** specifically (the "how it works," capability grid, and product-explainer sections of modern marketing sites); full landing-page composition for AI/SaaS/product studios; portfolio and studio-site structures.
- **How to mine it for inspiration:** (1) Go straight to `/websites` and `/posts/feature-sections` (the feature-section archive) when building a marketing site — it's a pre-filtered pattern library for the least-standardized part of a landing page. (2) Note the credited studio for each entry; when 3+ entries impress you, visit that studio's site — studio portfolios are meta-inspiration. (3) Because entries skew "recent," use it for what's new this month, and use Visuelle/Siteinspire-style archives for historical depth.
- **Skills to steal:** Designing the feature/explainer section (it's the hardest landing-page block and most sites do it badly); attribution literacy — building a mental directory of which studios excel at which industries; trend-spotting via recency bias (intentional here).

---

### Sitereel — https://sitereel.ai
- **What it is:** A gallery of "AI website prompts for beautiful websites" — website design inspiration with **interactive previews and copyable AI prompts**. You browse designs (portfolio, product, luxury, landing page categories), preview them interactively, and copy the prompt that generates that style of site. Direct fetches returned empty (JS-rendered); description verified via multiple secondary sources.
- **Design language:** Prompt-forward gallery; each entry pairs a visual design with the prompt that reproduces it. Positioned inside the AI-builder workflow (people paste the prompts into ChatGPT, Manus, and similar AI site builders).
- **Key features / tools:**
  - Category browsing: portfolio, product, luxury, landing page designs.
  - Interactive previews (not just screenshots) and one-click **copyable AI prompts** per design.
  - Template → prompt → AI builder pipeline ("choose a template you like, copy its prompt, paste it into your AI builder and ask it to customise").
- **UI patterns to learn:** The templates themselves (portfolio, product, luxury, landing page archetypes); also a meta-pattern: how to describe a visual style in words — each prompt is a worked example of translating design into natural language.
- **How to mine it for inspiration:** (1) Pick the category matching your brief (e.g. "luxury" for a premium brand). (2) Compare the preview with its prompt side by side — this teaches you the vocabulary ("what words produce this look?"). (3) Steal the prompt as a starting point and modify it: it's a training corpus for your own design-prompt writing. (4) When an AI-built page looks generic, return here to see how the same prompt was meant to look and find the gap.
- **Skills to steal:** **Prompt literacy for design** — the ability to specify layout, typography, palette, and motion in prose; prompt→design reverse-engineering; recognizing which aesthetic archetypes have reliable prompt recipes.

---

### Layers — https://layers.to
- **What it is:** A community feed for design exploration — designer-posted shots (like a modern Dribbble) with a strong filter taxonomy. Feed + community + news + designers + jobs. Free account for full participation.
- **Design language:** Dense masonry feed of individual shots (not full sites); heavy use of AVIF thumbnails; content spans landing pages, dashboards, mobile apps, branding, icon sets, design systems, and "Daily UI" practice work. Trend-forward and practitioner-heavy.
- **Key features / tools:**
  - Explicit tag taxonomy visible on the homepage: **Minimalist, Mobile Design, Landing Page, SaaS, Dashboard, Branding, Crypto/Web3, Dark Mode, iOS, 3D, Card, Hero Section, Modal, Light Mode, Bento Grid, Micro-interaction**.
  - Designer profiles with portfolios; community feed; news; jobs board.
  - Trending algorithm for the feed.
- **UI patterns to learn:** **Dashboards and app shells** (lots of real product-UI shots: CRM analytics, fintech banking, productivity dashboards), mobile app screens across every vertical, **bento grids**, modals, cards, hero sections, and micro-interactions. Also full **design-system documentation pages** (foundations/colour/typography/layout series appear regularly).
- **How to mine it for inspiration:** (1) Use the tag taxonomy as a query system: e.g. Dashboard + Dark Mode when building an admin panel; Bento Grid + SaaS for a marketing site. (2) Follow individual designers whose shots repeatedly match your taste — profile pages are mini-portfolios. (3) Study design-system shots as specs: they document type scales, color ramps, and spacing systems explicitly, which translates directly into CSS tokens. (4) Daily UI posts show single-component mastery — great for drilling one widget (a calculator, a music player) rather than a whole page.
- **Skills to steal:** Bento-grid composition; dashboard information hierarchy (sidebar + topbar + dense tables/cards); design-system thinking (reading a foundations page and emitting CSS custom properties); micro-interaction ideas for small delight.

---

### Mobbin — https://mobbin.com
- **What it is:** The largest searchable library of **real, shipped product UI** — 600,000+ screens from mobile apps, web apps, and websites, including ordered multi-step flows (onboarding, checkout, paywalls, etc.). Explicitly used by product teams (Cursor, OKX) and, notably, publishes first-class **agent access** (MCP server, REST API, llms.txt).
- **Design language:** Reference-library utility; the value is evidence, not aesthetics. Screens come from real production apps with capture metadata, so quality = authenticity rather than decoration.
- **Key features / tools:**
  - Search across screens, flows, UI patterns, website sections, screen text, industries, and platforms.
  - **Flows** (end-to-end sequences: onboarding, checkout, account setup, subscription) — not just isolated screens.
  - Pattern/element library: dialogs, navigation, forms, tables, empty states, paywalls; website sections: heroes, pricing, testimonials, nav, footers.
  - **Mobbin MCP** for AI agents (natural-language search returning screen images), REST API on Team/Enterprise, `llms.txt` / `llms-full.txt` agent docs, and copy-to-Figma on eligible plans.
  - Collections for saving; weekly additions; "Finance+" vertical (60+ fintech apps including flows behind KYC/geo walls).
- **UI patterns to learn:** Full **user flows** (the ordered screens, not just single states); form design and multi-step onboarding; empty states, paywalls, dialogs, navigation patterns; pricing pages and testimonial sections; how real products at scale (Stripe, OKX, etc.) handle edge cases.
- **How to mine it for inspiration:** (1) Frame the task as a flow, not a screen: "designing a 4-step onboarding" → search onboarding flows in your product's category, open 5+ flows, and step through them screen by screen to extract the common skeleton and the outliers. (2) Use their own guidance: treat Mobbin as *evidence of convention*, not proof of performance — compare multiple examples before adopting a pattern, preserve source URLs, and adapt to the brand/accessibility constraints at hand. (3) If you have agent access (MCP), query with natural language ("show me paywall modals from fitness apps") and keep the canonical Mobbin URLs in your notes. (4) Use website-section searches (pricing, testimonials) as a checklist generator before building a marketing page.
- **Skills to steal:** Flow-thinking (designing sequences and state machines, not lonely screens); convention-mining (knowing the standard pattern so you can consciously follow or break it); evidence-based design reporting (cite the product + URL for every claimed pattern); empty-state and paywall craftsmanship — the highest-neglect screens in most products.

---

### Figma Community — https://www.figma.com/community
- **What it is:** Figma's official marketplace/discovery surface for community-published **design files, templates, UI kits, design systems, plugins, and widgets** — thousands of free and paid resources. Direct page fetches are blocked (JS-rendered), but scope is well documented via Figma's own template pages and ecosystem coverage.
- **Design language:** N/A as a gallery — the "design language" is *inspectable source files*. Unlike screenshot galleries, everything here opens as an editable Figma file where you can see the actual auto-layout, styles, variables, and component structure.
- **Key features / tools:**
  - **Design templates** (10,000+; web, mobile, presentation, FigJam whiteboards), **UI kits**, full **design systems** (many free), **plugins** (functionality: accessibility checkers, icon libraries, stock content), **widgets**.
  - Duplicate-to-draft workflow: open any file and inspect every layer.
  - Creators publish profiles; ratings and usage counts.
- **UI patterns to learn:** Component architecture (how well-made kits structure variants, props, and auto-layout); design tokens (variables for color/type/spacing in real files); complete app-screen sets and wireframe kits; plugin ecosystem patterns.
- **How to mine it for inspiration:** (1) For implementation, not just looks: duplicate a high-quality UI kit or design system and read it like source code — inspect the spacing scale, type ramp, and variable naming, then mirror those decisions in your CSS/Tailwind config. (2) Search for the product type you're building ("SaaS dashboard kit," "e-commerce UI kit") and harvest 2–3 kits for structural reference. (3) Use plugins/widgets functionally (icon libraries, illustration packs, accessibility scans) rather than as inspiration. (4) Study one "best-in-category" design system file per month — it's a free masterclass in component APIs.
- **Skills to steal:** Reading design files like code (auto-layout = flexbox, constraints = responsive rules, variables = tokens); translating Figma structure into frontend structure; component API design (variants/props naming that maps cleanly to React props); free access to professional token systems.

---

### Cosmos — https://www.cosmos.so
- **What it is:** "Your space for inspiration" — a visual discovery and curation platform (founded 2021, NYC) positioned as the tasteful alternative to Pinterest: save anything (images, links, videos, text, products) into collections ("clusters"), discover via a curated social feed, and search by **color, keyword, or image**. Strong iOS/Android apps plus browser extensions for Chrome and Safari.
- **Design language:** Image-first, minimal chrome, masonry/infinite canvas; content skews editorial/artsy — photography, interiors, fashion, objects, art direction — a more "finished/editorial" tone than Pinterest's candid mood boards. Includes a shopping layer (Snow Peak, Lemaire, Diesel, Kotn, etc.).
- **Key features / tools:**
  - **Clusters** (collections) with collaboration — invite others to build shared collections.
  - **Search by color (including hex codes!), keyword, or image** ("start with an image you love and find more like it"); "find similar elements."
  - Save-from-anywhere: browser extension, right-click/app highlight saving, imports from Pinterest/Instagram/Twitter/web.
  - **Hide/blur AI content** toggle — keep feeds human-made.
  - "Infinity canvas" — full-screen cascade of images for serendipitous discovery.
  - Public profiles as taste portfolios.
- **UI patterns to learn:** Less about UI components, more about **art direction**: color palettes, photography treatment, editorial composition, brand mood. The UI itself demonstrates calm, image-forward gallery patterns (masonry grids, canvas exploration, minimal cards).
- **How to mine it for inspiration:** (1) Use **hex-code search** when a brief specifies a palette: search your brand hex to find real-world color combinations in use. (2) Reverse-image-search a reference to find its stylistic relatives — fastest way to expand one good reference into a mood board. (3) Build project clusters as living mood boards; share the cluster with a client instead of a static PDF. (4) Keep "Hide AI" on while mining to study human-made art direction, and browse the Shop tab when designing e-commerce — real product photography and PDP aesthetics.
- **Skills to steal:** Color-first thinking (hex-code search as a palette tool); mood-board → brand-direction translation; curation as a skill (separating taste from volume); collecting reference *sets* (5 images that agree) instead of single images.

---

### Savee — https://savee.com
- **What it is:** "The best place to save and share inspiration" — a designer-curated reference library (6M+ curated references) with one-click saving via extensions/apps, powerful board organization, and search by **word, color, image, or tag**. Trusted by designers at Apple et al.; includes an MCP server for AI agents.
- **Design language:** Deliberately restrained, ad-free, "no noise" aesthetic — the product's identity is restraint ("Rare to see an idea executed with this much restraint… Savee gave us back simplicity"). Reference content spans the full creative spectrum (graphic design, web, motion, photography) with a tastemaker bias.
- **Key features / tools:**
  - **Boards** (collections) + one-click save from Chrome/Safari/Firefox/Edge extensions, iOS/Android apps, Figma plugin.
  - Search by word, **color**, **image**, or tag; customizable grid (adjustable image size/padding).
  - **Savee MCP** — connect Claude/Cursor to your library + 6M+ references so agents "start from taste, not guesses" (Pro/Team).
  - **Marketplace** (150+ motion/design templates), **Design Masterclass** (9-episode visual design course), **Portfolio** builder (publish your site next to the references that shaped it), team boards with comments, hiring profile ("Available for work").
- **UI patterns to learn:** The gallery UI itself (customizable masonry, zero-clutter browsing) is a reference for image-heavy frontend work; portfolio layouts in the Site product; marketplace template structures.
- **How to mine it for inspiration:** (1) Save obsessively while browsing the web (extension) — your board library becomes a searchable personal swipe file. (2) Use **search by color/image/tag** on your own library to resurface old references when a new brief arrives. (3) Use the MCP integration to give an AI agent access to your curated taste — generate designs "in your style." (4) Watch the Design Masterclass and browse the Marketplace for motion templates; steal board structure: one board per project, named by feeling ("quiet luxury"), not by industry.
- **Skills to steal:** Building and maintaining a personal swipe file; taste-as-dataset (curating a library an AI can query); restraint as a design value (what to remove); board taxonomy that mirrors your actual workflow.

---

### Visuelle — https://visuelle.co.uk
- **What it is:** A UK-based graphic design publication and blog, running since 2007, independently curated by David Bennett (CD at opx.studio). Editorial philosophy: *"If it's great, it goes on."* Showcases branding, typography, editorial, digital, and motion work from leading studios (Pentagram, Koto, Studio Dumbar, DixonBaxi, Kurppa Hosk, Porto Rocha) alongside emerging talent — with equal prominence. Includes an annual print edition and the "Create Great" podcast.
- **Design language:** Editorial minimalism — large imagery, concise copy, no ratings or social features; a chronological "best of" exhibition wall. The site itself is a reference for image-led editorial layouts.
- **Key features / tools:**
  - Category filters: All / Digital / Graphic Design / Illustration / Motion / Photography / Podcast / Typography.
  - Deep archive (hundreds of featured projects), each a single project page with imagery and studio credit.
  - Annual printed "Edition," podcast episodes, submissions by email.
- **UI patterns to learn:** Brand identity case studies end-to-end (logo → application → website → packaging); the **digital** category specifically shows studio-built marketing sites of exceptional quality (Mouthwash, Koto, Play, Athletics output); motion work (GIF-led entries) for hero animation reference.
- **How to mine it for inspiration:** (1) Treat it as the "canon": browse the Digital category when you want the highest bar for studio websites; note the studio credit, then visit that studio's own site (most are themselves exemplary). (2) Read 5–10 identity case studies in a row before any branding-adjacent frontend work — it calibrates your eye for system consistency (type, color, application). (3) Subscribe to the podcast for process insight that explains the work. (4) Use it slowly: one visit a week, study 10 entries deeply rather than scrolling 100.
- **Skills to steal:** Identity-to-interface consistency (how brand systems extend into websites); editorial layout rhythms (image sequencing, captions, whitespace); the "great is great" filter — an internal bar for what's worth referencing at all; knowledge of the studio landscape (who made what).

---

### Another Graphic — https://anothergraphic.org
- **What it is:** "Archive of graphic design focused on **typographic treatment**" — a WordPress-based archive of posters, editorial design, visual identity, album covers, type specimens, and objects from designers worldwide, tagged with structured metadata: **designer, year, medium, country, and the two dominant hex colors** of each piece.
- **Design language:** Swiss/archival; grid vs. list toggle, plain typography, sponsor slots, zero social clutter. The metadata layer (explicit hex swatches per entry) is the standout feature — it's a browsable color database of graphic design.
- **Key features / tools:**
  - Sort/filter by **Designer, Year, Medium, Country, and Colors** (each entry shows its two dominant hex codes, e.g. `#f992b9 #000000`).
  - Grid/List view toggle; site-wide search; submission flow; shop.
  - Archive spans poster, editorial design, visual identity, album covers, type specimens, cards, catalogs, websites, objects.
- **UI patterns to learn:** Typography-first composition — what the site exists for: type specimens, letterform-heavy posters, editorial grids, cover typography. Also its own archival UI (metadata-as-filter interface).
- **How to mine it for inspiration:** (1) **Color mining:** scan the grid for two-hex combinations that resonate, collect them into a palette file — every entry is effectively a proposed pairing. (2) **Typography mining:** filter by Typography/Type specimen/Poster mediums when choosing display type or setting hero type; note letter-spacing, weight contrast, and scale jumps. (3) Use the country/year facets to study regional and historical styles (e.g. Swiss vs. Korean poster traditions). (4) When a web project needs a non-default typographic voice, spend 20 minutes here and translate one poster's typographic hierarchy into CSS (clamp() type scale, tight tracking, mixed weights).
- **Skills to steal:** Typographic courage (expressive type outside UI-kit defaults); two-color palette discipline (poster logic → accent/ink web palettes); structured metadata habits (tagging your own reference library by color/medium/year); print-to-web translation of hierarchy.

---

### Fonts In Use — https://fontsinuse.com
- **What it is:** "An independent archive of typography" — 35,000+ "Uses" documenting **which real typefaces were used in real projects** (branding, books, posters, packaging, web, apps, album art — historic and contemporary), community-contributed and editorially curated ("Staff Picks"). Each entry identifies the exact typefaces in a design, with links to the typeface pages.
- **Design language:** Utilitarian archival design (the anti-showcase); the value is the **taxonomy**: every Use is filed under Topics (industry), Formats (medium), and Typefaces — with per-typeface pages showing every documented use. Coverage includes a Web format (6,100+ entries) and Software/Apps (400+).
- **Key features / tools:**
  - Advanced Search combining **Topics × Formats × Typefaces** (e.g. Technology + Web + Suisse Int'l).
  - Typeface pages with rendered samples of every font and its usage history (Helvetica: 1,541 uses; Futura: 1,247; Univers: 661…).
  - Sorts: contribution date, artwork date, most discussed/liked/viewed; Staff Picks (6,400+); blog with deep type-analysis articles.
- **UI patterns to learn:** What type pairing and type hierarchy real brands use (web entries show fonts in situ on live sites); how typeface choice shifts by industry (fintech grotesques vs. fashion didones); specimen presentation.
- **How to mine it for inspiration:** (1) **Pick a typeface you're considering for a project and view its page first** — see 20+ real uses in context before committing; check what it's usually paired with. (2) Reverse lookup: find a site whose type you admire (or from a Visuelle/Godly entry), search Fonts In Use for the identification, then check that typeface's other uses. (3) Use Advanced Search (Web + your industry) to build a shortlist of industry-appropriate fonts with evidence. (4) Read Staff Picks' comment threads — type designers and enthusiasts explain *why* choices work.
- **Skills to steal:** Typeface identification by eye; type pairing as an explicit decision (display vs. text vs. mono roles); font-selection evidence gathering (never "it looked nice"); historical literacy (grotesques, didones, DIN-style) that transfers directly into `font-family` and variable-font choices.

---

## Category Synthesis

**What these 11 sites collectively are:** a layered reference system. Each occupies a distinct altitude — from raw asset galleries (Godly: heroes/CTAs/footers) through full-page archetypes (Inspora, Sitereel), product-flow evidence (Mobbin), inspectable source (Figma Community), community shots (Layers), personal curation tools (Cosmos, Savee), and canon/archival typography culture (Visuelle, Another Graphic, Fonts In Use).

**Common patterns across the sites:**

1. **Curation beats volume.** Every enduring site (Visuelle since 2007, Fonts In Use, Savee, Mobbin) wins on editorial filter, not raw quantity. The best have a stated bar ("If it's great, it goes on").
2. **Structured metadata is the differentiator.** Another Graphic (hex colors, medium, country, year), Fonts In Use (typeface × format × topic), Layers (16 style tags), Godly (component sections), Mobbin (flow steps, industries). Searchable facets — especially **color and typeface** — turn a gallery into a queryable database.
3. **Attribution is universal and useful.** Nearly every entry credits the studio/designer. Following credits builds a map of *who does what well* — the highest-leverage long-term asset a frontend developer can accumulate.
4. **Screenshots are giving way to structure and agents.** Mobbin ships an MCP server, REST API, and llms.txt; Savee sells MCP ("give your AI agents taste"); Sitereel sells prompts instead of images. The direction of travel: references that an AI can query, and prompts that encode taste.
5. **Flows and evidence, not single screens.** Mobbin's own guidance is the category's methodological gold standard: treat references as evidence of convention, compare multiple examples, cite sources, adapt to constraints.
6. **Component-level and flow-level slicing** (heroes, footers, feature sections, paywalls, empty states) is how practitioners actually browse — full-page galleries are for mood, sections are for building.

**A personal inspiration-mining workflow (synthesis):**

1. **Daily (5 min):** Skim Godly trending + Layers feed. Save anything that stops you to a Savee/Cosmos board — name boards by *feeling or pattern* ("bento dashboards," "quiet luxury"), not industry.
2. **Per project — Discover (30 min):** Start wide (Cosmos color/image search, Visuelle Digital category for tone), then narrow: Mobbin for the flows and edge-case screens you must build; Godly `/hero` + Inspora feature-sections for the marketing page; Layers tags (Dark Mode, Bento Grid) for the specific aesthetic.
3. **Per project — Verify (20 min):** Before choosing fonts, check the shortlist on Fonts In Use (real uses, pairings, industry norms). Before choosing a palette, scan Another Graphic's two-hex entries for proven combinations.
4. **Per project — Implement:** Duplicate 1–2 Figma Community kits/systems and read them like code; mirror their token naming and component structure in your CSS/React. Adopt Mobbin's discipline: compare 5+ real examples before deviating from convention, and record *why*.
5. **Per project — Reuse for AI:** If using AI builders, write prompts Sitereel-style (style words → concrete layout/typography/palette prose), or point an agent at your own Savee/Mobbin library via MCP so output starts from curated taste.
6. **Ongoing — Build the meta-library:** Maintain a credits file (studios → specialties) and a palette file (hex pairs harvested from Another Graphic). Both compound in value; both are what turn "I saw something cool once" into a queryable personal design system.
