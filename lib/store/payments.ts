import { createHmac, timingSafeEqual } from "node:crypto";
import { createNylonPay, type NylonPaySdk, type Transaction } from "@nile-squad/nylonpay-ts";
import { TEMPLATES, priceOf, type Template } from "@/data/templates";

// Server-only helpers for selling templates over Nylon Pay (mobile money, UGX).
// No database: Nylon Pay keeps the payment record, and a paid buyer gets a signed,
// expiring download token that names the template.

export const mobileMoneyReady = () =>
    Boolean(process.env.NYLONPAY_API_KEY && process.env.NYLONPAY_API_SECRET && process.env.STORE_DOWNLOAD_SECRET);

let client: NylonPaySdk | null = null;
export function nylon() {
    if (!client) {
        client = createNylonPay({
            apiKey: process.env.NYLONPAY_API_KEY!,
            apiSecret: process.env.NYLONPAY_API_SECRET!,
            // The SDK keeps polling after a collect; our page polls instead, so cap it at one check.
            maxPollAttempts: 1,
        });
    }
    return client;
}

export const findTemplate = (slug: unknown): Template | undefined =>
    typeof slug === "string" ? TEMPLATES.find((t) => t.slug === slug) : undefined;

// A payment only unlocks a download if it is a successful UGX collection of the
// right amount, for the template the token will name.
export function paidFor(tx: Transaction, t: Template) {
    return tx.status === "successful" && tx.currency === "UGX" && tx.amount >= priceOf(t) && tx.metadata?.slug === t.slug;
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // the buyer can come back to the link for a day

const sign = (body: string) => createHmac("sha256", process.env.STORE_DOWNLOAD_SECRET!).update(body).digest("base64url");

export function downloadToken(slug: string, reference: string) {
    const body = Buffer.from(JSON.stringify({ slug, reference, exp: Date.now() + TOKEN_TTL_MS })).toString("base64url");
    return `${body}.${sign(body)}`;
}

export function readDownloadToken(token: string): { slug: string; reference: string } | null {
    const [body, mac] = token.split(".");
    if (!body || !mac) return null;
    const expected = Buffer.from(sign(body));
    const given = Buffer.from(mac);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
    try {
        const data = JSON.parse(Buffer.from(body, "base64url").toString());
        if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
        return { slug: data.slug, reference: data.reference };
    } catch {
        return null;
    }
}
