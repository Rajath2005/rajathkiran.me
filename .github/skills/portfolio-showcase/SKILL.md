---
name: portfolio-showcase
description: "Generate or refresh a professional screenshot showcase for this portfolio. Use when asked to create, update, refresh, or capture portfolio screenshots, README previews, visual showcases, or responsive website previews."
argument-hint: "[generate|refresh] the portfolio showcase"
user-invocable: true
disable-model-invocation: false
---

# Portfolio Showcase

Create a repeatable, high-quality visual showcase for the portfolio without changing its application configuration or committing changes.

## Scope and safety

- Work only in the current repository.
- Never commit, push, deploy, or modify unrelated project files.
- Do not overwrite existing project configuration, dependency manifests, lockfiles, environment files, or deployment settings.
- Do not bypass authentication, extract secrets, or place credentials in screenshots or generated files.
- Reuse existing dependencies and scripts before adding anything temporary.
- If a required tool is unavailable, report the blocker rather than creating a misleading success result.

## Procedure

### 1. Inspect the project

Before running the site, inspect:

1. The framework and entry points (`index.html`, framework configuration, and source directories).
2. The package manager and available scripts (`package.json`, lockfiles, or equivalent).
3. The existing README and any current preview/showcase sections.
4. Deployment configuration and URLs (`netlify.toml`, `vercel.json`, GitHub Pages configuration, badges, or documented URLs).
5. Existing Playwright, browser automation, screenshot, image, or preview tooling.

Prefer the repository's documented development command and deployment URL when appropriate. For this static Netlify portfolio, a local static server or `netlify dev` may be suitable; choose the least invasive command that serves the real page behavior.

Do not assume a framework, package manager, port, or URL from a previous run. Record the chosen command and URL in the final report.

### 2. Prepare browser automation without configuration churn

- Reuse an installed Playwright dependency, existing browser tooling, or an available browser automation integration.
- If Playwright is not installed, use a temporary `npx playwright` invocation or an equivalent local tool where possible. Do not edit `package.json`, lockfiles, or project configuration solely to install screenshot tooling.
- Install a browser binary only when required and only through the selected local Playwright tooling.
- Keep temporary files and caches outside the repository when possible, and clean up temporary artifacts created by the workflow.

### 3. Start and verify the site

- Start the development server only when needed.
- Use the documented command first. For a static site, use an existing Netlify command or a local static server that supports the site's asset and function requirements.
- Use a non-conflicting local port and preserve the process identifier so it can be stopped after capture.
- Verify the target URL responds and the portfolio renders before taking screenshots.
- Check for failed navigation, missing main content, console errors that affect rendering, broken images, and development overlays.
- If the site cannot be verified, stop and report the exact error instead of producing a showcase from a broken page.

### 4. Capture the responsive screenshots

Capture full-page screenshots at all of these exact viewport sizes:

| Name | Width | Height | File |
| --- | ---: | ---: | --- |
| Desktop | 1440 | 1000 | `docs/screenshots/portfolio-desktop-1440x1000.png` |
| Laptop | 1280 | 800 | `docs/screenshots/portfolio-laptop-1280x800.png` |
| Tablet | 768 | 1024 | `docs/screenshots/portfolio-tablet-768x1024.png` |
| Mobile | 390 | 844 | `docs/screenshots/portfolio-mobile-390x844.png` |
| Narrow mobile | 360 | 800 | `docs/screenshots/portfolio-narrow-mobile-360x800.png` |

For every viewport:

- Set the viewport exactly; do not rely on a device preset that changes the dimensions.
- Use full-page capture and preserve the page's natural aspect ratio.
- Prefer a consistent desktop user agent unless the page requires touch behavior to render its mobile layout.
- Set `prefers-reduced-motion: reduce` when supported, or wait for animations to settle before capture.
- Wait for DOM readiness, fonts (`document.fonts.ready`), images, and the site's meaningful network activity.
- Allow lazy-loaded content to appear by scrolling or using the page's normal loading behavior before the final full-page capture.
- Disable caret blinking and avoid hover/focus states that are not part of the normal presentation.
- Close only clearly non-sensitive cookie notices, development overlays, or transient prompts when doing so is necessary for a clean screenshot. Never submit forms or interact with authentication flows.
- Check the resulting image for loading screens, broken assets, clipped content, unexpected dialogs, or horizontal overflow. Fix the capture conditions and recapture when needed.

Do not fabricate missing content or hide real application errors. If an obstructive UI is part of the product and cannot safely be dismissed, document it in the final report.

### 5. Create the composite showcase

Create one README-ready composite locally at:

`docs/images/portfolio-showcase.png`

Use a local image library or an HTML/CSS rendering path. Reuse tools already available in the repository; otherwise use a temporary, free local tool without changing project dependencies.

The composite should:

- Use the desktop screenshot as the primary preview and include one or more mobile previews to demonstrate responsive behavior.
- Use balanced spacing, clean device frames, subtle shadows, and a background that complements the website's existing visual identity.
- Preserve screenshot proportions and never stretch or distort the page.
- Keep text and interface elements readable at the rendered README size.
- Avoid watermarks, paid templates, invented UI, or content not present in the captured screenshots.
- Be deterministic: rerunning the skill replaces this file rather than creating numbered duplicates.

If the preferred image library is unavailable, render a local HTML/CSS composition with the available browser tooling and capture that composition at a suitable resolution. Do not use an external image generation service.

### 6. Update README.md idempotently

Add or refresh exactly one bounded section using these markers:

```markdown
<!-- PORTFOLIO-SHOWCASE:START -->
## Portfolio Preview

![Portfolio showcase](docs/images/portfolio-showcase.png)

Responsive screenshots:
[Desktop](docs/screenshots/portfolio-desktop-1440x1000.png) ·
[Laptop](docs/screenshots/portfolio-laptop-1280x800.png) ·
[Tablet](docs/screenshots/portfolio-tablet-768x1024.png) ·
[Mobile](docs/screenshots/portfolio-mobile-390x844.png) ·
[Narrow mobile](docs/screenshots/portfolio-narrow-mobile-360x800.png)
<!-- PORTFOLIO-SHOWCASE:END -->
```

Rules:

- If the marker block exists, replace only its contents.
- If it does not exist, insert one section after the introductory repository description and before the first major feature section.
- Preserve all unrelated README content, formatting, links, and sections.
- Use repository-relative paths that work on GitHub; use forward slashes in Markdown paths.
- Do not create duplicate `Portfolio Preview` sections.

### 7. Verify and report

Before finishing:

1. Confirm all five raw screenshots and the composite exist and are non-empty.
2. Inspect the composite dimensions and, when image or browser tooling allows, visually inspect it for clipping, unreadable text, distortion, or broken assets.
3. Confirm every README image and screenshot link resolves to a generated file.
4. Check the final diff and ensure no dependency manifest, lockfile, environment file, or unrelated source file changed.
5. Stop any server process started by this workflow.

Report:

- The detected framework/site type, package manager, development command, and URL used.
- The exact generated files.
- The composite dimensions and the viewports captured.
- Whether the README section was inserted or refreshed.
- Any warnings, skipped checks, rendering limitations, or unresolved issues.
- Explicitly state that no commit, push, or deployment was performed.
