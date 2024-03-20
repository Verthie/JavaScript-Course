'use strict';

//: Constructor Functions and the new Operator
/* 
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
*/

//: Prototypes
/* 
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
*/

//: Prototypal Inheritance on Built-In Objects
/* 
console.log(jonas.__proto__); // => prototype of jonas object
console.log(jonas.__proto__.__proto__); // => prototype of Object
console.log(jonas.__proto__.__proto__.__proto__); // => null

console.dir(Person.prototype.constructor); // => Person() function

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__); // => prototype of the array
console.log(arr.__proto__ === Array.prototype); // => true
console.log(arr.__proto__.__proto__); // => prototype of Object

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

console.dir((x) => x + 1);
*/

//: Coding Challenge #1
/* 
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
