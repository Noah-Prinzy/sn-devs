import { randomUUID } from "node:crypto";
import { priceOf } from "@/data/templates";
import { findTemplate, mobileMoneyReady, nylon } from "@/lib/store/payments";

// Starts a mobile money payment: Nylon Pay sends a PIN prompt to the buyer's phone.
// The price always comes from data/templates.ts, never from the request.
export async function POST(req: Request) {
    if (!mobileMoneyReady()) return Response.json({ error: "Mobile Money isn't switched on yet." }, { status: 503 });

    const body = await req.json().catch(() => null);
    const t = findTemplate(body?.slug);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.replace(/[\s-]/g, "") : "";
    const email = typeof body?.email === "string" && /^\S+@\S+\.\S+$/.test(body.email.trim()) ? body.email.trim() : undefined;

    if (!t) return Response.json({ error: "That template doesn't exist." }, { status: 404 });
    if (name.length < 2 || name.length > 80) return Response.json({ error: "Please enter your name." }, { status: 400 });
    if (!/^\+?\d{9,13}$/.test(phone)) return Response.json({ error: "Please enter a valid MTN or Airtel number." }, { status: 400 });

    try {
        const payment = await nylon().collectPayment({
            amount: priceOf(t),
            currency: "UGX",
            description: `${t.name} template, S&N Devs`,
            customer: { name, phoneNumber: phone, email },
            method: "mobileMoney",
            reference: randomUUID(),
            metadata: { slug: t.slug },
            tags: ["store", t.slug],
        });
        // A rejected initiation arrives as an "error" event on the next tick, not as a throw.
        const failed = await new Promise<string | null>((resolve) => {
            payment.once("error", (e) => resolve(e.error ?? "The payment could not be started."));
            setTimeout(() => resolve(null), 50);
        });
        if (failed) {
            console.error("[store] Nylon Pay rejected a payment:", failed);
            return Response.json({ error: "We couldn't start the payment. Please try again in a minute." }, { status: 502 });
        }
        return Response.json({ reference: payment.reference });
    } catch (e) {
        return Response.json({ error: e instanceof Error ? e.message : "The payment could not be started." }, { status: 400 });
    }
}
