import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import Child from './Child'

console.log(store.getState())
// store.getState() 是用来获取redux中的数据的
// store.dispatch(action) 用来通过action（就是一个普通的对象） 去触发reducer进而更新数据
// store.subscribe(回调函数)  会把回调函数放入一个事件池当中， 
//                            然后每当数据更新完成的时候 会挨个触发事件池中的回调函数
// subscribe 会有一个返回值 这个返回值是一个函数，这个函数一执行 就会把当前添加的回调函数移除掉
class App extends React.Component {
  add = () => {
    store.dispatch({ type: 'add', num: 20 })
    // console.log(store.getState())
  }
  minus = () => {
    store.dispatch({ type: 'minus', num: 20 })
    // console.log(store.getState())
  }

  render() {
    let state = store.getState()
    return <div className=''>
      <h1>{state.count}</h1>
      <h1>{state.name}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
      <Child />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))