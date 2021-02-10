/**
 * 生成器?因为调用它可以生成迭代器
 * 它可以执行，返回一个迭代器
 */
function * gen(){
    yield 1;
    yield 2;
    yield 3;
}
//执行生成器，返回迭代器
let it = gen();
console.log('====================================');
console.log(it[Symbol.iterator]);
console.log('====================================');
let r1 = it.next();
console.log(r1);
let r2 = it.next();
console.log(r2);
let r3 = it.next();
console.log(r3);



function generator(){
    let counter = 1;
    let iterator =  {
        [Symbol.iterator](){

        },
        next(){
            return {value:counter++,done:false};
        }
    }
    return iterator;
}
let iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//effect[Symbol.iterator]==='function'
//JS语法写死的约定 

//typeof function 
//那个函数的内容就是子进程？ 
