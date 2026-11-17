import type { CSSProperties, ReactNode } from "react";
import s from "./service-graphics.module.css";

// The Services menu art, drawn by us (design/services/menu-graphics-options.html, G4).
// Each drawing is a tiny wireframe of what the service delivers, on one 320 × 128 board, with a
// single green action that plays once: on row hover / keyboard focus, or when the drawer shows it.
// Phones get the matching line icon (32-unit grid) instead, since a wireframe can't read at 72 px.

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const off = (o: string) => ({ "--o": o }) as CSSProperties;
const P = { pathLength: 1 };

const DRAWINGS: Record<string, () => ReactNode> = {
    launch: () => (
        <>
            <rect className={s.w} x="70" y="6" width="180" height="116" />
            <path className={s.w} d="M70 16H250M76 11h2M81 11h2M86 11h2" />
            <rect className={s.f} x="84" y="26" width="78" height="7" />
            <rect className={s.f} x="84" y="37" width="58" height="7" />
            <path className={s.w} d="M84 52h70M84 57h52" />
            <rect className={s.a} x="84" y="64" width="36" height="11" />
            <rect className={cx(s.cta, s.play)} x="84" y="64" width="36" height="11" />
            <rect className={s.w} x="174" y="24" width="64" height="50" />
            <path className={s.w} d="M174 74l20-22 14 14 10-8 20 16" />
            <rect className={s.w} x="84" y="86" width="46" height="26" />
            <rect className={s.w} x="138" y="86" width="46" height="26" />
            <rect className={s.w} x="192" y="86" width="46" height="26" />
        </>
    ),
    websites: () => (
        <>
            <rect className={s.w} x="22" y="8" width="152" height="94" />
            <path className={s.w} d="M98 102v10M80 114h36M122 18h10M138 18h10M154 18h12" />
            <rect className={cx(s.site, s.play)} x="30" y="15" width="10" height="5" />
            <rect className={s.f} x="30" y="26" width="136" height="30" />
            <rect className={s.w} x="30" y="62" width="42" height="32" />
            <rect className={s.w} x="77" y="62" width="42" height="32" />
            <rect className={s.w} x="124" y="62" width="42" height="32" />
            <rect className={s.w} x="186" y="24" width="70" height="92" />
            <rect className={cx(s.site, s.play)} style={off(".12s")} x="192" y="30" width="9" height="4" />
            <rect className={s.f} x="192" y="39" width="58" height="24" />
            <rect className={s.w} x="192" y="68" width="27" height="20" />
            <rect className={s.w} x="223" y="68" width="27" height="20" />
            <rect className={s.w} x="192" y="93" width="58" height="16" />
            <rect className={s.w} x="266" y="42" width="38" height="74" />
            <rect className={cx(s.site, s.play)} style={off(".24s")} x="271" y="48" width="8" height="3" />
            <rect className={s.f} x="271" y="55" width="28" height="16" />
            <rect className={s.w} x="271" y="76" width="28" height="10" />
            <rect className={s.w} x="271" y="90" width="28" height="10" />
            <rect className={s.w} x="271" y="104" width="28" height="6" />
        </>
    ),
    apps: () => (
        <>
            <rect className={s.w} x="40" y="6" width="240" height="116" />
            <path className={s.w} d="M84 6v116M50 34h24M50 46h20M50 70h22M50 82h18" />
            <rect className={s.f} x="49" y="13" width="10" height="10" />
            <rect className={s.a} x="46" y="54" width="34" height="8" />
            <rect className={s.w} x="94" y="14" width="54" height="24" />
            <rect className={s.w} x="156" y="14" width="54" height="24" />
            <rect className={s.w} x="218" y="14" width="54" height="24" />
            <path className={s.w} d="M100 30h22M162 30h30M224 30h16M94 48v66h110" />
            <path className={s.w} d="M98 102l14-8 14 4 14-16 14 4 14-18 14 4 14-14" />
            <path className={cx(s.line, s.play)} {...P} d="M98 102l14-8 14 4 14-16 14 4 14-18 14 4 14-14" />
            <path className={s.w} d="M214 50h58M214 62h58M214 74h58M214 86h58M214 98h58M214 110h58" />
            <rect className={s.f} x="214" y="52" width="14" height="6" />
            <rect className={s.f} x="214" y="64" width="22" height="6" />
            <rect className={s.f} x="214" y="76" width="10" height="6" />
            <rect className={s.f} x="214" y="88" width="18" height="6" />
        </>
    ),
    templates: () => (
        <>
            <rect className={s.w} x="34" y="20" width="78" height="96" />
            <rect className={s.f} x="40" y="26" width="66" height="28" />
            <path className={s.w} d="M40 62h50M40 68h40" />
            <rect className={s.w} x="40" y="76" width="31" height="32" />
            <rect className={s.w} x="75" y="76" width="31" height="32" />
            <g className={cx(s.lift, s.play)}>
                <rect className={s.sel} x="121" y="10" width="78" height="106" />
                <path className={s.w} d="M127 18h12M170 18h22M127 73h56M127 79h44M127 85h50M127 25l66 40M193 25l-66 40" />
                <rect className={s.w} x="127" y="25" width="66" height="40" />
                <rect className={s.a} x="127" y="94" width="26" height="9" />
            </g>
            <rect className={s.w} x="208" y="20" width="78" height="96" />
            <rect className={s.f} x="214" y="26" width="28" height="84" />
            <path className={s.w} d="M248 32h32M248 38h26M248 50h32M248 56h28M248 62h30M248 74h32M248 80h20" />
            <rect className={s.w} x="248" y="92" width="22" height="9" />
        </>
    ),
    "care-plans": () => (
        <>
            <rect className={s.w} x="30" y="8" width="260" height="112" />
            <text className={s.t} x="40" y="24">UPTIME · 30 DAYS</text>
            <text className={s.t} x="230" y="24">99.98%</text>
            <circle className={s.solid} cx="282" cy="20" r="3" />
            {Array.from({ length: 30 }, (_, i) => (
                <rect key={i} className={i === 17 ? s.w : s.f} x={40 + i * 8.2} y="32" width="5" height="18" />
            ))}
            <path className={s.w} d="M40 96H280M40 88h70l8-20 8 36 8-26 6 10h140" />
            <path className={cx(s.line, s.pulse, s.play)} {...P} d="M40 88h70l8-20 8 36 8-26 6 10h140" />
        </>
    ),
    upgrades: () => (
        <>
            <rect className={s.w} x="40" y="8" width="240" height="112" />
            <g className={s.old}>
                <rect x="48" y="16" width="44" height="10" />
                <path d="M98 21h50M50 70h70M56 76h86M48 82h60" />
                <rect x="52" y="32" width="96" height="30" />
                <rect x="50" y="90" width="30" height="22" />
                <rect x="88" y="94" width="44" height="18" />
            </g>
            <rect className={s.solid} x="170" y="17" width="10" height="5" />
            <path className={s.w} d="M236 19h14M256 19h16M170 68h70M170 74h52" />
            <rect className={s.f} x="170" y="30" width="102" height="30" />
            <rect className={s.w} x="170" y="86" width="32" height="26" />
            <rect className={s.w} x="206" y="86" width="32" height="26" />
            <rect className={s.w} x="242" y="86" width="30" height="26" />
            <g className={cx(s.divider, s.play)}>
                <path className={s.a} d="M160 8v112" />
                <rect className={s.a} x="153" y="54" width="14" height="20" style={{ fill: "#0d0d0d" }} />
                <path className={s.a} d="M158 60v8M162 60v8" />
            </g>
        </>
    ),
    video: () => (
        <>
            <rect className={s.w} x="94" y="4" width="132" height="70" />
            <path className={s.a} d="M151 27l20 12-20 12z" />
            <path className={s.w} d={`M30 82H290${Array.from({ length: 14 }, (_, i) => `M${30 + i * 20} 80v4`).join("")}`} />
            <rect className={s.f} x="30" y="88" width="70" height="9" />
            <rect className={s.f} x="104" y="88" width="50" height="9" />
            <rect className={s.f} x="158" y="88" width="88" height="9" />
            <rect className={s.f} x="250" y="88" width="40" height="9" />
            <rect className={s.w} x="60" y="100" width="44" height="9" />
            <rect className={s.w} x="140" y="100" width="80" height="9" />
            <path className={s.w} d={`M30 117${Array.from({ length: 65 }, (_, i) => `l4 ${[-3, 5, -6, 7, -4, 3, -5, 6, -4, 2][i % 10]}`).join("")}`} />
            <g className={cx(s.head, s.play)}>
                <path className={s.a} d="M170 80v44" />
                <rect className={s.solid} x="166" y="76" width="8" height="6" />
            </g>
        </>
    ),
    decks: () => (
        <>
            <rect className={s.w} x="38" y="12" width="40" height="23" />
            <rect className={s.w} x="38" y="40" width="40" height="23" />
            <rect className={s.w} x="38" y="68" width="40" height="23" />
            <rect className={s.w} x="38" y="96" width="40" height="23" />
            <rect className={cx(s.a, s.pick, s.play)} x="35" y="37" width="46" height="29" />
            <rect className={s.w} x="92" y="12" width="190" height="107" />
            <rect className={s.f} x="104" y="24" width="96" height="8" />
            <path className={s.w} d="M104 40h64M184 108h86" />
            <circle className={s.w} cx="140" cy="80" r="20" />
            <path className={s.a} d="M140 60a20 20 0 0 1 19.6 24" />
            <rect className={s.w} x="190" y="86" width="12" height="22" />
            <rect className={s.w} x="210" y="74" width="12" height="34" />
            <rect className={s.w} x="250" y="80" width="12" height="28" />
            <rect className={cx(s.a, s.bar, s.play)} x="230" y="58" width="12" height="50" />
        </>
    ),
    ads: () => (
        <>
            <rect className={s.w} x="34" y="20" width="84" height="84" />
            <rect className={s.f} x="40" y="26" width="72" height="46" />
            <path className={s.w} d="M40 80h56M40 86h40" />
            <rect className={s.a} x="40" y="93" width="24" height="7" />
            <text className={s.t} x="36" y="116">1:1</text>
            <rect className={s.w} x="134" y="6" width="64" height="114" />
            <rect className={s.f} x="140" y="12" width="52" height="64" />
            <path className={s.w} d="M140 84h46M140 90h36" />
            <rect className={s.a} x="140" y="104" width="52" height="9" />
            <rect className={s.w} x="214" y="36" width="90" height="51" />
            <rect className={s.f} x="220" y="42" width="36" height="39" />
            <path className={s.w} d="M262 48h36M262 54h28" />
            <rect className={s.a} x="262" y="72" width="22" height="7" />
            <text className={s.t} x="214" y="99">16:9</text>
            <path className={cx(s.line, s.play)} {...P} d="M34 20h84v84H34z" />
            <path className={cx(s.line, s.play)} {...P} style={off(".12s")} d="M134 6h64v114h-64z" />
            <path className={cx(s.line, s.play)} {...P} style={off(".24s")} d="M214 36h90v51h-90z" />
        </>
    ),
};

