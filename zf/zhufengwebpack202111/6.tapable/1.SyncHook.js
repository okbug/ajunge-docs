const { SyncHook } = require('./tapable');
debugger
const hook = new SyncHook(["name", "age"]);
hook.tap('1', (name, age) => {
    console.log(1, name, age);
    //不关心返回值
    return 1;
})

hook.tap('2', (name, age) => {
    console.log(2, name, age);
    //不关心返回值
    return 2;
})

hook.tap('3', (name, age) => {
    console.log(3, name, age);
    //不关心返回值
    return 3;
})
hook.call('zhufeng', 13);








/**
 * Synchook是一个构造函数或者说是一个类
 * 参数是一个数组，用来指定事件回调函数的参数的列表，里面变量名没有用，但是数组的长度是用的
 * 如果没有参数，就传一个空数组
 * 回调执行的时候是按注册注册执行
 *
 */