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

    const parent = searchIcon.closest('.product-card__img-wrap');
    const img = parent?.querySelector('.product-card__img');
    if (!img) {
      return;
    }

    body.style.overflow = 'hidden';
    const modalImage = img.cloneNode(true);
    imgWrap.innerHTML = '';
    imgWrap.appendChild(modalImage);
    modalImage.classList.add('product-card__img-modal');
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

