Array.prototype.myReduce = function(fn, initial) {
  let result = initial
  let i = 0;
  if (typeof initial === 'undefined') {
    result = this[i]
    i++
  }
  while(i < this.lenght) {
    result = fn(result, this[i])
    i++
  }
  return result
};
(function (fn, initial) {
  let result = initial;
  let i = 0;
  if(initial == undefined) {
    result = this[i]
    i++
  }
  while(i < this.length) {
    fn(result, this[i])
    i++
  }
  return result
  
})()


Array.prototype.map = function(fn) {
  let result = []
  for(let i = 0;i < this.length;i++) {
    result[i] = fn(this[i], i)
  }
  return result
}