

let count = 0;
function * gen(){
   // while(true){
        yield count++;
        yield count++;
        yield count++;
        yield count++;
        yield count++;
        yield count++;
        yield count++;
        yield count++;
    //}
}
let it = gen();
let r1 = it.next();
console.log(r1);
let r2 = it.next();
console.log(r2);
let r3 = it.next();
console.log(r3);
console.log('hello');