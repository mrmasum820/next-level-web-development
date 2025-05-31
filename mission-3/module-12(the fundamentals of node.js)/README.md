## **1. How the web works**

**https**://**web.programming-hero.com**/**success**

**protocol** **domain name** **resource**

https:// **139.59.192.134**:**443** ——→ DNS Server(Domain Name Server)

**IP address** **PORT number** ——→ **TCP/IP Socket Connection** <——— **Server**

### HTTP Request → Method + Request Headers + Request Body

### HTTP Response → Status code & Message + Response Headers + Response Body

## 2. Why Node.js was invented?

### JavaScript Engine → Code → Parser → Abstract Syntax Tree → Interpreter → Compiler → Output

**JS Engine** → Call Stack + Heap → Web APIs(DOM + FETCH API) + Callback Que(Timers + Click Events)

### Why Node.js is popular?

- We can use javascript on server side.
- Build highly scalable backend application.
- It is single threaded, **event driven** and works non blocking I/O.
- Perfect building data intensive, streaming application.

### V8 Engine

Node JS runtime is based on V8 Engine written C++ & JavaScript. Without V8 NodeJS would never understand JavaScript code.

V8 is most important dependencies of Node JS.

### Livuv

Libuv is an open source library written on C++ which focuses on asynchronous I/O and gives node access to Computer OS, File Systems, Networking, etc.

1. **Event Loop** → Executes callback functions + Network I/O
2. **Thread Pool** → CPU intensive tasks + File access + File compression + Cryptography

## 4. High level overview of Node.js Architecture

### Event Driven Architecture(Event Emitter → Event Listener → Callback)

### Event Loop

It is the heart of Node JS which makes the asynchronous programming possible in Node JS.

- Most of the tasks of Node JS happens in Event Loop.
- Received events and execute callback associated with each callback function.
- Offloads the CPU intensive tasks to Thread Pool.

### Phrases of Event Loop

**Callback Queue:**

1. Phrase 1: Handles callback functions of expired timers (eg: setTimeOut)
2. Phrase 2: Handles callback functions of I/O polling and I/O executions (eg: Networking, File accessing). 99% of our code get execute here
3. Phrase 3: Handle callback functions of setImmediate timer.
4. Other queues are executed in the mean time, depends on event loop

**process.nextTick() Queue,**

**Other Microtask Queue.**

### 6. Download Node.js

```tsx
// Download and install fnm
winget install Schniz.fnm

// Download and install Node.js
fnm install 22
```

### 7. Module System

1. Local Modules(we create)
2. Built in modules(come with node.js)
3. Third party modules(create by others)

### 8. Explore common.js module

```tsx
// file-1.js
const var1 = require("./file-2");
const { a: a3, add: add3, b: b3 } = require("./file-3");

console.log(var1.a);
console.log(add3(2, 3));

// file-2.js
const a = 10;
const add = (num1, num2) => num1 + num2;
module.exports = {
  a,
  add,
};

// file-3.js
let a = 20;
let b = 30;
const add = (num1, num2, num3) => num1 + num2 + num3;
module.exports = {
  a,
  add,
  b,
};

// By Default module.exports find index.js file
```

### 9. IIFE a Module Wrapper
