"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useStill } from "@/components/store/browser-frame";
import { CopyButton } from "@/components/contact/copy-button";
import { cn } from "@/lib/utils";
import { kampalaNow, type Letter } from "@/data/contact";

// The sheet is the letter: the exact email the form will hand to the mail app, assembling
// line by line as it is written. On "Send by email" the mail app has already been opened
// inside the click; then the sheet lifts off the photo, a green hairline draws itself around
// it and the stamp lands: HANDED OFF, never "Sent". Under it, always: copy the letter, send
// it on WhatsApp instead, the addresses as text and the whole letter in a textarea, because
// what opened (or did not) is a guess and the ways out must not depend on it.
export type HandoffStatus = "idle" | "handing" | "handed" | "unopened";

export function letterText(letter: Letter): string {
    return `To: ${letter.to.join(", ")}\r\nSubject: ${letter.subject}\r\n\r\n${letter.body}`;
}

const HANDED = "Handed to your mail app. Press Send there and it lands with Noah and Shaun.";
const UNOPENED = "If nothing opened, your device may have no mail app set up. Copy the letter or send it on WhatsApp.";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const ROW = "flex min-h-11 items-center justify-between gap-4 border-b border-white/10 py-1.5 font-mono text-[10px] uppercase tracking-[.25em] text-neutral-200";
const ACTION = "inline-flex shrink-0 items-center gap-1 font-semibold text-(--brand)";

