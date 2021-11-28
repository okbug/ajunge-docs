/**
(?=pattern)	正向肯定查找(前瞻),后面必须跟着什么
(?!pattern)	正向否定查找(前瞻)，后面不能跟着什么
(?<=pattern)	反向肯定条件查找(后顾),不捕获
(?<!pattern)	反向否定条件查找（后顾）
 */
//什么样的操作会消耗掉字符
//什么样的操作不消耗字符
//正向肯定
console.log('1a'.match(/\d(?=[a-z])[a-z]/));
//正向否定
console.log('1a'.match(/\d(?![A-Z])[a-z]/));

//反向肯定
console.log('1a'.match(/(?<=[A-Z])\d[a-z]/));
//反向否定
console.log('1a'.match(/(?<![A-Z])\d[a-z]/));