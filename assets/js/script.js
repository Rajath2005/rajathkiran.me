'use strict';

/**
 * Standardize Imports - ES Modules best practice
 */
import { animatePageChange } from './animations.js';
import { initTiltEffect } from './tilt-effect.js';
import { initCustomCursor } from './cursor.js';

// Element toggle function with error handling
const elementToggleFunc = (elem) => {
  if (elem && elem.classList) {
    elem.classList.toggle("active");
  } else {
    console.warn("Invalid element passed to elementToggleFunc");
  }
};

/**
 * TYPING EFFECT
 */
const roles = [
  "Cloud Engineer",
  "AI/ML Developer",
  "Full Stack Developer",
  "Cybersecurity Enthusiast",
  "Open Source Builder"
];
let roleIndex = 0;
let charIndex = 0;
const changingText = document.getElementById("changing-text");

function typeEffect() {
  if (!changingText) return;
  if (charIndex < roles[roleIndex].length) {
    changingText.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1000);
  }
}

function eraseEffect() {
  if (!changingText) return;
  if (charIndex > 0) {
    changingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}

// Start typing effect safely
document.addEventListener("DOMContentLoaded", () => {
  if (changingText) {
    setTimeout(typeEffect, 500);
  }
});

/**
 * SIDEBAR
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/**
 * TESTIMONIALS MODAL
 */
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainers = document.querySelectorAll("[data-modal-container]");

const updateBodyModalState = () => {
  const anyActive = [...modalContainers].some(container => container.classList.contains("active"));
  document.body.classList.toggle("modal-open", anyActive);
};

const openTestimonialsModal = (modal) => {
  if (!modal) return;
  modalContainers.forEach(container => {
    if (container !== modal) {
      container.classList.remove("active");
      const otherOverlay = container.querySelector("[data-overlay]");
      if (otherOverlay) otherOverlay.classList.remove("active");
    }
  });
  modal.classList.add("active");
  const overlay = modal.querySelector("[data-overlay]");
  if (overlay) overlay.classList.add("active");
  modal.scrollTop = 0;
  const modalBody = modal.querySelector(".testimonials-modal");
  if (modalBody) modalBody.scrollTop = 0;
  updateBodyModalState();
};

const closeTestimonialsModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("active");
  const overlay = modal.querySelector("[data-overlay]");
  if (overlay) overlay.classList.remove("active");
  updateBodyModalState();
};

testimonialsItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    const modalContainer = modalContainers[index];
    if (!modalContainer) return;

    const modalImg = modalContainer.querySelector("[data-modal-img]");
    const modalTitle = modalContainer.querySelector("[data-modal-title]");
    const modalText = modalContainer.querySelector("[data-modal-text]");

    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;

    openTestimonialsModal(modalContainer);
  });
});

modalContainers.forEach((modal) => {
  const closeButton = modal.querySelector("[data-modal-close-btn]");
  const overlay = modal.querySelector("[data-overlay]");

  if (closeButton) closeButton.addEventListener("click", () => closeTestimonialsModal(modal));
  if (overlay) overlay.addEventListener("click", () => closeTestimonialsModal(modal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeTestimonialsModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalContainers.forEach((modal) => {
      if (modal.classList.contains("active")) closeTestimonialsModal(modal);
    });
  }
});

/**
 * PROJECT MODAL
 */
const projectItems = document.querySelectorAll(".project-item a");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close]");
const projectOverlay = projectModalContainer ? projectModalContainer.querySelector(".overlay") : null;
const demoIframe = document.querySelector("[data-demo-iframe]");
const demoLoader = document.querySelector("[data-demo-loader]");
const demoFallback = document.querySelector("[data-demo-fallback]");
const demoLink = document.querySelector("[data-demo-link]");

const projectModalToggleFunc = function () {
  if (projectModalContainer) {
    projectModalContainer.classList.toggle("active");
    if (!projectModalContainer.classList.contains("active") && demoIframe) {
      demoIframe.src = "";
    }
  }
};

