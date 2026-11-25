/* v3 open-canvas behaviors: theme, drawers, dossier wiring, email copy, IST clock */
(function () {
  'use strict';

  if (window.__rkV3Booted) return;
  window.__rkV3Booted = true;

  var THEME_KEY = 'rk_theme_mode';
  var EMAIL = 'rajathajeru@gmail.com';

  function getTheme() {
    var t = document.body.getAttribute('data-theme') ||
      document.documentElement.getAttribute('data-v3-theme');
    return t === 'dark' ? 'dark' : 'light';
  }

  function setTheme(mode, persist) {
    if (mode !== 'dark' && mode !== 'light') mode = 'light';
    document.body.setAttribute('data-theme', mode);
    document.documentElement.setAttribute('data-v3-theme', mode);
    if (persist !== false) {
      try { localStorage.setItem(THEME_KEY, mode); } catch (e) { /* storage blocked */ }
    }
    document.dispatchEvent(new CustomEvent('rk_theme_change', { detail: { theme: mode } }));
  }

  setTheme(getTheme(), false);

  function showToast(message) {
    var existing = document.querySelector('.craft-copy-toast.desk-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'craft-copy-toast desk-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    toast.style.cssText =
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'z-index:99999;padding:10px 18px;border-radius:10px;' +
      'font:600 13px "JetBrains Mono",monospace;pointer-events:none;opacity:0;' +
      'transition:opacity .16s ease;';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.style.opacity = '1'; });
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 200);
    }, 1800);
  }

  function copyEmail(trigger) {
    var done = function () {
      showToast('Email copied — ' + EMAIL);
      document.querySelectorAll('[data-v3-copy-email]').forEach(function (el) {
        el.classList.add('is-copied');
      });
      setTimeout(function () {
        document.querySelectorAll('[data-v3-copy-email]').forEach(function (el) {
          el.classList.remove('is-copied');
        });
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { legacyCopy(done); });
    } else {
      legacyCopy(done);
    }
  }

  function legacyCopy(done) {
    var ta = document.createElement('textarea');
    ta.value = EMAIL;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
    ta.remove();
    done();
  }

  function smoothScrollTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function markActiveNav() {
    var links = document.querySelectorAll('.v3-nav a[href^="#"]');
    if (!links.length) return;
    var sections = Array.prototype.map.call(links, function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var active = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('is-active', active);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  function boot() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      });
    });

    var copyTargets = document.querySelectorAll('[data-v3-copy-email]');
    copyTargets.forEach(function (el) {
      el.addEventListener('click', function () { copyEmail(el); });
    });

    var archiveToggle = document.querySelector('[data-archive-toggle]');
    var archiveDrawer = document.getElementById('v3ArchiveDrawer');
    var archiveLabel = document.querySelector('[data-archive-label]');
    if (archiveToggle && archiveDrawer) {
      archiveToggle.addEventListener('click', function () {
        var open = archiveDrawer.hasAttribute('hidden');
        if (open) {
          archiveDrawer.removeAttribute('hidden');
        } else {
          archiveDrawer.setAttribute('hidden', '');
        }
        archiveToggle.setAttribute('aria-expanded', String(open));
        if (archiveLabel) {
          archiveLabel.textContent = open ? 'Collapse archive' : 'Explore full archive (14 more)';
        }
      });
    }

    var eduToggle = document.querySelector('[data-edu-toggle]');
    var eduDetails = document.getElementById('v3EduDetails');
    if (eduToggle && eduDetails) {
      eduToggle.addEventListener('click', function () {
        var open = eduDetails.hasAttribute('hidden');
        if (open) {
          eduDetails.removeAttribute('hidden');
        } else {
          eduDetails.setAttribute('hidden', '');
        }
        eduToggle.setAttribute('aria-expanded', String(open));
      });
    }

    document.querySelectorAll('[data-dossier-open]').forEach(function (el) {
      el.addEventListener('click', function () {
        var slug = el.getAttribute('data-dossier-open');
        if (window.__rkStudioDossierOpen && slug) window.__rkStudioDossierOpen(slug, el);
      });
    });

    document.querySelectorAll('[data-dossier-slug]').forEach(function (el) {
      if (el.hasAttribute('data-pill-bound') || el.classList.contains('bio-pill')) return;
      el.addEventListener('click', function () {
        var slug = el.getAttribute('data-dossier-slug');
        if (window.__rkStudioDossierOpen && slug) window.__rkStudioDossierOpen(slug, el);
      });
    });

    document.querySelectorAll('.v3-nav a[href^="#"], a.v3-btn[href^="#"], .hero-pill-left[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var id = a.getAttribute('href').slice(1);
        if (!id || !document.getElementById(id)) return;
        ev.preventDefault();
        smoothScrollTo(id);
        history.replaceState(null, '', '#' + id);
      });
    });

    var clockEl = document.querySelector('[data-v3-clock]');
    if (clockEl) {
      var render = function () {
        try {
          clockEl.textContent = 'Mangalore, India — ' +
            new Intl.DateTimeFormat('en-US', {
              timeZone: 'Asia/Kolkata',
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            }).format(new Date()) + ' IST (UTC+5:30)';
        } catch (e) {
          clockEl.textContent = 'Mangalore, India — IST (UTC+5:30)';
        }
      };
      render();
      setInterval(render, 1000);
    }

    markActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
