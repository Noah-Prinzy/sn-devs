# S&N Devs — Transformation Plan

**Goal:** Transform the prebuilt "estate" real-estate template (PrebuiltUI) into **S&N Devs** — an About Us × service-menu website for **Noah & Shaun**.

**Folder:** `D:\FromC\Projects\S&N Devs` (renamed from `S&N Studio`)
**Status:** Planning phase. Dev server at http://localhost:3105 (Next.js 16.2.9, Turbopack).

---

## 1. Current State (scanned)

- **Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, lenis (smooth scroll), lucide-react.
- **Entry:** `app/(public-pages)/page.tsx` renders 7 sections in order:
  1. `sections/hero-sections.tsx` — black hero over `public/hero-image.png`, badge + headline + 2 buttons
  2. `sections/stats.tsx` — heading + CountUp stats (5000+ properties / $500M+ / 98%)
  3. `sections/gallery.tsx` — sticky horizontal-scroll gallery, 4 images duplicated (`public/assets/galleryImage1–4.png`)
  4. `sections/why-choose-us.tsx` — accordion (data in `data/data.tsx`) + image that swaps per open item (`house.png` + gallery images)
  5. `sections/testimonials.tsx` — two vertical marquee columns of review cards (Unsplash avatars)
  6. `sections/call-to-action.tsx` — 3 fanned images + CTA button
  7. `sections/contact.tsx` — contact form + image card with "key details" overlay
- **Chrome:** `components/navbar.tsx` (fixed pill nav, links: Home / About Us / Services / Contact + "Get Started"), `components/footer.tsx` (black footer, giant "estate" SVG watermark, Explore/Social/Company columns), `components/lenis-scroll.tsx`, `components/count-number.tsx` (CountUp).
- **Branding/metadata:** titles now "S&N Devs" in `app/layout.tsx` and route-group layout; navbar still links to prebuiltui.com (to fix in rebrand).
- **Assets (being replaced by Noah — arriving in per-page folders, see §3):**
  - `public/logo.svg`, `public/favicon.svg` — current PrebuiltUI marks
  - `public/hero-image.png` (2159×1353)
  - `public/assets/galleryImage1.png` … `galleryImage4.png`
  - `public/assets/house.png` (1458×1079)
- **Config:** `next.config.ts` allows `images.unsplash.com`, `images.unoptimized: true`. `@/*` path alias → project root.

## 2. Decisions Made

- **Name:** Website/folder is **S&N Devs** (folder renamed `S&N Studio` → `S&N Devs`).
- **Structure: multi-page — ONLY 4 pages, no more:**
  1. **Home** — `/`
  2. **Services** — `/services`
  3. **About Us** — `/about`
  4. **Contact Us** — `/contact`

  All four reuse the `(public-pages)` layout (Navbar / Footer / LenisScroll). Navbar links become **Home / Services / About Us / Contact Us** (desktop + mobile) — the former fourth nav link is now **About Us** and points to `/about`. There is no separate work/landing page beyond these four and no fifth page of any kind; work samples live on Home (gallery preview) and About Us.
- **Work samples:** mixed — real projects plus placeholders that get swapped as Noah's image assets arrive. Shown on Home (horizontal-scroll gallery) and About Us, not as a standalone page.
- **Design direction:** Deviate from the current look, but **not drastically** — keep the essence (dark hero, light minimal zinc sections, Framer Motion springs, marquee/horizontal-scroll mechanics) with S&N Devs branding layered on.
- **Assets:** Noah is dropping his own files into `public/` **organized in per-page folders** (see §3). We map those files to the code references; where a folder layout differs from current paths, references get updated.

## 3. Todos — things Noah has to provide (I will remind you)

- [ ] **Logo + favicon** for S&N Devs (will replace `public/logo.svg`, `public/favicon.svg`)
- [ ] **Images, placed in their respective folders under `public/`**, e.g.:
  - `public/assets/home/` — hero image, gallery/work images, CTA fan images
  - `public/assets/services/` — any imagery for the Services page
  - `public/assets/about/` — studio/team/process images for About Us
  - `public/assets/contact/` — contact-side image card
- [ ] **Custom services list** for the Services page
- [ ] **Project details** (names, categories, which are real vs placeholder)
- [ ] **About Us content** (story of Noah & Shaun, values, process, team info)
- [ ] **Design deviations** (colors, mood tweaks vs. current look)
- [ ] **Contact/social details** (email, phone, Instagram/LinkedIn/etc., business hours)

## 4. Planned Work Items

1. **Rebrand metadata & chrome:** titles/descriptions → "S&N Devs" (done in layouts); navbar logo link → `/`; navbar links → `/`, `/services`, `/about`, `/contact` (desktop + mobile menu); footer brand, link columns (same four pages), copyright → S&N Devs; remove PrebuiltUI references.
2. **Routing (four pages):** `/` (home, reworked landing), `/services`, `/about`, `/contact` — each an `app/(public-pages)/<route>/page.tsx` reusing the shared layout.
3. **Home page section mapping (rework existing sections):**
   - Hero → S&N Devs intro (headline, badge, CTAs: "View Services" / "Book a Call")
   - Stats → studio stats (projects delivered, clients, satisfaction, etc.)
   - Gallery → work preview (horizontal scroll with Noah's work images)
   - WhyChooseUs → "Why work with us" (accordion, S&N copy)
   - Testimonials → client reviews for the studio
   - CallToAction → studio CTA (links to `/contact`)
   - Contact → **moved off Home** — full contact form lives on `/contact`; Home keeps the CTA section instead
4. **Services page (`/services`):** service menu — *exact service list to be provided by Noah (see Todos)*; imagery from `public/assets/services/`.
5. **About Us page (`/about`):** story of Noah & Shaun, how the studio works (reuse/adapt WhyChooseUs accordion), values, stats, testimonials, imagery from `public/assets/about/`.
6. **Contact Us page (`/contact`):** form (name/email/phone/subject/message) + details card (hours, email, phone, socials — *details pending*), imagery from `public/assets/contact/`.
7. **Assets swap:** as Noah's files land in their per-page folders, move/rename them to the referenced paths (or update the references) — logo.svg, favicon.svg, hero image, gallery/work images, about images, contact image.
8. **Data:** rewrite `data/data.tsx` (why-choose-us items, testimonials, services, about content) with S&N Devs content.

## 5. Tech Notes

- Keep the existing stack — no new dependencies needed for the rebrand; routing uses the App Router route group.
- Animations: reuse framer-motion spring presets (`stiffness: 320, damping: 70` / `240,70`) and the existing marquee keyframes in `globals.css`.
- When assets arrive, drop them into their `public/assets/<page>/` folders and update references; `next/image` is unoptimized so any format works.
- Verify after each change: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3105/<route>` on the running dev server.
