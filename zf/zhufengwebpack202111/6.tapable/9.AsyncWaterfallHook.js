const { AsyncSeriesWaterfallHook } = require('tapable');
const hook = new AsyncSeriesWaterfallHook(["name"]);
/* console.time('cost');
hook.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log(1);
        callback();
    }, 1000);
});
hook.tapAsync('2', (name, callback) => {
    setTimeout(() => {
        console.log(2);
        callback();
    }, 2000);
});
hook.tapAsync('3', (name, callback) => {
    setTimeout(() => {
        console.log(3);
        callback();
    }, 3000);
});
hook.callAsync('zhufeng', (err) => {
    console.log(err);
    console.timeEnd('cost');
}); */


console.time('cost');
hook.tapPromise('1', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(1, name);
            resolve('A');
        }, 1000);
    });
});
hook.tapPromise('2', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(2, name);
            resolve('B');
        }, 2000);
    });
});
hook.tapPromise('3', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(3, name);
            resolve('C');
        }, 3000);
    });
});
hook.promise('zhufeng').then((data) => {
    console.log('done', data);
    console.timeEnd('cost');
});