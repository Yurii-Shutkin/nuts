import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const swiper = new Swiper('.catalog__info-swiper', {
  modules: [Navigation],
  loop: true,
   navigation: {
    nextEl: '.swiper-controls__icon--right',
    prevEl: '.swiper-controls__icon--left',
  },
});
