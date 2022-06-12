
npm install 
redux 状态管理 核心包
redux-logger 日志中间件
redux-thunk 函数中间件
@reduxjs/toolkit 工具包
express 
cors  express的跨域中间件
axios 发请求

1 先看看老写法
然后一步步变成新写法



edux dev tool
老师语速快进了么？？
更快点才好
牛皮
越快越好，反正我又听不懂
这个语速我都快要听不清说的内容了，跟听rapper似的
多个reducer  参数是合并后的reducer 吗 后面会讲合并
应该是
什么叫纯对象呢
let obj = {};
let obj = new Object();

为什么promise不写在reducer里面？
就跟纯函数一样
因为reducer 必须是纯函数 （1.没有副作用2.引用透明）
谢谢
为什么要内置thunk而不是saga呢
多个库的二次整合？
对象判断为啥要用原型？
这样一讲感觉这个configureStore很简单清晰
redux中的compose是干啥用的  忘记了


redux中的compose是干啥用的  忘记了
有文档地址吗
toolkit 和其他的主要区别 和应用场景是什么
能再看下indexjs代码吗
课程讲一天吗
store的数据刷新会没掉吗
dva和这个有差别吗 非常像
函数组合
组合函数，管道
good
柯里化
compose 和柯里化不一样吧 不一样
应该像反柯里化
不知道redux中那里用compose了
外包小菜鸟:不知道redux中那里用compose了






编码技巧真的很重要
少写很多switch  现在就像配置一样 配置key-value
用umi的话，toolkit好集成里面吗
不是配置，是匹配，计算出来的
dva有的，它都有的
umi内置dva吧
有没有createThunkAction呢
dva好还是toolkit好
reducers在哪里
没看懂
复制一份出来把，不删掉
可以跟原有的做对比
代码别删啊，回来对比下
对
哈哈
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
越来越像了
初始化数据
简直是同父异母
貌似atom也是分开状态的
和dva modal一样了
这不就跟dav一样了，，，
简直是同母异父啊
再来个effect 就和dva一摸一样了
有点vuex的味道了
vuex一点也不一样
和vuex也很像。。。
殊途同归
不用写常量
vuex是啥？
vue的状态管理
看，又删掉了，张老能不能不删代码，留着我们做对比啊
报班啥都有，手把手教你
报班啥都有，手把手教你
老师肯定有洁癖
报班啥都有，手把手教你
代码洁癖
卡了
画面卡了
画面停止了
卡
点都不卡
画面不动了
？
？
刷新下就好了
刷新就可以了
刷新就可以了
不卡
A




eactReduxContext 是哪的？
最后一个讲完，时间也不早了，张老师也要休息。
react-redux中的
如果项目里请求的接口很多, 那么会有很多的中间件吗?
老师思维太敏锐了













data   error  isLoading 在这里是固定写法么？用的时候，成功取data,就行？









A
Q
老师沉浸在自己的世界 无法自拔
你们卡了  刷新吧
刷新好了
不卡
对
()
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
业务逻辑
没有问题
能看懂
可以看懂
分别创建action和reducer
逻辑清晰
休息一会儿？
引入同一目录下不同文件 还可以这样写 ./  学习了
因为默认读取index文件中的具名导出
哦哦
我还以为智能到读取不同文件了

name 相当于action的前缀
相当于命名空间
actions的key有可能会相同， 所以用name命名空间来区分
有点笨重，DVA的那套saga-model轻量级一点
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
分片有啥用呢
状态模块隔离
类似vuex中多modles
拼接上自己的父级？
modules
vuex的namespace
能做到数据持久化么
这就是传说中的拼爹嘛
是的 vuex中多模块 就是用namespace前缀
哈哈
对
拼爹
很形象
不再是无家可



能不能再简化一点， 只需要写createSlice， 然后用的时候一个函数可以自动帮忙注入进去
封装的越多 使用者就写更少代码
./ 是指多个不同文件还是index文件?
./指的当前目录，会找当前目录下面的index.js文件
其实是index文件
对啊 感觉是index
能听懂就是自己写不出来怎么办

看一下package.json
现在只用react的redux hooks 就可以了吗？为什么还要用redux
能用一个react组件封装 redux吗
离dva只差一个effect了




所以异步有两种方法，一个可以直接createClice里面直接写thunk，还一种用createAsyncThunk?



为什么不用createApi
createAsyncThunk怎么创建的actioncreator
createAsyncThunk 自动派发三个action
reduer需要你自己写
createApi
连reducer也不需写的
那如果很多请求的话，这样每个请求都需要写三个reducer吗
是的。很麻烦
所以才有了createApi
呜呜来晚了
一般只监听成功吧
concat是纯函数吧  要接收返回值吗?


函数挂三个属性
感觉返回的promise 没有什么用安






流程没听太明白~
发送一个后台请求
请求前
请后后

payloadCreater 是哪来的？
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
All
如果一个接口依赖之前一个接口的返回值， 这种情况参数直接取store.getState()吗
妙啊



老师，是error不，不是data.error吧
一会

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),





如果想对接口返回的数据做一些处理后再放入store怎么写
https://redux-toolkit.js.org/rtk-query/usage/examples
该发言可能违规，仅老师可见
dispatch哪来的


Redux Toolkit Query缓存是在query订阅那里判断的吗？