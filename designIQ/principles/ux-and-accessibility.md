# UX Flows, States & Accessibility

## UX laws that govern every screen

- **Fitts's Law:** bigger + closer targets are faster to hit. Primary CTAs are large and reachable.
- **Hick's Law:** more choices = slower decisions. 3–5 nav items; progressive disclosure for depth.
- **Jakob's Law:** users expect your site to work like sites they know. Conventions (cart icon top-right, logo top-left, © in footer) are your friends.
- **Miller's Law:** working memory ≈ 4±1 chunks. Group content; don't count options, chunk them.
- **Peak-End Rule:** users judge an experience by its peak moment and its end. Design the "wow" moment and the final confirmation (success screen) deliberately.
- **Aesthetic-Usability Effect:** beautiful UI is perceived as easier to use. Polish is usability.

## Every async surface needs 4 states

1. **Loading** — skeletons matching final layout (never layout-shift spinners)
2. **Empty** — explain + offer the first action ("No projects yet — Create one")
3. **Error** — human message + retry path + what to do next; never raw error codes
4. **Success** — confirmation with next step

Missing states are where products feel broken. Design all four in the wireframe phase.

## Forms (where conversions live)

- Single-column layout; labels above inputs; 1–2 columns max even for long forms.
- Group related fields with fieldsets; split long forms into steps with visible progress.
- Inline validation on blur, never on keystroke; validate again on submit.
- Error text: what happened + how to fix ("Enter a valid email — e.g. name@company.com").
- Autofill, autocomplete attributes, enter-to-submit, sensible focus order.
- Primary button repeats the action verb: "Create account", not "Submit".

## Navigation & app flow

- **3-click myth is false, but:** any page reachable within ~3 meaningful decisions for core tasks.
- Every screen answers: **Where am I?** (breadcrumbs, active nav state) · **What can I do?** (primary action visible) · **Where can I go?** (clear next steps).
- State machines for critical flows (checkout, onboarding): enumerate states explicitly — idle → loading → success/error, guard invalid transitions.
- Optimistic UI for low-risk actions (likes, reorders); confirmation for irreversible ones (delete → confirm dialog with typed consequence).

## Accessibility (WCAG 2.2 AA floor)

- **Semantic HTML first:** `button` not `div onClick`; landmarks (`header/nav/main/footer`); one `h1` per page; logical heading order.
- **Keyboard:** everything reachable and operable by keyboard; visible focus ring (`:focus-visible`, 2px ring + 2px offset); skip-to-content link.
- **Contrast:** 4.5:1 body text, 3:1 large text & UI borders (see typography-and-color).
- **Targets:** ≥ 24×24px (2.5.8); spacing between adjacent targets.
- **Focus management:** modals trap focus and return it on close; route changes move focus to the new view's `h1`; toasts announced via `aria-live="polite"`.
- **Images:** `alt` conveys function (decorative → `alt=""`). Icons with text labels don't need `aria-label` doubling.
- **Forms:** every input has a programmatic label; errors linked via `aria-describedby`; `aria-invalid` set.
- **Motion:** respect `prefers-reduced-motion`; nothing flashes > 3×/second.
- **Never:** color as the sole signal (pair with icon/text), remove focus outlines, use `tabindex > 0`.

## UX writing

- Buttons = verbs ("Save changes"). Errors = cause + fix. Empty states = explanation + action.
- Sentence case everywhere (it's friendlier and modern); avoid jargon; be specific ("3 files selected" not "items selected").
- Numbers you can verify ("Saved 2 minutes ago") build trust.
