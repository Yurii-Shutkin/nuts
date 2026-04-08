import {
  getCart,
  getCartItemsCount,
  getCartTotal,
  removeFromCart,
  subscribeToCartUpdates,
  updateCartQuantity,
} from '@/js/cart/storage.js';

const cartRoot = document.querySelector('.header__cart');
const cartIcon = document.querySelector('.header__cart-icon');
const preview = document.querySelector('[data-header-cart-preview]');
const previewItems = document.querySelector('[data-header-cart-items]');
const previewTotal = document.querySelector('[data-header-cart-total]');

if (cartRoot && cartIcon && preview && previewItems && previewTotal) {
  const togglePreview = (isOpen) => {
    cartRoot.classList.toggle('is-open', isOpen);
  };

  const renderCartPreview = () => {
    const items = getCart();
    const count = getCartItemsCount();
    const total = getCartTotal();

    cartIcon.setAttribute('data-count', String(count));
    previewTotal.textContent = String(total);

    if (!items.length) {
      previewItems.innerHTML = '<div class="header-cart-preview__empty">Корзина пуста</div>';
      return;
    }

    previewItems.innerHTML = items
      .map((item) => {
        const quantity = Number(item.quantity) || 1;
        return `
          <div class="header-cart-preview__item" data-product-id="${item.id}">
            <span class="header-cart-preview__name">${item.name} ${item.weight ? `${item.weight}г.` : ''}</span>
            <div class="header-cart-preview__controls">
              <button type="button" class="header-cart-preview__qty-btn header-cart-preview__qty-btn--minus" data-header-cart-minus>
                <svg><use href="#icon-range-arrow"></use></svg>
              </button>
              <input type="number" min="1" value="${quantity}" class="header-cart-preview__qty-input" data-header-cart-input>
              <button type="button" class="header-cart-preview__qty-btn header-cart-preview__qty-btn--plus" data-header-cart-plus>
                <svg><use href="#icon-range-arrow"></use></svg>
              </button>
            </div>
            <span class="header-cart-preview__price">${(Number(item.currentPrice) || 0) * quantity} грн.</span>
            <button type="button" class="header-cart-preview__remove" data-header-cart-remove>&times;</button>
          </div>
        `;
      })
      .join('');
  };

  previewItems.addEventListener('click', (event) => {
    const row = event.target.closest('.header-cart-preview__item');
    const productId = row?.dataset.productId;
    if (!productId) {
      return;
    }

    if (event.target.closest('[data-header-cart-remove]')) {
      removeFromCart(productId);
      return;
    }

    const input = row.querySelector('[data-header-cart-input]');
    if (!input) {
      return;
    }

    const currentValue = Number(input.value) || 1;
    if (event.target.closest('[data-header-cart-plus]')) {
      updateCartQuantity(productId, currentValue + 1);
    }
    if (event.target.closest('[data-header-cart-minus]')) {
      updateCartQuantity(productId, Math.max(1, currentValue - 1));
    }
  });

  previewItems.addEventListener('change', (event) => {
    const input = event.target.closest('[data-header-cart-input]');
    if (!input) {
      return;
    }

    const row = input.closest('.header-cart-preview__item');
    const productId = row?.dataset.productId;
    if (!productId) {
      return;
    }

    updateCartQuantity(productId, Math.max(1, Number(input.value) || 1));
  });

  cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = cartRoot.classList.contains('is-open');
    togglePreview(!isOpen);
  });

  preview.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', (event) => {
    const targetNode = event.target;
    if (targetNode instanceof Node && cartRoot.contains(targetNode)) {
      return;
    }
    togglePreview(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      togglePreview(false);
    }
  });

  subscribeToCartUpdates(renderCartPreview);
  renderCartPreview();
}
