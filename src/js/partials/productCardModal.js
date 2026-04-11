const body = document.querySelector('body');
const modal = document.querySelector('.product-card__modal');
const imgWrap = document.querySelector('.product-card__modal-img');
const closeBtn = document.querySelector('.product-card__modal-close');
const modalOverlay = document.querySelector('.product-card__modal-overview');

if (modal && imgWrap && closeBtn && modalOverlay) {
  document.addEventListener('click', (event) => {
    const searchIcon = event.target.closest('.product-card__search-icon');
    if (!searchIcon) {
      return;
    }

    const card = searchIcon.closest('.product-card');
    const activeSlide = card?.querySelector('.product-card__swiper .swiper-slide-active');
    const img = activeSlide?.querySelector('img') || card?.querySelector('.product-card__swiper img');
    if (!img) {
      return;
    }

    body.style.overflow = 'hidden';
    imgWrap.innerHTML = '';
    const modalImage = document.createElement('img');
    modalImage.src = img.src;
    modalImage.alt = img.alt || 'Фото товара';
    modalImage.className = 'product-card__img-modal';
    imgWrap.appendChild(modalImage);
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
  });

  const closeModal = () => {
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    body.style.overflow = 'auto';
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
}

