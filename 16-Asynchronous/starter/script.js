'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
        <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
      </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1; // sent to finally() method
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; // sent to finally() method
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
///////////////////////////////////////
//: First AJAX Call: XMLHttpRequest
/* 
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //:? getting the API to which the request will be send
  request.send(); //:? sending the request to the API

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln people</p>
          <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
          <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('poland');
getCountryData('portugal');
*/

//: Callback hell

/*
const getCountryNeighbour = function (country) {
  //:. AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // getting the API to which the request will be send
  request.send(); // sending the request to the API

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //:. Render country 1
    renderCountry(data);

    //:. Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    //:. AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryNeighbour('poland');
*/

//: Promises and the Fetch API
/* 
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //:? getting the API to which the request will be send
request.send(); //:? sending the request to the API
*/

//: Consuming Promises
/* 
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //:? in order to read the data from the data from the response json() needs to be called on response which also returns a promise
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
};

getCountryData('poland');
*/

//: Chaining Promises, Handling Rejected Promises

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'dfshkjdsk'

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);

//       return response.json()
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//       // no matter the result, whether it renders an error (promise rejected) or a country (promise fulfilled), opacity needs to be 1 so it's visible
//     });
// };

//: Throwing Errors Manually
/* 
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error(`No neighbour found!`);

      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('poland');
});
*/

//: Coding Challenge #1
/* 
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁

Your tasks:

PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the
console

5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message

PART 2

6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.

7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474

GOOD LUCK 😀
*/
/* 
const whereAmI = function (lat, lng) {
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`An error occured: ${err.message}`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

//: The Event Loop in Practice
/* 
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for(let i = 0; i<100; i++){}
  console.log(res);
})
console.log('Test end');
*/

//: Building a Simple Promise
/* 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() > 0.5) resolve('You WIN 💰');
    else reject(new Error('You lost your money 💩'));
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  });
}

const arrowWait = seconds =>
  new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

//: Promisifying the Geolocation API
/* 
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`An error occured: ${err.message}`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/
/* 
//: Challenge #2
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.

Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉

PART 1

1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path

2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise

3. If this part is too tricky for you, just watch the first part of the solution

PART 2

4. Consume the promise using .then and also add an error handler

5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier

6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)

7. After the second image has loaded, pause execution for 2 seconds again

8. After the 2 seconds have passed, hide the current image

Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
GOOD LUCK 😀
*/

/* 
const imageContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Failed to load the image'));
    });
  });
};

let currentImg;

createImage('/img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/ilajsdflkajdfs');
  })
  .catch(err => console.error(err));
 */

//: Consuming Promises with Async/Await & Error Handling With try...catch & Returning Values from Async Functions
/* 
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const dataGeo = await resGeo.json();

    // Country data
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
    const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.countryName}`);
    if (!res.ok) throw new Error(`Problem getting country`);

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function (Rethrowing an error)
    throw err;
  }
};

console.log('1: Will get location');

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.err(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// Converting the lines commented above to async IIFE
// (in order to not use then(), catch() and finally())
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
*/

//: Running Promises in Parallel
/* 
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`)
    ]);
    
    console.log(data.map(d => d[0].capital).map(d => d[0]));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('poland', 'canada', 'tanzania');
*/

//: Other Promise Combinators
/* 
//:. Promise.race
(async function () {
  const res = await Promise.race([getJSON(`https://restcountries.com/v3.1/name/italy`), getJSON(`https://restcountries.com/v3.1/name/egypt`), getJSON(`https://restcountries.com/v3.1/name/mexico`)]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v3.1/name/tanzania`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

//:. Promise.allSettled
Promise.allSettled([Promise.resolve('Success'), Promise.reject('ERROR'), Promise.resolve('Another success')]).then(res => console.log(res));

Promise.all([Promise.resolve('Success'), Promise.reject('ERROR'), Promise.resolve('Another success')])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//:. Promise.any
Promise.any([Promise.resolve('Success'), Promise.reject('ERROR'), Promise.resolve('Another success')])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

//: Coding Challenge #3
/*
Your tasks:

PART 1

1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)

2. Compare the two versions, think about the big differences, and see which one
you like more

3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2

1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'

2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles)

Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function

GOOD LUCK 😀
*/

const imageContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Failed to load the image'));
    });
  });
};

// const loadNPause = async function () {
//   try {
//     let currentImg = await createImage('/img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     currentImg.style.display = 'none';

//     currentImg = await createImage('/img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     currentImg.style.display = 'none';

//     currentImg = await createImage('/img/img-3.jpg');
//     console.log('Image 3 loaded');
//     await wait(2);
//     currentImg.style.display = 'none';

//     currentImg = await createImage('img/ilajsdflkajdfs');
//   } catch (err) {
//     console.error(err);
//   }
// };

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async imgPath => await createImage(imgPath));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
