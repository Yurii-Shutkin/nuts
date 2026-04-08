import {
  getCart,
  getCartTotal,
  subscribeToCartUpdates,
  updateCartQuantity,
} from './storage.js';

function buildCartItemMarkup(item) {
  const price = Number(item.currentPrice) || 0;
  const quantity = Number(item.quantity) || 1;
  const total = price * quantity;

  return `
    <div class="cart-table__item" data-product-id="${item.id}">
      <div class="cart-table__wrap-row">
        <div class="cart-table__product-name ta-l">
          ${item.name} ${item.weight ? `${item.weight}г.` : ''}
        </div>
        <div class="cart-table__product-amount">
          <div class="quantity-picker">
            <button type="button" class="quantity-picker__button quantity-picker__minus" data-quantity-minus>
              <svg>
                <use href="#icon-range-arrow"></use>
              </svg>
            </button>
            <input type="number" value="${quantity}" min="1" class="quantity-picker__input" data-quantity-input>
            <button type="button" class="quantity-picker__button quantity-picker__plus" data-quantity-plus>
              <svg>
                <use href="#icon-range-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-table__product-price">
          <span>${price} грн.</span>
        </div>
        <div class="cart-table__product-price--total">
          <span>${total} грн.</span>
        </div>
      </div>
    </div>
  `;
}

function updateSummary() {
  const amount = document.querySelector('.cart-table__result-sum-amount');
  if (amount) {
    amount.textContent = String(getCartTotal());
  }
}

function renderRows() {
  const container = document.querySelector('.cart-table__wrap');
  if (!container) {
    return;
  }

  const cartItems = getCart();
  if (!cartItems.length) {
    container.innerHTML = `
      <div class="cart-table__item">
        <div class="cart-table__wrap-row">
          <div class="cart-table__product-name ta-l">Корзина пуста</div>
          <div class="cart-table__product-amount"></div>
          <div class="cart-table__product-price"></div>
          <div class="cart-table__product-price--total"></div>
        </div>
      </div>
    `;
    updateSummary();
    return;
  }

  container.innerHTML = cartItems.map(buildCartItemMarkup).join('');
  updateSummary();
}

function bindQuantityHandlers() {
  document.addEventListener('click', (event) => {
    const plusButton = event.target.closest('[data-quantity-plus]');
    const minusButton = event.target.closest('[data-quantity-minus]');
    if (!plusButton && !minusButton) {
      return;
    }

    const row = event.target.closest('.cart-table__item');
    const input = row?.querySelector('[data-quantity-input]');
    const productId = row?.dataset.productId;
    if (!input || !productId) {
      return;
    }

    const currentValue = Number(input.value) || 1;
    const nextValue = plusButton ? currentValue + 1 : Math.max(1, currentValue - 1);

    input.value = String(nextValue);
    updateCartQuantity(productId, nextValue);
    renderRows();
  });

  document.addEventListener('change', (event) => {
    const input = event.target.closest('[data-quantity-input]');
    if (!input) {
      return;
    }

    const row = input.closest('.cart-table__item');
    const productId = row?.dataset.productId;
    if (!productId) {
      return;
    }

    const nextValue = Math.max(1, Number(input.value) || 1);
    input.value = String(nextValue);
    updateCartQuantity(productId, nextValue);
    renderRows();
  });
}

let isBound = false;
let isSubscribed = false;

export function initCartTable() {
  if (!document.querySelector('.cart-table')) {
    return;
  }

  renderRows();
  if (!isBound) {
    bindQuantityHandlers();
    isBound = true;
  }
  if (!isSubscribed) {
    subscribeToCartUpdates(renderRows);
    isSubscribed = true;
  }
}
