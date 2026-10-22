/**
 * EXECUTIVE PROFESSIONAL CONTROLLER (executive-mode.js)
 * Unifies all controls into a single, distraction-free Executive Bar
 * Supports: Executive Dark (Default), Executive Light, and 3D Spatial Showcase
 */

export function initExecutiveMode() {
  const savedTheme = localStorage.getItem('rk_pro_theme') || 'executive-dark';
  document.body.setAttribute('data-pro-theme', savedTheme);

  if (document.getElementById('executive-top-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'executive-top-bar';
  bar.className = 'executive-top-bar';
  bar.innerHTML = `
    <button type="button" class="exec-bar-btn" data-theme-set="executive-dark" title="Executive Dark Theme (Linear/Vercel Style)">
      <ion-icon name="moon-outline"></ion-icon>
      <span>Dark</span>
    </button>
    <button type="button" class="exec-bar-btn" data-theme-set="executive-light" title="Executive Daylight Theme (Stripe/Apple Style)">
      <ion-icon name="sunny-outline"></ion-icon>
      <span>Light</span>
    </button>
    <button type="button" class="exec-bar-btn" data-theme-set="cyber-3d" title="Full Interactive 3D Telemetry Mode">
      <ion-icon name="cube-outline"></ion-icon>
      <span>3D Lab</span>
    </button>
    <div class="exec-bar-divider"></div>
    <button type="button" class="exec-bar-btn" id="exec-3d-museum-trigger" title="Open Full-Screen 3D Project Showcase">
      <ion-icon name="Albums-outline"></ion-icon>
      <span>3D Showcase</span>
    </button>
    <button type="button" class="exec-bar-btn" id="exec-cmd-trigger" title="Open Command Palette & Recruiter JD Matcher">
      <ion-icon name="search-outline"></ion-icon>
      <span>JD Match</span>
      <span class="exec-kbd">⌘K</span>
    </button>
  `;

  document.body.appendChild(bar);

  function applyTheme(themeKey) {
    document.body.setAttribute('data-pro-theme', themeKey);
    localStorage.setItem('rk_pro_theme', themeKey);

    bar.querySelectorAll('[data-theme-set]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-set') === themeKey);
    });

    // Sync with 3D background palette
    if (themeKey === 'executive-dark') {
      document.body.setAttribute('data-environment', 'aurora-studio');
    } else if (themeKey === 'executive-light') {
      document.body.setAttribute('data-environment', 'aurora-studio');
    } else {
      document.body.setAttribute('data-environment', 'mission-control');
    }
  }

  applyTheme(savedTheme);

  bar.querySelectorAll('[data-theme-set]').forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-set')));
  });

  // Connect to Cmd+K Palette & 3D Showcase
  document.getElementById('exec-cmd-trigger')?.addEventListener('click', () => {
    document.querySelector('.cmd-k-trigger-pill')?.click();
  });

  document.getElementById('exec-3d-museum-trigger')?.addEventListener('click', () => {
    document.getElementById('toggle-3d-world-btn')?.click();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExecutiveMode);
} else {
  initExecutiveMode();
}