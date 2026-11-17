"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type Ref } from "react";
import { Plus } from "@phosphor-icons/react";
import { SERVICE_GROUPS, ugx } from "@/data/services";
import { useStill } from "@/components/store/browser-frame";
import { lenisRef } from "@/components/lenis-scroll";
import { ServiceDrawer } from "@/components/services/service-drawer";
import { ServiceDrawing, ServiceIcon, ruleClass, triggerClass } from "@/components/services/service-graphics";

// The menu (design/services/menu-plan.md): every service as a wide row with its own drawing on
// the right (design/services/menu-graphics-options.html, G4). On hover or focus the bottom rule
// draws toward the drawing and the drawing plays its one action. A click opens the drawer.
// /services?s=<id> opens one.

const IDS = SERVICE_GROUPS.flatMap((g) => g.services.map((s) => s.id));

const onUrl = (cb: () => void) => {
    window.addEventListener("popstate", cb);
    return () => window.removeEventListener("popstate", cb);
};
const readSearch = () => window.location.search;
const noSearch = () => "";

function setParam(id: string | null) {
    const q = new URLSearchParams(window.location.search);
    if (id) q.set("s", id);
    else q.delete("s");
    const qs = q.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

export function ServiceRows({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
    const still = useStill();
    const linked = new URLSearchParams(useSyncExternalStore(onUrl, readSearch, noSearch)).get("s");
    const [chosen, setChosen] = useState<string | null | undefined>(undefined); // undefined: follow the link
    const openId = chosen === undefined ? (linked && IDS.includes(linked) ? linked : null) : chosen;
    const rows = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastOpen = useRef<string | null>(null);

    const go = (id: string | null) => {
        if (id) lastOpen.current = id;
        setChosen(id);
        setParam(id);
    };

    // The page behind the drawer holds still (Lenis would otherwise keep the wheel).
    useEffect(() => {
        if (!openId) return;
        lastOpen.current = openId;
        lenisRef.current?.stop();
        return () => lenisRef.current?.start();
    }, [openId]);

    let n = 0;
    return (
        <section ref={sectionRef} aria-labelledby="menu-title" className="mx-auto max-w-7xl px-4 pb-24 pt-24 md:px-6 md:pt-32">
            <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">The menu</p>
            <h2 id="menu-title" className="mt-4 max-w-3xl font-heading text-[clamp(2.25rem,3vw+2vh,4.5rem)] leading-[1.02]">
                Nine services. <span className="italic text-(--brand)">One small team.</span>
            </h2>
            <p className="mt-4 max-w-xl text-neutral-400 md:text-lg">Open any one for what&apos;s included and the price.</p>

            {SERVICE_GROUPS.map((g) => (
                <div key={g.id} className="mt-14 md:mt-20">
                    <div className="flex flex-col gap-1 border-b border-white/25 pb-4 md:flex-row md:items-end md:justify-between md:gap-8">
                        <h3 className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">
                            {g.index} · {g.name}
                        </h3>
                        <p className="text-sm text-neutral-400">{g.tagline}</p>
                    </div>
                    <ul className="group/list">
                        {g.services.map((s) => {
                            const num = String(++n).padStart(2, "0");
                            const unit = s.unit ? ` ${s.unit}` : "";
                            return (
                                <li key={s.id}>
                                    <button
                                        ref={(el) => {
                                            rows.current[s.id] = el;
                                        }}
                                        type="button"
                                        aria-haspopup="dialog"
                                        onClick={() => go(s.id)}
                                        className={`group/row ${triggerClass} relative block w-full overflow-hidden border-b border-white/10 text-left outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--brand) md:group-hover/list:opacity-50 md:hover:opacity-100! md:focus-visible:opacity-100!`}
                                    >
                                        {/* Desktop: the service's drawing in the thumbnail box. On hover/focus the
                                            bottom rule draws toward it, then it plays its one action and settles. */}
                                        <span
                                            aria-hidden
                                            className="absolute bottom-[14%] right-16 top-[14%] hidden w-52 border border-white/12 bg-[#0d0d0d] px-1.5 py-1 transition-colors duration-500 group-hover/row:border-(--brand)/50 group-focus-visible/row:border-(--brand)/50 md:block"
                                        >
                                            <ServiceDrawing id={s.id} variant="row" still={still} />
                                        </span>
                                        <span aria-hidden className={`hidden md:block ${ruleClass(still)}`} />
                                        <span className="relative hidden h-[clamp(6.5rem,8vw,8.5rem)] grid-cols-[3rem_1fr_auto_10rem_17rem] items-center gap-6 px-2 md:grid lg:px-4">
                                            <span className="font-mono text-xs tracking-[.2em] text-neutral-500 group-hover/row:text-(--brand)">{num}</span>
                                            <span className={`font-heading text-[clamp(1.5rem,2.1vw,2.4rem)] leading-tight ${still ? "" : "transition-transform duration-500"} group-hover/row:translate-x-3 group-focus-visible/row:translate-x-3`}>
                                                {s.name}
                                            </span>
                                            <span className="text-sm text-neutral-400 group-hover/row:text-neutral-200">{s.delivery}</span>
                                            <span className="text-right tabular-nums">
                                                <span className="block text-xs text-neutral-500 group-hover/row:text-neutral-300">from</span>
                                                <span className="font-heading text-xl transition-colors group-hover/row:text-(--brand) group-focus-visible/row:text-(--brand)">{ugx(s.from)}</span>
                                                {unit && <span className="block text-xs text-neutral-500 group-hover/row:text-neutral-300">{unit.trim()}</span>}
                                            </span>
                                            <Plus aria-hidden className="size-5 justify-self-end text-neutral-400 group-hover/row:text-(--brand)" />
                                        </span>

                                        {/* Phones: the line icon, the name, the price and the time. */}
                                        <span className="flex items-center gap-4 py-4 md:hidden">
                                            <span aria-hidden className="grid size-18 shrink-0 place-items-center bg-white/5 text-(--brand)">
                                                <ServiceIcon id={s.id} className="size-9" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-heading text-xl leading-tight">{s.name}</span>
                                                <span className="mt-1 block text-sm text-neutral-400">
                                                    from <span className="text-(--brand)">{ugx(s.from)}</span>
                                                    {unit} · {s.delivery}
                                                </span>
                                            </span>
                                            <Plus aria-hidden className="size-5 shrink-0 text-neutral-400" />
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            <ServiceDrawer
                id={openId}
                still={still}
                onClose={() => go(null)}
                onGo={(id) => go(id)}
                onClosed={(e) => {
                    // Back to the row of the service last shown, not the one first clicked.
                    e.preventDefault();
                    if (lastOpen.current) rows.current[lastOpen.current]?.focus();
                }}
            />
        </section>
    );
}
