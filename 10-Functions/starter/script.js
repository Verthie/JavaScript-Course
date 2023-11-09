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

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking('LH123', undefined, 1000)
*/

//: How Passing Arguments Works: Value vs. Reference

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

//:? Kiedy przesyłamy zmienną do funkcji tworzymy kopię jej wartości. Zmieniając wartości tej zmiennej nie wpływamy na oryginalną zmienną.
//:? Przy modyfikacji obiektu w funkcji referencja odnosi się do oryginalnego obiektu, tak więc zmiana wartości powoduje zmianę globalną.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

//:? W języku javascript nie istnieje pojęcie pass-by-reference, funkcja otrzymuje adres do obiektu w postaci wartości, tak więc otrzymuje referencje do obiektu, ale nie jest ona podawana poprzez referencję (by-reference), tylko poprzez wartość (by-value).

