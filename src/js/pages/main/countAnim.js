const numberAnim = (min = 0, max, elem, time) => {
  const element = document.querySelector(elem);
  let current = min;
  const interval = setInterval(() => {
    if (current < max) {
      current++;
      element.innerHTML = current;
    } else {
      clearInterval(interval);
    }
  }, time);
};

const animateOnScroll = (selector, min, max, time) => {
  const elem = document.querySelector(selector);
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { 
          numberAnim(min, max, selector, time);
          observer.unobserve(elem);
        }
      });
    },
    { threshold: 0.7 } 
  );
  observer.observe(elem);
}

animateOnScroll('.count-1', 0, 240, 5);
animateOnScroll('.count-2', 0, 1, 30);
animateOnScroll('.count-3', 0, 10, 30);
animateOnScroll('.count-4', 0, 80, 10);
