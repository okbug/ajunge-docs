import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

let MyContext = React.createContext()// 创造了一个上下文

function Sun() {
  let context = useContext(MyContext)
  console.log(context)
  return <>
    <h1>Sun {context.name}==={context.age}</h1>
  </>
}

class Child extends React.Component {
  static contextType = MyContext
  render() {
    console.log(this)
    return <>
      <h1>child {this.context.age}</h1>
      <Sun />

    </>
  }
}

class App extends React.Component {
  state = {
    name: "珠峰",
    age: 12
  }
  render() {
    let { age, name } = this.state;
    return <div className=''>
      <button onClick={() => { this.setState({ age: age + 10 }) }}>+</button>
      <MyContext.Provider value={this.state}>
        <Child />
      </MyContext.Provider>

    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))