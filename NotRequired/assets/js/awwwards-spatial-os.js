/**
 * PHASE 7: Awwwards-Grade Spatial Museum Mode + Procedural Web Audio Synth + Cloud Stress-Test Simulator
 * File: assets/js/awwwards-spatial-os.js
 *
 * Features:
 * 1. Full-Screen 3D Spatial Architecture Museum ("3D World" Mode / Shift+M)
 *    - Folds away 2D DOM and spawns 6 interactive 3D Holographic Monoliths in WebGL
 * 2. Native Web Audio API Procedural Sound Engine (Hover Ticks, Camera Whooshes, Chords)
 * 3. Interactive GCP / GKE Traffic Spike & Chaos Auto-Heal Simulator
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// ============================================================================
// 1. FLAGSHIP MONOLITH DATA FOR 3D WORLD MUSEUM
// ============================================================================
const MUSEUM_MONOLITHS = [
  {
    id: 'shwasa',
    title: 'SHWASA — Respiratory AI',
    category: 'DEEP LEARNING · HEALTHCARE',
    metrics: 'CNN + Bi-LSTM · Audio Spectrograms',
    desc: 'Screening and severity classification of COPD using respiratory acoustic intelligence.',
    color: 0x00d8ff,
    url: 'https://shwasa.vercel.app/'
  },
  {
    id: 'ayudost',
    title: 'AyuDost AI Assistant',
    category: 'NLP · RAG ARCHITECTURE',
    metrics: 'Vector Retrieval · Ayurvedic LLM',
    desc: 'AI-powered Ayurvedic clinical support chatbot with disease prediction and personalized care.',
    color: 0xa855f7,
    url: 'ayudost.html'
  },
  {
    id: 'gke',
    title: 'GKE Microservices Cluster',
    category: 'GOOGLE CLOUD · KUBERNETES',
    metrics: 'Auto-Scaling Pods · Zero-Downtime',
    desc: 'Production containerized microservices on Google Kubernetes Engine with workload monitoring.',
    color: 0x4ff0b7,
    url: 'http://cloud.rajathkiran.me/'
  },
  {
    id: 'mediq',
    title: 'MediQ Health Platform',
    category: 'FULL-STACK · REACT + SUPABASE',
    metrics: 'Real-Time DB · Gemini AI Integration',
    desc: 'End-to-end Ayurvedic wellness platform with symptom analysis and treatment workflows.',
    color: 0x10b981,
    url: 'mediq.html'
  },
  {
    id: 'gcp_lb',
    title: 'Highly Available GCP App',
    category: 'CLOUD INFRASTRUCTURE · SRE',
    metrics: 'HTTP(S) Load Balancing · Multi-VM',
    desc: 'Global traffic distribution across Compute Engine VM instances with automated health checks.',
    color: 0x38bdf8,
    url: 'http://cloud.rajathkiran.me/'
  },
  {
    id: 'codereview',
    title: 'Code Review RL Env',
    category: 'DEVTOOLS · REINFORCEMENT LEARNING',
    metrics: 'OpenEnv Benchmark · HuggingFace',
    desc: 'Reinforcement learning environment for training autonomous AI agents on Python code review.',
    color: 0xf59e0b,
    url: 'https://huggingface.co/spaces/BugHunter28/code-review-env'
  }
];

// ============================================================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER (Zero External Audio Files)
// ============================================================================
class ProceduralSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) this.playChord();
    return this.enabled;
  }

  // Crisp high-tech micro-click on hover
  playTick(freq = 1200) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Futuristic spatial whoosh / camera transition
  playTransition() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.45);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.46);
  }

  // Ambient confirmation harmonic chord
  playChord() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.04 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + 0.75);
    });
  }
}

const soundEngine = new ProceduralSoundEngine();

// ============================================================================
// 3. INJECT PHASE 7 STYLES
// ============================================================================
function injectPhase7Styles() {
  if (document.getElementById('phase7-awwwards-styles')) return;
  const style = document.createElement('style');
  style.id = 'phase7-awwwards-styles';
  style.textContent = `
    /* --- Top-Center Spatial Controls Bar (3D World + Sound Synth) --- */
    .awwwards-top-bar {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      background: hsla(230, 45%, 10%, 0.86);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid hsla(195, 100%, 68%, 0.3);
      border-radius: 999px;
      padding: 5px 10px;
      box-shadow: 0 10px 32px hsla(220, 70%, 4%, 0.65);
    }
    .spatial-world-btn,
    .sound-synth-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      color: var(--white-1);
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.22s ease;
      white-space: nowrap;
    }
    .spatial-world-btn {
      background: linear-gradient(135deg, hsla(195, 100%, 55%, 0.22), hsla(265, 90%, 60%, 0.25));
      border-color: hsla(195, 100%, 68%, 0.4);
    }
    .spatial-world-btn:hover,
    .spatial-world-btn.active {
      background: var(--neon-blue);
      color: #040711;
      box-shadow: 0 0 18px hsla(195, 100%, 60%, 0.55);
    }
    .sound-synth-btn {
      color: var(--light-gray-70);
    }
    .sound-synth-btn.active {
      color: #4ff0b7;
      border-color: hsla(160, 90%, 55%, 0.35);
      background: hsla(160, 90%, 45%, 0.12);
    }
    .eq-bars {
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 11px;
    }
    .eq-bars span {
      width: 2px;
      height: 4px;
      background: currentColor;
      border-radius: 1px;
      transition: height 0.2s ease;
    }
    .sound-synth-btn.active .eq-bars span:nth-child(1) { animation: eqAnim 0.6s infinite ease-in-out; }
    .sound-synth-btn.active .eq-bars span:nth-child(2) { animation: eqAnim 0.45s infinite ease-in-out 0.15s; }
    .sound-synth-btn.active .eq-bars span:nth-child(3) { animation: eqAnim 0.7s infinite ease-in-out 0.3s; }
    @keyframes eqAnim {
      0%, 100% { height: 3px; }
      50% { height: 11px; }
    }

    /* --- FULL-SCREEN 3D SPATIAL MUSEUM OVERLAY --- */
    .spatial-museum-overlay {
      position: fixed;
      inset: 0;
      z-index: 9990;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.55s cubic-bezier(0.23, 1, 0.32, 1), visibility 0.55s ease;
    }
    body.museum-3d-active .spatial-museum-overlay {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    body.museum-3d-active main,
    body.museum-3d-active .scroll-down,
    body.museum-3d-active #back-to-top {
      opacity: 0;
      transform: scale(0.94) translateY(30px);
      pointer-events: none;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    main {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    #museum-3d-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    #museum-3d-canvas:active {
      cursor: grabbing;
    }

    /* Museum Bottom HUD Inspector */
    .museum-hud-card {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 660px;
      background: hsla(230, 50%, 8%, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid hsla(195, 100%, 68%, 0.35);
      border-radius: 20px;
      padding: 20px 24px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      color: var(--cyber-cyan);
      letter-spacing: 0.8px;
    }
    .museum-hud-metrics {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 999px;
      background: hsla(195, 100%, 55%, 0.15);
      color: #4ff0b7;
      border: 1px solid hsla(195, 100%, 60%, 0.3);
    }
    .museum-hud-title {
      font-size: 22px;
      font-weight: 600;
      color: var(--white-1);
    }
    .museum-hud-desc {
      font-size: 13px;
      color: var(--light-gray-70);
      line-height: 1.5;
    }
    .museum-hud-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
      gap: 12px;
    }
    .museum-nav-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .museum-nav-btn {
      padding: 8px 14px;
      border-radius: 10px;
      background: hsla(230, 40%, 16%, 0.9);
      border: 1px solid hsla(195, 100%, 68%, 0.3);
      color: var(--white-1);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .museum-nav-btn:hover {
      background: var(--neon-blue);
      color: #050811;
    }
    .museum-launch-btn {
      padding: 9px 18px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--neon-blue), #4ff0b7);
      color: #040711;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 18px hsla(195, 100%, 55%, 0.35);
    }

    /* --- Cloud Chaos & Traffic Simulator Bar in Projects --- */
    .chaos-sim-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 16px;
      margin-bottom: 20px;
      border-radius: 14px;
      background: hsla(230, 45%, 10%, 0.82);
      border: 1px solid hsla(195, 100%, 68%, 0.22);
    }
    .chaos-sim-label {
      font-size: 12px;
      color: var(--light-gray);
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: monospace;
    }
    .chaos-sim-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chaos-btn {
      padding: 5px 11px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid hsla(195, 100%, 68%, 0.3);
      background: hsla(195, 100%, 50%, 0.12);
      color: var(--cyber-cyan);
      transition: all 0.2s ease;
    }
    .chaos-btn:hover {
      background: var(--neon-blue);
      color: #050811;
    }
    .chaos-btn.chaos-danger {
      border-color: hsla(0, 90%, 60%, 0.4);
      background: hsla(0, 90%, 55%, 0.12);
      color: #ff6b6b;
    }
    .chaos-btn.chaos-danger:hover {
      background: #ff4d4d;
      color: #fff;
    }

    @media (max-width: 768px) {
      .awwwards-top-bar {
        top: auto;
        bottom: 68px;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// 4. FULL-SCREEN 3D SPATIAL MUSEUM ("3D WORLD" MODE)
// ============================================================================
function initSpatialMuseumMode() {
  if (document.getElementById('awwwards-top-bar')) return;

  // Top-Center Control Pill
  const topBar = document.createElement('div');
  topBar.id = 'awwwards-top-bar';
  topBar.className = 'awwwards-top-bar';
  topBar.innerHTML = `
    <button type="button" class="spatial-world-btn" id="toggle-3d-world-btn" title="Enter Full-Screen 3D Spatial Museum (Shift+M)">
      <ion-icon name="planet-outline"></ion-icon>
      <span id="world-btn-text">Enter 3D World</span>
    </button>
    <button type="button" class="sound-synth-btn" id="toggle-sound-btn" title="Toggle Procedural UI Sound Synth">
      <div class="eq-bars"><span></span><span></span><span></span></div>
      <span id="sound-btn-text">Audio: OFF</span>
    </button>
  `;
  document.body.appendChild(topBar);

  // Full-Screen 3D Museum Overlay
  const overlay = document.createElement('div');
  overlay.id = 'spatial-museum-overlay';
  overlay.className = 'spatial-museum-overlay';
  overlay.innerHTML = `
    <canvas id="museum-3d-canvas"></canvas>
    <div class="museum-hud-card" id="museum-hud-card">
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
          <button type="button" class="museum-nav-btn" id="m-prev-btn">← Prev Monolith</button>
          <button type="button" class="museum-nav-btn" id="m-next-btn">Next Monolith →</button>
        </div>
        <a href="https://shwasa.vercel.app/" target="_blank" class="museum-launch-btn" id="m-launch-link">
          <span>Launch Live System</span>
          <ion-icon name="open-outline"></ion-icon>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Sound Toggle Logic
  const soundBtn = document.getElementById('toggle-sound-btn');
  const soundText = document.getElementById('sound-btn-text');
  soundBtn.addEventListener('click', () => {
    const active = soundEngine.toggle();
    soundBtn.classList.toggle('active', active);
    soundText.textContent = active ? 'Audio: ON' : 'Audio: OFF';
  });

  // Attach subtle hover ticks to interactive elements across portfolio
  document.querySelectorAll('a, button, .project-item, .service-item').forEach((el) => {
    el.addEventListener('mouseenter', () => soundEngine.playTick(1150));
  });
  document.querySelectorAll('[data-nav-link]').forEach((el) => {
    el.addEventListener('click', () => soundEngine.playTransition());
  });

  // --- THREE.JS 3D MUSEUM SCENE ---
  const canvas = document.getElementById('museum-3d-canvas');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03050c, 0.032);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const pointLight = new THREE.PointLight(0x00d8ff, 2.5, 30);
  pointLight.position.set(0, 6, 0);
  scene.add(pointLight);

  // Circular Plaza Floor Grid
  const polarGrid = new THREE.PolarGridHelper(18, 12, 8, 64, 0x00d8ff, 0x1e293b);
  polarGrid.position.y = -2.2;
  polarGrid.material.transparent = true;
  polarGrid.material.opacity = 0.4;
  scene.add(polarGrid);

  // Generate 3D Monolith Texture via 2D Canvas
  function createMonolithTexture(item, index) {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 768;
    const ctx = c.getContext('2d');

    // Deep obsidian card background
    const grad = ctx.createLinearGradient(0, 0, 512, 768);
    grad.addColorStop(0, '#0c1428');
    grad.addColorStop(1, '#050812');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 768);

    // Neon border
    const hexStr = `#${item.color.toString(16).padStart(6, '0')}`;
    ctx.strokeStyle = hexStr;
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, 480, 736);

    // Monolith Index Number
    ctx.fillStyle = hexStr;
    ctx.font = 'bold 26px monospace';
    ctx.fillText(`MONOLITH // 0${index + 1}`, 44, 78);

    // Category
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(item.category, 44, 125);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(item.title.slice(0, 22), 44, 210);

    // Decorative Wireframe Schematic Box inside Monolith
    ctx.strokeStyle = 'rgba(0, 216, 255, 0.28)';
    ctx.lineWidth = 2;
    ctx.strokeRect(44, 260, 424, 260);
    ctx.beginPath();
    ctx.arc(256, 390, 75, 0, Math.PI * 2);
    ctx.stroke();

    // Metrics Pill
    ctx.fillStyle = hexStr;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(item.metrics, 44, 595);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px sans-serif';
    ctx.fillText('CLICK OR PRESS ENTER TO LAUNCH', 44, 690);

    return new THREE.CanvasTexture(c);
  }

  const RADIUS = 8.5;
  const monolithMeshes = [];
  const monolithGroup = new THREE.Group();
  scene.add(monolithGroup);

  MUSEUM_MONOLITHS.forEach((item, idx) => {
    const angle = (idx / MUSEUM_MONOLITHS.length) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    const holder = new THREE.Group();
    holder.position.set(x, 0.4, z);
    holder.rotation.y = angle;

    // Monolith Slab
    const geo = new THREE.BoxGeometry(2.7, 4.0, 0.18);
    const tex = createMonolithTexture(item, idx);
    const mat = new THREE.MeshBasicMaterial({ map: tex });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { index: idx, item };
    holder.add(mesh);
    monolithMeshes.push(mesh);

    // Glowing Pedestal Ring under Monolith
    const ringGeo = new THREE.RingGeometry(1.4, 1.55, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: item.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -2.4;
    holder.add(ring);

    monolithGroup.add(holder);
  });

  let activeIdx = 0;
  let isWorldOpen = false;

  function focusMonolith(idx) {
    activeIdx = ((idx % MUSEUM_MONOLITHS.length) + MUSEUM_MONOLITHS.length) % MUSEUM_MONOLITHS.length;
    const item = MUSEUM_MONOLITHS[activeIdx];
    soundEngine.playTransition();

    document.getElementById('m-hud-cat').textContent = item.category;
    document.getElementById('m-hud-metrics').textContent = item.metrics;
    document.getElementById('m-hud-title').textContent = item.title;
    document.getElementById('m-hud-desc').textContent = item.desc;
    document.getElementById('m-launch-link').href = item.url;
    pointLight.color.setHex(item.color);
  }

  document.getElementById('m-prev-btn').addEventListener('click', () => focusMonolith(activeIdx - 1));
  document.getElementById('m-next-btn').addEventListener('click', () => focusMonolith(activeIdx + 1));

  // Toggle 3D World Mode
  const worldBtn = document.getElementById('toggle-3d-world-btn');
  const worldBtnText = document.getElementById('world-btn-text');

  function toggleWorldMode() {
    isWorldOpen = !isWorldOpen;
    document.body.classList.toggle('museum-3d-active', isWorldOpen);
    worldBtn.classList.toggle('active', isWorldOpen);
    worldBtnText.textContent = isWorldOpen ? 'Exit 3D World (ESC)' : 'Enter 3D World';
    soundEngine.playTransition();
    if (isWorldOpen) {
      focusMonolith(activeIdx);
    }
  }

  worldBtn.addEventListener('click', toggleWorldMode);

  // Keyboard navigation in 3D World
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (e.shiftKey && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleWorldMode();
    } else if (isWorldOpen) {
      if (e.key === 'ArrowRight') focusMonolith(activeIdx + 1);
      else if (e.key === 'ArrowLeft') focusMonolith(activeIdx - 1);
      else if (e.key === 'Escape') toggleWorldMode();
    }
  });

  // Raycast click on 3D Monoliths
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  canvas.addEventListener('click', (e) => {
    if (!isWorldOpen) return;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(monolithMeshes);
    if (hits.length > 0) {
      const clickedIdx = hits[0].object.userData.index;
      if (clickedIdx === activeIdx) {
        window.open(MUSEUM_MONOLITHS[activeIdx].url, '_blank');
      } else {
        focusMonolith(clickedIdx);
      }
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop for 3D Museum
  const clock = new THREE.Clock();
  function animateMuseum() {
    requestAnimationFrame(animateMuseum);
    if (!isWorldOpen) return;

    const t = clock.getElapsedTime();
    const targetAngle = (activeIdx / MUSEUM_MONOLITHS.length) * Math.PI * 2;

    // Smoothly orbit camera outside the ring looking inward at the active monolith
    const camRadius = 13.8;
    const desiredCamX = Math.sin(targetAngle) * camRadius;
    const desiredCamZ = Math.cos(targetAngle) * camRadius;

    camera.position.x += (desiredCamX - camera.position.x) * 0.06;
    camera.position.z += (desiredCamZ - camera.position.z) * 0.06;
    camera.position.y += (0.8 + Math.sin(t * 1.2) * 0.12 - camera.position.y) * 0.06;

    const lookX = Math.sin(targetAngle) * RADIUS;
    const lookZ = Math.cos(targetAngle) * RADIUS;
    camera.lookAt(lookX, 0.3, lookZ);

    // Gentle levitation on monoliths
    monolithMeshes.forEach((m, i) => {
      m.position.y = Math.sin(t * 2 + i) * 0.12;
    });

    renderer.render(scene, camera);
  }
  animateMuseum();
}

// ============================================================================
// 5. CLOUD CHAOS ENGINEERING & TRAFFIC SPIKE SIMULATOR (Inside Projects)
// ============================================================================
function initCloudChaosSimulator() {
  const projectsSection = document.querySelector('article.projects section.projects');
  const filterList = projectsSection?.querySelector('.filter-list');
  if (!projectsSection || !filterList || document.getElementById('chaos-sim-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'chaos-sim-bar';
  bar.className = 'chaos-sim-bar';
  bar.innerHTML = `
    <div class="chaos-sim-label">
      <ion-icon name="pulse-outline" style="color: #4ff0b7; font-size: 16px;"></ion-icon>
      <span id="chaos-status-text">GKE CLUSTER: 99.98% HEALTHY · 1,240 RPS</span>
    </div>
    <div class="chaos-sim-btns">
      <button type="button" class="chaos-btn" id="btn-traffic-spike">⚡ Simulate 10k RPS Load Spike</button>
      <button type="button" class="chaos-btn chaos-danger" id="btn-chaos-pod">🔥 Inject Pod Fault (Auto-Heal)</button>
    </div>
  `;
  projectsSection.insertBefore(bar, filterList);

  const statusText = document.getElementById('chaos-status-text');

  document.getElementById('btn-traffic-spike')?.addEventListener('click', () => {
    soundEngine.playTransition();
    statusText.textContent = '⚡ LOAD BALANCER SURGE: 10,400 RPS → AUTO-SCALING GKE REPLICAS (3 → 9)...';
    statusText.style.color = '#00d8ff';
    document.body.setAttribute('data-environment', 'mission-control');

    setTimeout(() => {
      statusText.textContent = '✓ TRAFFIC STABILIZED: 9 GKE PODS ACTIVE · LATENCY 14ms';
      statusText.style.color = '#4ff0b7';
      soundEngine.playChord();
    }, 2800);
  });

  document.getElementById('btn-chaos-pod')?.addEventListener('click', () => {
    soundEngine.playTick(320);
    statusText.textContent = '⚠️ POD FAILURE DETECTED IN ZONE asia-south1-a → REROUTING TRAFFIC...';
    statusText.style.color = '#ff6b6b';
    document.body.setAttribute('data-environment', 'innovation-garage');

    setTimeout(() => {
      statusText.textContent = '🔄 KUBERNETES SELF-HEALING: SPAWNING REPLACEMENT CONTAINER...';
      statusText.style.color = '#f59e0b';
    }, 1500);

    setTimeout(() => {
      statusText.textContent = '✓ GKE CLUSTER RECOVERED: ZERO DROPPED PACKETS · 100% HEALTHY';
      statusText.style.color = '#4ff0b7';
      document.body.setAttribute('data-environment', 'research-lab');
      soundEngine.playChord();
    }, 3200);
  });
}

export function initPhase7Awwwards() {
  injectPhase7Styles();
  initSpatialMuseumMode();
  initCloudChaosSimulator();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhase7Awwwards);
} else {
  initPhase7Awwwards();
}