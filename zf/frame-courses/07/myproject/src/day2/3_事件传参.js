import React from 'react';
import ReactDOM from 'react-dom';
// import './less/3.css'
import style from './css/qq.module.css'
console.log(style)
class App extends React.Component {
  state = {
    name: "zhufeng"
  }
  fn(n) {
    console.log(arguments, this)
  }
  fn3() {
    console.log(arguments)
  }
  fn4 = (...arg) => {
    return () => {

      console.log(this, arg)
    }
  }
  render() {
    return <div className='box3'>
      <button onClick={this.fn}>按钮</button>
      <button onClick={this.fn.bind(this, 2, 3, 4, 5, 6, 7, 8)}>按钮2</button>

      <button onClick={(e) => { this.fn3(e, 1, 2, 3, 4, e, 5, e) }}>按钮3</button>


      <button className={style.box3} onClick={this.fn4(1, 2, 3)}>按钮4</button>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))