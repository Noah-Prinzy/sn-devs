"use client";

import { SiteMotion } from "@/components/site-motion";
import { useScrollAnchors } from "@/components/use-scroll-anchors";
import { AboutOpener } from "@/components/about/about-opener";
import { Founders } from "@/components/about/founders";
import { Manifesto } from "@/components/about/manifesto";
import { Promises } from "@/components/about/promises";
import { AboutClose } from "@/components/about/about-close";

// About — "the site that builds itself" (design/about/about-build-plan.md). A browser window
// builds a demo client's site from wireframe to live while the headline turns from "We build
// it." to "We keep it running."; then the window splits into the two of us, the manifesto
// lights up word by word, the four promises play as tabs, and an empty window waits for yours.
export function AboutPage() {
    // Stops come from the page itself: every section top plus the exit of each pinned one.
    useScrollAnchors();
    return (
        <SiteMotion>
            <main className="overflow-x-clip bg-[#0a0a0a] text-neutral-100 selection:bg-(--brand) selection:text-(--brand-fg)">
                <AboutOpener />
                <Founders />
                <Manifesto />
                <Promises />
                <AboutClose />
            </main>
        </SiteMotion>
    );
}
