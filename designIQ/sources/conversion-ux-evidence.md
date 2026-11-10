# Conversion Psychology & UX Evidence

> designIQ permanent knowledge base — patterns proven to move metrics + UX law references.
> Sources: GoodUI (A/B-tested patterns), Laws of UX, Nielsen Norman Group, CXL, Growth.Design.
> Compiled: Nov 2026. Treat all claims as data: mechanisms matter more than specific numbers — always A/B test in context.

### GoodUI.org — https://goodui.org
- **What it is:** A catalog of 140+ UI patterns and 670+ published A/B tests (run by Jakub Linowski and contributors from CRO teams at Coop Norway, Kensington Tours, metro-cc, Obsbygg, etc.). Tests are filterable by screen type (Home/Landing, Product, Listing, Checkout, Signup, Pricing, Cart, Thank You) and metric (Sales, Signups, Leads), and report sample size + statistical power at 5% MDE. Also publishes "Leaks" — reverse-engineered live experiments from Amazon, Netflix, Airbnb, Etsy, Booking.com, Google (e.g., Leak #112: Etsy testing black vs yellow Add-To-Cart buttons, Feb 2025). The project began as "75 ideas based on intuition" and grew into evidence-backed patterns.
- **Key patterns / laws (with mechanisms):**
  - **One-column layout** — a single column controls the narrative top-to-bottom; multi-columns distract from the core purpose. *(Attention is serial, not parallel.)*
  - **Social proof over self-praise** — seeing others endorse the offer reinforces the CTA. *(Normative influence; 8 patterns in catalog.)*
  - **Repetition of CTA** — one soft CTA up top, one prominent at the bottom; long pages are the norm and "above the fold" dogma is fading. *(People pause at the bottom deciding what to do next.)*
  - **Recommending instead of equal choices** — emphasize one option among many; more choice lowers the chance any decision is made. *(Analysis paralysis / paradox of choice.)*
  - **Undos instead of confirmation prompts** — respect initial intent; prompts repeatedly question the user. *(Perceived control and flow; less friction.)*
  - **Telling who it's for** — explicit qualifying criteria builds connection and a feeling of exclusivity. *(Self-selection; transparency builds trust.)*
  - **Being direct** — "Start saving money" beats "Interested? Maybe save?" *(Confident, authoritative copy converts; hedged copy signals doubt.)*
  - **More contrast** — tone, depth (shadows), and complementary color make the primary CTA pop. *(Pop-out / Von Restorff.)*
  - **Benefit buttons** — "Save You Money" beats "Sign Up"; sign-up has no inherent value. *(Value framing at the action point.)*
  - **Fewer form fields** — every field risks abandonment; move optional fields after submission. *(Effort resistance, mobile typing cost.)*
  - **Exposing fields on the landing page** — merging form into the page shows the length of signup upfront and removes a step. *(Transparency, fewer interactions.)*
  - **Gradual engagement** — let users do a task that demonstrates value before asking for signup; enables personalization. *(Value before commitment.)*
  - **Fewer borders** — borders compete with content for attention; group by proximity/alignment/background instead. *(Gestalt; attention economy.)*
  - **Selling benefits instead of features** — people want more love/money/acceptance/free time and less stress/conflict/hassle/uncertainty. *(Means-end theory.)*
  - **Opt-out instead of opt-in** — defaults reduce resistance and act as a normative recommendation; keep the default clear and readable (ethics). *(Default effect — used to save lives in European organ donation.)*
  - **Smart defaults / forgiving inputs / inline validation** — pre-fill educated guesses, accept any phone format, show errors in context as they happen. *(Reduce effort + memory burden; post-submit error lists force recall work.)*
  - **Loss aversion framing** — frame the offer as protecting what the customer already has (well-being, wealth, status) rather than granting a new gain. *(Losses loom larger than gains.)*
  - **Urgency & scarcity** — act now because availability shrinks; valid only when honest, backfires when the audience catches fake urgency. *(Scarcity heuristic + loss aversion.)*
  - **Recognition over recall; conventions & consistency** — surface options instead of hiding them in dropdowns; follow platform conventions to shrink learning curves. *(Memory limits; Jakob's Law.)*
  - **Bigger click areas** — enlarge hotspots, not just visuals (Fitts's Law).
  - **Faster load times** — time affects conversion; show progress and occupy the user while loading. *(Perceived vs actual wait.)*
  - **Designing for zero data** — blank slates are onboarding opportunities; show what to do next.
  - **Suggesting continuity** — avoid "false bottoms" that kill scroll momentum; keep visual rhythm.
  - **Keeping focus (tunnel pages)** — every link above the primary CTA risks leaking users; balance discovery pages vs low-link tunnel pages.
  - **Recent tested patterns** (with real samples): #66 Complementary Upsell (bundle upgrade above checkout form, n=8,344), #62 Urgent Next Day Delivery (gift-message reassurance under product tiles, n=44,599), #36 Fewer or More Results (listing tile density, n=150,090), #107 Contrast Links & Buttons, #42 Countdown Timer, #93 Auto Next, #11 Gradual Reassurance, #41 Sticky Call To Action, #4 Testimonials.
- **How to apply in UI:** Build landing pages as one-column narratives with a single emphasized CTA repeated at top/bottom; write benefit-oriented button copy; cut form fields to 1–3 and validate inline; default and pre-fill aggressively but transparently; expose options instead of burying them in dropdowns; add sticky CTAs and honest scarcity/reassurance microcopy near conversion points; always design the zero-data state.
- **Skills to steal:** Pattern-numbered experiment library mindset (every claim maps to a testable variant); framing every hypothesis as "Try X instead of Y"; reporting statistical power alongside results; treating copy, layout, forms, and psychology as one integrated system; the "Leaks" habit of studying what giant commerce sites are actively testing.

### Laws of UX — https://lawsofux.com
- **What it is:** Jon Yablonski's canonical collection of 30 UX laws — cognitive psychology and Gestalt principles translated into design guidance, each with overview, origins, examples, and best practices.
- **Key patterns / laws (with mechanisms):**
  - **Aesthetic-Usability Effect** — pretty is perceived as easier to use; aesthetics create positive attitudes that tolerate minor flaws. *(Halo effect.)*
  - **Choice Overload (Paradox of Choice)** — too many options overwhelm and freeze decisions. *(Cognitive overload → decision avoidance.)*
  - **Chunking** — group information into meaningful wholes to fit working memory.
  - **Cognitive Load** — total mental resources needed to use the interface; every unnecessary element spends budget. 
  - **Cognitive Bias** — systematic thinking errors shape perception and decisions.
  - **Doherty Threshold** — productivity soars when system response is <400ms; neither human nor computer waits.
  - **Fitts's Law** — time to acquire a target is a function of distance to and size of the target.
  - **Flow** — full immersion requires challenge matched to skill and no interruptions.
  - **Goal-Gradient Effect** — effort toward a goal increases as proximity to it grows. *(Progress visible → acceleration.)*
  - **Hick's Law** — decision time grows with the number and complexity of choices.
  - **Jakob's Law** — users spend most of their time on *other* sites, so they expect yours to work like all of them. *(Familiarity is the baseline.)*
  - **Law of Common Region** — elements inside a clearly bounded area are perceived as grouped.
  - **Law of Proximity** — near objects group together.
  - **Law of Prägnanz** — ambiguous images are perceived in the simplest possible form. *(Least cognitive effort.)*
  - **Law of Similarity** — similar-looking elements are perceived as related even when separated.
  - **Law of Uniform Connectedness** — visually connected elements are perceived as related.
  - **Mental Model** — compressed beliefs about how a system works; designs matching models feel intuitive.
  - **Miller's Law** — working memory holds ~7±2 items.
  - **Occam's Razor** — among equal solutions, prefer the fewest assumptions/elements.
  - **Paradox of the Active User** — users never read manuals; they jump in and muddle through.
  - **Pareto Principle** — ~80% of effects from ~20% of causes; prioritize the vital few features.
  - **Parkinson's Law** — any task inflates to fill available time. *(Forms and flows without constraints expand.)*
  - **Peak-End Rule** — experiences are judged by their peak moment and their end, not the average.
  - **Postel's Law** — be liberal in what you accept, conservative in what you send. *(Forgiving inputs, predictable outputs.)*
  - **Selective Attention** — people notice only stimuli related to their current goals. *(Banner blindness is the failure mode.)*
  - **Serial Position Effect** — first and last items in a series are best remembered.
  - **Tesler's Law** — every system has irreducible complexity; someone (designer or user) must bear it.
  - **Von Restorff Effect (Isolation Effect)** — among similar objects, the one that differs is most remembered.
  - **Working Memory** — the temporary buffer that UI must respect or overload.
  - **Zeigarnik Effect** — uncompleted tasks are remembered (and resumed) better than completed ones. *(Drives progress bars and streaks.)*
- **How to apply in UI:** Default to familiar patterns (Jakob) with internal + external consistency; cap visible choices and chunk content (Hick/Miller/Chunking); make primary targets large and near (Fitts); isolate one distinctive element per screen (Von Restorff) — usually the CTA; show progress and proximity to completion (Goal-Gradient, Zeigarnik); put the strongest item first and a CTA last (Serial Position, Peak-End); engineer the end of every flow — confirmation, summary, celebration; accept flexible input formats (Postel); keep response times under 400ms (Doherty).
- **Skills to steal:** The discipline of naming the law behind every design decision; using laws as a shared vocabulary to defend designs; per-law pages with origins for checking evidence quality; Yablonski's framing that laws are "anchors" — true for human behavior even as tech shifts.

### Nielsen Norman Group — https://www.nngroup.com/articles/
- **What it is:** The research institution of Jakob Nielsen, Don Norman, and Bruce Tognazzini — user-testing-based UX articles since 1998. Canonical pieces for this category: the 10 Usability Heuristics, scanning-pattern eyetracking research, and web-credibility/trust research.
- **Key patterns / laws (with mechanisms):**
  - **10 Usability Heuristics (Nielsen 1994, unchanged for 30+ years, derived from factor analysis of 249 usability problems):**
    1. **Visibility of system status** — keep users informed quickly; predictable interactions build trust in the product and brand.
    2. **Match between system and real world** — speak users' language; natural mapping makes interfaces feel intuitive.
    3. **User control and freedom** — clearly marked "emergency exits" (undo, cancel) foster confidence.
    4. **Consistency and standards** — follow conventions; inconsistency raises cognitive load by forcing relearning (explicitly tied to Jakob's Law).
    5. **Error prevention** — prevent problems rather than write good error messages; distinguish slips (unconscious) from mistakes (mental-model mismatch); use constraints and good defaults.
    6. **Recognition rather than recall** — visible options beat memory burdens; help in context, not tutorials.
    7. **Flexibility and efficiency of use** — accelerators, personalization, customization for experts while novices keep the simple path.
    8. **Aesthetic and minimalist design** — every extra unit of information competes with relevant information and diminishes its visibility.
    9. **Help users recognize, diagnose, and recover from errors** — plain language, precise problem, constructive solution, visible treatment.
    10. **Help and documentation** — searchable, task-focused, in-context, concrete steps.
  - **Scanning patterns (eyetracking, n>45 studies, desktop + mobile, replicated 2006→2017):** Users scan in an **F-pattern** (two horizontal reads near the top, then a vertical stem down the left) only when pages are walls of unformatted text — and this is *bad* for users and businesses because right-side and mid-page content is skipped. Other patterns: **layer-cake** (headings only — the good kind), **spotted** (hunting for links/digits/keywords), **marking** (eyes fixed while scrolling, more on mobile), **bypassing** (skipping repeated line-openings), **commitment** (rare full reading). Mirrored F in right-to-left languages.
    Mechanism: users minimize interaction cost; without strong visual cues they default to minimum-effort scanning and miss content they'd value.
    **Antidotes (the actionable half):** most important points in the first two paragraphs; visible headings that carry meaning in the first two words; bold key phrases; information-bearing link text (never "click here"); bullets and numbers; group related content visually; cut unnecessary content.
  - **Web credibility & trust:** Nielsen's 1999 **4 trustworthiness factors** — design quality, up-front disclosure, comprehensive and current content, connection to the rest of the web — confirmed stable across decades of later research. Users judge trust within seconds, primarily on visual quality (halo effect). The **Stanford Web Credibility Project** (Fogg et al., 3 years, 4,500+ participants) adds: make accuracy easy to verify; show a real organization; highlight expertise; show trustworthy people; easy to contact; professional design matched to purpose; easy to use *and* useful; update content visibly; restraint with promotional content; avoid even small errors (typos destroy credibility). NN/g also found: stock photos of "perfect smile" models actively breed distrust; isolated sites (no outbound links, absent from third-party reviews) "seem to have something to hide."
- **How to apply in UI:** Run heuristic evaluations against the 10 as a checklist before any conversion work (a broken-trust heuristic silently kills CTAs); front-load page copy and format aggressively so scanning becomes layer-cake instead of F-pattern; invest in design quality and real photography as a *conversion* tactic — trust forms before content is read; link out to authoritative sources; display recency, contactability, and social validation.
- **Skills to steal:** "Users scan, they don't read" as a design axiom with eyetracking receipts; the heuristic-evaluation method (cheap expert review); durability principle — design for human behavior, not technology trends ("if it's true for 26 years it will apply to future UIs"); the 5-users-per-test round philosophy; citing study methods (n, dates) to separate evidence from opinion.

### CXL — https://cxl.com/blog
- **What it is:** Blog of CXL (formerly ConversionXL, founded by Peep Laja) — deep research-backed articles on conversion optimization, digital psychology, and experimentation. Curriculum spans CRO, A/B testing statistics, landing page optimization, and digital psychology & persuasion (including Cialdini-based coursework).
- **Key patterns / laws (with mechanisms):**
  - **Landing page doctrine ("How to Build a High-Converting Landing Page," Peep Laja):** (1) Never send ad traffic to a homepage — homepages serve many goals and bury the one that matters. (2) Clarity and relevance beat everything: "Clarity trumps persuasion." (3) Proven structure: benefit-driven headline matching the ad's language → concise bullet copy → exactly one CTA → navigation and distracting links removed → prominent high-contrast form (1–3 fields) → consistent branding.
    - Copy length follows offer complexity: short copy for cheap/emotional/impulse offers, long copy for expensive/rational ones (Conversion Rate Experts' Moz case study: more copy → substantial signup lift).
    - **Evidence:** Unbounce Conversion Benchmark Report — pages written at a 5th–7th grade reading level convert at 11.1%, 56% higher than 8th–9th grade, and more than double professional-level copy (5.3%). Simpler language measurably outconverts polished prose.
    - Headline clarity and CTA placement drive larger gains than color/shape polish.
    - Scrolling is almost always better than clicking to another page; encourage scroll with visual rhythm.
  - **Web design psychology (Claudia Bird):** Hick's Law (ASOS's filters cut decision time on thousands of SKUs; hover "Add to cart" shortcuts); Fitts's Law (Spotify's Play button — big, thumb-reachable; WCAG 2.2 minimum 24×24 CSS px targets); Gestalt laws (proximity, similarity, closure, common fate, symmetry, continuity, common region — the grammar of grouping); visual hierarchy via size/color/contrast/animation; Occam's Razor for CTA count (Intercom's two-path choice: *Get started* vs *View demo*); Von Restorff for CTAs and pricing-page highlights (Basecamp's outlined Pro plan); Serial Position (Instagram puts Home/Profile at nav ends) and Peak-End (Duolingo's celebratory streak moments); Zeigarnik with a 2025 meta-analysis caveat — the memory advantage for unfinished tasks is not universally valid, but people reliably *resume* interrupted tasks, so progress indicators still work.
    - **Color nuance:** a 2025 systematic review (132 studies, 42,000+ participants, 64 countries) found color-emotion associations are recurring but not one-to-one; red = high arousal, blue/green = positive low arousal; context, lightness, saturation modulate everything. Never rely on color alone (WCAG).
  - **Broader CRO canon (from blog index):** Cialdini's principles of persuasion; foot-in-the-door technique (small yes before big ask); value-proposition writing; form design best practices; pricing experiments (anchoring, decoys); A/B testing guides and prioritization frameworks (e.g., PIE); "How People View Websites" findings; voice-of-customer research as the raw material of conversion copy.
- **How to apply in UI:** Treat the landing page as a single-purpose machine: ad-language headline, benefit subhead, hero, proof, one repeated CTA, no nav. Write copy at a ~6th-grade reading level — this is one of the few measured, repeatable copy wins. Use psychology to form hypotheses, then validate with research and A/B tests ("your opinion doesn't matter — the visitor's behavior does"). Sequence pages so the strongest information lands first and last; engineer a positive peak and end in every flow.
- **Skills to steal:** Research-first CRO process (qual + quant → hypothesis → test); the "clarity trumps persuasion" maxim; reading-level as a conversion lever; landing page element lists (what must exist / what must be deleted); willingness to debunk pop-psychology (Golden Ratio, naive Zeigarnik) with citations — evidence over lore.

### Growth.Design — https://growth.design/case-studies
- **What it is:** A catalog of 60+ slide-story UX case studies (Leland "LX" and Dan, Montreal) that dissect real products — Duolingo, Tinder, Spotify Wrapped, Amazon, Uber Eats, Airbnb, Adobe, GoDaddy, Temu, TikTok, Hopper, Zapier, Slack-era Clubhouse — through named psychology principles, with explicit ethics tagging (Psychology / Ethics filters).
- **Key patterns / laws (with mechanisms):**
  - **Scarcity — 3 pillars for ethical use (Case #067, full case available):** People value limited supply more and act quickly. The ethical framework: (1) **Always explain why** the scarcity exists — Langer's 1978 copy-machine study: adding *any* reason (even a made-up one) raised compliance from 60% to 90%; (2) **Be respectful** — scarcity is already pressure; aggressive/fake countdowns trigger **reactance** (don't show seconds unless the deadline is under a minute); Tesla's authentic delivery-date slippage is scarcity with zero theater; (3) **Stay truthful** — the amount of scarcity you can use is directly correlated to the trust you've built; fake urgency is a documented deceptive pattern (deceptive.design). Natural deadlines (real price increases) can motivate action while *building* trust.
  - **Named case studies = pattern→evidence pairs:** Labor Perception Bias (faster isn't always better — visible effort increases perceived value); "Aha Moment" onboarding (Too Good To Go); Strava Premium Preview (good UX intentions fail without psychology); Audible/Amazon purchase flow seamlessness; McDonald's $2B self-serve kiosks; Grammarly onboarding surveys (5 do's/don'ts); Blinkist trial paywall (+23% trial conversions, ethically); LinkedIn notification opt-ins (+500% via permission-request timing); Tinder monetization (converts 8% of singles into customers in under 15 minutes); Duolingo retention (8 tactics tested on 300M users); Spotify Wrapped (6 principles making it go viral yearly); Sniper Links (deep-link email confirmations to the exact in-app destination — raises signup confirmation rates); Zeigarnik Effect for streaks; Framing Effect (context changes decisions); Social Proof (others' behavior shapes ours); Mental Models (expectations drive behavior); YouTube vs paradox of choice; Temu's casino-like mechanics as a dark-pattern cautionary tale; GoDaddy and Signal as ethical checkout/monetization counterexamples.
- **How to apply in UI:** Copy the case-study shape: observe a real product moment → name the psychology principle → identify the ethical risk → propose the fix → show the metric. Use "sniper links" in every transactional email; time permission requests after value moments (Hopper pattern); add visible effort to perceived-value features; use honest scarcity with a stated reason; design "aha moments" as fast as possible in onboarding, then ask for commitment.
- **Skills to steal:** The named-principle vocabulary (labor perception bias, sniper links, aha moment, reactance); storytelling as a design-review format; always pairing a tactic with its ethical failure mode; the habit of quantifying outcomes in the headline (+23%, +500%, 8% in 15 min); sourcing claims to primary psychology (Langer 1978) rather than folklore.

## Category Synthesis

### Landing Page Conversion Checklist (pattern → where to apply)
| # | Pattern | Where to apply |
|---|---------|----------------|
| 1 | One goal, one CTA, zero navigation | Whole page — remove header links, competing CTAs (CXL, GoodUI "Keeping Focus") |
| 2 | Message match: headline echoes the ad's language | Hero headline + first paragraph (CXL) |
| 3 | Benefit-driven headline + subhead, first 2 words carry meaning | Above the fold (CXL, NN/g scanning antidotes) |
| 4 | One-column narrative layout, no false bottoms | Page skeleton (GoodUI #1, #15) |
| 5 | Visual hierarchy: contrast, size, isolation for the CTA (Von Restorff, Fitts) | Primary button, pricing highlight (Laws of UX, CXL) |
| 6 | Benefit-oriented button copy, stated confidently | All CTAs (GoodUI #10, #18) |
| 7 | Copy at 5th–7th grade reading level; bullets, bold, short paragraphs | All body copy (CXL/Unbench evidence, NN/g) |
| 8 | Social proof near CTAs: testimonials with names/faces, logos, numbers | Mid-page proof section + beside CTA (GoodUI #4, CXL, Growth.Design) |
| 9 | Trust signals: professional design, real photos, contact info, privacy link, guarantees, fresh dates | Hero trust bar, form footer, checkout (NN/g credibility, Stanford, ExpressVPN example) |
| 10 | Forms: 1–3 fields, inline validation, smart defaults, forgiving input | Signup/checkout forms (GoodUI #13/#28/#33/#34, NN/g #5) |
| 11 | Expose the form or fields on the page; prefer scroll over extra clicks | Landing page itself (GoodUI #20, CXL) |
| 12 | Repetition: soft CTA top, prominent CTA bottom, sticky CTA on scroll | Page ends, sticky bar (GoodUI #5, #41) |
| 13 | Honest scarcity/urgency with a stated reason and no aggressive countdowns | Offer deadline, cart, pricing (Growth.Design 3 pillars, GoodUI #35/#36) |
| 14 | Loss-aversion framing (protect what they have) | Offer framing, insurance/security verticals (GoodUI #30) |
| 15 | Recommendation among options (highlight "Most popular") | Pricing tables, plan pickers (GoodUI #7, CXL/Basecamp) |
| 16 | Gradual engagement: value demo before signup ask | SaaS onboarding, quizzes (GoodUI #22, Curology example) |
| 17 | Fast load, perceived progress, <400ms response | Technical layer everywhere (GoodUI #39, Doherty Threshold) |
| 18 | Design the zero-data and error states as conversion moments | Empty states, 404s, form errors (GoodUI #25, NN/g #9/#10) |
| 19 | Serial position: strongest proof first, CTA/delight last | Page order, checkout steps (Laws of UX, CXL) |
| 20 | Peak-End: celebrate completion | Thank-you page, success states (Peak-End Rule) |

### UX-Laws Quick Table (law → one-line implication)
| Law | Implication |
|-----|-------------|
| Aesthetic-Usability Effect | Polish buys patience — good-looking UI is *perceived* as easier to use. |
| Choice Overload | Fewer options, more sales. |
| Chunking | Break content into meaningful groups or lose it. |
| Cognitive Bias | Assume biased judgment in users and in your own design reviews. |
| Cognitive Load | Every extra element taxes comprehension; subtract before you add. |
| Doherty Threshold | Respond in <400ms or productivity (and trust) collapses. |
| Fitts's Law | Big and near beats small and far — for every tap target. |
| Flow | Don't interrupt; protect the user's immersion in the core task. |
| Goal-Gradient Effect | Show progress; people accelerate near the finish line. |
| Hick's Law | Decision time grows with choices — cut menus, add filters and defaults. |
| Jakob's Law | Build on conventions users already know from other sites. |
| Law of Common Region | Bounded boxes imply grouping — use deliberately, sparingly. |
| Law of Proximity | Space things apart to separate, together to relate. |
| Law of Prägnanz | Simplify forms; the brain reads the simplest interpretation. |
| Law of Similarity | Style (color/shape) communicates "these belong together." |
| Law of Uniform Connectedness | Lines/steps visually connect flow — show the path. |
| Mental Model | Match the user's existing model, or teach the new one explicitly. |
| Miller's Law | ~7±2 items max in working memory — chunk everything. |
| Occam's Razor | When two designs tie, ship the simpler one. |
| Paradox of the Active User | Nobody reads manuals; make first use self-evident. |
| Pareto Principle | Design and optimize the 20% of screens driving 80% of value. |
| Parkinson's Law | Open-ended tasks bloat; constrain steps and time. |
| Peak-End Rule | Engineer the peak moment and the ending; they *are* the review. |
| Postel's Law | Accept messy input generously; output predictably. |
| Selective Attention | Users miss what doesn't match their goal — put the goal-adjacent stuff in the path. |
| Serial Position Effect | First and last positions get remembered — spend them wisely. |
| Tesler's Law | Complexity is conserved — decide whether the system absorbs it or the user pays. |
| Von Restorff Effect | The odd one out gets remembered — make the CTA the odd one. |
| Working Memory | Don't force users to carry information across screens. |
| Zeigarnik Effect | Unfinished tasks nag — progress bars and streaks use the nag productively. |

### Persuasion vs. Dark Patterns — the ethical balance
- **The trust currency rule (Growth.Design):** "The amount of scarcity you can use is directly correlated to the amount of trust you've built." Persuasion spends trust; dark patterns counterfeit it. A conversion gained by deception is a chargeback, a churn, and a review, waiting to happen.
- **The 3-pillar test for any pressure tactic** (scarcity, urgency, countdowns, defaults): (1) **Why** — a real reason is always stated; (2) **Respect** — no unnecessary pressure, no aggressive timers, no interruptive popups on first visit; (3) **Truth** — the scarcity is real and verifiable (Tesla-style delivery dates, genuine stock counts). Fake urgency is a catalogued deceptive pattern (deceptive.design) and will be recognized — GoodUI warns that when audiences catch false urgency, "it will backfire."
- **Defaults and opt-outs are legitimate — opacity is not:** GoodUI endorses opt-out defaults (they saved lives in organ-donation policy) *conditioned on* clear, readable, double-negative-free disclosure. The line is not the mechanism; the line is whether the user could easily know and undo.
- **NN/g's credibility findings give the business case for ethics:** typos, stock-photo smiles, isolated sites, and promotional hype measurably *reduce* trust and conversion. Ethical design is not charity — it is the highest-leverage conversion pattern on the list.
- **Practical rule for Isagi:** prefer patterns that make the *user's own goal easier to reach* (clarity, defaults, progress, social proof, guarantees, friction removal) over patterns that manufacture needs or hide costs. When a tactic works only if the user doesn't notice it, treat it as a dark pattern and redesign. And validate everything: CXL's own methodology — psychology proposes, testing disposes.
