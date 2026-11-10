"use client";

import { type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { usePausedMotion } from "@/components/motion-pref";

// One MotionConfig for every page: the OS reduced-motion setting as before, and the site's
// own pause switch (components/motion-pref.tsx) on top of it.
export function SiteMotion({ children }: { children: ReactNode }) {
    const paused = usePausedMotion();
    return <MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig>;
}
