/**
 * gallery.js — 3D Coverflow Gallery Controller
 * Handles the rotation, focus switching, and 3D positioning.
 */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery-item-3d');
  const prevBtn = document.querySelector('.gallery-btn.prev');
  const nextBtn = document.querySelector('.gallery-btn.next');
  let currentIndex = 0;
  let autoRotateInterval;

  function updateGallery() {
    items.forEach((item, index) => {
      item.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2', 'hidden');
      
      const diff = index - currentIndex;
      
      if (diff === 0) {
        item.classList.add('active');
      } else if (diff === -1 || (currentIndex === 0 && index === items.length - 1)) {
        item.classList.add('prev-1');
      } else if (diff === -2 || (currentIndex === 1 && index === items.length - 1) || (currentIndex === 0 && index === items.length - 2)) {
        item.classList.add('prev-2');
      } else if (diff === 1 || (currentIndex === items.length - 1 && index === 0)) {
        item.classList.add('next-1');
      } else if (diff === 2 || (currentIndex === items.length - 2 && index === 0) || (currentIndex === items.length - 1 && index === 1)) {
        item.classList.add('next-2');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateGallery();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateGallery();
  }

  function startAutoRotate() {
    stopAutoRotate(); // Clear existing
    autoRotateInterval = setInterval(nextImage, 5000); // Slow rotation every 5s
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextImage();
      startAutoRotate(); // Restart timer on manual click
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevImage();
      startAutoRotate();
    });
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateGallery();
      startAutoRotate();
    });
  });

  // Pause on hover
  const wrapper = document.querySelector('.gallery-coverflow-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoRotate);
    wrapper.addEventListener('mouseleave', startAutoRotate);
  }

  // Initialize
  updateGallery();
  startAutoRotate();
});
