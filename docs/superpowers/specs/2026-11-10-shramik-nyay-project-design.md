# Shramik-Nyay Project Showcase Design

## Goal

Add Shramik-Nyay as the first, featured project in the portfolio's existing Projects section. The showcase must use the two supplied project images, link to the live application and GitHub repository, and keep the portfolio's existing visual and responsive behavior.

## Scope

- Copy the supplied README/demo collage and live-app screenshot into `assets/images/` with descriptive, repository-local filenames.
- Add a first project card to `index.html` using the existing project-card markup, filters, accessibility attributes, lazy-loading behavior, and external-link conventions.
- Describe Shramik-Nyay as a voice-first labor-rights application that helps workers document unpaid wages, validates claims against wage rules, and produces Form A and JSON drafts.
- Link the card to:
  - Live application: `https://shramik.rajathkiran.me/`
  - Source repository: `https://github.com/Rajath2005/Shramik-Nyay`
- Update the project `ItemList` structured data in `index.html`, including the item count and project metadata.
- Add a matching entry to `llms.txt` so the project is represented consistently in the portfolio's machine-readable project list.

## Visual and Responsive Behavior

The README/demo collage is the primary card image because it communicates the project's purpose at a glance. The live-app screenshot is retained as a secondary project visual using the existing image treatment; no new component is introduced.

The card inherits the current desktop split-card layout, mobile single-column layout, hover treatment, lazy image loading, reduced-motion behavior, and sticky project stack. New CSS is only warranted if validation shows an image aspect-ratio or readability problem. The card must remain keyboard accessible and must not interfere with the existing project filters.

## Content

Suggested card content:

- Title: `Shramik-Nyay`
- Category: `AI / Voice • Civic Tech`
- Description: `Voice-first wage-claim assistant for India's unorganized workers, with multilingual intake, wage-rule checks, and generated Form A and JSON drafts.`
- Technologies: `React, JavaScript, Voice AI, NLP, Rule Validation`

The live application is the primary card destination. The source repository must remain visibly available through the existing project-link pattern or a clearly labeled source action that preserves keyboard access.

## Validation

1. Confirm both image files exist under `assets/images/` and are referenced with correct relative paths and descriptive `alt` text.
2. Confirm Shramik-Nyay is the first visible project under the default All filter and remains visible under its selected category.
3. Check both external destinations, keyboard focus behavior, and the responsive card layout in the local preview.
4. Run a targeted reference check for broken asset paths and verify the project count and metadata are consistent between `index.html` and `llms.txt`.
5. Preserve unrelated worktree changes and avoid modifying unrelated project cards or styles.

## Out of Scope

- A dedicated Shramik-Nyay detail page.
- New project-card components or a new CSS system.
- Changes to the live Shramik-Nyay application.
- Replacement or deletion of existing portfolio projects.
