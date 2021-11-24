/* let fs = require('fs');
fs.writeFileSync('1.txt','1','utf8');
let content = fs.readFileSync('1.txt','utf8');
console.log(content); */
let path = require('path');
var MemoryFileSystem = require("memory-fs");
var fs = new MemoryFileSystem(); // Optionally pass a javascript object

fs.mkdirpSync(path.resolve("dir"));
//写入内存中的，速度 更快，硬盘上看不见
fs.writeFileSync(path.resolve("dir/file.txt"), "Hello World");
let content = fs.readFileSync(path.resolve("dir/file.txt")); // returns Buffer("Hello World")
console.log(content.toString());
