基础不会去看官方文档 
09:36
杨阳
老师,实际项目中,架构项目的时候, 一般是自己配置webpack还是直接用 react或者vue脚手架生成项目? 
刘帅
自己配置吧  
李福顺
npm 可以吗 
MR.tony
新初始化项目都是hooks写法了吗？ 
黄程
老师，react配置项隐藏起来怎么做的呀 
有两种方式
1. rewired修改配置
2. npm run eject 弹出配置文件，不可逆的
react
项目配置文件在哪看啊 
MR.tony
影藏着 
MR.tony
有个命令来着，忘了 
136****2778
eject 
FE扫地僧
可以 通过 yarn eject 


vue的render也一样啊 
136****2778
那这样子哪一步把虚拟dom变成真实dom？ 
Tony
ReactDOM.render() 
慕曦
render的时候  把虚拟dom渲染到页面 
156****2854
跟vue的render函数差不多啊 
Tony
文本连起来都是一个children吧？ 有可能是两个吗？ 
MR.tony
AST树吗？ 
156****2854
虚拟dom把 
BiuBiu
JSX上 怎么体现两个儿子 
react
一个儿子不设计成数组的好处是啥 
好处很多
很多时候我们都会处理儿子
全是数组 ，每次都要按索引取第一个元素
React很多时候儿子只有一个
children[0]
children




项目怎么创建的？ 
create-react-app my-app
月下吴刚
哪个命令？ 
FE扫地僧
create-react-app my-app 
月下吴刚
哦，全家桶 
天道酬勤
render里面可以直接传虚拟dom，也能渲染出来吧 
钱炜华
文本节点不需要用个类型标识下么 
React源码没有加
因为如果一个元素它只有一个儿子，儿子还是文本节点话，React进行了优化!??TODO
记就记了
只要你写标签包文本，几乎都是一个儿子 

肯定是先编译，React.createElement()
后在浏览器执行React.createElement()得到虚拟DOM
，执行时已经编译成虚拟dom了 
2580
每个父节点的子节点都只能是一个，是基于什么考虑 TODO??
h y
少了递归？ 


老师你可以讲完一个知识点儿备份一个文件. 别删除覆盖,我们看起来应该会更方便一些. 

没用过for这个属性 
慕曦
利用map 
记就记了
少了key 
h y
元素上有个::marker 是什么呢 
FE扫地僧
么有根节点为啥  可以运行呢 ?  
嗨，呵呵
key不能等于下标吧？ 



每次循环index都会重置 
记就记了
点 
杨阳
是个伪类啊 
FE扫地僧撤回了一条消息
记就记了
前面那个点 
记就记了
maker 
杨阳
列表的 顺序好像是 
BiuBiu
那每次包个symbil 是不是就肯定唯一了 
记就记了
无序列表 
h y
原来一直没注意这个 都是清除默认样式了的 
h y
老师 你那个没有使用的变量名 加了一个横杠是什么插件呢 
10:30
落雨
没有key，会按索引来对比
不加key的话，diff就没法对id进行对比移动吗 
Y
用index和没加是一样的吧？重新渲染后 index还是1、2、3 没有绑定关系啊 
李福顺
老师，先休息一下，下去买点东西吃 
天道酬勤
不加key，react就只能先删旧的，再插入新的吧？ 
记就记了撤回了一条消息


学习
老师 显示引入模块大小的插件叫什么 import cost
Tony
今天会讲到dom-diff这块吗？把有key和没有key的地方就可以对比看一下了 
有专题课

杨阳
你百度能搜到的. 那个插件 
学习
用index当key和不加key是一样的效果？ 
Tony
节省的地方就是 销毁真实dom 和创建真实dom的操作？ 然后现在是用其他api 来移动真实dom的 来替代销毁创建的操作吗？ 
hhhhh
跟vue的key不要用index一个原因吧 
MR.tony
 10分钟 
张仁阳
休息10分钟 
开心麻花
不是数组列表元素 普通元素的dom-diff 也要用key来查找吗？ 
BiuBiu
那我给下标key 加 symbol 不就可以唯一了吗 



