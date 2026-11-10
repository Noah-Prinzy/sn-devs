"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TransmissionSheet, type HandoffStatus } from "@/components/contact/transmission-sheet";
import { DirectLines } from "@/components/contact/direct-lines";
import { CHIPS, MAILTO_MAX, MESSAGE_MAX, letterFor, mailtoFor, serviceFromParam, whatsappFor, type ContactFields } from "@/data/contact";
import { ugx } from "@/data/services";

// The letter on the left, the sheet (the email as it will leave) on the right with the
// direct lines under it; on phones the lines come first, then the letter, then the sheet.
// There is no backend. "Send by email" hands the letter to the visitor's own mail app
// inside the click, then the page says only what it can know: handed, or maybe not.

type Key = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Key, string>>;
type Typed = Pick<ContactFields, Key>;

const ORDER: Key[] = ["name", "email", "phone", "message"];

// How long to wait for the mail app to take the window before admitting it may not have.
const HANDOFF_MS = 1500;
const COUNT_FROM = 750; // the GOV.UK character count appears from here

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
// A local number (07xx…, nine or ten digits) or an international one (+ or 00 and nine to
// fifteen digits), with any spacing, dots, dashes or brackets. Noah: local numbers are fine.
const phoneOk = (v: string) => {
    const t = v.trim();
    const digits = t.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(t)) return false;
    if (/^(\+|00)\d/.test(t)) return digits.length >= 9 && digits.length <= 15;
    return /^0\d/.test(t) && (digits.length === 9 || digits.length === 10);
};

// One check per field. Required fields fail when empty; the phone fails only when it is
// given and wrong. The messages are the plan's, word for word.
function check(key: Key, f: Typed): string | undefined {
    const v = f[key].trim();
    if (key === "name") return v ? undefined : "Enter your name";
    if (key === "email") return emailOk(v) ? undefined : "Enter an email address in the correct format, like name@example.com";
    if (key === "message") return v ? undefined : "Enter a few words about the project";
    return !v || phoneOk(v) ? undefined : "Enter a phone number, like 07xx xxx xxx or +256 7xx xxx xxx";
}

// ?service= from the Services page or the Store. Read as an external store so the server
// and the hydrating client both see nothing, then the real value on the first client render:
// no mismatch, no effect, no focus moved.
const onUrl = (cb: () => void) => {
    window.addEventListener("popstate", cb);
    return () => window.removeEventListener("popstate", cb);
};
const serviceParam = () => new URLSearchParams(window.location.search).get("service");
const noParam = () => null;

const INPUT =
    "block w-full rounded-none border border-white/20 bg-white/[.03] px-3.5 py-2.5 text-[15px] leading-6 text-neutral-100 caret-(--brand) transition-colors hover:border-white/30 focus:outline-none focus:border-(--brand) focus:ring-[3px] focus:ring-(--brand)/25 aria-invalid:border-red-300/80";
const LABEL = "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[.25em] text-neutral-400";
const OPTIONAL = <span className="normal-case tracking-normal text-neutral-400"> (optional)</span>;
const HINT = "mb-2 text-sm leading-relaxed text-neutral-400";

