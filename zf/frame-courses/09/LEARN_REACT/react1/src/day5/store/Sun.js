import React from 'react';
import { connect } from 'react-redux'
class Sun extends React.Component {
  render() {
    return <div className=''>
      <h1>孙子组件{this.props.count}</h1>
    </div>;
  }
}
const Sun2 = connect((state) => {
  return {
    count: state.count
  }
})(Sun)
export default Sun2