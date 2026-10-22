# Implementation Plan: Conservative Portfolio File Organization

**Date**: 2026-10-22 | **Spec**: [2026-10-22-portfolio-file-organization-design.md](../../specs/2026-10-22-portfolio-file-organization-design.md)

## Summary

Build a complete active-file reference graph for the redesigned portfolio, identify files used only by the previous design or otherwise unused, move only those confirmed files into `NotRequired`, and validate that the active site tree and visual/behavioral source remain unchanged. No active asset, page, stylesheet, script, content, or runtime path will be removed or rewritten.

## Technical Context

**Language/Version**: Static HTML, CSS, and browser JavaScript; Netlify-hosted serverless JavaScript
**Primary Dependencies**: Browser-native APIs, Ionicons CDN, Google Fonts CDN, Three.js CDN, PDF.js CDN, Netlify Functions
**Storage**: Static repository files; no application database
**Testing**: Reference-resolution checks, Git diff checks, and targeted browser smoke validation if available
**Target Platform**: Netlify static hosting with serverless functions
**Performance Goals**: Reduce unused repository/deployment payload without changing the redesigned page's appearance or behavior
**Constraints**: Preserve all active public routes, indirect references, redesign CSS/JS/assets, downloads, SEO files, and unrelated pre-existing working-tree changes. Archive rather than delete.

## Constitution Check

- **Preserve behavior**: PASS — active files are identified before any move and no source content is rewritten.
- **Make surgical changes**: PASS — only confirmed unused/legacy files are moved to `NotRequired`.
- **Keep errors explicit**: PASS — unresolved references stop the archive step and are reported.
- **Validate exact requirements**: PASS — validation checks local references, public routes, and baseline file integrity.
- **Avoid unrelated changes**: PASS — existing modified files are not reverted or reformatted.

## Applied Guidelines

- Repository-safe asset cleanup: treat HTML, CSS, JavaScript, configuration, sitemap, and documentation references as active inputs.
- Static-site performance: remove unused payload files from the deployment tree, but do not optimize active assets speculatively as part of this change.
- Safe archival: move files into a recoverable holding folder and preserve source-relative grouping.

## Implementation Steps

### Step 1: [Cross-cutting] Establish the active reference baseline
- **Requirements**: REQ-001, REQ-002
- **Description**: Inventory all public HTML entry points, local references, JavaScript imports and dynamic URLs, CSS assets, deployment/SEO paths, Netlify functions, downloads, and documentation links. Record the active file set and current Git status without changing existing work.

Tasks:
- [ ] T001 [Plan:1.1] Inventory active entry pages and deployment files from the repository root, including `index.html`, standalone HTML pages, `netlify.toml`, `robots.txt`, `sitemap.xml`, `llm.txt`, `llms.txt`, and the Netlify function.
- [ ] T002 [P] [Plan:1.1] Extract local HTML references, preload links, downloads, iframe URLs, canonical paths, and favicon variants from all retained HTML pages.
- [ ] T003 [P] [Plan:1.1] Extract JavaScript imports, dynamic URLs, `window.open`, location changes, CSS imports, and CSS asset URLs from active source files.
- [ ] T004 [Plan:1.1] Record the pre-change Git status and classify existing modifications as unrelated, redesign-related, or organization-related without reverting them.

### Step 2: [Cross-cutting] Classify legacy and unused files
- **Requirements**: REQ-001, REQ-003
- **Description**: Compare the repository tree against the active reference graph and classify only unreferenced previous-design files, unused duplicate formats, obsolete previews, and local artifacts as archive candidates. Treat any uncertain file as active.

Tasks:
- [ ] T005 [Plan:2.1] Build a candidate list of unreferenced root files, images, stylesheets, scripts, screenshots, document variants, and duplicate formats with a reason for each candidate.
- [ ] T006 [P] [Plan:2.1] Check candidate images and documents against active downloads, fallbacks, documentation links, and dynamic JavaScript references.
- [ ] T007 [P] [Plan:2.1] Check candidate CSS and JavaScript files against HTML references, imports, inline references, and redesign-related behavior before marking them unused.
- [ ] T008 [Plan:2.1] Exclude all uncertain candidates and all files contributing to the current layout, typography, responsive behavior, animation, 3D effects, interactions, or content.

