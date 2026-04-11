import Handlebars from 'handlebars';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);
const baseUrl = import.meta.env.BASE_URL;

const productTemplateSource = `
{{#each products}}
<div class="product-card" data-product-id="{{id}}">
  <div class="product-card__img-wrap">
    {{#if itemFlag}}
    <div class="product-card__flag-wrap">
      <div class="product-card__flag-icon product-card__flag-icon--{{statusClass}}">
        <svg>
          <use href="#icon-product-flag"></use>
        </svg>
        <span>{{statusLabel}}</span>
      </div>
    </div>
    {{/if}}
    <div class="swiper product-card__swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <picture class="product-card__img">
            <img src="{{image}}" alt="{{name}}" class="product-card__img">
          </picture>
        </div>
        <div class="swiper-slide">
          <picture class="product-card__img">
            <img src="{{imageAlt}}" alt="{{name}}" class="product-card__img">
          </picture>
        </div>
      </div>
    </div>
    <div class="product-card__search-icon">
      <div class="product-card__search-icon--outer">
        <div class="product-card__search-icon--inner">
          <svg>
            <use href="#icon-search"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="product-card__slider-arrows">
      <svg class="product-card__slider-arrow product-card__slider-arrow--left">
        <use href="#icon-slider-arrow"></use>
      </svg>
      <svg class="product-card__slider-arrow product-card__slider-arrow--right">
        <use href="#icon-slider-arrow"></use>
      </svg>
    </div>
  </div>
  <div class="product-card__info">
    <h4 class="product-card__name">{{name}}</h4>
    <span class="product-card__number">Арт: {{id}}</span>
    <span class="product-card__desc">{{composition}}</span>
    <div class="product-card__aux-info">
      <div class="product-card__weight-info">
        <div class="product-card__scales-icon">
          <svg>
            <use href="#icon-scales"></use>
          </svg>
        </div>
        <span class="product-card__weight">
          Масса:
          <span>{{weight}} г.</span>
        </span>
      </div>
      <div class="product-card__package-info">
        <div class="product-card__package-icon">
          <svg>
            <use href="#icon-package"></use>
          </svg>
        </div>
        <span class="product-card__package">
          Упаковка
          <span>вакуумная</span>
        </span>
      </div>
    </div>
    <div class="product-card__price-info">
      <div class="product-card__price-border"></div>
      <div class="product-card__price-wrap">
        <span class="product-card__price">
          <span class="product-card__price-label">Цена:</span>
          <span class="product-card__actual-price">
            {{currentPrice}}
            <span>грн.</span>
          </span>
          {{#if oldPrice}}
          <span class="product-card__old-price">
            {{oldPrice}}
            <span>грн.</span>
          </span>
          {{/if}}
        </span>
        <button type="button" class="product-card__button main-btn" data-open-product>
          Купить
        </button>
      </div>
    </div>
  </div>
</div>
{{/each}}
`;

const template = Handlebars.compile(productTemplateSource);

function generateAltImage(imageUrl) {
  const match = imageUrl.match(/^(.+?)(\d+)(\.\w+)$/);
  if (match) {
    const nextDigit = String(Number(match[2]) + 1);
    return match[1] + nextDigit + match[3];
  }
  return imageUrl.replace(/(\.\w+)$/, '-alt$1');
}

function normalizeProduct(rawProduct, docId) {
  const id = rawProduct.id || docId;
  const itemFlag = rawProduct.itemFlag || 'basic';
  const flagMap = {
    sale: { statusLabel: 'Акция', statusClass: 'red' },
    new: { statusLabel: 'Новинка', statusClass: 'orange' },
    basic: { statusLabel: '', statusClass: '' },
  };
  const flagState = flagMap[itemFlag] || flagMap.basic;
  const image = rawProduct.image || baseUrl + 'img/products/product-card-1.png';
  const imageAlt = generateAltImage(image);

  return {
    id,
    name: rawProduct.name || 'Товар',
    weight: rawProduct.weight || 0,
    currentPrice: Number(rawProduct.currentPrice) || 0,
    oldPrice: Number(rawProduct.oldPrice) || 0,
    composition: rawProduct.composition || '',
    energyValue: rawProduct.energyValue || 0,
    tasteTags: Array.isArray(rawProduct.tasteTags) ? rawProduct.tasteTags : [],
    image,
    imageAlt,
    itemFlag: itemFlag !== 'basic',
    ...flagState,
  };
}

export async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map((docItem) =>
    normalizeProduct(docItem.data(), docItem.id),
  );
}

export async function fetchProductById(productId) {
  if (!productId) {
    return null;
  }

  const snapshot = await getDoc(doc(db, 'products', String(productId)));
  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot.data(), snapshot.id);
}

function initializeProductSwipers(container) {
  const swipers = container.querySelectorAll('.product-card__swiper');
  swipers.forEach((swiperEl) => {
    const imgWrap = swiperEl.closest('.product-card__img-wrap');
    const nextArrow = imgWrap?.querySelector('.product-card__slider-arrow--right');
    const prevArrow = imgWrap?.querySelector('.product-card__slider-arrow--left');
    
    if (nextArrow && prevArrow) {
      new Swiper(swiperEl, {
        modules: [Navigation],
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
      });
    }
  });
}

function bindOpenProduct(container) {
  if (container.dataset.openProductBound === 'true') {
    return;
  }
  container.dataset.openProductBound = 'true';

  container.addEventListener('click', (event) => {
    const openProductButton = event.target.closest('[data-open-product]');
    if (!openProductButton) {
      return;
    }

    const productCard = openProductButton.closest('.product-card');
    const productId = productCard?.dataset.productId;
    if (!productId) {
      return;
    }
    window.location.href = `${baseUrl}pages/product-card/index.html?id=${encodeURIComponent(productId)}`;
  });
}

export function renderProductsFromList(container, products = []) {
  if (!container) {
    return;
  }

  container.innerHTML = template({ products });
  bindOpenProduct(container);
  initializeProductSwipers(container);
}

export async function renderProducts(container, options = {}) {
  if (!container) {
    return;
  }

  const products = await fetchProducts();
  const renderList =
    typeof options.limit === 'number' ? products.slice(0, options.limit) : products;

  renderProductsFromList(container, renderList);
}

