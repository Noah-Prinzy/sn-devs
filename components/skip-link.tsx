"use client";

import { lenisRef } from "@/components/lenis-scroll";

// The first thing a keyboard reaches on every page: hidden until focused, it jumps past the
// navbar into the page's main landmark (WCAG 2.4.1 Bypass Blocks, technique G1). The landmark
// is found live, so pages need no shared id; focus goes with the jump so the next Tab carries
// on inside the content.
export function SkipLink() {
    const skip = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const main = document.querySelector<HTMLElement>("main");
        if (!main) return;
        e.preventDefault();
        // Lenis would otherwise look the hash up itself and warn when the id is missing.
        e.stopPropagation();
        main.tabIndex = -1;
        lenisRef.current?.scrollTo(main, { immediate: true });
        main.focus({ preventScroll: true });
    };
    return (
        <a
            href="#main"
            onClick={skip}
            className="fixed left-4 top-4 z-70 -translate-y-24 bg-(--brand) px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[.2em] text-(--brand-fg) opacity-0 outline-none transition-[opacity,transform] duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] motion-reduce:transition-none"
        >
            Skip to content
        </a>
    );
}