### Step 3: [Cross-cutting] Archive confirmed unused files
- **Requirements**: REQ-003, REQ-004
- **Description**: Move only confirmed candidates into `NotRequired`, preserving enough relative structure for later review and keeping all active paths unchanged.

Tasks:
- [ ] T009 [Plan:3.1] Create the required `NotRequired` archive subdirectories that mirror the original categories only where confirmed candidates exist.
- [ ] T010 [Plan:3.1] Move the confirmed unused/legacy candidates into `NotRequired` without deleting files or modifying active source content.
- [ ] T011 [Plan:3.1] Record the archived file list and reason for each move so the user can review and restore files later.

### Step 4: [Cross-cutting] Validate preservation and performance scope
- **Requirements**: REQ-002, REQ-004, REQ-005
- **Description**: Verify all active references resolve, public routes remain available, redesign source files are unchanged, and the archive is outside the active deployment graph. Report remaining large active assets instead of moving them speculatively.

Tasks:
- [ ] T012 [Plan:4.1] Resolve every retained local HTML, CSS, JavaScript, image, favicon, resume, certificate, and function reference against the post-organization tree.
- [ ] T013 [P] [Plan:4.1] Confirm all public page entry points and deployment/SEO files remain at their expected paths.
- [ ] T014 [P] [Plan:4.1] Compare retained redesign HTML, CSS, JavaScript, and active asset contents against the pre-organization baseline and confirm no visual or behavioral source changes.
- [ ] T015 [Plan:4.1] Confirm archived files have no active references and run `git diff --check`.
- [ ] T016 [Plan:4.1] Identify remaining large active payloads and report them separately without moving or rewriting them.
- [ ] T017 [Plan:4.1] Review the final Git status and diff for unintended edits, preserving unrelated pre-existing changes.

## Requirement Mapping

| REQ ID | Description | Plan Items | Implementation Evidence |
|--------|-------------|------------|--------------------------|
| REQ-001 | Discover the complete active file/reference graph | 1.1 | Inventory and extraction tasks T001-T004 |
| REQ-002 | Preserve the redesigned portfolio's appearance and behavior | 1.1, 4.1 | Baseline capture and content comparison in T004, T012-T014 |
| REQ-003 | Identify previous-design and unused files safely | 2.1 | Candidate classification and exclusion tasks T005-T008 |
| REQ-004 | Archive confirmed unused files recoverably in `NotRequired` | 3.1, 4.1 | Archive moves and audit list in T009-T011, T015 |
| REQ-005 | Validate active references and optimization scope after organization | 4.1 | Resolution, route, diff, and payload checks T012-T017 |

## Project Structure

```text
rajathkiran.io/
├── index.html
├── ayudost.html
├── copd-detection.html
├── mediq.html
├── internship-2026.html
├── resume.html
├── assets/
├── netlify/
├── docs/
└── NotRequired/
    └── [mirrored categories for confirmed unused files]
```

## Testing Strategy

- **appType**: Static HTML site with a Netlify serverless function
- **Critical user journeys**: Homepage loads with redesigned styling and interactions; standalone project pages load; resume viewer opens; favicon and local assets resolve; AI chat function path remains configured.
- **primaryValidationStack**: Repository reference scan plus targeted browser smoke test when a local server is available.
- **fallbackMatrix**:
  - `reference-tier`: PowerShell/ripgrep path validation → manual bounded reference review.
  - `browser-tier`: Existing browser tooling → static reference and diff validation when no local server is available.
- **Environment requirements**: Git, PowerShell, repository files; Node/browser tooling only if used for smoke validation.
- **knownGaps**: A static scan cannot prove external CDN availability or remote function credentials; these are outside the file-organization scope.
- **Test data strategy**: No mutable application data; use the repository's existing files and restore no archived file unless validation identifies a missed reference.
- **Acceptance criteria**: Every active local reference resolves; all public routes remain; redesigned source and active assets are unchanged; only confirmed unused files move to `NotRequired`; `git diff --check` passes.
- **Validation review expectations**: Final review confirms no active file was archived and no visual or behavioral source was altered.

## Complexity Tracking

No constitution violations identified.
