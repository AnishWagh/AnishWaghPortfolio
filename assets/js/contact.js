// contact.js — Formspree submission with 3D Flip Success Animation & Scramble Effect

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const flipCard = document.getElementById('contact-flip-card');
  const successState = document.getElementById('success-state');
  
  if (!form || !flipCard || !successState) return;

  // --- FORM SUBMISSION HANDLER ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    // STEP 1: Transmitting State
    btn.innerHTML = '<span class="transmitting-text">TRANSMITTING</span>';
    btn.disabled = true;
    btn.style.opacity = '0.6';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10000)
      });

      // Simulate network delay for effect (min 1.2s total)
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (response.ok) {
        // STEP 2: Full Right Column Flip
        initiateFlip(flipCard, successState, form, btn, originalText);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      btn.innerHTML = 'FAILED — TRY AGAIN';
      btn.disabled = false;
      btn.style.opacity = '1';
      setTimeout(() => { btn.innerHTML = originalText; }, 3000);
    }
  });

  /**
   * Handles the 3D Flip animation and content swap
   */
  function initiateFlip(card, backSide, formEl, btn, btnText) {
    // 1. Prepare success content
    backSide.innerHTML = `
      <div class="success-content">
        <h3 class="success-title">✓ TRANSMISSION COMPLETE</h3>
        <p class="success-msg-1">Message received and logged.</p>
        <p class="success-msg-2">I'll get back to you within 24 hours.</p>
        <div class="success-countdown">Returning in 5...</div>
        <div class="success-divider"></div>
        <button type="button" class="btn-primary" id="send-another">SEND ANOTHER →</button>
      </div>
    `;

    // 2. Execute Flip
    card.classList.add('is-flipped');

    // 3. Start Countdown
    let timeLeft = 5;
    const countdownEl = backSide.querySelector('.success-countdown');
    const interval = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        countdownEl.textContent = `Returning in ${timeLeft}...`;
      } else {
        clearInterval(interval);
        returnToForm(card, formEl, btn, btnText);
      }
    }, 1000);

    // 4. "Send Another" manual trigger
    const anotherBtn = backSide.querySelector('#send-another');
    anotherBtn.addEventListener('click', () => {
      clearInterval(interval);
      returnToForm(card, formEl, btn, btnText);
    });
  }

  function returnToForm(card, formEl, btn, btnText) {
    if (!card.classList.contains('is-flipped')) return;
    
    card.classList.remove('is-flipped');
    
    // Clear form and reset button after flip completes
    setTimeout(() => {
      formEl.reset();
      btn.innerHTML = btnText;
      btn.disabled = false;
      btn.style.opacity = '1';
    }, 600);
  }

  // --- SCRAMBLE TEXT EFFECT ---
  const scrambleElements = document.querySelectorAll('.scramble-text');
  const chars = "!@#$%^&*<>[]{}|~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function scramble(el) {
    const final = el.getAttribute('data-text').replace('\\n', '\n');
    const rawLines = final.split('\n');
    let iteration = 0;
    
    const interval = setInterval(() => {
      el.innerHTML = rawLines.map(line => {
        return line.split("")
          .map((char, index) => {
            if (index < iteration) return char;
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }).join("<br>");

      if (iteration >= Math.max(...rawLines.map(l => l.length))) {
        clearInterval(interval);
        // Ensure final exact text with <br>
        el.innerHTML = rawLines.join("<br>");
      }
      iteration += 1 / 2;
    }, 30);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scramble(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  scrambleElements.forEach(el => observer.observe(el));
});
