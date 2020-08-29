---
title: JS中防抖(debounce)与节流(throttle)的实现方式
date: 2020-08-28 00:06:11
description: how to effectively implement debounce and throttle functions in JavaScript
---

## 防抖(Debounce)

防抖的定义是**延时执行**。比如我定义 500ms 的防抖，如果用户在第一个 500ms 内进行了多次操作，那么多余的操作会重制计时器为 0。

```javascript
function debounce(fn, delay = 500) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```

## 节流(Throttle)

节流的定义就是，如果在特定时间范围内收到了多次请求，那么我执行一次。

```javascript
function throttle(fn, delay = 500) {
  let timer = null;
  let start = Date.now();
  return function() {
    clearTimeout(timer);
    let now = Date.now();
    let remaining = delay - (now - start);
    if (remaining <= 0) {
      fn.apply(this, arguments);
      start = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
}
```

### 给窗口滚动的性能优化

```javascript
function foo(bar) {
  console.log(bar);
}
const debouncedFoo = debounce(foo, 100);
window.addEventListener("scroll", () => debouncedFoo("bar"));
```
