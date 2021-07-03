import React from 'react';

/* 
setState({})  异步更改数据 更新视图

*/
class Counter extends React.Component {
  state = {
    num: 100,
    color: 'red',
    name: "珠峰",
    ary: [1, 2, 3]
  }
  add = () => {
    // this.state.num += 20
    // this.setState({
    //   num: this.state.num += 20// num:120; this.state.num = this.state.num + 20
    // })
    // let ary = this.state.ary.filter(item => item !== 1)
    this.state.ary.pop();
    this.setState({
      num: this.state.num += 20,// 120
      ary: this.state.ary.slice()
    }, () => {
      console.log(this.state.num)
    })
    this.setState({
      num: this.state.num += 20//120
    }, () => {
      console.log(this.state.num)
    })
    this.setState({
      num: this.state.num += 20//120
    }, () => {
      console.log(this.state.num)
    })

    // console.log(this.state.num)
  }
  minus = () => {
    // this.state.num -= 10
    // setState 更新数据大部分情况下是一个异步操作
    let num = this.state.num - 10
    this.setState({
      num: num
    }, () => {
      console.log(this.state.num)
    })
    // this.state.num -= 10;
    // this.setState({})

    // console.log(this.state.num)
    // this.setState((...arg)=>{
    //   return {
    //     num:123
    //   }
    // })
  }
  render() {
    let { num, ary } = this.state;
    return <div className=''>
      <h1>{num}{ary}</h1>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
    </div>;
  }
}
export default Counter