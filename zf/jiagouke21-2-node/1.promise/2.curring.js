// 函数的柯里化 -》 高阶函数  

// 柯里化的概念： 如果一个函数有多个参数, 我们可以根据参数的个数 转化成n个函数，  柯里化我们一般都认为参数是一个一个的传递的
// 偏函数： 根据参数的个数 分解成函数，每次调用函数的参数个数可以不是一个

// (如果我们想暂存参数 可以考虑使用柯里化 ， 柯里化 就算是一个闭包函数)  (更加具体的函数)

// typeof   >  Array.isArray > Object.prototype.toString.call > instanceof > constructor

function isType(type,val){
    return Object.prototype.toString.call(val) === `[object ${type}]`
}
// function isType(type){
//     return function (val){
//         return Object.prototype.toString.call(val) === `[object ${type}]`
//     }
// }
let isString =curring(isType)('String');
let isNumber = curring(isType)('Number')
let isBoolean = curring(isType)('Boolean');


console.log(isString(123));
console.log(isNumber(456));
console.log(isBoolean(123));

// --------------------------------

// 实现一个通用的柯里化函数 开发是经常使用的，面试中经常被问到

function sum(a,b,c,d){
    return a+b+c+d;
}
// sum(1,2,3,4)

function curring(fn){
    let args = []; // 这里用来记录参数的个数, 记录每次调用传入的总个数
    const inner = (arr = []) =>{ // 每次调用的个数
        args.push(...arr);
        return args.length >= fn.length? fn(...args) : (...args)=> inner(args) // [2,3]
    }
    return inner();
}
let fn = curring(sum)
let fn1 = fn(1)
let fn2 = fn1(2,3)
let result = fn2(4);
console.log(result);