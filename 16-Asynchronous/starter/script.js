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
  // countriesContainer.style.opacity = 1; // sent to finally() method
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1; // sent to finally() method
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