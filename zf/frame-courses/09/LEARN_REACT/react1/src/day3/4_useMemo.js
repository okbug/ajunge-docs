import React, { useState, memo, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
function Child(props) {
  console.log('render')
  return <>

    <b>
      {props.data.name}
    </b>
  </>
}
Child = memo(Child)
//  mome处理过的组件 只有当传进来的属性发生改变的时候 才会重新渲染
//  useMemo 是为了缓存一个引用数据类型的
//  memo+useMemo 可以减少子组建的渲染次数
//  useCallback 是用来缓存一个函数体的

function App() {
  let [state, setState] = useState({
    count: 100,
    name: "照顾"
  })
  const add = () => {
    setState({
      ...state,
      count: state.count + 1
    })
  }
  let { count, name } = state;
  // let data = { name: name }
  let data = useMemo(() => {
    // 只有当name发生改变的时候 才会给data赋予一个新的地址
    return {
      name: name
    }
  }, [name])
  // let fn = () => {
  //   console.log('fn')
  // }
  let fn = useCallback(() => {
    console.log('fn')
  }, [])
  return <div className=''>
    {count}
    <button onClick={add}>+</button>
    <Child data={data} onFn={fn} />
  </div>;
}

ReactDOM.render(<App />, document.getElementById('root'))