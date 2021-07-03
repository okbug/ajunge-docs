// 一个字节是一个有8位组成的2进制（byte）
// 一个汉字是由三个字节组成的
let b1 = Buffer.alloc(12, "珠峰")// 声明一个固定大小的buffer
let b2 = Buffer.from("珠峰")
let b3 = Buffer.from("培训")
let b3_1 = Buffer.from("123")
// let 
// console.log(b1)
console.log(b3_1.toString())
let b4 = Buffer.alloc(12)


// 多个buffer的合并
b3.copy(b4, 0, 0, 6)//把b3复制到 b4中， 0： 从b4的哪个位置开始；0, 6 代表 从b3的0开始到6
b2.copy(b4, 6, 0, 6)
b2.copy(b4, 12, 0, 6)
// console.log(b4.toString())

let b5 = Buffer.concat([b2, b3, b3])
console.log(b5, b5.length)
console.log(b5.toString())

console.log(b5.slice(-3).toString())

// buffer是一个容器（缓冲器）一般用来存储数据流
// Buffer.alloc  Buffer.from();    Buffer.concat([])  
//b1.copy(taget,..)  b1.length  b1.toString() b1.slice





