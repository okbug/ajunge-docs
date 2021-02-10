function* gen() {
    while (true) {
        yield new Date().toTimeString();
    }
}
let it = gen();
setInterval(() => {
    console.log('====================================');
    console.log(new Date());
    console.log('====================================');
}, 1000)
console.log(it.next());//停止 执行的时候，或者 说卡住的时候会让出主线程的执行权，不会占用资源
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


function *a(){

}
function *b(){
    yield a();
}