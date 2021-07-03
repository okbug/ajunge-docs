import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

let Context = React.createContext()// 创造一个上下文

function ChognSun() {
  const context = useContext(Context)
  return <h4>重孙子{context.count}{context.name}</h4>
}

class Sunzi extends React.Component {
  static contextType = Context
  render() {
    return <>
      <h3>孙子{this.context.count}{this.context.name}</h3>
      <ChognSun />
    </>
  }
}

class Child extends React.Component {
  static contextType = Context
  render() {
    console.log(this)
    return <>
      <h2>儿子{this.context.count}{this.context.name}</h2>
      <Sunzi />
    </>
  }
}
class App extends React.Component {
  state = {
    count: 100,
    name: "珠峰"
  }
  render() {
    return <div className=''>
      <button onClick={() => { this.setState({ count: this.state.count + 10 }) }}>+</button>
      <Context.Provider value={this.state}>
        <Child />
      </Context.Provider>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))