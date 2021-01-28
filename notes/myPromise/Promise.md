## 开始Promise


promise 的特点以及概念
https://promisesaplus.com/ promisea+ 规范 都通过这个规范来实现的

promise es6 内部已经实现了。 ie以下不支持promise, 需要polyfill  es6-promise


promise 为什么会产生  解决异步问题

- 1.多个异步请求并发 （希望同步最终的结果） Promise.all
- 2.链式异步请求的问题 上一个人的输出是下一个人的输入  Promise的链式调用可以解决这个问题
- 3.缺陷：还是基于回调的




根据Promise A+规范来写。 

IE不支持 Promise 但是polyfill 和 es6-promise可以支持

为什么需要Promise 解决回调地狱 CallBack   Hell 还有异步的 问题

Promise的三个 状态  成功(resolve)  失败(reject)  等待(pending)  成功失败不可以相互调换, 等待可以到成功或者失败    但是 成功和 失败不能变成 等待 

```js
let p1 = new Promise((resolve,reject)=>{ //基本的使用
    resolve('success')
})
```

首先在Promise的实例中传入的函数，是直接执行的 所以在Promise类中  传入的exec函数直接执行。

Promise的每一个实例都具有一个 then 方法。then中一个 参数是成功的回调，第二个是失败的函数

如果执行函数时 抛出了异常，也会执行reject函数
对上面一句的解释是：在Promise中执行的函数 还要在一个trycatch中执行，如果有抛出异常，则可以直接catch到reject中



```js

p1.then((data)=>{
    //function1 resolve
    console.log('success',data) // data就是在上面resolve函数中传入的参数 可以是undefined 等等
},(e)=>{
    // function2
    console.log('err',e)
})
```



Promise 的实现

```js
// Promise有三个状态，设置为全局
const  RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class  jPromise {
    constructor(executor){
        this.status = PENDING
        this.value = undefined //表示成功的原因
        this.reason = undefined //失败的原因
        
        //这 两个函数不在原型上
        let resolve = (v) => { //
            if(this.status === PENDING) {
                this.value = v
            	this.status = RESOLVED
            }
        }
        let reject = (e) => {
            if(this.status === PENDING) {
            	this.reason = e
            	this.status = REJECTED
            }
           
        }
        try{
           executor(resolve, reject)//立即执行 
        }catch(e) { //抛出异常 就是reject
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {  //写实例上面的then方法
        // 
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECTED)  {
            onRejected(this.reason)
        }
    }
}

```

在执行器中 可能有异步操作 ，所以在调用then方法之后可能 还是pending的状态 

所以 在状态还是pending的时候 将then中的两个函数 存起来（发布订阅） 然后再 重新执行。

then可以类似调用  这个时候说明 我们调用了then之后 又返回了一个 Promise实例.

```js
const  RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class  jPromise {
    constructor(executor){
        this.status = PENDING
        this.value = undefined //表示成功的原因
        this.reason = undefined //失败的原因
        this.onResolvedCallbacks= [] // 成功的函数 因为在then方法中会多次调用，所以会有好多个成功或者失败的 状态 。
        this.onRejectedCallbacks= []  
        //这 两个函数不在原型上
        let resolve = (v) => { //
            if(this.status === PENDING) {
                this.value = v
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(e=>e())
            }
        }
        let reject = (e) => {
            if(this.status === PENDING) {
            	this.reason = e
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(e=>e())
            }
           
        }
        try{
           executor(resolve, reject)//立即执行 
        }catch(e) { //抛出异常 就是reject
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {  //写实例上面的then方法
        // 
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECTED) {
            onRejected(this.reason)
        }
        if(this.status === PENDING) {
            this.onResolvedCallbacks.push(()=>{onFulfilled(this.value)})
            this.onRejectedCallbacks.push(()=>{onRejected(this.reason)}) 
            //AOP 切片编程  如果在这两个队列中 直接运行成功 或者失败的函数，那会有问题 ，所以 要传入箭头函数
            // 运行这个  箭头函数 的时候才 运行成功的函数。
        }
    }
}
```

如何解决链式调用？
1.promise成功和失败的回调返回值，可以传递到then中。
2.如果是普通值的话可能那就 传递到下一次的成功函数中。
意思就是 在 第一个then中如果return了一个普通的值，那么在下一个then中 将调用 第一个成功 的函数。
```js
    let p2 =new Promise((success,error)=>{
        error(200)
    }).then((e)=>{
        console.log(3,e)
    },  (f)=>{
        console.log(f,'cw',3);return 3  //这里的reject函数 返回了一个普通的数字 
    }).then((e)=>{
        console.log(3,'cg2',e) //执行的是这一行代码。 说明执行了下一个  resolve函数  并且传入了return的值。
    },  (f)=>{
        console.log(f,'cw',3);return 3
    })
```
所以如果在第一个then中 有了 出错的情况，那么下一个then 将会走错误的函数。
而且在 错误处理中，如果第一个then压根没有 reject函数，那么就会找下一个then中的错误 。


这里 在then方法中加入一个 promise2 并且因为promise都是立即执行的， 所以我们将then中的代码全部放入promise2并且返回这个promise2
同时，在RESOLVED状态中将onFulfilled的返回值作为这个promise2的resolve，所以 能够进行 链式调用并且传入下一个then中 。
实例代码
```js
let p2 = new jPromise((resolve,reject)=>{
    resolve(100)
})
let p3 =p2.then((e)=>{console.log(e);return 3})
p3.then(e=>console.log(e))  // 100 ,3

```


