"use strict";

//:* Basically about how scope, functions, primitives and objects operate in JS

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with the same name as outer scope's variable (local variable)
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
    console.log(millenial); //:? can be accessed outside of the function because 'var' was used to define it - that's why we should avoid it
    // console.log(add(2, 3)); //:? works when strict mode is disabled, it shouldn't work based on the scope - that's why strict mode should always be enabled
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = "Jonas";
calcAge(1991);
// console.log(age); 
//:? there's no access to the age variable since it's a local variable defined in the calcAge() function
// printAge();

//////////////////////////////

//:2 Variables
console.log(me); //:? works because var is stored globally and can be accessed from anywhere, that's why it should be avoided
// console.log(job); // error - job can't be accessed before initialization
// console.log(year); // error - year can't be accessed before initialization

var me = "Jonas";
let job = "teacher";
const year = 1991;

//:2 Functions
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

//:! Example (of what shouldn't be done)
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

/////////////////////////////

// var firstName = 'Matilda'; //:! 1: don't do that, it assigns the variable firstName globally

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
      console.log(this); //:? this === jonas -- arrow function inherits 'this' of the parent function (1 level above), 'this' acts as if it was called in calcAge()
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this); //:? this === global -- in this case the arrow function inherits 'this' outside the calcAge() function, so this refers to the window object
    console.log(`Hey ${this.firstName}`); //:? global.firstname === undefined
    //:! 1: if there was a var firstName = 'Matilda' it wouldn't be 'undefined' in global, its value would be 'Matilda'
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

*/

// Primitive types
let lastName = "Williams";
let oldLastName = lastName; //:? both variables refer to the same address with value "Williams"
lastName = "Davis"; //:? now variable lastName refers to a different address with value "Davis"
console.log(lastName, oldLastName); //:? both variables refer to different addresses which refer to different values

// Reference types //:* important
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica; //:? Both variables refer to the same address, the address points to the reference for the object, we don't create new object just pass the reference
marriedJessica.lastName = "Davis"; //:? The value is passed to the reference, not directly to the object - because of that change of value happens in the same object for both variables

console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2); //:? assigning the jessica2 object to the new empty object, then applying it to the jessicaCopy variable
jessicaCopy.lastName = "Davis"; //:? change happens only in the jessicaCopy object

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

console.log("Before marriage: ", jessica2);
console.log("After marriage: ", jessicaCopy); //:? The array is the same in both objects since assigning works only for first-level parameters

//:? array is simmilar to object, it is a reference type so the changes were passed to the reference of the array and not directly to the array

//:* Important: objects, arrays and functions are reference types
