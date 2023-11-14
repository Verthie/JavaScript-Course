"use strict";

//: Default Parameters
/* 
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //:@ ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};
//:? W ES6 możemy przypisać wartości domyślne do argumentów funkcji. Wartości domyślne są przypisywane tylko wtedy, kiedy argument nie jest podany lub jest undefined.
//:? Wartości domyślne mogą być wyrażeniami, tak jak w przypadku zmiennej price.
createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking('LH123', undefined, 1000)
//:? Wartości domyślne są przypisywane od lewej do prawej, tak więc jeśli chcemy pominąć argument (nie przypisywać żadnej wartości), musimy podać undefined.
*/

//: How Passing Arguments Works: Value vs. Reference
/*
const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 24739479284) {
    alert("Checked in");
  } else {
    alert("Wrong passport!");
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Is the same as doing...
const flightNum = flight;
const passenger = jonas;

//:? Kiedy przesyłamy zmienną do funkcji tworzymy kopię jej wartości. Zmieniając wartość tej zmiennej nie wpływamy na oryginalną zmienną.
//:? Przy modyfikacji obiektu w funkcji referencja odnosi się do oryginalnego obiektu, tak więc zmiana wartości powoduje zmianę globalną. Tak więc, w przypadku obiektów nie kopiujemy całego obiektu, tylko jego referencje.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

//:? W języku javascript nie istnieje pojęcie pass-by-reference, funkcja otrzymuje adres do obiektu w postaci wartości, tak więc otrzymuje referencje do obiektu, ale nie jest ona podawana poprzez referencję (by-reference), tylko poprzez wartość (by-value).
*/

//: Functions Accepting Callback Functions
/* 
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is the best!", upperFirstWord);
transformer("Javascript is the best!", oneWord);

//:? Funkcja transformująca dba tylko o wyświetlenie przekształconego ciągu znaków, w tym celu wywołuje inną funkcję, która wykonuje proces przekształcania (upperFirstWord, oneWord).
//:? Kiedy istnieje funkcja, przyjmująca inne funkcje jako parametry, nazywana jest ona "funkcją wyższego rzędu"(higher - order function), funkcje wywoływane wewnątrz nich nazywane są "funkcjami zwrotnymi"(callback functions).

// JS uses callbacks all the time
const high5 = function () {
  console.log("🖐️");
};
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);

//:? Zarówno funkcja addEventListener jak i forEach są funkcjami wyższego rzędu.
//:? high5 jest funkcją zwrotną.
*/

//: Functions Returning Functions
/* 
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
//:? Funkcja greet zwraca funkcje co powoduje przypisanie function (name) {...} do greeterHey: const greeterHey = function (name) {...}.
//:? Funkcja zwrotna 'greeterHey' ma dostęp do zmiennej greeting, która została przekazana do funkcji wyższego rzędu 'greet', dlatego jest w stanie wyświetlić powitanie.

greet("Hello")("Jonas");
//:? W tym przypadku funkcja greet zwraca funkcję, która jest od razu wywoływana z parametrem name.
 
//Challenge - my attempt:
// const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
// console.log(greetArrow("Hello")("Jakub"));
//prints undefined at the end because of console log 

//Challenge - jonas:
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArr("Hi")("Jonas");

//:? W tym przypadku greet jest funkcją wyższego rzędu, a funkcja zwracana jest wywoływana z parametrem name.
//:? Funkcja zwrotna ma dostęp do zmiennej greeting, która została przekazana do funkcji wyższego rzędu (closures).
*/

//: The call and apply Methods

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //:? W ES6 możemy pominąć słowo function, jeśli funkcja jest częścią obiektu (Section 9).
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// przypisujemy do parametru book funkcję 'book' z obiektu lufthansa

// book(23, "Sarah Williams");
//:? takie wywołanie funkcji nie działa, ponieważ wskazuje ono aktualnie na obiekt 'undefined'. 'this' w funkcji nie jest przypisane do żadnego obiektu dla takiego wywołania.

//:. Call method
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

//:? funkcja 'call' wywołuje funkcję book, ale zmienia jej 'this' na obiekt eurowings za pomocą pierwszego parametru. W ten sposób możemy wykorzystać funkcję book, która jest częścią obiektu lufthansa, na obiekcie eurowings (bez potrzeby kopiowania całej funkcji do kolejnego obiektu).

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "EW",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

//:. Apply method
//:@ Not used that much anymore
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

//:& because it's the same thing as
book.call(swiss, ...flightData);
