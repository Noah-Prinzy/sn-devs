"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Screen } from "@/components/store/browser-frame";
import { shotsOf } from "@/components/store/shots";

// A laptop with the template's page scrolling on it and, when there is a phone shot,
// a phone leaning in front. Pure CSS frames; no images of devices.
export function DeviceStage({ slug, name, priority, className = "" }: { slug: string; name: string; priority?: boolean; className?: string }) {
    const mobile = shotsOf(slug).mobile;
    return (
        <div className={`relative pb-[4%] ${mobile ? "pr-[9%]" : ""} ${className}`}>
            <div className="relative">
                <div className="rounded-t-[14px] border border-white/15 bg-[#151515] p-[2.2%] shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]">
                    <div className="overflow-hidden rounded-[4px] ring-1 ring-black">
                        <Screen slug={slug} name={name} play="auto" sizes="(min-width: 1024px) 720px, 92vw" priority={priority} />
                    </div>
                </div>
                <div className="relative mx-[-6%] h-3 rounded-b-[10px] bg-linear-to-b from-[#2a2a2a] to-[#121212] md:h-4">
                    <div className="absolute left-1/2 top-0 h-1.5 w-[14%] -translate-x-1/2 rounded-b-md bg-black/60" />
                </div>
            </div>
            {mobile && (
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 w-[24%] rounded-[18%/8.5%] border border-white/15 bg-[#151515] p-[1.6%] shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)]"
                >
                    <div className="relative aspect-375/812 overflow-hidden rounded-[15%/7%] bg-muted">
                        <Image src={mobile} alt={`${name} on a phone`} fill sizes="180px" className="object-cover object-top" />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
