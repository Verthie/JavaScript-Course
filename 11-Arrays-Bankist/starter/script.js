"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//:. Creating DOM Elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  //:& innerHTML - zwraca lub ustawia HTML dla danego elementu

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);

    //:& insertAdjacentHTML - wstawia kod HTML w określonym miejscu w stosunku do elementu
  });
};
displayMovements(account1.movements);

//: Computing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* 
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]); 
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//: Simple Array Methods
/* 
let arr = ["a", "b", "c", "d", "e"];

//:. SLICE
console.log(arr.slice(2)); // Zwraca nową tablicę z elementami c,d,e
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Zwraca kopię tablicy
console.log([...arr]); // To samo

//:& slice() - zwraca nową tablicę składającą się z elementów oryginalnej tablicy. Przedział elementów podawany jest jako argument metody

//:. SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//:& splice() - działa jak slice(), lecz dodatkowo modyfikuje (mutuje) oryginalną tablicę - nie zawiera ona elementów, które zostały przekazane do nowej tablicy

//:. REVERSE
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

//:& reverse() - modyfikuje tablice poprzez odwrócenie kolejności jej elementów

//:. CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // To samo

//:& concat() - zwraca nową tablicę składającą się z elementów dwóch lub większej ilości tablic

//:. JOIN
console.log(letters.join(" - "));
*/

//: The new at method
/* 
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//:& at() - zwraca element tablicy o podanym indeksie

// metody pobierania ostatniego elementu tablicy
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log("jonas".at(0));
console.log("jonas".at(-1));
*/

//: Looping Arrays: forEach
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log("---- FOREACH ----");
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

//:& forEach() - metoda iterująca po tablicy, przyjmuje funkcję zwrotną jako argument i wywołuje ją dla każdego elementu tablicy. Z pętli foreach nie da się wyjść (break) ani jej kontynuować (continue), zawsze przechodzi ona przez całą tablicę.

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
*/

//: forEach with Maps and Sets
/* 
// Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

//: Data Transformations: map, filter, reduce

//:& map jest podobne do forEach, ale zwraca nową tablicę, zawierającą wyniki wywołania funkcji zwrotnej dla każdego elementu tablicy, gdzie forEach wykonuje jedynie operacje na elementach tablicy

//:& filter - zwraca nową tablicę zawierającą elementy, dla których funkcja zwrotna zwróciła wartość true

//:& reduce - zwraca pojedynczą wartość obliczoną na podstawie elementów tablicy

//:? map, filter, reduce - są metodami wyższego rzędu, ponieważ przyjmują funkcję zwrotną jako argument

//: The map Method
/* 
const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
  // return 23;
});

// arrow function of the above
const movementsUSDarr = movements.map((mov) => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDarr);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/

//: Coding Challenge #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐊")
4. Run the function for both test datasets

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7],
Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3],
Kate's data [10, 5, 6, 1, 4]

Hints: Use tools from all lectures in this section so far 

🐊 GOOD LUCK
*/
/* 
const checkDogs = function (dogsJulia, dogsKate) {
  const shallowJulia = dogsJulia.slice(1, dogsJulia.length - 2);

  // Solution using the splice method:
  // const shallowJulia = dogsJulia.slice();
  // shallowJulia.splice(0, 1);
  // shallowJulia.splice(-2);

  const bothArrays = [...shallowJulia, ...dogsKate];
  bothArrays.forEach(function (dog, i) {
    const ageCheck =
      dog < 3 ? "still a puppy" : `an adult, and is ${dog} years old`;
    const message = `Dog number ${i + 1} is ${ageCheck}`;
    console.log(message);
  });
};

const dataOneJulia = [3, 5, 2, 12, 7];
const dataOneKate = [4, 1, 15, 8, 3];
const dataTwoJulia = [9, 16, 6, 8, 3];
const dataTwoKate = [10, 5, 6, 1, 4];

console.log("======================DATA1======================");
checkDogs(dataOneJulia, dataOneKate);
console.log("======================DATA2======================");
checkDogs(dataTwoJulia, dataTwoKate);
*/
