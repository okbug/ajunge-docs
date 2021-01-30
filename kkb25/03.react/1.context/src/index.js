/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
ReactDOM.render(
  (
    <>
        <App></App>
    </>
  )
  ,
  document.getElementById('root')
); */



// let element = React.createElement('h1', {id:'haha',className:'baba',style:{color:'red',background:'green'}}, 'world','11')

/* 
自己实现的render函数支持JSX
此注释内所有内容都可以运行
import React from './my/react'
import ReactDOM from './my/react-dom'
let element = <h1 className="haha" style={{color:'red',background:'green'}}>Hello World</h1>
ReactDOM.render(element, document.getElementById('root'))
*/
// let element = <h1 className="haha" style={{color:'red',background:'green'}}>Hello World</h1>
import React from './my/react'
import ReactDOM from './my/react-dom'
function App(props) {
  return (<div style={{color:'red',background:'green'}}>
    <span>你好:{props.name}</span>
    <span>{props.children}</span>
  </div>)
  // return <h1 className="haha" style={{color:'red',background:'green'}}>Hello World</h1>
}
let element = <App name="阿君哥">哈哈哈哈哈</App>
console.log(element)
ReactDOM.render(element, document.getElementById('root'))