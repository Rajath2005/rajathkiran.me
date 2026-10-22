/**
 * PHASE 3: Interactive 3D System Architecture & Skill Graph + 3D Environment Switcher
 * File: assets/js/skill-graph-3d.js
 *
 * Features:
 * 1. Interactive 3D Force-Directed Tech Stack Topology inside Resume -> My Skills
 * 2. Raycasted Node Hover/Click Inspector HUD + Domain Filter Pills + Drag-to-Rotate
 * 3. Live Data-Packet Routing along Dependency Edges (GCP <-> GKE, Python <-> TensorFlow, etc.)
 * 4. Floating 3D Environment Theme Switcher (unlocks the 6 themes in os-intelligence.css)
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// ============================================================================
// 1. ENGINEERING STACK TOPOLOGY DATA
// ============================================================================
const STACK_NODES = [
  // Cloud & DevOps Cluster
  {
    id: 'gcp',
    label: 'Google Cloud (GCP)',
    category: 'cloud',
    level: 'Advanced · 65%',
    color: 0x00d8ff,
    pos: [-3.2, 1.8, 0.5],
    desc: 'Compute Engine, HTTP(S) Load Balancing, Cloud Spanner, Pub/Sub & Cloud Monitoring.',
    projects: ['Highly Available Web App', 'Cloud Spanner DB', 'Event-Driven Pub/Sub']
  },
  {
    id: 'gke',
    label: 'Kubernetes (GKE)',
    category: 'cloud',
    level: 'Advanced · Cloud',
    color: 0x38bdf8,
    pos: [-4.5, 0.2, 1.4],
    desc: 'Container orchestration, auto-scaling microservices, and workload health monitoring.',
    projects: ['Microservices on GKE']
  },
  {
    id: 'docker',
    label: 'Docker & DevOps',
    category: 'cloud',
    level: 'Intermediate · 50%',
    color: 0x0284c7,
    pos: [-2.8, -1.4, 1.8],
    desc: 'Containerized application builds, CI/CD pipelines, and Linux server administration.',
    projects: ['GKE Microservices', 'Code Review Env']
  },

  // AI / ML Cluster
  {
    id: 'python',
    label: 'Python',
    category: 'ai',
    level: 'Advanced · 60%',
    color: 0xa855f7,
    pos: [0.0, 2.3, -0.5],
    desc: 'Primary language for deep learning, acoustic signal processing, and backend AI APIs.',
    projects: ['SHWASA (COPD Detection)', 'AyuDost AI', 'Code Review Env']
  },
  {
    id: 'tensorflow',
    label: 'TensorFlow & PyTorch',
    category: 'ai',
    level: 'Advanced · 70%',
    color: 0xc084fc,
    pos: [1.8, 1.5, 1.2],
    desc: 'CNN and CNN-LSTM architectures for respiratory audio classification and medical AI.',
    projects: ['SHWASA — COPD Detection', 'ML Lab']
  },
  {
    id: 'nlp',
    label: 'NLP & RAG Systems',
    category: 'ai',
    level: 'Advanced · AI/ML',
    color: 0xe879f9,
    pos: [0.8, 0.2, 2.2],
    desc: 'Retrieval-Augmented Generation, LLM agent benchmarks, and Ayurvedic health chatbots.',
    projects: ['AyuDost AI', 'MediQ Health Platform', 'Code Review Env']
  },

  // Full-Stack & UI/UX Cluster
  {
    id: 'react',
    label: 'React.js & Frontend',
    category: 'fullstack',
    level: 'Advanced · 75%',
    color: 0x4ff0b7,
    pos: [3.4, 0.8, -0.4],
    desc: 'Component architecture, interactive dashboards, and high-performance web interfaces.',
    projects: ['MediQ Health Platform', 'React Lab', 'Sitexar']
  },
  {
    id: 'nodejs',
    label: 'Node.js & Express',
    category: 'fullstack',
    level: 'Intermediate · 55%',
    color: 0x10b981,
    pos: [3.8, -1.1, 0.8],
    desc: 'RESTful API design, real-time backend services, and serverless functions.',
    projects: ['MediQ', 'AyuDost AI']
  },
  {
    id: 'supabase',
    label: 'Supabase & SQL',
    category: 'fullstack',
    level: 'Intermediate · DB',
    color: 0x34d399,
    pos: [1.9, -2.0, -0.8],
    desc: 'PostgreSQL schema design, authentication, and real-time cloud persistence.',
    projects: ['MediQ Health Platform', 'Cloud Spanner']
  },
  {
    id: 'uiux',
    label: 'UI/UX & Figma',
    category: 'fullstack',
    level: 'Advanced · 75%',
    color: 0xf59e0b,
    pos: [2.6, 2.2, -1.8],
    desc: 'Design systems, high-fidelity wireframing, and interactive prototyping.',
    projects: ['IEEE Web Design', 'Dictionary App UI', 'Fundo App UI']
  },

  // Core CS & Systems Cluster
  {
    id: 'cpp_java',
    label: 'C, C++ & Java (DSA)',
    category: 'core',
    level: 'Intermediate · 60%',
    color: 0xf97316,
    pos: [-1.2, -2.1, -1.4],
    desc: 'Data Structures, Algorithms (170+ LeetCode, 2x VTU Rank #1 on Code360), OOP & CLI tools.',
    projects: ['Smart City Guide (Java CLI)', 'Placement Prep']
  },
  {
    id: 'security_os',
    label: 'Cybersecurity & OS',
    category: 'core',
    level: 'Intermediate · 50%',
    color: 0x38bdf8,
    pos: [-3.2, -0.4, -1.8],
    desc: 'Linux kernel fundamentals, memory management, and network security principles.',
    projects: ['Memory Management Blog', 'Linux Certifications']
  }
];

// Directed architecture edges between skills
const STACK_EDGES = [
  ['gcp', 'gke'],
  ['gke', 'docker'],
  ['gcp', 'docker'],
  ['gcp', 'python'],
  ['gcp', 'supabase'],
  ['python', 'tensorflow'],
  ['python', 'nlp'],
  ['tensorflow', 'nlp'],
  ['nlp', 'react'],
  ['react', 'nodejs'],
  ['nodejs', 'supabase'],
  ['react', 'uiux'],
  ['python', 'nodejs'],
  ['cpp_java', 'python'],
  ['security_os', 'docker'],
  ['security_os', 'gcp']
];

// ============================================================================
// 2. INJECT CSS STYLES
// ============================================================================
function injectPhase3Styles() {
  if (document.getElementById('phase3-3d-styles')) return;
  const style = document.createElement('style');
  style.id = 'phase3-3d-styles';
  style.textContent = `
    /* --- Skill Section Header & View Toggle --- */
    .skill-header-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }
    .skill-header-row .skills-title {
      margin-bottom: 0 !important;
    }
    .skill-view-switcher {
      display: inline-flex;
      background: hsla(230, 45%, 10%, 0.85);
      border: 1px solid hsla(195, 100%, 68%, 0.25);
      border-radius: 10px;
      padding: 3px;
      gap: 4px;
    }
    .skill-view-btn {
      padding: 6px 12px;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 500;
      color: var(--light-gray-70);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .skill-view-btn.active {
      background: linear-gradient(135deg, hsla(195, 100%, 60%, 0.22), hsla(265, 90%, 60%, 0.22));
      color: var(--white-1);
      border: 1px solid hsla(195, 100%, 68%, 0.45);
      box-shadow: 0 0 12px hsla(195, 100%, 60%, 0.2);
    }

    /* --- 3D Skill Graph Container --- */
    .skill-graph-3d-wrapper {
      position: relative;
      width: 100%;
      height: 460px;
      border-radius: 16px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 35%, hsla(225, 60%, 14%, 0.9), hsla(230, 55%, 7%, 0.96));
      border: 1px solid hsla(195, 100%, 68%, 0.22);
      box-shadow: var(--shadow-3);
      margin-bottom: 20px;
      user-select: none;
    }
    .skill-graph-canvas {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    .skill-graph-canvas:active {
      cursor: grabbing;
    }

    /* --- Top Filter Bar inside 3D Graph --- */
    .skill-graph-filters {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 4;
      pointer-events: none;
    }
    .skill-filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      pointer-events: auto;
    }
    .skill-domain-pill {
      padding: 5px 11px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
      background: hsla(230, 40%, 12%, 0.8);
      backdrop-filter: blur(8px);
      color: var(--light-gray-70);
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .skill-domain-pill:hover,
    .skill-domain-pill.active {
      color: var(--white-1);
      border-color: var(--neon-blue);
      background: hsla(195, 100%, 55%, 0.18);
      box-shadow: 0 0 10px hsla(195, 100%, 60%, 0.25);
    }
    .skill-graph-hint {
      font-size: 11px;
      color: hsla(0, 0%, 85%, 0.55);
      background: hsla(230, 40%, 10%, 0.7);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid hsla(0, 0%, 100%, 0.06);
    }

    /* --- Floating 3D Node Labels --- */
    .skill-labels-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    .skill-node-label {
      position: absolute;
      transform: translate(-50%, -140%);
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      white-space: nowrap;
      color: var(--white-2);
      background: hsla(230, 50%, 10%, 0.82);
      border: 1px solid hsla(195, 100%, 70%, 0.28);
      backdrop-filter: blur(4px);
      transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      pointer-events: auto;
      cursor: pointer;
    }
    .skill-node-label.highlighted {
      border-color: var(--cyber-cyan);
      background: hsla(195, 100%, 20%, 0.9);
      color: #fff;
      transform: translate(-50%, -155%) scale(1.08);
      z-index: 3;
      box-shadow: 0 4px 14px hsla(195, 100%, 55%, 0.35);
    }
    .skill-node-label.dimmed {
      opacity: 0.2;
    }

    /* --- Bottom Node Inspector HUD --- */
    .skill-inspector-hud {
      position: absolute;
      bottom: 14px;
      left: 14px;
      right: 14px;
      background: hsla(230, 45%, 10%, 0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid hsla(195, 100%, 68%, 0.28);
      border-left: 3px solid var(--neon-blue);
      border-radius: 12px;
      padding: 12px 16px;
      z-index: 4;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      transition: border-color 0.25s ease;
    }
    .inspector-main {
      flex: 1;
      min-width: 220px;
    }
    .inspector-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .inspector-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--white-1);
    }
    .inspector-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      background: hsla(195, 100%, 60%, 0.15);
      color: var(--cyber-cyan);
      border: 1px solid hsla(195, 100%, 60%, 0.3);
    }
    .inspector-desc {
      font-size: 12px;
      color: var(--light-gray-70);
      line-height: 1.4;
    }
    .inspector-projects {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .inspector-proj-chip {
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 6px;
      background: hsla(0, 0%, 100%, 0.06);
      color: var(--light-gray);
      border: 1px solid hsla(0, 0%, 100%, 0.12);
    }

    /* --- Floating 3D Environment Matrix Switcher (Top-Right Pill) --- */
    .env-matrix-switcher {
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 9998;
      display: flex;
      align-items: center;
      gap: 6px;
      background: hsla(230, 45%, 10%, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid hsla(195, 100%, 68%, 0.28);
      border-radius: 999px;
      padding: 5px 10px;
      box-shadow: 0 8px 28px hsla(220, 60%, 5%, 0.6);
      transition: border-color 0.25s ease, transform 0.2s ease;
    }
    .env-matrix-switcher:hover {
      border-color: var(--neon-blue);
    }
    .env-swatch-btn {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      position: relative;
    }
    .env-swatch-btn:hover {
      transform: scale(1.22);
    }
    .env-swatch-btn.active {
      border-color: #fff;
      transform: scale(1.18);
      box-shadow: 0 0 10px currentColor;
    }
    .env-matrix-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--light-gray-70);
      margin-right: 4px;
      padding-left: 4px;
    }
    @media (max-width: 640px) {
      .skill-graph-3d-wrapper {
        height: 390px;
      }
      .env-matrix-label {
        display: none;
      }
      .env-matrix-switcher {
        top: 12px;
        right: 12px;
        padding: 4px 8px;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// 3. BUILD & MOUNT 3D SKILL TOPOLOGY GRAPH
// ============================================================================
export function initSkillGraph3D() {
  injectPhase3Styles();
  initEnvironmentMatrixSwitcher();

  const skillSection = document.querySelector('article.resume section.skill');
  if (!skillSection || document.getElementById('skill-graph-3d-root')) return;

  const titleEl = skillSection.querySelector('.skills-title');
  const barsListEl = skillSection.querySelector('.skills-list');
  if (!titleEl || !barsListEl) return;

  // Wrap title in flex header with View Switcher (3D Graph vs Metric Bars)
  const headerRow = document.createElement('div');
  headerRow.className = 'skill-header-row';
  titleEl.parentNode.insertBefore(headerRow, titleEl);
  headerRow.appendChild(titleEl);

  const switcher = document.createElement('div');
  switcher.className = 'skill-view-switcher';
  switcher.innerHTML = `
    <button type="button" class="skill-view-btn active" data-view="3d">
      <ion-icon name="cube-outline"></ion-icon>
      <span>3D Architecture</span>
    </button>
    <button type="button" class="skill-view-btn" data-view="bars">
      <ion-icon name="stats-chart-outline"></ion-icon>
      <span>Metric Bars</span>
    </button>
  `;
  headerRow.appendChild(switcher);

  // Create 3D Graph DOM Container
  const graphWrapper = document.createElement('div');
  graphWrapper.id = 'skill-graph-3d-root';
  graphWrapper.className = 'skill-graph-3d-wrapper';
  graphWrapper.innerHTML = `
    <div class="skill-graph-filters">
      <div class="skill-filter-pills">
        <button type="button" class="skill-domain-pill active" data-domain="all">All Systems</button>
        <button type="button" class="skill-domain-pill" data-domain="cloud">Cloud & GKE</button>
        <button type="button" class="skill-domain-pill" data-domain="ai">AI & ML</button>
        <button type="button" class="skill-domain-pill" data-domain="fullstack">Full-Stack & UI</button>
        <button type="button" class="skill-domain-pill" data-domain="core">Core CS</button>
      </div>
      <span class="skill-graph-hint">Drag to rotate · Click node to inspect</span>
    </div>
    <div class="skill-labels-layer" id="skill-labels-layer"></div>
    <canvas class="skill-graph-canvas" id="skill-graph-canvas"></canvas>
    <div class="skill-inspector-hud" id="skill-inspector-hud">
      <div class="inspector-main">
        <div class="inspector-title-row">
          <span class="inspector-title" id="insp-title">Google Cloud (GCP)</span>
          <span class="inspector-badge" id="insp-badge">Advanced · 65%</span>
        </div>
        <p class="inspector-desc" id="insp-desc">
          Compute Engine, HTTP(S) Load Balancing, Cloud Spanner, Pub/Sub & Cloud Monitoring.
        </p>
      </div>
      <div class="inspector-projects" id="insp-projects">
        <span class="inspector-proj-chip">Highly Available Web App</span>
        <span class="inspector-proj-chip">Cloud Spanner DB</span>
        <span class="inspector-proj-chip">Event-Driven Pub/Sub</span>
      </div>
    </div>
  `;

  skillSection.insertBefore(graphWrapper, barsListEl);

  // Toggle between 3D View and Classic Progress Bars
  switcher.querySelectorAll('.skill-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switcher.querySelectorAll('.skill-view-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-view');
      if (mode === '3d') {
        graphWrapper.style.display = 'block';
        barsListEl.style.display = 'none';
        resizeGraph();
      } else {
        graphWrapper.style.display = 'none';
        barsListEl.style.display = 'block';
      }
    });
  });

  // Default: Show 3D Graph, keep Metric Bars accessible via toggle
  barsListEl.style.display = 'none';

  // --- THREE.JS SCENE SETUP ---
  const canvas = document.getElementById('skill-graph-canvas');
  const labelsLayer = document.getElementById('skill-labels-layer');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.6, 9.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0x00d8ff, 1.5);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);

  const graphGroup = new THREE.Group();
  scene.add(graphGroup);

  // Subtle Inner Reference Grid Ring
  const polarGrid = new THREE.PolarGridHelper(5.2, 8, 4, 48, 0x1e3a8a, 0x1e293b);
  polarGrid.position.y = -2.6;
  polarGrid.material.transparent = true;
  polarGrid.material.opacity = 0.35;
  graphGroup.add(polarGrid);

  // Build Node Meshes & Floating HTML Labels
  const nodeMap = new Map();
  const interactiveMeshes = [];

  STACK_NODES.forEach((node) => {
    const group = new THREE.Group();
    group.position.set(...node.pos);

    // Core Architectural Polyhedron
    const geo =
      node.category === 'cloud'
        ? new THREE.OctahedronGeometry(0.36, 0)
        : node.category === 'ai'
        ? new THREE.IcosahedronGeometry(0.36, 1)
        : node.category === 'fullstack'
        ? new THREE.BoxGeometry(0.48, 0.48, 0.48)
        : new THREE.DodecahedronGeometry(0.34, 0);

    const mat = new THREE.MeshStandardMaterial({
      color: node.color,
      emissive: node.color,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.8
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { nodeData: node };
    group.add(mesh);
    interactiveMeshes.push(mesh);

    // Outer Wireframe Shell
    const shellGeo = new THREE.EdgesGeometry(geo);
    const shellMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35
    });
    const shell = new THREE.LineSegments(shellGeo, shellMat);
    shell.scale.setScalar(1.32);
    group.add(shell);

    graphGroup.add(group);

    // Create Floating HTML Label
    const labelEl = document.createElement('div');
    labelEl.className = 'skill-node-label';
    labelEl.textContent = node.label;
    labelEl.addEventListener('click', () => selectNode(node.id));
    labelsLayer.appendChild(labelEl);

    nodeMap.set(node.id, {
      data: node,
      group,
      mesh,
      mat,
      shell,
      labelEl,
      basePos: new THREE.Vector3(...node.pos)
    });
  });

  // Build Dependency Edges & Animated Data Pulses
  const edgeObjects = [];
  const pulseGeo = new THREE.SphereGeometry(0.07, 8, 8);

  STACK_EDGES.forEach(([sourceId, targetId], idx) => {
    const src = nodeMap.get(sourceId);
    const dst = nodeMap.get(targetId);
    if (!src || !dst) return;

    const lineGeo = new THREE.BufferGeometry().setFromPoints([src.basePos, dst.basePos]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25
    });
    const line = new THREE.Line(lineGeo, lineMat);
    graphGroup.add(line);

    // Data Packet Sphere traveling along the dependency link
    const pulseMat = new THREE.MeshBasicMaterial({
      color: src.data.color,
      transparent: true,
      opacity: 0.95
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    graphGroup.add(pulseMesh);

    edgeObjects.push({
      sourceId,
      targetId,
      src,
      dst,
      line,
      lineMat,
      pulseMesh,
      progress: (idx / STACK_EDGES.length) % 1,
      speed: 0.004 + (idx % 3) * 0.0015
    });
  });

  // --- INSPECTOR HUD SELECTION LOGIC ---
  let selectedNodeId = 'gcp';
  let activeDomain = 'all';

  function selectNode(nodeId) {
    const entry = nodeMap.get(nodeId);
    if (!entry) return;
    selectedNodeId = nodeId;

    const { data } = entry;
    document.getElementById('insp-title').textContent = data.label;
    document.getElementById('insp-badge').textContent = data.level;
    document.getElementById('insp-desc').textContent = data.desc;

    const projContainer = document.getElementById('insp-projects');
    projContainer.innerHTML = data.projects
      .map((p) => `<span class="inspector-proj-chip">${p}</span>`)
      .join('');

    const hud = document.getElementById('skill-inspector-hud');
    hud.style.borderLeftColor = `#${data.color.toString(16).padStart(6, '0')}`;

    // Highlight connected nodes & edges
    const connectedIds = new Set([nodeId]);
    edgeObjects.forEach((edge) => {
      const isConnected = edge.sourceId === nodeId || edge.targetId === nodeId;
      if (isConnected) {
        connectedIds.add(edge.sourceId);
        connectedIds.add(edge.targetId);
      }
      edge.lineMat.opacity = isConnected ? 0.75 : 0.1;
      edge.lineMat.color.setHex(isConnected ? data.color : 0x38bdf8);
    });

    nodeMap.forEach((n, id) => {
      const isTarget = id === nodeId;
      const isNeighbor = connectedIds.has(id);
      n.labelEl.classList.toggle('highlighted', isTarget);
      n.labelEl.classList.toggle('dimmed', !isNeighbor && activeDomain === 'all');
      n.mat.emissiveIntensity = isTarget ? 0.95 : isNeighbor ? 0.5 : 0.18;
      n.group.scale.setScalar(isTarget ? 1.35 : 1.0);
    });
  }

  // Domain Filter Pills
  graphWrapper.querySelectorAll('.skill-domain-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      graphWrapper.querySelectorAll('.skill-domain-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeDomain = pill.getAttribute('data-domain');

      nodeMap.forEach((n) => {
        const match = activeDomain === 'all' || n.data.category === activeDomain;
        n.mat.opacity = match ? 1 : 0.2;
        n.mat.transparent = true;
        n.labelEl.classList.toggle('dimmed', !match);
      });

      // Auto-select first node in that domain
      const firstMatch = STACK_NODES.find(
        (n) => activeDomain === 'all' || n.category === activeDomain
      );
      if (firstMatch) selectNode(firstMatch.id);
    });
  });

  // --- DRAG-TO-ROTATE & RAYCAST CLICK ---
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let targetRotY = 0.35;
  let targetRotX = 0.15;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + dy * 0.006));
      prevX = e.clientX;
      prevY = e.clientY;
    }
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactiveMeshes);
    if (hits.length > 0) {
      const hitNode = hits[0].object.userData.nodeData;
      if (hitNode) selectNode(hitNode.id);
    }
  });

  // Resize Handler
  function resizeGraph() {
    const w = graphWrapper.clientWidth || 680;
    const h = graphWrapper.clientHeight || 460;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', resizeGraph);
  // Also resize when Resume tab is clicked
  document.querySelectorAll('[data-nav-link]').forEach((navBtn) => {
    navBtn.addEventListener('click', () => {
      if (navBtn.textContent.trim().toLowerCase() === 'resume') {
        setTimeout(resizeGraph, 120);
      }
    });
  });

  setTimeout(() => {
    resizeGraph();
    selectNode('gcp');
  }, 150);

  // --- RENDER LOOP ---
  const clock = new THREE.Clock();
  const projVec = new THREE.Vector3();

  function animateGraph() {
    requestAnimationFrame(animateGraph);

    // Only render when Resume article is active & 3D wrapper is visible
    const resumeArticle = document.querySelector('article.resume');
    if (!resumeArticle || !resumeArticle.classList.contains('active') || graphWrapper.style.display === 'none') {
      return;
    }

    const t = clock.getElapsedTime();

    if (!isDragging) {
      targetRotY += 0.0022;
    }

    graphGroup.rotation.y += (targetRotY - graphGroup.rotation.y) * 0.08;
    graphGroup.rotation.x += (targetRotX - graphGroup.rotation.x) * 0.08;

    const canvasW = canvas.clientWidth;
    const canvasH = canvas.clientHeight;

    // Update Nodes & 2D Projected HTML Labels
    nodeMap.forEach((n) => {
      n.mesh.rotation.y = t * 0.6;
      n.mesh.rotation.x = t * 0.4;
      n.shell.rotation.y = -t * 0.4;

      projVec.copy(n.group.position);
      projVec.applyMatrix4(graphGroup.matrixWorld);
      projVec.project(camera);

      const x = (projVec.x * 0.5 + 0.5) * canvasW;
      const y = (-(projVec.y * 0.5) + 0.5) * canvasH;

      n.labelEl.style.left = `${x}px`;
      n.labelEl.style.top = `${y}px`;
    });

    // Animate Data Packets along Dependency Edges
    edgeObjects.forEach((edge) => {
      edge.progress = (edge.progress + edge.speed) % 1;
      edge.pulseMesh.position.lerpVectors(
        edge.src.basePos,
        edge.dst.basePos,
        edge.progress
      );
    });

    renderer.render(scene, camera);
  }

  animateGraph();
}

