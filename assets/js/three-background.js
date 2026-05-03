import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);

// Enforce styles via JS as a safeguard
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 300; // Optimized for performance

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread particles
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00d8ff, // Cyan/Blue to match theme (Cyber Cyan)
    transparent: true,
    opacity: 0.8,
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Connecting Lines (Optional, can be heavy)
// For better performance, we'll stick to particles or use a shader if needed. 
// Let's add a subtle geometric shape instead of just random particles.

const geometry = new THREE.IcosahedronGeometry(10, 1);
const wireframe = new THREE.WireframeGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4ff0b7, // Cyan/Greenish
    transparent: true,
    opacity: 0.15
});
const sphere = new THREE.LineSegments(wireframe, lineMaterial);
scene.add(sphere);


camera.position.z = 3;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();
let isPaused = false;

const tick = () => {
    if (isPaused) {
        window.requestAnimationFrame(tick);
        return;
    }
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Rotate sphere
    sphere.rotation.y = elapsedTime * 0.03;
    sphere.rotation.x = elapsedTime * 0.03;

    // Mouse parallax
    particlesMesh.rotation.y += mouseX * 0.05;
    particlesMesh.rotation.x += mouseY * 0.05;

    sphere.rotation.y += mouseX * 0.05;
    sphere.rotation.x += mouseY * 0.05;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

// Expose pause/resume to window for the hacker mode takeover
window.pauseThreeBackground = () => { isPaused = true; };
window.resumeThreeBackground = () => { isPaused = false; };

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
