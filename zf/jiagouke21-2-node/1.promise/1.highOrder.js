// 高阶函数是什么？ 1. 一个函数的参数的参数是一个函数, 我们就可以称之为高阶函数 （回调函数）
//                 2. 一个函数返回一个函数 我们也称之为高阶函数 (不单指闭包) 

function coreFn(a,b,c){
    // 实现了核心逻辑 
    console.log('core fn',a,b,c)
}
// 如果希望扩展公共的方法， 通过原型链扩展的属性是公共的
Function.prototype.before = function (beforeFn) {
    // this => coreFn
    return (...args)=>{ // newFn, 箭头函数的特点 没有this 没有arguments ， 没有原型链 
        // 把所有的参数收集成一个数组 
        beforeFn();
        this(...args); // 展开参数
    }
}
let newFn = coreFn.before(()=>{
    console.log('before fn')
})
// code runner


