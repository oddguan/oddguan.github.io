---
title: JS红宝书学习笔记4
date: 2020-08-20 22:54:29
description: 红宝书从头到尾通读第一遍学习笔记
---

# Chapter 8

## 对象数据的属性

对象的每一个数据都有自己的属性：

1. `[[Configurable]]`, 指数据能否被删除或者更改属性，默认为 true。
2. `[[Enumerable]]`, 指数据会不会在`for...in`循环中出现，默认为 true。
3. `[[Writable]]`, 指数据能否被重写，默认为 true。
4. `[[Value]]`, 数据的值，默认为 undefined。

一般上述的前三种属性都可以通过`Object.defineProperty`来定义：

```javascript
const person = {};
Object.defineProperty(person, "name", {
  writable: false,
  configurable: false,
  enumerable: true,
  value: "Chenxiao",
});
console.log(person); // { name: "Chenxiao" }
```

## Accessor Property (访问器属性)

JS 的对象还可以有一种没有 value 的属性值，名为 accessor property。这种属性只能通过`Object.defineProperty`来设置，并且需要显示的设置`get`和`set`方法，但是这两个方法都不是必需的：

```javascript
const book = {
  _year: 2020,
  edition: 1,
};
Object.defineProperty(book, "year", {
  get() {
    return this._year;
  },
  set(newValue) {
    if (newValue > 2020) {
      this._year = newValue;
      this.edition += newValue - 2020;
    }
  },
});
book.year = 2021;
console.log(book.edition); // 2
```

## `Object.assign`

### 常见用途

1. 为对象添加属性

```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}
```

2.  为对象添加方法

```javascript
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 如上等同于如下
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

3. 克隆对象

```javascript
// doesn't clone origin's prototype
function clone(origin) {
  return Object.assign({}, origin);
}

// this one should be preferred
function clone(origin) {
  const proto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(proto), origin);
}
```

4. 给定默认值

```javascript
const DEFAULTS = {
  port: 8000,
};
function getOptions(options) {
  return Object.assign({}, DEFAULTS, options);
}
```

### 使用注意事项

1. Object assign 只会浅复制。
2. 第一个参数为复制入的目标，后边可以给无数个参数，后传入的会覆盖掉先传入的值。

## `Object.is`

和`===`唯一的区别就是，`Object.is`会处理三个边界情况：

```javascript
NaN === NaN; // false
Object.is(NaN, NaN); // true

+0 === -0; // true
+0 === 0; // true
-0 === 0; // true
Object.is(+0, -0); // false
Object.is(+0, 0); // true
Object.is(-0, 0); // false
```

## 原型链 prototype

### 性能相关

看了一个很好的关于讲 V8 隐藏类以及内联缓存的 conference talk，里边讲了一些关于为什么不要任意改变 high-up 对象的原型的原因。这包括不要轻易改变`Object.prototype`的值，不要轻易调用`Object.setPrototypeOf`等等。链接如下：
https://www.youtube.com/watch?time_continue=77&v=IFWulQnM5E0&feature=emb_title

### `in`

`in`的用法有两种：

1. 在`for...in` 循环中使用。
2. 单独使用，可以确认一个对象自己包括原型链中存不存在某一个属性。

```javascript
function Person() {}
Person.prototype.name = "Chenxiao";
const person1 = new Person();
console.log(person1.hasOwnProperty("name")); // false
console.log("name" in person1); // true
```

### 定义 prototype 属性的另一种方法

```javascript
function Person() {}
Person.prototype = {
  name: "Chenxiao",
  age: 23,
};
Object.defineProperty(Person, "constructor", {
  value: Person,
  enumerable: false,
});
```

上述方法和单独定义每一个 prototype 的值其实是一样的。需要注意的是，用这种方法定义 prototype 需要重新将 constructor 定义到自己身上，否则在使用 constructor 判断对象类型时会出些小问题。如果没有重定义的话，constructor 会默认变成 Object 的 constructor。

### 上层 prototype 的改写

考虑如下代码：

```javascript
function Person() {}
const person1 = new Person();
Person.prototype.sayHi = function() {
  console.log("hi!");
};
person1.sayHi(); // hi!

// -----

const person2 = new Person();
Person.prototype = {
  constructor: Person,
  name: "Chenxiao",
  sayName() {
    console.log(this.name);
  },
};
person2.sayName(); // error
```

对象在创建时会设置自己的`[[Prototype]]`指针，因此重新定义一个 prototype 对象不行。

## Inheritance (继承)

写了很多遍了，再写一遍：

```javascript
function SuperType(property) {
  this.property = property;
}
SuperType.prototype.superMethod = function superMethod() {
  return true;
};

function SubType(property, subProperty) {
  SuperType.call(this, property);
  this.subproperty = subproperty;
}
SubType.prototype = Object.create(SuperType.prototype);
Object.defineProperty(SubType, "constructor", {
  value: SubType,
  enumerable: false,
});
```

## ES6 class extends 实现 mixin 的方式

```javascript
function mix(base, ...mixins) {
  return mixins.reduce((acc, cur) => cur(acc), base);
}