给非列表元素 添加key 有应用场景吗？做优化使用？？
不需要
DOM-DIFF比较的时候只会比较同级元素，同层元素

span里面的text变了 是text变了 还是整个span重新删除创建 
136****2778
？ 
开心麻花
哦 明白了 
136****2778
整个对象是只读的？  
Tony
这个是怎么实现只读的？就是用了Object.freeze吗 
136****2778
相当于Object.freeze了》 
136****2778
？ 

学习
Writable为false？ 
Fwf
react 17后就可以改变了吗？为什么呢 

Object.seal() 密封的物件还是可以改变它原有属性的值。
而被 Object.freeze()冻结的物件则无法改变它原有属性的值因为他们是不可变的。
react 17后就可以改变了吗？为什么呢 
136****2778
可是这时候里面的children变了呀 text变了 
136****2778
不是不能改里面的属性吗 
杨阳
polyfill是个啥 


null，2是什么意思 
开心麻花
这个注释怎么自动生成的 
136****2778
这个注释怎么自动生成的  
MMO
这个注释怎么自动生成的  
 
张润钊-2625
快捷键。。在function上面 /** 回车就会自己出来的 
慕曦
vscode自带的， 先写了参数 按/* 回车就有了 
136****2778
那return的怎么自动生成 
136****2778
？ 
hard
666 



勿忘心安
操作dom就是这样 
h y
className的处理感觉就比vue那儿处理好一点 emm 
开心麻花
style 为什么不直接赋值 还要单独处理？ 
月下吴刚
与 class 关键字区分 
h y
style是个对象集合  

jsx语法<div>是怎么转换成creatElment的  

style是字符串也有可能吧 
136****2778
这里没有处理jsx语法转换成creatElment 为啥程序可以跑起来 
勿忘心安
jsx-loader 
hard撤回了一条消息
Vc撤回了一条消息
青衣
交给babel处理 
BiuBiu
我们写React，type传值不是标签名，是自己写的组件名，那不就报错了 
hard
老师 发下视频的链接吧 
136****2778
这个原理我懂 不过我是问这里怎么实现的 
136****2778
有没有引入包   
136****2778
又没有引入包 


儿子不应该是个数组么 
react
数组呢 
150****8093
这个children会不会是个数组 
150****8093
数组怎么处理 
记就记了撤回了一条消息
136****2778
32行为什么要&&props.chilren.type  
开心麻花
儿子啥时候会是个对象？？ 
 /* let obj = {};
 let element2 = <div>{obj}</div> */

BiuBiu
儿子也是虚拟dom的时候啊 
150****8093
children.type有值说明不是数组，应该是普通对象 
开心麻花
哦 

react代码仓库地址发下吧 
136****2778
react代码仓库地址发下吧  
记就记了撤回了一条消息
李福顺
jsx语法怎么解析的，都没有引入react.js 
babel
babe-loader @babel/preset-react
记就记了撤回了一条消息
BiuBiu
babel做的解析 
空空
张老师，编译原理专题课(架构)，这个我看不了，要找客服老师加一下权限吗？
 

现在基本都是函数式组件吧 
14:08
MR.tony
函数welcome在render函数中怎么运行的？ 
14:11
136****2778
像vue中的slot 
MR.tony
嗯，有点 
136****2778
函数组件的type如何等于function 
钱炜华撤回了一条消息
钱炜华
type是不是可以通过标签去判断吧，不是常用的就是函数的标签把 
学习
函数组件的vdom长什么样子 
136****2778
57行的 functionCompnent来自哪里 
开心麻花
函数组件的vdom长什么样子 
MR.tony
递归出来的 

函数组件已经可以完全100%替代类组件了吗 
FE扫地僧
函数组件能保持自己 单独状态吗 ?  
折耳根
hooks 
136****2778
1 
136****2778
函数怎么传进去的 
136****2778
没有看到type function 
MR.tony
这个打印出来的是Vdom？还是？ 
学习
函数要在replacer里调用tostring 


