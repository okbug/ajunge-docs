老师，dva相当于redux吗？ 
dva是集成了redux全家桶
redux react-redux react-router-dom connected-react-router 
dva
第二个参数acions不用传了？  不传
Tony
这部分不能内部封装好 去区分吗 
古德猫宁
相当于有多个根吗 用命名空间区分 
只有一个根

会写很多个命名空间
相当于以前学的多个子reducer
最后合并成一个根

redux应用，永远只能一个根

相当于有多个根吗 用命名空间区分 
dva
router是配路由吗 
Tony
把store的创建和reducer部分简化了 
Tony
connect链接还是一样的 
开心麻花
这都不需要用react了吗 
Tony
一个model只管自己model的。而没必要自己去手动区分 
dva
模块化的写法怎么写 

只要写react项目，都 要引React
React
React.createElement();
老师，弱弱问一下，顶部引入react的作用是？ 
小叶子
有同学帮忙回答下吗？ 
毕会斌
组件中用到了jsx语法 
钱炜华
要用到得引入吧， 
小叶子
jsx的话，不是loader来处理的吗？ 
张宝丰
新版本的也可以不用引入 
React17之后jsx不再转成React.createElement();
import {jsx} from 'react/runtime';
jsx('h1');
张宝丰
内部做了转化 
136****2778
为啥_model要是数组？ 
dva
router只有一个吧 
dva
model方法可以调用多次 



小叶子
老师，dva在app.model之后怎么调用的，想看下 
毕会斌
1 
dva
action.type不是带namespace的 


Tony
action.type 是 counter/add 和 add 这部分逻辑在哪处理的 
Tony
action.type必须是counter/add 不能是add的吧 这块要怎么处理吗 

action.type必须是counter/add 不能是add的吧 这块要怎么处理吗  

FE扫地僧
定义时候 把命名空间加上  说的非常对
毕会斌
这样加万一dispatch派发的action没加namespace呢 
dva
没加就报错了吧应该 
毕会斌
不会报错，直接返回老状态了 
dva


1 
Caption
prefix 这里怎么搞的呀 
136****2778
这样子相当于创建了一个新对象？ 和老对象的reducer不一样的对象？ 

:05
136****2778
业务代码不是很少用生成器吗 
136****2778
为啥这里业务代码用了*生成器  saga
小叶子
老师，为啥不用promise。用generate 
FE扫地僧撤回了一条消息
小叶子
async +await  
这里就不用使用 counter/add 是内部做了处理了吧 
一业
这里不是还有个获取到状态值的方法 


里不是还有个获取到状态值的方法 
136****2778
老师 promise的resolve这里是什么 不用我们定义吗 
Tony
put({type:"counter/add"}) 
dva
mapStatetoprops 
15:13
136****2778
老师 promise的resolve这里是什么 不用我们定义吗 
还是resolve就是delay函数？ 

136****2778
async add的第二个参数是什么》 
136****2778
？ 
小叶子
reducer和effect同时执行，那么相当于改两回state? 

reducer和effect同时执行，那么相当于改两回state? 


dva源码里是用生成器，而不是用promise的？ 
15:33
136****2778
model哪去了 参数model 第三个参数 
小叶子
effect之后改数据 
136****2778
effect还有一个add不是？ 
15:42
136****2778
68行action哪里传进来的 
毕会斌
完美 
小叶子
action是不是就是key? 

key加前缀 
Tony
那只能修改put方法吧 
小叶子撤回了一条消息
136****2778
那model就需要传进来了 
Tony
prefixNamespace重名了吧 
开心麻花
68行action什么时候传进来的 
毕会斌
小切片 
小叶子
includes 



Tony
这样的话。effects就不能触发其他model的effects了 
136****2778
讲完问题休息下？ 
Tony
是不是需要显示添加完整的namespace 



Could not find "store" in the context of "Connect(ConnectedRouterWithContext)". 
Either wrap the root component in a <Provider>, 
or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(ConnectedRouterWithContext) in connect options.


16:19
小叶子
老师，dva中的三方库：
react, react-router-dom这种都是直接引入的，
像vue-router中的vue都是通过vue.use中调用router.apply(vue)传入的
，dva直接引入的话，package中有react，dva不用保证和项目中用的react是同一版本吗？ 

小叶子
dva构建后包里也有react吧？ 
16:35
Caption
代码在 modules里面 
Tony
所以 context应该是从reactrouter里拿吧 
Tony
不是从conenctedreact router里？ 
内部用的也是react-router 里的Router
16:41
Tony
routerRedux这个导出的时候在哪用的 



16:41
Tony
routerRedux这个导出的时候在哪用的 
开心麻花
react-router里的Router
conenctedRouter 里面不也是用了Router么？ 为什么获取不到routeContext 
Tony
是不是要直接从dva里拿 
Tony
现在咱们拿是自己单独又从connected-react-router重新拿了一次 
小叶子
o ,peerDepen 的用法就是这个 
小叶子
那dva 构建后包很大啊，实际上项目和dva中只要一个react就行啊 
最终打包后的文件中只有一react
peer同级依赖


Tony
这里只用了导出的push方法 但是没有用导出的里面的Connected-react-router 
Tony
而是咱们自己从connected-react-router里自己单独导入的 是不是不是一个context？ 
