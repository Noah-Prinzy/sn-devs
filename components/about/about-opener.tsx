"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { LockSimple } from "@phosphor-icons/react";
import { BrowserWindow } from "@/components/about/browser-window";
import { DEMO, HEADLINE, LEDE, STEPS } from "@/components/about/about-data";
import { useStill } from "@/components/store/browser-frame";
import { ScrollHint } from "@/components/scroll-hint";

// About opener, "the site that builds itself" (design/about/about-build-plan.md, section 1).
// One browser window builds a made-up client's site while the page is pinned: a wireframe draws
// itself on arrival, then scroll walks it through Design (the layout fills in), Build (the photo
// opens out of the X box, a code strip runs), Launch (loading bar, real URL, LIVE) and Care
// (the headline turns over, a care log types). One thing moves at a time; the rail on the left
// says which step you are on. Opacity, transform, clip-path and pathLength only.

const HERO_PHOTO = "/assets/home/hero-horizon-gate.jpg"; // stand-in until a bakery photo arrives
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

// Where each stage sits in the pin (0 = pinned, 1 = released). The rail fills along these.
const STAGES: [number, number][] = [[0.05, 0.25], [0.25, 0.45], [0.45, 0.65], [0.65, 0.9]];
// Reduced motion shows the finished, cared-for site: the end of Stage 4, before the exit.
const FINAL = 0.9;

// The demo site's layout in a 1600 × 1000 box (the window body is 16:10). The wireframe draws
// these as dashed boxes; each fades as the real thing fills it.
type Box = { x: number; y: number; w: number; h: number };
const NAV: Box = { x: 60, y: 50, w: 1480, h: 80 };
const HEAD: Box = { x: 60, y: 200, w: 640, h: 270 };
const BODY: Box = { x: 60, y: 500, w: 560, h: 100 };
const BTN: Box = { x: 60, y: 650, w: 250, h: 90 };
const IMG: Box = { x: 800, y: 200, w: 740, h: 640 };
const WIRES: { box: Box; fade: [number, number] }[] = [
    { box: NAV, fade: [0.05, 0.09] },
    { box: HEAD, fade: [0.1, 0.17] },
    { box: BODY, fade: [0.18, 0.21] },
    { box: BTN, fade: [0.21, 0.24] },
    { box: IMG, fade: [0.28, 0.36] },
];
const at = (b: Box) => ({ left: `${b.x / 16}%`, top: `${b.y / 10}%`, width: `${b.w / 16}%`, height: `${b.h / 10}%` });

const CODE: [string, string][][] = [
    [["// nilebakery.ug · home", "c"]],
    [["export default function ", "k"], ["Home", "p"], ["() {", "p"]],
    [["  return (", "k"]],
    [["    <Page>", "t"]],
    [["      <Nav ", "t"], ["links", "p"], ["={menu} />", "p"]],
    [["      <Hero ", "t"], ["title", "p"], ["=", "p"], ['"Fresh every morning"', "s"], [" />", "t"]],
    [["      <OrderButton ", "t"], ["cutoff", "p"], ["=", "p"], ['"09:00"', "s"], [" />", "t"]],
    [["    </Page>", "t"]],
    [["  );", "k"]],
    [["}", "p"]],
];
const TONE: Record<string, string> = { c: "text-neutral-600", k: "text-neutral-500", t: "text-(--brand)", s: "text-[#a7f3d0]", p: "text-neutral-300" };
const CARE = [
    ["Backup", "02:00"],
    ["Uptime", "99.98%"],
    ["Updates", "applied"],
];

