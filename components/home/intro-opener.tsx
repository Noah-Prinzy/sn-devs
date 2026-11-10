"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, type RefObject } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import DecryptedText from "@/components/DecryptedText";
import { useStill } from "@/components/store/browser-frame";
import { ScrollHint } from "@/components/scroll-hint";

// Home opener: bright code shows only through a huge S&N. Scrolling flies you through the
// letters, the code gives way to a laptop in the dark as the welcome rises, then a night desk
// over the city as three doors into what we do fan up; each one opens the Services page.
const GLYPHS = "01<>/{}[]=+*#$";
// One picture per stage: through the letters, behind the welcome, behind the doors.
const LETTERS = "/assets/home/intro-letters-code.jpg";
const WELCOME = "/assets/home/intro-welcome-laptop.jpg";
const DOORS_BG = "/assets/home/intro-doors-night-desk.jpg";
const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const inOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);

// Scroll rests once you're through the letters, and again with the doors up.
export const OPENER_STOPS = [0.5, 1];

const DOORS = [
    { id: "build", title: "Build", sub: "Websites, apps & templates", src: "/assets/home/scene-build-code.jpg", tilt: -8, y: 10 },
    { id: "care", title: "Care", sub: "Updates, upgrades & growth", src: "/assets/home/scene-care-desk.jpg", tilt: 0, y: -16 },
    { id: "create", title: "Create", sub: "Video, decks & ads", src: "/assets/services/photos/studio-setup.jpg", tilt: 8, y: 10 },
];

function Door({ d, i, p }: { d: (typeof DOORS)[number]; i: number; p: MotionValue<number> }) {
    const t = useTransform(p, (v) => out(span(v, 0.6 + i * 0.07, 0.9 + i * 0.03)));
    const y = useTransform(t, (k) => `${(1 - k) * 120 + d.y * k}%`);
    const rotate = useTransform(t, (k) => d.tilt * k + (1 - k) * d.tilt * 2.5);
    return (
        <motion.div style={{ y, rotate, opacity: t }} className="w-[30%] md:w-[31%] short:w-[26%]">
            <Link href="/services" className="group relative block aspect-4/5 overflow-hidden border border-white/15 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,.6)] outline-none focus-visible:ring-2 focus-visible:ring-(--brand)">
                <Image src={d.src} alt="" fill sizes="(min-width: 768px) 16vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-4">
                    <p className="flex items-center justify-between font-heading text-base md:text-2xl">
                        {d.title}
                        <ArrowUpRight className="size-4 text-(--brand) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:size-5" />
                    </p>
                    <p className="mt-1 hidden text-xs text-neutral-300 md:block">{d.sub}</p>
                </div>
                <span className="absolute left-2.5 top-2.5 font-mono text-[10px] text-(--brand) md:left-4 md:top-4 md:text-xs">0{i + 1}</span>
            </Link>
        </motion.div>
    );
}

