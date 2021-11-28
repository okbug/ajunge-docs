

function * gen(){

}
let it = gen();
console.log(it[Symbol.iterator]);
console.log(typeof it);