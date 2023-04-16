"use strict";

//Selecting elements
const diceImage = document.querySelector(".dice");
const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");
const p1ScoreEl = document.querySelector("#score--0");
const p2ScoreEl = document.querySelector("#score--1");
// const p2Score2Display = document.getElementById("score--1").textContent; //? Another way of selecting specifically for id

//Buttons
const newGameButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

//Starting conditions
let beginTurn = 0;

let currentScore = 0;
let p1Score = 0;
let p2Score = 0;

diceImage.classList.add("hidden");

//Roll button functionality
const rollAction = function () {
  //1. Generating a random dice roll
  let roll = Math.trunc(Math.random() * 6 + 1);
  // console.log(`Player ${checkTurn() ? 1 : 2} rolled: ${roll}.`);

  //2. Display dice
  diceImage.classList.remove("hidden");
  diceImage.src = `dice-${roll}.png`;

  //3. Check if not rolled 1: true => add points, false => switch to the next player
  if (roll !== 1) {
    checkTurn()
      ? changeCurrent("p1", (currentScore += roll))
      : changeCurrent("p2", (currentScore += roll));
  } else {
    changeTurn();
  }
};

//Hold button functionality
const holdAction = function () {
  // console.log(`Player ${checkTurn() ? 1 : 2} holds.`);

  //1. Sum player's current points
  checkTurn() ? sumTotal("p1") : sumTotal("p2");

  //2. Check whether player wins: true => finish the game, false => switch to the next player
  if (p1Score >= 100) endGame("p1");
  else if (p2Score >= 100) endGame("p2");
  else changeTurn();
};

//New game button functionality
const newAction = function () {
  //Reset everything to the starting phase
  if (checkTurn()) {
    player1El.classList.remove("player--active");
    player1El.classList.remove("player--winner");
  } else {
    player2El.classList.remove("player--active");
    player2El.classList.remove("player--winner");
  }

  changeCurrent("p1", 0);
  changeCurrent("p2", 0);
  changeTotal("p1", 0);
  changeTotal("p2", 0);

  rollButton.addEventListener("click", rollAction);
  holdButton.addEventListener("click", holdAction);

  //Change the starting player
  beginTurn === 0
    ? player2El.classList.add("player--active")
    : player1El.classList.add("player--active");

  //Choose the future starting player
  beginTurn === 0 ? (beginTurn += 1) : (beginTurn -= 1);
};

//Checking if it's player 1's turn
const checkTurn = function () {
  if (player1El.classList.contains("player--active")) return true;
  else return false;
};

//Switching to another player
const changeTurn = function () {
  if (checkTurn()) {
    changeCurrent("p1", 0);
    player1El.classList.remove("player--active");
    player2El.classList.add("player--active");
  } else {
    changeCurrent("p2", 0);
    player2El.classList.remove("player--active");
    player1El.classList.add("player--active");
  }
};

//Changing the amount of current points
const changeCurrent = function (player, score) {
  if (player === "p1") {
    document.querySelector("#current--0").textContent = score;
  } else {
    document.querySelector("#current--1").textContent = score;
  }
  currentScore = score;
};

//Changing the amount of total points
const changeTotal = function (player, score) {
  if (player === "p1") {
    p1Score = score;
    p1ScoreEl.textContent = score;
  } else {
    p2Score = score;
    p2ScoreEl.textContent = score;
  }
};

//Adding points to the total amount
const sumTotal = function (player) {
  if (player === "p1") {
    p1Score += currentScore;
    p1ScoreEl.textContent = p1Score;
  } else {
    p2Score += currentScore;
    p2ScoreEl.textContent = p2Score;
  }
};

//Choosing winner and disabling button functionality
const endGame = function (winner) {
  // console.log(`Player ${checkTurn() ? 1 : 2} WINS!`);
  checkTurn()
    ? player1El.classList.add("player--winner")
    : player2El.classList.add("player--winner");

  rollButton.removeEventListener("click", rollAction);
  holdButton.removeEventListener("click", holdAction);
};

rollButton.addEventListener("click", rollAction);
holdButton.addEventListener("click", holdAction);
newGameButton.addEventListener("click", newAction);
