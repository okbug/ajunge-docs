import React, { useState } from 'react';
/* 
  hook 只能用在最顶层
  useState初始化 只会执行一次
  每一次的渲染都是一次独立的闭包
  setNum(回调函数)  回调函数可以通过参数获取到最新的值

*/
function Counter2() {
  // let num = 100
  console.log('render')
  // if (2) {
  //   let [num, setNum] = useState(100)
  //   let [age, setAge] = useState(12)
  // }
  let [num, setNum] = useState(100)
  let [age, setAge] = useState(12)
  let [name, setName] = useState(() => {
    console.log("name")
    if (1 > 2) {
      return "珠峰"
    } else {
      return '珠峰培训'
    }
  })
  console.log(num)
  const add = () => {
    // num = num + 20
    setNum(num + 20)
  }
  const minus = () => {
    // num = num - 10
    setNum(num - 10)
  }
  const log = () => {
    setTimeout(() => {
      setNum((n) => {
        console.log(n)
        return n + 1000
      })
    }, 3000);
  }
  return <div className=''>
    <h1>{num}</h1>
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
    <button onClick={log}>输出</button>
  </div>;
}
export default Counter2