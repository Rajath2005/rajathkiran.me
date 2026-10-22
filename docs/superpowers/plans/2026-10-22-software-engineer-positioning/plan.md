# Implementation Plan: Software Engineer Positioning

**Date**: 2026-10-22 | **Spec**: `docs/superpowers/specs/2026-10-22-software-engineer-positioning-design.md`

## Summary

Update the portfolio's professional positioning so Software Engineer is the
primary identity and Full-Stack, React.js, AI/ML, Cloud Engineering, UI/UX,
and Open Source are clearly represented specialties. The implementation is a
copy-only change across the active homepage, role script, resume metadata,
AI-search text, and README. Existing layout, styling, assets, animations,
navigation, and project behavior remain unchanged.

## Technical Context

**Language/Version**: Static HTML, CSS, and browser JavaScript (ES modules)
**Primary Dependencies**: Existing browser scripts, Ionicons, Google Fonts,
Three.js CDN; no dependency changes
**Storage**: None
**Testing**: Node syntax checks, repository text/reference checks, browser
smoke checks on the local static site
**Target Platform**: Desktop and mobile browsers
**Performance Goals**: No additional assets, requests, or runtime behavior;
copy changes must not regress the existing redesigned page load
**Constraints**: Preserve visual and behavioral redesign; use factual content
already supported by the active resume and portfolio; leave unrelated working
tree changes untouched

## Constitution Check

No project constitution file exists in the repository. The plan therefore
uses the approved specification as the governing constraint:

- Preserve the redesigned visual and behavioral experience: **PASS**
- Make precise, scoped changes: **PASS**
- Keep active resume and portfolio content factual: **PASS**
- Validate browser behavior and copy consistency: **PASS**
- Avoid dependency or asset changes: **PASS**

## Applied Guidelines

No migration or framework-transformation guideline applies. This is a static
portfolio copy and metadata update.

## Implementation Steps

### Phase 1: Homepage positioning

#### Step 1.1: [Cross-cutting] Update homepage identity and recruiter-facing copy
- **Requirements**: REQ-001, REQ-003, REQ-004, REQ-005
- **Design inputs**: Approved positioning specification; active resume
  `assets/resumes/Rajath_Kiran_A_Resume.pdf`
- **Description**: Replace stale Cloud Engineer-first title, metadata,
  structured data, sidebar tagline, About copy, internship descriptions, and
  FAQ role wording in `index.html`. Keep Cloud Engineering and every other
  specialty represented as supporting expertise.

#### Step 1.2: [Cross-cutting] Update hero role rotation and editorial marquee
- **Requirements**: REQ-001, REQ-002, REQ-005
- **Design inputs**: Approved six-specialty rotation
- **Description**: Update `assets/js/script.js` so the rotating roles are
  Full-Stack Developer, React.js Developer, AI/ML Developer, Cloud Engineer,
  UI/UX Developer, and Open Source Builder. Update the identity marquee in
  `assets/js/editorial-craft.js` so it leads with Software Engineer and
  reflects the same breadth.

### Phase 2: Supporting discovery surfaces

#### Step 2.1: [Cross-cutting] Align resume page, AI-search text, and README
- **Requirements**: REQ-005
- **Design inputs**: Homepage wording and active resume
- **Description**: Update stale professional positioning in `resume.html`,
  `llm.txt`, and `README.md` where those surfaces currently make Cloud
  Engineer the primary identity. Preserve project-specific cloud and AI
  descriptions where they are factually relevant.

### Phase 3: Validation and review

#### Step 3.1: [Cross-cutting] Validate copy coverage and stale references
- **Requirements**: REQ-002, REQ-005, REQ-007
- **Design inputs**: Requirements mapping and active-file scope
- **Description**: Search active files to confirm Software Engineer is the
  primary identity, all six specialties are present, stale primary metadata is
  removed, and the active resume path remains correct. Exclude archived
  variants and unrelated historical documentation from blocking checks.

#### Step 3.2: [Cross-cutting] Run syntax, diff, and browser smoke validation
- **Requirements**: REQ-006, REQ-007
- **Design inputs**: Existing local site at
  `http://127.0.0.1:5501/index.html`
- **Description**: Run `node --check` for changed JavaScript files,
  `git diff --check`, and desktop/mobile browser checks. Verify the page
  renders, role rotation initializes, About copy is visible, navigation
  remains functional, and no horizontal overflow or visual layout regression
  is introduced.

## Project Structure

```text
index.html
resume.html
README.md
llm.txt
assets/
  js/
    script.js
    editorial-craft.js
docs/
  superpowers/
    specs/
      2026-10-22-software-engineer-positioning-design.md
    plans/
      2026-10-22-software-engineer-positioning/
        plan.md
        checkpoints/
          spec-to-plan.yaml
          plan-to-tasks.yaml
```

