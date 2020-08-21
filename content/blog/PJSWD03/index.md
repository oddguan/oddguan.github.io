---
title: JS红宝书学习笔记3
date: 2020-8-17 18:09:50
description: 红宝书从头到尾通读第一遍学习笔记
---

# Chapter 6

## Array

### `Array.from` and `Array.of`

区别在于`from`的第一个 argument 是一个 iterable 或者一个 array-like，return 结果是这个 iterable 的 shallow copy。`of`可以 take 无限多个 arguments，并把它们加入到一个 array 里并 return。

### Array.prototype.length

一个 array 的 length 可以被显式的改变，并造成一些奇怪的结果：

```javascript
let colors = ["red", "blue", "green"];
colors.length = 2;
console.log(colors[2]); // undefined
colors.length = 4;
console.log(colors[3]); // undefined
```

### 确认对象是不是 array

1. 使用`instanceof`。`a instanceof Array`这种方法虽然大部分情况下没问题，但是当我们有许多 frames，iframes 或者 windows 尝试交流的时候，如果我们从一个 frame 传过来一个 argument 想判断他是不是 Array，这时候 instanceof 会返回 false，因为传过来的 array 的 prototype 是另一个 frame 的 Array.prototype。`instanceof`假设我们只有一个 global 环境，而在这种情况下显然我们有多个 global 环境。
2. `Object.prototype.toString.call`。在 ES5 之前的环境下使用这样的方法来辨别一个变量的数据类型是很好用的，但是缺点是语义不明确。
3. `Array.isArray`。这种方法是官方推荐的 ES6 环境下应该使用的鉴别 array 的方法。

## Typed Array（类型化数组）

js 提供类似于 c 语言中`malloc`的一种分配底层内存方式。分配内存后，可以使用 DataView 的方式来读取一段一段的数值。

```javascript
const buf = new ArrayBuffer(16); // Allocates 16 bytes of memory alert(buf.byteLength); // 16
console.log(buf.byteLength);

const fullDataView = new DataView(buf);
const dataViewWithOffset = new DataView(buf, 8, 4); // offset of 8 and length of 4
```

## Object 和 Map 在性能上的区别

1. 相同情况下， Map 一般能比 Object 多存大约 50%的 key value pairs。
2. Insertion 的性能上，Map 也会比 Object 好一些。如果插入很多，应该选择 Map。
3. Object 在某些特定情况下的查询效率会比 Map 高一些。比如在 Object 的 key 是连续整数的情况下，浏览器会在底层做一些优化，但是 Map 是没有这些优化的。
4. Object 的删除 key 操作相当的耗费资源，参见隐藏类优化机制。所以如果经常需要删除键值对的话应该选用 Map。

## WeakMap

WeakMap 的 API 其实和 Map 类似，但是 WeakMap 的可以必须是一个 reference type（object）。当代码失去某一个 key 的强引用时，这个 key 以及其对应的 value 就会被垃圾回收。
WeakMap 一般情况下有两种常用的使用方法。

### 使用 WeakMap 来定义类的私有变量

```javascript
const Person = (() => {
  const wm = new WeakMap();

  class Person {
    constructor(firstName, lastName) {
      this.setFirstName(firstName);
      this.setLastName(lastName);
    }

    setPrivate(property, value) {
      const privateData = wm.get(this) || {};
      privateData[property] = value;
      wm.set(this, privateData);
    }

    setFirstName(firstName) {
      this.setPrivate("firstName", firstName);
    }

    setLastName(lastName) {
      this.setPrivate("lastName", lastName);
    }

    getName() {
      const firstName = wm.get(this).firstName;
      const lastName = wm.get(this).lastName;
      return `${firstName} ${lastName}`;
    }
  }
  return Person;
})();

const johnDoe = new Person("John", "Doe");
console.log(johnDoe.getName());
```

### 使用 WeakMap 来自动清理 DOM 节点所占用的内存

比如我们相用 Map 的 API 来为一个选出的 DOM 节点存储一些元数据，可能就会有以下的代码：

```javascript
const map = new Map();
const submitButton = document.getElementById("submit-button");
map.set(submitButton, { disabled: true });
```

