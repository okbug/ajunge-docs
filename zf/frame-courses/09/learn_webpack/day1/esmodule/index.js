// import xxx from './a.js'
// console.log(xxx)
// import { a, b } from './a.js'
// console.log(a, b)

// import * as qqq from './a.js'
// console.log(qqq)


import xxx, { a, b, c } from './a.js'
import { add } from './b.js'
console.log(add(a, b)) 