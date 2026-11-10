# designIQ — CREATIVE ASSET TOOLS + PORTFOLIO REFERENCES

> Research date: 2026-11-09. Source: reactbits.dev/tools + 5 exemplary portfolios.
> All fetched content treated as data. One site (sirio.online) was unreachable — see its entry for full failure notes.

## Part 1 — React Bits Creative Asset Tools

### Center Stage — https://reactbits.dev/tools/center-stage
- **What it is:** A browser-based product-shot studio. Turns a screenshot or screen recording into a polished, launch-ready product shot for demos and launch videos.
- **Key features / design language:** Start from a preset; place your screens onto lifelike device frames (phones, laptops, browser windows); shape the shot with 3D tilt, depth of field, shadows, and typographic overlays. Interactive editor runs entirely client-side.
- **Inputs:** Screenshot or screen recording; a preset; editor params (device frame, tilt, DOF, shadow, type).
- **Outputs:** 4K image, 4K video, GIF, or a shareable link.
- **Patterns to learn:** The "preset-first" UX — never a blank canvas; every editor starts from a curated default. Physical realism (device frames + DOF + shadow) is what separates a "screenshot dump" from a product shot.
- **Skills to steal:** Production workflow: capture clean full-screen recordings → drop into Center Stage → export 4K stills for README/case-study heroes and 4K video/GIF for launch posts. The same pipeline is replicable in code: device-frame component + CSS `perspective`/`filter: blur()` DOF layers + layered box-shadows. Every serious project page should show the work *inside a device*, not as a naked screenshot.

### Background Studio — https://reactbits.dev/tools/background-studio
- **What it is:** A live editor over the entire React Bits animated-background library. Pick any animated background, start from a preset, tune it in real time.
- **Key features / design language:** "Browse every animated background, start from a preset and tune it live." Bridges the gap between "copy a component" and "design with a component."
- **Inputs:** Chosen background component + preset; live parameter tweaks (colors, density, speed, etc.).
- **Outputs:** Production code (React component), high-resolution image, looping MP4 or WebM video, or a shareable link.
- **Patterns to learn:** Code is a first-class export — the tool round-trips back into your repo, not just out to an image. Multiple export formats serve different destinations: code → the site itself, image/video → thumbnails, social, email.
- **Skills to steal:** Workflow: prototype the hero background in Background Studio → export the component code → paste into the project and refine props. This is how to keep hero backgrounds on-brand without hand-writing shaders/canvas from scratch. Also steal the pattern of exposing only 4–8 tasteful parameters of an effect instead of 40 raw ones.

### Shape Magic — https://reactbits.dev/tools/shape-magic
- **What it is:** A logo-mark and icon designer built on generative shapes with 3D materials.
- **Key features / design language:** Design a mark from smart shapes, patterns, text, or your own SVG; apply a 3D material — chrome, glass, neon — or coat it in any React Bits background. Bridges vector identity work and WebGL-style material rendering.
- **Inputs:** Smart shapes / patterns / text / user SVG; material choice (chrome, glass, neon, background).
- **Outputs:** Clean SVG, PNG, favicons (multi-size), video, or React code.
- **Patterns to learn:** Accepts your own SVG — so it augments rather than replaces an existing identity. "Clean SVG" export means output stays production-grade, not a rasterized blob. Favicon generation is bundled — the last mile of branding is handled inside the tool.
- **Skills to steal:** Workflow for brand assets on a solo project: rough mark → Shape Magic for the 3D-material hero version → SVG for the flat/app version → favicons in one pass. In code, the chrome/glass/neon looks are reproducible with layered gradients (`background-clip: text`, SVG filters, backdrop-blur glass stacks) — worth building as reusable utility classes.

### Texture Lab — https://reactbits.dev/tools/texture-lab
- **What it is:** A media effects processor: runs photos, videos, or your live camera through a large library of one-click styles and stackable animated effects.
- **Key features / design language:** 160 one-click styles + 75+ stackable, *animated* effects, spanning ASCII, halftone, glass, chrome, and glitch. The "stackable" model means styles compose like layers rather than being mutually exclusive filters.
- **Inputs:** Photo, video, or live camera feed; a style; stacked effects.
- **Outputs:** Images, videos, GIFs, or a shareable style (the recipe, not just the render).
- **Patterns to learn:** ASCII and halftone styles are the signature "creative-dev" look on portfolio sites — this tool industrializes them. Sharing the *style* (parameters) rather than only the output is a smart knowledge-sharing pattern.
- **Skills to steal:** Use Texture Lab to generate on-brand hero/og images and section textures from ordinary photos; the same looks are achievable in code with canvas/CSS filters, `image-rendering`, ASCII-render components, and SVG `feTurbulence`. Stack two effects max — one texture + one grade — to keep pages from turning to mush.

