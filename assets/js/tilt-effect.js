/**
 * TRUE 3D SPATIAL CARDS & HOLOGRAPHIC GLARE ENGINE (tilt-effect.js)
 * Upgrades flat 2D cards into preserve-3d multi-plane spatial cards
 * with cursor-tracked specular spotlight & Z-axis child elevation.
 */

export const initTiltEffect = () => {
  // Inject 3D Spatial & Glare CSS dynamically so it works with style.min.css immediately
  if (!document.getElementById('spatial-3d-card-styles')) {
    const style = document.createElement('style');
    style.id = 'spatial-3d-card-styles';
    style.textContent = `
      .spatial-3d-card {
        transform-style: preserve-3d !important;
        will-change: transform;
        position: relative;
      }
      .spatial-glare-layer {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 5;
        opacity: 0;
        transition: opacity 0.35s ease;
        background: radial-gradient(
          380px circle at var(--glare-x, 50%) var(--glare-y, 50%),
          hsla(195, 100%, 70%, 0.16),
          hsla(265, 90%, 65%, 0.06) 40%,
          transparent 70%
        );
        mix-blend-mode: screen;
      }
      .spatial-3d-card:hover .spatial-glare-layer {
        opacity: 1;
      }
      /* Multi-layer Z-depth pop for inner elements */
      .spatial-3d-card .service-icon-box,
      .spatial-3d-card .testimonials-avatar-box,
      .spatial-3d-card .project-overlay ion-icon,
      .spatial-3d-card .coding-profile-link ion-icon {
        transform: translateZ(28px);
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .spatial-3d-card .service-item-title,
      .spatial-3d-card .project-title,
      .spatial-3d-card .timeline-item-title {
        transform: translateZ(18px);
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      }
    `;
    document.head.appendChild(style);
  }

  const cards = document.querySelectorAll(
    '.service-item, .content-card, .coding-profile-item, .project-item, .timeline-content, .certificate-item'
  );

  cards.forEach((card) => {
    card.classList.add('spatial-3d-card');

    // Attach holographic glare overlay if not already present
    if (!card.querySelector('.spatial-glare-layer')) {
      const glare = document.createElement('div');
      glare.className = 'spatial-glare-layer';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', handleSpatialHover);
    card.addEventListener('mouseleave', resetSpatialStyles);
  });
};

function handleSpatialHover(e) {
  const card = this;

  requestAnimationFrame(() => {
    const rect = card.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const pctX = relX / rect.width;
    const pctY = relY / rect.height;

    // Crisp 6-degree 3D architectural tilt
    const tiltX = (0.5 - pctY) * 6.5;
    const tiltY = (pctX - 0.5) * 6.5;

    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(4px)`;
    card.style.setProperty('--glare-x', `${relX}px`);
    card.style.setProperty('--glare-y', `${relY}px`);
  });
}

function resetSpatialStyles() {
  this.style.transition = 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)';
  this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  setTimeout(() => {
    this.style.transition = '';
  }, 450);
}