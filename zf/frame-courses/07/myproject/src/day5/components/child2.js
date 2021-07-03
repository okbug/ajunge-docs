import React from 'react';
import { connect } from 'react-redux'
class Child extends React.Component {

  render() {
    let { count123 } = this.props
    return <div className=''>
      <h3>{count123}</h3>
    </div>;
  }
}
Child = connect((state) => {
  return {
    count123: state.count
  }
})(Child)
export default Child