// Which screenshots each template has in public/assets/store/<slug>/.
// desktop.png (1440×900) exists for all; tall.jpg is a 1440-wide full-page shot (height below),
// inner.jpg a second page, mobile.png a 375×812 phone view.
const TALL: Record<string, number> = {
    "agency-one": 3200, "astro-launch": 3200, "core-admin": 2099, "dev-journal": 1943, hyperspace: 3200, "tabler-desk": 3200,
};
const INNER = new Set(["agency-one", "astro-launch", "core-admin", "dev-journal", "hyperspace", "tabler-desk"]);
const MOBILE = new Set(["agency-one", "astro-launch", "control-room", "core-admin", "dev-journal", "hyperspace", "notes-app", "saas-starter", "tabler-desk"]);

const base = (slug: string) => `/assets/store/${slug}`;

export function shotsOf(slug: string) {
    const tallH = TALL[slug];
    return {
        desktop: `${base(slug)}/desktop.png`,
        tall: tallH ? { src: `${base(slug)}/tall.jpg`, h: tallH } : undefined,
        inner: INNER.has(slug) ? `${base(slug)}/inner.jpg` : undefined,
        mobile: MOBILE.has(slug) ? `${base(slug)}/mobile.png` : undefined,
    };
}
