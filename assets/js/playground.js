/**
 * Playground Mode: Physics-based Draggable UI
 * Adds momentum and collision physics to project cards.
 */

export function initPlayground() {
  const toggleBtn = document.getElementById('playground-toggle');
  const resetBtn = document.getElementById('playground-reset');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (!toggleBtn || !resetBtn || projectItems.length === 0) return;

  let isPlaygroundMode = false;
  const cards = [];

  // Initialize card states
  projectItems.forEach((item, index) => {
    cards.push({
      element: item,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      lastX: 0,
      lastY: 0,
      isDragging: false,
      animationId: null,
      zIndex: 10
    });
  });

  const updatePosition = (card) => {
    card.element.style.transform = `translate(${card.x}px, ${card.y}px)`;
  };

  const physicsLoop = (card) => {
    if (card.isDragging) return;

    // Apply friction
    card.vx *= 0.95;
    card.vy *= 0.95;

    // Update position
    card.x += card.vx;
    card.y += card.vy;

    // Boundary Collision Detection
    const rect = card.element.getBoundingClientRect();
    const margin = 10;

    if (rect.left < margin) {
      card.vx = Math.abs(card.vx) * 0.8; // Bounce with some energy loss
      card.x += margin - rect.left;
    } else if (rect.right > window.innerWidth - margin) {
      card.vx = -Math.abs(card.vx) * 0.8;
      card.x -= rect.right - (window.innerWidth - margin);
    }

    if (rect.top < margin) {
      card.vy = Math.abs(card.vy) * 0.8;
      card.y += margin - rect.top;
    } else if (rect.bottom > window.innerHeight - margin) {
      card.vy = -Math.abs(card.vy) * 0.8;
      card.y -= rect.bottom - (window.innerHeight - margin);
    }

    updatePosition(card);

    // Stop animation if velocity is very low
    if (Math.abs(card.vx) < 0.1 && Math.abs(card.vy) < 0.1) {
      card.vx = 0;
      card.vy = 0;
      cancelAnimationFrame(card.animationId);
      card.animationId = null;
    } else {
      card.animationId = requestAnimationFrame(() => physicsLoop(card));
    }
  };

  const onPointerDown = (e, card) => {
    if (!isPlaygroundMode) return;
    
    // Only handle primary button (left click/touch)
    if (e.button !== 0) return;

    card.isDragging = true;
    card.element.classList.add('dragging');
    
    // Bring to front
    cards.forEach(c => c.element.style.zIndex = 10);
    card.element.style.zIndex = 100;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = card.x;
    const initialY = card.y;
    let hasMoved = false;

    card.lastX = e.clientX;
    card.lastY = e.clientY;
    card.vx = 0;
    card.vy = 0;

    if (card.animationId) {
      cancelAnimationFrame(card.animationId);
      card.animationId = null;
    }

    const onPointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Threshold to distinguish between click and drag
      if (!hasMoved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        hasMoved = true;
        // Start preventing defaults only once we know it's a drag
        card.element.style.pointerEvents = 'none'; 
      }

      if (hasMoved) {
        card.x = initialX + dx;
        card.y = initialY + dy;

        // Calculate velocity based on movement delta
        card.vx = moveEvent.clientX - card.lastX;
        card.vy = moveEvent.clientY - card.lastY;

        card.lastX = moveEvent.clientX;
        card.lastY = moveEvent.clientY;

        updatePosition(card);
      }
    };

    const onPointerUp = (upEvent) => {
      card.isDragging = false;
      card.element.classList.remove('dragging');
      card.element.style.pointerEvents = '';
      
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      
      if (!hasMoved) return;

      // If we moved, prevent any click events from firing on release
      upEvent.preventDefault();

      // Start physics loop on release
      if (Math.abs(card.vx) > 0.5 || Math.abs(card.vy) > 0.5) {
        card.animationId = requestAnimationFrame(() => physicsLoop(card));
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Attach listeners to all cards
  cards.forEach(card => {
    card.element.addEventListener('pointerdown', (e) => onPointerDown(e, card));
  });

  // Toggle Mode
  toggleBtn.addEventListener('click', () => {
    isPlaygroundMode = !isPlaygroundMode;
    toggleBtn.classList.toggle('active');
    
    if (isPlaygroundMode) {
      resetBtn.classList.remove('hidden');
      projectItems.forEach(item => item.classList.add('playground-active'));
    } else {
      resetBtn.classList.add('hidden');
      projectItems.forEach(item => {
        item.classList.remove('playground-active');
        item.style.transform = '';
        item.style.zIndex = '';
      });
      // Reset state
      cards.forEach(card => {
        card.x = 0;
        card.y = 0;
        card.vx = 0;
        card.vy = 0;
        if (card.animationId) cancelAnimationFrame(card.animationId);
        card.animationId = null;
      });
    }
  });

  // Reset Logic
  resetBtn.addEventListener('click', () => {
    cards.forEach(card => {
      card.vx = 0;
      card.vy = 0;
      card.x = 0;
      card.y = 0;
      card.element.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      updatePosition(card);
      
      // Clear transition after animation completes
      setTimeout(() => {
        card.element.style.transition = '';
      }, 500);

      if (card.animationId) cancelAnimationFrame(card.animationId);
      card.animationId = null;
    });
  });
}
