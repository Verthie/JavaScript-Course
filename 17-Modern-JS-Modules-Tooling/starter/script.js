// Importing module
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
