"use client";

import { LogoMark } from "@/components/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/store", label: "Store" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    // Home ends on its "Say hello" scene, a full screen with the CTA, so it has no footer.
    if (usePathname() === "/") return null;

    return (
        <footer className="w-full border-t border-white/10 bg-[#0a0a0a] px-4 py-12 text-neutral-400 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-4">
                    <Link href="/" aria-label="S&N Devs home" className="w-fit outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]">
                        <LogoMark className="h-12 w-12" reveal={false} />
                    </Link>
                    <p className="max-w-sm text-sm">The portfolio and service studio of Shaun &amp; Noah. Websites, systems and creative work, built to grow with you.</p>
                </div>
                {/* Each link is a 44 px tall target with clear space around it (WCAG 2.5.8, Apple HIG). */}
                <nav aria-label="Footer" className="flex flex-wrap gap-x-8 text-sm">
                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="-mx-1.5 inline-block px-1.5 py-3 outline-none transition-colors hover:text-(--brand) focus-visible:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]">
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <p className="mx-auto mt-10 max-w-7xl text-xs text-neutral-400">© {new Date().getFullYear()} S&amp;N Devs. All rights reserved.</p>
        </footer>
    );
}
