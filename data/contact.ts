// Contact details and the honest send transports. There is no backend: the form composes a
// mailto with both founders in the To line (some mail clients drop a cc= header) and the
// visitor presses Send in their own mail app; WhatsApp deep links use wa.me, which wants the
// number in international format, digits only — no +, spaces, dashes or leading zeros.
// Every CTA builds its letter here, so the sheet on the page and the email that leaves
// cannot drift apart. A real API route can replace the mailto later without touching the UI.

import { SERVICE_GROUPS } from "@/data/services";

export type ContactFields = {
    name: string;
    email: string;
    phone: string;
    type: string; // the picked chip label (a service group or "Something else"); "" while none is picked
    service: string; // the exact service name when the visitor arrived via ?service=; "" otherwise
    message: string;
};

// The email as it will leave: addresses, subject, body (CRLF lines, per RFC 6068).
export type Letter = { to: string[]; subject: string; body: string };

export const EMAIL = "noahdevsug@gmail.com"; // primary inbox
export const CC_EMAIL = "shaundaniel156@gmail.com";

// The project field is capped so the mailto URL stays well inside what mail clients accept
// (they start dying near 2,000 characters). Past MAILTO_MAX the page skips the navigation
// and offers the letter to copy instead.
export const MESSAGE_MAX = 1000;
export const MAILTO_MAX = 1800;

// The "What is it about?" chips: the three service groups, plus a way out.
export const CHIPS: string[] = [...SERVICE_GROUPS.map((g) => g.name), "Something else"];

// wa.me link for a number in any formatting, with an optional pre-filled message.
export const waLink = (number: string, text?: string) =>
    `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Person = {
    name: string;
    role: string; // PENDING: Noah — confirm roles
    phoneDisplay: string;
    tel: string;
    email: string;
    wa: string;
};

export const PEOPLE: Person[] = [
    {
        name: "Noah",
        role: "Co-founder",
        phoneDisplay: "+256 784 695549",
        tel: "tel:+256784695549",
        email: "noahdevsug@gmail.com",
        wa: waLink("+256784695549"),
    },
    {
        name: "Shaun",
        role: "Co-founder",
        phoneDisplay: "+256 789 494032",
        tel: "tel:+256789494032",
        email: "shaundaniel156@gmail.com",
        wa: waLink("+256789494032"),
    },
];

// The business WhatsApp line behind the "WhatsApp us" CTAs.
export const WHATSAPP_NUMBER = "+256784695549";
export const whatsappText = (text: string) => waLink(WHATSAPP_NUMBER, text);

// Studio hours that drive the "we're in" clock. PENDING: Noah — confirm. Until confirmed the
// page shows the time and the reply promise only, never a live open/closed claim.
export const HOURS = {
    label: "Mon–Sat, 8:00–19:00 EAT",
    zone: "Africa/Kampala",
    firstDay: 1, // Mon
    lastDay: 6, // Sat
    openHour: 8,
    closeHour: 19,
};

// Kampala time right now and whether the studio is in, per HOURS.
export function kampalaNow(): { time: string; open: boolean } {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: HOURS.zone,
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
        hour12: false,
    }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days.indexOf(get("weekday").slice(0, 3));
    const hour = Number(get("hour"));
    const inWeek = day >= HOURS.firstDay && day <= HOURS.lastDay;
    const inHours = hour >= HOURS.openHour && hour < HOURS.closeHour;
    return { time: `${get("hour")}:${get("minute")}`, open: inWeek && inHours };
}

// The status ticker under the opener (decoration; read by eyes, not screens).
export const TICKER = [
    "Accepting new projects",
    "Reply within one working day",
    "Kampala, EAT (UTC+3)",
    "Noah & Shaun",
];

const clean = (v?: string) => (v ?? "").trim();

// The letter, built only from the parts that exist: the subject never carries an empty
// slot, the body never a "Phone:" without a phone. The exact service name (from
// ?service=) outranks the chip in the About line.
export function letterFor(f: Partial<ContactFields> = {}): Letter {
    const name = clean(f.name);
    const email = clean(f.email);
    const phone = clean(f.phone);
    const about = clean(f.service) || clean(f.type);
    const message = clean(f.message).replace(/\r?\n/g, "\r\n"); // one line convention throughout, per RFC 6068
    const subject = ["S&N Devs", about, name].filter(Boolean).join(" — ");
    const head = [
        name && `Name: ${name}`,
        email && `Email: ${email}`,
        phone && `Phone: ${phone}`,
        about && `About: ${about}`,
    ].filter(Boolean) as string[];
    // One blank line between the header block and the message, only when both exist.
    const lines = head.length && message ? [...head, "", message] : [...head, message].filter(Boolean);
    return { to: [EMAIL, CC_EMAIL], subject, body: lines.join("\r\n") };
}

// The mailto every CTA opens: both addresses in To (no cc=), subject and body encoded per
// RFC 6068. With no fields it is the bare "write to us" link for the final scene.
export function mailtoFor(f?: Partial<ContactFields>): string {
    const l = letterFor(f);
    return `mailto:${l.to.join(",")}?subject=${encodeURIComponent(l.subject)}&body=${encodeURIComponent(l.body)}`;
}

// The same note as a pre-filled WhatsApp message to the business line, with the same
// guards: no "I'm ." when there is no name, no "It's about ." when nothing was picked.
export function whatsappFor(f?: Partial<ContactFields>): string {
    const name = clean(f?.name);
    const about = clean(f?.service) || clean(f?.type);
    const message = clean(f?.message);
    const text = [
        `Hello S&N Devs${name ? `, I'm ${name}` : ""}.`,
        about && `It's about ${about}.`,
        message,
    ]
        .filter(Boolean)
        .join(" ");
    return waLink(WHATSAPP_NUMBER, text);
}

// The service behind a ?service= id from the Services page (or the Store), looked up in
// SERVICE_GROUPS so the name, the group chip and the price can never go stale. Unknown or
// missing ids give null and the form opens blank.
export function serviceFromParam(
    id: string | null
): { id: string; name: string; group: string; from: number; quote: boolean } | null {
    const key = (id ?? "").trim().toLowerCase();
    if (!key) return null;
    for (const g of SERVICE_GROUPS) {
        const s = g.services.find((x) => x.id === key);
        if (s) return { id: s.id, name: s.name, group: g.name, from: s.from, quote: Boolean(s.quote) };
    }
    return null;
}

// Socials arrive with Noah; the page renders whatever is listed here.
// PENDING: Noah — Instagram / LinkedIn / X links.
export const SOCIALS: { label: string; href: string }[] = [];
