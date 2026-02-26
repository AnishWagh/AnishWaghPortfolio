// nav.js — Navigation scroll behaviour and active section highlighting

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Handle scroll events for nav styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Intersection Observer for active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // trigger when section is 50% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding link
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    if (section.getAttribute('id')) {
      observer.observe(section);
    }
  });

  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});