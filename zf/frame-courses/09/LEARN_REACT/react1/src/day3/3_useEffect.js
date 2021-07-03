import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/* 
  useEffect(回调函数，[]) 相当于 我们的componentDidMount
  useEffect(回调函数)  没写依赖项   相当于 我们的componentDidMount和componentDidUpdate的结合体
  useEffect(回调函数，[依赖项1,依赖项2,...]) 只有当依赖发生改变的时候才会触发
  回调函数可以返回一个函数 返回值的这个函数会在下一次回调执行之前 触发,当依赖项是一个空数组的时候
  那么 只有当组件销毁 才会出发这个返回的函数 也就是说类似实现了 componentWillUnmount


  */
function Child(props) {
  let [sex, setSex] = useState('男')
  useEffect(() => {
    console.log('hello')
    return function () {
      console.log('返回的函数')
    }
  }, [])
  return <>
    <input type="text" value={sex} onChange={(e) => { setSex(e.target.value) }} />
    <b>
      {props.num}
    </b>
  </>
}


class App extends React.Component {
  state = {
    count: 123,
    name: '珠峰'
  }
  render() {

    return <div className=''>
      <input type="text" value={this.state.name} onChange={(e) => {
        this.setState({
          name: e.target.value
        })
      }} />
      <button onClick={() => { this.setState({ count: this.state.count + 2 }) }}>+</button>
      {
        this.state.name.length > 5 ? '' : <Child eee={123} num={this.state.count} />
      }
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))