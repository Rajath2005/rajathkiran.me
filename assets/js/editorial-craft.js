/**
 * EDITORIAL STUDIO CRAFT CONTROLLER v5.0 (editorial-craft.js)
 * Top-1% Design-Engineer UX Suite:
 * 1. Strictly Light & Dark Mode Switcher
 * 2. Proof-of-Work Bento Grid above "What I'm Doing"
 * 3. Rich Editorial Case-Study Drawer (Replaces "Preview Not Available" error screen)
 * 4. Sticky Scroll-Depth Card Scaling Physics
 * 5. 1-Click Copy Email Utility + Live Mangalore IST Clock
 * 6. Context-Aware Pill Cursor
 */

const CASE_STUDY_DATA = {
  'copd': {
    eyebrow: 'HEALTHCARE AI · DEEP LEARNING RESEARCH · ICBHI 2017',
    problem: 'Traditional spirometry for COPD diagnosis requires clinical hardware and trained technicians, delaying early screening in rural and remote clinics. The ICBHI 2017 dataset provides 920 recordings with 6,898 annotated respiratory cycles — enabling a purely acoustic, hardware-free screening approach.',
    architecture: 'Designed a CNN-LSTM hybrid model for automated COPD binary detection and 4-class GOLD severity grading on 6,898 annotated respiratory cycles. Built an end-to-end audio preprocessing pipeline: noise reduction, 22,050 Hz resampling, 128-band Mel-spectrograms, and 40-coefficient MFCCs — targeting >90% accuracy.',
    stack: ['Python', 'PyTorch / TensorFlow', 'CNN-LSTM', 'Librosa (MFCC / Mel)', '6,898 Respiratory Cycles', 'ICBHI 2017 Dataset']
  },
  'mediq': {
    eyebrow: 'FULL-STACK HEALTHCARE PLATFORM',
    problem: 'Patients seeking integrative & Ayurvedic care lack a structured digital platform to track symptoms, consult AI-guided wellness plans, and manage health records.',
    architecture: 'Engineered a full-stack React.js & Supabase platform with PostgreSQL Row-Level Security, real-time symptom analysis workflows, and Gemini AI clinical guidance.',
    stack: ['React.js', 'Supabase', 'PostgreSQL', 'Node.js', 'Gemini AI']
  },
  'ayudost': {
    eyebrow: 'NLP & 10-STEP RAG CLINICAL ASSISTANT',
    problem: 'Generic LLMs hallucinate when asked about classical Ayurvedic formulations, dosages, and prakriti-specific contraindications — requiring a grounded, multi-source retrieval architecture with hallucination checks.',
    architecture: 'Architected a 10-step RAG pipeline combining Pinecone vector search, MongoDB keyword search, and a Gemini hallucination-check stage to power AyurChat. Shipped full-stack production app with Node.js/Express REST APIs, PostgreSQL/Supabase, appointment booking, and CI/CD; maintaining an open-source repo with 20+ contributors.',
    stack: ['React.js', 'Node.js & Express', 'Pinecone Vector DB', 'MongoDB', 'Gemini AI (Hallucination Check)', 'Supabase PostgreSQL', 'Docker & CI/CD']
  },
  'cloud': {
    eyebrow: 'GOOGLE CLOUD INFRASTRUCTURE & KUBERNETES',
    problem: 'Single-VM deployments suffer from downtime during traffic spikes and lack automated container orchestration or distributed SQL consistency.',
    architecture: 'Architected multi-VM Compute Engine clusters behind Global HTTP(S) Load Balancers, auto-scaling microservices on GKE, Pub/Sub event buses, and Cloud Spanner SQL.',
    stack: ['Google Cloud (GCP)', 'Kubernetes (GKE)', 'Docker', 'HTTP(S) LB', 'Cloud Spanner']
  }
};

export function initEditorialCraft() {
  const savedTheme = localStorage.getItem('rk_theme_mode') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  const preloader = document.getElementById('premium-preloader');
  if (preloader) preloader.setAttribute('data-pl-theme', savedTheme);

  mountLightDarkDock(savedTheme);
  initNotebookRulers();
  initCursorGlowCanvas();
  initGurjotCursor();
  enhanceHeroAndProofBento();
  mountHeroBuilderDeck();
  decorateHeroProjectBadges();
  numberProjectCaseStudies();
  upgradeProjectFallbackToCaseStudy();
  initStickyStackDepthEffect();
  initCopyEmailAndLiveClock();
  injectHandwrittenFooter();
  upgradeResumeToExecutiveDossier();
  initSpringSlidingPills();
  initMagneticButtons();
  initProjectCardSpecFlip();
}

