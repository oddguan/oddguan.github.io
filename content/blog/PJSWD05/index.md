---
title: JS红宝书学习笔记5
date: 2020-08-23 15:15:01
description: 红宝书从头到尾通读第一遍学习笔记
---

# Chapter 10

## Functions

所有的`function`类型都有一个`name`属性返回函数的名字。如果函数是 bind 返回的或者是 getter 或者 setter，则`name`之前会有一个 prefix：

```javascript
function foo() {}
const bar = () => {};
console.log(foo.name); // foo
console.log(bar.name); // bar

// ---
console.log(foo.bind(null).name); // bound foo
let dog = {
  years: 1,
  get age() {
    return this.years;
  },
  set age(newAge) {
    this.years = newAge;
  },
};
let propertyDescriptor = Object.getOwnPropertyDescriptior(dog, "age");
console.log(propertyDescriptor.get.name); // get age
console.log(propertyDescriptor.set.name); // set age
```

# Chapter 11

## Promise

### Promise 的三种状态

Promise 的状态是一个状态机，并且有三种可能的状态：

1. Pending
2. Fulfilled（有时候也叫 resolved）
3. Rejected
   2 和 3 其实都可以被称为 settled 状态，且从 1 转移到 2 或者 3 的状态的过程是不可逆的。

### Promise.finally 的几种情况

大多数情况下，`Promise.finally`都会 act as a pass-through，也就是说如果上层 promise 已经 resolve 的话，不管 finally 方法 return 什么，那么最终结果都是上层结果的 resolve 值。
但是有几种特例：

1. 如果 finally 返回一个新的 promise，那么返回这个 promise
2. 如果返回一个 promise.reject，那么也会返回这个 promise.reject
3. 如果在 finally 中 throw，那么会返回被 rejected 的 throw 值

```javascript
// Promise.resolve() preserves the returned promise
let p1 = Promise.resolve("foo");
let p9 = p1.finally(() => new Promise(() => {}));
let p10 = p1.finally(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p9); // Promise <pending>
setTimeout(console.log, 0, p10); // Promise <rejected>: undefined
let p11 = p1.finally(() => {
  throw "baz";
}); // Uncaught (in promise) baz
setTimeout(console.log, 0, p11); // Promise <rejected>: baz
```

### Promise.all

`Promise.all`可以接受一个 enumerable（含有 Symbol.iterator 的对象），并假设内部全部为 Promise 对象。此方法返回一个单一的 Promise：

1. 如果 enumerable 的所有 promise 都 resolve 了，则返回的 promise 进入 resolved。
2. 如果 enumerable 有其中一个 promise 为 rejected，则返回的 promise 为 rejected。
3. 如果 enumerable 有其中一个 promise 为 pending，则返回的 promise 为 pending。
   如果所有 promises 成功 resolve，返回的 promise 会 resolve 为一个 array，并且含有所有 promises 的值。

```javascript
let p = Promise.all([
  Promise.resolve(1),
  Promise.resolve(),
  Promise.resolve(3),
]);
p.then(values => setTimeout(console.log, 0, values)); // [1, undefined, 3]
```

# Chapter 12

## BOM 与`window`

所有在最上层用`var`定义的变量都会自动挂载在`window`对象上，而用`let`和`const`变量的就不会。

```javascript
var age = 29;
var sayAge = () => alert(this.age);
alert(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
let name = "Chenxiao";
console.log(window.name); // TypeError
```

### `window.open`打开弹窗

可以使用`window.open`的方法来制作一个弹窗。需要特别注意的是，弹窗的`window`有一个`opener`属性用来连接打开弹窗的 tab 以及弹窗 tab 自身。弹窗 tab 自身可以将`window.opener`设置成 null 来讲弹窗和本身 tab 解耦。

```javascript
let myWebsite = window.open(
  "https://oddguan.io/",
  "oddguan",
  "height=400,width=400,top=10,left=10,resizable=yes"
);
myWebsite.opener = null;
```

现在大部分浏览器都会禁止弹出窗口在除了用户显式操作以外的情境下跳出，所以开发的代码中应该实现一些错误处理。有时浏览器自带的弹窗禁止工具会使`window.open`返回null，但有些第三方的弹窗禁止工具会使得`window.open`报错，所以应该使用如下的双重保险：
```javascript
let blocked = false;
try {
  let myWebsite = window.open(
    "https://oddguan.io/",
    "oddguan",
    "height=400,width=400,top=10,left=10,resizable=yes"
  );
  if (myWebsite === null) {
    blocked = true;
  }
} catch (e) {
  blocked = true;
}
if (blocked) {
  // do something here
}
```

## `location`
`document.location`与`window.location`指向的是同一个对象。

### 改变当前url的方法
```javascript
// 如下三种方法相同
window.location.assign('https://oddguan.io');
window.location = 'https://oddguan.io';
window.location.href = 'https://oddguan.io';
// 使用replace的话不会在history中留下痕迹
window.location.replace('https://oddguan.io');
```

## `history`

## Chapter 12 Summary (摘抄)
The Browser Object Model (BOM) is based on the `window` object, which represents the browser window and the viewable page area. The `window` object doubles as the ECMAScript `Global` object, so all global variables and functions become properties on it, and all native constructors and functions exist on it initially. This chapter discussed the following elements of the BOM:
- To reference other window objects, there are several window pointers.
- The `location` object allows programmatic access to the browser's URL piece by piece or altogether. 
- The `replace()` method allows for navigating to a new URL and replacing the currently displayed page in the browser's history.
- The `navigator` object provides information about the browser. The type of information provided depends largely on the browser being used, though some common properties, such as `userAgent`, are available in all broswers.

Two other objects available in the BOM perform very limited functions. The `screen` object provides information about the client display. This information is typically used in metrics gathering for websites. The `history` object offers a limited peek into the browser's history stack, allowing developers to determine how many sites are in the history stack and giving them the ability to go back or forward to any page in the history, as well as modify the history stack.