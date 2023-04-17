"use strict";

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = "Steven";

      // Reassigning outer scope's variable
      output = "NEW OUTPUT!";

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3)); //:? only works when strict mode is disabled, but it shouldn't work based on the scope
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = "Jonas";
calcAge(1991);
// console.log(age);
// printAge();

//////////////////////////////

// Variables
console.log(me); //:? works because var is stored globally and can be accessed from anywhere, that's why it should be avoided
// console.log(job); //:? error
// console.log(year); //:? error

var me = "Jonas";
let job = "teacher";
const year = 1991;

// Functions
console.log(addDecl(2, 3)); //:? declared function can be accessed from anywhere
// console.log(addExpr(2, 3)); //:? function expression needs to be defined before use
console.log(addArrow); //:? arrow function also needs to be defined before use
console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example //:! of what shouldn't be done
console.log(numproducts); //:? undefined - when accessing var variable before definition they're labeled as undefined
if (!numProducts) deleteShoppingCart(); //:? if (!undefined) => true -- undefined is a falsy value

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //:? true -- var is stored in window object (global)
console.log(y === window.y); //:? false
console.log(z === window.z); //:? false

/////////////////////////////

console.log(this); //:? this === undefined

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1991);

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this); //:? this === global (window object) -- this in arrow function inherits the object of its parent
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); //:? this === jonas
    console.log(2037 - this.year); //:? this.year === jonas.year
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = jonas.calcAge; //:? method borrowing => taking method from one object and adding to another
matilda.calcAge();

const f = jonas.calcAge;
f();

*/

/////////////////////////////

//:! var firstName = 'Matilda'; //don't do that, it assigns the variable firstName globally

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year); //:? this === jonas -- the calcAge function's object is jonas

    // Solution 1
    // const self = this; // self or that //:? in order to call the object in lower level we assign variable to it within calcAge function
    // const isMillenial = function () {
    //   console.log(self); //:? self === jonas
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996); //:? this === undefined -- this only responds to the object in the same level
    // };
    // isMillenial();

    // Solution 2
    const isMillenial = () => {
      console.log(this); //:? this === jonas -- arrow function inherits the parent's object (1 level above)
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this); //:? this === global -- arrow function is within jonas object, but it inherits the object 1 level above (window object)
    console.log(`Hey ${this.firstName}`); //:? global.firstname === undefined
    //:! if there was a var firstName = 'Matilda' it wouldn't be 'undefined' in global, its value would be 'Matilda'
  },
};
jonas.greet();
jonas.calcAge();

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments); //:? arguments keyword allows to add more parameters than specified in the brackets of the function
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
