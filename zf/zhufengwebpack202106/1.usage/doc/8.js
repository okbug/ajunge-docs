function createHash(){
    return require('crypto').createHash('md5');
}
//伪代码
let entry = {
    entry1:'entry1',
    entry2:'entry2'
}
let entry1 = 'require("./depModule1")';
let entry2 = 'require("./depModule2")';

let depModule1 = 'depModule1';
let depModule2 = 'depModule2';
//只要有任何一个模块发生改变,hash就会改变
let hash = createHash()
.update(entry1)
.update(entry2)
.update(depModule1)
.update(depModule2)
.digest('hex');
//console.log(hash);

let entry1ChunkHash =  createHash()
.update(entry1)
.update(depModule1)
.digest('hex');
//console.log(entry1ChunkHash);

let entry1File = entry1+depModule1;
//内容hash只跟内容有关,内容不变,ContentHash不变,内容如果变了,contentHash就会改
let entry1ContentHash = createHash()
.update(entry1File)
.digest('hex');
console.log(entry1ContentHash);
//40e16c4628adb2806fa3e115cdf818a6
//40e16c4628adb2806fa3e115cdf818a6