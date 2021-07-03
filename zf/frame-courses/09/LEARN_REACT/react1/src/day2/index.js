import React from 'react';
import ReactDOM from 'react-dom';
// import EventChild from './2_事件'
// import Counter from './3_counter'
// import Counter2 from './4_useState'
// import Parent from './5_父子组件'
/* 
  状态  state  组件自己的数据
  属性  props  外界传进来的数据

*/

// import Slider from './slider'
// import List from './6_list'
// import Todo from './7_简易todo'
// import REF from './8_ref'
// import Inp from './9_input'
import App2 from './10_input组件封装'
import Todo from './11_todo'
function App1() {

  return <>
    <h1>hello</h1>
  </>
}
class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }
  state = {
    ary: [111, 222, 333, 444]
  }
  render() {
    // console.log(this.state)
    // console.log(this.props)
    return <div className=''>
      {/* <EventChild />
      <Counter />
      <Counter2 />
      <Parent /> */}
      {/* <Slider /> */}
      {/* <List data={this.state.ary} render123={item => <><b>{item}</b></>}>
        <h1 slot='title'>列表标题</h1>
        <h1 slot='title'>列表标题</h1>
        <h1 slot='title'>列表标题</h1>

        <h2 slot='footer'>列表尾部</h2>
        <h2 slot='footer'>列表尾部</h2>
        <h2 slot='footer'>列表尾部</h2>
      </List> */}

      <Todo />
      {/* <REF /> */}
      {/* <Inp /> */}
      <App2 />
    </div>;
  }
}
// console.log(React.Component)

ReactDOM.render(<App qqq="123" />, document.getElementById('root'))