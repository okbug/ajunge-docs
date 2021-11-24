//let { SyncHook } = require('tapable');
/* class SyncHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tap(name, fn) {// events on
        this.taps.push(fn);
    }
    call(...args) {//events emit
        this.taps.forEach((tap) => tap(...args));
    }
} */
let syncHook = new SyncHook(['name', 'age']);
syncHook.tap('监听器的名字1', (name, age) => {
    console.log(name, age);
})
syncHook.tap('监听器的名字2', (name, age) => {
    console.log(name, age);
})
syncHook.call('zhufeng', 13);