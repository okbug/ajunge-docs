09:51
今天你学习了么
这不是vue的_c吗￼
綦哈哈
有点像vue的虚拟dom￼
Breathe
pure是啥啊？ PURE注释 是用来实现tree-shaking
rain_ed
虚拟dom？￼
09:57
Breathe
将jsx转为js代表的虚拟dom￼
艾瑞
是个对象￼



解析方法和vue的转化ast语法树一样不？￼
a
react.createElement里面的数据格式就是虚拟dom吗￼
createElement是一个函数，返回值是一个虚拟DOm
Breathe
为什么element1也可以渲染？他不是还没有被做成虚拟dom么？
是在reactdom.render里面再处理一编么?￼ 不会处理
React.createElement处理的，React.createElement是在浏览器里浏览执行




为什么element1也可以渲染？他不是还没有被做成虚拟dom么？是在reactdom.render里面再处理一编么?￼
旺仔牛奶
感觉  js 在编译和解释之间在徘徊，是不是编译语言啊，这也在编译￼
艾瑞
babel编译成了函数￼
rain_ed
要不要先变成AST，再转换成虚拟DOM？￼
内部是这样的实现的

heroliang
jsx是bebel转成CreactElement￼
Breathe
哦哦这样￼
艾瑞
babel编译成了函数，函数执行的返回值就是对象， render的时候把对象处理成了真实dom ￼是的

heroliang
一个是编译时, 一个是运行时￼
英梨梨撤回了一条消息
英梨梨
是的
可以这样理解吗，element1里面有标签，所以运行时bebel会转译。element2里没有标签会直接执行。￼
￼
旺仔牛奶
不能这样理解吧，感觉还是在babel只会编译  和 浏览器会执行￼
Breathe
哦哦~可以理解为是在编译的时候。babel会将jsx语法转为createElement，到了浏览器的时候才会转为虚拟dom然后再转为真实dom￼
123
然后浏览器解析？￼ 是r


不是在浏览器解析。 是ReactDOM.render的时候，就会执行createElement函数，然后返回的对象处理成真实的dom￼
不是

123
那和vue中执行InitRender的时候一样了。然后执行render方法￼
东门吹牛
render里面直接挂载了？￼是的




cross-env DISABLE_NEW_JSX_TRANSFORM=true 
cross-env 用来设置环境变量的
mac window linux 设置环境变量的不一样
export DISABLE_NEW_JSX_TRANSFORM=true 
set DISABLE_NEW_JSX_TRANSFORM=true 



React17以前
React.createElement("h1", {
  id: "title",
  key: "title",
  ref: "title"
}, "hello");
React17之后
import { jsx as _jsx } from "react/jsx-runtime";
let element = _jsx("h1", {id: "title",key:"title",ref:"title",children: "hello"}, "title");

reder 直接append￼
123
哪个是patch做的￼
Breathe
哦哦~就是虚拟dom在render的时候就已经成功了对吧~在浏览器只是将其转为真实dom?￼


123
感觉是把jsx转化为浏览器可以识别的语法(vnode)，然后浏览来解析渲染页面￼
10:20
Breathe
引入run-time就是为了解决eslint报错和编译时没引入react￼
旺仔牛奶
17前和17后没看出有太大区别啊￼


10:26
a
delete是干啥的？￼
英梨梨
删除属性￼
Breathe
删除这个对象属性￼
艾瑞
有没有可能是数组￼




直接写清楚视频的标题，更便于复习￼
123
老师 视频的名称 上如果能把git仓库放上去就更妙了  或者 把git仓库的地址也录进视频￼
123
Symbol类型￼
123
递归处理子节点￼
艾瑞撤回了一条消息
123
Symbol('text') ？这个是一个引用地址吗？￼
11:04
123
这里比vue简单，不需要把模板化为ast语法树了。这直接把jsx语法转化为虚拟dom,然后渲染我为真实的节点挂载到也买你￼
123
text的没有进去啊￼

https://gitee.com/zhufengpeixun/zhufengreact202107/commit/68a20c9408a862b3c2791690acca3e5b461b523b



11:22
heroliang
哪里定义函数组件的type=function的￼ 原生JS语法
function a(){}
typeof a === 'function'
123
let ele = <fn title={}>这在哪里解析？￼

babel 转换




