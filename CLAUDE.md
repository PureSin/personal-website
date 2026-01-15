# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kelvin Ma's personal website hosted on GitHub Pages at kelvin.ma. It's a static Jekyll site using the minimal theme with custom styling.

## Site Structure

- **index.html** - Main homepage with personal bio, work experience, and navigation
- **contact.html** - Contact page with social media links (Bluesky, LinkedIn, GitHub)
- **cooking.html** - Cooking page linking to Pinterest board
- **assistant.html** - Meditation Guide project showcase page
- **_config.yml** - Jekyll configuration (theme: jekyll-theme-minimal)
- **CNAME** - Custom domain configuration for kelvin.ma
- **resume.pdf** - PDF resume file
- **img/** - Image assets (background.png, meditation-guide.png)
- **getschwifty/** - Subdirectory with Rick & Morty themed content

## Development Workflow

Since this is a Jekyll GitHub Pages site:

1. **Local Development**: Use `bundle exec jekyll serve` to run locally (if Jekyll is installed)
2. **Deployment**: Push to master branch - GitHub Pages automatically builds and deploys
3. **No build scripts**: This is a simple static site with no package.json or build process

## Architecture Notes

- Uses inline CSS in each HTML file for styling consistency
- Shared navigation structure across all pages
- Google Analytics tracking implemented on all pages (UA-107712005-1)
- Responsive design with fixed-width layout (48em)
- Custom color scheme with cream/beige background (#fdf8f4) and dark borders (#252421)

## Content Management

- All content is hardcoded in HTML files
- Images are stored in `/img/` directory
- External links point to blog.kelvinhanma.com, social media, and project repositories
- Site uses XHTML 1.0 Transitional DOCTYPE

## Domain Configuration

- Primary domain: kelvin.ma (configured via CNAME file)
- Hosted on GitHub Pages from master branch