import Link from "next/link";
import type { ReactNode } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { SERVICE_GROUPS, ugx } from "@/data/services";

// Four short answers. Prices come from the services data, so they never go stale.

const from = (id: string) => {
    const s = SERVICE_GROUPS.flatMap((g) => g.services).find((x) => x.id === id);
    return s ? ugx(s.from) : "";
};
const SERVICES_LINK = (
    <Link href="/services" className="text-(--brand) underline underline-offset-4">
        Services page
    </Link>
);

const ITEMS: { q: string; a: ReactNode }[] = [
    {
        q: "What does a website cost?",
        a: (
            <>
                Launch pages start at {from("launch")} and full business websites at {from("websites")}. Web apps and systems are
                quoted per project. Everything, with what&apos;s included, is on the {SERVICES_LINK}.
            </>
        ),
    },
    { q: "How long does it take?", a: "A launch page takes about a week, a full site two to four weeks, depending on how ready the words and pictures are. We agree the date before we start." },
    { q: "Do you work outside Kampala?", a: "Yes. Calls happen on WhatsApp or Google Meet, the work lives in the cloud, and invoices go out in UGX or USD." },
    { q: "What should I put in my message?", a: "What the project is for, the pages or features you expect, your deadline, and a budget range if you have one. A sentence is enough; we'll ask about the rest." },
];

export function Faq() {
    return (
        <section aria-labelledby="faq-title" className="mx-auto grid max-w-6xl gap-10 px-4 py-24 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-6 md:py-32">
            <div>
                <p className="font-mono text-xs uppercase tracking-[.3em] text-(--brand)">Good to know</p>
                <h2 id="faq-title" className="mt-4 font-heading text-4xl leading-tight md:text-5xl">Before you write.</h2>
            </div>
            <div>
                {ITEMS.map((it) => (
                    <details key={it.q} className="group border-t border-white/12 last:border-b">
                        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-lg transition-colors outline-none hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand) group-open:text-(--brand) md:text-xl [&::-webkit-details-marker]:hidden">
                            {it.q}
                            <Plus aria-hidden className="size-5 shrink-0 text-(--brand) transition-transform duration-300 group-open:rotate-45" />
                        </summary>
                        <p className="max-w-xl pb-6 leading-relaxed text-neutral-300">{it.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
