import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        age: state.age + action.val
      }
    case 'minus':
      return {
        ...state,
        age: state.age - action.val
      }
    case 'changename':
      return {
        ...state,
        name: action.val
      }
    default:
      return {
        ...state
      }
  }
}

function useQQQ(n) {

  let [qq, setqq] = useState(1000)
  let [ww, setww] = useState(9999)
  if (n > 5) {
    return [qq, setqq]
  } else {
    return [ww, setww]
  }

}
function App(props) {
  // let [state, setState] = useState({ name: "zhufeng", age: 12 })
  let [state, dispatch] = useReducer(reducer, { name: "zhufeng", age: 12 })
  const changeName = (e) => {
    dispatch({ type: 'changename', val: e.target.value })
  }
  const add = () => {
    dispatch({ type: 'add', val: 100 })
  }
  const minus = () => {
    dispatch({ type: 'minus', val: 50 })
  }
  let [num, setNum] = useQQQ(2)
  return <>
    {state.name}-- {state.age} -- {num}
    <input type="text" value={state.name} onChange={changeName} />
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
  </>
}

function App2(props) {
  let [state, setState] = useState({ name: "zhufeng", age: 12 })
  const changeName = (e) => {
    setState({
      ...state,
      name: e.target.value
    })
  }
  const add = () => {
    setState({
      ...state,
      age: state.age + 10
    })
  }
  const minus = () => {
    setState({
      ...state,
      age: state.age - 10
    })
  }
  return <>
    {state.name}-- {state.age}
    <input type="text" value={state.name} onChange={changeName} />
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
  </>
}
/* 
自定义hook  就是一个以use开头的函数； 一般用于服用逻辑的抽离


*/
ReactDOM.render(<App />, document.getElementById('root'))