古德猫宁
异步去哪处理 
666
action可以有异步动作，reducer只能有同步的 
20:14
sun
rootSaga中的for循环长度为什么是3 
666
events 
let emitter = new EventEmitter();
emitter.once('click');
take的应用场景是什么 

sync_add 是怎么派发的 
136****2778
这个项目是怎么认saga的 
古德猫宁
这没办法像同步那样点一下就加一吧，有触发次数限制？ 
136****2778
老师在哪里应用rootSaga这个文件了 
666
saga和saga的中间件是什么关系 
136****2778
啥、 
136****2778撤回了一条消息
136****2778
saga在哪里截取异步派发？  
青衣
take,put 哪里来的 
136****2778
低7行的store=赋值有什么用？ 



低7行的store=赋值有什么用？ 
开心麻花
看一下reducer怎么写的 怎么让async_add +1的 
666
take 后边一定要用put吗 
古德猫宁
触发就得put 看你需求 只写take没啥意义 
Tony
如果我们自己的action也是TAKE 和PUT会不会有影响 
666
我也感觉只有take没有意义 


这个不是跟 dispatch 和 subscribe一样？ 
Tony
taker函数是在哪里传入的 
136****2778
put参数是一个对象 所以要.type 
136****2778
我刚才是这个意思 


taker函数是在哪里传入的 
136****2778
put参数是一个对象 所以要.type 
136****2778
我刚才是这个意思 
136****2778
刚才我们好像take函数没有传入第二个参数？ 
136****2778
就是taker没传 
20:55
136****2778
拆开什么？ 
青衣
猜 
小行星
channel 
青衣
channel.put 执行 
古德猫宁
先订阅再触发 


15行把next传入要做什么 
青衣
channel.take 订阅了，在哪发布  
136****2778
next是具体的函数吗？ 



他是个generator 会等的 
小行星
take 的next在哪执行的 ???????


派发的时候 那不是执行两次了13行14行 
一业
老师那个右键 run code的  vscode插件装的哪个 
小行星
还是不太理解，老师等会再过一下 
皮球
页面点击按钮dispatch async_add的时候，走中间件，channel.put执行了next方法，然后走了yield put add 
青衣
这个runSaga的执行过程讲完再梳理一下，有点懵 
小行星
那个插件应该是code runner 

开启新的子进程 是什么意思。有哪些实用场景 
开启新的子进程的意思是去单独执行，跟当前的saga执行没有关系了
也不会阻塞当前的saga继续执行，有点像开启一个异步任务

fs.reaFile();

ajax();
next();



09:35
136****2778
迭代器和生成器具体是啥概念? 
136****2778
什么区别 如何判断 
FE扫地僧
这样就是 一直在循环 ? 


Caption
具体有哪里此情况下会使用迭代器 
yield gen();
136****2778
那子进程是迭代器 为什么有子进程是判断是===funciton？ 



那子进程是迭代器 为什么有子进程是判断是===funciton？ 
136****2778
typeof function 
136****2778
那个函数的内容就是子进程？ 
wagool
对象有迭代器属性吗？ 
可以添加，添加了就了，没添加就没有

2580
只要写一个带next function的方法 就自动有Symbol.iterator ? 
136****2778
对象肯定没有 不能for iof 
136****2778撤回了一条消息
wagool
嗯，我记得数组是有迭代器，对象要自己实现 
136****2778
最后一次执行 done是true的时候 value是啥 
Tony
yield* 就是开启新的 js子进程？ 对结果有影响吗 
09:55
136****2778
yield * other() 和yield * other什么区别 那个是生成带带器 哪个是生成生成器？ 
666
typeof 
666
21行 
Tony
不阻塞 为什么不是 1423 
136****2778
同问 
136****2778
如果像异步  那就是1423 
开心麻花
执行外面的next, 子进程里yield的值 怎么传给外面的yield的? 

就是14行 
136****2778撤回了一条消息
136****2778撤回了一条消息
136****2778
为什么for of 不打印c？ 


刚才的问题如果像异步  那就是1423  为什么是1234 
136****2778
老师不是说像异步吗？ 

call调用返回promise的方法
cps调用一个支持回调函数的方法
cps和call 有什么区别? 
小行星
callback不传吗？不需要传 


callback不传吗？、 
古德猫宁
不传参数接受没意义 
saga
cps是什么的缩写 
小行星
传next 
136****2778
函数名字不叫fn 为什么可以写effect.fn？ 
FE扫地僧
传 函数 ? 
saga
包一层 

10:54
Caption
不应该把 callback包一层吗 
Caption
args 里面不是有 callback 

1. 添加一个effectType

那点击的时候 为啥没有两个taker都执行
 而是等add1 done了才执行add2的taker 
 JS是单进程单 线束的
 add1
 add2


put 的时候不是已经清空task了吗？
为什么还会死循环，因为嵌套？ 