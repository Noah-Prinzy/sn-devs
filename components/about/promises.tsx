"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, type Transition } from "motion/react";
import { useStill } from "@/components/store/browser-frame";
import { glideTo } from "@/components/use-scroll-anchors";
import { BrowserWindow } from "@/components/about/browser-window";
import { PROMISES } from "@/components/about/about-data";

// 4 · How we work (design/about/about-build-plan.md). Pinned: one window, four tabs. Scrolling
// moves the active tab along (the underline slides to it), the panel crossfades, and the new
// panel's one small drawing plays once. One promise on screen at a time.
// Reduced motion: no pin, the four panels stacked in one window, drawings at rest.

type Promise_ = (typeof PROMISES)[number];
const EASE = [0.22, 1, 0.36, 1] as const;

export function Promises() {
    const still = useStill();
    return still ? <StackedPromises /> : <PinnedPromises />;
}

function Kicker() {
    return (
        <h2 id="promises-title" className="font-mono! text-xs uppercase tracking-[.3em] text-(--brand)">
            04 · How we work
        </h2>
    );
}

function PinnedPromises() {
    const ref = useRef<HTMLElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const seen = useInView(stage, { amount: 0.5 });
    const [active, setActive] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    // Four equal stretches of the pin, one per promise.
    useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(3, Math.max(0, Math.floor(v * 4)))));

    // A tab click travels to just inside that promise's stretch of the pin.
    const go = (i: number) => {
        const el = ref.current;
        if (!el) return;
        const y = el.offsetTop + (el.offsetHeight - window.innerHeight) * ((i + 0.12) / 4);
        if (!glideTo(y)) window.scrollTo({ top: y, behavior: "smooth" });
    };
    const onKey = (e: KeyboardEvent) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const next = (active + d + 4) % 4;
        document.getElementById(`promise-tab-${PROMISES[next].id}`)?.focus();
        go(next);
    };

    return (
        <section ref={ref} aria-labelledby="promises-title" className="relative h-[300svh]">
            <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-4 pb-6 pt-(--nav-h) md:px-6">
                <div ref={stage} className="mx-auto w-full max-w-5xl">
                    <Kicker />
                    <BrowserWindow
                        url="sn-devs.ug/how-we-work"
                        right={<span className="shrink-0 font-mono text-[11px] tabular-nums text-neutral-500">0{active + 1} / 04</span>}
                        className="mt-5"
                    >
                        <div role="tablist" aria-label="How we work" onKeyDown={onKey} className="relative grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
                            {PROMISES.map((pr, i) => {
                                const on = i === active;
                                return (
                                    <button
                                        key={pr.id}
                                        id={`promise-tab-${pr.id}`}
                                        role="tab"
                                        type="button"
                                        aria-selected={on}
                                        aria-controls={`promise-panel-${pr.id}`}
                                        tabIndex={on ? 0 : -1}
                                        onClick={() => go(i)}
                                        className={`flex min-h-11 items-center gap-2 border-white/10 px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[.08em] md:tracking-[.14em] transition-colors duration-300 odd:border-r max-md:border-b max-md:nth-[n+3]:border-b-0 md:border-r md:px-4 md:last:border-r-0 md:text-xs ${on ? "text-neutral-50 max-md:bg-white/4 max-md:shadow-[inset_0_-2px_0_var(--brand)]" : "text-neutral-500 hover:text-neutral-300"}`}
                                    >
                                        <span className={on ? "text-(--brand)" : undefined}>0{i + 1}</span>
                                        <span className="leading-tight">{pr.title}</span>
                                    </button>
                                );
                            })}
                            {/* The underline: slides to the active tab (wide screens; on a phone the tab itself lights). */}
                            <motion.span
                                aria-hidden
                                className="absolute -bottom-px left-0 hidden h-0.5 w-1/4 bg-(--brand) md:block"
                                animate={{ x: `${active * 100}%` }}
                                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                            />
                        </div>
                        <div className="grid">
                            {PROMISES.map((pr, i) => (
                                <Panel key={pr.id} pr={pr} i={i} on={i === active} play={seen && i === active} />
                            ))}
                        </div>
                    </BrowserWindow>
                </div>
            </div>
        </section>
    );
}

