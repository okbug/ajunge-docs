

let reg = /([a-z])([0-9])([A-Z])/;
let result = '@#a1B888'.match(reg);
console.log(result);
/**
 * 1.匹配到的字符串部分a1B
 * 后面的就是分组 3个分组，值 分别是 a  1 B
 * 最后结果 数组中的元素有4个
 * 
 */
console.log(result.length);

let arr = ['a1B','a','1','B'];
arr.index = '@#a1B888'.indexOf('a1B');
arr.input = '@#a1B888';
console.log(arr);
