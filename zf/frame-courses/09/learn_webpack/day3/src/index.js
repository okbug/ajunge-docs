import { add } from './utils'
import './css/1.css'
import './css/2.less'
// import $ from 'jquery'
console.log($)

import src from './2.jpeg'
let img = new Image()
img.src = src;
document.body.appendChild(img)

console.log(add(100, 20))
// // axios.get('/api/qq')  //http://locahost:3000/api/qq
// fetch('/api/qq', {
//   method: "post"
// })

// fetch('/api/user/a')
// fetch('/api/user/b')
// fetch('/api/user/c')
// fetch('/1.json')

let fn = () => { }

@logger(100)
class A {
  constructor() {
    this.age = 100
  }
  sex = '男'
  static staticProperty = "babelIsCool"
}
console.log(new A)

function logger(num) {
  return function (target) {
    target.prototype.qq = num
  }
}

async function fn2() {
  let a = await new Promise(res => {
    setTimeout(() => {
      console.log(123)
      res(123)
    }, 1000);
  })
  console.log(666, a)
}
fn2()