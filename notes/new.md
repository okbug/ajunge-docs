## 手写new和Object.create
# Object.create的用途
创建一个对象，在原型中继承原对象
```js
let a = { fruit : 'apple' }
let b = new Object(a) 
console.log(b) // {fruit: "apple"}
console.log(b.__proto__) // {constructor}
console.log(b.fruit) // apple
b.__proto__ == Object.prototype // true *


let a = { fruit: 'apple' }
let b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {fruit: "apple"}
console.log(b.fruit) // apple
b.__proto__ == Object.prototype // false *

```