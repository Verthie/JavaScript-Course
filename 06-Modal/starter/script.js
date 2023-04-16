"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  console.log("Button clicked");
  modal.classList.remove("hidden"); //? displaying modal by removing the hidden class
  // modal.style.display = 'block' //? another (worse) way of doing that
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

console.log(btnsOpenModal);

//All Modal Buttons Functionality
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/* Own tests
//Modal button 1
btnsOpenModal[0].addEventListener("click", function () {
  console.log("Ohayo! From Button 1");
});

//Modal button 2
btnsOpenModal[1].addEventListener("click", function () {
  console.log("Ohayo! From Button 2");
});

//Modal button 3
btnsOpenModal[2].addEventListener("click", function () {
  console.log("Ohayo! From Button 3");
});
*/