// ============================================================================
// 4. FLOATING 3D ENVIRONMENT MATRIX SWITCHER
// ============================================================================
const ENVIRONMENTS = [
  { id: 'mission-control', name: 'Mission Control (Cloud)', color: '#00d8ff' },
  { id: 'neural-nexus', name: 'Neural Nexus (AI)', color: '#a855f7' },
  { id: 'research-lab', name: 'Research Lab (Bio/Medical)', color: '#10b981' },
  { id: 'project-foundry', name: 'Project Foundry (Terminal)', color: '#22c55e' },
  { id: 'aurora-studio', name: 'Aurora Studio (Design)', color: '#94a3b8' },
  { id: 'innovation-garage', name: 'Innovation Garage (Startup)', color: '#f97316' }
];

function initEnvironmentMatrixSwitcher() {
  if (document.getElementById('env-matrix-switcher')) return;

  const bar = document.createElement('div');
  bar.id = 'env-matrix-switcher';
  bar.className = 'env-matrix-switcher';
  bar.setAttribute('aria-label', '3D Environment Theme Switcher');

  const currentEnv = document.body.getAttribute('data-environment') || 'mission-control';
  document.body.setAttribute('data-environment', currentEnv);

  bar.innerHTML = `
    <span class="env-matrix-label">3D Matrix</span>
    ${ENVIRONMENTS.map(
      (env) => `
      <button
        type="button"
        class="env-swatch-btn ${env.id === currentEnv ? 'active' : ''}"
        data-env-id="${env.id}"
        title="${env.name} (Shift+E)"
        style="background: ${env.color}; color:${env.color};"
        aria-label="${env.name}"
      ></button>
    `
    ).join('')}
  `;

  document.body.appendChild(bar);

  const setEnv = (envId) => {
    document.body.setAttribute('data-environment', envId);
    bar.querySelectorAll('.env-swatch-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-env-id') === envId);
    });
  };

  bar.querySelectorAll('.env-swatch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setEnv(btn.getAttribute('data-env-id'));
    });
  });

  // Keyboard shortcut: Shift + E to cycle 3D Environments
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.shiftKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      const activeId = document.body.getAttribute('data-environment') || 'mission-control';
      const idx = ENVIRONMENTS.findIndex((item) => item.id === activeId);
      const next = ENVIRONMENTS[(idx + 1) % ENVIRONMENTS.length];
      setEnv(next.id);
    }
  });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillGraph3D);
} else {
  initSkillGraph3D();
}