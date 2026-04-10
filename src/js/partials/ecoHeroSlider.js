import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const swiper = new Swiper('.eco-hero__swiper', {
  modules: [Autoplay],
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
