"use client";

import Image from "next/image";
import { type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// A full-screen photo scene, the way the Home intro looks: the picture eases in from a slight
// zoom as the scene arrives and drifts as it leaves, a dark shade keeps the words readable, and
// the content rises in with a blur. On phones the shade covers the whole picture. One screen
// each, so the page's scroll anchors glide scene to scene.
type Shade = "left" | "right" | "full" | "bottom";
const SHADES: Record<Shade, string> = {
    left: "bg-black/75 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.78)_45%,rgba(0,0,0,.2)_100%)]",
    right: "bg-black/75 md:bg-transparent md:bg-[linear-gradient(270deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.78)_45%,rgba(0,0,0,.2)_100%)]",
    full: "bg-black/70",
    bottom: "bg-[linear-gradient(0deg,rgba(0,0,0,.95)_0%,rgba(0,0,0,.6)_50%,rgba(0,0,0,.35)_100%)]",
};

export function Scene({
    id, sectionRef, img, pos = "50% 50%", shade = "left", label, className = "", children,
}: {
    id?: string;
    sectionRef: RefObject<HTMLElement | null>;
    img: string;
    pos?: string;
    shade?: Shade;
    label: string;
    className?: string;
    children: ReactNode;
}) {
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    // 1.18 while arriving → 1 when it fills the screen → 1.06 as it leaves.
    const scale = useTransform(scrollYProgress, (v) => 1.18 - 0.18 * Math.min(1, v * 2) + 0.12 * Math.max(0, v - 0.5));
    const y = useTransform(scrollYProgress, (v) => `${(v - 0.5) * 8}%`);
    return (
        <section id={id} ref={sectionRef} aria-label={label} className="relative flex min-h-svh overflow-hidden bg-black">
            <motion.div aria-hidden style={{ scale, y }} className="absolute inset-0 motion-reduce:!transform-none">
                <Image src={img} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: pos }} />
            </motion.div>
            <div aria-hidden className={`absolute inset-0 ${SHADES[shade]}`} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
            <div className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pb-12 pt-28 md:px-10 ${className}`}>{children}</div>
        </section>
    );
}

// Rises in with a blur, like the intro's welcome; once per visit.
export function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
