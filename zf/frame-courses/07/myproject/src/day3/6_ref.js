import React, { createRef, useRef } from 'react';
import ReactDOM from 'react-dom';

/* 
  <h1 ref='box'></h1>  this.refs.box   废弃
  <h1 ref={(el) => { this.qqq = el }}>珠峰</h1>   this.qqq
  this.xxx = createRef();  <h1 ref={this.xxx}></h1>     this.xxx.current

  ref可以用来获取类组件但是不能用来获取静态组件
*/
class Child1 extends React.Component {
  aaa() { console.log(111) }
  render() {
    return <i>child1</i>
  }
}

function Child2() {
  let i = useRef();

  function fn() {
    console.log(i)
  }
  return <div>
    <i ref={i}>child2</i>
    <button onClick={fn}>获取i</button>
  </div>
}
class App extends React.Component {
  fn = () => {
    console.log(this)
    this.www.current.aaa()
  }
  www = createRef();
  render() {
    console.log(this.www)
    return <div className=''>
      <h1 ref='box'>珠峰</h1>
      <h1 ref={(el) => { this.qqq = el }}>珠峰</h1>
      <h1 ref={this.www}>zhufneg</h1>
      <Child1 ref={this.www} />
      {/* <Child2 ref={this.www} /> */}

      <Child2 />
      <button onClick={this.fn}>阿牛</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))