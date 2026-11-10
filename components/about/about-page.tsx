"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SiteMotion } from "@/components/site-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_GROUPS, ugx } from "@/data/services";
import { PortalIntro } from "@/components/about/portal-intro";

// About: the portal opener (portal-intro.tsx), then a split hero (headline left, the two of us right), the manifesto, one row per
// founder, what a client can expect, and a closing call to action.

// Placeholders until Noah & Shaun's own photos arrive (the same cut-outs Home uses).
const PEOPLE = "/assets/home/people";
const SHAUN = { src: `${PEOPLE}/shaun-placeholder.webp`, w: 545, h: 1600 };
const NOAH = { src: `${PEOPLE}/noah-placeholder.webp`, w: 630, h: 1600 };

// Each bio still needs a line on background and one on what he is like to work with.
const FOUNDERS = [
    { name: "Shaun", photo: SHAUN, fit: "w-[60%]", bio: "Shaun leads design and the creative studio: UI, video, presentations and ad creative." },
    { name: "Noah", photo: NOAH, fit: "w-[66%]", bio: "Noah leads engineering: web apps, custom systems, care plans and upgrades." },
];

// The care-plan price comes from the Services data, so the two pages can't disagree.
const CARE_FROM = ugx(SERVICE_GROUPS.flatMap((g) => g.services).find((s) => s.id === "care-plans")!.from);
const EXPECT = [
    { title: "Fixed quote first", text: "Price agreed before a line is written." },
    { title: "Talk to the builders", text: "No middle layer. Two people, direct line." },
    { title: "Fast, honest timelines", text: "Launch pages in about a week; sites in two to three." },
    { title: "We stay on", text: `Care plans from ${CARE_FROM} keep it fast and current.` },
];

const HEADLINE = [
    { text: "We build it.", em: false },
    { text: "We keep it running.", em: true },
];

const EASE = [0.16, 1, 0.3, 1] as const;
// The hero sits below the portal, so its entrance waits until it is actually on screen.
const ONCE = { once: true, amount: 0.2 } as const;
const PANEL = "bg-[linear-gradient(180deg,#262626_0%,#1a1a1a_55%,#121212_100%)]";
const GLOW = "bg-[radial-gradient(ellipse_at_50%_38%,color-mix(in_srgb,var(--brand)_16%,transparent),transparent_62%)]";
const LABEL = "text-xs uppercase tracking-[.3em] text-neutral-400";
const WRAP = "mx-auto max-w-7xl px-4 md:px-6";

