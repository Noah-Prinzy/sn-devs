"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import { shotsOf } from "@/components/store/shots";

export type Play = "hover" | "auto" | "still";

// A template's page inside a 16:10 screen. With a full-page shot it scrolls down the page:
// on hover of the nearest `.group` ("hover"), or slowly by itself while in view ("auto").
// Without one it shows the first screen and leans in a little on hover.
export function Screen({ slug, name, play = "hover", sizes, priority }: { slug: string; name: string; play?: Play; sizes: string; priority?: boolean }) {
    const s = shotsOf(slug);
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { margin: "-10% 0px" });
    const reduce = useStill();
    const alt = `${name} template preview`;

    if (!s.tall) {
        return (
            <div ref={ref} className="relative aspect-16/10 overflow-hidden bg-muted">
                <Image src={s.desktop} alt={alt} fill priority={priority} sizes={sizes}
                    className={`object-cover object-top ${play === "hover" ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]" : ""}`} />
            </div>
        );
    }

    // How far the shot travels: everything below the first screen (1440×900).
    const pan = -(1 - 900 / s.tall.h) * 100;
    const secs = Math.max(3, (s.tall.h / 900) * 2.2);
    const img = <Image src={s.tall.src} alt={alt} width={1440} height={s.tall.h} priority={priority} sizes={sizes} className="block h-auto w-full" />;

    return (
        <div ref={ref} className="relative aspect-16/10 overflow-hidden bg-muted">
            {play === "auto" && !reduce ? (
                <motion.div
                    animate={seen ? { y: ["0%", `${pan}%`, `${pan}%`, "0%"] } : { y: "0%" }}
                    transition={seen ? { duration: secs * 2 + 3, times: [0, 0.45, 0.6, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 } : { duration: 0.6 }}
                >
                    {img}
                </motion.div>
            ) : (
                <div
                    style={{ "--pan": `${pan}%`, "--d": `${secs}s` } as CSSProperties}
                    className={play === "hover" ? "transition-transform duration-700 ease-in-out group-hover:translate-y-(--pan) group-hover:duration-(--d) motion-reduce:translate-y-0!" : ""}
                >
                    {img}
                </div>
            )}
        </div>
    );
}

// The screen in a browser window: three dots and the slug in the bar.
export function BrowserFrame({ slug, name, play, sizes, priority, className = "" }: { slug: string; name: string; play?: Play; sizes: string; priority?: boolean; className?: string }) {
    return (
        <div className={`overflow-hidden border border-border bg-[#111] ${className}`}>
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                {[0, 1, 2].map((i) => <span key={i} className="size-2 bg-foreground/15" />)}
                <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{slug}</span>
            </div>
            <Screen slug={slug} name={name} play={play} sizes={sizes} priority={priority} />
        </div>
    );
}

// Reduced-motion preference that renders "false" on the server and during hydration, then
// follows the real setting, so the first client render matches the static HTML.
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
    const m = window.matchMedia(RM);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
};
export function useStill() {
    return useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);
}
