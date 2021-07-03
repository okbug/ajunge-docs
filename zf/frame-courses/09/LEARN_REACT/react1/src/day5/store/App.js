import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux'
import store from './store'
import Child from './Child'
class App extends React.Component {
  add = () => {
    this.props.dispatch({ type: 'add', num: 20 })
  }
  minus = () => {
    this.props.dispatch({ type: 'minus', num: 10 })
  }

  render() {
    console.log(this.props)
    let { name, count, add, minus } = this.props
    return <div className=''>
      <h1>{name}</h1>
      <h1>{count}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
      <button onClick={add}>props+</button>
      <button onClick={minus}>props-</button>
      <Child />
    </div>;
  }
}
App = connect((state) => {
  return {
    count: state.count,
    name: state.name
  }
}, (dispatch) => {
  return {
    add() {
      dispatch({ type: 'add', num: 10 })
    },
    minus() {
      dispatch({ type: 'minus', num: 5 })
    },
    dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))