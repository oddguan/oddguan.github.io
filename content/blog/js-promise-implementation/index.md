---
title: 原生JS实现Promise封装
date: 2020-09-10 21:39:42
description: 从头到尾使用ES5代码风格实现一个Promise状态机
---
本文参考：
https://www.promisejs.org/implementing/

Promise说白了就是一个状态机而已，通常来说有三个状态：

```javascript
var PENDING = 'PENDING';
var RESOLVED = 'RESOLVED';
var REJECTED = 'REJECTED';

function Promise() {
  var state = PENDING;

  // 存放success和failure的handler
  var handlers = [];

  // 存储resolve或者reject之后的result
  var value = null;
}
```

之后我们需要两个函数，`fulfill`和`reject`来改变当前状态机的状态，以及存放返回或者报错的结果：

```javascript
var PENDING = 'PENDING';
var RESOLVED = 'RESOLVED';
var REJECTED = 'REJECTED';

function Promise() {
  var state = PENDING;

  var handlers = [];

  var value = null;

  function fulfill(result) {
    state = RESOLVED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }
}
```

有了基本的状态切换方法，考虑另一种情况：如果promise的对象是另一个promise，那么外层的promise应该等待内层promise resolve之后再resolve。所以我们需要再上层封装一个`resolve`方法来判断这种情况。

```javascript
var PENDING = 'PENDING';
var RESOLVED = 'RESOLVED';
var REJECTED = 'REJECTED';

function Promise() {
  var state = PENDING;

  var handlers = [];

  var value = null;

  function fulfill(result) {
    state = RESOLVED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      } 
      fulfill(result);
    } catch (err) {
      reject(err);
    }
  }

  function getThen(value) {
    if (value 
    && (value instanceof Promise)) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }
    return null;
  }

  function doResolve(fn, onResolved, onRejected) {
    var done = false;
    try {
      fn(function (result) {
        if (done) {
          return;
        }
        done = true;
        onResolved(result);
      }, function (error) {
        if (done) {
          return;
        }
        done = true;
        onRejected(error);
      })
    } catch (error) {
      done = true;
      onRejected(error);
    }
  }
}
```

从Promise中传入一个将要被promise的值，或者是一个function：
```javascript
var PENDING = 'PENDING';
var RESOLVED = 'RESOLVED';
var REJECTED = 'REJECTED';

function Promise(fn) {
  var state = PENDING;

  var handlers = [];

  var value = null;

  function fulfill(result) {
    state = RESOLVED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      } 
      fulfill(result);
    } catch (err) {
      reject(err);
    }
  }

  function getThen(value) {
    if (value 
    && (value instanceof Promise)) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }
    return null;
  }

  function doResolve(fn, onResolved, onRejected) {
    var done = false;
    try {
      fn(function (result) {
        if (done) {
          return;
        }
        done = true;
        onResolved(result);
      }, function (error) {
        if (done) {
          return;
        }
        done = true;
        onRejected(error);
      })
    } catch (error) {
      done = true;
      onRejected(error);
    }
  }

  doResolve(fn, resolve, reject);
}
```
