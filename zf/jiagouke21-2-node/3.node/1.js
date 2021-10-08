console.log(1);
async function async () {
    console.log(2);
    await console.log(3);
    console.log(4)
}
setTimeout(() => {
	console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
	console.log(res)
})
async(); 
console.log(8);


// async 执行后返回的是一个promise
// await 后面包装的内容 await console.log(3); => return Promise.resolve(console.log(3)).then(()=>console.log(4))

//  1  6  2  3  8   7 4    5


// 微任务队列[7then，4then]