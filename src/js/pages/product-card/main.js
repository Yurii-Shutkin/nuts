import 'virtual:svg-icons-register';
import '@/js/partials/loadMap.js';
import '@/js/partials/select.js';
import '@/js/partials/burgerSide.js';
import '@/js/partials/productCardSwiper.js';
import '@/js/partials/tabsSwiper.js';
import './productCardModal.js';
import { addToCart } from '@/js/cart/storage.js';
import { fetchProductById, fetchProducts } from '@/js/firebase/get-products.js';

let toastTimerId = null;

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined && value !== null) {
    el.textContent = String(value);
  }
}

function showAddedToCartToast() {
  let toast = document.querySelector('[data-add-to-cart-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'product-toast';
    toast.dataset.addToCartToast = 'true';
    toast.textContent = 'Товар добавлен в корзину';
    document.body.appendChild(toast);
  }

  toast.classList.add('is-visible');

  if (toastTimerId) {
    clearTimeout(toastTimerId);
  }

  toastTimerId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1600);
}

function applyProductToPage(product) {
  const image = product.image || '/img/products/product-card-1.png';
  const mainImage = document.querySelector('[data-product-main-image]');
  const secondaryImage = document.querySelector('[data-product-secondary-image]');
  if (mainImage) {
    mainImage.src = image;
    mainImage.alt = product.name || 'Фото товара';
  }
  if (secondaryImage) {
    secondaryImage.src = image;
    secondaryImage.alt = product.name || 'Фото товара';
  }

  setText('[data-product-short-name]', product.name || 'Товар');
  setText('[data-product-id-label]', `Арт: ${product.id}`);
  setText('[data-product-title]', product.name || 'Товар');
  setText('[data-product-composition]', product.composition || 'Состав уточняется');
  setText('[data-product-weight]', `${product.weight || 0}г.`);
  setText('[data-product-energy]', `${product.energyValue || 0} Ккал.`);
  setText('[data-product-current-price]', product.currentPrice || 0);
  const oldPrice = document.querySelector('[data-product-old-price]');
  if (oldPrice) {
    const hasOldPrice = Number(product.oldPrice) > 0;
    oldPrice.textContent = `${product.oldPrice || 0} грн.`;
    oldPrice.style.display = hasOldPrice ? 'inline' : 'none';
  }

  const orderButton = document.querySelector('[data-product-order-btn]');
  if (orderButton) {
    orderButton.onclick = () => {
      addToCart(product);
      showAddedToCartToast();
    };
  }
}

function showProductInfo() {
  const productSection = document.querySelector('.product-info');
  if (productSection) {
    productSection.classList.remove('is-loading');
  }
}

async function initProductPage() {
  try {
    const productId = getProductIdFromUrl();
    let product = await fetchProductById(productId);

    if (!product) {
      const products = await fetchProducts();
      product = products[0];
    }

    if (!product) {
      return;
    }

    applyProductToPage(product);
    showProductInfo();
  } catch (error) {
    console.error('Ошибка загрузки карточки товара:', error);
    showProductInfo();
  }
}

initProductPage();