function Panel({ pr, i, on, play }: { pr: Promise_; i: number; on: boolean; play: boolean }) {
    return (
        <motion.div
            role="tabpanel"
            id={`promise-panel-${pr.id}`}
            aria-labelledby={`promise-tab-${pr.id}`}
            inert={!on}
            initial={false}
            // The old panel leaves first, then the new one arrives: one thing moving at a time.
            animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={on ? { duration: 0.45, delay: 0.18, ease: EASE } : { duration: 0.2 }}
            className="col-start-1 row-start-1"
        >
            <PanelBody pr={pr} i={i} play={play} />
        </motion.div>
    );
}

function PanelBody({ pr, i, play, still = false }: { pr: Promise_; i: number; play: boolean; still?: boolean }) {
    const words = pr.title.split(" ");
    const last = words.pop();
    return (
        <div className="grid items-center gap-5 p-5 md:grid-cols-[1.15fr_1fr] md:gap-12 md:p-12 short:md:py-8">
            <div>
                <p className="font-mono text-[11px] uppercase tracking-[.25em] text-neutral-500">Promise 0{i + 1}</p>
                <h3 className="mt-3 font-heading text-[clamp(1.85rem,3.2vw+.6vh,3.5rem)] leading-[1.05]">
                    {words.join(" ")} <span className="text-(--brand)">{last}.</span>
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-neutral-300 md:text-lg">{pr.text}</p>
            </div>
            <div className="order-first h-40 border border-white/10 bg-[#0b0b0b] md:order-last md:h-auto md:aspect-3/2">
                <Drawing id={pr.id} play={play} still={still} />
            </div>
        </div>
    );
}

function StackedPromises() {
    return (
        <section aria-labelledby="promises-title" className="px-4 py-24 md:px-6">
            <div className="mx-auto max-w-5xl">
                <Kicker />
                <BrowserWindow url="sn-devs.ug/how-we-work" className="mt-5" bodyClassName="divide-y divide-white/10">
                    {PROMISES.map((pr, i) => (
                        <PanelBody key={pr.id} pr={pr} i={i} play still />
                    ))}
                </BrowserWindow>
            </div>
        </section>
    );
}

// ---- The four drawings. Each plays once when its tab becomes active, and quietly resets after
// its panel has faded out so it can play again next time. ----

type DrawProps = { play: boolean; still: boolean };

function Drawing({ id, ...p }: { id: string } & DrawProps) {
    if (id === "quote") return <Stamp {...p} />;
    if (id === "builders") return <Line {...p} />;
    if (id === "timelines") return <Week {...p} />;
    return <Pulse {...p} />;
}

// Shared: variants are "off" (start) and "on" (end); resets wait for the fade-out.
const reset: Transition = { duration: 0, delay: 0.3 };
const states = (play: boolean, still: boolean) => ({ initial: still ? (false as const) : ("off" as const), animate: play ? "on" : "off" });
const svg = "h-full w-full font-mono";

function Stamp({ play, still }: DrawProps) {
    const s = states(play, still);
    return (
        <svg viewBox="0 0 240 160" aria-hidden className={svg}>
            {/* A quote sheet */}
            <rect x="62" y="14" width="116" height="132" fill="#121212" stroke="rgba(255,255,255,.16)" />
            <rect x="76" y="30" width="44" height="5" fill="rgba(255,255,255,.35)" />
            {[46, 56, 66].map((y, k) => (
                <rect key={y} x="76" y={y} width={[88, 72, 80][k]} height="3" fill="rgba(255,255,255,.12)" />
            ))}
            <line x1="76" y1="124" x2="164" y2="124" stroke="rgba(255,255,255,.12)" />
            <text x="76" y="137" fontSize="8" fill="rgba(255,255,255,.4)">TOTAL</text>
            <text x="164" y="137" fontSize="8" textAnchor="end" fill="rgba(255,255,255,.7)">UGX ···</text>
            {/* The stamp lands */}
            <motion.g
                {...s}
                variants={{
                    off: { opacity: 0, scale: 1.9, rotate: -2, transition: reset },
                    on: { opacity: 1, scale: 1, rotate: -12, transition: { type: "spring", stiffness: 380, damping: 17, delay: 0.45 } },
                }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
                <rect x="78" y="78" width="84" height="30" fill="rgba(10,10,10,.6)" stroke="var(--brand)" strokeWidth="2.5" />
                <text x="120" y="98.5" fontSize="15" fontWeight="700" letterSpacing="4" textAnchor="middle" fill="var(--brand)">FIXED</text>
            </motion.g>
        </svg>
    );
}

function Line({ play, still }: DrawProps) {
    const s = states(play, still);
    const draw = (delay: number) => ({
        off: { pathLength: 0, opacity: 0, transition: reset },
        on: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.8, delay, ease: EASE }, opacity: { duration: 0.01, delay } } },
    });
    return (
        <svg viewBox="0 0 240 160" aria-hidden className={svg}>
            {[{ x: 50, l: "S" }, { x: 190, l: "N" }].map((c) => (
                <g key={c.l}>
                    <circle cx={c.x} cy="80" r="23" fill="#151515" stroke="rgba(255,255,255,.22)" />
                    <text x={c.x} y="88" fontSize="22" textAnchor="middle" fill="#f5f5f5" className="font-heading">{c.l}</text>
                </g>
            ))}
            {/* There and back: a message one way, a reply the other, nothing in between. */}
            <motion.path {...s} variants={draw(0.4)} d="M74 72 Q120 38 166 72" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
            <motion.path {...s} variants={draw(1.15)} d="M166 88 Q120 122 74 88" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinecap="round" />
            <motion.g
                {...s}
                variants={{ off: { opacity: 0, transition: reset }, on: { opacity: 1, transition: { duration: 0.4, delay: 1.9 } } }}
            >
                <rect x="96" y="70" width="48" height="20" fill="#0a0a0a" stroke="rgba(74,222,128,.5)" />
                <text x="120" y="84" fontSize="9" textAnchor="middle" fill="var(--brand)">direct</text>
            </motion.g>
        </svg>
    );
}

