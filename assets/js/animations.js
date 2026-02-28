/**
 * animations.js — GSAP ScrollTrigger animations
 * 
 * ARCHITECTURE RULE: All content is visible by default (CSS).
 * GSAP only adds motion on top. If GSAP fails to load,
 * the entire site still renders correctly.
 * 
 * Scroll behaviour: bidirectional — elements reveal scrolling
 * down AND hide again scrolling back up (toggleActions below).
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP GUARD ──────────────────────────────────────────────────
  // If GSAP or ScrollTrigger failed to load (ad blocker, CDN down,
  // offline) — do nothing. CSS ensures content is already visible.
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Portfolio] GSAP not loaded — static fallback active');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── SCROLL BEHAVIOUR CONFIG ──────────────────────────────────────
  // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
  // "play reverse play reverse" = bidirectional reveal/hide
  const BIDIRECTIONAL = 'play reverse play reverse';
  const SCROLL_START  = 'top 85%';
  const SCROLL_END    = 'top 20%';

  // ── HERO: Character stagger on page load (not scroll-triggered) ──
  const heroLetters = document.querySelectorAll('#hero .hero-name span');
  if (heroLetters.length) {
    gsap.from(heroLetters, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3,
      clearProps: 'all'  // clean up inline styles after animation
    });
  }

  gsap.from('#hero .hero-role', {
    x: -50,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.9,
    clearProps: 'all'
  });

  gsap.from('#hero .hero-tagline', {
    y: 25,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 1.1,
    clearProps: 'all'
  });

  gsap.from('#hero .hero-cta', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    delay: 1.3,
    clearProps: 'all'
  });

  // ── SECTION LABELS ───────────────────────────────────────────────
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: SCROLL_START,
        end: SCROLL_END,
        toggleActions: BIDIRECTIONAL
      },
      opacity: 0,
      y: 15,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  // ── SECTION TITLES ───────────────────────────────────────────────
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: SCROLL_START,
        end: SCROLL_END,
        toggleActions: BIDIRECTIONAL
      },
      x: -70,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out'
    });
  });

  // ── ABOUT SECTION ────────────────────────────────────────────────
  const aboutText   = document.querySelector('#about .about-text');
  const aboutVisual = document.querySelector('#about .about-visual');

  if (aboutText) {
    gsap.from(aboutText, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 78%',
        end: 'top 25%',
        toggleActions: BIDIRECTIONAL
      },
      x: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  }

  if (aboutVisual) {
    gsap.from(aboutVisual, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 78%',
        end: 'top 25%',
        toggleActions: BIDIRECTIONAL
      },
      x: 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.15
    });
  }

  // ── PROJECTS SECTION ─────────────────────────────────────────────
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 30%',
        toggleActions: BIDIRECTIONAL
      },
      y: 70,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // ── SKILLS SECTION ───────────────────────────────────────────────
  const skillCards = document.querySelectorAll('.skill-category-card');
  skillCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 35%',
        toggleActions: BIDIRECTIONAL
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out'
    });
  });

  // ── EXPERIENCE SECTION ───────────────────────────────────────────
  const expEntries = document.querySelectorAll('.experience-entry');
  expEntries.forEach((entry, i) => {
    gsap.from(entry, {
      scrollTrigger: {
        trigger: entry,
        start: 'top 88%',
        end: 'top 25%',
        toggleActions: BIDIRECTIONAL
      },
      x: i % 2 === 0 ? -55 : 55,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── CONTACT SECTION ──────────────────────────────────────────────
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('#contact form');

  if (contactInfo) {
    gsap.from(contactInfo, {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: BIDIRECTIONAL
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
        toggleActions: BIDIRECTIONAL
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power2.out'
    });
  }

  // ── REFRESH ON LOAD (fixes scroll position issues) ───────────────
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});
