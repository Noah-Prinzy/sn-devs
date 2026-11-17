"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useStill } from "@/components/store/browser-frame";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import { BrowserWindow } from "@/components/about/browser-window";

// 5 · Close (design/about/about-build-plan.md). An empty window: when it comes into view its
// address types itself, "yourbusiness.ug", and only then does "Yours is next." rise beside it,
// followed by the button and the small print. One thing after another, ending on the button.

const ADDRESS = "yourbusiness.ug";
const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutClose() {
    const still = useStill();
    const frame = useRef<HTMLDivElement>(null);
    const inView = useInView(frame, { once: true, amount: 0.6 });
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (!inView || still) return;
        let n = 0, tick = 0;
        const start = window.setTimeout(() => {
            tick = window.setInterval(() => {
                n += 1;
                setTyped(n);
                if (n >= ADDRESS.length) window.clearInterval(tick);
            }, 70);
        }, 350);
        return () => {
            window.clearTimeout(start);
            window.clearInterval(tick);
        };
    }, [inView, still]);

    const count = still ? ADDRESS.length : typed;
    const done = count >= ADDRESS.length;
    const rise = (delay: number) => ({
        initial: false as const,
        animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7, delay, ease: EASE },
    });

    return (
        <section aria-labelledby="close-title" className="grid min-h-svh place-items-center px-4 py-24 md:px-6">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
                <div ref={frame} className="md:order-2">
                    <BrowserWindow
                        url={
                            <>
                                <span className="sr-only">{ADDRESS}</span>
                                <span aria-hidden className="flex items-center">
                                    <span className={done ? "text-neutral-100" : undefined}>{ADDRESS.slice(0, count)}</span>
                                    <motion.span
                                        className="ml-px inline-block h-3.5 w-px bg-(--brand)"
                                        animate={still ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
                                        transition={still ? { duration: 0 } : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}                                    />
                                </span>
                            </>
                        }
                    >
                        <EmptySite />
                    </BrowserWindow>
                </div>

                <div>
                    <motion.h2 id="close-title" {...rise(0)} className="font-heading text-[clamp(3rem,5.5vw+1vh,6.5rem)] leading-[.98]">
                        Yours is <span className="text-(--brand)">next.</span>
                    </motion.h2>
                    <motion.div {...rise(0.35)} className="mt-8 flex">
                        <Magnet padding={40} magnetStrength={4}>
                            <Button asChild size="lg">
                                <Link href="/contact">Get in touch <ArrowRight /></Link>
                            </Button>
                        </Magnet>
                    </motion.div>
                    <motion.p {...rise(0.6)} className="mt-6 font-mono text-[11px] uppercase tracking-[.2em] text-neutral-500">
                        Fixed quote first · Reply within one working day
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

// The empty site: a faint wireframe waiting to be filled (an echo of the opener's).
function EmptySite() {
    return (
        <div aria-hidden className="relative aspect-16/10 p-5 md:p-8">
            <div className="flex h-full flex-col gap-4 opacity-60">
                <div className="flex items-center justify-between">
                    <span className="h-3 w-16 border border-dashed border-white/15" />
                    <span className="flex gap-3">
                        <span className="h-2 w-8 border border-dashed border-white/15" />
                        <span className="h-2 w-8 border border-dashed border-white/15" />
                        <span className="h-2 w-8 border border-dashed border-white/15" />
                    </span>
                </div>
                <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-4">
                    <div className="flex flex-col justify-center gap-3">
                        <span className="h-4 w-4/5 border border-dashed border-white/15" />
                        <span className="h-4 w-3/5 border border-dashed border-white/15" />
                        <span className="mt-2 h-2 w-full border border-dashed border-white/10" />
                        <span className="h-2 w-4/5 border border-dashed border-white/10" />
                        <span className="mt-2 h-6 w-20 border border-dashed border-white/20" />
                    </div>
                    <div className="border border-dashed border-white/15" />
                </div>
            </div>
            <p className="absolute inset-0 grid place-items-center">
                <span className="bg-[#0e0e0e] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.3em] text-neutral-500">Your site here</span>
            </p>
        </div>
    );
}
