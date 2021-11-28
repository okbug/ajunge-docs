import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
  //1.设置默认属性和初始状态 
  static defaultProps = {
    name: '珠峰架构'
  }
  constructor(props) {
    super(props);
    this.state = { number: 0 };//设置默认状态
    console.log('Counter 1.constructor');
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount');
  }
  handleClick = (event) => {
    this.setState({ number: this.state.number + 1 });
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate');
    //奇数不更新，偶数更新
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate');
  }
  render() {
    console.log('Counter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
  componentDidUpdate() {
    console.log('Counter 7.componentDidUpdate');
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount');
  }
}
ReactDOM.render(
  <Counter />, document.getElementById('root')
);
/**
Counter 1.constructor
Counter 2.componentWillMount
Counter 3.render
Counter 4.componentDidMount

Counter 5.shouldComponentUpdate

Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
Counter 7.componentDidUpdate

 */