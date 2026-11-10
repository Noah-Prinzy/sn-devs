"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "motion/react";
import { SiteMotion } from "@/components/site-motion";
import { ArrowUpRight, EnvelopeSimple, Plus, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import DecryptedText from "@/components/DecryptedText";
import { useStill } from "@/components/store/browser-frame";
import { pinStops, sectionStops, useScrollAnchors } from "@/components/use-scroll-anchors";
import { Rise, Scene } from "@/components/home/scene";
import { SignalRings, StepWriteArt, StepReplyArt, StepQuoteArt } from "@/components/contact/signal-art";
import { ContactForm } from "@/components/contact/contact-form";
import { KampalaPin } from "@/components/contact/kampala-pin";
import { DirectLines } from "@/components/contact/direct-lines";
import { TICKER, kampalaNow, mailtoFor, whatsappText } from "@/data/contact";
import { SERVICE_GROUPS, ugx } from "@/data/services";

// Contact — "the reach". A pinned opener over the world's roads at night, Kampala the one
// bright point, signal rings from the word's period; a status ticker; the letter under the
// lamp (form + the live sheet); a green next-steps band; a short FAQ priced from the
// services data; and the map to close, Kampala pinned.
// The opener's choreography is specified in design/contact/opener-sequence.md.

const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

// The two pinned photos and where Kampala sits on each (fractions of the natural image), plus
// the object-position each is drawn with. The pin is placed from these after measuring the box.
const REACH = { src: "/assets/about/reach-world-network.jpg", w: 1600, h: 893, kx: 0.549, ky: 0.56, px: 0.5, py: 0.55 };
// py 0.6 keeps Kampala in frame at every audit size (landscape crops the top of the map).
const MAP = { src: "/assets/contact/location-uganda-map.jpg", w: 1143, h: 1600, kx: 0.515, ky: 0.67, px: 0.5, py: 0.6 };

// A 10×6 px JPEG of the reach photo (sharp, quality 60) so the opener never pops in from black
// before the real picture has loaded: next/image blurs it up to size.
const REACH_BLUR =
    "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQH/8QAHRAAAgEEAwAAAAAAAAAAAAAAAQIAAxESIQQx0f/EABQBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDPKXLNMapozFQpyUW0fJO2LMTsXN+oiBf/2Q==";

// Arrival cues, in seconds from mount (opener-sequence.md §2, "Arrival"). The period's spring
// first touches down ~0.17 s after it is released, so "landing" is 1.12 s: the kicker decrypts
// then. The status dot blinks once the row it sits in has faded up, so the blink can be seen.
const CUE = { pin: 0.35, talk: 0.45, tous: 0.6, period: 0.95, land: 1.12, subline: 1.2, status: 1.4, flash: 1.75, hint: 1.75 };
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

// Arrival variants; `custom` is the cue time. Every one animates opacity and transform only, so
// nothing moves in layout: the word owns its box from the first paint. Under reduced motion
// MotionConfig drops the transforms and keeps the opacity, so reduce users get an opacity-only
// fade into the settled frame.
const PHOTO: Variants = {
    hidden: { opacity: 0, scale: 1.12 },
    shown: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};
const RISE: Variants = {
    hidden: { opacity: 0, y: 48 },
    shown: (at: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: at, ease: EASE } }),
};
const DROP: Variants = {
    hidden: { opacity: 0, y: -40 },
    shown: (at: number) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 18, delay: at, opacity: { duration: 0.2, delay: at } } }),
};
const FADE: Variants = {
    hidden: { opacity: 0 },
    shown: (at: number) => ({ opacity: 1, transition: { duration: 0.5, delay: at } }),
};
const STATUS: Variants = {
    hidden: { opacity: 0 },
    shown: (at: number) => ({ opacity: 1, transition: { duration: 0.4, delay: at } }),
};
const HINT: Variants = {
    hidden: { opacity: 0 },
    shown: (at: number) => ({ opacity: 0.6, transition: { duration: 0.5, delay: at } }),
};

