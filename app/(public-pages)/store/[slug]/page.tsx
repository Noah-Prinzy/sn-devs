import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { ugx, usd } from "@/data/services";
import { CATEGORIES, TEMPLATES, TIERS, priceOf } from "@/data/templates";
import { DeviceStage } from "@/components/store/device-stage";
import { PriceOdometer } from "@/components/store/price-odometer";
import { PagesInside, Reveal } from "@/components/store/pages-inside";
import { shotsOf } from "@/components/store/shots";
import { BuyPanel } from "@/components/store/buy-panel";
import { mobileMoneyReady } from "@/lib/store/payments";

// One template's page: what it is, what's in it, and Buy. Mobile Money runs through
// Nylon Pay (app/api/store); card checkout through Lemon Squeezy once `checkoutUrl` is set.
export function generateStaticParams() {
    return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const t = TEMPLATES.find((x) => x.slug === slug);
    return t ? { title: `${t.name} template · S&N Devs`, description: t.tagline } : {};
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const t = TEMPLATES.find((x) => x.slug === slug);
    if (!t) notFound();
    const price = priceOf(t);
    const category = CATEGORIES.find((c) => c.id === t.category)!;
    const shots = shotsOf(t.slug);
    const hasMore = Boolean(shots.inner || shots.tall || shots.mobile);
    const tick = <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" />;

    return (
        <main className="min-h-svh bg-background px-4 pb-28 pt-32 text-foreground md:px-6">
            <div className="mx-auto max-w-6xl">
                <Link href="/store" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All templates</Link>

                <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
                    <Reveal>
                        <DeviceStage slug={t.slug} name={t.name} priority />
                    </Reveal>

                    <div className="lg:sticky lg:top-28">
                        <p className="text-xs uppercase tracking-[.25em] text-[var(--brand)]">{category.name} · {TIERS[t.tier]}</p>
                        <h1 className="mt-3 font-heading text-5xl">{t.name}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{t.tagline}</p>
                        <p className="mt-8 font-heading text-4xl text-[var(--brand)]">
                            <PriceOdometer text={ugx(price)} /> <span className="font-sans text-sm text-muted-foreground">{usd(price)}</span>
                        </p>
                        <BuyPanel slug={t.slug} price={ugx(price)} mobileMoney={mobileMoneyReady()} checkoutUrl={t.checkoutUrl} />
                        <p className="mt-3 text-sm text-muted-foreground">One-time payment. Your download starts as soon as the payment goes through.</p>
                        {t.demoUrl && <a href={t.demoUrl} className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Live demo <ArrowRight className="size-4" /></a>}
                    </div>
                </div>

                {hasMore && (
                    <Reveal className="mt-24">
                        <h2 className="font-heading text-3xl">Pages inside</h2>
                        <PagesInside slug={t.slug} name={t.name} />
                    </Reveal>
                )}

                <div className="mt-20 grid gap-12 md:grid-cols-3">
                    <Reveal className="md:col-span-2"><section>
                        <h2 className="font-heading text-3xl">What it is</h2>
                        <p className="mt-4 text-muted-foreground">{t.description}</p>
                        <h2 className="mt-12 font-heading text-3xl">What&apos;s included</h2>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[...t.features, "Setup guide", "Full source code"].map((f) => <li key={f} className="flex gap-2 text-foreground">{tick}{f}</li>)}
                        </ul>
                    </section></Reveal>
                    <Reveal delay={0.1}><aside className="space-y-8 text-sm">
                        <div>
                            <h2 className="text-xs uppercase tracking-[.2em] text-muted-foreground">Built with</h2>
                            <div className="mt-3 flex flex-wrap gap-2">{t.stack.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}</div>
                        </div>
                        <div>
                            <h2 className="text-xs uppercase tracking-[.2em] text-muted-foreground">Best for</h2>
                            <p className="mt-2 text-foreground">{t.bestFor}</p>
                        </div>
                        <div>
                            <h2 className="text-xs uppercase tracking-[.2em] text-muted-foreground">Licence</h2>
                            <p className="mt-2 text-muted-foreground">S&N Edition licence. Built on {t.base.name} by {t.base.author} ({t.base.licence}), credited in the download.</p>
                        </div>
                        <div className="border border-border p-5">
                            <p className="text-foreground">Want it set up and customised for you?</p>
                            <Link href={`/contact?service=templates&template=${t.slug}`} className="mt-2 inline-flex items-center gap-1 text-[var(--brand)] hover:underline">Ask us to set it up <ArrowRight className="size-4" /></Link>
                        </div>
                    </aside></Reveal>
                </div>
            </div>
        </main>
    );
}
