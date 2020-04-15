/* functions 
    > parameters - regular, default, ...rest 
    > arguments - regular, ...spread
    > return
*/
function display(regularPara, defaultPara= 'World', spreadChar1, spreadChar2, spreadChar3, ...restPara) {
  console.log(regularPara + ' ' +defaultPara);
  restPara.forEach(name => console.log(
    regularPara + ' ' + name + ' ' + spreadChar1+spreadChar3+spreadChar2 + ' !'));
}
let spreadPara = ['a', 'b', 'c'];
display('Hello');
display('Hello', 'Everyone');
display('Hello', undefined, ...spreadPara, 'Mary', 'John', 'Smith');
display('Hello', 'Everyone', ...spreadPara, 'Mary', 'John', 'Smith');

/* function scope
    > outer/parent function
    > nested/inner function
*/

/* block scope - ES2015 
    > within {} (if/while/for etc any other than function)
    > *let vs var
*/

// IIFE - immediatly invoked function expression
(function () {
  console.log("This is IIFE");
})();
// IIFE > assign to variable to make function expression
let greeting = (function () {
  let message = "Hello";
  let getMessage = function () {
    return message;
  };
})();
//console.log(greeting.message); // undefined

// closures > hold on even after function excute
let greetingClosure = (function () {
  let message = "Hello";
  let getMessage = function () {
    return message;
  };
  return {
    getMessage: getMessage,
  };
})();
console.log(greetingClosure.getMessage()); // Hello

// closure example
function setupCounter(val) {
  return function counter() {
    return val++;
  };
}
let counter1 = setupCounter(0);
console.log(counter1()); // 0
console.log(counter1()); // 1
let counter2 = setupCounter(10);
console.log(counter2()); // 10
console.log(counter2()); // 11
console.log(counter1()); // 2
console.log(counter2()); // 12

/* arrow function
  > single param
  > this
*/
let helloObject = {
  first: "John",
  regularFunction: function (last) {
    console.log(this);
    console.log("Hello " + this.first + last);
  },
  arrowFunction: (last) => {
    console.log(this);
    console.log("Hello " + this.first + last);
  },
};
helloObject.regularFunction("Smith");
helloObject.arrowFunction("Smith");

/* understanding JS `this` keyword
 * this = executing content of block scope
 */
// Example 1
function sayHi1() {
  console.log("Hi_1");
  console.log(this);
}
sayHi1(); // Hi // window {...}

// Example 2
let greeting2 = {};
greeting2.sayHi2 = function () {
  console.log("Hi_2");
  console.log(this);
};
greeting2.sayHi2(); // Hi // {sayHi: f}

// Example 3
function sayHi3() {
  console.log("Hi_3");
  console.log(this);
}
let greeting3 = new sayHi3(); // Hi // [obj Object]

/* understanding `call / apply` method
 * > `call` - individual arguments of varying type
 * > `apply` - array inputs with simillar elements
 */
let person1 = { firstName: "John", age: 21 };
let person2 = { firstName: "Will", age: 22 };
let sayCallHi = function (lastName, profession) {
  console.log(
    this.firstName + ", " + lastName + ", " + this.age + ", " + profession
  );
};
sayCallHi("Smith"); // undefined, Smith, undefined, undefined
sayCallHi.call(); // undefined, undefined, undefined, undefined
sayCallHi.call(undefined, "Smith"); // undefined, Smith, undefined, undefined
sayCallHi.call(person1, "Smith", "Lawyer"); // John, Smith, 21, Lawyer
sayCallHi.call(person2, "Smith", "Doctor"); // Will, Smith, 22, Doctor

sayCallHi("Smith"); // undefined, Smith, undefined
sayCallHi.apply(); // undefined, undefined, undefined
sayCallHi.apply(undefined, ["Smith", "Lawyer"]); // undefined, Smith, undefined, Lawyer
sayCallHi.apply(person1, ["Smith", "Lawyer"]); // John, Smith, 21, Lawyer
sayCallHi.apply(person2, ["Smith", "Doctor"]); // Will, Smith, 22, Doctor

/* understanding `bind` method
 */
let personFemale = {
  name: "Mary",
  getName: function() {
    return this.name;
  }
};
let personMale = {
  name: "John"
};

let getNameCopy = personFemale.getName.bind(personMale);
console.log(getNameCopy);
console.log(getNameCopy());

/* Built-in functions 
  > eval()
  > parseInt
  > parseFloat
  > escape
  > unescape
 */