函数里面的结果babel也会转换？￼是的
123
明白了￼
null
jsx是通过babel解析的啊？￼
123
原来四bable编译的，这个语法是babel认￼



heroliang撤回了一条消息
heroliang
super() = 父类的consctruter()  ?￼
11:40
123
super值的是chid.call(parent)￼
super的本质是

a
extends后面是啥意思￼
123
类的继承￼
a
继承这个的作用是啥￼
heroliang
vue的组件是因为有template, 所以需要先转化成ast再转化成虚拟dom, react组件要么是函数要么是类, 直接执行,就可以转成虚拟dom￼



uper 相当于person。call（this，。。。args）￼
123
前面的继承extends后面的类的静态或者实例（super必须调用）￼
123
parent。call（child）￼
123
super等同于child.call(parent)￼
123
Instance。render 那个地方没有明白￼
compiler/sfc
.vue文件转成js方法
vue的组件是因为有template, 所以需要先转化成ast再转化成虚拟dom, react组件要么是函数要么是类, 直接执行,就可以转成虚拟dom￼

编译阶段
babel 是jsx ==》 createElement 函数  结束 了，然后把这个代码交给浏览器了

运行阶段
浏览器负责执行 createElement===  vdom ==》render ==》element ==》真实DOM=>insert  container  ￼
要想配置webpack
react-rewired
npm run eject

cra 有react-script 的内置了 webpack￼

cra是一个项目生成工具
生成的项目 里会内置一个react-scripts
react-scripts会内置webpack配置
npm run eject 把配置暴露出来进行修改

回顾一下上午的内容
1.什么React是一个用来构建用户界面的库
2.JSX  什么是JSX JSX是如何工作
3.会由ReactDOM.render把虚拟DOM变成真实DOM并且插入到页面中
4.REact元素 类型 可以是字符串 div span p
                 也可以是函数  渲染函数执行的结果 React元素
                 也可以是一个类 创建类的实例，然后调用实例的render方法，返回一个React




以前不理解什么是脚手架  
因为是工程项目中用的一个工具没有见过  所以理解起来不好理解  还有腻子   后来知道是磨平墙上的坑的 ￼


旺仔牛奶
javascript xml￼
123
描述  js html +css 就是jsx ￼
123
是因为  类组件经过babel 转义过 之后 typeof 就是function￼
123
所以要进一步判断 ￼
123
可以￼
123
递归￼
綦哈哈
死循环？￼
ʚechoɞ
不行￼
123
编译出来都是函数啊￼
Maximum call stack size exceeded

类组件和函数组件可以嵌套，但是递归到最后肯定 是一个原生组件。span div
类组件函数组件最后渲染的结果肯定 也是一个真实DOM元素，当然了也可能是null 



123
都加油￼
徐健
我只要到张老师的水平我觉得我的技术生涯已经够够了￼
123
props 可以赋值改￼
艾瑞
构造函数外面也可以写吗 state = {number: 0}￼
14:11
123
视图不更新￼


14:17
123撤回了一条消息
123
异步更新￼
旺仔牛奶
异步更新￼
Breathe
只执行最后一次得值变化￼
并非如此




旺仔牛奶
内部过滤了￼
Breathe
就是对象里面定义多次某个属性得值，但是最后生效得只有最新得那个数值变化￼
123撤回了一条消息
14:30
111
会把所有的state都更新一变吗？￼
123
1￼
123
会全更新  虽然有的属性没有变￼
111
内部是不是也要你做个diff?￼
英梨梨
那这是执行一次setstate就要都走一遍吗￼
Breathe
不是。。现在在走同步得流程￼
Breathe
等会会处理异步逻辑￼
111
目前代码就是这样处理的￼
heroliang
绑定时间是直接dom.onclick = function吗? 不应该用addEventListener吗￼
Breathe
他现在是获取key呀，不是直接操作dom得￼



function F1(){
  return <F2/>
}
function F2(){
  return <F3/>
}
function F3(){
  return <h1>hello</h1>
}
F1的真实DOM就是 <h1>hello</h1>




14:42
123
那挂载的真实dom 可能是自己的儿子的儿子的 真实dom￼ 是的
123
那挂载的dom  和自己是没办法对应的￼是的


如果有多个真实dom么￼

类组件还是函数组件都 有一个铁要求
能且只能返回一个顶级元素,不可能有多个


一个根节点下面有真实dom也有组件，怎么算？￼不可能
Breathe



