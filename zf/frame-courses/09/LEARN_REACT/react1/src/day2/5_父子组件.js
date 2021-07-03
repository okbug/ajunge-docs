import React from 'react';
import { Child, Child2 } from './component/child'
class App extends React.Component {
  state = {
    name: "珠峰"
  }
  changeName = (str) => {
    this.setState({
      name: str
    })
  }
  render() {
    return <div className=''>
      <h1>{this.state.name}</h1>
      <Child className={this.state.name} onChangeName={this.changeName} />
      <Child2 className='box' onChangeName={this.changeName} />
    </div>;
  }
}
export default App