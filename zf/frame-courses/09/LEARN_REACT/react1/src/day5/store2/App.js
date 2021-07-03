import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux'
import store from './store'
import Child from './Child'
import { addFn, minusFn } from './actions'
class App extends React.Component {
  add = () => {
    this.props.dispatch(addFn(100))
  }
  minus = () => {
    this.props.dispatch(minusFn(-15))
  }

  render() {
    console.log(this.props)
    let { count, countType, add, minus, color } = this.props
    return <div className=''>
      <h1 style={{ color: color }}>{countType},{count}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
      <button onClick={add}>props+</button>
      <button onClick={minus}>props-</button>
      <Child />
    </div>;
  }
}
App = connect((state) => {
  console.log(state)
  return {
    count: state.countR.count,
    countType: state.countR.countType,
    color: state.colorR.color
  }
}, (dispatch) => {
  return {
    add() {
      dispatch(addFn(30))
    },
    minus() {
      dispatch(minusFn(45))
    },
    dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))