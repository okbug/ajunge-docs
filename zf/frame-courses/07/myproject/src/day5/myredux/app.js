import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider, connect } from './myreact-redux'
console.log(store.getState())
class App2 extends React.Component {

  add = () => {
    store.dispatch({ type: 'ADD', qqq: 100 })
  }
  minus = () => {
    store.dispatch(function (dispatch) {
      setTimeout(() => {
        dispatch({ type: 'MINUS', www: 10 })
      }, 1000);
    })

  }
  componentDidMount() {
    /* store.subscribe(回调函数)  就是把回调函数放到了一个事件池中 事件池中的回调函数会在数据更新之后执行 */
    this.qqq = store.subscribe(() => {
      // console.log(store.getState())
      // console.log('数据更新啦？》》？')
      this.setState({})
    })
    // subscribe 的返回值是一个函数
    // 这个函数一执行的话 就会把我们添加到事件池中的事件移除掉
  }
  componentWillUnmount() {
    this.qqq()
  }
  change = (e) => {
    store.dispatch({ type: 'changeName', name: e.target.value })
  }
  render() {
    return <div className=''>
      <input type="text" value={store.getState().nameState.name} onChange={this.change} />
      <h1>{store.getState().nameState.name}</h1>
      <h1>{store.getState().countState.count}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
    </div>;
  }
}

class App extends React.Component {
  add = () => {
    this.props.dispatch({ type: 'ADD', qqq: 100 })
  }
  minus = () => {
    this.props.dispatch(function (dispatch) {
      setTimeout(() => {
        dispatch({ type: 'MINUS', www: 10 })
      }, 1000);
    })

  }
  change = (e) => {
    this.props.dispatch({ type: 'changeName', name: e.target.value })
  }
  render() {
    return <div className=''>
      <input type="text" value={this.props.nameState.name} onChange={this.change} />
      <h1>{this.props.nameState.name}</h1>
      <h1>{this.props.countState.count}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
    </div>;
  }
}
App = connect((state) => {
  return {
    ...state
  }
}, (dispatch) => {
  return {
    dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))