// race 方法 赛跑 调用的列表中任何一个成功或失败 就采用他的结果

const fs = require('fs').promises; // 如何将不是promise的异步api转换成promise


Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let promise of promises) {
            if (promise && typeof promise.then == 'function') {
                promise.then(resolve, reject)
            } else {
                resolve(promise);
            }
        }
    })
}

Promise.race([fs.readFile('note.md', 'utf8'), fs.readFile('1.js', 'utf8')]).then(data => {
    // console.log(data);
}, err => {
    // console.log(err);
});

// 图片懒加载 -》 请求超时的功能 （显示错误信息）  promise是没法中断执行的，无论如何都会执行完毕，只是不采用这个promise的成功或失败的结果了
// let abort;
// let p = new Promise((resolve,reject)=>{
//     // abort = reject; // 用户需要改变原来的加载逻辑 保存reject
//     setTimeout(() => {
//         resolve('图片加载完成');
//     }, 3000);
// });
// function wrap(old){ // ajax 的超时 靠的是 xhr.abort()
//     let abort;
//     let p2 = new Promise((resolve,reject)=>{
//         abort = reject;
//         // 内置了一个promise，我们可以控制这个promise，来影响promise.race 的结果
//     })
//     let returnPromise = Promise.race([old,p2])
//     returnPromise.abort = abort;
//     return returnPromise
// }
// let newPromise = wrap(p);

// setTimeout(() => {
//     newPromise.abort('超时 2000');
// }, 2000);
// newPromise.then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err)
// });



// 我希望中断promise的链式调用  throw error

Promise.resolve('1').then(data => {
    console.log(data);
    return new Promise(() => {}); // 返回一个promise，会采用他的状态 ,如果不成功也不失败，就不会向下执行了
}).then((data) => {
    console.log(data)
});

// 不采用原有结果 Promise 破坏链式调用 可以采用返回一个pendding的promise


// setTimeout(() => {
//     abort('超时')
// }, 2000);
// p.then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err);
// })



// 1) promisfy 这个方法可以将所有的回调方法 转化成promise
// function promisify(fn){ // 高阶函数
//     return function (...args){
//         return new Promise((resolve,reject)=>{
//             // fs.readFile(...args,function(){})
//             fn(...args,function(err,data){ // node 所有的api第一个参数都是error
//                 if(err) return reject(err);
//                 resolve(data);
//             })
//         })
//     }
// }
// function promisifyAll(obj){ // 重写对象中的方法
//     for(let key in obj){
//         if(typeof obj[key] == 'function'){ // readFile\writeFile
//             obj[key] = promisify(obj[key])
//         }
//     }
//     return obj;
// }
// // let read = promisify(fs.readFile)
// let newFs = promisifyAll(fs);
// newFs.readFile('note.md','utf8').then(data=>{
//     console.log(data)
// })