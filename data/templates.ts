// Store catalogue: S&N Edition templates, each remade from an open-source base.
// Prices in UGX follow the agreed category × tier grid; the better the template, the higher its tier.
// `checkoutUrl` is the Lemon Squeezy checkout link; until it's set the Buy button reads "Coming soon".

export type Category = "websites" | "dashboards" | "apps" | "systems" | "mobile";
export type Tier = "basic" | "standard" | "premium";

export type Template = {
    slug: string;
    name: string;
    category: Category;
    tier: Tier;
    tagline: string;
    description: string;
    stack: string[];
    features: string[];
    bestFor: string;
    base: { name: string; author: string; licence: string }; // credited in THIRD-PARTY-NOTICES
    demoUrl?: string;
    checkoutUrl?: string;
};

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
    { id: "websites", name: "Websites", blurb: "Landing pages, portfolios and blogs." },
    { id: "dashboards", name: "Dashboards", blurb: "Admin panels and data views." },
    { id: "apps", name: "App starters", blurb: "Sign-in, database and payments, ready to build on." },
    { id: "systems", name: "Business systems", blurb: "CRM, point of sale and task boards that run as-is." },
    { id: "mobile", name: "Mobile", blurb: "App starters for Android and iOS." },
];

export const TIERS: Record<Tier, string> = { basic: "Basic", standard: "Standard", premium: "Premium" };

export const PRICES: Record<Category, Record<Tier, number>> = {
    websites: { basic: 60_000, standard: 120_000, premium: 180_000 },
    dashboards: { basic: 120_000, standard: 200_000, premium: 280_000 },
    apps: { basic: 250_000, standard: 400_000, premium: 550_000 },
    systems: { basic: 300_000, standard: 500_000, premium: 700_000 },
    mobile: { basic: 250_000, standard: 380_000, premium: 500_000 },
};

export const priceOf = (t: Template) => PRICES[t.category][t.tier];

