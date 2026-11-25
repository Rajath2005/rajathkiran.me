/**
 * RK STUDIO BLUEPRINT — studio-dossier.js
 * Slide-over "Studio Blueprint" case study dossier for the 5 flagship builds.
 * Injected from the Projects tab cards and the Studio Desk's CASE STUDY button.
 * Self-contained IIFE; pairs with studio-dossier.css on Editorial Studio Craft tokens.
 */
(function () {
  'use strict';

  if (window.__rkStudioDossierBooted) return;
  window.__rkStudioDossierBooted = true;

  const reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BUILDS = [
    {
      slug: 'shramik',
      title: 'Shramik-Nyay',
      tags: ['Civic Tech', 'Voice AI', 'Open Source'],
      role: 'Solo Builder \u00B7 Voice UX + Civic AI',
      metric: 'Real-Time Voice Civic AI',
      stack: 'Python \u00B7 TypeScript \u00B7 Voice AI Pipeline',
      image: 'assets/images/Shramik-Nyay-app.png',
      imageAlt: 'Shramik-Nyay worker voice intake interface',
      url: 'https://shramik.rajathkiran.me/',
      live: 'https://shramik.rajathkiran.me/',
      repo: 'https://github.com/Rajath2005/Shramik-Nyay',
      casePage: null,
      flow: {
        pain: 'Filing a wage claim means paperwork, travel and weeks of waiting for dues.',
        interaction: 'The worker speaks instead of types \u2014 a multilingual voice intake asks step by step and drafts Form A + JSON live.',
        outcome: 'A guided, minutes-long claim session the worker can review before submitting.',
        note: 'A legal form was chunked into short spoken questions \u2014 one field per turn, confirmed in place, in the worker\u2019s own language.'
      },
      nodes: [
        { label: 'Voice Input\n(worker\u2019s language)', why: 'Speech keeps the flow usable for workers with low literacy \u2014 typing a legal form was the biggest drop-off.' },
        { label: 'Multilingual Intake\n+ Wage-Rule Checks', why: 'Intake maps answers to Form A fields while rule checks catch invalid wage entries before a draft is written.' },
        { label: 'Form A\nJSON Draft Engine', why: 'Generating a structured JSON draft makes the claim machine-readable and keeps a reviewable trail.' }
      ],
      beats: {
        problem: 'Unorganized workers in India file wage claims on paper \u2014 the process is slow, manual, and hostile to anyone who can\u2019t read the form.',
        tradeoff: 'I chose speech as the primary interface over a web form: it meant building multilingual intake and rule checks, but it removes the literacy barrier entirely.',
        outcome: 'A weeks-long paperwork trail collapses into a guided, minutes-long voice session with a clean, machine-readable claim draft at the end.'
      }
    },
    {
      slug: 'mediq',
      title: 'MediQ Health Platform',
      tags: ['Healthcare', 'Full-Stack', 'Supabase'],
      role: 'Full-Stack Design & Build',
      metric: 'RLS-Secured Health Records',
      stack: 'React \u00B7 Supabase + RLS \u00B7 Node.js',
      image: 'assets/images/Mediq.png',
      imageAlt: 'MediQ holistic health dashboard',
      url: 'mediq.html',
      live: 'https://mediq-health.netlify.app/',
      repo: null,
      casePage: 'mediq.html',
      flow: {
        pain: 'Treatment details are scattered across prescriptions, lab reports and advice slips.',
        interaction: 'One regimen dashboard unifies consultations, herbal prescriptions, diet and daily routines \u2014 and reacts to logged symptoms.',
        outcome: 'Patients manage a holistic plan in one app-like place; AI wellness nudges respond to what they log.',
        note: 'The dashboard reacts to logged symptoms with AI nudges instead of serving static treatment pages.'
      },
      nodes: [
        { label: 'React App-Like\nFrontend', why: 'An app-like SPA keeps the regimen view instant on desktop and mobile without reloads.' },
        { label: 'Supabase API\nLayer', why: 'Supabase gave managed Postgres + auth, so modeling Dosha types and regimens stayed the hard problem worth solving.' },
        { label: 'Row-Level Security\non Health Records', why: 'RLS enforces \u201Ca patient reads only their own records\u201D at the database layer \u2014 not in application code that can drift.' },
        { label: 'AI Wellness\nNudges', why: 'Nudges keyed to tracked symptoms turn a static plan into a responsive one.' }
      ],
      beats: {
        problem: 'Holistic (Ayurvedic) treatment lives in fragments \u2014 consults, herbs, diet and routines that allopathic-first platforms can\u2019t even represent.',
        tradeoff: 'I put privacy in the database (Supabase RLS) instead of the app layer, and reshaped the schema around regimens \u2014 harder up front, impossible to leak later.',
        outcome: 'One responsive platform where a patient\u2019s whole regimen is private by default \u2014 and the foundation AyuDost\u2019s AI models were later built on.'
      }
    },
    {
      slug: 'ayudost',
      title: 'AyuDost AI',
      tags: ['AI Assistant', 'RAG', 'Open Source'],
      role: 'AI Pipeline Architect \u00B7 Maintainer',
      metric: 'Sub-Second RAG Consultations',
      stack: 'React \u00B7 Node.js \u00B7 Python NLP \u00B7 Pinecone + Gemini',
      image: 'assets/images/AyuDost-AI.png',
      imageAlt: 'AyuDost AI conversational assistant',
      url: 'ayudost.html',
      live: 'https://ayudost-chatbot.onrender.com/',
      repo: null,
      casePage: 'ayudost.html',
      flow: {
        pain: 'Ayurvedic advice online is generic, shallow keyword matching \u2014 and hard to trust.',
        interaction: 'A conversational assistant classifies the user\u2019s Dosha imbalance before any remedy is suggested.',
        outcome: 'Sub-second, source-grounded answers \u2014 with 20+ contributors shipping on the open repo.',
        note: 'Guided symptom questions in conversation \u2014 never a rigid dropdown form \u2014 because dosha presentation varies person to person.'
      },
      nodes: [
        { label: 'React\nChat UI', why: 'A conversational surface lets users describe symptoms naturally instead of picking from menus.' },
        { label: 'Node.js\nAPI Gateway', why: 'A thin gateway keeps concerns separated and lets the Python NLP core scale or retrain independently.' },
        { label: 'Python NLP Service\nDosha Classification', why: 'Isolating the NLP model as its own microservice means the brain can improve without touching the product shell.' },
        { label: '10-Step RAG \u00B7\nPinecone + Gemini', why: 'Retrieval-grounded generation keeps answers verifiable instead of hallucinated \u2014 trust was the product requirement.' },
        { label: 'Supabase\nRemedy Knowledge Base', why: 'Remedies stay queryable and editable as data \u2014 no redeploying a model to correct a fact.' }
      ],
      beats: {
        problem: 'People turn to the internet for Ayurvedic guidance and get keyword-matched folklore with no verifiable grounding.',
        tradeoff: 'I split the NLP brain into its own Python microservice and grounded every answer in a 10-step RAG pipeline \u2014 more moving parts, but every answer is checkable.',
        outcome: 'An automated first-line consultation with sub-second responses, live on Render + Netlify, improved by 20+ open-source contributors.'
      }
    },
    {
      slug: 'copd',
      title: 'COPD Detection & Severity Classification',
      tags: ['Healthcare AI', 'Deep Learning', 'Research'],
      role: 'ML Engineer \u00B7 Researcher',
      metric: '6,898 Respiratory Cycles',
      stack: 'Python \u00B7 CNN-LSTM \u00B7 MFCC / Mel-Spectrograms',
      image: 'assets/images/COPD-Project.png',
      imageAlt: 'COPD respiratory sound classification project',
      url: 'copd-detection.html',
      live: null,
      repo: 'https://github.com/Rajath2005/COPD-Detection',
      casePage: 'copd-detection.html',
      flow: {
        pain: 'COPD screening typically needs spirometry hardware that resource-constrained clinics simply don\u2019t have.',
        interaction: 'Asthma-grade lung recordings go in; a CNN-LSTM hybrid screens Healthy vs. COPD out the other side.',
        outcome: '95%+ binary accuracy on the ICBHI benchmark \u2014 screening from a microphone, not a machine.',
        note: 'Record-a-breath keeps the hardware cost near zero \u2014 the screening target is a phone microphone, not hospital equipment.'
      },
      nodes: [
        { label: 'Respiratory Audio\n(ICBHI Database)', why: 'Recordings of lung auscultations keep screening non-invasive and near-zero-cost.' },
        { label: 'MFCC /\nMel-Spectrogram', why: 'Converting audio into spectrogram representations let mature vision architectures learn from sound reliably.' },
        { label: 'CNN\nFeature Extraction', why: 'A CNN baseline reads the spectrograms\u2019 texture, the morphology of wheezes and crackles.' },
        { label: 'CNN-LSTM Hybrid\n(6,898 cycles)', why: 'Breath-cycle sequencing is the real signal \u2014 the LSTM stage meaningfully reduced false positives versus CNN-only.' },
        { label: 'Screening\nVerdict', why: 'A binary Healthy vs. COPD call keeps the output clinically actionable, not a vague score.' }
      ],
      beats: {
        problem: 'COPD screening depends on spirometry hardware that constrained clinics don\u2019t own \u2014 so early cases stay undetected.',
        tradeoff: 'I traded imaging simplicity for audio: spectrogram front-ends plus an LSTM over breath cycles \u2014 harder to train, but the hardware cost drops to a microphone.',
        outcome: 'The CNN-LSTM hybrid reached 95%+ binary accuracy (Healthy vs. COPD) on the ICBHI Respiratory Sound Database.'
      }
    },
    {
      slug: 'gcp',
      title: 'Highly Available Web App',
      tags: ['Cloud', 'GCP', 'GKE'],
      role: 'Cloud Architect \u00B7 SRE',
      metric: 'Multi-Region GKE Failover',
      stack: 'Google Cloud \u00B7 HTTP(S) LB \u00B7 Compute Engine \u00B7 GKE',
      image: 'assets/images/load-balancer.webp',
      imageAlt: 'Google Cloud load balancing architecture',
      url: 'http://cloud.rajathkiran.me/',
      live: 'http://cloud.rajathkiran.me/',
      repo: null,
      casePage: null,
      flow: {
        pain: 'A single VM is a single point of failure \u2014 one crash and the product is offline.',
        interaction: 'Traffic enters one stable URL; an HTTP(S) Load Balancer routes it across VMs with active health checks.',
        outcome: 'Unhealthy instances are pulled from rotation automatically and microservices scale on GKE.',
        note: 'Users keep one stable URL while the infrastructure behind it fails over \u2014 resilience was made invisible to them.'
      },
      nodes: [
        { label: 'Users\n(stable URL)', why: 'One stable entry point means failover never changes what a user has to know or bookmark.' },
        { label: 'HTTP(S)\nLoad Balancer', why: 'A managed global LB fronts the backends so routing and health checking are Google-grade, not hand-rolled.' },
        { label: 'Multi-VM\nManaged Backends', why: 'Several VMs behind health checks remove the single point of failure from the serving path.' },
        { label: 'GKE\nMicroservices', why: 'Containerized services on GKE scale and restart independently \u2014 one failing service can\u2019t take the app down.' }
      ],
      beats: {
        problem: 'Hosting on one VM means one bad deploy or crash takes the whole application down with it.',
        tradeoff: 'I traded the simplicity of a single host for an HTTP(S) Load Balancer, multi-VM backends and GKE \u2014 more infrastructure, but failure is now an event users never see.',
        outcome: 'Health-checked, auto-failing infrastructure built for zero-downtime traffic, with microservices scaling on GKE.'
      }
    }
  ];

  /* ---------- Hero icons ---------- */

  const ICON_CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  const frag = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---------- Build the shell once ---------- */

  let root = null;
  let sheet = null;
  let closeBtn = null;
  let current = 0;
  let isOpen = false;
  let lastFocus = null;

  function buildShell() {
    root = frag(
      '<div class="studio-dossier" id="studioDossier" role="dialog" aria-modal="true"' +
      ' aria-labelledby="dossierTitle" hidden>' +
      '  <div class="studio-dossier-backdrop" data-dossier-backdrop></div>' +
      '  <aside class="studio-dossier-sheet">' +
      '    <header class="dossier-header">' +
      '      <div>' +
      '        <span class="dossier-kicker">Studio Blueprint \u00B7 Case Study Dossier</span>' +
      '        <h3 class="dossier-title" id="dossierTitle"></h3>' +
      '        <div class="dossier-tags" id="dossierTags"></div>' +
      '      </div>' +
      '      <button type="button" class="dossier-close" data-dossier-close' +
      '        aria-label="Close case study dossier">' + ICON_CLOSE + '</button>' +
      '    </header>' +
      '    <div class="dossier-scroll" id="dossierScroll">' +
      '      <dl class="dossier-spec-strip">' +
      '        <div class="dossier-spec-cell"><dt>My Role</dt><dd id="dossierRole"></dd></div>' +
      '        <div class="dossier-spec-cell is-accent"><dt>Headline Impact</dt><dd id="dossierMetric"></dd></div>' +
      '        <div class="dossier-spec-cell"><dt>Primary Stack</dt><dd id="dossierStack"></dd></div>' +
      '      </dl>' +
      '      <div class="dossier-actions" id="dossierActions"></div>' +
      '      <figure class="dossier-browser">' +
      '        <div class="dossier-chrome" aria-hidden="true">' +
      '          <span class="dossier-chrome-dots"><span></span><span></span><span></span></span>' +
      '          <span class="dossier-chrome-url" id="dossierChromeUrl"></span>' +
      '        </div>' +
      '        <div class="dossier-stage">' +
      '          <img id="dossierImg" src="" alt="" width="800" height="500">' +
      '        </div>' +
      '      </figure>' +
      '      <div class="dossier-switch" role="tablist" aria-label="Build detail view">' +
      '        <button type="button" class="dossier-switch-tab" id="dossierTabUx"' +
      '          role="tab" aria-selected="true" aria-controls="dossierFlowPanel">UX &amp; Product Flow</button>' +
      '        <button type="button" class="dossier-switch-tab" id="dossierTabArch"' +
      '          role="tab" aria-selected="false" aria-controls="dossierArchPanel">System Architecture</button>' +
      '      </div>' +
      '      <div class="dossier-switch-panel" id="dossierFlowPanel" role="tabpanel"' +
      '        aria-labelledby="dossierTabUx"></div>' +
      '      <div class="dossier-switch-panel" id="dossierArchPanel" role="tabpanel"' +
      '        aria-labelledby="dossierTabArch" hidden></div>' +
      '      <ol class="dossier-beats">' +
      '        <li class="dossier-beat"><span class="dossier-beat-no">01</span>' +
      '          <div><h4>// The Problem</h4><p id="dossierBeatProblem"></p></div></li>' +
      '        <li class="dossier-beat"><span class="dossier-beat-no">02</span>' +
      '          <div><h4>// Key Tradeoff &amp; Execution</h4><p id="dossierBeatTradeoff"></p></div></li>' +
      '        <li class="dossier-beat"><span class="dossier-beat-no">03</span>' +
      '          <div><h4>// Measurable Outcome</h4><p id="dossierBeatOutcome"></p></div></li>' +
      '      </ol>' +
      '    </div>' +
      '    <footer class="dossier-footer">' +
      '      <button type="button" class="dossier-nav-btn" id="dossierPrev">\u2190 Previous Project</button>' +
      '      <span class="dossier-nav-pos" id="dossierPos" aria-live="polite"></span>' +
      '      <button type="button" class="dossier-nav-btn" id="dossierNext">Next Project \u2192</button>' +
      '    </footer>' +
      '  </aside>' +
      '</div>'
    );
    sheet = root.querySelector('.studio-dossier-sheet');
    closeBtn = root.querySelector('[data-dossier-close]');
    document.body.appendChild(root);

    closeBtn.addEventListener('click', closeDossier);
    root.querySelector('[data-dossier-backdrop]').addEventListener('click', closeDossier);
    root.querySelector('#dossierPrev').addEventListener('click', () => step(-1));
    root.querySelector('#dossierNext').addEventListener('click', () => step(1));
    root.querySelector('#dossierTabUx').addEventListener('click', () => switchPanel('ux'));
    root.querySelector('#dossierTabArch').addEventListener('click', () => switchPanel('arch'));
    root.addEventListener('keydown', trapFocus);
  }

  /* ---------- Render a build into the shell ---------- */

  function render(i) {
    const b = BUILDS[i];
    if (!b) return;
    root.querySelector('#dossierTitle').textContent = b.title;
    const tags = root.querySelector('#dossierTags');
    tags.textContent = '';
    b.tags.forEach((t) => tags.appendChild(frag(`<span class="dossier-tag">${esc(t)}</span>`)));
    root.querySelector('#dossierRole').textContent = b.role;
    root.querySelector('#dossierMetric').textContent = b.metric;
    root.querySelector('#dossierStack').textContent = b.stack;

    const actions = root.querySelector('#dossierActions');
    actions.textContent = '';
    if (b.live) {
      actions.appendChild(frag(
        `<a class="dossier-link dossier-link--accent" href="${b.live}"` +
        ` target="_blank" rel="noopener noreferrer">Live Demo \u2197</a>`
      ));
    }
    if (b.repo) {
      actions.appendChild(frag(
        `<a class="dossier-link" href="${b.repo}" target="_blank" rel="noopener noreferrer">GitHub \u2197</a>`
      ));
    }

    const img = root.querySelector('#dossierImg');
    img.src = b.image;
    img.alt = b.imageAlt || b.title;
    root.querySelector('#dossierChromeUrl').textContent = b.url;

    const flow = b.flow;
    root.querySelector('#dossierFlowPanel').innerHTML =
      '<dl class="dossier-flow">' +
      '  <div class="dossier-flow-step"><dt>Pain Point</dt><dd>' + esc(flow.pain) + '</dd></div>' +
      '  <div class="dossier-flow-step"><dt>Core Interaction</dt><dd>' + esc(flow.interaction) + '</dd></div>' +
      '  <div class="dossier-flow-step"><dt>Resolved Outcome</dt><dd>' + esc(flow.outcome) + '</dd></div>' +
      '</dl>' +
      '<p class="dossier-ux-note">' + esc(flow.note) + '</p>';

    const arch = root.querySelector('#dossierArchPanel');
    arch.innerHTML = '<div class="dossier-pipeline" aria-label="System architecture pipeline, hover each node for the reasoning behind it"></div>';
    const pipe = arch.querySelector('.dossier-pipeline');
    b.nodes.forEach((n, idx) => {
      pipe.appendChild(frag(
        '<div class="dossier-node" tabindex="0">' +
        '  <span class="dossier-node-label"><span class="dossier-node-no">N0' + (idx + 1) + '</span>' +
        esc(n.label).replace(/\n/g, '<br>') + '</span>' +
        '  <span class="dossier-node-why" role="tooltip">' + esc(n.why) + '</span>' +
        '</div>'
      ));
    });

    root.querySelector('#dossierBeatProblem').textContent = b.beats.problem;
    root.querySelector('#dossierBeatTradeoff').textContent = b.beats.tradeoff;
    root.querySelector('#dossierBeatOutcome').textContent = b.beats.outcome;
    root.querySelector('#dossierPos').textContent = `${String(i + 1).padStart(2, '0')} / ${String(BUILDS.length).padStart(2, '0')}`;
    switchPanel('ux');
    root.querySelector('#dossierScroll').scrollTop = 0;
  }

  function switchPanel(which) {
    const ux = root.querySelector('#dossierTabUx');
    const arch = root.querySelector('#dossierTabArch');
    const flowPanel = root.querySelector('#dossierFlowPanel');
    const archPanel = root.querySelector('#dossierArchPanel');
    const showUx = which === 'ux';
    ux.setAttribute('aria-selected', showUx ? 'true' : 'false');
    arch.setAttribute('aria-selected', showUx ? 'false' : 'true');
    flowPanel.hidden = !showUx;
    archPanel.hidden = showUx;
  }

  function step(dir) {
    current = (current + dir + BUILDS.length) % BUILDS.length;
    render(current);
  }

  /* ---------- Open / close ---------- */

  function openBySlug(slug, focusTrigger) {
    const i = BUILDS.findIndex((b) => b.slug === slug);
    if (i < 0) return false;
    open(i, focusTrigger);
    return true;
  }

  function open(i, focusTrigger) {
    if (!root) {
      buildShell();
    }
    current = i;
    render(i);
    if (isOpen) return;
    isOpen = true;
    lastFocus = focusTrigger && document.contains(focusTrigger) ? focusTrigger : document.activeElement;
    root.hidden = false;
    document.body.classList.add('studio-dossier-open');
    root.dataset.prevOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.add('open'));
    });
    closeBtn.focus();
  }

  function closeDossier() {
    if (!isOpen || !root) return;
    isOpen = false;
    root.classList.remove('open');
    document.body.classList.remove('studio-dossier-open');
    document.body.style.overflow = root.dataset.prevOverflow || '';
    document.removeEventListener('keydown', onKeydown);
    const duration = reduced ? 260 : 460;
    setTimeout(() => {
      if (!isOpen) root.hidden = true;
    }, duration);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDossier();
      return;
    }
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  }

  function trapFocus(e) {
    if (e.key !== 'Tab' || !root || !isOpen) return;
    const focusables = Array.from(
      root.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !root.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------- Public entries ---------- */

  window.__rkStudioDossierIsOpen = () => isOpen;

  window.__rkStudioDossierOpen = (slug, focusTrigger) => openBySlug(slug, focusTrigger);

  window.__rkStudioDossierOpenFor = (anchor) => {
    if (!anchor) return false;
    const url = anchor.getAttribute('data-project-url');
    if (!url) return false;
    const i = BUILDS.findIndex((b) => b.url === url);
    if (i < 0) return false;
    open(i, anchor);
    return true;
  };

  /* ---------- Boot (shell built lazily on first open) ---------- */

  function preloadImages() {
    BUILDS.forEach((b) => {
      const probe = new Image();
      probe.src = b.image;
    });
  }

  window.addEventListener('load', preloadImages);
})();
