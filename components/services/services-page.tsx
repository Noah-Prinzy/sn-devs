"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_GROUPS, WEBSITE_TIERS, ugx, usd } from "@/data/services";
import { useScrollAnchors } from "@/components/use-scroll-anchors";
import { TechBubbles } from "@/components/services/tech-bubbles";
import { ArtStage } from "@/components/services/art-stage";

// A server aisle gives way to a circuit board behind a large "SERVICES"; then a switchboard:
// every service and its starting price on the left, the picked one on the right, its art
// on a plinth (components/services/art-stage.tsx).
const CUT = "/assets/services/cutouts";
// `rim` outlines dark art in light so it doesn't vanish into the black page.
const ART: Record<string, { src: string; w: number; h: number; rim?: boolean }> = {
    launch: { src: `${CUT}/laptop.png`, w: 1331, h: 987 },
    websites: { src: `${CUT}/devices.png`, w: 1295, h: 1344 },
    apps: { src: `${CUT}/apps.png`, w: 553, h: 490 },
    templates: { src: `${CUT}/templates.png`, w: 732, h: 616 },
    "care-plans": { src: `${CUT}/care-plans.png`, w: 957, h: 808 },
    upgrades: { src: `${CUT}/upgrades.png`, w: 913, h: 852 },
    video: { src: `${CUT}/video-setup.png`, w: 736, h: 791, rim: true },
    decks: { src: `${CUT}/decks.png`, w: 556, h: 586 },
    ads: { src: `${CUT}/ads-social.png`, w: 725, h: 727 },
};
const ALL = SERVICE_GROUPS.flatMap((g) => g.services);
export function ServicesPage() {
    const hero = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    // Function transforms keep these on the JS path: the browser's native scroll timeline ends
    // its animation at exactly 100% and drops back to the start, and the anchor lands right there.
    const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
    // The corridor pushes in while the word grows, then fades as the horizon sharpens behind it.
    const corridorScale = useTransform(scrollYProgress, (v) => 1 + 0.35 * span(v, 0, 0.6));
    const corridorFade = useTransform(scrollYProgress, (v) => 1 - span(v, 0.5, 0.75));
    const horizonIn = useTransform(scrollYProgress, (v) => span(v, 0.5, 0.8));
    const horizonScale = useTransform(scrollYProgress, (v) => 1.08 - 0.08 * span(v, 0.5, 0.85));
    const horizonBlur = useTransform(scrollYProgress, (v) => `blur(${(8 * (1 - span(v, 0.5, 0.85))).toFixed(2)}px)`);
    const word = useTransform(scrollYProgress, (v) => 0.8 + 0.18 * span(v, 0, 1));
    const lede = useTransform(scrollYProgress, (v) => span(v, 0.55, 0.9));
    const reduce = useReducedMotion();

    useScrollAnchors();

    // Cycle through the services until the visitor reaches for the list themselves.
    const [active, setActive] = useState(ALL[1].id);
    const [touched, setTouched] = useState(false);
    useEffect(() => {
        // On phones the detail opens inline under the tapped row, so the list must not move on its own.
        if (touched || reduce || window.matchMedia("(max-width: 767px)").matches) return;
        const t = setInterval(() => setActive((id) => ALL[(ALL.findIndex((s) => s.id === id) + 1) % ALL.length].id), 3200);
        return () => clearInterval(t);
    }, [touched, reduce]);
    const svc = ALL.find((s) => s.id === active)!;
    const art = ART[svc.id];

    return (
        <MotionConfig reducedMotion="user">
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100">
                <section ref={hero} className="relative h-[220svh]" aria-labelledby="services-title">
                    <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
                        {!reduce && (
                            <motion.div style={{ scale: corridorScale, opacity: corridorFade }} className="pointer-events-none absolute inset-0">
                                <Image src="/assets/services/opener-aisle.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
                            </motion.div>
                        )}
                        <motion.div style={reduce ? undefined : { scale: horizonScale, opacity: horizonIn, filter: horizonBlur }} className="pointer-events-none absolute inset-0">
                            <Image src="/assets/services/opener-circuit.jpg" alt="" fill sizes="100vw" className="object-cover" />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,.55)_0%,rgba(10,10,10,.6)_60%,rgba(10,10,10,.85)_100%)]" />
                        <TechBubbles progress={scrollYProgress} />
                        <motion.h1
                            id="services-title"
                            style={{ scale: word }}
                            className="relative bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text font-heading text-[19vw] font-extrabold leading-none tracking-tight text-transparent drop-shadow-[0_20px_30px_rgba(0,0,0,.6)]"
                        >
                            SERVICES
                        </motion.h1>
                        <motion.div style={{ opacity: lede }} className="absolute bottom-[14vh] px-4 text-center">
                            <p className="font-heading text-3xl md:text-5xl">Build. Care. <span className="italic text-[var(--brand)]">Create.</span></p>
                            <p className="mt-3 text-neutral-400">Nine services. One small team. Clear prices.</p>
                        </motion.div>
                    </div>
                </section>

                <section className="mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-4 py-24 md:grid-cols-[1fr_1.05fr] md:px-6" aria-label="All services and prices">
                    <div onPointerEnter={() => setTouched(true)} onFocusCapture={() => setTouched(true)}>
                        {SERVICE_GROUPS.map((g) => (
                            <div key={g.id} className="mb-7">
                                <h2 className="mb-2 text-xs uppercase tracking-[.3em] text-neutral-400">{g.index} · {g.name}</h2>
                                {g.services.map((s) => (
                                    <div key={s.id}>
                                    <button
                                        aria-pressed={active === s.id}
                                        onMouseEnter={() => setActive(s.id)}
                                        onFocus={() => setActive(s.id)}
                                        onClick={() => setActive(s.id)}
                                        className={`flex w-full items-baseline justify-between gap-4 border-b border-white/10 py-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] ${active === s.id ? "text-white" : "text-neutral-400 hover:text-neutral-200"}`}
                                    >
                                        <span className="flex items-baseline gap-3 font-heading text-2xl md:text-[1.7rem]">
                                            <span className={`size-2 shrink-0 -translate-y-1 rounded-full transition-all ${active === s.id ? "bg-[var(--brand)] shadow-[0_0_12px_var(--brand)]" : "bg-white/10"}`} />
                                            {s.name}
                                        </span>
                                        <span className={`shrink-0 text-sm tabular-nums ${active === s.id ? "text-[var(--brand)]" : ""}`}>from {ugx(s.from)}</span>
                                    </button>
                                    {active === s.id && (
                                        <div className="flex gap-4 border-b border-white/10 py-5 md:hidden">
                                            <ArtStage variant="plinth" id={s.id} art={ART[s.id]} size="sm" className="size-24 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-heading text-2xl text-[var(--brand)]">{ugx(s.from)} <span className="text-xs font-normal text-neutral-400">{s.unit ?? "from"} · {usd(s.from)}</span></p>
                                                <p className="mt-1 text-sm text-neutral-400">{s.blurb} · {s.delivery}</p>
                                                <ul className="mt-3 space-y-1.5">
                                                    {s.includes.map((i) => <li key={i} className="flex gap-2 text-sm text-neutral-200"><Check className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" />{i}</li>)}
                                                </ul>
                                                <Button asChild size="sm" className="mt-4">
                                                    <Link href={`/contact?service=${s.id}`}>{s.quote ? "Get a quote" : "Start this project"} <ArrowRight /></Link>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="hidden flex-col items-center md:sticky md:top-24 md:flex">
                        <ArtStage variant="plinth" id={svc.id} art={art} className="size-[min(360px,42vh,80vw)]" />
                        <AnimatePresence mode="wait">
                            <motion.div key={svc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="relative z-10 mt-8 w-full max-w-md">
                                <div className="flex items-end justify-between gap-4">
                                    <h3 className="font-heading text-3xl">{svc.name}</h3>
                                    <p className="shrink-0 text-right font-heading text-3xl text-[var(--brand)]">
                                        {ugx(svc.from)}
                                        <span className="block text-xs font-normal text-neutral-400">{svc.unit ?? "from"} · {usd(svc.from)}</span>
                                    </p>
                                </div>
                                <p className="mt-2 text-neutral-400">{svc.blurb} · {svc.delivery}</p>
                                <ul className="mt-5 grid grid-cols-2 gap-2">
                                    {svc.includes.map((i) => (
                                        <li key={i} className="flex gap-2 text-sm text-neutral-200"><Check className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" />{i}</li>
                                    ))}
                                </ul>
                                <Button asChild className="mt-6">
                                    <Link href={`/contact?service=${svc.id}`}>{svc.quote ? "Get a quote" : "Start this project"} <ArrowRight /></Link>
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                <section className="relative flex min-h-svh items-center overflow-hidden bg-[var(--brand)] px-4 py-28 text-[var(--brand-fg)] md:px-6" aria-labelledby="packages-title">
                    <Image src={`${CUT}/devices.png`} alt="" width={1295} height={1344} sizes="34vw" className="pointer-events-none absolute -top-24 right-[4vw] hidden h-auto w-[34vw] max-w-[520px] rotate-[-8deg] drop-shadow-[0_40px_50px_rgba(0,0,0,.35)] md:block" />
                    <div className="relative mx-auto w-full max-w-6xl">
                        <p className="text-xs font-semibold uppercase tracking-[.3em]">Website packages</p>
                        <h2 id="packages-title" className="mt-3 max-w-md font-heading text-5xl">Pick a starting point.</h2>
                        <div className="relative z-10 mt-14 grid gap-5 md:grid-cols-3">
                            {WEBSITE_TIERS.map((t) => (
                                <div key={t.name} className={`flex flex-col rounded-[28px] p-8 transition-transform hover:-translate-y-1 ${t.featured ? "bg-[#0a0a0a] text-white md:-translate-y-6" : "bg-[#86efac]"}`}>
                                    {t.featured && <span className="w-fit rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-semibold text-[var(--brand-fg)]">Most popular</span>}
                                    <h3 className="mt-4 font-heading text-3xl">{t.name}</h3>
                                    <p className="text-sm opacity-70">{t.for}</p>
                                    <p className="mt-6 font-heading text-4xl">{ugx(t.from)}</p>
                                    <ul className="mt-6 space-y-2 text-sm">{t.points.map((p) => <li key={p} className="flex gap-2"><Check className="size-4 shrink-0" />{p}</li>)}</ul>
                                </div>
                            ))}
                        </div>
                        <p className="mt-10 text-sm opacity-70">Prices are starting points in UGX; USD is a rough guide. Every project gets a fixed quote before work starts.</p>
                    </div>
                </section>
            </main>
        </MotionConfig>
    );
}
