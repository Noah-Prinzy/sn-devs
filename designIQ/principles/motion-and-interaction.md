# Motion & Interaction

## When to animate

Animation must do one of three jobs:
1. **Explain** — show spatial relationships (where did this modal come from? it grew from the button)
2. **Feedback** — confirm actions (button press, add-to-cart flight, success check)
3. **Direct attention** — guide the eye (staggered entrance, shimmer on new content)

If it does none of these, it's decoration — keep it under control or cut it.

## Timing & easing

| Type | Duration | Easing |
|---|---|---|
| Micro (hover, press, toggle) | 100–150ms | ease-out |
| Small transitions (tooltips, popovers) | 150–250ms | ease-out |
| Large transitions (modals, drawers, page) | 250–400ms | ease-in-out |
| Scene/entrance choreography | 400–700ms total | custom bezier |
| Anything > 500ms | needs to be deliberately showy (hero moments only) | — |

**Easing rules:**
- Things ENTERING the screen: ease-out (fast start, gentle landing — feels responsive)
- Things EXITING: ease-in (they're leaving; get them out)
- Standard curve: `cubic-bezier(0.25, 0.1, 0.25, 1)` or Tailwind's `ease-out`.
- Springs (Framer Motion): stiffness 200–400, damping 25–35 for UI; bouncier only for playful brands.

## Choreography

- **Stagger** related elements: 40–80ms delay steps (hero headline words, card grids). Total sequence should still finish < 700ms.
- **Origin matters:** scale/fade elements from where they'll be used (dropdown grows from its trigger).
- **Shared layout transitions** (Framer Motion `layoutId`): element morphs between states instead of unmounting — the single highest "premium feel per effort" technique.
- **Interruptible:** animations should respond mid-flight to new input (springs do this natively; CSS transitions don't).

## Micro-interactions that matter

- Buttons: hover lift/brightness, active scale-down `scale(0.97)`, focus ring.
- Cards: hover translate-y-[-2~4px] + shadow growth; keep transitions 150–200ms.
- Inputs: label float or border/ring color shift on focus.
- Toggles: thumb slides with spring; track color cross-fades.
- Lists: items enter with fade+rise, 50ms stagger; exits fade only (fast).
- Skeletons over spinners for >300ms waits; pulse animation 1.5–2s.

## Scroll-driven animation

- Reveal-on-scroll: IntersectionObserver, animate once, threshold 0.1–0.2, `translate-y-4 + opacity` over 500–600ms.
- Parallax: ≤ ±40px offsets; use `transform` only; disable on mobile.
- Sticky sections & horizontal scroll galleries: use for storytelling pages, never for utility pages.
- Scroll progress bars: cheap, useful for long-form content.

## Performance & respect

- Animate ONLY `transform` and `opacity`. Animating `width/height/top/left` causes layout thrash. (Exception: `layoutId`/FLIP techniques which measure then transform.)
- `will-change: transform` sparingly (only on elements about to animate).
- `prefers-reduced-motion: reduce` → kill or simplify ALL non-essential motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
- Framer Motion: wrap in `<MotionConfig reducedMotion="user">`.
- Keep total JS animation libraries lean: Motion (Framer) ≈ 30–50kb, GSAP ≈ 25kb core. One library per project.

## Library choice

- **Motion (framer-motion)** — React apps; declarative, layout animations, gestures. Default choice in React.
- **GSAP** — timeline-heavy sequences, scroll-triggered scenes, non-React or framework-agnostic sites; ScrollTrigger is best-in-class.
- **Theatre.js** — keyframed cinematic scenes with a visual editor; for showpiece landing pages.
- **CSS only** — hovers, focus, simple reveals. Don't ship JS for what CSS does.
