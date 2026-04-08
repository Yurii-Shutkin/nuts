import 'virtual:svg-icons-register';
import '@/js/partials/burgerSide.js';
import '@/js/partials/select.js';
import '../../firebase/firebase.js';
import { fetchProducts, renderProductsFromList } from '../../firebase/get-products.js';
// import '@/js/partials/formSelect.js';
import '@/js/partials/multiSelect.js';
import '@/js/partials/loadMap.js';
import '@/js/partials/productCardModal.js';
import './catalogInfoSwiper.js';

const catalogProductsGrid = document.querySelector('.catalog .products__grid');
const applyButton = document.querySelector('.catalog__filter-btn-accept');
const resetButton = document.querySelector('.catalog__filter-reset-btn');
const tasteCheckboxes = document.querySelectorAll(
  '.catalog__filter-multiselect--taste .form__multiselect-option-checkbox',
);
const weightCheckboxes = document.querySelectorAll(
  '.catalog__filter-multiselect--weight .form__multiselect-option-checkbox',
);
const sortButtons = document.querySelectorAll('[data-price-sort]');

if (catalogProductsGrid && applyButton && resetButton) {
  let allProducts = [];
  let activeSort = null;

  const getSelectedValues = (elements) =>
    [...elements].filter((item) => item.checked).map((item) => item.value);

  const applyFilters = () => {
    const selectedTastes = getSelectedValues(tasteCheckboxes);
    const selectedWeights = getSelectedValues(weightCheckboxes).map(Number);

    let filteredProducts = [...allProducts];

    if (selectedTastes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tasteTags.some((tag) => selectedTastes.includes(tag)),
      );
    }

    if (selectedWeights.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedWeights.includes(Number(product.weight)),
      );
    }

    if (activeSort === 'asc') {
      filteredProducts.sort((a, b) => Number(a.currentPrice) - Number(b.currentPrice));
    }
    if (activeSort === 'desc') {
      filteredProducts.sort((a, b) => Number(b.currentPrice) - Number(a.currentPrice));
    }

    renderProductsFromList(catalogProductsGrid, filteredProducts);
  };

  const resetFilters = () => {
    [...tasteCheckboxes, ...weightCheckboxes].forEach((checkbox) => {
      checkbox.checked = false;
    });
    activeSort = null;
    renderProductsFromList(catalogProductsGrid, allProducts);
  };

  applyButton.addEventListener('click', applyFilters);
  resetButton.addEventListener('click', resetFilters);

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextSort = button.dataset.priceSort;
      activeSort = activeSort === nextSort ? null : nextSort;
      applyFilters();
    });
  });

  fetchProducts()
    .then((products) => {
      allProducts = products;
      renderProductsFromList(catalogProductsGrid, allProducts);
    })
    .catch((error) => {
      console.error('Ошибка загрузки каталога:', error);
    });
}