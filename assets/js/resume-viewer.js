// resume-viewer.js — Vanilla JS PDF.js integration (Phase 1)
(function(){
  const url = './assets/Resume.pdf';
  const pdfjsWorker = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';
  if(window.pdfjsLib) pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const canvas = document.getElementById('pdfCanvas');
  const ctx = canvas.getContext('2d');
  const pageInfo = document.getElementById('pageInfo');
  const zoomPct = document.getElementById('zoomPct');
  const skeleton = document.getElementById('skeleton');
  const progressBar = document.getElementById('progressBar');
  const progressFill = progressBar && progressBar.querySelector('.progress');
  const container = document.getElementById('canvasContainer');

  let pdfDoc = null; let pageNum = 1; let userScale = 1.0; let fitScale = 1.0; let rotation = 0;
  let activeRenderTask = null;
  const presets = [0.75,1.0,1.25,1.5];

  function showToast(text, timeout=1600){
    const t = document.createElement('div'); t.textContent = text;
    t.className = 'rv-toast';
    Object.assign(t.style,{position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.8)',color:'#fff',padding:'8px 12px',borderRadius:'8px',zIndex:999});
    document.body.appendChild(t); setTimeout(()=>t.style.opacity='0', timeout-300); setTimeout(()=>t.remove(), timeout);
  }

  const getFitScale = (page) => {
    const baseViewport = page.getViewport({scale: 1, rotation});
    const availableWidth = Math.max(320, (container?.clientWidth || window.innerWidth) - 24);
    return Math.max(0.5, Math.min(availableWidth / baseViewport.width, 3));
  };

  const renderPage = async (num, recalcFit = true) => {
    skeleton.style.display = 'block';
    const page = await pdfDoc.getPage(num);
    if(recalcFit) fitScale = getFitScale(page);
    const scale = fitScale * userScale;
    const viewport = page.getViewport({scale, rotation});
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';
    const renderCtx = {canvasContext: ctx, viewport: page.getViewport({scale: scale * ratio, rotation})};
    if(activeRenderTask){
      try { activeRenderTask.cancel(); } catch(e) {}
    }
    const renderTask = page.render(renderCtx);
    activeRenderTask = renderTask;
    try {
      await renderTask.promise;
    } catch (error) {
      if(!error || error.name !== 'RenderingCancelledException') {
        throw error;
      }
      return;
    } finally {
      if(activeRenderTask === renderTask) {
        activeRenderTask = null;
      }
    }
    pageInfo.textContent = `Page ${pageNum} / ${pdfDoc.numPages}`;
    zoomPct.textContent = `${Math.round(scale*100)}%`;
    skeleton.style.display = 'none';
  };

  const queueRender = (num, recalcFit = true) => { if(!pdfDoc) return; if(num<1) num=1; if(num>pdfDoc.numPages) num=pdfDoc.numPages; pageNum = num; renderPage(pageNum, recalcFit); };

  function snapToPreset(t){ let nearest = presets.reduce((a,b)=> Math.abs(b-t)<Math.abs(a-t)?b:a); userScale = nearest; queueRender(pageNum, false); }

  // fetch document with progress
  const load = async () => {
    try{
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.onProgress = (prog)=>{
        if(progressFill){ progressBar.style.display='block'; let pct = prog.total ? (prog.loaded/prog.total*100) : 0; progressFill.style.width = pct + '%'; }
      };
      pdfDoc = await loadingTask.promise;
      pageNum = 1; userScale = 1.0; rotation = 0; renderPage(pageNum, true);
      if(progressBar) setTimeout(()=>progressBar.style.display='none',400);
    }catch(e){
      console.error('Failed to load PDF', e);
      alert('Unable to load resume PDF.');
    }
  };

  // Controls
  document.getElementById('prevPage').addEventListener('click', ()=>{ if(pageNum<=1) return; queueRender(pageNum-1); });
  document.getElementById('nextPage').addEventListener('click', ()=>{ if(!pdfDoc || pageNum>=pdfDoc.numPages) return; queueRender(pageNum+1); });
  document.getElementById('zoomIn').addEventListener('click', ()=>{ const next = presets.find(p=>p>userScale) || presets[presets.length-1]; userScale = next; queueRender(pageNum, false); });
  document.getElementById('zoomOut').addEventListener('click', ()=>{ const prev = [...presets].reverse().find(p=>p<userScale) || presets[0]; userScale = prev; queueRender(pageNum, false); });

  document.getElementById('fitBtn').addEventListener('click', ()=>{
    userScale = 1.0;
    queueRender(pageNum, true);
  });

  document.getElementById('rotateBtn').addEventListener('click', ()=>{
    rotation = (rotation + 90) % 360; queueRender(pageNum);
  });

  // download
  document.getElementById('downloadBtn').addEventListener('click', ()=>{
    const a = document.createElement('a'); a.href = url; a.download = 'Resume.pdf'; document.body.appendChild(a); a.click(); a.remove();
  });

  // share / copy link
  document.getElementById('shareBtn').addEventListener('click', async ()=>{
    try{
      const link = location.origin + location.pathname.replace(/index\.html$/,'').replace(/\/resume.html$/,'') + '/resume.html';
      await navigator.clipboard.writeText(link);
      showToast('Link copied!');
    }catch(e){ showToast('Copy failed'); }
  });

  // mouse wheel -> zoom (simple)
  let wheelTimeout;
  container.addEventListener('wheel', (e)=>{
    e.preventDefault();
    clearTimeout(wheelTimeout);
    if(e.deltaY < 0) { const next = presets.find(p=>p>userScale) || presets[presets.length-1]; userScale = next; }
    else { const prev = [...presets].reverse().find(p=>p<userScale) || presets[0]; userScale = prev; }
    queueRender(pageNum, false);
    wheelTimeout = setTimeout(()=>{},120);
  }, {passive:false});

  // pinch-to-zoom (basic)
  let pinch = {active:false, startDist:0, startScale:1};
  container.addEventListener('touchstart', (e)=>{
    if(e.touches && e.touches.length===2){ pinch.active=true; const dx = e.touches[0].clientX-e.touches[1].clientX; const dy = e.touches[0].clientY-e.touches[1].clientY; pinch.startDist = Math.hypot(dx,dy); pinch.startScale = userScale; }
  }, {passive:true});
  container.addEventListener('touchmove', (e)=>{
    if(pinch.active && e.touches.length===2){ const dx = e.touches[0].clientX-e.touches[1].clientX; const dy = e.touches[0].clientY-e.touches[1].clientY; const dist = Math.hypot(dx,dy); const ratio = dist / pinch.startDist; userScale = Math.max(0.5, Math.min(pinch.startScale * ratio, 3)); renderPage(pageNum, false); }
  }, {passive:true});
  container.addEventListener('touchend', (e)=>{ if(pinch.active){ pinch.active=false; snapToPreset(userScale); } }, {passive:true});

  // keyboard
  window.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowLeft') queueRender(pageNum-1);
    if(e.key==='ArrowRight') queueRender(pageNum+1);
    if(e.key==='+'||e.key==='=') { const next = presets.find(p=>p>userScale) || presets[presets.length-1]; userScale = next; queueRender(pageNum, false); }
    if(e.key==='-') { const prev = [...presets].reverse().find(p=>p<userScale) || presets[0]; userScale = prev; queueRender(pageNum, false); }
    if(e.key==='Escape') location.href = 'index.html';
    if(e.key.toLowerCase()==='f'){ document.getElementById('fitBtn').click(); }
  });

  // basic resize handling
  window.addEventListener('resize', ()=>{ queueRender(pageNum, true); });
  if('ResizeObserver' in window){
    new ResizeObserver(()=>{ queueRender(pageNum, true); }).observe(container);
  }

  // initial load
  document.addEventListener('DOMContentLoaded', ()=>{ if(window.pdfjsLib) load(); else { console.error('pdfjsLib missing'); alert('PDF.js failed to load.'); } });

})();
