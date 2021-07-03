import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button'
import Input from './Input'
import List from './List'
class App extends React.Component {
  state = {
    todo: '',
    list: []
  }
  f1 = () => {
    console.log("anniu")
  }
  change = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  submit = () => {
    console.log(666)
    this.setState({
      todo: '',
      list: this.state.list.concat({
        id: Math.random(),
        text: this.state.todo
      })
    })
  }
  del(id) {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render() {
    let { todo, list } = this.state;
    return <div className=''>
      <Button onClick={this.f1}>阿牛</Button>
      <Input type='text' value={todo} onChange={this.change} onSubmit={this.submit} />
      <List data={list} render={(item) => {
        return <>
          <b>{item.text}</b>
          <Button onClick={() => { this.del(item.id) }}>X</Button>
        </>
      }} />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))