这三行代码虽然使用上没有什么问题，但是如果一次 DOM 的渲染使得 submitButton 不再存在于界面上了， 因为 map 始终没有被垃圾回收，且 submitButton 的键值对没有被显示的删除，将会导致这个 DOM 节点一直存在于内存当中无法被垃圾回收，也就是内存泄漏。
取而代之的，我们可以使用一个 WeakMap 来完成上述的操作：

```javascript
const weakMap = new WeakMap();
const submitButton = document.getElementById("submit-button");
weakMap.set(submitButton, { disabled: true });
```

如上的实现就保证了当 submitButton 被从页面中删除时，它将会被正常的垃圾回收掉。

## WeakSet

与 WeakMap 相似，WeakSet 也可以用来存放 DOM 节点并使得节点被正确的垃圾回收从而防止内存泄漏。

```javascript
const disabledElements = new WeakSet();
const loginButton = docmuent.getElementById("login-button");
disabledElements.add(loginButton);
```

## Chapter 6 Summary (摘抄)

Objects in JavaScript are called reference values, and several built-in reference types can be used to create specific types of objects, as follows:

- Reference types are similar to classes in traditional object-oriented programming but are implemented differently.
- The `Object` type is the base from which all other reference types inherit basic behavior.
- The `Array` type represents an ordered list of values and provides functionality for manipulating and converting the values.
- Typed arrays encompass a range of different reference types that involve type management of numbers in memory.
- The `Date` type provides information about dates and times, including the current date and time and calculations.
- The `RegExp` type is an interface for regular-expression support in ECMAScript, providing most basic and some advanced regular-expression functionality.

One of the unique aspects of JavaScript is that functions are actually instances of the `Function` type, meaning functions are objects. Because functions are objects, functions have methods that can be used to augment how they behave.

Because of the existence of primitive wrapper types, primitive values in JavaScript can be accessed as if they were objects. There are three primitive wrapper types: `Boolean`, `Number`, and `String`. They all have the following characteristics:

- Each of the wrapper types maps to the primitive type of the same name.
- When a primitive value is accessed in read mode, a primitive wrapper object is instantiated so that it can be used to manipulate the data.
- As soon as a statement involving a primitive value is executed, the wrapper object is destroyed.

There are also two built-in objects that exist at the beginning of code execution: `Global` and `Math`. The `Global` object isn't accessible in most ECMAScript implementations; however, web browser implement it as the `window` object. The `Global` object contains all global variables and function as properties. The `Math` object contains properties and methods to aid in complex mathematical calculations.

ECMAScript 6 introduced a handful of collection types: `Map`, `WeakMap`, `Set`, `WeakSet`. These offer new possibilities for organizing application data as well as easier memory management.

# Chapter 7

## 定义自己的 iterator

```javascript
class Counter {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return {
            done: false,
            value: count++,
          };
        } else {
          return {
            done: true,
            value: undefined,
          };
        }
      },
    };
  }
}

let counter = new Counter(3);
for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3
```

上述方法创建的 iterator 其实是一个工厂方法，所以 iterator 的 iterator 也会返回相同的 iterator。

```javascript
const arr = [1, 2, 3];
const iter1 = arr[Symbol.iterator]();
const iter2 = arr[Symbol.iterator]();
console.log(iter1 === iter2); // true
```

学习 iterator 的时候发现了一个很有趣的现象，这里是我在 Stack Overflow 的提问：
https://stackoverflow.com/questions/63513953/javascript-adding-return-method-to-an-iterator-doesnt-properly-close-the-iter
希望能有好心人帮忙解答。

## Generator

Generator 其实广义上来说就是另外一种 iterator。每一个 generator 也都拥有 iterator 的接口比如`next()`。具体简单的使用方法如下：

```javascript
function* generatorFn() {
  yield "foo";
  yield "bar";
  return "baz";
}
let generatorObject = generatorFn();
console.log(generatorObject.next()); // { done: false, value: 'foo' }
console.log(generatorObject.next()); // { done: false, value: 'bar' }
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

特别注意的是，`yield`关键字只能在 generator 函数中使用，并且不单单可以用作输出方法， 还可以用作输入方法。

```javascript
function* generatorFn1(initial) {
  console.log(initial);
  console.log(yield);
  console.log(yield);
}
let generatorObject = generatorFn1("foo");
// 第一个传进next的值会被忽略，因为第一个next只用来启动generator
console.log(generatorObject.next("bar")); // { done: false, value: 'foo' }
console.log(generatorObject.next("baz")); // { done: false, value: 'baz' }
console.log(generatorObject.next("qux")); // { done: false, value: 'qux' }

