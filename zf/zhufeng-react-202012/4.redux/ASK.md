感觉聊天窗有些信息会延后显示 
月下吴刚
图保存一下 
Tony
如果有多个状态 可以只订阅部分的修改吗 
不行
wagool
老师，刚说的什么可以有多个仓库？没听清 
flux
一业
根据type来派发不同行为改各自的state 
Vc
flux 
wagool
哦 
Vc
为什么要定义常量  每个reducer不都是独立的么 
dispatch的时候，也要用到这个动作类型
666
有啥区别呢，两种设置默认值 
一业
没啥区别，都行 
666
1 

开心麻花
一个store是不是只能有一个reducer? 
redux应用中，只能有一个store 只能有且个reducer 只能有一个state
好好学习
刚才的保安图保存一下吧 
136****2778
老师 src的index.js看下 看下onclick的函数 

store 和 state 有什么不一样？ 
钱炜华
那多个数据需要派发就是传入对象，里面定义多个key么 



10:09
月下吴刚
dispatch 会触发 subscribe 吗？ 
派发会触发订阅函数执行 
yy
subscribe没有调用 
H
订阅函数没有执行吧 
一业
没调subscribe 
罗畅
dispatch 触发listener函数 
136****2778
24行的reducer在哪里  
136****2778
reducer哪里定义的 
月下吴刚
你派发的每一个函数，都 会让所有的监听函数都执行
action 和 listen 要映射关联吧？ 

dispatch 为啥要return atcions 
136****2778
reducer第一个参数不是函数么 为什么23行接着state 
136****2778
为什么23行ruducer的函数的参数和业务代码不一样 
一业
能不能debugg下，走一遍 
136****2778
1 
钱炜华
subscribe 实际应用中也要把render传入吗  是的
月下吴刚
那性能不是浪费吗？ 是的


月下吴刚
官方的 store 中就这三个属性？是的
Caption
react-redux比较难吧 
136****2778
这个index.js好像和react没关系？  没关系
李福顺
没有vuex好用 
宅男呀
mobx 呢 
安凯凯
subscribe 实际使用的时候 是要显式的订阅吗 需要
xlq
再过一遍了  


10:30
136****2778
全局只有一个listens的数组吗？ 是的
FE扫地僧
应该是这样子的  
古德猫宁
每次都要订阅跟取消订阅吗 看需求
666
是的，单例的 
一业
这样是为了解决，dispatch调用所有方法的性能问题吗 
FE扫地僧
包括 vuex 都是这样 单例模式 
月下吴刚
vue 的watch 会返回一个 unwatch， 一样的 
136****2778
为什么出事的时候store要订阅？ 
如果不订阅的话，仓库中状态变化了你无法得到通知 ，也无法刷 新组件
136****2778
初始的时候 
136****2778
为什么初始 的时候store要订阅？  


这个可以在最外层把store里的state，传给这个组件，然后从props里取，props改变render执行 
react-redux的思路
好好学习
Dispatch除了type还可以传一个payload怎么用 
用来携带额外的参数 
Caption撤回了一条消息
136****2778
这里的例子的话 没有订阅好像也可以 
666
每个组件都得订阅，还得引入store 
136****2778
哦哦 


this是谁 
古德猫宁
这样的话把结果都放到bindActionCreators的返回值里了 
136****2778
9行的this是怎么闯进来的 
136****2778
args是怎么传到8行的...args 
136****2778
de  
136****2778
的 
yy
用户调用传的 




136****2778
这样子43行的event穿不进去 
古德猫宁
就是可以让你少写dispatch
bindActionCreators的作用就是方便管理action跟dispath？ 
FE扫地僧
我怎么感觉 这个基本用不上呢 ?  
古德猫宁
我也没这么写过 
因为后面react-redux都 封装了

redux应用里
只有一个reducer 只有一个仓库 reducer只有一个状态
state = {
    1,
    2,
    3,
}


combineReducers 
136****2778
老师 用命令行怎么看出commit的历史 我用git log看的都是自己提交的历史i 
136****2778
看不到老师提交的历史 
136****2778
无法返回到具体某个commit 
一业
checkout 
11:16
136****2778
一行行导出有点麻烦 有简单点的饿吗 
月下吴刚撤回了一条消息
1


没错，是可以的
如果我们点击按钮不去触发action先去请求接口 数据回来了再去dispatch就好了吧 

FE扫地僧
觉得那个 switch case 写起来不是很好,有什么替换方案吗 ? 
dva的讲到
Tony
应该没有吧。。那个应该还挺优雅的了 
FE扫地僧
我之前用过一个库, 可以变成vuex 那样的写法 , redux-actions 
136****2778
那个dispatch和store.dispatch其实一样的啊 一样的



