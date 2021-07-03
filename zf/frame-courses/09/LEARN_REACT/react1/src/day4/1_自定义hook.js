import React, { useState } from 'react';
import ReactDOM from 'react-dom';
function useCount(m) {
  let [n, setN] = useState(m);
  function add() {
    setTimeout(() => {
      setN(n + 1)
    }, 1000);
  }
  return [n, add]
}

function App() {
  let [count, add] = useCount(100)
  return <>
    <h1>{count}</h1>
    <button onClick={add}>+</button>
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))