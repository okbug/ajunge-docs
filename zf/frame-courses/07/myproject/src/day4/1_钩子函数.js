import React from 'react';
import ReactDOM from 'react-dom';
class Child extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    if (this.props.name === newProps.name) return false
    return true
  }
  render() {
    console.log('render')
    return <h1>Child--{this.props.name}</h1>
  }
}
class Child2 extends React.PureComponent {
  render() {
    console.log('render2')
    return <h1>Child2--{this.props.name}</h1>
  }
}
class App extends React.Component {
  state = {
    name: "珠峰",
    count: 100
  }
  change = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return <div className=''>
      <h1>{this.state.count}</h1>
      <input type="text" value={this.state.name} onChange={this.change} />
      <button onClick={this.add}>+</button>
      <Child name={this.state.name} />
      <Child2 name={this.state.name} />
    </div>;
  }
}

class QQ extends React.Component {
  state = {
    components: []
  }
  shouldComponentUpdate(nextProps) {
    this.setState({
      components: this.state.components.concat(nextProps.children)
    })
  }
  render() {
    return <>
      {
        this.state.components.filter
      }

    </>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))