document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger');
  const menu = document.querySelector('.header__menu');
  let windowWidth = window.innerWidth;

  // Initialize the mobile menu
  initializeMenu(windowWidth, hamburgerBtn, menu);

  // Adjust menu based on initial window width
  handleResize(windowWidth, hamburgerBtn, menu);

  // Handle window resize events
  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    handleResize(windowWidth, hamburgerBtn, menu);
  });
});

function handleResize(windowWidth, hamburgerBtn, menu) {
  if (windowWidth > 768) {
    menu.style.maxHeight = 'none';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  } else {
    menu.style.maxHeight = '0';
  }
}

function initializeMenu(windowWidth, hamburgerBtn, menu) {
  // Toggle menu on hamburger button click
  hamburgerBtn.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      btn.setAttribute('aria-expanded', 'false');
      menu.style.maxHeight = '0';
    } else {
      btn.setAttribute('aria-expanded', 'true');
      menu.style.maxHeight = `${menu.scrollHeight + 5}px`;
    }
  });

  if (windowWidth > 768) {
    return;
  }

  // Close menu when clicked outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    const isMenu = target === menu || menu.contains(target);
    const isHamburger = target === hamburgerBtn || hamburgerBtn.contains(target);

    if (!isMenu && !isHamburger) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      menu.style.maxHeight = '0';
    }
  });
}
