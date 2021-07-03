import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
  state = {
    todo: '',
    ary: [{ id: 1, value: 123 }, { id: 21, value: 123323 }, { id: 31, value: 12553 }, { id: 14, value: 12443 }]
  }
  del(item) {
    let ary = this.state.ary.filter(val => val.id != item.id);
    this.setState({
      ary: ary
    })
  }
  change = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  keydown = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        todo: '',
        ary: [{ id: Math.random(), value: this.state.todo }].concat(this.state.ary)
      })
    }
  }
  //  List  Input   button
  render() {
    let { ary, todo } = this.state;
    return <div className=''>
      <input type="text" value={todo} onChange={this.change} onKeyDown={this.keydown} />
      <ul>
        {
          ary.map(item => {
            return <li key={item.id}>{item.value}  <button onClick={() => { this.del(item) }}>X</button></li>
          })
        }
      </ul>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))