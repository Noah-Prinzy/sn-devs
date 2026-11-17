"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, EnvelopeSimple, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAILTO_MAX, letterFor, mailtoFor, whatsappFor, type ContactFields } from "@/data/contact";

// The parts every Contact path is built from: labelled fields with inline errors, radio chips,
// a copy button, and the send row. There is no backend: the send row hands the letter to the
// visitor's own mail app or to WhatsApp (data/contact.ts builds both).

export const INPUT =
    "block w-full rounded-none border border-white/15 bg-white/[.03] px-4 py-3 text-[15px] leading-6 text-neutral-100 caret-(--brand) transition-colors placeholder:text-neutral-500 hover:border-white/30 focus:border-(--brand) focus:outline-none focus:ring-[3px] focus:ring-(--brand)/25 aria-invalid:border-red-300/80";

export type Errors = Partial<Record<string, string>>;

export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
// A local number (07xx…) or an international one (+ or 00), any spacing or punctuation.
export const phoneOk = (v: string) => {
    const t = v.trim();
    const digits = t.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(t)) return false;
    if (/^(\+|00)\d/.test(t)) return digits.length >= 9 && digits.length <= 15;
    return /^0\d/.test(t) && (digits.length === 9 || digits.length === 10);
};

// Moves focus to the first field (in the order given) that has an error.
export function focusFirst(order: string[], errors: Errors, root: HTMLElement | null) {
    const first = order.find((k) => errors[k]);
    if (first) root?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

export function Field({
    id,
    label,
    optional,
    hint,
    error,
    children,
}: {
    id: string;
    label: string;
    optional?: boolean;
    hint?: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[.25em] text-neutral-300">
                {label}
                {optional && <span className="normal-case tracking-normal text-neutral-500"> (optional)</span>}
            </label>
            {hint && <p id={`${id}-hint`} className="mb-2 text-sm text-neutral-400">{hint}</p>}
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm text-red-300">
                    <WarningCircle weight="fill" className="mt-0.5 size-4 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}

// aria props for an input inside a Field.
export const described = (id: string, error?: string, hint?: boolean) => ({
    id,
    name: id.split("-").pop(),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined,
});

// A radio group drawn as chips. Native radios, so arrows, Tab and screen readers work as is.
export function Chips({
    name,
    legend,
    optional,
    options,
    value,
    onChange,
}: {
    name: string;
    legend: string;
    optional?: boolean;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <fieldset>
            <legend className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[.25em] text-neutral-300">
                {legend}
                {optional && <span className="normal-case tracking-normal text-neutral-500"> (optional)</span>}
            </legend>
            <div className="flex flex-wrap gap-2">
                {options.map((o) => (
                    <label
                        key={o}
                        className="cursor-pointer border border-white/15 px-3.5 py-2.5 text-sm text-neutral-300 transition-colors hover:border-white/40 has-checked:border-(--brand) has-checked:bg-(--brand) has-checked:text-(--brand-fg) has-focus-visible:ring-2 has-focus-visible:ring-(--brand) has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-[#0d0d0d]"
                    >
                        <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
                        {o}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

// Writes text to the clipboard; falls back to execCommand where the Clipboard API is missing.
async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const t = document.createElement("textarea");
        t.value = text;
        t.setAttribute("readonly", "");
        t.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(t);
        t.select();
        let ok = false;
        try {
            ok = document.execCommand("copy");
        } catch {}
        t.remove();
        return ok;
    }
}

// "Copy" → "Copied" only once the copy has actually happened; "Couldn't copy" otherwise.
export function CopyButton({ text, what, className }: { text: string; what: string; className?: string }) {
    const [state, setState] = useState<"idle" | "done" | "failed">("idle");
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    useEffect(() => () => clearTimeout(timer.current), []);
    const run = async () => {
        const ok = await copyText(text);
        setState(ok ? "done" : "failed");
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setState("idle"), 1600);
    };
    return (
        <button
            type="button"
            onClick={run}
            aria-label={`Copy ${what}`}
            className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 border border-white/15 px-3 font-mono text-[11px] uppercase tracking-[.2em] text-neutral-300 transition-colors hover:border-(--brand) hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)",
                className,
            )}
        >
            {state === "done" ? <Check className="size-3.5 text-(--brand)" /> : <Copy className="size-3.5" />}
            <span aria-live="polite">{state === "done" ? "Copied" : state === "failed" ? "Couldn't copy" : "Copy"}</span>
        </button>
    );
}

// The send row. Each button is a real link (mailto: / wa.me), so it works without script;
// `attempt` validates first and cancels the navigation when something is missing. A letter
// too long for a mailto link becomes "Copy the email" instead.
export function SendRow({
    fields,
    primary,
    attempt,
    emailLabel = "Send by email",
    whatsappLabel = "Send on WhatsApp",
    footnote = "We reply within one working day, then a short call and a fixed quote.",
}: {
    fields: ContactFields;
    primary: "email" | "whatsapp";
    attempt: (via: "email" | "whatsapp") => boolean;
    emailLabel?: string;
    whatsappLabel?: string;
    footnote?: string;
}) {
    const [note, setNote] = useState("");
    const mailto = mailtoFor(fields);
    const tooLong = mailto.length > MAILTO_MAX;

    const copyLetter = async () => {
        if (!attempt("email")) return;
        const l = letterFor(fields);
        const ok = await copyText(`To: ${l.to.join(", ")}\nSubject: ${l.subject}\n\n${l.body.replace(/\r\n/g, "\n")}`);
        setNote(
            ok
                ? `Copied. Paste it into a new email to ${l.to.join(" and ")}.`
                : `Your message is long for an email link. Write to ${l.to.join(" and ")} and paste it in.`,
        );
    };

    const email = tooLong ? (
        <Button type="button" size="lg" variant={primary === "email" ? "default" : "outline"} onClick={copyLetter}>
            <Copy /> Copy the email
        </Button>
    ) : (
        <Button asChild size="lg" variant={primary === "email" ? "default" : "outline"}>
            <a href={mailto} onClick={(e) => (attempt("email") ? setNote("Your mail app should open with the email written. Press Send there.") : e.preventDefault())}>
                <EnvelopeSimple /> {emailLabel}
            </a>
        </Button>
    );
    const whatsapp = (
        <Button asChild size="lg" variant={primary === "whatsapp" ? "default" : "outline"}>
            <a
                href={whatsappFor(fields)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => (attempt("whatsapp") ? setNote("WhatsApp opens in a new tab with your message written. Press Send there.") : e.preventDefault())}
            >
                <WhatsappLogo /> {whatsappLabel}
            </a>
        </Button>
    );

    return (
        <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primary === "email" ? email : whatsapp}
                {primary === "email" ? whatsapp : email}
            </div>
            <p aria-live="polite" className="mt-4 min-h-5 text-sm text-(--brand)">{note}</p>
            <p className="mt-1 text-sm text-neutral-400">{footnote}</p>
        </div>
    );
}