function* generatorFn2() {
  return yield "foo";
}
generatorObject = generatorFn2();
console.log(generatorObject.next()); // { done: false, value: 'foo' }
console.log(generatorObject.next("bar")); // { done: true, value: 'bar' }

// 理论上来说，如下generator和generator2是一样的
function* generatorFn3() {
  const temp = yield "foo";
  return temp;
}
```

`yield`还有一种特殊的使用方法是`yield*`。这种方法可以 yield 多个元素，且`yield*`跟随的值必须是一个 iterable。

```javascript
function* generatorFn() {
  yield* [1, 2, 3];
}
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3
```

另一种特殊情况是`yield*`跟一个 generator 表达：

```javascript
function* inner() {
  yield "foo";
  return "bar";
}

function* outer() {
  console.log("iter value:", yield* inner());
}

for (const x of outer()) {
  console.log("value:", x);
}
// value: foo
// iter value: bar
```

还可以用`yield*`来定义递归的函数：

```javascript
function nTimes(n) {
  if (n > 0) {
    yield* nTimes(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2
```

甚至可以使用 generator 来实现一个递归的 dfs：

```javascript
class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = new Set();
  }

  connect(node) {
    if (node !== this) {
      this.neighbors.add(node);
      node.neighbors.add(this);
    }
  }
}

function generateRandomGraph(size) {
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = new Node(i);
  }
  const threshold = 1 / size;
  for (const x of result) {
    for (const y of result) {
      if (Math.random() < threshold) {
        x.connect(y);
      }
    }
  }
  return result;
}

const nodes = generateRandomGraph(6); // 返回在图中的node的数组形式
const firstNode = nodes[0];

const visited = new Set();
function* dfs(nodes) {
  for (const node of nodes) {
    if (!visited.has(node)) {
      yield node;
      visited.add(node);
      yield* dfs(node.neighbors);
    }
  }
}
const traversal = [...dfs([firstNode])];
console.log(traversal);
```

### generator throw

generator 有一个 throw 方法可以调用。如果在 generator 内部没有处理 error 的话，那么 throw 之后的 generator 会进入 closed 状态：

```javascript
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const g = generatorFn();
console.log(g); // generatorFn {<suspended>}
try {
  g.throw("foo");
} catch (e) {
  console.log(e); // foo
}
console.log(g); // generatorFn {<closed>}
```

如果内部处理了 error 的话：

```javascript
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (e) {}
  }
}

const g = generatorFn();
console.log(g.next()); // { done: false, value: 1 }
g.throw("foo");
console.log(g.next()); // { done: false, value: 3 }

const g2 = generatorFn();
g2.throw("foo");
console.log(g2.next()); // { done: false, }
```

这里需要注意的是，2 这个值被跳过了，因为在执行完第一次 next 后，generator 的上下文停留在了下一次 yield 之前，也就是 try block 中。所以这时候 throw 的话会跳过当前的 yield 而直接进入 catch block，所以 2 就被跳过了。

## Chapter 7 Summary (摘抄)

Iteration is a pattern that is encountered in essentially every programming language. The ECMAScript 6 specification formally embraces the concept of iteration by introducing two formal concepts in the language, iterators and generators.

And iterator is an interface that can be implemented by any object and allows for sucessive visitations of values that it produces. Anything that implements the `Iterable` interface features a `Symbol.iterator` property, which references the default iterator. The default iterator behaves as an iterator factory: a function which, when invoked, produces an object that implements the `Iterator` interface.

Successive values are coerced from an iterator via its `next()` method, which returns an `Iterator-Object`. This object contains a `done` property, a Boolean indicating if there are more values available, and a `value` property, which contains the present value provided from the iterator. This interface can be manually consumed by invoking `next()` repeatedly, or automatically consumed by native iterable consumers such as the `for...of` loop.

Generators are a special type of function that, when invoked, produces a generator object. This generator object implements the `Iterable` interface, and therefore can be used anywhere an iterable is expected. Generators are unique in that there support the yield keyword, which is used to pause execution of the generator function. The yield keyword can also be used to accept input and output through the `next()` method. When accompanied by an asterisk, the `yield` keyword will serve to serialize an iterable it is paired with.
