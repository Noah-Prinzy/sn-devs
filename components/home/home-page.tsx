"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MotionConfig, motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import { pinStops, sectionStops, useScrollAnchors } from "@/components/use-scroll-anchors";
import { useStill } from "@/components/store/browser-frame";
import { IntroOpener } from "@/components/home/intro-opener";
import { Rise, Scene } from "@/components/home/scene";
import { StepArt } from "@/components/home/graphics";

// Home is an intro: through the letters (components/home/intro-opener.tsx), how we work, and a
// last scene to say hello. What we do lives on the Services page, the editions on the Store.
const SHAUN = "/assets/home/people/shaun-placeholder.webp";
const NOAH = "/assets/home/people/noah-placeholder.webp";

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
            className="border border-white/10 bg-black/55 p-3 backdrop-blur-md md:p-5 short:p-2.5">
            <div className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center bg-(--brand) font-mono text-xs font-semibold text-(--brand-fg)">{i + 1}</span>
                <h3 className="font-heading text-xl md:text-2xl lg:text-3xl short:text-base">{s.title}</h3>
            </div>
            <div className="mt-3 aspect-20/9 border border-white/10 bg-black/40 md:mt-4 md:aspect-20/11 max-[360px]:hidden short:hidden">
                <StepArt id={s.id} on={seen && !still} className="size-full" />
            </div>
            <p className="mt-3 text-xs text-neutral-300 md:mt-4 md:text-sm short:mt-1.5 short:text-[11px] short:leading-snug">{s.body}</p>
        </motion.li>
    );
}

export function HomePage() {
    const still = useStill();
    const opener = useRef<HTMLElement>(null);
    const how = useRef<HTMLElement>(null);
    const hello = useRef<HTMLElement>(null);

    // The intro pin has three stops (letters, welcome, doors); every scene after it is one screen.
    useScrollAnchors(() => [...pinStops(opener.current, [0, 0.5, 1]), ...sectionStops([how, hello])]);

    const { scrollYProgress: howP } = useScroll({ target: how, offset: ["start 70%", "start start"] });
    const draw = useTransform(howP, (v) => (still ? 1 : v));

    return (
        <MotionConfig reducedMotion="user">
            <main className="overflow-x-clip bg-black text-neutral-100">
                {/* 1 · Through the letters */}
                <IntroOpener sectionRef={opener} />

                {/* 2 · How we work */}
                <Scene id="how" sectionRef={how} img="/assets/home/why-03-process-corridor.jpg" shade="full" label="How we work">
                    <Rise>
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">How we work</p>
                        <h2 className="mt-4 max-w-3xl font-heading text-[clamp(1.6rem,1.4vw+3.4vh,4.5rem)] leading-[1.02]">From first sketch to <span className="italic text-(--brand)">launch day.</span></h2>
                    </Rise>
                    <ol className="relative mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-5 lg:grid-cols-4 short:mt-4 short:gap-2 short:md:grid-cols-4">
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

                {/* 3 · Say hello */}
                <Scene id="hello" sectionRef={hello} img="/assets/home/cta-01-window-light.jpg" pos="65% 50%" shade="left" label="Say hello">
                    <div className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_1fr] short:grid-cols-[1.2fr_1fr] short:gap-6">
                        <Rise className="order-2 md:order-1">
                            <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">Say hello</p>
                            <h2 className="mt-4 font-heading text-[clamp(2rem,2.2vw+4.6vh,6rem)] leading-[1.02]">Got an idea? <span className="italic text-(--brand)">Let&apos;s open the door.</span></h2>
                            <p className="mt-5 max-w-md text-neutral-300 md:text-lg short:mt-2 short:text-sm">Tell us what you have in mind, big or small. We&apos;ll come back with a plan and a fixed quote.</p>
                            <div className="mt-8 flex flex-wrap gap-3 short:mt-4">
                                <Magnet padding={40} magnetStrength={4}><Button asChild size="lg"><Link href="/contact">Say hello <ArrowRight /></Link></Button></Magnet>
                                <Magnet padding={40} magnetStrength={4}><Button asChild size="lg" variant="outline" className="bg-black/30 backdrop-blur"><Link href="/services">Explore services</Link></Button></Magnet>
                            </div>
                        </Rise>
                        {/* The two of us, pinned up in the light. */}
                        <Rise delay={0.2} className="order-1 flex justify-start md:order-2 md:justify-center">
                            {[{ src: SHAUN, n: "Shaun", r: "-rotate-6" }, { src: NOAH, n: "Noah", r: "rotate-[5deg] -ml-6 mt-6 md:-ml-10 md:mt-12" }].map((x) => (
                                <figure key={x.n} className={`w-24 bg-[#f5f5f0] p-1.5 pb-6 shadow-[0_24px_50px_rgba(0,0,0,.6)] transition-transform duration-500 hover:rotate-0 max-[360px]:w-20 md:w-[clamp(7rem,15vw,13rem)] md:p-2.5 md:pb-10 short:w-24 short:p-1.5 short:pb-6 ${x.r}`}>
                                    <div className="relative aspect-4/5 w-full overflow-hidden">
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
