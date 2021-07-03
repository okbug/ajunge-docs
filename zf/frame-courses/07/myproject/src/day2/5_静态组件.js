import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function App(props) {
  console.log(props)
  let [count, setCount] = useState(100);
  let [qqq, hahah] = useState("珠峰");
  console.log(useState(100))
  // let count = 100;
  function add() {
    // count += 100;
    setCount(count + 100)
    console.log(count)
  }
  function change() {
    hahah('珠峰培训')
  }
  return <div>
    <h1>{count}{qqq}</h1>
    <button onClick={add}>+</button>
    <button onClick={change}>change</button>
    hello
  </div>
}

ReactDOM.render(<App className='box' />, document.getElementById('root'))