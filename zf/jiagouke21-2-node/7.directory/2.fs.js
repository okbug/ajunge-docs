// 文件夹操作 靠的也是fs模块 

const fs = require('fs');
const path = require('path');

// fs.stat 可以判断文件状态，如果文件不存在会报错，存在的话可以判断 是文件还是文件夹 fs.isFile  fs.isDirectory
// fs.mkdir('a/b',{ recursive: true },function () {

// })

// fs.mkdir('a/b/c/d',function (err) {
//     console.log(err);
// })
function mkdir(dirpath, cb) {
    let dirs = dirpath.split('/'); // a   a/b  a/b/c/   a/b/c/d
    let index = 0;

    function next() {
        if (index == dirs.length - 1) return cb(null);
        let p = dirs.slice(0, ++index).join('/');
        fs.stat(p, function(err) {
            if (err) {
                fs.mkdir(p, next); // 异步创建
            } else {
                next();
            }
        })
    }
    next()
}
// mkdir('a/b/c/d/e', function() {
//     console.log('创建成功')
// });

// 复杂的是删除目录

fs.readdir('a', function(err, dirs) { // 只能读取一层
    dirs = dirs.map(item => path.join('a', item));
    let index = 0;

    function next() {
        if (index === dirs.length) return fs.rmdir('a',()=>console.log('删除成功'));
        const p = dirs[index++];
        fs.stat(p,function (err,stat) {
            if(stat.isDirectory()){
                fs.rmdir(p,next)
            }else{
                fs.unlink(p,next);
            }
        })
    }
    next()
})

// 作业 实现一个异步的删除目录功能 （递归）
// 1.串行删除  不要采用（async + await）
// 2.并发删除 同时删除子文件夹，删除后，在删除自己
// 3.广度遍历 执行删除  倒序删除


// fs.rmdir  fs.unlink  fs.stat (isDirectory isFile)