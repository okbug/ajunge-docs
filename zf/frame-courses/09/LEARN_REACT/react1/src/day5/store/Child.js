import React from 'react';
import Sun from './Sun'
class Child extends React.Component {

  render() {
    return <div className=''>
      <h1>儿子组件  </h1>
      <Sun />
    </div>;
  }
}
export default Child