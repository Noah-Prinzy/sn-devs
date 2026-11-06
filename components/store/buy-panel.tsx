"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CreditCard, DeviceMobile, DownloadSimple, SpinnerGap } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

type Stage =
    | { kind: "idle" }
    | { kind: "form" }
    | { kind: "waiting"; reference: string; slow?: boolean }
    | { kind: "paid"; downloadUrl: string }
    | { kind: "error"; message: string };

const POLL_MS = 3000;
const GIVE_UP_MS = 4 * 60 * 1000;
const field = "mt-2 h-11 w-full border border-input bg-transparent px-3 text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-[var(--brand)]";
const label = "block text-xs uppercase tracking-[.2em] text-muted-foreground";

// Buy: Mobile Money (Nylon Pay, UGX) or card (Lemon Squeezy). After a mobile money
// payment the download starts by itself; a pending payment survives a page reload.
export function BuyPanel({ slug, price, mobileMoney, checkoutUrl }: { slug: string; price: string; mobileMoney: boolean; checkoutUrl?: string }) {
    const [stage, setStage] = useState<Stage>({ kind: "idle" });
    const [busy, setBusy] = useState(false);
    const key = `sn-store-payment:${slug}`;
    const started = useRef(0);

    const remember = useCallback((reference: string | null) => {
        try {
            if (reference) localStorage.setItem(key, reference);
            else localStorage.removeItem(key);
        } catch { /* storage can be blocked; the flow still works without it */ }
    }, [key]);

    // Pick up a payment that was in progress before a reload.
    useEffect(() => {
        let saved: string | null = null;
        try { saved = localStorage.getItem(key); } catch { /* ignore */ }
        if (!saved) return;
        const reference = saved;
        // Deferred so the first paint matches the server render.
        const id = setTimeout(() => {
            started.current = Date.now();
            setStage({ kind: "waiting", reference });
        }, 0);
        return () => clearTimeout(id);
    }, [key]);

    // Poll while the buyer approves the prompt on their phone.
    useEffect(() => {
        if (stage.kind !== "waiting" || stage.slow) return;
        let stop = false;
        let timer: ReturnType<typeof setTimeout>;
        const tick = async () => {
            try {
                const res = await fetch(`/api/store/pay/${stage.reference}?slug=${slug}`, { cache: "no-store" });
                const data = await res.json();
                if (stop) return;
                if (data.status === "successful" && data.downloadUrl) {
                    remember(null);
                    setStage({ kind: "paid", downloadUrl: data.downloadUrl });
                    window.location.assign(data.downloadUrl);
                    return;
                }
                if (!res.ok || data.status === "failed" || data.status === "cancelled") {
                    remember(null);
                    setStage({ kind: "error", message: data.error ?? "The payment didn't go through." });
                    return;
                }
                if (Date.now() - started.current > GIVE_UP_MS) {
                    setStage({ kind: "waiting", reference: stage.reference, slow: true });
                    return;
                }
            } catch { /* network blip: try again */ }
            if (!stop) timer = setTimeout(tick, POLL_MS);
        };
        timer = setTimeout(tick, POLL_MS);
        return () => { stop = true; clearTimeout(timer); };
    }, [stage, slug, remember]);

    async function pay(form: FormData) {
        setBusy(true);
        try {
            const res = await fetch("/api/store/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, name: form.get("name"), phone: form.get("phone"), email: form.get("email") }),
            });
            const data = await res.json();
            if (!res.ok || !data.reference) {
                setStage({ kind: "error", message: data.error ?? "The payment could not be started." });
                return;
            }
            remember(data.reference);
            started.current = Date.now();
            setStage({ kind: "waiting", reference: data.reference });
        } catch {
            setStage({ kind: "error", message: "We couldn't reach the payment service. Check your connection and try again." });
        } finally {
            setBusy(false);
        }
    }

    if (!mobileMoney && !checkoutUrl) {
        return <Button size="lg" className="mt-6 w-full" disabled>Coming soon</Button>;
    }

    return (
        <div className="mt-6 space-y-3" aria-live="polite">
            {stage.kind === "idle" && (
                <>
                    {mobileMoney && <Button size="lg" className="w-full" onClick={() => setStage({ kind: "form" })}><DeviceMobile /> Pay with Mobile Money</Button>}
                    {checkoutUrl && (
                        <Button asChild size="lg" variant="outline" className="w-full">
                            <a href={checkoutUrl}><CreditCard /> Pay with card</a>
                        </Button>
                    )}
                </>
            )}

            {stage.kind === "form" && (
                <form action={pay} className="space-y-4 border border-border p-5">
                    <p className="text-sm text-foreground">MTN MoMo or Airtel Money. You&apos;ll get a prompt on your phone to approve {price}.</p>
                    <label className={label}>Your name
                        <input name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
                    </label>
                    <label className={label}>Mobile money number
                        <input name="phone" required inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" className={field} />
                    </label>
                    <label className={label}>Email <span className="normal-case tracking-normal">(optional, for your receipt)</span>
                        <input name="email" type="email" autoComplete="email" className={field} />
                    </label>
                    <div className="flex gap-3 pt-1">
                        <Button type="submit" size="lg" className="flex-1" disabled={busy}>{busy && <SpinnerGap className="animate-spin" />} Send prompt</Button>
                        <Button type="button" size="lg" variant="ghost" onClick={() => setStage({ kind: "idle" })}>Cancel</Button>
                    </div>
                </form>
            )}

            {stage.kind === "waiting" && (
                <div className="space-y-3 border border-border p-5">
                    <p className="flex items-center gap-2 text-foreground"><SpinnerGap className="size-5 animate-spin text-[var(--brand)]" /> Check your phone and enter your PIN.</p>
                    <p className="text-sm text-muted-foreground">
                        {stage.slow
                            ? "Still waiting for the payment to come through. If you approved it, check again in a moment."
                            : "Your download starts as soon as the payment goes through. Keep this page open."}
                    </p>
                    {stage.slow && <Button variant="outline" onClick={() => { started.current = Date.now(); setStage({ kind: "waiting", reference: stage.reference }); }}>Check again</Button>}
                    <button type="button" className="block text-sm text-muted-foreground underline-offset-4 hover:underline" onClick={() => { remember(null); setStage({ kind: "idle" }); }}>
                        Start over
                    </button>
                </div>
            )}

            {stage.kind === "paid" && (
                <div className="space-y-3 border border-[var(--brand)] p-5">
                    <p className="text-foreground">Payment received. Thank you! Your download has started.</p>
                    <Button asChild size="lg" className="w-full"><a href={stage.downloadUrl}><DownloadSimple /> Download again</a></Button>
                    <p className="text-xs text-muted-foreground">This link works for 24 hours.</p>
                </div>
            )}

            {stage.kind === "error" && (
                <div className="space-y-3 border border-destructive p-5">
                    <p className="text-foreground">{stage.message}</p>
                    <Button variant="outline" onClick={() => setStage({ kind: mobileMoney ? "form" : "idle" })}>Try again</Button>
                </div>
            )}
        </div>
    );
}
