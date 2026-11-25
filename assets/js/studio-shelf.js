/**
 * STUDIO SHELF v1.0 (studio-shelf.js)
 * 2-Column Tactile "Studio Shelf" for the Curated Projects tab.
 * Progressive enhancement over the existing project markup:
 *   - filter pills get live counts from data-category values
 *   - every card gets a numbered frame badge, an impact badge and tech pills
 *   - a pinned card footer with Case Study (dossier or legacy case sheet)
 *     and an external Live / GitHub action
 */
(function () {
  'use strict';

  if (window.__rkStudioShelfBooted) return;
  window.__rkStudioShelfBooted = true;

  var SHELF_META = [
    { match: 'shramik', impact: 'Real-Time Civic Voice AI', badge: 'Civic Voice AI', ext: { label: 'GitHub \u2197', href: 'https://github.com/Rajath2005/Shramik-Nyay' }, pills: ['Voice AI', 'Gemini', 'Node.js', 'Multilingual ASR'] },
    { match: 'copd', impact: '6,898 Respiratory Cycles', badge: 'Healthcare AI', ext: { label: 'GitHub \u2197', href: 'https://github.com/Rajath2005/COPD-Detection' }, pills: ['Python', 'CNN-LSTM', 'Librosa', 'PyTorch'] },
    { match: 'mediq', impact: 'RLS-Secured Health Records', badge: 'Health Platform', ext: { label: 'Live \u2197', href: 'https://mediq-health.netlify.app/' }, pills: ['React.js', 'Supabase', 'PostgreSQL', 'Gemini AI'] },
    { match: 'ayudost', impact: '10-Step RAG Assistant', badge: 'AI Assistant', ext: { label: 'Live \u2197', href: 'https://ayudost-chatbot.onrender.com/' }, pills: ['RAG Pipeline', 'Pinecone', 'MongoDB', 'Gemini AI'] },
    { match: 'highly available', impact: 'Multi-Region GKE Failover', badge: 'GCP Infrastructure', ext: { label: 'Live \u2197', href: 'http://cloud.rajathkiran.me/' }, pills: ['Compute Engine', 'HTTP(S) LB', 'Health Checks'] },
    { match: 'sitexar', impact: 'Startup Launch Site', badge: 'Startup Site', pills: ['HTML', 'CSS', 'JavaScript'] },
    { match: 'ieee', impact: 'Figma UI/UX Concept', badge: 'Figma Concept', pills: ['Figma', 'UI/UX', 'Design System'] },
    { match: 'code review', impact: 'RL Benchmark \u00B7 OpenEnv', badge: 'AI DevTools', pills: ['Python', 'OpenEnv', 'Hugging Face'] },
    { match: 'gke', impact: 'Kubernetes Orchestration', badge: 'Microservices', ext: { label: 'Live \u2197', href: 'http://cloud.rajathkiran.me/' }, pills: ['GKE', 'Docker', 'Kubernetes'] },
    { match: 'smart city', impact: 'Java OOP Console App', badge: 'Java CLI', pills: ['Java', 'CLI', 'OOP Design'] },
    { match: 'event-driven', impact: 'Async Pub/Sub Messaging', badge: 'Pub/Sub', ext: { label: 'Live \u2197', href: 'http://cloud.rajathkiran.me/' }, pills: ['GCP Pub/Sub', 'Topics', 'Subscriptions'] },
    { match: 'textutils', impact: 'React Text Toolkit', badge: 'Utility App', pills: ['React.js', 'JavaScript'] },
    { match: 'distributed database', impact: 'Global Strong Consistency', badge: 'Cloud Spanner', ext: { label: 'Live \u2197', href: 'http://cloud.rajathkiran.me/' }, pills: ['Cloud Spanner', 'SQL', 'GCP'] },
    { match: 'cloud monitoring', impact: 'Observability Dashboards', badge: 'Cloud Ops', ext: { label: 'Live \u2197', href: 'http://cloud.rajathkiran.me/' }, pills: ['Cloud Monitoring', 'Alerts', 'Uptime Checks'] },
    { match: 'puttur', impact: 'Local Transit Schedules', badge: 'Local Transit', pills: ['HTML', 'CSS', 'JavaScript'] },
    { match: 'englisho', impact: 'Interactive EdTech', badge: 'EdTech', pills: ['HTML', 'CSS', 'JavaScript'] },
    { match: 'placement', impact: 'Interview Prep Hub', badge: 'Prep Hub', pills: ['HTML', 'CSS', 'JavaScript'] },
    { match: 'digital restaurant', impact: 'QR Menu Ordering', badge: 'QR SaaS', pills: ['QR Ordering', 'JavaScript', 'CSS'] }
  ];

  function openLegacyCaseStudy(anchor) {
    var container = document.querySelector('[data-project-modal-container]');
    if (!container) return;
    var iframe = document.querySelector('[data-demo-iframe]');
    var fallback = document.querySelector('[data-demo-fallback]');
    var link = document.querySelector('[data-demo-link]');
    if (iframe) iframe.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
    if (link) link.setAttribute('href', anchor.getAttribute('href') || '#');
    container.classList.add('active');
  }

  function metaFor(title) {
    var lower = title.toLowerCase();
    for (var i = 0; i < SHELF_META.length; i++) {
      if (lower.indexOf(SHELF_META[i].match) !== -1) return SHELF_META[i];
    }
    return null;
  }

  function decorateShelf() {
    var list = document.querySelector('section.projects .project-list');
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.project-item'));

    items.forEach(function (li, idx) {
      var anchor = li.querySelector('a');
      if (!anchor) return;
      var title = (li.querySelector('.project-title') || {}).textContent || '';
      var meta = metaFor(title.trim());

      var cat = li.querySelector('.project-category');
      if (cat) cat.remove();

      if (meta) {
        var wrap = li.querySelector('.project-img-wrapper');
        if (wrap) {
          wrap.setAttribute('data-frame-badge', String(idx + 1).padStart(2, '0') + ' \u00B7 ' + meta.badge);
        }

        var h3 = li.querySelector('.project-title');
        if (h3 && h3.parentElement && !h3.parentElement.classList.contains('project-head')) {
          var head = document.createElement('div');
          head.className = 'project-head';
          h3.parentElement.insertBefore(head, h3);
          head.appendChild(h3);
          if (meta.impact) {
            var impact = document.createElement('span');
            impact.className = 'project-impact';
            impact.textContent = meta.impact;
            head.appendChild(impact);
          }
        }

        var desc = li.querySelector('.project-desc');
        if (desc && !li.querySelector('.project-tech-row')) {
          var row = document.createElement('div');
          row.className = 'project-tech-row';
          (meta.pills || []).forEach(function (pill) {
            var tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = pill;
            row.appendChild(tag);
          });
          desc.insertAdjacentElement('afterend', row);
        }
      }

      if (!li.querySelector('.project-foot')) {
        var foot = document.createElement('div');
        foot.className = 'project-foot';

        var csBtn = document.createElement('button');
        csBtn.type = 'button';
        csBtn.className = 'shelf-cs-btn';
        csBtn.setAttribute('aria-label', 'Open ' + (title.trim() || 'project') + ' case study');
        var csLabel = document.createElement('span');
        csLabel.textContent = 'Case Study';
        var csArrow = document.createElement('span');
        csArrow.className = 'shelf-arrow';
        csArrow.setAttribute('aria-hidden', 'true');
        csArrow.textContent = '\u2192';
        csBtn.appendChild(csLabel);
        csBtn.appendChild(csArrow);

        var extMeta = (meta && meta.ext) || null;
        var extHref = extMeta ? extMeta.href : (anchor.getAttribute('data-project-url') || anchor.getAttribute('href') || '');
        var isRepo = /github\.com\//i.test(extHref || '');
        var isFigma = /figma\.com/i.test(extHref || '');
        var extLabel = extMeta ? extMeta.label : (isRepo ? 'GitHub \u2197' : (isFigma ? 'Figma \u2197' : 'Live \u2197'));

        var extLink = document.createElement('a');
        extLink.className = 'shelf-ext-link';
        extLink.href = extHref || '#';
        extLink.target = '_blank';
        extLink.rel = 'noopener noreferrer';
        extLink.setAttribute('aria-label', (title.trim() || 'Project') + ' \u2014 ' + extLabel.replace(' \u2197', ''));
        var extText = document.createElement('span');
        extText.textContent = extLabel;
        extLink.appendChild(extText);

        foot.appendChild(csBtn);
        foot.appendChild(extLink);
        li.appendChild(foot);

        csBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var openFor = window.__rkStudioDossierOpenFor;
          if (typeof openFor === 'function' && openFor(anchor)) return;
          anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        });

        if (!anchor.getAttribute('data-project-url')) {
          anchor.addEventListener('click', function (e) {
            var openFor = window.__rkStudioDossierOpenFor;
            if (typeof openFor === 'function' && openFor(anchor)) return;
            e.preventDefault();
            openLegacyCaseStudy(anchor);
          }, false);
        }
      }
    });

    document.querySelectorAll('[data-filter-btn]').forEach(function (btn) {
      if (btn.querySelector('.filter-count')) return;
      var value = (btn.getAttribute('data-filter-value') || 'all').toLowerCase().trim();
      var count = value === 'all'
        ? items.length
        : items.filter(function (li) { return (li.dataset.category || '').toLowerCase().trim() === value; }).length;
      var span = document.createElement('span');
      span.className = 'filter-count';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = String(count);
      btn.appendChild(span);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorateShelf);
  } else {
    decorateShelf();
  }
})();
