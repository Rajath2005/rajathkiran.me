/**
 * PHASE 6 (UPGRADED): Meaningful 3D Isometric System Architecture Stack + Executive Bento + Cmd+K JD Matcher
 * File: assets/js/command-os-3d.js
 *
 * Replaces the abstract sine-wave with an interactive 3D 4-Tier Engineering Stack Visualizer
 * that directly illustrates Rajath's Cloud (GCP/GKE), AI/ML (SHWASA/AyuDost), and Full-Stack systems.
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// ============================================================================
// 1. REAL ENGINEERING ARCHITECTURE STACKS (Replaces meaningless wave)
// ============================================================================
const ARCHITECTURE_STACKS = {
  gcp: {
    name: 'GCP & GKE Cloud Infrastructure',
    badge: 'PRODUCTION CLOUD TOPOLOGY',
    summary: 'Multi-VM high availability & containerized microservices on Google Kubernetes Engine.',
    tiers: [
      { level: 'TIER 01 // INGRESS', title: 'Global HTTPS Load Balancer & Cloud CDN', tech: 'SSL Termination · Anycast IP · Health Checks', color: 0x38bdf8 },
      { level: 'TIER 02 // ORCHESTRATION', title: 'Google Kubernetes Engine (GKE) Cluster', tech: 'Auto-Scaling Pods · Docker · Workload Identity', color: 0x6366f1 },
      { level: 'TIER 03 // MESSAGING', title: 'Cloud Pub/Sub Asynchronous Event Bus', tech: 'Decoupled Topics · Dead-Letter Queues · IAM', color: 0x8b5cf6 },
      { level: 'TIER 04 // PERSISTENCE', title: 'Cloud Spanner & Observability', tech: 'Globally Distributed SQL · Uptime Monitoring', color: 0x10b981 }
    ]
  },
  shwasa: {
    name: 'SHWASA — COPD Acoustic AI',
    badge: 'DEEP LEARNING PIPELINE',
    summary: 'Non-invasive COPD screening and severity grading from respiratory auscultation audio.',
    tiers: [
      { level: 'TIER 01 // SIGNAL INPUT', title: 'Respiratory Auscultation Audio (.wav)', tech: 'Noise Filtering · Bandpass Normalization', color: 0x38bdf8 },
      { level: 'TIER 02 // FEATURE EXTRACTION', title: '2D Mel-Spectrogram & MFCC Tensor', tech: 'Librosa · Time-Frequency Acoustic Mapping', color: 0x8b5cf6 },
      { level: 'TIER 03 // NEURAL INFERENCE', title: 'Hybrid CNN + Bi-LSTM Deep Network', tech: 'Spatial Convolution + Temporal Sequence Memory', color: 0xec4899 },
      { level: 'TIER 04 // CLINICAL OUTPUT', title: 'COPD Severity Classification & Web UI', tech: 'Confidence Telemetry · Interactive Research Demo', color: 0x10b981 }
    ]
  },
  ayudost: {
    name: 'AyuDost & MediQ Healthcare AI',
    badge: 'FULL-STACK RAG & NLP',
    summary: 'Retrieval-Augmented Generation chatbot and full-stack clinical wellness platform.',
    tiers: [
      { level: 'TIER 01 // CLIENT UI', title: 'React.js Responsive Healthcare Portal', tech: 'Component Design System · Real-Time State', color: 0x38bdf8 },
      { level: 'TIER 02 // API GATEWAY', title: 'Node.js, Express & Python Flask APIs', tech: 'REST Endpoints · Rate Limiting · JWT Auth', color: 0x6366f1 },
      { level: 'TIER 03 // AI & RAG ENGINE', title: 'NLP Intent Engine + Vector Knowledge Retrieval', tech: 'Gemini AI · Classical Ayurvedic Corpus Embeddings', color: 0xa855f7 },
      { level: 'TIER 04 // DATA LAYER', title: 'Supabase PostgreSQL & Row-Level Security', tech: 'Patient Profiles · Symptom Logs · Wellness Plans', color: 0x10b981 }
    ]
  }
};

// ============================================================================
// 2. SKILLS & PROJECTS FOR RECRUITER JD MATCHER
// ============================================================================
const RAJATH_SKILLS = [
  { key: 'gcp', label: 'Google Cloud (GCP)', aliases: ['gcp', 'google cloud', 'cloud', 'compute engine', 'spanner', 'pub/sub'] },
  { key: 'kubernetes', label: 'Kubernetes (GKE)', aliases: ['kubernetes', 'k8s', 'gke', 'container', 'microservices'] },
  { key: 'docker', label: 'Docker & CI/CD', aliases: ['docker', 'devops', 'ci/cd', 'linux', 'deployment'] },
  { key: 'python', label: 'Python', aliases: ['python', 'flask', 'fastapi', 'scripting'] },
  { key: 'tensorflow', label: 'TensorFlow & PyTorch', aliases: ['tensorflow', 'pytorch', 'deep learning', 'cnn', 'lstm', 'machine learning', 'ml', 'ai'] },
  { key: 'nlp', label: 'NLP & RAG / LLMs', aliases: ['nlp', 'rag', 'llm', 'generative ai', 'genai', 'chatbot', 'huggingface', 'gemini'] },
  { key: 'react', label: 'React.js & Frontend', aliases: ['react', 'reactjs', 'javascript', 'typescript', 'html', 'css', 'frontend', 'web'] },
  { key: 'node', label: 'Node.js & Express', aliases: ['node', 'nodejs', 'express', 'backend', 'rest api', 'api'] },
  { key: 'supabase', label: 'Supabase & SQL', aliases: ['supabase', 'sql', 'postgres', 'postgresql', 'database', 'dbms'] },
  { key: 'dsa', label: 'C++ / Java & DSA', aliases: ['c++', 'java', 'c', 'data structures', 'algorithms', 'dsa', 'oop', 'leetcode'] },
  { key: 'uiux', label: 'UI/UX & Figma', aliases: ['figma', 'ui/ux', 'ui', 'ux', 'design', 'prototyping'] }
];

const RAJATH_PROJECTS = [
  { name: 'SHWASA — COPD Detection (CNN-LSTM)', tags: ['python', 'tensorflow', 'nlp'], url: 'https://shwasa.vercel.app/' },
  { name: 'AyuDost AI (NLP + RAG Healthcare)', tags: ['python', 'nlp', 'gcp', 'node'], url: 'ayudost.html' },
  { name: 'MediQ Health Platform (React + Supabase)', tags: ['react', 'supabase', 'node', 'nlp'], url: 'mediq.html' },
  { name: 'Microservices on GKE & HTTP(S) Load Balancing', tags: ['gcp', 'kubernetes', 'docker'], url: 'http://cloud.rajathkiran.me/' },
  { name: 'Code Review Env (HuggingFace RL Benchmark)', tags: ['python', 'nlp', 'docker'], url: 'https://huggingface.co/spaces/BugHunter28/code-review-env' }
];

const SAMPLE_JDS = {
  cloud: 'Seeking a 2026 Cloud & DevOps Engineering Intern with hands-on experience in Google Cloud Platform (GCP), Kubernetes (GKE), Docker containers, Linux, CI/CD, Python scripting, and distributed SQL databases.',
  aiml: 'Looking for an AI/ML Research & Engineering Intern for 2026 proficient in Python, TensorFlow or PyTorch, Deep Learning (CNN, LSTM), NLP, RAG pipelines, LLM agents, and deploying models to cloud APIs.',
  fullstack: 'Hiring a Full Stack Developer Intern (2026) skilled in React.js, JavaScript, Node.js, REST APIs, SQL/Supabase, UI/UX design in Figma, Git, and strong Data Structures & Algorithms.'
};

// ============================================================================
// 3. INJECT STYLES
// ============================================================================
function injectStyles() {
  if (document.getElementById('phase6-pro-arch-styles')) return;
  const style = document.createElement('style');
  style.id = 'phase6-pro-arch-styles';
  style.textContent = `
    /* --- Executive Metrics Bento Strip (Top of About) --- */
    .exec-metrics-bento {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 22px 0 28px;
    }
    .exec-metric-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .exec-metric-card:hover {
      transform: translateY(-2px);
      border-color: var(--border-highlight);
    }
    .exec-metric-num {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }
    .exec-metric-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--accent-primary);
    }
    .exec-metric-sub {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* --- 3D System Architecture Explorer Card --- */
    .arch-explorer-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 22px;
      margin: 10px 0 36px;
      box-shadow: var(--shadow-card);
    }
    .arch-explorer-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .arch-explorer-heading {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .arch-explorer-eyebrow {
      font-family: monospace;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent-primary);
      font-weight: 600;
    }
    .arch-explorer-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .arch-system-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .arch-sys-tab {
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--text-muted);
      background: rgba(148, 163, 184, 0.08);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .arch-sys-tab:hover,
    .arch-sys-tab.active {
      color: var(--text-primary);
      background: rgba(56, 189, 248, 0.14);
      border-color: var(--border-highlight);
      font-weight: 600;
    }

    /* Split View: 3D Isometric Stack on Left, Interactive Tier Specs on Right */
    .arch-explorer-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 20px;
      align-items: center;
    }
    .arch-3d-viewport {
      position: relative;
      width: 100%;
      height: 290px;
      border-radius: 14px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08), rgba(6, 8, 15, 0.92));
      border: 1px solid var(--border-subtle);
      cursor: grab;
    }
    .arch-3d-viewport:active {
      cursor: grabbing;
    }
    .arch-3d-viewport canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
    .arch-viewport-tag {
      position: absolute;
      bottom: 10px;
      left: 12px;
      font-family: monospace;
      font-size: 10px;
      color: #94a3b8;
      pointer-events: none;
    }
    .arch-tiers-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .arch-tier-item {
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(148, 163, 184, 0.05);
      border: 1px solid var(--border-subtle);
      border-left: 3px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .arch-tier-item:hover,
    .arch-tier-item.active {
      background: rgba(56, 189, 248, 0.1);
      border-color: rgba(56, 189, 248, 0.3);
      border-left-color: var(--accent-primary);
      transform: translateX(3px);
    }
    .arch-tier-level {
      font-family: monospace;
      font-size: 10px;
      color: var(--accent-primary);
      font-weight: 600;
      display: block;
      margin-bottom: 2px;
    }
    .arch-tier-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    .arch-tier-tech {
      font-size: 11.5px;
      color: var(--text-muted);
    }

    /* --- Cmd+K Command Palette Modal --- */
    .cmd-palette-backdrop {
      position: fixed;
      inset: 0;
      z-index: 100000;
      background: rgba(6, 8, 15, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 10vh 16px 20px;
    }
    .cmd-palette-backdrop.active {
      display: flex;
    }
    .cmd-palette-window {
      width: 100%;
      max-width: 640px;
      background: #0f1422;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85);
      overflow: hidden;
    }
    .cmd-search-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .cmd-search-bar ion-icon {
      font-size: 20px;
      color: #38bdf8;
    }
    .cmd-search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: #f8fafc;
      font-size: 14px;
    }
    .cmd-tabs-bar {
      display: flex;
      gap: 6px;
      padding: 8px 16px;
      background: rgba(6, 8, 15, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .cmd-tab-btn {
      padding: 5px 12px;
      border-radius: 7px;
      font-size: 11.5px;
      font-weight: 600;
      color: #94a3b8;
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .cmd-tab-btn.active {
      color: #f8fafc;
      background: rgba(56, 189, 248, 0.16);
      border-color: rgba(56, 189, 248, 0.35);
    }
    .cmd-body-area {
      max-height: 390px;
      overflow-y: auto;
      padding: 12px;
    }
    .cmd-action-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      background: transparent;
      border: none;
      color: #cbd5e1;
      font-size: 13px;
      cursor: pointer;
      text-align: left;
    }
    .cmd-action-item:hover {
      background: rgba(56, 189, 248, 0.14);
      color: #fff;
    }
    .cmd-action-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cmd-action-left ion-icon {
      font-size: 17px;
      color: #38bdf8;
    }
    .cmd-action-shortcut {
      font-family: monospace;
      font-size: 11px;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 7px;
      border-radius: 5px;
    }
    .jd-matcher-box { padding: 6px; }
    .jd-textarea {
      width: 100%;
      min-height: 85px;
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(6, 8, 15, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.25);
      color: #f8fafc;
      font-size: 12px;
      resize: vertical;
      margin: 8px 0;
      outline: none;
    }
    .jd-presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }

    @media (max-width: 768px) {
      .exec-metrics-bento {
        grid-template-columns: repeat(2, 1fr);
      }
      .arch-explorer-grid {
        grid-template-columns: 1fr;
      }
      .arch-3d-viewport {
        height: 230px;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// 4. BUILD MEANINGFUL 3D SYSTEM ARCHITECTURE EXPLORER & BENTO IN ABOUT
// ============================================================================
function initAboutArchitectureExplorer() {
  const aboutArticle = document.querySelector('article.about');
  const serviceSection = aboutArticle?.querySelector('section.service');
  if (!aboutArticle || !serviceSection) return;

  // Remove old sine-wave sandbox if present
  document.getElementById('ai-sandbox-3d-card')?.remove();
  if (document.getElementById('arch-explorer-card')) return;

  // 1. Executive Engineering Impact Bento
  const bento = document.createElement('div');
  bento.className = 'exec-metrics-bento';
  bento.innerHTML = `
    <div class="exec-metric-card">
      <span class="exec-metric-num">80+</span>
      <span class="exec-metric-label">Open-Source Repos</span>
      <span class="exec-metric-sub">AI, Cloud & Full-Stack</span>
    </div>
    <div class="exec-metric-card">
      <span class="exec-metric-num">50+</span>
      <span class="exec-metric-label">Google Cloud Badges</span>
      <span class="exec-metric-sub">GKE, Load Balancing, Spanner</span>
    </div>
    <div class="exec-metric-card">
      <span class="exec-metric-num">2× #1</span>
      <span class="exec-metric-label">VTU University Rank</span>
      <span class="exec-metric-sub">Code360 · 170+ LeetCode</span>
    </div>
    <div class="exec-metric-card">
      <span class="exec-metric-num">3 Live</span>
      <span class="exec-metric-label">Healthcare AI Systems</span>
      <span class="exec-metric-sub">SHWASA · AyuDost · MediQ</span>
    </div>
  `;
  aboutArticle.insertBefore(bento, serviceSection);

  // 2. Interactive 3D 4-Tier System Architecture Explorer
  const explorer = document.createElement('div');
  explorer.id = 'arch-explorer-card';
  explorer.className = 'arch-explorer-card';
  explorer.innerHTML = `
    <div class="arch-explorer-top">
      <div class="arch-explorer-heading">
        <span class="arch-explorer-eyebrow">INTERACTIVE 3D SYSTEM BLUEPRINT</span>
        <h3 class="arch-explorer-title" id="arch-exp-title">GCP & GKE Cloud Infrastructure</h3>
      </div>
      <div class="arch-system-tabs">
        <button type="button" class="arch-sys-tab active" data-stack="gcp">☁️ Cloud / GKE Stack</button>
        <button type="button" class="arch-sys-tab" data-stack="shwasa">🫁 SHWASA Acoustic AI</button>
        <button type="button" class="arch-sys-tab" data-stack="ayudost">🧠 AyuDost & MediQ RAG</button>
      </div>
    </div>
    <div class="arch-explorer-grid">
      <div class="arch-3d-viewport" id="arch-3d-viewport">
        <canvas id="arch-stack-canvas"></canvas>
        <span class="arch-viewport-tag">Drag to rotate 3D stack · Click tier to inspect</span>
      </div>
      <div class="arch-tiers-list" id="arch-tiers-list"></div>
    </div>
  `;
  aboutArticle.insertBefore(explorer, serviceSection);

  // --- THREE.JS 3D ISOMETRIC 4-TIER STACK ---
  const viewport = document.getElementById('arch-3d-viewport');
  const canvas = document.getElementById('arch-stack-canvas');
  const tiersListEl = document.getElementById('arch-tiers-list');
  const titleEl = document.getElementById('arch-exp-title');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(4.2, 3.6, 5.2);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
  dirLight.position.set(6, 10, 8);
  scene.add(dirLight);

  const stackGroup = new THREE.Group();
  scene.add(stackGroup);

  // Create 4 Isometric Architectural Tier Slabs + Vertical Data Pillar
  const tierSlabs = [];
  const tierYPositions = [1.35, 0.45, -0.45, -1.35];

  for (let i = 0; i < 4; i++) {
    const slabGroup = new THREE.Group();
    slabGroup.position.y = tierYPositions[i];

    const geo = new THREE.BoxGeometry(2.5, 0.22, 2.5);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25,
      roughness: 0.25,
      metalness: 0.75,
      transparent: true,
      opacity: 0.92
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { tierIndex: i };
    slabGroup.add(mesh);

    // Crisp CAD Wireframe Edge
    const edgeGeo = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    slabGroup.add(edges);

    stackGroup.add(slabGroup);
    tierSlabs.push({ slabGroup, mesh, mat, edgeMat, baseY: tierYPositions[i], targetScale: 1.0 });
  }

  // Vertical Data Bus Line & Traveling Request Packet
  const busGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 1.5, 0),
    new THREE.Vector3(0, -1.5, 0)
  ]);
  const busLine = new THREE.Line(
    busGeo,
    new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
  );
  stackGroup.add(busLine);

  const packetMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x10b981 })
  );
  stackGroup.add(packetMesh);

  let currentStackKey = 'gcp';
  let activeTierIdx = 0;

  function renderStackTiers(stackKey, selectedIdx = 0) {
    currentStackKey = stackKey;
    activeTierIdx = selectedIdx;
    const stack = ARCHITECTURE_STACKS[stackKey];
    titleEl.textContent = stack.name;

    tiersListEl.innerHTML = stack.tiers
      .map(
        (t, idx) => `
        <div class="arch-tier-item ${idx === selectedIdx ? 'active' : ''}" data-tier-idx="${idx}">
          <span class="arch-tier-level">${t.level}</span>
          <div class="arch-tier-name">${t.title}</div>
          <div class="arch-tier-tech">${t.tech}</div>
        </div>
      `
      )
      .join('');

    stack.tiers.forEach((t, idx) => {
      const slab = tierSlabs[idx];
      const isSelected = idx === selectedIdx;
      slab.mat.emissive.setHex(t.color);
      slab.edgeMat.color.setHex(t.color);
      slab.mat.emissiveIntensity = isSelected ? 0.75 : 0.18;
      slab.targetScale = isSelected ? 1.12 : 0.96;
    });

    tiersListEl.querySelectorAll('.arch-tier-item').forEach((el) => {
      el.addEventListener('click', () => {
        const i = parseInt(el.getAttribute('data-tier-idx'), 10);
        renderStackTiers(currentStackKey, i);
      });
    });
  }

  explorer.querySelectorAll('.arch-sys-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      explorer.querySelectorAll('.arch-sys-tab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderStackTiers(btn.getAttribute('data-stack'), 0);
    });
  });

  // Drag-to-rotate 3D Stack + Click Slab Raycasting
  let isDragging = false;
  let prevX = 0;
  let targetRotY = 0.65;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  viewport.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
  });
  window.addEventListener('pointerup', () => {
    isDragging = false;
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    targetRotY += (e.clientX - prevX) * 0.01;
    prevX = e.clientX;
  });

  viewport.addEventListener('click', (e) => {
    const rect = viewport.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(tierSlabs.map((s) => s.mesh));
    if (hits.length > 0) {
      renderStackTiers(currentStackKey, hits[0].object.userData.tierIndex);
    }
  });

  function resizeViewport() {
    const w = viewport.clientWidth || 300;
    const h = viewport.clientHeight || 280;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resizeViewport);
  setTimeout(() => {
    resizeViewport();
    renderStackTiers('gcp', 0);
  }, 100);

  const clock = new THREE.Clock();
  function animateStack() {
    requestAnimationFrame(animateStack);
    if (!aboutArticle.classList.contains('active')) return;

    const t = clock.getElapsedTime();
    if (!isDragging) targetRotY += 0.003;
    stackGroup.rotation.y += (targetRotY - stackGroup.rotation.y) * 0.08;

    tierSlabs.forEach((s, i) => {
      s.slabGroup.scale.x += (s.targetScale - s.slabGroup.scale.x) * 0.1;
      s.slabGroup.scale.z += (s.targetScale - s.slabGroup.scale.z) * 0.1;
      s.slabGroup.position.y = s.baseY + Math.sin(t * 2 + i * 0.7) * 0.03;
    });

    // Animate data packet flowing top-to-bottom through the 4 tiers
    const flow = 1.4 - ((t * 1.1) % 2.8);
    packetMesh.position.y = flow;

    renderer.render(scene, camera);
  }
  animateStack();
}

