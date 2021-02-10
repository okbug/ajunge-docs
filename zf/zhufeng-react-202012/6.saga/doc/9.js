function * gen(){
    yield 1;
    yield 2;
    yield 3;
}

let it = gen();
console.log(it.next());
//console.log(it.throw('出错了'));
console.log(it.return());//return可以让saga直接结束掉
console.log(it.next());