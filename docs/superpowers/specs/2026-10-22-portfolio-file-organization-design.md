# Portfolio File Organization Design

## Goal

Organize the repository conservatively after the portfolio redesign by keeping all files required by the deployed site and archiving only files proven to be unused or redundant in `NotRequired`.

## Scope

The organization work covers the static portfolio pages, their directly and indirectly referenced assets, deployment/SEO files, serverless functions, and clearly obsolete or duplicate files. It does not redesign the site, alter page content, or rewrite the asset structure unnecessarily.

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

Existing documentation and repository configuration remain unless separately proven unrelated to the deployed portfolio.

## Archive policy

Files may be moved into `NotRequired` only when repository-wide inspection confirms that they are:

1. Not referenced by any retained HTML, CSS, JavaScript, configuration, sitemap, or documentation path that is part of the active repository workflow; and
2. A duplicate, obsolete artifact, or non-deployed local preview/source file.

Moving is preferred over deletion so archived files remain recoverable. The archive should preserve enough of the original relative grouping to make restoration understandable.

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

No file will be deleted as part of this work, and no visual or behavioral changes are intended.
