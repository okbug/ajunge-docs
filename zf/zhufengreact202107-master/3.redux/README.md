
21:03
旺仔牛奶
redux 用了大量闭包啊 。￼
艾瑞
改写了对象里面的方法￼
艾瑞
帮忙调用dispatch￼
旺仔牛奶
add 就是nage KEY￼


21:03
旺仔牛奶
redux 用了大量闭包啊 。￼
艾瑞
改写了对象里面的方法￼
艾瑞
帮忙调用dispatch￼
旺仔牛奶
add 就是nage KEY￼
cc
自动调一次￼
21:12
a
不能分模块建state吗￼
旺仔牛奶
不能￼
旺仔牛奶
特别难以维护怎么办啊￼
旺仔牛奶
建立多个action-types,和reducers 也是都存到状态库里了啊￼
旺仔牛奶
不会是combineReduces 吧￼
旺仔牛奶
除了combineReduces ，还有其他的方式嘛￼
旺仔牛奶
突然想到就是我两个模块，每个组件单独的状态里，都想要建立同一个名字，这不就很难受了嘛，如果不用 combineReduces ￼
旺仔牛奶
就覆盖了吧￼
21:26
旺仔牛奶
ReactDom.reder 如果写两个组件，有什么应用场景嘛￼
@
19行也得改一下 ￼
旺仔牛奶
Combine 是又包了一层￼


嘎啦果
rootReducer最后给createStore了吗，这个在哪￼
艾瑞
这种原生的多了之后不好维护。超级恶心￼

不同页面的action的type不能一样￼
看需求



22:00
旺仔牛奶
mapStatetoProps￼
旺仔牛奶
映射对应的组件状态￼
22:04
旺仔牛奶
这就redux react-redux 讲完了，好快啊￼
旺仔牛奶
哈哈￼
嘎啦果
当年redux学了2礼拜才掌握用法，现在2小时好深入到源码。厉害了￼



gennie
感觉hooks 麻烦，我只是要改个状态 你这么麻烦 非要我写个函数  ￼
艾瑞
之前还需要写connect， 现在这样好多了￼
艾瑞
老师把dispatch再封装一层。 和connect医药返回函数可以直接调用那种￼
源码是没有这个功能的，但是我们可以实现它
艾瑞
useDispatch￼



useSelector还有第二个参数， 这个好像用的不多￼




用userReducer第二个参数存selectedState，第一个参数做比较操作呢￼
C
这样的话 use effect就不要了把￼



实现一个日志中间件
在状态发生变更的时候 
变更前打印老状态，变更 后打印新状态


小海
useSelector 还不知道什么作用
useSelector有什么用？
如果一个组件想获取仓库中的状态数据进行使用的话，就可以使用useSelector
const = state=>state.counter2
useSelector(store.getState())
counter2={number:0}

艾瑞
选择值的时候有可能值不变的时候也会触发更新。 所以useSelector这里就有第二个参数判断是否需要强制渲染￼
Moon
useDispatch派发action改变store里面state的值，useSelector取store里面state的值￼
输出                                         输入


21:42
今天你学习了么
这里的中间件是不是相当于vuex里面的的插件￼



09:38
cc
obj instanceof Object也可以吧￼
旺仔牛奶
中间件是为了处理副作用而存在的嘛￼ 是的



09:51
今天你学习了么
为什么不用next￼ 马上讲
奋斗ing
promise中间件就可以做接口请求吧￼
cc
setTimeout相当于异步接口请求￼



等于说先执行第一层函数，柯里化一个store变量，预置 getState和dispatch
然后compose包裹执行第二层函数。 最后composeFn传入原始dispatch然后再执行派发动作就执行最后一层函数￼
奋斗ing
讲完就能看懂图了￼


先从里往外走 在从外往里走￼
cc
顺序是：从左到右执行，最终从右到左完成￼
cbxm
里面不能处理异步么？￼
peak
有点复杂￼




composefn啥样的￼
cc
第8行直接写dispatch有什么问题￼
cc
第10行￼
艾瑞
dispatch可能是自己的￼
艾瑞
改造过的dispatch￼
10:39
cc
第12行没改过来吧？￼
嘎啦果
applyMiddleware.js的12行忘改过来了 ￼
嘎啦果
action => dispatch(action)￼
奋斗ing
￼￼
10:44
cbxm
再回顾下把￼

