//toStringTag

/* console.log(Object.prototype.toString.call('foo'));//[object String]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(1));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({}));//[object Object]
 */
let obj1 = {};
Object.defineProperty(obj1, Symbol.toStringTag, { value: 'Obj1' });
let obj2 = {};
Object.defineProperty(obj2, Symbol.toStringTag, { value: 'Obj2' });
console.log(Object.prototype.toString.call(obj1));//[object Object]
console.log(Object.prototype.toString.call(obj2));//[object Object]