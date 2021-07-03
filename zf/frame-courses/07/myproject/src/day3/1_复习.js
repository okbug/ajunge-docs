/*
  结构可以做一种数据类型
  结构中的变量都用{}
  事件 小驼峰命名   保证this指向是当前实例
  组件 （静态组件或者函数式组件    类组件）
  状态(state)和属性(props)

  更新状态 类组件使用 setState  更新数据异步
  更新状态 函数组件  useState

*/
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
  state = {
    count: 100
  }
  add = () => {
    // this.state.count++;
    // this.setState({})
    this.setState({
      count: this.state.count++
    }, () => { console.log('异步', this.state.count) })
    console.log('同步', this.state.count)
  }
  render() {
    let { count } = this.state;
    return <div className=''>
      <h1>{count}</h1>
      <button onClick={this.add}>+</button>
    </div>;
  }
}

// 每一次的渲染都是一个独立的闭包
//  useState初始赋值只会执行一次， 以后的更新不会跟着执行
// setXXX(回调函数)  每一次回调函数执行都会获取到最新的值
function App2(props) {
  let [count, setCount] = useState(function () {
    return 100
  })
  function add() {
    setCount(count++)
    console.log(count)
  }
  console.log('render')
  return <div className=''>
    <h1>{count}</h1>
    <button onClick={add}>+</button>
  </div>;
}


function App3() {
  let [count, setCount] = useState(100)
  function add() {
    setCount(count + 10)
  }
  function minus() {
    setTimeout(() => {
      setCount((num) => {
        return num - 5
      })
    }, 2000);
  }

  console.log('render')
  return <div className=''>
    <h1>{count}</h1>
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
  </div>;
}

function App4() {
  // 这个setState 只会顶替 不会合并；
  let [state, setState] = useState({
    count: 100,
    name: "珠峰"
  })
  function add() {
    setState({
      ...state,
      count: state.count + 10
    })
  }
  function minus() {
    setTimeout(() => {
      setState((state) => {
        return {
          ...state,
          count: state.count - 5
        }
      })
    }, 2000);
  }

  console.log('render')
  return <div className=''>
    <h1>{state.count}  {state.name}</h1>
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
  </div>;
}

ReactDOM.render(<App2 />, document.getElementById('root'))