export function AboutOpener() {
    const ref = useRef<HTMLElement>(null);
    const still = useStill();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    // Function transforms keep everything on the JS path (see services-page.tsx); under reduced
    // motion the whole scene simply reads the finished state.
    const p = useTransform(scrollYProgress, (v) => (still ? FINAL : v));

    const buildOut = useTransform(p, (v) => 1 - span(v, 0.65, 0.69));
    const buildY = useTransform(p, (v) => -18 * span(v, 0.65, 0.69));
    const keepIn = useTransform(p, (v) => span(v, 0.66, 0.7));
    const keepY = useTransform(p, (v) => 18 * (1 - span(v, 0.66, 0.7)));
    const exitScale = useTransform(p, (v) => 1 - 0.06 * span(v, 0.9, 1));
    const exitDim = useTransform(p, (v) => 1 - 0.55 * span(v, 0.9, 1));
    const hint = useTransform(p, (v) => 1 - span(v, 0, 0.04));

    // `animate` is always passed: the server render (and hydration) paints `initial`, and
    // useStill() only turns true after that, so dropping `animate` would leave things hidden.
    const rise = (delay: number) => ({ initial: still ? false : { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.85, delay, ease: EASE } });
    const fade = (delay: number) => ({ initial: still ? false : { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, delay, ease: EASE } });

    return (
        <section ref={ref} aria-labelledby="about-title" className={`relative ${still ? "min-h-svh" : "h-[420svh]"}`}>
            <div className={`${still ? "relative min-h-svh" : "sticky top-0 h-svh"} flex flex-col justify-center overflow-x-clip pt-(--nav-h)`}>
                <div className="mx-auto grid w-full max-w-7xl items-center gap-7 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:px-10 short:grid-cols-[minmax(0,1fr)_auto] short:gap-8 short:py-3">
                    {/* The words: kicker, the headline that turns over, the lede, and the rail. */}
                    <div className="order-2 lg:order-1 short:order-1">
                        <motion.p {...fade(0.1)} className="font-mono text-[11px] uppercase tracking-[.3em] text-(--brand)">
                            About · Shaun &amp; Noah
                        </motion.p>
                        <h1 id="about-title" className="mt-4 grid max-w-[5.3em] font-heading text-[clamp(2.4rem,4vw+1.5vh,6rem)] leading-[1.02] tracking-[-0.01em] lg:mt-6 short:mt-2 short:text-[clamp(1.8rem,7vh,3rem)]">
                            <span className="sr-only">{`${HEADLINE.build} ${HEADLINE.keep}`}</span>
                            <motion.span aria-hidden {...rise(0.25)} className="[grid-area:1/1]">
                                <motion.span style={{ opacity: buildOut, y: buildY }} className="block">{HEADLINE.build}</motion.span>
                            </motion.span>
                            <motion.span aria-hidden style={{ opacity: keepIn, y: keepY }} className="block text-(--brand) [grid-area:1/1]">
                                {HEADLINE.keep}
                            </motion.span>
                        </h1>
                        <motion.p {...rise(0.5)} className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-300 lg:mt-6 lg:text-lg short:hidden">
                            {LEDE}
                        </motion.p>
                        <motion.ol {...fade(2.3)} aria-label="How a site comes together" className="mt-10 hidden max-w-lg grid-cols-4 gap-3 lg:grid short:hidden">
                            {STEPS.map((s, i) => <RailStep key={s} p={p} i={i} label={s} />)}
                        </motion.ol>
                        <motion.div {...fade(2.3)} className="mt-4 lg:hidden short:mt-3 short:block">
                            <StepLabel p={p} />
                        </motion.div>
                    </div>

                    {/* The window, and the care log under it. */}
                    <motion.div
                        style={{ scale: exitScale, opacity: exitDim }}
                        className="@container relative order-1 mx-auto w-[min(100%,560px,calc((100svh_-_var(--nav-h)_-_24rem)_*_1.6))] lg:order-2 lg:w-[min(680px,48vw,calc((100svh_-_var(--nav-h)_-_15rem)_*_1.6))] short:order-2 short:w-[min(48vw,calc((100svh_-_var(--nav-h)_-_3.5rem_-_40px)_*_1.6))]"
                    >
                        <motion.div
                            initial={still ? false : { opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.45, ease: EASE }}
                            className="relative"
                            role="img"
                            aria-label="A demo website for a made-up bakery being designed, built, launched and then looked after."
                        >
                            <Glow p={p} />
                            <BrowserWindow url={<UrlBar p={p} still={still} />} right={<Live p={p} />}>
                                <div aria-hidden className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]">
                                    <DemoSite p={p} />
                                    <Wireframe p={p} still={still} />
                                </div>
                            </BrowserWindow>
                            <GreenEdge p={p} />
                            <Chip p={p} still={still} />
                            <CodeStrip p={p} />
                        </motion.div>
                        <CareLog p={p} />
                    </motion.div>
                </div>

                {!still && (
                    <motion.div {...fade(2.6)} className="absolute inset-x-0 bottom-[4vh] h-10 max-lg:hidden short:hidden">
                        <motion.div style={{ opacity: hint }} className="absolute inset-0">
                            <ScrollHint />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

// ── Left column ────────────────────────────────────────────────────────────────────────────

function RailStep({ p, i, label }: { p: MotionValue<number>; i: number; label: string }) {
    const [a, b] = STAGES[i];
    const fill = useTransform(p, (v) => span(v, a, b));
    const lit = useTransform(p, (v) => 0.4 + 0.6 * span(v, a, a + 0.02));
    return (
        <li>
            <motion.span style={{ opacity: lit }} className="block font-mono text-[11px] uppercase tracking-[.2em] text-neutral-200">
                <span className="text-(--brand)">{String(i + 1).padStart(2, "0")}</span> {label}
            </motion.span>
            <span className="relative mt-3 block h-px bg-white/15">
                <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-(--brand)" />
            </span>
        </li>
    );
}

// Phones get the rail as one line of text.
function StepLabel({ p }: { p: MotionValue<number> }) {
    const text = useTransform(p, (v) => {
        const n = Math.max(1, STAGES.filter(([a]) => v >= a).length);
        return `Step ${n} of 4 · ${STEPS[n - 1]}`;
    });
    return (
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-neutral-300">
            <span aria-hidden className="inline-block size-1.5 bg-(--brand)" />
            <motion.span>{text}</motion.span>
        </p>
    );
}

// ── The window ─────────────────────────────────────────────────────────────────────────────

// The address bar: a placeholder with a blinking caret, a loading bar, then the live address.
function UrlBar({ p, still }: { p: MotionValue<number>; still: boolean }) {
    const load = useTransform(p, (v) => span(v, 0.47, 0.55));
    const loadOut = useTransform(p, (v) => 1 - span(v, 0.55, 0.57));
    const draft = useTransform(p, (v) => 1 - span(v, 0.55, 0.575));
    const live = useTransform(p, (v) => span(v, 0.56, 0.585));
    const liveX = useTransform(p, (v) => -6 * (1 - span(v, 0.56, 0.585)));
    return (
        <>
            <span className="grid min-w-0 flex-1 items-center">
                <motion.span style={{ opacity: draft }} className="flex items-center [grid-area:1/1]">
                    yourbusiness.ug
                    <motion.span
                        aria-hidden
                        animate={still ? undefined : { opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                        className="ml-px inline-block h-3 w-[6px] bg-(--brand)"
                    />
                </motion.span>
                <motion.span style={{ opacity: live, x: liveX }} className="flex min-w-0 items-center gap-1.5 [grid-area:1/1]">
                    <LockSimple aria-hidden weight="fill" className="size-3 shrink-0 text-(--brand)" />
                    <span className="truncate">
                        <span className="text-neutral-500">https://</span>
                        <span className="text-neutral-100">{DEMO.url}</span>
                    </span>
                </motion.span>
            </span>
            <motion.span style={{ opacity: loadOut }} className="absolute inset-x-0 bottom-0 h-0.5">
                <motion.span style={{ scaleX: load }} className="absolute inset-0 origin-left bg-(--brand)" />
            </motion.span>
        </>
    );
}

// LIVE, with one ring that pulses out as it lights.
function Live({ p }: { p: MotionValue<number> }) {
    const on = useTransform(p, (v) => span(v, 0.58, 0.6));
    const ring = useTransform(p, (v) => 1 + 2.4 * span(v, 0.59, 0.64));
    const ringOut = useTransform(p, (v) => (v < 0.59 ? 0 : 0.8 * (1 - span(v, 0.59, 0.64))));
    return (
        <motion.span style={{ opacity: on }} className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.2em] text-(--brand)">
            <span className="relative size-1.5">
                <motion.span style={{ scale: ring, opacity: ringOut }} className="absolute inset-0 rounded-full bg-(--brand)" />
                <span className="absolute inset-0 rounded-full bg-(--brand)" />
            </span>
            Live
        </motion.span>
    );
}

function Glow({ p }: { p: MotionValue<number> }) {
    const on = useTransform(p, (v) => span(v, 0.57, 0.65));
    return <motion.div aria-hidden style={{ opacity: on }} className="pointer-events-none absolute inset-0 shadow-[0_0_90px_6px_rgba(74,222,128,.22)]" />;
}

function GreenEdge({ p }: { p: MotionValue<number> }) {
    const on = useTransform(p, (v) => span(v, 0.57, 0.65));
    return <motion.div aria-hidden style={{ opacity: on }} className="pointer-events-none absolute inset-0 border border-[rgba(74,222,128,.4)]" />;
}

// The dashed wireframe. Each box draws itself on arrival (a mask stroked along its outline),
// then fades as the real part fills it.
function Wireframe({ p, still }: { p: MotionValue<number>; still: boolean }) {
    const id = `wire-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const draw = (i: number) => (still ? { initial: false as const, animate: { pathLength: 1 } } : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.6, delay: 0.9 + i * 0.22, ease: EASE } });
    return (
        <svg viewBox="0 0 1600 1000" className="pointer-events-none absolute inset-0 size-full" fill="none">
            <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
                {WIRES.map(({ box }, i) => (
                    <motion.rect key={i} x={box.x} y={box.y} width={box.w} height={box.h} stroke="#fff" strokeWidth={40} {...draw(i)} />
                ))}
                <motion.line x1={IMG.x} y1={IMG.y} x2={IMG.x + IMG.w} y2={IMG.y + IMG.h} stroke="#fff" strokeWidth={40} {...draw(5)} />
                <motion.line x1={IMG.x + IMG.w} y1={IMG.y} x2={IMG.x} y2={IMG.y + IMG.h} stroke="#fff" strokeWidth={40} {...draw(6)} />
            </mask>
            <g mask={`url(#${id})`} stroke="rgba(255,255,255,.3)" strokeWidth={1} strokeDasharray="5 5" vectorEffect="non-scaling-stroke">
                {WIRES.map(({ box, fade }, i) => (
                    <WireBox key={i} p={p} box={box} fade={fade} cross={box === IMG} />
                ))}
            </g>
        </svg>
    );
}

function WireBox({ p, box, fade, cross }: { p: MotionValue<number>; box: Box; fade: [number, number]; cross: boolean }) {
    const on = useTransform(p, (v) => 1 - span(v, fade[0], fade[1]));
    return (
        <motion.g style={{ opacity: on }}>
            <rect x={box.x} y={box.y} width={box.w} height={box.h} vectorEffect="non-scaling-stroke" />
            {cross && (
                <>
                    <line x1={box.x} y1={box.y} x2={box.x + box.w} y2={box.y + box.h} vectorEffect="non-scaling-stroke" />
                    <line x1={box.x + box.w} y1={box.y} x2={box.x} y2={box.y + box.h} vectorEffect="non-scaling-stroke" />
                </>
            )}
        </motion.g>
    );
}

// The made-up client's site, filled in stage by stage. Sizes are in container units so the
// little site scales with the window.
function DemoSite({ p }: { p: MotionValue<number> }) {
    const nav = useTransform(p, (v) => span(v, 0.05, 0.09));
    const navY = useTransform(p, (v) => -8 * (1 - span(v, 0.05, 0.09)));
    const body = useTransform(p, (v) => span(v, 0.18, 0.21));
    const bodyY = useTransform(p, (v) => 8 * (1 - span(v, 0.18, 0.21)));
    const btn = useTransform(p, (v) => span(v, 0.21, 0.22));
    const btnFill = useTransform(p, (v) => `inset(0 ${100 - 100 * span(v, 0.22, 0.25)}% 0 0)`);
    const photo = useTransform(p, (v) => {
        const k = 50 * (1 - span(v, 0.28, 0.37));
        return `inset(${k}% ${k}% ${k}% ${k}%)`;
    });
    const photoScale = useTransform(p, (v) => 1.18 - 0.18 * span(v, 0.28, 0.4));
    const chars = Array.from(DEMO.headline);
    return (
        <>
            <motion.div style={{ ...at(NAV), opacity: nav, y: navY }} className="absolute flex items-center justify-between px-[1.2cqw]">
                <span className="font-heading text-[1.8cqw] text-white">{DEMO.name}</span>
                <span className="flex gap-[2.4cqw] text-[1.25cqw] text-neutral-400">
                    {DEMO.nav.map((n) => <span key={n}>{n}</span>)}
                </span>
            </motion.div>

            <p style={at(HEAD)} className="absolute flex items-center px-[1.2cqw] font-heading text-[4.3cqw] leading-[1.06] text-white">
                <span>
                    {chars.map((ch, i) => (ch === " " ? " " : <Char key={i} p={p} i={i} n={chars.length} ch={ch} />))}
                </span>
            </p>

            <motion.p style={{ ...at(BODY), opacity: body, y: bodyY }} className="absolute flex items-center px-[1.2cqw] text-[1.45cqw] leading-snug text-neutral-400">
                {DEMO.body}
            </motion.p>

            <motion.div style={{ ...at(BTN), opacity: btn }} className="absolute px-[1.2cqw] py-[1cqw]">
                <span className="relative grid size-full place-items-center border border-white/25 text-[1.3cqw] font-medium text-white">
                    {DEMO.cta}
                    <motion.span style={{ clipPath: btnFill }} className="absolute inset-0 grid place-items-center bg-(--brand) text-(--brand-fg)">
                        {DEMO.cta}
                    </motion.span>
                </span>
            </motion.div>

            <motion.div style={{ ...at(IMG), clipPath: photo }} className="absolute overflow-hidden bg-neutral-900">
                <motion.div style={{ scale: photoScale }} className="absolute inset-0">
                    <Image src={HERO_PHOTO} alt="" fill sizes="(min-width: 1024px) 320px, 50vw" quality={75} loading="eager" className="object-cover" />
                </motion.div>
            </motion.div>
        </>
    );
}

// One letter of the demo headline, typed in its own slice of Stage 1.
function Char({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: string }) {
    const a = 0.09, b = 0.18, step = (b - a) / n;
    const on = useTransform(p, (v) => span(v, a + i * step, a + (i + 1) * step));
    return <motion.span style={{ opacity: on }}>{ch}</motion.span>;
}

// Who is working on it: Shaun while it is being designed, Noah from the build on.
function Chip({ p, still }: { p: MotionValue<number>; still: boolean }) {
    const shaun = useTransform(p, (v) => 1 - span(v, 0.25, 0.27));
    const shaunY = useTransform(p, (v) => -8 * span(v, 0.25, 0.27));
    const noah = useTransform(p, (v) => span(v, 0.26, 0.28));
    const noahY = useTransform(p, (v) => 8 * (1 - span(v, 0.26, 0.28)));
    const cls = "whitespace-nowrap border border-[rgba(74,222,128,.55)] bg-[#0a0a0a] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.2em] text-(--brand) [grid-area:1/1]";
    return (
        <motion.div
            aria-hidden
            initial={still ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.1, ease: EASE }}
            className="absolute -bottom-3 left-4 z-10 grid"
        >
            <motion.span style={{ opacity: shaun, y: shaunY }} className={cls}>Shaun · design</motion.span>
            <motion.span style={{ opacity: noah, y: noahY }} className={cls}>Noah · engineering</motion.span>
        </motion.div>
    );
}

// A few lines of the build, sliding up beside the window and scrolling, gone before the launch.
function CodeStrip({ p }: { p: MotionValue<number> }) {
    const on = useTransform(p, (v) => span(v, 0.36, 0.39) * (1 - span(v, 0.445, 0.47)));
    const y = useTransform(p, (v) => 24 * (1 - span(v, 0.36, 0.39)) + 16 * span(v, 0.445, 0.47));
    const lines = useTransform(p, (v) => `${-1.7 * 6 * span(v, 0.39, 0.44)}em`);
    return (
        <motion.div
            aria-hidden
            style={{ opacity: on, y }}
            className="absolute bottom-[12%] right-2 z-10 w-[min(56%,300px)] border border-white/12 bg-[#0b0b0b]/95 font-mono text-[max(9px,1.4cqw)] shadow-[0_24px_50px_rgba(0,0,0,.6)] lg:-right-6"
        >
            <div className="border-b border-white/10 px-3 py-1.5 text-neutral-500">app/page.tsx</div>
            <div className="h-[calc(4*1.7em)] overflow-hidden px-3 py-[.35em]">
                <motion.div style={{ y: lines }}>
                    {CODE.map((line, i) => (
                        <div key={i} className="h-[1.7em] whitespace-pre leading-[1.7em]">
                            {line.map(([t, tone], j) => <span key={j} className={TONE[tone]}>{t}</span>)}
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

// After launch: the care log types under the window, one line at a time.
function CareLog({ p }: { p: MotionValue<number> }) {
    const head = useTransform(p, (v) => span(v, 0.68, 0.71));
    return (
        <div className="mt-7 font-mono text-[11px] tracking-[.06em] short:hidden">
            <motion.p style={{ opacity: head }} className="mb-2 hidden uppercase tracking-[.2em] text-neutral-500 lg:block">
                care.log · demo site
            </motion.p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:block lg:space-y-1">
                {CARE.map(([k, val], i) => <CareLine key={k} p={p} i={i} k={k} val={val} />)}
            </ul>
        </div>
    );
}

function CareLine({ p, i, k, val }: { p: MotionValue<number>; i: number; k: string; val: string }) {
    const a = 0.71 + i * 0.055, b = a + 0.045;
    const typed = useTransform(p, (v) => `inset(0 ${100 - 100 * span(v, a, b)}% 0 0)`);
    return (
        <li>
            <motion.span style={{ clipPath: typed }} className="inline-block whitespace-nowrap text-neutral-300">
                <span className="text-(--brand)">✓</span> {k} <span className="text-neutral-100">{val}</span>
            </motion.span>
        </li>
    );
}
