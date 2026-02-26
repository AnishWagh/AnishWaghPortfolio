// skills-ring.js
// Concentric rotating skill rings — Pop Art Mechatronics signature element.
// CSS animations handle rotation. JS handles label positioning.

document.addEventListener('DOMContentLoaded', () => {

  const skillsData = {
    outer: ['JavaScript', 'TypeScript', 'Python', 'Node.js', 'SQL', 'Bash'],
    inner: ['React', 'REST APIs', 'PostgreSQL', 'Docker', 'Git'],
    core:  ['System Design', 'Architecture', 'CI/CD']
  };

  // Position labels around each ring using trigonometry
  function positionLabels(ringEl, labels, radius) {
    const container = ringEl.parentElement;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const count = labels.length;

    labels.forEach((label, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const labelEl = document.createElement('span');
      labelEl.className = 'ring-label text-label';
      labelEl.textContent = label;
      labelEl.style.position = 'absolute';
      labelEl.style.left = `${x}px`;
      labelEl.style.top  = `${y}px`;
      labelEl.style.transform = 'translate(-50%, -50%)';
      container.appendChild(labelEl);
    });
  }

  const outerRing = document.querySelector('.ring-outer');
  const innerRing = document.querySelector('.ring-inner');
  const coreRing  = document.querySelector('.ring-core');

  if (outerRing) positionLabels(outerRing, skillsData.outer, 210);
  if (innerRing) positionLabels(innerRing, skillsData.inner, 150);
  if (coreRing)  positionLabels(coreRing,  skillsData.core,  90);

});