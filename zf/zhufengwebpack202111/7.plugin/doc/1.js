let { AsyncSeriesBailHook } = require('tapable');
//异步串行保险钩子
//1 2 3---
//factorize其实是表示生成模块的过程
let factorize = new AsyncSeriesBailHook(["resolveData"]);
//你可以写一个自定义的回调来拦截生产过程
factorize.tapAsync('tap1', (resolveData, callback) => {
    if (resolveData.request === 'lodash') {
        callback(null, { externalModule: 'lodash' });
    } else {
        callback(null);
    }
});
//就是普通的生成模块
factorize.tapAsync('tap2', (moduleName, callback) => {
    callback(null, { normalModule: moduleName });
});

factorize.callAsync('lodash', (err, module) => {
    console.log(module);
})
factorize.callAsync({ request: 'jquery' }, (err, module) => {
    console.log(module);
})