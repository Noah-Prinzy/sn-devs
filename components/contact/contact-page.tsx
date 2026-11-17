"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowDown, ChatCircleDots, Layout, PaperPlaneTilt } from "@phosphor-icons/react";
import { SiteMotion } from "@/components/site-motion";
import { useStill } from "@/components/store/browser-frame";
import { lenisRef } from "@/components/lenis-scroll";
import { serviceFromParam } from "@/data/contact";
import { pinStops, sectionStops, useScrollAnchors } from "@/components/use-scroll-anchors";
import { ContactOpener, DuskBackdrop, useKampalaTime } from "@/components/contact/contact-opener";
import { ProjectForm } from "@/components/contact/project-form";
import { QuestionForm } from "@/components/contact/question-form";
import { TemplateForm } from "@/components/contact/template-form";
import { DirectLines } from "@/components/contact/direct-lines";
import { Faq } from "@/components/contact/faq";

// Contact — "pick a way in" (design/contact/contact-plan-v3.md). The "Studio at dusk" opener
// (a room at night behind the opener and the cards), three path cards and only the fields the
// chosen path needs; then the direct lines on a green band and a short FAQ.

type Path = "project" | "question" | "templates";

const PATHS: { id: Path; n: string; title: string; line: string; icon: ReactNode }[] = [
    { id: "project", n: "01", title: "Start a project", line: "Websites, apps, care or creative work. Tell us the idea.", icon: <PaperPlaneTilt /> },
    { id: "question", n: "02", title: "Quick question", line: "One line on WhatsApp. We answer fast.", icon: <ChatCircleDots /> },
    { id: "templates", n: "03", title: "Templates", line: "Buy, set up or customise an S&N Edition.", icon: <Layout /> },
];

// The query string, read as an external store: the server and the hydrating client both see
// "", then the real value on the first client render, with no mismatch.
const onUrl = (cb: () => void) => {
    window.addEventListener("popstate", cb);
    return () => window.removeEventListener("popstate", cb);
};
const readSearch = () => window.location.search;
const noSearch = () => "";

// Which path a link asks for: ?path= wins, then ?service=templates (the Store), then any
// known ?service= (the Services page). Otherwise nothing is picked.
function pathFrom(q: URLSearchParams): Path | null {
    const p = q.get("path");
    if (p === "project" || p === "question" || p === "templates") return p;
    if (q.get("service") === "templates" && q.get("template")) return "templates";
    if (serviceFromParam(q.get("service"))) return "project";
    return null;
}

// Mobile: each panel slot sits right under its card. Desktop: cards in a row, panel below.
const CARD_ORDER = ["order-1", "order-3", "order-5"];
const PANEL_ORDER = ["order-2", "order-4", "order-6"];

