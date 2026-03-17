const playButton = document.querySelector('.manufacturer__play-icon');
const video = document.querySelector('.manufacturer__video');
const imgWrap = document.querySelector('.manufacturer__img-preview-wrap');
const sliderControls = document.querySelector('.manufacturer__slider-controls');



playButton.addEventListener('click', () => {
  video.classList.add('manufacturer__video--active');
  imgWrap.classList.add('manufacturer__img-preview-wrap--unactive');
  // sliderControls.classList.add('manufacturer__slider-controls--active')
  video.play();
  video.addEventListener('ended', () => {
    video.classList.remove('manufacturer__video--active');
    imgWrap.classList.remove('manufacturer__img-preview-wrap--unactive');
  })
});
