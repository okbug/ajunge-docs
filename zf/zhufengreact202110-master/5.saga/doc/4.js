

function* gen() {
    while (true) {
        yield Math.random();
        console.log('放置控制权，暂停执行');
    }
}


let it = gen();
let { value: v1 } = it.next();
console.log(v1);
let { value: v2 } = it.next();
console.log(v2);