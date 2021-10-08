// let promise = new Promise((resolve,reject)=>{
//     resolve('ok')
// });

// promise.then((data)=>{
//     console.log(data)
// },()=>{

// })
let Promise = require('./promise')
const fs = require('fs');
// 为什么要处理链式调用 我们写一个功能  先读取a.txt 文件，拿到具体的内容 读取内容对应的文件
// fs.readFile('./a.txt','utf8',function (err,data) {  回调地狱 错误不好处理，代码全部耦合在一起
//     fs.readFile(data,'utf8',function (err,data) {
//         console.log(data);
//     })
// })

function readFile(...args){
    return new Promise((resolve,reject)=>{
        fs.readFile(...args,function (err,data) {
            if(err) return reject(err);
            resolve(data);
        })
    })
}
// 可以在then方法(成功和失败)中 返回一个promise， promose会采用返回的promise的成功的值或失败原因, 传递到外层下一次then中

// 1. then方法中 成功的回调或者失败的回调返回的是一个promise，那么会采用返回的promise的状态，走外层下一次then中的成功或失败， 同时将promise处理后的结果向下传递
// 2.then方法中 成功的回调或者失败的回调返回的是一个普通值 （不是promise） 这里会将返回的结果传递到下一次then的成功中去
// 3.如果在then方法中 成功的回调或者失败的回调 执行时出错会走到外层下一个then中的失败中去
let promise2 = readFile('./a.txt','utf8').then(data=>{ // 成功 -》 失败
    throw new Error('123')
},err=>{
    return 200;
})
promise2.then((data)=>{
     console.log(data);
},err=>{
    console.log('err',err)
})
// promise 一旦成功不能失败
// 如果返回的是一个失败的promoise  、 报错了 。才会走下一个then的失败，否则全部走成功
// 如何实现链式调用？ return new Promise() 每次都产生一个全新的promise，来保证状态可以正常的切换