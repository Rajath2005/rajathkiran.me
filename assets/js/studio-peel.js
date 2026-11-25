/**
 * RK STUDIO PEEL — studio-peel.js
 * StudioPeelCorner (dog-eared trigger) + StudioDeskOverlay (cutting-mat playground).
 * Self-contained IIFE on Editorial Studio Craft tokens; pairs with studio-peel.css.
 */
(function () {
  'use strict';

  if (window.__rkStudioPeelBooted) return;
  window.__rkStudioPeelBooted = true;

  const GITHUB_USER = 'Rajath2005';
  const GITHUB_URL = 'https://github.com/Rajath2005';
  const PULSE_API = 'https://github-contributions-api.jogruber.de/v4/Rajath2005';
  const USER_API = 'https://api.github.com/users/Rajath2005';
  const CACHE_KEY = 'rk_studio_desk_cache_v1';
  const EMAIL = 'rajathajeru@gmail.com';

  const reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canDrag = window.matchMedia
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const BUILDS = [
    {
      name: 'Shramik-Nyay',
      slug: 'shramik',
      domain: 'Civic Tech & Voice AI',
      problem: 'Manual, paper-based wage-claim filing leaves workers waiting weeks for their dues.',
      decision: 'Voice-first, multilingual intake turns spoken Form A answers into structured JSON claim drafts.',
      outcome: 'A weeks-long paperwork trail collapses into a guided, minutes-long voice session.',
      live: 'https://shramik.rajathkiran.me/',
      liveLabel: 'Live Demo',
      repo: 'https://github.com/Rajath2005/Shramik-Nyay',
      case: null
    },
    {
      name: 'MediQ',
      slug: 'mediq',
      domain: 'Health Platform',
      problem: 'Patient histories are scattered across prescriptions, lab reports and advice slips.',
      decision: 'Supabase with row-level security, so every patient record stays private by default.',
      outcome: 'One holistic regimen per patient — consultations, medicines, labs and diet in a single platform.',
      live: 'https://mediq-health.netlify.app/',
      liveLabel: 'Live Demo',
      repo: null,
      case: 'mediq.html'
    },
    {
      name: 'AyuDost AI',
      slug: 'ayudost',
      domain: 'AI Wellness',
      problem: 'Trustworthy Ayurvedic guidance is hard to reach and harder to verify online.',
      decision: 'A 10-step RAG pipeline — Pinecone retrieval grounded with Gemini before anything is answered.',
      outcome: 'Sub-second, source-grounded answers shipping with 20+ contributors on the open repo.',
      live: 'https://ayudost-chatbot.onrender.com/',
      liveLabel: 'Live Demo',
      repo: null,
      case: 'ayudost.html'
    },
    {
      name: 'COPD Respiratory AI',
      slug: 'copd',
      domain: 'Respiratory Diagnostics',
      problem: 'Respiratory sounds are subtle and easy for generalists to misread or miss.',
      decision: 'An LSTM classifier tuned across 6,898 augmentation cycles specifically to cut false positives.',
      outcome: '95%+ binary accuracy on the ICBHI benchmark dataset.',
      live: null,
      liveLabel: 'Live Demo',
      repo: 'https://github.com/Rajath2005/COPD-Detection',
      case: 'copd-detection.html'
    },
    {
      name: 'Highly Available Web App',
      slug: 'gcp',
      domain: 'Cloud Systems · GCP & GKE',
      problem: 'A single VM is a single point of failure — uptime needs architecture, not luck.',
      decision: 'HTTP(S) Load Balancer fronting multi-VM backends, with GKE orchestrating microservices.',
      outcome: 'Health-checked, auto-failing infrastructure built for zero-downtime traffic.',
      live: 'http://cloud.rajathkiran.me/',
      liveLabel: 'Live Demo',
      repo: null,
      case: null
    }
  ];

  const GRIP =
    '<button type="button" class="desk-grip" tabindex="-1" aria-hidden="true" title="Drag card"></button>';

  const STICKERS = [
    { value: '2× VTU Rank #1', label: 'Code360 Contests' },
    { value: '50+ GCP Skill Badges', label: 'Google Cloud' },
    { value: 'VCET · 8.9 CGPA', label: 'B.E. Computer Science & Engineering' }
  ];

  const frag = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  /* ---------- Toast (reuses .craft-copy-toast pattern, top-center) ---------- */

  let toastTimer = null;

  function showToast(message) {
    document.querySelectorAll('.craft-copy-toast.desk-toast').forEach((t) => t.remove());
    if (toastTimer) clearTimeout(toastTimer);
    const toast = document.createElement('div');
    toast.className = 'craft-copy-toast desk-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 1600);
  }

  /* ---------- StudioPeelCorner ---------- */

  let trigger = null;
  let desk = null;
  let lastFocus = null;

  /* ---------- Desk Light / Dark pill toggle (synced with the theme dock) ---------- */

  function currentTheme() {
    return document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function buildLights() {
    const wrap = frag(
      '<div class="desk-lights" id="deskLights" role="group" aria-label="Desk lighting">' +
      '  <button type="button" class="desk-lights-btn" data-mode="light" aria-pressed="false">' +
      '    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="10.5" r="3.5"></circle><path d="M8 3.5v-2M3.6 4.1 2.2 2.7M12.4 4.1l1.4-1.4"></path></svg>' +
      '    Light</button>' +
      '  <button type="button" class="desk-lights-btn" data-mode="dark" aria-pressed="false">' +
      '    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M12.8 9.8A5.5 5.5 0 0 1 6.2 3.2 5.5 5.5 0 1 0 12.8 9.8z"></path></svg>' +
      '    Dark</button>' +
      '</div>'
    );
    wrap.querySelectorAll('.desk-lights-btn').forEach((btn) => {
      btn.addEventListener('click', () => setDeskTheme(btn.dataset.mode === 'dark' ? 'dark' : 'light'));
    });
    syncLights(wrap);
    return wrap;
  }

  function syncLights(wrap) {
    const target = wrap || document.getElementById('deskLights');
    if (!target) return;
    const mode = currentTheme();
    target.querySelectorAll('.desk-lights-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.mode === mode ? 'true' : 'false');
    });
  }

  function setDeskTheme(mode) {
    document.body.classList.add('theme-switching');
    document.body.setAttribute('data-theme', mode);
    try { localStorage.setItem('rk_theme_mode', mode); } catch (e) { /* storage unavailable */ }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.body.classList.remove('theme-switching'));
    });
    syncLights();
  }

  function buildCorner() {
    trigger = frag(
      '<button type="button" class="studio-peel-corner" id="studioPeelCorner"' +
      ' aria-haspopup="dialog" aria-expanded="false"' +
      ' aria-label="Peel back the notebook sheet to open the Studio Desk">' +
      '  <span class="peel-sheet" aria-hidden="true">' +
      '    <span class="peel-grid"></span>' +
      '    <span class="peel-under"></span>' +
      '    <span class="peel-crease"></span>' +
      '  </span>' +
      '  <span class="peel-label" aria-hidden="true">Peel for Studio Desk ↗</span>' +
      '  <span class="peel-hint" aria-hidden="true">Click · or ⌘K</span>' +
      '  <span class="peel-tab" aria-hidden="true">Studio Desk ↗</span>' +
      '</button>'
    );
    document.body.appendChild(trigger);

    let dragArmed = false;
    let dragStart = null;

    trigger.addEventListener('pointerdown', (e) => {
      if (!canDrag) return;
      dragStart = { x: e.clientX, y: e.clientY };
      dragArmed = false;
    });

    trigger.addEventListener('pointermove', (e) => {
      if (!dragStart || dragArmed) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      if (dx > 22 && dy > 22) {
        dragArmed = true;
        dragStart = null;
        openDesk();
      }
    });

    trigger.addEventListener('pointerup', () => {
      dragStart = null;
    });

    trigger.addEventListener('click', () => {
      if (!dragArmed) openDesk();
      dragArmed = false;
    });

    return trigger;
  }

  /* ---------- StudioDeskOverlay ---------- */

  function buildDesk() {
    desk = frag(
      '<div class="studio-desk" id="studioDesk" role="dialog" aria-modal="true"' +
      ' aria-label="Rajath\u2019s Studio Desk" hidden></div>'
    );

    const topbar = frag(
      '<header class="desk-topbar">' +
      '  <div class="desk-brand">' +
      '    <span class="desk-title">Rajath\u2019s Studio Desk</span>' +
      '    <span class="desk-mode-pill"><span class="desk-mode-dot"></span>Interactive Mode</span>' +
      '  </div>' +
      '  <div class="desk-actions">' +
      '    <button type="button" class="desk-btn" id="deskReset">Reset Layout</button>' +
      '    <button type="button" class="desk-btn desk-btn--primary" id="deskClose" aria-label="Fold sheet back and close the Studio Desk"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg>Fold Sheet Back</button>' +
      '  </div>' +
      '</header>'
    );

    const canvas = document.createElement('div');
    canvas.className = 'desk-canvas';
    const grid = document.createElement('div');
    grid.className = 'desk-grid';
    canvas.appendChild(grid);

    grid.appendChild(buildPulseCard());
    grid.appendChild(buildInspector());
    grid.appendChild(buildStickers());
    grid.appendChild(buildDock());

    topbar.appendChild(buildLights());
    desk.appendChild(topbar);
    desk.appendChild(canvas);
    document.body.appendChild(desk);

    desk.querySelector('#deskClose').addEventListener('click', closeDesk);
    desk.querySelector('#deskReset').addEventListener('click', resetLayout);
    desk.addEventListener('keydown', trapFocus);
    return desk;
  }

  /* ---------- Artifact 1: Live GitHub Pulse ---------- */

  function buildPulseCard() {
    const card = frag(
      '<section class="desk-artifact desk-pulse" aria-label="Live GitHub pulse">' +
      '  <span class="desk-pulse-tape" aria-hidden="true"></span>' +
      '  <div class="desk-head">' +
      '    <span class="desk-kicker">Live GitHub Pulse</span>' +
      (canDrag ? GRIP : '') +
      '  </div>' +
      '  <p class="pulse-total" id="deskPulseTotal">\u2014<small>contributions this year</small></p>' +
      '  <div class="pulse-scroll"><div class="pulse-grid" id="deskPulseGrid"></div></div>' +
      '  <p class="pulse-fallback" id="deskPulseFallback" hidden>Loading live build activity\u2026</p>' +
      '  <a class="desk-link" id="deskPulseLink" href="' + GITHUB_URL + '"' +
      '    target="_blank" rel="noopener noreferrer">Open GitHub \u2197</a>' +
      '</section>'
    );
    card.dataset.artifact = 'pulse';
    return card;
  }

  function readCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
    } catch (e) {
      /* storage unavailable */
    }
  }

  function totalFromContributions(contributions) {
    const year = String(new Date().getFullYear());
    if (!Array.isArray(contributions)) return null;
    const inYear = contributions.filter((c) => c && typeof c.date === 'string' && c.date.startsWith(year));
    const source = inYear.length ? inYear : contributions;
    return source.reduce((sum, c) => sum + (Number(c.count) || 0), 0);
  }

  function renderPulse(data) {
    const grid = desk.querySelector('#deskPulseGrid');
    const totalEl = desk.querySelector('#deskPulseTotal');
    const fallbackEl = desk.querySelector('#deskPulseFallback');
    if (!grid) return;

    const contributions = Array.isArray(data && data.contributions) ? data.contributions : [];
    if (!contributions.length) return renderPulseFallback(data);

    const total = totalFromContributions(contributions);
    if (total != null && totalEl) {
      totalEl.firstChild.nodeValue = String(total);
    }

    const cells = contributions.slice(-126);
    const pad = (7 - (cells.length % 7)) % 7;
    grid.textContent = '';
    for (let i = 0; i < pad; i++) {
      const spacer = document.createElement('span');
      spacer.className = 'pulse-cell';
      spacer.style.visibility = 'hidden';
      grid.appendChild(spacer);
    }
    cells.forEach((c) => {
      const cell = document.createElement('span');
      cell.className = 'pulse-cell';
      const level = Math.min(4, Math.max(0, Number(c.level) || 0));
      if (level > 0) cell.dataset.l = String(level);
      if (c.count) {
        cell.title = `${c.date} \u00B7 ${c.count} contribution${c.count === 1 ? '' : 's'}`;
      }
      grid.appendChild(cell);
    });
    if (fallbackEl) fallbackEl.hidden = true;
  }

  function renderPulseFallback(data) {
    const grid = desk.querySelector('#deskPulseGrid');
    const fallbackEl = desk.querySelector('#deskPulseFallback');
    const link = desk.querySelector('#deskPulseLink');
    if (grid) grid.textContent = '';
    const repos = data && data.repos != null ? `${data.repos} public repositories` : '80+ repositories';
    if (fallbackEl) {
      fallbackEl.hidden = false;
      fallbackEl.textContent = `Live calendar unavailable \u2014 ${repos} on GitHub, updated continuously.`;
    }
    if (link) link.textContent = 'Open GitHub \u2197';
  }

  function loadPulse() {
    const cached = readCache();
    if (cached && cached.data && (Date.now() - cached.at) < 6 * 3600 * 1000) {
      renderPulse(cached.data);
      return;
    }
    if (typeof fetch !== 'function') {
      renderPulseFallback(cached && cached.data);
      return;
    }
    Promise.all([
      fetch(USER_API).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(PULSE_API).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    ]).then(([user, calendar]) => {
      const data = {
        repos: user.public_repos,
        followers: user.followers,
        contributions: Array.isArray(calendar.contributions) ? calendar.contributions : []
      };
      if (!data.contributions.length) return renderPulseFallback(data);
      writeCache(data);
      renderPulse(data);
      const totalEl = desk.querySelector('#deskPulseTotal');
      if (totalEl && data.repos != null) {
        totalEl.lastElementChild.textContent =
          `contributions this year \u00B7 ${data.repos} public repos`;
      }
    }).catch(() => renderPulseFallback(cached && cached.data));
  }

  /* ---------- Artifact 2: Flagship Build Inspector ---------- */

  function buildInspector() {
    const card = frag(
      '<section class="desk-artifact desk-inspector" aria-label="Flagship build inspector">' +
      '  <div class="desk-head">' +
      '    <span class="desk-kicker">Flagship Build Inspector</span>' +
      (canDrag ? '    <button type="button" class="desk-grip" tabindex="-1" aria-hidden="true" title="Drag card"></button>' : '') +
      '  </div>' +
      '  <div class="insp-tabs" id="inspTabs" role="tablist" aria-label="Flagship builds"></div>' +
      '  <div class="insp-body" id="inspBody" role="tabpanel" tabindex="0"></div>' +
      '</section>'
    );
    card.dataset.artifact = 'inspector';

    const tabs = card.querySelector('#inspTabs');
    const body = card.querySelector('#inspBody');

    BUILDS.forEach((build, i) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'insp-tab';
      tab.id = `insp-tab-${i}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.setAttribute('aria-controls', 'inspBody');
      tab.textContent = build.name;
      tab.addEventListener('click', () => renderInspector(i));
      if (i === 0) tab.dataset.active = '';
      tabs.appendChild(tab);
    });

    function renderInspector(i) {
      const build = BUILDS[i];
      Array.from(tabs.children).forEach((tab, j) => {
        tab.setAttribute('aria-selected', j === i ? 'true' : 'false');
        if (j === i) tab.dataset.active = '';
        else delete tab.dataset.active;
      });
      body.textContent = '';

      body.appendChild(frag(`<p class="insp-domain">${build.domain}</p>`));
      const rows = [
        ['User Problem \u2192', build.problem],
        ['Key Architecture Decision \u2192', build.decision],
        ['Measurable Outcome \u2192', build.outcome]
      ];
      rows.forEach(([label, text]) => {
        const line = document.createElement('div');
        line.className = 'insp-line';
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = label;
        dd.textContent = text;
        line.appendChild(dt);
        line.appendChild(dd);
        body.appendChild(line);
      });

      const actions = document.createElement('div');
      actions.className = 'insp-actions';
      if (build.live) {
        actions.appendChild(frag(
          `<a class="desk-link" href="${build.live}" target="_blank" rel="noopener noreferrer">${build.liveLabel} \u2197</a>`
        ));
      }
      const studyBtn = document.createElement('button');
      studyBtn.type = 'button';
      studyBtn.className = 'desk-link';
      studyBtn.textContent = 'Case Study \u2197';
      studyBtn.setAttribute('aria-haspopup', 'dialog');
      studyBtn.addEventListener('click', () => {
        if (typeof window.__rkStudioDossierOpen === 'function') {
          window.__rkStudioDossierOpen(build.slug, studyBtn);
        }
      });
      actions.appendChild(studyBtn);
      if (build.repo) {
        actions.appendChild(frag(
          `<a class="desk-link" href="${build.repo}" target="_blank" rel="noopener noreferrer">GitHub \u2197</a>`
        ));
      }
      body.appendChild(actions);
    }

    renderInspector(0);
    return card;
  }

  /* ---------- Artifact 3: Tactile Proof Stickers ---------- */

  function buildStickers() {
    const card = frag(
      '<section class="desk-artifact desk-stickers" aria-label="Tactile proof stickers">' +
      '  <div class="desk-head">' +
      '    <span class="desk-kicker">Proof Stickers</span>' +
      (canDrag ? GRIP : '') +
      '  </div>' +
      '  <div class="sticker-row" id="deskStickers"></div>' +
      '</section>'
    );
    card.dataset.artifact = 'stickers';
    const row = card.querySelector('#deskStickers');
    STICKERS.forEach((s) => {
      row.appendChild(frag(
        `<span class="desk-sticker"><strong>${s.value}</strong><span>${s.label}</span></span>`
      ));
    });
    return card;
  }

  /* ---------- Artifact 4: Quick Recruiter Dock ---------- */

  function copyEmail() {
    const done = () => showToast('Email copied \u2014 rajathajeru@gmail.com');
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => fallbackCopy(done));
    } else {
      fallbackCopy(done);
    }
  }

  function fallbackCopy(done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      done();
    } catch (e) {
      showToast(EMAIL);
    }
  }

  function openContactTab() {
    closeDesk();
    setTimeout(() => {
      const links = Array.from(document.querySelectorAll('[data-nav-link]'));
      const contact = links.find((el) => (el.textContent || '').trim().toLowerCase() === 'contact')
        || links[links.length - 1];
      if (contact) {
        contact.click();
        return;
      }
      const section = document.getElementById('contact');
      if (section) section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }, reduced ? 260 : 540);
  }

  function buildDock() {
    const card = frag(
      '<section class="desk-artifact desk-dock" aria-label="Quick recruiter dock">' +
      '  <div class="desk-head">' +
      '    <span class="desk-kicker">Quick Recruiter Dock</span>' +
      (canDrag ? '    <button type="button" class="desk-grip" tabindex="-1" aria-hidden="true" title="Drag card"></button>' : '') +
      '  </div>' +
      '  <div class="dock-row">' +
      '    <button type="button" class="desk-chip desk-chip--accent" id="deskCopyEmail">Copy Email \u2198</button>' +
      '    <a class="desk-chip" href="assets/resumes/Rajath_Kiran_A_Resume.pdf" download>Download PDF Resume</a>' +
      '    <button type="button" class="desk-chip" id="deskContact">Open Contact Tab</button>' +
      '  </div>' +
      '  <p class="dock-note">Grab anything, flip the lights below-left, or fold the sheet back \u2014 nothing here bites.</p>' +
      '</section>'
    );
    card.dataset.artifact = 'dock';
    card.querySelector('#deskCopyEmail').addEventListener('click', copyEmail);
    card.querySelector('#deskContact').addEventListener('click', openContactTab);
    return card;
  }

  /* ---------- Dragging (desktop, grip handles) ---------- */

  function makeDraggable(card) {
    const grip = card.querySelector('.desk-grip');
    if (!grip) return;
    let start = null;
    let base = { x: 0, y: 0 };

    grip.addEventListener('pointerdown', (e) => {
      start = { x: e.clientX, y: e.clientY };
      base = readTransform(card);
      grip.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    grip.addEventListener('pointermove', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (!card.classList.contains('is-dragged') && Math.abs(dx) + Math.abs(dy) < 4) return;
      card.classList.add('is-dragged');
      card.style.transform = `translate(${base.x + dx}px, ${base.y + dy}px)`;
      card.style.zIndex = '5';
    });

    const stop = () => {
      start = null;
    };
    grip.addEventListener('pointerup', stop);
    grip.addEventListener('pointercancel', stop);
  }

  function readTransform(card) {
    const match = /translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(card.style.transform || '');
    return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: 0, y: 0 };
  }

  function resetLayout() {
    if (!desk) return;
    let cleared = 0;
    desk.querySelectorAll('.desk-artifact').forEach((card) => {
      if (card.classList.contains('is-dragged')) cleared += 1;
      card.classList.remove('is-dragged');
      card.style.transform = '';
      card.style.zIndex = '';
    });
    showToast(cleared ? 'Desk layout reset' : 'Layout already in grid position');
  }

  /* ---------- Open / close + focus management ---------- */

  let isOpen = false;

  function openDesk() {
    if (isOpen || !desk || !trigger) return;
    isOpen = true;
    lastFocus = document.activeElement;
    desk.hidden = false;
    document.body.classList.add('studio-desk-open');
    syncLights();
    const prevOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    desk.dataset.prevOverflow = prevOverflow || '';
    loadPulse();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => desk.classList.add('open'));
    });
    trigger.setAttribute('aria-expanded', 'true');
    const closeBtn = desk.querySelector('#deskClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeDesk() {
    if (!isOpen || !desk || !trigger) return;
    isOpen = false;
    desk.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('studio-desk-open');
    document.body.style.overflow = desk.dataset.prevOverflow || '';
    const duration = reduced ? 260 : 520;
    setTimeout(() => {
      if (!isOpen) desk.hidden = true;
    }, duration);
    const target = lastFocus && document.contains(lastFocus) ? lastFocus : trigger;
    if (target && typeof target.focus === 'function') target.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab' || !desk) return;
    const focusables = Array.from(
      desk.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !desk.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && isOpen) {
      if (typeof window.__rkStudioDossierIsOpen === 'function' && window.__rkStudioDossierIsOpen()) return;
      e.preventDefault();
      closeDesk();
    }
  }

  /* ---------- Boot ---------- */

  function boot() {
    if (!document.body) return;
    buildCorner();
    buildDesk();
    desk.querySelectorAll('.desk-artifact').forEach(makeDraggable);
    document.addEventListener('keydown', onKeydown);
    window.__rkStudioDeskOpen = openDesk;
    window.__rkStudioDeskClose = closeDesk;
    window.__rkStudioDeskIsOpen = () => isOpen;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