export function ContactPage() {
    const hero = useRef<HTMLElement>(null);
    const channel = useRef<HTMLElement>(null);
    const next = useRef<HTMLElement>(null);
    const faq = useRef<HTMLElement>(null);
    const ready = useRef<HTMLElement>(null);

    const still = useStill();

    // The landing cue: the one time-based switch in the arrival, for the kicker's decrypt (it
    // has to mount then, not fade). Reduce users get the settled frame at once.
    const [landedAt, setLandedAt] = useState(false);
    const landed = landedAt || still;
    // Reduce users get the settled frame: every cue at 0 and no hidden start (the word alone
    // fades in, on opacity). The opener remounts once if the reduce preference arrives after
    // hydration, so the arrival never plays half-way for them.
    const cue = (at: number) => (still ? 0 : at);
    const start = still ? false : "hidden";
    useEffect(() => {
        const t = setTimeout(() => setLandedAt(true), CUE.land * 1000);
        return () => clearTimeout(t);
    }, []);

    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    // Through the pin (opener-sequence.md §2, steps 6–8). Function transforms so every animation
    // lands exactly at the stretch of the pin it is given.
    const wordScale = useTransform(scrollYProgress, (v) => 1 + 0.06 * span(v, 0.15, 0.5));
    const wordOpacity = useTransform(scrollYProgress, (v) => 1 - 0.15 * span(v, 0.15, 0.5));
    const kickerOut = useTransform(scrollYProgress, (v) => 1 - span(v, 0.05, 0.3));
    const tailY = useTransform(scrollYProgress, (v) => -24 * span(v, 0.45, 0.8));
    const tailOpacity = useTransform(scrollYProgress, (v) => 1 - span(v, 0.45, 0.8));
    const dark = useTransform(scrollYProgress, (v) => 0.6 * span(v, 0.8, 1));
    // "[ scroll ]" fades out over the first stretch of the pin.
    const scrollHint = useTransform(scrollYProgress, (v) => 1 - span(v, 0, 0.12));

    // Anchors: the opener pin (start and end), the channel top (the letter scrolls free), the
    // next-steps band, the FAQ top (free) and the final scene.
    useScrollAnchors(() => [...pinStops(hero.current, [0, 1]), ...sectionStops([channel, next, faq, ready])]);

    return (
        <SiteMotion>
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100 selection:bg-(--brand) selection:text-(--brand-fg)">
                {/* 1 — Opener: the reach. The network behind, Kampala pinned, the word on air. */}
                <section ref={hero} className="relative h-[220svh]" aria-labelledby="contact-title">
                    <div key={still ? "still" : "live"} className="sticky top-0 grid h-svh place-items-center overflow-hidden">
                        <ReachPhoto progress={scrollYProgress} still={still} />
                        {/* z-10 keeps the word above the photo layer; the photo wrapper is isolated so the
                            pin's own z-index never climbs over the glyphs. */}
                        <motion.div style={still ? undefined : { scale: wordScale, opacity: wordOpacity }} className="relative z-10 px-4 text-center">
                            {/* The kicker decrypts once the period has landed: the same component is mounted
                                from the first paint (invisible, so the line keeps its box) and re-keyed at the
                                landing cue, which starts a fresh decrypt as it fades up. */}
                            <motion.p style={still ? undefined : { opacity: kickerOut }} className="mb-8 font-mono text-xs uppercase tracking-[.3em] text-neutral-400 short:mb-3">
                                <motion.span variants={FADE} custom={cue(CUE.land)} initial={start} animate="shown" className="block">
                                    <DecryptedText key={landed ? "live" : "wait"} text="Contact · S&N Devs · Kampala" animateOn="view" speed={30} maxIterations={10} />
                                </motion.span>
                            </motion.p>
                            <motion.h1
                                id="contact-title"
                                initial="hidden"
                                animate="shown"
                                className="font-heading text-[min(22vw,28vh)] font-extrabold leading-[0.85] tracking-tight drop-shadow-[0_20px_30px_rgba(0,0,0,.6)] md:text-[min(19vw,28vh)]"
                            >
                                {/* Play-once arrival: TALK rises, TO US rises, the period drops in on a spring
                                    and lands. The lines are never scroll-gated, so a visitor who lands mid-page
                                    still sees the settled word. Each line clips the gradient itself: a clip on
                                    the h1 leaks a sliver of white while a line is composited mid-fade. */}
                                <motion.span variants={RISE} custom={cue(CUE.talk)} className="block bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text text-transparent">
                                    TALK
                                </motion.span>
                                <motion.span variants={RISE} custom={cue(CUE.tous)} className="block bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text text-transparent">
                                    TO US
                                    <motion.span variants={DROP} custom={cue(CUE.period)} className="relative inline-block text-(--brand)">
                                        .
                                        {!still && <SignalRings progress={scrollYProgress} />}
                                    </motion.span>
                                </motion.span>
                            </motion.h1>
                            {/* The invitation and the promise: fade up on arrival, slide up and out through the
                                pin. Opacity and transform only. */}
                            <motion.div style={still ? undefined : { y: tailY, opacity: tailOpacity }} className="mx-auto mt-7 max-w-xl short:mt-3">
                                <motion.p
                                    variants={FADE}
                                    custom={cue(CUE.subline)}
                                    initial={start}
                                    animate="shown"
                                    className="text-lg text-neutral-200 md:text-xl short:text-sm max-[360px]:text-base"
                                >
                                    A rough idea is enough. Two lines, no calls, no forms you have to finish.
                                </motion.p>
                                <motion.div variants={STATUS} custom={cue(CUE.status)} initial={start} animate="shown">
                                    <StatusRow flashAt={still ? undefined : CUE.flash} />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.p
                            aria-hidden
                            style={{ opacity: scrollHint }}
                            className="absolute inset-x-0 bottom-[5vh] z-10 text-center font-mono text-xs uppercase tracking-[.3em] text-neutral-500 short:bottom-[2vh]"
                        >
                            <motion.span variants={HINT} custom={cue(CUE.hint)} initial={start} animate="shown" className="block">
                                [ scroll ]
                            </motion.span>
                        </motion.p>
                        {/* The frame goes dark over the last fifth of the pin, so the ticker and the letter
                            scene arrive from black. */}
                        {!still && <motion.div aria-hidden style={{ opacity: dark }} className="pointer-events-none absolute inset-0 z-20 bg-[#0a0a0a]" />}
                    </div>
                </section>

                {/* 2 — Status ticker. */}
                <div aria-hidden className="overflow-hidden border-y border-white/10 bg-[#0d0d0d] py-3">
                    <div className="flex w-max animate-marquee-left motion-reduce:animate-none!">
                        {[0, 1].map((copy) => (
                            <div key={copy} className="flex shrink-0 items-center">
                                {TICKER.map((t) => (
                                    <span key={t} className="flex items-center font-mono text-xs uppercase tracking-[.3em] text-neutral-400">
                                        <span className="px-6">{t}</span>
                                        <span className="size-1.5 bg-(--brand)" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3 — The letter, under the lamp. The lamp stays warm; the Scene's bottom shade
                    and the form's own dark panels carry the contrast. */}
                <Scene
                    id="channel"
                    sectionRef={channel}
                    img="/assets/contact/letter-lamp-bulb.jpg"
                    pos="50% 42%"
                    pinned
                    shade="bottom"
                    label="The letter"
                >
                    <Rise>
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">[ FIG 01 — THE LETTER ]</p>
                        <h2 className="mt-4 max-w-3xl font-heading text-[clamp(1.75rem,1.8vw+4.2vh,5rem)] leading-[1.02]">
                            Tell us what you&apos;re <span className="italic text-(--brand)">building.</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-neutral-300 md:text-lg">
                            A rough idea is enough. Write it here and watch the email write itself{" "}
                            <span className="hidden lg:inline">beside it</span>
                            <span className="lg:hidden">below</span>.
                        </p>
                    </Rise>
                    <Rise delay={0.15} className="mt-10 short:mt-6">
                        <ContactForm />
                    </Rise>
                </Scene>

                {/* 4 — Green band: what happens next. A full green scene, like the
                    packages scene on Services — the page's one loud color moment. */}
                <section ref={next} className="relative flex min-h-svh items-center bg-(--brand) py-24 text-(--brand-fg) md:py-28" aria-label="What happens next">
                    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                        <Rise>
                            <h2 className="font-heading text-5xl leading-[1.02] md:text-7xl">What happens next.</h2>
                        </Rise>
                        {/* The dashed line sits beside the list, not inside it: only <li> belongs in an <ol>. */}
                        <div className="relative mt-16">
                            <span aria-hidden className="absolute left-0 right-[28%] top-7 hidden border-t-2 border-dashed border-(--brand-fg)/40 md:block" />
                            <ol className="grid gap-14 md:grid-cols-3 md:gap-10">
                                {[
                                    { n: "01", art: <StepWriteArt />, t: "You write", d: "The form, an email or WhatsApp, whatever is easiest. A sentence is enough." },
                                    { n: "02", art: <StepReplyArt />, t: "We reply", d: "Within one working day, with questions or a time for a call." },
                                    { n: "03", art: <StepQuoteArt />, t: "We call & quote", d: "A short call, a fixed quote and a start date. No surprises after that." },
                                ].map((s, i) => (
                                    <li key={s.n} className="relative">
                                        <span aria-hidden className="pointer-events-none absolute -top-12 right-0 select-none font-heading text-[7rem] leading-none text-(--brand-fg) opacity-[.08] md:text-[9rem]">
                                            {s.n}
                                        </span>
                                        <Rise delay={i * 0.12}>
                                            <div className="flex items-center gap-5">
                                                <span className="relative z-10 grid place-items-center bg-(--brand)">{s.art}</span>
                                                <span className="font-mono text-sm tabular-nums">{s.n}</span>
                                            </div>
                                            <h3 className="mt-6 font-heading text-3xl">{s.t}</h3>
                                            <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-80">{s.d}</p>
                                        </Rise>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                {/* 5 — Before you write: an editorial spread — the heading holds the left
                    rail while the questions run down the right. */}
                <section ref={faq} className="mx-auto grid max-w-6xl gap-12 px-4 py-28 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-6" aria-label="Before you write">
                    <Rise className="md:sticky md:top-28 md:self-start">
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">Contact · Good to know</p>
                        <h2 className="mt-4 font-heading text-4xl leading-[1.05] md:text-6xl">Before you write.</h2>
                        <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-400">
                            The short version. The whole menu, with what&apos;s included, lives on the{" "}
                            <Link href="/services" className="text-(--brand) underline underline-offset-4">Services page</Link>.
                        </p>
                    </Rise>
                    <Rise delay={0.12}>
                        <Faq />
                    </Rise>
                </section>

                {/* 6 — Final scene: the map of where we work, Kampala pinned, the lines in reach. */}
                <section ref={ready} className="relative grid min-h-svh place-items-center overflow-hidden bg-black py-24 short:py-16" aria-label="Ready when you are">
                    {/* The same measured pin as the opener, so it tracks the city through the crop.
                        No label: the readout below already names Kampala. */}
                    <PinnedPhoto {...MAP} quality={70} imgClassName="object-cover opacity-[.16] grayscale" />
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(74,222,128,.18),transparent_70%)]" />
                    <div className="relative z-10 w-full px-4 text-center">
                        <Rise>
                            <h2 className="font-heading text-5xl leading-[1.02] md:text-7xl">
                                <DecryptedText text="Ready when you are" animateOn="view" speed={30} maxIterations={10} />
                                <span className="text-(--brand)">.</span>
                            </h2>
                            <p className="mt-4 text-neutral-400 md:text-lg">Tell us the idea. We&apos;ll bring the plan.</p>
                        </Rise>
                        <Rise delay={0.15}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                                    <Button asChild size="lg">
                                        <a href={mailtoFor()}>
                                            <EnvelopeSimple /> Write the email
                                        </a>
                                    </Button>
                                </Magnet>
                                <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                                    <Button asChild variant="outline" size="lg">
                                        <a href={whatsappText("Hello S&N Devs, I found you on your site.")} target="_blank" rel="noopener noreferrer">
                                            <WhatsappLogo /> WhatsApp us <ArrowUpRight />
                                        </a>
                                    </Button>
                                </Magnet>
                            </div>
                            <p className="mt-8 font-mono text-xs uppercase tracking-[.3em] text-neutral-500 max-[360px]:tracking-[.2em]">
                                0.3476° N, 32.5825° E · Kampala
                            </p>
                        </Rise>
                        <Rise delay={0.25}>
                            <DirectLines className="mx-auto mt-10 max-w-md text-left" />
                        </Rise>
                        <Rise delay={0.3}>
                            <p className="mt-12 text-xl italic text-neutral-300 md:text-2xl">Shaun &amp; Noah</p>
                        </Rise>
                    </div>
                </section>
            </main>
        </SiteMotion>
    );
}

// Where Kampala falls, in pixels of a full-bleed box. object-cover crops the picture, so the
// rendered image box is derived from the natural size (w, h), the container and the
// object-position (px, py), and Kampala's fraction of the image (kx, ky) is mapped into it.
// null until measured, remeasured on every resize.
type Photo = { w: number; h: number; kx: number; ky: number; px: number; py: number };
function usePinPoint(box: { current: HTMLDivElement | null }, { w, h, kx, ky, px, py }: Photo) {
    const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
    useEffect(() => {
        const el = box.current;
        if (!el) return;
        const measure = () => {
            const cw = el.clientWidth, ch = el.clientHeight;
            if (!cw || !ch) return;
            const s = Math.max(cw / w, ch / h);
            const rw = w * s, rh = h * s;
            setPin({
                x: Math.round((cw - rw) * px + rw * kx),
                y: Math.round((ch - rh) * py + rh * ky),
            });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [box, w, h, kx, ky, px, py]);
    return pin;
}

// The opener's photo: the world's roads at night, Kampala pinned. Arrival fades it up while
// zooming out (about the centre); through the pin it zooms about Kampala, so the city grows
// under the word while the dot stays put. The dim is the scrim, a radial gradient centred on
// the dot: no CSS filter, so the roads keep their sharpness. The wrapper is isolated so the
// pin's z-index stays inside the photo layer, under the word.
function ReachPhoto({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
    const box = useRef<HTMLDivElement>(null);
    const pin = usePinPoint(box, REACH);
    const zoom = useTransform(progress, (v) => 1 + 0.28 * span(v, 0, 0.55));
    const at = pin ? `${pin.x}px ${pin.y}px` : "50% 50%";
    return (
        <div ref={box} aria-hidden className="absolute inset-0 isolate overflow-hidden bg-[#0a0a0a]">
            <motion.div variants={PHOTO} initial={still ? false : "hidden"} animate="shown" className="absolute inset-0">
                <motion.div style={still ? { transformOrigin: at } : { scale: zoom, transformOrigin: at }} className="absolute inset-0">
                    <Image
                        src={REACH.src}
                        alt=""
                        fill
                        priority
                        fetchPriority="high"
                        quality={92}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={REACH_BLUR}
                        className="object-cover"
                        style={{ objectPosition: `${REACH.px * 100}% ${REACH.py * 100}%` }}
                    />
                </motion.div>
                <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 60% 70% at ${at}, rgba(10,10,10,.3) 0%, rgba(10,10,10,.92) 100%)` }}
                />
                {pin && <KampalaPin x={`${pin.x}px`} y={`${pin.y}px`} arriveAt={still ? undefined : CUE.pin} />}
            </motion.div>
        </div>
    );
}

// A full-bleed photo with Kampala pinned on it (the closing map). Hidden until measured. The
// wrapper is isolated so the pin's z-index stays inside the photo layer; children (a scrim)
// draw between the image and the pin.
function PinnedPhoto({
    src, w, h, kx, ky, px = 0.5, py = 0.5, priority, quality, imgClassName = "object-cover", imgStyle, children,
}: {
    src: string;
    w: number;
    h: number;
    kx: number;
    ky: number;
    px?: number;
    py?: number;
    priority?: boolean;
    quality?: number;
    imgClassName?: string;
    imgStyle?: CSSProperties;
    children?: ReactNode;
}) {
    const box = useRef<HTMLDivElement>(null);
    const pin = usePinPoint(box, { w, h, kx, ky, px, py });

    return (
        <div ref={box} aria-hidden className="absolute inset-0 isolate overflow-hidden">
            <Image
                src={src}
                alt=""
                fill
                priority={priority}
                quality={quality}
                sizes="100vw"
                className={imgClassName}
                style={{ objectPosition: `${px * 100}% ${py * 100}%`, ...imgStyle }}
            />
            {children}
            {pin && <KampalaPin x={`${pin.x}px`} y={`${pin.y}px`} />}
        </div>
    );
}

// The status row under the word: Kampala's clock and the reply promise. No open/closed
// claim until HOURS are confirmed, so the dot is static, apart from one blink on arrival
// (flashAt, seconds from mount). Placeholder first so server and client agree, the real time
// after mount, ticking every 30 s.
function StatusRow({ flashAt }: { flashAt?: number }) {
    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        const tick = () => setTime(kampalaNow().time);
        tick();
        const t = setInterval(tick, 30_000);
        return () => clearInterval(t);
    }, []);
    return (
        <p className="mt-5 font-mono text-xs uppercase tracking-[.3em] text-neutral-300 short:mt-2 max-[360px]:tracking-[.2em]">
            <motion.span
                aria-hidden
                animate={flashAt === undefined ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.3, delay: flashAt, times: [0, 0.5, 1] }}
                className="mr-3 inline-block size-1.5 bg-(--brand) align-middle"
            />
            Kampala {time ?? "--:--"} EAT · Reply within one working day
        </p>
    );
}

// The FAQ, with prices pulled from the services data so they never go stale.
const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);
const from = (id: string) => {
    const s = ALL_SERVICES.find((x) => x.id === id);
    return s ? ugx(s.from) : "";
};

function Faq() {
    const items: { q: string; a: ReactNode }[] = [
        {
            q: "What does a website cost?",
            a: (
                <>
                    <p>Launch pages start at {from("launch")}. Full websites start at {from("websites")}, web apps and
                    systems are quoted per project. The whole menu, with what&apos;s included, is on the <Link href="/services" className="text-(--brand) underline underline-offset-4">Services page</Link>.</p>
                </>
            ),
        },
        { q: "How long does it take?", a: <p>A launch page: about a week. A full site: two to four weeks, depending on how ready the words and pictures are. We agree the date before we start, and we keep it.</p> },
        { q: "Do you work outside Kampala?", a: <p>Yes. Calls over WhatsApp or Google Meet, the work happens in the cloud, and invoices go out in UGX or USD, your choice.</p> },
        { q: "What should I include in my message?", a: <p>What the project is for, the pages or features you expect, your deadline, and a budget range if you have one. A sentence is enough. We&apos;ll ask about the rest on the call.</p> },
    ];
    return (
        <div>
            {items.map((it, i) => (
                <details key={i} className="group border-t border-white/15 last:border-b">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg transition-colors duration-200 outline-none hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand)/60 group-open:text-(--brand) [&::-webkit-details-marker]:hidden">
                        {it.q}
                        <Plus className="size-4 shrink-0 text-(--brand) transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <div className="pb-6 text-sm leading-relaxed text-neutral-300 [&_p]:mt-2">{it.a}</div>
                </details>
            ))}
        </div>
    );
}
