import React from 'react';
import ReactDOM from 'react-dom';
import Child2 from './components/child2'
class App extends React.Component {
  state = {
    ary: [{ id: 1, name: "珠峰1" }, { id: 12, name: "珠峰12" }, { id: 13, name: "珠峰13" }, { id: 14, name: "珠峰14" }]
  }
  render() {
    return <div className=''>
      <Child2 data={this.state.ary} >
        <h1 slot='header'>哈哈哈</h1>
        <h1 slot='footer'>哈哈哈</h1>
        <h1 >哈哈哈</h1>
      </Child2>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))