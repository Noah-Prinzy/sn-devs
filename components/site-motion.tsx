"use client";

import { type ReactNode } from "react";
import { MotionConfig } from "motion/react";

// One MotionConfig for every page: Motion follows the visitor's OS reduced-motion setting.
export function SiteMotion({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
