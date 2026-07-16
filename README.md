# TaxInfo Solutions — Site

This repository contains a lightweight static site for TaxInfo Solutions.

## Design and responsive behavior

- Light-first editorial interface designed for reference reading and repeated use.
- Responsive navigation with dedicated search and menu controls.
- Shared layouts for guides, briefings, rate tables, calculators, and legal pages.
- Fingerprinted CSS/JavaScript assets and a versioned service-worker cache.
- Mobile layouts tested at compact browser viewports with stable type and controls.

## Run locally

```bash
cd /path/to/repo
python3 -m http.server 8000
# open http://localhost:8000
```

## Build fingerprinted assets (cache-safe)

This project includes a local no-dependency build script that:
- minifies `style.css` and `script.js`
- generates fingerprinted files like `style.<hash>.min.css` and `script.<hash>.min.js`
- updates all `.html` pages to reference the latest fingerprinted files

Run:

```bash
node build-assets.mjs
```

## AdSense setup

The site includes the AdSense publisher tag on monetizable editorial/reference pages and keeps legal and calculator-first pages unmonetized by default. See `ADSENSE_OPERATIONS.md` for the policy and dashboard checklist before requesting another AdSense review.

## Make it live (GitHub Pages)

1. Push this repo to GitHub (main branch).
2. Option A — GitHub Pages (easiest): enable Pages in repository Settings → Pages → branch `gh-pages` (or `main` / `docs/` as you prefer).
3. Option B — Automated deploy using GitHub Actions (workflow provided). Ensure the repository's default branch is `main` and push.

The included workflow `./.github/workflows/gh-pages.yml` will publish the repository contents to the `gh-pages` branch automatically on push to `main`.

If you want, I can also help configure a custom domain and HTTPS after deployment.