export const TEMPLATES: Template[] = [
    {
        slug: "astro-launch", name: "Astro Launch", category: "websites", tier: "premium",
        tagline: "A fast marketing site and blog with 50+ ready sections.",
        description: "A complete marketing site for a product or business: landing page, pricing, about, contact and a blog. Built on Astro, so pages load almost instantly and rank well.",
        stack: ["Astro", "Tailwind CSS", "MDX"],
        features: ["50+ page sections", "Dark mode", "Blog with RSS", "SEO and sitemap built in"],
        bestFor: "Startups, SaaS and product launches",
        base: { name: "AstroWind", author: "onWidget", licence: "MIT" },
    },
    {
        slug: "dev-journal", name: "Dev Journal", category: "websites", tier: "standard",
        tagline: "A clean technical blog with search and tags.",
        description: "A writing-first site for developers and teams: posts in Markdown, code highlighting, tags, search and an author page.",
        stack: ["Next.js", "Tailwind CSS", "MDX"],
        features: ["Search", "Code highlighting", "Tags and archives", "RSS and SEO"],
        bestFor: "Developer blogs and documentation sites",
        base: { name: "Tailwind Next.js Starter Blog", author: "Timothy Lin", licence: "MIT" },
    },
    {
        slug: "agency-one", name: "Agency One", category: "websites", tier: "basic",
        tagline: "A one-page site for an agency or small business.",
        description: "Services, portfolio, team and contact on one scrolling page. Plain HTML and Bootstrap, so it runs on any host.",
        stack: ["HTML", "Bootstrap 5"],
        features: ["Portfolio grid with pop-ups", "Team section", "Contact form", "Responsive"],
        bestFor: "Agencies, studios and small businesses",
        base: { name: "Agency", author: "Start Bootstrap", licence: "MIT" },
    },
    {
        slug: "hyperspace", name: "Hyperspace", category: "websites", tier: "basic",
        tagline: "A bold landing page with a sidebar menu.",
        description: "A single page with a fixed side menu and full-height sections, made for presenting one product or idea clearly.",
        stack: ["HTML", "CSS", "JavaScript"],
        features: ["Side navigation", "Full-height sections", "Feature grid", "Responsive"],
        bestFor: "Tech products and personal projects",
        base: { name: "Hyperspace", author: "HTML5 UP", licence: "CC BY 3.0" },
    },
    {
        slug: "control-room", name: "Control Room", category: "dashboards", tier: "premium",
        tagline: "A modern admin dashboard with 10+ pages.",
        description: "Users, tasks, settings, charts and a command menu, with light and dark themes. Fast to extend because every part is a plain component.",
        stack: ["React", "Vite", "shadcn/ui", "Tailwind CSS"],
        features: ["10+ pages", "Command menu", "Light and dark themes", "Data tables"],
        bestFor: "Internal tools and SaaS back offices",
        base: { name: "shadcn-admin", author: "Sat Naing", licence: "MIT" },
    },
    {
        slug: "tabler-desk", name: "Tabler Desk", category: "dashboards", tier: "standard",
        tagline: "A broad admin kit with hundreds of UI parts.",
        description: "A large set of dashboard pages and components in plain HTML: charts, forms, tables, invoices and more.",
        stack: ["HTML", "Bootstrap", "Tabler"],
        features: ["Hundreds of components", "Charts and maps", "Invoice and pricing pages", "No build step needed"],
        bestFor: "Back offices on any backend",
        base: { name: "Tabler", author: "codecalm", licence: "MIT" },
    },
    {
        slug: "core-admin", name: "Core Admin", category: "dashboards", tier: "basic",
        tagline: "A simple React admin panel to start from.",
        description: "Sidebar layout, login page, charts and forms in React, ready to connect to your own data.",
        stack: ["React", "CoreUI", "Bootstrap"],
        features: ["Sidebar layout", "Login page", "Charts", "Form elements"],
        bestFor: "Small internal tools",
        base: { name: "CoreUI Free React Admin", author: "creativeLabs", licence: "MIT" },
    },
    {
        slug: "saas-kit-pro", name: "SaaS Kit Pro", category: "apps", tier: "premium",
        tagline: "Sign-in, payments, admin and AI in one SaaS starter.",
        description: "Everything a paid web app needs from day one: accounts, subscriptions, an admin panel, emails, file uploads and an AI example.",
        stack: ["React", "Node.js", "Wasp", "Prisma", "PostgreSQL"],
        features: ["Sign-in and sign-up", "Subscriptions", "Admin dashboard", "AI example app"],
        bestFor: "Launching a paid web product",
        base: { name: "Open SaaS", author: "Wasp", licence: "MIT" },
    },
    {
        slug: "ai-chat", name: "AI Chat", category: "apps", tier: "premium",
        tagline: "Your own ChatGPT-style app with saved chats.",
        description: "A chat app with streaming answers, saved history, file attachments and user accounts, ready to plug into the AI model you choose.",
        stack: ["Next.js", "AI SDK", "PostgreSQL", "Drizzle"],
        features: ["Streaming replies", "Chat history", "Accounts", "Works with several AI providers"],
        bestFor: "AI assistants and support bots",
        base: { name: "Chat SDK (ai-chatbot)", author: "Vercel", licence: "Apache-2.0" },
    },
    {
        slug: "saas-starter", name: "SaaS Starter", category: "apps", tier: "standard",
        tagline: "A lean starter with teams, roles and billing.",
        description: "Accounts, team invites, roles, an activity log and subscription billing, kept small so it's easy to understand.",
        stack: ["Next.js", "PostgreSQL", "Drizzle"],
        features: ["Sign-in", "Teams and roles", "Billing", "Activity log"],
        bestFor: "B2B tools and team apps",
        base: { name: "Next.js SaaS Starter", author: "Vercel", licence: "MIT" },
    },
    {
        slug: "notes-app", name: "Notes App", category: "apps", tier: "basic",
        tagline: "A writing app with accounts and a dashboard.",
        description: "A complete small app: marketing page, sign-in, a dashboard of posts and a rich editor. A good base for any content product.",
        stack: ["Next.js", "NextAuth", "Prisma", "MySQL"],
        features: ["Sign-in", "Dashboard", "Rich editor", "Marketing page"],
        bestFor: "Content and note-taking products",
        base: { name: "Taxonomy", author: "shadcn", licence: "MIT" },
    },
    {
        slug: "crm-suite", name: "CRM Suite", category: "systems", tier: "premium",
        tagline: "Leads, contacts, deals and email in one CRM.",
        description: "A full customer system: track leads through a sales pipeline, manage contacts and companies, send quotes and keep every email in one place.",
        stack: ["Laravel", "PHP", "MySQL"],
        features: ["Sales pipeline", "Contacts and companies", "Quotes", "Email inbox"],
        bestFor: "Sales teams and service businesses",
        base: { name: "Krayin CRM", author: "Webkul", licence: "MIT" },
    },
    {
        slug: "shop-pos", name: "Shop POS", category: "systems", tier: "standard",
        tagline: "Point of sale with stock, receipts and reports.",
        description: "Ring up sales, print receipts, track stock and suppliers and see daily reports. Runs on a simple web host.",
        stack: ["PHP", "CodeIgniter", "MySQL"],
        features: ["Sales and receipts", "Stock and suppliers", "Customers", "Reports"],
        bestFor: "Shops, pharmacies and small retailers",
        base: { name: "Open Source Point of Sale", author: "opensourcepos", licence: "MIT" },
    },
    {
        slug: "task-board", name: "Task Board", category: "systems", tier: "basic",
        tagline: "A simple kanban board for a team's work.",
        description: "Boards, columns, cards, due dates and user accounts. Light enough to run on almost any server.",
        stack: ["PHP", "SQLite"],
        features: ["Kanban boards", "Due dates", "User accounts", "Search and filters"],
        bestFor: "Small teams tracking work",
        base: { name: "Kanboard", author: "Frédéric Guillot", licence: "MIT" },
    },
    {
        slug: "flutter-start", name: "Flutter Start", category: "mobile", tier: "standard",
        tagline: "A Flutter app with sign-in and a cloud database.",
        description: "A well-structured Android and iOS app with accounts and Firebase data, laid out so new features slot in cleanly.",
        stack: ["Flutter", "Firebase", "Riverpod"],
        features: ["Sign-in", "Cloud database", "Android and iOS", "Clean structure"],
        bestFor: "First mobile apps",
        base: { name: "Starter Architecture for Flutter & Firebase", author: "Andrea Bizzotto", licence: "MIT" },
    },
];
