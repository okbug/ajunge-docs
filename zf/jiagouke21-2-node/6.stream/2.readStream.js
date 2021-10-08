const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.resolve(__dirname, 'note.md'));
const arr = [];
rs.on('data', function(data) {
    console.log(data);
    arr.push(data);
})
rs.on('end', function() {
    console.log(Buffer.concat(arr).toString())
});



// 可读流 读取原理
// 1.new ReadStream 创造一个可读流
// 2.可读流 需要继承自 Readable类 ， 文件得可读流内部实现用了fs
// 3.创造一个可读流 需要初始化数据，并且默认调用open事件
// 4.调用的默认是open事件 ReadStream 创建的， 并且打开文件后，直接开始读取
// 5.读取的时候会调用父类的Readable.read方法， 子类重写父类方法。 父类称之为抽象的，没有具体的实现，都是子类来实现,父类的read 会去调用子类的ReadStram._read, 子类可以自己实现功能 ->  fs.read
// 6.子类调用了父类的push， 父类会自动的触发emit('data')
// 7.读取完毕后 push(null) -> emit('end')
const { Readable } = require('stream');
class MyStream extends Readable {
    // this.read()
    constructor(){
        super();
        this.index = 0;
    }
    _read() {
        // 具体的实现就可以自己实现，只需要调用父类的方法，将结果抛出去就可以了
        if(++this.index != 5){
            return this.push('abc'); // 只能是字符串或者buffer
        }
        this.push(null);
    }
}
const myStream = new MyStream();
myStream.on('data',function (chunk) { // 只要是可读流都有 on('data') 和 on('end')
    console.log(chunk)
})
myStream.on('end',function () {
    console.log('end')
})

// class Animal {
//     eat(){
//         this._eat();
//     }
// }
// class Cat extends Animal{
//     _eat(){
//         console.log('猫的吃饭姿势')
//     }
// }
// class Dog extends Animal{
//     _eat(){
//         console.log('狗的吃饭姿势')
//     }
// }
// let cat = new Cat;
// cat.eat();

// let dog = new Dog;
// dog.eat();

// 10:48继续