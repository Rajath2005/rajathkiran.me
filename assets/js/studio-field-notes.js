/* ============================================================================
   STUDIO FIELD NOTES — Blog tab filter pills (fnotes-* namespace)
   v1.0 · boot-guarded IIFE · defer
============================================================================ */
(function () {
  'use strict';

  if (window.__rkFieldNotesBooted) return;
  window.__rkFieldNotesBooted = true;

  function boot() {
    const buttons = Array.from(document.querySelectorAll('.fnotes-filter'));
    if (!buttons.length) return;

    const featured = document.querySelector('.fnotes-featured');
    const rows = Array.from(document.querySelectorAll('.fnotes-row'));

    function apply(filter) {
      if (featured) {
        show(featured, filter === 'all' || featured.getAttribute('data-blog-cat') === filter);
      }
      rows.forEach((row) => {
        show(row, filter === 'all' || row.getAttribute('data-blog-cat') === filter);
      });
    }

    function show(el, visible) {
      el.hidden = !visible;
      el.style.display = visible ? '' : 'none';
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-blog-filter');
        buttons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        apply(filter);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
