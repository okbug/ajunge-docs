const fs = require('fs');
const path = require('path');
const ReadStream = require('./ReadStream')
const rs = new ReadStream(path.resolve(__dirname, 'note.md'), {
    flags: 'r', // r读取  fs.open 用
    encoding: null, // 默认读取出来的是buffer类型
    autoClose: true, // 读取完毕后需要关闭流 fs.close
    emitClose: true, // 读取完毕后要触发close事件 emit('close')
    start: 0,
    end: 4, // start end 标识就是从索引为0 - 4的结果 = 5
    highWaterMark: 2 // 每次读取几个
});
rs.on('open', function(fd) {}); // 文件特有的close 和 open
rs.on('close', function() {
    console.log('close')
});
const arr = [];
rs.on('data', function(data) { // on('data') on('end') 说明他是一个可读流
    console.log(data);
    rs.pause();
    arr.push(data);
})
rs.on('end', function() {
    console.log(Buffer.concat(arr).toString())
});
rs.on('error', function(err) {
    console.log(err);
})
setInterval(() => {
    rs.resume();
}, 1000);