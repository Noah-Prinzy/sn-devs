import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Turbopack never resolves `next` from a stale or parent path
  // (the folder was renamed from "S&N Studio", which broke the cached root).
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Next 16 only serves the qualities listed here; the pages ask for 70 (ghosted map), 75 (default), 86-92 (hero photos).
    qualities: [70, 75, 86, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
