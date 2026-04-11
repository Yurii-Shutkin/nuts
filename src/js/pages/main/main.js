import 'virtual:svg-icons-register';
import '@/js/partials/loadMap.js';
import '@/js/partials/select.js';
import '@/js/partials/burgerSide.js';
import '@/js/partials/videoHandler.js';
import '@/js/partials/videoBlock.js';
import '@/js/partials/productCardModal.js';
import '@/js/partials/ecoHeroSlider.js';
import '@/js/partials/newsSwiper.js';
import './manufacturer.js';
import './swiper.js';
import './countAnim.js';
import '../../firebase/firebase.js';
import { renderProducts } from '../../firebase/get-products.js';
import { addProducts } from '../../firebase/add-products.js';

const homeProductsGrid = document.querySelector('.products .products__grid');
if (homeProductsGrid) {
  homeProductsGrid.classList.add('is-loading');

  renderProducts(homeProductsGrid, { limit: 6 })
    .then(() => {
      homeProductsGrid.classList.remove('is-loading');
    })
    .catch((error) => {
      console.error('Ошибка загрузки товаров на главной:', error);
      homeProductsGrid.classList.remove('is-loading');
    });
}

// addProducts();
