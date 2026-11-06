"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { shotsOf } from "@/components/store/shots";

// Fades and lifts its children in as they scroll into view.
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }} className={className}>
            {children}
        </motion.div>
    );
}

type Shot = { src: string; label: string; w: number; h: number; phone?: boolean };

// A short strip of the template's other screens; each opens larger.
export function PagesInside({ slug, name }: { slug: string; name: string }) {
    const s = shotsOf(slug);
    const shots: Shot[] = [
        s.inner && { src: s.inner, label: "Inner page", w: 1440, h: 900 },
        s.tall && { src: s.tall.src, label: "Full home page", w: 1440, h: s.tall.h },
        s.mobile && { src: s.mobile, label: "On a phone", w: 375, h: 812, phone: true },
    ].filter(Boolean) as Shot[];
    const [open, setOpen] = useState<Shot | null>(null);

    useEffect(() => {
        if (!open) return;
        const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [open]);

    if (!shots.length) return null;
    return (
        <>
            <div className="mt-6 flex gap-5 overflow-x-auto pb-2">
                {shots.map((x, i) => (
                    <Reveal key={x.src} delay={i * 0.1} className="shrink-0">
                        <button onClick={() => setOpen(x)} className="group block text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                            <div className={`relative overflow-hidden border border-border bg-muted transition-colors group-hover:border-[var(--brand)] ${x.phone ? "aspect-[375/812] h-64" : "aspect-[16/10] h-64"}`}>
                                <Image src={x.src} alt={`${name}: ${x.label}`} fill sizes="420px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground">{x.label}</p>
                        </button>
                    </Reveal>
                ))}
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div role="dialog" aria-modal aria-label={open.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
                        className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 p-4 md:p-10" data-lenis-prevent>
                        <button aria-label="Close" onClick={() => setOpen(null)} className="fixed right-4 top-4 z-10 grid size-10 place-items-center bg-white/10 text-white hover:bg-white/20"><X className="size-5" /></button>
                        <motion.div initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} className={`mx-auto ${open.phone ? "max-w-sm" : "max-w-5xl"}`} onClick={(e) => e.stopPropagation()}>
                            <Image src={open.src} alt={`${name}: ${open.label}`} width={open.w} height={open.h} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full border border-white/10" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
