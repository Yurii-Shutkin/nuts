const heroContainer = document.querySelector('.hero__banner');
const playIcon = document.querySelector('.hero__btn-play');
const video = document.querySelector('.hero__video');
const content = document.querySelector('.hero__content');

const videoHeight = heroContainer.offsetHeight;
video.style.height = videoHeight + 'px';


playIcon.addEventListener('click', () => {
  
  video.style.visibility = 'visible';
  video.style.opacity = '1';
  content.style.visibility = 'hidden';
  content.style.opacity = '0';

  video.play();

  video.addEventListener('ended', () => {
    video.style.visibility = 'hidden';
    content.style.visibility = 'visible';
    content.style.opacity = '1';

});
  console.log('clicked');
})
