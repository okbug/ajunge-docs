const fs = require('fs');// 文件流 是文件操作中自己实现的流 , 文件流是继承于stream的，底层的实现用的是 fs.read fs.open ...

const path =require('path');
const ReadStream = require('./ReadStream')
const rs = new ReadStream(path.resolve(__dirname,'note.md'),{
    flags:'r', // r读取  fs.open 用
    encoding:null, // 默认读取出来的是buffer类型
    autoClose: true, // 读取完毕后需要关闭流 fs.close
    emitClose:true, // 读取完毕后要触发close事件 emit('close')
    start:0,
    end:4, // start end 标识就是从索引为0 - 4的结果 = 5
    highWaterMark: 2 // 每次读取几个
});

// if(this._events[eventrName]){
//     if(eventrName !=== 'newListener'){
//         this.emit('newListener',eventName)
//     }
// }

rs.on('open',function (fd) {// 打开文件后会传输一个fd属性, open close是文件流特有的 
    // console.log(fd)
});
rs.on('close',function () {
    console.log('close')
});
const arr = [];
rs.on('data',function(data){ // 如果绑定了data事件 ，会不停的触发data事件，将内部数据传递出来 
    console.log(data);
    rs.pause(); // 不要继续触发data事件
    arr.push(data);
})
rs.on('end',function () {
    console.log( Buffer.concat(arr).toString())
});
rs.on('error',function (err) {
    console.log(err);
})
setInterval(() => {
    rs.resume();  // 恢复触发data事件
}, 1000);

// fs.open
//     fs.read
//         fs.close