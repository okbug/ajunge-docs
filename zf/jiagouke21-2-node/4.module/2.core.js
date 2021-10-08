const EventEmitter = require('./3.events'); // 可以直接引用的模块，不需要自己写，或者引入模块，就是核心模块
const util = require('util')
// 发布订阅 on 订阅  emit 发布   off 取消订阅   once 绑定一次
function Girl() {
    // EventEmitter.call(this);
}
// 原型继承有三种写法
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype); es6
// Girl.prototype = Object.create(EventEmitter) // es5
// Girl.prototype.__proto__ = EventEmitter.prototype
util.inherits(Girl, EventEmitter)

// 一般情况我们实现继承 （类属性继承 + 实例继承 + 原型继承 = es6 extend）
const events = new Girl;
// process.nextTick(()=>{ // nextTick 里面可以解决异步调用问题，方式优于promise.then
//     events.emit('女孩失恋了','boy')
// })
const cry = function(name) {
    console.log('哭', name)
}
events.on('女孩失恋了', cry)
events.on('女孩失恋了', function(name) {
    console.log('吃', name)
})
const shopping = function (name) {
    console.log('逛街',name)
}
events.once('女孩失恋了',shopping);
events.off('女孩失恋了',shopping)
events.off('女孩失恋了',cry);

events.emit('女孩失恋了', 'boy'); // 执行完毕后就将这个函数移除掉了 下次不会在继续触发了
events.emit('女孩失恋了', 'boy');

// {女孩失恋了:[fn,fn,fn]}  vue3 mitt