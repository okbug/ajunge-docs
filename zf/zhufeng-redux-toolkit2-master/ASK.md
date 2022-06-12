单例的useSocketIo有好一点的方式么
老师好
我们compose（connect（relsect））
绿色的vscode
老师，redux 变化后是全局组件都会重新渲染吗



不知道redux中那里用compose了

中间件其实是一个enhancer可以增强createStore
window.__REDUX_DEVTOOLS_EXTENSION__也是enhancer
柯里化  是缓存参数 一次执行  compose 每个都会执行
将主线内容吧 张老师
感觉是函数的累加啊
把中间件的组合起来
我想问一下，就是我们的项目中没有用到 combineReduces ，他还是每个组件都建立了多个reduce和selector，这是咋做到的啊
应该是没有用global store，拆成了粒度更细的store吧
老师这个注释的快捷键是什么
以前的都是//
/*
action  有payload  怎么处理
回车
UMI：我就知道你这这群人在想什么
原来payload那里可以随便写，现在定死是payload了
长老牛皮
源码信手拈来
课程有录播么，一步小心错过了半小时
payload随意写
设计者早早的就想到了这些问题，预留了参数功能
执行，然后传args
CreateThun


如果我要在pre函数里面取到上次的状态该怎么取
 redux-toolkit createAction 整理action
抽离出来
不如写一个数组，在转变成这种对象
默认情况default怎么实现？
第一个参数就说了默认值了啊
都不仔细听的么。。
这个 好像 和 dva 有点像
整体思路和dva基本相同
map

欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
匹配value
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
太强了，逻辑清晰
清晰很多  啰嗦代码没了
蜗牛:清晰很多 啰嗦代码没了


不用自己写新对象
那它是怎么实现的
妙呀
越来越vuex了
我看我们还用到了  fromjs 这是为啥啊 ，感觉是不可变，又变成可变对象了
produce怎么做
实现代理对象和原生对象的转换 

swr


老师，之前在子组件中定义了一个useEffect，
父组件的要是有状态变化，子组件的 state就重新赋值成初始值了是为什么啊

let [state,setState] = useState(0);
setState(1);

子组件调用setState();