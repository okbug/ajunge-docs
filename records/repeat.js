function repeat(str, n) {
  let result = ''
  if (n > 0) {
    while(true) {
      if (n & 1) retult += str
      n >>> 1
      if (n <= 0) break
      str += str
    }
  }
  return result
}



function repeat(str, n) {
  
}