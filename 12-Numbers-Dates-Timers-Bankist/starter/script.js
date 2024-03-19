'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  const daysPassed = Math.round(calcDaysPassed(date, new Date()));

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBalance = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedBalance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const formattedIncomes = formatCur(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = `${formattedIncomes}`;

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
  const formattedOut = formatCur(out, acc.locale, acc.currency);
  labelSumOut.textContent = `${formattedOut}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const formattedInterest = formatCur(interest, acc.locale, acc.currency);
  labelSumInterest.textContent = `${formattedInterest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };
  // Set timer to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // getting user's local language from the browser
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//: Converting and Checking Numbers
/* 
console.log(23 === 23.0);

// Base 10 - 0 to 9 | 1/10 = 0.1 | 3/10 = 3.333333
// Binary base 2 - 0, 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//:. Conversion
console.log(Number("23"));
console.log(+"23");

//:& Możemy przekonwertować string na liczbe poprzez umieszczenie znaku plus (+) przed stringiem, działa to ponieważ JS zastosuje konwersje typu (type coercion) i automatycznie przekonwertuje wszystkie zmienne na liczby

//:. Parsing
console.log(Number.parseInt("30px", 10)); // => 30
console.log(Number.parseInt("e23", 10)); // => NaN

//:& parseInt - pozbywa się niepotrzebnych symboli, które nie są liczbami, pod warunkiem że string zaczyna się od liczby

console.log(Number.parseInt("2.5rem")); // => 2
console.log(Number.parseFloat("2.5rem")); // => 2.5

//:& parseFloat - działa jak parseInt lecz uwzględnia liczby po przecinku

// console.log(parseFloat("2.5rem"));

//:. Check if value is NaN
console.log(Number.isNaN(20)); // => false
console.log(Number.isNaN("20")); // => false
console.log(Number.isNaN(+"20X")); // => true
console.log(Number.isNaN(23 / 0)); // => false

//:& isNaN - sprawdza czy podana wartość jest NaN (Not a Number) i na tej bazie zwraca true lub false

//:. Checking if value is a number
console.log(Number.isFinite(20)); // => true
console.log(Number.isFinite("20")); // => false
console.log(Number.isFinite(+"20X")); // => false
console.log(Number.isFinite(23 / 0)); // => false

//:& isFinite - sprawdza czy podana wartość jest liczbą po czym zwraca true lub false

console.log(Number.isInteger(23)); // => true
console.log(Number.isInteger(23.0)); // => true
console.log(Number.isInteger(23 / 0)); // => false
*/

//: Math and Rounding
/* 
//:. Square, Square and Cubic Root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

//:. Max & Min value
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.max(5, 18, "23px", 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

//:. PI and Circle Radius
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat("10px") ** 2);

//:. Rand
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max

console.log(randomInt(10, 20));

//:& random() - zwraca losową liczbę z przedziału od 0 do 1

//:. Rounding integers
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor("23.9"));

console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

//:& trunc() - usuwa wszystkie cyfry po przecinku
//:& round() - zaokrągla do najbliższej całkowitej
//:& ceil() - zaokrągla w górę
//:& floor() - zaokrągla w dół

//:. Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // konwersja na liczbe

//:& toFixed() - zaokrągla do podanej ilości miejsc po przecinku i zwraca w postaci string'a
*/

//: The Remainder (Modulo) Operator
/* 
console.log(5 % 2); // Reszta z dzielenia 5 przez 2 => 1
console.log(5 / 2); // => 2.5

console.log(8 % 3);
console.log(8 / 3);

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener("click", function () {
   [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

//:? Ilekroć czynność trzeba wykonać co któryś raz, warto korzystać z operatora reszty
*/

//: Numeric Separators
/* 
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
// const PI = 3._1415; error
// const PI = _3.1415; error
// const PI = 3.1415_; error
// const PI = 3.14__15; error
console.log(PI);

console.log(Number("230_000")); // => NaN
console.log(parseInt("230_000")); // => 230
 
//:? Separatory numeryczne (_) pozwalają na zwiększenie czytelności liczb, nie wpływając na ich wartość
*/

//: Working with BigInt
/* 
console.log(2 ** 53 - 1); //:? The biggest number javascript can safely represent
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(34254385458943857839247839242389n);
//:& Liczby zakończone literą n traktowane są w javascript jako BigInt

console.log(BigInt(34254385458943857839247839242389));
//:& BigInt - funkcja konwertująca podaną wartość na BigInt (z jakiegoś powodu nie zwraca dokładnej wartości przy dużych liczbach)

//:. Operations
console.log(10000n + 10000n);
console.log(362897324819659237461982397461987n * 10000000n);
// console.log(Math.sqrt(16n)) can't calculate roots of BigInts

const huge = 458332940283484328483242332n;
const num = 23;
console.log(huge * BigInt(num));

//:. Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == 20);
console.log(20n == "20");

console.log(huge + " is REALLY big!!!");

//:. Divisions
console.log(11n / 3n);
console.log(10 / 3);
*/

//: Creating Dates
/* 
//:. Create a date
const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2023 03:20"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // months go from 0 to 11: 10 => 'Nov'
console.log(new Date(2037, 10, 31)); //:? => Dec 01 (Javascript autocorrects the date)

console.log(new Date(0)); //:& 0 - ilość milisekund od początku powstania czasu UNIX
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //:& Konwertowanie z dni do milisekund (3 dni w milisekundach)

//:. Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); //:& getTime() - pobieranie timestamp'a z daty

console.log(new Date(21422569800000));

console.log(Date.now()); //:& Logowanie timestamp'a na bieżącą datę

future.setFullYear(2040); // Zmiana/ustawienie właściwości daty
console.log(future);
*/

//: Operations with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

//:? Intl documentation -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

//: Internationalizing Numbers (Intl)
/* 
const num = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:        ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:        ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:        ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options).format(num));

const now = new Date();
console.log(new Intl.DateTimeFormat('pl-PL').format(now));
*/

//: Timers: setTimeout and setInterval

//:. setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`), 3000, ...ingredients);
console.log('Waiting...');

if (ingredients.includes('tomato')) clearTimeout(pizzaTimer);

//:& setTimeout - wywołuje funkcję po określonym czasie (w milisekundach)

//:. setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

//:& setInterval - wywołuje funkcję co określony czas (w milisekundach)
