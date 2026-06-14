import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
const isMobile = window.innerWidth <= 768;
renderer.setPixelRatio(isMobile ? 1 : window.devicePixelRatio);

// Base Objects
let particlesGeometry = new THREE.BufferGeometry();
let material = new THREE.PointsMaterial({ size: 0.02, color: 0x00d8ff, transparent: true, opacity: 0.8 });
let particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

let geometry = new THREE.IcosahedronGeometry(10, 1);
let wireframe = new THREE.WireframeGeometry(geometry);
let lineMaterial = new THREE.LineBasicMaterial({ color: 0x4ff0b7, transparent: true, opacity: 0.15 });
let sphere = new THREE.LineSegments(wireframe, lineMaterial);
scene.add(sphere);

camera.position.z = 3;

// Engine State
let engineConfig = { speedX: 0.02, speedY: 0.05, particleMovement: 'rotate', lineVisible: true };

const updateBackgroundEngine = (envId) => {
    switch(envId) {
        case 'mission-control':
            material.color.setHex(0x00d8ff); // Cyan
            lineMaterial.color.setHex(0x0088ff);
            engineConfig = { speedX: 0.01, speedY: 0.02, particleMovement: 'rotate', lineVisible: true };
            break;
        case 'neural-nexus':
            material.color.setHex(0xff00ff); // Magenta/Violet
            lineMaterial.color.setHex(0x8800ff);
            engineConfig = { speedX: 0.04, speedY: 0.08, particleMovement: 'pulse', lineVisible: false };
            break;
        case 'aurora-studio':
            material.color.setHex(0xdcdcdc); // Silver
            lineMaterial.color.setHex(0xaaccff); // Soft Blue
            engineConfig = { speedX: 0.005, speedY: 0.01, particleMovement: 'flow', lineVisible: true };
            break;
        case 'research-lab':
            material.color.setHex(0x00ff88); // Emerald
            lineMaterial.color.setHex(0x00ccaa);
            engineConfig = { speedX: 0.02, speedY: 0.01, particleMovement: 'rotate', lineVisible: true };
            break;
        case 'project-foundry':
            material.color.setHex(0x00ff00); // Terminal Green
            lineMaterial.color.setHex(0xffaa00); // Amber
            engineConfig = { speedX: 0.08, speedY: 0.0, particleMovement: 'linear', lineVisible: false };
            break;
        case 'innovation-garage':
            material.color.setHex(0xff8800); // Neon Orange
            lineMaterial.color.setHex(0xffff00); // Yellow
            engineConfig = { speedX: 0.05, speedY: 0.05, particleMovement: 'jitter', lineVisible: true };
            break;
        default:
            material.color.setHex(0x00d8ff);
            engineConfig = { speedX: 0.02, speedY: 0.05, particleMovement: 'rotate', lineVisible: true };
    }
    
    sphere.visible = engineConfig.lineVisible;
    const maxParticles = isMobile ? 100 : 300;
    generateParticles(envId === 'project-foundry' ? (isMobile ? 50 : 100) : maxParticles);
};

const generateParticles = (count) => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
};
generateParticles(isMobile ? 100 : 300);

// OS Environment Observer
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-environment') {
            const env = document.body.getAttribute('data-environment');
            updateBackgroundEngine(env);
        }
        if (mutation.attributeName === 'data-recruiter-mode') {
            const isRecruiter = document.body.getAttribute('data-recruiter-mode') === 'true';
            if (isRecruiter) {
                particlesMesh.visible = false;
                sphere.visible = false;
            } else {
                particlesMesh.visible = true;
                sphere.visible = engineConfig.lineVisible;
            }
        }
    });
});
observer.observe(document.body, { attributes: true });

// Mouse Interaction
let mouseX = 0; let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();
let isPaused = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

const tick = () => {
    if (!isPaused) {
        const elapsedTime = clock.getElapsedTime();

        if (engineConfig.particleMovement === 'rotate' || engineConfig.particleMovement === 'pulse') {
            particlesMesh.rotation.y = elapsedTime * engineConfig.speedY + (mouseX * 0.05);
            particlesMesh.rotation.x = elapsedTime * engineConfig.speedX + (mouseY * 0.05);
        } else if (engineConfig.particleMovement === 'linear') {
            particlesMesh.position.y = (elapsedTime * engineConfig.speedX) % 5;
        } else if (engineConfig.particleMovement === 'jitter') {
            particlesMesh.rotation.y = elapsedTime * engineConfig.speedY + (Math.random() * 0.01);
            particlesMesh.rotation.x = elapsedTime * engineConfig.speedX;
        }

        if (engineConfig.lineVisible) {
            sphere.rotation.y = elapsedTime * (engineConfig.speedY * 0.5) + (mouseX * 0.05);
            sphere.rotation.x = elapsedTime * (engineConfig.speedX * 0.5) + (mouseY * 0.05);
        }

        if(engineConfig.particleMovement === 'pulse') {
            material.size = 0.02 + Math.sin(elapsedTime * 2) * 0.01;
        } else {
            material.size = 0.02;
        }

        renderer.render(scene, camera);
    }
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
    const isMobileResize = window.innerWidth <= 768;
    renderer.setPixelRatio(isMobileResize ? 1 : window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
