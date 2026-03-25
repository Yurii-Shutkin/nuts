const playButtons = document.querySelectorAll(".gallery__card-play-icon");

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentCard = btn.closest('.gallery__card-video');
    const video = currentCard.querySelector('.gallery__card-video-wrap video');
    const videoWrap = currentCard.querySelector('.gallery__card-video-wrap');

    if (video.paused) {
      video.play();
      videoWrap.style.opacity = '1';   
      videoWrap.style.visibility = 'visible';     
    } else {
      video.pause();
      videoWrap.style.opacity = '0';     
      videoWrap.style.visibility = 'hidden';     
    }

    video.addEventListener('ended', () => {
        videoWrap.style.opacity = '0';     
        videoWrap.style.visibility = 'hidden';   
    })
  })
})