export function TransmissionSheet({
    letter,
    status,
    typing,
    whatsappHref,
    className,
}: {
    letter: Letter;
    status: HandoffStatus;
    typing: boolean;
    whatsappHref: string;
    className?: string;
}) {
    const still = useStill();
    const lifted = status === "handed" || status === "unopened";
    const live = status === "idle";
    // The hand-off time for the header, fixed at the moment the sheet lifts.
    const at = useMemo(() => (lifted ? kampalaNow().time : ""), [lifted]);
    const lines = letter.body.split(/\r?\n/);
    const addresses = useRef<HTMLSpanElement>(null);

    const selectAddresses = () => {
        const el = addresses.current;
        const sel = window.getSelection();
        if (!el || !sel) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    return (
        <motion.figure
            aria-label="Preview of your message"
            data-status={status}
            initial={false}
            animate={lifted && !still ? { y: [24, 0], opacity: [0.5, 1] } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.32, ease: EASE }}
            className={cn(
                "relative border border-white/15 bg-[#0d0d0d] font-mono text-sm leading-relaxed text-neutral-300 shadow-[0_30px_60px_rgba(0,0,0,.55)]",
                lifted && "shadow-[0_40px_80px_rgba(0,0,0,.7)]",
                className,
            )}
        >
            {/* The caption first, so the figure keeps its caption in every accessibility mapping. */}
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 px-4 py-3 text-[10px] uppercase tracking-[.3em] text-neutral-400 sm:px-5">
                <span>{lifted ? "Your email, as it left" : "Your email, as it will leave"}</span>
                <AnimatePresence mode="wait" initial={false}>
                    {lifted ? (
                        <motion.span key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="tabular-nums">
                            {at} EAT
                        </motion.span>
                    ) : (
                        <motion.span key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
                            <span aria-hidden className="size-1.5 bg-(--brand) shadow-[0_0_10px_var(--brand)]" />
                            live
                        </motion.span>
                    )}
                </AnimatePresence>
            </figcaption>

            {/* The hairline that draws itself around the sheet once it has left. Absolute, so
                its place in the markup (after the caption) changes nothing on screen. */}
            <AnimatePresence initial={false}>
                {lifted && (
                    <motion.span
                        key="hairline"
                        aria-hidden
                        initial={{ opacity: still ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-none absolute -inset-2"
                    >
                        <svg className="h-full w-full overflow-visible" aria-hidden>
                            <motion.rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="none"
                                stroke="var(--brand)"
                                strokeWidth={1}
                                pathLength={1}
                                initial={still ? false : { pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        </svg>
                    </motion.span>
                )}
            </AnimatePresence>

            {/* The stamp, top right, drawn in a green hairline then filled with the word. */}
            <AnimatePresence initial={false}>
                {lifted && (
                    <motion.span
                        key="stamp"
                        aria-hidden
                        initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 1.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="absolute right-3 top-10 z-10 inline-flex rotate-[-8deg] items-center gap-2 bg-[#0a0a0a]/80 px-3 py-2 text-[11px] font-bold uppercase tracking-[.3em] text-(--brand) sm:right-4 sm:top-11"
                    >
                        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                            <motion.rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="none"
                                stroke="var(--brand)"
                                strokeWidth={2}
                                pathLength={1}
                                initial={still ? false : { pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        </svg>
                        <span className="size-1.5 bg-(--brand)" />
                        <motion.span initial={{ opacity: still ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: still ? 0 : 0.3 }}>
                            HANDED OFF
                        </motion.span>
                    </motion.span>
                )}
            </AnimatePresence>

            {/* The email, as it leaves. Once the stamp has landed the body starts lower, so the
                stamp has its own slot and never prints over the To: line on a narrow sheet. */}
            <div className={cn("px-4 py-4 sm:px-5 sm:py-5", lifted && "pt-16 sm:pt-16")}>
                <p className="wrap-break-word">
                    <span className="text-(--brand)">To:</span> <span className="wrap-anywhere">{letter.to.join(", ")}</span>
                </p>
                <p className="wrap-break-word">
                    <span className="text-(--brand)">Subject:</span> {letter.subject}
                </p>
                <p aria-hidden className="text-neutral-600">
                    —
                </p>
                <div className="min-h-16 whitespace-pre-wrap wrap-break-word text-neutral-200">
                    {lines.map((line, i) => (
                        <span key={i} className="block min-h-[1.5em]">
                            {line}
                            {live && typing && i === lines.length - 1 && (
                                <span
                                    aria-hidden
                                    className="ml-0.5 inline-block h-[1em] w-[.5em] translate-y-[.15em] bg-(--brand) motion-safe:animate-[caret-blink_1.1s_steps(1)_infinite]"
                                />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Under the stamp, from the moment the hand-off starts: the ways out, never gated
                on the guess about what opened. */}
            <AnimatePresence initial={false}>
                {status !== "idle" && (
                    <motion.div
                        key="after"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="border-t border-white/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
                    >
                        <div role="status" aria-live="polite" className="mb-2 min-h-[1.5em] font-serif text-[13px] leading-relaxed">
                            <AnimatePresence mode="wait" initial={false}>
                                {status === "handed" && (
                                    <motion.div key="handed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                                        <p className="text-neutral-100">{HANDED}</p>
                                        <p className="mt-1 text-neutral-400">{UNOPENED}</p>
                                    </motion.div>
                                )}
                                {status === "unopened" && (
                                    <motion.p key="unopened" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="text-neutral-100">
                                        {UNOPENED}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="border-t border-white/10">
                            <div className={ROW}>
                                <span>Copy the letter</span>
                                <CopyButton text={letterText(letter)} name="Copy the letter" />
                            </div>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(ROW, "group outline-none transition-colors hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand)/60")}
                            >
                                <span>Send it on WhatsApp instead</span>
                                <span className={ACTION}>
                                    Open <ArrowUpRight className="size-3" aria-hidden />
                                </span>
                            </a>
                            <div className={ROW}>
                                <span ref={addresses} className="min-w-0 select-text normal-case tracking-normal text-neutral-300 wrap-anywhere">
                                    {letter.to.map((a, i) => (
                                        <span key={a}>
                                            {i > 0 && <span aria-hidden className="text-neutral-600"> · </span>}
                                            <span className="select-all">{a}</span>
                                        </span>
                                    ))}
                                </span>
                                <button type="button" onClick={selectAddresses} className={cn(ACTION, "min-h-9 outline-none focus-visible:ring-2 focus-visible:ring-(--brand)/60")}>
                                    Select
                                </button>
                            </div>
                            <details className="group/letter">
                                <summary className={cn(ROW, "cursor-pointer list-none outline-none focus-visible:ring-2 focus-visible:ring-(--brand)/60 [&::-webkit-details-marker]:hidden")}>
                                    <span>The whole letter as text</span>
                                    <span className={ACTION}>
                                        <span className="group-open/letter:hidden">Show</span>
                                        <span className="hidden group-open/letter:inline">Hide</span>
                                    </span>
                                </summary>
                                <textarea
                                    readOnly
                                    aria-label="Your letter, as text"
                                    rows={8}
                                    value={letterText(letter)}
                                    onFocus={(e) => e.currentTarget.select()}
                                    className="mt-2 w-full resize-y border border-white/15 bg-black/40 p-3 font-mono text-xs leading-relaxed text-neutral-300 outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/30"
                                />
                            </details>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.figure>
    );
}
