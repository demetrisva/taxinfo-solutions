# AdSense audit — 14 September 2026

Assessment: **Needs Manual Action**. The Google European regulations message is published, but ad requests remain paused pending site approval, ads.txt recognition and live regional consent testing. The existing publisher metadata and ads.txt seller entry are preserved; no publisher or slot IDs were invented.

## Required account work

1. Confirm account ownership, site approval, Policy Center status, crawler access and ads.txt recognition in AdSense.
2. Configure and publish a Google-certified CMP with IAB TCF support for the exact domain, using Privacy & messaging or a certified provider. Verify the applicable EEA, UK and Switzerland settings. A homemade banner or a stub __tcfapi is not a substitute.
3. Test fresh and returning visits, acceptance, rejection, granular choices, withdrawal and CMP failure in the relevant regions before restoring the loader. Certification alone does not establish complete legal compliance.
4. Restore the real publisher loader once per eligible editorial page only after verification; update the regression test deliberately. Keep tools, legal, contact, search, error and offline pages excluded. Review Auto Ads overlays and mobile placements conservatively. Manual units require real account-issued slot IDs, clear Advertisement labels, responsive reserved space and separation from controls.
5. Verify live behavior after deployment without clicking your own ads.

The baseline contained 18 loaders with no duplicate loaders or manual slots found. The release tag is present only on selected editorial pages and is paused before ad requests. The audit browser could not load Google’s ad host because local DNS resolves it to `0.0.0.0`/`::`; this does not prove account-wide consent or serving behavior. Dashboard and message setup are configured, but regional consent flows remain unverified.

The operator is Demetris Valakos and the public contact is info@taxinfo.solutions. Confirm actual vendors and retention practices against the privacy page. Configure frame-ancestors as an HTTP response header at the CDN if required; a meta CSP cannot enforce it.

## Official references

- [Certified CMP requirements](https://support.google.com/adsense/answer/13554116)
- [Publisher policies](https://support.google.com/publisherpolicies/answer/10502938)
- [Ad placement policies](https://support.google.com/adsense/answer/1346295)
- [ads.txt guidance](https://support.google.com/adsense/answer/12171612)
- [EU user consent policy](https://www.google.com/about/company/user-consent-policy/)

## Signed-in inspection after deployment

On 14 September the refreshed site record shows Getting ready, with a review request at 00:19. Policy Center shows No current issues. Ads.txt is publicly accessible with the matching seller entry but Google still reports Not found. The TaxInfo-only European regulations message is Published with three user choices and the privacy URL configured. Auto Optimize is OFF, intent and overlay formats are OFF, and seven page exclusions are saved. The offered meta-tag verification matches the deployed metadata. Site approval, crawler recognition and a permitted-network regional CMP test are still outstanding; do not interpret a clear Policy Center as approval.

## Low value content rejection — 4 October 2026

AdSense reported **Low value content** (screenshot supplied by the owner). Ownership verification is complete. Changes in branch `content-refresh-2026-10-04`:

- Corrected superseded facts: annual PAYE 2025 return now 30 November 2026; zero-rate VAT order K.D.P. 354/2026 (meat/fish to 31 May 2027; bread, milk, coffee, sugar, baby food from 12 October 2026); October VAT/VIES dates; IR4 2024 due 30 November 2026.
- New `october-2026-developments.html` with worked examples; September update rebuilt on the standard briefing template.
- Removed internal audit wording from public pages ("source pass", "not verified in this review", "does not invent", audit-report references) and fixed inaccurate section/source badges.
- Added worked salary examples, a DAC8 section and additional official source links.
- Added Google's third-party advertising cookie disclosure to privacy and cookie policies.

Not fixable in code: the review also weighs site age, sustained organic traffic and Search Console indexing. Before ticking "I confirm I have fixed the issues": deploy, confirm the new pages are indexed in Search Console (submit the sitemap and request indexing of the October page), and keep publishing dated updates. Requesting review immediately after a rejection without visible changes or traffic growth risks another rejection. Ad requests remain paused in code until approval and the regional consent test are complete.
