// main.js — Entry point. Initialises all modules after DOM ready.
// All heavy logic lives in dedicated module files.

document.addEventListener('DOMContentLoaded', () => {
  // Log environment for debugging
  console.log('[Portfolio] Scripts loaded successfully');

  // Mark page as JS-enabled for progressive enhancement
  document.documentElement.classList.add('js-enabled');

  // ── PROBLEM 1: INVISIBLE CONTENT FALLBACK ─────────────────────
  // Guaranteed fallback: after 500ms, show all animated elements
  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 500);

  // ── PROBLEM 6: STATS COUNTER ANIMATION ────────────────────────
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    
    const duration = 1500;
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;
    
    const suffix = el.dataset.suffix || '+';
    
    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(easedProgress * target);
      
      if (currentFrame >= totalFrames) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = current + suffix;
      }
    }, frameRate);
  };

  // ── PROBLEM 7: SKILLS PROGRESS BARS ──────────────────────────
  const triggerSkillBars = () => {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width || '100%';
    });
  };

  // IntersectionObserver for Stats and Skills
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger counters
        if (entry.target.id === 'about' || entry.target.classList.contains('about-stats')) {
          entry.target.querySelectorAll('.stat-number').forEach(el => {
            if (!el.classList.contains('counted')) {
              el.classList.add('counted');
              animateCounter(el);
            }
          });
        }
        
        // Trigger skill bars
        if (entry.target.id === 'skills' || entry.target.classList.contains('skill-category-card')) {
          triggerSkillBars();
        }
        
        // Add is-visible class (redundant with ScrollTrigger but good for fallback)
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .animate-on-scroll, .skill-category-card, .about-stats').forEach(el => {
    observer.observe(el);
  });

  // Fallback for counters and bars after 800ms
  setTimeout(() => {
    document.querySelectorAll('.stat-number:not(.counted)').forEach(el => {
      el.classList.add('counted');
      animateCounter(el);
    });
    triggerSkillBars();
  }, 800);

  // ── ADDITIONAL POLISH: SCROLL PROGRESS BAR ───────────────────
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.height = progress + '%';
  });

  // ── PROBLEM 5: GALLERY 404 HIDER ─────────────────────────────
  const galleryImages = document.querySelectorAll('.gallery-item-3d img');
  if (galleryImages.length > 0) {
    let loadedCount = 0;
    let errorCount = 0;
    
    galleryImages.forEach(img => {
      img.addEventListener('load', () => {
        loadedCount++;
      });
      img.addEventListener('error', () => {
        errorCount++;
        if (errorCount === galleryImages.length) {
          const gallerySection = document.querySelector('#gallery');
          if (gallerySection) gallerySection.style.display = 'none';
        }
      });
    });
  }
});
