"use strict";
let regeneratorRuntime = {
    mark(genFn){ // 没啥用
        return genFn
    },
    wrap(iteratorFn){
        const context = {
            next:0,
            done:false, // 表示迭代器没有执行完毕
            stop(){
                context.done = true; // 表示整个函数执行完毕
            },
            sent:null
        }
        let it = {};
        it.next = function(value){ // 此value会传递给上一次yield的返回值
            context.sent = value;
            let v = iteratorFn(context);
            return {
                value:v,
                done:context.done
            }
        }
        return it;
    }
}
var _marked =regeneratorRuntime.mark(read);
function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function(_context) {
    // while (1) { // 这个while 是用来标识这个方法不止执行一次,方法会多次执行
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;
        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;
        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;
        case 10:
          c = _context.sent;
          console.log(c);

        case 12:
        case "end":
          return _context.stop();
      }
    // }
  }, _marked);
}

let it = read()
{
    let {value,done} = it.next('无意义的');
    console.log(value,done)
}
{
    let {value,done} = it.next('a');
    console.log(value,done)
}
{
    let {value,done} = it.next('b');
    console.log(value,done)
}
{
    let {value,done} = it.next('c');
    console.log(value,done)
}
{
    let {value,done} = it.next('c');
    console.log(value,done)
}