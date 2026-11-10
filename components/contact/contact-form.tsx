"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/Magnet";
import { cn } from "@/lib/utils";
import { PEOPLE, WHATSAPP_NUMBER, kampalaNow, mailtoFor, whatsappFor, type ContactFields } from "@/data/contact";

// The channel: the letter on the left, the transmission card on the right (first on
// phones). The card assembles the message live as it's written — on send the visitor's
// own mail app opens fully composed (To Noah, CC Shaun); WhatsApp rides as the follow-up.

const TYPES = ["New website", "Upgrade", "Care plan", "Something else"];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Errors = { name?: string; email?: string; message?: string };

const INPUT =
    "w-full rounded-none border border-white/15 bg-white/[.03] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-400 caret-[var(--brand)] transition-colors hover:border-white/25 focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/30 aria-invalid:border-destructive/70";

const LABEL = "block text-xs uppercase tracking-[.2em] text-neutral-400 mb-2";

export function ContactForm() {
    const [type, setType] = useState("");
    const [fields, setFields] = useState<ContactFields>({ name: "", email: "", phone: "", type: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const set = (key: keyof ContactFields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFields((f) => ({ ...f, [key]: value }));
        if (key in errors) setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const validate = (f: ContactFields): Errors => ({
        name: f.name.trim() ? undefined : "Enter your name.",
        email: emailOk(f.email) ? undefined : "Enter a valid email — e.g. name@company.com.",
        message: f.message.trim() ? undefined : "Tell us a little about the project (a sentence is fine).",
    });

    const blurCheck = (key: keyof Errors) => () =>
        setErrors((er) => ({ ...er, [key]: validate({ ...fields, type })[key] }));

    const busy = status !== "idle";
    const filled = Boolean(fields.name || fields.email || fields.phone || fields.message || type);
    const all: ContactFields = { ...fields, type };

    // Open the visitor's email app inside the gesture (some browsers gate it later),
    // then let the card seal while the app comes up.
    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (busy) return;
        const found = validate(all);
        setErrors(found);
        if (found.name || found.email || found.message) return;
        const link = document.createElement("a");
        link.href = mailtoFor(all);
        link.click();
        setStatus("sending");
        timer.current = setTimeout(() => setStatus("sent"), 900);
    };

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            {/* The letter — the form itself, on the light table. */}
            <div className="order-2 lg:order-1">
                <form onSubmit={submit} noValidate className="border border-white/15 bg-[#0d0d0d]/90 p-6 shadow-[0_30px_60px_rgba(0,0,0,.55)] backdrop-blur-md md:p-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="cf-name" className={LABEL}>Your name</label>
                            <input id="cf-name" type="text" autoComplete="name" placeholder="Amina K." value={fields.name}
                                onChange={set("name")} onBlur={blurCheck("name")} aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "cf-name-err" : undefined} className={INPUT} />
                            {errors.name && <Err id="cf-name-err">{errors.name}</Err>}
                        </div>
                        <div>
                            <label htmlFor="cf-email" className={LABEL}>Email</label>
                            <input id="cf-email" type="email" autoComplete="email" placeholder="you@company.com" value={fields.email}
                                onChange={set("email")} onBlur={blurCheck("email")} aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "cf-email-err" : undefined} className={INPUT} />
                            {errors.email && <Err id="cf-email-err">{errors.email}</Err>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="cf-phone" className={LABEL}>
                                Phone or WhatsApp <span className="normal-case tracking-normal text-neutral-500">(optional)</span>
                            </label>
                            <input id="cf-phone" type="tel" autoComplete="tel" placeholder="+256 …" value={fields.phone}
                                onChange={set("phone")} className={INPUT} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className={LABEL}>What is it about? <span className="normal-case tracking-normal text-neutral-500">(optional)</span></span>
                        <div role="group" aria-label="What is it about?" className="flex flex-wrap gap-2">
                            {TYPES.map((t) => {
                                const on = type === t;
                                return (
                                    <button
                                        key={t}
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => setType(on ? "" : t)}
                                        className={cn(
                                            "rounded-none border px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60",
                                            on
                                                ? "border-[var(--brand)] text-[var(--brand)] shadow-[0_0_24px_rgba(74,222,128,.25)]"
                                                : "border-white/15 text-neutral-300 hover:border-white/40 hover:text-white"
                                        )}
                                    >
                                        {t}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8">
                        <label htmlFor="cf-msg" className={LABEL}>The idea</label>
                        <textarea id="cf-msg" rows={5} placeholder="What are you building, and when do you need it? A sentence is enough." value={fields.message}
                            onChange={set("message")} onBlur={blurCheck("message")} aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "cf-msg-err" : undefined} className={cn(INPUT, "resize-y")} />
                        {errors.message && <Err id="cf-msg-err">{errors.message}</Err>}
                    </div>

                    <div className="mt-10">
                        <Magnet padding={40} magnetStrength={4} wrapperClassName="!inline-block">
                            <Button type="submit" size="lg" disabled={busy}>
                                {status === "sent" ? "Sent" : status === "sending" ? "Sealing…" : "Send it"}
                            </Button>
                        </Magnet>
                        <p className="mt-4 text-xs text-neutral-400">Opens your email app — To Noah, CC Shaun. Nothing is stored.</p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="mt-4">
                        <a href={whatsappFor(all)} target="_blank" rel="noopener noreferrer">
                            <WhatsappLogo /> Send the same note on WhatsApp <ArrowUpRight />
                        </a>
                    </Button>
                    <div role="status" aria-live="polite">
                        {status === "sent" && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="mt-6 border border-[var(--brand)]/40 bg-[var(--brand)]/[.06] p-4"
                            >
                                <p className="text-sm text-neutral-200">
                                    Message sealed — your email app just opened. Prefer WhatsApp?
                                    Send the same note there:
                                </p>
                                <Button asChild variant="outline" size="sm" className="mt-3">
                                    <a href={whatsappFor(all)} target="_blank" rel="noopener noreferrer">
                                        <WhatsappLogo /> Open WhatsApp <ArrowUpRight />
                                    </a>
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Reach us directly">
                        {PEOPLE.map((p) => (
                            <li key={p.name} className="border border-white/10 bg-white/[.02] p-4">
                                <p className="flex items-baseline gap-2 font-heading text-base">
                                    {p.name}
                                    <span className="font-mono text-[10px] uppercase tracking-[.2em] text-neutral-400">{p.role}</span>
                                </p>
                                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <a href={`mailto:${p.email}`} className="inline-flex items-center gap-1.5 text-[var(--brand)] hover:underline">
                                        <EnvelopeSimple className="size-3.5" /> Email
                                    </a>
                                    <a href={p.tel} className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white">
                                        <Phone className="size-3.5" /> {p.phoneDisplay}
                                    </a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </form>
            </div>

            {/* The transmission card — the message assembling itself. Sticky on desktop. */}
            <div className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-28">
                    <StudioClock />
                    <Transmission fields={all} status={status} filled={filled} />
                </div>
            </div>
        </div>
    );
}

function Err({ id, children }: { id: string; children: ReactNode }) {
    return (
        <p id={id} role="alert" className="mt-2 text-xs text-red-400">
            {children}
        </p>
    );
}

// The live Kampala clock — "we're in" during HOURS, honest otherwise. Ticks every 30s;
// renders a placeholder first so server and client agree.
function StudioClock() {
    const [now, setNow] = useState<{ time: string; open: boolean } | null>(null);
    useEffect(() => {
        const tick = () => setNow(kampalaNow());
        tick();
        const t = setInterval(tick, 30_000);
        return () => clearInterval(t);
    }, []);
    return (
        <p className="mb-4 inline-flex items-center gap-2 border border-white/10 bg-[#0a0a0a]/80 px-3 py-1.5 font-mono text-xs uppercase tracking-[.2em] text-neutral-300 backdrop-blur-md">
            <span aria-hidden className={cn("size-1.5 rounded-full", now?.open ? "bg-[var(--brand)]" : "bg-neutral-600")} />
            {now
                ? `It's ${now.time} in Kampala — ${now.open ? "we're in" : "we're away, we reply next working day"}`
                : "Kampala — checking the clock…"}
        </p>
    );
}

// The telegram: FROM / RE / MSG fill live, a scan line sweeps while the visitor types,
// and on send the line sweeps once and the S&N stamp lands.
function Transmission({
    fields: f,
    status,
    filled,
}: {
    fields: ContactFields;
    status: "idle" | "sending" | "sent";
    filled: boolean;
}) {
    const row = (label: string, value: string) => (
        <p className="flex gap-4">
            <span className="w-14 shrink-0 text-[var(--brand)]">{label}</span>
            <span className="min-w-0 flex-1 break-words text-neutral-200">{value || "—"}</span>
        </p>
    );
    const typing = status === "idle" && filled;
    return (
        <figure className="relative overflow-hidden border border-white/15 bg-[#0d0d0d] shadow-[0_30px_60px_rgba(0,0,0,.55)]">
            <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[.3em] text-neutral-400">
                    Transmission · S&amp;N Devs · Kampala
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-neutral-400">
                    <span aria-hidden className={cn("size-1.5 rounded-full bg-[var(--brand)]", status !== "sent" && "animate-pulse")} />
                    {status === "sent" ? "Sealed" : "On air"}
                </span>
            </figcaption>

            <div className="relative min-h-[240px] space-y-3 px-5 py-5 font-mono text-sm">
                {row("FROM:", f.name.trim())}
                {row("RE:", f.type)}
                {row("PHONE:", f.phone.trim())}
                <div className="flex gap-4">
                    <span className="w-14 shrink-0 text-[var(--brand)]">MSG:</span>
                    <p className="min-w-0 flex-1 whitespace-pre-line break-words text-neutral-200 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden">
                        {f.message || "—"}
                        {typing && (
                            <span
                                aria-hidden
                                className="ml-1 inline-block h-[1em] w-[.55em] translate-y-[.15em] bg-[var(--brand)] motion-safe:animate-[caret-blink_1.1s_steps(1)_infinite]"
                            />
                        )}
                    </p>
                </div>

                {(typing || status === "sending") && (
                    <span aria-hidden className="pointer-events-none absolute inset-0">
                        <span className={cn("absolute inset-x-0 top-0 h-24", status === "sending" ? "animate-scan-fast" : "animate-scan")}>
                            <span className="h-px w-full bg-[var(--brand)] shadow-[0_0_12px_rgba(74,222,128,.8)]" />
                            <span className="h-full w-full bg-gradient-to-b from-[rgba(74,222,128,.14)] to-transparent" />
                        </span>
                    </span>
                )}

                {status === "sent" && (
                    <motion.span
                        aria-hidden
                        initial={{ scale: 2.2, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        className="absolute right-4 top-3 border-2 border-[var(--brand)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[var(--brand)]"
                    >
                        S&amp;N · Sent
                    </motion.span>
                )}
            </div>

            <p className="border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[.3em] text-neutral-400">
                wa.me/{WHATSAPP_NUMBER.replace(/\D/g, "")} — the WhatsApp line
            </p>
        </figure>
    );
}
