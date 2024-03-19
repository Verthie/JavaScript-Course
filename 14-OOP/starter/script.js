'use strict';

//: Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //:? Never do this - if there were a lot of instances created each would have to copy this method and that would be bad for performance
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas); // => Person {firstname: "Jonas", birthYear: 1991}

// Steps:
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person); // => true

//: Prototypes

console.log(Person.prototype);

//:. Adding a method to prototype property
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // => 46
matilda.calcAge(); // => 20

console.log(jonas.__proto__); // => the prototype of jonas object
console.log(jonas.__proto__ === Person.prototype); // => true
console.log(Person.prototype.isPrototypeOf(jonas)); // => true
console.log(Person.prototype.isPrototypeOf(matilda)); // => true
console.log(Person.prototype.isPrototypeOf(Person)); // => false

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // => Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // => true
console.log(jonas.hasOwnProperty('species')); // => false
