const { SyncBailHook } = require('tapable');
/**
 * 当事件回调函数的返回值非undefined的时候就会停止后续的事件函数执行
 * 
 */
const hook = new SyncBailHook(["name", "age"]);

hook.tap('1', (name, age) => {
    console.log(1, name, age);
    return undefined;
})

hook.tap('2', (name, age) => {
    console.log(2, name, age);
    //如果有返回值，后面的都不走了
    return 2;
})

hook.tap('3', (name, age) => {
    console.log(3, name, age);
    return 3;
})
hook.call('zhufeng', 13);