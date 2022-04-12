
var scheduledAnimationFrame = false;
var parallaxContainers = Array.from(document.getElementsByClassName("parallax-container"));

function readAndUpdateParallax() {
  var scrollY = window.scrollY;
  var innerHeight = window.innerHeight;
  var offsetBase = (scrollY + (innerHeight / 2));
  parallaxContainers.forEach(function (elm) {
    var parallaxElm = elm.getElementsByClassName("parallax")[0];
    var elmRect = parallaxElm.getBoundingClientRect();
    var offsetTop = parallaxElm.offsetTop;
    var offsetHeight = parallaxElm.offsetHeight;
    if (elmRect.top < innerHeight && elmRect.bottom > 0) {
      var offset = (offsetBase - (offsetTop + (offsetHeight / 2))) * 0.2;
      parallaxElm.style.transform = `translateY(${offset}px)`;
      parallaxElm.style.zIndex = "-1";
    }
  });

  scheduledAnimationFrame = false;
}

window.addEventListener('scroll', function () {
  if (scheduledAnimationFrame) {
    return;
  }

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdateParallax);
});

var quoteCarousel = document.getElementById("quote-carousel");
var innerQuoteCarousel = quoteCarousel.getElementsByClassName("inner-carousel")[0];
var quoteCarouselSlides = quoteCarousel.getElementsByClassName("slide");

function transitionQuoteCarousel(activeSlide, nextSlide) {
  innerQuoteCarousel.style.left = `-${nextSlide.offsetLeft}px`;
  activeSlide.classList.remove("active");
  nextSlide.classList.add("active");
}

function quoteSliderMove() {
  var activeSlide = quoteCarousel.getElementsByClassName("active")[0];
  var nextSlide = activeSlide.nextElementSibling;

  if (nextSlide == null) {
    nextSlide = quoteCarousel.getElementsByClassName("slide")[0];
  }

  transitionQuoteCarousel(activeSlide, nextSlide);
}

var quoteSliderInterval = setInterval(quoteSliderMove, 7500);

Array.from(quoteCarouselSlides).forEach(function (el) {
  el.addEventListener('click', function (evt) {
    var activeSlide = quoteCarousel.getElementsByClassName("active")[0];
    var nextSlide = evt.currentTarget;

    clearInterval(quoteSliderInterval);
    transitionQuoteCarousel(activeSlide, nextSlide);
    quoteSliderInterval = setInterval(quoteSliderMove, 7500);
  }, false);
});

