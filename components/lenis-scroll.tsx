"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

// The live instance, for pages that drive the scroll themselves (Home's anchors).
export const lenisRef: { current: Lenis | null } = { current: null };

export default function LenisScroll() {
    useEffect(() => {
        const lenis = lenisRef.current = new Lenis({
            lerp: 0.09,
            smoothWheel: true,
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
