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

//: Creating DOM Elements

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  //:& innerHTML - zwraca lub ustawia HTML dla danego elementu

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);

    //:& insertAdjacentHTML - wstawia kod HTML w określonym miejscu w stosunku do elementu
  });
};

//: Computing Usernames

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  // labelBalance.innerHTML = calculateBalance;
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // const interest = movements
  //   .filter((mov) => mov > 0)
  //   .reduce((acc, mov) => acc + mov * 0.012, 0);
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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
// console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc.movements);
};

// Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }

  //:& e.preventDefault() - zapobiega zgłaszaniu formularza po naciśnięciu przycisku co jest domyślną akcją wykonywaną przy elementach typu 'form'
  //:? umieszczamy to ponieważ domyślnie akcja ta skutkuje w odświeżeniu całej strony i restarcie aplikacji
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  const canTakeLoan = currentAccount.movements.some(
    (mov) => mov >= amount * 0.1
  );

  if (amount && canTakeLoan) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    //:& findIndex - działa jak metoda find lecz zamiast elementu zwraca jego index
    //:@ indexOF(23) - indexOf to prostsza wersja metody findIndex, która nie pozwala na skomplikowane warunki, jedyne co robi to szuka podanego elementu w tablicy

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
//:. Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//:. Set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

//: Data Transformations: map, filter, reduce

//:& map() - jest podobne do forEach, ale zwraca nową tablicę, zawierającą wyniki wywołania funkcji zwrotnej dla każdego elementu tablicy, gdzie forEach wykonuje jedynie operacje na elementach tablicy

//:& filter() - zwraca nową tablicę zawierającą elementy, dla których funkcja zwrotna zwróciła wartość true

//:& reduce() - zwraca pojedynczą wartość obliczoną na podstawie elementów tablicy

//:? map(), filter(), reduce() - są metodami wyższego rzędu, ponieważ przyjmują funkcję zwrotną jako argument

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

//: The filter Method
/* 
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
*/

//: The reduce Method
/* 
console.log(movements);

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//:. Maximum value
const maxim = movements.reduce(
  (max, cur) => (max > cur ? max : cur),
  movements[0]
);
console.log(maxim);

//:? accumulator (acc) można porównać do akamulatora ładowanego elektrycznie. Jak akumulator akumuluje elektryczność tak accumulator akumuluje wartości
*/

//: The Magic of Chaining Functions
/* 
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//:? Metody mogą być łączone dopóki poprzednia zwraca w wyniku nową tablicę (po metodzie reduce() nie można łączyć kolejnych metod)
*/

//: The find Method
/* 
const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

//:& find() - zwraca pierwszą wartosć z tablicy, która spełnia podany warunek

// console.log(accounts);

//:. Finding object based on its property
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

// implementation using for-of loop
let daAccount = {};
for (const acc of accounts) {
  if (acc.owner === "Jessica Davis") daAccount = acc;
}
// console.log(daAccount);
*/

//: some and every
/* 
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

//:. SOME - CONDITION
console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

//:& some() - sprawdza czy warunek jest prawdziwy dla przynajmniej jednego elementu w tablicy po czym zwraca true lub false

//:. EVERY
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

//:& every() - sprawdza czy warunek jest prawdziwy dla wszystkich elementów w tablicy po czym zwraca true lub false

//:. Seperate callback
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
// Może być wykorzystywane żeby nie powtarzać tego samego kodu
*/

//: flat and flatMap

//:. flat
/* 
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); //going 1 level deep
console.log(arrDeep.flat(2)); //going 2 levels deep

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance);

//:& flat() - usuwa zagnieżdżone tablice i 'spłaszcza' całą tablice

//:. flatMap
const overallBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance2);

//:& flatMap() - łączy funkcjonalność metod flat oraz map, powstała gdyż są one często używane razem, tak więc funkcja ta istnieje jedynie w ramach optymalizacji

//:? Trzeba pamiętać że flatMap() wchodzi jedynie na głębokość 1 poziomu, jeżeli wymagane jest zejście w głębsze poziomy trzeba zastosować metodę flat()
*/

//: Sorting Arrays

//:. Strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

//:& sort() - konwertuje elementy tablicy na stringi, a następnie sortuje tablice po stringach alfabetycznie. Metoda ta mutuje oryginalną tablice

//:. Numbers
console.log(movements);
// console.log(movements.sort()); // przez to że liczby zostają przekonwertowane na stringi a następnie sortowane to kolejność wygląda tak: -1, -2, -3, 1, 2, 3, ...

//:? Jeżeli sort() otrzyma od funkcji zwrotnej wartość większą niż 0 przy porównaniu dwóch liczb to zamieni je miejscami, jeżeli mniejszą niż 0 to pozostawi je w miejscu
//:? pozwala to na stworzenie warunków dzięki którym funkcja sort będzie wiedziała że ma zmienić miejsca danych wartości, jak na przykład w przypadku liczb całkowitych
// return < 0 => A, B (keep order)
// return > 0 => B, A (switch order)

//:. Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

//:. Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

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
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7],
Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3],
Kate's data [10, 5, 6, 1, 4]

Hints: Use tools from all lectures in this section so far 😉

😀 GOOD LUCK
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
      dog < 3 ? "still a puppy 🐶" : `an adult, and is ${dog} years old`;
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

//: Coding Challenge #2
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/
/* 
const calcAverageHumanAge = function (ages) {
  const inHumanYears = ages.map((dogAge) =>
    dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge
  );
  const adultDogs = inHumanYears.filter((dogAge) => dogAge >= 18);
  console.log(inHumanYears);
  console.log(adultDogs);

  const avgAgeOfDogs =
    adultDogs.reduce((acc, dogAge) => acc + dogAge, 0) / adultDogs.length;
  return avgAgeOfDogs;

  //const avgAgeOfDogs =
  //  adultDogs.reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0) / adultDogs.length;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

//: Coding Challenge #3
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* 
const calcAverageHumanAge = (ages) =>
  ages
    .map((dogAge) => (dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge))
    .filter((dogAge) => dogAge >= 18)
    .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
