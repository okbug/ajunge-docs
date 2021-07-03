import React from 'react';
import ReactDOM from 'react-dom';
// 大部分情况下  setState都是异步更新
console.log(React.Component)
class App extends React.Component {
  state = {
    name: "珠峰",
    count: 100
  }
  fn = () => {
    // this.state.name = "珠峰裴遵";
    // console.log(this.state)
    // setState 专门用来出发试图更新的 (render)
    this.setState({
      name: "珠峰培训"
    })
  }
  add = () => {
    this.setState({
      count: this.state.count + 1 // 100 + 1
    }, () => {
      console.log(this.state.count)
    })
    this.setState({
      count: this.state.count + 1 //100 + 1
    }, () => {
      console.log(this.state.count)
    })
    this.setState({
      count: this.state.count + 1// 100 + 1
    }, () => {
      console.log(this.state.count)
    })
    // console.log(this.state.count)
    // this.setState((...arg) => {
    //   console.log(arg)
    //   return {
    //     count: this.state.count + 1
    //   }
    // })
    // this.state.count++;
    // this.setState({});

  }
  render() {

    console.log('render')
    return <div className=''>
      <h1>{this.state.name}-----{this.state.count}</h1>
      <button onClick={this.fn}>改名字</button>

      <button onClick={this.add}>+</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))