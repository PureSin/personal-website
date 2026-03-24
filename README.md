# kelvinhanma.com

Personal website for Kelvin Ma, hosted on Cloudflare Workers.

## Pages

- `/` — Homepage with bio and projects
- `/contact` — Social media links (Bluesky, LinkedIn, GitHub, Twitter)
- `/cooking` — Pinterest cooking board
- `/assistant` — Meditation Guide project
- `/gemini-cli` — Gemini CLI cheatsheet (git submodule)
- `/getschwifty` — Rick & Morty Szechuan sauce tracker

## Development

This is a static HTML site with no build step. To preview locally:

```bash
python3 -m http.server 8000
```

## Deployment

Deployed via Cloudflare Workers using Wrangler:

```bash
wrangler deploy
```

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