/** A service's drawing. `row`: plays when its row (carrying `triggerClass`) is hovered or focused.
 *  `drawer`: plays once on mount (remount it with a key to replay). `still`: shows the end frame. */
export function ServiceDrawing({ id, variant, still }: { id: string; variant: "row" | "drawer"; still: boolean }) {
    const Art = DRAWINGS[id];
    if (!Art) return null;
    return (
        <svg viewBox="0 0 320 128" aria-hidden="true" focusable="false" className={cx(s.d, variant === "drawer" && s.drawer, still ? s.still : s.live)}>
            <Art />
        </svg>
    );
}

/** Put on the element whose hover / focus-visible plays the drawing inside it. */
export const triggerClass = s.trigger;
/** The row's bottom rule that draws toward the drawing. */
export const ruleClass = (still: boolean) => cx(s.rule, still && s.ruleStill);
/** The drawer's dark blueprint panel. */
export const panelClass = s.panel;

const ICONS: Record<string, ReactNode> = {
    launch: (
        <>
            <rect x="4" y="5" width="24" height="22" />
            <path d="M4 10H28M16 23V14M12 18l4-4 4 4" />
        </>
    ),
    websites: (
        <>
            <rect x="3" y="6" width="18" height="13" />
            <path d="M12 19v4M8 23h8" />
            <rect className={s.k} x="22" y="11" width="7" height="14" />
            <path d="M24.5 22.5h2" />
        </>
    ),
    apps: (
        <>
            <rect x="4" y="5" width="24" height="22" />
            <path d="M10 5v22M15 22v-4M19 22v-8M23 22v-6" />
        </>
    ),
    templates: (
        <>
            <rect x="11" y="4" width="17" height="14" />
            <rect className={s.k} x="7.5" y="8" width="17" height="14" />
            <rect className={s.k} x="4" y="12" width="17" height="14" />
            <path d="M7 16h11" />
        </>
    ),
    "care-plans": <path d="M16 4l10 4v8c0 6-4.5 10-10 12C10.5 26 6 22 6 16V8zM11.5 16l3 3 6-6.5" />,
    upgrades: (
        <>
            <rect x="11" y="11" width="10" height="10" />
            <path d="M6 13a10.5 10.5 0 0 1 17-6M26 19a10.5 10.5 0 0 1-17 6M23 3v4h-4M9 29v-4h4" />
        </>
    ),
    video: (
        <>
            <rect x="3" y="7" width="26" height="18" />
            <path d="M13.5 12v8l6.5-4zM3 27.5h26M10 26v3M20 26v3" />
        </>
    ),
    decks: (
        <>
            <rect x="4" y="4" width="24" height="16" />
            <path d="M16 20v4M11 28l5-4 5 4M10 16v-3M14 16v-6M18 16v-4M22 16v-7" />
        </>
    ),
    ads: <path d="M5 13h5l13-7v20l-13-7H5zM8 19v7h4v-6M26.5 12.5l2.5-1.5M27 16h3M26.5 19.5l2.5 1.5" />,
};

/** The service's line icon (phone rows). Strokes take currentColor. */
export function ServiceIcon({ id, className }: { id: string; className?: string }) {
    const icon = ICONS[id];
    if (!icon) return null;
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={cx(s.icon, className)}>
            {icon}
        </svg>
    );
}
