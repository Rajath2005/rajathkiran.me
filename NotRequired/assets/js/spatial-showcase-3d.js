/**
 * PHASE 7 (UPGRADED): 3D Spatial Showcase with Real Project Screenshots & Clean Typography
 * File: assets/js/awwwards-spatial-os.js
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const MUSEUM_MONOLITHS = [
  {
    id: 'shwasa',
    title: 'SHWASA — Respiratory AI',
    category: 'DEEP LEARNING · HEALTHCARE',
    metrics: 'CNN + Bi-LSTM · Audio Spectrograms',
    desc: 'Screening and severity classification of COPD using respiratory acoustic intelligence.',
    image: 'assets/images/COPD-Project.webp',
    color: 0x38bdf8,
    url: 'https://shwasa.vercel.app/'
  },
  {
    id: 'ayudost',
    title: 'AyuDost AI Assistant',
    category: 'NLP · RAG ARCHITECTURE',
    metrics: 'Vector Retrieval · Ayurvedic LLM',
    desc: 'AI-powered Ayurvedic clinical support chatbot with disease prediction and personalized care.',
    image: 'assets/images/AyuDost-AI.webp',
    color: 0xa855f7,
    url: 'ayudost.html'
  },
  {
    id: 'gke',
    title: 'Microservices on GKE',
    category: 'GOOGLE CLOUD · KUBERNETES',
    metrics: 'Auto-Scaling Pods · Workload Monitor',
    desc: 'Production containerized microservices on Google Kubernetes Engine with auto-scaling.',
    image: 'assets/images/gke.webp',
    color: 0x10b981,
    url: 'http://cloud.rajathkiran.me/'
  },
  {
    id: 'mediq',
    title: 'MediQ Health Platform',
    category: 'FULL-STACK · REACT + SUPABASE',
    metrics: 'Real-Time DB · Gemini AI Integration',
    desc: 'End-to-end Ayurvedic wellness platform with symptom analysis and treatment workflows.',
    image: 'assets/images/Mediq.webp',
    color: 0x34d399,
    url: 'mediq.html'
  },
  {
    id: 'gcp_lb',
    title: 'High-Availability GCP',
    category: 'CLOUD INFRASTRUCTURE · SRE',
    metrics: 'HTTP(S) Load Balancing · Multi-VM',
    desc: 'Global traffic distribution across Compute Engine VM instances with health checks.',
    image: 'assets/images/load-balancer.webp',
    color: 0x60a5fa,
    url: 'http://cloud.rajathkiran.me/'
  },
  {
    id: 'codereview',
    title: 'Code Review RL Env',
    category: 'DEVTOOLS · REINFORCEMENT LEARNING',
    metrics: 'OpenEnv Benchmark · HuggingFace',
    desc: 'Reinforcement learning benchmark for training autonomous AI agents on Python code review.',
    image: 'assets/images/Code-Review.webp',
    color: 0xf59e0b,
    url: 'https://huggingface.co/spaces/BugHunter28/code-review-env'
  }
];

function injectMuseumStyles() {
  if (document.getElementById('phase7-museum-styles')) return;
  const style = document.createElement('style');
  style.id = 'phase7-museum-styles';
  style.textContent = `
    .spatial-museum-overlay {
      position: fixed;
      inset: 0;
      z-index: 9990;
      background: radial-gradient(circle at 50% 35%, rgba(15, 23, 42, 0.94), rgba(5, 8, 17, 0.98));
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.45s ease, visibility 0.45s ease;
    }
    body.museum-3d-active .spatial-museum-overlay {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    body.museum-3d-active main {
      opacity: 0;
      pointer-events: none;
    }
    #museum-3d-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    .museum-hud-card {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 640px;
      background: rgba(15, 20, 34, 0.92);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 18px;
      padding: 20px 24px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .museum-hud-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .museum-hud-cat {
      font-family: monospace;
      font-size: 11px;
      color: #38bdf8;
      letter-spacing: 0.6px;
    }
    .museum-hud-metrics {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.12);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.28);
    }
    .museum-hud-title {
      font-size: 20px;
      font-weight: 700;
      color: #f8fafc;
    }
    .museum-hud-desc {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .museum-hud-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      gap: 12px;
    }
    .museum-nav-group {
      display: flex;
      gap: 8px;
    }
    .museum-nav-btn {
      padding: 8px 14px;
      border-radius: 9px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }
    .museum-nav-btn:hover {
      background: #38bdf8;
      color: #06080f;
    }
    .museum-launch-btn {
      padding: 8px 16px;
      border-radius: 9px;
      background: #38bdf8;
      color: #06080f;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  `;
  document.head.appendChild(style);
}

function initSpatialMuseumMode() {
  if (document.getElementById('spatial-museum-overlay')) return;

  // Hidden trigger button used by executive-mode.js
  const hiddenTrigger = document.createElement('button');
  hiddenTrigger.id = 'toggle-3d-world-btn';
  hiddenTrigger.style.display = 'none';
  document.body.appendChild(hiddenTrigger);

  const overlay = document.createElement('div');
  overlay.id = 'spatial-museum-overlay';
  overlay.className = 'spatial-museum-overlay';
  overlay.innerHTML = `
    <canvas id="museum-3d-canvas"></canvas>
    <div class="museum-hud-card">
      <div class="museum-hud-top">
        <span class="museum-hud-cat" id="m-hud-cat">DEEP LEARNING · HEALTHCARE</span>
        <span class="museum-hud-metrics" id="m-hud-metrics">CNN + Bi-LSTM · Audio Spectrograms</span>
      </div>
      <h3 class="museum-hud-title" id="m-hud-title">SHWASA — Respiratory AI</h3>
      <p class="museum-hud-desc" id="m-hud-desc">
        Screening and severity classification of COPD using respiratory acoustic intelligence.
      </p>
      <div class="museum-hud-actions">
        <div class="museum-nav-group">
          <button type="button" class="museum-nav-btn" id="m-prev-btn">← Previous</button>
          <button type="button" class="museum-nav-btn" id="m-next-btn">Next →</button>
          <button type="button" class="museum-nav-btn" id="m-exit-btn">Exit 3D (ESC)</button>
        </div>
        <a href="https://shwasa.vercel.app/" target="_blank" class="museum-launch-btn" id="m-launch-link">
          <span>Open Project</span>
          <ion-icon name="open-outline"></ion-icon>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const canvas = document.getElementById('museum-3d-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));

  const polarGrid = new THREE.PolarGridHelper(16, 12, 6, 64, 0x38bdf8, 0x1e293b);
  polarGrid.position.y = -2.3;
  polarGrid.material.transparent = true;
  polarGrid.material.opacity = 0.35;
  scene.add(polarGrid);

  // Render Monolith Card with Real Project Screenshot
  function buildMonolithCardTexture(item, index) {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 820;
    const ctx = c.getContext('2d');
    const tex = new THREE.CanvasTexture(c);

    function drawCard(loadedImg = null) {
      ctx.fillStyle = '#0d1322';
      ctx.fillRect(0, 0, 600, 820);

      const hexStr = `#${item.color.toString(16).padStart(6, '0')}`;
      ctx.strokeStyle = hexStr;
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, 572, 792);

      // Header Tag
      ctx.fillStyle = hexStr;
      ctx.font = '600 20px monospace';
      ctx.fillText(`0${index + 1} // ${item.category}`, 40, 64);

      // Full Title (Properly sized so it never clips)
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText(item.title, 40, 118);

      // Project Screenshot Frame
      ctx.fillStyle = '#070a12';
      ctx.fillRect(40, 150, 520, 320);
      if (loadedImg) {
        ctx.drawImage(loadedImg, 40, 150, 520, 320);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 150, 520, 320);

      // Architecture Metric Badge
      ctx.fillStyle = hexStr;
      ctx.font = '600 21px monospace';
      ctx.fillText(item.metrics, 40, 530);

      // Multi-line wrapped description
      ctx.fillStyle = '#94a3b8';
      ctx.font = '21px sans-serif';
      const words = item.desc.split(' ');
      let line = '';
      let y = 585;
      words.forEach((w) => {
        const test = line + w + ' ';
        if (ctx.measureText(test).width > 510) {
          ctx.fillText(line, 40, y);
          line = w + ' ';
          y += 32;
        } else {
          line = test;
        }
      });
      ctx.fillText(line, 40, y);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '600 18px monospace';
      ctx.fillText('CLICK CARD TO LAUNCH LIVE →', 40, 755);

      tex.needsUpdate = true;
    }

    drawCard(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawCard(img);
    img.src = item.image;

    return tex;
  }

  const RADIUS = 8.2;
  const monolithMeshes = [];
  const monolithGroup = new THREE.Group();
  scene.add(monolithGroup);

  MUSEUM_MONOLITHS.forEach((item, idx) => {
    const angle = (idx / MUSEUM_MONOLITHS.length) * Math.PI * 2;
    const holder = new THREE.Group();
    holder.position.set(Math.sin(angle) * RADIUS, 0.5, Math.cos(angle) * RADIUS);
    holder.rotation.y = angle;

    const geo = new THREE.BoxGeometry(3.0, 4.1, 0.14);
    const tex = buildMonolithCardTexture(item, idx);
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex }));
    mesh.userData = { index: idx, item };
    holder.add(mesh);
    monolithMeshes.push(mesh);

    monolithGroup.add(holder);
  });

  let activeIdx = 0;
  let isWorldOpen = false;

  function focusMonolith(idx) {
    activeIdx = ((idx % MUSEUM_MONOLITHS.length) + MUSEUM_MONOLITHS.length) % MUSEUM_MONOLITHS.length;
    const item = MUSEUM_MONOLITHS[activeIdx];
    document.getElementById('m-hud-cat').textContent = item.category;
    document.getElementById('m-hud-metrics').textContent = item.metrics;
    document.getElementById('m-hud-title').textContent = item.title;
    document.getElementById('m-hud-desc').textContent = item.desc;
    document.getElementById('m-launch-link').href = item.url;
  }

  function toggleWorldMode() {
    isWorldOpen = !isWorldOpen;
    document.body.classList.toggle('museum-3d-active', isWorldOpen);
    const topShowcaseBtn = document.getElementById('exec-3d-museum-trigger');
    if (topShowcaseBtn) topShowcaseBtn.classList.toggle('active', isWorldOpen);
    if (isWorldOpen) focusMonolith(activeIdx);
  }

  hiddenTrigger.addEventListener('click', toggleWorldMode);
  document.getElementById('m-prev-btn').addEventListener('click', () => focusMonolith(activeIdx - 1));
  document.getElementById('m-next-btn').addEventListener('click', () => focusMonolith(activeIdx + 1));
  document.getElementById('m-exit-btn').addEventListener('click', toggleWorldMode);

  window.addEventListener('keydown', (e) => {
    if (!isWorldOpen) return;
    if (e.key === 'ArrowRight') focusMonolith(activeIdx + 1);
    else if (e.key === 'ArrowLeft') focusMonolith(activeIdx - 1);
    else if (e.key === 'Escape') toggleWorldMode();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animateMuseum() {
    requestAnimationFrame(animateMuseum);
    if (!isWorldOpen) return;

    const t = clock.getElapsedTime();
    const targetAngle = (activeIdx / MUSEUM_MONOLITHS.length) * Math.PI * 2;
    const camRadius = 13.5;

    camera.position.x += (Math.sin(targetAngle) * camRadius - camera.position.x) * 0.07;
    camera.position.z += (Math.cos(targetAngle) * camRadius - camera.position.z) * 0.07;
    camera.position.y += (0.7 - camera.position.y) * 0.07;
    camera.lookAt(Math.sin(targetAngle) * RADIUS, 0.35, Math.cos(targetAngle) * RADIUS);

    monolithMeshes.forEach((m, i) => {
      m.position.y = Math.sin(t * 1.8 + i) * 0.08;
    });

    renderer.render(scene, camera);
  }
  animateMuseum();
}

export function initPhase7Awwwards() {
  injectMuseumStyles();
  initSpatialMuseumMode();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhase7Awwwards);
} else {
  initPhase7Awwwards();
}