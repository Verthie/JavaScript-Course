"use strict";

//: Default Parameters
/* 
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //:@ ES5:
  //:@ numPassengers = numPassengers || 1;
  //:@ price = price || 199;

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
//:? Wartości domyślne są przypisywane od lewej do prawej, tak więc jeśli chcemy pominąć argument (nie przypisywać własnej wartości), musimy podać undefined.
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

checkIn(flight, jonas); // const flightNum = flight; const passenger = jonas;
console.log(flight); // returns the original value - "LH234"
console.log(jonas); // returns jonas object with changed values, as in function

//:? Kiedy przesyłamy zmienną do funkcji tworzymy kopię jej wartości. Zmieniając wartość skopiowanej zmiennej nie wpływamy na oryginalną zmienną.
//:? Przy modyfikacji obiektu w funkcji referencja odnosi się do oryginalnego obiektu, tak więc zmiana wartości powoduje zmianę globalną. Co za tym idzie, w przypadku obiektów nie klonujemy obiektu, tylko uzyskujemy jego referencje.

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

//:. Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is the best!", upperFirstWord);
transformer("Javascript is the best!", oneWord);

//:? Funkcja transformująca dba tylko o wyświetlenie przekształconego ciągu znaków, w tym celu wywołuje inną funkcję, która wykonuje proces przekształcania (upperFirstWord, oneWord).
//:? Kiedy istnieje funkcja, przyjmująca inne funkcje jako parametry, nazywana jest ona "funkcją wyższego rzędu"(higher - order function), funkcje wywoływane wewnątrz nich nazywane są "funkcjami zwrotnymi"(callback functions).

//:* JS uses callbacks all the time
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
//:? Funkcja greet zwraca funkcje co powoduje przypisanie function (name) {...} do greeterHey ==> const greeterHey = function (name) {...}.
//:? Funkcja zwrotna 'greeterHey' ma dostęp do zmiennej greeting, która została przekazana do funkcji wyższego rzędu 'greet', dlatego jest w stanie wyświetlić powitanie.

greet("Hello")("Jonas");
//:? W tym przypadku funkcja greet zwraca funkcję, która jest od razu wywoływana z parametrem name.
 
//:. Challenge - my attempt:
// const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
// console.log(greetArrow("Hello")("Jakub"));
// prints undefined at the end because of console log 

//:. Challenge - jonas:
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArr("Hi")("Jonas");
*/

//: The call and apply Methods
/* 
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
//:@ Not used that much anymore:
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

//:& Because it's the same thing as:
book.call(swiss, ...flightData);
*/
//: The bind Method
/* 
//:@ book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
bookEW(23, "Steven Williams");

//:? Funkcja 'bind' ZWRACA (nie wywołuje) nową funkcję, która jest kopią funkcji book, ale z przypisanym 'this' do obiektu eurowings. Funkcja bookEW jest teraz funkcją ZWROTNĄ, która może być wywoływana.
//:? Funkcje call i apply są funkcjami natychmiastowymi, wywołują one funkcję odnosząc się do obiektu za pomocą podanego parametru, natomiast bind tworzy kopię funkcji z przypisanym obiektem.

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Schedtmann");
bookEW23("Martha Cooper");
//:? Funkcja bind może również przyjmować argumenty, które są przekazywane do funkcji zwrotnej.

//:. With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//:# lufthansa.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
//:? W tym przypadku funkcja zwrotna jest wywoływana przez event listener odnoszącego się do obiektu querySelector(".buy"), dlatego 'this' wskazuje na element DOM (buy button), a nie na obiekt lufthansa. Musimy użyć funkcji bind, aby przypisać 'this' do obiektu lufthansa.

//:. Partial  application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//:@ addVat = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge attempt - creating the above function, using function returning function rather than bind
const addTaxCh = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVATCh = addTaxCh(0.23);
console.log(addVATCh(100));
console.log(addVATCh(23));
*/

//: Coding Challenge #1
/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.

Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
  1.1. Display a prompt window for the user to input the number of the
  selected option. The prompt should look like this:
      What is your favourite programming language?
      0: JavaScript
      1: Python
      2: Rust
      3: C++
      (Write option number)

  1.2. Based on the input number, update the 'answers' array property. For
  example, if the option is 3, increase the value at position 3 of the array by 1
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]

Hints: Use many of the tools you learned about in this and the last section 😉
GOOD LUCK 😀
*/

/* 
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
};
*/

//:. My attempt
/* 
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let favlang = prompt(`${this.question}\n${this.options[0]}\n${this.options[1]}\n${this.options[2]}\n${this.options[3]}\n(Write option number)`);

    // let [js, python, rust, cpp] = [...this.answers];

    switch (favlang) {
      case "0":
        js++;
        break;
      case "1":
        python++;
        break;
      case "2":
        rust++;
        break;
      case "3":
        cpp++;
        break;
      default:
        return;
    }
    this.answers = [js, python, rust, cpp];
    // console.log(this.answers);
    // console.log(`js: ${js}, python: ${python}, rust: ${rust}, cpp: ${cpp}`);
    displayResults.call(this, undefined);
  },
};

let [js, python, rust, cpp] = [...poll.answers];

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

const displayResults = function (type = "array") {
  if (type === "array") console.log(poll.answers);
  else if (type === "string") {
    console.log(`Poll results are ${js}, ${python}, ${rust}, ${cpp}`);
  }
};

arr1 = [5, 2, 3];
arr2 = [1, 5, 3, 9, 6, 1];
// How the fuck am I supposed to do that with this function???
*/

//:. Jonas attempt
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;

    console.log(this.answers);
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

// poll.registerNewAnswer();

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
