const body = document.querySelector('body');
const modal = document.querySelector('.product-card__modal');
const modalImgContainer = document.querySelector('.product-card__modal-img');
const closeBtn = document.querySelector('.product-card__modal-close');
const overlay = document.querySelector('.product-card__modal-overview');
const searchButtons = document.querySelectorAll('.product-card__search-icon, .product-info__search-icon');

function getActiveSlideImage(button) {
  const card = button.closest('.product-card');
  const productInfo = button.closest('.product-info');
  const swiperContainer = card
    ? card.querySelector('.product-card__swiper')
    : productInfo
    ? productInfo.querySelector('.product-info__swiper')
    : null;

  const activeSlide = swiperContainer?.querySelector('.swiper-slide-active') || swiperContainer?.querySelector('.swiper-slide');
  return activeSlide?.querySelector('img');
}

function openModal(imgSrc, imgAlt) {
  if (!imgSrc) {
    return;
  }

  modalImgContainer.innerHTML = `
    <img src="${imgSrc}" alt="${imgAlt || 'Фото товара'}" class="product-card__img-modal" />
  `;
  body.style.overflow = 'hidden';
  modal.classList.add('active');
}

searchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const img = getActiveSlideImage(button);
    if (img) {
      openModal(img.src, img.alt);
      return;
    }

    const fallbackImage = document.querySelector('[data-product-main-image]');
    if (fallbackImage?.src) {
      openModal(fallbackImage.src, fallbackImage.alt || 'Фото товара');
    }
  });
});

function closeModal() {
  modal.classList.remove('active');
  body.style.overflow = 'visible';
  modalImgContainer.innerHTML = '';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
