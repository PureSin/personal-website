# is-agentic report for kelvinhanma.com

Scanned 2026-11-01 with `npx is-agentic kelvinhanma.com`.
Full report: https://is-agentic.com/scan/kelvinhanma.com

**Score: 60 / 100** ("Important blockers remain", 6 failed, 3 partial)

| Tier | Score | Passed |
|------|-------|--------|
| Essential | 51.1 / 80 | 3 / 6 |
| Recommended | 7.8 / 20 | 3 / 9 |
| Bonus | +0.9 | 4 positive signals |

## Essential

1. **Markdown content negotiation: FAIL.** `Accept: text/markdown` on the homepage returns `text/html`, and there is no `Vary: Accept` header. Needs a Worker in front of the static assets. It must return a nonempty Markdown body with `Content-Type: text/markdown` and `Vary: Accept`, and keep serving HTML for `Accept: text/html`.
2. **Content without JavaScript: PARTIAL.** Homepage has 972 chars (1 H1, 2 H2s), but `contact.html` has 86 chars and `cooking.html` has 186. Target is at least 500 chars of real text per page.
3. **Agent-friendly 404s: PARTIAL.** The 404 status is correct, but there is no Markdown error body for `Accept: text/markdown`. The body needs at least 20 chars of explanation plus a link to the sitemap or `llms.txt`.

## Recommended

4. **JSON-LD structured data: FAIL.** Add `Person` JSON-LD to the homepage with `name`, `description`, `url` and `sameAs` (Bluesky, LinkedIn, GitHub).
5. **Metadata completeness: FAIL.** Missing canonical URL, `<html lang>`, `og:image` and `og:type`.
6. **Agent instruction / when-to-use: FAIL.** Add `llms.txt` with a "when to use this" section.
7. **Organization schema: FAIL.** Wants `contactPoint` and `address`. Probably not relevant for a personal site.
8. **Trust anchor pages: PARTIAL.** About page verified. Contact and Privacy pages are missing (each needs at least 500 chars).
9. **Brand name discoverability: FAIL.** Site is not in the top 10 for "Kelvin Ma". This is an SEO issue, not a code fix.

## Suggested order of work

1. Metadata, Person JSON-LD, and `llms.txt` (small static changes).
2. Expand `contact.html` and `cooking.html` text; consider a privacy page.
3. Add a Cloudflare Worker (via `wrangler.jsonc`) for Markdown negotiation and Markdown 404s.

## Related deploy notes

- Wrangler 4.76.0 is installed and logged in; `wrangler.jsonc` serves `.` as static assets.
- `.wranglerignore` now excludes `.claude/` and no longer excludes `resume.pdf`, `robots.txt` or `sitemap.xml`.
- A `wrangler deploy --dry-run` reported only 0.33 KiB uploaded, which looks too small. Investigate before the first real deploy.
