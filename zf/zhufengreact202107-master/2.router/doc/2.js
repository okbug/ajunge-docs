/**
 * \d 代表一个数字
 * [a-z] 代表一个小写的英文字符
 * a-Z 没有 这是一范围，范围的原理就是ASCII码
 * a 97
 * A 65
 * 97-65
 * match匹配的结果 1是匹配的字符串 2开始就是分组
 * 默认是捕获分组，分组的结果会出现在结果数组里
 * 非捕获分组  分组的的结果不会放在结果里
 */
let r1 = '1a'.match(/(?:\d)([a-z])/);
console.log(r1);
console.log(r1.length);
//index 匹配到的字符串在原始字符串中的起始索引 input原始字符串
console.log(r1.index,r1.input,r1.groups);

//?<x> 表示命名捕获分组
console.log(/(?<x>\d{2})-(?<y>\d{2})/.exec('11-22'));

console.log('11-22'.replace(/(?<x>\d{2})-(?<y>\d{2})/,"$<y>-$<x>"));