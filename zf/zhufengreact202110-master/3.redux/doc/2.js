

let obj1 = { type: 'add11' };
//你能传给原生的store.dispatch方法的只能是纯对象，不能是函数
console.log(Object.getPrototypeOf(obj1) === Object.prototype);
console.log(Object.getPrototypeOf(function () { }) === Object.prototype);

console.log(Object.getPrototypeOf(new Promise()) === Object.prototype);