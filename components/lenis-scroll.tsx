"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

// The live instance, for pages that drive the scroll themselves (Home's anchors).
export const lenisRef: { current: Lenis | null } = { current: null };

export default function LenisScroll() {
    useEffect(() => {
        const lenis = lenisRef.current = new Lenis({
            lerp: 0.09,
            // no smoothing for visitors who ask for less motion
            smoothWheel: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            syncTouch: false,
            anchors: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
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