```js
then(onFulfilled, onRejected) {  //写实例上面的then方法
        
        let promise2 = new jPromise((resolve,reject)=>{ // 为了实现链式调用
            if(this.status === RESOLVED) {
                let x = onFulfilled(this.value)
                resolve(x)
            }
            if(this.status === REJECTED) {
                onRejected(this.reason)
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(()=>{onFulfilled(this.value)})
                this.onRejectedCallbacks.push(()=>{onRejected(this.reason)}) 
                //AOP 切片编程  如果在这两个队列中 直接运行成功 或者失败的函数，那会有问题 ，所以 要传入箭头函数
                // 运行这个  箭头函数 的时候才 运行成功的函数。
            }
        })
        return promise2;
    }
```
问题：
```js
let p1= new Promise((resolve,reject)=> {
    resolve(1)
})
let p2 = p1.then(e=>{}).then(e=>{})
// 以上代码和以下代码有什么区别？
let p1= new Promise((resolve,reject)=> {
    resolve(1)
})
let p2 = p1.then(e=>{})
p2.then(e=>{})
/*
上面的p2是then  2次返回的，下面的p2是then 1次返回的。
*/
```
##  Promise值的穿透
```js
let p =new Promise((resolve,reject)=>{
    resolve(1)
})
p.then().then().then(e=>{console.log(e)})
// 1
```

如果没有传参数，那就依次向下传递。
在then方法中，来这么2段代码。
同样，如果是reject的话，也要可以。
所以判断onRejected是否存在，如果不存在，那么抛出一个data，那么就可以传递到下一个reject里面了。
```js
onFulfilled =  typeof  onFulfilled==='function'?onFulfilled:v=>v;
onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

```

## catch方法的实现
catch方法就是在最后统一处理错误，那么根据上面的穿透，其实catch可以等同于以下代码。
```js
then(null,err=>{})
```
所以我们 可以在Promise的类中 ，写入catch方法。
```js
catch(e) {
    return this.then(null,e)
}
```

在Promise的类的原型上，还有自带的resolev和reject方法，使用如下：
```js
Promise.resolve(1).then(e=>console.log(e))
// 1
等同于
new Promsie((resolve,reject)=>{
    resolve(1)
}).then(e=>console.log(e))
```
所以在 Promise里面加入两个静态 方法
```js
static resolve(data){
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}
static reject(reason){
    return new Promsie((resolve,reject)=>{
        reject(reason)
    })
}
```

但是这样的话，如果在resolve中传入的还是一个Promise的话，那么不能够输出这个promise 的resolve结果。
在resolve中加入以下代码

```js
if(v instanceof jPromise){
    return v.then(resolve,reject)
}
```




### resolve和reject的区别
resolve会等待里面的定时器，但是reject不会等待其中的定时器。


### finally
finall表示的不是最终执行的意思 ，finally里面没有参数，只能执行。
代表的是，不管 成功还是失败，都调用。
但是如果finall里面返回了一个promise后，会等待这个promise执行 。（如果是reject的，也会传给下一个then或者catch。

疑惑
finally
```js
jPromise.prototype.finally = function(cb) {
    return this.then((value)=>{
        return jPromise.resolve(cb()).then(()=>value)
    },reason=>{
        return jPromise.resolve(cb().then(()=>{throw reason}))
    })
}
```


## promisify是什么？
在node中 require('util')
util中有一个promisift方法，将同步函数放入，将会返回一个用promise封装的异步方法。
注意：promisify只能转换node的API

```js
const promisify = fn => (...args)=>{
    return new Promsie((resolve,reject)=>{
        fn(...args),function(err,data) {
            if(err) reject(err)
            resolve(data)
        }
    })
}
```


# Promise.all

在函数里面 ，传入的参数一定是一个数组
然后在数组中遍历 如果元素是一个Promise对象那么才执行操作
```js
const isPromise = v => typeof v.then === 'function'
Promise.all = function (promises) {
    return new Promise((resolve,reject)=>{
        // 异步：并发 使用for循环迭代执行 和串行 就是回调，一个任务是下一个任务的前提
        // 遍历数组，依次拿到结果
        let arr = []
        let index = 0;
        const processData = (key,data) =>{
            arr[key] = data
            if(++index === promises.length) {
                resolve(arr)
            }
        }
        for(let i=0;i<promises.length;i++) {
            let result = promises[i];
            if(isPromise(result)) {
                result.then((data)=>{
                    processData(i,data)
                },reject)
            }else {
                // 如果这个result不是promise那么直接返回它。
                processData(i,result)
            }
        }
    })
}
```


#Promise.race
race就是赛跑 哪一个先成功，就用哪个。

## 中断一个Promise


```js
    Promise.resolve(1).then().then().then(data=>{console.log(data)})// 输出1
    Promise.resolve(1).then().then(()=>{
        return new Promise((resolve,reject)=>{
            //只要在中间来一个什么都不做的Promise就可以中断这个promise
        })
    }).then(data=>{console.log(data)})
```


# generator
生成器
生成一个遍历器



