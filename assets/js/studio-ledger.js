/* ============================================================================
   STUDIO CAREER LEDGER — resume interactions (jump strip, domain tabs, dossier)
   v1.0 · boot-guarded IIFE · defer
============================================================================ */
(function () {
  'use strict';

  if (window.__rkStudioLedgerBooted) return;
  window.__rkStudioLedgerBooted = true;

  var MO = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  function initJumpStrip() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.sled-jump-link'));
    if (!links.length) return;
    var sections = links
      .map(function (l) { return document.getElementById(l.getAttribute('data-ledger-jump')); })
      .filter(Boolean);

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var target = document.getElementById(link.getAttribute('data-ledger-jump'));
        if (!target) return;
        setActive(link);
        target.scrollIntoView({ behavior: MO ? 'auto' : 'smooth', block: 'start' });
      });
    });

    function setActive(active) {
      links.forEach(function (l) { l.classList.toggle('is-active', l === active); });
    }

    if (!('IntersectionObserver' in window) || !sections.length) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = links.filter(function (l) { return document.getElementById(l.getAttribute('data-ledger-jump')) === entry.target; })[0];
        if (link) setActive(link);
      });
    }, { threshold: 0.05, rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  function initStackTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.sled-tab'));
    if (!tabs.length) return;
    var panels = Array.prototype.slice.call(document.querySelectorAll('.sled-stack-panel'));

    function activate(tab) {
      var domain = tab.getAttribute('data-domain');
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute('data-panel') !== domain;
      });
    }

    tabs.forEach(function (tab, idx) {
      tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = tabs[(idx + dir + tabs.length) % tabs.length];
        next.focus();
        activate(next);
      });
    });
  }

  function initDossierLinks() {
    var triggers = document.querySelectorAll('[data-dossier-open]');
    if (!triggers.length) return;

    triggers.forEach(function (btn) {
      if (btn.__ledgerWired) return;
      btn.__ledgerWired = true;
      btn.addEventListener('click', function () {
        var slug = btn.getAttribute('data-dossier-open');
        if (typeof window.__rkStudioDossierOpen === 'function') {
          window.__rkStudioDossierOpen(slug, btn);
          return;
        }
        var anchor = document.querySelector('[data-project-url*="' + slug + '"]');
        if (anchor && typeof window.__rkStudioDossierOpenFor === 'function') {
          window.__rkStudioDossierOpenFor(anchor);
        }
      });
    });
  }

  function boot() {
    initJumpStrip();
    initStackTabs();
    initDossierLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
