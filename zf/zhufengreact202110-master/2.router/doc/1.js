let pathToRegExp = require('path-to-regexp');
/**
sensitive 是否大小写敏感 (默认值: false) 默认值是不敏感
end 是否匹配整个字符串 (默认值: true) 也就是说后面是否还可以跟别的内容 end:true 不能跟  end:false 能跟
strict 是否允许结尾有一个可选的/ (默认值: false)

 */
let regexp = pathToRegExp("/home", [], { sensitive: true, end: false, strict: true });
console.log(regexp);
console.log(regexp.test('/home'));
console.log(regexp.test('/home/'));
console.log(regexp.test('/home//')); //true or false
console.log(regexp.test('/home/xx/xx'));
console.log(regexp.test('/homex'));
//^\/home\/?(?=\/|$)
//console.log(regexp.test('/home/name'));