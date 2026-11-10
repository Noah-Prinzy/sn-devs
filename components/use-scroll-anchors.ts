"use client";

import { useEffect } from "react";
import { lenisRef } from "@/components/lenis-scroll";

const inOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Leaves at once and lands with a long, soft tail.
const ease = (t: number) => 0.5 * inOutCubic(t) + 0.5 * (1 - Math.pow(1 - t, 4));
// The anchor snap: starts fast and lands fast — a click into place, never a drift.
const snapEase = (t: number) => 1 - Math.pow(1 - t, 4);

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Glide to a spot; the travel time grows with the distance, but gently. Callers can
// override duration/easing (the anchor settle snaps with its own quick profile).
export function glideTo(
    y: number,
    onComplete?: () => void,
    opts?: { duration?: number; easing?: (t: number) => number }
) {
    const lenis = lenisRef.current;
    if (!lenis) return false;
    const screens = Math.abs(window.scrollY - y) / window.innerHeight;
    lenis.scrollTo(y, {
        duration: opts?.duration ?? Math.min(1.8, Math.max(0.9, 0.8 + 0.32 * screens)),
        easing: opts?.easing ?? ease,
        immediate: still(),
        force: true,
        onComplete,
    });
    return true;
}

// A pinch of anchoring: scrolling stays completely free — no gesture is ever claimed or
// swallowed — but the moment you come to rest, the page snaps onto the nearest section
// boundary: quick, definite, done. Any input cancels it instantly.
export function useScrollAnchors() {
    useEffect(() => {
        let idle = 0, settling = false;

        // Scene boundaries: every <section> inside <main>, plus the exit of any pinned
        // scene (a tall section that pins its content to the top of the screen).
        const stops = () => {
            const main = document.querySelector("main");
            if (!main) return [];
            const vh = window.innerHeight;
            const list: number[] = [];
            for (const s of Array.from(main.querySelectorAll<HTMLElement>("section"))) {
                const top = s.offsetTop;
                if (list.some((y) => Math.abs(y - top) <= 2)) continue;
                list.push(top);
                if (s.offsetHeight > vh * 1.3 && s.querySelector(":scope .sticky.top-0")) {
                    const exit = top + s.offsetHeight - vh;
                    if (list.every((y) => Math.abs(y - exit) > 2)) list.push(exit);
                }
            }
            return list.sort((a, b) => a - b);
        };

        // The snap itself: only from just outside a stop, only at rest, over in a blink.
        const settle = () => {
            if (still() || settling) return;
            const y = window.scrollY;
            const radius = window.innerHeight * 0.38;
            let dist = Infinity, target: number | null = null;
            for (const s of stops()) {
                const d = Math.abs(s - y);
                if (d <= radius && d < dist && d > 1) { dist = d; target = s; }
            }
            if (target === null) return;
            settling = true;
            const screens = dist / window.innerHeight;
            glideTo(target, () => { settling = false; }, {
                duration: Math.min(0.8, 0.4 + 0.2 * screens),
                easing: snapEase,
            });
        };

        const schedule = () => {
            clearTimeout(idle);
            idle = window.setTimeout(settle, 90);
        };
        // Any user input instantly cancels a pending or running settle — input always wins.
        const forgive = () => {
            clearTimeout(idle);
            settling = false;
        };

        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("wheel", forgive, { passive: true, capture: true });
        window.addEventListener("touchstart", forgive, { passive: true, capture: true });
        window.addEventListener("keydown", forgive, { capture: true });
        return () => {
            clearTimeout(idle);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("wheel", forgive, { capture: true });
            window.removeEventListener("touchstart", forgive, { capture: true });
            window.removeEventListener("keydown", forgive, { capture: true });
        };
    }, []);
}
