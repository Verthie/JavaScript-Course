const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//:& '_' - throwaway variable

const hundredRandomDices = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6)
);
console.log(hundredRandomDices);