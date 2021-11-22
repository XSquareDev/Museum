// Parallax in Safari
if (navigator.userAgent.indexOf('Safari') != -1 &&
  navigator.userAgent.indexOf('Chrome') == -1) {
  document.querySelector('.parallax__content').classList.add('active');
}

//Smooth scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const blockId = anchor.getAttribute('href');
    document.querySelector('' + blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

// Slick slider welcome section
$(document).ready(function () {
  $('.welcome-slider').slick({
    dots: true,
    speed: 500,
    autoplaySpeed: 4000,
    autoplay: true,
    infinite: true,
    appendDots: '.slider-buttons__squares',
    appendArrows: '.slider-buttons__arrows',
    prevArrow: '<button class="slider-buttons__arrow-left arrow-button"><svg class="slider-buttons__svg slider-buttons__svg_left"><use xlink:href="#arrow"></use></svg></button>',
    nextArrow: '<button class="slider-buttons__arrow-right arrow-button"><svg class="slider-buttons__svg slider-buttons__svg_right"><use xlink:href="#arrow"></use></svg></button>',
  });
});

const counter = document.querySelector('.counter__left');
$('.welcome-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
  counter.innerText = `0${currentSlide + 1}`
});

// Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoieXV1dHN5IiwiYSI6ImNrdXM5azBkZDF6cjgzMXAxemthb3pqbDYifQ.okUkXKnTnwRHXhfaD-0O1g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 15.75,
  showZoom: true,
});
map.addControl(new mapboxgl.NavigationControl());
new mapboxgl.Marker({
  color: "#171717"
}).setLngLat([2.3364, 48.86091]).addTo(map);
new mapboxgl.Marker({
  color: "#757575"
}).setLngLat([2.3333, 48.8602]).addTo(map);
new mapboxgl.Marker({
  color: "#757575"
}).setLngLat([2.3397, 48.8607]).addTo(map);
new mapboxgl.Marker({
  color: "#757575"
}).setLngLat([2.3330, 48.8619]).addTo(map);
new mapboxgl.Marker({
  color: "#757575"
}).setLngLat([2.3365, 48.8625]).addTo(map);

// Top button
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add('active');
  } else {
    scrollTop.classList.remove('active');
  }
});
// Burger
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const welcomeContent = document.querySelector('.welcome__content');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
    welcomeContent.classList.toggle('_hide');
  });
}