什是类组件 
f
class 
136****2778
1 
学习
可能是字符(原生组件 )，也可能是函数组件或者 类组件
还以为type一直是字符串，没想到直接把函数赋值给type了 
杨阳
函数组件是没有生命周期是吧 
没有
MR.tony
好像是 
刘帅
hooks相当于聚拢了生命周期的作用 
MR.tony
对，有了hooks 
MR.tony
类组件的props怎么传进去执行的？ 
136****2778
为什么要类的属性 
136****2778
不能实例属性 
MR.tony
es7 静态属性？ 
14:35
月下吴刚
为什么 type 可以 new？ 
136****2778
74的render是类里面的方法把？ 
136****2778
需要重写render 
MR.tony
type应该是那个类 
2580撤回了一条消息
MR.tony
不然new啥啊 
刘帅
render哪儿来的 
class组件和function组件 区别后边能总述一下么 
1.class是有实例的，而且 不能销毁，性能会低一点，而且 会占用大量内存
2.函数组件纯函数，执行完了，里面所有的本地资源都被销毁，没有实例，也不会占用大量内存，性能会高一点
1.类组件是有生命周期的，函数组件没有生命周期

14:40
月下吴刚
type 一共只有  四种情况吧？ 
1.字符串
2.函数组件
3.类组件
4.其它
136****2778
中午那个思考题能说下吗 为什么dom不能赋值给vdom的一个属性？ 
原版代三里vdom只读的，不能加属性
2580
render在哪儿定义声明的   
136****2778
index实例里面的render和最下面那个render不是一回事吧？ 
看一下类的vdom 
折耳根
哪类组件的实例 什么时候才能销毁呢，一直在内存中吗？ 
MR.tony
Component组件为啥不写render？ 
开心麻花
react-dom.js是不是得引用自己的react.js ？ 
月下吴刚
函数组件必须通过 hooks 才能有自己的状态吧？ 

哪类组件的实例 什么时候才能销毁呢，一直在内存中吗？ 
MR.tony
Component组件为啥不写render？ 
开心麻花
react-dom.js是不是得引用自己的react.js ？ 
月下吴刚
函数组件必须通过 hooks 才能有自己的状态吧？ 
Caption
这里涉及react的调度不 
MR.tony
听一听又想起来一些知识 
刘姑娘
先不要着急呀，都会讲到的 
张宝丰
调度估计要后面了 
14:51
折耳根
为什么要 super props啊 
MR.tony
生命周期有的好像好废弃掉了 
刘帅
didmount是在render之后 

setState接收两个参数是吧? 第二个经常做什么用的来? 
136****2778
这里setState是同步的 
折耳根
意思是 super props 等于 直接写 this。props。= props 吗  
2580
有些情况下是可以的把  this.state.xxx = xxx; 
react
更新组件 
刘帅
直接修改state行是行但是不触发更新视图 
2580
forceUpdate() 
Tony
有时候为了维护一个数据。。都直接放在this.state上了。 因为this.setState是合并更新 
136****2778
课件的地址请助教发下？ 
嗨，呵呵
这里没有this 
MR.tony
上面是箭头函数 
嗨，呵呵
哦 
Y
剪头函数 否则的话bind一下也可以 
张润钊-2625
这个有点像Vue的批处理。。然后vue就有了nextTick 
张老 那个jsx中不能使用class 和 for的关键字 这个是jsx语法的规则吧 
也不只是react中的写法？ vue中使用jsx语法 也不能用class和for吧？ 

1.箭头函数 
开心麻花
这个let 声明的classInstance 组件实例为什么不会消失？ 
折耳根
react事件不是用的事件委托吗 
拖拉机上敲代码
父类 
MR.tony
component 
Tony
父类给的 
Tony
Component 
慕曦
Component 




