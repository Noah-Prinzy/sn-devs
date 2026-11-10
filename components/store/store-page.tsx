"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, DeviceMobile, DownloadSimple, FileZip, SquaresFour } from "@phosphor-icons/react";
import { ugx, usd } from "@/data/services";
import { CATEGORIES, TEMPLATES, TIERS, priceOf, type Category } from "@/data/templates";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/DecryptedText";
import Magnet from "@/components/Magnet";
import { pinStops, sectionStops, useScrollAnchors } from "@/components/use-scroll-anchors";
import { TemplateCard } from "@/components/store/template-card";
import { DeviceStage } from "@/components/store/device-stage";
import { PriceOdometer } from "@/components/store/price-odometer";
import { useStill } from "@/components/store/browser-frame";

const GLYPHS = "01<>/{}[]=+*#$";
const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Where each floating window ends up, as offsets from the centre (vw, vh), its width (vw),
// tilt and depth. Deeper windows are smaller, softer and drift less. `phone` = also on phones.
const WALL: { x: number; y: number; w: number; r: number; z: number; phone?: boolean }[] = [
    { x: -40, y: -30, w: 17, r: -6, z: 0.9, phone: true },
    { x: -14, y: -38, w: 13, r: 3, z: 0.6 },
    { x: 15, y: -36, w: 15, r: -2, z: 0.75, phone: true },
    { x: 40, y: -26, w: 18, r: 5, z: 1 },
    { x: -46, y: 2, w: 13, r: 4, z: 0.6 },
    { x: 46, y: 6, w: 14, r: -5, z: 0.7, phone: true },
    { x: -36, y: 32, w: 19, r: 3, z: 1, phone: true },
    { x: -9, y: 40, w: 14, r: -3, z: 0.7 },
    { x: 17, y: 38, w: 17, r: 4, z: 0.85, phone: true },
    { x: 41, y: 33, w: 15, r: -4, z: 0.8 },
    { x: -26, y: -12, w: 10, r: -8, z: 0.45 },
    { x: 27, y: -10, w: 10, r: 7, z: 0.45, phone: true },
    { x: -24, y: 16, w: 9, r: 6, z: 0.4 },
    { x: 26, y: 18, w: 9, r: -7, z: 0.4 },
    { x: 0, y: -26, w: 8, r: 2, z: 0.35, phone: true },
];

function FloatingWindow({ slug, i, p, still }: { slug: string; i: number; p: MotionValue<number>; still: boolean }) {
    const w = WALL[i];
    // Gathered behind the word at first, then the wall drifts towards you and fans out.
    const out = (v: number) => (still ? 1 : 0.5 + 0.5 * easeOut(span(v, 0, 0.7)));
    const x = useTransform(p, (v) => `${w.x * out(v)}vw`);
    const y = useTransform(p, (v) => `${w.y * out(v)}vh`);
    const scale = useTransform(p, (v) => (still ? 1 : (0.55 + 0.45 * out(v)) * (0.85 + 0.25 * w.z * span(v, 0, 0.7))));
    const opacity = useTransform(p, (v) => (still ? 0.5 : (0.35 + 0.65 * w.z) * (1 - 0.35 * span(v, 0.7, 0.95))));
    const filter = `blur(${((1 - w.z) * 2.2).toFixed(1)}px)`;
    return (
        <motion.div
            style={{ x, y, scale, opacity, filter, width: `${w.w}vw`, rotate: w.r, zIndex: Math.round(w.z * 10) }}
            className={`absolute left-1/2 top-1/2 min-w-37.5 ${w.phone ? "" : "hidden md:block"}`}
        >
            <motion.div
                animate={still ? undefined : { y: [0, -10 * w.z, 0] }}
                transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="-translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/10 bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)]"
            >
                <div className="flex gap-1 border-b border-white/10 px-2 py-1.5">{[0, 1, 2].map((k) => <span key={k} className="size-1.5 bg-white/20" />)}</div>
                <div className="relative aspect-16/10">
                    <Image src={`/assets/store/${slug}/desktop.png`} alt="" fill sizes="(min-width: 768px) 18vw, 30vw" priority={i < 2} className="object-cover object-top" />
                </div>
            </motion.div>
        </motion.div>
    );
}

