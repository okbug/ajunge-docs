//  banner组件  负责展示条状 图片列表
//  arrow 组件   负责左右按钮的
//  focus 组件   负责展示小点点

import React from 'react';
import Arrow from './arrow'
import Banner from './banner'
import Focus from './focus'
// import style from './style.module.less'
import './style.less'
class App extends React.Component {
  state = {
    index: 0,// 控制当前显示图片的索引
    list: [
      { id: 1, text: 'css' },
      { id: 2, text: 'html' },
      { id: 3, text: 'js' },
      { id: 4, text: 'react' }]
  }
  fn = () => {
    console.log(666)
  }
  turn = (n) => {
    this.setState({
      index: this.state.index + n
    })
  }
  move() {
    this.timer = setInterval(() => {
      this.turn(1)
    }, 1000);
  }
  componentDidMount() {
    // 类似于vue的mounted
    this.move()
  }
  updateIndex(n) {
    this.setState({ index: n })
  }
  render() {
    let { index, list } = this.state;
    return <div
      className='box'
      onMouseEnter={() => clearInterval(this.timer)}
      onMouseLeave={() => { this.move() }}
    >
      <Arrow onLeft={() => this.turn(-1)} onRight={() => this.turn(1)} />
      <Banner index={index} list={list} onSetIndex={this.updateIndex.bind(this)} />
      <Focus index={index} num={list.length} />
    </div>;
  }
}
export default App