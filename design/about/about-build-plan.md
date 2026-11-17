# About — build plan: "The site that builds itself", amplified

Noah, 2026-11-17: "match the energy of the other pages, the most animation". Direction 01 from
`about-mockups-v2.png`, pushed further. Rule that still holds: motion is constant but **one thing at
a time**, each motion pointing to the next thing to read (no swarms, no chaos).

## Type
Young Serif (headings), Onest (text), JetBrains Mono (labels), loaded on /about only
(`app/(public-pages)/about/layout.tsx`, `.about-type` in globals.css, same mechanism as Contact).

## Shared pieces (Isagi)
- `components/about/browser-window.tsx` — `BrowserWindow` (dark frame, three dots, URL pill) used by every section.
- `components/about/about-data.ts` — copy, founders, promises (prices from data/services.ts), demo client.
- `components/about/about-page.tsx` — the shell: `<AboutOpener/> <Founders/> <Manifesto/> <Promises/> <AboutClose/>`, `useScrollAnchors()` with derived stops.

## 1 · Opener: the build (owner: Reo) — `components/about/about-opener.tsx`
Pinned, ~420svh. Left: kicker + headline + a 4-step progress rail (01 Design · 02 Build · 03 Launch · 04 Care) that fills as you go — the guide. Right: one BrowserWindow.
- **Arrival (time-based):** the wireframe draws itself (dashed boxes stroke in), headline "We build it." rises, chip "Shaun · design" slides in, URL caret blinks.
- **Stage 1 Design (p .05–.25):** boxes fill with the demo site's layout: nav, then the headline types letter by letter ("Fresh every morning in Kololo."), body lines, the button fills green.
- **Stage 2 Build (p .25–.45):** the hero photo reveals out of the wireframe's X box (clip-path); the chip changes to "Noah · engineering"; a code strip slides up beside the window and scrolls a few lines.
- **Stage 3 Launch (p .45–.65):** the URL bar loading bar fills, `yourbusiness.ug` → `https://nilebakery.ug` with a lock, a green LIVE dot pulses once, the window gets a soft green glow.
- **Stage 4 Care (p .65–.9):** headline crossfades "We build it." → "We keep it running." (green), a care log types under the window (✓ Backup 02:00 · ✓ Uptime 99.98% · ✓ Updates applied), lines appearing one at a time.
- **Exit (p .9–1):** window scales down a touch and fades toward the next section.
- Phone: window above, headline below, rail hidden (replaced by "Step 2 of 4" mono label).

## 2–5 (owner: Bachira)
- **2 · Who we are** `founders.tsx`: two BrowserWindows that start stacked as one in the centre and slide apart as the section scrolls in (scroll-linked), each holding a portrait (placeholders), name, role, bio; URL pills `sn-devs/shaun`, `sn-devs/noah`.
- **3 · Manifesto** `manifesto.tsx`: the manifesto line lights up word by word with scroll (dim → white, key words → green), the follow-up line fades in after.
- **4 · How we work** `promises.tsx`: pinned ~300svh, one BrowserWindow with four tabs; scroll advances the active tab (underline slides), the panel crossfades, each panel has one small looping-once illustration: Fixed quote (a price stamp lands), Talk to the builders (a message line with two avatars' initials), Honest timelines (a bar fills to "1 week"), We stay on (a heartbeat line draws).
- **5 · Close** `about-close.tsx`: an empty BrowserWindow whose URL pill types `yourbusiness.ug` when it scrolls in, then "Yours is next." rises, the "Get in touch" button (Magnet) and "Fixed quote first. Reply within one working day."

## Motion rules (all)
motion/react only, opacity/transform/clip-path, scroll-linked via `useScroll` + function `useTransform` (as Services/Contact). `useStill()` (components/store/browser-frame.tsx) = OS reduced motion → render the final state, no pins (`h-svh`). No horizontal scroll at 375 px. No console errors.

## Verify (Isagi)
1440×900 + 375×812 screenshots through every stage, reduced motion, tsc + eslint, then show Noah.
