const fs = require('fs'); // 引入node中的fs模块 

// 异步就是不能立即拿到返回值 ， 通过回调的方式获取放回结果

// let school = {}
// function finish() {
//     if (Reflect.ownKeys(school).length == 2) { // Object.keys()
//         console.log(school); // 渲染页面
//     }
// }
function after(times, callback) {
    let data = {}
    return function finish(key, value) { // 函数声明所在的作用域 和执行的作用域不是同一个此时就会产生闭包
        data[key] = value;
        if (Reflect.ownKeys(data).length == times) {
            callback(data);
        }
    }
}
let finish = after(2, (school) => { // 发布订阅模式 前端最常用的方式
    console.log(school);
})
fs.readFile('./name.txt', 'utf8', function(err, data) {
    // school['name'] = data;
    // finish();
    finish('name', data)
})
fs.readFile('./age.txt', 'utf8', function(err, data) {
    // school['age'] = data;
    // finish();
    finish('age', data)
});



// 对于前端 我们希望调用两个ajax 拿到最终的处理结果 去渲染页面 Promise.all

// 1.不用promise 异步就用回调的方式  2.发布订阅模式