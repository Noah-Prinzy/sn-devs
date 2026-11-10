"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import DecryptedText from "@/components/DecryptedText";
import { useScrollAnchors } from "@/components/use-scroll-anchors";
import { Rise, Scene } from "@/components/home/scene";
import { SignalRings, StepWriteArt, StepReplyArt, StepQuoteArt } from "@/components/contact/signal-art";
import { ContactForm } from "@/components/contact/contact-form";
import { EMAIL, PEOPLE, TICKER, whatsappText } from "@/data/contact";
import { SERVICE_GROUPS, ugx } from "@/data/services";

// Contact — "the transmission". A pinned opener where signal rings emit from the word's
// period, a status ticker, the channel (form + live telegram), a green next-steps band,
// a short FAQ priced from the services data, and a final scene to close.

const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

export function ContactPage() {
    const hero = useRef<HTMLElement>(null);
    const channel = useRef<HTMLElement>(null);

    // Static first (server and first client render agree — no hydration mismatch),
    // then the real preference after mount. useReducedMotion() flips between renders,
    // which React reads as changed HTML.
    const [reduce, setReduce] = useState(true);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setReduce(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    // Function transforms so every animation lands exactly at 100% of the pin.
    const wordScale = useTransform(scrollYProgress, (v) => 0.92 + 0.08 * span(v, 0, 1));
    const ledeIn = useTransform(scrollYProgress, (v) => span(v, 0.55, 0.9));

    useScrollAnchors();

    return (
        <MotionConfig reducedMotion="user">
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100 selection:bg-[var(--brand)] selection:text-[var(--brand-fg)]">
                {/* 1 — Opener: the signal puts itself on air. */}
                <section ref={hero} className="relative h-[220svh]" aria-labelledby="contact-title">
                    <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
                        <div
                            aria-hidden
                            className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
                        />
                        <motion.div style={reduce ? undefined : { scale: wordScale }} className="relative text-center">
                            <p className="mb-8 font-mono text-xs uppercase tracking-[.3em] text-neutral-400">
                                <DecryptedText text="Contact · S&N Devs · Kampala" animateOn="view" speed={30} maxIterations={10} />
                            </p>
                            <motion.h1
                                id="contact-title"
                                className="bg-[linear-gradient(180deg,#ffffff_0%,#cfcfcf_100%)] bg-clip-text font-heading text-[22vw] font-extrabold leading-[0.85] tracking-tight text-transparent drop-shadow-[0_20px_30px_rgba(0,0,0,.6)] md:text-[19vw]"
                            >
                                {/* Play-once entrance: the lines are never scroll-gated, so the
                                    hero is fully visible at the top of the page and without JS.
                                    reducedMotion="user" makes these instant for reduce users. */}
                                <motion.span
                                    initial={{ opacity: 0, y: 48 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="block"
                                >
                                    TALK
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 48 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                                    className="block"
                                >
                                    TO US
                                    <span className="relative inline-block text-[var(--brand)]">
                                        .
                                        {!reduce && <SignalRings progress={scrollYProgress} />}
                                    </span>
                                </motion.span>
                            </motion.h1>
                        </motion.div>
                        <motion.div style={reduce ? undefined : { opacity: ledeIn }} className="absolute bottom-[12vh] inset-x-0 px-4 text-center">
                            <p className="font-heading text-3xl md:text-5xl">
                                Write. Call. <span className="italic text-[var(--brand)]">Launch.</span>
                            </p>
                            <p className="mt-3 text-neutral-400">One message. One reply. Within a working day.</p>
                        </motion.div>
                    </div>
                </section>

                {/* 2 — Status ticker. */}
                <div aria-hidden className="overflow-hidden border-y border-white/10 bg-[#0d0d0d] py-3">
                    <div className="flex w-max animate-marquee-left motion-reduce:!animate-none">
                        {[0, 1].map((copy) => (
                            <div key={copy} className="flex shrink-0 items-center">
                                {TICKER.map((t) => (
                                    <span key={t} className="flex items-center font-mono text-xs uppercase tracking-[.3em] text-neutral-400">
                                        <span className="px-6">{t}</span>
                                        <span className="size-1.5 bg-[var(--brand)]" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3 — The channel: the studio light is on. A full-bleed photo scene, the
                    house Scene component carrying the drift, with the letter on a light table. */}
                <Scene
                    id="channel"
                    sectionRef={channel}
                    img="/assets/contact/card-lamp-brick.jpg"
                    pos="50% 18%"
                    shade="full"
                    label="Write to us"
                >
                    <span aria-hidden className="hidden 2xl:block absolute left-8 top-1/2 -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[.4em] text-neutral-600 [writing-mode:vertical-rl]">
                        Transmission · S&amp;N Devs
                    </span>
                    <Rise>
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">Contact · The channel</p>
                        <h2 className="mt-4 font-heading text-4xl leading-[1.05] md:text-6xl">
                            Tell us what you&apos;re <span className="italic text-[var(--brand)]">building.</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-neutral-400 md:text-lg">
                            Fill the letter on the left — watch it assemble on the right. Send it and it lands
                            in both our inboxes.
                        </p>
                    </Rise>
                    <Rise delay={0.15} className="mt-12">
                        <ContactForm />
                    </Rise>
                </Scene>

                {/* 4 — Green band: what happens next. A full green scene, like the
                    packages scene on Services — the page's one loud color moment. */}
                <section className="relative flex min-h-svh items-center bg-[var(--brand)] py-24 text-[var(--brand-fg)] md:py-28" aria-label="What happens next">
                    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                        <Rise>
                            <h2 className="font-heading text-5xl leading-[1.02] md:text-7xl">What happens next.</h2>
                        </Rise>
                        <ol className="relative mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
                            <span aria-hidden className="absolute left-0 right-[28%] top-7 hidden border-t-2 border-dashed border-[var(--brand-fg)]/40 md:block" />
                            {[
                                { n: "01", art: <StepWriteArt />, t: "You write", d: "The form, an email or WhatsApp — whatever is easiest. A sentence is enough." },
                                { n: "02", art: <StepReplyArt />, t: "We reply", d: "Within one working day, with questions or a time for a call." },
                                { n: "03", art: <StepQuoteArt />, t: "We call & quote", d: "A short call, a fixed quote and a start date. No surprises after that." },
                            ].map((s, i) => (
                                <li key={s.n} className="relative">
                                    <span aria-hidden className="pointer-events-none absolute -top-12 right-0 select-none font-heading text-[7rem] leading-none text-[var(--brand-fg)] opacity-[.08] md:text-[9rem]">
                                        {s.n}
                                    </span>
                                    <Rise delay={i * 0.12}>
                                        <div className="flex items-center gap-5">
                                            <span className="relative z-10 grid place-items-center bg-[var(--brand)]">{s.art}</span>
                                            <span className="font-mono text-sm tabular-nums">{s.n}</span>
                                        </div>
                                        <h3 className="mt-6 font-heading text-3xl">{s.t}</h3>
                                        <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-80">{s.d}</p>
                                    </Rise>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 5 — Before you write: an editorial spread — the heading holds the left
                    rail while the questions run down the right. */}
                <section className="mx-auto grid max-w-6xl gap-12 px-4 py-28 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-6" aria-label="Before you write">
                    <Rise className="md:sticky md:top-28 md:self-start">
                        <p className="font-mono text-xs uppercase tracking-[.3em] text-[var(--brand)]">Contact · Good to know</p>
                        <h2 className="mt-4 font-heading text-4xl leading-[1.05] md:text-6xl">Before you write.</h2>
                        <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-400">
                            The short version. The whole menu, with what&apos;s included, lives on the{" "}
                            <Link href="/services" className="text-[var(--brand)] underline underline-offset-4">Services page</Link>.
                        </p>
                    </Rise>
                    <Rise delay={0.12}>
                        <Faq />
                    </Rise>
                </section>

                {/* 6 — Final scene: the map of where we work, ghosted under the rings. */}
                <section className="relative grid min-h-svh place-items-center overflow-hidden bg-black" aria-label="Ready when you are">
                    <div aria-hidden className="absolute inset-0">
                        <Image
                            src="/assets/contact/location-uganda-map.jpg"
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover opacity-[.16] grayscale"
                            style={{ objectPosition: "50% 30%" }}
                        />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(74,222,128,.18),transparent_70%)]" />
                    <SlowRings />
                    <div className="relative z-10 px-4 text-center">
                        <Rise>
                            <h2 className="font-heading text-5xl leading-[1.02] md:text-7xl">
                                <DecryptedText text="Ready when you are" animateOn="view" speed={30} maxIterations={10} />
                                <span className="text-[var(--brand)]">.</span>
                            </h2>
                            <p className="mt-4 text-neutral-400 md:text-lg">Tell us the idea. We&apos;ll bring the plan.</p>
                        </Rise>
                        <Rise delay={0.15}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                                    <Button asChild size="lg">
                                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("S&N Devs — new project")}`}>
                                            <EnvelopeSimple /> Write the email
                                        </a>
                                    </Button>
                                </Magnet>
                                <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                                    <Button asChild variant="outline" size="lg">
                                        <a href={whatsappText("Hello S&N Devs — I found you on your site.")} target="_blank" rel="noopener noreferrer">
                                            <WhatsappLogo /> WhatsApp us <ArrowUpRight />
                                        </a>
                                    </Button>
                                </Magnet>
                            </div>
                        </Rise>
                        <Rise delay={0.25}>
                            <p className="mt-12 font-mono text-xs uppercase tracking-[.3em] text-neutral-500">
                                Prefer a call? {PEOPLE.map((p) => `${p.name}: ${p.phoneDisplay}`).join(" · ")}
                            </p>
                        </Rise>
                    </div>
                </section>
            </main>
        </MotionConfig>
    );
}

// Two slow rings breathing behind the final line — pure CSS, hidden from reduced motion.
function SlowRings() {
    return (
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 motion-reduce:!hidden">
            {[0, 1].map((i) => (
                <span
                    key={i}
                    style={{ animationDelay: `${i * 1.6}s` }}
                    className="absolute left-1/2 top-1/2 size-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--brand)]/25 motion-safe:animate-[ring-breathe_4.8s_ease-in-out_infinite]"
                />
            ))}
        </span>
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
                    systems are quoted per project. The whole menu, with what&apos;s included, is on the <Link href="/services" className="text-[var(--brand)] underline underline-offset-4">Services page</Link>.</p>
                </>
            ),
        },
        { q: "How long does it take?", a: <p>A launch page: about a week. A full site: two to four weeks, depending on how ready the words and pictures are. We agree the date before we start — and we keep it.</p> },
        { q: "Do you work outside Kampala?", a: <p>Yes. Calls over WhatsApp or Google Meet, the work happens in the cloud, and invoices go out in UGX or USD — your choice.</p> },
        { q: "What should I include in my message?", a: <p>What the project is for, the pages or features you expect, your deadline, and a budget range if you have one. A sentence is enough — we&apos;ll ask about the rest on the call.</p> },
    ];
    return (
        <div>
            {items.map((it, i) => (
                <details key={i} className="group border-t border-white/15 last:border-b">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg transition-colors duration-200 outline-none hover:text-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60 group-open:text-[var(--brand)] [&::-webkit-details-marker]:hidden">
                        {it.q}
                        <Plus className="size-4 shrink-0 text-[var(--brand)] transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <div className="pb-6 text-sm leading-relaxed text-neutral-300 [&_p]:mt-2">{it.a}</div>
                </details>
            ))}
        </div>
    );
}
