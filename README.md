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

## Validate and build

Run `node --test script.test.js site.test.js`, `python audit-site.py`, `node build-assets.mjs`, then `node build-public.mjs`. Preview the staged `dist` directory. The workflows publish only staged public assets, excluding audit scripts, reports and repository files.

## AdSense

Ad serving is paused pending verified CMP configuration. The existing publisher metadata and ads.txt remain in place. See [ADSENSE_OPERATIONS.md](ADSENSE_OPERATIONS.md) for required account and regional testing.

## Release

The main workflow deploys the staged public directory through GitHub Pages Actions on a push to main. The fallback workflow is separately dispatched. Optional Cloudflare purge requires configured repository secrets. Validate the deployed site after a successful workflow; a local build is not a production release.
