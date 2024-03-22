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

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};

Person.hey(); // => 'Hey there 👋'
// jonas.hey(); // => Error

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

//: ES6 Classes

//:. class expression
// const PersonCl2 = class {
//   constructor(firstName, birthYear) {}
// };

//:. class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica); // => PersonCl {firstName: "Jessica", birthYear: 1996}

jessica.calcAge(); // => 41
console.log(jessica.__proto__ === PersonCl.prototype); // => true

console.log(jessica.age); // => 41

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
console.log(walter.fullName); // => "Walter white"

PersonCl.hey(); // => 'Hey there 👋'

//: Setters and Getters
/* 
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // => 300

account.latest = 50;
console.log(account.movements); // => [200, 530, 120, 300, 50]
*/

//: Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven); // => empty object {} with a prototype and calcAge property

steven.name = 'Steven';
steven.birthYear = '2002';
steven.calcAge(); // => 35

console.log(steven.__proto__); // => PersonProto object
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge(); // => 58

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
*/

//: Challenge #2
/*
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  break() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this._speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford.speedUs); // => 75 mi/h (120 / 1.6)
ford.accelerate(); // 130 km/h
ford.accelerate(); // 140 km/h
ford.break(); // 135k m/h
ford.speedUs = 50; // speedUs set to 50 mi/h
console.log(ford.speed); // => 80 km/h (50 * 1.6)
