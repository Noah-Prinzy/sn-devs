"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type RefObject } from "react";
import { MotionConfig, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import { SERVICE_GROUPS, ugx } from "@/data/services";
import { TEMPLATES, TIERS, priceOf } from "@/data/templates";
import { useScrollAnchors } from "@/components/use-scroll-anchors";
import { BrowserFrame, useStill } from "@/components/store/browser-frame";
import { PriceOdometer } from "@/components/store/price-odometer";
import { IntroOpener } from "@/components/home/intro-opener";
import { Rise, Scene } from "@/components/home/scene";
import { StepArt } from "@/components/home/graphics";

// Home, one full-screen photo scene after another, each a scroll stop: the intro
// (components/home/intro-opener.tsx), a scene for each kind of work we do, the Store, how we
// work, and a last scene to say hello.
const SHAUN = "/assets/home/people/shaun-placeholder.webp";
const NOAH = "/assets/home/people/noah-placeholder.webp";

// The same photos as the intro's three doors, so each door opens onto its own scene.
const GROUP_SCENES: Record<string, { img: string; pos: string; shade: "left" | "right" }> = {
    build: { img: "/assets/home/scene-build-code.jpg", pos: "30% 50%", shade: "right" },
    care: { img: "/assets/home/scene-care-desk.jpg", pos: "70% 50%", shade: "left" },
    create: { img: "/assets/services/photos/studio-setup.jpg", pos: "35% 50%", shade: "right" },
};

function GroupScene({ g, sectionRef }: { g: (typeof SERVICE_GROUPS)[number]; sectionRef: RefObject<HTMLElement | null> }) {
    const s = GROUP_SCENES[g.id];
    return (
        <Scene id={g.id} sectionRef={sectionRef} img={s.img} pos={s.pos} shade={s.shade} label={g.name}>
            <div className={`w-full max-w-xl ${s.shade === "right" ? "md:ml-auto" : ""}`}>
                <Rise>
                    <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">{g.index} / 0{SERVICE_GROUPS.length} · What we do</p>
                    <h2 className="mt-4 font-heading text-5xl leading-[1.02] md:text-7xl">{g.name}</h2>
                    <p className="mt-4 text-neutral-300 md:text-lg">{g.tagline}</p>
                </Rise>
                <Rise delay={0.15}>
                    <ul className="mt-8 border-t border-white/15">
                        {g.services.map((x) => (
                            <li key={x.id} className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3">
                                <span className="flex items-baseline gap-3 font-heading text-lg md:text-2xl">
                                    <span aria-hidden className="size-1.5 shrink-0 -translate-y-1 bg-[var(--brand)]" />
                                    {x.name}
                                </span>
                                <span className="shrink-0 text-sm tabular-nums text-[var(--brand)]">from {ugx(x.from)}</span>
                            </li>
                        ))}
                    </ul>
                </Rise>
                <Rise delay={0.3} className="mt-8">
                    <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                        <Button asChild size="lg"><Link href="/services">Prices &amp; details <ArrowRight /></Link></Button>
                    </Magnet>
                </Rise>
            </div>
        </Scene>
    );
}

// Three templates floating over the Store scene, each drifting at its own pace.
const TEASE = [
    { slug: "tabler-desk", pos: "left-0 top-[6%] z-10 w-[60%] -rotate-[4deg]", speed: -60, tag: "left-4" },
    { slug: "astro-launch", pos: "right-0 top-0 z-0 w-[54%] rotate-[3deg]", speed: 40, tag: "right-4" },
    { slug: "dev-journal", pos: "bottom-0 right-[2%] z-20 w-[56%] rotate-[1deg]", speed: -20, tag: "left-4" },
];

function TeaseFrame({ slug, pos, speed, tag, progress }: (typeof TEASE)[number] & { progress: MotionValue<number> }) {
    const t = TEMPLATES.find((x) => x.slug === slug)!;
    const y = useTransform(progress, (v) => (v - 0.5) * speed * 2);
    return (
        <motion.div style={{ y }} className={`absolute ${pos}`}>
            <Link href={`/store/${t.slug}`} className="group block outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                <div className="shadow-[0_30px_60px_rgba(0,0,0,.6)] transition-transform duration-500 group-hover:-translate-y-2">
                    <BrowserFrame slug={t.slug} name={t.name} play="auto" sizes="(min-width: 1024px) 460px, 60vw" />
                </div>
                <span className={`absolute -bottom-4 ${tag} flex items-baseline gap-2 border border-white/10 bg-black/85 px-3 py-2 text-xs text-white backdrop-blur md:text-sm`}>
                    {t.name}
                    <span className="font-heading text-[var(--brand)]"><PriceOdometer text={ugx(priceOf(t))} /></span>
                    <span className="hidden text-xs text-neutral-400 sm:inline">{TIERS[t.tier]}</span>
                </span>
            </Link>
        </motion.div>
    );
}

const STEPS = [
    { id: "sketch", title: "Sketch", body: "We map your goals, pages and content, and sketch the layout with you." },
    { id: "build", title: "Build", body: "We design and code it, with a live preview you can click through." },
    { id: "launch", title: "Launch", body: "Domain, hosting, speed and SEO checks, then it goes live." },
    { id: "grow", title: "Grow", body: "Care plans, updates and new features as you grow." },
];

function Step({ s, i, still }: { s: (typeof STEPS)[number]; i: number; still: boolean }) {
    const ref = useRef<HTMLLIElement>(null);
    const seen = useInView(ref, { margin: "-15% 0px" });
    return (
        <motion.li ref={ref} initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
            className="border border-white/10 bg-black/55 p-3 backdrop-blur-md md:p-5">
            <div className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center bg-[var(--brand)] font-mono text-xs font-semibold text-[var(--brand-fg)]">{i + 1}</span>
                <h3 className="font-heading text-xl md:text-3xl">{s.title}</h3>
            </div>
            <div className="mt-3 aspect-[20/9] border border-white/10 bg-black/40 md:mt-5 md:aspect-[20/13]">
                <StepArt id={s.id} on={seen && !still} className="size-full" />
            </div>
            <p className="mt-3 text-xs text-neutral-300 md:mt-4 md:text-sm">{s.body}</p>
        </motion.li>
    );
}

export function HomePage() {
    const still = useStill();
    const opener = useRef<HTMLElement>(null);
    const build = useRef<HTMLElement>(null);
    const care = useRef<HTMLElement>(null);
    const create = useRef<HTMLElement>(null);
    const store = useRef<HTMLElement>(null);
    const how = useRef<HTMLElement>(null);
    const hello = useRef<HTMLElement>(null);
    const groupRefs: Record<string, RefObject<HTMLElement | null>> = { build, care, create };

    useScrollAnchors();

    const { scrollYProgress: storeP } = useScroll({ target: store, offset: ["start end", "end start"] });
    const { scrollYProgress: howP } = useScroll({ target: how, offset: ["start 70%", "start start"] });
    const draw = useTransform(howP, (v) => (still ? 1 : v));
    const cheapest = Math.min(...TEMPLATES.map(priceOf));

    return (
        <MotionConfig reducedMotion="user">
            <main className="overflow-x-clip bg-black text-neutral-100">
                {/* 1 · Through the letters */}
                <IntroOpener sectionRef={opener} />

                {/* 2–4 · What we do, one scene each */}
                {SERVICE_GROUPS.map((g) => <GroupScene key={g.id} g={g} sectionRef={groupRefs[g.id]} />)}

                {/* 5 · The Store */}
                <Scene id="store" sectionRef={store} img="/assets/services/texture-dark-panels.jpg" shade="left" label="The Store">
                    <div className="grid w-full items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                        <Rise>
                            <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">The Store</p>
                            <h2 className="mt-4 font-heading text-5xl leading-[1.02] md:text-7xl">Need it live <span className="italic text-[var(--brand)]">this week?</span></h2>
                            <p className="mt-4 max-w-md text-neutral-300 md:text-lg">{`${TEMPLATES.length} S&N Editions`}: websites, dashboards, apps and systems. Pay with Mobile Money, download straight away.</p>
                            <div className="mt-7 flex flex-wrap items-center gap-6">
                                <Magnet padding={40} magnetStrength={4}>
                                    <Button asChild size="lg"><Link href="/store">Browse the Store <ArrowRight /></Link></Button>
                                </Magnet>
                                <p className="text-sm text-neutral-400">from <span className="font-heading text-2xl text-[var(--brand)]"><PriceOdometer text={ugx(cheapest)} /></span></p>
                            </div>
                        </Rise>
                        <div className="relative h-[230px] sm:h-[400px] lg:h-[500px]">
                            {TEASE.map((t) => <TeaseFrame key={t.slug} {...t} progress={storeP} />)}
                        </div>
                    </div>
                </Scene>

                {/* 6 · How we work */}
                <Scene id="how" sectionRef={how} img="/assets/home/why-03-process-corridor.jpg" shade="full" label="How we work">
                    <Rise>
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">How we work</p>
                        <h2 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.02] md:text-7xl">From first sketch to <span className="italic text-[var(--brand)]">launch day.</span></h2>
                    </Rise>
                    <ol className="relative mt-8 grid grid-cols-2 gap-3 md:mt-14 md:gap-5 lg:grid-cols-4">
                        {/* The path between the steps, drawn as the scene arrives. */}
                        <svg aria-hidden className="pointer-events-none absolute -top-5 left-0 hidden h-3 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 4">
                            <defs>
                                <mask id="how-draw" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="4">
                                    <motion.path d="M 1 2 C 15 0, 25 4, 50 2 S 85 0, 99 2" stroke="#fff" strokeWidth="4" fill="none" style={{ pathLength: draw }} />
                                </mask>
                            </defs>
                            <path d="M 1 2 C 15 0, 25 4, 50 2 S 85 0, 99 2" stroke="var(--brand)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" fill="none" mask="url(#how-draw)" />
                        </svg>
                        {STEPS.map((s, i) => <Step key={s.id} s={s} i={i} still={still} />)}
                    </ol>
                </Scene>

                {/* 7 · Say hello */}
                <Scene id="hello" sectionRef={hello} img="/assets/home/cta-01-window-light.jpg" pos="65% 50%" shade="left" label="Say hello">
                    <div className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_1fr]">
                        <Rise className="order-2 md:order-1">
                            <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">Say hello</p>
                            <h2 className="mt-4 font-heading text-5xl leading-[1.02] md:text-8xl">Got an idea? <span className="italic text-[var(--brand)]">Let&apos;s open the door.</span></h2>
                            <p className="mt-5 max-w-md text-neutral-300 md:text-lg">Tell us what you have in mind, big or small. We&apos;ll come back with a plan and a fixed quote.</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Magnet padding={40} magnetStrength={4}><Button asChild size="lg"><Link href="/contact">Say hello <ArrowRight /></Link></Button></Magnet>
                                <Magnet padding={40} magnetStrength={4}><Button asChild size="lg" variant="outline" className="bg-black/30 backdrop-blur"><Link href="/services">Explore services</Link></Button></Magnet>
                            </div>
                        </Rise>
                        {/* The two of us, pinned up in the light. */}
                        <Rise delay={0.2} className="order-1 flex justify-start md:order-2 md:justify-center">
                            {[{ src: SHAUN, n: "Shaun", r: "-rotate-6" }, { src: NOAH, n: "Noah", r: "rotate-[5deg] -ml-6 mt-6 md:-ml-10 md:mt-12" }].map((x) => (
                                <figure key={x.n} className={`w-24 bg-[#f5f5f0] p-1.5 pb-6 shadow-[0_24px_50px_rgba(0,0,0,.6)] transition-transform duration-500 hover:rotate-0 md:w-52 md:p-2.5 md:pb-10 ${x.r}`}>
                                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                                        <Image src={x.src} alt={x.n} fill sizes="(min-width: 768px) 208px, 96px" className="object-cover" />
                                    </div>
                                    <figcaption className="mt-1 text-center font-mono text-[10px] text-neutral-800 md:mt-2 md:text-sm">{x.n}</figcaption>
                                </figure>
                            ))}
                        </Rise>
                    </div>
                </Scene>
            </main>
        </MotionConfig>
    );
}
