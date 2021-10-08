const PENDING = 'PENDING'; // 默认等待态
const FULFILLED = 'FULFILLED'; // 成功态 
const REJECTED = 'REJECTED'; // 失败态
function resolvePromise(x, promise2, resolve, reject) { // 我们还需要考虑 x 可能是别人家的promise
    // 希望我的promise可以和别人的promise一起来混用的 q库 bluebird库
    // If promise and x refer to the same object, reject promise with a TypeError as the reason
    if (x === promise2) {
        return reject(new TypeError('循环引用'))
    }
    // 继续判断x 是不是一个promise  promsise需要有then方法 (啥时候是函数的？ 别人写的proimise 就有可能是函数)
    if ((typeof x === 'object' && x !== null) || (typeof x == 'function')) {
        // 才有可能是一个promise, 继续判断x 是否有then
        // Let then be x.then
        let called = false;
        try {
            let then = x.then; // 尝试取then方法  
            if (typeof then == 'function') { // 我就认为他是promise了
                // x.then // 这个会再次取一次属性 触发get方法
                // then.call(x) // 这个不会
                then.call(x, (y) => { // y有可能还是一个promise ，所以要再次进行解析流程
                    // 我需要不停的解析成功的promise中返回的成功值，直到这个值是一个普通值
                    if(called) return;
                    called = true
                    resolvePromise(y,promise2,resolve,reject);
                }, (r) => {
                    if(called) return;
                    called = true
                    reject(r);
                });
            } else { // {then:1}
                resolve(x);
            }
        } catch (e) {
            if(called) return;
            called = true
            reject(e); // 让promise2 变成失败态
        }
    } else {
        // x 是一个普通值 
        resolve(x);
    }
    // 1.如果x 是一个普通值 则直接调用resolve即可
    // 2. 如果x 是一个promise那么应该采用这个promise的状态 决定调用的是 resolve还是reject
}
class Promise {
    constructor(executor) { // executor 会默认被执行  同步执行
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 用户调用resolve和reject 可以将对应的结果暴露在当前的promise实实例上
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            // value.then
            if(value instanceof Promise){ // 这个方法并不属于 规范中的，只是为了和原生的promise表现形式一样
                return value.then(resolve,reject); // === resolvePromise
            }
            if (this.status == PENDING) {
                this.value = value;
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.status == PENDING) {
                this.reason = reason; // 这里先保存了reason
                this.status = REJECTED;
                // 调用了失败的逻辑
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject); // 默认new Promise中的函数会立即执行
        } catch (e) { // 如果执行时出错，我们将错误传递到reject中 -》 执行到了失败的逻辑
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled == 'function'? onFulfilled:v=>v;
        onRejected = typeof onRejected == 'function' ? onRejected : e=>{throw e};
        // 每次调用then方法 都必须返回一个全新的promise
        let promise2 = new Promise((resolve, reject) => { // x 就是上一个then成功或者失败的返回值，这个x决定proomise2 走成功还是走失败
            if (this.status == FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status == PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        });
        return promise2;
    }
    catch(errFn){
        return this.then(null,errFn);
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value);
        })
    }
    static reject(err){
        return new Promise((resolve,reject)=>{
            reject(err);
        })
    }
}
Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise;

// npm install promises-aplus-tests -g;
// promises-aplus-tests promise/index.js