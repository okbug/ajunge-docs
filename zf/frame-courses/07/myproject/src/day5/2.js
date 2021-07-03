import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import Child2 from './components/child2'
import Child2_2 from './components/child2_2'

/* 
Provider 就是用来保住跟组件的 
connect 是哪个组件想用redux中的数据 就用connect处理哪个组件

*/
import { connect, Provider } from 'react-redux'
class App extends React.Component {

  render() {
    console.log(this)
    let { state, dispatch } = this.props;
    return <div className=''>
      <h1>{state.count}</h1>
      <button onClick={() => { dispatch({ type: 'add', qqq: 20 }) }}>+</button>
      <button onClick={() => { dispatch({ type: 'minus', www: 10 }) }}>-</button>
    </div>;
  }
}
App = connect((state) => ({ state: state }), (dispatch) => ({ dispatch: dispatch }))(App)

ReactDOM.render(<Provider store={store}>
  <App />
  <Child2 />
  <Child2_2 />
</Provider>, document.getElementById('root'))



/*
  redux 我们使用的就使用 一个 createStore即可
  reducer的编写 把握住  得提供初始装填，  reducer函数的返回值 就是新的state


  react-redux 把握住一 用 Provider 包含住跟组件  并且给Provider传递一个store属性，属性值就是redux产生的哪个store

  以后 哪个组件想用redux中的数据  就使用connect处理对应组件即可
  connect(回调函数1，回调函数2)(要处理的组件)
  回调函数1的 形参对应是 redux中的state  返回值 必须是一个对象，这个对象中的属性回传给对应组件
  回调函数2的 形参对应的是 redux中的dispatch  返回值 必须是一个对象，这个对象中的属性回传给对应组件
    若组件不需要更新 则回调函数函数2可以省略


*/