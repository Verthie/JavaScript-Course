'use strict';

//: Enchanced Objects literals
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//: String Methods Practice
/* 
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = (str) => str.slice(0, 3).toUpperCase();

// console.log(flights.replaceAll("_", " ").split("+"));
const list = flights.replaceAll("_", " ").split("+");
for (const flight of list) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.includes("Delayed") ? "🔴" : ""}${type} from ${getCode(
    from
  )} to ${getCode(to)} (${time.replace(":", "h")})`.padStart(45);
  console.log(output);
}
*/

//: Working With Strings - Part 3
/* 
// Split and join
console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); //:& Another solution
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("jessica ann smith davis");
capitalizeName("jonas schmedtmann");

// Padding
const message = "Go to gate 23!";
console.log(message.padStart(25, "+"));
console.log("Jonas".padStart(25, "+").padEnd(35, "+"));

const maskCreditCard = function (number) {
  const str = number + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(75464324));
console.log(maskCreditCard(43378231754393492));
console.log(maskCreditCard("2132189489124124214"));

// Repeat
const message2 = "Bad weather... All Departures Delayed...";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"✈️".repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

//:& split() - dzieli stringa na tablicę, elementy oddzielane są podanym znakiem
//:& join() - łączy elementy tablicy w stringa, elementy oddzielane są podanym znakiem
//:& padStart() - wypełnia string do wskazanej długości podanym stringiem zaczynając od początku stringa
//:& padEnd() - wypełnia string do wskazanej długości podanym stringiem zaczynając od końca stringa
//:& repeat() - powtarza stringa podaną ilość razy
/*

//: Working With Strings - Part 2
/* 
const airline = "TAP Air Portugal";

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = "JOnAS"; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const nameUppercase = function (name) {
  const nameLower = name.toLowerCase();
  return nameLower[0].toUpperCase() + nameLower.slice(1);
};

// const passengerName = String(prompt("Podaj imie pasażera: "));
const passengerName = "staSIU";
console.log(nameUppercase(passengerName));

// Comparing emails
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to barding door 23. Boarding door 23!";

// console.log(announcement.replace("door", "gate")); // Replaces only the first occurance
console.log(announcement.replaceAll("door", "gate")); //:& Replacing all 'door' words with 'gate'

console.log(announcement.replace(/door/g, "gate")); //:@ Regular expression was used before replaceAll function

// Booleans
const plane = "Airbus A320neo";
console.log(plane.includes("A320"));
console.log(plane.includes("Boeing"));
console.log(plane.includes("Airb"));

if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
  console.log("Part of the NEW Airbus family");
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

//:& toLowerCase() - zamienia wszystkie znaki na małe litery
//:& toUpperCase() - zamienia wszystkie znaki na duże litery
//:& trim() - usuwa białe znaki z początku i końca stringa
//:& replace() - zamienia pierwsze wystąpienie podanego stringa na inny string
//:& replaceAll() - zamienia wszystkie wystąpienia podanego stringa na inny string
//:& includes() - sprawdza czy dany string zawiera podany string
//:& startsWith() - sprawdza czy dany string zaczyna się od podanego stringa
//:& endsWith() - sprawdza czy dany string kończy się podanym stringiem
*/

//: Working With Strings - Part 1
/* 
const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r")); // Returns 6
console.log(airline.lastIndexOf("r")); // Returns 10
console.log(airline.indexOf("Portugal"));
console.log(airline.indexOf("portugal")); // returns -1 because the function is case sensitive

console.log(airline.slice(4)); // Returns 'Air Portugal'
console.log(airline.slice(4, 7)); // Returns 'Air'

console.log(airline.slice(0, airline.indexOf(" "))); // Returns 'TAP'
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Returns 'Portugal'

console.log(airline.slice(-2)); // Returns 'al'
console.log(airline.slice(1, -1)); // Returns 'AP Air Portuga'

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log("You got the middle seat 😬");
  else console.log("You got lucky 😎");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

//:& indexOf() - returns the index of an element by looking from start to end
//:& lastIndexOf() - returns the index of an element by looking from end to start
//:& slice() - returns a part of a string using the start and end index
*/

//: Maps Iteration
/* 
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
// console.log(question);

// Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt("Your answer: "));
const answer = 3;
console.log(answer);

// console.log(
//   answer === question.get("correct") ? question.get(true) : question.get(false)
// );

console.log(question.get(question.get("correct") === answer));
// question.get("correct") === answer returns 'false' or 'true' based on user's answer
// question.get(question.get("correct") === answer) returns the value of provided key (Correct or Try again!)

// Convert map to array
console.log([...question]);

console.log(question.entries());
console.log(...question.keys());
console.log(...question.values());
*/

