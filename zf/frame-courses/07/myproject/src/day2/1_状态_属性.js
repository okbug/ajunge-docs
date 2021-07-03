import React from 'react';
import ReactDOM from 'react-dom'
//  普通函数(静态组件)   类组件
//  state 状态*（data）
//  props 属性*（props）
console.log(React.Component)
class App extends React.Component {
  // constructor(props) {
  //   super(props);// 相当于call继承
  //   console.log(props)
  //   this.state = {
  //     name: 'zhufeng'
  //   }
  //   this.state123 = {
  //     age: 20
  //   }
  // }
  state = {
    name: "珠峰"
  }
  state123 = {
    age: 20
  }
  render() {
    console.log(this)
    let { name } = this.state;
    let { className } = this.props;
    return <div className={this.props.className}>
      <h1>姓名是{this.state.name};年龄是{this.state123.age}</h1>
      <h1 className={className}>姓名是{name};</h1>
    </div>;
  }
}
ReactDOM.render(<App className='box' qqqq='123' />, document.getElementById('root'));