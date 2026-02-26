// animations.js
// All GSAP ScrollTrigger animations.
// Loaded with defer — runs after DOM is ready.
// Wrapped in DOMContentLoaded for safety.

document.addEventListener('DOMContentLoaded', () => {

  // Guard: if GSAP didn't load (e.g. ad blocker), degrade gracefully
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.gsap-reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO: Character split stagger on page load ──
  const heroLetters = document.querySelectorAll('#hero .text-hero span');
  if (heroLetters.length) {
    gsap.from(heroLetters, {
      y: 120,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  // ── HERO: Role line reveal ──
  gsap.from('#hero .text-h3', {
    x: -60,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.9
  });

  // ── HERO: Tagline + CTA stagger ──
  gsap.from(['#hero .text-body', '#hero .hero__cta'], {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 1.1
  });

  // ── SECTION TITLES: Slide in from left on scroll ──
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: -80,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  });

  // ── SECTION LABELS: Fade in slightly before title ──
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  // ── PROJECT CARDS: Stagger in from bottom ──
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }

  // ── EXPERIENCE ENTRIES: Slide in alternating left/right ──
  document.querySelectorAll('.experience-entry').forEach((entry, i) => {
    gsap.from(entry, {
      scrollTrigger: {
        trigger: entry,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: i % 2 === 0 ? -60 : 60,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // ── BLOG CARDS: Stagger in from bottom ──
  gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power2.out'
    });
  });

  // ── ABOUT: Text and image reveal ──
  gsap.from('#about .about-text', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: -60,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });
  gsap.from('#about .about-visual', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: 60,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.15
  });

  // ── CONTACT: Fade up ──
  gsap.from('#contact .contact-info', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });
  gsap.from('#contact form', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: 0.15,
    ease: 'power2.out'
  });

});