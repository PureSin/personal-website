// Serves the static site and adds Markdown content negotiation for agents.
//
// - Requests whose Accept header prefers text/markdown get a hand-written
//   Markdown version of the page (from /md/*.md) when one exists.
// - Missing pages return a Markdown 404 body to Markdown clients and
//   404.html to everyone else.
// - Responses for negotiated pages carry `Vary: Accept` so caches keep the
//   HTML and Markdown variants apart.

const MARKDOWN_PAGES = {
  "/": "/md/index.md",
  "/index": "/md/index.md",
  "/index.html": "/md/index.md",
  "/contact": "/md/contact.md",
  "/contact.html": "/md/contact.md",
  "/cooking": "/md/cooking.md",
  "/cooking.html": "/md/cooking.md",
};

const NOT_FOUND_MARKDOWN = "/md/404.md";
const MARKDOWN_TYPE = "text/markdown; charset=utf-8";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const negotiable = request.method === "GET" || request.method === "HEAD";
    const wantsMarkdown = negotiable && prefersMarkdown(request.headers.get("Accept"));
    const markdownPath = MARKDOWN_PAGES[url.pathname];

    if (wantsMarkdown && markdownPath) {
      const md = await fetchAsset(env, url, markdownPath, request.method);
      if (md.ok) return markdownResponse(md, 200);
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status === 404 && wantsMarkdown) {
      const md = await fetchAsset(env, url, NOT_FOUND_MARKDOWN, request.method);
      if (md.ok) return markdownResponse(md, 404);
    }

    // Pages with a Markdown variant, and 404s, depend on Accept.
    if (markdownPath || response.status === 404) {
      return withVaryAccept(response);
    }
    return response;
  },
};

// True when the client ranks text/markdown at least as high as text/html.
// Browsers never list text/markdown, so they always get HTML.
export function prefersMarkdown(accept) {
  if (!accept) return false;
  let markdown = 0;
  let html = 0;
  for (const part of accept.split(",")) {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    let q = 1;
    for (const p of params) {
      const [key, value] = p.trim().split("=");
      if (key === "q") q = Number.parseFloat(value) || 0;
    }
    const mediaType = type.trim();
    if (mediaType === "text/markdown" || mediaType === "text/x-markdown") {
      markdown = Math.max(markdown, q);
    } else if (mediaType === "text/html" || mediaType === "application/xhtml+xml") {
      html = Math.max(html, q);
    }
  }
  return markdown > 0 && markdown >= html;
}

function fetchAsset(env, url, path, method) {
  return env.ASSETS.fetch(new Request(new URL(path, url), { method }));
}

function markdownResponse(asset, status) {
  const headers = new Headers(asset.headers);
  headers.set("Content-Type", MARKDOWN_TYPE);
  headers.set("Vary", "Accept");
  return new Response(asset.body, { status, headers });
}

function withVaryAccept(response) {
  const headers = new Headers(response.headers);
  const vary = headers.get("Vary");
  if (!vary) {
    headers.set("Vary", "Accept");
  } else if (!/(^|,)\s*accept\s*(,|$)/i.test(vary)) {
    headers.set("Vary", `${vary}, Accept`);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