Component 
MR.tony
看不到 
开心麻花
函数执行完 let 声明的变量不就释放了么  
136****2778
state需要再父类设置吗 
15:26
MR.tony
10行的render取得是哪儿的？ 
张宝丰
classInstance.dom具体指的是什么 
拖拉机上敲代码
更新按理说用该要diff对比吗？ 
136****2778
replaceChild就是dom diff了 
136****2778
但是今天可能不写dom diff 
Tony
之后会在这部分替换的时候 做优化diff吧 
136****2778
replaceChild是原生dom方法吗 
开心麻花
70行里函数执行得到组件实例，函数执行完， 组件实例为什么没有销魂？ 
MR.tony
domdiff 没le 
宅男呀
对,原生的 
妮妮
老师，可以先上传一部分代码？ 


setTimeout内部的是不会批量更新的 
安凯凯
在20行前面打印一下this.state.number 

那1什么时候跟新的 是不是setTimeout执行就理科更新？


张宝丰
老说为啥会在异步里面会同步更新 
刘姑娘
跑两圈 
月下吴刚
红牛 
MR.tony
喝点酒 
月下吴刚
我边听变嗑瓜子，就不困 
钱炜华
那这个更新等于只跟react的批量有关系，跟宏任务和微任务都没有关系吗 
落雨
发布订阅吗 

handler里点击写了两次+1的方法只执行了一次合理么？/

didMount里如果调用两次setState 也是异步更新,这个不是也不在事件处理函数中 
是取最后一个执行的结果吗 是的
只要是在react管理的地盘中，就是批量的 事件处理函数 生命周函数中就是批量
不在react管理的地盘上，就是非批量的

16:09
136****2778
1 
16:12
136****2778
this是啥 
136****2778
17行的this 
杨阳
这里 add 的 this是什么 
136****2778
update的实例？ 
开心麻花
this 是update实例 
react
updater实例 
罗畅
一个this(组件实例)对应一个 updater吧 


这就是react的合成事件吧 
月下吴刚
有没有 hasEvent 这个Api? 
罗畅
浏览器兼容 
react
扩展逻辑 
Tony
aop编程 
开心麻花
统一批量更新的逻辑 
Tony
添加额外的逻辑 
136****2778
类似装饰器？ 
16:49
136****2778
dom什么是有有stroe的？ 



target上有store？ 
136****2778
那这个和dom.store 
136****2778
2 
136****2778
有什么关系 
136****2778
22行的event参数是哪里传进去的 
徐健
doucment是怎么拿到到handlerClick的 
Tony
不要这么写吧。。来回串 尽量写纯函数吧 这样代码可读性号 
开心麻花
这样for 循环，syntheticEvent 不还是原生Event? 
月下吴刚
代理有什么好处？ 

看看dom打印出来的效果 
Tony
事件触发之后需不需要清除document上的事件监听函数 之后可能有别的click 
月下吴刚
就是回调函数的 event 参数 
MR.tony
事件对象 
Caption
那个 while循环一直冒泡会有问题吧 
月下吴刚
vue 里面要用 .native 来冒泡吧 

136****2778
let dom.store哪一行看不懂 
罗畅
事件冒泡会触发所有同名函数 
开心麻花
批量更新的回调是哪里执行的？ 
妮妮
可以梳理一次 
妮妮
？ 
空空
合成事件和批量更新的关系没理解 
Caption
怎么阻止冒泡呀 


batchUpdate()方法看一下 
学习
Syntheticevent的作用是什么 
1.兼容处理
2.提高性能
罗畅
合成事件里 
1.首先是批量更新模式，然后执行绑定的回调函数，
2.执行完了后将改成 非批量更新模式
3.如果回调函数里有 定时器函数，此时已经是非批量更新模式了，所以定时器里会依次立即更新

是这个逻辑吧 



