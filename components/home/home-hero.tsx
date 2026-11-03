"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/DecryptedText";
import Magnet from "@/components/Magnet";
import Noise from "@/components/Noise";
import { lenisRef } from "@/components/lenis-scroll";
import s from "./home-hero.module.css";

const NAV = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

// Placeholders until Noah & Shaun's own photos arrive.
const SHAUN = "/assets/home/people/shaun-placeholder.webp";
const NOAH = "/assets/home/people/noah-placeholder.webp";

// Welcome heading, split into words so each one settles in on scroll.
const HEADING = [
    ..."Hey, we're Shaun & Noah.".split(" ").map((w) => ({ w, em: false })),
    ..."Glad you're here.".split(" ").map((w) => ({ w, em: true })),
];
const GLYPHS = "01<>/{}[]=+*#$";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const inOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2);

// Final logo spot in the nav (px from the top-left corner) and its size.
const LOGO_X = 28, LOGO_Y = 18, LOGO_W = 48;
// How quickly the drawn progress catches up with the real scroll (per second).
const FOLLOW = 14;
// One gesture glides between the two sections: travel time (s) and quiet time
// after landing (ms) that swallows trackpad inertia.
const GLIDE = 2.4, SETTLE_MS = 700;
const DOWN = ["ArrowDown", "PageDown", "End", " "], UP = ["ArrowUp", "PageUp", "Home"];

