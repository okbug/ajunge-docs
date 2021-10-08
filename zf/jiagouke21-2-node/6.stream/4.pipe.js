

const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream');

const path = require('path')

// let rs = new ReadStream(path.resolve(__dirname,'note.md'),{
//     highWaterMark:4
// });
// let ws = new WriteStream(path.resolve(__dirname,'copy.md'),{
//     highWaterMark:1
// })

const fs = require('fs')
const rs = fs.createReadStream(path.resolve(__dirname,'note.md'));
const ws = fs.createWriteStream(path.resolve(__dirname,'copy.md'))

rs.pipe(ws); // 这个方法是异步的， 会读取一点写一点， 可以支持大文件的操作

// 可读流 子类继承Readable， 可写流 子类继承了 Writable
// 可读流调用的是read -> _read(fs.read)  可写流 write -> _write(fs.write)

