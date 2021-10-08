let Promise1 = require('./promise')

// let promise2 = new Promise1((resolve,reject)=>{
//     resolve('ok')
// }).then(data=>{ // 成功 -》 失败
//     return new Promise1((resolve,reject)=>{
//         setTimeout(() => {
//             resolve(new Promise1((resolve,reject)=>{
//                 setTimeout(() => {
//                     resolve('ok')
//                 }, 2000);
//             }));
//         }, 1000);
//     })
// })
// promise2.then((data)=>{
//      console.log(data);
// },err=>{
//     console.log('err',err)
// })


// 问题1 循环引用的问题
// let promise2 = new Promise((resolve,reject)=>{
//     resolve('ok')
// }).then(data=>{ // 成功 -》 失败
//     return promise2;// prending resolve()/reject()
// })
// promise2.then((data)=>{
//      console.log(data);
// },err=>{
//     console.log('err',err)
// })

// 问题2 x.then出错 别人的promise 不知道咋写的，想定义不可枚举的属性 会采用defineProperty，在去取值和设置值的时候做额外逻辑 会采用defineProperty
// Object.defineProperty(x,'then',{
//     get(){
//         if(times ==2){
//             throw new Error()
//         }
//     }
// })

// 问题3 可选参数
let p = new Promise1((resolve,reject)=>{
    reject('ok')
}).then().then().then((data)=>{
    console.log(data);
},err=>{
    console.log(err,'err')
})