// 1.前端我们在使用的时候 基本上不用考虑编码。 后端需要读取数据操作文件，需要用到编码
// 前端早期 不能操作文件夹的 ，无法操作二进制数据， node就实现了一个Buffer用于描述内存的

// 内存：2进制值   Buffer是16进制 （目的是为了短）

// 基本的进制转换， node只支持utf8  一个汉字3个字节
// 位 1个字节由8个位（二进制）组成

// 将任何进制转换成10进制 当前位的值 * 当前进制^(所在位-1) 累加的结果
// 将整数转换成其他进制 需要不停的取反向输出

console.log(parseInt('1010',2)); // 进制之间的转化
console.log(10..toString(2))
console.log(255..toString(8))

// 2进制以0b开头 8进制以 0o开头  16进制以0x开头

// 0.1 + 0.2 = ? 计算并不是直接相加 而是把两个值都转化成了2进制来计算 

// 10 -> 0.5   
// 2  -> 0.1
// 0.1 乘二取整法   0.5转化成2进制   （小数转2进制的法则）


// 0.5 * 2 = 1  // 0.1

// 0.1 转化成10进制 
// 0.1 * 2 = 0.2 // 0
// 0.2 * 2 = 0.4 // 0
// 0.4 * 2 = 0.8 // 0
// 0.8 * 2 = 1.6 // 1
// 0.6 * 2 = 1.2 // 1
// 0.2 * 2 = 0.4 // 0 0 1 1 



// 0.0001100110011001100110011001100110011001100110011001101
// 0.001100110011001100110011001100110011001100110011001101
// 大于0.3

console.log(0.1 + 0.2) // 为什么只有0.1 + 0.2 会出现这个问题 为什么 0.2 + 0.2正常 怎么解决这个问题？

let sum = 0
for(let i = 0; i < 8;i++){
    sum +=  Math.pow(2,i);
}

console.log(sum)
console.log(1 * 2**8 - 1)

// 127 往后 自己编造自己的
// 编码 ascii -》 gb18030 、 gbk  => unicode => (utf8)

// 常用的编码 ascii  汉字都是utf8格式
// http://www.zhufengpeixun.com/grow/html/8.Encoding.html#t111.9%20UTF-8



// 如何实现base32
// base64 开发中能替换掉路径 而且可以用于传输 （加密 错误说法） base64是一个编码规范

// 1个汉字3个字节 一个字节8个位  3 * 8 = 4 * 6 （使用base64转化后的结果都会比之前大1/3）

// Buffer

let r = Buffer.from('珠'); // 54+g
console.log(r); // e7 8f a0 

console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))

// 11100111  10001111  10100000  
// 00111001    00111000   00111110    00100000 


console.log(parseInt('00111001',2))
console.log(parseInt('00111000',2))
console.log(parseInt('00111110',2))
console.log(parseInt('00100000',2))

// 57 56 62 32 // 这个值用于不会大于64 00111111 => 2^6 - 1

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase();
str += '0123456789+/';


console.log(str[57] + str[56] + str[62] + str[32] );

// base64只是一种编码规则， 但是utf8 / gbk 字符集