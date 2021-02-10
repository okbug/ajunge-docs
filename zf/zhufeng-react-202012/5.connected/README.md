## connect-react-router
- 它是一个把redux和路由连接在一起的库
- 1.可以通过派发动作方式跳转路径
- 2.可以在仓库里获取最新路径信息   store可以存放 location action

## 使用步骤
- 1 push 是一个方法，会返回一个action
- 2. 引入中间件routerMiddleware 能够识别这个 action，进行路径跳转



- 3.引入ConnectedRouter 可以实现监听路径变化的功能，当路径发生变化后会派发特定的action
- 
- 4.引入connectRouter 然后此reducer能够识别这种action，把这个action里面对应的路径信息，保存到store里 store.getState().router.location



直接可以在组件中使用history.push 完成任务，不清楚为啥这样搞的优点 
勿忘心安
老师 这个是约定式调用吗 
sun
应该是 
一业
不是所有组件都有hisory这个属性吧，connect包装后才有 
没问题 
青衣
中间件返回了三层，是固定写法吗 是的
136****2778
嵌套了3个return 老师能否结合具体事例剥洋葱讲下 
三层
136****2778
又忘了  

20:53
Vc
action  pop  push 没理解 
路由 执行栈的概念
push 入栈
pop 出栈
代码哥
现在用context(useContext)处理全局的状态就很方便，是不是就没太有必要使用redux 和dva了啊 
21:00
Tony
redux middleware还有哪些有用的啊 s

最火的react框架 antdesignpro
umi+dva
dva用的是saga
一业
原理。。库都用的这个吧 

react redux context没用上吧 



Tony
React.lazy和 react-lazyload 
Tony
还有一个loadable啥的 