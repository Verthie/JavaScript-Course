"use strict";

/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "🎉 Correct Number!"; // changing the text content 
// console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 23; // changing a value
console.log(document.querySelector(".guess").value);
*/

let secretNumber;
let score = 20;
let highscore = 0;

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

const changeStyle = function (bgc, width) {
  document.querySelector("body").style.backgroundColor = bgc;
  document.querySelector(".number").style.width = width;
};

const changeScore = (score) =>
  (document.querySelector(".score").textContent = score);

const generateSecretNumber = () =>
  (secretNumber = Math.trunc(Math.random() * 20 + 1));

const displaySecretNumber = (parameter) =>
  (document.querySelector(".number").textContent = parameter);

generateSecretNumber();
// Check button functionality
document.querySelector(".check").addEventListener("click", function () {
  // using Number() to convert a string type to a number type
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage("⛔ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    displaySecretNumber(secretNumber);
    if (highscore < score) {
      displayMessage("🎉 Correct number! New Highscore!");
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    } else {
      displayMessage("🎉 Correct number!");
    }

    changeStyle("#60b347", "30rem");
    // When guess is out of range
  } else if (guess > 20 || guess < 1) {
    displayMessage("❗Out of range!");

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high! 📈" : "Too low! 📉");
    }
    score--;
    changeScore(score);
  } else {
    displayMessage("💥 You Lost!");
    changeScore(0);
  }
});

// Again button functionality
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  changeScore(score);
  generateSecretNumber();
  displaySecretNumber("?");
  document.querySelector(".guess").value = "";

  changeStyle("#222", "15rem");
  displayMessage("Start guessing...");
});