menuBody.addEventListener('click', function (e) {
  if (e.target.matches('a')) {
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
    welcomeContent.classList.remove('_hide');
  }
});
// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive = true) {
  if (unlock) {
    popupActive.classList.remove('open');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
// Local-storage
const amountTicketsForm = document.forms.amountTickets;
const popupForm = document.forms.ticketsForm;
const overviewType = document.querySelector('.overview__type');
const inputBasic = document.querySelectorAll('.basicValue');
const inputSenior = document.querySelectorAll('.seniorValue');
const priceBasic = document.querySelectorAll('.priceBasic');
const priceSenior = document.querySelectorAll('.priceSenior');
const counterBasic = document.querySelector('.sum-tickets__count_basic');
const counterSenior = document.querySelector('.sum-tickets__count_senior');
const sumBasic = document.querySelector('.sumBasic');
const sumSenior = document.querySelector('.sumSenior');
const total = document.querySelectorAll('.total');
const ticketTypeRadio = amountTicketsForm.elements.ticketType;
const typeSelect = popupForm.elements.ticketType;
const timeSelect = popupForm.elements.timeSelect;
const overviewTime = document.querySelector('.overview__time');
const dateSelect = popupForm.date;
const overviewDate = document.querySelector('.overview__date');

let ticketsData = {
  type: 'Permanent exhibition',
  basic: 0,
  senior: 0,
  priceBasic: 20,
  priceSenior: 10,
  time: 'Time',
  date: 'Date',
};

function setTicketData() {
  const countBasic = ticketsData.basic * ticketsData.priceBasic;
  const countSenior = ticketsData.senior * ticketsData.priceSenior;
  overviewType.innerHTML = ticketsData.type;
  priceBasic.forEach(e => e.innerHTML = ticketsData.priceBasic);
  priceSenior.forEach(e => e.innerHTML = ticketsData.priceSenior);
  total.forEach(e => e.innerHTML = countBasic + countSenior);
  sumBasic.innerHTML = countBasic;
  sumSenior.innerHTML = countSenior;
  inputBasic.forEach(e => e.value = ticketsData.basic);
  inputSenior.forEach(e => e.value = ticketsData.senior);
  counterBasic.innerHTML = ticketsData.basic;
  counterSenior.innerHTML = ticketsData.senior;
  ticketTypeRadio.value = ticketsData.type;
  typeSelect.value = ticketsData.type;
  overviewTime.innerHTML = ticketsData.time;
  overviewDate.innerHTML = ticketsData.date;
}

function setPermanent() {
  ticketsData.type = 'Permanent exhibition';
  ticketsData.priceBasic = 20;
  ticketsData.priceSenior = 10;
}

function setTemporary() {
  ticketsData.type = 'Temporary exhibition';
  ticketsData.priceBasic = 25;
  ticketsData.priceSenior = 12.5;
}

function setCombined() {
  ticketsData.type = 'Combined admission';
  ticketsData.priceBasic = 40;
  ticketsData.priceSenior = 20;
}

function switchType(item) {
  switch (item.value) {
    case 'Permanent exhibition':
      setPermanent();
      setTicketData();
      break;
    case 'Temporary exhibition':
      setTemporary();
      setTicketData();
      break;
    case 'Combined admission':
      setCombined();
      setTicketData();
      break;
  }
}

function passBasicValue(e) {
  if (e.target.closest('button')) {
    ticketsData.basic = this.querySelector('.basicValue').value;
  }
  setTicketData();
}

function passSeniorValue(e) {
  if (e.target.closest('button')) {
    ticketsData.senior = this.querySelector('.seniorValue').value;
  }
  setTicketData();
}

const amountBasic = document.getElementById('amountBasic');
amountBasic.addEventListener('click', passBasicValue);

const amountSenior = document.getElementById('amountSenior');
amountSenior.addEventListener('click', passSeniorValue);

const ticketBasic = document.getElementById('ticketBasic');
ticketBasic.addEventListener('click', passBasicValue);

const ticketSenior = document.getElementById('ticketSenior');
ticketSenior.addEventListener('click', passSeniorValue);

ticketTypeRadio.forEach(item => item.addEventListener('change', function (e) {
  switchType(item);
}));

typeSelect.addEventListener('change', function (e) {
  switchType(typeSelect);
});

function getDate() {
  const date = new Date(dateSelect.value);
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (date.getFullYear() > 2020 && date.getFullYear() < 3000) ? `${daysOfTheWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}` : 'Invalid date';
}

dateSelect.addEventListener('change', function (e) {
  overviewDate.innerHTML = getDate();
  ticketsData.date = overviewDate.innerHTML;
  setTicketData();
});

timeSelect.addEventListener('change', function (e) {
  overviewTime.innerHTML = timeSelect.options[timeSelect.selectedIndex].text;
  ticketsData.time = overviewTime.innerHTML;
  setTicketData();
});


document.addEventListener('DOMContentLoaded', function (e) {
  ticketsData = JSON.parse(localStorage.ticketsData);
  setTicketData();
});

window.addEventListener('unload', function (e) {
  localStorage.setItem('ticketsData', JSON.stringify(ticketsData));
});

setTicketData();

// Rotate arrows
const popup = document.querySelector('.popup');
const timeContainerSelect = document.querySelector('.booking-tickets__time-container');
const ticketContainerSelect = document.querySelector('.booking-tickets__select-container');

function toggleArrow(obj) {
  popup.addEventListener('click', function (e) {
    if (e.target == obj || obj.contains(e.target)) {
      obj.querySelector('.selectArrow').classList.toggle('_active');
    }
    if (!e.target == obj || !obj.contains(e.target)) {
      obj.querySelector('.selectArrow').classList.remove('_active');
    }
  });
  popup.addEventListener('keyup', function (e) {
    if (e.code == 'Escape') {
      obj.querySelector('.selectArrow').classList.remove('_active');
    }
  });
}

toggleArrow(timeContainerSelect);
toggleArrow(ticketContainerSelect);
// Random image gallery
const pictureContainer = document.querySelector('.gallery__picture-inner-container');
const firstColumn = pictureContainer.children[0];
const secondColumn = pictureContainer.children[1];
const thirdColumn = pictureContainer.children[2];

function randomImage(column) {
  const arr = Array.from(column.children);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  }
  shuffle(arr);

  for (let i = 0; i < arr.length; i++) {
    arr[i].style.order = i;
  }
}

randomImage(firstColumn);
randomImage(secondColumn);
randomImage(thirdColumn);

// Popup gallery
const animItems = document.querySelectorAll('.gallery__item');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 6;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}
// Slider-explore
const sliderExplore = document.querySelector('.slider-explore__slider input');
const dragLine = document.querySelector('.slider-explore__slider .slider-explore__line');
const images = document.querySelector('.slider-explore__images .slider-explore__img-before');

sliderExplore.oninput = () => {
  let sliderValue = sliderExplore.value;
  dragLine.style.left = sliderValue + '%';
  images.style.width = sliderValue + '%';
};
let timerOverlay,
  timerCursor;

