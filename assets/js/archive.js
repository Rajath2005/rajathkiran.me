/**
 * RK STUDIO ARCHIVE — The Contact Sheet (archive.js)
 * Light-table preview, keyboard rack navigation, scroll reveal, theme dock.
 * Self-contained; pairs with archive.css on Editorial Studio Craft tokens.
 */
(function () {
  'use strict';

  if (window.__rkArchiveBooted) return;
  window.__rkArchiveBooted = true;

  const rows = Array.from(document.querySelectorAll('.sheet-row'));
  const ltImg = document.getElementById('lt-img');
  const ltNo = document.getElementById('lt-no');
  const ltName = document.getElementById('lt-name');
  const ltKind = document.getElementById('lt-kind');
  const ltOpen = document.getElementById('lt-open');
  const ltCount = document.getElementById('lt-count');
  let activeIndex = -1;

  const reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rotFor(i) {
    return ((i * 37) % 7) - 3;
  }

  function activate(i, swapImage = true) {
    if (i < 0 || i >= rows.length || i === activeIndex) return;
    rows.forEach(r => r.classList.remove('is-active'));
    activeIndex = i;
    const row = rows[i];
    row.classList.add('is-active');

    if (!ltImg || !ltNo || !ltName || !ltKind || !ltOpen || !ltCount) return;
    const src = row.getAttribute('data-img');
    if (src && swapImage) {
      if (ltImg.getAttribute('src') === src) {
        ltImg.classList.remove('is-swapping');
      } else if (reduced) {
        ltImg.setAttribute('src', src);
      } else {
        ltImg.classList.add('is-swapping');
        setTimeout(() => {
          ltImg.setAttribute('src', src);
          requestAnimationFrame(() => ltImg.classList.remove('is-swapping'));
        }, 120);
      }
    }
    ltNo.textContent = `FR-${row.getAttribute('data-no')}`;
    const nameEl = row.querySelector('.row-name');
    ltName.textContent = nameEl ? nameEl.textContent : '';
    const kindEl = row.querySelector('.row-kind');
    ltKind.textContent = kindEl ? kindEl.textContent : '';
    ltOpen.setAttribute('href', row.getAttribute('href'));
    if (row.target === '_blank') {
      ltOpen.setAttribute('target', '_blank');
      ltOpen.setAttribute('rel', 'noopener noreferrer');
    } else {
      ltOpen.removeAttribute('target');
      ltOpen.removeAttribute('rel');
    }
    ltCount.textContent = `${row.getAttribute('data-no')} / ${rows.length} \u00B7 proof print`;
    if (!reduced) {
      ltImg.style.transform = `rotate(${rotFor(i) / 3}deg) scale(1.04)`;
    }
  }

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => activate(i));
    row.addEventListener('focus', () => activate(i));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
    activate(e.key === 'ArrowDown' ? activeIndex + 1 : activeIndex - 1);
    if (rows[activeIndex]) rows[activeIndex].focus({ preventScroll: false });
  });

  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    rows.forEach(row => io.observe(row));
  } else {
    rows.forEach(row => row.classList.add('is-in'));
  }

  rows.forEach(row => {
    const src = row.getAttribute('data-img');
    if (src) { const pre = new Image(); pre.src = src; }
  });

  if (rows.length) activate(0);

  /* Theme dock — same pill styles as the portfolio's craft dock */
  const dock = document.createElement('div');
  dock.id = 'theme-toggle-dock';
  dock.className = 'theme-toggle-dock';
  const initial = document.body.getAttribute('data-theme') || 'light';
  dock.innerHTML =
    `<button type="button" class="theme-pill-btn ${initial === 'light' ? 'active' : ''}" data-set-theme="light">Light</button>` +
    `<button type="button" class="theme-pill-btn ${initial === 'dark' ? 'active' : ''}" data-set-theme="dark">Dark</button>`;
  dock.querySelectorAll('.theme-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-set-theme');
      document.body.classList.add('theme-switching');
      document.body.setAttribute('data-theme', mode);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => document.body.classList.remove('theme-switching'));
      });
      try { localStorage.setItem('rk_theme_mode', mode); } catch (e) { /* no storage */ }
      dock.querySelectorAll('.theme-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.body.appendChild(dock);
})();
