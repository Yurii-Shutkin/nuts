import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import 'swiper/css/navigation';

export const swiper = new Swiper('.product-info__swiper', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 30, 
  loop: true,
  // centeredSlides: true,

  navigation: {
    nextEl: '.product-card__slider-arrow--right',
    prevEl: '.product-card__slider-arrow--left',
  },
});
