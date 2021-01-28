// Promise有三个状态，设置为全局
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
const resolvePromise = (promise2, x, resolve, reject) => {
    let called;
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if ((typeof x === 'object' && x != null) || typeof x === 'function') { // 可能是一个Promise
        // 但是还是需要继续判断 可能是Promise
        try {
            let then = x.then
            if (typeof then === 'function') { //很大概率是是一个Promise
                then.call(x, y => {
                    // resolve(y) 也需要解析 防止y也是一个promise
                    if (called) return
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e)
                })
            } else {

                resolve(x)
            }
        } catch (e) { // 防止失败了再次成功
            if (called) return;
            called = true;
            reject(e)
        }
    } else { // 如果是普通值 直接resolved
        resolve(x)
    }
}

class jPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined // 表示成功的原因
        this.reason = undefined // 失败的原因
        this.onResolvedCallbacks = [] // 成功的函数（队列） 因为在then方法中会多次调用，所以会有好多个成功或者失败的 状态 。
        this.onRejectedCallbacks = []
            // 这两个函数不在原型上
            // 并且在执行函数executor的try catch 中 传入 进行在成功和失败的队列中执行函数
        let resolve = (v) => { //
            // 如果是一个Promise的话 需要返回这个Promise的then方法
            if (v instanceof jPromise) {
                return v.then(resolve, reject)
                
            }
            if (this.status === PENDING) {
                this.value = v
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(e => e()) // 对成功的队列开始执行 执行的是？ ：then方法中的函数 
            }
        }
        let reject = (e) => {
            if (this.status === PENDING) {
                this.reason = e
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(e => e())
            }

        }
        

        // 直接执行在这里 传入的两个函数不在实例上 只是在这个作用域内对的两个函数
        // 这两个函数作用：往执行队列中开始执行
        try {
            executor(resolve, reject) //立即执行 
        } catch (e) { //抛出异常 就是reject
            reject(e)
        }
    }
    catch (e) {
        return this.then(null, e)
    }
    static resolve(data) {
        return new jPromise((resolve, reject) => {
            resolve(data)
        })
    }
    static reject(reason) {
        return new jPromise((resolve, reject) => {
            reject(reason)
        })
    }
    then(onFulfilled, onRejected) { //写实例上面的then方法
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
        let promise2 = new jPromise((resolve, reject) => { // 为了实现链式调用
            if (this.status === RESOLVED) {
                setTimeout(() => { // 为啥要定时器，事件循环 在new的时候才能获得Promise2的值。
                    // 因为new的时候是同步 setTimeout是宏任务，会在new之后执行。
                    // 再加入trycatch 捕获错误。
                    try {
                        let x = onFulfilled(this.value)
                            // resolve(x)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0);
            }
            // pending代码本来就是 异步的  所以定时器 加不加都可以
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (e) {
                                reject(e)
                            }

                        }, 0);
                    })
                    //AOP 切片编程  如果在这两个队列中 直接运行成功 或者失败的函数，那会有问题 ，所以 要传入箭头函数
                    // 运行这个  箭头函数 的时候才 运行成功的函数。
            }
        })
        return promise2;
    }
}

// 规范测试
jPromise.defer = jPromise.deferred = function() {
    let dfd = {};
    dfd.promise = new jPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

//promisify
const promisify = fn => (...args) => {
    return new jPromsie((resolve, reject) => {
        fn(...args),
            function(err, data) {
                if (err) reject(err)
                resolve(data)
            }
    })
}

//Promise.all
const isPromise = v => typeof v.then === 'function'
jPromise.all = function (promises) {
    return new jPromise((resolve,reject)=>{
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

// Promise.race
jPromise.race = function(promises) {
    return new jPromise((resolve,reject)=>{
        for (let i=0;i<promises.length;i++) {
            let result = promises[i];
            if(isPromise(result)) {
                result.then(resolve,reject)
            }else {
                resolve(result)
            }
        }
    })
}

// 模块导出
module.exports = jPromise