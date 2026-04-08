const CART_KEY = 'nuts-cart';
const CART_UPDATED_EVENT = 'cart:updated';

function readCart() {
  try {
    const rawCart = localStorage.getItem(CART_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch (error) {
    console.error('Ошибка чтения корзины:', error);
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, {
      detail: { cart: items },
    }),
  );
}

export function getCart() {
  return readCart();
}

export function addToCart(product) {
  const cart = readCart();
  const existingProduct = cart.find((item) => String(item.id) === String(product.id));

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      currentPrice: Number(product.currentPrice) || 0,
      weight: Number(product.weight) || 0,
      image: product.image || '/img/products/product-card-1.png',
      quantity: 1,
    });
  }

  writeCart(cart);
}

export function updateCartQuantity(productId, quantity) {
  const cart = readCart();
  const item = cart.find((product) => String(product.id) === String(productId));
  if (!item) {
    return;
  }

  item.quantity = Math.max(1, Number(quantity) || 1);
  writeCart(cart);
}

export function removeFromCart(productId) {
  const cart = readCart().filter((item) => String(item.id) !== String(productId));
  writeCart(cart);
}

export function clearCart() {
  writeCart([]);
}

export function getCartTotal() {
  return readCart().reduce(
    (total, item) => total + (Number(item.currentPrice) || 0) * (Number(item.quantity) || 0),
    0,
  );
}

export function getCartItemsCount() {
  return readCart().reduce((count, item) => count + (Number(item.quantity) || 0), 0);
}

export function subscribeToCartUpdates(handler) {
  window.addEventListener(CART_UPDATED_EVENT, handler);
}
