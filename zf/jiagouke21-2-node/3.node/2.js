Promise.resolve().then(() => {
    console.log(0);
    return queueMicrotask(Promise.resolve(4)); // promisA+规范里面如何规定的？
}).then((res) => {
    console.log(res)
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
})

// 这里只有一个微任务队列

// [then4,then3]

// then0,then1,then2,then3,then4,then5
// 在ecmapscript规范中有描述，如果你返回了一个promise 他不会立刻处理这个promise，会将这个promise放到异步方法中进行处理 （会再次新生成一个微任务）