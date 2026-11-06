import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ugx, usd } from "@/data/services";
import { TIERS, priceOf, type Template } from "@/data/templates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// A screenshot of the template (public/assets/store/<slug>/desktop.png, 1440×900),
// framed like a browser window.
export function TemplatePreview({ t, large = false }: { t: Template; large?: boolean }) {
    return (
        <div className="overflow-hidden border border-border bg-muted">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                {[0, 1, 2].map((i) => <span key={i} className="size-2 bg-foreground/15" />)}
                <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{t.slug}</span>
            </div>
            <div className="relative aspect-[16/10]">
                <Image
                    src={`/assets/store/${t.slug}/desktop.png`}
                    alt={`${t.name} template preview`}
                    fill
                    priority={large}
                    sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
                    className={`object-cover object-top ${large ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.03]"}`}
                />
            </div>
        </div>
    );
}

export function TemplateCard({ t }: { t: Template }) {
    const price = priceOf(t);
    return (
        <Link href={`/store/${t.slug}`} className="group block outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
            <Card className="h-full transition-colors group-hover:border-[var(--brand)]">
                <CardContent>
                    <TemplatePreview t={t} />
                </CardContent>
                <CardHeader>
                    <Badge variant="secondary" className="w-fit">{TIERS[t.tier]}</Badge>
                    <CardTitle className="font-heading text-2xl group-hover:text-[var(--brand)]">{t.name}</CardTitle>
                    <CardDescription>{t.tagline}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto justify-between">
                    <p className="font-heading text-xl text-[var(--brand)]">
                        {ugx(price)} <span className="font-sans text-xs text-muted-foreground">{usd(price)}</span>
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground">View <ArrowUpRight className="size-4" /></span>
                </CardFooter>
            </Card>
        </Link>
    );
}
