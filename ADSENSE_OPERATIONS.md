# AdSense Operations Checklist

This site is prepared for Google AdSense Auto Ads on monetizable editorial and reference pages.

## Current implementation

- Publisher account: `ca-pub-6942670124765473`
- Authorized seller file: `ads.txt`
- AdSense loader enabled on the homepage, guide pages, briefing pages, resources, coverage, and editorial transparency pages.
- AdSense loader intentionally omitted from legal pages, the about page, and calculator-first tool pages to reduce accidental-click and low-content placement risk.
- Privacy and cookie pages disclose Google AdSense cookies, ad measurement, personalisation where permitted, and consent requirements.

## Required dashboard checks

1. In AdSense, confirm `taxinfo.solutions` is approved under Sites.
2. Turn on Auto Ads for the approved site.
3. In Privacy & messaging, create and publish a European regulations message for `taxinfo.solutions`.
4. Confirm the message uses a Google-certified CMP with IAB TCF support for EEA, UK, and Switzerland visitors.
5. Keep ad load conservative until the site is reviewed again.

## Manual ad units

Manual in-page display units require real `data-ad-slot` IDs generated inside the AdSense dashboard. Do not invent slot IDs in the repo. Once slot IDs exist, add units only:

- between substantial content sections,
- under the visible label `Advertisement`,
- away from navigation, forms, calculator inputs, buttons, and download-style links,
- with responsive sizing and no layout overlap.

