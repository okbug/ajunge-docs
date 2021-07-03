import React from 'react';
import ReactDOM from 'react-dom'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "珠峰"
    }
  }
  componentDidMount() {
    // mounted
  }
  shouldComponentUpdate() {
    // 返回值true则就更新组件 也就是说让render执行
    //  这个钩子函数主要=应用在优化上
  }
  // componentWillMount() {
  //   console.log(666)
  // }
  // UNSAFE_componentWillMount() { console.log(666) }
  // static getDerivedStateFromProps(props, state) {
  //   console.log(arguments)
  //   return {
  //     ...props
  //   }
  // }
  render() {
    console.log(this.state)
    return <div className=''>

    </div>;
  }
}
ReactDOM.render(<App className='box' qq={123} />, document.getElementById('root'))