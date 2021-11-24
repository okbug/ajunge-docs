/**
 * stage阶段 在UMI插件系统中用到stage
 * UMI里会让用户可以写自定义插件，但是官方自己的插件也是以同种方式注册的
 * stage 和 before 都是用于调整执行顺序的，参考 tapable
 * stage 默认是 0，设为 -1 或更少会提前执行，设为 1 或更多会后置执行
 */
let { SyncHook } = require('./tapable');
let hook = new SyncHook(['name']);
hook.tap({ name: 'tapA', stage: 1 }, () => {
    console.log('tapA');
});
hook.tap({ name: 'tapB', stage: 3 }, () => {
    console.log('tapB');
});
hook.tap({ name: 'tapC', stage: 5 }, () => {
    console.log('tapC');
});
hook.tap({ name: 'tapD', stage: 2 }, () => {
    console.log('tapD');
});
hook.call('zhufeng');