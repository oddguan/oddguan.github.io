---
title: JS红宝书学习笔记2
date: 2020-08-16 16:48:58
description: 红宝书从头到尾通读第一遍学习笔记第二篇
---

# Chapter 4

## 变量的数据类型

正常情况下，primitive type应该用`typeof`来决定数据类型。但是引用类型就不建议使用typeof了，而应该用`instanceof`。

> 所有的引用类型`reference types`都是instanceof Object。相对的，primitive types的instanceof Object永远return false。

## JavaScript Garbage Collection

JS在浏览器中主要是用mark and sweep算法进行垃圾回收，但是因为历史原因有些浏览器引擎依然会在底层使用reference counting。考虑如下情况：
```javascript
let element = document.getElementById("some element");
let myObject = new Object();
myObject.element = element;
element.someObject = myObject;
```
如上代码会产生引用循环，也就是说`element`和`myObject`都会一直保存两个引用。在IE9之前，应该使用如下代码保证不会有任何的内存泄露。
```javascript
myObject.element = null;
element.someObject = null;
```

### 注意事项以及最佳实践

在使用全局变量时，如果确认一个变量将不再被使用的话，应该将它的值设置为`null`。这个步骤称之为"dereferencing"。在函数内部的局部变量不太需要太在意这一点，因为函数执行结束后，内部的所有变量将会dereference。

### V8引擎的隐藏类优化机制
V8引擎底层的优化机制之一就是隐藏类。这里有一篇很好的文章来解释这种优化机制：https://juejin.im/post/6844903758908899341

重要需要记住的点是，尽量避免动态添加或删除对象的属性值。举个例子：
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person('Jake', 25);
const p2 = new Person('Paul', 18);
// 以上p1和p2使用同一个hidden class
p1.sex = 'male'; // 创建新的隐藏类，对performance造成影响
delete p1.sex; // delete同样会创建新的隐藏类

// 如果想删除一个属性，应该将其值设置为null而非delete
p1.sex = null;
```

避免动态删除属性的方法是将不再使用的属性值设置为null。避免动态添加属性的方法是将需要添加的属性放在构造函数里。

## Chapter 4 Summary摘抄
Two types of values can be stored in JavaScript variables: primitive values and reference values. Primitive values have one of the six primitive data types: Undefined, Null, Boolean, Number, String, and Symbol. Primitive and reference values have the following characteristics:
- Primitive values are of a fixed size and so are stored in memory on the stack.
- Copying primitive values from one variable to another creates a second copy of the value.
- Reference values are objects and are stored in memory on the heap.
- A variable containing a reference value actually contains just a pointer to the object, not the object itself.
- Copying a reference value to another variable copies just the pointer, so both variables end up referencing the same object.
- The `typeof` operator determines a value's primitive type, whereas the `instanceof` operator is used to determine the reference type of a value.

All variables, primitive and reference, exist within an execution context (also called a scope) that determines the lifetime of the variable and which parts of the code can access it. Execution context can be summarized as follows:
- Execution contexts exist globally (called the global context), within functions, and within blocks.
- Each time a new execution context is entered, it creates a scope chain to search for variables and functions.
- Contexts that are local to a function or block have access not only to variables in that scope but also to variables in any containing contexts and the global context.
- The global context has access only to variables and functions in the global context and cannot directly access any data inside local contexts.
- The execution context of variables helps to determine when memory will be freed.

JavaScript is a garbage-collected programming environment where the developer need not be concerned with memory allocation or reclamatio. JavaScript's gabage-collection routine can be summarized as follows:
- Values that go out of scope will automatically be marked for reclamation and will be deleted during the garbage-collection process.
- The predominant garbage collection algorithm is called mark-and-sweep, which marks values that aren't currently being used and then goes back to reclaim that memory.
- Another algorithm is reference counting, which keeps track of how many references there are to a particular value. JavaScript engines no longer use this algorithm, but it still affects Internet Explorer because of nonnative JavaScript objects (such as DOM elements) being accessed in JavaScript.
- Reference counting causes problems when circular references exist in code.
- Dereferencing variables helps not only with circular references but also with garbage collection in general. To aid in memory reclamation, global objects, properties on global objects, and circular references should all be dereferenced when no longer needed.

# Chapter 5

## 为什么可以直接对primitive type call方法
```javascript
const s1 = 'some text';
const s2 = s1.substring(0, 4); // 'some'
```
以上代码可以执行，是因为每次对primitive type读时，js引擎背后都会将其先转换为一个object再call方法。三个步骤：
1. Create and instance of the `String` type.
2. Call the specified method on the instance.
3. Destroy the instance.

因此，上述代码的运行机制与如下展示的代码相同：
```javascript
let s1 = new String('some text');
let s2 = s1.substring(0, 4);
s1 = null;
```

所以以下代码会返回undefined的原理是因为，当执行至第三行时，s1在第二行被建立的实例wrapper已经被销毁，而第三行新的s1实例是没有color这个属性的。
```javascript
let s1 = 'some text';
s1.color = 'red';
console.log(s1.color);
```

注意：以下两种使用`Number`函数的方式是不同的。
```javascript
let value = "25";
let number = Number(value); // casting function
console.log(typeof number); // "number"
let obj = new Number(value); // constructor
console.log(typeof obj); // object
```
使用`new`时，我们实际上使用的是构造函数，所以typeof返回的是object。而直接使用时其实我们是在使用一个类型转换，所以返回的值的typeof依然是number。

### Boolean object
使用Boolean object的时候要格外的小心。考虑如下例子：
```javascript
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result); // true

