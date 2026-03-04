// main.js — Entry point. Initialises all modules after DOM ready.
// All heavy logic lives in dedicated module files.
// This file intentionally minimal.

document.addEventListener('DOMContentLoaded', () => {
  // Log environment for debugging (remove before production)
  console.log('[Portfolio] Scripts loaded successfully');

  // Mark page as JS-enabled for progressive enhancement
  document.documentElement.classList.add('js-enabled');

  // ── PROBLEM 2: GUARANTEED FALLBACK ─────────────────────────────
  // Make everything visible after 1.2 seconds no matter what
  setTimeout(function() {
    document.querySelectorAll('[class*="gsap-reveal"], [class*="animate"], [class*="reveal"], [class*="fade"]')
      .forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
        el.style.transition = 'none';
      });
  }, 1200);

  // ── IntersectionObserver for global visibility ──────────────────
  const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -20px 0px' };
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        entry.target.style.visibility = 'visible';
      }
    });
  }, observerOptions);

  document.querySelectorAll('[class*="gsap-reveal"], [class*="animate"], [class*="reveal"], [class*="fade"]')
    .forEach(el => visibilityObserver.observe(el));
});