//: Maps Fundamentals
/*
const rest = new Map();
rest.set("name", "Classico Italiano"); // rest.get("name") - Returns: Classico Italiano
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

console.log(rest.get("name")); // Returns: Classico Italiano
console.log(rest.get(true)); // Returns: We are open :D
console.log(rest.get(1)); // Returns: Firenze, Italy

const time = 8;
console.log(rest.get(time > rest.get("open") && time < rest.get("close"))); // Returns: We are closed :(

console.log(rest.has("categories")); // Checks if there is a key called "categories" in the map
rest.delete(2); // Deletes the key-value pair with the key of 2
// rest.clear(); // Clears the entire map

const arr = [1, 2];
rest.set(arr, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

//:& Maps - kolekcje klucz-wartość (key-value pairs) - podobne do obiektów, ale kluczem może być dowolna wartość

//:& set() - dodaje nowy klucz-wartość do mapy
//:& get() - zwraca wartość dla podanego klucza
//:& has() - sprawdza czy podany klucz istnieje w mapie
//:& delete() - usuwa klucz-wartość z mapy
//:& clear() - usuwa wszystkie klucze-wartości z mapy
*/

//: Sets
/*
const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);

console.log(ordersSet);

console.log(new Set("Jonas"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
ordersSet.delete("Risotto");
ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

console.log(new Set("jonasschmedtmann").size);

//:? Sets - kolekcje unikalnych wartości (nie ma duplikatów)
*/

//: Looping Objects: Object Keys, Values and Entries
/*
//:? Basically konwertujemy obiekt lub właściwości obiektu na tablice i iterujemy po nich za pomocą for-of loop

//:. Property NAMES
const openingHours = {
  thu: { open: 12, close: 22 },
  fri: { open: 11, close: 23 },
  sat: { open: 0, close: 24 },
};

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr);

//:. Property VALUES
const values = Object.values(openingHours);
console.log(values);

//:. Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

//:? Object.keys() - zwraca tablicę z kluczami obiektu
//:? Object.values() - zwraca tablicę z wartościami obiektu
//:? Object.entries() - zwraca tablicę z tablicami zawierającymi klucz i wartość obiektu
*/

//: Optional Chaining (?.)
/*
//:@ WITHOUT optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//:& WITH optional chaining
console.log(restaurant.openingHours.mon?.open); // sprawdzanie czy istnieje dana właściwość (mon) w obiekcie
console.log(restaurant.openingHours?.mon?.open);

//:& Optional Chaining (?.) - jeśli sprawdzana właściwość nie istnieje (jest undefined), to zwraca undefined, a dalsza część wyrażenia nie jest wykonywana

// Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

//:. Methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

//:. Arrays
const users = [{ name: "Jonas", email: "hello@jonas" }];
// const users = [];

console.log(users[0]?.name ?? "User arrays empty");

//:@ the old way of acheiving the above
if (users.length > 0) console.log(users[0].name);
else console.log("user array empty");
*/

//: Looping Arrays: The for-of Loop
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
  //   console.log(`${item[0] + 1}: ${item[1]}`);
  // }
  
  for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);

//:& for-of loop - iteruje po elementach tablicy
*/

//: Logical Assignment Operators
/*
const rest1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

//:. OR assignment operator
//:@ Standard way:
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
//:& New way:
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//:. nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//:. AND assignment operator
// rest1.owner = rest1.owner && "<ANONYMOUS>";
// rest2.owner = rest2.owner && "<ANONYMOUS>";
rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";

console.log(rest1);
console.log(rest2);
*/

//: The Nullish Coalescing Operator (??)
/*
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

//:. Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//:& Nullish Coalescing Operator (??) - zwraca pierwszą wartość, która nie jest ani null ani undefined
*/

//: Short Circuiting (&& and ||)
/*
console.log("---- OR ----");
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || "Hello" || 23 || null);

//:& OR operator (||) - zwraca pierwszą prawdę lub ostatni fałsz

const restaurant = {
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
}

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log("---- AND ----");
console.log(0 && "Jonas");
console.log(7 && "Jonas");

console.log("Hello" && 23 && null && "jonas");

//:& AND operator (&&) - zwraca pierwszy fałsz lub ostatnią prawdę

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
*/

//: Rest Pattern and Parameters
/*
// 1) Destructuring
//:. SPREAD, because on RIGHT side of '='
const arr = [1, 2, ...[3, 4]];

//:. REST, because on LEFT side of '='
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//:& REST operator - zbiera pozostałe elementy tablicy do nowej tablicy (REST operator musi być ostatni - "it collects the REST of the elements")

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//:. Objects
const openingHours = {
  sat: { open: 12, close: 22 },
  mon: { open: 11, close: 23 },
  tue: { open: 0, close: 24 },
};

const { sat, ...weekdays } = openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

//:? SPREAD rozpakowuje tablice, a REST pakuje do tablicy
*/

