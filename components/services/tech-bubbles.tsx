"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";
import { AppWindow, Clapperboard, Globe, LayoutTemplate, Megaphone, Presentation, RefreshCw, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";

// Glass bubbles drifting in the hero's side gutters, each holding a tool we build with or a
// service we sell. Tap one and it pops and its icon drops away; when the title settles they all
// pop and the icons crumble into dust that rises as the horizon comes in. Bubbles are light DOM
// (so only they take pointer events); burst rings and dust share one canvas.

// Simple Icons paths (CC0), all on a 24×24 grid.
const TECH: [string, string][] = [
    ["React", "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"],
    ["Next.js", "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"],
    ["TypeScript", "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"],
    ["JavaScript", "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"],
    ["HTML5", "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"],
    ["CSS", "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"],
    ["Tailwind CSS", "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"],
    ["Node.js", "M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.145-.139.241v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247zm7.101-10.007c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.115.129.199.247.199h1.141a.26.26 0 0 0 .186-.081.264.264 0 0 0 .067-.196c-.177-2.098-1.571-3.076-4.388-3.076-2.508 0-4.004 1.058-4.004 2.833 0 1.925 1.488 2.457 3.895 2.695 2.88.282 3.103.703 3.103 1.269 0 .983-.789 1.402-2.642 1.402-2.327 0-2.839-.584-3.011-1.742a.255.255 0 0 0-.253-.215h-1.137a.252.252 0 0 0-.254.253c0 1.482.806 3.248 4.655 3.248 2.788 0 4.386-1.097 4.386-3.014z"],
    ["Figma", "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"],
    ["Vercel", "M24 22.525H0l12-21.05 12 21.05z"],
    ["Git", "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"],
    ["Python", "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"],
];
// One per service in data/services.ts, in the same order.
const SERVICES: LucideIcon[] = [Rocket, Globe, AppWindow, LayoutTemplate, ShieldCheck, RefreshCw, Clapperboard, Presentation, Megaphone];
const ICONS: (string | LucideIcon)[] = [...TECH.map(([, d]) => d), ...SERVICES];

function Glyph({ icon }: { icon: number }) {
    const g = ICONS[icon];
    if (typeof g === "string") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#fff" className="size-[46%]">
                <path d={g} />
            </svg>
        );
    }
    const Icon = g;
    return <Icon color="#fff" strokeWidth={1.75} className="size-[46%]" />;
}

const SHELL: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "9999px",
    border: "1px solid color-mix(in srgb, var(--brand) 45%, transparent)",
    background:
        "radial-gradient(circle at 32% 26%, rgba(255,255,255,.38) 0 6%, rgba(255,255,255,.1) 18%, rgba(255,255,255,.03) 55%, color-mix(in srgb, var(--brand) 10%, transparent) 100%)",
    boxShadow:
        "inset 0 0 14px color-mix(in srgb, var(--brand) 22%, transparent), inset 0 -8px 14px rgba(255,255,255,.05), 0 10px 28px rgba(0,0,0,.35)",
};

// Icon silhouettes (u,v pairs in 0–1) the dust is cut from, rasterised once per icon.
const MASKS = new Map<number, Float32Array>();
const MASK = 24;

const SETTLE = 0.5; // the title settles and the horizon starts to come in
const GRAVITY = 1700, BUOYANCY = 480;
const span = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Zone = { l: number; r: number; t: number; b: number };
type Bubble = {
    state: "idle" | "rise" | "float" | "fall";
    zone: number;
    x: number; y: number; vx: number; vy: number; r: number;
    heading: number; speed: number; appear: number;
    popAt: number; popDue: number; rot: number; spin: number;
    dissolve: boolean; dissolveAt: number; crumbled: boolean; fade: number;
    respawnAt: number;
};
type Dust = { x: number; y: number; vx: number; vy: number; size: number; green: boolean; born: number; life: number; h0: number };
type Burst = { x: number; y: number; r: number; born: number };

