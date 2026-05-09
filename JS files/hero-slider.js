document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 50,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    // Ensure transition is fluid as per analysis (500ms)
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
  });
});
