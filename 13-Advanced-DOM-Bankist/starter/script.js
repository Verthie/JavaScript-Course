'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//: Button scrolling
/*
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  //:& e.target - the element that the event was fired on (in this case the button)
  //:& getBoundingClientRect() - returns the size of an element and its position relative to the viewport

  console.log('Current scroll (X/Y)', window.screenX, window.screenY);
  //:& window.screenX / Y - returns the horizontal/vertical coordinate of the window (browser - np. firefox) relative to the screen (monitor)

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  //:& clientHeight / Width - returns the height/width of an element (including padding)

  //:. Scrolling
  // window.scrollTo(s1coords.left + window.screenX, s1coords.top + window.screenY);

  // window.scrollTo({
  //   left: s1coords.left + window.screenX,
  //   top: s1coords.top + window.screenY,
  //   behavior: 'smooth',
  // });
  //:& scrollTo() - scrolls to a particular set of coordinates in the document

  section1.scrollIntoView({ behavior: 'smooth' });
  //:& scrollIntoView() - scrolls to a particular element in the document
});
*/

//: Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //:. Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  //:? Matching strategy - when we have a lot of elements that we want to add the same event listener to, we can use the matching strategy to determine which element originated the event
});

//: Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked)

  //:. Guard clause
  if (!clicked) return;
  //:? Guard clause - a conditional statement that returns early from the function, if a condition is true

  //:. Remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  //:. Active tab
  clicked.classList.add('operations__tab--active');

  //:. Activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//: Menu fade animation
const handleHover = function (e) {
  // console.log(this);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//:. Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//:? Passing argument into handler - we can't pass an argument directly into an event handler, so we use the bind method to create a copy of the handler function with the argument already set, then inside the function we refer to the argument by using the 'this' keyword.

//: Sticky navigation
/* 
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  // console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//: Sticky navigation: Intersection Observer API
/* 
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // setting the checking element to viewport
  threshold: [0, 0.2], // setting the visibility percentage of target between 0% and 20%
};
//:& IntersectionObserver - a constructor that creates a new IntersectionObserver object, which lets us know when an observed element enters or exits the viewport
//:? root - an element that is used for checking visibility of the target, basically the root (in this case: viewport) needs to intersect with the specified target (section1) for the callback to be executed
//:? threshold - a value between 0 and 1 that specifies at what percentage of the target's visibility the observer's callback should be executed

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when zero percent of header is visible trigger callback
  rootMargin: `-${navHeight}px`, // offset by the height of navbar upward from the target
});
headerObserver.observe(header);

//: Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //:? in this case after triggering the action there is no need for further observation of the target
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//: Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // selecting all images which have the property data-src
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //:. Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

//: Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //: Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  //:. Slide movement
  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    //:& translateX() - moves the element along the x-axis by the specified distance

    //:? The slides are moved by the percentage we get from multiplication of the iterator and the current slide number. The first slide has iterator 0, so if the current slide was 0 then the slide would be moved by 0% (100 * 0), the second has iterator 1 so it would be moved by 100%, the third by 200% and so on. In case the current slide was 1 then the first slide would be moved by -100%, the second by 0% and the third by 100%.
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0); // setting the initial position of the slides
    createDots(); // creating dot elements
    activateDot(0); // setting the initial active dot
  };
  init();

  //: Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e)
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//: Selecting, creating and deleting elements
/* 
//:. Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//:. Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analitics.'
message.innerHTML = 'We use cookied for improved functionality and analitics. <button class="btn btn--close-cookie">Got it!</button>';

//:& createElement() - creates a new element with the specified name 
//:& textContent - sets the text content of the specified node, and all its descendants 
//:& innerHTML - sets the HTML content of the specified element 

header.prepend(message);
header.append(message); //:? In this case message was already prepended so appending only moved the existing element to the last position in the DOM

//:& prepend() - adds element as the first child of the parent element
//:& append() - adds element as the last child of the parent element

// header.append(message.cloneNode(true)); // Adding multiple elements by cloning them before appending

// header.before(message);
// header.after(message);

//:& before() - adds element before the parent element 
//:& after() - adds element after the parent element

//:. Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
  // message.parentElement.removeChild(message);
});

//:& remove() - removes the element from the DOM 

//:. Styles
message.style.backgroundColor = '#37383d'; // defining inline style - backgroundColor
message.style.width = '120%';

console.log(message.style.color); // color is defined in a stylesheet
console.log(message.style.backgroundColor); // backgroundColor is defined manually

//:? We can only log an inline style - a style that we set manually ourselves. We can't access styles that are hidden in a class, or that are defined in a stylesheet.

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//:& getComputedStyle() - returns the final CSS value of a property, after applying all stylesheets, and resolving any basic computation

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//:& setProperty() - sets the value of a CSS variable. The first argument is the name of the variable, and the second argument is the value we want to set it to.

//:. Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.designer);

logo.alt = 'Beautiful minimalist logo';

//:. Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//:. Data attributes
console.log(logo.dataset.versionNumber);

//:. Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

//:@ Don't use - it overwrites all the existing classes and allows only one class to exist at a time
logo.className = 'jonas';
*/

//: Types of events and event handlers
/* 
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//:@ old fashion way
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };
*/

//: Event propagation in practice
/* 
// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  console.log(e.currentTarget === this);
  //:& e.currentTarget is the same as this keyword, both point to the element on which the EventListener is attached to.

  //:. Stop propagation
  // e.stopPropagation();
  //:& stopPropagation() - prevents further propagation of the current event in the capturing and bubbling phases
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true
  //:& true - event capturing phase (not used anymore), false - event bubbling phase (default)
);

//:? Event propagation - when an event happens on a particular element, it first runs the handlers on that element, then on its parent and all the way up on previous ancestors.
//:? So when we click on the link, the event first happens on the link element (.nav__link), then bubbles up to the parent element (.nav__links) and so on.Clicking on parent element won't trigger the event on the child element.

//:? In all three handlers the e.target is always the same, because it logs the element where the 'click' action happened
*/

//: DOM Traversing
/* 
const h1 = document.querySelector('h1');

//:. Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // selecting elements with class highlight, that are children of the h1 element
console.log(h1.childNodes);
console.log(h1.children); // returns HTMLCollection of all the children of the h1 element
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//:. Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//:& closest() - returns the closest ancestor of the current element (or the current element itself) which matches the specified selector or group of selectors. Basically it's the opposite of querySelector - it starts from the element itself and then travels up the DOM tree.

//:. Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

//: Lifecycle DOM events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
});

//:& DOMContentLoaded event - fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading

document.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//:& load event - fires when the whole page has loaded, including all dependent resources such as stylesheets, images, and subframes

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

//:& beforeunload event - fires when the document is about to be unloaded. This event allows you to display a message in a confirmation dialog box to inform the user whether they want to stay or leave the current page
