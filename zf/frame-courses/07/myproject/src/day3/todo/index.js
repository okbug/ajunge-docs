import React from 'react';
import ReactDOM from 'react-dom';
import List from './List'
import Button from './Button'
import Input from './Input'
let initAry = localStorage.getItem("todoAry") ? JSON.parse(localStorage.getItem("todoAry")) : []
class App extends React.Component {
  state = {
    ary: initAry,
    todo: ''
  }
  del(item) {
    let ary = this.state.ary.filter(val => val.id !== item.id);
    localStorage.setItem("todoAry", JSON.stringify(ary))
    this.setState({
      ary: ary
    })
  }
  enter = () => {
    let ary = [{ id: Math.random(), name: this.state.todo }].concat(this.state.ary);
    localStorage.setItem("todoAry", JSON.stringify(ary))
    this.setState({
      todo: '',
      ary: ary
    })
  }
  change = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  componentDidUpdate() {
    // vue的updated
  }
  componentWillUnmount() {
    // vue的 beforeDestory
  }

  render() {
    let { ary, todo } = this.state;
    return <div className=''>
      <Input value={todo} onChange={this.change} onEnter={this.enter} />
      <List data={ary} render={(item) => {
        return <><i>{item.name}</i> <Button onClick={() => { this.del(item) }}>X</Button></>
      }} />

    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))