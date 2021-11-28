
class Parent{

}
class Child extends Parent{

}
let c = new Child();
console.log(c instanceof Child);
console.log(c instanceof Parent);
console.log(c instanceof Object);
console.log(Object.getPrototypeOf(c)== Object.prototype);