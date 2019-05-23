---
title: "Virtual Functions in C++"
date: "2019-05-09 16:48:58"
description: "A simple example to demonstrate how `virtual` keyword in C++ works, and why and when you should use it. "
---

It is pretty common to be asked "what does the `virtual` keyword in C++ do?" during an interview, if you are interviewing a C++ position. This blog post explains what the `virtual` keyword does in a simple term.

Suppose we have the following C++ program:

```cpp
#include <iostream>
#include <string>

class Entity {
public:
    std::string GetName() {
        return "Entity";
    }
};

class Player : public Entity {
private:
    std::string m_name;

public:
    Player(const std::string& name) {
        m_name = name;
    }

    std::string GetName() {
        return m_name;
    }
};

int main() {
    Entity *e = new Entity();
    std::cout << e->GetName() << std::endl;

    Player *p = new Player("Chenxiao");
    std::cout << p->GetName() << std::endl;

    return 0;
}
```

As we can see, it is a pretty simple program that utilizes inheritance in C++. We have an `Entity` base class that basically only has one member function (method), and all it does is just printing a constant literal string "Entity". Then we have a `Player` class that inherits from the `Entity` class, and has its own version of the `GetName` method. 

In our main function, we intialize a pointer to a new `Entity` object, and call the `GetName` method of it. We then create a new `Player` object and does the same thing. The result of this program should be pretty straightforward, and it prints:

```
Entity
Chenxiao
```

Simple, but now lets make it more complicated.

Suppose in addition to something that we did above, we have another pointer that points to the player object, like the code below:

```cpp
int main() {
    Entity *e = new Entity();
    std::cout << e->GetName() << std::endl;

    Player *p = new Player("Chenxiao");
    std::cout << p->GetName() << std::endl;

    Entity *entity = p;
    std::cout << entity->GetName() <<std::endl;

    return 0;
}
```

This won't throw a compiler error because of polymorphism, but the behavior of this program is somewhat unexpected to most of us:

```
Entity
Player
Entity
```

Although `p` is a `Player` object, it is an `Entity` as well, and when we refer to it by using the `Entity` class, it will behave just like the `Entity` class.

Another example to demonstrate this is by using a simple function call. Suppose we have a function that takes an `Entity`:

```cpp
void LogEntityName(Entity* e) {
    std::cout << e->GetName() << std::endl;
}
```

If we pass those two objects into this function, just like so demonstrated below:

```cpp
int main() {
    Entity *e = new Entity();
    Player *p = new Player("Chenxiao");
    
    LogEntityName(e);
    LogEntityName(p);
    return 0;
}
```

Again, this won't throw a compiler error because of polymorphism. But instead of getting "Entity" and "Player", we will get this:

```
Entity
Entity
```

Then how are we going to tell C++ that which is the correct version of the method `GetName` to look for? That's where the `virtual` keyword comes in. 

Instead of writing what we had above in the class definitions, we can have something like this:

```cpp
class Entity {
public:
    virtual std::string GetName() {
        return "Entity";
    }
};

class Player : public Entity {
private:
    std::string m_name;

public:
    Player(const std::string& name) {
        m_name = name;
    }

    std::string GetName() override {
        return m_name;
    }
};
```

Notice that we added the keyword `virtual` to the base version of the method `GetName`. What this will do is that C++ generates a vtable for us and it maps the base version method to the method that we overrode in our children classes. 

Besides, I added the keyword `override` in the child version of the `GetName` method as well. This is not required, and is just introduced in C++11, but it helps you develop your code because it can now identify which base method you are referring to. For example, when you write your child class and wants to have a method `GetName`, and you had a typo to the new name and typed `Getname`, C++ will not look for the base version of `GetName` and you code will compile just fine. But, if you always use the keyword `override`, the typo version of the method will throw an compiler error to you, which helps you correct the typo before runtime.

Therefore, if we now run our program, it will produce:

```
Entity
Chenxiao
```

