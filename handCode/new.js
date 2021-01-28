function _new(obj, ...args) {
    let res = Object.create(obj.prototype)
    let result = obj.call(res, ...args)
    return typeof result === 'object' && result != null ? result : res
}



function create(obj) {
    function F() {};
    F.prototype = obj
    return new F()
}
/*
function A(test) {
  this.test = test
  this.print = function() {
    console.log(this.test)
  }
}
A.prototype.say = function() {
  console.log(this.test,'hahahahaha===')
}
let a = new A('haha')
a.print()
               是
let b = _new(A,'bbb')
b.print()
a.say()
b.say()
*/