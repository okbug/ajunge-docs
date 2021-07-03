import React from 'react';
import { connect } from 'react-redux'
import { fn, addFn } from './actions/index'
class Sun extends React.Component {
  render() {
    return <div className=''>
      <h1>孙子组件{this.props.count}</h1>
      <button onClick={() => {
        this.props.dispatch(fn([1, 2, 3, 4, 5]))
      }}>异步管颜色</button>

      <button onClick={() => {
        this.props.dispatch(addFn(200))
      }}>+</button>
    </div>;
  }
}
const Sun2 = connect((state) => {
  return {
    count: state.count
  }
}, dispatch => ({ dispatch }))(Sun)
export default Sun2