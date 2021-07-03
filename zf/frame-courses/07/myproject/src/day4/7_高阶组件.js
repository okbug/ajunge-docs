import React from 'react';
import ReactDOM from 'react-dom';

function connect(Com) {
  let initState = {
    name: "珠峰",
    age: 12
  }
  return function () {
    return <Com {...initState} />
  }
}



class App extends React.Component {

  render() {
    console.log(this.props)
    let { name, age, qqq } = this.props;
    return <div className=''>
      <h1>姓名是{name}；年龄是{age}</h1>
      <button onClick={qqq}>helloqqq</button>
    </div>;
  }
}
// let App2 = connect(App);
function connect2(f1, f2) {
  let initProps = f1();
  let initcbs = f2()
  return function (Com) {
    return function () {
      return <Com {...initProps} {...initcbs} />
    }
  }
}
let App3 = connect2(() => {
  return {
    name: "珠峰555",
    age: 12
  }
}, () => {
  return {
    qqq() {
      console.log('我是qq函数')
    }
  }
})(App)

ReactDOM.render(<App3 />, document.getElementById('root'))