7 的生命周期跟16比，有什么变化不？ 
一业
有。。 
一业
挺多的变的 
Tony
如果shouldupdate否了之后 还是会增加1是吗 
f
会 
f
只是页面不更新 
Tony
感觉应该舍弃这一次的修改的。。 
古德猫宁
这怎么还有中文解释 
MR.tony
生命周期不调用就没有？ 
青衣
componentWillMount 不是要弃用了吗 
Tony
不对吧。需要看有没有 有就调用 
Tony
而不是不调用就没有 
青衣
现在讲的react是多少版本的呢 17
Tony
需要在应该调用的时机去看那个属性函数是不是undefined 
一业
17以前的 
136****2778
那这样子如果获取后端数据的函数 放在didmount岂不是又会渲染一次 浪费性能你？ 
MR.tony
生命周期一直执行的啊 
杨阳
卡了 
杨阳
还是我卡了 
一业
是我卡了吗还是老师网络卡了 
136****2778
没有 
开心麻花
没卡 
徐健
没 
150****8093
不卡 
张宝丰
没 
一业
我的 
f


这样子按照刚才说的重新渲染 浪费性能啊 
136****2778
didmount 按照刚才说的重新渲染 浪费性能啊  
一业
一般获取后端数据，都跟交互操作有关的。 
f
那callback什么时候执行 
Tony
改了 把class删了 
136****2778
wilMount有写吗 在哪来 
136****2778
在哪里写的？ 
Tony
new class实例前调用 
张宝丰
wilMount直接调用的 
Tony
这些生命周期其实都是同步的操作 
勿忘心安
willMount 在 classInstace.render() 之前 
Tony
我之前以为很复杂呢 
勿忘心安
就是按着流程执行的  
张宝丰
这里还好 后面复杂。。 
MR.tony
和vue的相似吗？ 
青衣
17版本不是要弃用componentWillMount 吗 



new 会自己调 
张宝丰
顺序好好讲讲 一直很懵 
勿忘心安
这个是class 的原理 不是react的了 class 创建类就会这样 
Tony
在哪些生命周期里可以安全调用setstate啊？
did都可以 will都不行
 
一业
willmount能， didmount可以。。别搞成死循环都没啥大问题 
青衣
constructor 里面肯定不行吧 
Tony
肯定不行 还没有实例呢  
勿忘心安
constructor里面setState是可以的 你可以试试  
青衣
我一般都在componentDidMount里面，其他没试过 
MR.tony
和vue字父一样 
青衣
不要在constructor里面执行setState，会有问题 
136****2778
5为什么子没出现？ 
一业
should里的判断 
Tony
2 3的公倍数 
Tony
6 和12 
张宝丰
有道面试题说父子组件渲染顺序 大概就是这样 和咱们这个一样吗 
136****2778
有疑问 



有疑问 
开心麻花
12那个看以下 
MR.tony
很清晰啊 
136****2778
那个父组件视图没更新 但是props变了 会不会导致子的wireceive？ 
f
没有didunmount吗 
136****2778
有 那个父组件视图没更新 但是props变了 会不会导致子的wireceive？  
一业
组件卸载什么情况下执行啊 
开心麻花
到12了流程看一下 
勿忘心安
没有疑问 这个顺序我倒背如流 
150****8093
didMount 或者didUpdate中设置state，会触发render再触发did操作，是不是也可能死循环 
一业
unmount 



static default 这个在说下 刚刚有事 没有听到 
一业
你在render里调。。保证死循环 
张仁阳
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops. 
MR.tony
哪些地方能写setState
DidMount
自定义事件处理函数
 
 willMount 一般来说是可以，但是现在
判断啊 
学习
不写在did和will里面，那写在哪里？ 
MR.tony
那个css的包叫啥来着styledxxx 



怎么会有都为null的情况 
开心麻花
删除 
21:23
136****2778撤回了一条消息
f
vdom、render执行不行吗 
1178747250
执行就是新的vdom了吧 
青衣
相互挂载这么多数据，会不会耗费内存 
开心麻花
135行的oldVdom哪来的 
青衣
类组件的type也是function 吗 
136****2778
1 
136****2778
类也是函数  构造函数也是函数 
青衣
嗯呢 
青衣
new 出来的是函数 
136****2778
不是啊 
136****2778
parent是div counter 
136****2778
142行 parent是div counter  
136****2778
这样子直接替换  
136****2778
类型不同 直接替换 
学习
为啥函数组件取真实dom不是直接.dom 
136****2778
160行怎么是repalceChild 不是直接replace吗 
青衣
那是替换dom的方法 
一业
dome节点的方法 
136****2778
那160行的replaceChild函数看下 


