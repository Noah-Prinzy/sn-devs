"use client";

import { LogoMark } from "@/components/logo";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/DecryptedText";
import { lenisRef } from "@/components/lenis-scroll";
import { ScrollProgress } from "@/components/scroll-progress";

const NAV = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/store", label: "Store" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];
const GLYPHS = "01<>/{}[]=+*#$";

// A fixed-size dot that fades in once a navigation has been pending for 100 ms (Next.js
// useLinkStatus: always rendered, opacity only, so nothing shifts; a prefetched route never
// shows it). Sits in the link's own box.
function Pending() {
    const { pending } = useLinkStatus();
    return <span aria-hidden className={`absolute -right-3 top-1/2 size-1.5 -translate-y-1/2 bg-(--brand) transition-opacity duration-200 ${pending ? "opacity-100 delay-100" : "opacity-0"}`} />;
}

// The site nav (logo top-left, links centred, "Get in touch"), shown on every page. Its height
// is --nav-h (app/globals.css): 84 px, 56 px on short landscape screens.
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

    return (
        <>
            <nav aria-label="Main" className={`fixed inset-x-0 top-0 z-50 flex h-(--nav-h) items-center gap-6 px-4 transition-colors duration-500 md:px-7 ${scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-md" : "bg-linear-to-b from-[#0a0a0a]/75 to-transparent"}`}>
                <Link href="/" aria-label="S&N Devs home" className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]">
                    <LogoMark className="h-12 w-12 short:h-9 short:w-9" />
                </Link>
                <ul className="mx-auto hidden gap-9 md:flex">
                    {NAV.map((n) => {
                        const active = pathname === n.href;
                        return (
                            <li key={n.href}>
                                {/* py-2 gives each link a 36 px tall target on tablets (WCAG 2.5.8). */}
                                <Link href={n.href} aria-current={active ? "page" : undefined} className={`group relative block py-2 text-sm outline-none transition-colors hover:text-(--brand) focus-visible:text-(--brand) focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] ${active ? "text-(--brand)" : "text-[#dcdcdc]"}`}>
                                    <DecryptedText text={n.label} animateOn="hover" characters={GLYPHS} speed={40} maxIterations={8} />
                                    <span className={`absolute inset-x-0 bottom-0.5 h-px bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
                                    <Pending />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Button asChild size="sm" className="ml-auto hidden md:ml-0 md:inline-flex">
                    <Link href="/contact">Get in touch</Link>
                </Button>
                <button ref={openRef} onClick={() => setOpen(true)} aria-label="Open menu" aria-controls="site-menu" aria-expanded={open} className="ml-auto grid size-11 place-items-center text-white outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] md:hidden">
                    <List className="size-6" />
                </button>
                {scrolled && <ScrollProgress />}
            </nav>

            {open && (
                <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent className="fixed inset-0 z-60 flex flex-col items-center justify-center gap-8 overscroll-contain bg-[#0a0a0a]/95 md:hidden">
                    <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-4 top-5 grid size-11 place-items-center text-white outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
                        <X className="size-6" />
                    </button>
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={pathname === n.href ? "page" : undefined} className={`py-1 font-heading text-3xl outline-none focus-visible:ring-2 focus-visible:ring-(--brand) focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] ${pathname === n.href ? "text-(--brand)" : "text-white"}`}>
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
