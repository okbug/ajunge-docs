// if(typeof effect[Symbol.iterator]==='function'){

function * gen(){

}
let it = gen();
console.log(it[Symbol.iterator]);
it.next();

const someObj = {
    *[Symbol.iterator] () {
      yield 'a';
      yield 'b';
    }
  }
  
  console.log(...someObj); // 'a', 'b'
  for(let key of someObj){
      console.log('====================================');
      console.log(key);
      console.log('====================================');
  }