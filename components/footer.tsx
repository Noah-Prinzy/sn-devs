"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    // Home is exactly two full-screen sections, so it has no footer.
    if (usePathname() === "/") return null;

    return (
        <footer className="w-full border-t border-white/10 bg-[#0a0a0a] px-4 py-12 text-neutral-400 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-4">
                    <Link href="/" aria-label="S&N Devs home">
                        <Image src="/logo.svg" alt="S&N Devs" width={48} height={48} className="h-12 w-12" />
                    </Link>
                    <p className="max-w-sm text-sm">The portfolio and service studio of Shaun &amp; Noah. Websites, systems and creative work, built to grow with you.</p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="outline-none transition-colors hover:text-[var(--brand)] focus-visible:text-[var(--brand)] focus-visible:underline">
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <p className="mx-auto mt-10 max-w-7xl text-xs text-neutral-400">© {new Date().getFullYear()} S&amp;N Devs. All rights reserved.</p>
        </footer>
    );
}
