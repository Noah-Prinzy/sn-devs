"use client";

import { useSyncExternalStore } from "react";

// The visitor's own "pause motion" switch (WCAG 2.2.2: anything that moves for more than five
// seconds needs a control). It sits beside the OS reduced-motion setting: useStill() in
// components/store/browser-frame.tsx answers true for either, every MotionConfig on the site
// reads it through SiteMotion, and html[data-motion="paused"] freezes CSS animations.
const KEY = "sn-motion";
const listeners = new Set<() => void>();
let paused = false;
let loaded = false;

function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try { paused = window.localStorage.getItem(KEY) === "paused"; } catch { paused = false; }
    apply();
}

function apply() {
    if (typeof document === "undefined") return;
    if (paused) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
}

export function setPausedMotion(next: boolean) {
    paused = next;
    try { window.localStorage.setItem(KEY, next ? "paused" : "playing"); } catch { /* private mode: the choice lasts the visit */ }
    apply();
    listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
    load();
    listeners.add(l);
    return () => { listeners.delete(l); };
}

// True once the visitor has paused motion. False on the server and before the stored choice
// is read, so the first client render matches the HTML.
export function usePausedMotion() {
    return useSyncExternalStore(subscribe, () => { load(); return paused; }, () => false);
}
