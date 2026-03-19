import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const swiper = new Swiper('.news__swiper', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 30, 
  loop: true,
  // centeredSlides: true,

  navigation: {
    nextEl: '.news__swiper-controls .swiper-controls__icon--right',
    prevEl: '.news__swiper-controls .swiper-controls__icon--left',
  },

  breakpoints: {
    576: {
      slidesPerView: 1.6,
    },

    768: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 2.4,
    },

    1200: {
      slidesPerView: 3,
    }
  }
});

