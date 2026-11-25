/* ============================================================
   RK COMMAND PALETTE — "⌘K"
   Theme-native launcher for rajathkiran.me
   Navigate · Search projects · Recruiter facts · Actions
============================================================ */

(() => {
  'use strict';

  const PKL_KEY = 'cmdk_hint_shown';
  const EMAIL = 'rajathajeru@gmail.com';

  let overlay = null;
  let panel = null;
  let input = null;
  let listEl = null;
  let items = [];
  let activeIdx = 0;
  let isOpen = false;
  let lastFocused = null;

  /* ---------------- fuzzy scoring ---------------- */
  const score = (query, text) => {
    const q = query.toLowerCase().trim();
    const t = text.toLowerCase();
    if (!q) return 1;
    const direct = t.indexOf(q);
    if (direct !== -1) return 1000 - direct;
    let qi = 0, streak = 0, pts = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) { qi++; streak++; pts += 2 + streak; }
      else streak = 0;
    }
    return qi === q.length ? pts : -1;
  };

  /* ---------------- command sources ---------------- */
  const navCommands = () => [
    ['About', 'about', 'person'],
    ['Resume', 'resume', 'document-text'],
    ['Projects', 'projects', 'folder-open'],
    ['Blog', 'blog', 'book'],
    ['Contact', 'contact', 'paper-plane']
  ].map(([label, page, icon]) => ({
    group: 'Navigate',
    icon,
    label: `Go to ${label}`,
    hint: 'page',
    keywords: `${label} page section jump`,
    run: () => {
      const link = Array.from(document.querySelectorAll('[data-nav-link]'))
        .find(el => el.textContent.trim().toLowerCase() === page);
      link?.click();
    }
  }));

  const actionCommands = () => [
    {
      group: 'Actions', icon: 'clipboard', label: 'Copy email', hint: EMAIL,
      keywords: 'copy email contact mail clipboard',
      run: async () => { try { await navigator.clipboard.writeText(EMAIL); flash('Email copied to clipboard'); } catch { window.location.href = `mailto:${EMAIL}`; } }
    },
    {
      group: 'Actions', icon: 'download', label: 'Download Resume (PDF)', hint: 'pdf',
      keywords: 'resume cv download pdf attestation',
      run: () => { const a = document.querySelector('a.resume-btn[download]'); a ? a.click() : window.open('assets/resumes/Rajath_Kiran_A_Resume.pdf', '_blank'); }
    },
    {
      group: 'Actions', icon: 'document', label: 'View Live Resume', hint: 'resume.html',
      keywords: 'resume live view interactive cv',
      run: () => window.open('resume.html', '_blank')
    },
    {
      group: 'Actions', icon: 'logo-github', label: 'Open GitHub', hint: '@Rajath2005',
      keywords: 'github code repos open source',
      run: () => window.open('https://github.com/Rajath2005', '_blank')
    },
    {
      group: 'Actions', icon: 'logo-linkedin', label: 'Open LinkedIn', hint: '@rajath-kiran',
      keywords: 'linkedin network connect profile',
      run: () => window.open('https://www.linkedin.com/in/rajath-kiran/', '_blank')
    },
    {
      group: 'Actions', icon: 'code-slash', label: 'Open LeetCode', hint: '@rajath2005',
      keywords: 'leetcode dsa practice problems',
      run: () => window.open('https://leetcode.com/rajath2005', '_blank')
    },
    {
      group: 'Actions', icon: 'chatbubbles', label: 'Ask Rajath AI', hint: '⇧A · Gemini',
      keywords: 'ai chat assistant rajath gemini ask bot',
      run: () => document.getElementById('ai-chat-btn')?.click()
    },
    {
      group: 'Actions', icon: 'terminal', label: 'Enter Kernel Mode', hint: 'easter egg',
      keywords: 'kernel terminal hacker mode secret easter egg matrix rajath2005',
      run: () => {
        'rajath2005'.split('').forEach((key, i) => {
          setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })), i * 40);
        });
      }
    },
    {
      group: 'Actions', icon: 'share-social', label: 'Share this portfolio', hint: 'link',
      keywords: 'share link copy url invite',
      run: async () => {
        const url = 'https://rajathkiran.me/';
        if (navigator.share) { try { await navigator.share({ title: document.title, url }); return; } catch { /* dismissed */ } }
        try { await navigator.clipboard.writeText(url); flash('Portfolio link copied'); } catch { /* denied */ }
      }
    }
  ];

  const factCommands = () => [
    {
      group: 'Quick Facts', icon: 'school', label: 'CGPA 8.9/10 — B.E. CSE @ VCET (VTU)',
      hint: 'education', keywords: 'cgpa gpa college vcet vtu education degree marks',
      run: () => clickNav('resume')
    },
    {
      group: 'Quick Facts', icon: 'trophy', label: '2× VTU Rank #1 · 170+ LeetCode solved',
      hint: 'dsa', keywords: 'rank leetcode code360 dsa competitive university',
      run: () => clickNav('resume')
    },
    {
      group: 'Quick Facts', icon: 'cloud', label: '50+ GCP Skill Badges — Silver League',
      hint: 'cloud', keywords: 'gcp google cloud badges silver kubernetes gke',
      run: () => clickNav('resume')
    },
    {
      group: 'Quick Facts', icon: 'medkit', label: 'SHWASA — CNN-LSTM COPD detection · 6,898 respiratory cycles',
      hint: 'research', keywords: 'copd shwasa cnn lstm icbhi respiratory audio research vtu',
      run: () => clickNav('projects')
    },
    {
      group: 'Quick Facts', icon: 'sparkles', label: 'AyuDost — 10-step Pinecone + Gemini RAG · 20+ contributors',
      hint: 'flagship', keywords: 'ayudost rag pinecone gemini healthcare chatbot open source',
      run: () => clickNav('projects')
    },
    {
      group: 'Quick Facts', icon: 'location', label: 'Mangalore, India — open to relocation & remote',
      hint: 'contact', keywords: 'location mangalore relocation remote open internship 2026',
      run: () => clickNav('contact')
    }
  ];

  const clickNav = (page) => {
    const link = Array.from(document.querySelectorAll('[data-nav-link]'))
      .find(el => el.textContent.trim().toLowerCase() === page);
    link?.click();
  };

  const projectCommands = () => Array.from(document.querySelectorAll('.project-item'))
    .map(item => {
      const link = item.querySelector('a');
      const title = item.querySelector('.project-title')?.textContent?.trim();
      if (!link || !title) return null;
      const category = item.querySelector('.project-category')?.textContent?.trim() || '';
      const desc = item.querySelector('.project-desc')?.textContent?.trim() || '';
      const tags = Array.from(item.querySelectorAll('.tech-tag')).map(t => t.textContent.trim()).join(' ');
      return {
        group: 'Projects',
        icon: 'layers',
        label: title,
        hint: category,
        keywords: `${title} ${category} ${desc} ${tags}`,
        run: () => openProject(item, link, title)
      };
    })
    .filter(Boolean);

  const openProject = (item, link, title) => {
    const switchAndOpen = () => {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => link.click(), 450);
    };
    if (!document.querySelector('article.projects.active')) {
      clickNav('projects');
      setTimeout(switchAndOpen, 650);
    } else {
      switchAndOpen();
    }
  };

  /* ---------------- rendering ---------------- */

  const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const render = (query = '') => {
    const all = [...navCommands(), ...projectCommands(), ...factCommands(), ...actionCommands()];
    if (query.trim()) {
      items = all
        .map(cmd => ({ cmd, s: Math.max(score(query, cmd.label), score(query, cmd.keywords)) }))
        .filter(x => x.s >= 0)
        .sort((a, b) => b.s - a.s)
        .map(x => x.cmd);
    } else {
      items = [...all.filter(c => c.group !== 'Quick Facts')];
    }
    activeIdx = 0;
    if (!items.length) {
      listEl.innerHTML = '<div class="cmdk-empty">No matches — try "rag", "gke", "resume", "kernel"…</div>';
      return;
    }

    let html = '';
    let lastGroup = null;
    items.forEach((cmd, i) => {
      if (cmd.group !== lastGroup) {
        html += `<div class="cmdk-group-label" role="presentation">${esc(cmd.group)}</div>`;
        lastGroup = cmd.group;
      }
      html += `
        <button class="cmdk-item${i === activeIdx ? ' active' : ''}" type="button" role="option"
          id="cmdk-opt-${i}" data-idx="${i}" aria-selected="${i === activeIdx}">
          <ion-icon name="${esc(cmd.icon || 'eclipse')}"></ion-icon>
          <span class="cmdk-item-label">${esc(cmd.label)}</span>
          <span class="cmdk-item-hint">${esc(cmd.hint || '')}</span>
        </button>`;
    });
    listEl.innerHTML = html;
  };

  const setActive = (idx) => {
    activeIdx = (idx + items.length) % items.length;
    listEl.querySelectorAll('.cmdk-item').forEach((el, i) => {
      el.classList.toggle('active', i === activeIdx);
      el.setAttribute('aria-selected', String(i === activeIdx));
      if (i === activeIdx) {
        el.scrollIntoView({ block: 'nearest' });
        input.setAttribute('aria-activedescendant', el.id);
      }
    });
  };

  /* ---------------- open / close ---------------- */
  const flash = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'cmdk-flash';
    toast.textContent = `✓ ${msg}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => toast.remove(), 2400);
  };

  const openPalette = () => {
    if (isOpen || document.getElementById('hacker-terminal')) return;
    lastFocused = document.activeElement;
    isOpen = true;
    render('');
    overlay.classList.add('open');
    panel.classList.add('open');
    input.value = '';
    setTimeout(() => input.focus(), 30);
  };

  const closePalette = () => {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove('open');
    panel.classList.remove('open');
    if (lastFocused?.focus) lastFocused.focus();
  };

  const runItem = (idx) => {
    const cmd = items[idx];
    if (!cmd) return;
    closePalette();
    setTimeout(() => cmd.run(), 120);
  };

  /* ---------------- boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.__cmdkBooted) return;
    window.__cmdkBooted = true;
    overlay = document.createElement('div');
    overlay.className = 'cmdk-overlay';
    overlay.id = 'cmdk-overlay';
    panel = document.createElement('div');
    panel.className = 'cmdk-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Command palette');
    panel.innerHTML = `
      <div class="cmdk-input-row">
        <span class="cmdk-prompt-char">❯</span>
        <input id="cmdk-input" type="text" role="combobox" aria-expanded="true" aria-controls="cmdk-list"
          aria-activedescendant="cmdk-opt-0" autocomplete="off" spellcheck="false"
          placeholder="Search projects, skills, actions…" aria-label="Search projects, skills, actions">
        <kbd class="cmdk-kbd">ESC</kbd>
      </div>
      <div class="cmdk-list" id="cmdk-list" role="listbox" aria-label="Commands"></div>
      <div class="cmdk-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span class="cmdk-footer-right">rk-shell v1.0</span>
      </div>`;
    listEl = panel.querySelector('#cmdk-list');
    input = panel.querySelector('#cmdk-input');
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    overlay.addEventListener('click', closePalette);

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); runItem(activeIdx); }
      else if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    });
    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.cmdk-item');
      if (btn) runItem(Number(btn.dataset.idx));
    });
    listEl.addEventListener('mousemove', (e) => {
      const btn = e.target.closest('.cmdk-item');
      if (btn && Number(btn.dataset.idx) !== activeIdx) setActive(Number(btn.dataset.idx));
    });

    document.addEventListener('keydown', (e) => {
      if (isOpen) {
        if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
        return;
      }
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        openPalette();
      }
    });

    if (!localStorage.getItem(PKL_KEY)) {
      setTimeout(() => {
        if (isOpen) return;
        const toast = document.createElement('button');
        toast.className = 'cmdk-flash hint';
        toast.type = 'button';
        toast.textContent = '⌘K · Try the command palette';
        toast.addEventListener('click', () => { toast.remove(); openPalette(); });
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => toast.remove(), 9000);
        localStorage.setItem(PKL_KEY, '1');
      }, 7000);
    }
  });
})();
