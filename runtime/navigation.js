const toggle = document.querySelector('.mobile-nav-toggle');
const navigation = document.getElementById(toggle.getAttribute('aria-controls'));
const header = toggle.closest('header');

function setMenuOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  header.classList.toggle('mobile-nav-open', open);
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const item = event.target.closest('a, button');
  if (item && getComputedStyle(toggle).display !== 'none') {
    setMenuOpen(false);
    if (!item.hasAttribute('data-open-appointment')) toggle.focus();
  }
});

header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    toggle.focus();
  }
});

header.classList.add('has-mobile-nav');
toggle.hidden = false;
