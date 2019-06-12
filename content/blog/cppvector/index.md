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

int vector::size() const { return m_size; }

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
```

We might also need a destructor. For now the only thing that we are managing is the underlying array, so we want to delete it after the container gets destructed. 

```cpp
~vector() {
    delete[] m_elems;
}
```

We further need a initializer_list constructor just to make our lives easier. We can do so by writing:

```cpp
vector::vector(std::initalizer_list<int> l) 
    : m_elems{new int[l.size()]}, size{l.size()} {
    copy(l.begin(), l.end(), m_elems);
}
```

## Copy Constructors

We need to specify the copy constructor for our class as well. 

```cpp
class vector {
    /* ... */
    vector(const vector& a); /* copy constructor */
    vector& operator=(const vector& a); /* copy assgnment */
    /* ... */
};

vector::vector(const vector& a)
    : m_elems{new int[a.m_size]}, m_size{a.m_size} {
        copy(a.m_elems, a.m_elems + a.m_size, m_elems);
}

vector& vector::operator=(const vector& a) {
    int* p = new int[a.m_size];
    for (int i = 0; i < a.m_size; ++i)
        p[i] = a.m_elems[i];
    delete[] m_elems;
    m_elems = p;
    m_size = a.m_size;
    return *this;
}
```

I quote from the book: "A copy constructor and a copy assignment for a class X are typically declared to take an argument of type `const X&`."

## Move Constructor

Besides the Copy constructor, we need the move constructor and move assignment as well. 

```cpp
class vector {
    /* ... */
    vector(vector&& a); /* move constructor */
    vector& operator=(vector&& a); /* move assignment */
};

vector::vector(vector&& a)
    : m_elems{a.m_elems}, m_size{a.m_size} {
        a.m_elems = nullptr;
        a.m_size = 0;
}

vector& vector::operator=(vector&& a) {
    m_elems = a.m_elems;
    m_size = a.m_size;
    a.m_elems = nullptr;
    a.m_size = 0;
}
```

In order to use the move constructor or assignment, we want to use them in the following way: 

```cpp
void f() {
    vector x(1000);
    vector y(1000);
    vector z(1000);
    /* ... */
    z = x; /* z is a copy of x */
    y = std::move(x); /* y is a move of x */
    /* ... */
}
```

After all, we get two copies of the same elements of the original `x`: one copy is stored in the variable `z`, and other copy is stored in variable `y`. Variable `x` shouldn't be used after we call `std::move` on it. 


## C++ Generics
So far our implementation of the vector only supports integer type. This is obviously not ideal since we want to have a vector of any data type. We can use the template keyword to make our class supports generics. 

```cpp
template<typename T>
class vector {
private:
    T∗ m_elems; /* an array of type T */
    size_t m_size; 
    int m_capacity; 

public:
    vector(); /* default constructor */
    vector(size_t s); /* takes a size */
    vector(std::initializer_list il); /* initializer list constructor */
    vector(const vector& v); /* copy constructor */
    vector(vector&& v); /* move constructor */
    ~vector() { delete[] m_elems; }

    /* utils */
    T* begin() const { return m_elems };
    T* end() const { return m_elems + m_size };
    size_t size() const { return m_size; }

    T& operator=(const vector& v); /* copy assignment */
    T& operator=(vector&& v); /* move assignment */
    T& operator[](int i); /* value changing indexing */
    const T& operator[](int i) const; /* accessing indexing */

    void push_back(T e);
    T back() { return m_elems[m_size - 1]; }
    void pop_back() { --m_size; }
};

/* implementations */
/* constructors */
template<typename T>
vector<T>::vector() {
    m_elems = new T[2]; /* default to capacity 2 */
    m_capacity = 2;
    m_size = 0;
}

template<typename T>
vector<T>::vector(size_t s)
    : m_elems{new T[s * 2]}, m_capacity{s * 2}, m_size{s} {}

template<typename T>
vector<T>::vector(std::initializer_list il) 
    : m_elems{new T[il.size() * 2]}, m_capacity{il.size() * 2}, m_size{il.size()} {
    std::copy(il.begin(), il.end(), m_elems);
}

template<typename T>
vector<T>::vector(const vector<T>& v) 
    : m_elems{new T[v.m_size]}, m_capacity{v.m_size * 2}, m_size{v.m_size} {
    std::copy(v.begin(), v.end(), m_elems);
}

template<typename T>
vector<T>::vector(vector&& v) 
    : m_elems{v.m_elems}, m_capacity{v.m_capacity}, m_size{v.m_size} {
    v.m_elems = nullptr;
    v.m_capacity = 0;
    v.m_size = 0;
}

/* utils */
template<typename T>
T& vector<T>::operator=(const vector& v) {
    T* p = new T[v.m_size * 2];
    std::copy(v.begin(), v.end(), p);
    delete[] m_elems; /* delete old m_elems */
    m_elems = p;
    m_size = v.m_size;
    m_capacity = v.m_size * 2;
    return *this;
}

template<typename T>
T& vector<T>::operator=(vector&& v) {
    delete[] m_elems;
    m_elems = v.m_elems;
    m_capacity = v.m_capacity;
    m_size = v.m_size;
    v.m_capacity = 0;
    v.m_size = 0;
}

template<typename T>
T& vector<T>::operator[](int i) {
    return m_elems[i];
}

template<typename T>
T& vector<T>::const operator[](int i) const {
    return m_elems[i];
}

/* interfaces */
template<typename T>
void vector<T>::push_back(T e) { /* makes a copy */
    if (m_size >= m_capacity) {
        T* p = new T[m_capacity * 2];
        std::copy(begin(), end(), p);
        p[m_size] = e;
        delete[] m_elems;
        m_elems = p;
        m_capacity *= 2;
    } else
        m_elems[m_size] = e;   
    ++m_size;
}

```
