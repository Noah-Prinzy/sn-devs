"use client";

import Image from "next/image";
import { useEffect, useState, type RefObject } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { kampalaNow } from "@/data/contact";
import { ScrollHint } from "@/components/scroll-hint";

// The Contact opener, "Studio at dusk" (design/contact/opener-v3-mockups.png, 04). A calm
// photo of a desk by a window at night stays behind the opener and the path cards (the
// backdrop is sticky across both). At rest: the line on the left, Kampala's clock on the right.
// Scrolling dims the room and pushes in a touch while the words rise away, and the cards arrive
// over it. The only constant motion is the clock's colon. Opacity and transform only.

const PHOTO = "/assets/home/intro-doors-night-desk.jpg"; // the photo from the mock-up (also the Home intro backdrop)
const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

// Kampala's time, "--:--" until mounted so the server and the client agree, then every 15 s.
export function useKampalaTime() {
    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        const tick = () => setTime(kampalaNow().time);
        tick();
        const t = setInterval(tick, 15_000);
        return () => clearInterval(t);
    }, []);
    return time ?? "--:--";
}

// The room behind the opener and the cards. It sticks for the whole stretch and takes no
// space (the negative margin hands its height back), so the sections scroll over it.
export function DuskBackdrop({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
    const push = useTransform(progress, (v) => 1 + 0.08 * span(v, 0, 1));
    const dim = useTransform(progress, (v) => 0.2 + 0.6 * span(v, 0.35, 1));
    return (
        <div aria-hidden className="pointer-events-none sticky top-0 -mb-[100svh] h-svh overflow-hidden">
            <motion.div
                initial={still ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-0"
            >
                <motion.div style={still ? undefined : { scale: push }} className="absolute inset-0">
                    <Image src={PHOTO} alt="" fill priority sizes="100vw" quality={85} className="object-cover object-[55%_55%]" />
                </motion.div>
            </motion.div>
            {/* The left stays dark for the words; the dimmer deepens as you scroll. */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,.88)_0%,rgba(10,10,10,.55)_45%,rgba(10,10,10,.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(10,10,10,.85)_0%,rgba(10,10,10,.35)_55%,rgba(10,10,10,.8)_100%)]" />
            <motion.div style={{ opacity: still ? 0.55 : dim }} className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#0a0a0a] to-transparent" />
        </div>
    );
}

export function ContactOpener({ heroRef, progress, still }: { heroRef: RefObject<HTMLElement | null>; progress: MotionValue<number>; still: boolean }) {
    const time = useKampalaTime();
    const [hh, mm] = time.split(":");
    // The words rise away over the middle of the pin; the clock follows a beat later.
    const wordsY = useTransform(progress, (v) => -90 * span(v, 0.45, 1));
    const wordsOut = useTransform(progress, (v) => 1 - span(v, 0.55, 1));
    const clockY = useTransform(progress, (v) => -60 * span(v, 0.5, 1));
    const clockOut = useTransform(progress, (v) => 1 - span(v, 0.6, 1));
    const hint = useTransform(progress, (v) => 1 - span(v, 0, 0.15));

    // Always pass animate: if the reduced-motion preference is only known after hydration, the
    // server-rendered hidden start still has a target to fade to (MotionConfig drops the y).
    const rise = (delay: number) => ({ initial: still ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } }) as const;

    return (
        <section ref={heroRef} aria-labelledby="contact-title" className={`relative ${still ? "h-svh" : "h-[150svh]"}`}>
            <div className="sticky top-0 flex h-svh items-center">
                <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pt-(--nav-h) md:grid-cols-[1.25fr_.75fr] md:items-center md:px-10 short:gap-4">
                    <motion.div style={still ? undefined : { y: wordsY, opacity: wordsOut }}>
                        <motion.p {...rise(0.2)} className="font-mono text-[11px] uppercase tracking-[.3em] text-(--brand)">
                            Contact · Kampala
                        </motion.p>
                        <h1 id="contact-title" className="mt-6 font-heading text-[clamp(3rem,4.6vw+2.6vh,7.5rem)] leading-[0.98] tracking-[-0.01em] short:mt-3 short:text-[clamp(2.2rem,7vh,4rem)]">
                            <motion.span {...rise(0.35)} className="block">
                                Two people.
                            </motion.span>
                            <motion.span {...rise(0.55)} className="block text-(--brand)">
                                One conversation.
                            </motion.span>
                        </h1>
                        <motion.p {...rise(0.8)} className="mt-7 max-w-md text-lg leading-relaxed text-neutral-300 short:mt-3 short:text-base">
                            Shaun and Noah build websites, apps and creative work from Kampala. Tell us about yours.
                        </motion.p>
                    </motion.div>

                    <motion.div style={still ? undefined : { y: clockY, opacity: clockOut }} className="md:text-right">
                        <motion.p
                            initial={still ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.9 }}
                            aria-label={`Kampala time ${time}`}
                            className="text-[clamp(4.5rem,7vw+3vh,11rem)] font-extralight leading-[0.9] tracking-[-0.03em] tabular-nums text-white short:text-[clamp(3rem,11vh,5rem)]"
                        >
                            {hh}
                            <span aria-hidden className={still ? "" : "colon-breathe"}>:</span>
                            {mm}
                        </motion.p>
                        <motion.p
                            initial={still ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-4 font-mono text-[11px] uppercase tracking-[.25em] text-neutral-300"
                        >
                            <span aria-hidden className="mr-2 inline-block size-1.5 bg-(--brand) align-middle" />
                            EAT · we reply within a day
                        </motion.p>
                    </motion.div>
                </div>

                {!still && (
                    <motion.div style={{ opacity: hint }} className="absolute inset-x-0 bottom-[5vh] h-10 max-md:hidden short:hidden">
                        <ScrollHint />
                    </motion.div>
                )}
            </div>
        </section>
    );
}