const FEATURED = TEMPLATES.filter((t) => t.tier === "premium");

// Pick → Pay → Download, played on a little phone. Loops while it's on screen.
function PayPhone() {
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { margin: "-20% 0px" });
    const reduce = useStill();
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (!seen || reduce) return;
        const t = setInterval(() => setStep((s) => (s + 1) % 3), 2400);
        return () => clearInterval(t);
    }, [seen, reduce]);
    const screens = [
        <div key="pin" className="flex h-full flex-col justify-center gap-3 p-4 text-center">
            <DeviceMobile className="mx-auto size-7 text-(--brand)" />
            <p className="text-[11px] uppercase tracking-[.2em] text-neutral-400">Mobile Money</p>
            <p className="font-heading text-lg leading-tight">Approve<br />UGX 180K?</p>
            <div className="mx-auto flex gap-1.5">{[0, 1, 2, 3].map((k) => (
                <motion.span key={k} initial={{ scale: 0.4, opacity: 0.2 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + k * 0.25 }} className="size-2.5 rounded-full bg-white" />
            ))}</div>
        </div>,
        <div key="ok" className="grid h-full place-items-center p-4 text-center">
            <div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="mx-auto grid size-14 place-items-center rounded-full bg-(--brand) text-(--brand-fg)">
                    <Check weight="bold" className="size-7" />
                </motion.div>
                <p className="mt-3 font-heading text-lg">Paid</p>
                <p className="text-[11px] text-neutral-400">Receipt sent</p>
            </div>
        </div>,
        <div key="zip" className="grid h-full place-items-center p-4 text-center">
            <div>
                <div className="relative mx-auto h-16 w-20">
                    <div className="absolute inset-x-0 bottom-0 h-11 border border-white/20 bg-white/5" />
                    <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 16 }} className="absolute left-1/2 top-0 -ml-4">
                        <FileZip className="size-8 text-(--brand)" />
                    </motion.div>
                </div>
                <p className="mt-3 font-heading text-lg">Downloading</p>
                <div className="mx-auto mt-2 h-1 w-24 overflow-hidden bg-white/10">
                    <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.8, ease: "easeInOut" }} className="h-full bg-(--brand)" />
                </div>
            </div>
        </div>,
    ];
    return (
        <div ref={ref} className="mx-auto w-47.5 rounded-[30px] border border-white/15 bg-[#151515] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]">
            <div className="relative aspect-9/17 overflow-hidden rounded-[24px] bg-[#0a0a0a]">
                <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/10" />
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                        {screens[step]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

const STEPS = [
    { icon: SquaresFour, title: "Pick", body: "Browse the editions and open one to see its pages, what's inside and what it's built with." },
    { icon: DeviceMobile, title: "Pay", body: "MTN MoMo or Airtel Money: approve the prompt on your phone. Card checkout is coming too." },
    { icon: DownloadSimple, title: "Download", body: "The zip downloads the moment the payment lands, with the full source and a setup guide." },
];

// The Store: a wall of live screens, then the catalogue, a featured edition and how buying works.
export function StorePage() {
    const reduce = useStill();
    const hero = useRef<HTMLElement>(null);
    const catalogue = useRef<HTMLElement>(null);
    const featured = useRef<HTMLElement>(null);
    const how = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    const word = useTransform(scrollYProgress, (v) => 0.82 + 0.18 * span(v, 0, 1));
    const lede = useTransform(scrollYProgress, (v) => span(v, 0.6, 0.9));
    const veil = useTransform(scrollYProgress, (v) => 0.35 + 0.5 * span(v, 0.6, 0.95));

    // Anchors: the wall of screens (start and end), the catalogue top (the grid scrolls free),
    // the featured edition and how buying works, one screen each.
    useScrollAnchors(() => [...pinStops(hero.current, [0, 1]), ...sectionStops([catalogue, featured, how])]);

    const [cat, setCat] = useState<Category | "all">("all");
    const shown = cat === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);
    const rail = [{ id: "all" as const, name: "All", count: TEMPLATES.length }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name, count: TEMPLATES.filter((t) => t.category === c.id).length }))];

    // The featured band swaps to the next Premium edition every few seconds.
    const [fi, setFi] = useState(0);
    const [held, setHeld] = useState(false);
    useEffect(() => {
        if (held || reduce) return;
        const t = setInterval(() => setFi((i) => (i + 1) % FEATURED.length), 5200);
        return () => clearInterval(t);
    }, [held, reduce]);
    const f = FEATURED[fi];

    return (
        <MotionConfig reducedMotion="user">
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100">
                {/* 1 · The wall of screens */}
                <section ref={hero} className="relative h-[220svh] motion-reduce:h-svh" aria-labelledby="store-title">
                    <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
                        <div aria-hidden className="pointer-events-none absolute inset-0">
                            {TEMPLATES.map((t, i) => <FloatingWindow key={t.slug} slug={t.slug} i={i} p={scrollYProgress} still={reduce} />)}
                        </div>
                        <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,.9)_0%,rgba(10,10,10,.55)_35%,transparent_70%)]" />
                        <div className="relative z-30 flex flex-col items-center px-4">
                            <p className="text-xs font-semibold uppercase tracking-[.3em] text-(--brand)">
                                <DecryptedText text={`${TEMPLATES.length} S&N Editions · ${CATEGORIES.length} categories`} animateOn="view" sequential characters={GLYPHS} speed={40} />
                            </p>
                            <motion.h1
                                id="store-title"
                                style={{ scale: word }}
                                className="mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text font-heading text-[min(24vw,30vh)] font-extrabold leading-none tracking-tight text-transparent drop-shadow-[0_20px_30px_rgba(0,0,0,.6)] md:text-[min(21vw,30vh)]"
                            >
                                STORE
                            </motion.h1>
                        </div>
                        <motion.div style={{ opacity: reduce ? 1 : lede }} className="needs-js absolute bottom-[10vh] z-30 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,.92)_35%,transparent_72%)] px-10 py-8 text-center short:bottom-[2vh] short:py-3">
                            <p className="font-heading text-3xl md:text-5xl short:text-xl">Ready-made. Restyled. <span className="italic text-(--brand)">Yours today.</span></p>
                            <p className="mt-3 text-neutral-400 short:mt-1 short:text-sm">Websites, dashboards, apps and systems. Buy once, download straight away.</p>
                        </motion.div>
                    </div>
                </section>

                {/* 2 · The catalogue */}
                <section ref={catalogue} className="mx-auto max-w-7xl px-4 py-24 md:px-6" aria-labelledby="catalogue-title">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[.3em] text-neutral-400">The catalogue</p>
                            <h2 id="catalogue-title" className="mt-3 max-w-xl font-heading text-5xl md:text-6xl">Templates, ready to ship.</h2>
                            <p className="mt-4 max-w-lg text-neutral-400">Restyled, tested and documented by our team. Hover a card to scroll through its page.</p>
                        </div>
                        <div role="tablist" aria-label="Categories" className="flex flex-wrap gap-x-6 gap-y-3 lg:max-w-xl lg:justify-end">
                            {rail.map((r) => (
                                <button
                                    key={r.id}
                                    role="tab"
                                    aria-selected={cat === r.id}
                                    onClick={() => setCat(r.id)}
                                    className={`flex items-baseline gap-2 py-1 text-left font-heading text-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-(--brand) ${cat === r.id ? "text-white" : "text-neutral-500 hover:text-neutral-200"}`}
                                >
                                    <span className={`size-2 shrink-0 -translate-y-0.5 rounded-full transition-all ${cat === r.id ? "bg-(--brand) shadow-[0_0_12px_var(--brand)]" : "bg-white/10"}`} />
                                    <DecryptedText text={r.name} animateOn="hover" characters={GLYPHS} speed={40} maxIterations={8} />
                                    <sup className={`font-sans text-[11px] tabular-nums ${cat === r.id ? "text-(--brand)" : ""}`}>{r.count}</sup>
                                </button>
                            ))}
                        </div>
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        {cat !== "all" && (
                            <motion.p key={cat} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 text-sm text-neutral-400">
                                {CATEGORIES.find((c) => c.id === cat)?.blurb}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {shown.map((t, i) => (
                                <motion.div
                                    key={t.slug}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 220, damping: 28, delay: Math.min(i, 6) * 0.04 }}
                                >
                                    <TemplateCard t={t} index={i} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <p className="mt-14 text-sm text-neutral-500">Prices in UGX; USD is a rough guide. Want it set up and customised for you? See Ready-Made Templates on the <Link href="/services" className="underline-offset-4 hover:text-neutral-200 hover:underline">Services page</Link>.</p>
                </section>

                {/* 3 · Featured edition */}
                <section
                    ref={featured}
                    onPointerEnter={() => setHeld(true)}
                    onPointerLeave={() => setHeld(false)}
                    className="relative flex min-h-svh items-center overflow-hidden bg-(--brand) px-4 py-24 text-(--brand-fg) md:px-6"
                    aria-labelledby="featured-title"
                >
                    <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[.3em]">Premium editions</p>
                            <AnimatePresence mode="wait">
                                <motion.div key={f.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                                    <h2 id="featured-title" className="mt-3 font-heading text-5xl md:text-6xl">{f.name}</h2>
                                    <p className="mt-4 max-w-md text-lg opacity-80">{f.tagline}</p>
                                    <p className="mt-8 font-heading text-4xl">
                                        <PriceOdometer text={ugx(priceOf(f))} />
                                        <span className="ml-3 font-sans text-sm opacity-70">{usd(priceOf(f))} · {TIERS[f.tier]}</span>
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Magnet padding={40} magnetStrength={4}>
                                    <Button asChild size="lg" className="bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]">
                                        <Link href={`/store/${f.slug}`}>See {f.name} <ArrowRight /></Link>
                                    </Button>
                                </Magnet>
                            </div>
                            <div className="mt-10 flex gap-2" role="tablist" aria-label="Premium editions">
                                {FEATURED.map((x, i) => (
                                    // The bar is 6 px tall; the button around it is the 24 px target (WCAG 2.5.8).
                                    <button key={x.slug} role="tab" aria-selected={i === fi} aria-label={x.name} onClick={() => setFi(i)}
                                        className="group/tab flex h-6 min-w-6 items-center outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 focus-visible:ring-offset-(--brand)">
                                        <span className={`h-1.5 transition-all ${i === fi ? "w-10 bg-[#0a0a0a]" : "w-4 bg-[#0a0a0a]/25 group-hover/tab:bg-[#0a0a0a]/50"}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="relative perspective-[1600px]">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                    key={f.slug}
                                    initial={{ opacity: 0, x: 80, rotateY: -14, scale: 0.94 }}
                                    animate={{ opacity: 1, x: 0, rotateY: -4, scale: 1 }}
                                    exit={{ opacity: 0, x: -60, rotateY: 10, scale: 0.92 }}
                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                >
                                    <DeviceStage slug={f.slug} name={f.name} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* 4 · How buying works */}
                <section ref={how} className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 py-24 md:px-6" aria-labelledby="how-title">
                    <p className="text-xs uppercase tracking-[.3em] text-neutral-400">How buying works</p>
                    <h2 id="how-title" className="mt-3 max-w-xl font-heading text-5xl md:text-6xl">Three steps. About a minute.</h2>
                    <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
                        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
                            <svg aria-hidden className="pointer-events-none absolute left-0 top-7 hidden h-4 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 4">
                                <motion.path d="M 4 2 L 96 2" stroke="var(--brand)" strokeWidth="0.4" strokeDasharray="1.2 1" fill="none"
                                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20% 0px" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
                            </svg>
                            {STEPS.map((s, i) => (
                                <motion.li key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ delay: 0.2 + i * 0.35 }} className="relative">
                                    <div className="relative grid size-14 place-items-center border border-white/15 bg-[#0a0a0a]">
                                        <s.icon className="size-6 text-(--brand)" />
                                        <span className="absolute -right-2 -top-2 grid size-5 place-items-center bg-(--brand) text-[11px] font-semibold text-(--brand-fg)">{i + 1}</span>
                                    </div>
                                    <h3 className="mt-5 font-heading text-3xl">{s.title}</h3>
                                    <p className="mt-2 text-sm text-neutral-400">{s.body}</p>
                                </motion.li>
                            ))}
                        </ol>
                        <PayPhone />
                    </div>
                </section>
            </main>
        </MotionConfig>
    );
}
