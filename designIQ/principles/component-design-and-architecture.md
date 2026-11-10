# Component Design & Frontend Architecture

## Component anatomy (design every component with all of these)

- **Variants:** `default | secondary | destructive | outline | ghost | link` (buttons)
- **Sizes:** `sm | default | lg | icon`
- **States:** hover, focus-visible, active, disabled, loading, readonly
- **Composition:** `className` merge (clsx + tailwind-merge), `asChild`/polymorphic `as` prop, children over heavy props

### Component API rules

1. Props are an API — minimize surface; compose small components instead of adding props.
2. Slot/children patterns beat 20 config props (Radix/shadcn philosophy).
3. Forward refs; spread remaining props; never swallow `className`.
4. Controlled + uncontrolled support for form-adjacent components.
5. Data flows down, events flow up; no component reaches into global state it doesn't own.

### Design tokens

Single source of truth before components: colors (semantic), spacing, radii, shadows, font sizes, z-index scale, motion durations. In Tailwind: `tailwind.config` extension or CSS variables (shadcn theme format). Components consume tokens ONLY — no raw hex/px inside components.

## Project structure (Next.js App Router / feature-first)

```
src/
  app/                  # routes only — thin pages
  components/ui/        # design-system primitives (shadcn pattern)
  components/blocks/    # composed sections (SiteHeader, PricingTable, Hero)
  features/{domain}/    # feature components + hooks + actions colocated
    auth/ dashboard/ checkout/
  lib/                  # utils, api clients, config
  hooks/ styles/ types/
```

Rules: routes stay thin (they compose features); shared primitives never import feature code (one-way dependency: app → features → ui); colocation beats centralization — code that changes together lives together.

## State strategy

| State type | Home | Tools |
|---|---|---|
| Server data | Server component / query cache | RSC, TanStack Query, SWR |
| URL state | The URL | searchParams (filters, tabs, pagination — shareable & SEO-free) |
| Global client state | Store | Zustand (default), Jotai (atomic) |
| Local UI state | Component | useState, useReducer for machines |

Default to server components + URL state; reach for client state stores only when prop-drilling actually hurts. Forms: react-hook-form + zod schemas shared client/server.

## Performance

- **Core Web Vitals budgets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Images: `next/image` (or equivalent) with `sizes`, priority on LCP image, AVIF/WebP, aspect-ratio reserved.
- Fonts: `next/font` (self-hosted, no layout shift), subset weights, `display: swap`.
- JS: server components by default; `"use client"` only for interactivity; dynamic-import heavy widgets (charts, editors); route-level code splitting is automatic — keep it that way.
- Third-party scripts: load after interaction (`next/script` strategy), never render-blocking.
- Cache: static where possible, `revalidate` for semi-static, streaming with `Suspense` for slow data.
- Measure with Lighthouse + real user monitoring; optimize the p75.

## SEO & meta

- Unique title (≤ 60 chars) + description (≤ 155) per route; Open Graph + Twitter card images (1200×630).
- Semantic heading hierarchy, `next-sitemap`/metadata API, canonical URLs, structured data (JSON-LD) for products/articles/FAQ.
- `alt` text, descriptive anchors ("Read the pricing guide" not "click here").

## Stack conventions (my defaults)

- **SaaS app:** Next.js + TypeScript + Tailwind + shadcn/ui + Zustand + TanStack Query + Prisma/Drizzle.
- **Content/marketing site:** Astro + Tailwind (+ islands for interactivity) — fastest LCP story.
- **Animation:** Motion (React) / GSAP (timeline-heavy) — one per project.
- **Icons:** Lucide (default) via tree-shakeable imports.
- Quality gates before ship: typecheck, lint, keyboard walk, contrast check, mobile pass, Lighthouse ≥ 90s.
