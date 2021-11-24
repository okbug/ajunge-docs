let sum = (a,b)=>a+b;
//箭头函数肯定是可以call来调用的，只不过你不能修改它的this指向了
let result = sum.call(null,1,2);
console.log(result);