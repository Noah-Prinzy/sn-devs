import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The browser window every About section is built from (design/about/about-build-plan.md):
// a dark frame, three dots, a URL pill, and whatever the section puts inside. `url` can be any
// node so a section can animate it (typing, a loading bar, a lock appearing).
export function BrowserWindow({
    url,
    right,
    children,
    className,
    bodyClassName,
}: {
    url: ReactNode;
    right?: ReactNode; // anything on the right of the bar (a LIVE dot, a tag)
    children?: ReactNode;
    className?: string;
    bodyClassName?: string;
}) {
    return (
        <div className={cn("relative flex flex-col overflow-hidden border border-white/12 bg-[#0e0e0e] shadow-[0_40px_80px_rgba(0,0,0,.55)]", className)}>
            <div className="relative flex h-10 shrink-0 items-center gap-3 border-b border-white/10 bg-[#141414] px-3.5">
                <span aria-hidden className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <span className="relative flex h-6 min-w-0 flex-1 items-center overflow-hidden bg-white/[.05] px-3 font-mono text-[11px] text-neutral-400">{url}</span>
                {right}
            </div>
            <div className={cn("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
        </div>
    );
}
