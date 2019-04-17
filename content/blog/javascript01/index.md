---
title: JavaScript从零开始01 | Numbers
date: "2019-02-10"
description: 此篇笔记为从零开始学习JavaScript的第一篇,作为我系统性学习JavaScript的开始。此系列将会以英文为主。主要学习资料为Mozilla的Documentation。
---

# JavaScript Building Blocks: Types
* `Number`
* `String`
* `Boolean`
* `Function`
* `Object`
* `Symbol` (new in ES2015，也就是ES6)
除了以上基础Types之外，JavaScript同时支持使用`null`和`undefined`, 以及`Array`，
`Date`和`RegExp`。因此，一种更正确的Types分类形式为：
* `Number`
* `String`
* `Boolean`
* `Symbol` 
* `Object`
  * `Function`
  * `Array`
  * `Date`
  * `RegExp`
* `null`
* `undefined`

## Numbers
JavaScript是不支持纯所谓Integer的，也就是说Number Type就是floating point。
JavaScript使用IEEE754 double precision (64-bits) floating point。
JavaScript支持一个built-in的Object为`Math`，使用者可以用其进行一些数学运算。
```javascript
Math.sin(3.5);
const circumference = 2 * Math.PI * r;
```
JS支持使用`parseInt`来将`String`转换为`Number`。Function takes an optional second argument as the base of the string representation:
```javascript
parseInt('123', 10); // 123
parseInt('010', 10); // 10
parseInt('11', 2); // 3
```
There is a function called `parseFloat` which behaves similarly with `parseInt` 
but doesn't take a second argument. Instead, it always assumes base 10 representations.
An unary `+` sign can be used to convert string into numbers as well:
```javascript
+ '42'; // 42
+ `010`; // 10
+ `0x10`; // 16
```
A special value called `NaN` (which stands for "Not a Number") is used in JS:
```javascript
parseInt('foo', 10); // NaN
```

Any mathematical operation operating on `NaN` will also return `NaN` (which is quite toxic...):
```javascript
NaN + 5; // NaN
```
One can use the built-in function `isNaN` to test whether a value is `NaN` or not:
```javascript
isNaN(NaN); // true
```
JS also supports two Infinity values:
```javascript
1 / 0; Infinity
-1 / 0; -Infinity
```
One can also test whether a value is infinity of not by using the `isFinite` function:
```javascript
isFinite(1 / 0); // false
isFinite(-Infinity); // false
isFinite(NaN); // false
```

One thing to point out for comparing the difference between `+` and `parseInt`,`parseFloat` is that, two parse functions will terminate once they hit invalid characters and return the value up to that point, whereas the `+` operand will simply return `NaN` if a invalid argument is given:
```javascript
+ '10.2abc'; // NaN
parseInt('10.2abc', 10); // 10
parseFloat('10.2abc'); // 10.2
```
