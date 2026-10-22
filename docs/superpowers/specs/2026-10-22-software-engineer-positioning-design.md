# Software Engineer Positioning Design

**Date:** 2026-10-22  
**Status:** Design approved in conversation; awaiting written-spec review

## Goal

Present Rajath Kiran A as an overall **Software Engineer** rather than
primarily as a Cloud Engineer, while accurately showing the breadth of his
work across full-stack development, React.js, AI/ML, cloud engineering, UI/UX,
and open-source development.

The existing redesigned visual experience must remain unchanged.

## Content Direction

### REQ-001: Primary identity

Use **Software Engineer** as the primary professional identity in the hero,
page metadata, structured data, resume page metadata, and supporting
descriptions.

### REQ-002: Rotating specialties

The hero role rotation will use:

1. Full-Stack Developer
2. React.js Developer
3. AI/ML Developer
4. Cloud Engineer
5. UI/UX Developer
6. Open Source Builder

Cloud Engineer remains represented as a genuine specialization but is no
longer the default or dominant identity.

### REQ-003: Sidebar tagline

Replace the cloud-focused tagline with:

> Building thoughtful software across full-stack development, AI/ML, cloud
> engineering, and user experience.

### REQ-004: About section

The About section will introduce Rajath as a Software Engineer and Computer
Science Engineering student at Vivekananda College of Engineering &
Technology (VCET). It will describe practical work across:

- React.js, Node.js, Python, APIs, and full-stack applications
- TensorFlow, PyTorch, CNN/LSTM, NLP, and RAG systems
- Google Cloud Platform, GKE, Docker, load balancing, and scalable
  infrastructure
- Figma and UI/UX design
- AyuDost and COPD Detection healthcare projects
- Open-source development and continuous learning

The copy will remain recruiter-friendly and factual, using the technologies
and projects already represented in the portfolio and active resume.

## REQ-005: Consistency Surfaces

Only identity and related copy surfaces will be updated:

- `index.html`
  - document title and metadata
  - Open Graph and Twitter descriptions
  - Schema.org description, job title, and internship description
  - hero/sidebar copy
  - About section
  - FAQ role response
- `assets/js/script.js`
  - rotating hero roles
- `assets/js/editorial-craft.js`
  - editorial identity marquee
- `resume.html`
  - resume page metadata
- `llm.txt`
  - AI-search professional descriptions where they conflict
- `README.md`
  - visible portfolio headline if it conflicts

The active downloadable resume remains:
`assets/resumes/Rajath_Kiran_A_Resume.pdf`.

## REQ-006: Preserve redesigned experience

The implementation will not modify:

- Layout structure or responsive styling
- Colors, typography, images, or icons
- Navigation, animation, or interaction behavior
- Project descriptions unrelated to professional positioning
- The active resume PDF
- Archived resume variants in `NotRequired`
- Existing working-tree changes unrelated to this request

## REQ-007: Validation

The implementation plan will require:

1. Searching active pages and scripts for stale primary Cloud Engineer
   positioning.
2. Confirming all six specialties remain represented.
3. Checking that About, FAQ, metadata, structured data, and AI-search copy
   consistently identify Rajath as a Software Engineer.
4. Running JavaScript syntax checks.
5. Running `git diff --check`.
6. Reloading the local redesigned site and verifying the new role rotation and
   About copy.
7. Confirming the layout remains visually and behaviorally unchanged.
