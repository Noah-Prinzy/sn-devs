# Store redesign plan: give it the same energy as Home and Services

## Where we are
The Store works (cards, real screenshots, Mobile Money buy flow), but it is a static page: heading, tabs, grid.
Home and Services both open with a **pinned, scroll-driven scene** (a big word or a logo, layers that push,
blur and settle), they **glide between anchored sections** (`useScrollAnchors`), and their small touches
are **glyph scrambles** (`DecryptedText`), **magnetic buttons** (`Magnet`) and **green glow**
on the active item. The Store should use the same vocabulary, not a new one.

## The idea: "a wall of live screens"
Our product here is websites, so the screens themselves are the show. Every section uses the
template screenshots as the moving material: no stock photos and no shader backgrounds.

### 1. Opener (pinned scene, like the SERVICES word)
- Pinned for about 220svh. A huge **STORE** in the same gradient type as **SERVICES**.
- **The 15 screenshots float as browser windows** at different depths, using CSS 3D and `motion` (no WebGL).
  As you scroll, they drift toward the viewer and fan out, the word grows, then the windows settle into a tidy
  arc and the lede fades in: *"Ready-made. Restyled. Yours today."*
- The kicker uses `DecryptedText` ("15 S&N Editions · 5 categories").
- Anchors: start (glide) → end of the opener → catalogue → how-it-works.

### 2. Catalogue (the switchboard, same pattern as Services)
- **Category rail** with glyph-scramble labels and a green glow dot on the active one, like the Services list.
  Switching category **re-flows the grid** (`motion` layout and `AnimatePresence`): cards slide to their new places
  instead of popping.
- **Cards that come alive:**
  - **Hover-to-browse:** on hover, the screenshot **scrolls down the template's page** inside its browser frame,
    as if someone is browsing it. This needs one *tall* screenshot per template (see Assets).
  - **Edge light:** a spotlight on the card border follows the cursor in brand green, plus a gentle tilt
    (2–3°, not a gimmick).
  - The price rolls in (odometer `Counter` style) when the card enters the view.
- Phones: no tilt or hover. A tap opens the page, and the preview pans slowly by itself when the card is in view.

### 3. Featured edition (a green band, like "Website packages")
- **Device stage:** a laptop frame and a phone frame (pure CSS) showing a template's desktop and mobile shots.
  Every few seconds it swaps to the next Premium template with a card-swap motion.
- Name, tagline, price and **Buy**, with a `Magnet` button.

### 4. How buying works (ties in the Nylon Pay flow)
- Three steps that draw themselves on scroll: **Pick** → **Pay with MoMo or card** → **Download**.
- A small animated phone shows the PIN prompt arriving, a tick, then a zip dropping into a folder.
  Built in SVG with `motion`, so it's ours and not an image.

### 5. Template page (/store/[slug])
- **Hero:** the device stage again (laptop and phone), with the desktop shot slowly scrolling the page.
- **Buy panel:** sticky beside the hero on desktop. The price is shown with the odometer.
- **"Pages inside":** a short strip of 2–3 more screens (an inner page and the mobile view), each opening larger.
- The info blocks (what it is, included, built with, licence) reveal on scroll, with the same word-settle used on Home.

## Rules we keep
- **Motion:** use `motion/react` and the existing helpers (`useScrollAnchors`, `DecryptedText`, `Magnet`). Add **no WebGL**:
  four React Bits WebGL pieces painted plain white on this machine before (observation #4), so everything here is CSS, SVG or 2D.
- **Reduced motion** (`MotionConfig reducedMotion="user"` plus checks): no pinning or floating. Show the final layout.
- **Performance:** screenshots go through `next/image` (served as WebP or AVIF). Only the cards near the viewport animate. The opener uses small thumbnails.
- **Keep** the shadcn preset (square corners), brand green as the only accent, and `#0a0a0a`.

## Assets we need (I can make all of these)
1. **Tall screenshots** (1440 × about 3000) for hover-to-browse. 9 of the editions can be re-served locally.
   For the other 6 we use what exists and pan instead of scroll.
2. **Mobile shots** for the phone frame. 9 already exist; the other 6 show desktop only.
3. One **inner page** shot per template for "Pages inside" (same capture run).

## Build order
1. Capture the assets (tall, mobile and inner shots).
2. Build the shared pieces: `BrowserFrame` (hover-scroll), `DeviceStage` (laptop and phone), `PriceOdometer`.
3. Store page: opener → catalogue → featured → how-it-works.
4. Template page.
5. Checks: desktop and phone sizes, reduced motion, type check, lint, build, then you review locally → deploy on your word.

## Services page (separate session, runs at the same time)
- Replace the photo cut-outs on the plinth (laptop, devices, apps, and so on) and in the green packages band with
  **our own animated graphics** (SVG and `motion`), in the same line-art language as the Store's "how it works":
  thin light strokes, brand-green highlights, a small loop per service.
- That session touches only `components/services/*` and `public/assets/services/*`; the Store session only touches Store files.
