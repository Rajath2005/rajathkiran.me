# COPD Project Redirect Design

## Goal

Send visitors from the portfolio's COPD project directly to SHWASA, the project's live respiratory-acoustics research experience, without duplicating its content or keeping outdated performance claims as the primary project story.

## Decision

- Rename the portfolio project card to `SHWASA — Respiratory Acoustic Intelligence` and use a concise, factual description of its research workspace, model pipeline, and demo.
- Link the card directly to `https://shwasa.vercel.app/` in the current tab.
- Remove the card's `data-project-url` attribute so the portfolio's project-modal handler does not intercept the click.
- Permanently redirect `/copd-detection.html` to SHWASA with a forced Netlify 301 rule placed before the catch-all rewrite.
- Remove the retired URL from `sitemap.xml`.
- Keep the existing HTML file in the repository; the hosted redirect makes it no longer the visitor-facing page.

## Rationale and Boundaries

SHWASA already presents the project premise, processing pipeline, research metrics, interactive sample demo, and non-diagnostic disclaimer. Repeating those details in the portfolio would create a second source of truth. The portfolio will identify the destination, not restate its claims.

The card's appearance and the rest of the project grid remain unchanged. Do not add an iframe, modal handoff, new page, generated marketing copy, or new performance/clinical claims. This change does not alter SHWASA itself.

## Navigation and Failure Behavior

The card uses a normal same-tab anchor. Browser Back returns visitors to the portfolio. The legacy path uses a server-side permanent redirect and does not depend on JavaScript. If SHWASA is unavailable, the browser displays its normal network error; the portfolio does not embed or simulate the destination.

## Validation

- Activate the COPD project card and verify it navigates directly to SHWASA without opening the portfolio modal.
- Request `/copd-detection.html` from the deployed site and verify a single 301 to `https://shwasa.vercel.app/` with no redirect loop.
- Verify the redirect rule precedes the catch-all rewrite and applies even while the legacy HTML file remains in the repository.
- Verify `sitemap.xml` no longer lists `/copd-detection.html`.
- Inspect the project card at desktop and mobile widths to confirm the existing layout remains intact.