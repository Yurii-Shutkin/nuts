import '@/js/partials/headerCart.js';

const body = document.querySelector('body');
const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const sidebarCloseBtn = document.querySelector('.sidebar__close-btn');

if (burger && sidebar && body) {
  burger.addEventListener('click', () => {
    sidebar.style.transform = 'translateX(0)';
    body.style.overflow = 'hidden';
  });
}

if (sidebarCloseBtn && sidebar && body) {
  sidebarCloseBtn.addEventListener('click', () => {
    sidebar.style.transform = 'translateX(-100%)';
    body.style.overflow = 'auto';
  });
}

if (sidebar && body) {
  window.addEventListener('resize', () => {
    sidebar.style.transform = 'translateX(-100%)';
    body.style.overflow = 'auto';
  });
}
