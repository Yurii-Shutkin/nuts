import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const swiper = new Swiper('.manufacturer__swiper', {
  modules: [Navigation],
  loop: true,
   navigation: {
    nextEl: '.manufacturer__slider-icon--right',
    prevEl: '.manufacturer__slider-icon--left',
  },
});