Tony
createstore,和 reducer为什么没一起传进去啊 柯里化
136****2778
next是原生的dispatch？ 
136****2778
中间件相当于在原生的dispatch前后加额外的代码？是的 
青衣
这是函数柯里化吗 是的
钱炜华
怎么解决异步的问题，没看出来 还没讲到 thunk promise
古德猫宁
怎么解决异步的问题 
136****2778
有 
开心麻花
index.js看一下 


中间件是不是可以简单这么理解 就是原生的放中间，所以叫中间件？ 
开心麻花撤回了一条消息
666
函数支持异步了？ 
罗畅
判断action 
666
为什么不传next，next不就是store.dispatch 


那这样applyMiddleware内部是嵌套了6个函数么 
毕会斌
洋葱模型 
青衣
中间件就是拦截作用 
666
24 
FE扫地僧
切片 
wagool
AOP和柯里化有什么区别？ 
666
明白了 


为什么要预置一些参数 直接穿进去有什么不好在这里 
毕会斌
老师，在reactredux中怎么解决用户误操作导致的更新 
136****2778
promise函数和applyMiddleWare函数啥干洗 
136****2778
啥关系 


136****2778撤回了一条消息
136****2778撤回了一条消息
开心麻花
这几种中间件不能合并吗？ 那store怎么知道要应用哪种中间件？ 
store不知道 ，只能挨 个试试

罗畅
compose 会整合一起 
Debugger撤回了一条消息
136****2778
promise的。then我们没有写啊 
16:32
666
aop + 柯里化 



136****2778
promise的。then我们没有写啊 
16:32
666
aop + 柯里化 
Caption
怎么知道 store.dispatch 是改造后的 dispatch 
136****2778
老师说的嵌套导致store.dispatch不能写成next我不太裂解 
136****2778
next不是一直是原生的store.dispatch吗？ 嵌套会改？ 
Tony撤回了一条消息


next 是老的吧，原生定义的？ 
开心麻花撤回了一条消息
136****2778
store dispatch在哪里变成function （action） 
开心麻花
开心麻花
19行的store应该一直是老的原生store吧 里面的store.dispath应该还是改造前的吧 

Caption
let dispatch = middleware(store)(store.dispatch) // AOP 为 dispatch 添加逻辑  这个store 不应该是旧的吗 
136****2778
1 
好好学习
Store.dispatch在哪调用变化的 



{...store } 这种写法 store.dispatch 跟next 是一样的吧 
罗畅
为什么要这要写dispatch:()=>dispatch(action)，直接写dispatch：dispatch,有什么区别 
136****2778
13行action哪来的 
好好学习
老师 在调用那一块说一下store.dispatch分别变成什么了 
小行星
13行不理解 
Tony
这种绕的逻辑 是怎么想出来的？ 
666
debugger一下13行 



中间件里面返回一个中间件，怎么递归的 
好好学习
参数 一个是对象一个是都行 
666
直接写是undefined 
开心麻花
applyMiddleware（）方法只能应用一次吗 那岂不是一个应用只能用一种中间件？ 
136****2778
13行的第一个action是哪里来的 



如果传入多个中间件，就有点洋葱模型的感觉了 
钱炜华
延时器的打印，控制在中间第二个打印，是通过resolve，控制再往下打印的么 
136****2778
为什么promise的next是下一个参数对应的函数？ 
17:05
FE扫地僧
要是不按照着啊个顺序传如 中间件呢  
一业
真套娃呗。。 
开心麻花
13行  
开心麻花
要改回来 
FE扫地僧
13 行 
156****5981
13 
一业
dispatch 
136****2778
action 
136****2778
13行是action不是dispatch 
漂
chain有值的吗？ 
136****2778
为啥第一个action要括号 可以不要括号吧 
Tony
看一下执行栈的变化 
Tony
给匿名函数起下名字  


redux中间件原理和koa是一模 一样的

中间件都是洋葱呢 
一业
egg是不是也是 用的是koa
17:14
Tony
给这些匿名函数起名字吧 很容易能看出来嵌套的关系 
Tony
看看调用栈 



Caption
enhancer 跟 middleware的逻辑是不一样呀 
是一模一样的

H
按照这里的流程，promise中间件里面的dispatch方法就是store原始的dispatch方法 
并不是

wagool
那如果中间件放的位置不同，dispatch方的顺序也不应该不一样吧