//: The Spread Operator (...)
/* 
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]; //:@ old way
console.log(badNewArr);

const newArr = [1, 2, ...arr]; //:& new way
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

//:& Spread Operator - rozpakowuje całą zawartość tablicy

//:. Copy array
const mainMenuCopy = [...restaurant.mainMenu];

//:. Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//:. Iterables: arrays, strings, maps, sets. NOT objects
const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`);

//:& ...str rozpakowuje stringa na pojedyncze znaki

//:. Real-world example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("Ingredient 2?"),
  prompt("Ingredient 3"),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); //:@ old way
restaurant.orderPasta(...ingredients); //:& new way

//:. Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

//: Destructuring Objects
/*
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 2,
});

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
}

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//:& Destrukturyzacja Obiektu - przypisanie wartości z obiektu do zmiennych

//:. Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//:& zamiana wartosci zmiennych za pomocą destrukturyzacji

//:. Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

*/

//: Destructuring Arrays
/*

//:@ old-fashioned way of getting 3 variables from an array
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//:& new cooler way
const [x, y, z] = arr; // destructuring (unpacking) an array
console.log(x, y, z);

//:& Destrukturyzacja Tablicy - przypisanie wartości z tablicy do zmiennych

const [first, second] = restaurant.categories;
console.log(first, second);

const [firsto, , thirdo] = restaurant.categories;
console.log(firsto, thirdo);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//:. Switching vaiables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

//:. Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//:. Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//:. Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

//: Coding Challenge #1
/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.

Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    ['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski'],
    ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze'],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*
const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const [...allPlayers] = [...players1, ...players2];
console.log(allPlayers);

const [...player1Final] = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(player1Final);

const {
  odds: { team1: team1, x: draw, team2: team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(`All players: ${players}
Total amount of scored goals: ${players.length}`);
};

// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
// printGoals("Davies", "Muller");
printGoals(...game.scored);

team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");
*/

//: Coding Challenge #2
/*
Let's continue with our football betting app! Keep using the 'game' variable from
before.

Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names 😉
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}

GOOD LUCK 😀
*/

/*
// 1.
// My solution
let goal = 1;

const { scored } = game;

for (const score of scored) {
  console.log(`Goal ${goal}: ${score}`);
  goal++;
}

goal = 0;

// Guys
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2.
// My solution
const { odds } = game;
const oddValues = Object.values(odds);

let sum = 0;
for (const value of oddValues) {
  sum += value;
}
console.log(`Average is equal to: ${sum / oddValues.length}`);

// Guys
const odds2 = Object.values(game.odds);
let average = 0;
for (const odd of odds2) average += odd;
average /= odds2.length;
console.log(average);

// 3.
// My solution
const oddEntries = Object.entries(odds);

for (const [team, value] of oddEntries) {
  console.log(`Odd of victory ${game[team] ?? "draw"}: ${value}`);
}

// Guys
for (const [team, value] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of victory ${teamStr}: ${value}`);
}
*/

//: Coding Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).

Your tasks:
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

/*
// Task 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// Task 2
gameEvents.delete(64);
console.log(gameEvents);

// Task 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// Bonus using the 92 minute value from gameEvents
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// Task 4
for (const [min, event] of gameEvents) {
  console.log(`[${min <= 45 ? "FIRST" : "SECOND"} HALF] ${min}: ${event}`);
}
*/

//: Coding Challenge #4
/* 
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅

Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
*/

//:. My Solution
/* 
const variableList = function (list) {
  const variableNames = list.split("\n");
  let i = 1;
  for (const n of variableNames) {
    camelCaseConverter(n, i++);
  }
};

const camelCaseConverter = function (variableName, checkCount) {
  // console.log(checkCount);
  const words = variableName.toLowerCase().trim().split("_");
  // console.log(words);
  const secondWord = words[1];
  const done =
    words[0] + secondWord.replace(secondWord[0], secondWord[0].toUpperCase());
  console.log(`${done.padEnd(20, " ")} ${"✅".repeat(checkCount)}`);
};

// const list =
//   "underscore_case\nfirst_name\nSome_Variable\ncalculate_AGE\ndelayed_departure";

// variableList(list);

// camelCaseConverter("underscore_case");

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const list = document.querySelector("textarea").value;
  variableList(list);
});
*/

//:. Guys Solution
/* 
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
});
*/
