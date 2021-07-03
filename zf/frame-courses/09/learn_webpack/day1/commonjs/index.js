// let obj = require('./b')//{add:FUNIONT}
let { add } = require('./b')
// let aaa = require('./a')
let { a, b } = require('./a')
console.log(add(a, b))