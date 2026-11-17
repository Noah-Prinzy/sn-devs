"use client";

import { useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { CHIPS, MESSAGE_MAX, serviceFromParam, type ContactFields } from "@/data/contact";
import { ugx } from "@/data/services";
import { Chips, Field, INPUT, SendRow, described, emailOk, focusFirst, phoneOk, type Errors } from "@/components/contact/fields";

// Path 01, "Start a project": what it's about, who's asking, where to reply, the idea.
// A ?service= link from the Services page fills the "about" line with the exact service.

type Service = ReturnType<typeof serviceFromParam>;
const ORDER = ["name", "email", "phone", "message"];
const COUNT_FROM = 750;

export function ProjectForm({ service, onDropService }: { service: Service; onDropService: () => void }) {
    const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
    const [chip, setChip] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const root = useRef<HTMLDivElement>(null);

    const check = (k: string, via: "email" | "whatsapp" = "email"): string | undefined => {
        const v = f[k as keyof typeof f].trim();
        if (k === "name") return v ? undefined : "Enter your name";
        if (k === "email") return via === "whatsapp" && !v ? undefined : emailOk(v) ? undefined : "Enter an email address, like name@example.com";
        if (k === "phone") return !v || phoneOk(v) ? undefined : "Enter a phone number, like 07xx xxx xxx or +256 7xx xxx xxx";
        return v ? undefined : "Tell us a few words about the project";
    };
    const attempt = (via: "email" | "whatsapp") => {
        const next: Errors = Object.fromEntries(ORDER.map((k) => [k, check(k, via)]));
        setErrors(next);
        const ok = ORDER.every((k) => !next[k]);
        if (!ok) focusFirst(ORDER, next, root.current);
        return ok;
    };
    const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));
    const blur = (k: string) => () => (errors[k] || f[k as keyof typeof f].trim()) && setErrors((p) => ({ ...p, [k]: check(k) }));

    const fields: ContactFields = { ...f, type: chip, service: service?.name ?? "" };

    return (
        <div ref={root} className="grid gap-7">
            {service ? (
                <div>
                    <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[.25em] text-neutral-300">What it&apos;s about</p>
                    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-(--brand)/50 bg-(--brand)/10 py-2 pl-4 pr-2 text-sm">
                        <span className="font-semibold text-neutral-100">{service.name}</span>
                        <span className="text-neutral-400">from {ugx(service.from)}</span>
                        <button
                            type="button"
                            onClick={onDropService}
                            className="inline-flex h-8 items-center gap-1 px-2 font-mono text-[11px] uppercase tracking-[.2em] text-neutral-300 hover:text-(--brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)"
                        >
                            <X className="size-3.5" /> Change
                        </button>
                    </p>
                </div>
            ) : (
                <Chips name="project-about" legend="What is it about?" optional options={CHIPS} value={chip} onChange={setChip} />
            )}

            <div className="grid gap-7 md:grid-cols-2">
                <Field id="project-name" label="Your name" error={errors.name}>
                    <input {...described("project-name", errors.name)} autoComplete="name" value={f.name} onChange={set("name")} onBlur={blur("name")} className={INPUT} />
                </Field>
                <Field id="project-email" label="Email" error={errors.email}>
                    <input {...described("project-email", errors.email)} type="email" autoComplete="email" inputMode="email" value={f.email} onChange={set("email")} onBlur={blur("email")} className={INPUT} />
                </Field>
            </div>
            <Field id="project-phone" label="Phone" optional hint="Only if you'd like us to reply on WhatsApp or call." error={errors.phone}>
                <input {...described("project-phone", errors.phone, true)} type="tel" autoComplete="tel" inputMode="tel" placeholder="07xx xxx xxx" value={f.phone} onChange={set("phone")} onBlur={blur("phone")} className={`${INPUT} md:max-w-sm`} />
            </Field>
            <Field id="project-message" label="The idea" hint="What it's for, the pages or features you expect, a deadline. A sentence is enough." error={errors.message}>
                <textarea
                    {...described("project-message", errors.message, true)}
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    value={f.message}
                    onChange={set("message")}
                    onBlur={blur("message")}
                    className={`${INPUT} resize-y`}
                />
                {f.message.length >= COUNT_FROM && (
                    <p className="mt-2 text-right font-mono text-xs text-neutral-400">{MESSAGE_MAX - f.message.length} characters left</p>
                )}
            </Field>

            <SendRow fields={fields} primary="email" attempt={attempt} />
        </div>
    );
}
