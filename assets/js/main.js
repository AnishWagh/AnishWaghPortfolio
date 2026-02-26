// main.js — Entry point. Initialises all modules after DOM ready.
// All heavy logic lives in dedicated module files.
// This file intentionally minimal.

document.addEventListener('DOMContentLoaded', () => {
  // Log environment for debugging (remove before production)
  console.log('[Portfolio] Scripts loaded successfully');

  // Mark page as JS-enabled for progressive enhancement
  document.documentElement.classList.add('js-enabled');
});