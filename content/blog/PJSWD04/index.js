// const foo = Object.getOwnPropertyDescriptor;
// Object.defineProperty(Object, 'getOwnPropertyDescriptor', {
//   value: foo,
//   enumerable: true
// });
// function Person() {}
// Person.prototype.name = 'Chenxiao';
// const person1 = new Person();
// for (const key in person1) {
//   console.log(key);
// }

function Parent(name) {
  this.name = name;
}
Parent.prototype.sex = "Male";
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Object.defineProperty(Child.prototype, "constructor", {
  value: Child,
  enumerable: false,
});
const person1 = new Child("John", 26);
for (const key in person1) {
  console.log(key);
}
// name
// age
// sex

const fromEntries = Object.fromEntries; // a random non-enumerable method
Object.defineProperty(Object, "fromEntries", {
  value: fromEntries,
  enumerable: true,
});
console.log(Object.getOwnPropertyDescriptor(Object, 'fromEntries'));
// { value: [Function: fromEntries], writable: true, enumerable: true, configurable: true }
for (const key in person1) {
  console.log(key);
}
// name
// age
// sex
