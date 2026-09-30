# Homepage UX Improvement Design

## Goal

Improve homepage clarity and action discoverability without changing the portfolio's visual identity. Preserve its current palette, typography, section order, sidebar, and overall layout.

## Scope

Only the homepage introduction and its immediate actions are in scope. Site-wide navigation labels, project card styling, other pages, and the overall visual theme remain unchanged.

## Design

- Replace the sidebar's cycling typewriter role with a stable, immediately readable label: `Cloud Engineer · AI/ML Developer`.
- Condense the five-paragraph About introduction into two short paragraphs while retaining the key facts: VCET student, healthcare AI work, GCP experience, and 2026 internship availability.
- Left-align the introduction and remove the hover-only cyan recoloring so paragraph appearance does not shift with pointer position.
- Add two compact actions below the introduction: `Explore Projects` and `Download Resume`. Reuse the existing site styling. The Projects action must invoke the existing in-page Projects view and keep its navigation state correct; the Resume action links to the existing PDF.
- Do not add a project preview, new sections, a new palette, or decorative effects.

## Interaction and Accessibility

The role must be complete on initial render and remain available without JavaScript animation. Actions must have descriptive labels, work with keyboard activation, and preserve existing page navigation behavior.

## Validation

- Confirm the role label is complete and stable after load.
- Confirm the About section has two concise paragraphs with left-aligned text and no hover color change.
- Activate `Explore Projects` and verify the Projects view and active navigation state update correctly.
- Activate `Download Resume` and verify it points to the existing PDF.
- Inspect desktop and 390px mobile layouts for wrapping, overlap, or horizontal overflow.
- Run the repository's available focused checks; report unavailable checks rather than claiming them as passed.
