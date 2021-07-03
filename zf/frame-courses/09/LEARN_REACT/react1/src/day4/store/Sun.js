import React from 'react';
import store from './store'
class Sun extends React.Component {
  render() {
    let state = store.getState()
    return <div className=''>
      <h1>孙子组件{state.count}</h1>
    </div>;
  }
}
export default Sun