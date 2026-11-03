import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so Turbopack never resolves `next` from a stale or parent path
  // (the folder was renamed from "S&N Studio", which broke the cached root).
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
