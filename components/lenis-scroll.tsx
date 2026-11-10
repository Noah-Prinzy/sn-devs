"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
// html.lenis { height: auto }, [data-lenis-prevent] { overscroll-behavior: contain } and
// iframe { pointer-events: none } while smoothing: needed for stop() (the mobile menu) and
// any scrollable overlay to hold the page behind them still.
import 'lenis/dist/lenis.css';

// The live instance, for pages that drive the scroll themselves (Home's anchors).
export const lenisRef: { current: Lenis | null } = { current: null };

export default function LenisScroll() {
    useEffect(() => {
        const lenis = lenisRef.current = new Lenis({
            // 0.09 measured: a 120 px wheel tick settles within 1 px at ~0.86 s, last event ~1.05 s
            lerp: 0.09,
            // no smoothing for visitors who ask for less motion
            smoothWheel: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            syncTouch: false,
            // hash links glide (scroll-padding-top on html keeps them below the navbar)
            anchors: true,
            // a click on a page link during inertia stops the travel instead of carrying on
            stopInertiaOnNavigate: true,
        });

        // The loop must survive a listener throwing (a scroll subscriber, an onComplete): one
        // uncaught error here would end smoothing for the rest of the visit, with the wheel
        // still captured, which reads as the page being stuck until a refresh.
        const raf = (time: number) => {
            try {
                lenis.raf(time);
            } catch (err) {
                console.error("Lenis frame failed", err);
            }
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return null;
}
