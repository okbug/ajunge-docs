## nexttick
node中实现的一个微任务机制，他的优先级比Promise高（指全部执行完后才可以执行Promise）
```js
process.nextTick(() => {
    // ...
})
Promise.resolve().then(()=> {

})
```



## setImmediate
setImmediate是node中的宏任务
立即执行（异步）
```js
setImmediate(()=> {
    console.log(2)
})
setTimeout(()=> {
    console.log(1)
})
// 顺序是不确定的 有的时候是21 也可能是12  在默认环境下执行会因为性能而影响
// 原因：在第一个timer的执行前可能时间还没有到达，触发不了定时器的回调，所以会先轮询到下面的check来检测setImmediate 所以先后不一定
计时器 受计算机的性能约束


```

- [x] timer 定时器们(setTimeout, setInterval)的回调函数执行的时间
pending cbs 待定的 上一轮没有执行的 存放的？？任务在这里 **统一** 执行
idle, prepare 内部使用 不管它
- [x]  poll 存放IO读写的回调函数，等待定时器到达这个事件
- [x] check setImmediate
close cbs 一些关闭的回调函数


浏览器和node：每走宏任务队列中的某个任务后，都会清空微任务

## 宏任务和微任务的分类
Vue.nextTice 是 混合型任务 可能是微任务 也可能是宏任务
### 微任务
then    process.nextTick 
### 宏任务
script标签 UI渲染 messageChannel（浏览器）  ajax addEventListener setTimeout requestFrameAnimation setImmediate
