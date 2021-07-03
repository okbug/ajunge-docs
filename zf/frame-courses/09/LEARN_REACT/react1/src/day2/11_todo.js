import React from 'react';
class Todo extends React.Component {
  state = {
    todo: '',
    list: []
  }
  change = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  submit = (e) => {
    if (e.keyCode == 13) {
      console.log('enter')
      this.setState({
        list: this.state.list.concat({
          id: Math.random(),
          text: this.state.todo
        }),
        todo: ''
      })
    }
  }
  del = (item) => {
    this.setState({
      list: this.state.list.filter(val => val.id !== item.id)
    })
  }
  render() {
    let { todo, list } = this.state;
    return <div className=''>
      <input type="text" value={todo} onChange={this.change} onKeyDown={this.submit} />
      <ul>
        {
          list.map(item => <li key={item.id}>{item.text} <button onClick={() => {
            this.del(item)
          }}>X</button></li>)
        }
      </ul>
    </div>;
  }
}
export default Todo

/*
  input Input
  ul    List
  button  Button


*/