// Settles into place the first time it scrolls into view.
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function AboutPage() {
    return (
        <SiteMotion>
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100">
                <PortalIntro targetId="about" />

                <section id="about" className="grid border-b border-white/10 md:min-h-svh md:grid-cols-2" aria-labelledby="about-title">
                    <div className="flex flex-col justify-center px-4 pb-16 pt-32 md:pb-20 md:pl-[max(1.5rem,calc((100vw_-_80rem)_/_2_+_1.5rem))] md:pr-12 md:pt-36">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={ONCE} transition={{ duration: 0.8 }} className="text-xs uppercase tracking-[.3em] text-[var(--brand)]">
                            About us
                        </motion.p>
                        <h1 id="about-title" className="mt-5 text-[clamp(44px,6vw,100px)] font-extrabold uppercase leading-[.95] tracking-tight">
                            {HEADLINE.map(({ text, em }, i) => (
                                <span key={text} className="block overflow-hidden pb-[.08em] pr-[.08em]">
                                    <motion.span
                                        initial={{ y: "105%" }}
                                        whileInView={{ y: 0 }} viewport={ONCE}
                                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.14 }}
                                        className={`block ${em ? "italic text-[var(--brand)]" : ""}`}
                                    >
                                        {text}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={ONCE} transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}>
                            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-neutral-300">
                                S&amp;N Devs is a two-person web and creative studio in Kampala, run by Shaun and Noah. Nine
                                services, one small team, clear prices.
                            </p>
                            <a href="#story" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] outline-none focus-visible:underline">
                                Read our story
                                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                            </a>
                        </motion.div>
                    </div>

                    <div className={`relative h-[68svh] overflow-hidden md:h-auto ${PANEL}`}>
                        <div className={`absolute inset-0 ${GLOW}`} />
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={ONCE} transition={{ duration: 1.1, ease: EASE, delay: 0.25 }} className="absolute bottom-0 left-[9%] h-[80%]">
                            <Image src={SHAUN.src} alt="Shaun" width={SHAUN.w} height={SHAUN.h} priority sizes="25vw" className="h-full w-auto drop-shadow-[0_0_40px_rgba(0,0,0,.6)]" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={ONCE} transition={{ duration: 1.1, ease: EASE, delay: 0.35 }} className="absolute bottom-0 right-[8%] h-[85%]">
                            <Image src={NOAH.src} alt="Noah" width={NOAH.w} height={NOAH.h} priority sizes="25vw" className="h-full w-auto drop-shadow-[0_0_40px_rgba(0,0,0,.6)]" />
                        </motion.div>
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                    </div>
                </section>

                <section id="story" className={`${WRAP} grid scroll-mt-24 gap-8 py-24 md:grid-cols-[1fr_3fr] md:py-36`} aria-labelledby="manifesto-title">
                    <Reveal><p className={LABEL}>01 · Manifesto</p></Reveal>
                    <div>
                        <Reveal>
                            <h2 id="manifesto-title" className="max-w-4xl text-3xl leading-[1.12] md:text-5xl">
                                A website should not be something you buy once and then worry about. It should be something
                                that works for you every day <span className="italic text-[var(--brand)]">and gets better.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-8 max-w-xl leading-relaxed text-neutral-400">
                                That is why every S&amp;N project comes with a fixed quote up front and a care plan option at
                                the end. We&apos;d rather be the studio you keep than the one you had to replace.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className={`${WRAP} space-y-20 pb-24 md:space-y-28 md:pb-36`} aria-label="The founders">
                    {FOUNDERS.map((f, i) => (
                        <div key={f.name} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                            <Reveal className={i % 2 ? "md:order-2" : ""}>
                                <div className={`relative aspect-[10/9] overflow-hidden rounded-[28px] border border-white/10 ${PANEL}`}>
                                    <div className={`absolute inset-0 ${GLOW}`} />
                                    <Image src={f.photo.src} alt={f.name} width={f.photo.w} height={f.photo.h} sizes="(min-width: 768px) 32vw, 62vw" className={`absolute left-1/2 top-[9%] h-auto max-w-none -translate-x-1/2 drop-shadow-[0_0_40px_rgba(0,0,0,.6)] ${f.fit}`} />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#121212] to-transparent" />
                                </div>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <p className="text-xs uppercase tracking-[.3em] text-[var(--brand)]">Co-founder</p>
                                <h2 className="mt-3 text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">{f.name}</h2>
                                <p className="mt-6 max-w-md text-[17px] leading-relaxed text-neutral-300">{f.bio}</p>
                            </Reveal>
                        </div>
                    ))}
                </section>

                <section className={`${WRAP} pb-24 md:pb-36`} aria-labelledby="expect-title">
                    <Reveal><h2 id="expect-title" className={`${LABEL} font-sans font-normal`}>02 · What you can expect</h2></Reveal>
                    <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {EXPECT.map((e, i) => (
                            <li key={e.title}>
                                <Reveal delay={i * 0.08} className="group border-t border-white/15 pt-5 transition-colors duration-500 hover:border-[var(--brand)]">
                                    <p className="font-heading text-4xl font-bold tabular-nums text-[var(--brand)]">{String(i + 1).padStart(2, "0")}</p>
                                    <h3 className="mt-3 text-xl">{e.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">{e.text}</p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="border-t border-white/10" aria-labelledby="about-cta">
                    <Reveal className={`${WRAP} flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-28`}>
                        <h2 id="about-cta" className="text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
                            Let&apos;s build <span className="italic text-[var(--brand)]">yours.</span>
                        </h2>
                        <Button asChild size="lg" className="w-fit">
                            <Link href="/contact">Get in touch <ArrowRight /></Link>
                        </Button>
                    </Reveal>
                </section>
            </main>
        </SiteMotion>
    );
}
