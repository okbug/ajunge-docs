const { SyncLoopHook } = require('tapable');
/**
 * 每次都是从头开始循环执行的
 * 有返回值就从头开始执行,如果没有返回值就执行下一个
 */
const hook = new SyncLoopHook();
let counter1 = 0, counter2 = 0, counter3 = 0;
hook.tap('1', () => {
    console.log('counter1', counter1);
    if (++counter1 === 1) {
        counter1 = 0;
        return;
    }
    return true;
});
hook.tap('2', () => {
    console.log('counter2', counter2);
    if (++counter2 === 2) {
        counter2 = 0;
        return;
    }
    return true;
});
hook.tap('3', () => {
    console.log('counter3', counter3);
    if (++counter3 === 3) {
        counter3 = 0;
        return;
    }
    return true;
});
//打印几行????
hook.call();