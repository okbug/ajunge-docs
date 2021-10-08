## Promise解决异步的方案有哪些?
- 高阶函数：函数柯里化 (让函数变得更具体些)、反柯里化(让一个功能的范围变大) Object.prototype.toString() => toString()。  防抖（不停的调用只执行一次）和节流(有规律的执行) （能手写） 类型判断（深拷贝非常常见的面试题？非递归的方式来实现。） 
- 回调解决异步问题 （并发、串行）  并发的核心原理就是计数器统及最后结果-> Promise.all。 回调嵌套问题 then链来解决
- 前端设计模式 发布订阅 EventEmitter库 （必须写完整 on emit off once） 观察者模式   区别：使用场景
- “手写Promise" （思想必须保证Ok） 高阶函数、发布订阅、一些回调的处理
- Promise周边的 finally、all、race、 Promise.allSettled、Promise.any  promise-limit设置请求上线 
- generator(实现原理)+ co原理（异步递归的核心思想）=》 async + await

> promise如何终端，如何终止promise链式，如何将node中的回调api转换成promise的方式 promisify;


## EventLoop浏览器的“事件环” 
- 同步异步 阻塞非阻塞， 线程进程的关系 ，浏览器中哪些线程，线程如何调度的
- 宏任务队列、微任务队列 + 浏览器渲染（requestFrameAnimation requestIdleCallback）
- 宏任务每次调用一个 微任务每次清空一个，宏任务队列只有一个，每次执行宏任务都会创造一个微任务队列，如果当前执行微任务时在产生微任务，会增加到当前队列中


## node
- 全局对象 setImmediate、process(env,argv,cwd(),platform....) commander
- require,dirname,filename,module.exports 如何实现的 commonjs实现原理
- Node EventLoop 和浏览器事件环的区别 poll  timer check
- 模块的使用 三种模块 fs(readFile existSync) path(resolve,join) util(promisify inherits) 
- EventEmitter库 实现原理
- 编码 怎么进行编码的转化  base64编码 base32
- 浏览器里面的事件叫customEvent

## buffer -> fs ->  流  -> tcp 三次握手  -> http