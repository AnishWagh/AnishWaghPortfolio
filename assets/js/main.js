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

  // Initialize 3D Tilt Effect
  initTiltEffect();
});

/**
 * 3D Tilt Effect for Project Cards
 * Max tilt ±12 degrees, scale 1.03, with dynamic glare
 */
function initTiltEffect() {
  const cards = document.querySelectorAll('.portrait-card[data-tilt]');
  
  cards.forEach(card => {
    const glare = card.querySelector('.card-glare');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position relative to card center
      const rotateX = ((y - centerY) / centerY) * -12; // Max ±12 deg
      const rotateY = ((x - centerX) / centerX) * 12;  // Max ±12 deg
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      
      // Shift glare opposite to mouse direction for depth perception
      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 70%)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset with smooth transition
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
      card.style.transition = 'transform 0.4s ease';
      
      // Remove transition after it completes to avoid lag on next hover
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });
  });
}