为啥感觉那么简单，流程竟然比vue清晰￼
东门吹牛
感觉这块和vue差不多啊￼
null
react什么版本菜开始有diff的￼
Breathe
因为老师讲的好把。。哈哈哈￼
小哈
react直接babel 转的createElement 这边 就省略了 很多内容哦￼



旺仔牛奶
如果是函数也改成同步更新的嘛￼
也是异步的
state
(state)=>(state2)
(state2)=>(state3)
heroliang
setState之后的console呢￼


setState什么是同步的 什么时候是异步的
- 在React能管辖的地方就是批量异步的，比如事件处理函数，比如生命周期函数异步
- 在React管不到的地方，就是同步的 setTimeout setInterval 原生事件处理函数



setimeout 宏任务优先级比较 低 批处理的执行时机￼
111
为啥￼
旺仔牛奶
在 setTimeout 里面，为啥先执行setstate加成1￼
鸣
这方法咋知道自己是不是react管辖的地方
Breathe
宏任务微任务?￼
123
批处理  走的异步 肯定也是宏任务 ￼




为啥不是 = [] 清空数组？￼
今天你学习了么
改变了引用对象￼
今天你学习了么
你这叫重新赋值  不叫清空￼
123
是的
是不是要判断是不是 react的合成事件  和 声明周期 进入的时候设置ture  走的时候设置成false￼
123
1￼
Breathe
1￼
艾瑞
合成事件的时候对事件做了处理，类似于切面，先做想做的事情，然后做用户的事情￼
鸣
为啥要多一个updaters队列￼
旺仔牛奶
内部就知道这个是合成事件，是异步的，就异步更新了￼


合成事件的作用很多
合成事件的原机是通过 事件委托实现
<button onClick={this.handleClick}>+</button>

要向button上绑定click事件
现在不向button上绑定事件了
而是把所有的事件都绑到document上
React17以前事件都委托到document上 
React17之后事件都委托到容器上  <div id="container"></div>
为什么 是因为在一个页面中可以存在多个不同的React应用
<div id="root1">  ReactDOM.render(<h1>,root1);
<div id="root2">ReactDOM.render(<h2>,root2);
相当于一个事件委托
1.可以实现刚才说的，事件开始
  //updateQueue.isBatchingUpdate = true;
结束 的时候 
 //updateQueue.batchUpdate();
2.可以做一些浏览器兼容性处理
不同浏览器API不一样的
把不同的事件对象做成一个标准化的事件对象，提供标准的API访问供用户使用。

function stopPropagation(event) {
      if (!event) {
        window.event.cancelBubble = true;
      }
      if (event.stopPropagation) {
        event.stopPropagation();
      }
}




react能管辖的地方先设置批量￼
小哈
画点图呗 我有点懵 没用过react￼
小哈
真实使用的时候，人家都是怎么用的啊￼
旺仔牛奶
aop￼
艾瑞
合成事件的时候￼
艾瑞
处理￼
今天你学习了么
切片来￼
111
事件结束的标识是哈？￼
xyw
方便统一处理了￼
123
你react的合成事件写阻止冒泡 会什么结果呢 还有把所有的事件都合并到doucument吗￼
艾瑞
那合成事件这种情况下， 原生事件的批量更新就失效了吧￼
艾瑞
原生事件里面同步多次设置状态就不会批量处理了￼
123
两个 reactDom。render  有什么好处 处理的层级少？  ￼
123撤回了一条消息
123
是递归的性更高呢？还是执行两遍的reactDom。render￼
123撤回了一条消息
123
老师  vdom 才有store dom 上没有把￼
旺仔牛奶
搜嘎，冒泡。正好冒到document上，然后正好插入那一行代码￼
旺仔牛奶
那我上去阻止他冒泡了，他就插入不了那一行代码了吧￼
heroliang
没有触发冒泡吧￼
heroliang
事件委托, 直接就是触发document上的方法￼
111
为啥要委托？￼
123
return  syntheticevent￼
旺仔牛奶
那这个的话，本来在button 按钮上，是做了一个转发给了document ，都在docume上直接触发，这样理解对吗￼
123
当前的currentTarget 和 target 都是button￼
123
怎么判断要currentTarget 还是target￼
艾瑞
批量更新变回来￼
艾瑞
不在一个事件环里面￼
123
所以点击的时候才开始 冒泡 不惦记不买跑 也就是同时 只能在一个document 上只绑定了一个事件处理函数￼





