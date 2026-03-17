const playButton = document.querySelector('.manufacturer__play-icon');
const imgWrap = document.querySelector('.manufacturer__img-preview-wrap');

playButton.addEventListener('click', () => {
  imgWrap.classList.add('manufacturer__img-preview-wrap--unactive');
});
