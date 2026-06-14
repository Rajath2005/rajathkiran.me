# Features Reference

This document breaks down every major UI and UX feature implemented within the portfolio, detailing its purpose, the technologies behind it, and the specific user benefit it provides.

---

## Page Structures

### About Page (`<article class="about">`)
- **Purpose**: Serve as the primary landing point for visitors, providing a high-level summary of skills, timeline of education, and professional identity.
- **How it works**: Uses CSS Grid for layout, displaying service cards and timeline lists.
- **Technologies used**: HTML5 semantics, Vanilla CSS (Flexbox/Grid).
- **User Benefit**: Gives a quick, scannable overview of the developer's core competencies.

### Resume Page (`<article class="resume">`)
- **Purpose**: A deep-dive into professional experience, hackathon participation, and technical skills.
- **How it works**: Renders a vertical timeline for experience, alongside a progress-bar driven "Skills Radar".
- **Technologies used**: HTML5, Vanilla CSS transitions.
- **User Benefit**: Allows recruiters to quickly assess quantifiable experience and technical proficiencies.

### Projects Page (`<article class="portfolio">`)
- **Purpose**: Showcase real-world technical projects.
- **How it works**: Users can filter projects by category (e.g., Web Design, Applications, AI/ML). Clicking a project opens a modal or navigates to a dedicated programmatic SEO page.
- **Technologies used**: Vanilla JS (for filtering logic via `script.js`), CSS Grid.
- **User Benefit**: Easy discovery of relevant technical work based on visitor interest.

### Certificates Page (`<article class="blog">`)
- **Purpose**: Validate skills through official credentials.
- **How it works**: Displays thumbnail previews of certificates. Clicking an item triggers the Modal System to view the full PDF/Image.
- **Technologies used**: HTML5, Vanilla JS.
- **User Benefit**: Builds trust and credibility instantly.

---

## Core Components

### Sidebar (`<aside class="sidebar">`)
- **Purpose**: Persistent access to identity, contact info, and social links.
- **How it works**: On desktop, it is a fixed column on the left. On mobile, it collapses into a compact header that can be expanded via an "Info" button.
- **Technologies used**: CSS Media Queries, Vanilla JS toggle.
- **User Benefit**: Keeps vital contact information accessible regardless of where the user has navigated.

### Modal System (`.modal`, `.project-modal-container`)
- **Purpose**: View high-resolution certificates or project demos without leaving the current context.
- **How it works**: A centralized JavaScript function binds to elements with `data-modal-img`. Clicking them injects the source into an absolute-positioned overlay.
- **Technologies used**: Vanilla JS, CSS `z-index`, CSS transitions.
- **User Benefit**: Prevents context-switching and reduces page loads.

### Search/Filters (Project Filter List)
- **Purpose**: Refine the project showcase by domain.
- **How it works**: Clicking a filter category iterates through project cards, applying an `active` class to matching items and hiding the rest using CSS `display` overrides.
- **Technologies used**: Vanilla JS (`forEach` loops), CSS.
- **User Benefit**: Saves recruiters time by instantly surfacing relevant domain work.

---

## Advanced Integrations

### AI Chat Assistant (`#ai-chat-panel`)
- **Purpose**: Provide instant, conversational answers about the developer's background.
- **How it works**: A dock icon opens a chat panel. Messages are sent via a Netlify Function (`ask-rajath.js`) to the Google Gemini API, which responds based on a pre-trained context prompt. Loaded dynamically via `import()` to save performance.
- **Technologies used**: Vanilla JS (Dynamic Imports), Node.js, Google Gemini API.
- **User Benefit**: Offers a novel, highly engaging way for visitors to interact with the resume.

### Three.js Background (`#bg-canvas`)
- **Purpose**: Provide a visually stunning, futuristic backdrop.
- **How it works**: Renders a WebGL scene containing rotating particles and wireframe spheres. It listens to the `data-environment` attribute to change colors and speeds dynamically. Degrades gracefully on mobile.
- **Technologies used**: Three.js (`https://cdn.skypack.dev/three@0.136.0`).
- **User Benefit**: Creates a premium "Wow" factor that differentiates the portfolio from generic templates.

---

## Visual & UX Effects

### Dark Theme Aesthetics
- **Purpose**: Provide a modern, eye-friendly viewing experience.
- **How it works**: Implemented natively via CSS Custom Properties (`--bg-gradient-jet`, `--onyx`, `--neon-blue`).
- **Technologies used**: Vanilla CSS Variables.
- **User Benefit**: Reduces eye strain and aligns with modern developer aesthetic preferences.

### Animations
- **Purpose**: Guide the user's eye and make interactions feel physical.
- **How it works**: Utilizes CSS `transition` (for hovers) and `animation` (keyframe pulses, fades).
- **Technologies used**: CSS3 Transitions & Keyframes.
- **User Benefit**: Makes the interface feel alive and highly polished.

### Mobile Experience
- **Purpose**: Ensure usability on phones and tablets.
- **How it works**: Replaces the desktop navigation bar with a fixed bottom-navigation dock. Compresses the layout into a single column.
- **Technologies used**: CSS Media Queries (`max-width: 580px`, `max-width: 768px`).
- **User Benefit**: 100% functionality parity on mobile devices without horizontal scrolling.

### Desktop Experience
- **Purpose**: Utilize screen real estate effectively.
- **How it works**: Side-by-side layout with the sidebar pinned and the main content area scrollable.
- **Technologies used**: CSS Flexbox and Grid.
- **User Benefit**: Efficient scanning of information.
