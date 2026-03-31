import { swiper } from '../../partials/productCardSwiper';
const body = document.querySelector('body');
const modal = document.querySelector('.product-card__modal');
const modalImgContainer = document.querySelector('.product-card__modal-img');
const closeBtn = document.querySelector('.product-card__modal-close');
const overlay = document.querySelector('.product-card__modal-overview');
const searchBtn = document.querySelector('.product-info__search-icon');

searchBtn.addEventListener('click', () => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const img = activeSlide.querySelector('.product-info__img-item');

  if (!img) return;

  modalImgContainer.innerHTML = `
    <img src="${img.src}" class="product-card__img-modal" />
  `;
  body.style.overflow = 'hidden';
  modal.classList.add('active');
});

function closeModal() {
  modal.classList.remove('active');
  body.style.overflow = 'visible';
  modalImgContainer.innerHTML = '';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
