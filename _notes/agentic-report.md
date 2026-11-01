# is-agentic report for kelvinhanma.com

## Current status (2026-11-01)

**Score: 97 / 100** ("Strong technical baseline", 2 failed, 3 partial). Scanned against the `personal-website` Worker after deploying PR #5.
Report: https://is-agentic.com/scan/personal-website.kelvin-ma23.workers.dev

| Tier | Score | Passed |
|------|-------|--------|
| Essential | 80 / 80 | 5 / 5 |
| Recommended | 14.2 / 20 | 7 / 12 |
| Bonus | +2.5 | 10 positive signals |

Still flagged:

| Check | Status | Plan |
|-------|--------|------|
| Trust anchor pages | Partial | **To do.** Contact and Privacy pages need about 500 chars each. Expand `contact.html` and add a privacy page ("no cookies, no analytics"). Add matching `md/` files. |
| Brand name discoverability | Fail | SEO, not code. "Kelvin Ma" is a common name. Re-scan against kelvinhanma.com itself, since the workers.dev URL isn't indexed. |
| Developer resource discoverability | Fail | Ignore. It looks for API docs and there is no API. |
| MCP server | Partial | Ignore. It matched an unrelated Smithery listing. |
| Organization schema | Partial | Ignore. It reads `worksFor: Google` in the Person JSON-LD and wants a company address. |

Other follow-ups:

- Replace `og:image` (currently the 180px `apple-touch-icon.png`) with a 1200×630 card.
- Optionally add analytics again (Cloudflare Web Analytics is cookie-free).
- Re-run `npx is-agentic kelvinhanma.com` against the real domain.

## What was done (PR #5)

- Worker (`src/worker.js`) for Markdown content negotiation and Markdown 404s, plus `Vary: Accept`. Markdown versions of the pages are in `md/`.
- `404.html` via `not_found_handling: "404-page"`.
- `lang`, description, canonical, and Open Graph tags on every page; `rel=alternate` links to the Markdown versions.
- `Person` JSON-LD on the homepage.
- `llms.txt` with a "when to use this site" section.
- Sitemap cleanup (removed the deleted `assistant.html` and off-host URLs). Lowercase `kelvinhanma.com` everywhere. Extensionless URLs.
- Removed the dead Universal Analytics tag.

## Deploy and hosting notes

- kelvinhanma.com is a custom domain on the `personal-website` Worker (deploys go back to 2026-01-15). DNS is on Cloudflare. GitHub Pages is not enabled. Cloudflare Workers Builds is connected to the repo: pushes to `master` deploy to production, and other branches get preview URLs (`<branch>-personal-website.kelvin-ma23.workers.dev`). Merging PR #5 deployed version `9f2ed9b9` to production. A manual `wrangler deploy` also goes live immediately.
- **Exposure, 2026-01-15 to 2026-11-01:** `.wranglerignore` was never read by Wrangler, so production served `.git/`, `.claude/settings.local.json`, `CLAUDE.md`, `README.md`, and config files. The repo is public and the settings file had no secrets, so the impact is low. Fixed by renaming the file to `.assetsignore`; those paths now return 404 in production.
- The 0.33 KiB `--dry-run` upload size was harmless. A dry run doesn't upload assets, so the number is only the Worker script.
- Cloudflare 307-redirects `*.html` to extensionless paths, so the site links to `/contact` and `/cooking`.
- Wrangler was upgraded from 4.76.0 to 4.156.0 (global npm install).

## Original scan (2026-11-01, before changes)

Scanned with `npx is-agentic kelvinhanma.com`. **Score: 60 / 100** ("Important blockers remain", 6 failed, 3 partial). Essential 51.1 / 80 (3 / 6), Recommended 7.8 / 20 (3 / 9), Bonus +0.9.

1. Markdown content negotiation: FAIL. Fixed.
2. Content without JavaScript: PARTIAL (contact 86 chars, cooking 186). Now passes.
3. Agent-friendly 404s: PARTIAL (no Markdown body). Fixed.
4. JSON-LD structured data: FAIL. Fixed with Person JSON-LD.
5. Metadata completeness: FAIL. Fixed.
6. Agent instruction / when-to-use: FAIL. Fixed with llms.txt.
7. Organization schema: FAIL. Now partial; not relevant.
8. Trust anchor pages: PARTIAL. Still partial; see the to-do above.
9. Brand name discoverability: FAIL. Still failing; SEO.
