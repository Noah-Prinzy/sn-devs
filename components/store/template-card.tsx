"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ugx, usd } from "@/data/services";
import { TIERS, priceOf, type Template } from "@/data/templates";
import { BrowserFrame } from "@/components/store/browser-frame";
import { PriceOdometer } from "@/components/store/price-odometer";

// True on devices with a real pointer; phones get the self-scrolling preview instead.
function useCanHover() {
    const [can, setCan] = useState(true);
    useEffect(() => {
        const m = window.matchMedia("(hover: hover) and (pointer: fine)");
        const set = () => setCan(m.matches);
        set();
        m.addEventListener("change", set);
        return () => m.removeEventListener("change", set);
    }, []);
    return can;
}

// A store card: the template's page scrolls inside its browser window on hover, a green
// light follows the cursor round the edge, the card leans a couple of degrees towards it,
// and the price rolls in like an odometer.
export function TemplateCard({ t, index = 0 }: { t: Template; index?: number }) {
    const price = priceOf(t);
    const ref = useRef<HTMLAnchorElement>(null);
    const canHover = useCanHover();
    const reduce = useReducedMotion();
    const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
    const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

    function move(e: PointerEvent<HTMLAnchorElement>) {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--x", `${x * 100}%`);
        el.style.setProperty("--y", `${y * 100}%`);
        if (!reduce) { ry.set((x - 0.5) * 5); rx.set((0.5 - y) * 4); }
    }
    function leave() { rx.set(0); ry.set(0); }

    return (
        <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className="h-full">
            <Link
                ref={ref}
                href={`/store/${t.slug}`}
                onPointerMove={move}
                onPointerLeave={leave}
                className="group relative flex h-full flex-col border border-border bg-[#0d0d0d] p-3 outline-none transition-colors hover:border-transparent focus-visible:ring-2 focus-visible:ring-(--brand)"
            >
                {/* The edge light: a radial glow masked to the 1px border. */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: "radial-gradient(260px circle at var(--x,50%) var(--y,0%), var(--brand), transparent 70%)",
                        padding: 1,
                        WebkitMask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
                        mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
                    }}
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(420px circle at var(--x,50%) var(--y,0%), rgba(74,222,128,.07), transparent 60%)" }} />

                <BrowserFrame slug={t.slug} name={t.name} play={canHover ? "hover" : "auto"} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />

                <div className="relative flex flex-1 flex-col px-2 pb-2 pt-5">
                    <p className="text-[11px] uppercase tracking-[.25em] text-muted-foreground">{TIERS[t.tier]}</p>
                    <h3 className="mt-2 font-heading text-2xl transition-colors group-hover:text-(--brand)">{t.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
                    <div className="mt-auto flex items-end justify-between pt-6">
                        <p className="font-heading text-xl text-(--brand)">
                            <PriceOdometer text={ugx(price)} delay={(index % 3) * 0.08} />
                            <span className="ml-2 font-sans text-xs text-muted-foreground">{usd(price)}</span>
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                            View <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
