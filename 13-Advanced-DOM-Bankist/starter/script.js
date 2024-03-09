'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  /* 
  console.log(e.target.getBoundingClientRect());
  //:& e.target - the element that the event was fired on (in this case the button)
  //:& getBoundingClientRect() - returns the size of an element and its position relative to the viewport

  console.log('Current scroll (X/Y)', window.screenX, window.screenY);
  //:& window.screenX / Y - returns the horizontal/vertical coordinate of the window (browser - np. firefox) relative to the screen (monitor)

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  //:& clientHeight / Width - returns the height/width of an element (including padding)
  */

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

header.prepend(message);
header.append(message); //:? In this case message was already prepended so appending only moved the existing element to the last position in the DOM

//:& prepend() - adds element as the first child of the parent element
//:& append() - adds element as the last child of the parent element

// header.append(message.cloneNode(true)); // Adding multiple elements by cloning them before appending

// header.before(message);
// header.after(message);

//:. Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
  // message.parentElement.removeChild(message);
});

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

//:. Don't use - it overwrites all the existing classes and allows only one class to exist at a time
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
//:? So when we click on the link, the event first happens on the link element(.nav__link), then bubbles up to the parent element(.nav__links), and so on.Clicking on parent element won't trigger the event on the child element.

//:? In all three handlers the e.target is always the same, because it logs the element where the 'click' action happened
*/
