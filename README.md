# kelvinhanma.com

Personal website for Kelvin Ma. It's a static HTML site with no build step, served by the Cloudflare Worker `personal-website`, with kelvinhanma.com attached as a custom domain. DNS is on Cloudflare. GitHub Pages is not used.

## Pages

- `/`: Homepage with bio and projects
- `/contact`: Social media links (Bluesky, LinkedIn, GitHub, X)
- `/cooking`: Pinterest cooking board
- `/gemini-cli/`: Gemini CLI cheatsheet (git submodule)
- `/getschwifty/`: Rick & Morty Szechuan sauce tracker
- `/resume.pdf`: Résumé
- `/llms.txt`: Site summary for AI agents
- `/sitemap.xml`, `/robots.txt`

Cloudflare redirects `*.html` URLs to extensionless paths (`/contact.html` goes to `/contact`), so links and canonical URLs use the extensionless form.

## Markdown for agents

`src/worker.js` runs before the static assets:

- Requests whose `Accept` header prefers `text/markdown` get a hand-written Markdown version of the page from `md/`, with `Content-Type: text/markdown` and `Vary: Accept`.
- Missing pages return a Markdown 404 (`md/404.md`) to Markdown clients and `404.html` to browsers.
- Everything else is served unchanged from the static assets.

To add a page with a Markdown version, create `md/<page>.md`, add it to `MARKDOWN_PAGES` in `src/worker.js`, and list it in `sitemap.xml` and `llms.txt`.

## Development

```bash
wrangler dev
```

Use `wrangler dev` rather than a plain file server so that the extensionless links, the Worker, and the 404 handling work like production. To check Markdown negotiation:

```bash
curl -H 'Accept: text/markdown' http://localhost:8787/
curl -H 'Accept: text/markdown' http://localhost:8787/nope   # Markdown 404
```

## Deployment

```bash
wrangler deploy                 # publishes to production (kelvinhanma.com) immediately
wrangler versions upload        # uploads a version with a preview URL, without going live
```

Merging to `master` does not deploy anything by itself.

Before deploying:

- Make sure the `gemini-cli` submodule is checked out (`git submodule update --init`). If it isn't, `/gemini-cli/` deploys empty.
- Files that must not be public go in `.assetsignore`. That is the file Workers static assets reads; Wrangler ignores `.wranglerignore`. It currently excludes `.git/`, `.claude/`, `_notes/`, `src/`, config files, and the docs.

## Submodules

The `gemini-cli/` directory is a git submodule pointing to the [gemini-cli-cheatsheet](https://github.com/PureSin/gemini-cli-cheatsheet) repo.

To update it:

```bash
git submodule update --remote gemini-cli
git add gemini-cli
git commit -m "Update gemini-cli-cheatsheet"
```

When cloning this repo:

```bash
git clone --recurse-submodules https://github.com/PureSin/personal-website.git
```

## Leftovers

`_config.yml` and `CNAME` are from the old GitHub Pages setup and are not used.
