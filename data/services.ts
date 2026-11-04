// Services, grouped the way the Services page presents them.
// Prices are "from" figures in UGX, set against 2026 Kampala market rates (see design notes);
// USD is a rough guide for overseas clients at ~3,700 UGX/USD.

export type Service = {
    id: string;
    name: string;
    blurb: string;
    from: number; // UGX
    unit?: string; // e.g. "/month", "per video"
    delivery: string;
    includes: string[];
    quote?: boolean; // priced per project, lead with "Get a quote"
};

export type ServiceGroup = {
    id: string;
    index: string;
    name: string;
    tagline: string;
    services: Service[];
};

export const USD_RATE = 3700;

export const ugx = (n: number) =>
    n >= 1_000_000 ? `UGX ${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `UGX ${Math.round(n / 1000)}K`;
export const usd = (n: number) => `≈ $${Math.round(n / USD_RATE / 5) * 5}`;

export const SERVICE_GROUPS: ServiceGroup[] = [
    {
        id: "build",
        index: "01",
        name: "Web Design & Development",
        tagline: "Sites and systems built to launch fast and grow with you.",
        services: [
            {
                id: "launch",
                name: "Launch Pages",
                blurb: "One focused page for a product, event or offer.",
                from: 700_000,
                delivery: "5–7 days",
                includes: ["Custom one-page design", "Mobile-ready and fast", "Contact or WhatsApp lead form", "Basic SEO and analytics"],
            },
            {
                id: "websites",
                name: "Business Websites",
                blurb: "A complete site that makes your business look established.",
                from: 1_800_000,
                delivery: "2–3 weeks",
                includes: ["Up to 6 custom pages", "Blog, gallery or portfolio", "Google Maps and WhatsApp", "SEO setup and analytics"],
            },
            {
                id: "apps",
                name: "Custom Web Apps & Systems",
                blurb: "Dashboards, portals, booking and management systems.",
                from: 8_000_000,
                delivery: "6+ weeks",
                includes: ["Discovery and system design", "User roles and secure logins", "Mobile Money and API integrations", "Training and handover"],
                quote: true,
            },
            {
                id: "templates",
                name: "Ready-Made Templates",
                blurb: "Polished website templates you can launch today.",
                from: 120_000,
                unit: "per template",
                delivery: "Instant",
                includes: ["Responsive Next.js / HTML", "Easy-to-edit content", "Setup guide", "Free minor updates"],
            },
        ],
    },
    {
        id: "care",
        index: "02",
        name: "Care & Growth",
        tagline: "Keep what you have fast, secure and current.",
        services: [
            {
                id: "care-plans",
                name: "Care Plans",
                blurb: "Monthly maintenance so your site never falls behind.",
                from: 120_000,
                unit: "/month",
                delivery: "Ongoing",
                includes: ["Security and software updates", "Daily backups and uptime watch", "Content edits each month", "Monthly health report"],
            },
            {
                id: "upgrades",
                name: "Upgrades & Redesigns",
                blurb: "Modernise an older site or system without starting over.",
                from: 400_000,
                delivery: "1–3 weeks",
                includes: ["Audit of speed, SEO and design", "Fresh, modern look", "Performance and security fixes", "New features added"],
            },
        ],
    },
    {
        id: "create",
        index: "03",
        name: "Creative Studio",
        tagline: "Content that gets you noticed, online and in the room.",
        services: [
            {
                id: "video",
                name: "Video Production & Editing",
                blurb: "Reels, promos and ads, cut to keep people watching.",
                from: 150_000,
                unit: "per video",
                delivery: "2–4 days",
                includes: ["Editing, colour and sound", "Captions and motion titles", "Formats for TikTok, IG and YouTube", "2 rounds of revisions"],
            },
            {
                id: "decks",
                name: "Presentation Design",
                blurb: "Pitch decks and slides that look as sharp as your idea.",
                from: 300_000,
                unit: "per deck",
                delivery: "3–5 days",
                includes: ["Up to 10 custom slides", "Charts and infographics", "On-brand master template", "PowerPoint and Google Slides"],
            },
            {
                id: "ads",
                name: "Ad Creative",
                blurb: "Scroll-stopping ads for social, print and digital.",
                from: 250_000,
                unit: "per 5 designs",
                delivery: "2–3 days",
                includes: ["5 static ad designs", "Sized for every platform", "Copy that converts", "Source files included"],
            },
        ],
    },
];

export const WEBSITE_TIERS = [
    { name: "Launch", from: 700_000, for: "A single offer or event", points: ["1 landing page", "Lead form + WhatsApp", "Live in about a week"] },
    { name: "Business", from: 1_800_000, for: "Small businesses", points: ["Up to 6 pages", "Blog or gallery, Maps, analytics", "2–3 weeks"], featured: true },
    { name: "Signature", from: 4_500_000, for: "Brands that want custom", points: ["Custom design and motion", "Online store or CMS", "4+ weeks"] },
];

export const CARE_TIERS = [
    { name: "Essential", from: 120_000, points: ["Updates, backups, uptime watch"] },
    { name: "Growth", from: 300_000, points: ["+ 2 hrs of edits, monthly report"], featured: true },
    { name: "Priority", from: 600_000, points: ["+ 6 hrs of edits, priority support"] },
];
