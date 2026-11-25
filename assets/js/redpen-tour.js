/* ============================================================
   RK RED-PEN TOUR — "the art director's proofing pass"
   A 60-second guided recruiter walkthrough drawn in red ink:
   self-drawing ellipse rings, Caveat margin notes, and a
   final "READY FOR HIRE" stamp. Editorial-craft native.
============================================================ */

(() => {
  'use strict';

  const STEPS = [
    {
      page: 'about',
      target: '.avatar-box',
      note: 'Rajath — CS @ VCET, class of \u201927',
      notePos: 'bottom'
    },
    {
      page: 'about',
      target: '.resume-btn',
      note: 'one-click CV \u2197',
      notePos: 'right'
    },
    {
      page: 'resume',
      target: '.craft-proof-card',
      note: '2\u00d7 VTU #1 \u00b7 proof, not claims',
      notePos: 'bottom'
    },
    {
      page: 'projects',
      target: 'a[href="copd-detection.html"]',
      note: 'the research one \u2605 6,898 respiratory cycles',
      notePos: 'top'
    },
    {
      page: 'projects',
      target: 'a[href="ayudost.html"]',
      note: 'AyuDost \u00b7 20+ open-source contributors',
      notePos: 'bottom'
    },
    {
      page: 'contact',
      target: '.contact-form',
      note: 'say hi \u2014 I actually reply',
      notePos: 'top',
      stamp: 'READY FOR HIRE \u00b7 2026'
    }
  ];

  const REDPEN = () =>
    document.body.dataset.theme === 'dark' ? '#ef5350' : '#d0342c';
  const PAPER = () =>
    document.body.dataset.theme === 'dark' ? 'rgba(11,12,16,0.62)' : 'rgba(250,248,245,0.62)';

  let active = false;
  let stepIdx = -1;
  let layers = null;
  let focusBefore = null;

  /* ---------------- helpers ---------------- */
  const reducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

  const goToPage = (page) => {
    const link = Array.from(document.querySelectorAll('[data-nav-link]'))
      .find(el => el.textContent.trim().toLowerCase() === page);
    if (!link) return false;
    const already = document.querySelector(`article[data-page="${page}"]`)?.classList.contains('active');
    if (!already) link.click();
    return true;
  };

  const resolveNoteXY = (rect, pos) => {
    const pad = 18;
    switch (pos) {
      case 'top': return { x: rect.left + rect.width / 2, y: rect.top - pad, anchor: 'middle-below' };
      case 'bottom': return { x: rect.left + rect.width / 2, y: rect.bottom + pad, anchor: 'middle-above' };
      case 'right': return { x: rect.right + pad, y: rect.top + rect.height / 2, anchor: 'left-middle' };
      default: return { x: rect.left + rect.width / 2, y: rect.bottom + pad, anchor: 'middle-above' };
    }
  };

  /* ---------------- stage build ---------------- */
  const buildStage = () => {
    const stage = document.createElement('div');
    stage.id = 'rk-redpen-stage';
    stage.innerHTML = `
      <div class="rk-curtain" data-edge="top"></div>
      <div class="rk-curtain" data-edge="bottom"></div>
      <div class="rk-curtain" data-edge="left"></div>
      <div class="rk-curtain" data-edge="right"></div>
      <svg class="rk-ink-ring" viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true">
        <ellipse class="rk-ink-ellipse rk-ink-pass1" cx="50" cy="32" rx="46" ry="26" pathLength="100"/>
        <ellipse class="rk-ink-ellipse rk-ink-pass2" cx="51.5" cy="31" rx="47" ry="27.5" pathLength="100"/>
      </svg>
      <svg class="rk-ink-arrow" viewBox="0 0 40 20" aria-hidden="true">
        <path class="rk-ink-path" d="M2 16 C 12 4, 24 18, 36 6" pathLength="100"/>
        <path class="rk-ink-path" d="M30 3 l6.5 2.6 -4.6 5.2" pathLength="100" fill="none"/>
      </svg>
      <div class="rk-margin-note" role="status"></div>
      <div class="rk-stamp" aria-hidden="true"></div>
      <div class="rk-tour-dock" role="navigation" aria-label="Tour controls">
        <button class="rk-dock-btn" data-tour-exit aria-label="Exit tour">✕</button>
        <span class="rk-dock-progress"><span class="rk-dock-step" id="rk-dock-step">1/6</span></span>
        <button class="rk-dock-btn" data-tour-prev aria-label="Previous stop">←</button>
        <button class="rk-dock-btn rk-dock-next" data-tour-next aria-label="Next stop">→</button>
      </div>`;
    document.body.appendChild(stage);
    requestAnimationFrame(() => stage.classList.add('revealed'));
    return stage;
  };

  const positionStage = (target, notePos) => {
    const r = target.getBoundingClientRect();
    const pad = 10;
    const ringR = {
      left: r.left - pad, top: r.top - pad,
      width: r.width + pad * 2, height: r.height + pad * 2
    };

    layers.ring.style.left = `${ringR.left}px`;
    layers.ring.style.top = `${ringR.top}px`;
    layers.ring.style.width = `${ringR.width}px`;
    layers.ring.style.height = `${ringR.height}px`;

    layers.curtains.top.style.height = `${Math.max(0, r.top - pad)}px`;
    layers.curtains.bottom.style.height = `${Math.max(0, window.innerHeight - r.bottom - pad)}px`;
    layers.curtains.left.style.top = layers.curtains.right.style.top = `${Math.max(0, r.top - pad)}px`;
    layers.curtains.left.style.height = layers.curtains.right.style.height = `${r.height + pad * 2}px`;
    layers.curtains.left.style.width = `${Math.max(0, r.left - pad)}px`;
    layers.curtains.right.style.width = `${Math.max(0, window.innerWidth - r.right - pad)}px`;

    let n = resolveNoteXY(ringR, notePos);
    n.x = Math.min(Math.max(n.x, 150), window.innerWidth - 150);
    n.y = Math.min(Math.max(n.y, 40), window.innerHeight - 60);
    const note = layers.note;
    note.style.left = `${n.x}px`;
    note.style.top = `${n.y}px`;
    note.style.transform = 'translate(-50%, -50%) rotate(-2.5deg)';

    // arrow: from note toward the ring edge
    const aw = 56, ah = 28;
    const midX = ringR.left + ringR.width / 2;
    let ax, ay, flip = '';
    if (notePos === 'top') { ax = midX - aw / 2; ay = n.y + 8; flip = 'scaleY(-1)'; }
    else { ax = midX - aw / 2; ay = n.y - ah - 8; }
    const arr = layers.arrow;
    arr.style.left = `${ax}px`;
    arr.style.top = `${ay}px`;
    arr.style.width = `${aw}px`;
    arr.style.height = `${ah}px`;
    arr.style.transform = flip;
  };

  /* ---------------- step engine ---------------- */
  const showStep = (idx) => {
    const step = STEPS[idx];
    if (!step) return;
    stepIdx = idx;

    goToPage(step.page);

    const settle = () => {
      const target = document.querySelector(step.target);
      if (!target) { idx < STEPS.length - 1 ? showStep(idx + 1) : exitTour(false); return; }

      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });

      layers.note.textContent = step.note;
      layers.note.classList.remove('drawn');
      void layers.note.offsetWidth;
      layers.note.classList.add('drawn');

      layers.ring.classList.remove('drawn');
      layers.arrow.classList.remove('drawn');
      void layers.ring.offsetWidth;
      if (!reducedMotion()) {
        layers.ring.classList.add('drawn');
        layers.arrow.classList.add('drawn');
      }

      if (step.stamp) {
        layers.stamp.textContent = step.stamp;
        layers.stamp.classList.remove('thunked');
        void layers.stamp.offsetWidth;
        setTimeout(() => {
          if (!active) return;
          const r = document.querySelector('.contact-form')?.getBoundingClientRect();
          layers.stamp.style.left = `${(r?.left ?? window.innerWidth / 2) + (r?.width ?? 0) / 2}px`;
          layers.stamp.style.top = `${(r?.top ?? window.innerHeight / 2) - 6}px`;
          layers.stamp.classList.add('thunked');
        }, reducedMotion() ? 200 : 1100);
      } else {
        layers.stamp.classList.remove('thunked');
      }

      document.getElementById('rk-dock-step').textContent = `${idx + 1}/${STEPS.length}`;
      layers.dock.querySelector('[data-tour-prev]').style.visibility = idx === 0 ? 'hidden' : 'visible';
      layers.dock.querySelector('[data-tour-next]').textContent = idx === STEPS.length - 1 ? '✓' : '→';
    };

    if (!reducedMotion()) setTimeout(settle, 120);
    else settle();
  };

  const nextStep = () => {
    if (stepIdx >= STEPS.length - 1) exitTour(true);
    else showStep(stepIdx + 1);
  };
  const prevStep = () => { if (stepIdx > 0) showStep(stepIdx - 1); };

  /* ---------------- lifecycle ---------------- */
  const startTour = () => {
    if (active) return;
    active = true;
    focusBefore = document.activeElement;

    const stage = buildStage();
    layers = {
      stage,
      curtains: {
        top: stage.querySelector('[data-edge="top"]'),
        bottom: stage.querySelector('[data-edge="bottom"]'),
        left: stage.querySelector('[data-edge="left"]'),
        right: stage.querySelector('[data-edge="right"]')
      },
      ring: stage.querySelector('.rk-ink-ring'),
      arrow: stage.querySelector('.rk-ink-arrow'),
      note: stage.querySelector('.rk-margin-note'),
      stamp: stage.querySelector('.rk-stamp'),
      dock: stage.querySelector('.rk-tour-dock')
    };

    stage.querySelector('[data-tour-next]').addEventListener('click', nextStep);
    stage.querySelector('[data-tour-prev]').addEventListener('click', prevStep);
    stage.querySelector('[data-tour-exit]').addEventListener('click', () => exitTour(false));

    const track = () => {
      if (!active) return;
      const step = STEPS[stepIdx];
      const el = step && document.querySelector(step.target);
      if (el) {
        positionStage(el, step.notePos);
        if (step.stamp && layers.stamp.classList.contains('thunked')) {
          const r = document.querySelector('.contact-form')?.getBoundingClientRect();
          if (r) {
            layers.stamp.style.left = `${r.left + r.width / 2}px`;
            layers.stamp.style.top = `${r.top - 6}px`;
          }
        }
      }
      requestAnimationFrame(track);
    };
    requestAnimationFrame(track);

    document.body.classList.add('rk-tour-active');
    document.addEventListener('keydown', tourKeys);

    showStep(0);
  };

  const tourKeys = (e) => {
    if (!active) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); nextStep(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prevStep(); }
    else if (e.key === 'Escape') { e.preventDefault(); exitTour(false); }
  };

  const exitTour = (finished) => {
    if (!active) return;
    active = false;
    document.removeEventListener('keydown', tourKeys);
    document.body.classList.remove('rk-tour-active');
    layers?.stage?.remove();
    layers = null;
    focusBefore?.focus?.();

    if (finished) {
      const toast = document.createElement('div');
      toast.className = 'craft-copy-toast';
      toast.textContent = '✓ Tour finished — the inbox is open: rajathajeru@gmail.com';
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => toast.remove(), 3200);
    }
  };

  /* ---------------- boot + integration ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.__rkTourBooted) return;
    window.__rkTourBooted = true;

    const badge = document.querySelector('.open-to-work-badge');
    if (badge && !badge.nextElementSibling?.classList.contains('rk-tour-chip')) {
      const chip = document.createElement('button');
      chip.className = 'rk-tour-chip';
      chip.type = 'button';
      chip.innerHTML = '<ion-icon name="play" aria-hidden="true"></ion-icon><span>the 60-sec tour</span>';
      chip.addEventListener('click', startTour);
      badge.after(chip);
    }

    window.addEventListener('rk:redpen-tour', startTour);
    window.__rkStartRedPenTour = startTour;
  });
})();
