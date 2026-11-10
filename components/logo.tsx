"use client";

import { motion } from "motion/react";
import { useStill } from "@/components/store/browser-frame";

// The S&N mark as inline SVG, so it can be any colour and can reveal itself: the two green
// layers slide out from behind the letters, back layer first, once per mount. Same outlines as
// public/logo-mark.svg (Tektur 800, SIL OFL; see THIRD-PARTY-NOTICES.md). Reduced motion
// shows the finished mark.
export const SN_PATH =
    "M50 0L50 -168L406 -168L406 -269L40 -302L40 -572L168 -700L590 -700L590 -532L234 -532L234 -441L600 -408L600 -128L472 0Z M684 0L684 -700L854 -700L1098 -305L1098 -700L1276 -700L1276 0L1106 0L862 -395L862 0Z";
// Where each layer rests: the back layers are offset down-right from the front letters.
const LAYERS = [
    { dx: 12, fill: "#15803d" },
    { dx: 6, fill: "#22c55e" },
];
const BASE = "translate(6 64.15) scale(0.06)";
const EASE = [0.16, 1, 0.3, 1] as const;

export function LogoMark({
    className = "",
    ink = "#fff",
    reveal = true,
    delay = 0,
    title = "S&N Devs",
}: {
    className?: string;
    ink?: string;
    reveal?: boolean;
    delay?: number;
    title?: string;
}) {
    const still = useStill();
    const animate = reveal && !still;
    return (
        <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
            {LAYERS.map((l, i) => (
                <motion.g
                    key={l.fill}
                    initial={animate ? { x: 0, y: 0, opacity: 0 } : false}
                    animate={{ x: l.dx, y: l.dx, opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 0.12 + i * 0.08, ease: EASE }}
                >
                    <path transform={BASE} fill={l.fill} d={SN_PATH} />
                </motion.g>
            ))}
            <path transform={BASE} fill={ink} d={SN_PATH} />
        </svg>
    );
}