能不能画个图 看dom vdom classinstance之间的关系 
小行星
1 
Tony
还有啥renderdom 有点乱 
哦 Counter是组件的vdom   oldRender是div的vdom 
Tony
刚才好像没画 补上了 
小行星
vdom 和 oldRender有点混 


176行的 if 不用判断是否是同一个类型的元素吗 
不用，因为上面已经 判断过了
136****2778
debugger最左边的蓝色按钮是什么意思  
开心麻花
来晚了 老师前面说了些啥？ 
钱炜华
react如何取平级去比较 
默认就是只比较它的老儿子，和它的新儿子们
Caption
componentWillUpdate执行的时候跟原版的不一样，原版的执行的时候 state还没有更新 
毕会斌
还没进入正题呢 
Fwf
1 



@param 表示啥了 
MR.tony
深度 
MR.tony
比较了？ 
136****2778
comparetwo函数看下 


为null时，还会在children数组中吗 
开心麻花
第二次时 第二个儿子为什么是null 
钱炜华
代码中改成null了 
开心麻花
o  
MR.tony
这块儿写不好就死循环了 
20:41
136****2778
截取是什么作用的 忘了 
[1,2,3,4].slice(2);[3,4]
钱炜华
如果参数超过3个说明是个数组，截取后面的吧 
136****2778
map传入一个函数 那形参怎么穿进去 15行 

经过wrapToVdom处理后的数据是怎么样的？ 


开心麻花
15行后面要加props。children 
钱炜华
diff children的时候如果数组长度不一样，就涉及到直接添加或者删除了超过长度的部分了吧 
zero
diff更新 若我只是换下子元素位置 是不是不会复用了 
136****2778
symbole 
21:04
开心麻花
177行万一不是同一个组件了呢 
上面已经判断 过了
136****2778
oldVdom和newVdom哪里的 
136****2778
哪来的 
136****2778
这里没有定义oldVdom啊 
136****2778
190行oldVdom和newVdom哪来的  


21:14
钱炜华
老师，传入的nextProps再看看呢， 
zero
子元素换位复用后面会写吗 
MR.tony
还是递归同级比对吗？ 

updateElement只判断了oldVdom.type那newVdom.type呢，不用判断吗 

zero
1 
136****2778
findDom啥作用 又忘了 
要据虚拟DOm查找真实DOM
钱炜华
找到真实dom这个findDOM 
21:31
136****2778
vdom和oldRenderVdom啥区别 
136****2778
各自是谁的虚拟节点 



136****2778
1 
136****2778
136****2778
vdom是虚拟DOM
oldRenderVDOM 是渲染的虚拟DOM

vdom和oldRenderVdom啥区别 
136****2778
各自是谁的虚拟节点  
MR.tony
记住每个原来的位置？ 
Caption
就是oldVChildren[i+1].dom吧 
zero
i+1行不行 
21:43
MR.tony
就刚才那个少了 
21:47
开心麻花
因为后面没有再走render 


21:47
开心麻花
因为后面没有再走render 
136****2778
图片也上传到git吧 
136****2778
1 
Caption
!oldVDom && newVDom 这里需要compontDidMount 
开心麻花
1 
136****2778
1 
MR.tony
12 
156****5981
1 
136****2778
可以了 
MR.tony
index 不靠谱 

1.解决一些问题
2.Context HOC renderProps 
3.Hooks


