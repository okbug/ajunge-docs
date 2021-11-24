

class Hook {
    constructor(args) {
        //事件回调参数的函数列表数组['name','age']
        this.args = args;
        //放置所有的事件函数对象 [{type:'sync',fn,name:'1'}]
        this.taps = [];
        this._x = null;//[fn]
        this.call = CALL_DELEGATE;
        this.callAsync = CALL_ASYNC_DELEGATE;
        this.promise = PROMISE_DELEGATE;
        this.interceptors = [];//拦截器的数组
    }
    intercept(interceptor) {
        this.interceptors.push(interceptor);
    }
    tap(options, fn) {
        this._tap('sync', options, fn);
    }
    tapAsync(options, fn) {
        this._tap('async', options, fn);
    }
    tapPromise(options, fn) {
        this._tap('promise', options, fn);
    }
    _tap(type, options, fn) {
        if (typeof options === 'string') {
            options = { name: options }
        }
        let tapInfo = { ...options, type, fn };
        this._runRegisterInterceptors(tapInfo);
        this._insert(tapInfo);
    }
    _runRegisterInterceptors(tapInfo) {
        for (const interceptor of this.interceptors) {
            if (interceptor.register) {
                interceptor.register(tapInfo);
            }
        }
    }
    _insert(tapInfo) {
        let before;
        if (typeof tapInfo.before === 'string') {
            before = new Set([tapInfo.before]);
        } else if (Array.isArray(tapInfo.before)) {
            before = new Set(tapInfo.before);
        }
        let stage = 0;
        if (typeof tapInfo.stage === 'number') {
            stage = tapInfo.stage;
        }
        let i = this.taps.length;
        while (i > 0) {
            i--;
            const x = this.taps[i];
            this.taps[i + 1] = x;
            const xStage = x.stage || 0;
            if (before) {
                if (before.has(x.name)) {
                    before.delete(x.name);
                    continue;
                }
                if (before.size > 0) {
                    continue;
                }
            }
            if (xStage > stage) {
                continue;
            }
            i++;
            break;
        }
        this.taps[i] = tapInfo;
        //this.taps.push(tapInfo);
    }
    compile() {
        throw new Error('抽象方法，子类必须重写此方法');
    }
    _createCall(type) {
        return this.compile({
            taps: this.taps,//事件函数
            args: this.args,//参数数且
            type,//钩子类型
            interceptors: this.interceptors
        });
    }
}
const CALL_DELEGATE = function (...args) {
    this.call = this._createCall('sync');
    //this是hook实例，我用this调用call方法，call里面的this肯定是指向hook实例的
    return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function (...args) {
    this.callAsync = this._createCall('async');
    //this是hook实例，我用this调用call方法，call里面的this肯定是指向hook实例的
    return this.callAsync(...args);
}
const PROMISE_DELEGATE = function (...args) {
    this.promise = this._createCall('promise');
    //this是hook实例，我用this调用call方法，call里面的this肯定是指向hook实例的
    return this.promise(...args);
}
module.exports = Hook;