export function HomeHero() {
    const stageRef = useRef<HTMLElement>(null);
    const [arrived, setArrived] = useState(false);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const q = <T extends HTMLElement>(sel: string) => stage.querySelector<T>(sel)!;
        const all = (sel: string) => [...stage.querySelectorAll<HTMLElement>(sel)];
        const frame = q(`.${s.frame}`), pl = q(`.${s.pillarL}`), pr = q(`.${s.pillarR}`);
        const shaun = q(`.${s.frame} > .${s.shaun}`), noah = q(`.${s.frame} > .${s.noah}`);
        const brand = q(`.${s.brand}`), slot = q(`.${s.slot}`), video = q(`.${s.video}`), scan = q(`.${s.scan}`);
        const welcome = q(`.${s.welcome}`), duo = q(`.${s.duo}`), hint = q(`.${s.hint}`);
        const fly = q<HTMLImageElement>(`.${s.flyLogo}`), nav = q(`.${s.nav}`);
        const clip = q<HTMLVideoElement>(`.${s.video} video`);
        const navItems = all(`.${s.navItem}`), words = all(`.${s.word}`), rest = all(`.${s.after}`);
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // logo start = the empty slot in the centre, relative to the pinned frame
        let start = { x: 0, y: 0, w: 1 };
        const measure = () => {
            const a = slot.getBoundingClientRect(), b = frame.getBoundingClientRect();
            start = { x: a.left - b.left, y: a.top - b.top, w: a.width };
            fly.style.width = `${start.w}px`;
        };
        const target = () => clamp(-stage.getBoundingClientRect().top / (stage.offsetHeight - window.innerHeight));

        let landed = false;
        const draw = (p: number) => {
            // 1. the black centre expands, pushing the pillars and both of us out
            const e = inOut(seg(p, 0.04, 0.34));
            pl.style.transform = `translate3d(${-100 * e}%,0,0)`;
            pr.style.transform = `translate3d(${100 * e}%,0,0)`;
            shaun.style.transform = `translate3d(${-30 * e}vw,0,0)`;
            noah.style.transform = `translate3d(${30 * e}vw,0,0)`;
            shaun.style.opacity = noah.style.opacity = String(1 - seg(p, 0.2, 0.34));
            const b = out(seg(p, 0.04, 0.16));
            brand.style.opacity = String(1 - b);
            brand.style.transform = `translate3d(0,${-24 * b}px,0) scale(${1 - 0.04 * b})`;
            hint.style.opacity = String(1 - seg(p, 0, 0.06));

            // logo floats up (slight arc) and shrinks into the top-left nav slot
            const l = inOut(seg(p, 0.04, 0.28)), k = 1 + (LOGO_W / start.w - 1) * l;
            const x = start.x + (LOGO_X - start.x) * l;
            const y = start.y + (LOGO_Y - start.y) * l - Math.sin(l * Math.PI) * 60;
            fly.style.transform = `translate3d(${x}px,${y}px,0) scale(${k})`;

            // nav rolls out from the logo, links settle one after another
            const r = out(seg(p, 0.26, 0.4));
            nav.style.clipPath = `inset(0 ${100 - 100 * r}% 0 0)`;
            navItems.forEach((el, i) => {
                const t = out(seg(p, 0.27 + i * 0.022, 0.35 + i * 0.022));
                el.style.opacity = String(t);
                el.style.transform = `translate3d(${(1 - t) * -18}px,0,0)`;
            });

            // 2. the video materialises bottom → top behind a glowing scan line
            const v = inOut(seg(p, 0.28, 0.58));
            video.style.clipPath = `inset(${100 - 100 * v}% 0 0 0)`;
            scan.style.transform = `translate3d(0,${(1 - v) * 100}vh,0)`;
            scan.style.opacity = String(v > 0 && v < 1 ? 1 : 0);
            if (v > 0 && clip.paused) clip.play().catch(() => {});
            else if (v === 0 && !clip.paused) clip.pause();

            // 3. both of us on the right, the welcome on the left, word by word
            const w = out(seg(p, 0.6, 0.82));
            duo.style.opacity = String(w);
            duo.style.transform = `translate3d(${(1 - w) * 24}vw,0,0) scale(${0.96 + 0.04 * w})`;
            welcome.style.opacity = String(seg(p, 0.64, 0.68));
            welcome.style.pointerEvents = p > 0.78 ? "auto" : "none";
            words.forEach((el, i) => {
                const t = out(seg(p, 0.65 + i * 0.012, 0.75 + i * 0.012));
                el.style.opacity = String(t);
                el.style.transform = `translate3d(0,${(1 - t) * 0.5}em,0)`;
                el.style.filter = t < 1 ? `blur(${(1 - t) * 8}px)` : "";
            });
            rest.forEach((el, i) => {
                const t = out(seg(p, 0.74 + i * 0.03, 0.86 + i * 0.03));
                el.style.opacity = String(t);
                el.style.transform = `translate3d(0,${(1 - t) * 24}px,0)`;
            });
            if (p > 0.66 !== landed) { landed = p > 0.66; setArrived(landed); }
        };

        // One loop eases the drawn progress toward the scroll position, so
        // scrollbar drags, keys and touch flicks glide like the wheel does.
        let cur = target(), raf = 0, last = 0;
        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - (last || now)) / 1000);
            last = now;
            const goal = target();
            cur = still ? goal : cur + (goal - cur) * (1 - Math.exp(-FOLLOW * dt));
            if (Math.abs(goal - cur) < 0.0002) cur = goal;
            draw(cur);
            raf = cur === goal ? 0 : requestAnimationFrame(tick);
            if (!raf) last = 0;
        };
        const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
        const onResize = () => { measure(); draw(cur); };
        measure(); draw(cur);
        fly.style.visibility = "visible";
        window.addEventListener("scroll", wake, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", wake);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Anchored scroll: the stage has two resting points, its top (section 1)
    // and its end (section 2). Wheel, keys and swipes glide from one to the
    // other; a scrollbar drag that stops halfway settles on the nearer one.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const anchors = () => [stage.offsetTop, stage.offsetTop + stage.offsetHeight - window.innerHeight];
        let busy = false, quietUntil = 0, idle = 0, touchY: number | null = null;

        const go = (dir: number) => {
            const lenis = lenisRef.current;
            const [top, end] = anchors(), to = dir > 0 ? end : top;
            if (!lenis || Math.abs(window.scrollY - to) < 2) return;
            busy = true;
            lenis.scrollTo(to, {
                duration: GLIDE, easing: inOut, lock: true, force: true,
                onComplete: () => { busy = false; quietUntil = performance.now() + SETTLE_MS; },
            });
        };
        // true = this gesture belongs to the anchors, so the default scroll is cancelled
        const claim = (dir: number) => {
            if (busy || performance.now() < quietUntil) return true;
            const [top, end] = anchors(), y = window.scrollY;
            if (y > end + 2) return false; // below the stage: ordinary scrolling
            if ((dir > 0 && y >= end - 2) || (dir < 0 && y <= top + 2)) return true; // already resting there
            go(dir);
            return true;
        };
        const onStage = () => window.scrollY <= anchors()[1] + 2;

        const stop = (e: Event) => { e.preventDefault(); e.stopImmediatePropagation(); };
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return;
            if (claim(Math.sign(e.deltaY))) stop(e);
        };
        const onKey = (e: KeyboardEvent) => {
            const el = e.target as HTMLElement;
            if (e.altKey || e.ctrlKey || e.metaKey || el.closest("input, textarea, select, [contenteditable]")) return;
            const dir = DOWN.includes(e.key) ? (e.key === " " && e.shiftKey ? -1 : 1) : UP.includes(e.key) ? -1 : 0;
            if (dir && claim(dir)) stop(e);
        };
        const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
        const onTouchMove = (e: TouchEvent) => {
            if (touchY === null) return;
            const dy = touchY - e.touches[0].clientY;
            if (busy || Math.abs(dy) > 24) {
                if (claim(Math.sign(dy) || 1)) stop(e);
                touchY = null;
            } else if (onStage()) stop(e);
        };
        const onTouchEnd = () => { touchY = null; };
        // scrollbar drags can't be intercepted: settle once they stop mid-way
        const onScroll = () => {
            clearTimeout(idle);
            if (busy) return;
            idle = window.setTimeout(() => {
                const [top, end] = anchors(), y = window.scrollY;
                if (busy || y <= top + 2 || y >= end - 2) return;
                go((y - top) / (end - top) < 0.5 ? -1 : 1);
            }, 220);
        };

        const opts = { passive: false, capture: true } as const;
        window.addEventListener("wheel", onWheel, opts);
        window.addEventListener("keydown", onKey, opts);
        window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
        window.addEventListener("touchmove", onTouchMove, opts);
        window.addEventListener("touchend", onTouchEnd, { capture: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(idle);
            window.removeEventListener("wheel", onWheel, opts);
            window.removeEventListener("keydown", onKey, opts);
            window.removeEventListener("touchstart", onTouchStart, { capture: true });
            window.removeEventListener("touchmove", onTouchMove, opts);
            window.removeEventListener("touchend", onTouchEnd, { capture: true });
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <section ref={stageRef} className={s.stage} aria-label="Welcome to S&N Devs">
            {/* eslint-disable-next-line @next/next/no-img-element -- animated SVG, transformed every frame */}
            <img className={s.flyLogo} src="/logo.svg" alt="S&N Devs" />
            <nav className={s.nav} aria-label="Main">
                <ul className={s.navLinks}>
                    {NAV.map((n) => (
                        <li key={n.href} className={s.navItem}>
                            <Link href={n.href}>
                                <DecryptedText text={n.label} animateOn="hover" characters={GLYPHS} speed={40} maxIterations={8} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <Button asChild size="sm" className={s.navItem}><Link href="/contact">Get in touch</Link></Button>
            </nav>

            <div className={s.frame}>
                <div className={s.video}>
                    <video muted loop playsInline preload="auto" poster="/assets/home/video/hero-code-poster.jpg">
                        <source src="/assets/home/video/hero-code-720.mp4" type="video/mp4" media="(max-width: 767px)" />
                        <source src="/assets/home/video/hero-code-1440.webm" type="video/webm" />
                        <source src="/assets/home/video/hero-code-1440.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className={s.scan} aria-hidden="true" />

                <div className={`${s.pillar} ${s.pillarL}`} />
                <div className={`${s.pillar} ${s.pillarR}`} />
                <figure className={`${s.person} ${s.shaun}`}><Image src={SHAUN} alt="Shaun" fill priority sizes="35vw" /></figure>
                <figure className={`${s.person} ${s.noah}`}><Image src={NOAH} alt="Noah" fill priority sizes="35vw" /></figure>

                <div className={s.brand}>
                    <div className={s.brandInner}>
                        <div className={s.slot} />
                        <h1 className={s.names}>
                            <span><b>S</b>haun</span><span className={s.amp}>&amp;</span><span><b>N</b>oah</span>
                        </h1>
                        <div className={s.devs}>
                            <DecryptedText text="Devs" animateOn="view" sequential characters={GLYPHS} speed={70} />
                        </div>
                    </div>
                </div>

                <div className={s.welcome}>
                    <span className={s.kicker}>
                        <DecryptedText key={String(arrived)} text="Welcome in" animateOn="view" sequential characters={GLYPHS} speed={45} />
                    </span>
                    <h2 aria-label="Hey, we're Shaun & Noah. Glad you're here.">
                        {HEADING.map(({ w, em }, i) => (
                            <span key={i} aria-hidden="true" className={`${s.word}${em ? ` ${s.em}` : ""}`}>{w}</span>
                        ))}
                    </h2>
                    <p className={s.after}>
                        We&apos;re two developers who design and build websites that feel as good as they look, from the
                        first sketch to launch day and beyond. Have a look around: see what we offer, get to know us a
                        little, and if you have an idea, a question or a project in mind, reach out. We&apos;d love to
                        hear from you.
                    </p>
                    <div className={`${s.cta} ${s.after}`}>
                        <Magnet padding={40} magnetStrength={4}><Button asChild><Link href="/services">Explore services</Link></Button></Magnet>
                        <Magnet padding={40} magnetStrength={4}><Button asChild variant="outline"><Link href="/about">About us</Link></Button></Magnet>
                        <Magnet padding={40} magnetStrength={4}><Button asChild variant="outline"><Link href="/contact">Say hello</Link></Button></Magnet>
                    </div>
                </div>
                <div className={s.duo} aria-hidden="true">
                    <figure className={s.person}><Image src={SHAUN} alt="" fill sizes="20vw" /></figure>
                    <figure className={s.person}><Image src={NOAH} alt="" fill sizes="20vw" /></figure>
                </div>

                <Noise opacity={0.07} fps={18} contrast={0.5} scanlines={0.05} zIndex={6} />
                <div className={s.hint}>Scroll</div>
            </div>
        </section>
    );
}
