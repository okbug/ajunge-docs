const fs = require('fs'); 
// function after(times, callback) {
//     let data = {}
//     return function finish(key, value) { 
//         data[key] = value;
//         if (Reflect.ownKeys(data).length == times) {
//             callback(data);
//         }
//     }
// }
// let finish = after(2, (school) => {
//     console.log(school);
// })

// 发布订阅模式 需要两个 方法 “订阅” “发布”  观察者模式  （观察者模式是基于发布订阅的， 观察者模式是基于类来实现的）

// vue2 响应式原理 发布订阅还是观察者?  视图会依赖数据，数据变化后会“通知”视图更新
let event = {
    _arr:[],
    data:{},
    on(fn){
        this._arr.push(fn);
    },
    emit(key,value){
        this.data[key] = value;
        this._arr.forEach(fn=>fn(this.data))
    }
}
event.on((data)=>{ // 订阅第一次
    console.log('收到了一个数据',data)
})
event.on((data)=>{ // 订阅第二次
    if(Reflect.ownKeys(data).length == 2){
        console.log('收到了全部数据',data)
    }
})
fs.readFile('./name.txt', 'utf8', function(err, data) {
    event.emit('name', data)
})
fs.readFile('./age.txt', 'utf8', function(err, data) {
    event.emit('age', data)
});

// 发布订阅模式是基于一个中间 调度栈，发布和 订阅是解耦的