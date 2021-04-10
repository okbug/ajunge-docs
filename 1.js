let str = 'i love you'

let r = new Array(str.length).fill(0).map(i => new Array)
let index = 0
for(let i = 0; i < str.length; i++) {
  let c = str[i]
  if(c === ' ') index++;
  else r[index].push(c)
}
r = r.filter(i => i.length)
console.log(r)
let res = ''
for(let i = r.length - 1; i >= 0; i-- ) {
  for(let j = 0; j < r[i].length;j ++) {
    res += r[i][j]
  }
  res += ' '
}
console.log(res)