// import './css/1.css'
// import './css/2.less'
import "@/css/1"
import a from '@/utils/1'

import q from './common/a'
import w from 'common/b'

import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
console.log(moment().format("MMMM Do YYYY, h:mm:ss a"))

// console.log(666)

// import src from './favicon.ico'

// let img = new Image()
// img.src = src;
// document.body.appendChild(img)

// // axios 基于  ajax+promise 和 fetch的封装

// fetch('/api/home/a', {
//   method: "POST"
// }).then(res => res.json()).then(data => {
//   console.log(data)
// })

@fn
class A {
  // constructor() {
  //   this.qq = 123
  // }
  state = {
    q: 123
  }
  static QQ = 123
}

function fn(target) {
  target.ww = 123
  console.log(target)
}

async function test() {
  await new Promise((res, rej) => {
    setTimeout(() => {
      console.log(6)
      res()
    }, 2000);
  })
  console.log(7)
}
test()


console.dir(A)

console.log('qwe3q'.includes("q"))