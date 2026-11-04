"use client";

import Image from "next/image";
import { useEffect, useId } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

// Stages for a service's cut-out art. Three takes on "an object, presented", picked by `variant`:
//   orbit  - a thin tilted green ring the object passes through (back arc behind, front arc in front)
//   plinth - the object hovers over a glossy dark floor with a green spill and a soft reflection
//   scan   - a green line sweeps down drawing an outline, then a second pass fills in the real image
// Everything is gradients and vector strokes: no grain, no noise textures.

export type ArtVariant = "orbit" | "plinth" | "scan";
export type Art = { src: string; w: number; h: number; rim?: boolean };
type Size = "lg" | "sm";

const EASE = [0.16, 1, 0.3, 1] as const;
const SHADOW = { lg: "drop-shadow(0 30px 40px rgba(0,0,0,.55))", sm: "drop-shadow(0 10px 14px rgba(0,0,0,.5))" };
// `rim` outlines dark art in light so it doesn't vanish into the black page.
const RIM = "drop-shadow(0 0 1px rgba(214,255,232,.9)) drop-shadow(0 0 6px rgba(120,230,170,.35))";
const artFilter = (art: Art, size: Size) => (art.rim ? `${RIM} ${SHADOW[size]}` : SHADOW[size]);

type StageProps = { variant: ArtVariant; id: string; art: Art; size?: Size; className?: string };

export function ArtStage({ variant, id, art, size = "lg", className }: StageProps) {
    const Stage = variant === "plinth" ? Plinth : variant === "scan" ? Scan : Orbit;
    return (
        <div className={cn("relative", className)} data-art-variant={variant}>
            <Stage id={id} art={art} size={size} />
        </div>
    );
}

type Inner = { id: string; art: Art; size: Size };