// ============================================================================
// 1. STRICT LIGHT / DARK TOP-RIGHT SWITCHER
// ============================================================================
function mountLightDarkDock(initialTheme) {
  document.getElementById('executive-top-bar')?.remove();
  document.getElementById('awwwards-top-bar')?.remove();
  document.getElementById('env-matrix-switcher')?.remove();
  document.getElementById('theme-toggle-dock')?.remove();

  const dock = document.createElement('div');
  dock.id = 'theme-toggle-dock';
  dock.className = 'theme-toggle-dock';
  dock.setAttribute('aria-label', 'Theme Mode Switcher');
  dock.innerHTML = `
    <button type="button" class="theme-pill-btn ${initialTheme === 'light' ? 'active' : ''}" data-set-theme="light">
      <ion-icon name="sunny-outline"></ion-icon>
      <span>Light</span>
    </button>
    <button type="button" class="theme-pill-btn ${initialTheme === 'dark' ? 'active' : ''}" data-set-theme="dark">
      <ion-icon name="moon-outline"></ion-icon>
      <span>Dark</span>
    </button>
  `;
  document.body.appendChild(dock);

  dock.querySelectorAll('.theme-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-set-theme');
      document.body.setAttribute('data-theme', mode);
      localStorage.setItem('rk_theme_mode', mode);
      dock.querySelectorAll('.theme-pill-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================================================
// 1b. NOTEBOOK RULER MARGINS (Gurjot-inspired measurement rulers)
// ============================================================================
function initNotebookRulers() {
  if (document.querySelector('.notebook-ruler')) return;
  const left = document.createElement('div');
  left.className = 'notebook-ruler notebook-ruler--left';
  left.setAttribute('aria-hidden', 'true');

  const right = document.createElement('div');
  right.className = 'notebook-ruler notebook-ruler--right';
  right.setAttribute('aria-hidden', 'true');

  document.body.appendChild(left);
  document.body.appendChild(right);
}

// ============================================================================
// 1c. CURSOR-REACTIVE GLOW CANVAS (grid dots light up near cursor)
// ============================================================================
function initCursorGlowCanvas() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (document.getElementById('cursor-glow-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-glow-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let mouseX = -999, mouseY = -999;
  let animX = -999, animY = -999;
  let rafId = null;
  let isActive = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isActive) {
      isActive = true;
      canvas.classList.add('active');
      if (!rafId) rafId = requestAnimationFrame(render);
    }
  });

  document.addEventListener('mouseleave', () => {
    isActive = false;
    canvas.classList.remove('active');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  function render() {
    rafId = null;
    if (!isActive) return;

    // Smooth lerp follow
    animX += (mouseX - animX) * 0.12;
    animY += (mouseY - animY) * 0.12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const radius = 180;

    // Draw radial gradient glow around cursor
    const gradient = ctx.createRadialGradient(animX, animY, 0, animX, animY, radius);
    if (isDark) {
      gradient.addColorStop(0, 'rgba(129, 140, 248, 0.12)');
      gradient.addColorStop(0.4, 'rgba(108, 92, 231, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(108, 92, 231, 0.08)');
      gradient.addColorStop(0.4, 'rgba(108, 92, 231, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw highlighted dots near cursor
    const dotSpacing = 28;
    const highlightRadius = 140;
    const startX = Math.max(0, Math.floor((animX - highlightRadius) / dotSpacing) * dotSpacing);
    const endX = Math.min(canvas.width, animX + highlightRadius);
    const startY = Math.max(0, Math.floor((animY - highlightRadius) / dotSpacing) * dotSpacing);
    const endY = Math.min(canvas.height, animY + highlightRadius);

    for (let x = startX; x <= endX; x += dotSpacing) {
      for (let y = startY; y <= endY; y += dotSpacing) {
        const dist = Math.hypot(x - animX, y - animY);
        if (dist < highlightRadius) {
          const intensity = 1 - (dist / highlightRadius);
          const dotRadius = 1.2 + intensity * 1.8;
          const alpha = intensity * (isDark ? 0.55 : 0.35);
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(165, 180, 252, ${alpha})`
            : `rgba(108, 92, 231, ${alpha})`;
          ctx.fill();
        }
      }
    }
    rafId = requestAnimationFrame(render);
  }
}

// ============================================================================
// 2. ALWAYS-VISIBLE GURJOT-STYLE CURSOR (Arrow + Context Label)
// ============================================================================
function initGurjotCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  // Remove old pill cursor if exists
  document.getElementById('craft-pill-cursor')?.remove();

  const cursor = document.createElement('div');
  cursor.className = 'gurjot-cursor';
  cursor.innerHTML = `
    <svg class="gurjot-cursor__arrow" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L1 17.38L5.24 13.48L9.12 21L12.18 19.62L8.3 12.06L14 11.38L1 1Z"
            fill="currentColor" stroke="white" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
    <span class="gurjot-cursor__label"></span>
  `;
  document.body.appendChild(cursor);

  const arrowEl = cursor.querySelector('.gurjot-cursor__arrow');
  const labelEl = cursor.querySelector('.gurjot-cursor__label');

  // Update arrow color based on theme
  function syncCursorTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    arrowEl.style.color = isDark ? '#f8fafc' : '#111827';
  }
  syncCursorTheme();
  // Watch for theme changes
  const themeObs = new MutationObserver(syncCursorTheme);
  themeObs.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let currentLabel = '';
  let isHovering = false;

  // Comprehensive context rules — page-aware labels for every section
  const CONTEXT_RULES = [
    // Navigation
    { selector: '.navbar-link', label: 'Navigate' },
    { selector: '.theme-pill-btn', label: 'Switch theme' },

    // About page
    { selector: '.avatar-box', label: 'Hello 👋' },
    { selector: '.craft-cta-pill', label: 'Explore ↗' },
    { selector: '.craft-proof-card', label: 'Verify proof ↗' },
    { selector: '.open-to-work-badge', label: 'Available 2026' },

    // Projects page
    { selector: '.project-item > a', label: 'View case study ↗' },
    { selector: '.filter-item button', label: 'Filter' },

    // Resume page
    { selector: '.resume-btn', label: 'Download ↓' },
    { selector: '.resume-btn-view', label: 'View resume ↗' },
    { selector: '.scrubber-year-btn', label: 'Jump to year' },
    { selector: '.skill-matrix-chip', label: 'Inspect skill' },
    { selector: '.ledger-entry', label: 'Read more' },
    { selector: '.honour-badge-card', label: 'View honour' },
    { selector: '.rj-pill', label: 'Jump ↓' },

    // Blog
    { selector: '.blog-post-item > a', label: 'Read article ↗' },

    // Testimonials
    { selector: '[data-testimonials-item]', label: 'Read story' },

    // Coding profiles
    { selector: '.coding-profile-item', label: 'Open profile ↗' },

    // Certificates
    { selector: '.certificate-item', label: 'View credential ↗' },

    // Contact
    { selector: '.contact-link[href^="mailto:"]', label: 'Copy email 📋' },
    { selector: '.craft-footer-cta', label: "Let's talk 👋" },
    { selector: '.social-link, .craft-black-pill', label: 'Visit ↗' },
    { selector: '.contact-form, .form-btn', label: 'Send message' },

    // Services
    { selector: '.service-item', label: 'Learn more' },

    // AI Chat
    { selector: '#ai-chat-btn', label: 'Ask AI 🤖' },

    // Generic interactive
    { selector: 'button, a', label: '' }, // hover effect without label
  ];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const target = e.target;
    if (!target || typeof target.closest !== 'function') return;

    // Hide inside modals
    if (target.closest('.modal-container.active, .modal.active, .project-modal-container.active, .ai-chat-panel.open')) {
      setLabel('');
      cursor.classList.remove('hovering');
      return;
    }

    let matchedLabel = null;
    let matchedAny = false;
    for (const rule of CONTEXT_RULES) {
      if (target.closest(rule.selector)) {
        matchedLabel = rule.label;
        matchedAny = true;
        break;
      }
    }

    if (matchedAny) {
      cursor.classList.add('hovering');
      setLabel(matchedLabel || '');
    } else {
      cursor.classList.remove('hovering');
      setLabel('');
    }
  });

  function setLabel(text) {
    if (text === currentLabel) return;
    currentLabel = text;
    if (text) {
      labelEl.textContent = text;
      labelEl.classList.add('visible');
    } else {
      labelEl.classList.remove('visible');
    }
  }

  // Smooth spring animation loop
  function animate() {
    const ease = 0.18;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================================================
// 3. HERO, MARQUEE & PROOF-OF-WORK BENTO GRID
// ============================================================================
function enhanceHeroAndProofBento() {
  const aboutTitle = document.querySelector('article.about > header .article-title');
  if (aboutTitle && !aboutTitle.hasAttribute('data-crafted')) {
    aboutTitle.setAttribute('data-crafted', 'true');
    aboutTitle.className = 'craft-hero-greeting';
    aboutTitle.innerHTML = `Hi, I'm<br>Rajath Kiran A.`;
  }

  const aboutText = document.querySelector('article.about .about-text');
  if (aboutText && !document.getElementById('craft-hero-cta')) {
    const ctaBtn = document.createElement('button');
    ctaBtn.id = 'craft-hero-cta';
    ctaBtn.type = 'button';
    ctaBtn.className = 'craft-cta-pill';
    ctaBtn.innerHTML = `<span>Explore Curated Work</span> <span>→</span>`;
    ctaBtn.addEventListener('click', () => {
      document.querySelectorAll('[data-nav-link]').forEach((nav) => {
        if (nav.textContent.trim().toLowerCase() === 'projects') nav.click();
      });
    });
    aboutText.appendChild(ctaBtn);

    // Infinite Identity Marquee Strip
    const marquee = document.createElement('div');
    marquee.className = 'craft-marquee-strip';
    const items = [
      'Software Engineer',
      'Full-Stack Developer',
      'React.js Developer',
      'AI / ML Healthcare Builder',
      'Cloud Engineer (GCP & GKE)',
      'UI/UX Designer',
      '2× VTU Rank #1 (Code360)',
      '80+ Open-Source Repos',
      'Systems Thinker',
      'Open to 2026 Internships'
    ];
    const repeated = [...items, ...items]
      .map((txt) => `<span>${txt}</span><span class="craft-marquee-dot">✦</span>`)
      .join('');
    marquee.innerHTML = `<div class="craft-marquee-track">${repeated}</div>`;
    aboutText.insertAdjacentElement('afterend', marquee);

    // Proof-of-Work Bento Grid right below Marquee
    const bento = document.createElement('div');
    bento.className = 'craft-proof-bento';
    bento.innerHTML = `
      <a href="https://www.naukri.com/code360/profile/rajathajeru" target="_blank" class="craft-proof-card">
        <div class="craft-proof-top"><span>DSA & LOGIC</span><span>↗</span></div>
        <div class="craft-proof-value">2× #1</div>
        <div class="craft-proof-label">VTU University Rank</div>
        <div class="craft-proof-sub">Code360 Leaderboard & 170+ LeetCode solved</div>
      </a>
      <a href="https://www.skills.google/public_profiles/09886862-52b8-44a4-86a5-9559a3952dd0" target="_blank" class="craft-proof-card">
        <div class="craft-proof-top"><span>GOOGLE CLOUD</span><span>↗</span></div>
        <div class="craft-proof-value">50+</div>
        <div class="craft-proof-label">GCP Skill Badges</div>
        <div class="craft-proof-sub">GKE, HTTP(S) Load Balancing, Spanner & Pub/Sub</div>
      </a>
      <a href="https://github.com/Rajath2005" target="_blank" class="craft-proof-card">
        <div class="craft-proof-top"><span>OPEN SOURCE</span><span>↗</span></div>
        <div class="craft-proof-value">80+</div>
        <div class="craft-proof-label">GitHub Repositories</div>
        <div class="craft-proof-sub">Production web apps, ML models & CLI tools</div>
      </a>
      <a href="https://shwasa.vercel.app/" target="_blank" class="craft-proof-card">
        <div class="craft-proof-top"><span>FLAGSHIP AI</span><span>↗</span></div>
        <div class="craft-proof-value">3 Live</div>
        <div class="craft-proof-label">Healthcare AI Systems</div>
        <div class="craft-proof-sub">SHWASA (COPD), AyuDost RAG & MediQ Platform</div>
      </a>
    `;
    marquee.insertAdjacentElement('afterend', bento);
  }

  const projectsSection = document.querySelector('article.projects section.projects');
  if (projectsSection && !document.getElementById('craft-projects-banner')) {
    const banner = document.createElement('div');
    banner.id = 'craft-projects-banner';
    banner.className = 'craft-tilted-banner-wrap';
    banner.innerHTML = `
      <h2 class="craft-Display-Title">Curated Projects</h2>
      <div class="craft-taped-strip">
        AI healthcare platforms, GCP cloud architectures, and developer tools I've built.
      </div>
    `;
    projectsSection.prepend(banner);
  }
}

// ============================================================================
// 4. REPLACE "PREVIEW NOT AVAILABLE" WITH EDITORIAL CASE-STUDY SHEET
// ============================================================================
function upgradeProjectFallbackToCaseStudy() {
  const fallbackBox = document.querySelector('[data-demo-fallback]');
  if (!fallbackBox) return;

  document.querySelectorAll('.project-item > a').forEach((link) => {
    link.addEventListener('click', () => {
      const title = link.querySelector('.project-title')?.textContent?.trim() || 'Project Case Study';
      const category = link.querySelector('.project-category')?.textContent?.trim() || 'Engineering Case Study';
      const desc = link.querySelector('.project-desc')?.textContent?.trim() || '';
      const imgSrc = link.querySelector('img')?.getAttribute('src') || '';
      const targetUrl = link.getAttribute('data-project-url') || link.getAttribute('href') || '#';

      const lower = (title + ' ' + category).toLowerCase();
      let cs = CASE_STUDY_DATA.cloud;
      if (lower.includes('copd') || lower.includes('shwasa')) cs = CASE_STUDY_DATA.copd;
      else if (lower.includes('mediq')) cs = CASE_STUDY_DATA.mediq;
      else if (lower.includes('ayudost')) cs = CASE_STUDY_DATA.ayudost;
      else if (!lower.includes('cloud') && !lower.includes('gke') && !lower.includes('spanner') && !lower.includes('pub/sub')) {
        cs = {
          eyebrow: category,
          problem: `Designed and engineered ${title} with a focus on clean architecture, responsive UI/UX, and reliable performance.`,
          architecture: desc,
          stack: ['Full-Stack Engineering', 'Responsive UI/UX', 'Production Deployment']
        };
      }

      fallbackBox.className = 'craft-case-study-sheet';
      fallbackBox.innerHTML = `
        <div class="cs-sheet-header">
          <div>
            <span class="cs-sheet-eyebrow">${cs.eyebrow}</span>
            <h3 class="cs-sheet-title">${title}</h3>
          </div>
          <a href="${targetUrl}" target="_blank" class="craft-cta-pill">
            <span>Open Live Project</span>
            <span>↗</span>
          </a>
        </div>
        ${imgSrc ? `<div class="cs-sheet-banner"><img src="${imgSrc}" alt="${title}"></div>` : ''}
        <div class="cs-sheet-grid">
          <div class="cs-sheet-block">
            <span class="cs-block-label">01 // Problem & Context</span>
            <p class="cs-block-text">${cs.problem}</p>
          </div>
          <div class="cs-sheet-block">
            <span class="cs-block-label">02 // Architecture & Execution</span>
            <p class="cs-block-text">${cs.architecture}</p>
          </div>
        </div>
        <div class="cs-sheet-actions">
          <div class="project-tech-tags" style="margin-top:0;">
            ${cs.stack.map((tag) => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    });
  });
}

// ============================================================================
// 5. STICKY SCROLL-STACK DEPTH SCALING + BLUR + PROGRESS DOTS
// ============================================================================
function initStickyStackDepthEffect() {
  // Scroll progress dots container
  let dotsContainer = document.getElementById('scroll-progress-dots');
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.id = 'scroll-progress-dots';
    dotsContainer.className = 'scroll-progress-dots';
    document.body.appendChild(dotsContainer);
  }

  window.addEventListener('scroll', () => {
    const projectsArticle = document.querySelector('article.projects');
    if (!projectsArticle || !projectsArticle.classList.contains('active')) {
      dotsContainer.classList.remove('visible');
      return;
    }

    const cards = Array.from(projectsArticle.querySelectorAll('.project-item.active'));

    // Sync progress dots count
    if (dotsContainer.children.length !== cards.length) {
      dotsContainer.innerHTML = cards.map((_, i) =>
        `<div class="scroll-progress-dot" data-dot-idx="${i}"></div>`
      ).join('');
    }

    // Show dots when projects are visible
    const projectsRect = projectsArticle.getBoundingClientRect();
    const isProjectsVisible = projectsRect.top < window.innerHeight && projectsRect.bottom > 0;
    dotsContainer.classList.toggle('visible', isProjectsVisible);

    // Process each card for depth physics
    let activeIdx = 0;
    cards.forEach((card, i) => {
      const nextCard = cards[i + 1];
      const innerLink = card.querySelector('a');
      if (!innerLink) return;

      const rect = card.getBoundingClientRect();

      // Track which card is most visible
      if (rect.top < window.innerHeight * 0.5 && rect.bottom > 100) {
        activeIdx = i;
      }

      if (!nextCard) {
        innerLink.style.transform = 'scale(1)';
        innerLink.style.filter = 'none';
        return;
      }

      const nextRect = nextCard.getBoundingClientRect();
      const overlap = Math.max(0, Math.min(1, (rect.bottom - nextRect.top) / 260));
      const scale = 1 - overlap * 0.04;
      const blur = overlap * 2;
      const brightness = 1 - overlap * 0.08;

      innerLink.style.transform = `scale(${scale.toFixed(3)})`;
      innerLink.style.filter = overlap > 0.05
        ? `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`
        : 'none';
    });

    // Update active dot
    dotsContainer.querySelectorAll('.scroll-progress-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIdx);
    });

  }, { passive: true });

  // --- UNIVERSAL SCROLL REVEAL OBSERVER ---
  initScrollRevealObserver();
}

// ============================================================================
// 5b. SCROLL REVEAL INTERSECTION OBSERVER
// ============================================================================
function initScrollRevealObserver() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Don't unobserve — keep re-revealing on navigation
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Tag elements for scroll reveal
  const revealSelectors = [
    '.service-item',
    '.content-card',
    '.blog-post-item > a',
    '.project-item.active',
    '.coding-profile-item',
    '.certificate-item',
    '.craft-proof-card',
    '.skill-domain-card',
    '.honour-badge-card',
    '.ledger-entry',
    '.craft-footer-cta',
    '.timeline-item.premium-card',
    '.craft-journey-scrubber',
    '.skill-xray-inspector',
    '.faq-item',
    '.stylized-map-card',
  ];

  // Apply with staggered delays
  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
        const delayClass = `delay-${Math.min(i % 4 + 1, 4)}`;
        el.classList.add(delayClass);
        revealObserver.observe(el);
      }
    });
  });

  // Re-observe on page navigation (when articles become active)
  const navObserver = new MutationObserver(() => {
    revealSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains('scroll-reveal')) {
          el.classList.add('scroll-reveal');
          revealObserver.observe(el);
        }
      });
    });
  });

  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    navObserver.observe(mainContent, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }
}

// ============================================================================
// 6. 1-CLICK COPY EMAIL TOAST & LIVE MANGALORE IST CLOCK
// ============================================================================
function initCopyEmailAndLiveClock() {
  let toast = document.getElementById('craft-copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'craft-copy-toast';
    toast.className = 'craft-copy-toast';
    toast.textContent = '✓ Copied rajathajeru@gmail.com to clipboard';
    document.body.appendChild(toast);
  }

  document.querySelectorAll('a[href^="mailto:"]').forEach((mailLink) => {
    mailLink.addEventListener('click', (e) => {
      if (mailLink.classList.contains('craft-cta-pill')) return; // Let main footer CTA open mail client if desired
      e.preventDefault();
      navigator.clipboard?.writeText('rajathajeru@gmail.com');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    });
  });

  // Live Mangalore IST Clock inside Contact section
  const mapSub = document.querySelector('.stylized-map-card p');
  if (mapSub) {
    const updateClock = () => {
      try {
        const nowIST = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        mapSub.innerHTML = `Local Time: <strong>${nowIST} IST (UTC+5:30)</strong> • Open to Remote & Relocation`;
      } catch (_) {}
    };
    updateClock();
    setInterval(updateClock, 1000);
  }
}

function numberProjectCaseStudies() {
  document.querySelectorAll('section.projects .project-item').forEach((item, idx) => {
    const catEl = item.querySelector('.project-category');
    if (catEl && !catEl.hasAttribute('data-numbered')) {
      catEl.setAttribute('data-numbered', 'true');
      const num = String(idx + 1).padStart(2, '0');
      catEl.textContent = `${num} — ${catEl.textContent.replace(/•/g, '·')}`;
    }
  });
}

function injectHandwrittenFooter() {
  document.querySelectorAll('main article').forEach((article) => {
    if (article.querySelector('.craft-footer-cta')) return;

    const footer = document.createElement('section');
    footer.className = 'craft-footer-cta';
    footer.innerHTML = `
      <span class="craft-footer-eyebrow">WHAT ARE YOU WAITING FOR? · 2026 INTERNSHIPS</span>
      <h3 class="craft-footer-handwritten">Have something you're<br>trying to build?</h3>
      <div class="craft-footer-row">
        <div class="craft-black-pills">
          <a href="https://github.com/Rajath2005" target="_blank" class="craft-black-pill">
            <ion-icon name="logo-github"></ion-icon>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/rajath-kiran/" target="_blank" class="craft-black-pill">
            <ion-icon name="logo-linkedin"></ion-icon>
            <span>LinkedIn</span>
          </a>
          <a href="assets/resumes/Rajath_Kiran_A_Resume.pdf" download class="craft-black-pill">
            <ion-icon name="download-outline"></ion-icon>
            <span>Resume</span>
          </a>
        </div>
        <a href="mailto:rajathajeru@gmail.com" class="craft-cta-pill">
          <span>Get in touch</span>
          <span>→</span>
        </a>
      </div>
    `;
    article.appendChild(footer);
  });
}

// ============================================================================
// 8. EXECUTIVE RESUME DOSSIER UPGRADE
// ============================================================================
function upgradeResumeToExecutiveDossier() {
  const resumeArticle = document.querySelector('article.resume');
  if (!resumeArticle || document.getElementById('resume-dossier-bar')) return;

  const header = resumeArticle.querySelector('header');

  // 1. Executive Dossier Top Summary Bar (Synced with Rajath_Kiran_A_Resume.pdf)
  const dossierBar = document.createElement('div');
  dossierBar.id = 'resume-dossier-bar';
  dossierBar.className = 'resume-dossier-bar';
  dossierBar.innerHTML = `
    <div class="dossier-meta-left">
      <span class="dossier-eyebrow">CURRICULUM VITAE · 2026 EDITION</span>
      <div class="dossier-headline">Rajath Kiran A — Software, Cloud & AI Engineer</div>
      <div class="dossier-sub">B.E. CS @ VCET (CGPA 8.9/10) · 2× VTU Code360 Topper · IEEE I2 Connect Winner · 50+ GCP Badges</div>
    </div>
    <a href="assets/resumes/Rajath_Kiran_A_Resume.pdf" download class="craft-cta-pill" style="margin-top:0;">
      <ion-icon name="download-outline"></ion-icon>
      <span>Download Official PDF</span>
    </a>
  `;
  header.insertAdjacentElement('afterend', dossierBar);

  // 2. Gurjot-Style Experience & Flagship Systems Notebook Ledger
  const ledgerSection = document.createElement('section');
  ledgerSection.className = 'craft-ledger-section';
  ledgerSection.innerHTML = `
    <div class="title-wrapper" style="display:flex; align-items:center; gap:14px; margin-bottom:20px;">
      <div class="icon-box"><ion-icon name="briefcase-outline"></ion-icon></div>
      <h3 class="h3">Experience & Flagship Engineering</h3>
    </div>
    <div class="craft-ledger-card">
      <div class="ledger-entry">
        <div>
          <div class="ledger-date">Nov 2024 – Dec 2024</div>
          <div class="ledger-org">Nexara</div>
          <div class="ledger-loc">Remote · Freelance</div>
        </div>
        <div>
          <div class="ledger-role-title">Web Developer (Freelance)</div>
          <ul class="ledger-bullets">
            <li>Delivered <strong>2 production websites</strong> (Plumbing Services & NGO platform) end-to-end within <strong>6 weeks</strong>, handling responsive UI, custom plugin architecture, and performance optimization.</li>
            <li>Managed full local-to-production deployment, client handoff, and SEO/speed tuning.</li>
          </ul>
          <div class="ledger-tags">
            <span class="ledger-tag">Production Delivery</span>
            <span class="ledger-tag">Responsive UI/UX</span>
            <span class="ledger-tag">Performance Optimization</span>
          </div>
        </div>
      </div>

      <div class="ledger-entry">
        <div>
          <div class="ledger-date">2026 – Present</div>
          <div class="ledger-org">VTU Major Research</div>
          <div class="ledger-loc">Deep Learning · Audio AI</div>
        </div>
        <div>
          <div class="ledger-role-title">Lead Researcher — COPD Detection & Severity Grading</div>
          <ul class="ledger-bullets">
            <li>Designing a <strong>CNN-LSTM hybrid model</strong> for automated COPD binary detection and 4-class GOLD severity grading on the <strong>ICBHI 2017 dataset (920 recordings, 6,898 annotated respiratory cycles)</strong>, targeting <strong>&gt;90% accuracy</strong>.</li>
            <li>Built an end-to-end audio preprocessing pipeline: noise reduction, 22,050 Hz resampling, <strong>128-band Mel-spectrograms</strong>, and <strong>40-coefficient MFCCs</strong>.</li>
          </ul>
          <div class="ledger-tags">
            <span class="ledger-tag">Python</span>
            <span class="ledger-tag">PyTorch / TensorFlow</span>
            <span class="ledger-tag">Librosa</span>
            <span class="ledger-tag">CNN-LSTM</span>
          </div>
        </div>
      </div>

      <div class="ledger-entry">
        <div>
          <div class="ledger-date">2024 – Present</div>
          <div class="ledger-org">AyuDost & Open Source</div>
          <div class="ledger-loc">AI Healthcare · Maintainer</div>
        </div>
        <div>
          <div class="ledger-role-title">Project Lead & Open-Source Maintainer (20+ Contributors)</div>
          <ul class="ledger-bullets">
            <li>Architected a <strong>10-step RAG pipeline</strong> combining <strong>Pinecone vector search</strong>, <strong>MongoDB keyword search</strong>, and a <strong>Gemini hallucination-check stage</strong> to power AyurChat.</li>
            <li>Shipped full-stack production app with Node.js/Express REST APIs, PostgreSQL/Supabase, appointment booking, and CI/CD; maintaining an open-source repo with <strong>20+ contributors</strong>.</li>
          </ul>
          <div class="ledger-tags">
            <span class="ledger-tag">React.js</span>
            <span class="ledger-tag">Node.js & Express</span>
            <span class="ledger-tag">Pinecone RAG</span>
            <span class="ledger-tag">Supabase PostgreSQL</span>
            <span class="ledger-tag">Docker & CI/CD</span>
          </div>
        </div>
      </div>
    </div>
  `;
  dossierBar.insertAdjacentElement('afterend', ledgerSection);

  // 3. Upgrade Education Cards with Real CGPA (8.9/10) & Board Scores (93.03%, 98.08%)
  const eduTimelineList = resumeArticle.querySelector('.timeline-list');
  if (eduTimelineList) {
    eduTimelineList.innerHTML = `
      <li class="timeline-item premium-card">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="edu-header-flex">
            <span class="timeline-year">2023 — 2027 (Expected)</span>
            <span class="edu-score-badge">CGPA: 8.9 / 10.0</span>
          </div>
          <h4 class="h4 timeline-item-title">Vivekananda College of Engineering & Technology (VCET), Puttur</h4>
          <p class="timeline-text">
            <strong>B.E. in Computer Science & Engineering</strong> (VTU, Karnataka)
          </p>
          <div class="edu-coursework-row">
            <span class="ledger-tag">Data Structures & Algorithms</span>
            <span class="ledger-tag">OOP</span>
            <span class="ledger-tag">Operating Systems</span>
            <span class="ledger-tag">DBMS</span>
            <span class="ledger-tag">Computer Networks</span>
          </div>
        </div>
      </li>

      <li class="timeline-item premium-card">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="edu-header-flex">
            <span class="timeline-year">2021 — 2023</span>
            <span class="edu-score-badge">Score: 93.03%</span>
          </div>
          <h4 class="h4 timeline-item-title">Narendra Pre University College</h4>
          <p class="timeline-text">
            <strong>Pre-University Course (PUC — PCMC)</strong> · Karnataka PU Board
          </p>
        </div>
      </li>

      <li class="timeline-item premium-card">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="edu-header-flex">
            <span class="timeline-year">2020 — 2021</span>
            <span class="edu-score-badge">Score: 98.08%</span>
          </div>
          <h4 class="h4 timeline-item-title">Morarji Desai Residential School</h4>
          <p class="timeline-text">
            <strong>Secondary School Leaving Certificate (SSLC)</strong> · Karnataka Secondary Education Board
          </p>
        </div>
      </li>
    `;
  }

  // 4. Replace Clunky 200vh Horizontal Scroll Trap with Interactive Year-Tab Scrubber
  const journeyWrapper = document.getElementById('journey-wrapper');
  const skipBtn = resumeArticle.querySelector('.skip-btn');
  if (skipBtn) skipBtn.style.display = 'none';

  if (journeyWrapper) {
    const milestones = [
      { year: '2021 · The Spark', title: 'Foundations in C++ & Relational Databases', desc: 'Wrote my first programs in C++ and explored Oracle SQL & DBMS fundamentals while achieving 98.08% in SSLC.' },
      { year: '2022 · Core Logic', title: 'Data Structures, OOP & Memory Management', desc: 'Deepened algorithmic problem-solving across C, C++, and Java, scoring 93.03% in Pre-University (PCMC).' },
      { year: '2023 · CS Engineering', title: 'Started B.E. in Computer Science @ VCET', desc: 'Began formal Computer Science engineering (maintaining an 8.9/10 CGPA) and shipped my first web applications.' },
      { year: '2024 · Winner & Freelance', title: 'IEEE I2 Connect Winner & Production Freelance', desc: 'Won IEEE I2 CONNECT-2K24 & Aura 2K24, delivered 2 production client websites at Nexara, and launched MediQ.' },
      { year: '2025 · Cloud & RAG AI', title: '2× VTU Code360 Topper, 50+ GCP Badges & AyuDost', desc: 'Ranked #1 in VTU twice on Code360, earned 50+ Google Cloud Arcade badges, completed NPTEL Python (IIT Madras), and built AyuDost 10-step RAG.' },
      { year: '2026 · Deep Learning', title: 'COPD Respiratory AI (6,898 Cycles) & ISRO Hackathon', desc: 'Leading CNN-LSTM respiratory sound research on the ICBHI 2017 dataset, ISRO National Hackathon 2K26 participant, and open to 2026 Internships.' }
    ];

    journeyWrapper.innerHTML = `
      <div class="craft-journey-scrubber">
        <div class="scrubber-year-tabs" id="scrubber-year-tabs">
          ${milestones.map((m, i) => `<button type="button" class="scrubber-year-btn ${i === milestones.length - 1 ? 'active' : ''}" data-ms-idx="${i}">${m.year}</button>`).join('')}
        </div>
        <div class="scrubber-stage">
          <div class="scrubber-stage-title" id="scrubber-title">${milestones[5].title}</div>
          <p class="scrubber-stage-desc" id="scrubber-desc">${milestones[5].desc}</p>
        </div>
      </div>
    `;

    journeyWrapper.querySelectorAll('.scrubber-year-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-ms-idx'), 10);
        journeyWrapper.querySelectorAll('.scrubber-year-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('scrubber-title').textContent = milestones[idx].title;
        document.getElementById('scrubber-desc').textContent = milestones[idx].desc;
      });
    });
  }

  // 5. Replace Percentage Skill Bars with 6-Domain Engineering Stack Matrix (From PDF)
  const skillSection = resumeArticle.querySelector('section.skill');
  if (skillSection) {
    skillSection.innerHTML = `
      <div class="title-wrapper" style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">
        <div class="icon-box"><ion-icon name="layers-outline"></ion-icon></div>
        <h3 class="h3">Technical Stack & Engineering Domains</h3>
      </div>
      <div class="craft-skill-matrix">
        <div class="skill-domain-card">
          <div class="skill-domain-header"><span>01 // LANGUAGES & CORE CS</span><span>DSA · OOP</span></div>
          <div class="skill-domain-title">Programming & Fundamentals</div>
          <div class="skill-chip-cloud">
            <span class="skill-matrix-chip">Python</span>
            <span class="skill-matrix-chip">JavaScript (ES6+)</span>
            <span class="skill-matrix-chip">TypeScript</span>
            <span class="skill-matrix-chip">Java</span>
            <span class="skill-matrix-chip">C / C++</span>
            <span class="skill-matrix-chip">Data Structures & Algorithms</span>
            <span class="skill-matrix-chip">OOP & SDLC</span>
          </div>
        </div>

        <div class="skill-domain-card">
          <div class="skill-domain-header"><span>02 // AI, ML & RAG SYSTEMS</span><span>DEEP LEARNING</span></div>
          <div class="skill-domain-title">Artificial Intelligence & Audio ML</div>
          <div class="skill-chip-cloud">
            <span class="skill-matrix-chip">PyTorch</span>
            <span class="skill-matrix-chip">TensorFlow</span>
            <span class="skill-matrix-chip">CNN-LSTM Architectures</span>
            <span class="skill-matrix-chip">Librosa (MFCC / Mel)</span>
            <span class="skill-matrix-chip">10-Step RAG Pipelines</span>
            <span class="skill-matrix-chip">Pinecone Vector DB</span>
            <span class="skill-matrix-chip">Gemini AI</span>
          </div>
        </div>

        <div class="skill-domain-card">
          <div class="skill-domain-header"><span>03 // CLOUD & DEVOPS</span><span>50+ GCP BADGES</span></div>
          <div class="skill-domain-title">Google Cloud & Infrastructure</div>
          <div class="skill-chip-cloud">
            <span class="skill-matrix-chip">Google Cloud Platform (GCP)</span>
            <span class="skill-matrix-chip">Kubernetes (GKE)</span>
            <span class="skill-matrix-chip">Docker</span>
            <span class="skill-matrix-chip">HTTP(S) Load Balancing</span>
            <span class="skill-matrix-chip">Cloud Spanner & Pub/Sub</span>
            <span class="skill-matrix-chip">CI/CD Pipelines</span>
            <span class="skill-matrix-chip">Git & GitHub</span>
          </div>
        </div>

        <div class="skill-domain-card">
          <div class="skill-domain-header"><span>04 // FULL-STACK & DATA</span><span>PRODUCTION WEB</span></div>
          <div class="skill-domain-title">Frameworks, APIs & Databases</div>
          <div class="skill-chip-cloud">
            <span class="skill-matrix-chip">React.js</span>
            <span class="skill-matrix-chip">Node.js</span>
            <span class="skill-matrix-chip">Express.js</span>
            <span class="skill-matrix-chip">REST APIs</span>
            <span class="skill-matrix-chip">PostgreSQL & Supabase</span>
            <span class="skill-matrix-chip">MongoDB</span>
            <span class="skill-matrix-chip">MySQL</span>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Prepend Key Honours & National Hackathons Strip inside Certifications
  const certContainer = document.getElementById('dynamic-certificates-container');
  if (certContainer && !document.getElementById('craft-honours-grid')) {
    const honours = document.createElement('div');
    honours.id = 'craft-honours-grid';
    honours.className = 'craft-honours-grid';
    honours.innerHTML = `
      <div class="honour-badge-card">
        <span class="honour-icon">🏆</span>
        <div>
          <div class="honour-title">IEEE I2 CONNECT-2K24 & Aura 2K24 Winner</div>
          <div class="honour-sub">First-place national/inter-collegiate technical competition winner.</div>
        </div>
      </div>
      <div class="honour-badge-card">
        <span class="honour-icon">🥇</span>
        <div>
          <div class="honour-title">2× VTU University Topper (Code360)</div>
          <div class="honour-sub">Ranked #1 across VTU leaderboard in Data Structures & Algorithms.</div>
        </div>
      </div>
      <div class="honour-badge-card">
        <span class="honour-icon">🚀</span>
        <div>
          <div class="honour-title">ISRO National Hackathon 2K26 & MLH</div>
          <div class="honour-sub">National-level hackathon builder + Google 5-Day AI Agents Intensive.</div>
        </div>
      </div>
      <div class="honour-badge-card">
        <span class="honour-icon">🎓</span>
        <div>
          <div class="honour-title">NPTEL IIT Madras — Python (78% Score)</div>
          <div class="honour-sub">12-Week Certified Course + QSpiders C, Data Structures & Java.</div>
        </div>
      </div>
    `;
    certContainer.prepend(honours);
  }

  // 7. Append Quick-Jump Sub-Nav inside dossierBar
  const quickJump = document.createElement('div');
  quickJump.className = 'resume-quickjump-bar';
  quickJump.innerHTML = `
    <span style="font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; color:var(--ink-muted);">JUMP TO →</span>
    <button type="button" class="rj-pill" data-jump=".craft-ledger-section">01 · Experience</button>
    <button type="button" class="rj-pill" data-jump=".timeline">02 · Education (8.9 CGPA)</button>
    <button type="button" class="rj-pill" data-jump="#journey-wrapper">03 · 2021–2026 Scrubber</button>
    <button type="button" class="rj-pill" data-jump="section.skill">04 · Interactive Stack</button>
    <button type="button" class="rj-pill" data-jump="section.certificates">05 · Honours & Certs</button>
  `;
  dossierBar.appendChild(quickJump);

  quickJump.querySelectorAll('.rj-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = resumeArticle.querySelector(btn.getAttribute('data-jump'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 8. Interactive Skill X-Ray Inspector below .craft-skill-matrix
  const SKILL_PROOF_MAP = {
    'Python': 'Used in: SHWASA COPD CNN-LSTM (6,898 respiratory cycles), AyuDost 10-Step RAG Backend & NPTEL IIT Madras (78%).',
    'JavaScript (ES6+)': 'Used in: MediQ Health Platform, AyuDost Frontend, Cloud Intelligence Center (D3.js + Three.js) & 50+ LeetCode.',
    'TypeScript': 'Used in: Type-safe full-stack web modules and scalable component libraries.',
    'Java': 'Used in: Smart City Guide CLI Application, OOP Architecture & QSpiders Java Certification.',
    'C / C++': 'Used in: 2× VTU Rank #1 on Code360 Leaderboard & QSpiders Data Structures Certification.',
    'Data Structures & Algorithms': 'Proof: 2× VTU University Topper on Code360, 50+ LeetCode solved, IEEE I2 Connect Winner.',
    'PyTorch': 'Used in: COPD Detection & 4-Class GOLD Severity Grading model on the ICBHI 2017 dataset (>90% target accuracy).',
    'TensorFlow': 'Used in: Deep learning acoustic spectrogram classification & ML Lab.',
    'CNN-LSTM Architectures': 'Used in: VTU Major Research — Hybrid spatial-temporal respiratory auscultation classifier.',
    'Librosa (MFCC / Mel)': 'Used in: Automated 22,050 Hz audio resampling, 128-band Mel-spectrograms & 40-coeff MFCC pipeline.',
    '10-Step RAG Pipelines': 'Used in: AyuDost AyurChat — combining Pinecone vector search, MongoDB keyword search & Gemini hallucination check.',
    'Pinecone Vector DB': 'Used in: AyuDost semantic knowledge retrieval over classical Ayurvedic texts.',
    'Gemini AI': 'Used in: AyuDost hallucination-verification stage, MediQ wellness assistant & Portfolio AI.',
    'Google Cloud Platform (GCP)': 'Proof: Google Cloud Arcade Silver League (50+ badges) + Cloud Intelligence Center (cloud.rajathkiran.me).',
    'Kubernetes (GKE)': 'Used in: Deployed auto-scaling containerized microservices with workload & health monitoring on GKE.',
    'Docker': 'Used in: Containerized AyuDost, GKE Microservices & HuggingFace OpenEnv RL Code Review benchmark.',
    'HTTP(S) Load Balancing': 'Used in: Multi-VM Compute Engine high-availability deployment with automated health checks.',
    'Cloud Spanner & Pub/Sub': 'Used in: Globally distributed SQL database & event-driven asynchronous messaging on GCP.',
    'React.js': 'Used in: AyuDost & MediQ production healthcare platforms (serving 20+ active users) & React Lab.',
    'Node.js': 'Used in: AyuDost & MediQ REST APIs, authentication & Google Maps appointment booking.',
    'PostgreSQL & Supabase': 'Used in: Production relational schema, Row-Level Security & auth for MediQ and AyuDost.'
  };

  if (skillSection) {
    const matrixEl = skillSection.querySelector('.craft-skill-matrix');
    if (matrixEl) {
      const xrayBar = document.createElement('div');
      xrayBar.className = 'skill-xray-inspector';
      xrayBar.innerHTML = `
        <div>
          <span class="xray-skill-badge" id="xray-skill-name">💡 Interactive Stack</span>
          <span id="xray-skill-proof" style="margin-left:8px;">Hover or click any skill chip above to inspect how I use it in production projects.</span>
        </div>
      `;
      matrixEl.insertAdjacentElement('afterend', xrayBar);

      const nameEl = document.getElementById('xray-skill-name');
      const proofEl = document.getElementById('xray-skill-proof');

      skillSection.querySelectorAll('.skill-matrix-chip').forEach((chip) => {
        const activateChip = () => {
          skillSection.querySelectorAll('.skill-matrix-chip').forEach((c) => c.classList.remove('active-xray'));
          chip.classList.add('active-xray');
          const skillName = chip.textContent.trim();
          nameEl.textContent = skillName;
          proofEl.textContent = SKILL_PROOF_MAP[skillName] || `Core engineering technology applied across my GitHub repositories and coursework.`;
        };
        chip.addEventListener('mouseenter', activateChip);
        chip.addEventListener('click', activateChip);
      });
    }
  }

  // 9. Scroll-Reactive Focus on Education Timeline Items
  const eduItems = resumeArticle.querySelectorAll('.timeline-item.premium-card');
  const eduObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('scroll-focused', entry.isIntersecting);
      });
    },
    { threshold: 0.6 }
  );
  eduItems.forEach((item) => eduObserver.observe(item));
}

// ============================================================================
// 7. INTERACTIVE HERO BUILDER'S DECK (2-Column Editorial Hero like Gurjot's)
// ============================================================================
function mountHeroBuilderDeck() {
  const aboutArticle = document.querySelector('article.about');
  const aboutText = aboutArticle?.querySelector('.about-text');
  if (!aboutArticle || !aboutText || document.getElementById('craft-hero-split')) return;

  const splitWrap = document.createElement('div');
  splitWrap.id = 'craft-hero-split';
  splitWrap.className = 'craft-hero-split';

  aboutText.parentNode.insertBefore(splitWrap, aboutText);
  splitWrap.appendChild(aboutText);

  const deckStage = document.createElement('div');
  deckStage.className = 'craft-deck-stage';
  deckStage.innerHTML = `
    <div class="craft-deck-card" data-pos="0">
      <div class="deck-card-img">
        <img src="assets/images/COPD-Project.webp" alt="SHWASA COPD AI" loading="eager">
      </div>
      <div>
        <span class="deck-card-tag">★ VTU MAJOR RESEARCH · 2026</span>
        <div class="deck-card-title">SHWASA — COPD CNN-LSTM (6,898 Cycles)</div>
      </div>
      <div class="deck-card-foot">
        <span>ICBHI 2017 Dataset</span>
        <span>Tap to shuffle ↻</span>
      </div>
    </div>

    <div class="craft-deck-card" data-pos="1">
      <div class="deck-card-img">
        <img src="assets/images/AyuDost-AI.webp" alt="AyuDost 10-Step RAG" loading="lazy">
      </div>
      <div>
        <span class="deck-card-tag">★ PRODUCTION AI · 20+ CONTRIBUTORS</span>
        <div class="deck-card-title">AyuDost — 10-Step Pinecone + Gemini RAG</div>
      </div>
      <div class="deck-card-foot">
        <span>Full-Stack Healthcare</span>
        <span>Tap to shuffle ↻</span>
      </div>
    </div>

    <div class="craft-deck-card" data-pos="2">
      <div class="deck-card-img">
        <img src="assets/images/gke.webp" alt="Google Cloud GKE" loading="lazy">
      </div>
      <div>
        <span class="deck-card-tag">★ 50+ GCP BADGES · SILVER LEAGUE</span>
        <div class="deck-card-title">GKE Microservices & Cloud Intelligence</div>
      </div>
      <div class="deck-card-foot">
        <span>Kubernetes & Spanner</span>
        <span>Tap to shuffle ↻</span>
      </div>
    </div>
  `;

  splitWrap.appendChild(deckStage);

  // Click or Tap to shuffle the 3D Polaroid Stack with spring physics
  const cards = Array.from(deckStage.querySelectorAll('.craft-deck-card'));
  deckStage.addEventListener('click', () => {
    cards.forEach((card) => {
      const current = parseInt(card.getAttribute('data-pos'), 10);
      const next = (current + 2) % 3; // Cycles front card to back
      card.setAttribute('data-pos', String(next));
    });
  });
}

// ============================================================================
// 8. GURJOT-STYLE "★ HERO PROJECT" BADGES ON FLAGSHIP WORK CARDS
// ============================================================================
function decorateHeroProjectBadges() {
  const badgeMap = {
    'copd': '★ HERO RESEARCH',
    'shwasa': '★ HERO RESEARCH',
    'ayudost': '★ HERO PROJECT',
    'mediq': '★ PRODUCTION APP',
    'gke': '★ CLOUD INFRASTRUCTURE'
  };

  document.querySelectorAll('section.projects .project-item').forEach((item) => {
    const imgWrap = item.querySelector('.project-img-wrapper');
    const title = (item.querySelector('.project-title')?.textContent || '').toLowerCase();
    if (!imgWrap || imgWrap.querySelector('.craft-hero-proj-badge')) return;

    const matchedKey = Object.keys(badgeMap).find((k) => title.includes(k));
    if (matchedKey) {
      const badge = document.createElement('div');
      badge.className = 'craft-hero-proj-badge';
      badge.innerHTML = `<span class="star">★</span><span>${badgeMap[matchedKey].replace('★ ', '')}</span>`;
      imgWrap.appendChild(badge);
    }
  });
}

// ============================================================================
// 1. SPRING-PHYSICS SLIDING PILL INDICATOR (Navbar & Filter Bar)
// ============================================================================
function initSpringSlidingPills() {
  const attachGlider = (containerSelector, itemSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container || container.querySelector('.spring-glider-pill')) return;

    const glider = document.createElement('div');
    glider.className = 'spring-glider-pill';
    container.prepend(glider);

    const syncGlider = (btn) => {
      if (!btn) return;
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      if (bRect.width === 0) return;

      const x = bRect.left - cRect.left + container.scrollLeft;
      const y = bRect.top - cRect.top;
      glider.style.width = `${bRect.width}px`;
      glider.style.height = `${bRect.height}px`;
      glider.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const items = container.querySelectorAll(itemSelector);
    items.forEach((btn) => {
      btn.addEventListener('click', () => {
        requestAnimationFrame(() => syncGlider(btn));
      });
    });

    // Sync when switching to Projects tab so filter bar glider measures accurately
    document.querySelectorAll('[data-nav-link]').forEach((nav) => {
      nav.addEventListener('click', () => {
        setTimeout(() => {
          const active = container.querySelector(`${itemSelector}.active`) || items[0];
          syncGlider(active);
        }, 80);
      });
    });

    window.addEventListener('resize', () => {
      const active = container.querySelector(`${itemSelector}.active`) || items[0];
      syncGlider(active);
    });

    setTimeout(() => {
      const active = container.querySelector(`${itemSelector}.active`) || items[0];
      syncGlider(active);
    }, 100);
  };

  attachGlider('.navbar-list', '.navbar-link');
  attachGlider('.filter-list', 'button[data-filter-btn]');
}

// ============================================================================
// 2. TACTILE MAGNETIC BUTTON PHYSICS (Desktop Cursor Pull)
// ============================================================================
function initMagneticButtons() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const targets = document.querySelectorAll(
    '.craft-cta-pill, .craft-black-pill, #ai-chat-btn, #back-to-top, .theme-pill-btn'
  );

  targets.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.22).toFixed(1)}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ============================================================================
// 3. IN-CARD "⚡ SPECS" QUICK-FLIP ON PROJECT THUMBNAILS
// ============================================================================
function initProjectCardSpecFlip() {
  const SPECS_DB = {
    'copd': [
      ['Dataset', 'ICBHI 2017 (920 Audio Files)'],
      ['Segmentation', '6,898 Respiratory Cycles'],
      ['Features', '128-Mel + 40-Coeff MFCC'],
      ['Architecture', 'Hybrid CNN + Bi-LSTM (>90%)']
    ],
    'ayudost': [
      ['RAG Pipeline', '10-Step Hybrid Retrieval'],
      ['Vector + Keyword', 'Pinecone + MongoDB'],
      ['Safety Layer', 'Gemini Hallucination Check'],
      ['Production', 'Node/Express + 20+ Users']
    ],
    'mediq': [
      ['Frontend', 'React.js Component System'],
      ['Backend & Auth', 'Supabase PostgreSQL + RLS'],
      ['Integrations', 'Gemini AI + Google Maps API'],
      ['Delivery', 'CI/CD Automated Deploys']
    ],
    'gke': [
      ['Orchestrator', 'Google Kubernetes Engine'],
      ['Scaling', 'Horizontal Pod Autoscaler'],
      ['Observability', 'Cloud Monitoring & Alerts'],
      ['Certification', '50+ GCP Arcade Badges']
    ],
    'available': [
      ['Ingress', 'Global HTTP(S) Load Balancer'],
      ['Compute', 'Multi-VM Instance Groups'],
      ['Reliability', 'Automated Health Checks'],
      ['Cloud', 'Google Cloud Platform']
    ]
  };

  document.querySelectorAll('section.projects .project-item').forEach((item) => {
    const imgWrap = item.querySelector('.project-img-wrapper');
    const title = (item.querySelector('.project-title')?.textContent || '').toLowerCase();
    if (!imgWrap || imgWrap.querySelector('.proj-spec-toggle-btn')) return;

    const matchKey = Object.keys(SPECS_DB).find((k) => title.includes(k));
    if (!matchKey) return;

    const rowsHtml = SPECS_DB[matchKey]
      .map(
        ([k, v]) => `
        <div class="spec-row-item">
          <span class="spec-row-key">${k}</span>
          <span class="spec-row-val">${v}</span>
        </div>
      `
      )
      .join('');

    const backplate = document.createElement('div');
    backplate.className = 'proj-backplate-specs';
    backplate.innerHTML = rowsHtml;

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'proj-spec-toggle-btn';
    toggleBtn.textContent = '⚡ Specs';

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = imgWrap.classList.toggle('specs-open');
      toggleBtn.textContent = isOpen ? '🖼️ Preview' : '⚡ Specs';
    });

    imgWrap.appendChild(backplate);
    imgWrap.appendChild(toggleBtn);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEditorialCraft);
} else {
  initEditorialCraft();
}