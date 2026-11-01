# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kelvin Ma's personal website at kelvinhanma.com. It's a hand-written static site (no build step). It is served by the Cloudflare Worker `personal-website` (static assets plus a small Worker), with kelvinhanma.com attached as a custom domain. DNS is on Cloudflare. GitHub Pages is not enabled.

## Site Structure

- **index.html** - Homepage with bio, current work, projects, and `Person` JSON-LD
- **contact.html** - Contact page with social links (Bluesky, LinkedIn, GitHub, X)
- **cooking.html** - Cooking page linking to Pinterest board
- **llms.txt** - Agent-facing site summary with a "when to use this site" section
- **robots.txt / sitemap.xml** - Crawl config; sitemap must list only same-host URLs
- **resume.pdf** - PDF resume
- **img/** - Favicons and background.png
- **getschwifty/** - Rick & Morty themed page
- **gemini-cli/** - Git submodule (Gemini CLI cheatsheet); run `git submodule update --init` before deploying
- **_notes/** - Internal notes, excluded from deploys via `.assetsignore` (Wrangler ignores `.wranglerignore`; keep private files listed in `.assetsignore`)
- **404.html** - Not-found page for browsers (`not_found_handling: "404-page"`)
- **md/** - Hand-written Markdown versions of each page plus `404.md`, served to clients that send `Accept: text/markdown`
- **src/worker.js** - Worker that runs before assets: Markdown content negotiation, Markdown 404s, and `Vary: Accept`. Page-to-Markdown mapping lives in `MARKDOWN_PAGES`
- **wrangler.jsonc** - Cloudflare Workers config (`run_worker_first`, `ASSETS` binding, serves `.` as static assets)
- **_config.yml / CNAME** - Leftover GitHub Pages config (unused)

## Development Workflow

1. **Local**: `npx wrangler dev`, or open the HTML files directly
2. **Deploy**: `npx wrangler deploy` publishes straight to production (kelvinhanma.com), not a preview. For a preview, use `npx wrangler versions upload`
3. **No build scripts**: no package.json or build process

## Conventions

- Canonical domain is `https://kelvinhanma.com` (lowercase) in canonical links, og tags, JSON-LD, sitemap, and llms.txt
- Every page has `<html lang="en">`, a meta description, canonical link, and og:type/title/description/url/image
- No analytics currently (the old Universal Analytics tag was removed because it stopped collecting data in 2023)
- Inline CSS in each HTML file; shared nav markup copied across pages
- Fixed-width layout (48em), cream background (#fdf8f4), dark top border (#252421)
- XHTML 1.0 Transitional DOCTYPE
- When adding or removing a page, update sitemap.xml, llms.txt, `md/<page>.md`, and `MARKDOWN_PAGES` in src/worker.js too
- When editing page text, keep the matching `md/*.md` file in sync
- Test negotiation locally: `curl -H 'Accept: text/markdown' localhost:8787/`
