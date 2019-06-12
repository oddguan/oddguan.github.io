---
title: "Java类的生命周期"
date: 2019-06-06 10:27:59
description: "Java面向对象编程第二版的读书笔记。"
---

## Java虚拟机及程序的生命周期

在以下情况，Java虚拟机将结束生命周期：
1. 程序正常执行结束。
2. 程序在执行中因为出现异常或者错误而异常终止。
3. 执行了`System.exit()`方法。
4. 由于操作系统出现错误而导致Java虚拟机进程终止。

## 类的加载，连接和初始化

使用类之前JVM会进行以下操作：
1. 加载(loading)：查找并加载类的二进制数据。
2. 连接(linking)：包括验证，准备和解析类的二级制数据。
    1. 验证(verify)：确保被加载类的正确性。
    2. 准备(prepare)：为类的静态变量分配内存，并将其初始化为默认值。
    3. 解析(resolve)：吧类中的符号引用转换为直接引用。
3. 初始化(initialize)：给类的静态变量赋予正确的初始值。

需要注意的是，当我们在使用继承时，java会确保我们在使用child class之前，parent class已经完成加载。
假设我们有一个`InitTester` class:
```java
// InitTester.java

class Base {
    static int a = 1;
    static {
        System.out.println("init Base");
    }
}

class Sub extends Base {
    static int b = 1;
    static {
        System.out.println("init Sub");
    }
}

public class InitTester {
    public static void main(String[] args) {
        Base base;
        Sytstem.out.println("After defining base");
        base = new Base();
        System.out.println("After creating an object of Base");
        System.out.println("a="+base.a);
        System.out.println("b="+Sub.b);
    }
}
```

最终运行的结果是什么呢？

```sh
init InitTester
After defining base
init Base
After creating an object of Base
a=1
init Sub
b=1
```

还有一点需要注意的是，通常情况下，当用户访问一个类的static变量时，类就会被jvm初始化。但是当用户访问final变量时，如果再编译时可被计算，那当前类并不会被初始化。举个例子：

```java
public class Tester {

    class test {
        public static final int a = 2 * 3;
        static {
            System.out.println("test Initialized");
        }
    }

    public static void main(String[] args) {
        System.out.println(test.a);
    }
}
```
出现的结果是：
```sh
6
```

### 加载器的父子关系

根类加载器<-扩展类加载器<-系统类加载器<-用户自定义加载器

### 父亲委托机制的优点

父亲委托机制(Parent Delegation)提高了软件系统的安全性。在此机制下，用户定义的加载器不会加载到应该有父亲加载的可靠类。例如，`java.lang.object`类总是由根加载器加载，从而消除了恶意代码攻击此类的可能性。

## 对象的生命周期

### 创建对象方式
1. new语句创建
2. 反射手段，`java.lang.reflect.Constructor`
3. 调用对象的clone方法
4. 运用反序列化手段

### 构造方法 （Constructor）

1. 自定义Costructor后就没有default constructor了。
2. 可定义多个constructor （overloading）
3. 子类调用父类构造方法使用`super` keyword。
4. JVM会首先执行父类构造方法，再执行子类构造方法。


### 构造方法的作用域

构造方法只能通过以下方式被调用：
1. 当前类的其他构造方法通过`this`语句调用它。
2. 当前类的子类的构造方法通过`super`语句调用它。
3. 在程序中通过`new`语句调用它。

#### 如何禁止用户instantiate一个类的新对象？
将唯一的默认构造函数改写成private的空方法。

### 单例类

#### 静态工厂
> 如果创建某个类对象的cost很高，我们可以改为使用静态工厂，重复使用一个对象。

静态工厂方法最主要的特点是：每次被调用的时候，不一定要创建一个新的对象。

### 不可变类的优点

1. 更加安全，不容易出错
2. 线程安全：当多个线程访问不可变类的同一个实例时，无需进行现成的同步。

#### 重复在两个地方使用同一个object，但是想让他们behave differently时，可以创建一个保护性复制。

```java
import java.util.Date;
public final class Schedule {
    private final Date start;
    private final Date end;
    public Schedule(Date start, Date end) {
        this.start = new Date(start.getTime());
        this.end = new Date(end.getTime());
    }
    public Date getStart(){ return (Date)start.clone(); }
    public Date getEnd(){ return (Date)end.clone();}
}
```


## 垃圾回收（garbage collection）

#### 如何手动垃圾回收
使用`System.gc()`或者`Runtime.gc()`可以催促jvm更快的进行垃圾回收。但是这也不能保证调用完该方法后，垃圾回收线程就能立即执行回收操作。

#### `finalize()方法`

对象的`finalize`方法会在被回收前的最后一刻执行。需要注意的是，`finalize`方法可以让当前对象复活。

当垃圾回收器执行`finalize()`方法时，如果出现异常，垃圾回收器不会报告异常，也不会导致程序的中断。


### 对象的强，软，弱和虚应用

> 分别对应Strong,soft,weak和phantom reference。

执行`System.gc()`之后，垃圾回收器只会回收那些仅仅持有弱引用的对象。

