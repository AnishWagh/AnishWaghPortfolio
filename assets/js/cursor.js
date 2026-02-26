// cursor.js — Custom Pop Art Mechatronics cursor
// Lime default → Cyan on hover over interactive elements

const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor follow using requestAnimationFrame
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// State: default (lime) → hovering (cyan, scaled up)
const interactiveSelectors = 'a, button, [data-cursor], input, textarea, select';
document.querySelectorAll(interactiveSelectors).forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});

// Hide on mobile (no mouse)
if (window.matchMedia('(pointer: coarse)').matches) {
  cursor.style.display = 'none';
  document.documentElement.style.cursor = 'auto';
}