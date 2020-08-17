---
title: JS红宝书学习笔记1
date: 2020-08-15 16:19:09
description: 红宝书从头到尾通读第一遍学习笔记
---

# Chapter 2

`<script>` tag应该放在body的最底下防止加载阻塞。HTML4提供了`defer`标签来表示script不会改变页面结构，因此script可以在页面加载完成后再执行。
> download should begin immediately but execution should be deferred.
```html
<!DOCTYPE html> 
<html>
    <head>
    <title>Example HTML Page</title>
    <script defer src="example1.js"></script> 
    <script defer src="example2.js"></script> 
    </head>
    <body>
    <!-- content here -->
    </body>
</html>
```

## script标签async与defer的区别
### defer
1. 立即下载，不阻塞
2. 延迟执行，直至页面解析完毕再执行
3. 理论按顺序执行（但实际不一定）

### async
1. 立即下载，不阻塞
2. 立即执行，阻塞html解析
3. 不确定顺序执行
4. 建议不要修改dom

### 同时使用
同时使用`async`与`defer`，浏览器将忽略defer。

---

# Chapter 3

## `var` scope
```javascript
function test() {
    var message = 'hi'; // local variable
}
test();
console.log(message); // error!

function test2() {
    message = 'hi'; // global variable
}
test2();
console.log(message); // 'hi'
```

## `var` hoisting (变量提升)
```javascript
fucntion foo() {
    console.log(age); // undefined
    var age = 23; 
}
```
上述代码和下面的代码其实本质上是相同的：
```javascript
function foo() {
    var age;
    console.log(age);
    age = 23;
}
```

### `var`与`let`的区别
1. 本质区别在于，`let`block scoped，而`var`是function scoped。
2. `let`会阻止redundent declaration，而`var`不会。
3. `let`也不会hoist（提升）。
4. 当在global scope下用`var`定义变量时，变量会挂载在`window`下，而`let`不会。

## 数据类型
六大基本数据类型：
1. `undefined`
2. `null`
3. Boolean
4. Number
5. String
6. Symbol

复杂数据类型：
1. Object

### `NaN`

```javascript
console.log(NaN == NaN); // false
console.log(isNaN(10)); // false
console.log(isNaN("10")); // false
console.log(isNaN('blue')); // true
console.log(isNaN(true)); // false
```

`isNaN`可以接受一个object，并call它的`valueOf()`方法并确认是否能return一个可以转换为number的值。如果没有`valueOf()`就会call`toString()`。

### 模版字符串标记函数

```javascript
let a = 6;
let b = 9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
    console.log(strings);
    console.log(aValExpression);
    console.log(bValExpression);
    console.log(sumExpression);
    return 'foobar';
}

let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(taggedResult); // 'foobar'
```

```javascript
let a = 6; let b = 9;
function zipTag(strings, ...expressions) { 
    return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;
console.log(untaggedResult); // "6 + 9 = 15" 
console.log(taggedResult); // "6 + 9 = 15"
```

## Symbol
Symbol可以用来生成一个unique的object key：
```javascript
let s1 = Symbol('foo'), s2 = Symbol('bar'), s3 = Symbol('baz'), s4 = Symbol('qux');
let o = {
    [s1]: 'foo val'
};
// Also valid: o[s1] = 'foo val';
console.log(o);
// {Symbol{foo}: foo val}
Object.defineProperty(o, s2, {value: 'bar val'});
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val}
Object.defineProperties(o, { [s3]: {value: 'baz val'}, [s4]: {value: 'qux val'}
});
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val, // Symbol{baz}: baz val, Symbol(qux): qux val}
```

### Well-known Symbols
ES6定义了很多常用symbols。比如，实现iterator的方法就是override `Symbol.iterator` property。读文档的时候有时会看到`@@iterator`这样的表示形式，实际上它和`Symbol.iterator`是相同的意思。

1. `Symbol.iterator`
2. `Symbol.hasInstance` (内层`instanceof`的实现symbol)
```javascript
function Foo() {}
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f)); // true
console.log(f instanceof Foo); // true
class Bar {}
class Baz extends Bar {
    static [Symbol.hasInstance]() {
        return false;
    }
}
let b = new Baz();
console.log(Bar[Symbol.hasInstance](b)); // true
console.log(b instanceof Bar); // true
console.log(Baz[Symbol.hasInstance](b)); // false
console.log(b instanceof Baz); // false
```