"use client";

import { motion } from "motion/react";
import { useStill } from "@/components/store/browser-frame";
import { cn } from "@/lib/utils";

// One green dot where Kampala is, with two slow rings spreading from it. Positioned by the
// parent (percentages of the photo or map), so it stays on the city at every size. Reduced
// motion shows the rings resting at a middle size. The dot is square like every other mark
// on the site; the rings are the one place a circle is unavoidable, since a signal spreads
// evenly and a square ring would read as a frame.
// arriveAt (seconds from mount): the dot lights on a spring at that moment and the first ring
// leaves it then; without it the pin is simply there. Each ring's keyframes lead with opacity 0:
// a waiting animation shows its first keyframe through its delay, so a 0.6 start would park a
// crisp static ring around the dot until the second ring's 2.4 s delay ran out.
const RING_S = 4.8;

export function KampalaPin({ x, y, className, label, arriveAt }: { x: string; y: string; className?: string; label?: boolean; arriveAt?: number }) {
    const still = useStill();
    const at = arriveAt ?? 0;
    return (
        <span
            aria-hidden={label ? undefined : true}
            style={{ left: x, top: y }}
            className={cn("pointer-events-none absolute z-10 size-0", className)}
        >
            {[0, RING_S / 2].map((delay) => (
                <motion.span
                    key={delay}
                    aria-hidden
                    initial={{ scale: 1, opacity: 0 }}
                    animate={still ? { scale: 1.8, opacity: 0.25 } : { scale: [1, 1, 3.2], opacity: [0, 0.6, 0] }}
                    transition={still ? { duration: 0 } : { duration: RING_S, ease: "easeOut", times: [0, 0.01, 1], repeat: Infinity, delay: at + delay }}
                    className="absolute -left-5 -top-5 size-10 rounded-full border border-(--brand)/40"
                />
            ))}
            <motion.span
                aria-hidden
                initial={arriveAt === undefined ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 520, damping: 20, delay: at }}
                className="absolute -left-0.75 -top-0.75 size-1.5 bg-(--brand) shadow-[0_0_12px_var(--brand)]"
            />
            {label && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.3em] text-neutral-300">
                    Kampala
                </span>
            )}
        </span>
    );
}
