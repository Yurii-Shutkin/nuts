import 'virtual:svg-icons-register';
import '@/js/partials/loadMap.js';
import '@/js/partials/select.js';
import '@/js/partials/burgerSide.js';
import './validate.js';
import { initCartTable } from '@/js/cart/render-cart-table.js';
import { clearCart, getCart, getCartTotal } from '@/js/cart/storage.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/js/firebase/firebase.js';

initCartTable();

const checkoutForm = document.querySelector('.delivery-methods__form');

function setDeliveryFieldsRequired(activeMethod) {
  const fields = document.querySelectorAll('[data-delivery-field]');
  fields.forEach((field) => {
    field.required = field.dataset.deliveryField === activeMethod;
  });
}

function getCheckedValue(name) {
  const input = document.querySelector(`input[name="${name}"]:checked`);
  return input ? input.value : '';
}

if (checkoutForm) {
  checkoutForm.addEventListener('change', () => {
    const deliveryMethod = getCheckedValue('delivery-method');
    setDeliveryFieldsRequired(deliveryMethod);
  });

  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cartItems = getCart();
    if (cartItems.length === 0) {
      window.alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
      return;
    }

    const deliveryMethod = getCheckedValue('delivery-method');
    setDeliveryFieldsRequired(deliveryMethod);

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    const formData = new FormData(checkoutForm);
    const orderPayload = {
      customer: {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
      },
      delivery: {
        method: String(formData.get('delivery-method') || ''),
        country: String(formData.get('country') || '').trim(),
        region: String(formData.get('region') || '').trim(),
        address: String(formData.get('address') || '').trim(),
      },
      payment: {
        method: String(formData.get('pay-method') || ''),
      },
      items: cartItems,
      total: getCartTotal(),
      status: 'new',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'orders'), orderPayload);
      clearCart();
      window.location.href = `${import.meta.env.BASE_URL}pages/order-redirect/index.html`;
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      window.alert('Не удалось оформить заказ. Попробуйте снова.');
    }
  });
}
