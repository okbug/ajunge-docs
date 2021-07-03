import React from 'react';
import Sun from './Sun'
import { connect } from 'react-redux'
import { changeColorFn } from './actions'
class Child extends React.Component {

  render() {
    return <div className=''>
      <h1>儿子组件  </h1>
      <button onClick={() => {
        this.props.changeColor('green')
      }}>变绿</button>
      <button onClick={() => {
        this.props.changeColor('blue')
      }}>变蓝</button>
      <Sun />
    </div>;
  }
}
Child = connect(() => ({}), (dispatch => {
  return {
    changeColor(col) {
      dispatch(changeColorFn(col))
    }
  }
}))(Child)
export default Child