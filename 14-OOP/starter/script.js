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

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};

Person.hey(); // => 'Hey there 👋'
// jonas.hey(); // => Error
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

//: ES6 Classes

//:. class expression
// const PersonCl2 = class {
//   constructor(firstName, birthYear) {}
// };

//:. class declaration

/*
class personcl {
  constructor(fullname, birthyear) {
    this.fullname = fullname;
    this.birthyear = birthyear;
  }

  // methods will be added to .prototype property
  calcage() {
    console.log(2037 - this.birthyear);
  }

  greet() {
    console.log(`hey ${this.fullname}`);
  }

  get age() {
    return 2037 - this.birthyear;
  }

  set fullname(name) {
    console.log(name);
    if (name.includes(' ')) this._fullname = name;
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
*/

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
/* 
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
*/

//: Inheritance Between "Classes"

//:. Constructor Functions
/* 
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Coumputer Science');
mike.introduce(); // => 'My name is Mike and I study Computer Science'
mike.calcAge(); // => 17

console.log(mike.__proto__); // => Object {introduce: introduce()}
console.log(mike.__proto__.__proto__); // => Object {calcAge: calcAge()}

console.log(mike instanceof Student); // => true
console.log(mike instanceof Person); // => true
console.log(mike instanceof Object); // => true

// console.dir(Student.prototype.constructor);
// => Person(firstName, birthYear)

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
// => Student(firstName, birthYear, course)
*/

//:. ES6 Classes
/* 
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce(); // => 'My name is Martha Jones and I study Computer Science'
martha.calcAge(); // => 35
*/

//:. Object.create
/* 
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.calcAge = function () {
  console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce(); // => 'My name is Jay and I study Computer Science'
jay.calcAge(); // => 27
*/

//: Another Class Example
/* 
class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public Interface == Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // Private methods - Don't work yet
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111); // 'Thanks for opening an account, Jonas'
console.log(acc1); // => Account {owner: 'Jonas', currency: 'EUR', pin: 1111, movements: Array(0), locale: 'en-GB'}

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); // => [250, -140, 1000]
console.log(acc1);

// console.log(acc1.#movements); // => Error
// console.log(acc1.#pin); // => Error

Account.helper(); // => 'Helper'

//: Chaining

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements()); // => [250, -140, 1000, 300, 500, -35, 25000, -4000]
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

//: Coding Challenge #2
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
*/

//: Coding Challenge #3
/*
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism 😉

Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Polymorphism - function in child class overwrites the parent function
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate(); // => Tesla going at 140 km/h, with a charge of 22
tesla.brake(); // => Tesla going at 130 km/h, with a charge of 22
tesla.chargeBattery(90);
tesla.accelerate(); // => Tesla going at 150 km/h, with a charge of 89
tesla.accelerate(); // => Tesla going at 170 km/h, with a charge of 88
*/

//: Coding Challenge #4
/*
Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return this = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}`);
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian.#charge);

rivian.accelerate(); // => Rivian going at 140 km/h, with a charge of 22
rivian.brake(); // => Rivian going at 130 km/h, with a charge of 22
rivian.chargeBattery(90);
rivian.accelerate(); // => Rivian going at 150 km/h, with a charge of 89
rivian.accelerate(); // => Rivian going at 170 km/h, with a charge of 88

rivian.accelerate().brake().brake().accelerate().accelerate().accelerate().brake().chargeBattery(90).accelerate();
console.log(rivian.speedUS);