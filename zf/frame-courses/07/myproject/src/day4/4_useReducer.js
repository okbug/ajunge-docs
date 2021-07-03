import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
function App() {
  // let [state, setState] = useState({ age: 100, name: "珠峰" })
  let fn = (state, action) => {
    switch (action.type) {
      case 'add':
        return {
          ...state,
          age: state.age + action.num
        }
      case 'minus':
        return {
          ...state,
          age: state.age - action.num
        }
      case 'changeName':
        return {
          ...state,
          name: action.qqName
        }
      default:
        return {
          ...state
        }
    }
  }
  let [state, dispatch] = useReducer(fn, { age: 100, name: "珠峰" })
  let change = (e) => {
    // dispatch 执行 需要传递一个action 这个action 就是一个普通对象
    dispatch({ type: 'changeName', qqName: e.target.value })
  }
  let add = () => {
    dispatch({ type: 'add', num: 5 })
  }
  let minus = () => {
    dispatch({ type: 'minus', num: 10 })
  }
  return <>
    <h1>{state.name}==={state.age}</h1>
    <input type="text" value={state.name} onChange={change} />
    <button onClick={add}>+</button>
    <button onClick={minus}>-</button>
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))