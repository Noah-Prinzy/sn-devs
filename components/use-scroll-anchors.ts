"use client";

import { useEffect } from "react";
import { lenisRef } from "@/components/lenis-scroll";

// A resting point on the page (px from the top). `glide` marks a stop whose stretch below is a
// scroll-driven scene (one screen or a pinned film), where coming to rest between stops is never
// a good place to be. Any other stretch is reading content and is left alone.
export type Stop = { y: number; glide?: boolean };

const ONE_SCREEN = 1.15;
// How close to a stop (fraction of a screen) the page has to rest before it is nudged the rest
// of the way. Further away it stays put: the anchoring is a pinch, not a pull. 0.5 is lenis/snap's
// default distanceThreshold (50% of the viewport); a fifth inside reading content. Each page
// names its own stops (see pinStops and sectionStops): pinned openers and one-screen scenes
// anchor, reading content scrolls free.
const NEAR_SCENE = 0.5, NEAR_READING = 0.2, LANDING = 4;
// Rest comes from the scroll engine, not a timer: Lenis reports isScrolling === false once its
// wheel tween completes (measured 1.04-1.06 s after a 120 px tick at lerp 0.09, with a 200 ms gap
// inside the tail that a short timer would mistake for rest) and 400 ms after the last native
// (key, touch, scrollbar) scroll event; the browser's scrollend is a second trigger. The idle
// timer below is only a fallback for when Lenis is absent, and sits above that 200 ms gap.
const REST_FALLBACK_MS = 300;
// No settle for a while after a resize or orientation change (GSAP ScrollTrigger treats the
// 500 ms after a refresh as direction 0) or after focus moves (so the browser's own
// scroll-into-view for Tab is never fought).
const QUIET_RESIZE_MS = 500, QUIET_FOCUS_MS = 400;
// A nudge is a quick click into place: 0.25 s plus 0.4 s per screen, capped at 0.5 s (NN/g: most
// animations 100-500 ms, 400 ms already "very slow", 500 ms "a real drag"; M3 long2 = 500 ms).
// A half-screen nudge takes 0.45 s, a 100 px tidy 0.29 s. Quartic ease-out, like GSAP's snap.
const nudgeDuration = (screens: number) => Math.min(0.5, 0.25 + 0.4 * screens);
const snapEase = (t: number) => 1 - Math.pow(1 - t, 4);
// In-page links are user-initiated travel, so they may take longer: 0.6-1.2 s by distance.
const glideDuration = (screens: number) => Math.min(1.2, Math.max(0.6, 0.5 + 0.35 * screens));
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);
// For links: leaves at once and lands with a long, soft tail.
const ease = (t: number) => 0.5 * inOutCubic(t) + 0.5 * (1 - Math.pow(1 - t, 4));

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Until when the page is travelling on purpose (a link glide), so the hook treats the landing
// as a settle of its own and never adds a second nudge.
let travellingUntil = 0;

// Glide to a spot (in-page links). The travel time grows with the distance, but gently. `focus`
// receives focus once the page lands, so the next Tab continues from the destination.
export function glideTo(y: number, onComplete?: () => void, opts?: { duration?: number; easing?: (t: number) => number; focus?: HTMLElement | null; nudge?: boolean }) {
    const lenis = lenisRef.current;
    if (!lenis) return false;
    const screens = Math.abs(window.scrollY - y) / window.innerHeight;
    const duration = opts?.duration ?? glideDuration(screens);
    if (!opts?.nudge) travellingUntil = performance.now() + duration * 1000 + 250;
    lenis.scrollTo(y, {
        duration,
        easing: opts?.easing ?? ease,
        immediate: still(),
        force: true,
        onComplete: () => {
            opts?.focus?.focus({ preventScroll: true });
            onComplete?.();
        },
    });
    return true;
}

// The stops inside a pinned section, as fractions of its scroll run: every one but the exit is a
// glide stop, since the stretch after it is the film itself.
export function pinStops(el: HTMLElement | null, fractions: number[]): Stop[] {
    if (!el) return [];
    const run = el.offsetHeight - window.innerHeight;
    return fractions.map((f) => ({ y: Math.round(el.offsetTop + run * f), glide: f < 1 }));
}

// The top of each section given, as a stop. A section that is one screen tall anchors by
// itself (the hook sees the short stretch); a taller one is reading content and scrolls free.
export function sectionStops(refs: { current: HTMLElement | null }[]): Stop[] {
    return refs.flatMap((r) => (r.current ? [{ y: r.current.offsetTop }] : []));
}

// Stops derived from the page when a caller gives none: every <section> in <main>, plus the
// exit of any pinned one (tall, with a sticky child).
function derivedStops(): Stop[] {
    const main = document.querySelector("main");
    if (!main) return [];
    const vh = window.innerHeight, list: Stop[] = [];
    for (const s of Array.from(main.querySelectorAll<HTMLElement>("section"))) {
        const top = s.offsetTop;
        if (list.some((x) => Math.abs(x.y - top) <= 2)) continue;
        const pinned = s.offsetHeight > vh * 1.3 && !!s.querySelector(":scope .sticky.top-0");
        list.push({ y: top, glide: pinned });
        if (pinned) list.push({ y: top + s.offsetHeight - vh });
    }
    return list;
}

// Test hook: a page that defines window.__anch gets every settle decision pushed to it.
type Decision = { t: number; why: string; isScrolling: unknown; from: number; to: number | null };
const record = (d: Decision) => (window as Window & { __anch?: Decision[] }).__anch?.push(d);