let FooMixin = SuperClass =>
  class extends SuperClass {
    foo() {
      console.log("foo");
    }
  };

let BarMixin = SuperClass =>
  class extends SuperClass {
    bar() {
      console.log("bar");
    }
  };
class SuperClass {}
class SubClass extends mix(SuperClass, FooMixin, BarMixin) {}
```

## Chapter 8 Summary (摘抄)
Objects are created and augmented at any point during code execution, making objects into dynamic, rather than strictly defined, entities. The following patterns are used for the creation of objects:
- The factory pattern uses a simple function that creates an object, assigns properties and methods, and then returns the object. This pattern fell out of favor when the constructor pattern emerged.
- With the constructor pattern, it's possible to define custom reference types that can be crated using the `new` operator in the same way as built-in object instances are created. The constructor pattern does have downside, however, in that none of its members are reused, including functions. Because functions can be written in a loosely typed manner, there's no reason they cannot be shared by multiple object instances.
- The prototype pattern takes this into account, using the constructor's `prototype` property to assign properties and methods that should be shared. The combination constructor/prototype pattern uses the constructor to define instance properties and the prototype pattern to define shared properties and methods. 

Inheritance in JavaScript is implemented primarily using the concept of prototype chaining. Prototype chaining involves assigning a constructor's prototype to be an instance of another type. In doing so, the subtype assumes all of the properties and methods of the supertype in a manner similar to class-based inheritance. The problem with prototype chaining is that all of the inherited properties and methods are shared among object instances, making it ill-suited for use on its own. The constructor stealing pattern avoids these issues, calling the supertype's constructor from inside of the subtype's constructor. This allows each instance to have its own properties but forces the types to be defined using only the constructor pattern. The most popular pattern of inheritance is combination inheritance, which uses prototype chaining to inherit shared properties and methods and uses constructor stealing to inherit instance properties.

There are also the following alternate inheritance patterns:
- Prototypal inheritance implements inheritance without the need for predefined constructors, essentially performing a shallow clone operation on a given object. The result of the operation then may be augmented further. 
- Closely related is parasitic inheritance, which is a pattern for creating an object based on another object or some information, augmenting it, and returning it. This pattern has also been repurposed for use with combination inheritance to remove the inefficiencies related to the number of times the supertype constructor is called.
- Parasitic combination inheritance is considered the most efficient way to implement type-based inheritance.

New in ECMASCript 6 is the introduction of classes, which are largely a syntactical wrapper for existing prototype-based concepts. This syntax confers to the language the ability to elegantly define classes that are backwards compatible and can inherit from built-in or custom classes. Classes elegantly bridge the gap between object instances, object prototypes, and object classes.


# Chapter 9
## `Proxy`初介绍
我们可以用ES6提供的Proxy类来改变一些语言内部基础的运作逻辑。这个概念类似于操作系统中的trap：比如当我们想要access一个对象的某一个属性值时，我们可以在这个过程中通过定义这个对象的一个Proxy的方法来添加一些我们想要的行为：
```javascript
const target = {
  foo: 'bar',
};
const handler = {
  get(trapTarget, property, receiver) {
    console.log(trapTarget === target);
    console.log(property);
    console.log(receiver === proxy);
  }
}

const proxy = new Proxy(target, handler);
proxy.foo;
// true
// foo
// true
```

一般情况下，proxy的生命周期是一直延续的，直到这个proxy变量变为null被垃圾回收。但是我们也可以用`revocable`这个方法来生成proxy，这样我们就可以在任意的时间使某个proxy无效化。
```javascript
const target = {
  foo: 'bar',
};
const handler = {
  get() {
    return 'intercepted';
  },
};
const { proxy, revoke } = Proxy.revocable(target, handler);
console.log(proxy.foo); // intercepted
revoke();
console.log(proxy.foo); // TypeError
```

## Chapter 9 Summary (摘抄)
Proxies are one of the more exciting and dynamic additions in the ECMAScript 6 specification. Although they have no backwards compilation support, they enable an entirely new field of metaprogramming and abstraction that was not previously available.

At a high level, proxies are a transparent virtualization of a real JavaScript object. When a proxy is created, you are able to define a handler object containing *traps*, which are points of interception that will be encountered by nearly every fundamental JavaScript operation and method. These trap handlers allow you to modify how these fundamental methods operate, although they are bound by *trap invariants*.

Alongside proxies is the Reflect API, which offers a suite of methods that identically encapsulate the behavior each trap is intercepting. The Reflect API can be thought of as a collection of fundamental operations that are the building blocks of nearly all JavaScript object APIs.

The utility of proxies is nearly unbounded, and it allows the developer to wield elegant new patterns such as (but certainly not limited to) tracking property access, hiding properties, preventing modification or deletion of properties, function parameter validation, constructor parameter validation, data binding, and observables.
