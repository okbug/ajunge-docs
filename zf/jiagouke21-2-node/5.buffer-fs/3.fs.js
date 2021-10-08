// 操作希望是异步的

const fs = require('fs'); // 什么时候用同步 ，什么时候用异步
const path = require('path');

// 启动服务之前，我可以同步读取一些配置文件。 如果程序运行起来，就不要采用同步读写了

// 工具方法都是同步的（性能高），异步的缺陷就是“回调“  -》 async + await


// copy功能的实现  i/o 文件读和写。 读取的概念是把读取到的内容放到是内存中，读取内存中的内容写入到文件中

// 读取文件不存在会报错，写入的时候文件不存在会创建文件，如果文件存在会清空文件
// fs.readFile(path.resolve(__dirname,'note.md'),'utf8',function (err,data) {
//    fs.writeFile(path.resolve(__dirname,'copy.md'),data,function (err) {
//        console.log('写入成功')
//    })  
// });

// 不适合大文件读取，如果是简单的文件可以使用上面这种方式。 对于大文件来说我们操作全部使用“流” 流的特点就是有方向，从一个地方到另一个地方

// 底层的文件操作，需要对文件进行精确的读取 fs.open fs.read  fs.write (开发的时候用不到，通过这个些api 让大家掌握底层原理实现 stream实现原理 pipe)


// 流的特点 最终解决的问题 就是防止淹没可用内存 

const buf = Buffer.alloc(3);

// r 读取 文件不存在就报错了
// w 写入
// a 追加
// r+ 能读能写 以读取为准文件不存在会报错
// w+ 能写能读 如果文件不存在会创建
// ...

// 读 写 和执行 分成三部分 三个数来标识  1 执行 4读取 2代表写入  进制组合 (权限...)
// chmod -R 777
fs.open(path.resolve(__dirname, 'note.md'), 'r', 438, function(err, fd) { // fd文件描述符
    fs.open(path.resolve(__dirname, 'copy.md'), 'w', function(err, wfd) {
        // console.log(fd); // 是一个数字类型，用完需要关闭掉
        function close(){
            fs.close(fd,()=>{})
            fs.close(wfd,()=>{})
        }
        function next() {
            // buf 写入到哪个buffer中，从buffer的哪个位置开始写入3个字节，从文件的第0个位置开始读取
            fs.read(fd, buf, 0, 3, 0, function(err, bytesRead) { // bytesRead 实际读取到的个数，这个个数 不一定是3 ，可能会小于3
                console.log(bytesRead);

                if(bytesRead == 0){
                   return close(); 
                }
                // 写入到文件中，从buffer的第0个位置写入3个字节，写入到文件的第0个位置
                fs.write(wfd, buf, 0, 3, 0, function(err, bytesWritten) {
                    next()
                })
            })
        }
        next();
    })
})

// 基于文件系统操作的流 

// async + await  读和写的逻辑耦合在一起， 把读写操作分离成两个功能
// 发布订阅 （好处是解耦）