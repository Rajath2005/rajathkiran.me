# Rajath OS Boot Sequence Preloader

## Goal
Replace the existing portfolio preloader with a premium cinematic loading experience that preserves the current personal-brand identity while improving perceived quality, clarity, accessibility, and mobile behavior.

## Experience direction
The preloader uses a dark navy-black canvas with the existing blue-violet orbital ring and paper-plane/cloud mark as its signature. Subtle telemetry details create a futuristic operating-system boot impression without distracting from the identity or delaying access to the portfolio.

## Markup
The existing preloader remains the single loading overlay. Its content will be organized into:
- Accessible status container with `role="status"` and a concise screen-reader label.
- Orbital visual containing the brand mark, ring, progress arc, and restrained telemetry ticks.
- Brand lockup for the name and role labels.
- Status row containing a changing boot message and numeric progress indicator.

No new external assets or animation dependencies will be introduced.

## Motion and timing
1. The overlay appears immediately with the existing page-load behavior.
2. The orbital ring draws while the center mark gently settles into place.
3. The name reveals with a short staggered entrance.
4. Role labels and boot status appear in sequence.
5. Progress updates as document readiness advances, with a bounded fallback so the overlay cannot hang indefinitely.
6. Once the page is ready, the ring completes and the overlay exits through a smooth upward curtain/fade transition.

Animations will use CSS transforms and opacity where possible. JavaScript will only coordinate readiness, progress text, and the final state. Existing site initialization and navigation behavior must remain intact.

## Responsive and accessibility behavior
- Desktop and mobile layouts use the same semantic structure with responsive sizing.
- `prefers-reduced-motion: reduce` disables orbital travel, staggered reveals, and curtain motion, leaving a quick opacity transition.
- The loading overlay prevents accidental interaction while visible and restores page interaction after exit.
- Text maintains readable contrast and status updates are not excessively announced.
- The preloader will not rely on color alone to communicate progress.

## Performance and compatibility
- `style.css` remains the readable source of truth.
- `style.min.css` will be regenerated from the complete source stylesheet after implementation.
- All HTML pages will continue referencing the minified stylesheet.
- The implementation will use existing vanilla JavaScript patterns and will not add packages.
- Existing preloader selectors will be preserved or updated consistently across markup, CSS, and JavaScript to avoid regressions.

## Validation
- Verify the primary page in the browser at the current desktop viewport.
- Verify a narrow mobile viewport.
- Confirm the overlay exits and the main navigation becomes interactive.
- Confirm reduced-motion behavior through the browser preference where available.
- Confirm all HTML pages still load the minified stylesheet and the source/minified CSS files remain synchronized.