export function ContactPage() {
    const still = useStill();
    const q = new URLSearchParams(useSyncExternalStore(onUrl, readSearch, noSearch));
    const [chosen, setChosen] = useState<Path | null | undefined>(undefined); // undefined: follow the link
    const [dropService, setDropService] = useState(false);
    const path = chosen === undefined ? pathFrom(q) : chosen;
    const service = dropService ? null : serviceFromParam(q.get("service"));
    const idx = PATHS.findIndex((p) => p.id === path);

    const hero = useRef<HTMLElement>(null);
    const paths = useRef<HTMLElement>(null);
    const cards = useRef<(HTMLButtonElement | null)[]>([]);
    const panel = useRef<HTMLDivElement>(null);
    const reveal = useRef(false); // scroll the panel into view after a click, not after arrow keys
    const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
    const time = useKampalaTime();

    // Anchors: the opener pin (start and end) and the top of the cards; the forms scroll free.
    useScrollAnchors(() => [...pinStops(hero.current, [0, 1]), ...sectionStops([paths])]);

    const pick = (p: Path, scroll: boolean) => {
        setChosen(p);
        reveal.current = scroll;
        const next = new URLSearchParams(window.location.search);
        next.set("path", p);
        window.history.replaceState(window.history.state, "", `${window.location.pathname}?${next}`);
    };

    useEffect(() => {
        if (!reveal.current || !panel.current) return;
        reveal.current = false;
        const el = panel.current;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -120, immediate: still });
        else el.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    }, [path, still]);

    // Radio-group keys: arrows move and select (without scrolling the page), Home/End jump.
    const onKey = (e: KeyboardEvent, i: number) => {
        const last = PATHS.length - 1;
        const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        const j = (to + PATHS.length) % PATHS.length;
        cards.current[j]?.focus();
        pick(PATHS[j].id, false);
    };

    return (
        <SiteMotion>
            <main className="bg-[#0a0a0a] text-neutral-100 selection:bg-(--brand) selection:text-(--brand-fg)">
                {/* The room stays behind the opener and the cards. */}
                <div className="relative">
                <DuskBackdrop progress={scrollYProgress} still={still} />
                <ContactOpener heroRef={hero} progress={scrollYProgress} still={still} />

                <section ref={paths} aria-labelledby="paths-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-24 pt-10 md:px-6 md:pb-32">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[.3em] text-(--brand)">Pick a way in</p>
                            <h2 id="paths-title" className="mt-4 font-heading text-[clamp(2.5rem,3.4vw+2.6vh,5.5rem)] leading-[0.98]">
                                How can we <span className="text-(--brand)">help?</span>
                            </h2>
                        </div>
                        <p aria-hidden className="hidden pb-2 text-5xl font-extralight tabular-nums text-neutral-400 md:block">{time}</p>
                    </div>
                    <p className="mb-10 mt-5 max-w-xl text-lg text-neutral-300 md:mb-14">Pick what fits. Each one takes about a minute.</p>
                    <div className="grid gap-3 md:grid-cols-3">
                        <div role="radiogroup" aria-label="What do you need?" className="contents">
                            {PATHS.map((p, i) => {
                                const on = path === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        ref={(el) => {
                                            cards.current[i] = el;
                                        }}
                                        type="button"
                                        role="radio"
                                        aria-checked={on}
                                        aria-controls={on ? "contact-panel" : undefined}
                                        tabIndex={on || (idx < 0 && i === 0) ? 0 : -1}
                                        onClick={() => pick(p.id, true)}
                                        onKeyDown={(e) => onKey(e, i)}
                                        className={`group relative flex min-h-44 flex-col overflow-hidden border p-6 text-left transition-[border-color,color,opacity,translate] duration-300 hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] md:min-h-56 md:p-7 md:order-none ${CARD_ORDER[i]} ${
                                            on
                                                ? "border-(--brand) bg-[#0f0f0f] text-(--brand-fg) delay-100"
                                                : `border-white/15 bg-[#0f0f0f]/75 backdrop-blur-md hover:border-white/40 ${idx >= 0 ? "opacity-60 hover:opacity-100" : ""}`
                                        }`}
                                    >
                                        {/* The green fills the card from the bottom when it is picked. */}
                                        <span aria-hidden className={`absolute inset-0 origin-bottom bg-(--brand) ${still ? "" : "transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"} ${on ? "scale-y-100" : "scale-y-0"}`} />
                                        <span className="relative flex items-center justify-between">
                                            <span className={`font-mono text-xs tracking-[.2em] ${on ? "" : "text-(--brand)"}`}>{p.n}</span>
                                            <span aria-hidden className={`[&_svg]:size-6 ${on ? "" : "text-neutral-400 group-hover:text-(--brand)"}`}>{p.icon}</span>
                                        </span>
                                        <span className="relative mt-auto pt-8 font-heading text-[1.75rem] leading-tight md:text-3xl">{p.title}</span>
                                        <span className={`relative mt-2 text-sm leading-relaxed ${on ? "opacity-80" : "text-neutral-400"}`}>{p.line}</span>
                                        <ArrowDown
                                            aria-hidden
                                            className={`absolute bottom-6 right-6 size-5 transition-transform duration-300 md:bottom-7 md:right-7 ${on ? "" : "-rotate-90 text-neutral-500 group-hover:text-(--brand)"}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {path && (
                            <motion.div
                                key={path}
                                ref={panel}
                                id="contact-panel"
                                role="region"
                                aria-label={PATHS[idx].title}
                                initial={still ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                                className={`scroll-mt-28 border border-white/12 bg-[#0d0d0d] p-5 sm:p-7 md:order-last md:col-span-3 md:p-10 ${PANEL_ORDER[idx]}`}
                            >
                                <h2 className="mb-8 font-heading text-2xl md:text-3xl">
                                    <span className="mr-3 font-mono text-sm tracking-[.2em] text-(--brand)">{PATHS[idx].n}</span>
                                    {PATHS[idx].title}
                                </h2>
                                {path === "project" && <ProjectForm service={service} onDropService={() => setDropService(true)} />}
                                {path === "question" && <QuestionForm />}
                                {path === "templates" && <TemplateForm initial={q.get("template") ?? ""} />}
                            </motion.div>
                        )}
                    </div>
                </section>
                </div>

                <DirectLines />
                <Faq />
            </main>
        </SiteMotion>
    );
}
