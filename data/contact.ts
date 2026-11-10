// Contact details and the v1 send transports. The form composes a mailto (To: Noah,
// CC: Shaun); WhatsApp deep links use wa.me, which wants the number in international
// format, digits only — no +, spaces, dashes or leading zeros. A real API route can
// replace the mailto later without touching the UI.

export type ContactFields = {
    name: string;
    email: string;
    phone: string;
    type: string; // the picked project-type chip; "" while none is picked
    message: string;
};

export const EMAIL = "noahdevsug@gmail.com"; // primary inbox
export const CC_EMAIL = "shaundaniel156@gmail.com";

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

// Studio hours that drive the "we're in" clock. PENDING: Noah — confirm.
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

// The mailto the form composes: To Noah, CC Shaun, structured body.
export function mailtoFor(f: ContactFields): string {
    const subject = `S&N Devs — ${f.type} — ${f.name}`;
    const body = [
        `Name: ${f.name}`,
        f.phone ? `Phone: ${f.phone}` : "",
        `Project: ${f.type}`,
        "",
        f.message,
    ]
        .filter((line) => line !== "")
        .join("\r\n");
    return `mailto:${EMAIL}?cc=${CC_EMAIL}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// The same note as a pre-filled WhatsApp message to the business line.
export function whatsappFor(f: ContactFields): string {
    return waLink(WHATSAPP_NUMBER, `Hello S&N Devs — ${f.type}. I'm ${f.name}. ${f.message}`);
}

// Socials arrive with Noah; the page renders whatever is listed here.
// PENDING: Noah — Instagram / LinkedIn / X links.
export const SOCIALS: { label: string; href: string }[] = [];