projectItems.forEach(item => {
  const projectUrl = item.getAttribute("data-project-url");
  const isEmbeddable = item.getAttribute("data-embeddable") === "true";
  
  if (projectUrl) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      
      if (isEmbeddable) {
        if (demoLoader) {
          demoLoader.style.display = "flex";
        }
        if (demoIframe) {
          demoIframe.style.display = "none"; // Hide until loaded
          demoIframe.src = projectUrl;
          demoIframe.onload = () => {
            if (demoLoader) demoLoader.style.display = "none";
            demoIframe.style.display = "block";
          };
        }
        if (demoFallback) demoFallback.style.display = "none";
      } else {
        if (demoIframe) demoIframe.style.display = "none";
        if (demoFallback) {
          demoFallback.style.display = "flex";
          if (demoLink) demoLink.href = projectUrl;
        }
      }
      
      projectModalToggleFunc();
    });
  }
});

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", projectModalToggleFunc);
if (projectOverlay) projectOverlay.addEventListener("click", projectModalToggleFunc);

/**
 * CERTIFICATES MODAL
 */
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".thumbnail").forEach((img) => {
    img.addEventListener("click", function () {
      if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = this.getAttribute("data-full");
        if (captionText) captionText.innerText = this.alt;
      }
    });
  });

  const slides = document.querySelectorAll(".experience-card");
  const dotsContainer = document.querySelector(".pagination-dots");

  if (dotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  if (slides.length > 0) showSlide(0);

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.style.display = "none");
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
});

/**
 * PORTFOLIO FILTER
 */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

filterFunc("all");
if (selectValue) selectValue.innerText = "All";

let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/**
 * CONTACT FORM
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form && formBtn) {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
});

/**
 * PAGE NAVIGATION
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const clickedLinkText = this.textContent.trim().toLowerCase();

    pages.forEach((page, index) => {
      if (clickedLinkText === page.dataset.page) {
        page.classList.add("active");
        if (navigationLinks[index]) navigationLinks[index].classList.add("active");
        window.scrollTo(0, 0);
        
        // Use a slight timeout to ensure the browser has processed the 'active' class
        // which sets display: block, before starting animations and measurements
        setTimeout(() => animatePageChange(page), 100);
      } else {
        page.classList.remove("active");
        if (navigationLinks[index]) navigationLinks[index].classList.remove("active");
      }
    });
  });
});

/**
 * CERTIFICATES TOGGLE
 */
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById('view-more-certificates');
  const hiddenCertificates = document.querySelectorAll('.certificate-hidden');
  let expanded = false;

  if (btn) {
    btn.addEventListener('click', function () {
      expanded = !expanded;
      hiddenCertificates.forEach(el => {
        el.style.display = expanded ? 'list-item' : 'none';
      });
      btn.textContent = expanded ? 'View Less Certificates' : 'View More Certificates';
    });
    hiddenCertificates.forEach(el => el.style.display = 'none');
  }
});

/**
 * SCROLL & INTERACTIVE INIT
 */
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    initTiltEffect();
    initCustomCursor();
  }

  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.cursor = 'pointer';
    scrollIndicator.style.pointerEvents = 'auto';

    scrollIndicator.addEventListener('click', () => {
      const activeArticle = document.querySelector('article.active');
      if (activeArticle) {
        const targetSection = activeArticle.querySelector('.service') ||
          activeArticle.querySelector('section:nth-of-type(2)') ||
          activeArticle.querySelector('section');

        if (targetSection) {
          const headerOffset = 50;
          const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }
    });

    let isScrollingIndicator = false;
    window.addEventListener('scroll', () => {
      if (!isScrollingIndicator) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
          } else {
            scrollIndicator.classList.remove('hidden');
          }
          isScrollingIndicator = false;
        });
        isScrollingIndicator = true;
      }
    }, { passive: true });
  }
});

/**
 * SECRET SEQUENCE - HACKER MODE (EASTER EGG)
 */
const secretSequence = 'rajath2005';
let sequenceIndex = 0;

