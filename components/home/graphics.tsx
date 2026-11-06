"use client";

import { motion, type Transition } from "motion/react";

// Small hand-built SVG scenes for Home's How we work steps, in brand green on black. Each loops while `on` and
// rests on its finished frame otherwise (so reduced motion and idle rows still read).
const G = "#4ade80", LINE = "rgba(255,255,255,.22)", DIM = "rgba(255,255,255,.08)";
const loop = (duration: number, delay = 0, repeatDelay = 1.2): Transition => ({ duration, delay, repeat: Infinity, repeatDelay, ease: "easeInOut" });

type Art = { on: boolean; className?: string };

// ── How we work ──────────────────────────────────────────────────────────────

// Sketch: a pencil traces the page's wireframe.
function SketchArt({ on }: { on: boolean }) {
    const t = on ? loop(3.2, 0, 0.8) : { duration: 0.3 };
    return (
        <>
            <motion.rect x="30" y="20" width="140" height="90" fill="none" stroke={G} strokeDasharray="4 4" initial={false} animate={{ opacity: 1 }} />
            {[[44, 36, 70], [44, 48, 48], [44, 70, 36], [116, 36, 40]].map(([x, y, w], i) => (
                <motion.line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke="rgba(255,255,255,.5)" strokeWidth={i === 0 ? 4 : 2}
                    initial={false} animate={on ? { pathLength: [0, 1, 1] } : { pathLength: 1 }} transition={on ? { ...t, delay: i * 0.4, times: [0, 0.4, 1] } : t} />
            ))}
            <motion.rect x="116" y="46" width="40" height="40" fill="none" stroke="rgba(255,255,255,.5)" initial={false}
                animate={on ? { pathLength: [0, 1, 1] } : { pathLength: 1 }} transition={on ? { ...t, delay: 1.2, times: [0, 0.5, 1] } : t} />
            <motion.g initial={false} animate={on ? { x: [0, 70, 30, 110, 0], y: [0, 0, 34, 40, 0] } : { x: 110, y: 40 }} transition={on ? loop(3.2, 0, 0.8) : t}>
                <path d="M44 36 l-4 -4 l18 -18 l4 4 z" fill={G} />
                <path d="M44 36 l-5 1 l1 -5 z" fill="#fff" />
            </motion.g>
        </>
    );
}

// Build: code lines type in and the brackets snap shut.
function BuildStepArt({ on }: { on: boolean }) {
    const lines = [[60, 60], [70, 90], [70, 50], [60, 74], [70, 40]];
    return (
        <>
            {lines.map(([x, w], i) => (
                <motion.rect key={i} x={x} y={28 + i * 16} height="6" width={w} fill={i === 2 ? G : "rgba(255,255,255,.3)"} initial={false}
                    animate={on ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }} style={{ originX: `${x}px` }}
                    transition={on ? { ...loop(3.4, i * 0.22, 0.2), times: [0, 0.2, 0.85, 1] } : { duration: 0.3 }} />
            ))}
            <motion.path d="M44 30 L26 65 L44 100" fill="none" stroke={G} strokeWidth="3" initial={false}
                animate={on ? { x: [-14, 0, 0, -14] } : { x: 0 }} transition={on ? { ...loop(3.4, 0, 0.2), times: [0, 0.15, 0.85, 1] } : { duration: 0.3 }} />
            <motion.path d="M156 30 L174 65 L156 100" fill="none" stroke={G} strokeWidth="3" initial={false}
                animate={on ? { x: [14, 0, 0, 14] } : { x: 0 }} transition={on ? { ...loop(3.4, 0, 0.2), times: [0, 0.15, 0.85, 1] } : { duration: 0.3 }} />
        </>
    );
}

// Launch: the deploy bar fills, then it's live.
function LaunchArt({ on }: { on: boolean }) {
    const t = on ? { ...loop(3, 0, 0.6), times: [0, 0.6, 0.95, 1] } : { duration: 0.3 };
    return (
        <>
            <text x="30" y="40" fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="ui-monospace,monospace">deploying sn-devs…</text>
            <rect x="30" y="50" width="140" height="10" fill={DIM} stroke={LINE} />
            <motion.rect x="30" y="50" height="10" width="140" fill={G} initial={false} style={{ originX: "30px" }}
                animate={on ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }} transition={t} />
            <motion.g initial={false} style={{ originX: "100px", originY: "92px" }}
                animate={on ? { scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] } : { scale: 1, opacity: 1 }}
                transition={on ? { ...loop(3, 0, 0.6), times: [0, 0.55, 0.68, 0.95, 1] } : { duration: 0.3 }}>
                <circle cx="100" cy="92" r="16" fill="#0a0a0a" stroke={G} strokeWidth="1.5" />
                <path d="M92 92 L98 98 L109 86" fill="none" stroke={G} strokeWidth="2.5" />
                <text x="122" y="96" fill="#fff" fontSize="11" fontFamily="ui-monospace,monospace">Live</text>
            </motion.g>
        </>
    );
}

// Grow: visitors climb and the line keeps going up.
function GrowArt({ on }: { on: boolean }) {
    const bars = [18, 28, 24, 40, 52, 66];
    return (
        <>
            <line x1="26" y1="112" x2="180" y2="112" stroke={LINE} />
            {bars.map((h, i) => (
                <motion.rect key={i} x={34 + i * 24} y={112 - h} width="14" height={h} fill={DIM} stroke={LINE} initial={false}
                    style={{ originY: "112px" }} animate={on ? { scaleY: [0, 1, 1] } : { scaleY: 1 }}
                    transition={on ? { ...loop(3.4, i * 0.12, 0.6), times: [0, 0.3, 1] } : { duration: 0.3 }} />
            ))}
            <motion.path d="M34 92 L58 84 L82 88 L106 66 L130 54 L160 30" fill="none" stroke={G} strokeWidth="2.5" initial={false}
                animate={on ? { pathLength: [0, 1, 1] } : { pathLength: 1 }} transition={on ? { ...loop(3.4, 0.4, 0.6), times: [0, 0.5, 1] } : { duration: 0.3 }} />
            <motion.circle cx="160" cy="30" r="4" fill={G} initial={false}
                animate={on ? { scale: [0, 0, 1.4, 1] } : { scale: 1 }} style={{ originX: "160px", originY: "30px" }}
                transition={on ? { ...loop(3.4, 0.4, 0.6), times: [0, 0.48, 0.58, 0.7] } : { duration: 0.3 }} />
        </>
    );
}

const STEPS: Record<string, (p: { on: boolean }) => React.ReactElement> = { sketch: SketchArt, build: BuildStepArt, launch: LaunchArt, grow: GrowArt };

export function StepArt({ id, on, className = "" }: Art & { id: string }) {
    const Scene = STEPS[id] ?? SketchArt;
    return (
        <svg aria-hidden viewBox="0 0 200 130" className={className}>
            <Scene on={on} />
        </svg>
    );
}
