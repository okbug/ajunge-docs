import React from 'react';
/* 
  受控组件 表单元素的值收 组件的控制

*/
class App extends React.Component {
  state = {
    name: "珠峰"
  }
  changeName = (e) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }
  componentDidMount() {
    this.inp.value = this.state.name
  }
  render() {
    let { name } = this.state;
    return <div className=''>
      <h1>{name}</h1>
      <input type="text" value={name} onChange={this.changeName} />
      <input type="text" ref={el => this.inp = el} onChange={this.changeName} />
    </div>;
  }
}
export default App