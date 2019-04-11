---
title: JavaScript从零开始02 | Types
date: "2019-02-15"
description: 系统性理解JS Strings，Objects与Variables
---
# JavaScript Type: Strings
String in JavaScript are sequences of Unicode characters. 以下variable declaration在JS中是valid的：
```javascript
const 你好  = 'hello';
console.log(你好); // hello
```
JS中没有dedicated `char` type, 如果需要表示`char`的话，一般用string来代替。String有length property：
```javascript
'hello'.length; // 5
```
`String`属于`Object`，可以对String做类似于以下的operations：
```javascript
'hello'.charAt(0); // "h"
'hello, world'.replace('world', 'mars'); // "hello, mars"
'hello'.toUpperCase(); // "HELLO"
```

# JavaScript: Other Types
JS distinguishes between `null` and `undefined`. `null` specifically stands for non-value, whereas `undefined` stands for uninitialized value.  
```javascript
const a = [1, 2, 3, 4];
a[5]; // undefined
a[5] = null; 
a; // [1, 2, 3, 4, undefined, null];
```
JS支持Boolean Type，具体如下：
1. `false`, `0`, empty string `""`, `NaN`, `null`以及`undefined`都会被视作false。
2. 以上之外的value都会被视作true。
```javascript
Boolean(''); // false
Boolean(234); // true
```

# Variables
JS有三种declare variable的方式，namely `var`, `let`和`const`。
`let`会declare block-level variable。
```javascript
// myLetVariable is *not* visible out here

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
}

// myLetVariable is *not* visible out here
```
同样的，`const`也会declare block-level variable，但与`let`的区别在于`const`declare的variable不可以re-assign value。
```javascript
const foo = 'bar';
foo = 'hello'; // will throw an error
```
`var`在ES6 standard中已经很少被使用了，因为它会automatically declares a global variable。 Traditionally, `var` is the only way to declare a variable in JS. 
```javascript
// myVarVariable *is* visible out here 

for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  // myVarVariable is visible to the whole function 
} 

// myVarVariable *is* visible out here
```
Note:
* If you declare a variable without assigning its value, it will be `undefined` initially.
* 在ES6之前，JS是没有block-level scope的，只有function存在scope，这一点和Java等语言是有区别的。然而，ES6新增的`let`和`const`允许declare block-scoped variables。

# Operators
JS支持基本的operators，包括`+`, `-`, `*`, `/`以及`%`。
```javascript
x += 5;
x = x + 5; // equivalent to above
x++; // ++ and -- can be used
```
`+` operator will do string concatenation:
```javascript
'hello' + ' world!'; // hello world!
```
If you add a string to a number, they will be converted into string first:
```javascript
'3' + 4 + 5; // '345'
3 + 4 + '5'; // '75'
```
Comparisons in JS is a bit interesting. Double equal sign will perform type coersion if you give different types:
```javascript
123 == '123'; // true
1 == true; // true
// To avoid coersion, use triple-equal sign
123 === '123'; // false
1 === true; // false
```
JS also supports bit-wise operations. 
* `&` (bitwise AND)
* `|` (bitwise OR)
* `^` (bitwise XOR)
* `~` (bitwise NOT)
* `<<` (left shift)
* `>>` (arithmetic right shift)
* `>>>` (logical right shift)
Different from C, logical right shift can be done by the `>>>` operator.