"use client";

import { useEffect } from "react";
import { lenisRef } from "@/components/lenis-scroll";

// A resting point on the page (px from the top). `glide` makes the stretch below it one
// glide however long it is (a scroll-driven scene); any other stretch glides only when it
// fits a screen, and longer ones scroll freely so their content can be read.
export type Stop = { y: number; glide?: boolean };

const ONE_SCREEN = 1.15;
// Trackpad inertia after a landing is swallowed while it keeps arriving, never longer than this.
const INERTIA_GAP = 140, INERTIA_MAX = 900;
const DOWN = ["ArrowDown", "PageDown", "End", " "], UP = ["ArrowUp", "PageUp", "Home"];

const inOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Leaves at once and lands with a long, soft tail.
const ease = (t: number) => 0.5 * inOutCubic(t) + 0.5 * (1 - Math.pow(1 - t, 4));

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Glide to a spot; the travel time grows with the distance, but gently.
export function glideTo(y: number, onComplete?: () => void) {
    const lenis = lenisRef.current;
    if (!lenis) return false;
    const screens = Math.abs(window.scrollY - y) / window.innerHeight;
    lenis.scrollTo(y, {
        duration: Math.min(1.8, Math.max(0.9, 0.8 + 0.32 * screens)),
        easing: ease,
        immediate: still(),
        force: true,
        onComplete,
    });
    return true;
}

// Anchored scrolling: wheel, keys and swipes travel stop to stop, a new gesture the other
// way turns the glide around, and drags that stop mid-way settle on the nearer stop.
export function useScrollAnchors(getStops: () => Stop[]) {
    useEffect(() => {
        let busy = 0, landedAt = -1e9, lastWheel = 0, quietDir = 0, idle = 0;
        let touchY: number | null = null, touchOwned = false;

        const stops = () => getStops().sort((a, b) => a.y - b.y);
        const glides = (a: Stop, b: Stop) => a.glide || b.y - a.y <= ONE_SCREEN * window.innerHeight;
        // the stretch the page is in, heading `dir`: [upper stop, lower stop], or null outside the stops
        const stretch = (list: Stop[], y: number, dir: number) => {
            for (let i = 0; i < list.length - 1; i++) {
                const a = list[i], b = list[i + 1];
                if (y > a.y + 2 && y < b.y - 2) return [a, b] as const;
                if (Math.abs(y - a.y) <= 2 && dir > 0) return [a, b] as const;
                if (Math.abs(y - b.y) <= 2 && dir < 0) return [a, b] as const;
            }
            return null;
        };

        const go = (to: number, dir: number) => {
            if (Math.abs(window.scrollY - to) < 2) return;
            busy = dir;
            glideTo(to, () => { busy = 0; landedAt = performance.now(); quietDir = dir; });
        };
        // true = the gesture belongs to the anchors, so the native scroll is cancelled
        const claim = (dir: number) => {
            if (busy === dir) return true;
            const s = stretch(stops(), window.scrollY, dir);
            if (!s || !glides(s[0], s[1])) return false;
            go(dir > 0 ? s[1].y : s[0].y, dir);
            return true;
        };

        const stop = (e: Event) => { e.preventDefault(); e.stopImmediatePropagation(); };
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return;
            const dir = Math.sign(e.deltaY), now = performance.now();
            const inertia = !busy && dir === quietDir && now - lastWheel < INERTIA_GAP && now - landedAt < INERTIA_MAX;
            lastWheel = now;
            if (inertia || claim(dir)) stop(e);
        };
        const onKey = (e: KeyboardEvent) => {
            const el = e.target instanceof Element ? e.target : null;
            if (e.altKey || e.ctrlKey || e.metaKey || el?.closest("input, textarea, select, [contenteditable]")) return;
            if (e.key === " " && el?.closest("button, a, summary, [role=button]")) return;
            const dir = DOWN.includes(e.key) ? (e.key === " " && e.shiftKey ? -1 : 1) : UP.includes(e.key) ? -1 : 0;
            if (dir && claim(dir)) stop(e);
        };
        // a swipe is decided by its first few pixels, while the browser still lets it be cancelled
        const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; touchOwned = false; };
        const onTouchMove = (e: TouchEvent) => {
            if (touchOwned) return stop(e);
            if (touchY === null) return;
            const dy = touchY - e.touches[0].clientY;
            if (Math.abs(dy) < 4) return;
            touchY = null;
            if (claim(Math.sign(dy))) { touchOwned = true; stop(e); }
        };
        const onTouchEnd = () => { touchY = null; touchOwned = false; };
        // scrollbar drags can't be intercepted: one that stops inside a glide settles on the nearer stop
        const onScroll = () => {
            clearTimeout(idle);
            if (busy) return;
            idle = window.setTimeout(() => {
                const list = stops(), y = window.scrollY;
                if (busy || list.some((s) => Math.abs(y - s.y) <= 2)) return;
                const s = stretch(list, y, 1);
                if (!s || !glides(s[0], s[1])) return; // free stretches stay where they were left
                const up = (y - s[0].y) / (s[1].y - s[0].y) < 0.5;
                go(up ? s[0].y : s[1].y, up ? -1 : 1);
            }, 180);
        };

        const opts = { passive: false, capture: true } as const;
        window.addEventListener("wheel", onWheel, opts);
        window.addEventListener("keydown", onKey, opts);
        window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
        window.addEventListener("touchmove", onTouchMove, opts);
        window.addEventListener("touchend", onTouchEnd, { capture: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(idle);
            window.removeEventListener("wheel", onWheel, opts);
            window.removeEventListener("keydown", onKey, opts);
            window.removeEventListener("touchstart", onTouchStart, { capture: true });
            window.removeEventListener("touchmove", onTouchMove, opts);
            window.removeEventListener("touchend", onTouchEnd, { capture: true });
            window.removeEventListener("scroll", onScroll);
        };
        // getStops reads the live layout on every call, so the listeners never need rebinding
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