合成事件的时候对事件做了处理，类似于切面，先做想做的事情，然后做用户的事情￼
鸣
为啥要多一个updaters队列￼
旺仔牛奶
内部就知道这个是合成事件，是异步的，就异步更新了￼
123
我裁是收集事件的时候 设置成true的￼
奋斗ing
react能管辖的地方先设置批量￼
setTimeout宏任务 是浏览器调试的
小哈
画点图呗 我有点懵 没用过react￼
小哈
真实使用的时候，人家都是怎么用的啊￼
旺仔牛奶
aop￼
艾瑞
合成事件的时候￼
艾瑞
处理￼
今天你学习了么
切片来￼
111
事件结束的标识是哈？￼
xyw
方便统一处理了￼
123
你react的合成事件写阻止冒泡 会什么结果呢 还有把所有的事件都合并到doucument吗￼
艾瑞
那合成事件这种情况下， 原生事件的批量更新就失效了吧￼
原生事件回调里，都是同步更新
艾瑞
原生事件里面同步多次设置状态就不会批量处理了￼
123
两个 reactDom。render  有什么好处 处理的层级少？  ￼
123撤回了一条消息
123
是递归的性更高呢？还是执行两遍的reactDom。render￼
123撤回了一条消息
123
老师  vdom 才有store dom 上没有把￼
旺仔牛奶
搜嘎，冒泡。正好冒到document上，然后正好插入那一行代码￼
旺仔牛奶
那我上去阻止他冒泡了，他就插入不了那一行代码了吧￼
heroliang
没有触发冒泡吧￼
heroliang
事件委托, 直接就是触发document上的方法￼
111
为啥要委托？￼
123
return  syntheticevent￼
旺仔牛奶
那这个的话，本来在button 按钮上，是做了一个转发给了document ，都在docume上直接触发，这样理解对吗￼
123
当前的currentTarget 和 target 都是button￼ 是的
123
怎么判断要currentTarget 还是target￼
艾瑞
批量更新变回来￼
艾瑞
不在一个事件环里面￼
123
所以点击的时候才开始 冒泡 不惦记不买跑 也就是同时 只能在一个document 上只绑定了一个事件处理函数￼
123
不点击是没有原生的event的￼
123
还没有写冒泡到docuemnt￼
111
卡了？￼
111
咋回事没声音￼
Breathe
休息时间￼
艾瑞
处理冒泡和默认事件省略了，￼
123
没声音了￼
heroliang
冒泡是子元素和父元素同时有同一个事件, 委托是只有父元素一个事件￼
今天你学习了么
store为了让事件和事件源关联啊 不然多个元素的相同事件就乱套了？￼
艾瑞
所有事件都会收集起来放到队列里的， 不会是同一个事件￼
123
今天早上store 是在vdom 上￼
今天你学习了么
早上有store？￼
123
没有遇到￼
(^_^)
更新就好了￼
123
不要用window 电脑了￼
123
坑太多了￼
张仁阳
http://img.zhufengpeixun.cn/setState2.jpg￼
旺仔牛奶
就是调用栈的不同，对￼
旺仔牛奶
大概明白了￼
张仁阳
上课了￼
123
1￼
123
batchupdate 是干啥￼
peak
批量更新￼



batchupdate 是干啥￼
peak
批量更新￼
16:05
成成
you￼
123
执行完要从document 上移除吧￼
123
老师debugger 下能看到事件冒泡吗？  ￼
旺仔牛奶
是的
咱是主动给document做一个事件代理统一处理事件，然后经过浏览器默认行人冒泡来触发事件嘛￼
123
document的parentNode 是 html啊￼


16:05
成成
you￼
123
执行完要从document 上移除吧￼
123
老师debugger 下能看到事件冒泡吗？  ￼
旺仔牛奶
咱是主动给document做一个事件代理统一处理事件，然后经过浏览器默认行人冒泡来触发事件嘛￼
123
document的parentNode 是 html啊￼
123
外层的点击事件执行 是浏览器自己的 行为￼
123
我们只是做了个事件委托￼



模拟原生的冒泡流程
一直递归找parent是啥来啊￼
今天你学习了么
不是委托了吗 为什么while第一次就触发了￼
123
函数的执行是 event的45 行  还是 target 是button的执行￼
123
改currentTarget 干吗￼



