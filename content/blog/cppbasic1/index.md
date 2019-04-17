---
title: C++基础篇01：Hello World!
date: "2019-04-13"
description: 被国内面试搞得我不知所措，无奈从头开始学C++。
---

> 这两天面了一波腾讯游戏部门的实习，被C++搞的死去活来，索性从头到尾学一波C++。这个语言我之前一直 觉得就只是一个升级版的C而已，面完这次试才发现好像完全不仅仅如此。这个系列从最基础的C++开始记起，希望自己能学到一些东西。

### Hello World!
所以C++的hello world程序是长成什么样子的？我们创建一个名为`hello`的文件夹，在内新建一个`.cpp`的文件
命名为`helloworld.cpp`。然后在文件内输入：

```c++
#include <iostream>

int main()
{
    std::cout << "Hello World!" << std::endl; // print hello world
    std::cin.get(); // get a standard input and terminate the program
}
```

打开terminal，输入

```bash
g++ helloworld.cpp -o helloworld && ./helloworld
```
在terminal中就会出现`Hello World!`,并在敲任意键后退出程序。