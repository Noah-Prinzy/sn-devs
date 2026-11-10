"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { glideTo, useScrollAnchors } from "@/components/use-scroll-anchors";
import { ScrollHint } from "@/components/scroll-hint";
import s from "./portal-intro.module.css";

// The About opener. Scrolling walks a camera into a lit hall (portal-before.jpg): a spark opens into a
// ring, Home and Services float as glass bubbles either side of it, the camera flies
// through, and "About us" waits on the far side (portal-after.jpg) as the way into the page.
// Both photos are colour-graded to the brand green; regrade any replacement the same way.
//
// It is real 3D with no library: every ring, particle and star has a position in space and
// is projected through one camera, and the two bubbles use CSS 3D with the same camera.

// ---- things to tweak ----
const COLOR = [74, 222, 128]; // ring colour, r,g,b (the brand green)
const HOT = [226, 255, 238]; // the ring's white-hot core
const PARTICLES = 380; // most sparks alive at once; lower for weaker devices
const STARS = 170; // dots drifting on the far side
const TRAIL = 0.3; // how fast old frames fade; smaller = longer motion blur
// Depths along the aisle, in focal lengths (one focal length = one screen height).
const Z_BUBBLES = 3.3, Z_PORTAL = 4, Z_WORD = 6.5;
const TRAVEL = Z_WORD - 1; // the camera stops one focal length short of the words: life size
// How quickly the drawn progress catches up with the real scroll (per second).
const FOLLOW = 10;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const smooth = (t: number) => t * t * (3 - 2 * t);
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
// Layered sines: cheap turbulence for the ring's edge.
const turb = (angle: number, time: number) =>
    Math.sin(angle * 3 + time * 2.1 + 1) * 0.45 + Math.sin(angle * 7 - time * 3.7 + 2) * 0.3 +
    Math.sin(angle * 13 + time * 5.3 + 3) * 0.15 + Math.sin(angle * 23 - time * 8 + 5) * 0.1;

type Spark = { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; decay: number; size: number };

