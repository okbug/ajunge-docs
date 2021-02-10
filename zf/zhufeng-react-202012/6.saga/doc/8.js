function* g1() {
    yield 2;
    yield 3;
    yield 4;
    return 'aValue';
  }
  
function* g2() {
    yield 1;
    //yield* 后面只能跟迭代器，不能跟生成器
    let a = yield* g1();
    console.log('a',a);
    yield 5;
  }
  
  var iterator = g2();
  
  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: 3, done: false }
  console.log(iterator.next()); // { value: 4, done: false }
  console.log(iterator.next()); // { value: 5, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }


//就是你8.js这个例子 yield*里面产出的值 是怎么传给外面的 