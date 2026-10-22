/**
 * PHASE 5: Sidebar 3D Telemetry HUD + Interactive Project Architecture Blueprints
 * File: assets/js/architecture-blueprints-3d.js
 */

const PROJECT_BLUEPRINTS = {
  'shwasa': {
    title: 'SHWASA — COPD Respiratory Acoustic Pipeline',
    nodes: ['Respiratory Audio (.wav)', 'MFCC / Mel Spectrogram', 'CNN Feature Extractor', 'Bi-LSTM Temporal Layer', 'Severity Classification']
  },
  'ayudost': {
    title: 'AyuDost AI — RAG & NLP Healthcare Architecture',
    nodes: ['User Symptom Query', 'NLP Intent Parser', 'Vector Embeddings (RAG)', 'Ayurvedic Knowledge Base', 'Personalized Care Plan']
  },
  'mediq': {
    title: 'MediQ — Full-Stack AI Healthcare Platform',
    nodes: ['React.js Client', 'Node.js / Express API', 'Gemini AI Inference', 'Supabase Auth & RLS', 'Real-Time Patient DB']
  },
  'cloud': {
    title: 'GCP High-Availability & GKE Microservices Topology',
    nodes: ['Global HTTPS Load Balancer', 'Cloud CDN / Health Check', 'GKE Auto-Scaling Pods', 'Pub/Sub Event Bus', 'Cloud Spanner SQL']
  }
};

function injectPhase5Styles() {
  if (document.getElementById('phase5-blueprint-styles')) return;
  const style = document.createElement('style');
  style.id = 'phase5-blueprint-styles';
  style.textContent = `
    /* --- Sidebar Live Telemetry Bar --- */
    .sidebar-telemetry-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 4px auto 12px;
      padding: 5px 12px;
      border-radius: 8px;
      background: hsla(230, 45%, 10%, 0.75);
      border: 1px solid hsla(195, 100%, 68%, 0.18);
      font-family: monospace;
      font-size: 10px;
      color: var(--light-gray-70);
      width: fit-content;
    }
    .telemetry-fps {
      color: #4ff0b7;
      font-weight: 600;
    }
    .telemetry-sep {
      opacity: 0.35;
    }
    .telemetry-mode {
      color: var(--cyber-cyan);
    }

    /* --- 3D Avatar Holo-Frame --- */
    .avatar-box {
      position: relative;
      transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.35s ease !important;
    }
    .avatar-box:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 0 25px hsla(195, 100%, 60%, 0.45) !important;
    }

    /* --- Interactive 3D Pipeline Pill on Project Cards --- */
    .arch-blueprint-pill {
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 11px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--cyber-cyan);
      background: hsla(195, 100%, 50%, 0.1);
      border: 1px solid hsla(195, 100%, 68%, 0.3);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .arch-blueprint-pill:hover {
      background: var(--neon-blue);
      color: #050811;
      box-shadow: 0 0 14px hsla(195, 100%, 60%, 0.4);
    }

    /* --- 3D Architecture Flow Modal Overlay --- */
    .arch-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 10050;
      background: hsla(230, 60%, 4%, 0.85);
      backdrop-filter: blur(16px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .arch-modal-backdrop.active {
      display: flex;
    }
    .arch-modal-card {
      width: 100%;
      max-width: 820px;
      background: radial-gradient(circle at 50% 0%, hsl(225, 55%, 14%), hsl(230, 55%, 8%));
      border: 1px solid hsla(195, 100%, 68%, 0.35);
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.75);
      position: relative;
      perspective: 1000px;
    }
    .arch-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .arch-modal-title {
      font-size: 17px;
      font-weight: 600;
      color: var(--white-1);
    }
    .arch-modal-close {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: hsla(0, 0%, 100%, 0.08);
      color: var(--white-1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid hsla(0, 0%, 100%, 0.12);
    }
    .arch-pipeline-track {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 20px 10px;
      transform-style: preserve-3d;
    }
    .arch-stage-node {
      flex: 1;
      min-width: 120px;
      padding: 16px 12px;
      border-radius: 12px;
      background: hsla(230, 45%, 12%, 0.9);
      border: 1px solid hsla(195, 100%, 68%, 0.35);
      text-align: center;
      transform: rotateX(10deg) translateZ(12px);
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }
    .arch-stage-node:hover {
      transform: rotateX(0deg) translateZ(26px) translateY(-4px);
      border-color: #4ff0b7;
      box-shadow: 0 12px 28px hsla(195, 100%, 55%, 0.28);
    }
    .arch-stage-step {
      display: block;
      font-family: monospace;
      font-size: 10px;
      color: var(--cyber-cyan);
      margin-bottom: 6px;
    }
    .arch-stage-name {
      font-size: 12px;
      font-weight: 600;
      color: var(--white-1);
      line-height: 1.35;
    }
    .arch-flow-arrow {
      color: var(--neon-blue);
      font-size: 18px;
      animation: pulse-arrow 1.4s infinite ease-in-out;
    }
    @keyframes pulse-arrow {
      0%, 100% { opacity: 0.35; transform: translateX(-2px); }
      50% { opacity: 1; transform: translateX(3px); }
    }
    @media (max-width: 680px) {
      .arch-pipeline-track {
        flex-direction: column;
      }
      .arch-flow-arrow {
        transform: rotate(90deg);
      }
    }
  `;
  document.head.appendChild(style);
}

