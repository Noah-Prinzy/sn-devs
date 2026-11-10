# S&N Edition remake plan (agreed 2026-11-06)

Output: D:\S&N Store\editions\<slug>\ (source) + <slug>.zip. Private: never inside the website repo.
Catalogue: data/templates.ts (15 templates, slugs and bases).

## Every template (all 15)
1. Copy the base from C:\Users\Noah\Documents\Custom Templates or D:\Zuula\templates into editions/<slug>.
2. Keep the original look and feel. Only touch UI copy: swap placeholder brand names and sample story lines
   for S&N Devs and the S&N Edition name. No redesign.
3. MUST NOT change sign-in, auth, database, API, payments or any backend logic. Text and branding only.
4. LICENSE -> S&N Edition licence (covers our changes and the package).
   THIRD-PARTY-NOTICES -> the original LICENSE text and copyright, kept word for word.
5. README + SETUP.md in S&N voice: what it is, requirements, install, run, deploy.
6. Remove demo leftovers that aren't part of the product (analytics IDs, author links, .github workflows).
7. Install and build/run check; record the result.
8. Playwright screenshots (desktop + mobile) -> public/assets/store/<slug>/ in the website.
9. Zip without node_modules, .env or build output.

## Tier extras (Standard + Premium)
More thorough copy pass across all pages (hero, about, footer, emails, sample data), still no design changes.
