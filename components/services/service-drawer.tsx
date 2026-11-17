"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Clock, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SERVICE_GROUPS, ugx, usd } from "@/data/services";
import { ServiceDrawing, panelClass } from "@/components/services/service-graphics";

// One service, opened from a menu row: a side panel from md up, a bottom sheet on phones.
// Radix Dialog does the focus trap, Escape, the backdrop and aria; Previous / Next step
// through all nine without closing it.

const ALL = SERVICE_GROUPS.flatMap((g) => g.services.map((s) => ({ ...s, group: g })));

const MOVE = {
    live: "data-[state=open]:animate-sheet-in data-[state=closed]:animate-sheet-out md:data-[state=open]:animate-drawer-in md:data-[state=closed]:animate-drawer-out",
    still: "data-[state=open]:animate-soft-in data-[state=closed]:animate-soft-out",
};

export function ServiceDrawer({
    id,
    still,
    onClose,
    onGo,
    onClosed,
}: {
    id: string | null;
    still: boolean;
    onClose: () => void;
    onGo: (id: string) => void;
    onClosed: (e: Event) => void;
}) {
    // Keep the last service on screen while the panel animates out (id is null by then).
    const [shown, setShown] = useState<string | null>(id);
    if (id && id !== shown) setShown(id);
    const i = ALL.findIndex((s) => s.id === shown);
    const svc = ALL[i];
    if (!svc) return null;
    const prev = ALL[(i - 1 + ALL.length) % ALL.length];
    const next = ALL[(i + 1) % ALL.length];

    return (
        <Dialog.Root open={!!id} onOpenChange={(o) => !o && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-60 bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-soft-in data-[state=closed]:animate-soft-out" />
                <Dialog.Content
                    onCloseAutoFocus={onClosed}
                    className={`fixed inset-x-0 bottom-0 z-61 flex max-h-[92svh] flex-col border-t border-white/15 bg-[#0d0d0d] text-neutral-100 outline-none md:inset-y-0 md:left-auto md:max-h-none md:w-[min(34rem,100vw)] md:border-l md:border-t-0 ${still ? MOVE.still : MOVE.live}`}
                >
                    <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                        <motion.div key={svc.id} initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className={`relative grid aspect-video w-full place-items-center ${panelClass}`}>
                                {/* Keyed by the service (the wrapper above), so the action replays on open and on Previous / Next. */}
                                <div aria-hidden className="w-[84%]">
                                    <ServiceDrawing id={svc.id} variant="drawer" still={still} />
                                </div>
                                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
                                <span aria-hidden className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 bg-white/60 md:hidden" />
                            </div>
                            <div className="px-6 pb-8 md:px-8">
                                <p className="font-mono text-[11px] uppercase tracking-[.3em] text-(--brand)">
                                    {svc.group.index} · {svc.group.name}
                                </p>
                                <Dialog.Title className="mt-3 font-heading text-4xl leading-tight">{svc.name}</Dialog.Title>
                                <p className="mt-4 font-heading text-3xl text-(--brand)">
                                    {ugx(svc.from)}
                                    <span className="ml-3 text-sm text-neutral-400">
                                        {svc.unit ? `${svc.unit} · ` : "starting price · "}
                                        {usd(svc.from)}
                                    </span>
                                </p>
                                <Dialog.Description className="mt-4 text-lg leading-relaxed text-neutral-300">{svc.blurb}</Dialog.Description>
                                <p className="mt-3 flex items-center gap-2 text-sm text-neutral-400">
                                    <Clock className="size-4 text-(--brand)" /> Delivery: {svc.delivery}
                                </p>
                                <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[.3em] text-neutral-400">What&apos;s included</h3>
                                <ul className="mt-4 grid gap-3">
                                    {svc.includes.map((x) => (
                                        <li key={x} className="flex gap-3 text-neutral-200">
                                            <Check className="mt-1 size-4 shrink-0 text-(--brand)" />
                                            {x}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className="mt-9 w-full sm:w-auto">
                                    <Link href={`/contact?service=${svc.id}`}>
                                        {svc.quote ? "Get a quote" : "Start this project"} <ArrowRight />
                                    </Link>
                                </Button>
                                <p className="mt-4 text-sm text-neutral-400">Every project gets a fixed quote before work starts.</p>
                            </div>
                        </motion.div>
                    </div>

                    <nav aria-label="Other services" className="grid grid-cols-2 border-t border-white/10">
                        <button type="button" onClick={() => onGo(prev.id)} className="flex min-h-14 items-center gap-2 px-5 text-left text-sm text-neutral-300 transition-colors hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--brand)">
                            <ArrowLeft className="size-4 shrink-0" />
                            <span className="truncate">{prev.name}</span>
                        </button>
                        <button type="button" onClick={() => onGo(next.id)} className="flex min-h-14 items-center justify-end gap-2 border-l border-white/10 px-5 text-right text-sm text-neutral-300 transition-colors hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--brand)">
                            <span className="truncate">{next.name}</span>
                            <ArrowRight className="size-4 shrink-0" />
                        </button>
                    </nav>

                    <Dialog.Close className="absolute right-3 top-3 grid size-11 place-items-center bg-black/60 text-white backdrop-blur transition-colors hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)">
                        <X className="size-5" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
