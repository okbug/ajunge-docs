// 浏览器的事件环 
// 进程，“线程”
//  进程：计算机分配任务的 和调度的任务最小单位， 浏览器是一个多进程模型， 每个页卡都是一个独立的进程 （更稳定）
//  后端代码都是采用多进程

// 线程 ：  常见的线程有哪些  (JS是单线程的？主线程是单线程的)
//  GUI渲染 页面渲染，绘图、绘制 3d动画
//  js渲染引擎： 执行js代码  当js执行时 渲染线程会挂起  -》 渲染时不能执行js
//  事件触发线程 EventLoop
//  webApi 也会创建线程 事件、定时器、ajax请求都会创造一个线程
//  webworker
// ...

// 宏任务
// - <执行脚本 script> UI / setTimeout / setInterval / setImmediate /  事件 ajax  / MessageChannel  (I/O)

// 微任务
//- promise，MutationObserer,object.observe  (process.nextTick)  queueMircotask

// 渲染有关
// - requestAnimationFrame (（大约）16.6ms 会渲染一次页面，也有可能不渲染)  渲染之前执行的
// - requestIDleCallback 空闲时间执行 

Promise.resolve().then(data=>{
    console.log('promise1')
    Promise.resolve().then(data=>{
        console.log('promise2')
    })
})
setTimeout(() => {
    console.log('setimeout')
}, 0);

// 1.先执行script脚本，将宏任务和微任务进行分类，如果调用的是浏览器api ，浏览器会开一个线程，等时间到了，会自动的放入到宏任务队列中,微任务是直接放到微任务队列中的
// 2.js执行完毕后，会清空所有的微任务，如果微任务在产生微任务，会放到当前微任务队列的尾部
// 3.如果页面需要渲染，则会执行渲染流程

// 事件触发线程会不停的扫描宏任务队列，如果宏任务队列中有对应的回调，会取出来执行一个，继续执行上述过程
// 宏任务每次调用一个，微任务是请空所有


// 微任务队列每次执行宏任务 都会创造一个新的队列，宏任务队列只有一个