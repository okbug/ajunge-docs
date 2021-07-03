import React, { createRef, useRef } from 'react';
/* 
  <h1 ref='box'>hello</h1>  获取的时候 this.refs.box  已经废弃
<h1 ref={(el) => { this.qqq = el }}>hello</h1>   获取的时候 this.qqq
 www = createRef()   <h1 ref={this.www}>hello</h1>  获取的时候 this.www.current
 
 ref 不能用在 函数式组件上  <AAA ref={(el) => { this.qqq = el }}/>
*/
function AAA() {
  let i = useRef();
  const fn = () => {
    console.log(i) // i.current
  }
  return <>
    <h3 ref={i}>AAA</h3>
    <button onClick={fn}>AAA</button>
  </>
}
class BBB extends React.Component {
  render() {
    return <>
      <h3>BBBB</h3>
    </>
  }
}

class App extends React.Component {
  fn = () => {
    console.log(this)
  }
  www = createRef()
  render() {
    return <div className=''>
      {/* <h1 ref='box'>hello</h1>
      <h1 ref={(el) => { this.qqq = el }}>hello</h1>
      <h1 ref={this.www}>hello</h1> */}
      {/* <AAA ref={(el) => { this.qqq = el }}/> */}
      <AAA />
      <BBB />

      <button onClick={this.fn}>按钮</button>
    </div>;
  }
}
export default App