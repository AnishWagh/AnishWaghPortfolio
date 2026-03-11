/**
 * animations.js — GSAP and Vanilla scroll/interaction logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hero 3D Parallax Tilt ---
  initHeroParallax();
});

/**
 * 3D Parallax Tilt for Hero Section
 * Right column tilts, left column shifts opposite (counter-parallax)
 */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const photoWrapper = document.querySelector('.hero-photo-wrapper');
  const photoContainer = document.querySelector('.hero-photo-container');
  const heroContent = document.querySelector('.hero-content');
  const glare = document.querySelector('.photo-glare');

  if (!hero || !photoWrapper || !heroContent) return;

  hero.addEventListener('mousemove', (e) => {
    // Skip for mobile
    if (window.innerWidth < 768) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation for photo (max ±8 deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // Calculate shift for text (max ±6px)
    const shiftX = ((x - centerX) / centerX) * -6;
    const shiftY = ((y - centerY) / centerY) * -6;

    // Apply 3D Tilt to Photo
    photoWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Apply Counter-Parallax to Content
    heroContent.style.transform = `translateX(${shiftX}px) translateY(${shiftY}px)`;

    // Update Glare position
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 70%)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    // Reset smoothly
    photoWrapper.style.transition = 'transform 0.5s ease';
    heroContent.style.transition = 'transform 0.5s ease';
    
    photoWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    heroContent.style.transform = 'translateX(0px) translateY(0px)';

    // Remove transition after it completes to avoid lag
    setTimeout(() => {
      photoWrapper.style.transition = '';
      heroContent.style.transition = '';
    }, 500);
  });
}
