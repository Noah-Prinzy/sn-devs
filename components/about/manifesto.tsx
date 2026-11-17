"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useStill } from "@/components/store/browser-frame";
import { MANIFESTO } from "@/components/about/about-data";

// 3 · Manifesto (design/about/about-build-plan.md). The line lights up word by word as it
// scrolls up the screen, so reading pace and scroll pace are the same thing; the key words
// light green. Only once the line is fully lit does the follow-up fade in under it.

const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const WORDS = MANIFESTO.line.split(" ");
const GREEN = new Set(MANIFESTO.green);

export function Manifesto() {
    const line = useRef<HTMLParagraphElement>(null);
    const follow = useRef<HTMLParagraphElement>(null);
    const still = useStill();
    // The line: dark when its top is low on the screen, fully lit by the time its last row
    // reaches the middle.
    const { scrollYProgress: lit } = useScroll({ target: line, offset: ["start 0.8", "end 0.5"] });
    // The follow-up starts where the line finishes (its top just under the middle).
    const { scrollYProgress: after } = useScroll({ target: follow, offset: ["start 0.6", "start 0.42"] });
    const followIn = useTransform(after, (v) => span(v, 0, 1));
    const followY = useTransform(after, (v) => 16 * (1 - span(v, 0, 1)));

    return (
        <section aria-labelledby="manifesto-title" className="mx-auto max-w-5xl px-4 py-[18svh] md:px-6 md:py-[22svh]">
            <h2 id="manifesto-title" className="font-mono! text-xs uppercase tracking-[.3em] text-(--brand)">03 · What we believe</h2>
            <p ref={line} className="mt-8 font-heading text-[clamp(1.85rem,2.6vw+1.6vh,4rem)] leading-[1.14] text-neutral-50">
                {WORDS.map((w, i) => (
                    <Word key={i} word={w} i={i} lit={lit} still={still} />
                ))}
            </p>
            <motion.p
                ref={follow}
                style={{ opacity: still ? 1 : followIn, y: still ? 0 : followY }}
                className="mt-12 max-w-2xl border-l-2 border-(--brand) pl-5 text-lg leading-relaxed text-neutral-300 md:text-xl"
            >
                {MANIFESTO.follow}
            </motion.p>
        </section>
    );
}

function Word({ word, i, lit, still }: { word: string; i: number; lit: MotionValue<number>; still: boolean }) {
    // Each word owns a short, overlapping slice of the progress, so the light reads like a cursor.
    const a = (i / WORDS.length) * 0.92;
    const opacity = useTransform(lit, (v) => 0.15 + 0.85 * span(v, a, a + 0.08));
    return (
        <>
            <motion.span style={{ opacity: still ? 1 : opacity }} className={GREEN.has(word) ? "text-(--brand)" : undefined}>
                {word}
            </motion.span>
            {i < WORDS.length - 1 ? " " : null}
        </>
    );
}
