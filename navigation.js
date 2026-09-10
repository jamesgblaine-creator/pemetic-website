(() => {
  'use strict';

  const button = document.querySelector('.menu-toggle-btn');
  const menu = document.getElementById('mobile-menu');
  if (!button || !menu) return;

  const mobile = window.matchMedia('(max-width: 960px)');

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.hidden = !open;
  }

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      event.preventDefault();
      setOpen(false);
      button.focus();
    }
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  mobile.addEventListener('change', () => {
    if (!mobile.matches) {
      const focusedLink = menu.contains(document.activeElement) ? document.activeElement : null;
      const buttonFocused = document.activeElement === button;
      setOpen(false);
      if (focusedLink) {
        const desktopLink = Array.from(document.querySelectorAll('.navlinks a'))
          .find((link) => link.getAttribute('href') === focusedLink.getAttribute('href'));
        desktopLink?.focus();
      } else if (buttonFocused) {
        document.querySelector('.nav-actions a')?.focus();
      }
    }
  });
})();
