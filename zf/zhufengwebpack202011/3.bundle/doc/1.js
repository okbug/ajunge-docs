//toStringTag
console.log(Object.prototype.toString.call('foo'));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(3));
console.log(Object.prototype.toString.call(true));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
let person = {name:'张三'};
Object.defineProperty(person,Symbol.toStringTag,{value:'人'});
let dog = {name:'大黄'}
Object.defineProperty(dog,Symbol.toStringTag,{value:'狗'});
console.log(Object.prototype.toString.call(person));
console.log(Object.prototype.toString.call(dog));