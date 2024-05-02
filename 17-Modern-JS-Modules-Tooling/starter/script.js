// Importing module
/* 
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost); // => shippingCost is not defined

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // don't mix Default and Named Exports
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2); // => 2 pizza added to cart
add('bread', 5); // => 5 bread added to cart
add('apples', 4); // => 4 apples added to cart

console.log(cart); // => [{product: 'pizza', quantity: 2},{...},{...}]

//: Top-Level await

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

//: The Module Pattern
/* 
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart (the shipping cost is ${shippingCost})`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
// addToCart can still access the variables inside the IFEE function even after it returned because of closure (it is still connected to the variables defined in its birthplace)

console.log(ShoppingCart2); // => {cart: Array, totalPrice: 237, totalQuantity: 23, addToCart: f}
console.log(ShoppingCart2.shippingCost); // => undefined
*/

//: CommonJS Modules

// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart (the shipping cost is ${shippingCost})`);
};

// Import
const { addToCart } = require('./shoppingCart.js');