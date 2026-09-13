# AdSense audit — 14 September 2026

Assessment: **Needs Manual Action**. Ad serving is paused in this release pending verified consent configuration. The existing publisher metadata and ads.txt seller entry are preserved; no publisher or slot IDs were invented.

## Required account work

1. Confirm account ownership, site approval, Policy Center status, crawler access and ads.txt recognition in AdSense.
2. Configure and publish a Google-certified CMP with IAB TCF support for the exact domain, using Privacy & messaging or a certified provider. Verify the applicable EEA, UK and Switzerland settings. A homemade banner or a stub __tcfapi is not a substitute.
3. Test fresh and returning visits, acceptance, rejection, granular choices, withdrawal and CMP failure in the relevant regions before restoring the loader. Certification alone does not establish complete legal compliance.
4. Restore the real publisher loader once per eligible editorial page only after verification; update the regression test deliberately. Keep tools, legal, contact, search, error and offline pages excluded. Review Auto Ads overlays and mobile placements conservatively. Manual units require real account-issued slot IDs, clear Advertisement labels, responsive reserved space and separation from controls.
5. Verify live behavior after deployment without clicking your own ads.

The baseline contained 18 loaders with no duplicate loaders or manual slots found. The audit browser showed no CMP or visible ads, but its ad-host DNS request failed: this does not prove account-wide consent or serving behavior. Dashboard settings and regional consent flows remain unverified.

Confirm the operator/controller legal identity, actual vendors and retention practices against the privacy page before publication. Configure frame-ancestors as an HTTP response header at the CDN if required; a meta CSP cannot enforce it.

## Official references

- [Certified CMP requirements](https://support.google.com/adsense/answer/13554116)
- [Publisher policies](https://support.google.com/publisherpolicies/answer/10502938)
- [Ad placement policies](https://support.google.com/adsense/answer/1346295)
- [ads.txt guidance](https://support.google.com/adsense/answer/12171612)
- [EU user consent policy](https://www.google.com/about/company/user-consent-policy/)
