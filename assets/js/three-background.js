/**
 * EXECUTIVE 3D ARCHITECTURAL NETWORK BACKDROP (three-background.js)
 * Subtle, high-precision 3D connected node constellation & depth grid
 * Designed to complement content without visual clutter in both Dark & Light modes.
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

let canvas = document.getElementById('bg-canvas');
if (!canvas) {
  canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);
}

Object.assign(canvas.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '-1',
  pointerEvents: 'none'
});

const isMobile = window.innerWidth <= 768;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: !isMobile,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

const networkGroup = new THREE.Group();
scene.add(networkGroup);

// 1. Precision Architectural Nodes
const NODE_COUNT = isMobile ? 32 : 68;
const nodes = [];
const nodePositions = new Float32Array(NODE_COUNT * 3);

for (let i = 0; i < NODE_COUNT; i++) {
  const x = (Math.random() - 0.5) * 26;
  const y = (Math.random() - 0.5) * 16;
  const z = (Math.random() - 0.5) * 10 - 2;
  nodePositions[i * 3] = x;
  nodePositions[i * 3 + 1] = y;
  nodePositions[i * 3 + 2] = z;

  nodes.push({
    x,
    y,
    z,
    vx: (Math.random() - 0.5) * 0.006,
    vy: (Math.random() - 0.5) * 0.006
  });
}

const pointsGeo = new THREE.BufferGeometry();
pointsGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

const pointsMat = new THREE.PointsMaterial({
  size: 0.09,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.55
});
const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
networkGroup.add(pointsMesh);

// 2. Dynamic Connecting Filaments (Cloud / Neural Topology)
const MAX_LINES = NODE_COUNT * 3;
const linePositions = new Float32Array(MAX_LINES * 6);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

const lineMat = new THREE.LineBasicMaterial({
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.11
});
const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
networkGroup.add(linesMesh);

// 3. Smooth Camera Shift per Tab
const TAB_CAMERAS = {
  about: { x: 0, y: 0, z: 14, color: 0x38bdf8 },
  resume: { x: -1.5, y: 0.8, z: 13, color: 0x6366f1 },
  projects: { x: 1.5, y: -0.5, z: 13.5, color: 0x10b981 },
  blog: { x: -1.0, y: -0.8, z: 14, color: 0x38bdf8 },
  contact: { x: 0, y: 0.5, z: 12.5, color: 0x10b981 }
};

let targetCam = { ...TAB_CAMERAS.about };

document.querySelectorAll('[data-nav-link]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.textContent.trim().toLowerCase();
    if (TAB_CAMERAS[key]) {
      targetCam = { ...TAB_CAMERAS[key] };
      pointsMat.color.setHex(targetCam.color);
      lineMat.color.setHex(targetCam.color);
    }
  });
});

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 1.2;
});

let isPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.pauseThreeBackground = () => { isPaused = true; };
window.resumeThreeBackground = () => { isPaused = false; };

const tick = () => {
  if (!isPaused) {
    // Update node drift
    const posArr = pointsGeo.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (Math.abs(n.x) > 13) n.vx *= -1;
      if (Math.abs(n.y) > 8) n.vy *= -1;

      posArr[i * 3] = n.x;
      posArr[i * 3 + 1] = n.y;
      posArr[i * 3 + 2] = n.z;
    }
    pointsGeo.attributes.position.needsUpdate = true;

    // Connect nearby nodes with subtle architectural filaments
    let lineIdx = 0;
    const lArr = lineGeo.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4.2 && lineIdx < MAX_LINES * 6) {
          lArr[lineIdx++] = nodes[i].x;
          lArr[lineIdx++] = nodes[i].y;
          lArr[lineIdx++] = nodes[i].z;
          lArr[lineIdx++] = nodes[j].x;
          lArr[lineIdx++] = nodes[j].y;
          lArr[lineIdx++] = nodes[j].z;
        }
      }
    }
    for (let k = lineIdx; k < lArr.length; k++) lArr[k] = 0;
    lineGeo.attributes.position.needsUpdate = true;

    camera.position.x += (targetCam.x + mouseX - camera.position.x) * 0.04;
    camera.position.y += (targetCam.y - mouseY - camera.position.y) * 0.04;
    camera.position.z += (targetCam.z - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});