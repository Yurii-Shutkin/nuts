const body = document.querySelector('body');
const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const sidebarCloseBtn = document.querySelector('.sidebar__close-btn');

burger.addEventListener('click', () => {
  sidebar.style.transform = 'translateX(0)';
  body.style.overflow = 'hidden';
})

sidebarCloseBtn.addEventListener('click', () => {
  sidebar.style.transform = 'translateX(-100%)';
  body.style.overflow = 'auto';
})

window.addEventListener('resize', () => {
  sidebar.style.transform = 'translateX(-100%)';
  body.style.overflow = 'auto';
})
