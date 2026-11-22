const appointment = document.querySelector('#appointment-dialog');

document.querySelectorAll('[data-open-appointment]').forEach((button) => {
  button.addEventListener('click', () => appointment.showModal());
});

document.querySelector('[data-advocate-profile]')?.addEventListener('click', () => {
  window.location.hash = 'about-us';
  document.querySelector('#about-us').focus({ preventScroll: true });
});

document.querySelectorAll('[data-request-draft]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const subject = form.dataset.subject;
    const lines = [...new FormData(form)]
      .filter(([, value]) => value.trim())
      .map(([name, value]) => {
        const label = form.elements.namedItem(name).labels?.[0]?.firstChild?.textContent.trim();
        return (label || name) + ': ' + value.trim();
      });
    const draft = new Blob([subject + '\r\n\r\n' + lines.join('\r\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(draft);
    const link = document.createElement('a');
    link.href = url;
    link.download = subject.toLowerCase().replaceAll(' ', '-') + '.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  form.querySelector('[type="submit"]').disabled = false;
});

async function initializeEditorialRise() {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const response = await fetch('./runtime/editorial-rise.animation.json');
  if (!response.ok) return;
  const { frames, duration } = await response.json();
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.animate(frames, { duration: duration * 1000 });
    }
  }, { threshold: 0.15 });

  document.querySelectorAll(
    '[data-editorial-reveal], .home-hero-copy > div, .home-hero-values, .hero-engraving, .home-information-heading, .excellence-photo'
  ).forEach((element) => reveal.observe(element));
}

initializeEditorialRise().catch((error) => console.warn('Editorial rise could not load.', error));


if (new URLSearchParams(window.location.search).get('appointment') === '1') {
  appointment.showModal();
}

const callbackDialog = document.querySelector('#callback-dialog');

document.querySelector('[data-open-callback]').addEventListener('click', () => {
  callbackDialog.showModal();
});
