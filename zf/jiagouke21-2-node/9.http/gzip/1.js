// gzip 压碎 他主要的压缩方式是替换，重复率越高压缩越有效果


const zlib  = require('zlib');
const path = require('path');
const fs = require('fs');
const {Transform} =  require('stream')

// zlib.createGzip // 流的方式 读一点操作一点
// zlib.gzip(fs.readFileSync(path.resolve(__dirname,'1.txt')),function(err,data){
//     fs.writeFileSync('1.txt.gz',data)
// })

// 流还有一种方式 转化流 （可读流 on('data') on('end')） (可写流 write end)  （双工流 能读能写）  （转化流）

// 标准输入  读取用户的输入 / 标准输出
// process.stdin.on('data',function(chunk){ // 监听的是用户输入的内容
//     process.stdout.write(chunk); // console.log()
// })

// _write 是写流 调用的方法  _read 是读流里面的方法
// Duplex 能读能写 读写可以是无关的
// 转化流 读写是有关系的
// class MyTransfrom extends Transform{
//     _transform(chunk,encoding,clearBuffer){ // 参数和可写流一样
//          this.push(chunk.toString().toUpperCase());
//          clearBuffer();
//     }
// }
// let transform = new MyTransfrom

// 读 -> （写   读） -> 写
process.stdin.pipe(zlib.createGzip()).pipe(process.stdout)