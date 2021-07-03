import React from 'react';
class App extends React.Component {
  // constructor() {
  //   super();
  //   // console.log(this)
  //   this.log2 = () => {
  //     console.log(this)
  //   }
  // }
  log1(e, n) {
    // console.log(666, e, this, n)
    console.log(e, n)
  }
  log2 = (...arg) => {
    console.log(this, ...arg)
  }
  render() {
    //  render方法是reac内部执行，他执行的时候能保证里边的this是当前实例
    //  通过bind处理的函数 他的事件对象 永远在最后一项
    console.log("当前实例", this)
    let f = this.log1.bind(this)

    let f2 = (...arg) => {
      return (e) => {
        this.log2(...arg, e)
      }
    }
    return <div className=''>
      <button onClick={this.log1}>按钮</button>
      {/* btn.onclick = function(e){ onClick(e) } */}
      <button onClick={this.log1.bind(this)}>按钮</button>
      <button onClick={f}>按钮</button>
      <button onClick={(e) => { this.log1(e) }}>按钮</button>



      <button onClick={(e) => { this.log1(e, 100) }}>按钮 100</button>
      <button onClick={this.log1.bind(this, 10)}>按钮 10</button>



      <button onClick={f2(666)}>按钮 666</button>
    </div>;
  }
}
export default App