会￼
旺仔牛奶
然后点击的时候，在 捕获到具体的事件目标触发butoon的click嘛￼
heroliang
如果同一个button上有多个不同的事件呢￼
旺仔牛奶
不模拟也会自动触发吧￼




我理解了 冒泡是 模拟原生实现了 ￼
heroliang
一个button上有click 有onsouceover￼
123撤回了一条消息
123撤回了一条消息
123
明白了就是在document【envent】上绑定了onclick 是事件委托的实现  ￼
111
老师为啥不新建一个文件把原来的保留呢￼




ref 从哪里来的￼
123
1￼
奋斗ing
写错地方了￼
16:49
heroliang
直接 ref = this.props.ref  不行吗?￼
綦哈哈
组件实例￼
123
类组件实例￼
123
textINput 组件实例￼
111
current是啥?￼
111
谁提供的current属性￼
123
原生是current 是元素  类组件是 instance￼
綦哈哈
current是createRef提供的￼
111
有多个元素在知道current就是当前元素呢？￼

<input ref={this.refa}>
<input ref={this.refb}>


撤回了一条消息
111
每个ref.current都是一个实例￼
heroliang
vue的ref是放到this.refs对象上的, react是方法是分散到一个个不同对象的￼




函数的组件咋就没有示例啊new一下不行吗￼ 不想new

111
等于高阶函数，内部不销毁？￼
null
17后是不是类组件用的少了￼ 能不用就不用
鸣
用哪个应该是看场景，函数式只是比较适合ui组件￼
17:06
heroliang
vDOm.render()￼
111
render￼


17:11
旺仔牛奶
都是结合着vdom来的￼
旺仔牛奶
怪不得函数式组件开发渲染快呢￼
旺仔牛奶
没 new￼


找的真实dom绑定ref 或者绑定到类组件上￼



20:08
v_shiyongla
React 是咋判断组件被卸载了￼
还没有讲
初始化，再讲挂载 再讲更新，最后讲卸载
xyw
native setState是不是就不是异步了￼
原生事件函数回调里的setState就是同步的
20:22
123
自己在shouldCompleteUpdate  里面写是否跟新的逻辑￼
heroliang
单单nextProp 无法判断props有没有变化吧 ?￼

1.情况要只要nextProp有值，就会进行判断更新的逻辑
但是是否要更新，还可能会判断属性的值变化了没有。

如果直接在 shouldcompleteupdate 中写return false 就不走跟新了￼


记返回dom￼
heroliang
直接在mount写不好么? 还中间一道￼
123
我感觉这个又学了一招￼
peak
函数式编程 ￼
123
1￼




每次的子组件都是新的吗￼
s
应该是vdom更新了，但是没render不会挂载dom￼
xyw
父组件怎么等子的Didmount 再执行自己的Didmount￼

<div id="root">
<div>
  <p></p>
  <span>
<div>


没实现willReceiveProps呢?￼
21:09
123
这也太粗暴 了吧 这是react domdiff？￼
123
也是递归的dom diff ￼
奋斗ing
同级移动也暴力删除吗￼ 是的
xyw
 没有换位置 移动的么 直接删掉了？￼ 是的
xxxxx
现在不考虑Key
分二个阶段实现
，不考虑key,暴力对比
第二个阶段，我们再考虑key,处理移动 的移动


21:27
heroliang
slice(0,2) 用startWith('on')?￼
123
为啥不给它设置成null呢？￼
大雨
slice这东西不是截取数组的吗。￼
123
字符串也行￼
大雨
哦￼
heroliang
渲染的时候是根据_Store生成事件, dom事件已经生成并绑定了, 直接delete _store 只是删属性, 没删真实dom上的事件啊￼
123撤回了一条消息
本来就没有往dom上绑事件



替换文本￼
21:48
睡不醒
oldVdom.type 只定义了string类型和文本类型吗？￼
123
这是长度一样的时候￼
s
react组件类型吧￼




