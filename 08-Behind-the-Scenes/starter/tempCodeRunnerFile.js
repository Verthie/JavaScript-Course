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