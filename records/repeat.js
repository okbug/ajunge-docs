function repeat(str, n) {
  let result = ''
  if (n > 0) {
    while(true) {
      if (n & 1) result += str
      n >>> 1
      if (n <= 0) break
      str += str
    }
  }
  return result
}



function repeat(str, n) {
  
}


function foo(test) {
  str = ""     
  for( i=0;i<test.length; i++ ) {
    temp = test.charCodeAt(i).toString(16);  
    str += "\\u"+ new Array(5-String(temp).length).join("0") + temp
  }
  return str
}
console.log(foo('上分'))