"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { MESSAGE_MAX, type ContactFields } from "@/data/contact";
import { CATEGORIES, TEMPLATES, priceOf } from "@/data/templates";
import { ugx } from "@/data/services";
import { Chips, Field, INPUT, SendRow, described, emailOk, focusFirst, type Errors } from "@/components/contact/fields";

// Path 03, "Templates": which S&N Edition, what they need done with it, where to reply.
// A Store link (?service=templates&template=<slug>) arrives with the template picked.

const NEEDS = ["Buy it", "Set it up for me", "Customise it"];
const ORDER = ["template", "name", "email"];

export function TemplateForm({ initial }: { initial: string }) {
    const [slug, setSlug] = useState(TEMPLATES.some((t) => t.slug === initial) ? initial : "");
    const [need, setNeed] = useState("");
    const [f, setF] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const root = useRef<HTMLDivElement>(null);

    const t = TEMPLATES.find((x) => x.slug === slug);
    const check = (k: string, via: "email" | "whatsapp" = "email") => {
        if (k === "name") return f.name.trim() ? undefined : "Enter your name";
        if (k === "email") return via === "whatsapp" && !f.email.trim() ? undefined : emailOk(f.email) ? undefined : "Enter an email address, like name@example.com";
        return undefined;
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

    // The letter's About line: "Template: Astro Launch — Set it up for me".
    const about = `Template: ${t ? t.name : "not sure yet"}${need ? ` — ${need}` : ""}`;
    const fields: ContactFields = { name: f.name, email: f.email, phone: "", type: "", service: about, message: f.message };

    return (
        <div ref={root} className="grid gap-7">
            <Field id="template-template" label="Which template?">
                <div className="relative md:max-w-md">
                    <select {...described("template-template")} value={slug} onChange={(e) => setSlug(e.target.value)} className={`${INPUT} appearance-none pr-10`}>
                        <option value="">Not sure yet</option>
                        {CATEGORIES.map((c) => (
                            <optgroup key={c.id} label={c.name}>
                                {TEMPLATES.filter((x) => x.category === c.id).map((x) => (
                                    <option key={x.slug} value={x.slug}>
                                        {x.name} · {ugx(priceOf(x))}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <CaretDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                </div>
                <Link
                    href={t ? `/store/${t.slug}` : "/store"}
                    className="mt-3 inline-flex items-center gap-1.5 py-1 text-sm text-(--brand) underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)"
                >
                    {t ? `See ${t.name} in the Store` : "Browse the Store"} <ArrowRight className="size-4" />
                </Link>
            </Field>

            <Chips name="template-need" legend="What do you need?" optional options={NEEDS} value={need} onChange={setNeed} />

            <div className="grid gap-7 md:grid-cols-2">
                <Field id="template-name" label="Your name" error={errors.name}>
                    <input {...described("template-name", errors.name)} autoComplete="name" value={f.name} onChange={set("name")} onBlur={blur("name")} className={INPUT} />
                </Field>
                <Field id="template-email" label="Email" error={errors.email}>
                    <input {...described("template-email", errors.email)} type="email" autoComplete="email" inputMode="email" value={f.email} onChange={set("email")} onBlur={blur("email")} className={INPUT} />
                </Field>
            </div>
            <Field id="template-message" label="Note" optional>
                <textarea
                    {...described("template-message")}
                    rows={3}
                    maxLength={MESSAGE_MAX}
                    placeholder="Your domain, your logo, the pages you'd change…"
                    value={f.message}
                    onChange={set("message")}
                    className={`${INPUT} resize-y`}
                />
            </Field>

            <SendRow fields={fields} primary="email" attempt={attempt} footnote="We reply within one working day with the next step: payment, set-up or a quote." />
        </div>
    );
}
