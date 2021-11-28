
要是reducer没有初始化赋值state呢￼


createStore方法这里会保证store是唯一的么？￼

不能
redux应用中，不管你的应用有多大。
store只能有一个，唯 一的
redux本身并不能保证，也不保证
需要用户自己去保证

感觉这个createStore跟useReducer那块还挺像，
preloadState就像是deps￼
preloadState 初始状态


redux
应用中
store是单 例的，只有一份
reducer只有一份
state也只有一份





redux 和 vuex 比较， redux 只有 action，而vuex有 mutation和 action两种。￼
为什么下节课要讲中间件??支持类似中间件的功能

小海
shallowEquel 是浅比较state 吗￼
是的




daywang
中间件就是重写 store.dispatch
紫珏
1￼
20:18
路人
logger  里面  dispatch   originDispatch  是一样的吧￼



不管怎么包装，最后才会掉原始的dispathc么￼是的
小海
orignDispatch 是哪里传的￼
路人
可以同时引入多个中间件么￼


21:28
路人
三层，先解开一层￼
21:32
路人
require 引入的是个对象么？ 刚才那个引入问题￼




21:44
小海
es和lib 什么区别￼
elemetnplus 
and
redux
21:48
daywang
esm 模式，umd 模式吧￼


21:55
路人
通过对象获取自定义的dispatch  和  compose 先解开一层那块
。对象里面的 定义dispatch 指向哪个dispatch呢￼

