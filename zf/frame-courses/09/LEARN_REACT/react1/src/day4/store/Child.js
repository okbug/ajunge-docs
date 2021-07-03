import React from 'react';
import Sun from './Sun'
import store from './store'
class Child extends React.Component {
  add = () => {
    store.dispatch({ type: 'add', num: 20 })
    // console.log(store.getState())
  }
  minus = () => {
    store.dispatch({ type: 'minus', num: 20 })
    // console.log(store.getState())
  }
  componentDidMount() {
    this.clear = store.subscribe(() => {
      this.setState({})
    })
    // console.log(this.clear)

  }
  componentWillUnmount() {
    this.clear()
  }
  render() {
    let state = store.getState()
    return <div className=''>
      <h1>儿子组件   {state.count}</h1>
      <button onClick={this.add}>儿子+</button>
      <button onClick={this.minus}>儿子-</button>
      <Sun />
    </div>;
  }
}
export default Child