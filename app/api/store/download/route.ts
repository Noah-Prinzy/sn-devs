import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { get } from "@vercel/blob";
import { findTemplate, readDownloadToken } from "@/lib/store/payments";

// Streams a paid template's zip. The token is minted only after Nylon Pay confirms
// the payment, and it names the one template it unlocks.
// Files live in private Vercel Blob storage at editions/<slug>.zip; for local testing,
// STORE_EDITIONS_DIR can point at a folder of zips instead.
export async function GET(req: Request) {
    const token = new URL(req.url).searchParams.get("token") ?? "";
    const claim = process.env.STORE_DOWNLOAD_SECRET ? readDownloadToken(token) : null;
    const t = findTemplate(claim?.slug);
    if (!claim || !t) return new Response("This download link is invalid or has expired.", { status: 403 });

    const headers = {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${t.slug}-sn-edition.zip"`,
        "Cache-Control": "private, no-store",
    };

    if (process.env.BLOB_READ_WRITE_TOKEN) {
        const file = await get(`editions/${t.slug}.zip`, { access: "private" });
        if (!file || file.statusCode !== 200) return new Response("File not found. Please contact us.", { status: 404 });
        return new Response(file.stream, { headers: { ...headers, "Content-Length": String(file.blob.size) } });
    }

    const dir = process.env.STORE_EDITIONS_DIR;
    if (dir) {
        const file = path.join(dir, `${t.slug}.zip`);
        try {
            const { size } = statSync(file);
            const stream = Readable.toWeb(createReadStream(file)) as ReadableStream<Uint8Array>;
            return new Response(stream, { headers: { ...headers, "Content-Length": String(size) } });
        } catch {
            return new Response("File not found. Please contact us.", { status: 404 });
        }
    }
    return new Response("Downloads aren't set up yet. Please contact us.", { status: 503 });
}