export function ContactForm() {
    const [typed, setTyped] = useState<Typed>({ name: "", email: "", phone: "", message: "" });
    const [chip, setChip] = useState<string | null>(null); // null: untouched, follows the ?service= group
    const [dropped, setDropped] = useState(false); // the visitor pressed "change" or picked another chip
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<HandoffStatus>("idle");
    const [note, setNote] = useState(""); // the one polite line in the status region
    const [typing, setTyping] = useState(false); // a field has focus: the sheet shows its caret
    const [spoken, setSpoken] = useState(""); // the character count, read out half a second after the last keystroke

    const refs = useRef<Record<Key, HTMLInputElement | HTMLTextAreaElement | null>>({ name: null, email: null, phone: null, message: null });
    const handoff = useRef<(() => void) | null>(null); // tears down the current hand-off watch

    const picked = useSyncExternalStore(onUrl, serviceParam, noParam);
    const service = dropped ? null : serviceFromParam(picked);
    const fields: ContactFields = {
        ...typed,
        type: chip ?? (service && CHIPS.includes(service.group) ? service.group : ""),
        service: service?.name ?? "",
    };

    useEffect(() => () => handoff.current?.(), []);

    // GOV.UK character count: the visible number is immediate, the spoken one waits for a
    // pause in the typing so a screen reader is not told the remainder after every key.
    const left = MESSAGE_MAX - typed.message.length;
    const counting = typed.message.length >= COUNT_FROM;
    useEffect(() => {
        if (!counting) return;
        const t = setTimeout(() => setSpoken(`You have ${left} ${left === 1 ? "character" : "characters"} remaining`), 500);
        return () => clearTimeout(t);
    }, [counting, left]);

    // Any edit after a hand-off puts the sheet back in live mode.
    const wake = () => {
        if (status === "idle") return;
        handoff.current?.();
        setStatus("idle");
        setNote("");
    };

    const change = (key: Key, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = key === "message" ? e.target.value.slice(0, MESSAGE_MAX) : e.target.value;
        const next = { ...typed, [key]: value };
        setTyped(next);
        if (key === "message" && value.length < COUNT_FROM) setSpoken(""); // back under the count: nothing to read out
        // An errored field re-checks on every keystroke and clears the moment it passes.
        if (errors[key]) setErrors((er) => ({ ...er, [key]: check(key, next) }));
        wake();
    };

    // Blur validates only a field that has something in it: leaving an empty field alone is
    // not a mistake yet.
    const blur = (key: Key) => {
        setTyping(false);
        if (typed[key].trim()) setErrors((er) => ({ ...er, [key]: check(key, typed) }));
    };
    const focus = () => setTyping(true);

    // Enter in a single-line field moves to the next one instead of submitting: the
    // keyboard says Next, so it does Next. An untouched empty field is not a mistake yet.
    const next = (key: Key) => (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        refs.current[ORDER[ORDER.indexOf(key) + 1]]?.focus();
    };

    // A chip changes the subject and the sheet, never the visitor's words. Picking one lets
    // go of the exact service from ?service=; pressing "change" keeps the chip, drops the name.
    const pickChip = (label: string) => {
        setChip(fields.type === label ? "" : label);
        setDropped(true);
        wake();
    };
    const dropService = () => {
        setChip(fields.type);
        setDropped(true);
        wake();
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "handing") return;

        const found: Errors = {};
        for (const k of ORDER) {
            const msg = check(k, typed);
            if (msg) found[k] = msg;
        }
        setErrors(found);
        const bad = ORDER.filter((k) => found[k]);
        if (bad.length) {
            refs.current[bad[0]]?.focus();
            setNote(`Fix the ${bad.length} ${bad.length === 1 ? "field" : "fields"} marked above`);
            return;
        }

        handoff.current?.();
        const href = mailtoFor(fields);
        if (href.length > MAILTO_MAX) {
            // Too long for a mailto to survive: skip the navigation, open the copy panel.
            // The sheet's own line explains the way out; a second explanation here would
            // be read over it (a "verdict" line on the sheet is the proper home for the
            // "Long one, copy it into your mail app instead" wording).
            setStatus("unopened");
            setNote("");
            return;
        }

        setNote("");
        setStatus("handing");
        // Inside the gesture: iOS and Chrome gate scheme navigation to the click itself.
        window.location.assign(href);

        // Then watch for the mail app taking the window. A blur or a visibility change
        // within the window means it opened; silence means it may not have.
        let timer: ReturnType<typeof setTimeout> | null = null;
        const stop = () => {
            if (timer) clearTimeout(timer);
            window.removeEventListener("blur", away);
            document.removeEventListener("visibilitychange", away);
            handoff.current = null;
        };
        const away = () => {
            stop();
            setStatus("handed");
        };
        window.addEventListener("blur", away);
        document.addEventListener("visibilitychange", away);
        timer = setTimeout(() => {
            stop();
            setStatus("unopened");
        }, HANDOFF_MS);
        handoff.current = stop;
    };

    const describe = (key: Key, ...more: (string | false)[]) =>
        [...more, errors[key] && `cf-${key}-err`].filter(Boolean).join(" ") || undefined;

    const label = status === "handed" || status === "unopened" ? "Send again" : service?.quote ? "Ask for a quote" : "Send by email";

    return (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
            {/* The letter. */}
            <form
                onSubmit={submit}
                noValidate
                aria-label="The letter"
                className="order-2 border border-white/15 bg-[#0d0d0d]/90 p-5 shadow-[0_30px_60px_rgba(0,0,0,.55)] backdrop-blur-md max-[360px]:p-4 sm:p-7 lg:order-0"
            >
                <fieldset className="m-0 min-w-0 border-0 p-0">
                    <legend className={cn(LABEL, "p-0")}>What is it about?{OPTIONAL}</legend>
                    <div className="flex flex-wrap gap-2">
                        {CHIPS.map((c) => {
                            const on = fields.type === c;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    aria-pressed={on}
                                    onClick={() => pickChip(c)}
                                    className={cn(
                                        "min-h-9 rounded-none border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[.18em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--brand)/60",
                                        on
                                            ? "border-(--brand) text-(--brand) shadow-[0_0_24px_rgba(74,222,128,.2)]"
                                            : "border-white/20 text-neutral-300 hover:border-white/45 hover:text-white"
                                    )}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                    {service && (
                        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[.2em] text-neutral-300">
                            <span>
                                <span className="text-(--brand)">About:</span> {service.name} · From {ugx(service.from)}
                            </span>
                            <span aria-hidden className="text-neutral-500">·</span>
                            <button
                                type="button"
                                onClick={dropService}
                                aria-label={`Change: stop asking about ${service.name}`}
                                className="min-h-7 underline decoration-(--brand)/60 underline-offset-4 outline-none hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand)/60"
                            >
                                change
                            </button>
                        </p>
                    )}
                </fieldset>

                <div className="mt-6">
                    <label htmlFor="cf-name" className={LABEL}>Your name</label>
                    <input
                        ref={(el) => { refs.current.name = el; }}
                        id="cf-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        enterKeyHint="next"
                        value={typed.name}
                        onKeyDown={next("name")}
                        onChange={(e) => change("name", e)}
                        onFocus={focus}
                        onBlur={() => blur("name")}
                        aria-invalid={!!errors.name || undefined}
                        aria-describedby={describe("name")}
                        className={INPUT}
                    />
                    <Err id="cf-name-err">{errors.name}</Err>
                </div>

                <div className="mt-5">
                    <label htmlFor="cf-email" className={LABEL}>Where we reply</label>
                    <input
                        ref={(el) => { refs.current.email = el; }}
                        id="cf-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        enterKeyHint="next"
                        value={typed.email}
                        onKeyDown={next("email")}
                        onChange={(e) => change("email", e)}
                        onFocus={focus}
                        onBlur={() => blur("email")}
                        aria-invalid={!!errors.email || undefined}
                        aria-describedby={describe("email")}
                        className={INPUT}
                    />
                    <Err id="cf-email-err">{errors.email}</Err>
                </div>

                <div className="mt-5">
                    <label htmlFor="cf-phone" className={LABEL}>Phone{OPTIONAL}</label>
                    <p id="cf-phone-hint" className={HINT}>
                        Like 07xx xxx xxx, or with the country code from abroad. Only so we can reply on WhatsApp
                    </p>
                    <input
                        ref={(el) => { refs.current.phone = el; }}
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        enterKeyHint="next"
                        value={typed.phone}
                        onKeyDown={next("phone")}
                        onChange={(e) => change("phone", e)}
                        onFocus={focus}
                        onBlur={() => blur("phone")}
                        aria-invalid={!!errors.phone || undefined}
                        aria-describedby={describe("phone", "cf-phone-hint")}
                        className={INPUT}
                    />
                    <Err id="cf-phone-err">{errors.phone}</Err>
                </div>

                <div className="mt-5">
                    <label htmlFor="cf-message" className={LABEL}>The project</label>
                    <p id="cf-message-hint" className={HINT}>
                        What are you building, and when do you need it? A sentence is enough.
                    </p>
                    <textarea
                        ref={(el) => { refs.current.message = el; }}
                        id="cf-message"
                        name="message"
                        rows={5}
                        maxLength={MESSAGE_MAX}
                        autoComplete="off"
                        enterKeyHint="enter"
                        value={typed.message}
                        onChange={(e) => change("message", e)}
                        onFocus={focus}
                        onBlur={() => blur("message")}
                        aria-invalid={!!errors.message || undefined}
                        aria-describedby={describe("message", "cf-message-hint", "cf-message-count")}
                        className={cn(INPUT, "min-h-28 resize-y")}
                    />
                    {/* GOV.UK character count: silent until 750 of 1,000, then the remainder. The
                        visible count is not live; the spoken one is, debounced above. */}
                    <p id="cf-message-count" className="mt-2 min-h-5 text-xs text-neutral-400 tabular-nums">
                        {counting
                            ? `You have ${left} ${left === 1 ? "character" : "characters"} remaining`
                            : <span className="sr-only">You can enter up to {MESSAGE_MAX} characters</span>}
                    </p>
                    <span className="sr-only" aria-live="polite">{spoken}</span>
                    <Err id="cf-message-err">{errors.message}</Err>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                    {/* Not disabled while handing: a hard disable drops the keyboard focus to the
                        body. submit() already ignores a second press. */}
                    <Button
                        type="submit"
                        size="lg"
                        aria-disabled={status === "handing" || undefined}
                        data-state={status === "handing" ? "handing" : undefined}
                        className="max-[360px]:w-full data-[state=handing]:opacity-60"
                    >
                        {label}
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white/25 text-neutral-100 max-[360px]:w-full">
                        <a href={whatsappFor(fields)} target="_blank" rel="noopener noreferrer">
                            <WhatsappLogo /> Or WhatsApp it <ArrowUpRight />
                        </a>
                    </Button>
                </div>
                <p className="mt-4 font-mono text-[11px] leading-[1.8] tracking-widest text-neutral-400 uppercase">
                    Opens your mail app, addressed to Noah and Shaun. You press Send. We reply within one working day. Nothing is stored here.
                </p>
                <p role="status" aria-live="polite" className={cn("text-sm text-neutral-200", note && "mt-3")}>
                    {note}
                </p>
            </form>

            {/* The sheet and the direct lines. On phones the aside dissolves so the lines can
                lead and the sheet can trail the letter. On lg the aside is pinned and capped at
                the viewport, scrolling inside itself, so the rows under a grown sheet stay
                reachable after a hand-off. The 2 px margin/padding leaves room for the sheet's
                hairline. The pin needs the Scene's section to clip without becoming a scrollport
                (overflow-clip, not overflow-hidden). */}
            <aside
                className="contents lg:sticky lg:top-28 lg:-m-2 lg:block lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto lg:p-2"
                aria-label="Your email and our direct lines"
            >
                <TransmissionSheet
                    letter={letterFor(fields)}
                    status={status}
                    typing={typing}
                    whatsappHref={whatsappFor(fields)}
                    className="order-3 lg:order-0"
                />
                <DirectLines
                    note="Prefer a message or a call? These go straight to us."
                    className="order-1 lg:order-0 lg:mt-8"
                />
            </aside>
        </div>
    );
}

// One error line under a field: the icon, a spoken "Error:" prefix, the message. Not a live
// region, so nothing shouts when three fields fail at once; the status region carries the
// one announcement.
function Err({ id, children }: { id: string; children?: string }) {
    if (!children) return null;
    return (
        <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-red-300">
            <WarningCircle aria-hidden weight="bold" className="mt-0.5 size-4 shrink-0" />
            <span>
                <span className="sr-only">Error: </span>
                {children}
            </span>
        </p>
    );
}
