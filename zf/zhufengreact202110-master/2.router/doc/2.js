

console.log('1ab'.match(/1([a-z])([b-c])/));//分组捕获
console.log('1ab'.match(/1(?:[a-z])([b-c])/));//分且不捕获
let result = /(?<x>\d{2})-(?<y>\d{2})/.exec('11-22');//命名捕获分组
console.log(result);
console.log(result.groups.x, result.groups.y);

console.log('11-22'.replace(/(?<x>\d{2})-(?<y>\d{2})/, "$<y>-$<x>"));