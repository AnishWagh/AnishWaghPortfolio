// contact.js — Formspree form submission with loading + success states

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10000)   // 10s timeout
      });

      if (response.ok) {
        form.innerHTML = `
          <div class="form-success">
            <p class="text-h3">Message received.</p>
            <p class="text-body">I'll be in touch within 24 hours.</p>
          </div>`;
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = 'Failed — try again';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = originalText;
      }, 3000);
    }
  });
});