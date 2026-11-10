import type { MetadataRoute } from "next";

// Web app manifest: the S&N tile icons (public/icon-*.png are rendered from app/icon.svg).
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "S&N Devs",
        short_name: "S&N Devs",
        description: "The portfolio and service studio of Shaun & Noah, Kampala.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "/icon-mask.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    };
}