export function TechBubbles({ progress }: { progress: MotionValue<number> }) {
    const reduce = useReducedMotion();
    const root = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const slots = useRef<(HTMLDivElement | null)[]>([]);
    // The icon in each slot. The ref is the simulation's copy; the state re-renders the slot.
    const shown = useRef<number[]>([]);
    const [icons, setIcons] = useState<number[]>([]);
    const api = useRef<{ pop: (i: number) => void } | null>(null);

    useEffect(() => {
        if (reduce) return;
        const el = root.current!, cv = canvas.current!, ctx = cv.getContext("2d")!;
        const stage = el.parentElement!;
        const brand = getComputedStyle(el).getPropertyValue("--brand").trim() || "#4ade80";
        let W = 0, H = 0, mobile: boolean | null = null, zones: Zone[] = [], bubbles: Bubble[] = [];
        const dust: Dust[] = [], bursts: Burst[] = [];
        let settled = progress.get() >= SETTLE;
        let raf = 0, last = 0, onScreen = true;

        // A random icon that isn't already floating.
        const pickIcon = (not = -1) => {
            const free = ICONS.map((_, i) => i).filter((i) => i !== not && !shown.current.includes(i));
            return free[Math.floor(Math.random() * free.length)] ?? 0;
        };
        // Give a slot a fresh icon and bring a bubble back for it at `at`.
        const schedule = (i: number, at: number) => {
            const old = shown.current[i];
            shown.current[i] = -1;
            shown.current[i] = pickIcon(old);
            setIcons([...shown.current]);
            bubbles[i].respawnAt = at;
        };

        // Four side zones: above and below the title band, in the left and right gutters.
        const layout = () => {
            W = stage.clientWidth;
            H = stage.clientHeight;
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const m = W < 768;
            const title = stage.querySelector("h1");
            const pad = m ? 20 : 28;
            const bandT = title ? title.offsetTop - pad : H * 0.38;
            const bandB = title ? title.offsetTop + title.offsetHeight + pad : H * 0.62;
            const gw = m ? W * 0.34 : Math.min(W * 0.24, 380), e = m ? 4 : 16, top = m ? 92 : 100, bot = H - (m ? 16 : 24);
            zones = [
                { l: e, r: gw, t: top, b: bandT },
                { l: W - gw, r: W - e, t: top, b: bandT },
                { l: e, r: gw, t: bandB, b: bot },
                { l: W - gw, r: W - e, t: bandB, b: bot },
            ];
            if (m !== mobile) {
                // Phones get fewer, smaller bubbles; switching sizes starts over.
                mobile = m;
                const n = (m ? 3 : 4) * 4, t = performance.now();
                shown.current = [];
                for (let i = 0; i < n; i++) shown.current.push(pickIcon());
                setIcons([...shown.current]);
                bubbles = Array.from({ length: n }, (_, i): Bubble => ({
                    state: "idle", zone: i % 4, x: 0, y: 0, vx: 0, vy: 0, r: 0, heading: 0, speed: 0, appear: 0,
                    popAt: 0, popDue: 0, rot: 0, spin: 0, dissolve: false, dissolveAt: 0, crumbled: false, fade: 1,
                    respawnAt: settled ? Infinity : t + 150 + i * 110,
                }));
            } else {
                for (const b of bubbles) if (b.state === "rise" || b.state === "float") keepInZone(b);
            }
        };
        const keepInZone = (b: Bubble) => {
            const z = zones[b.zone];
            b.r = Math.max(8, Math.min(b.r, (z.r - z.l) / 2 - 2, (z.b - z.t) / 2 - 2));
            b.x = Math.min(z.r - b.r, Math.max(z.l + b.r, b.x));
            if (b.state === "float") b.y = Math.min(z.b - b.r, Math.max(z.t + b.r, b.y));
        };

        const spawn = (i: number, t: number) => {
            const b = bubbles[i], z = zones[b.zone], zw = z.r - z.l, zh = z.b - z.t;
            const [lo, hi] = mobile ? [12, 16] : [20, 30];
            const r = Math.min(lo + Math.random() * (hi - lo), zw / 2 - 2, zh / 2 - 2);
            if (r < 9) { b.respawnAt = t + 1000; return; } // no room on this screen, try again later
            const low = b.zone >= 2;
            Object.assign(b, {
                state: "rise", r, x: z.l + r + Math.random() * (zw - 2 * r),
                // Lower bubbles float up from under the stage; upper ones swell up off the band's edge.
                y: low ? H + r + 8 : z.b - r,
                vx: (Math.random() - 0.5) * 20, vy: low ? -(120 + Math.random() * 60) : -30,
                heading: -Math.PI / 2 + (Math.random() - 0.5) * 2, speed: (mobile ? 10 : 14) + Math.random() * 12,
                appear: low ? 1 : 0, popDue: 0, rot: 0, dissolve: false, crumbled: false, fade: 1,
            });
            const s = slots.current[i];
            if (s) {
                s.style.width = s.style.height = `${2 * r}px`;
                s.style.visibility = "visible";
                s.style.pointerEvents = "auto";
            }
        };

        const pop = (i: number, dissolve: boolean, t: number) => {
            const b = bubbles[i];
            if (!b || (b.state !== "rise" && b.state !== "float")) return;
            const k = 0.4 + 0.6 * easeOut(b.appear);
            Object.assign(b, {
                state: "fall", popAt: t, popDue: 0, vy: -140 - Math.random() * 60, vx: b.vx * 0.4 + (Math.random() - 0.5) * 90,
                spin: (Math.random() - 0.5) * 6, dissolve, dissolveAt: t + 120 + Math.random() * 220,
            });
            bursts.push({ x: b.x, y: b.y, r: b.r * k, born: t });
            const s = slots.current[i];
            if (s) s.style.pointerEvents = "none";
        };
        const retire = (i: number, t: number) => {
            const b = bubbles[i];
            b.state = "idle";
            const s = slots.current[i];
            if (s) s.style.visibility = "hidden";
            if (settled) b.respawnAt = Infinity;
            else schedule(i, Math.max(b.popAt + 1000, t + 150));
        };

        // The title has settled: everything pops and crumbles. Scrolling back brings fresh bubbles.
        const settle = (t: number) => {
            settled = true;
            bubbles.forEach((b) => {
                b.respawnAt = Infinity;
                if (b.state === "rise" || b.state === "float") b.popDue = t + Math.random() * 180;
                else if (b.state === "fall" && !b.dissolve) { b.dissolve = true; b.dissolveAt = t + Math.random() * 120; }
            });
        };
        const unsettle = (t: number) => {
            settled = false;
            bubbles.forEach((b, i) => {
                b.popDue = 0;
                if (b.state === "idle") schedule(i, t + 100 + i * 90);
            });
        };

        // The icon breaks into square grains along its own silhouette.
        const crumble = (i: number, h: number, t: number) => {
            const b = bubbles[i], size = b.r * 2 * 0.46, cell = size / MASK;
            let pts = MASKS.get(shown.current[i]);
            if (!pts?.length) {
                pts = new Float32Array(160);
                for (let k = 0; k < 160; k += 2) {
                    const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * 0.45;
                    pts[k] = 0.5 + Math.cos(a) * d;
                    pts[k + 1] = 0.5 + Math.sin(a) * d;
                }
            }
            const step = Math.max(1, Math.round(pts.length / 2 / 120)) * 2;
            const c = Math.cos(b.rot), s = Math.sin(b.rot);
            for (let k = 0; k < pts.length; k += step) {
                const ox = (pts[k] - 0.5) * size, oy = (pts[k + 1] - 0.5) * size;
                dust.push({
                    x: b.x + ox * c - oy * s, y: b.y + ox * s + oy * c,
                    vx: b.vx * 0.3 + (Math.random() - 0.5) * 40, vy: b.vy * 0.35 + (Math.random() - 0.5) * 30,
                    size: Math.max(1.5, cell * 1.2) * (0.7 + Math.random() * 0.6), green: Math.random() < 0.15,
                    born: t, life: 1.4 + Math.random() * 1.2, h0: h,
                });
            }
            b.crumbled = true;
        };

        const tick = (t: number) => {
            raf = 0;
            const dt = Math.min(0.05, Math.max(0, (t - last) / 1000));
            last = t;
            const p = progress.get();
            if (!settled && p >= SETTLE) settle(t);
            else if (settled && p < SETTLE - 0.03) unsettle(t);
            const h = span(p, 0.5, 0.8);

            bubbles.forEach((b, i) => {
                if (b.state === "idle") {
                    if (!settled && t >= b.respawnAt) spawn(i, t);
                    return;
                }
                if (b.state === "fall") {
                    b.vy += GRAVITY * dt;
                    b.x += b.vx * dt;
                    b.y += b.vy * dt;
                    b.rot += b.spin * dt;
                    if (b.dissolve && !b.crumbled && t >= b.dissolveAt) crumble(i, h, t);
                    if (b.crumbled) b.fade -= dt / 0.22;
                    if (b.fade <= 0 || b.y - b.r > H + 10) retire(i, t);
                    return;
                }
                if (b.popDue && t >= b.popDue) return pop(i, true, t);
                b.appear = Math.min(1, b.appear + dt / 0.6);
                // Drift: ease the velocity toward a slowly wandering heading.
                b.heading += Math.sin(t / 1400 + i * 1.7) * 0.5 * dt;
                const k = 1 - Math.exp(-0.8 * dt);
                b.vx += (Math.cos(b.heading) * b.speed - b.vx) * k;
                if (b.state === "float") b.vy += (Math.sin(b.heading) * b.speed - b.vy) * k;
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                const z = zones[b.zone];
                if (b.x - b.r < z.l) { b.x = z.l + b.r; b.vx = Math.abs(b.vx); b.heading = Math.PI - b.heading; }
                if (b.x + b.r > z.r) { b.x = z.r - b.r; b.vx = -Math.abs(b.vx); b.heading = Math.PI - b.heading; }
                if (b.state === "rise") {
                    if (b.y + b.r <= z.b) b.state = "float";
                } else {
                    if (b.y - b.r < z.t) { b.y = z.t + b.r; b.vy = Math.abs(b.vy); b.heading = -b.heading; }
                    if (b.y + b.r > z.b) { b.y = z.b - b.r; b.vy = -Math.abs(b.vy); b.heading = -b.heading; }
                }
            });

            // Elastic circle-circle collisions, heavier bubbles shoved less.
            for (let i = 0; i < bubbles.length; i++) {
                const a = bubbles[i];
                if (a.state !== "float" && a.state !== "rise") continue;
                for (let j = i + 1; j < bubbles.length; j++) {
                    const b = bubbles[j];
                    if (b.state !== "float" && b.state !== "rise") continue;
                    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), min = a.r + b.r;
                    if (d >= min || d === 0) continue;
                    const nx = dx / d, ny = dy / d, ma = a.r * a.r, mb = b.r * b.r;
                    const push = (min - d) / (ma + mb);
                    a.x -= nx * push * mb; a.y -= ny * push * mb;
                    b.x += nx * push * ma; b.y += ny * push * ma;
                    const u = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
                    if (u >= 0) continue;
                    const J = (-2 * u) / (1 / ma + 1 / mb);
                    a.vx -= (J / ma) * nx; a.vy -= (J / ma) * ny;
                    b.vx += (J / mb) * nx; b.vy += (J / mb) * ny;
                    a.heading = Math.atan2(a.vy, a.vx);
                    b.heading = Math.atan2(b.vy, b.vx);
                }
            }

            bubbles.forEach((b, i) => {
                const s = slots.current[i];
                if (!s || b.state === "idle") return;
                s.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
                const shell = s.firstElementChild as HTMLElement, icon = s.lastElementChild as HTMLElement;
                if (b.state === "fall") {
                    const k = Math.min(1, (t - b.popAt) / 140);
                    shell.style.opacity = String(1 - k);
                    shell.style.transform = `scale(${1 + 0.35 * k})`;
                    icon.style.opacity = String(Math.max(0, b.fade));
                    icon.style.transform = `rotate(${b.rot}rad)`;
                } else {
                    const e = easeOut(b.appear);
                    shell.style.opacity = icon.style.opacity = String(e);
                    shell.style.transform = icon.style.transform = `scale(${0.4 + 0.6 * e})`;
                }
            });

            ctx.clearRect(0, 0, W, H);
            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i], k = (t - b.born) / 350;
                if (k >= 1) { bursts.splice(i, 1); continue; }
                const e = easeOut(k);
                ctx.globalAlpha = (1 - k) * 0.9;
                ctx.strokeStyle = brand;
                ctx.lineWidth = 0.5 + 2 * (1 - k);
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r * (1 + 0.5 * e), 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = "#fff";
                for (let a = 0; a < 8; a++) {
                    const ang = (a / 8) * Math.PI * 2 + 0.3, d = b.r * (1 + 0.9 * e);
                    ctx.fillRect(b.x + Math.cos(ang) * d - 1, b.y + Math.sin(ang) * d - 1, 2, 2);
                }
            }
            for (let i = dust.length - 1; i >= 0; i--) {
                const d = dust[i], age = (t - d.born) / 1000;
                if (age >= d.life) { dust.splice(i, 1); continue; }
                // Carried down by the fall at first, then the grains turn and drift up.
                d.vy = Math.max(-140, d.vy - BUOYANCY * dt);
                d.vy *= 1 - 0.8 * dt;
                d.vx = (d.vx + (Math.random() - 0.5) * 60 * dt) * (1 - 1.2 * dt);
                d.x += d.vx * dt;
                d.y += d.vy * dt;
                // Tied to the horizon fading in: scrolling lifts the dust and thins it out.
                const lift = h - d.h0, sync = d.h0 >= 1 ? 0 : 1 - lift / (1 - d.h0);
                const alpha = (1 - age / d.life) * Math.max(0, sync);
                if (alpha <= 0.01) continue;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = d.green ? brand : "#fff";
                ctx.fillRect(d.x - d.size / 2, d.y - lift * 160 - d.size / 2, d.size, d.size);
            }
            ctx.globalAlpha = 1;

            const idle = settled && !dust.length && !bursts.length && bubbles.every((b) => b.state === "idle");
            if (onScreen && !document.hidden && !idle) raf = requestAnimationFrame(tick);
        };
        const wake = () => {
            if (raf || !onScreen || document.hidden || !W) return;
            last = performance.now();
            raf = requestAnimationFrame(tick);
        };
        const sleep = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        api.current = { pop: (i) => { pop(i, settled, performance.now()); wake(); } };
        const ro = new ResizeObserver(() => { layout(); wake(); });
        ro.observe(stage);
        const io = new IntersectionObserver(([e]) => {
            onScreen = e.isIntersecting;
            if (onScreen) wake();
            else sleep();
        });
        io.observe(el);
        const onVisibility = () => (document.hidden ? sleep() : wake());
        document.addEventListener("visibilitychange", onVisibility);
        const stop = progress.on("change", wake);
        return () => {
            sleep();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            stop();
            api.current = null;
        };
    }, [reduce, progress]);

    // Rasterise each new icon once so its dust can follow its shape.
    useEffect(() => {
        icons.forEach((icon, i) => {
            const svg = slots.current[i]?.querySelector("svg");
            if (MASKS.has(icon) || !svg) return;
            MASKS.set(icon, new Float32Array());
            const img = new Image();
            img.onload = () => {
                const c = document.createElement("canvas");
                c.width = c.height = MASK;
                const g = c.getContext("2d");
                if (!g) return;
                g.drawImage(img, 0, 0, MASK, MASK);
                const a = g.getImageData(0, 0, MASK, MASK).data, pts: number[] = [];
                for (let y = 0; y < MASK; y++) for (let x = 0; x < MASK; x++) if (a[(y * MASK + x) * 4 + 3] > 100) pts.push((x + 0.5) / MASK, (y + 0.5) / MASK);
                MASKS.set(icon, new Float32Array(pts));
            };
            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg).replaceAll("currentColor", "#fff"))}`;
        });
    }, [icons]);

    if (reduce) return null;
    return (
        <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <canvas ref={canvas} className="absolute inset-0 size-full" />
            {icons.map((icon, i) => (
                <div
                    key={i}
                    ref={(n) => { slots.current[i] = n; }}
                    onClick={() => api.current?.pop(i)}
                    style={{ visibility: "hidden" }}
                    className="absolute left-0 top-0 cursor-pointer will-change-transform [-webkit-tap-highlight-color:transparent]"
                >
                    <span style={SHELL} className="md:backdrop-blur-[3px]" />
                    <span className="absolute inset-0 grid place-items-center">
                        <Glyph icon={icon} />
                    </span>
                </div>
            ))}
        </div>
    );
}
