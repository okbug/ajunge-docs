
function * gen(){
    yield 1;
    yield 2;
    yield 3;
}
let it = gen();
let r1 = it.next();
console.log(r1);
let r2 = it.return('提前结束了');
console.log(r2);
let r3 = it.next();
console.log(r3);