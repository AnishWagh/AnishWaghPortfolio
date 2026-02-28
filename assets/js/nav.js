/**
 * nav.js — Navigation behaviour
 * - Scrolled state (adds background on scroll)
 * - Active section highlighting via IntersectionObserver
 * - Mobile menu: close on link click
 * - Blog link: navigates to blog.html (page link, not anchor)
 */

document.addEventListener('DOMContentLoaded', () => {

  const nav       = document.getElementById('site-nav');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
  const toggle    = document.getElementById('nav-toggle');
  const sections  = document.querySelectorAll('section[id]');

  // ── Scrolled state ────────────────────────────────────────────
  const onScroll = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ── Active section via IntersectionObserver ───────────────────
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id   = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('is-active', entry.isIntersecting);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ── Mobile: close menu when a link is clicked ─────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (toggle) toggle.checked = false;
    });
  });

  // ── Smooth scroll for anchor links ───────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return; // let blog.html navigate normally
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
