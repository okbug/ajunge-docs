import React from 'react';
import store from '../store'
class Child extends React.Component {
  componentDidMount() {
    /* store.subscribe(回调函数)  就是把回调函数放到了一个事件池中 事件池中的回调函数会在数据更新之后执行 */
    store.subscribe(() => {
      // console.log(store.getState())
      // console.log('数据更新啦？》》？')
      this.setState({})
    })
  }
  render() {
    return <div className=''>
      <h3>{store.getState().count}</h3>
    </div>;
  }
}
export default Child