react组件类型吧￼
xxxxx
￼￼
xxxxx
什么意思￼
123
还有 组件类型啊  组件类型没有写到￼
今天你学习了么
写错了应该是？￼
xxxxx
语法没有见过￼
今天你学习了么
语法写错了￼
艾瑞
这个三元运算￼
今天你学习了么
第一个：应该是？￼
21:56
123
形成闭环了￼
艾瑞
componentWillReceiveProps没有传参数￼
123
再看看rendervdom是啥￼
22:03
Moon
事件绑定到document上，为什么删除_store就删除了事件 这里还不是很明白￼
小辣椒
有两个nextDom￼



rendervdom

对于类组件来说
renderVdom
类的实例.render()返回的虚拟DOm oldRenderVdom

对于函数组件来说
函数执行()返回的虚拟DOM=oldRenderVdom


type（props）函数￼
s
事件只绑定一个，store存的只是用来判断￼
123
dondiff  周末写？￼



compareTwoDOM 看下￼
heroliang
为何要同步?￼
heroliang
连等那个位置看得有点蒙￼

上节课我们实现最简单的DOM-DIFF
1.只对同级元素进行对比
2.不同的类型的元素会产出不同的DOM结构 
3.可以通过key来标识移动的元素



利用key￼
09:41
123
使用map 是查找的时候 o（1）￼
123
只是key  有￼
ʚechoɞ
不用对比类型吗？￼
需要地比类型，我先简单，我先假设类型不变
09:48
艾瑞
可以用i去比较吗￼
123
现在last 是4 old 是1 了吧￼
09:52
123
b 是重现创建的吗  b为啥不服用啊￼
奋斗ing
B也是移动位置吧￼

复用的 移动更新￼
123
type的话只是string类型的吧  ￼
Dante
删除b的DOM吗？￼
B是剪贴操作或者说是移动操作
b这个DOM元素不会销毁，而只是会移动
xxxxx
箭头方向反了￼
铁龙鸣
lastPlacedIndex有啥用￼
它可以确定需不需要移动可复用的元素
老索引比lastPlacedIndex大，不需要移动 
老索引比lastPlacedIndex小，需要移动
cbxm
新节点都是key吗￼



<></> 为啥要symbol个<></> ￼
ABCD
文档碎片是啥￼
heroliang
一个不渲染的容器￼
10:19
123
就是document。fragment￼
今天你学习了么
不是props的key?￼
props里没有key的
props.key
123
用index 会有bug￼
艾瑞
还需要存当前的索引￼


10:26
123
placement 是啥？￼ 插入 insert
123
现在只判断了key dom的属性没有判断呢
10:31
123
不管oldkeydmap 到最后删除 ￼
艾瑞
老的 _mountIndex 这个没存￼



10:55
铁龙鸣
move不是能复用的吗，为啥要删除￼
cc
用索引会有问题,如果 第一次老的虚拟DOM 是 A(index=0),B(1),C(2),新的虚拟DOM是 A(index=0),D(1);
oldMap[1]此时拿到的是B,而不是D,复用会有问题￼



react17 的domdiff 和今天实现是15的差别大吗￼
基本是一样的
11:22
小辣椒
这个生命周期主要是哪种情况下用到呢￼
//如果组件收到了新的属性，可能会修改自己的状态 
componentWillReceieProps(){
 setState();很容易引起死循环
}
123
getDerivedStateFromProps 代替了 3个will 钩子 那shouldCompoentUpdate 呢￼


domdiff 没有用到链表￼
React17以后会用到链表

123
基本上都会用到这个方法吧  父组件传入的props 在子组件中需要修改 就赋值给子组件的 sate￼


但是这个场景不多吧  我一般都会手动滚动 让scrolltop 手动增加￼
heroliang
新增和废弃的生命周期都是在同一个版本里面的吗的吗￼


废弃并不是说删除了，只是说不推荐使用了
还是可以用的
未来可能会在某个版本移除


我不用这个getShapshut 我用willdidmount 怎么就死循环了￼
没有说死循环
而是说在并发模式下，
render可以暂停和恢复 
所以will方法可能会执行多次


componentWIllUpdate()

setState();




3个参数￼
123
其实就是 多层传递props 可以用context 代替￼ 是的
123
相当于vue2 中的mixin吗？￼
其实在最早的版本里mixin,但是在新版里就是一个全局变量
没有mixin机制

奋斗ing
provider和inject￼
123
1￼
123
我一般用store 代替 很少用到provider 和inject￼
奋斗ing
一般插件使用￼
11:57
009
怎么不用hook￼





