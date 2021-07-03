import React from 'react';
import ReactDOM from 'react-dom';
import Child from './components/child'

import store from './store'

console.log(store.getState())
class App extends React.Component {
  add = () => {
    store.dispatch({ type: 'add', qqq: 100 })
  }
  minus = () => {
    store.dispatch({ type: 'minus', www: 10 })

  }
  componentDidMount() {
    /* store.subscribe(回调函数)  就是把回调函数放到了一个事件池中 事件池中的回调函数会在数据更新之后执行 */
    store.subscribe(() => {
      // console.log(store.getState())
      // console.log('数据更新啦？》》？')
      this.setState({})
    })
  }
  render() {
    return <div className=''>
      <h1>{store.getState().count}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
      <Child />
    </div>;
  }
}

ReactDOM.render(<>
  <App />
  <Child />
</>, document.getElementById('root'))

/*
  redux  一个数据管理模型
  react-redux



*/