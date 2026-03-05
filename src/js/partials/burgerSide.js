const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const sidebarCloseBtn = document.querySelector('.sidebar__close-btn');

burger.addEventListener('click', () => {
  sidebar.style.transform = 'translateX(0)';
  console.log('clicked')
})

sidebarCloseBtn.addEventListener('click', () => {
  sidebar.style.transform = 'translateX(-100%)';
})
