const playButton = document.querySelector('.video-block__play-icon');
const videoContentBlock = document.querySelector('.video-block__content');
const videoWrap = document.querySelector('.video-block__video');
const video = document.querySelector('.video-block__video');

playButton.addEventListener('click', () => {
  videoWrap.classList.add('video-block__video--active');
  videoContentBlock.style.display = 'none';
  video.play();
});

video.addEventListener('ended', () => {
  videoWrap.classList.remove('video-block__video--active');
  videoContentBlock.style.display = 'block';

})
