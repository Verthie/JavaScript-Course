'use strict';

// Constructor function always start with a capital letter
// Arrow function won't work as constructor function because it dosn't have its own 'this' keyword
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this - if there were a lot of instances created each would have to copy this method and that would be bad for performance
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
