import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
    console.log(1, this.state.count);
    this.setState({ count: this.state.count + 1 })
    console.log(2, this.state.count);
    Promise.resolve(1).then(e => {
      this.setState({ count: this.state.count + 1 })
      console.log('promise', this.state.count);
    })
    setTimeout(() => {
      console.log(2.9, this.state.count);
      this.setState({ count: this.state.count + 1 })
      console.log(3, this.state.count);
    }, 1000);
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(4, this.state.count);
    }, 2000);
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(
  (
    <>
      <App></App>
    </>
  )
  ,
  document.getElementById('root')
);