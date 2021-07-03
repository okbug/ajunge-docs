import React, { memo, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

function Child(props) {
  console.log('render')
  return <h1>Child--{props.name}</h1>
}
function Child2(props) {
  console.log('render2')
  return <h1>Child2--{props.data.name}</h1>
}
function Minus({ minus }) {
  console.log('minus')
  return <button onClick={minus}>-</button>
}

Child = memo(Child)
Child2 = memo(Child2)
Minus = memo(Minus)


function App() {
  let [count, setCount] = useState(100)
  let [name, setName] = useState("珠峰")
  const change = (e) => {
    setName(e.target.value)
  }
  const add = () => {
    setCount(count + 1)
  }
  let fn = () => {
    setCount(count - 1)
  }
  // fn = useCallback(fn, [count])
  fn = useMemo(() => fn, [count])
  // let data = { name, count }
  let data = useMemo(() => {
    return { name, count }
  }, [name])
  return <>
    <h1>{count}</h1>
    <input type="text" value={name} onChange={change} />
    <button onClick={add}>+</button>
    <Minus minus={fn} />
    <Child name={name} />
    <Child2 data={data} />
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))