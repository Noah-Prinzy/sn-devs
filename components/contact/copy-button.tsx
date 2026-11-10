"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Copy -> Copied, told honestly: the label flips only once the clipboard promise has
// resolved. Where the Clipboard API is missing or refuses (http, an old WebView, a denied
// permission) the text is selected in a read-only field instead. If the old execCommand
// route still copies, that counts as a copy; if it does not, the field is shown with the
// selection intact and the row says "Select and copy", so the way out can be seen.
const COPIED_MS = 1400;

export function CopyButton({
    text,
    label = "Copy",
    name,
    className,
}: {
    text: string;
    label?: string;
    name?: string;
    className?: string;
}) {
    const [copied, setCopied] = useState(false);
    // "manual" mounts the fallback field (only once it is needed, so a screen reader never
    // meets a phantom text box after every Copy button); "shown" makes it visible once
    // copying by hand is the only route left. Both stay set so the selection survives.
    const [manual, setManual] = useState(false);
    const [shown, setShown] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hidden = useRef<HTMLTextAreaElement>(null);

    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current);
        },
        [],
    );

    const flip = () => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    };

    // The fallback: mount the field now, select the text, and try the old execCommand
    // route. Outside the click's own dispatch (after a rejected promise) Firefox and
    // Safari refuse it; then the selected field is made visible instead.
    const select = () => {
        flushSync(() => setManual(true));
        const el = hidden.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        el.select();
        el.setSelectionRange(0, el.value.length);
        let done = false;
        try {
            done = document.execCommand("copy");
        } catch {
            done = false;
        }
        if (done) flip();
        else setShown(true);
    };

    const onClick = async () => {
        try {
            if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
            await navigator.clipboard.writeText(text);
            flip();
        } catch {
            select();
        }
    };

    const word = copied ? "Copied" : shown ? "Select and copy" : label;

    return (
        <span className="inline-flex shrink-0 flex-col items-end gap-1">
            <button
                type="button"
                onClick={onClick}
                aria-label={name}
                data-copied={copied || undefined}
                className={cn(
                    "inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 border px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[.25em] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-(--brand)/60",
                    copied
                        ? "border-(--brand) bg-(--brand) text-(--brand-fg)"
                        : "border-white/20 text-neutral-300 hover:border-(--brand) hover:text-(--brand)",
                    className,
                )}
            >
                {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                <span aria-live="polite">{word}</span>
            </button>
            {manual && (
                <textarea
                    ref={hidden}
                    readOnly
                    rows={1}
                    tabIndex={shown ? undefined : -1}
                    aria-label={`${name ?? label}: the text, for copying by hand`}
                    value={text}
                    onFocus={(e) => e.currentTarget.select()}
                    className={
                        shown
                            ? "h-9 w-40 max-w-[50vw] resize-none overflow-hidden whitespace-nowrap border border-white/20 bg-black/40 px-2 py-2 font-mono text-xs text-neutral-200 outline-none focus:border-(--brand)"
                            : "sr-only"
                    }
                />
            )}
        </span>
    );
}
