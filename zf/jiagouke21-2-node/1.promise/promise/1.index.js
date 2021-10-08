const PENDING = 'PENDING'; // 默认等待态
const FULFILLED = 'FULFILLED'; // 成功态 
const REJECTED = 'REJECTED'; // 失败态
class Promise {
    constructor(executor) { // executor 会默认被执行  同步执行
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 用户调用resolve和reject 可以将对应的结果暴露在当前的promise实实例上
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (this.status == PENDING) {
                this.value = value;
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        const reject = (reason) => {
            if (this.status == PENDING) {
                this.reason = reason; // 这里先保存了reason
                this.status = REJECTED;
                // 调用了失败的逻辑
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try {
            executor(resolve, reject); // 默认new Promise中的函数会立即执行
        } catch (e) { // 如果执行时出错，我们将错误传递到reject中 -》 执行到了失败的逻辑
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status == FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status == REJECTED) {
            onRejected(this.reason);
        }
        if (this.status == PENDING) {
            this.onResolvedCallbacks.push(() => {
                // todo  可以实现其他逻辑
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                // todo  可以实现其他逻辑
                onRejected(this.reason);
            })
            // 发布订阅模式
        }
    }
}
module.exports = Promise