import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import 'swiper/css';

const swiper = new Swiper('.eco-hero__swiper', {
  modules: [Autoplay],
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