function Week({ play, still }: DrawProps) {
    const s = states(play, still);
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    return (
        <svg viewBox="0 0 240 160" aria-hidden className={svg}>
            {days.map((d, k) => (
                <text key={k} x={30 + k * 30} y="66" fontSize="9" textAnchor="middle" fill="rgba(255,255,255,.4)">{d}</text>
            ))}
            <rect x="22" y="76" width="196" height="12" fill="none" stroke="rgba(255,255,255,.18)" />
            <motion.rect
                {...s}
                x="24" y="78" width="192" height="8" fill="var(--brand)"
                variants={{ off: { scaleX: 0, transition: reset }, on: { scaleX: 1, transition: { duration: 1.3, delay: 0.4, ease: [0.45, 0, 0.2, 1] } } }}
                style={{ transformBox: "fill-box", transformOrigin: "left center" }}
            />
            <motion.g
                {...s}
                variants={{ off: { opacity: 0, y: 6, transition: reset }, on: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 1.75, ease: EASE } } }}
            >
                <line x1="217" y1="92" x2="217" y2="104" stroke="var(--brand)" strokeWidth="1.5" />
                <text x="218" y="118" fontSize="11" textAnchor="end" fill="var(--brand)">1 week</text>
            </motion.g>
            <text x="22" y="118" fontSize="9" fill="rgba(255,255,255,.4)">day 1</text>
        </svg>
    );
}

function Pulse({ play, still }: DrawProps) {
    const s = states(play, still);
    return (
        <svg viewBox="0 0 240 160" aria-hidden className={svg}>
            <line x1="12" y1="90" x2="228" y2="90" stroke="rgba(255,255,255,.08)" />
            <motion.path
                {...s}
                d="M12 90 H66 L76 90 L86 52 L98 124 L110 70 L118 90 H150 L160 90 L168 66 L178 110 L186 90 H222"
                fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                variants={{
                    off: { pathLength: 0, opacity: 0, transition: reset },
                    on: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.6, delay: 0.4, ease: "linear" }, opacity: { duration: 0.01, delay: 0.4 } } },
                }}
            />
            <motion.circle
                {...s}
                cx="222" cy="90" r="4" fill="var(--brand)"
                variants={{ off: { opacity: 0, transition: reset }, on: { opacity: 1, transition: { duration: 0.2, delay: 2 } } }}
            />
            <motion.g
                {...s}
                variants={{ off: { opacity: 0, transition: reset }, on: { opacity: 1, transition: { duration: 0.4, delay: 2.1 } } }}
            >
                <text x="222" y="36" fontSize="9" textAnchor="end" fill="var(--brand)">still running</text>
            </motion.g>
            <text x="12" y="36" fontSize="9" fill="rgba(255,255,255,.4)">after launch</text>
        </svg>
    );
}
