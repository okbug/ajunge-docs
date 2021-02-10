//匹配分组捕获
console.log('1ab'.match(/1([a-z])([a-z])/));
//非捕获分组
console.log('1ab'.match(/1(?:[a-z])([a-z])/));
/* //正向肯定前瞻 并不消耗掉字符
console.log('1a'.match(/\d(?=[a-z])[a-z]/));
//正向否定前瞻
console.log('1a'.match(/\d(?![A-Z])[a-z]/));
//反向肯定后瞻
//反向否定后瞻
console.log('b1a'.match(/(?<=[a-z])\d[a-z]/));
console.log('A1a'.match(/(?<![a-z])\d[a-z]/)); */