function initSidebarTelemetry() {
  const badge = document.querySelector('.open-to-work-badge');
  if (!badge || document.getElementById('sidebar-telemetry-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'sidebar-telemetry-bar';
  bar.className = 'sidebar-telemetry-bar';
  bar.innerHTML = `
    <span class="telemetry-fps" id="telemetry-fps">60 FPS</span>
    <span class="telemetry-sep">|</span>
    <span class="telemetry-mode" id="telemetry-zone">3D: WAVE</span>
  `;
  badge.insertAdjacentElement('afterend', bar);

  // Live FPS Counter
  let frames = 0;
  let lastTime = performance.now();
  const fpsEl = document.getElementById('telemetry-fps');
  const zoneEl = document.getElementById('telemetry-zone');

  function measureFPS(now) {
    frames++;
    if (now - lastTime >= 1000) {
      if (fpsEl) fpsEl.textContent = `${Math.min(60, frames)} FPS`;
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(measureFPS);
  }
  requestAnimationFrame(measureFPS);

  // Sync active 3D formation label on tab click
  const zoneMap = {
    about: '3D: WAVE',
    resume: '3D: STEPS',
    projects: '3D: PODS',
    blog: '3D: TENSOR',
    contact: '3D: RADAR'
  };
  document.querySelectorAll('[data-nav-link]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.textContent.trim().toLowerCase();
      if (zoneEl && zoneMap[page]) zoneEl.textContent = zoneMap[page];
    });
  });
}

function initProjectArchitectureBlueprints() {
  // Create Modal Backdrop
  if (!document.getElementById('arch-modal-backdrop')) {
    const modal = document.createElement('div');
    modal.id = 'arch-modal-backdrop';
    modal.className = 'arch-modal-backdrop';
    modal.innerHTML = `
      <div class="arch-modal-card">
        <div class="arch-modal-header">
          <h4 class="arch-modal-title" id="arch-modal-title">System Architecture</h4>
          <button type="button" class="arch-modal-close" id="arch-modal-close" aria-label="Close">✕</button>
        </div>
        <div class="arch-pipeline-track" id="arch-pipeline-track"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.classList.remove('active');
    document.getElementById('arch-modal-close')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  // Attach "3D Architecture" button to Flagship Project Cards
  document.querySelectorAll('.project-item').forEach((item) => {
    const titleText = (item.querySelector('.project-title')?.textContent || '').toLowerCase();
    const catText = (item.getAttribute('data-category') || '').toLowerCase();
    let key = null;

    if (titleText.includes('shwasa') || titleText.includes('copd')) key = 'shwasa';
    else if (titleText.includes('ayudost')) key = 'ayudost';
    else if (titleText.includes('mediq')) key = 'mediq';
    else if (catText === 'cloud') key = 'cloud';

    if (!key) return;

    const content = item.querySelector('.project-content');
    if (!content || content.querySelector('.arch-blueprint-pill')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'arch-blueprint-pill';
    btn.innerHTML = `<ion-icon name="git-network-outline"></ion-icon> <span>3D System Flow</span>`;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openBlueprintModal(key);
    });

    content.appendChild(btn);
  });
}

function openBlueprintModal(key) {
  const bp = PROJECT_BLUEPRINTS[key];
  const modal = document.getElementById('arch-modal-backdrop');
  const titleEl = document.getElementById('arch-modal-title');
  const trackEl = document.getElementById('arch-pipeline-track');
  if (!bp || !modal || !titleEl || !trackEl) return;

  titleEl.textContent = bp.title;
  trackEl.innerHTML = bp.nodes
    .map(
      (nodeName, idx) => `
      <div class="arch-stage-node">
        <span class="arch-stage-step">STAGE 0${idx + 1}</span>
        <span class="arch-stage-name">${nodeName}</span>
      </div>
      ${idx < bp.nodes.length - 1 ? `<span class="arch-flow-arrow">➔</span>` : ''}
    `
    )
    .join('');

  modal.classList.add('active');
}

export function initPhase5() {
  injectPhase5Styles();
  initSidebarTelemetry();
  initProjectArchitectureBlueprints();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhase5);
} else {
  initPhase5();
}