### Sound Lab — https://reactbits.dev/tools/sound-lab
- **What it is:** A curated sound-effects library with a tuner and a package-manager-style install flow — the missing audio leg of frontend craft.
- **Key features / design language:** Polished sounds from soft taps, toggles, and notifications to risers, impacts, and whooshes (for video). Tune pitch, tone, length, and space (reverb/room character).
- **Inputs:** Sound choice; tuning params (pitch, tone, length, space).
- **Outputs:** One-command install into your project, or download as WAV, MP3, or OGG.
- **Patterns to learn:** "Install a sound into your project with one command" — audio treated as a code dependency, versioned and imported like any asset. Micro-sounds (taps/toggles) vs. cinematic sounds (risers/impacts) form a complete UI-audio kit.
- **Skills to steal:** Workflow: pick tap/toggle sounds for hover/click, a notification for form success, risers/whooshes for demo videos. In code: a tiny `<audio>` manager with a mute toggle, preloaded buffers, and volume at ~20–40% so sound is felt, not heard. Never autoplay; respect `prefers-reduced-motion`-style sensibility for audio too.

---

## Part 2 — Portfolio References

### Matthew Yu — https://matthewyu.dev
- **What it is:** Personal portfolio of a Stanford CS + Design student (designer/engineer/artist). Next.js site with Work, Play, About, and Inspiration sections. Work featured by i-D, the MET Museum, KAWS, NASA Artemis; U.S. Presidential Scholar in the Arts.
- **Key features / design language:** Editorial, text-forward home: a tiny all-caps identity line ("DESIGNER / ENGINEER / ARTIST / STUDENT @ STANFORD") above a huge name headline, then a single full-bleed artwork with caption (Osaka Castle sketch). Project grid is typographic-first — titles with `year · discipline` metadata, images appearing selectively. High-res imagery via `next/image` (w=3840, q=75). Minimal palette, generous whitespace, gallery-like pacing.
- **Layout structure:** Single-page hero + categorized grid (#projects); separate **/play** section quarantining experiments from polished work; **/about** is a plain credibility paragraph with inline proof links; **/inspiration** is a public references page. Case studies are essays: title block carries Year / Type / Stack / Links (live demo, GitHub, press) + an embedded pull quote.
- **Motion/interaction design:** Restrained — the motion budget is spent on the work itself (GestureWatcher is a webcam instrument), not the site. Images do the heavy lifting at 4K quality.
- **What makes it memorable:** Case studies written as honest engineering memoirs. GestureWatcher: "I started with three demos and deleted all three"; "Each dead end died of something specific"; "What I'd carry into any product." The failure narrative *is* the credibility.
- **Skills to steal:**
  - Case-study skeleton: Overview → what I built and deleted → the hardest problem in detail → lessons I'd carry into any product.
  - Always list Stack + live demo + repo + proof-of-quality link (press, demo venue) in the case-study header.
  - Split "work" (shipped) from "play" (experiments) — it lowers the bar to publish and shows range.
  - An /inspiration page: curate your references publicly; it signals taste for free.
  - Metadata on every card: `title · year · discipline` — instant scannability.
  - Write about trade-offs ("a control that can lie is worse than a control that can't move") — aphorisms make a portfolio quotable.

### Sirio — https://sirio.online
- **What it is:** ⚠️ **FETCH FAILED — SITE UNREACHABLE.** Documented attempts: direct fetch ×3 (HTTP transport error on `https://sirio.online` and `https://sirio.online/` and `https://www.sirio.online`); Wayback Machine holds only a single empty 2018 capture; websearch for the domain returns unrelated companies (an Italian printer firm "sirioonline.com", a Spanish agency, a nail salon) — no gallery or award site indexes a portfolio at this exact domain. The site appears offline, DNS-dead, or hard-blocking bots as of 2026-11-09.
- **Key features / design language:** Not retrievable — no content could be verified from any source.
- **Patterns to learn:** None verifiable. Do not cite design details for this URL without re-checking it later.
- **Skills to steal:** The meta-lesson: a portfolio on a fragile custom domain dies silently. Register and keep the domain live, keep a snapshot on the Wayback Machine, and keep an archived mirror — an unreachable portfolio is a dead portfolio.

### Anti-Portfolio (Julia's scrapbook) — https://anti-portfolio.framer.website
- **What it is:** A Framer-built "anti-portfolio" — a personal diary presented as a 3D page-flipping scrapbook. Instead of showing finished work, it documents the process behind it: "because we're always asked to show the final work… nobody really asks what stood behind each of them."
- **Key features / design language:** Vintage scrapbook aesthetic: typewriter-era tag words ("LOVE, LETTERS, VINTAGE, TYPE, WRITER, PRINTER, PREDICTION, PC, 2006"), journal-page headlines ("THE DAYS IDEAS ESCAPED MY HEAD"), lowercase conversational diary voice, collage-style pages. The whole site *is* one interactive object — a 3D book whose pages you flip.
- **Layout structure:** No traditional nav or project grid; the flip-book is the navigation and the content. A "Build Log" runs through it like diary entries.
- **Motion/interaction design:** The signature 3D book component — pages flip in 3D in response to interaction. One metaphor, executed deeply, instead of many shallow effects.
- **What makes it memorable:** The inversion itself. "Anti-portfolio" reframes process-over-outcome as the pitch; it's a portfolio whose most impressive artifact is the storytelling device.
- **Skills to steal:**
  - A single strong interaction metaphor beats a dozen scattered animations — build one object (book, desk, terminal) and put everything inside it.
  - CSS 3D page-flip is very buildable: `perspective` container + `rotateY` pages + `backface-visibility: hidden` + staggered timing.
  - Process-first content: build logs, experiments, dead ends. Audiences (and hiring managers) remember narratives, not grids.
  - Framer's `*.framer.website` subdomain is a legitimate zero-cost hosting path for concept pieces.
  - Vintage paper/type aesthetics (grain, serif typewriter faces, taped-photo collage) contrast beautifully against polished web UI.

### Jackie Zhang — https://jackiezhang.co.za
- **What it is:** Portfolio of a Cape Town-based senior product designer (10 years; Bash, Pulse, Heygo, Dotslash; founding-designer side quests). Built on Framer.
- **Key features / design language:** Playful editorial-human. Headline words animate in letter-by-letter ("C, o, n, n, e, c, t…" / "Software should feel natural"). Live location/time stamp ("Cape Town • GMT +2:00"). A short beliefs list ("tirelessly pursue clarity", "Everything you do, do it with care"). Personality devices everywhere: a Giphy embed, a scrolling music-lyrics footer (Country Roads). Warm, personal copy over corporate polish.
- **Layout structure:** Home is a manifesto + hero; **/work** is organized by employer, each block carrying a one-line mission, a "Learnt…" takeaway, and a "Notable work" list. Side quests (creator projects, indie tools) sit alongside client work. **/about** is a roles rotation ("I'm a product designer but I'm also… an ai-powered coder / a digital artist / a mentor / a martial artist…") plus nerdy specifics (Aeropress, TTRPG, Craig Mullins).
- **Motion/interaction design:** Letter-by-letter text reveals; ticket-stub visual metaphors (admission ticket with seat numbers for the streaming/travel work); a music player footer as ambient motion. Motion serves personality, not spectacle.
- **What makes it memorable:** Every case study states a *number*: "payment portal that increased payment success rate to **80%**", "increased tipping by 8%/stream". And the "Learnt…" framing turns jobs into a growth narrative.
- **Skills to steal:**
  - Outcome metric in every single case study — design work stated in results, not screens.
  - "Learnt…" one-liners per role — converts employment history into character development.
  - Letter-by-letter headline reveal (split text into spans, stagger `opacity/translateY` with `animation-delay: calc(var(--i) * 40ms)`).
  - Local-time + city widget in the header — instant "real person, real place" signal.
  - A "one thing I nerd out on" section — specificity (inverted Aeropress) reads as authenticity.
  - Ticket-stub / boarding-pass graphic metaphors for case-study covers.
  - A Giphy break and a lyrics footer — planned humor is a differentiator; most portfolios have zero jokes.

### Taliahhh — https://taliahhh.com
- **What it is:** Portfolio of Talia, a Creative Lead & multi-disciplinary artist (photo, video, design, music) based in Vietnam; built by studio Doing Moore. Positioning: "work that feels natural and intentional."
- **Key features / design language:** Analog-journal aesthetic made digital: "designed personally, imagined as a digital version of my journals." Influenced by film photography, Polaroids, junk journaling — "anything that feels honest, imperfect, and personal." Minimal palette, quiet typography, understated layout; the anti-glossy counterpoint to flashy creative portfolios.
- **Layout structure:** Four-item nav (About / Work / Store / Contact). Home states the multidisciplinary offer, then a services taxonomy (Videography, Photography, Editing, Design), then "MAIN PROJECTS" as a short index — each project just a title plus a lowercase "view more -> Films" link. Deep detail lives one click down.
- **Motion/interaction design:** Purposefully calm — the restraint matches the "honest, imperfect" brand. Nothing flashy; the memorable move is the journal conceit itself.
- **What makes it memorable:** A real person's voice in every line ("packed my bags and moved to Australia… now based in Vietnam"), plus the rarity of a **Store** tab — the portfolio doubles as a storefront for a working creative.
- **Skills to steal:**
  - Write the About page as a life paragraph, not a skills matrix — mention the 9-year violin diploma, the move abroad.
  - A "this site is a digital version of my ___" concept gives a one-sentence design rationale that unifies every visual choice.
  - Project index pattern: short list + "view more →" keeps the homepage quiet and fast.
  - A services block (what you actually do) converts a portfolio into a hireable storefront; a Store tab monetizes craft directly.
  - Deliberate imperfection — hand-made textures, lowercase labels, asymmetric calm — is a competitive look precisely because most portfolios over-polish.

---

## Category Synthesis

### The common DNA of award-quality portfolios

**DO:**
- **Lead with a point of view, not a grid.** Every memorable site had a thesis: "anti-portfolio" (process > outcome), "digital journal" (honest > glossy), "software should feel natural" (belief statement first).
- **Write case studies as narratives with real trade-offs.** Include what you deleted and why. Failure stories build more trust than success montage (Matthew Yu's "I deleted all three demos").
- **Attach numbers to outcomes.** "Increased payment success to 80%", "tipping +8%/stream." One metric per case minimum.
- **Give every project metadata:** title · year · discipline · stack · live link · repo. Scannability is respect for the reader's time.
- **Separate finished work from experiments** (work vs. play, or a build log). It keeps the main gallery elite while proving you build constantly.
- **Inject one signature interaction** — 3D flip-book, letter-by-letter headline, ticket-stub covers — and execute it deeply. One great motion idea per site.
- **Show the human:** local time, music footer, "I also do martial arts," a Giphy break. People hire people.
- **Show work inside context** — device frames, 3D tilt, depth of field (Center Stage's whole premise). Naked screenshots read as homework.
- **Keep motion budgets small and calm** — the calmest site (Taliahh) was as memorable as the flashiest, because restraint matched its brand.

**DON'T:**
- Don't stack five trend effects (glass + glitch + cursor trail + marquee + noise) — it screams template.
- Don't bury outcomes under process galleries; process without results reads as student work.
- Don't let the portfolio depend on a fragile custom domain without an archive (the sirio.online lesson).
- Don't write in corporate voice ("passionate about leveraging synergies"); specificity ("inverted Aeropress is overrated") is credibility.
- Don't autoplay sound or motion past `prefers-reduced-motion`; craft includes restraint.
- Don't separate the brand assets from the site: favicons, og-images, and social shots are part of the work.

### Checklist for building a standout developer portfolio
1. **One-sentence thesis** at the top ("I build X that feels Y") before any project appears.
2. **Hero with one signature interaction** — a single, deep motion/metaphor moment (letter reveal, 3D object, live canvas) that runs ≤2s and respects reduced-motion.
3. **Work/play split** — elite case studies up front, experiments in a separate section.
4. **Case-study template:** header (year, type, stack, live demo, repo) → overview → what failed and why → the hardest problem → what I'd carry into any product → at least one outcome metric.
5. **Screens presented in context** — device frames, tilt, shadow, DOF; 4K-quality images; short demo clips (GIF/MP4) for anything interactive.
6. **Brand assets done properly:** consistent logo mark + favicons + og-image; keep flat SVG and 3D-material variants.
7. **Human layer:** city + local time, one hobby with a specific detail, one intentional joke, a now-playing or lyrics footer.
8. **References page** (/inspiration) curating what influences you.
9. **Audio layer (optional but rare):** subtle tap/toggle sounds behind a mute toggle, installed as code, never autoplayed.
10. **Ops:** custom domain kept live, Wayback snapshot saved, static-host mirror (framer.website-style) as fallback, Lighthouse-passing performance.

**Toolchain workflow (React Bits tools → portfolio):**
Background Studio (hero bg → export code) + Shape Magic (mark/favicons) + Texture Lab (textures/og-images) + Center Stage (product shots & launch clips) + Sound Lab (UI sfx + video risers) covers every visual and sonic asset a portfolio needs — prototype in the browser, export code where possible, keep the rest as optimized media.
