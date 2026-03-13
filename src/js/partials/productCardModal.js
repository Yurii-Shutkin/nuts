const scaleIcon = document.querySelectorAll('.product-card__search-icon');
const productCardImg = document.querySelectorAll('.product-card__img')
const modal = document.querySelector('.product-card__modal');
const imgWrap = document.querySelector('.product-card__modal-img');
const closeBtn = document.querySelector('.product-card__modal-close');
const modalOverlay = document.querySelector('.product-card__modal-overview');


scaleIcon.forEach(el => {
  el.addEventListener('click', () => {
    const parent = el.closest('.product-card__img-wrap');
    const img = parent.querySelector('.product-card__img').cloneNode(true);
    imgWrap.innerHTML = '';
    imgWrap.appendChild(img);
    img.classList.add('product-card__img-modal');
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    console.log(imgWrap);
    console.log('clicked');
  })
})

closeBtn.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
});

modalOverlay.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
});
