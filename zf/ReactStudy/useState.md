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

# 使用
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

# 重点：每一次渲染都是一次独立的闭包
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