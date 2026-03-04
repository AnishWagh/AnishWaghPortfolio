/**
 * animations.js — GSAP ScrollTrigger animations
 * 
 * ARCHITECTURE RULE: All content is visible by default (CSS).
 * GSAP only adds motion on top. If GSAP fails to load,
 * the entire site still renders correctly.
 * 
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP GUARD ──────────────────────────────────────────────────
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Portfolio] GSAP not loaded — static fallback active');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── SCROLL BEHAVIOUR CONFIG ──────────────────────────────────────
  // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
  const BIDIRECTIONAL = 'play reverse play reverse'; // Fades in and out (Experience only)
  const PLAY_ONCE     = 'play none none none';      // Reveal once, then stay
  const SCROLL_START  = 'top 95%';
  const SCROLL_END    = 'top 5%';

  // ── GUARANTEED FALLBACK ──
  setTimeout(function() {
    document.querySelectorAll('[class*="gsap-reveal"], [class*="animate"], [class*="reveal"], [class*="fade"]')
      .forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
        el.style.transition = 'none';
      });
  }, 1200);

  // ── HERO: Character stagger on page load ──
  const heroLetters = document.querySelectorAll('#hero .hero-name span');
  if (heroLetters.length) {
    gsap.from(heroLetters, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3,
      clearProps: 'all'
    });
  }

  gsap.from('#hero .hero-role', {
    x: -30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.9,
    clearProps: 'all'
  });

  gsap.from('#hero .hero-tagline', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 1.1,
    clearProps: 'all'
  });

  gsap.from('#hero .hero-cta', {
    y: 15,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    delay: 1.3,
    clearProps: 'all'
  });

  // ── SECTION LABELS (NOTE: Removed gsap-reveal from HTML, but keep JS logic for progressive enhancement if class exists) ──
  gsap.utils.toArray('.section-label.gsap-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: SCROLL_START,
        end: SCROLL_END,
        toggleActions: PLAY_ONCE
      },
      opacity: 0,
      y: 15,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  // ── SECTION TITLES ──
  gsap.utils.toArray('.section-title.gsap-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: SCROLL_START,
        end: SCROLL_END,
        toggleActions: PLAY_ONCE
      },
      x: -70,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out'
    });
  });

  // ── ABOUT SECTION ──
  const aboutText   = document.querySelector('#about .about-terminal-container');
  const aboutVisual = document.querySelector('#about .about-visual');

  if (aboutText) {
    gsap.from(aboutText, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 78%',
        end: 'top 25%',
        toggleActions: PLAY_ONCE
      },
      x: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  }

  // ── PROJECTS SECTION ──
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 30%',
        toggleActions: PLAY_ONCE
      },
      y: 70,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // ── SKILLS SECTION ──
  const skillCards = document.querySelectorAll('.skill-category-card');
  skillCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 35%',
        toggleActions: PLAY_ONCE
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out'
    });
  });

  // ── EXPERIENCE SECTION (BIDIRECTIONAL) ──
  const expEntries = document.querySelectorAll('.experience-entry');
  expEntries.forEach((entry, i) => {
    gsap.from(entry, {
      scrollTrigger: {
        trigger: entry,
        start: 'top 88%',
        end: 'top 25%',
        toggleActions: BIDIRECTIONAL
      },
      x: i % 2 === 0 ? -20 : 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── CONTACT SECTION ──
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('#contact form');

  if (contactInfo) {
    gsap.from(contactInfo, {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: PLAY_ONCE
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: PLAY_ONCE
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power2.out'
    });
  }

  // ── REFRESH ON LOAD ──
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});

// ── CHANGE 1: REFINED 3D SCROLL TILT ─────────────────────────────────────
(function() {
  function initScrollTilt() {
    var tilts = document.querySelectorAll('.scroll-tilt');
    if (!tilts.length) return;

    function updateTilts() {
      var scrollY = window.scrollY;
      var vh = window.innerHeight;

      tilts.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        
        // Progress starts when top enters viewport (progress 0)
        // and completes when bottom enters viewport (progress 1).
        // This ensures it is perfectly flat as soon as the whole element is visible.
        var progress = (vh - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));

        var rotateX = 18 * (1 - progress);
        var scale = 0.92 + (0.08 * progress);
        var translateY = 30 * (1 - progress);

        el.style.transform = 
          'rotateX(' + rotateX + 'deg) ' +
          'scale(' + scale + ') ' +
          'translateY(' + translateY + 'px)';
        el.style.opacity = Math.max(0.4, progress);
      });
    }

    window.addEventListener('scroll', updateTilts, { passive: true });
    updateTilts(); // run once on load
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTilt);
  } else {
    initScrollTilt();
  }
})();
