import { SERVICE_GROUPS, ugx } from "@/data/services";

// Everything the About page says, in one place (facts from the previous About page and
// PRODUCT.md). Prices come from data/services.ts so About and Services can never disagree.

const price = (id: string) => ugx(SERVICE_GROUPS.flatMap((g) => g.services).find((s) => s.id === id)!.from);

export const HEADLINE = { build: "We build it.", keep: "We keep it running." };
export const LEDE = "A two-person web and creative studio in Kampala, run by Shaun and Noah. Nine services, one small team, clear prices.";

export const MANIFESTO = {
    line: "A website should not be something you buy once and then worry about. It should be something that works for you every day and gets better.",
    green: ["works", "every", "day", "better."], // words that light up green
    follow: "Fixed quote up front and a care plan option at the end. We'd rather be the studio you keep than the one you had to replace.",
};

// Placeholders until Shaun & Noah's own photos arrive (the same cut-outs Home uses).
const PEOPLE = "/assets/home/people";
export const FOUNDERS = [
    {
        id: "shaun",
        name: "Shaun",
        role: "Co-founder · Design & creative",
        bio: "Shaun leads design and the creative studio: UI, video, presentations and ad creative.",
        photo: { src: `${PEOPLE}/shaun-placeholder.webp`, w: 545, h: 1600 },
        email: "shaundaniel156@gmail.com",
    },
    {
        id: "noah",
        name: "Noah",
        role: "Co-founder · Engineering & care",
        bio: "Noah leads engineering: web apps, custom systems, care plans and upgrades.",
        photo: { src: `${PEOPLE}/noah-placeholder.webp`, w: 630, h: 1600 },
        email: "noahdevsug@gmail.com",
    },
];

export const PROMISES = [
    { id: "quote", title: "Fixed quote first", text: "The price is agreed before a line is written. No surprises after that." },
    { id: "builders", title: "Talk to the builders", text: "No account manager, no middle layer. The two people who design and build your site are the two people you message." },
    { id: "timelines", title: "Fast, honest timelines", text: `Launch pages in about a week (from ${price("launch")}), full sites in two to three (from ${price("websites")}). We agree the date and keep it.` },
    { id: "stay", title: "We stay on", text: `Care plans from ${price("care-plans")} a month keep it fast, secure and current after launch.` },
];

// The made-up demo client the opener builds (not a real business).
export const DEMO = {
    name: "Nile Bakery",
    url: "nilebakery.ug",
    headline: "Fresh every morning in Kololo.",
    body: "Order before 9 and collect on your way to work.",
    cta: "Order now",
    nav: ["Menu", "Order", "Visit"],
};

export const STEPS = ["Design", "Build", "Launch", "Care"];
