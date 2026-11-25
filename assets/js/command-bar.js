/* Command Bar (v3) — cmdk-inspired tactile keyboard palette.
   Groups: Navigate, Case Studies, Studio Desk, Actions. */
(function () {
  'use strict';

  if (window.__rkCmdkBooted) return;
  window.__rkCmdkBooted = true;

  var EMAIL = 'rajathajeru@gmail.com';
  var RESUME_URL = 'assets/resumes/Rajath_Kiran_A_Resume.pdf';

  var root = null;
  var overlay = null;
  var panel = null;
  var input = null;
  var listEl = null;
  var emptyEl = null;
  var items = [];
  var activeIndex = 0;
  var lastFocus = null;
  var isOpen = false;

  var COMMANDS = [
    { group: 'Navigate', label: 'Selected Work', hint: '#work', run: function () { go('#work'); } },
    { group: 'Navigate', label: 'Experience & Proof', hint: '#experience', run: function () { go('#experience'); } },
    { group: 'Navigate', label: 'Field Notes — Writing', hint: '#writing', run: function () { go('#writing'); } },
    { group: 'Navigate', label: 'Contact', hint: '#contact', run: function () { go('#contact'); } },
    { group: 'Case Studies', label: 'Shramik-Nyay', hint: 'Dossier', run: function () { dossier('shramik'); } },
    { group: 'Case Studies', label: 'COPD Detection AI', hint: 'Dossier', run: function () { dossier('copd'); } },
    { group: 'Case Studies', label: 'MediQ Health Platform', hint: 'Dossier', run: function () { dossier('mediq'); } },
    { group: 'Case Studies', label: 'AyuDost AI', hint: 'Dossier', run: function () { dossier('ayudost'); } },
    { group: 'Case Studies', label: 'Highly Available Web App (GKE)', hint: 'Dossier', run: function () { dossier('gcp'); } },
    { group: 'Studio Desk', label: 'Open Studio Desk', hint: 'Peel sheet', run: function () { desk(); } },
    { group: 'Actions', label: 'Copy email', hint: EMAIL, run: function () { copyEmail(); } },
    { group: 'Actions', label: 'Download Resume PDF', hint: 'PDF', run: function () { triggerDownload(); } },
    { group: 'Actions', label: 'Toggle Light / Dark', hint: 'Theme', run: function () { toggleTheme(); } },
    { group: 'Actions', label: 'Studio Archive', hint: '28 frames', run: function () { window.location.href = 'archive.html'; } },
    { group: 'Actions', label: 'GitHub Profile', hint: '@Rajath2005', url: 'https://github.com/Rajath2005' },
    { group: 'Actions', label: 'LinkedIn Profile', hint: 'rajath-kiran', url: 'https://www.linkedin.com/in/rajath-kiran/' },
    { group: 'Actions', label: 'LeetCode', hint: '@rajath2005', url: 'https://leetcode.com/rajath2005' }
  ];

  function go(hash) {
    close();
    var el = document.querySelector(hash);
    if (!el) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }, 40);
  }

  function dossier(slug) {
    close();
    setTimeout(function () {
      if (window.__rkStudioDossierOpen) window.__rkStudioDossierOpen(slug);
    }, 60);
  }

  function desk() {
    close();
    setTimeout(function () {
      if (window.__rkStudioDeskOpen) window.__rkStudioDeskOpen();
      else if (window.__rkStudioPeelOpen) window.__rkStudioPeelOpen();
    }, 60);
  }

  function copyEmail() {
    var done = function () {
      if (window.__rkV3Toast) { window.__rkV3Toast('Email copied — ' + EMAIL); return; }
      buildToast('Email copied — ' + EMAIL);
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

  function buildToast(message) {
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

  function triggerDownload() {
    var a = document.createElement('a');
    a.href = RESUME_URL;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    a.remove();
    close();
  }

  function toggleTheme() {
    var body = document.body;
    var current = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    document.documentElement.setAttribute('data-v3-theme', next);
    try { localStorage.setItem('rk_theme_mode', next); } catch (e) { /* storage blocked */ }
    document.dispatchEvent(new CustomEvent('rk_theme_change', { detail: { theme: next } }));
  }

  function score(query, text) {
    if (!query) return 1;
    var q = query.toLowerCase();
    var t = text.toLowerCase();
    var direct = t.indexOf(q);
    if (direct === 0) return 100;
    if (direct > 0) return 60 + direct;
    var qi = 0;
    var subsequence = -1;
    for (var i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) {
        if (subsequence === -1) subsequence = i;
        qi++;
      }
    }
    if (qi === q.length) return 30 + subsequence;
    return -1;
  }

  function filterCommands(query) {
    return COMMANDS.map(function (cmd) {
      return { cmd: cmd, s: score(query, cmd.label + ' ' + (cmd.hint || '')) };
    })
      .filter(function (x) { return x.s >= 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (x) { return x.cmd; });
  }

  function render(query) {
    var results = filterCommands((query || '').trim());
    items = [];
    listEl.innerHTML = '';
    activeIndex = 0;

    if (!results.length) {
      emptyEl.removeAttribute('hidden');
      return;
    }
    emptyEl.setAttribute('hidden', '');

    var lastGroup = null;
    results.forEach(function (cmd) {
      if (cmd.group !== lastGroup) {
        var gl = document.createElement('li');
        gl.className = 'cmdk3-group-label';
        gl.textContent = cmd.group;
        listEl.appendChild(gl);
        lastGroup = cmd.group;
      }
      var li = document.createElement('li');
      li.className = 'cmdk3-item';
      li.setAttribute('role', 'option');
      li.setAttribute('data-active', String(items.length === 0));

      var label = document.createElement('span');
      label.className = 'cmdk3-item-label';
      label.textContent = cmd.label;

      var hint = document.createElement('span');
      hint.className = 'cmdk3-item-hint';
      hint.textContent = cmd.hint || (cmd.url ? 'Opens site' : 'Enter');

      li.appendChild(label);
      li.appendChild(hint);
      li.addEventListener('click', function () { execute(cmd); });
      li.addEventListener('mousemove', function () { setActive(items.indexOf(li)); });
      listEl.appendChild(li);
      items.push(li);
      li.__cmd = cmd;
    });

    setActive(0);
  }

  function setActive(index) {
    if (!items.length) return;
    activeIndex = Math.max(0, Math.min(index, items.length - 1));
    items.forEach(function (el, i) {
      el.setAttribute('data-active', String(i === activeIndex));
      if (i === activeIndex) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function execute(cmd) {
    if (!cmd) return;
    if (cmd.url) {
      window.open(cmd.url, '_blank', 'noopener,noreferrer');
      close();
      return;
    }
    if (typeof cmd.run === 'function') cmd.run();
  }

  function build() {
    root = document.createElement('div');
    root.className = 'cmdk3-overlay';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Command palette');
    root.innerHTML =
      '<div class="cmdk3-panel" role="document">' +
      '  <div class="cmdk3-input-wrap">' +
      '    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="4.5"></circle><path d="M10.5 10.5L14 14"></path></svg>' +
      '    <input class="cmdk3-input" type="text" placeholder="Type a command or search…" ' +
      '           aria-label="Search commands" autocomplete="off" spellcheck="false">' +
      '    <span class="cmdk3-key">ESC</span>' +
      '  </div>' +
      '  <ul class="cmdk3-list" role="listbox" aria-label="Commands"></ul>' +
      '  <div class="cmdk3-empty" hidden>No matching commands.</div>' +
      '  <div class="cmdk3-foot">' +
      '    <span>↑↓ navigate</span><span>↵ run</span><span>esc close</span>' +
      '    <span style="margin-left:auto">rajathkiran.me ⌘K</span>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(root);

    overlay = root;
    panel = root.querySelector('.cmdk3-panel');
    input = root.querySelector('.cmdk3-input');
    listEl = root.querySelector('.cmdk3-list');
    emptyEl = root.querySelector('.cmdk3-empty');

    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) close();
    });
  }

  function open() {
    if (isOpen) return;
    if (!root) build();
    isOpen = true;
    lastFocus = document.activeElement;
    root.classList.remove('is-closing');
    root.removeAttribute('hidden');
    void root.offsetWidth;
    root.classList.add('is-open');
    input.value = '';
    render('');
    document.addEventListener('keydown', onKeydown, true);
    setTimeout(function () { input.focus(); }, 30);
  }

  function close() {
    if (!isOpen || !root) return;
    isOpen = false;
    document.removeEventListener('keydown', onKeydown, true);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      root.classList.remove('is-open');
      root.setAttribute('hidden', '');
    } else {
      root.classList.remove('is-open');
      root.classList.add('is-closing');
      setTimeout(function () {
        root.setAttribute('hidden', '');
        root.classList.remove('is-closing');
      }, 180);
    }
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function onKeydown(ev) {
    if (!isOpen) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      close();
      return;
    }
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      setActive(activeIndex + 1);
      return;
    }
    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      setActive(activeIndex - 1);
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      var el = items[activeIndex];
      if (el && el.__cmd) execute(el.__cmd);
      return;
    }
    if (ev.key === 'Tab') {
      ev.preventDefault();
      var focusables = [input].concat(
        Array.prototype.slice.call(root.querySelectorAll('.cmdk3-item[data-active="true"]'))
      );
      var first = focusables[0];
      if (first && root.contains(document.activeElement) === false) first.focus();
    }
  }

  function onGlobalKeydown(ev) {
    if ((ev.metaKey || ev.ctrlKey) && (ev.key === 'k' || ev.key === 'K')) {
      ev.preventDefault();
      if (isOpen) close();
      else open();
    }
  }

  function boot() {
    document.addEventListener('keydown', onGlobalKeydown);

    document.querySelectorAll('[data-cmdk-open]').forEach(function (btn) {
      btn.addEventListener('click', open);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__rkCmdkOpen = open;
  window.__rkCmdkClose = close;
  window.__rkCmdkIsOpen = function () { return isOpen; };
})();
