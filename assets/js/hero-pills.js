/**
 * RK HERO PILLS — hero-pills.js
 * Inline bio project pills with Studio Polaroid hover previews,
 * primary CTA + split-pill quick contact (copy email w/ mint check).
 * Self-contained IIFE; pairs with the section-11 block in editorial-craft.css.
 */
(function () {
  'use strict';

  if (window.__rkHeroPillsBooted) return;
  window.__rkHeroPillsBooted = true;

  const EMAIL = 'rajathajeru@gmail.com';
  const reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Shared toast (.craft-copy-toast pattern, top-center) ---------- */

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

  /* ---------- Studio Polaroid preview ---------- */

  const polaroid = document.getElementById('bioPolaroid');
  const polImg = polaroid ? polaroid.querySelector('.polaroid-photo img') : null;
  const polMetric = polaroid ? polaroid.querySelector('.polaroid-metric-text') : null;
  let hideTimer = null;

  function scheduleHide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePolaroid, 150);
  }

  function hidePolaroid() {
    if (!polaroid) return;
    polaroid.classList.remove('show');
  }

  const POLAROID_SAFE = 16;

  function placePolaroid(pill) {
    const rect = pill.getBoundingClientRect();
    const w = polaroid.offsetWidth;
    const h = polaroid.offsetHeight;
    let left = rect.left + rect.width / 2 - w / 2;
    left = Math.max(POLAROID_SAFE, Math.min(left, window.innerWidth - w - POLAROID_SAFE));
    let top = rect.top - h - 14;
    if (top < 96) top = rect.bottom + 14;
    top = Math.max(POLAROID_SAFE, Math.min(top, window.innerHeight - h - POLAROID_SAFE));
    polaroid.style.left = `${Math.round(left)}px`;
    polaroid.style.top = `${Math.round(top)}px`;

    // Re-clamp against the laid-out rect: rotation, tape offset and the
    // hard shadow can push a corner past the pre-clamp bounds.
    const shown = polaroid.getBoundingClientRect();
    let dx = 0, dy = 0;
    if (shown.left < POLAROID_SAFE) dx = POLAROID_SAFE - shown.left;
    else if (shown.right > window.innerWidth - POLAROID_SAFE) {
      dx = (window.innerWidth - POLAROID_SAFE) - shown.right;
    }
    if (shown.top < POLAROID_SAFE) dy = POLAROID_SAFE - shown.top;
    else if (shown.bottom > window.innerHeight - POLAROID_SAFE) {
      dy = (window.innerHeight - POLAROID_SAFE) - shown.bottom;
    }
    if (dx || dy) {
      polaroid.style.left = `${Math.round(parseFloat(polaroid.style.left) + dx)}px`;
      polaroid.style.top = `${Math.round(parseFloat(polaroid.style.top) + dy)}px`;
    }
  }

  function positionPolaroid(pill) {
    placePolaroid(pill);
    polaroid.classList.add('show');
    requestAnimationFrame(() => placePolaroid(pill));
  }

  function showPolaroid(pill) {
    if (!polaroid || !polImg || !polMetric) return;
    const src = pill.getAttribute('data-polaroid-img');
    const metric = pill.getAttribute('data-polaroid-metric');
    if (!src || !metric) return;
    if (polImg.getAttribute('src') !== src) polImg.setAttribute('src', src);
    polMetric.textContent = metric;
    positionPolaroid(pill);
    polaroid.classList.add('show');
  }

  function wirePills() {
    document.querySelectorAll('.bio-pill').forEach((pill) => {
      if (canHover) {
        pill.addEventListener('mouseenter', () => {
          if (hideTimer) clearTimeout(hideTimer);
          showPolaroid(pill);
        });
        pill.addEventListener('mouseleave', scheduleHide);
        pill.addEventListener('focus', () => showPolaroid(pill));
        pill.addEventListener('blur', scheduleHide);
      }
      pill.addEventListener('click', () => {
        hidePolaroid();
        if (typeof window.__rkStudioDossierOpen === 'function') {
          window.__rkStudioDossierOpen(pill.dataset.dossierSlug, pill);
        }
      });
    });

    if (polaroid) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hidePolaroid();
      });
      window.addEventListener('scroll', hidePolaroid, { passive: true });
    }
  }

  /* ---------- Split-pill quick contact ---------- */

  function copyEmail(btn) {
    const done = () => {
      btn.classList.add('copied');
      showToast('Email copied!');
      setTimeout(() => btn.classList.remove('copied'), 1800);
    };
    const fallback = () => {
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
      } catch (err) {
        showToast(EMAIL);
      }
    };
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(EMAIL).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  const TAB_ANCHORS = {
    projects: 'work',
    work: 'work',
    contact: 'contact',
    blog: 'writing',
    writing: 'writing',
    resume: 'experience',
    experience: 'experience'
  };

  function goToTab(label) {
    const links = Array.from(document.querySelectorAll('[data-nav-link]'));
    const target = links.find(
      (el) => (el.textContent || '').trim().toLowerCase() === label.toLowerCase()
    );
    if (target) {
      target.click();
      window.scrollTo(0, 0);
      return;
    }
    const anchorId = TAB_ANCHORS[label.toLowerCase()];
    const section = anchorId ? document.getElementById(anchorId) : null;
    if (section) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /* ---------- Boot ---------- */

  function boot() {
    wirePills();
    const primary = document.querySelector('[data-hero-cta-projects]');
    if (primary) primary.addEventListener('click', () => goToTab('Projects'));
    const touch = document.querySelector('[data-hero-contact]');
    if (touch) touch.addEventListener('click', () => goToTab('Contact'));
    const copyBtn = document.querySelector('.hero-pill-copy');
    if (copyBtn && !copyBtn.hasAttribute('data-v3-copy-email')) {
      copyBtn.addEventListener('click', () => copyEmail(copyBtn));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