this.context 就是contentyType？￼
009
用了context,会不会影响组件复用￼ 不会的
在react16以前context很难用，问题很多
 react17开始进行改版
cbxm
这个可以组件标签可以包在任意组件中么，不只是根组件把￼
可以放在任意组件里，没有限制 
009
用props感觉方便复用一点￼
一般来说只有全局的数据才会使用context
正常传值肯定 还是属性



在子组件中 因为是全局变量  其实是引用地址没有变调用的还是最外层的context上的 change方法￼





14:16
艾瑞
cloneElement 
14:19
今天你学习了么
_context￼
peak
是的 上面的应该是_content￼
123
就是外层的 provider 和custom 不要 直接去孩子的vdom￼
peak
不用判断type是consumer还是provider吗￼
123
区分就是一个是 mountContext 就是函数￼

root 元素中也有吗？￼


super.render ，render不是原型方法吗￼
123
子类是state 覆盖了父类的state￼

实例只有一个子类的实例
子类实例上的state=父类的state
子类实例上的state=子类的state

123
但是 vue2+ ts中到处都是这种写法￼
123
"experimentalDecorators": true,￼


15:53
123
还有个super（props）￼
15:56
艾瑞
写组件的时候经常用到￼
123
怎么复用？￼

其实在react中，每次更新都会从根节点开始调度对比



浅比较的时候 传两个空对象 怎么会返回true?






用的是官方的react 和reactDOM？￼
奋斗ing
 render() {
    return ReactDOM.createPortal()￼
123
例子是上把插入的操作返回了￼
123
其实这个方法就是提供了个 给body 插入元素的方法 不用子父㢟嵌套  这个也是性能优化的一部分？￼
dl
他里面也这样写的么￼


react比vue东西少￼

react不但概念少 而且变化少 而且保值



20:10
cc
源码用的链表还是数组存的￼
20:14
cc
hooks函数组件里的state和class组件里的state是怎么联系在一起的，共存的，之前被问过￼

函数组件state  每个节点会对应的fiber对象，fiber 对象放置state

类组件的state  实例 .state



艾瑞
自顶下线开始调度￼
1. hookState全局变量存放状态 ，在源码里hooks的状态是存放在当前节点的fiber中的
2. hookstate用的数组，源码里用的单向链表

hooks不需要像类组件的一样有类的实例




compare 里面传了两个一样的vdom 分别表示啥
<App/> =》元素 React.createElement(App);=>{type:App,$$typeof:Symbol('react.element')}
vdom都指向根虚拟DOM
20:40
艾瑞
child不管父组件什么操作都会重新render￼
父组件如果更新的会引起子组件render
aa
浅对比￼
徐小西
函数是新建的￼
艾瑞
props变了￼
徐小西
handleClick地址是新的￼
v_shiyongla
属性变了￼
艾瑞
依赖性￼

20:47
cc
依赖传null或undfined会咋样￼
aa
hooks要做优化就得memo useMemo配合用是吧￼

hookState 存依赖数组￼



所以不能在条件语句中使用


hookState里缓存第一次的依赖数组，
下一次进来的时候用最新的依赖数组和缓存的数组做比较。
 如果缓存的依赖项和最新的依赖项不一致，则用最新的。


hook.next=hook.next=hook
hook.next=hook.next=hook
有fiber也不能用if



有fiber 可以使用if￼
艾瑞
每个hook关联下一个hook￼
艾瑞
如果if顺序就变了￼


组件渲染完才执行useEffect 那在里面掉接口取数据 页面渲染不就会有延迟吗￼
会延迟的
但是浏览器渲染一帧 16ms
如果我想在页面渲染之前 调接口把后台数据取回来 那useEffect不是满足不了?满足不了
如果有多个 useState，每次 set 的时候会都重新走所有的 useState 是吗￼ 是的




useEffect是怎么做到监听组件将要卸载的？
组件将要卸载？？？？
不需要
组件根本没有实例，也没有挂载 ，何来卸载
它其实是没有卸载这个说法的

其实就是在重新渲染前执行上一次的销毁函数


每次重新渲染 函数重新执行￼


20:16
艾瑞
layoutEffect 如果加依赖为[]， 能拿到ref.current吗￼
因为给ref.current赋值是react-dom
Dante
任务对列怎么走的￼

微任务队列 主执行栈执行完毕后会全部清空
宏任务队列 每次取出一个宏任务执行
