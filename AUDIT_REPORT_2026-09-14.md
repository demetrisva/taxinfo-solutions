# TaxInfo Solutions audit — 14 September 2026

## Release status

**Deployed successfully. AdSense: Needs Manual Action.**

GitHub authentication was restored by the owner and verified. The release checkout passes 10 regression tests, the 28-page static audit and the public build. Release commit `d0a4001934d028113675279bbb83ad09076aaa40` deployed successfully in [Pages run 34783646472](https://github.com/demetrisva/taxinfo-solutions/actions/runs/34783646472). The working repository also contains a corrupt Codex checkpoint ref that prevents fetch; it was left intact. A public clean checkout at `175dd37fa93f5832a128eb00fe95e6e8fa57a0d6` was used to reconcile the latest production security/build changes. The pre-existing `.DS_Store` deletion was preserved.

## Implemented corrections

- Salary calculator: corrected annualised 2025 and 2026 SI ceilings, GESY ceiling, child deductions and shared housing/rent limit. New deductions apply only to 2026. Invalid inputs hide stale results; zero is accepted. First-employment relief now stops the estimate pending verification of interacting deduction limits. Family eligibility and single-parent uplift remain outside the model.
- Fixed a real chart callback failure, improved site search across all 12 briefings and chronological deadline selection, and prevented hidden mobile navigation from receiving focus.
- Added explicit 404 and offline pages. Cached offline content warns about possible staleness. Service-worker cache cleanup is scoped to this site.
- Deployment stages only public files. Audit scripts, reports and repository internals are excluded. Preserved upstream Chart.js pin/SRI and CSP improvements. Removed ineffective frame-ancestors meta directives; CDN response-header configuration remains an owner action.
- Added contact and disclaimer pages and reconciled privacy/cookies/terms with paused advertising. Added publication/review distinctions and a dated editorial correction record; original article publication dates remain intact.

## Article review

All 11 existing briefing files were reviewed and edited. The review corrected or qualified corporate transition and deferred-tax treatment; profit-year scope of dividend SDC; crypto exclusions and loss rules; NID and IP Box arithmetic; approved share-plan conditions; residency day counting and 60-day conditions; VAT lists and deadlines; payroll assumptions; housing documentation; salary examples; and provisional-tax guidance. Reference and guide pages were aligned where discrepancies were found.

This is not a certification that every tax statement has been independently established from operative legislation. The claimed housing VAT transition extension to 15 June 2027 remains explicitly unverified. Some official PDFs/sites returned access or certificate errors. Special exemption interactions, eligibility and transitional cases need professional/source follow-up.

## New developments

`september-2026-developments.html` records five dated official announcements after 17 August: fuel excise relief extension, proposed child-benefit changes, scheduled tax-system maintenance, Honduras bond-yield information for NID, and residence certificates for imaging centres. Proposals are distinguished from enacted rules; the maintenance notice does not imply restoration or a filing extension. The 14 September follow-up search yielded no additional verified tax-rule announcement. This is selected coverage, not an exhaustive government/regulator register.

## AdSense findings

The baseline contained 18 loaders, no duplicate loaders or manual slots found, and a consistent existing publisher ID. All loaders are removed in this local release pending verified CMP configuration; publisher metadata and the real ads.txt seller entry remain. Baseline live ads.txt returned HTTP 200. No made-up CMP, consent API or slot ID was added.

The audit browser displayed no CMP or visible ads, but the ad host had a DNS failure in this environment. Regional consent, account approval, Policy Center, crawler diagnostics, actual fill and Auto Ads settings remain unverified. Ads being paused eliminates ad placement and ad-request overhead in the prepared build; no numeric Core Web Vitals improvement is claimed.

Privacy/legal pages now describe the prepared behavior, but operator/controller identity, actual vendor configuration and retention require owner confirmation. See ADSENSE_OPERATIONS.md for precise account and regional test steps. AdSense readiness cannot be certified without those checks and live validation.

## Validation evidence and limits

- Node regression suite: 10 tests pass, covering calculator boundaries, deductions, chart callback, deadline order and paused publisher configuration.
- Static audit: 28 content pages; zero detected internal-link, fragment, duplicate-ID, image-alt, H1 or JSON-LD issues. 54 external URLs inventoried. This does not establish complete accessibility or schema eligibility.
- Baseline production crawl: existing public routes, ads.txt, robots and sitemap returned 200; a deliberately nonexistent route returned 404.
- External-source checks encountered government 403 responses, local certificate failures and rate limits. Those are verification limits, not evidence the linked documents were deleted.
- Browser: desktop calculator at EUR 60,000 produced EUR 6,870 contributions, EUR 7,839 income tax and EUR 45,291 net, with a rendered chart and no error entries in the fresh QA tab. Mobile calculator screenshot showed readable controls and no horizontal document overflow (375px content width). Earlier desktop/mobile search checks found crypto briefings.
- Fingerprinted asset build and isolated public staging pass. Production baseline has HTTPS/HSTS and nosniff. No database, authentication backend or package dependency tree is present.
- Full cross-browser/device coverage, regional CMP flows, Lighthouse/field CWV, Search Console indexing, account security and post-deployment checks remain incomplete. No test of email delivery was performed.

## Primary sources

- [Cyprus Ministry of Finance tax incentives](https://www.gov.cy/mof/en/documents/tax-incentives/): NID/IP Box, crypto, share plans and dividend scope.
- [Tax Department residency and domicile](https://www.gov.cy/mof-tax/en/documents/tax-residency-domicility/): day counting and residency conditions.
- [Tax Department individual return guidance](https://www.gov.cy/mof-tax/documents/forologiki-dilosi-eisodimatos-atomoy/): filing arrangements.
- [Tax Department self-employed guidance](https://www.gov.cy/mof-tax/documents/aytoergodotoymenoi/): provisional-tax test.
- [2026 Social Insurance ceiling](https://sisweb.mlsi.gov.cy/anotato2025/): monthly cap.
- [GESY financing](https://www.gesy.org.cy/sites/Sites?d=Desktop&locale=en_US&lookuphost=%2Fen-us%2F&lookuppage=hiofinancing): contribution rate and ceiling.
- [IAS 12](https://www.ifrs.org/issued-standards/list-of-standards/ias-12-income-taxes/): deferred-tax treatment.
- The new developments page links each of its five original government notices beside the corresponding section.
- [Google CMP requirements](https://support.google.com/adsense/answer/13554116), [publisher policies](https://support.google.com/publisherpolicies/answer/10502938), [ad placement](https://support.google.com/adsense/answer/1346295), and [ads.txt](https://support.google.com/adsense/answer/12171612) underpin the AdSense assessment.

## Remaining release steps

Authentication, reconciliation against current main, diff review and pre-release checks are complete. Deploy via the configured Pages workflow and validate public routes/assets, cache rollover, security headers and ads.txt. Do not restore advertising until the separate CMP/account requirements are satisfied.

## Post-deployment verification

The Pages workflow passed its regression tests, build, staging and deployment. Cloudflare purge was skipped because repository secrets are absent. All 28 content routes plus the Google verification page returned 200; ads.txt, robots.txt and sitemap returned 200; the nonexistent probe returned 404. The live fingerprinted JS/CSS, service worker and ads.txt match the release. HTML and robots differ because of Cloudflare email protection, bot-protection injection and managed robots content; these are not stale release files. HSTS and nosniff remain present. Sampled live pages contain no AdSense loaders.

A fresh live browser visit verified EUR 60,000 gross -> EUR 6,870 contributions, EUR 7,839 income tax and EUR 45,291 net, with no console errors observed. Live search returns the crypto briefing.

Signed-in AdSense inspection after refresh: taxinfo.solutions is **Getting ready**, review requested 14 September 2026 at 00:19 (displayed account time). The current Policy Center says **No current issues**; this is not site approval. The account still reports ads.txt **Not found**, despite the verified public 200 response and matching real seller record. European regulations messaging presents initial setup with no configured message. Metadata verification offered by the dashboard matches the preserved publisher meta tag. No repeat review request, payment change, consent publication or ad enablement was performed.

Outstanding: operator/controller legal details requested from owner; certified CMP setup and regional testing; Google approval and ads.txt recognition; optional CDN headers/cache configuration; remaining tax-source and broader device/performance checks described above. Advertising remains paused.
