import Swiper from "swiper";

const swiper = new Swiper('.tabs__swiper', {
  spaceBetween: 30,
  autoHeight: true,
});

  const tabs = document.querySelectorAll('.tabs__header-wrap .tabs__tab')

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    swiper.slideTo(index); 
  });
});

swiper.on('slideChange', () => {
  const activeIndex = swiper.realIndex;
  
  tabs.forEach((tab, index) => {
    tab.classList.toggle('tabs__tab--active', index === activeIndex);
  });
});
