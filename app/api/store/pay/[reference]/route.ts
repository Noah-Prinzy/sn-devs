import { downloadToken, findTemplate, mobileMoneyReady, nylon, paidFor } from "@/lib/store/payments";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// The buy page polls this while the buyer approves the prompt on their phone.
// Once Nylon Pay reports the payment as successful (and it matches the template),
// it hands back a signed download link.
export async function GET(req: Request, { params }: { params: Promise<{ reference: string }> }) {
    if (!mobileMoneyReady()) return Response.json({ error: "Mobile Money isn't switched on yet." }, { status: 503 });

    const { reference } = await params;
    const t = findTemplate(new URL(req.url).searchParams.get("slug"));
    if (!t || !UUID.test(reference)) return Response.json({ error: "Unknown payment." }, { status: 404 });

    const result = await nylon().getTransaction({ reference });
    if (result.isErr) return Response.json({ status: "pending" }); // not visible yet; the page asks again

    const tx = result.value;
    if (tx.status === "successful") {
        if (!paidFor(tx, t)) return Response.json({ status: "failed", error: "This payment doesn't match this template. Please contact us." });
        return Response.json({ status: "successful", downloadUrl: `/api/store/download?token=${downloadToken(t.slug, reference)}` });
    }
    if (tx.status === "failed" || tx.status === "cancelled") {
        return Response.json({ status: tx.status, error: tx.failureReason ?? "The payment didn't go through." });
    }
    return Response.json({ status: tx.status, delayed: tx.delayed ?? false });
}
