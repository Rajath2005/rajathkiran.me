(function(){
  const role = new URLSearchParams(location.search).get('role') || 'project-foundry';
  const RESUME_MAP = {
    'mission-control': { label: 'Cloud Engineer', file: 'Rajath Kiran A - Resume.pdf' },
    'neural-nexus': { label: 'AI/ML Engineer', file: 'Rajath_Kiran_ML_Intern_Resume.pdf' },
    'aurora-studio': { label: 'Full Stack Developer', file: 'Rajath_Kiran_FullStack_ATS_Resume.pdf' },
    'research-lab': { label: 'AI/ML Researcher', file: 'Rajath_Kiran_ML_Intern_Resume.pdf' },
    'project-foundry': { label: 'Full Stack Developer', file: 'Rajath_Kiran_FullStack_ATS_Resume.pdf' },
    'innovation-garage': { label: 'Prototyper & Hacker', file: 'Rajath_Kiran_OpenSource_Hackathon_Resume.pdf' }
  };
  const resumeConfig = RESUME_MAP[role] || RESUME_MAP['project-foundry'];
  const pdfUrl = `./assets/resumes/${resumeConfig.file}`;

  const $ = id => document.getElementById(id);

  const pageTitle = $('page-title');
  const roleBadge = $('role-badge');
  const titleText = `Rajath Kiran A — ${resumeConfig.label} Resume`;
  if (pageTitle) pageTitle.textContent = titleText;
  document.title = pageTitle ? pageTitle.textContent : titleText;
  if (roleBadge) roleBadge.textContent = resumeConfig.label;

  const toolbar = $('toolbar');
  const canvas = $('pdfCanvas');
  const ctx = canvas.getContext('2d');
  const pageInput = $('pageInput');
  const pageTotal = $('pageTotal');
  const zoomPct = $('zoomPct');
  const skeleton = $('skeleton');
  const progressBar = $('progressBar');
  const progressFill = progressBar && progressBar.querySelector('.progress');
  const container = $('canvasContainer');
  const toastContainer = $('toast-container');

  let pdfDoc = null, pageNum = 1, userScale = 1.0, fitScale = 1.0, rotation = 0;
  let activeRenderTask = null;
  const presets = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  let hideTimer = null;
  let isFullscreen = false;

  /* ---- Toast ---- */
  function showToast(text, timeout = 2000) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    toastContainer.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast-out');
      setTimeout(() => el.remove(), 300);
    }, timeout);
  }

  /* ---- Fit Scale ---- */
  function getFitScale(page) {
    const baseVp = page.getViewport({ scale: 1, rotation });
    const availW = Math.max(320, (container?.clientWidth || window.innerWidth) - 24);
    return Math.max(0.5, Math.min(availW / baseVp.width, 3));
  }

  /* ---- Render ---- */
  async function renderPage(num, recalcFit) {
    if (!pdfDoc) return;
    if (num < 1) num = 1;
    if (num > pdfDoc.numPages) num = pdfDoc.numPages;
    pageNum = num;

    skeleton.style.display = 'block';
    canvas.classList.add('fade-out');

    const page = await pdfDoc.getPage(num);
    if (recalcFit !== false) fitScale = getFitScale(page);
    const scale = fitScale * userScale;
    const viewport = page.getViewport({ scale, rotation });
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';

    const renderCtx = {
      canvasContext: ctx,
      viewport: page.getViewport({ scale: scale * ratio, rotation })
    };

    if (activeRenderTask) {
      try { activeRenderTask.cancel(); } catch (e) {}
    }
    const task = page.render(renderCtx);
    activeRenderTask = task;
    try {
      await task.promise;
    } catch (err) {
      if (err && err.name === 'RenderingCancelledException') return;
      throw err;
    } finally {
      if (activeRenderTask === task) activeRenderTask = null;
    }

    canvas.classList.remove('fade-out');
    canvas.classList.add('fade-in');
    setTimeout(() => canvas.classList.remove('fade-in'), 300);
    skeleton.style.display = 'none';

    if (pageInput) { pageInput.value = pageNum; pageInput.max = pdfDoc.numPages; }
    if (pageTotal) pageTotal.textContent = pdfDoc.numPages;
    if (zoomPct) zoomPct.textContent = `${Math.round(scale * 100)}%`;
  }

  function queueRender(num, recalcFit) {
    if (!pdfDoc) return;
    if (num < 1) num = 1;
    if (num > pdfDoc.numPages) num = pdfDoc.numPages;
    renderPage(num, recalcFit);
  }

  function snapToPreset(t) {
    const nearest = presets.reduce((a, b) => Math.abs(b - t) < Math.abs(a - t) ? b : a);
    userScale = nearest;
    queueRender(pageNum, false);
  }

  /* ---- Load PDF ---- */
  async function loadPdf() {
    try {
      const task = pdfjsLib.getDocument(pdfUrl);
      task.onProgress = prog => {
        if (!progressFill) return;
        progressBar.style.display = 'block';
        const pct = prog.total ? (prog.loaded / prog.total * 100) : 0;
        progressFill.style.width = pct + '%';
      };
      pdfDoc = await task.promise;
      pageNum = 1; userScale = 1.0; rotation = 0;
      await renderPage(1, true);
      if (progressBar) setTimeout(() => progressBar.style.display = 'none', 400);
    } catch (e) {
      console.error('Failed to load PDF', e);
      showToast('Failed to load resume PDF');
    }
  }

  /* ---- Toolbar auto-hide ---- */
  function showToolbar() {
    toolbar.classList.remove('tb-hidden');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!toolbar.matches(':hover') && !document.querySelector('.tb-page-input:focus')) {
        toolbar.classList.add('tb-hidden');
      }
    }, 2500);
  }

  document.addEventListener('mousemove', showToolbar);
  document.addEventListener('touchstart', showToolbar);
  toolbar.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  toolbar.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => toolbar.classList.add('tb-hidden'), 1500);
  });
  showToolbar();

  /* ---- Page Jump Input ---- */
  pageInput.addEventListener('change', () => {
    let val = parseInt(pageInput.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > pdfDoc.numPages) val = pdfDoc.numPages;
    queueRender(val);
    pageInput.blur();
  });

  /* ---- Fullscreen ---- */
  const fsBtn = $('fullscreenBtn');
  fsBtn.addEventListener('click', async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        isFullscreen = true;
        fsBtn.innerHTML = '<ion-icon name="contract-outline"></ion-icon>';
        showToast('Fullscreen mode');
      } catch (e) { showToast('Fullscreen unavailable'); }
    } else {
      await document.exitFullscreen();
      isFullscreen = false;
      fsBtn.innerHTML = '<ion-icon name="expand-outline"></ion-icon>';
    }
  });
  document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    fsBtn.innerHTML = isFullscreen
      ? '<ion-icon name="contract-outline"></ion-icon>'
      : '<ion-icon name="expand-outline"></ion-icon>';
    setTimeout(() => queueRender(pageNum, true), 100);
  });

  /* ---- Controls ---- */
  $('prevPage').addEventListener('click', () => queueRender(pageNum - 1));
  $('nextPage').addEventListener('click', () => queueRender(pageNum + 1));
  $('zoomIn').addEventListener('click', () => {
    const next = presets.find(p => p > userScale) || presets[presets.length - 1];
    userScale = next; queueRender(pageNum, false);
  });
  $('zoomOut').addEventListener('click', () => {
    const prev = [...presets].reverse().find(p => p < userScale) || presets[0];
    userScale = prev; queueRender(pageNum, false);
  });
  $('fitBtn').addEventListener('click', () => { userScale = 1.0; queueRender(pageNum, true); });
  $('rotateBtn').addEventListener('click', () => { rotation = (rotation + 90) % 360; queueRender(pageNum); });
  $('downloadBtn').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = resumeConfig.file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Downloading resume');
  });

  $('shareBtn').addEventListener('click', async () => {
    try {
      const base = location.origin + location.pathname.replace(/index\.html$/, '').replace(/\/resume\.html$/, '');
      await navigator.clipboard.writeText(`${base}/resume.html?role=${role}`);
      showToast('Resume link copied!');
    } catch (e) { showToast('Copy failed'); }
  });

  /* ---- Toggle Toolbar ---- */
  $('tbToggle').addEventListener('click', () => {
    toolbar.classList.toggle('tb-hidden');
  });

  /* ---- Wheel zoom ---- */
  let wheelTimer;
  container.addEventListener('wheel', e => {
    e.preventDefault();
    clearTimeout(wheelTimer);
    if (e.deltaY < 0) {
      const next = presets.find(p => p > userScale) || presets[presets.length - 1];
      userScale = next;
    } else {
      const prev = [...presets].reverse().find(p => p < userScale) || presets[0];
      userScale = prev;
    }
    queueRender(pageNum, false);
    wheelTimer = setTimeout(() => {}, 150);
  }, { passive: false });

  /* ---- Pinch zoom ---- */
  let pinch = { active: false, startDist: 0, startScale: 1 };
  container.addEventListener('touchstart', e => {
    if (e.touches && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinch.startDist = Math.hypot(dx, dy);
      pinch.startScale = userScale;
      pinch.active = true;
    }
  }, { passive: true });
  container.addEventListener('touchmove', e => {
    if (pinch.active && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      userScale = Math.max(0.5, Math.min(pinch.startScale * (dist / pinch.startDist), 3));
      queueRender(pageNum, false);
    }
  }, { passive: true });
  container.addEventListener('touchend', () => {
    if (pinch.active) { pinch.active = false; snapToPreset(userScale); }
  }, { passive: true });

  /* ---- Keyboard ---- */
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') queueRender(pageNum - 1);
    if (e.key === 'ArrowRight') queueRender(pageNum + 1);
    if (e.key === 'Home') queueRender(1);
    if (e.key === 'End') queueRender(pdfDoc.numPages);
    if (e.key === '+' || e.key === '=') {
      const next = presets.find(p => p > userScale) || presets[presets.length - 1];
      userScale = next; queueRender(pageNum, false);
    }
    if (e.key === '-') {
      const prev = [...presets].reverse().find(p => p < userScale) || presets[0];
      userScale = prev; queueRender(pageNum, false);
    }
    if (e.key === 'Escape') {
      if (document.fullscreenElement) document.exitFullscreen();
      else location.href = 'index.html';
    }
    if (e.key.toLowerCase() === 'f') $('fitBtn').click();
    if (e.key.toLowerCase() === 'r') $('rotateBtn').click();
  });

  /* ---- Resize ---- */
  window.addEventListener('resize', () => queueRender(pageNum, true));
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => queueRender(pageNum, true)).observe(container);
  }

  /* ---- Init ---- */
  if (window.pdfjsLib) loadPdf();
  else {
    console.error('pdfjsLib missing');
    showToast('PDF viewer failed to load');
  }
})();
