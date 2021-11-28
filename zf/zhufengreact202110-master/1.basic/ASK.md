

$$typeof: Symbol(react.element)



09:41
daywang
虚拟dom￼
~~~
render函数第三个参数不是数组吗￼
render是没有第3个参数
createElement(类型，配置对象，大儿子，2儿子，3儿子...)
daywang
这个render 把谁 挂载到 谁上￼
ReactDOM.render
第1 虚拟DOM
第2 真实DOM的容器
render负责把这个虚拟DOM变成真实DOM插入到真实的容器里面
********************
JSX渲染都react.createElement吗，其他框架写JSX也是转成react.createElement吗￼
每个框架构 方法名不一样，作用是一样的
vue createVnode=createElement吗
react root vue app

不完美
网页上我看老师选了react￼
daywang
本质都是转成 虚拟dom把￼ 是的
strive
jsx默认会执行react.createElement方法吗￼
jsx=react.createElement
雷
_store是什么？￼
09:55
liu
老版本编译时为啥不自动引入react

10:03
135****5238
React.createElement中是怎么处理的，vdom和ast怎么理解￼
马上会实现
紫珏
没有￼
strive
1￼



135****5238
1￼
~~~
如果有不认识的标签名有处理吗￼
<sp>

10:28
daywang
不认识的就属于组件类型了吧￼
strive
源码也是这么判断children类型的吗￼
是的


react-dom.js:45
未捕获的类型错误，无法添加dom属性，对象是不可扩展的
 Uncaught TypeError: Cannot add property dom, object is not extensible




study
怎么转vdom的￼
11:44
DayDayUp
div怎么转成vdom￼
啊巴啊巴
他说的是 函数组件￼
daywang
函数式组件返回的吧￼
study
function￼

先定义函数组件

执行函数组件得到div的虚拟DOM
然后再把div虚拟DOM变成真实DOM插入页面


function￼
study
组件￼
啊巴啊巴
FcuntionComponent()￼
daywang
执行得到的就是 虚拟dom么￼
是的


jsx怎么变成createEL的？？？？？？？
在webpack打包的时候 ，会调用babel编译 源代码，那个时候 会把jsx 变成React.createElement
为什么变成对象了￼




跟我们日常开发是一样的   现在是dev 环境  package。json 中的配置build 会时时监听 ￼
小海
说一下 $$type 及其作用￼
11:53
strive
类组件怎么接收props的￼
啊巴啊巴
不是有constructor吗￼
啊巴啊巴
this.props=props￼


DayDayUp
constructor传的￼
daywang
也是标识类型的吧 类似 pathflag￼
strive
是这个super传的吗￼




函数组件 和 直接调用函数有区别吗？ <Abc  name=1/>   Abc({name:1})￼
daywang
super 调用父的 方法或者 给constructor 传参￼
lukasavage
super代表父类的构造函数￼
lukasavage
只要继承必须家super￼
啊巴啊巴
直接调用函数的话，每次更新都会执行一次￼
123
需要把自己的属性传入父类的构造函数执行￼
strive
也就是说props实际是在子类上绑定的么￼



老的虚拟dom怎么拿到?
老的真实DOM怎么拿? 
紫珏
vdom.dom￼



14:37
紫珏
这边是不是用正则比较的好￼ 可以的
DayDayUp
这样新老直接替换，是不是每次都会更新整个组件￼ 是的



15:09
daywang
自定义事件￼
daywang
比原生好处是什么，加些自己的逻辑判断？￼
可以统一加入自己的逻辑

strive
事件委托， 性能会好一点么￼
123撤回了一条消息
123撤回了一条消息
落满南山
可以store=dom.store | {}  吧？￼



15:17
strive
多个dom都有事件的话， 每个dom都会有对应store吧￼
提
事件处理函数还是存放在各自DOM上的
daywang
vue 都是用的原生事件￼



15:24
tykdn
如果时间处理函数有传参呢￼
15:36
strive
这里为啥要模拟， 浏览器本身不是就会冒泡吗￼
daywang
用的就是浏览器冒泡吧￼

什么 原生事件
什么是React事件



这个冒泡不是咱自己模拟的吗，调用 stopPropagation 能阻止吗
不能


16:02
strive
老师， 把讲完index.js放在文件夹保存下把￼
16:06
daywang
ref 实例也是 babel 解析出来的

<input ref ={xx}>
React.createElement('input',{ref:xx});





感觉像高价组件￼
daywang
什么时候函数是组建，什么时候普通的类
能用函数全用函数，类逐渐废弃了
React官方说了，不会把类干掉
daywang
什么时候用￼
16:27
strive
type.render￼
strive
这个ref实际就是对象的引用实现的么￼
是的
这个ref作用就是为了获取真实DOM元素