## Tasks

### Phase 1: Homepage positioning

- [ ] T001 [Cross-cutting] [Plan:1.1] Update title, meta descriptions, Open Graph/Twitter metadata, structured data, sidebar tagline, About copy, internship copy, and FAQ role wording in `index.html` to lead with Software Engineer while retaining all approved specialties.
- [ ] T002 [P] [Cross-cutting] [Plan:1.2] Replace the hero role array in `assets/js/script.js` with the approved Full-Stack, React.js, AI/ML, Cloud, UI/UX, and Open Source specialties.
- [ ] T003 [P] [Cross-cutting] [Plan:1.2] Update the editorial identity marquee in `assets/js/editorial-craft.js` to include Software Engineer as the lead identity and preserve accurate specialty/proof items.

### Phase 2: Supporting discovery surfaces

- [ ] T004 [P] [Cross-cutting] [Plan:2.1] Align resume page title, description, keywords, and social metadata in `resume.html` with Software Engineer as the primary identity.
- [ ] T005 [P] [Cross-cutting] [Plan:2.1] Update conflicting professional descriptions in `llm.txt` to identify Rajath as a Software Engineer with Full-Stack, React.js, AI/ML, Cloud, UI/UX, and Open Source strengths.
- [ ] T006 [P] [Cross-cutting] [Plan:2.1] Update the visible headline in `README.md` if it still presents a narrower or conflicting primary identity.

### Phase 3: Validation and review

- [ ] T007 [Cross-cutting] [Plan:3.1] Search active HTML, JavaScript, README, and AI-search surfaces for stale Cloud Engineer-first wording and verify all six approved specialties and the active resume path are represented.
- [ ] T008 [Cross-cutting] [Plan:3.2] Run `node --check assets/js/script.js`, `node --check assets/js/editorial-craft.js`, and `git diff --check`.
- [ ] T009 [Cross-cutting] [Plan:3.2] Reload the local homepage at desktop and mobile viewport sizes and verify the new role rotation, About copy, navigation, no horizontal overflow, and unchanged redesigned layout.

## Requirement Mapping

| REQ ID | Description | Plan Items | Implementation Evidence |
|--------|-------------|------------|------------------------|
| REQ-001 | Make Software Engineer the primary professional identity | 1.1, 1.2 | `index.html`, `assets/js/script.js`, `assets/js/editorial-craft.js` |
| REQ-002 | Represent Full-Stack, React.js, AI/ML, Cloud, UI/UX, and Open Source specialties | 1.2, 3.1 | `assets/js/script.js`, `assets/js/editorial-craft.js`, homepage copy |
| REQ-003 | Replace the cloud-only sidebar tagline with broad software-engineering copy | 1.1 | `index.html` sidebar |
| REQ-004 | Expand About Me with recruiter-friendly breadth grounded in existing work | 1.1 | `index.html` About section |
| REQ-005 | Align all specified discovery and metadata surfaces | 1.1, 1.2, 2.1, 3.1 | `index.html`, `resume.html`, `llm.txt`, `README.md`, scripts |
| REQ-006 | Preserve the redesigned visual and behavioral experience | 3.2 | Browser smoke results and unchanged layout/style assets |
| REQ-007 | Validate copy consistency and browser behavior | 3.1, 3.2 | Search results, syntax checks, diff checks, browser checks |

## Testing Strategy

- **appType**: Static server-rendered HTML with browser JavaScript enhancements
- **Critical user journeys**:
  1. Homepage loads with Software Engineer identity and rotating specialties.
  2. About navigation reveals the expanded recruiter-friendly About copy.
  3. Resume download/view links still target the active resume flow.
  4. Desktop and mobile layouts retain their existing responsive behavior.
- **primaryValidationStack**: Local browser smoke testing plus Node syntax checks
- **fallbackMatrix**:
  - `browser-tier`: Built-in browser tools → static text/reference validation if
    the local server is unavailable. Prerequisite: local server for full check.
  - `syntax-tier`: Node `--check` → manual inspection if Node is unavailable.
- **Environment requirements**: Node.js, local static server, built-in browser
  tooling
- **knownGaps**: No Lighthouse run is required for this copy-only change;
  visual verification is limited to smoke checks rather than pixel comparison.
- **Test data strategy**: No test data or external state.
- **Acceptance criteria**: All requirement mappings pass, changed scripts parse,
  diff is whitespace-clean, active resume path remains valid, homepage renders
  on desktop/mobile, and no layout/interaction regression is observed.
- **Validation review expectations**: Reviewer confirms Software Engineer is
  clearly primary, Cloud Engineer remains accurately represented but not
  dominant, and no unrelated files were changed.
