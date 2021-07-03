import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list'
class App extends React.Component {
  state = {
    ary: [
      { id: 1, name: "珠峰1", text: '删除1' },
      { id: 12, name: "珠峰12", text: '删除12' },
      { id: 13, name: "珠峰13", text: '删除13' },
      { id: 14, name: "珠峰14", text: '删除14' }
    ]
  }
  del(item) {
    this.setState({
      ary: this.state.ary.filter(val => val.id !== item.id)
    })
  }
  render() {
    return <div className=''>
      <List data={this.state.ary} render={(item) => {
        return <button onClick={() => { this.del(item) }}>{item.text}</button>
      }} />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))