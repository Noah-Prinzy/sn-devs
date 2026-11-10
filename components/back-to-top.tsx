"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "@phosphor-icons/react";
import { glideTo } from "@/components/use-scroll-anchors";

// One fixed "back to top" control, lower right, only on pages taller than four screens, only
// once the visitor is two screens down and has scrolled up (NN/g back-to-top: useful on long
// pages, delayed until a few screens in, never scrolling the page by itself). It fades in
// and out in place and never moves; the glide up is user-initiated travel (<= 1.2 s), instant
// under reduced motion. The Contact page is left to its own crew.
const SCREENS_LONG = 4, SCREENS_DOWN = 2;

export function BackToTop() {
    const pathname = usePathname();
    const [shown, setShown] = useState(false);

    useEffect(() => {
        if (pathname === "/contact") return;
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY, vh = window.innerHeight;
            const up = y < lastY - 1;
            lastY = y;
            const long = document.documentElement.scrollHeight > SCREENS_LONG * vh;
            setShown(long && y >= SCREENS_DOWN * vh && up);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    if (pathname === "/contact") return null;
    return (
        <button
            type="button"
            aria-label="Back to top"
            tabIndex={shown ? 0 : -1}
            aria-hidden={!shown}
            onClick={() => glideTo(0, undefined, { focus: document.querySelector<HTMLElement>("main") })}
            className={`fixed bottom-5 right-5 z-40 grid size-11 place-items-center border border-white/15 bg-[#0a0a0a]/85 text-white outline-none backdrop-blur-md transition-opacity duration-300 hover:border-(--brand) hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] motion-reduce:transition-none ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
            <ArrowUp className="size-5" />
        </button>
    );
}
