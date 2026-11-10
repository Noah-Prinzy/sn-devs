# Contact page plan: the best page on the site

The brief: same energy and presets as Home / Services / Store, but freer — this is the page
where a visitor becomes a client, so it gets the one moment nobody else has: **a form that
turns into a live letter before it is sent.**

## Where we are

- The navbar already links to `/contact` and the page **does not exist yet** (404).
- The old template form (`sections/contact.tsx`) has name / email / phone / subject / message
  but no wiring and a deprecated light look. It gets rebuilt dark, in our vocabulary.
- Noah's real details (email, phone, WhatsApp, socials, hours) are still pending — everything
  reads from one new file so the swap is a one-file change.

## The idea: "the transmission"

Sending a message should feel like putting a signal on the air. The brand accent is called
Signal green — the page takes that literally: a wave that emits, a letter that assembles
while you type, a stamp that seals it, a reply promise you can read like a departure board.
No WebGL — CSS, SVG and `motion/react` only, like the rest of the site.

### 1. Opener (pinned scene, ~200svh, one glide)
- Layers, back to front: a faint dotted world-grid (SVG, static), thin **signal rings**
  that emit from a point and expand on scroll (SVG circles, `pathLength`/scale by
  `useScroll`), then the giant gradient word.
- **The word — "TALK TO US"** (agreed): stacked two-line lockup, `TALK` over `TO US`,
  each line at the house 19vw scale, same gradient treatment as SERVICES/STORE
  (white → #cfcfcf, `bg-clip-text`, `drop-shadow` black). The lines rise in staggered as
  the pin engages; the signal rings emit from the period that ends the second line.
- Kicker over the word: `DecryptedText` — "Contact · S&N Devs · Kampala".
- Lede fades in at the bottom at ~55–90% of the pin, mirroring Services:
  **"Write. Call. Launch."** (italic green on "Launch", the house pattern from
  "Build. Care. Create."), sub-line: "One message. One reply. Within a working day."
- Reduced motion: static stacked word + lede, no rings, no pin.

### 2. Status ticker (thin marquee band under the opener)
- A horizontal marquee strip (new `.animate-marquee-left`, same 30s speed and hover-pause
  as the existing vertical marquees): `ACCEPTING NEW PROJECTS · REPLY WITHIN ONE WORKING DAY ·
  KAMPALA, EAT (UTC+3) · ` repeated, separated by green `·` dots.
- Pure decoration: `aria-hidden`, and it does not get an anchor stop.

### 3. The channel — form as a live letter (the signature section)
Asymmetric split, **form left (5/7), transmission card right (2/7), vertical rail (sliver)**:
- **Form** (`components/contact/contact-form.tsx`):
  - **Project-type chips** instead of a dropdown: `New website / Upgrade / Care plan /
    Something else` — toggle chips with the scramble hover and green glow on the active one
    (the Store category-rail vocabulary). The choice becomes the letter's "Re:".
  - Fields: name, email, phone (optional), message. Square-corner dark inputs, green ring
    on focus (existing `--ring`), labels above, inline validation on blur.
  - Submit: `Magnet` button — **"Send it"**. On submit the button shows a brief charging
    state, then the card seals (below).
- **Direct lines (under the form):** two compact cards — **Noah** and **Shaun** — each with
  email (`mailto:`) and phone (`tel:+256784695549` / `tel:+256789494032`) as links.
  Small green dot + role line. Real values, from the table above.
- **Transmission card** (the creative core): a bordered dark card styled like a telegram:
  `FROM:` fills live with the name, `RE:` with the chosen chip, `MSG:` with a truncated
  message preview. A green **scan line** sweeps the card slowly while typing. On submit:
  the scan sweeps fast, a green **stamp** (`S&N` mark) lands with a small spring, then the
  success line appears: "Message ready — opening your email app." `aria-live="polite"`.
  On phones the card collapses to a compact strip above the submit button.
- **Vertical rail:** rotated mono text "TRANSMISSION · S&N DEVS" and a **live Kampala clock**
  (`Intl.DateTimeFormat`, `Africa/Kampala`): "It's 14:32 in Kampala — we're in."
  The in/away text follows the hours in `data/contact.ts` (Mon–Sat 8:00–19:00 EAT by default).
  Decorative: the dot is `aria-hidden`, the text updates without announcing.

### 4. Green band — "What happens next"
- Same green band pattern as Services' packages and the Store's how-buying-works:
  three steps joined by a dashed SVG path that draws itself on scroll —
  **You write → We reply within one working day → We call & quote.**
  Small line-art loop per step: a pencil writing, a phone buzzing with a tick, a document
  with a rising quote line. Hand-built SVG in brand green (the ArtStage language).

### 5. Before you write (small FAQ)
- Four `<details>` rows (styled plus-icon rotate, border-white/15): What does a site cost?
  How long does it take? Do you work outside Kampala? What should I include in my message?
- Answers pull the real "from" prices from `data/services.ts` so they never go stale.

### 6. Final scene — "Ready when you are."
- Full-svh end stop on plain `#0a0a0a`: a soft radial green glow, two slow signal rings,
  the line **"Ready when you are."** with a green period, and two Magnet CTAs:
  **Write the email** (primary) and **WhatsApp us** (secondary) — both prefilled with the
  visitor's message if they used the form first.

## Noah's details (real — provided 2026-11-09)

| Who | Phone | wa.me link | Email |
|---|---|---|---|
| **Noah** (primary line) | +256 784 695549 | `https://wa.me/256784695549` | noahdevsug@gmail.com |
| **Shaun** | +256 789 494032 | `https://wa.me/256789494032` | shaundaniel156@gmail.com |

- **WhatsApp routing (researched):** `wa.me/<number>` takes the number in international
  format, digits only — no `+`, spaces, dashes or leading zeros; a prefilled message is
  appended as `?text=<url-encoded>`. So Noah's prefilled link is
  `https://wa.me/256784695549?text=Hello%20S%26N%20Devs%20…`.
- **Defaults I've set (say the word to change):** the form's mailto goes **To: Noah,
  CC: Shaun**; Noah's number is the business WhatsApp ("WhatsApp us" + success-state
  follow-up); the details rail shows both of them as contact cards (name, email, tel).
