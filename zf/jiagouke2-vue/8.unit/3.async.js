// 异步代码的测试

// 测试3秒后返回结果




export function getData(cb) { // 异步api 回调函数
    setInterval(() => {
        cb({ name: 'jw' });
    }, 5000);
}

// export function getDataPromise() { // 异步通过promise来实现的 
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({ name: 'jw' })
//         }, 3000);
//     })
// }