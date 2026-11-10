"use client";

import { type MotionValue, motion, useTransform } from "motion/react";

// Hand-built line art for the Contact page, in the brand-green stroke language the
// Services plinth and the Store's "how it works" use. No WebGL, no rasters.

// Signal rings that emit from a single point as the page is scrolled. Anchored to the
// period of the opener's word: drop it inside a relative span and the rings grow from it.
export function SignalRings({ progress, count = 4, size = "64vmin" }: { progress: MotionValue<number>; count?: number; size?: string }) {
    return (
        <span aria-hidden className="pointer-events-none absolute bottom-[0.02em] left-1/2 size-0">
            {Array.from({ length: count }, (_, i) => (
                <Ring key={i} progress={progress} start={0.04 + i * 0.14} size={size} />
            ))}
        </span>
    );
}

function Ring({ progress, start, size }: { progress: MotionValue<number>; start: number; size: string }) {
    const scale = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - start) / 0.5)));
    const opacity = useTransform(progress, (v) => 0.9 * (1 - Math.min(1, Math.max(0, (v - start) / 0.5))));
    return (
        <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" style={{ width: size, height: size }}>
            <motion.span
                style={{ scale, opacity }}
                className="absolute inset-0 rounded-full border-2 border-[var(--brand)] shadow-[0_0_24px_rgba(74,222,128,.35),inset_0_0_24px_rgba(74,222,128,.2)]"
            />
        </span>
    );
}

// Step art for the green "What happens next" band — pencil, phone, document — drawn
// strokes, no fills, so they sit on the green ink like the rest of the band.
const ART = {
    stroke: {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    },
};

export function StepWriteArt() {
    return (
        <svg viewBox="0 0 48 48" aria-hidden className="h-14 w-14" {...ART.stroke}>
            <path d="M10 34 30.5 13.5a3 3 0 0 1 4.2 0l2.8 2.8a3 3 0 0 1 0 4.2L17 41l-7 2 2-7Z" />
            <path d="m27.5 16.5 7 7" />
            <path d="M6 44h20" />
        </svg>
    );
}

export function StepReplyArt() {
    return (
        <svg viewBox="0 0 48 48" aria-hidden className="h-14 w-14" {...ART.stroke}>
            <rect x="14" y="4" width="20" height="40" rx="2" />
            <path d="M20 40h8" />
            <path d="m20 22 3 3 6-7" />
        </svg>
    );
}

export function StepQuoteArt() {
    return (
        <svg viewBox="0 0 48 48" aria-hidden className="h-14 w-14" {...ART.stroke}>
            <path d="M12 4h17l7 7v33H12V4Z" />
            <path d="M29 4v7h7" />
            <path d="m18 33 5-5 4 3 6-8" />
            <path d="M33 23v4h-4" />
        </svg>
    );
}
