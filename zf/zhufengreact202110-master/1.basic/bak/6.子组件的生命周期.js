import React from './react';
import ReactDOM from './react-dom';
/**
 * 组件的生命周期
 * 
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log('Counter 1.constructor');
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount');
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount');
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate');
    //奇数不更新，偶数更新 其实不管此方法返回true还是false, this.state其实都会改变 ，如果返回true的话页面会刷新
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('Counter 7.componentDidUpdate');
  }
  render() {
    console.log('Counter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        {
          this.state.number === 4 ? null : <ChildCounter count={this.state.number} />
        }
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
class ChildCounter extends React.Component {
  componentWillReceiveProps(newProps) {
    console.log('ChildCounter 4.componentWillReceiveProps');
  }
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount');
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter 5.shouldComponentUpdate');
    return nextProps.count % 3 === 0;//只有3的倍数就更新
  }
  componentWillUnmount() {
    console.log('ChildCounter 6.componentWillUnmount');
  }
  render() {
    console.log('ChildCounter 2.render');
    return <div>{this.props.count}</div>
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));

/**
第一次
Counter 1.constructor
Counter 2.componentWillMount
Counter 3.render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 4.componentDidMount

第1次点击 这个时候 Counter.state.number=1  Counter模2为0才更新，所以不更新
Counter 5.shouldComponentUpdate

第2次点击 这个时候 Counter.state.number=2
Counter 5.shouldComponentUpdate 要
Counter 6.componentWillUpdate
Counter 3.render
ChildCounter 4.componentWillReceiveProps  子组件接收到新的属性
ChildCounter 5.shouldComponentUpdate 子组件只有模3为0才更新，所以不更新。ChildCounter.props.count=2 显示还是0
Counter 7.componentDidUpdate


第3次点击 这个时候 Counter.state.number=3
Counter 5.shouldComponentUpdate

第4次点击 这个时候 Counter.state.number=4
Counter 5.shouldComponentUpdate 要更新
Counter 6.componentWillUpdate 父组件将要更新
Counter 3.render
ChildCounter 6.componentWillUnmount 把子组件销毁掉 子组件被 销毁 卸载
Counter 7.componentDidUpdate

第5次点击 这个时候 Counter.state.number=5 不更新
Counter 5.shouldComponentUpdate

第6次点击
Counter 5.shouldComponentUpdate 父组件要更新
Counter 6.componentWillUpdate 组件将要更新
Counter 3.render
ChildCounter 1.componentWillMount  这个时候子组件需要被 挂载
ChildCounter 2.render
ChildCounter 3.componentDidMount子组件挂载完成
Counter 7.componentDidUpdate 父组件更新完成



 */