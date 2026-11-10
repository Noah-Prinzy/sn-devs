"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { setPausedMotion, usePausedMotion } from "@/components/motion-pref";

// The visible pause for everything that moves on its own (WCAG 2.2.2). One 44 px button in
// the navbar on every page; the choice is kept for the next visit.
export function MotionToggle({ className = "" }: { className?: string }) {
    const paused = usePausedMotion();
    return (
        <button
            type="button"
            onClick={() => setPausedMotion(!paused)}
            aria-pressed={paused}
            aria-label={paused ? "Play motion" : "Pause motion"}
            title={paused ? "Play motion" : "Pause motion"}
            className={`grid size-11 place-items-center text-[#dcdcdc] outline-none transition-colors hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${className}`}
        >
            {paused ? <Play className="size-5" weight="fill" /> : <Pause className="size-5" weight="fill" />}
        </button>
    );
}
