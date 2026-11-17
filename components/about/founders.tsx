"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useStill } from "@/components/store/browser-frame";
import { BrowserWindow } from "@/components/about/browser-window";
import { FOUNDERS } from "@/components/about/about-data";

// 2 · Who we are (design/about/about-build-plan.md). The opener's one window becomes two: they
// arrive stacked as one in the centre and slide apart as the section scrolls in, then Shaun's
// name and words rise, then Noah's, left to right, so the eye reads them in order.
// Phone: one column, each window rises on its own as it comes into view.

const WIDE = "(min-width: 768px)";
const onWide = (cb: () => void) => {
    const m = window.matchMedia(WIDE);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
};
const useWide = () => useSyncExternalStore(onWide, () => window.matchMedia(WIDE).matches, () => true);

const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
// Half of (a column + the 2rem gap): how far each window travels from the shared centre.
const toCentre = (k: number) => `calc(${k * 50}% + ${k}rem)`;

export function Founders() {
    // Measured on the pair of windows (not the heading above them) so the split plays on screen.
    const ref = useRef<HTMLDivElement>(null);
    const still = useStill();
    const wide = useWide();
    const linked = wide && !still;
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] });
    // Function transforms (as Services/Contact): the split, then each founder's words in turn.
    const split = useTransform(p, (v) => easeOut(span(v, 0.12, 0.62)));
    const leftX = useTransform(split, (s) => toCentre(1 - s));
    const rightX = useTransform(split, (s) => toCentre(-(1 - s)));
    const leftTilt = useTransform(split, (s) => -4 * (1 - s));
    const shaunIn = useTransform(p, (v) => span(v, 0.58, 0.8));
    const noahIn = useTransform(p, (v) => span(v, 0.78, 0.98));
    const shown = useMotionValue(1); // phone and reduced motion: the words simply sit there

    return (
        <section aria-labelledby="founders-title" className="relative mx-auto max-w-5xl px-4 pb-24 pt-8 md:px-6 md:pb-28 md:pt-10">
            <motion.div
                key={String(still)}
                initial={still ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">02 · Who we are</p>
                <h2 id="founders-title" className="mt-4 max-w-3xl font-heading text-[clamp(2.25rem,3vw+2vh,4.25rem)] leading-[1.04]">
                    Two people. <span className="text-(--brand)">No middle layer.</span>
                </h2>
            </motion.div>

            <div ref={ref} className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
                {FOUNDERS.map((f, i) => {
                    const left = i === 0;
                    return (
                        // Keyed by mode: the screen size and motion setting are only known after
                        // hydration, and a fresh mount drops any transform left from the other mode.
                        <motion.div
                            key={`${f.id}-${wide}-${still}`}
                            style={linked ? { x: left ? leftX : rightX, rotate: left ? leftTilt : 0 } : undefined}
                            initial={still || wide ? false : { opacity: 0, y: 40 }}
                            whileInView={still || wide ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={left ? "relative z-0" : "relative z-10"}
                        >
                            <Founder f={f} reveal={linked ? (left ? shaunIn : noahIn) : shown} />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

function Founder({ f, reveal }: { f: (typeof FOUNDERS)[number]; reveal: MotionValue<number> }) {
    const y = useTransform(reveal, (t) => 18 * (1 - t));
    return (
        <BrowserWindow url={`sn-devs.ug/${f.id}`}>
            <div className="relative aspect-4/5 overflow-hidden bg-[radial-gradient(ellipse_at_50%_28%,rgba(74,222,128,.16),transparent_62%),linear-gradient(180deg,#171717,#0b0b0b)] md:aspect-square">
                <Image
                    src={f.photo.src}
                    alt={`${f.name}, ${f.role}`}
                    fill
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover object-[50%_6%]"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
                <motion.div style={{ opacity: reveal, y }} className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[.25em] text-(--brand)">{f.role}</p>
                    <h3 className="mt-2 font-heading text-[clamp(2.25rem,3.4vw,3.5rem)] leading-none">{f.name}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-300 md:text-base">{f.bio}</p>
                </motion.div>
            </div>
        </BrowserWindow>
    );
}
