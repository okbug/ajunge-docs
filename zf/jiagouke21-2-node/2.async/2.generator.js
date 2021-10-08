// 方法碰到yield 就停止
// function* read() { // 表示他是一个generator函数， 可以将函数切成若干个部分
//     const a = yield 1; // 产出生卵
//     console.log(a);
//     const b = yield 2;
//     console.log(b);
//     const c = yield 3;
//     console.log(c);
// } 
// generator 返回的结果是iterator  能被不停调用next来进行迭代的
// let it = read();
// console.log(it.next())
// console.log(it.next('a')); //调用next方法传递参数 就是给上一次yield的返回值赋值
// console.log(it.next('b'));
// console.dir(it.next()) // { value: 1, done: false }

// console.log(Array.from({ 0: 1, 1: 2, 2: 3, length: 3 }))

// Symbok可以进行元编程 ，可以改写js本身的功能

// console.log(({
//     a:1,
//     get [Symbol.toStringTag](){return 'jw'}
// }).toString())
// console.log([...{
//     0: 1,
//     1: 2,
//     2: 3,
//     length: 3,
//     // [Symbol.iterator]: function() {
//     //     let arr = this;
//     //     let index = 0;
//     //     return {
//     //         next(){ // 迭代时会调用next方法  必须要返回两个属性 {value,done}
//     //            return {value:arr[index],done:index++ == arr.length}
//     //         }
//     //     }
//     // }
//     [Symbol.iterator]:function *() {
//         let index = 0;
//         while (index != this.length) {
//             yield this[index++];
//         }
//     }
// }])