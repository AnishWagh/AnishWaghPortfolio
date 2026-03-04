/**
 * animations.js — GSAP ScrollTrigger animations
 * 
 * ARCHITECTURE RULE: All content is visible by default (CSS).
 * GSAP only adds motion on top. If GSAP fails to load,
 * the entire site still renders correctly.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP GUARD ──────────────────────────────────────────────────
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Portfolio] GSAP not loaded — static fallback active');
    // Fallback is handled by main.js and CSS
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── SCROLL BEHAVIOUR CONFIG ──────────────────────────────────────
  // threshold: 0.05 equivalent via start positioning
  const SCROLL_START  = 'top 95%'; // Fires earlier
  const PLAY_ONCE     = 'play none none none';

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

  // ── GENERAL SCROLL REVEALS ──
  gsap.utils.toArray('.animate-on-scroll').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: SCROLL_START,
        toggleActions: PLAY_ONCE,
        onEnter: () => el.classList.add('is-visible')
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── EXPERIENCE SECTION (REDUCED TRANSLATE) ──
  const expEntries = document.querySelectorAll('.experience-entry');
  expEntries.forEach((entry, i) => {
    gsap.from(entry, {
      scrollTrigger: {
        trigger: entry,
        start: 'top 90%',
        toggleActions: PLAY_ONCE
      },
      x: i % 2 === 0 ? -20 : 20, // Reduced from 55/60
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── REFRESH ON LOAD ──
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});
