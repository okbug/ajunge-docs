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




// flat数组去重
// 自己写出来的
function flat1(arr) {
  let result = []
  for(let i = 0;i < arr.length;i++) {
    const v = arr[i]
    if(Array.isArray(v)) {
      result = result.concat(flat1(v))
    } else {
      result.push(v)
    }
  }
  return result
}

// 背下来的帅的解法
function flat2(arr) {
  return arr.reduce((pre,cur) => pre.concat(Array.isArray(cur) ? flat2(cur) : cur), [])
  // reduce => pre, cur => pre.concat(cur)
}