const hackerStyles = `
  #hacker-terminal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 9999;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    display: none;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  #hacker-terminal.active {
    display: flex;
  }

  #matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.3;
  }

  .terminal-content {
    position: relative;
    z-index: 1;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-shadow: 0 0 5px #00ff00;
  }

  #terminal-output {
    white-space: pre-wrap;
    overflow-y: auto;
    margin-bottom: 20px;
    flex-grow: 1;
    scrollbar-width: none;
  }
  
  #terminal-output::-webkit-scrollbar {
    display: none;
  }

  .terminal-input-line {
    display: flex;
    align-items: center;
  }

  .prompt {
    margin-right: 10px;
    color: #00ff00;
    font-weight: bold;
  }

  #terminal-input {
    background: transparent;
    border: none;
    color: #00ff00;
    font-family: inherit;
    font-size: 1.1em;
    width: 100%;
    outline: none;
    text-shadow: 0 0 5px #00ff00;
  }

  .crt-overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 4px, 3px 100%;
    z-index: 10000;
  }

  .flicker {
    animation: hacker-flicker 0.15s infinite;
  }

  @keyframes hacker-flicker {
    0% { opacity: 0.97; }
    5% { opacity: 0.95; }
    10% { opacity: 0.9; }
    15% { opacity: 0.99; }
    20% { opacity: 0.95; }
    25% { opacity: 0.98; }
    30% { opacity: 0.95; }
    35% { opacity: 0.99; }
    40% { opacity: 0.9; }
    45% { opacity: 0.95; }
    50% { opacity: 0.98; }
    55% { opacity: 0.95; }
    60% { opacity: 0.99; }
    65% { opacity: 0.9; }
    70% { opacity: 0.95; }
    75% { opacity: 0.98; }
    80% { opacity: 0.95; }
    85% { opacity: 0.99; }
    90% { opacity: 0.9; }
    95% { opacity: 0.95; }
    100% { opacity: 0.98; }
  }

  .hacker-glitch {
    animation: hacker-glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  }

  @keyframes hacker-glitch-anim {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  .system-takeover-glitch {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00ff00;
    z-index: 10001;
    mix-blend-mode: difference;
    animation: system-takeover-anim 0.2s steps(2) infinite;
    pointer-events: none;
  }

  @keyframes system-takeover-anim {
    0% { opacity: 0.5; transform: skewX(20deg); }
    50% { opacity: 0.8; transform: skewX(-20deg); }
    100% { opacity: 0.5; transform: skewX(20deg); }
  }
`;

document.addEventListener('keydown', (e) => {
  if ((e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && e.target.id !== 'terminal-input') return;

  if (e.key.toLowerCase() === secretSequence[sequenceIndex].toLowerCase()) {
    sequenceIndex++;
    if (sequenceIndex === secretSequence.length) {
      activateHackerMode();
      sequenceIndex = 0;
    }
  } else {
    sequenceIndex = 0;
  }
});

function activateHackerMode() {
  if (document.getElementById('hacker-terminal')) return;

  if (typeof window.pauseThreeBackground === 'function') {
    window.pauseThreeBackground();
  }

  const glitch = document.createElement('div');
  glitch.className = 'system-takeover-glitch';
  document.body.appendChild(glitch);

  const style = document.createElement('style');
  style.id = 'hacker-mode-styles';
  style.innerHTML = hackerStyles;
  document.head.appendChild(style);

  setTimeout(() => {
    glitch.remove();
    const terminal = document.createElement('div');
    terminal.id = 'hacker-terminal';
    terminal.className = 'active flicker';
    terminal.innerHTML = `
      <canvas id="matrix-rain"></canvas>
      <div class="crt-overlay"></div>
      <div class="terminal-content">
        <div id="terminal-output"></div>
        <div class="terminal-input-line">
          <span class="prompt">></span>
          <input type="text" id="terminal-input" autofocus autocomplete="off">
        </div>
      </div>
    `;
    document.body.appendChild(terminal);

    const input = document.getElementById('terminal-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', handleCommand);
    }
    
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeHackerMode();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    initMatrixRain();
    bootSequence();
  }, 200);
}

