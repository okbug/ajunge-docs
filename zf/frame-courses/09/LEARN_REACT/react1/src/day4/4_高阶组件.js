import React from 'react';
import ReactDOM from 'react-dom';

// function qqq(){
//   return function(){

//   }
// }
/* 高阶组件 就是一个函数 接受一个组件作为参数 最终返回一个新的组件 */
/* 
高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。
HOC 自身不是 React API 的一部分，
它是一种基于 React 的组合特性而形成的设计模式。
*/
// function connect(Com) {
//   let initValue = {
//     name: "珠峰",
//     age: 10
//   }
//   return function () {
//     return <Com {...initValue} />
//   }

//   // return class Temp extends React.Component {
//   //   render() {
//   //     return <Com {...initValue} />
//   //   }
//   // }
// }


function connect(f1, f2) {
  let initProps = f1()
  let initFn = f2()
  return function (Com) {

    return function () {
      return <Com {...initProps} {...initFn} />
    }
  }
}












class App extends React.Component {

  render() {
    console.log(this)
    return <div className=''>

    </div>;
  }
}
App = connect(() => {
  return {
    name: "珠峰"
  }
}, () => {
  return {
    fn: () => { console.log('fn') }
  }
})(App)

ReactDOM.render(<App />, document.getElementById('root'))