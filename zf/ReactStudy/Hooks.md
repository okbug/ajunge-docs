# useState
传入一个值，返回值和操作这个值的方法

```js
let lastState;
function useState(initialState) {
  let state = lastState || (typeof initialState === 'function' ? initialState() : initialState) 
  function setState(newState) {
    if(typeof newState === 'function') {
      lastState = newState(lastState)
    } else {
      lastState = newState
    }
  }
  return [state, setState]
}
```

## 使用
```js
function FuncComponent(props) {
  const [num, setNum] = useState(0)
  const add = () => {
    setNum(num + 1)
  }
  return <div onClick={add}>{num}</div>
}
```
或者在setNum中传入一个函数
同时，useState也可以传入一个函数，这个叫做，惰性加载

## 重点：每一次渲染都是一次独立的闭包
example:
```js
var i = 0;
for(i = 1;i <= 3;i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
result : 4 4 4 
因为最后（指宏任务执行时）的时候i都是4
但是使用let或者IIFE，都会产生一个独立的闭包，那么打印就是123了。
```js
for(let i = 1;i <= 3;i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
result : 1 2 3


# useReducer

## 使用

```js
// pureFunction reducer
function reducer(state, actions) {
  switch(actions.type) {
    case '1':
      return {
        count: state.count + 1
      }
    case '2':
      return {
        count: state.count + 2
      }
    default:
      return state
  }
}
let initialState = {
  count: 0
}
function App() {
  let [state, dispatch] = useReducer(reduce/* pureFunction */, initialState)
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={dispatch({type:'1'})}>+1</button>
      <button onClick={dispatch({type:'2'})}>+2</button>
    <div>
  )
}
```


## useReducer的实现
```js
let lastState
function useReducer(reducer, initialState) {
  lastState = lastState || initialState
  function dispatch(action) {
    lastState = reducer(action)
    forceUpdate()/* 刷新逻辑 */
  }
  return [lastState, dispatch]
}
```

这个时候，很核心，useState其实就是传入一个没有reducer的useReducer
即如下代码:
```js
function useState(initialState) {
  return useReducer(null, initialState)
}
```


# useEffect or useLayoutEffect

使用：
不必多说，每次渲染的时候执行回调
useEffect在每次页面渲染后执行 包括 首次渲染和每次更新结束
依赖项改变了会重新执行useEffect函数
第二个参数：依赖项数组
回调的返回值：是一个函数或者不返回
返回的函数类似类数组中的willUNMount 会执行销毁所需要的东西
销毁函数会在每次重新执行函数前被执行



# 竞态
全称竞争状态：
如果多次按一个按钮请求数据的话，如果下一次的结果比早的结果先请求到，那么就是旧的结果覆盖新的结果
如何解决
1。 防抖节流
2.  给一个tag
example:
```js
useEffect(() => {
  let didCancel = false; // 标志
  (async function() {
    const result = await http()
    if(!didCancel) setState(result) // 看是否可以去接收请求
  })()
  return () => {didCancel = true}
})
```