必须声明成静态方法吗?是的
慕曦
这个生命周期有什么应用场景吗？ 
一业
应该是 ，不声明就挂到this上了 
136****2778
那其他的什么周期为啥不是静态？ 
pure funtion 映射函数，可以认为它是一个纯函数。跟实例没有关系。也不能访问this
了不能调用this.setState
以前的react项目中，经常会出一个问题
willReceiveProps里面调用setState,很可能会让父组件刷 新，父组件一刷 新，就会重新执行
willReceiveProps 死循环
static .不能this this.setState()就可以避免出现死循环
单 例肯定是要比实例属性节约资源

一业
讲着呢。。。别急 
开心麻花撤回了一条消息
慕曦
29行 
react
这个方法的返回值是组件的状态吗 
返回的对象会跟自己的state进行合并是吧 
136****2778
可是这里改了this.state啊 
136****2778
改了这个实例的状态 
136****2778
？ 
一业
react的老版本 里是不是也有几个静态方法，不记得了 
136****2778
setStaae不是改自组件自己的state么 怎么会让父组件刷新？ 
古德猫宁
这个getDrived也会触发render也有可能死循环吧 不会的
不会引起组件的刷 新


静态方法吧 
Caption
classInstance.contructor是不是也能取到 
MR.tony
实例可以调用静态方法？ 
记就记了撤回了一条消息
一业
.__prop__.constructor 

getDerivedStateFromProps看图片在初始化的时候也执行一次? 
Vc
看图片forceUpdate之后才执行getDerivedStateFromProps,咱们现在是在forceUpdate之前? 

forceUpdate没有用过 
136****2778
老师讲下用法 


1. 看图片forceUpdate之后才执行getDerivedStateFromProps,咱们现在是在forceUpdate之前? 
2. forceUpdate没有用过 监听页面滚动
3. 子组件的 getDerivedStateFromProps方法，怎么拿到父组件的props 
4. getDerivedStateFromProps 我们自己写的在挂载的时候是不是没有执行呀 


属性跟状态都没变，页面没啥改变，强制刷新，有什么场景吗 
项目里面 虚拟列表
0-1
都是老的直接用不就好了 
青衣
 强制刷新也会走update吧，只是页面没变化 
11:21
开心麻花
我们这里的写的逻辑好像是先shoudupdate 然后才getDeriveProps? 

136****2778
forceUpdate触发getDerive也举个例子？ 


这个是替代willReceivedProps的吧 
是的
现在两个不能一起用，一起用会报错
wilUpdate跟 getDerivedStateFromProps 也不能一起用吧 

willReceivedProps容易写出bug出来
React17引入了fiber之后 will操作可能会有不停的暂停和恢复 的过程


新版的生命周期比旧的好在哪里? 
136****2778
forceUpdate触发getDerive也举个例子？  
136****2778
是顺序不是触发吧？ 


当count等于4的时候
shoudupdate 返回false，再点击增加count等于6，执行forceupdate，count会直接刷新到6还是原来的4 
???????
136****2778
1 
136****2778
图里面是顺序  
136****2778
就是force在第一层 getDerive第二层 


感觉应用场景很少啊 基本没有啊 
记就记了
createRef就是这么easy 
勿忘心安撤回了一条消息
136****2778
didMoutn 
勿忘心安
React设计 原则组件和组件之间基本上是低耦合的 

有个问题 子组件什么时候能访问到父组件中的ref 
通过属性传递才行
记就记了
传了才能访问吧 
hhhhh
高度的过渡动画会用到这个吧 
写动画库的时候会大量用ref
勿忘心安撤回了一条消息
勿忘心安
但是有可能是子组件先挂载完 
父组件先开始挂载 ，后挂载完成
子组件后开如挂载 ，先挂载完成

主要是will的实例声明周期都废了 更新前拿不到this，无法保存dom更新前的信息 
开心麻花
 动画用ref干啥？ 
 ！！写一个动画库

开心麻花
举个例子？ 
Tony
ref拿真实dom做动画啊 




contextType哪里有用到? 
古德猫宁
定义这个静态属性有什么用 
136****2778
不在state上 
8753
主题切换可以用这个 
136****2778
不OK 

