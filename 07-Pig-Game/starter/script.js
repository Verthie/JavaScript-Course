"use strict";

let roll;
let beginTurn = 0;

let p1Current = 0;
let p2Current = 0;
let p1Score = 0;
let p2Score = 0;

const image = document.querySelector(".dice");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

//Buttons
const newGameButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

const rollAction = function () {
  roll = Math.trunc(Math.random() * 6 + 1);
  console.log(`Player ${checkTurn() ? 1 : 2} rolled: ${roll}.`);
  if (roll !== 1) {
    checkTurn()
      ? changeCurrent("p1", (p1Current += roll))
      : changeCurrent("p2", (p2Current += roll));
  } else {
    changeTurn();
  }
};

const holdAction = function () {
  console.log(`Player ${checkTurn() ? 1 : 2} holds.`);
  checkTurn() ? sumTotal("p1") : sumTotal("p2");
  if (p1Score >= 100) endGame("p1");
  else if (p2Score >= 100) endGame("p2");
  else changeTurn();
};

const newAction = function () {
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  beginTurn === 0
    ? player2.classList.add("player--active")
    : player1.classList.add("player--active");

  changeCurrent("p1", 0);
  changeCurrent("p2", 0);
  changeTotal("p1", 0);
  changeTotal("p2", 0);

  rollButton.addEventListener("click", rollAction);
  holdButton.addEventListener("click", holdAction);

  beginTurn === 0 ? (beginTurn += 1) : (beginTurn -= 1);
};

const checkTurn = function () {
  if (player1.classList.contains("player--active")) return true;
  else return false;
};

const changeTurn = function () {
  if (checkTurn()) {
    changeCurrent("p1", 0);
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  } else {
    changeCurrent("p2", 0);
    player2.classList.remove("player--active");
    player1.classList.add("player--active");
  }
};

const changeCurrent = function (player, score) {
  if (player === "p1") {
    p1Current = score;
    document.querySelector("#current--0").textContent = score;
  } else {
    p2Current = score;
    document.querySelector("#current--1").textContent = score;
  }
};

const changeTotal = function (player, score) {
  if (player === "p1") {
    p1Score = score;
    document.querySelector("#score--0").textContent = score;
  } else {
    p2Score = score;
    document.querySelector("#score--1").textContent = score;
  }
};

const sumTotal = function (player) {
  if (player === "p1") {
    p1Score += p1Current;
    document.querySelector("#score--0").textContent = p1Score;
  } else {
    p2Score += p2Current;
    document.querySelector("#score--1").textContent = p2Score;
  }
};

const endGame = function (winner) {
  console.log(`Player ${checkTurn() ? 1 : 2} WINS!`);
  if (checkTurn()) {
    player1.classList.add("player--winner");
    player1.classList.remove("player--active");
  } else {
    player2.classList.add("player--winner");
    player2.classList.remove("player--active");
  }
  rollButton.removeEventListener("click", rollAction);
  holdButton.removeEventListener("click", holdAction);
};

rollButton.addEventListener("click", rollAction);
holdButton.addEventListener("click", holdAction);
newGameButton.addEventListener("click", newAction);
