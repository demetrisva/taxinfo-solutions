# Worklog — taxinfo-solutions

## 2026-10-20 — Portable continuity setup
- Request: recognise this project and retain work context across PCs via OneDrive.
- Completed: created permanent identity, project guide, handover, worklog and
  agent instructions; indexed locally available chat metadata where matched.
- Verification: see the workspace PORTABLE_PROJECTS.md and portable-projects.json.
- Pending: confirm OneDrive sync on the destination PC; historical work is not
  marked completed based on chat titles.
- Live systems changed: none.

<!-- Append entries with local date/time and timezone, request, changes,
verification, relative evidence paths, pending items, and chat ID if known. -->

## 2026-11-06 — Cyprus content refresh and site checks (Asia/Nicosia)
- Request: update the website with current Cyprus developments, refresh articles and check flaws.
- Changes: new November briefing; targeted updates across all 11 topic articles and current overview/reference pages; corrected conditional filing relief, 2027 VAT schedule and amendment advice; fixed calculator parsing/year fallback and shared-date calendar display; regenerated assets/cache/sitemap.
- Baseline: remote main `b059fa7`; isolated managed branch `codex/cyprus-november-2026-refresh`. Original OneDrive changes preserved. Permanent project ID unchanged.
- Verification: 12 tests pass, script syntax check passes, 30-page static audit has no internal issues, build passes; Safari desktop briefing and EUR 60,000 salary calculation verified.
- Evidence: `CONTENT_REVIEW_2026-11-06.md`, `audit-results/static.json`, `audit-results/external.json`, `audit-results/review-2026-11-06/sources.json` (audit directory excluded from public build and Git).
- Pending: publication decision and production verification; direct government pages returned 403, mobile and live CMP/ad flows not verified; listed proposals/instruments need specific confirmation before reliance.
- Live systems changed: none at this preparation stage.
- Chat ID: `01a1b196-bb49-7962-8685-29fd2badd82a`.

Publication review: draft PR https://github.com/demetrisva/taxinfo-solutions/pull/8. Code commit `acca960`; Cloudflare Pages check reports successful branch-preview deployment. Direct preview HTTP checks returned 403, so remote rendering and public-file exclusion were not independently verified. Production publication remains pending the requested decision.


## 2026-11-06 — Approved production publication (Asia/Nicosia)
- Request/authorisation: user selected “Publish the tested update” for PR #8.
- Changes: marked PR #8 ready and squash-merged tested head `c7df8f2`; production merge commit `c43ba3cd44f1cb9f91bb5467b302d358e53d7f78`.
- Verification: 12 tests passed again before merge; GitHub Pages workflow 42251276212 completed successfully. Live browser confirmed the November article, current CSS/JS and homepage metadata `2026-11-06` after reload. Mobile article checked at 390×844; settled content width 375 with no horizontal overflow.
- Evidence: `audit-results/review-2026-11-06/release.json`; https://github.com/demetrisva/taxinfo-solutions/actions/runs/42251276212 ; https://taxinfo.solutions/november-2026-developments.html .
- Workflow cache purge was skipped; browser reload retrieved the current homepage. Direct HTTP probes still returned 403 and were not used as proof of site failure.
- Pending: full security/accessibility audit and live CMP/ad-flow verification remain outside this release; unverified tax proposals stay qualified in the public content.
- Live systems changed: taxinfo.solutions content/assets published through the existing Pages workflow. No DNS/access/advertising configuration changes.
- Chat ID: `01a1b196-bb49-7962-8685-29fd2badd82a`.


## 2026-11-06 — Header background opacity correction (Asia/Nicosia)
- Request: make header backgrounds blend more clearly with the surrounding background, using the attached Tools-page screenshot.
- Changes: made hero backgrounds transparent, reduced decorative grid/scene opacity, and replaced layered mask compositing with a single alpha mask to remove Safari’s tinted rectangle. Shared CSS applies across hero headers; text opacity is unchanged.
- Verification: Safari desktop preview on Tools shows continuous ledger background, subtle artwork and readable text; 30-page static audit reports no internal issues; fingerprinted public build passes.
- Evidence: CSS diff on branch `codex/header-background-opacity`; `audit-results/static.json`. Publication verification to follow.
- Chat ID: `01a1b196-bb49-7962-8685-29fd2badd82a`.
