---
title: My Memo For the Algorithmic Interviews
date: 2020-06-13 23:41:18
description: This is a javascript code snippet for me to memorize everyday so that I don't fail on these on an algorithmic interview.
---

This will be constantly updated, as I find other things worth memorizing. 

Last Updated: 2020-06-13 23:41:18

```javascript
const assert = require('assert');

// quick select and quick sort
function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; ++j) {
    if (arr[j] < pivot) {
      ++i;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

function quickSort(arr) {
  const quickSortRecursive = (arr, left, right) => {
    if (left < right) {
      const p = partition(arr, left, right);
      quickSortRecursive(arr, left, p - 1);
      quickSortRecursive(arr, p + 1, right);
    }
  };
  quickSortRecursive(arr, 0, arr.length - 1);
}

function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -(left + 1); // return the supposed-to-be index position
}

// LRU Cache
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.next = null;
}

function LRUCache(capacity) {
  this.capacity = capacity;
  this.head = null;
  this.tail = null;
  this.map = new Map();
}

LRUCache.prototype.put = function (key, value) {
  const node = this.map.get(key);
  if (node === undefined) {
    const newNode = new Node(key, value);
    if (this.capacity === 0) {
      // should evict oldest node
      const temp = this.head;
      this.head = this.head.next;
      this.map.delete(temp.key);
      this.capacity++;
    }
    if (this.head === null && this.tail === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      newNode.next = null;
    }
    this.tail = newNode;
    this.map.set(key, newNode);
    this.capacity--;
  } else {
    node.value = value;
    this.get(key); // get moves the node to front
  }
};

LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);
  if (node === undefined) {
    return -1;
  }
  if (node !== this.tail) {
    if (node === this.head) {
      this.head = this.head.next;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    node.next = null;
  }
  return node.value;
};

// Queue
// This `Node` definition will mess with the LRUCache Node
// So be careful when testing
function Node(value) {
  this.value = value;
  this.next = null;
}

function Queue() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

Queue.prototype.push = function (value) {
  const node = new Node(value);
  if (this.head === null && this.tail === null) {
    this.head = node;
  } else {
    this.tail.next = node;
  }
  this.tail = node;
  length++;
};

Queue.prototype.peek = function () {
  return this.head ? this.head.value : null;
};

Queue.prototype.pop = function () {
  if (this.length === 0) {
    return null;
  }
  const node = this.head;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }
  --this.length;
  return node;
};

// Priority Queue
// Constructing a PQ given an array is O(N) in runtime
function PriorityQueue(data = [], compare) {
  this.data = data;
  // default to a min heap
  this.compare = compare ? compare : (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  this.length = data.length;
  if (data.length !== 0) {
    for (let i = (data.length >> 1) - 1; i >= 0; --i) {
      this._siftDown(i);
    }
  }
}

PriorityQueue.prototype._siftDown = function (i) {
  const { data, compare, length } = this;
  const halfLength = length >>> 1;
  const e = data[i]; 
  while (i < halfLength) {
    let bestChild = (i << 1) + 1; // left child first
    const right = bestChild + 1;
    if (right < length && compare(data[bestChild], data[right] > 0)) {
      bestChild = right;
    }
    if (compare(data[bestChild] >= e)) {
      break;
    }
    data[i] = data[bestChild];
    i = bestChild;
  }
  data[i] = e;
};

PriorityQueue.prototype._siftUp = function (i) {
  const { data, compare } = this;
  const e = data[i];
  while (i > 0) {
    const parent = (i - 1) >>> 1;
    if (compare(e, data[parent]) >= 0) {
      break;
    }
    data[i] = data[parent];
    i = parent;
  }
  data[i] = e;
};

PriorityQueue.prototype.push = function (val) {
  this.data.push(val);
  this._siftUp(this.length++);
};

PriorityQueue.prototype.peek = function () {
  return this.data[0]; // returns undefined if no data
};

PriorityQueue.prototype.pop = function () {
  if (this.data.length === 0) {
    return undefined;
  }
  const first = this.data[0];
  const last = this.data.pop();
  if (--this.length > 0) {
    this.data[0] = last;
    this._siftDown(0);
  }
  return first;
};

// ------Test functions------
function testQuickSort() {
  const times = 10000;
  for (let i = 0; i < times; ++i) {
    const arr = Array.from({ length: Math.floor(Math.random() * 50) }, () =>
      Math.random()
    );
    const arrCopy = [...arr].sort((a, b) => a - b);
    quickSort(arr);
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] !== arrCopy[i]) {
        throw new Error('QuickSort Error');
      }
    }
  }
}

function testPriorityQueue() {
  const queue = new PriorityQueue();
  queue.push(2);
  queue.push(1);
  queue.pop();
  queue.pop();
  queue.pop();
  queue.push(2);
  queue.push(1);
  assert(queue.pop() === 1);
  assert(queue.pop() === 2);
  assert(queue.pop() === undefined);
}

function main() {
  console.log('testing quicksort...');
  testQuickSort();
  console.log('testing quicksort passed');

  console.log('testing priorityqueue...');
  testPriorityQueue();
  console.log('testing priorityqueue passed');
}

main();
```
