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
