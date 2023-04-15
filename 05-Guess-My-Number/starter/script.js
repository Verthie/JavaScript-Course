"use strict";

/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "🎉 Correct Number!"; //? changing the text content 
// console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 23; //? changing a value
console.log(document.querySelector(".guess").value);
*/

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
document.querySelector(".number").textContent = secretNumber;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value); //? using Number() to convert a string type to a number type
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector(".message").textContent = "⛔ No number!";
  } else if (guess === secretNumber) {
    // Own addition
    if (highscore < score) {
      document.querySelector(".message").textContent =
        "🎉 Correct number! New Highscore!";
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    } else {
      document.querySelector(".message").textContent = "🎉 Correct number!";
    }
  } else if (guess > 20 || guess < 1) {
    document.querySelector(".message").textContent = "❗Out of range!"; // Own addition
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too high! 📉";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You Lost!";
      document.querySelector(".score").textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too low! 📈";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You Lost!";
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Own addition
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  document.querySelector(".score").textContent = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".number").textContent = secretNumber;
});
