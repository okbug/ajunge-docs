import React from 'react';
import ReactDOM from 'react-dom';

// 事件遵循小驼峰命名
// react当中的事件 我i们一般称作合成事件
class App extends React.Component {
  // constructor(){
  //   super();
  //   this.fn2 = ()=>{}
  // }
  state = {
    name: "zhufeng"
  }
  fn(e) {
    // console.log(666, e)
    console.log(this)
  }
  fn2 = () => {
    console.log(this)
  }
  render() {
    // 这一层中的this 就是 当前实例
    let f = this.fn.bind(this)// 当f执行的时候里边的 this一定是当前实例
    let f2 = () => { this.fn() }
    return <div className=''>
      <button onClick={this.fn}>按钮</button>
      <button onClick={f}>按钮2</button>
      <button onClick={f2}>按钮3</button>
      <button onClick={this.fn2}>按钮4</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))