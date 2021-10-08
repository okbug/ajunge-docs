let fs = require('fs').promises;



function* read() { // 更像同步
    const a = yield 'b.txt';
    const b = yield fs.readFile(a, 'utf8');
    return b;
}
function co(it) { // koa express 都是基于这个写法的
    return new Promise((resolve, reject) => { // 同步迭代用for -> 递归
        function next(data) {
            let { value, done } = it.next(data);
            // 浏览器内部resolve方法会判断如果是promise 直接会将promise返回
            if (done) {
                return resolve(value);
            }
            Promise.resolve(value).then(data => {
                next(data)
            }, reject)
        }
        next();
    })
}
co(read()).then(data => {
    console.log(data);
})
// let it = read();
// let {value,done } = it.next();
// value.then(data=>{
//     let {value,done} =  it.next(data);// 将data 放到a中
//     value.then(data=>{
//         let {value,done} =  it.next(data);// 将data 放到a中
//         it.next(data);

//     })
// })