上节课我们只考虑基本的生命周期
而且我们更新组件的时候 是直接替换掉，而没有进虚拟DOM的dom diff



20:13
daywang
jsx 里只能 三元么，能if这种判断么￼
不能
JSX的{}只能写表达式，不能写if for语句
表达式就是变量和常量还有操作符合集合，或者说混合，一定要返回一个可以渲染的值

20:18
daywang
意思是不设置update 中的判断。每次都会更新 父子组件，即使属性没变。
是的
为什么不内部自动判断。有依赖的值变了才更新
其实是可以实现，后面会讲，但是默认不是这样的


20:22
Bob
老师这是react新生命周期吗￼ 是的

小海
函数中可以￼




应该执行update方法吧？￼
没离开过
newDom.didMount吧￼
daywang
type 不等就直接删除，替换新的￼
daywang
这里是不是要判断key
先不考虑key



现在只是同级对比吗， 没有移动么￼

1.在React的DOM-DIFF只考虑同级的情况 ，只会比较 同一个父亲 的不同的儿子。不考虑跨层级移动



小海
vue diff 复杂一下￼
strive
vue 的 domdiff快忘了， 没时间去消化/(ㄒoㄒ)/~~￼



nextVdom 是不是只有新的vdom比老的vdom多的情况下才会去插入￼
daywang
其实并不是





请问一下老师，这个方法 getSnapshotBeforeUpdate() 在 hooks 里用哪个 api 来替代它呢？
后面给大家演示一下


React15的时候  domdiff stack reconcilier 这个过程不能中断，一气呵成
React16 引入了Fiber, domdiff阶段可能会暂停和恢复 
生命周期有变化

getDerivedStateFromProps 从新的属性映射新的状态对象
getSnapShotBeforeUpdate 真正的DOM更新可以获取老的DOM的快照

少了 will.xxxx
componentWillMount
componentWillUpdate
componentWillReceiveProps


如果 head  main 组件在独立的文件中，使用 static 的 Themecontext 是不是要导出。保证是一个 context￼
是的，没错

createContext 返回
let context  = {
    $$typeof: Symbol(react.context),
    Consumer: {$$typeof: Symbol(react.context), _context:context}
    Provider: {$$typeof: Symbol(react.provider), _context:context},
    _currentValue:{color:'red',changeColor}
}
context.Consumer._context=context;
context.Provider._context=context;

Provider是一个对象
但是它可以作为组件的type属性


Provider不是个对象吗，也能当成组件传value值？￼
daywang
是组建￼
daywang
context是个对象￼
在一个应用中Provider是可以使用多次的
也可以有多个Provider

shouldUpdate能阻断context变化导致的渲染吗？
你猜一下？？能还是不能？

深比较 性能非常非常低，尽量永远不要使用深比较
深比较 + immutablejs



update 完 hookindex 为什么重新改成0了。老师在说下￼


5:54
daywang
所有的 hook 都存储在 同一个全局的 hookStatus 中么￼
1.我们写的代码里这样的，但是源码里并不是这样的。
源码里的话每个函数组件都有自己的hookState，而且它的hooksState用的是链表而非数组
fiber
daywang
不同的 函数组件里的 hook￼




useEffect执行时机和componentDidMount一样吗￼
可以这么认为
useEffect里面的函数会在
组件挂载后执行后   didmount
还会在组件更新后执行 didupdate
还在会组件将要卸载前执行 willunmount


16:32
daywang
hook 就没有生命周期了吧￼ 没有
生命周期是针对类组件才有的，函数组件没有实例，也没有生命周期
嘻哈
如果加了空数组后，同时也把 return () => {} 这个函数开启呢可以吗。
有带来一定的好处和提升优化性能吗？

那初始化接口数据写在useEffec这里会有问题吗￼
一般来说初始化接口的确是写在useEffect里的，只不过一般来说依赖我们也会写成空数组，保证只分初始化调用一次


没什么用



同时可以在一个方法里，同时用 useLayoutEffect 和 useEffect 吗？
useLayoutEffect在前面 ，useEffect在后面呢。这样会有影响吗？￼
 肯定 可以的。互相之间没有影响


17:15
daywang
没用过react 。后面的不是很熟了￼
张仁阳


//const [page,setPage] = useState(1)  setPage(2)后怎么马上获取到最新page发送请求￼
嘻哈
路由会讲到守卫吗？老师￼


这个方法 getSnapshotBeforeUpdate() 在 hooks 里用哪个 api 来替代它呢？


17:23
daywang
老师咱们 ssr 没有直播是吧￼
daywang
effect？￼
Rays
自定义hook可以简单说下不￼
