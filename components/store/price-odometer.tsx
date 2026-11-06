"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const DIGITS = "0123456789";

// A price whose digits roll into place, like an odometer, when it scrolls into view.
// Screen readers get the plain text.
export function PriceOdometer({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const seen = useInView(ref, { once: true, margin: "-5% 0px" });
    let n = 0;
    return (
        <span ref={ref} className={`inline-flex leading-none ${className}`} aria-label={text} role="text">
            {[...text].map((c, i) => {
                const d = DIGITS.indexOf(c);
                if (d < 0) return <span key={i} aria-hidden className="whitespace-pre">{c}</span>;
                const order = n++;
                return (
                    <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden tabular-nums">
                        <motion.span
                            className="flex flex-col"
                            initial={{ y: "0em" }}
                            animate={{ y: seen ? `${-d}em` : "0em" }}
                            transition={{ duration: 0.9 + order * 0.15, delay: delay + order * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                            {[...DIGITS].map((x) => <span key={x} className="block h-[1em]">{x}</span>)}
                        </motion.span>
                    </span>
                );
            })}
        </span>
    );
}