// The gentle hover every variant shares; reduced motion keeps it still.
function useFloat(size: Size) {
    const reduce = useReducedMotion();
    const amp = size === "lg" ? 10 : 3;
    return reduce
        ? { animate: { y: 0 }, transition: {} }
        : { animate: { y: [0, -amp, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } };
}

/* ------------------------------------------------------------------ orbit */

// A tilted ellipse, drawn twice: the top arc under the art and the bottom arc over it, so the
// object reads as threaded through the ring. Both copies share the same slow precession.
function Ring({ half, size, pulseKey }: { half: "back" | "front"; size: Size; pulseKey: string }) {
    const reduce = useReducedMotion();
    const clip = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    return (
        <motion.div
            aria-hidden
            className={cn("pointer-events-none absolute inset-x-[-18%] top-1/2 aspect-square -translate-y-1/2", half === "back" ? "z-0" : "z-20")}
            animate={reduce ? { rotate: -14 } : { rotate: [-18, -8, -18] }}
            transition={reduce ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
            <motion.svg
                key={pulseKey}
                viewBox="0 0 100 100"
                className="size-full overflow-visible"
                initial={reduce ? false : { scale: 0.88, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <defs>
                    <clipPath id={clip}>
                        {half === "back" ? <rect x="-10" y="-10" width="120" height="60" /> : <rect x="-10" y="50" width="120" height="60" />}
                    </clipPath>
                </defs>
                <g clipPath={`url(#${clip})`} fill="none">
                    {size === "lg" && <ellipse cx="50" cy="50" rx="48" ry="12" stroke="var(--brand)" strokeOpacity=".35" strokeWidth="3" style={{ filter: "blur(2.5px)" }} />}
                    <ellipse cx="50" cy="50" rx="48" ry="12" stroke="var(--brand)" strokeOpacity={half === "back" ? 0.6 : 1} strokeWidth={size === "lg" ? 0.9 : 1.8} />
                    {/* A brighter arc travelling round the ring: the spin. */}
                    {!reduce && (
                        <motion.ellipse
                            cx="50" cy="50" rx="48" ry="12"
                            stroke="#d9ffe8"
                            strokeWidth={size === "lg" ? 1.3 : 2.4}
                            strokeLinecap="round"
                            pathLength={100}
                            strokeDasharray="14 86"
                            strokeOpacity={half === "back" ? 0.4 : 0.9}
                            animate={{ strokeDashoffset: [0, -100] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </g>
            </motion.svg>
        </motion.div>
    );
}

function Orbit({ id, art, size }: Inner) {
    const float = useFloat(size);
    return (
        <>
            <Ring half="back" size={size} pulseKey={id} />
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={id}
                    className="absolute inset-0 z-10"
                    initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 1.12, rotate: 6 }}
                    transition={{ duration: 0.5, ease: EASE }}
                >
                    <motion.div className="absolute inset-0" {...float}>
                        <ArtImg art={art} size={size} className="left-[-10%] top-[-2%] h-[104%] w-[120%]" />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <Ring half="front" size={size} pulseKey={id} />
        </>
    );
}

/* ----------------------------------------------------------------- plinth */

function Plinth({ id, art, size }: Inner) {
    const reduce = useReducedMotion();
    const amp = size === "lg" ? 10 : 3;
    const loop = reduce ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" as const };
    return (
        <>
            {/* Floor: a dark glossy ellipse with a lit horizon line, and a green spill pooling under the art. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-[-16%] bottom-[-4%] h-[38%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_35%,#1a1d1b_0%,#101211_45%,rgba(10,10,10,0)_72%)]" />
            <div aria-hidden className="pointer-events-none absolute inset-x-[-4%] bottom-[25%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)]" />
            <motion.div
                key={`spill-${id}`}
                aria-hidden
                className="pointer-events-none absolute inset-x-[2%] bottom-[2%] h-[34%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_40%,rgba(74,222,128,.5)_0%,rgba(74,222,128,.16)_38%,rgba(74,222,128,0)_70%)]"
                initial={reduce ? false : { opacity: 0.2, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
            />
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.55, ease: EASE }}
                >
                    {/* Contact shadow: tightens as the art dips, spreads as it rises. */}
                    <motion.div
                        aria-hidden
                        className="absolute inset-x-[22%] bottom-[22%] h-[7%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,.7),rgba(0,0,0,0)_70%)]"
                        animate={reduce ? { scaleX: 1, opacity: 0.8 } : { scaleX: [1, 1.15, 1], opacity: [0.85, 0.55, 0.85] }}
                        transition={loop}
                    />
                    {/* Reflection: mirrored, blurred, fading out under the horizon. The mask sits on an
                        unflipped wrapper so the fade runs top to bottom. */}
                    <div aria-hidden className="absolute left-[-4%] top-[76%] h-[72%] w-[108%] [mask-image:linear-gradient(180deg,rgba(0,0,0,.45),transparent_38%)]">
                        <motion.div className="size-full" animate={reduce ? { y: 0 } : { y: [0, amp, 0] }} transition={loop}>
                            <Image
                                src={art.src}
                                width={art.w}
                                height={art.h}
                                sizes={size === "lg" ? "420px" : "120px"}
                                alt=""
                                className="size-full max-w-none -scale-y-100 object-contain object-bottom opacity-60 blur-[2px]"
                            />
                        </motion.div>
                    </div>
                    <motion.div className="absolute inset-0" animate={reduce ? { y: 0 } : { y: [0, -amp, 0] }} transition={loop}>
                        <ArtImg art={art} size={size} className="left-[-4%] top-[-6%] h-[82%] w-[108%] object-bottom" />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

/* ------------------------------------------------------------------- scan */

// SVG filter that turns the cut-out into green line art: the silhouette's contour plus its
// inner edges (a softened Laplacian, thresholded so faint detail doesn't speckle).
function EdgeFilter({ id, size }: { id: string; size: Size }) {
    return (
        <svg aria-hidden width="0" height="0" className="absolute">
            <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
                <feMorphology in="SourceAlpha" operator="dilate" radius={size === "lg" ? 1.2 : 0.8} result="fat" />
                <feComposite in="fat" in2="SourceAlpha" operator="out" result="contour" />
                <feGaussianBlur in="SourceGraphic" stdDeviation={size === "lg" ? 0.9 : 0.5} result="soft" />
                <feColorMatrix in="soft" type="matrix" values=".3 .59 .11 0 0  .3 .59 .11 0 0  .3 .59 .11 0 0  0 0 0 1 0" result="lum" />
                <feConvolveMatrix in="lum" order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" result="edge" />
                <feColorMatrix in="edge" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 0 0 0 0" result="edgeA" />
                <feComponentTransfer in="edgeA" result="edgeT">
                    <feFuncA type="linear" slope="2.2" intercept="-.25" />
                </feComponentTransfer>
                <feComposite in="edgeT" in2="SourceAlpha" operator="in" result="inner" />
                <feMerge result="lines">
                    <feMergeNode in="contour" />
                    <feMergeNode in="inner" />
                </feMerge>
                <feFlood floodColor="#4ade80" />
                <feComposite in2="lines" operator="in" result="green" />
                <feGaussianBlur in="green" stdDeviation="1.5" result="glow" />
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="green" />
                </feMerge>
            </filter>
        </svg>
    );
}

const LINE = "absolute inset-x-[-6%] h-px bg-[linear-gradient(90deg,transparent,#4ade80_20%,#d9ffe8_50%,#4ade80_80%,transparent)] shadow-[0_0_12px_2px_rgba(74,222,128,.55)]";

function ScanPass({ art, size }: { art: Art; size: Size }) {
    const reduce = useReducedMotion();
    const filterId = `edge${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
    // draw: the outline pass. fill: the real image pass, which starts as the first line lands.
    const draw = useMotionValue(reduce ? 1 : 0);
    const fill = useMotionValue(reduce ? 1 : 0);
    useEffect(() => {
        if (reduce) return;
        const a = animate(draw, 1, { duration: 0.9, ease: [0.45, 0, 0.25, 1] });
        const b = animate(fill, 1, { duration: 0.85, delay: 0.75, ease: [0.45, 0, 0.25, 1] });
        return () => { a.stop(); b.stop(); };
    }, [reduce, draw, fill]);
    // The sweep edge runs from just above the box to just below it, so the art's overflow and its
    // shadow are covered too; the sides stay open. Once a pass lands its clip is dropped.
    const edge = (v: number) => -4 + v * 112;
    const clip = (v: number) => (v >= 1 ? "none" : `inset(-10% -30% ${100 - edge(v)}% -30%)`);
    const drawClip = useTransform(draw, clip);
    const fillClip = useTransform(fill, clip);
    const drawTop = useTransform(draw, (v) => `${edge(v)}%`);
    const fillTop = useTransform(fill, (v) => `${edge(v)}%`);
    // Lines fade in at the top and out at the bottom; the outline dims once the fill has passed.
    const drawLine = useTransform(draw, [0, 0.06, 0.9, 1], [0, 1, 1, 0]);
    const fillLine = useTransform(fill, [0, 0.06, 0.9, 1], [0, 0.7, 0.7, 0]);
    const outline = useTransform(fill, [0, 1], [1, 0.12]);
    const box = "left-[-10%] top-[-2%] h-[104%] w-[120%]";
    return (
        <>
            <EdgeFilter id={filterId} size={size} />
            <motion.div className="absolute inset-0" style={{ clipPath: drawClip, opacity: outline }}>
                <Image
                    src={art.src}
                    width={art.w}
                    height={art.h}
                    sizes={size === "lg" ? "420px" : "120px"}
                    alt=""
                    style={{ filter: `url(#${filterId})` }}
                    className={cn("absolute max-w-none object-contain", box)}
                />
            </motion.div>
            <motion.div className="absolute inset-0" style={{ clipPath: fillClip }}>
                <ArtImg art={art} size={size} className={box} />
            </motion.div>
            {!reduce && (
                <>
                    <motion.div aria-hidden className={LINE} style={{ top: drawTop, opacity: drawLine }} />
                    <motion.div aria-hidden className={LINE} style={{ top: fillTop, opacity: fillLine }} />
                </>
            )}
        </>
    );
}

function Scan({ id, art, size }: Inner) {
    const float = useFloat(size);
    return (
        <>
            {/* Viewfinder corners: quiet framing for the scan. */}
            <div aria-hidden className="pointer-events-none absolute inset-[2%] opacity-50">
                {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
                    <span key={c} className={cn("absolute size-[10%] border-[var(--brand)]/60", c)} />
                ))}
            </div>
            <motion.div className="absolute inset-0" {...float}>
                <AnimatePresence mode="popLayout">
                    <motion.div key={id} className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        <ScanPass art={art} size={size} />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
}

/* ----------------------------------------------------------------- shared */

function ArtImg({ art, size, className }: { art: Art; size: Size; className?: string }) {
    return (
        <Image
            src={art.src}
            width={art.w}
            height={art.h}
            sizes={size === "lg" ? "420px" : "120px"}
            alt=""
            style={{ filter: artFilter(art, size) }}
            className={cn("absolute max-w-none object-contain", className)}
        />
    );
}
