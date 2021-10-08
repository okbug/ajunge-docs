// let Promise = require('./promise')
const fs = require('fs');
const Promise = require('./promise/index');
// const Promise = require('./promise/2.index');

// 1.延迟对象来解决嵌套问题
// function readFile(...args) {
//     let dfd = Promise.deferred();
//     fs.readFile(...args, function(err, data) {
//         if (err) return dfd.reject(err);
//         dfd.resolve(data);
//     });
//     return dfd.promise
// }

// readFile('./a1.txt', 'utf8').then(data => {
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })// catch后面可以 继续调用then方法

// 静态方法  Promise.resolve()  Promise.reject();

// 原型上的方法是公共的通过实例来调用的,静态方法是放在类上调用的

// 差异在 resolve方法它具备等待效果




Promise.resolve(new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('hello','success');
    }, 1000);
})).then(data=>{
    console.log(data);
})
Promise.reject(new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('hello');
    }, 1000);
})).catch(err=>{
    console.log(err,'err');
})