// A pinch of anchoring. Scrolling is never intercepted: wheel, trackpad, keys and fingers all
// move the page natively, smoothed by Lenis. Once the page has come to rest near a stop it is
// nudged the rest of the way, in the direction it was travelling: within half a screen inside
// a scene stretch, a fifth inside reading content. Rest anywhere else and the page stays where
// it is. Never backwards, never while a finger or pointer is down, never right after a resize
// or a focus change, and any input during a nudge wins. Under reduced motion the hook does
// nothing.
export function useScrollAnchors(getStops?: () => Stop[]) {
    useEffect(() => {
        if (still()) return;
        let fallback = 0, settling = false, lastY = window.scrollY, dir = 0, moved = false, down = false, quietUntil = 0, decidedY = -1e9;

        const stops = () => (getStops ? getStops() : derivedStops()).sort((a, b) => a.y - b.y);
        const scene = (a: Stop, b: Stop) => !!a.glide || b.y - a.y <= ONE_SCREEN * window.innerHeight;

        // One decision per rest: only after the page moved, never mid-nudge or with a finger down.
        const decide = (why: string) => {
            clearTimeout(fallback);
            if (!moved || settling || down) return;
            moved = false;
            const now = performance.now();
            if (now < quietUntil || now < travellingUntil) return;
            const list = stops(), y = window.scrollY;
            decidedY = y;
            let to: number | null = null;
            const landed = list.some((s) => Math.abs(y - s.y) <= LANDING);
            if (list.length >= 2 && dir !== 0 && !landed) {
                let a: Stop | null = null, b: Stop | null = null;
                for (let i = 0; i < list.length - 1; i++) if (y > list[i].y && y < list[i + 1].y) { a = list[i]; b = list[i + 1]; }
                if (a && b) {
                    const near = (scene(a, b) ? NEAR_SCENE : NEAR_READING) * window.innerHeight;
                    if (dir > 0 && b.y - y <= near) to = b.y;
                    else if (dir < 0 && y - a.y <= near) to = a.y;
                }
            }
            record({ t: now, why, isScrolling: lenisRef.current?.isScrolling, from: y, to });
            if (to === null) return;
            settling = true;
            const screens = Math.abs(y - to) / window.innerHeight;
            glideTo(to, () => { settling = false; moved = false; decidedY = window.scrollY; }, { duration: nudgeDuration(screens), easing: snapEase, nudge: true });
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (Math.abs(y - lastY) > 1) dir = Math.sign(y - lastY);
            lastY = y;
            if (settling) return;
            // Lenis's last sub-pixel frame lands after it has already reported rest: that is not
            // a new movement, so it earns no second decision.
            if (Math.abs(y - decidedY) > 1) moved = true;
            clearTimeout(fallback);
            fallback = window.setTimeout(() => decide("idle"), REST_FALLBACK_MS);
        };
        // Lenis reports rest itself: isScrolling drops to false when its tween completes, or
        // 400 ms after the last native scroll event.
        const onLenis = (l: { isScrolling: boolean | string }) => { if (l.isScrolling === false) decide("lenis"); };
        const onScrollEnd = () => decide("scrollend");
        // The visitor's hand always wins over a settle in progress: Lenis retargets its own tween
        // on wheel and steps aside for touch, and a key press stops the tween here, so the key
        // scrolls natively from wherever the page was.
        const cancel = () => {
            if (!settling) return;
            settling = false;
            lenisRef.current?.scrollTo(window.scrollY, { immediate: true });
        };
        const onPointerDown = () => { down = true; cancel(); };
        const onPointerUp = () => { down = false; };
        const onResize = () => { dir = 0; moved = false; quietUntil = performance.now() + QUIET_RESIZE_MS; };
        const onFocus = () => { quietUntil = Math.max(quietUntil, performance.now() + QUIET_FOCUS_MS); };

        const offLenis = lenisRef.current?.on("scroll", onLenis);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("scrollend", onScrollEnd, { passive: true });
        window.addEventListener("wheel", cancel, { passive: true, capture: true });
        window.addEventListener("keydown", cancel, { passive: true, capture: true });
        window.addEventListener("touchstart", onPointerDown, { passive: true, capture: true });
        window.addEventListener("touchend", onPointerUp, { passive: true, capture: true });
        window.addEventListener("touchcancel", onPointerUp, { passive: true, capture: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
        window.addEventListener("pointerup", onPointerUp, { passive: true, capture: true });
        window.addEventListener("pointercancel", onPointerUp, { passive: true, capture: true });
        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("orientationchange", onResize, { passive: true });
        window.addEventListener("focusin", onFocus, { passive: true });
        return () => {
            clearTimeout(fallback);
            offLenis?.();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("scrollend", onScrollEnd);
            window.removeEventListener("wheel", cancel, { capture: true });
            window.removeEventListener("keydown", cancel, { capture: true });
            window.removeEventListener("touchstart", onPointerDown, { capture: true });
            window.removeEventListener("touchend", onPointerUp, { capture: true });
            window.removeEventListener("touchcancel", onPointerUp, { capture: true });
            window.removeEventListener("pointerdown", onPointerDown, { capture: true });
            window.removeEventListener("pointerup", onPointerUp, { capture: true });
            window.removeEventListener("pointercancel", onPointerUp, { capture: true });
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onResize);
            window.removeEventListener("focusin", onFocus);
        };
        // getStops reads the live layout on every call, so the listeners never need rebinding
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
