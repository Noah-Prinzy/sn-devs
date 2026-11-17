"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useStill } from "@/components/store/browser-frame";
import { SiteMotion } from "@/components/site-motion";
import { Check } from "@phosphor-icons/react";
import { WEBSITE_TIERS, ugx } from "@/data/services";
import { pinStops, sectionStops, useScrollAnchors } from "@/components/use-scroll-anchors";
import { TechBubbles } from "@/components/services/tech-bubbles";
import { ServiceRows } from "@/components/services/service-rows";

// A server aisle gives way to a circuit board behind a large "SERVICES"; then the menu, every
// service as a row with its own drawing and a detail drawer (components/services/service-rows.tsx);
// then the website packages.
const CUT = "/assets/services/cutouts";

export function ServicesPage() {
    const hero = useRef<HTMLElement>(null);
    const board = useRef<HTMLElement>(null);
    const packages = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    // Function transforms keep these on the JS path: the browser's native scroll timeline ends
    // its animation at exactly 100% and drops back to the start, and the anchor lands right there.
    const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
    // The corridor pushes in while the word grows, then fades as the horizon sharpens behind it.
    const corridorScale = useTransform(scrollYProgress, (v) => 1 + 0.35 * span(v, 0, 0.6));
    const corridorFade = useTransform(scrollYProgress, (v) => 1 - span(v, 0.5, 0.75));
    const horizonIn = useTransform(scrollYProgress, (v) => span(v, 0.5, 0.8));
    // Scale and opacity only: a scroll-linked blur on a full-screen layer re-rasterises every
    // frame on the main thread (Chrome scrollytelling guide: compositor properties only).
    const horizonScale = useTransform(scrollYProgress, (v) => 1.08 - 0.08 * span(v, 0.5, 0.85));
    const word = useTransform(scrollYProgress, (v) => 0.8 + 0.18 * span(v, 0, 1));
    // What we sell is readable on the fold: the lede arrives in the first third of the pin.
    const lede = useTransform(scrollYProgress, (v) => span(v, 0.1, 0.35));
    // useStill: OS reduced motion read the same on server and client (no hydration mismatch).
    const reduce = useStill();

    // Anchors: the opener pin (start and end), the menu top (the rows scroll free)
    // and the packages scene. The footer is left alone.
    useScrollAnchors(() => [...pinStops(hero.current, [0, 1]), ...sectionStops([board, packages])]);

    return (
        <SiteMotion>
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100">
                <section ref={hero} className="relative h-[220svh] motion-reduce:h-svh" aria-labelledby="services-title">
                    <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
                        {!reduce && (
                            <motion.div style={{ scale: corridorScale, opacity: corridorFade }} className="pointer-events-none absolute inset-0">
                                <Image src="/assets/services/opener-aisle.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
                            </motion.div>
                        )}
                        <motion.div style={reduce ? undefined : { scale: horizonScale, opacity: horizonIn }} className="pointer-events-none absolute inset-0">
                            <Image src="/assets/services/opener-circuit.jpg" alt="" fill sizes="100vw" className="object-cover" />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,.55)_0%,rgba(10,10,10,.6)_60%,rgba(10,10,10,.85)_100%)]" />
                        <TechBubbles progress={scrollYProgress} />
                        <motion.h1
                            id="services-title"
                            style={{ scale: word }}
                            className="relative bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text font-heading text-[min(19vw,30vh)] font-extrabold leading-none tracking-tight text-transparent drop-shadow-[0_20px_30px_rgba(0,0,0,.6)]"
                        >
                            SERVICES
                        </motion.h1>
                        <motion.div style={{ opacity: reduce ? 1 : lede }} className="needs-js absolute bottom-[14vh] px-4 text-center short:bottom-[5vh]">
                            <p className="font-heading text-3xl md:text-5xl short:text-xl">Build. Care. <span className="italic text-(--brand)">Create.</span></p>
                            <p className="mt-3 text-neutral-400 short:mt-1 short:text-sm">Nine services. One small team. Clear prices.</p>
                        </motion.div>
                    </div>
                </section>

                <ServiceRows sectionRef={board} />

                <section ref={packages} className="relative flex min-h-svh items-center overflow-hidden bg-(--brand) px-4 py-28 text-(--brand-fg) md:px-6" aria-labelledby="packages-title">
                    <Image src={`${CUT}/devices.png`} alt="" width={1295} height={1344} sizes="34vw" className="pointer-events-none absolute -top-24 right-[4vw] hidden h-auto w-[34vw] max-w-130 rotate-[-8deg] drop-shadow-[0_40px_50px_rgba(0,0,0,.35)] md:block" />
                    <div className="relative mx-auto w-full max-w-6xl">
                        <p className="text-xs font-semibold uppercase tracking-[.3em]">Website packages</p>
                        <h2 id="packages-title" className="mt-3 max-w-md font-heading text-5xl">Pick a starting point.</h2>
                        <div className="relative z-10 mt-14 grid gap-5 md:grid-cols-3">
                            {WEBSITE_TIERS.map((t) => (
                                <div key={t.name} className={`flex flex-col rounded-[28px] p-8 transition-transform hover:-translate-y-1 ${t.featured ? "bg-[#0a0a0a] text-white md:-translate-y-6" : "bg-[#86efac]"}`}>
                                    {t.featured && <span className="w-fit rounded-full bg-(--brand) px-3 py-1 text-xs font-semibold text-(--brand-fg)">Most popular</span>}
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
        </SiteMotion>
    );
}
