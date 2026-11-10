"use client";

import { EMAIL, PEOPLE, WHATSAPP_NUMBER } from "@/data/contact";
import { CopyButton } from "@/components/contact/copy-button";
import { cn } from "@/lib/utils";

// The direct lines: one mono row per channel, each a 44 px block link with a copy button
// beside it (a sibling, never nested in the link). WhatsApp leads, the business line first,
// because that is how Kampala reaches a studio. Plain elements only, so the band can sit
// inside or outside a <form>.
type Line = { key: string; label: string; value: string; href: string; copy: string; external?: boolean };

const digits = (s: string) => s.replace(/\D/g, "");

function lines(): Line[] {
    // The person on the business WhatsApp line leads; the other follows.
    const sorted = [...PEOPLE].sort((a, b) => Number(digits(b.tel) === digits(WHATSAPP_NUMBER)) - Number(digits(a.tel) === digits(WHATSAPP_NUMBER)));
    const lead = sorted[0];
    return [
        ...sorted.map((p) => ({
            key: `wa-${p.name}`,
            label: "WhatsApp",
            value: `${p.name} · ${p.phoneDisplay}`,
            href: p.wa,
            copy: p.phoneDisplay,
            external: true,
        })),
        { key: "email", label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
        ...(lead ? [{ key: "call", label: "Call", value: `${lead.name} · ${lead.phoneDisplay}`, href: lead.tel, copy: lead.phoneDisplay }] : []),
    ];
}

export function DirectLines({ className, note }: { className?: string; note?: string }) {
    const rows = lines();
    return (
        <div role="group" aria-label="Reach us directly" className={cn("w-full", className)}>
            {note && <p className="mb-3 font-mono text-xs uppercase tracking-[.3em] text-neutral-400">{note}</p>}
            <div>
                {rows.map((l) => (
                    <div key={l.key} className="flex items-center gap-3 border-t border-white/15 last:border-b">
                        <a
                            href={l.href}
                            target={l.external ? "_blank" : undefined}
                            rel={l.external ? "noopener noreferrer" : undefined}
                            className="group flex min-h-11 min-w-0 flex-1 items-center justify-between gap-4 py-2 outline-none transition-colors hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand)/60 max-[360px]:flex-col max-[360px]:items-start max-[360px]:justify-center max-[360px]:gap-1"
                        >
                            <span className="w-20 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[.3em] text-(--brand) sm:w-24">{l.label}</span>
                            <span className="min-w-0 flex-1 text-neutral-100 transition-colors wrap-anywhere group-hover:text-(--brand) max-[360px]:text-sm">{l.value}</span>
                        </a>
                        <CopyButton text={l.copy} name={`Copy ${l.label} ${l.value}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