function handleCommand(e) {
  if (e.key === 'Enter') {
    const input = e.target;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    
    printOutput(`> ${cmd}`, 'cmd');
    
    if (cmd === 'help') {
      printOutput('Available commands: whoami, skills, projects, contact, raj, clear, exit');
    } else if (cmd === 'whoami') {
      printOutput('Name: Rajath Kiran A');
      printOutput('Role: Full Stack Developer & AI Builder');
      printOutput('Status: Dreaming in code, living in logic.');
    } else if (cmd === 'skills') {
      printOutput('Languages: C, C++, Java, Python, JavaScript');
      printOutput('Frontend: React, Tailwind, Vanilla CSS');
      printOutput('Backend: Node.js, Express');
      printOutput('Cloud/DevOps: GKE, Docker, Kubernetes');
    } else if (cmd === 'projects') {
      printOutput('1. MediQ Health Platform - Ayurvedic healthcare with AI');
      printOutput('2. Sitexar - Freelance startup portal');
      printOutput('3. COPD Detection - Healthcare AI screening');
      printOutput('4. Smart City Guide - Java CLI application');
      printOutput('Type "github" to view all repos.');
    } else if (cmd === 'github') {
      window.open('https://github.com/Rajath2005', '_blank');
      printOutput('Redirecting to GitHub...');
    } else if (cmd === 'contact') {
      printOutput('Email: rajathajeru@gmail.com');
      printOutput('LinkedIn: linkedin.com/in/rajath-kiran');
      printOutput('Telegram: @Rajath_ajeru');
    } else if (cmd === 'raj') {
      printOutput('> scanning memory...');
      setTimeout(() => printOutput('> retrieving developer profile...'), 500);
      setTimeout(() => printOutput('> anomaly detected...'), 1000);
      setTimeout(() => printOutput('> I once debugged for 6 hours then found a missing semicolon.'), 1500);
      setTimeout(() => printOutput('> emotional damage: irreversible'), 2000);
    } else if (cmd === 'clear') {
      const output = document.getElementById('terminal-output');
      if (output) output.innerHTML = '';
    } else if (cmd === 'exit') {
      closeHackerMode();
    } else if (cmd !== '') {
      printOutput(`Command not found: ${cmd}. Type 'help' for options.`);
    }
  }
}

function printOutput(text, type = 'log') {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  
  const div = document.createElement('div');
  div.style.marginBottom = '5px';
  
  if (type === 'cmd') {
    div.textContent = text;
    div.style.color = '#fff';
    output.appendChild(div);
  } else {
    output.appendChild(div);
    let i = 0;
    const interval = setInterval(() => {
      div.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        output.scrollTop = output.scrollHeight;
      }
    }, 15);
  }
  output.scrollTop = output.scrollHeight;
}

function bootSequence() {
  const logs = [
    'initializing rajathkiran.me...',
    'loading personality module...',
    'mounting cloud services...',
    'ACCESS GRANTED',
    'Type "help" to start exploration.'
  ];
  
  logs.forEach((log, index) => {
    setTimeout(() => printOutput(log, 'log'), index * 800);
  });
}

function initMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = '0101010101010101010101010101010101010101010101010101010101010101';
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const intervalId = setInterval(draw, 33);
  canvas.setAttribute('data-interval-id', intervalId);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function closeHackerMode() {
  const terminal = document.getElementById('hacker-terminal');
  const styles = document.getElementById('hacker-mode-styles');
  const canvas = document.getElementById('matrix-rain');
  
  if (canvas) {
    const intervalId = canvas.getAttribute('data-interval-id');
    clearInterval(intervalId);
  }
  if (terminal) terminal.remove();
  if (styles) styles.remove();
  
  if (typeof window.resumeThreeBackground === 'function') {
    window.resumeThreeBackground();
  }
}

/**
 * SCROLL PROGRESS & BACK TO TOP
 */
const initScrollFeatures = () => {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  let isScrollingFeatures = false;
  window.addEventListener('scroll', () => {
    if (!isScrollingFeatures) {
      window.requestAnimationFrame(() => {
        // Progress Bar
        if (progressBar) {
          const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );
          const scrollTotal = scrollHeight - window.innerHeight;
          const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          
          let progress = 0;
          if (scrollTotal > 0) {
            progress = (scrollPosition / scrollTotal) * 100;
          }
          progressBar.style.width = `${progress}%`;
        }

        // Back to Top Button Visibility
        if (backToTopBtn) {
          if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
          } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(10px)';
          }
        }
        isScrollingFeatures = false;
      });
      isScrollingFeatures = true;
    }
  }, { passive: true });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
};

// Modules run deferred, so we can just call it immediately or on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollFeatures);
} else {
  initScrollFeatures();
}
