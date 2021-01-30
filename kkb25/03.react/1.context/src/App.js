import React from 'react'

class App extends React.Component {
  state = {
    number :0
  }
  handleClick = () => {
    this.setState({number: this.state.number + 1}, () => {
      this.setState({number: this.state.number + 1})
    })
  }
  render() {
    return (<button onClick={this.handleClick}>+ {this.state.number}</button>)
  }
}

export default App
