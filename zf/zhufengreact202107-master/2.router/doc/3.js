/**
肯定前瞻
否定前瞻
肯定后顾
否定后顾
 */
//分组获取
console.log('1ab'.match(/1[a-z]([b-c])/));
//分组不捕获
console.log('1ab'.match(/1[a-z](?:[a-z])/));

//肯定前瞻 不消耗字符
console.log('1a'.match(/\d(?=[a-z])[a-z]/));
//否定前瞻 不消耗字符
console.log('1a'.match(/\d(?![A-Z])[a-z]/));


//肯定后顾 不消耗字符
console.log('b1a'.match(/(?<=[a-z])\d[a-z]/));
//否定后顾 不消耗字符
console.log('A1a'.match(/(?<![a-z])\d[a-z]/));

console.log('1aA'.match(/\d(?=[a-z])[A-Z]/));