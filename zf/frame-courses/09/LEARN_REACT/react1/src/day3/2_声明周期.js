import React from 'react';
import ReactDOM from 'react-dom';


/* 
内置组件  PureComponent； 内部调用了 shouldComponentUpdate钩子函数
  但是 只是做了一个浅层的比较
不要再更新的钩子函数 或者render中直接写setState
*/
class Child extends React.PureComponent {
  state = { www: !23 }
  // static getDerivedStateFromProps(props, state) {
  //   console.log(props, state)
  //   return {
  //     qqq: 123
  //   }
  // }
  // componentWillMount() {
  //   console.log(777)
  // }
  // UNSAFE_componentWillMount(){}
  // componentWillUpdate() {
  //   console.log(888)
  // }
  // componentWillReceiveProps(){

  // }
  // shouldComponentUpdate(newProps, newState) {
  //   console.log(newProps, newState)
  //   /* 
  //     返回值若是一个false，则这个组件的render函数不再执行  
  //   */
  //   if (this.props.num === newProps.num) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }
  render() {
    console.log('child render')
    return <b>child {this.state.qqq} {this.props.num}</b>
  }
}
class App extends React.Component {
  componentDidMount() {
    // DOM渲染完成之后触发  mounted
  }
  // shouldComponentUpdate(){
  //   // 优化的钩子函数
  // }
  componentDidUpdate() {
    // 类似于vue的updated
    // this.setState({
    //   count: Math.random()
    // })
  }
  componentWillUnmount() {
    // 类似于vue的beforeDestroy
  }
  state = {
    count: 123,
    name: '珠峰'
  }
  render() {

    return <div className=''>
      {this.state.count}
      <input type="text" value={this.state.name} onChange={(e) => {
        this.setState({
          name: e.target.value
        })
      }} />
      <button onClick={() => { this.setState({ count: this.state.count + 2 }) }}>+</button>
      <Child eee={123} num={this.state.count} />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))