const fs = require('fs').promises
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         // 将数组中的promise依次执行 
//         let result = [];
//         let index = 0;
//         function process(v,k){ // after 实现是一致的
//             result[k] = v;
//             if(++index == promises.length){ // 解决多个异步并发问题 只能靠计数器
//                 resolve(result);
//             }
//         }
//         for (let i = 0; i < promises.length; i++) {
//             let p = promises[i];
//             if (p && typeof p.then === 'function') {
//                 p.then(data => { // 异步
//                     process(data,i);
//                 }, reject); // 如果有一个promise失败了 那么就执行最后的失败逻辑
//             }else{
//                process(p,i);// 同步的
//             }
//         }
//     })
// }
// // Promise.all 表示全部成功才成功， 如果一个失败了 则失败
// Promise.all([fs.readFile('name.txt', 'utf8'), fs.readFile('age.txt', 'utf8'), 11]).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err)
// })
// Promise.settled

// 无论成功和失败都会执行的方法  和 try/catch/finally 不一样

Promise.prototype.finally = function (cb) {
    return this.then((y)=>{
       return Promise.resolve(cb()).then((d)=>y);
    },(r)=>{
        //                cb执行一旦报错 就直接跳过后续的then的逻辑，直接将错误向下传递
     return  Promise.resolve(cb()).then(()=> {throw r})
    })
}
Promise.reject('ok').finally(()=>{ // finally 如果返回的是一个promise那么会有等待效果
    console.log('无论成功失败都执行')
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('xxxxxxxxxxx'); // 如果是失败 会用这里的失败作为失败的原因
        }, 1000);
    });
}).then((data)=>{
    console.log('成功',data)
}).catch(err=>{
    console.log('失败',err)
});


// 事件环 同步异步，async await generator...
