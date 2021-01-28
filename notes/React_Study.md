# JSX 
JSX = JavaScript + XML
# 组件
如果是自己定义的组件 一定是大写开头 那么才可以被react判断为
# PropTypes的使用
在Class中使用一个对象 
> 其他用法还暂无必要
```js
// 默认的属性
static defaultProps = {
    name:'默认名字'
}
static propTypes = {
    name:PropTypes.string|number|boolean.isRequired,   // isRequired如果选中 则必填该属性
    obj:PropTypes.oneOf(['xxx','yyy'])，  // obj只能是xxx或者是yyy
    arr: PropTypes.shape({ // arr是数组 并且里面的值也可以规定类型
        x: PropTypes.number
        y: PropTypes.string.isRequired
    }),
    hobby:PropTypes.arrayOf(PropTypes.string) // 整个数组都是字符串类型 类似ts中的 <Array>string | string[]
    age(props, propName,componentName) {
        let age = props[proName]
        if(age<0||age>120) {
            throw new Error(`age要在0-120之间`)
        }
    }
}
```

# setState
setState有两种写法，一种直接传入一个对象，只有增加和修改，没有删除的方法。
第二个方法就是传入一个函数，默认的参数是原来的state。并且返回一个对象，这个可以实现异步操作，就是说，同时这样使用两次的话，可以更新两次，并且setState里面可以传入第二个参数，是一个回调函数，在state的更新完成后执行的一个回调函数


# Context
上下文 用来高效处理组件间通信

```js
let ThemeContext = React.createContext();
/*这个函数返回两个组件
* 可以通过
* <ThemeContent.Provider> 或 <ThemeContent.Consumer> 
* 来包裹需要传值的组件来使用 
*/ 
function createContext() {
    function Provider(props) {
        Provider.value = props.value;
        return props.children;//直接渲染儿子
        // 因为这个组件没有内容，本来要返回jsx，由于children中有jsx代码，所以直接返回他的children
    }
    function Consumer(props) {
        let children = Array.isArray(props.children) ? props.children[0] : props.children;
        return children(Provider.value);
    }
    return { Provider, Consumer };
}

```


# 高阶组件
是一个函数组件 接受一个组件 返回一个新组件（可以是类组件）

```js

//受控组件是input的value值受状态控制 非受控组件是input框的value值不受状态控制 

class Main extends React.Component {
    state = {
        value:this.props.value
    }
    handleClick = (e) => {
        this.setState({value: e.target.value})
    }
    render() {
        return <input defaultValue={this.props.value} /> // 非受控 无状态
        return <inpit value={this.state.value} onChange={this.handleClick} />  // 受state控制
    }
}
const Main = props => <input defaultValue={props.value} />

ReactDOM.render(<Main value="test" />, document.getElenentById('root'))

```



# router

```js
ReactDOM.render(
  <Router>
    <>
      <NavHeader />
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to={{ pathname: "/user" }}>User</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* excat 指精确匹配 否则在匹配下面的path中 也会匹配到 / 的情况 */}
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Protected path="/profile" component={Profile} />
        <Redirect from="/home" to="/" />
      </Switch>
    </>
  </Router>,
  document.getElementById('root')
);
```


# stop-router




# redux

## 基本使用
```js
import { createStore } from 'redux'
const ADD = 'ADD'
const MINUS = 'MINUS'
let initialState = 0;
function reducer(state = initiaState, action) {
    if(action.type === ADD) {
        return state+1
    }else if (action.type === MINUS) {
        return state - 1
    }else {
        return state
    }
}
let store = createStore(reducer)

let p = null
function render() {
    p.innerHTML = store.getState()

}
store.subscribe(render)
addBtn.addEventListener('click', () => {
    store.dispatch({type:ADD})
})
minusBtn.addEventListener('click', () => {
    store.dispatch({type:MINUS})
})



```



## 基本实现
```js
function createStore(reducer /* 仓库 */, initialState) {
    let state = initialState;
    let listeners = []
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(f => {
            f()
        })
    }
    function subscribe(listener) {
        listeners.push(listener)
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}


// use
function reducer(state, action) {
    return action.color
}
let store = createStore(reducer, 'green')
store.subscribe(() => {
    console.log('颜色变成了：', store.getState()) // red
    // green
// 颜色变成了： red
// 颜色变成了： yellow
// 颜色变成了： black
})
console.log(store.getState()) // green
store.dispatch({type:'changeColor', color: 'red'})
store.dispatch({type:'changeColor', color: 'yellow'})
store.dispatch({type:'changeColor', color: 'black'})



// console.log(store.getState()) // red

```
### bindActionCreators
方法接收两个参数 可以把actions自动变成可dispatch的方法
比如 本来在jsx中要 onClick={() => store.dispatch({xx:'xx'})}
function x() {
    return {xx:'xx'}
}
那么jsx中 onClick={() => store.dispatch(x())} // 自动执行 变成里面的返回值
使用bindActionCreators
`x = bindActionCreators(x,store.dispatch)` 
onClick={x} // 直接使用 自动变成上面的样子

```js
function bindActionCreator(actionCreator, dispatch) {
    return function() {
        dispatch(actionCreator.apply(this,arguments))
    }
}

function bindActionCreators(actionCreators, dispatch) {
    if(typeof actionCreators === 'fuicntion') {
        return bindActionCreator(actionCreators, dispatch)
    }
    return function() {
        dispatch(actionCreators)
    }
}
```



















# Hooks
## useState
这个不多说 和setState类似 也会受异步的影响
解决办法就是使用 useRef 来存一个值 

## useRef
相当于这样的代码
```js
let useRef = ()=> ({current:null})

let [count, setCount] = useState(0);
let saveCallback = useRef();//返回的是一个对象 saveCallback={current:null}
function alertNumber() {
setTimeout(() => {
    //如果我希望延迟之后永远打印最新的值
    //alert(count);
    alert(saveCallback.current);
}, 3000);
}
<button onClick={()=>{
    setCount(count+1)
    saveCallback.current = count
}}></button>
```
但是它和自己写的一个新对象也不一样 除非是一个全局变量 否则每次都会重新渲染


## memo
```js
React.memo = function
Child = memo(Child)
```
使用了memo之后 将原来的组件包裹起来。并且没有接受参数的话 Child组件不会render

# 带use的都有一个特征，那就是在多次渲染的时候可能保持一致

## useCallback
类似SetState中传入一个函数 返回新状态的方法
```js
const [number, setNumber] = useState(0)
const addClick = useCallback(() => setNumber(number + 1), [number]) 
// 这里传入的第二个参数为：依赖项，里面放入一个number 说明当number更改的时候 函数也会更新，否则函数还是原来的函数 ，number是不会改变的
```

## useMemo 
类似useCallback 但是传入的参数是对象
```js
let data = useMemo(() => ({ number }), /* 依赖项 */, [number])
let addClick = useCallback(() => setNumber(number + 1), [data]) 


```
## useEffect

```js
useEffect(() => {
    // ...actions
})
```
useEffect里面的函数会在组件挂载完成后，和组件更新完成后执行
相当于class组件中的 componentDidMount 和 componentDidUpdate 
Effect 副作用 更新了组件之后需要执行的函数
如果没传依赖数组，则此函数每次渲染都会执行




异步数据一般在class中的componentDidMount 简称CDM
在Hooks组件中一般在useEffect




# UmiJS

