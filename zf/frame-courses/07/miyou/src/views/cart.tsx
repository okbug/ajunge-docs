import React from 'react';
import { connect } from 'react-redux'

class Cart extends React.Component {

  render() {
    //@ts-ignore
    console.log(this.props.state)
    return <div className=''>
      Cart
    </div>;
  }
}
let Cart2 = connect((state) => {
  return {
    state
  }
})(Cart)
export default Cart2