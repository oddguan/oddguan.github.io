---
title: "How to implement std::vector in C++"
date: 2019-05-22 20:06:39
description: "A walkthrough of reimplementing the std::vector in C++"
---

This is a walkthrough of how to implement the `std::vector` in C++. Since I met this problem
in a C++ intern interview, I want to write a blog post of how to recreate it in the right way. 

Besides, as I am reading the book "The C++ Programming Language", the author of the book is 
doing the same thing in the second chapter of the book. This is basically a copy of that chapter.

So let's get started. In C++, a `vector` is basically a dynamically sized array. If you are coming from
a `Java` background, `vector` in C++ is just an `arraylist` in Java. If you are coming from a Python background, it is just your normal `list`. Probably all programming laguages have its own implementation of a dynamically sized array, `vector` is just happened to be the name of the one for C++.

So, as we all may know, a dynamically sized array is just an api to a regular fixed sized array, with some tweaks into it. If we are going to create our own version of it, the first thing we probably want to do is to create a new class called `vector` that has a fixed sized array underneath. Since there is no way to get the size of an array in C++, we want to keep track of the size of the array in the class as well. So we would initially have two members in the class as followed: 

```cpp
class vector {
private:
    int* m_elems;
    int m_size;
};
```

Now we want to write the constructor of our `vector`. The first constructor takes the size of the array:

```cpp
public:
    vector(int s) : m_elems{new int[s]}, m_size{s} {}
```

We want to override the `[]` operator so that we can access the value by using it, instead of having for example a `get` method to get the element by index. This is normally called a subscript function. We also need a method called `size` to retrieve the size of `vector`.

```cpp
public:
    int& operator[](int i) { return m_elems[i]; }
    int size() { return m_size; }
```

It is considered to be a best practice to define the interface first, and then implement the functionalities of it later on. Therefore, if we rewrite our code in such a way, we get the following result:

```cpp
class vector {
private:
    int* m_elems;
    int m_size;

public:
    vector(int s); /* construct with size */
    size(); // size getter
    int& operator[](int i);
};

vector::vector(int s)
    : m_elems{new int[s]}, m_size{s} {}

int vector::size() { return m_size; }

int& vector::operator[](int i) { return m_elems[i] }
```

Okay, now we want to do some error handling. We clearly see that there is no such thing in our code above, and we at least want to tell the user when they are using the index that are out of bound. We can do that by checking it in the `[]` operator. Also, we want check the size passed into the constructor to be a valid number:

```cpp
vector::vector(int s) {
    if (s < 0)
        throw length_error{};
    m_elems = new double(s);
    m_size = s;
}

int& vector::operator[](int i) {
    if (i < 0 || i >= size())
        throw out_of_range("vector::operator[]");
}