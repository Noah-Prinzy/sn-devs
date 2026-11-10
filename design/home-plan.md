# Home redesign plan (agreed 2026-11-06)

Goal: Home matches the energy of Store and Services. It has a big pinned opener, bold type, the green band and drawn-on-scroll lines. Everything is CSS/SVG plus one video. No WebGL.

## 1. Opener: "the site builds itself" (pinned, ~260svh, scroll anchors like the other pages)
- **0% Sketch:** black stage. Dashed SVG boxes draw themselves in: a nav bar, a huge outlined **S&N** in the hero block, three cards below. Small mono labels sit next to them (`<nav>`, `h1`, `grid · 3`, `video`, `img`), like a designer's wireframe.
- **35% Style:** the boxes fill. S&N turns solid white with a green `&`. The labels fade and the green accent sweeps across. The three cards fill with the Shaun photo, the Noah photo and a Store template screen.
- **65% Live:** the hero block's `video` box starts playing the video, clipped bottom → top behind a green scan line. The cards lift slightly.
- **100% Zoom:** the built page scales up to fill the screen and becomes the real Home hero. It reads "We design & build websites that feel as good as they look." with Magnet CTAs (Explore services / See the store / Say hello).
- **Reduced motion:** shows the finished, styled hero with no pin.
- **Phones:** the same sequence, with the cards stacked into one column.

## 2. What we do
- The 4 service groups from `data/services.ts` as huge rows (index · name · "from" price).
- Hovering a row, or reaching it on phones, plays that group's custom animated SVG graphic beside it. These are the same graphics as the Services-page work, so they're made once and used on both pages.
- Rows link to `/services#group`.

## 3. Store teaser (green band)
- 3 Premium templates in `BrowserFrame play="auto"`, staggered and drifting.
- Odometer prices and a Magnet "Browse the Store" button.
- Reuses `components/store/*`.

## 4. How we work
- Sketch → Build → Launch → Grow, connected by a dashed path that draws itself on scroll.
- Each step has a small animated graphic: a pencil sketching, code brackets snapping, a rocket/progress bar, a growth line.
- Photos come in at Build: Shaun & Noah at work as small tilted polaroid cards next to the step. These are placeholders until the real photos arrive.

## Assets
- **Video:** reuse `hero-code-1440` for now. Swapping in a better one later is a single file change; any new free clip needs Noah's OK before download.
- **Photos:** the current placeholders, replaced when the real photos arrive.
- **Graphics:** all hand-built SVG in brand green.

## Build notes
- Replace `components/home/home-hero.tsx` and its CSS module with `components/home/home-page.tsx` and its sections.
- The shared navbar shows on Home like on the other pages; the logo-fly-into-nav trick is dropped.
- Verify with Playwright at desktop 1440, phone 375 and reduced motion. Lint and build.
