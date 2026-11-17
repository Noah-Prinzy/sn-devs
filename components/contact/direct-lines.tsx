import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PEOPLE } from "@/data/contact";
import { CopyButton } from "@/components/contact/fields";

// "Rather skip the form?" on the page's one full green band (like the Services packages): Noah and Shaun side by side, each with WhatsApp, a call and an
// email, and a copy button for the number and the address.

const LINK =
    "inline-flex min-h-11 items-center gap-2.5 text-neutral-100 underline-offset-4 transition-colors hover:text-(--brand) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)";

export function DirectLines() {
    return (
        <section aria-labelledby="direct-title" className="relative overflow-hidden bg-(--brand) px-4 py-24 text-(--brand-fg) md:mt-32 md:px-6 md:py-32">
            <div className="relative mx-auto max-w-6xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.3em]">Direct lines</p>
            <h2 id="direct-title" className="mt-4 font-heading text-5xl leading-[1.02] md:text-7xl">Rather skip the form?</h2>
            <p className="mt-5 max-w-lg text-lg opacity-80">Write or call either of us directly. Same promise: a reply within one working day.</p>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
                {PEOPLE.map((p) => (
                    <div key={p.name} className="bg-[#0a0a0a] p-6 text-neutral-100 shadow-[0_30px_60px_rgba(0,0,0,.25)] md:p-8">
                        <p className="font-heading text-3xl">{p.name}</p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[.25em] text-neutral-400">{p.role}</p>
                        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                            <li className="flex items-center justify-between gap-3 py-2">
                                <a href={p.wa} target="_blank" rel="noopener noreferrer" className={LINK}>
                                    <WhatsappLogo className="size-5 text-(--brand)" />
                                    WhatsApp <span className="text-neutral-400">{p.phoneDisplay}</span>
                                </a>
                                <CopyButton text={p.phoneDisplay} what={`${p.name}'s number`} />
                            </li>
                            <li className="flex items-center justify-between gap-3 py-2">
                                <a href={p.tel} className={LINK}>
                                    <Phone className="size-5 text-(--brand)" />
                                    Call
                                </a>
                            </li>
                            <li className="flex items-center justify-between gap-3 py-2">
                                <a href={`mailto:${p.email}`} className={`${LINK} min-w-0 break-all`}>
                                    <EnvelopeSimple className="size-5 shrink-0 text-(--brand)" />
                                    {p.email}
                                </a>
                                <CopyButton text={p.email} what={`${p.name}'s email`} />
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            </div>
        </section>
    );
}