export function IntroOpener({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
    const reduce = useStill();
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    // Reduced motion shows the finished scene: the drawn progress is held at the end.
    const p = useMotionValue(0);
    useEffect(() => {
        const set = (v: number) => p.set(reduce ? 1 : v);
        set(scrollYProgress.get());
        return scrollYProgress.on("change", set);
    }, [reduce, p, scrollYProgress]);

    // 1 · through the letters: they grow past the screen while the black falls away.
    const zoom = useTransform(p, (v) => 1 + 34 * Math.pow(inOut(span(v, 0.02, 0.46)), 2.2));
    const veil = useTransform(p, (v) => 1 - span(v, 0.24, 0.44));
    const kicker = useTransform(p, (v) => 1 - span(v, 0.02, 0.12));
    const picture = useTransform(p, (v) => 1.22 - 0.2 * inOut(span(v, 0, 0.5)) - 0.02 * span(v, 0.55, 1));
    const lift = useTransform(p, (v) => `${-6 * span(v, 0.55, 1)}%`);
    // The left side darkens as the welcome arrives, so the words stay readable over the pictures.
    const dim = useTransform(p, (v) => 0.7 * span(v, 0.3, 0.5) + 0.2 * span(v, 0.55, 0.9));
    // The code hands over to the laptop as you come through, then the night desk joins the doors.
    const lettersShot = useTransform(p, (v) => 1 - span(v, 0.34, 0.46));
    const doorsShot = useTransform(p, (v) => span(v, 0.58, 0.82));

    // 2 · the welcome rises in beside the picture.
    const words = useTransform(p, (v) => out(span(v, 0.38, 0.52)));
    const wordsY = useTransform(words, (k) => (1 - k) * 40);
    const wordsBlur = useTransform(words, (k) => `blur(${(1 - k) * 10}px)`);
    const hint = useTransform(p, (v) => 1 - span(v, 0, 0.05));

    return (
        <section ref={sectionRef} className="relative h-[300svh] bg-black motion-reduce:h-svh" aria-labelledby="home-title">
            <div className="sticky top-0 h-svh overflow-hidden">
                {/* The pictures, stacked: code under the letters, then the laptop, then the night desk. */}
                <motion.div style={{ scale: picture, y: lift }} className="absolute inset-0">
                    <Image src={WELCOME} alt="" fill priority sizes="100vw" className="object-cover object-[70%_50%]" />
                    <motion.div style={{ opacity: doorsShot }} className="absolute inset-0">
                        <Image src={DOORS_BG} alt="" fill sizes="100vw" className="object-cover object-[40%_60%]" />
                    </motion.div>
                    <motion.div style={{ opacity: lettersShot }} className="absolute inset-0">
                        <Image src={LETTERS} alt="" fill priority sizes="100vw" className="object-cover object-[45%_45%]" />
                    </motion.div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_62%_45%,rgba(74,222,128,.16),transparent_70%)] mix-blend-screen" />
                </motion.div>
                <motion.div aria-hidden style={{ opacity: dim }} className="absolute inset-0 bg-black/80 md:bg-transparent md:bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,.6)_55%,rgba(0,0,0,.15)_100%)]" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent" />

                {/* The black with S&N cut out of it: white letters multiply to show the picture. */}
                <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div style={{ scale: zoom }} className="absolute inset-0 grid origin-[51%_50%] place-items-center bg-black mix-blend-multiply">
                        <span className="translate-y-[-2%] select-none font-heading text-[42vw] font-extrabold leading-none tracking-tight text-white md:text-[34vw]">S&amp;N</span>
                    </motion.div>
                </motion.div>

                <motion.p aria-hidden style={{ opacity: kicker }} className="pointer-events-none absolute inset-x-0 top-[18vh] text-center text-xs font-semibold uppercase tracking-[.4em] text-(--brand)">
                    <DecryptedText text="Welcome to S&N Devs" animateOn="view" sequential characters={GLYPHS} speed={45} />
                </motion.p>
                <motion.div aria-hidden style={{ opacity: hint }} className="pointer-events-none absolute inset-x-0 bottom-0 h-0">
                    <ScrollHint>Scroll to step through</ScrollHint>
                </motion.div>

                {/* The welcome, then three doors into what we do. */}
                <div className="absolute inset-0 grid content-end gap-6 px-5 pb-8 md:grid-cols-[1.1fr_1fr] md:content-center md:items-end md:gap-14 md:px-12 md:pb-0 lg:px-20 short:grid-cols-[1.1fr_1fr] short:content-end short:items-end short:gap-6 short:pb-4">
                    <motion.div style={{ opacity: words, y: wordsY, filter: wordsBlur }} className="needs-js max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[.3em] text-(--brand)">Shaun &amp; Noah · Web studio</p>
                        <h1 id="home-title" className="mt-4 font-heading text-[clamp(2rem,2vw+5vh,6rem)] leading-[1.02] short:mt-2">
                            Websites that open <span className="italic text-(--brand)">doors.</span>
                        </h1>
                        <p className="mt-5 max-w-md text-neutral-300 max-[360px]:hidden md:text-lg short:hidden">
                            We design and build sites, apps and stores that feel as good as they look, from the first sketch to launch day and beyond.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3 short:mt-4">
                            <Magnet padding={40} magnetStrength={4}><Button asChild size="lg"><Link href="/services">Explore services <ArrowRight /></Link></Button></Magnet>
                            <Magnet padding={40} magnetStrength={4}><Button asChild size="lg" variant="outline" className="bg-black/30 backdrop-blur"><Link href="/store">See the store</Link></Button></Magnet>
                        </div>
                    </motion.div>
                    <div className="flex items-end justify-center gap-3 md:justify-end md:gap-5 md:pb-[12vh] short:justify-end short:pb-4">
                        {DOORS.map((d, i) => <Door key={d.title} d={d} i={i} p={p} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