// ============================================================================
// 5. COMMAND PALETTE (Cmd+K / Ctrl+K) + RECRUITER JD MATCHER
// ============================================================================
function initCommandPalette() {
  if (document.getElementById('cmd-palette-backdrop')) return;

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'cmd-k-trigger-pill';
  trigger.style.display = 'none';
  document.body.appendChild(trigger);

  const backdrop = document.createElement('div');
  backdrop.id = 'cmd-palette-backdrop';
  backdrop.className = 'cmd-palette-backdrop';
  backdrop.innerHTML = `
    <div class="cmd-palette-window" role="dialog" aria-label="Developer Command Palette">
      <div class="cmd-search-bar">
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" class="cmd-search-input" id="cmd-search-input" placeholder="Search sections, 3D views, or paste a Job Description..." autocomplete="off">
        <span class="exec-kbd">ESC</span>
      </div>
      <div class="cmd-tabs-bar">
        <button type="button" class="cmd-tab-btn active" data-cmd-tab="actions">⚡ Quick Navigation</button>
        <button type="button" class="cmd-tab-btn" data-cmd-tab="jd">🎯 Recruiter JD Skill Matcher</button>
      </div>
      <div class="cmd-body-area" id="cmd-body-actions"></div>
      <div class="cmd-body-area" id="cmd-body-jd" style="display: none;">
        <div class="jd-matcher-box">
          <div class="jd-presets-row">
            <button type="button" class="jd-sample-btn" data-jd-preset="cloud">☁️ Cloud/GCP Intern JD</button>
            <button type="button" class="jd-sample-btn" data-jd-preset="aiml">🧠 AI/ML Intern JD</button>
            <button type="button" class="jd-sample-btn" data-jd-preset="fullstack">💻 Full-Stack Intern JD</button>
          </div>
          <textarea class="jd-textarea" id="jd-input-text" placeholder="Paste any 2026 Internship Job Description here to compute instant skill & project alignment..."></textarea>
          <div id="jd-results-output"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const searchInput = document.getElementById('cmd-search-input');
  const actionsContainer = document.getElementById('cmd-body-actions');
  const jdContainer = document.getElementById('cmd-body-jd');

  const COMMANDS = [
    { label: 'Analyze Job Description Fit (Recruiter JD Matcher)', icon: 'analytics-outline', tag: 'Recruiter', run: () => switchTab('jd') },
    { label: 'Go to About & 3D Architecture Stack', icon: 'person-outline', tag: 'Section', run: () => clickNav('about') },
    { label: 'Go to Resume & 3D Skill Topology Graph', icon: 'layers-outline', tag: '3D Graph', run: () => clickNav('resume') },
    { label: 'Go to Projects & 3D Holo-Deck Carousel', icon: 'cube-outline', tag: '3D Deck', run: () => { clickNav('projects'); setTimeout(() => document.querySelector('[data-proj-mode="holo"]')?.click(), 180); } },
    { label: 'Go to Contact & 3D Mangalore Telemetry Globe', icon: 'globe-outline', tag: '3D Globe', run: () => clickNav('contact') },
    { label: 'Open Ask Rajath AI Assistant', icon: 'sparkles-outline', tag: 'Shift+A', run: () => document.getElementById('ai-chat-btn')?.click() },
    { label: 'Download Official Resume (PDF)', icon: 'download-outline', tag: 'PDF', run: () => window.open('assets/resumes/Rajath_Kiran_A_Resume.pdf', '_blank') }
  ];

  function renderActions(filterText = '') {
    const q = filterText.toLowerCase().trim();
    const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));
    actionsContainer.innerHTML = filtered
      .map(
        (cmd, idx) => `
        <button type="button" class="cmd-action-item" data-cmd-idx="${idx}">
          <div class="cmd-action-left">
            <ion-icon name="${cmd.icon}"></ion-icon>
            <span>${cmd.label}</span>
          </div>
          <span class="cmd-action-shortcut">${cmd.tag}</span>
        </button>
      `
      )
      .join('');

    actionsContainer.querySelectorAll('.cmd-action-item').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const chosen = filtered[i];
        if (chosen.label.includes('Job Description')) {
          chosen.run();
        } else {
          closePalette();
          chosen.run();
        }
      });
    });
  }

  function clickNav(pageName) {
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      if (link.textContent.trim().toLowerCase() === pageName) link.click();
    });
  }

  function switchTab(tabKey) {
    backdrop.querySelectorAll('.cmd-tab-btn').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-cmd-tab') === tabKey);
    });
    actionsContainer.style.display = tabKey === 'actions' ? 'block' : 'none';
    jdContainer.style.display = tabKey === 'jd' ? 'block' : 'none';
  }

  backdrop.querySelectorAll('.cmd-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-cmd-tab')));
  });

  function openPalette() {
    backdrop.classList.add('active');
    renderActions('');
    searchInput.value = '';
    setTimeout(() => searchInput.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove('active');
  }

  trigger.addEventListener('click', openPalette);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });
  searchInput.addEventListener('input', (e) => {
    switchTab('actions');
    renderActions(e.target.value);
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('active') ? closePalette() : openPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closePalette();
    }
  });

  const jdInput = document.getElementById('jd-input-text');
  const jdOutput = document.getElementById('jd-results-output');

  function evaluateJD(text) {
    const raw = text.toLowerCase();
    if (!raw.trim()) {
      jdOutput.innerHTML = '';
      return;
    }
    const matched = RAJATH_SKILLS.filter((s) => s.aliases.some((a) => raw.includes(a)));
    const score = Math.min(98, Math.max(72, Math.round(58 + (matched.length / Math.max(4, matched.length + 1)) * 40)));
    const matchedKeys = new Set(matched.map((s) => s.key));

    const rankedProjects = RAJATH_PROJECTS.map((proj) => {
      const hits = proj.tags.filter((t) => matchedKeys.has(t)).length;
      return { ...proj, pct: Math.min(98, 75 + hits * 8) };
    }).sort((a, b) => b.pct - a.pct).slice(0, 3);

    jdOutput.innerHTML = `
      <div class="jd-match-score">
        <div class="jd-match-pct" style="color: #10b981;">${score}%</div>
        <div class="jd-match-label">
          <strong style="color: #fff; display: block;">Strong Candidate Match · 2026 Internship</strong>
          Matched ${matched.length} core engineering skills across Cloud, AI/ML & Full-Stack.
        </div>
      </div>
      <div class="jd-skill-match">
        ${matched.map((s) => `<span class="jd-skill-tag matched">✓ ${s.label}</span>`).join('')}
      </div>
      <div class="jd-project-list">
        ${rankedProjects
          .map(
            (p) => `
          <a href="${p.url}" target="_blank" class="jd-project-match">
            <ion-icon name="rocket-outline"></ion-icon>
            <span>${p.name}</span>
            <span class="jd-project-pct">${p.pct}% Match</span>
          </a>
        `
          )
          .join('')}
      </div>
    `;
  }

  jdInput.addEventListener('input', (e) => evaluateJD(e.target.value));
  backdrop.querySelectorAll('.jd-sample-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = SAMPLE_JDS[btn.getAttribute('data-jd-preset')] || SAMPLE_JDS.cloud;
      jdInput.value = preset;
      evaluateJD(preset);
    });
  });

  jdInput.value = SAMPLE_JDS.cloud;
  evaluateJD(SAMPLE_JDS.cloud);
}

export function initPhase6() {
  injectStyles();
  initCommandPalette();
  initAboutArchitectureExplorer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhase6);
} else {
  initPhase6();
}