# 类组件中setState
传入对象，那么多次调用只找最后一次，
如果传入函数，那么后面的函数的参数，是前一个函数的返回值
```js
class {
  this.setState({name:this.state.name + 1})
  this.setState({name:this.state.name + 1})
  // 只调用一次
  // 但是
  this.setState(state => ({state.name + 1}))
  this.setState(state => ({state.name + 1}))
  // 可以添加两次
}
```

# setState中的回调
this.setState的第二个参数也可以传入一个回调函数，那么在这里，状态已更新，所以可以进行多次的set数据
```js
handleClick = () => {
    this.setState({number: this.state.number + 1}, () => {
      this.setState({number: this.state.number + 1})
    })
  }
```

# setState 异步情况
```js
    this.setState({ count: this.state.count + 1 })
    console.log(1, this.state.count); // 0
    this.setState({ count: this.state.count + 1 })
    console.log(2, this.state.count); // 0
    setTimeout(() => {
      console.log(2.9, this.state.count); // 1
      this.setState({ count: this.state.count + 1 })
      console.log(3, this.state.count); // 2
    }, 1000);
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(4, this.state.count); // 3
    }, 2000);
```
看代码中的2.9和3和4。可以看出，在定时器中，setState是直接执行，并且在当前就可以看到结果




Vue
```js
// vue/src/compiler/codeframe.js
function repeat (str, n) {
  let result = ''
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) result += str
      n >>>= 1
      if (n <= 0) break
      str += str
    }
  }
  return result
}

```