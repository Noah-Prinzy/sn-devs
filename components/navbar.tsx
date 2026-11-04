"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/DecryptedText";
import { lenisRef } from "@/components/lenis-scroll";

const NAV = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];
const GLYPHS = "01<>/{}[]=+*#$";

// The same nav the Home page settles into (logo top-left, links centred, "Get in touch"),
// shown from the start on every other page.
export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    // Once the page moves, the fade becomes a solid bar so the links stay readable over any section.
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // The open menu holds the page still, takes focus, and closes on Escape.
    const closeRef = useRef<HTMLButtonElement>(null);
    const openRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (!open) return;
        lenisRef.current?.stop();
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        const opener = openRef.current;
        return () => { lenisRef.current?.start(); window.removeEventListener("keydown", onKey); opener?.focus(); };
    }, [open]);

    // Home builds its own nav: the logo flies up and the links roll out from it.
    if (pathname === "/") return null;

    return (
        <>
            <nav aria-label="Main" className={`fixed inset-x-0 top-0 z-50 flex h-[84px] items-center gap-6 px-4 transition-colors duration-500 md:px-7 ${scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-md" : "bg-gradient-to-b from-[#0a0a0a]/75 to-transparent"}`}>
                <Link href="/" aria-label="S&N Devs home" className="shrink-0">
                    <Image src="/logo.svg" alt="S&N Devs" width={48} height={48} className="h-12 w-12" priority />
                </Link>
                <ul className="mx-auto hidden gap-9 md:flex">
                    {NAV.map((n) => {
                        const active = pathname === n.href;
                        return (
                            <li key={n.href}>
                                <Link href={n.href} aria-current={active ? "page" : undefined} className={`group relative text-sm outline-none transition-colors hover:text-[var(--brand)] focus-visible:text-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] ${active ? "text-[var(--brand)]" : "text-[#dcdcdc]"}`}>
                                    <DecryptedText text={n.label} animateOn="hover" characters={GLYPHS} speed={40} maxIterations={8} />
                                    <span className={`absolute inset-x-0 -bottom-1.5 h-px bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Button asChild size="sm" className="ml-auto hidden md:ml-0 md:inline-flex">
                    <Link href="/contact">Get in touch</Link>
                </Button>
                <button ref={openRef} onClick={() => setOpen(true)} aria-label="Open menu" aria-controls="site-menu" aria-expanded={open} className="ml-auto grid size-10 place-items-center text-white md:hidden">
                    <Menu className="size-6" />
                </button>
            </nav>

            {open && (
                <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/95 backdrop-blur md:hidden">
                    <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-4 top-5 grid size-10 place-items-center text-white">
                        <X className="size-6" />
                    </button>
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={pathname === n.href ? "page" : undefined} className={`font-heading text-3xl ${pathname === n.href ? "text-[var(--brand)]" : "text-white"}`}>
                            {n.label}
                        </Link>
                    ))}
                    <Button asChild onClick={() => setOpen(false)}>
                        <Link href="/contact">Get in touch</Link>
                    </Button>
                </div>
            )}
        </>
    );
}