// mute control
const muteAudio = () => {
  muteBtn.classList.toggle('muted');
  mainVideo.muted ? mainVideo.muted = false : mainVideo.muted = true;
};

// filling in progress bars
const fillProgressBar = (value) => `
    linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

// overlay display control
const displayOverlay = (inner) => {
  overlay.innerHTML = inner;
  overlay.classList.remove('hidden');
  clearTimeout(timerOverlay);
  timerOverlay = setTimeout(() => overlay.classList.add('hidden'), 1000);
};

// add control of the video player using the mouse
document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'mainVideo':
    case 'playBtnBig':
    case 'playBtn':
      mainVideo.paused ? mainVideo.play() : mainVideo.pause();
      break;
    case 'muteBtn':
      muteAudio();
      break;
    case 'fullscreenBtn':
      return document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
    default:
      break;
  }
});

// add fullscreen mode by double click
mainVideo.addEventListener('dblclick', () => document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen());

// add control of the video player using the keyboard (first group)
document.addEventListener('keyup', (e) => {
  if (scrollY > 2200 && scrollY < 4000) {
    switch (e.code) {
      case 'Space':
      case 'KeyK':
        return mainVideo.paused ? mainVideo.play() : mainVideo.pause();
      case 'KeyM':
        muteAudio();
        break;
      case 'KeyF':
        return document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
      default:
        break;
    }
    if (e.key >= 0 && e.code !== 'Space') mainVideo.currentTime = e.key * mainVideo.duration / 10;
    if (e.shiftKey && e.code === 'Period') {
      mainVideo.playbackRate === 2 ? mainVideo.playbackRate = 2 : mainVideo.playbackRate += 0.25;
    }
    if (e.shiftKey && e.code === 'Comma') {
      mainVideo.playbackRate === 0.25 ? mainVideo.playbackRate = 0.25 : mainVideo.playbackRate -= 0.25;
    }
  }
});

// add control of the video player using the keyboard (second group)
document.addEventListener('keydown', (e) => {
  if (document.fullscreenElement) {
    player.style.cursor = 'default';
    controls.style.opacity = 1;
    clearTimeout(timerCursor);
    timerCursor = setTimeout(() => {
      player.style.cursor = 'none';
      controls.style.opacity = 0;
    }, 3000);
  }
  if (scrollY > 2800 && scrollY < 4000) {
    switch (e.code) {
      case 'Space':
        return e.preventDefault();
      case 'ArrowUp':
        e.preventDefault();
        if (document.activeElement.id !== 'progress') {
          if (!mainVideo.muted) mainVideo.volume > 0.95 ? mainVideo.volume = 1 : mainVideo.volume += 0.05;
          else {
            mainVideo.muted = false;
            mainVideo.volume = 0.05;
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (document.activeElement.id !== 'progress') {
          if (!mainVideo.muted) mainVideo.volume < 0.05 ? mainVideo.volume = 0 : mainVideo.volume -= 0.05;
        }
        break;
      case 'ArrowLeft':
        if (document.activeElement.id !== 'progress') {
          mainVideo.currentTime > 5 ? mainVideo.currentTime -= 5 : mainVideo.currentTime = 0;
          displayOverlay('<< 5 sec');
        }
        break;
      case 'ArrowRight':
        if (document.activeElement.id !== 'progress') {
          mainVideo.currentTime < mainVideo.duration - 5 ? mainVideo.currentTime += 5 : mainVideo.currentTime = mainVideo.duration;
          displayOverlay('>> 5 sec');
        }
        break;
      case 'KeyJ':
        mainVideo.currentTime > 10 ? mainVideo.currentTime -= 10 : mainVideo.currentTime = 0;
        displayOverlay('<< 10 sec');
        break;
      case 'KeyL':
        mainVideo.currentTime < mainVideo.duration - 10 ? mainVideo.currentTime += 10 : mainVideo.currentTime = mainVideo.duration;
        displayOverlay('>> 10 sec');
        break;
      case 'Period':
        if (mainVideo.paused && !e.shiftKey) {
          mainVideo.currentTime += 0.17;
          displayOverlay('>>');
        }
        break;
      case 'Comma':
        if (mainVideo.paused && !e.shiftKey) {
          mainVideo.currentTime -= 0.17;
          displayOverlay('<<');
        }
        break;
      default:
        break;
    }
  }
});

// change the display of play buttons
mainVideo.addEventListener('play', () => {
  playBtn.className = 'play pause';
  playBtnBig.className = 'big-play hidden';
});

mainVideo.addEventListener('pause', () => {
  playBtn.className = 'play';
  playBtnBig.className = 'big-play';
});

// control the display of the video progress bar
mainVideo.addEventListener('timeupdate', () => {
  if (!isNaN(mainVideo.duration)) {
    progress.value = mainVideo.currentTime * 100 / mainVideo.duration;
    progress.style.background = fillProgressBar(progress.value);
  }
});

// control overlay display when changing video playback speed
mainVideo.addEventListener('ratechange', () => displayOverlay(`${video.playbackRate}x`));

// control video rewind
progress.addEventListener('input', () => {
  mainVideo.currentTime = progress.value * mainVideo.duration / 100;
});

// control video volume
vol.addEventListener('input', () => {
  if (!mainVideo.muted) mainVideo.volume = vol.value / 100;
  else {
    mainVideo.muted = false;
    mainVideo.volume = 0.05;
  }
});

// control the video volume with the mouse wheel
const changeVolumeByWheel = e => {
  let volume = mainVideo.volume * 100;
  if (e.deltaY < 0 && !mainVideo.muted) volume += 5;
  else if (e.deltaY < 0 && mainVideo.muted) {
    mainVideo.muted = false;
    volume = 5;
  } else if (e.deltaY > 0 && !mainVideo.muted) volume -= 5;
  if (volume < 0) mainVideo.volume = 0;
  else if (volume > 100) mainVideo.volume = 1;
  else mainVideo.volume = volume / 100;
}

document.addEventListener('fullscreenchange', _ => {
  if (document.fullscreenElement) player.addEventListener('wheel', changeVolumeByWheel);
  else player.removeEventListener('wheel', changeVolumeByWheel);
});

// control the display of video volume
mainVideo.addEventListener('volumechange', () => {
  if (mainVideo.muted) {
    displayOverlay('muted');
    vol.style.background = fillProgressBar(0);
    vol.value = 0;
  } else {
    displayOverlay(`🔊 ${Math.floor(mainVideo.volume * 100)}%`);
    vol.style.background = fillProgressBar(mainVideo.volume * 100);
    vol.value = mainVideo.volume * 100;
    if (mainVideo.volume < 0.5 && !muteBtn.classList.contains('vol50')) muteBtn.classList.add('vol50');
    else if (mainVideo.volume >= 0.5 && muteBtn.classList.contains('vol50')) muteBtn.classList.remove('vol50');
  }
  mainVideo.volume === 0 || mainVideo.muted ? muteBtn.classList.add('muted') : muteBtn.classList.remove('muted');
});

// control the disappearance of the cursor and control panel
document.addEventListener('mousemove', () => {
  if (document.fullscreenElement) {
    player.style.cursor = 'default';
    controls.style.opacity = 1;
    clearTimeout(timerCursor);
    timerCursor = setTimeout(() => {
      player.style.cursor = 'none';
      controls.style.opacity = 0;
    }, 3000);
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    clearTimeout(timerCursor);
    player.style.cursor = 'default';
    controls.style.opacity = 1;
  }
});

// Slider video
$('.playlist__row').slick({
  array: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 600,
  draggable: false,
  swipe: false,
  appendArrows: '.video-pagination__arrows',
  appendDots: '.video-pagination__bullets',
  prevArrow: '<button class="video-pagination__quotes video-pagination__quotes_left"><svg class="video-pagination__quotes-svg"><use xlink:href="#quotes"></use></svg></button>',
  nextArrow: '<button class="video-pagination__quotes video-pagination__quotes_right"><svg class="video-pagination__quotes-svg"><use xlink:href="#quotes"></use></svg></button>',
  dotsClass: 'video-pagination__bullets',
  responsive: [{
    breakpoint: 956,
    settings: {
      slidesToShow: 2
    }
  }]
});

// Main video preview
$('.playlist__row').on('afterChange', function (event, slick, currentSlide) {
  mainVideo.src = `video/video${currentSlide}.mp4`;
  mainVideo.poster = `img/video/poster${currentSlide}.jpg`;
  mainVideo.currentTime = 0;
  progress.value = 0;
  progress.style.background = `
                    linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)`;
  if (mainVideo.paused) {
    playBtn.className = 'play';
    playBtnBig.className = 'big-play';
  } else {
    playBtn.className = 'play pause';
    playBtnBig.className = 'big-play hidden';
  }

  let videosParent = document.querySelector('.playlist__row');
  let iframes = videosParent.getElementsByTagName('iframe');

  for (let video of iframes) {
    video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
});

// Video-iframe
function findVideos() {
  let videos = document.querySelectorAll('.playlist__video');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  };
}

function setupVideo(video) {
  let link = video.querySelector('.playlist__link');
  let media = video.querySelector('.playlist__media');
  let button = video.querySelector('.playlist__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  let url = media.alt;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('playlist__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + '?enablejsapi=1&' + query;
}

findVideos();