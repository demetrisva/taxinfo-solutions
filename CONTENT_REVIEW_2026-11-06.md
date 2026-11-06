# Cyprus website review — 6 November 2026

## Scope and baseline

Requested: update Cyprus news and articles, and check website issues and flaws.

Source baseline: `b059fa713711bccc82f47b6a570eec10e902156b` (latest remote main when checked). The original OneDrive checkout was on an older October 4 branch with extensive existing changes. Those changes were preserved; this work uses an isolated managed checkout of current main. The first worktree attempt failed reading a OneDrive Git object; a fresh remote source clone allowed the managed worktree to be created.

## Content changes

- Added `november-2026-developments.html` with official sources and a November action table.
- Corrected individual-return summaries: October 31 remains the statutory date; the October 19 notice provides conditional interest/charge relief when the return and corresponding taxes/contributions are completed by November 30. Included the warning about reopening final TAXISnet submissions from November 1.
- Corrected the defined basic-goods VAT schedule to reflect K.D.P. 362/2026 and the 2027 extension. Kept the separate meat/fish/October-staples schedule ending May 31, 2027.
- Added the scoped October 27 Pillar Two notice, October 29 scheduled TFA maintenance notice, October 12 circular-register update and the conditional innovative-SME proposal.
- Added specific update notes to all 11 topic briefings, including crypto FAQ, payroll, deductions, corporate and dividend evidence. This is a targeted update, not certification of every legal assertion or scenario.
- Updated current homepage, guide, tools, coverage, reference, catalog and sitemap. Monthly archive pages retain their historical review dates and point readers to current developments.

## Functional issues corrected

- `parseFloat` accepted partial numeric strings in the salary/business calculation path; strict parsing now rejects malformed values.
- Unsupported salary years fell through to 2025 tax rules; they now stop with an error.
- The next-deadline widget displayed only one obligation when several shared a date; it now displays all listed obligations on that date.
- Removed advice suggesting that uncertain returns could always be amended after submission.
- Regenerated fingerprinted assets and advanced offline cache version. Added a reading-width limit for the monthly update.

## Verification

- `node --test script.test.js site.test.js`: 12 passing tests, including regression checks for malformed input, unsupported year and shared-date deadlines.
- `node --check script.js`: passed.
- `python3 audit-site.py`: 30 public pages; no detected duplicate IDs, broken local targets/fragments, missing image alt text or malformed JSON-LD. This is a bounded static audit, not a full accessibility certification.
- `node build-assets.mjs` and `node build-public.mjs`: passed. Public staging excludes reports, continuity notes and tests.
- Safari desktop preview: styled November briefing rendered; calculator accepted EUR 60,000 and showed EUR 6,870 SI/GESY, EUR 7,839 tax and EUR 45,291 net. No mobile-browser verification was completed.
- Preview-only handler omitted `upgrade-insecure-requests` for HTTP loopback because Safari otherwise attempted HTTPS asset requests. Production CSP is preserved.
- External scan: 82 distinct URLs; 17 HTTP 200, 61 HTTP 403, one HTTP 429, one refused AdSense request, two HTTP 404 at bare Google font preconnect origins. These results do not establish that government sources or font stylesheet URLs are broken.

Local evidence (excluded from publication): `audit-results/static.json`, `audit-results/external.json`, `audit-results/review-2026-11-06/sources.json` and extracted topic text under the same review directory.

## Primary sources for the material corrections

- [Individual-return conditional relief, October 19](https://www.gov.cy/oikonomia/dilosi-eisodimatos-atomou-choris-logariasmous-t-f-1-gia-to-forologiko-etos-2025/)
- [Defined basic-goods VAT extension, October 19](https://www.gov.cy/oikonomia/epektasi-tis-epivolis-midenikou-syntelesti-fpa-se-vasika-eidi-mechri-kai-tin-31i-dekemvriou-2027/)
- [Pillar Two first-cycle notice, October 27](https://www.gov.cy/oikonomia/anakoinosi-tou-tmimatos-forologias-gia-ton-peri-exasfalisis-pagkosmiou-elachistou-epipedou-forologias-ton-omilon-polyethnikon-epicheiriseon-kai-ton-egchorion-omilon-megalis-klimakas-stin-enosi-nomos-2/)
- [TFA maintenance notice, October 29](https://www.gov.cy/oikonomia/prosorini-diakopi-sti-leitourgia-tou-tax-for-all-tfa-gia-skopous-anavathmisis/)
- [Official circular register](https://www.gov.cy/mof-tax/documents/nomothesia-egkyklioi-kai-synafes-yliko-amesis-forologias/egkyklioi/)

## Remaining limits and release boundary

Direct government requests returned HTTP 403; research used accessible indexed text from official government publications. Full instrument text and the Gazette remain the authority for case-specific advice. No newly enacted change was verified for household-photovoltaic VAT, heating-oil excise, the innovative-SME proposal or the October Pillar Two amending bill. Existing reporting identifies those limits instead of asserting enactment.

AdSense activation, certified CMP operation, regional consent behavior, live hosting headers and end-to-end advertising behavior were outside this content update. Existing paused-ad behavior was preserved and checked by the test suite. No dependency update or full security audit was performed.

Publication requires merging the reviewed branch into main; that triggers the production Pages workflow. Before merging, check remote main for intervening changes. Then wait for successful deployment and verify the live November page and assets. Reverting the change commit provides the source rollback path.
