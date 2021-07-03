import React from 'react';
import ReactDOM from 'react-dom';
/* 
  react组件的数据来源有两个 state(状态) props(属性)
  state 我们称为状态  状态是组件自己的数据
  props 我们称为属性  属性是父组件传进来的数据

*/
class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     //  组件自己用的数据
  //   }
  // }
  state = {
    //组件自己用的数据
    name: "珠峰",
    age: 12
  }

  render() {
    // 类组件 的render函数是负责展示正常的组件结构
    let { name, age } = this.state
    console.log(this.props)
    let { qqq, obj, className } = this.props;
    return <div className={'box ' + className}>
      hello{name}-- {age} == {qqq}---{JSON.stringify(obj)}
    </div>;
  }
}

ReactDOM.render(<App qqq='123' obj={{ name: 123, sex: 456 }} className='boxx123' />, document.getElementById('root'))