contextType没用到啊 内部使用到了
MR.tony
为啥不redux了？ react-redux内部实现依赖context
136****2778
没用到contextType啊 
记就记了
如果第一层第二层都加了这个，第三层拿谁的 
136****2778
而且这边变量取名字是随便去的吗 是的
136****2778
取的吗 
zero
 style都一样能不能提出来 可以的
慕曦
定义了静态属性，但是没看到哪里有用到 内部
contextType this.context都是定死的
古德猫宁
this.context是组件内置的属性 
136****2778
静态变量是不是名字任意？不是的 
8753
每个子组件都写也很麻烦 


深层子组件在别的jsx文件，怎么赋值contextType?

import 引过去 
记就记了
static 
Tony
import 然后设置吧 
慕曦
就是父子组件是分开的文件吧 
Tony
需要先抛出context 
136****2778
休息下？ 
记就记了
是的 
古德猫宁
Consumer只有在函数组件中用吗 
类组件和函数组件都可以用Consumer,但是函数组件只能用Consumer
记就记了
也可以在类组件用 



不安装那个插件可以直接用装饰器吗 
Tony
loading message是干嘛的 
136****2778
npm run start 为啥可以写成npm start？
npm start 
npm test

漂
那@connect怎么可以用？ 

那个element Id  是loading的元素是哪个，什么时候创建的，没看到啊 
136****2778
哦 
钱炜华
这个怎么和hello组件关联起来的，没太看懂， 


装饰器 
FE扫地僧
不使用装饰器 怎么使用 高阶组件  
136****2778
老组件怎么穿进去的 
136****2778
老组件怎么传进去的  
张宝丰
hoc(组件) 
记就记了
装饰器@写到类组件上面，就包起来了吗 
记就记了
恢复装饰器再看下结构 
136****2778
这个明白了 但是装饰器如何关联到这种写法 


Hello=withLoading('message')(Hello) 
钱炜华
使用装饰器默认把hello传入了是吧 
Tony
代理属性怎么理解的 

如果通过 @withLoading() 怎么得到NewHello这个组件，然后写到render中 
开心麻花
属性代理就是扩展了组件的属性 
hoc? 
Tony
咱们自己的react库 也支持hoc吧 
一业
withrouter 都用的这个 
Tony
还需要有特殊处理吗 
我们自己写这个库，基本来说用法和原版的react完全 兼容的，而且基本上react所有的功能也是支持的


这是super babel的转译规则 
慕曦
老师，链接发一下？ 
Tony
在constructor中 super指向的是父类 其他的方法 super值得是父类的原型 
张仁阳
http://www.javascriptpeixun.cn/goods/show/5?targetId=12&preview=0 
古德猫宁
666 
136****2778
在constructor中 super指向的是父类 其他的方法 super值得是父类的原型  这个是张老师视频讲的吗？ 
记就记了
有视频 
张润钊-2625
this._proto_.state 应该就能找到了吧。。 

Portal
传送门不支持 
Vc
有具名插槽 默认插槽的概念么 
张宝丰
有啥场景吗  
Tony
hoc感觉是有内容 添逻辑  render prop是 有逻辑 添内容 
Tony
hoc 有内容 然后外层包裹逻辑
render props 有逻辑，然后传入内容 


走render才会 
记就记了
不会 
古德猫宁
不会 改的是文本 
136****2778
不改状态的pure当然不会改 
开心麻花
不是pureComponet 就会 
136****2778
我是说改状态的 
136****2778
当然会dom diff 
记就记了
会了就没有啥性能优化了 


困扰
如果是浅比较 属性变了，无法感知，不刷 新
如果深比较 属性变了，可以感知，可以刷 新，但是性能比较差
两全其美！！
比较属性 性能非常好呢
immutable.js
一业
react源码是浅比较吗 
慕曦
会介绍怎么写自定义hook吧？ 
古德猫宁
vscode 用的哪个主题 

开心麻花
getstate() 方法中 state={...state,...nextState};每次不是都生成新的state对象了么？ 地址应该每次都不一样 
学习
...是浅拷贝 
开心麻花
但是state对象地址变了呀 

