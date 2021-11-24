const { SyncHook } = require('./tapable');
const syncHook = new SyncHook(['name', 'age']);
let intercept1 = {
    register(tapInfo) {
        console.log('拦截器1开始register');
    },
    tap() {
        console.log('拦截器1开始tap');
    },
    call() {
        console.log('拦截器1开始call');
    }
}
syncHook.intercept(intercept1);
let intercept2 = {
    register(tapInfo) {//挂载注册的时候触发
        console.log('拦截器2开始register');
    },
    tap() {//也是call的时候触发，一次call可能会触发多次，每个回调函数都会触发一次
        console.log('拦截器2开始tap');
    },
    call() {//call的时候触发，一次call只会触发一次
        console.log('拦截器2开始call');
    }
}
syncHook.intercept(intercept2);
syncHook.tap({ name: '回调A' }, () => {
    console.log('回调A');
});
syncHook.tap({ name: '回调B' }, () => {
    console.log('回调B');
});
debugger
syncHook.call();
/**
拦截器1开始register
拦截器2开始register
拦截器1开始register
拦截器2开始register

拦截器1开始call
拦截器2开始call
拦截器1开始tap
拦截器2开始tap
回调A
拦截器1开始tap
拦截器2开始tap
回调B
 */