let falseValue = false;
result = falseValue && true;
console.log(result); // false
falseObject == falseValue; // true
falseObject === falseValue; // false
```
js会将所有object都隐式看待为true，所以第一种情况的result是true。实际生产环境中应尽量避免Boolean object的使用。

### Number类的一些gotcha

1. JS的所有数字类型都是用IEEE754存储的double precision floating类型。ES6之后可以用`Number.isInteger`来判断一个Number是否为整数。除此之外，`Number.isSafeInteger`可以来判断Number是否在合法的整数范围之内，也就是$-2^53+1$至$2^53-1$。

## String

### ascii或者encoding与string值的转换

算法题中经常需要对某个字符的ascii码进行操作，在JS中可以进行这样的操作：
```javascript
let message = 'abcde';
console.log(message.charCodeAt(2)); // 99, 'c'
console.log(String.fromCharCode(99)); // 'c'
```
因为JS中没有char的数据类型，所以当我们确定一个字符串只有一个字符时，`charCodeAt()`方法可以不给index 0且直接返回字符的ascii码：
```javascript
let char = 'a';
console.log(char.charCodeAt()); // 97
```
此外，`String.fromCharCode`方法不止可以接受一个argument。我们可以用它来转换一个字符串：
```javascript
const stream = [97, 98, 99, 100, 101];
console.log(String.fromCharCode(...stream)); // 'abcde'
```

当使用UTF-16的字符时，上述的`fromCharCode`方法可能会不太好用，因为这个方法假设每个argument都是0-65536的正整数，也就是16个bits所能表达的所有数字。如果我们确定正在处理的字符串是存在utf-16的字符时，我们应该使用`codePointAt`以及`fromCodePoint`来代替`charCodeAt`和`fromCharCode`。所以就会出现如下的情况：
```javascript
String.fromCharCode(128522); // ""
String.fromCharCode(55357,56842); // "😊"
String.fromCodePoint(128522); // "😊"
```

#### `String.prototype.substring`和`String.prototype.substr`的区别
`substring`是java的substring方法，也就是说第一个argument是子字符串开始的index，第二个argument是结束的index，左闭右开。而`substr`是c++的substring方法，也就是说第一个argument是子字符串的开始index，第二个argument是子字符串的长度。如果不给第二个argument的话，两个方法是一样的。

## Chapter 5 Summary (摘抄)
Objects in JavaScript are called reference values, and several built-in reference types can be used to create specific types of objects, as follows:
- Reference types are similar to classes in traditional object-oriented programming but are implemented differently.
- The `Date` type provides information about dates and times, including the current date and time and calculations.
- The `RegExp` type is an interface for regular-expression support in ECMAScript, providing most basic and some advanced regular-expression functionality.

One of the unique aspects of JavaScript is that functions are actually instances of the `Function` type, meaning functions are objects. Because functions are objects, functions have methods that can be used to augment how they behave.

Because of the existence of primitive wrapper types, primitive values in JavaScript can be accessed as if they were objects. There are three primitive wrapper types: `Boolean`, `Number` and `String`. They all have the following characteristics:
- Each of the wrapper types maps to the primitive type of the same name.
- When a primitive value is accessed in read mode, a primitive wrapper object is instantiated so that it can be used to manipulate the data.
- As soon as a statement involving a primitive value is executed, the wrapper object is destroyed.

There are also two built-in objects that exist at the beginning of code execution: `Global` and `Math`. The `Global` object isn't accessible in most ECMAScript implementations; however, web browser implement it as the `window` object. The `Global` object contains all global variables and functions as properties. The `Math` object contains properties and methods to aid in complex mathematical calculations.
