import React from 'react';
import ReactDOM from 'react-dom';
import Child from './components/child'
class App extends React.Component {
  state = {
    name: "珠峰",
    age: 12
  }
  changeName(name) {
    this.setState({
      name: name
    })
  }
  render() {
    let { name, age } = this.state
    return <div className=''>
      <h1>姓名{name}</h1>
      <Child age={age} fn={(n) => { this.changeName(n) }} />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))