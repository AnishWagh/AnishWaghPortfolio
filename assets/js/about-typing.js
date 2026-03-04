document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and plugins are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof TextPlugin === 'undefined') {
    console.error('GSAP or required plugins not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  const typingElements = document.querySelectorAll('.typing-text');
  const textData = [];

  // Capture original text and clear elements immediately
  typingElements.forEach(el => {
    textData.push(el.innerText);
    el.innerText = '';
  });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".terminal-window",
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  typingElements.forEach((el, i) => {
    masterTl.to(el, {
      duration: textData[i].length * 0.01, // Adjusted speed
      text: {
        value: textData[i],
        delimiter: ""
      },
      ease: "none",
      onStart: () => {
        el.classList.add('is-typing');
      },
      onComplete: () => {
        el.classList.remove('is-typing');
        el.classList.add('is-done');
      }
    });
  });
});
