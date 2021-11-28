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
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  }
  render() {
    console.log('Counter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        <ChildCounter count={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: 'ChildCounter', number: 0 };
  }
  //为什么把这个方法设置为静态的呢？因为不希望用户在此方法调用this this.setState引起死循环
  //componentWillReceiveProps 
  static getDerivedStateFromProps(nextProps, nextState) {
    const { count } = nextProps;
    if (count % 2 === 0) {
      return { number: count * 2 };
    } else {
      return { number: count * 3 };
    }
  }
  render() {
    console.log('ChildCounter 2.render');
    return <div>{this.state.title}:{this.state.number}</div>
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
