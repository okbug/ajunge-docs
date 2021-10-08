const fs = require('fs'); // 基于文件的可写流  fs.open fs.write
const path =require('path');  
const WriteStream = require('./WriteStream');

const ws = new WriteStream(path.resolve(__dirname,'note.md'),{
    flags:'w',
    encoding:null,
    mode:0o666,
    autoClose:true,
    emitClose:true,
    start:0,
    highWaterMark: 3 // 水位线 我预期能放到多少  我预期用多少空间来做这件事，超过预期 依然可用
})


let index = 0; 
function write(){
    let flag = true
    while (index != 10 && flag) {
        flag = ws.write(index++ + '')
    };
}
write();
ws.on('drain',function () { // 此方法 需要保证当写入的数据达到预期后，并且数据全部被清空写入到文件中，才会触发
    write()
    console.log('drain')
})
// setTimeout(() => {
//     ws.end('死了');// 表示写入完成，可以放入一些最终的内容，并且关闭掉文件 = ws.write() + fs.close
// }, 1000);

// 可写流中有三个重要的方法 write end on('drain')










// ws.on('open',function(fd){
//     console.log('open',fd)
// })
// // string | buffer
// let flag = ws.write('1','utf8',function(){
//     console.log('写入成功')
// }); // 没有到达预期就返回true
// flag = ws.write('2','utf8',function(){
//     console.log('写入成功')
// }); // 没有到达预期就返回true

// console.log(flag)

// ----------------我期望用两个字节来完成写入操作--------------


// let index = 0; // 会浪费内存， 只有第一次是真实的写入，后续用了一个缓存区，存储其他操作
// while (index != 10) {
//     ws.write(index++ + '')
// };
