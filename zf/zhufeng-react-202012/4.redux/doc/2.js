//AOP 面向切面 强制
function sum(){
    console.log('sum');
}

function wrap(fn){
  console.log('before');
  fn();
  console.log('after');
}
wrap(sum);

//柯里化

function p1(pa1,pa2,pa3){
  return function p2(pa4,pa5,pa6){
    console.log(pa1,pa2,pa3,pa4,pa5,pa6);
  }
}
let newP1 = p1('a','b');
newP1('d','e');