- Still pending: socials (Instagram/LinkedIn/…), logo + favicon, and confirmation of the
  default hours (Mon–Sat 8:00–19:00 EAT) that drive the "we're in" clock.

## How sending works (v1, no backend)
- The form validates, then composes a **mailto:** —
  `mailto:noahdevsug@gmail.com?cc=shaundaniel156@gmail.com&subject=S%26N%20Devs%20—%20<chip>%20—%20<name>&body=<name>%0D%0A<phone>%0D%0A%0D%0A<message>`
  — the primary transport behind "Send it". The success state offers **WhatsApp** as the
  follow-up (`https://wa.me/256784695549?text=<the same message, url-encoded>`), and
  WhatsApp is the secondary CTA in the final scene. (Agreed.)
- A real API route (`app/api/contact/route.ts` → email service) is a later swap; the UI,
  success states and copy will not change when it lands.

## Rules we keep
- `motion/react` + the existing helpers only (`useScrollAnchors`, `Magnet`,
  `DecryptedText`); `MotionConfig reducedMotion="user"`; no WebGL.
- Anchors like Services: opener is `{ glide: true }` + its exit stop; channel, band,
  FAQ and final scene each get a stop. Tall phone stretches scroll freely (the system
  already handles that).
- Square corners, `#0a0a0a`, brand green as the only accent, `next/image` for any raster,
  `tabular-nums` on the clock, focus-visible rings everywhere.
- Function transforms on the opener (`useScroll` + `span()`), so animations land exactly
  at 100% like Services does.

## New files
- `data/contact.ts` — **Noah's and Shaun's real phones/emails** (above), the wa.me
  builders, socials (empty until Noah supplies them), hours for the clock, and
  `sendContact()` (mailto compose + WhatsApp deep link).
- `components/contact/contact-page.tsx` + `contact-form.tsx` (and the transmission card
  inside it), `signal-art.tsx` (rings + band steps).
- `app/(public-pages)/contact/page.tsx` — thin mount, like `/services`.
- `globals.css` — one new keyframe: `.animate-marquee-left`.

## Assets
- Nothing required from Noah to build: rings, grid, stamp and step art are hand-built SVG.
- The stamp uses the existing `public/logo.svg` until the S&N logo arrives, then swaps.
- A photo is deliberately absent from this page — the letter is the picture.

## Build order
1. `data/contact.ts` + route + thin page mount (kills the 404 first).
2. Opener + ticker, anchored.
3. Form + transmission card + clock rail.
4. Green band, FAQ, final scene.
5. Checks: Playwright at desktop 1440 / phone 375 / reduced motion; `curl` the route;
   lint; build; then you review locally → deploy on your word.