export function PortalIntro({ targetId }: { targetId: string }) {
    const stageRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const stage = stageRef.current, canvas = canvasRef.current, ctx = canvas?.getContext("2d");
        if (!stage || !canvas || !ctx) return;
        const q = (sel: string) => stage.querySelector<HTMLElement>(sel)!;
        const frame = q(`.${s.frame}`), aisle = q(`.${s.aisle}`), space = q(`.${s.space}`), world = q(`.${s.world}`);
        const beyond = q(`.${s.beyond}`), far = q(`.${s.far}`), wordWrap = q(`.${s.wordWrap}`), link = q(`.${s.link}`), enter = q(`.${s.enter}`), hint = q(`.${s.hint}`);
        const bubbles = [...stage.querySelectorAll<HTMLElement>(`.${s.bubble}`)];
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Sizes in CSS px. f is the focal length; everything in the world is measured against it.
        let W = 1, H = 1, f = 1, ringR = 1;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = frame.clientWidth; H = frame.clientHeight; f = H;
            canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // narrower on phones so the ring still fits across the screen
            ringR = Math.min(0.68 * H, 0.55 * W);
            space.style.perspective = `${f}px`;
            // Bubbles sit left and right of the ring; on a tall phone screen there is no room
            // beside it, so they sit above and below instead.
            const tall = W < H * 0.8;
            const d = tall ? 0.5 * W : Math.min(0.95 * H, 0.34 * W), off = tall ? 0.42 * H : Math.min(1.45 * H, 0.62 * W);
            world.style.setProperty("--d", `${d}px`);
            bubbles.forEach((el, i) => {
                const side = i ? 1 : -1;
                el.style.width = `${d}px`;
                el.style.transform = `translate(-50%,-50%) translate3d(${tall ? 0 : side * off}px,${tall ? side * off : 0}px,${f - Z_BUBBLES * f}px)`;
            });
        };

        const sparks: Spark[] = [];
        // Stars live on the far side, in a wide tube around the path (kept off the axis so the words stay clear).
        const stars = Array.from({ length: STARS }, () => {
            const a = Math.random() * Math.PI * 2, r = 0.35 + Math.random() * 1.5;
            return { x: Math.cos(a) * r, y: Math.sin(a) * r, z: Z_PORTAL + 0.2 + Math.random() * (Z_WORD + 1.5 - Z_PORTAL), tw: Math.random() * 6 };
        });

        const target = () => {
            const room = stage.offsetHeight - window.innerHeight;
            return room > 0 ? clamp(-stage.getBoundingClientRect().top / room) : 1;
        };

        const draw = (p: number, time: number, dt: number) => {
            const cx = W / 2, cy = H / 2, corner = Math.hypot(W, H) / 2;
            // a steady walk with one smooth rush through the ring
            const cam = TRAVEL * f * (0.25 * p + 0.75 * smooth(seg(p, 0.35, 0.9)));
            const dPortal = Z_PORTAL * f - cam;
            const open = out(seg(p, 0.05, 0.4));
            const passed = dPortal < 0.03 * f;
            const R = passed ? Infinity : (ringR * open * f) / dPortal; // the ring's radius on screen
            const through = R > corner * 1.05; // the ring has swept past every corner

            // ---- DOM layers ----
            aisle.style.transform = `scale(${1.12 + 0.55 * clamp(cam / (Z_PORTAL * f))})`;
            aisle.style.visibility = through ? "hidden" : "visible";
            world.style.transform = `translate3d(0,0,${cam}px)`;
            const bubblesIn = seg(Z_BUBBLES * f - cam, 0.3 * f, 0.75 * f); // they fade as they sweep past the camera
            bubbles.forEach((el) => {
                el.style.opacity = String(bubblesIn);
                el.style.visibility = bubblesIn > 0 ? "visible" : "hidden";
            });
            const clip = through ? "none" : `circle(${Math.max(0, R - 1).toFixed(1)}px at 50% 50%)`;
            beyond.style.clipPath = wordWrap.style.clipPath = clip;
            beyond.style.visibility = wordWrap.style.visibility = R > 1 ? "visible" : "hidden";
            far.style.transform = `scale(${(1.02 + 0.16 * clamp(cam / (TRAVEL * f))).toFixed(4)})`; // the far room drifts closer too
            link.style.transform = `scale(${(f / (Z_WORD * f - cam)).toFixed(4)})`;
            link.style.opacity = String(seg(p, 0.12, 0.34));
            link.style.pointerEvents = p > 0.9 ? "auto" : "none";
            enter.style.opacity = String(seg(p, 0.9, 1));
            hint.style.opacity = String(1 - seg(p, 0, 0.06));

            // ---- canvas: fade the last frame instead of clearing it (motion blur) ----
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = `rgba(0,0,0,${still ? 1 : TRAIL})`;
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";

            // stars on the far side, seen only through the ring until the camera is through it
            for (const st of stars) {
                const d = st.z * f - cam;
                if (d < 0.05 * f) continue;
                const k = f / d, x = cx + st.x * f * k, y = cy + st.y * f * k;
                if (x < 0 || x > W || y < 0 || y > H) continue;
                if (!through && Math.hypot(x - cx, y - cy) > R - 2) continue;
                const a = clamp(1.5 - d / (2.6 * f)) * (0.55 + 0.45 * Math.sin(time * 2 + st.tw));
                ctx.fillStyle = rgba(HOT, a * 0.8);
                ctx.beginPath(); ctx.arc(x, y, Math.min(4, 0.9 * k + 0.4), 0, Math.PI * 2); ctx.fill();
            }

            if (!passed && open === 0) {
                // the spark the ring opens from
                const r = 2.5 + Math.sin(time * 5) * 0.8, a = 0.5 + 0.5 * seg(p, 0, 0.05);
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 6);
                g.addColorStop(0, rgba(HOT, a)); g.addColorStop(0.25, rgba(COLOR, 0.6 * a)); g.addColorStop(1, rgba(COLOR, 0));
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(cx, cy, r * 6, 0, Math.PI * 2); ctx.fill();
            } else if (!passed && R < corner * 1.7) {
                // depth inside the ring: a glow hugging the rim and rings rushing toward the walker
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
                g.addColorStop(0, rgba(COLOR, 0)); g.addColorStop(0.55, rgba(COLOR, 0.05 * open));
                g.addColorStop(0.92, rgba(COLOR, 0.26 * open)); g.addColorStop(1, rgba(COLOR, 0));
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
                for (let i = 0; i < 5; i++) {
                    const ph = (time * 0.45 + i / 5) % 1;
                    ctx.strokeStyle = rgba(COLOR, 0.12 * open * ph);
                    ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(cx, cy, R * Math.pow(ph, 2.2), 0, Math.PI * 2); ctx.stroke();
                }
                // the ring itself: wide glow, core, white-hot centre, all with a turbulent edge
                const amp = R * (0.035 + 0.05 * open);
                const passes = [
                    { width: R * 0.22, alpha: 0.1, col: COLOR },
                    { width: R * 0.07, alpha: 0.55, col: COLOR },
                    { width: R * 0.02, alpha: 0.95, col: HOT },
                ];
                for (const ps of passes) {
                    ctx.strokeStyle = rgba(ps.col, ps.alpha);
                    ctx.lineWidth = Math.max(1, ps.width);
                    ctx.lineJoin = "round";
                    ctx.beginPath();
                    for (let i = 0; i <= 180; i++) {
                        const a = (i / 180) * Math.PI * 2, r = R + turb(a, time) * amp;
                        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
                        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
                    }
                    ctx.closePath(); ctx.stroke();
                }
                // sparks are born on the ring and thrown back up the aisle, toward the walker
                if (!still && open > 0.05) {
                    const n = Math.round((3 + 9 * open) * dt * 60);
                    for (let i = 0; i < n; i++) {
                        const a = Math.random() * Math.PI * 2, r = ringR * open * (0.94 + Math.random() * 0.12);
                        const drift = 20 + Math.random() * 90, spin = (Math.random() - 0.5) * 60;
                        sparks.push({
                            x: Math.cos(a) * r, y: Math.sin(a) * r, z: Z_PORTAL * f,
                            vx: Math.cos(a) * drift - Math.sin(a) * spin, vy: Math.sin(a) * drift + Math.cos(a) * spin,
                            vz: -(0.15 + Math.random() * 0.8) * f, life: 1, decay: 0.35 + Math.random() * 0.5, size: 0.8 + Math.random() * 2.2,
                        });
                    }
                    if (sparks.length > PARTICLES) sparks.splice(0, sparks.length - PARTICLES);
                }
            }
            for (let i = sparks.length - 1; i >= 0; i--) {
                const sp = sparks[i];
                sp.x += sp.vx * dt; sp.y += sp.vy * dt; sp.z += sp.vz * dt; sp.life -= sp.decay * dt;
                const d = sp.z - cam;
                if (sp.life <= 0 || d < 0.04 * f) { sparks.splice(i, 1); continue; }
                const k = f / d, x = cx + sp.x * k, y = cy + sp.y * k, r = Math.min(16, sp.size * k);
                ctx.fillStyle = rgba(COLOR, sp.life * 0.9);
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = rgba(HOT, sp.life * 0.6);
                ctx.beginPath(); ctx.arc(x, y, r * 0.4, 0, Math.PI * 2); ctx.fill();
            }

            // a soft flash as the ring passes the camera
            const flash = clamp(1 - Math.abs(dPortal) / (0.45 * f));
            if (flash > 0 && !still) {
                ctx.fillStyle = rgba(HOT, 0.1 * flash * flash); // builds up over a few frames through the trail
                ctx.fillRect(0, 0, W, H);
            }
        };

        // One loop: it eases the drawn progress toward the scroll position and keeps the ring
        // alive between scrolls. It only runs while the stage is on screen.
        let cur = target(), raf = 0, last = 0, visible = false;
        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - (last || now)) / 1000);
            last = now;
            const goal = target();
            cur = still ? goal : cur + (goal - cur) * (1 - Math.exp(-FOLLOW * dt));
            if (Math.abs(goal - cur) < 0.0002) cur = goal;
            draw(cur, still ? 0 : now / 1000, dt);
            raf = visible && !still ? requestAnimationFrame(tick) : 0;
            if (!raf) last = 0;
        };
        const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
        const onResize = () => { resize(); wake(); };
        const seen = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); });
        resize(); wake();
        seen.observe(stage);
        const onScroll = () => { if (visible) wake(); };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            seen.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Anchored like Home: the flight is one glide, it rests on the far side, and the next
    // gesture (or a click on the words) lands on the page itself.
    const ends = () => {
        const stage = stageRef.current!, top = stage.offsetTop, bottom = top + stage.offsetHeight;
        return [top, bottom - window.innerHeight, bottom];
    };
    useScrollAnchors(() => { const [top, far, page] = ends(); return [{ y: top, glide: true }, { y: far }, { y: page }]; });
    const stepIn = (e: React.MouseEvent) => { if (glideTo(ends()[2])) e.preventDefault(); };
    // Tabbing to the words from the start of the aisle flies there, so the focused link is never hidden.
    const reveal = () => { if (window.scrollY < ends()[1] - 2) glideTo(ends()[1]); };

    return (
        <section ref={stageRef} className={s.stage} aria-label="Portal into the About page">
            <div className={s.frame}>
                <div className={s.aisle}>
                    <Image src="/assets/about/portal-before.jpg" alt="" fill priority sizes="100vw" />
                </div>
                <div className={s.shade} />
                <div className={s.beyond}>
                    <div className={s.far}><Image src="/assets/about/portal-after.jpg" alt="" fill sizes="100vw" /></div>
                    <div className={s.veil} />
                </div>

                <div className={s.space}>
                    <div className={s.world}>
                        <Link href="/" className={s.bubble}>
                            <span className={s.bob}>
                                <span className={s.orb}><Image src="/assets/about/portal-home.webp" alt="" fill sizes="30vw" /></span>
                                <span className={s.tag}>Home</span>
                            </span>
                        </Link>
                        <Link href="/services" className={s.bubble}>
                            <span className={s.bob}>
                                <span className={s.orb}><Image src="/assets/about/portal-services.webp" alt="" fill sizes="30vw" /></span>
                                <span className={s.tag}>Services</span>
                            </span>
                        </Link>
                    </div>
                </div>

                <canvas ref={canvasRef} className={s.fx} aria-hidden="true" />

                <div className={s.wordWrap}>
                    <a href={`#${targetId}`} className={s.link} onClick={stepIn} onFocus={reveal}>
                        <span className={s.word}>About us</span>
                        <span className={s.enter}>Step inside <ArrowDown /></span>
                    </a>
                </div>

                <div className={s.hint}><ScrollHint /></div>
            </div>
        </section>
    );
}
