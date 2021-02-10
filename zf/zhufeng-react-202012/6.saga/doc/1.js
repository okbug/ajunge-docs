
/**
 * 生成器函数
 */
function *generator(){
    console.log('start');
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
    console.log('end');
}
//javascript doc
/**
 * 
 * @param {*} generator 
 */
function co(generator){
   let it = generator();
   function next(value){
    let result = it.next(value);
    if(!result.done)
       next(result.value);
   }
   next();
}

co(generator);
/**
 * 
 */

/* //执行生成器，返回迭代器
let iterator = generator();
迭代器的第一次 next参数，传入的参数无人接收，没有意义
let r1 = iterator.next();//开始执行，并且一直执行到yield为止
console.log(r1);
let r2 = iterator.next('aValue');//开始执行，并且一直执行到yield为止
console.log(r2);
let r3 = iterator.next('bValue');//开始执行，并且一直执行到yield为止
console.log(r3);
let r4 = iterator.next('cValue');//开始执行，并且一直执行到yield为止
console.log(r4); */


