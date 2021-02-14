# React.memo
返回一个类组件，根据ShouldComponentUpdate周期函数中使用Object.is来判断是否需要更新传入的组件

简版：
```js
React.memo = function(OldComponent) {
  return class extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !(Object.is(nextState, this.state) && Object.is(nextProps, this.props))
    }
    render() {
      return <OldComponent {...this.props} />
    }
  }
}
```
实际上，在shouldComponentUpdate周期中，进行了多种的判断，可以更加优化性能。
比如先判断props的先后长度或props是否为null
1.引用地址完全一样，不更新
2.先后的长度不一样，更新
3.先后有一个为null，更新
4.使用for in进行浅比较，不一样了，更新



# React.createContext

利用闭包的机制，获取value

```js
function createContext() {
  let value;
  function Provider(props) {
    value = props.value
    return props.children
  }
  function Consumer(props) {
    return props.children(value)
  }
  return {
    Provider,
    Consumer
  }
}
```



# useLayoutEffect
useEffect相当于在宏任务中放入一个回调
useLayoutEffect相当于在微任务中放入一个回调
为啥？：
useLayoutEffect会在GUI渲染完成之前执行，所以在动画产生前DOM已经改变了
useEffect在GUI渲染后执行，所以有动画
结论：useEffect会 **有** 一个动画，useLayoutEffect **没有动画** 效果
利用微任务
JS中的微任务
func === 需要在微任务中执行的函数
queueMicrotask(func)
Promise.resolve().then(func)