# Portfolio File Organization Design

## Goal

Organize the repository conservatively after the portfolio redesign by keeping all files required by the deployed site and archiving all files proven to be unused or redundant in `NotRequired`. The purpose is to reduce unnecessary repository and deployment weight so optimization work is not undermined by legacy files.

## Scope

The organization work covers the static portfolio pages, their directly and indirectly referenced assets, deployment/SEO files, serverless functions, and clearly obsolete or duplicate files. It does not redesign the site, alter page content, or rewrite the asset structure unnecessarily.

## Preservation constraint

The current redesigned portfolio is the baseline and must remain visually and behaviorally unchanged. This work must not remove, replace, simplify, or rewrite the redesigned layout, typography, colors, responsive behavior, animations, 3D effects, interactions, content, or active assets. Any file that contributes to the current appearance or behavior is active, even if it is loaded indirectly or appears to be an older-format fallback. File organization is the only intended change. Archiving unused files must not be confused with removing resources from the active site.

## Active portfolio surface

The following public pages remain at their current paths:

- `index.html`
- `ayudost.html`
- `copd-detection.html`
- `mediq.html`
- `internship-2026.html`
- `resume.html`

All files referenced by these pages, including CSS, JavaScript, images, favicons, downloads, certificates, resumes, and imported modules, remain in their current locations unless a move is proven safe and all references are updated.

The following operational and discovery files remain active:

- `netlify.toml`
- `robots.txt`
- `sitemap.xml`
- `googlea36e3a90d6a5f545.html`
- `llm.txt`
- `llms.txt`
- `netlify/functions/ask-rajath.js`

Existing documentation and repository configuration remain unless separately proven unrelated to the deployed portfolio. The redesign-related CSS and JavaScript files remain in place unless a reference-preserving move is explicitly verified without changing runtime behavior.

## Archive policy

Files may be moved into `NotRequired` when repository-wide inspection confirms that they are:

1. Not referenced by any retained HTML, CSS, JavaScript, configuration, sitemap, or documentation path that is part of the active repository workflow; and
2. A legacy file from the previous design, an unused duplicate format, an obsolete artifact, or a non-deployed local preview/source file.

Moving is preferred over deletion so archived files remain recoverable. The archive should preserve enough of the original relative grouping to make restoration understandable.

The archive is intentionally a holding area for the user's later review. It may contain files that are not needed by the current redesign but were valid parts of the previous version. No archived file is considered permanently deleted.

## Reference analysis

Before any move, inspect:

- HTML `href`, `src`, preload, download, canonical, and iframe references.
- JavaScript imports, dynamic URLs, `window.open`, downloads, and location changes.
- CSS imports and asset URLs.
- Sitemap and deployment configuration paths.
- Documentation links that are intentionally maintained as repository entry points.

Dynamic or indirect references count as active references. A file with multiple format variants is retained when the active page uses that format; unused variants may be archived only after checking that no fallback, download, or documentation link requires them.

## Validation

After organization:

1. Verify every local reference resolves to an existing retained file.
2. Verify all public page entry points still exist.
3. Verify favicon, stylesheet, script, image, resume, certificate, and function references.
4. Run `git diff --check`.
5. Review the complete Git status and diff to ensure only intended moves and related path updates occurred.
6. Do not overwrite or revert unrelated pre-existing working-tree changes.
7. Compare the retained redesign files and their references against the current baseline; no visual or behavioral source changes are permitted.
8. Confirm that archived files are absent from the active deployment graph, while retained files preserve the same page behavior and appearance.
9. Check the retained tree for unnecessarily duplicated active payloads and report any remaining large active assets separately rather than moving them speculatively.

No file will be deleted as part of this work, and no visual or behavioral changes are permitted.
