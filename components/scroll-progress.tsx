"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useStill } from "@/components/store/browser-frame";

// A hairline along the navbar's bottom edge that fills as the page is read. Pattern from Smooth
// UI's "Scroll Progress" (smoothui.dev, MIT): useScroll + useSpring driving a scaleX transform,
// rewritten here for motion/react, square, and Signal green. Under reduced motion the spring
// is dropped and the line follows the scroll position directly (one 2 px bar; no large motion).
export function ScrollProgress() {
    const still = useStill();
    const { scrollYProgress } = useScroll();
    const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden
            style={{ scaleX: still ? scrollYProgress : spring }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-(--brand)"
        />
    );
}
