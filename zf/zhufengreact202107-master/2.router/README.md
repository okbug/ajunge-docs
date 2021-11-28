
bjj
运行pushState后，只是修改了浏览器中的url路径吗？￼

1.修改路径
2.向history历史栈中添加一个条目 路径和状态 
@


只有往回跳才会触发popstate吗￼
其实不是的
只要浏览器的指针发生变化都会触发



支持跨平台的原理是  编译成vdom吗
react-router公共库

react /core
不依赖环境 
核心库实现的特地注意了与平台平台
然后由不同的平台去实现自己的适配

艾瑞
component={Home}和放Route的child有啥区别啊 后面会讲
123
默认exact 是true￼ 默认是false
21:26
123
switch 没写￼ 后面会讲



23
原理就是没有dom bom 和canvas 吗￼
艾瑞
可以用函数组件写吗￼
123
这个history 是那里来的￼ 从属性中获取中
21:36
123
为啥喜欢单独放在一个文件里面创建上下文对象￼为了复用，很多地方要用到
艾瑞
因为其他地方可能也要用到￼


react-router-dom15版本好像是函数组件了￼
艾瑞
最新版本￼



21:59
xxxxx
renderElement 是什么￼



xxxxx
开始的时候为啥要触发自定义事件呢￼
dl
可以完整的走一遍看看吗￼


hash
```js
 const history = {
        action,//对history执行的动作
        push,
        go,
        goBack,
        goForward,
        listen,
        location:{pathname:window.location.hash.slice(1),state:undefined},
        block
    }
if(window.location.hash){
        action = 'PUSH';
        listener();
}else{
        window.location.hash='/';
}
```


Hash history cannot push state; it is ignored



表示执行了啥操作把￼
10:10
bjj
state是干什么用的￼
state就是location的一个属性，用来描述 此路径的一些状态信息
可以用来传递参数
list
detail {id:,name}
peak
上面有一个location￼




12
捕获的分组的个数就是数组的长度
数组的长度=捕获分组的个数+1
123
index 0 是1￼
12
index匹配的其实索引，input原始字符串，grounds是分组￼
asaa
规定了?:为什么能还能匹配￼



小辣椒
为什么是有两个a-z￼
cbxm
如果前瞻不能匹配就停止了￼
cbxm
两个a-z都必须一样么￼ 不是
奋斗ing
可以这么写吧 缩小范围 /\d(?=a)[a-z]/￼
123
index都是0￼
Dante
前后是相对谁的￼
123
abc  b 相对 a  c￼


前是右边后是左边？￼
123
把零食掐了￼
12
对的零食掐了就好了￼


那如果写成 /\d(?=[a-z])[A-Z]/ 就肯定无法匹配上任何东西了吗￼





123
为啥要class 组件和function 组件嵌套着写  ￼
123
 跳到to 里面还要进行一遍 route 匹配吗？￼

直接跳转了的话这个组件还没render吧？￼
123
直接provider 必须是customer 消费吗￼
外层Provider
Consumer 函数组件中
contextType 类组件


123撤回了一条消息
123
是不是 不知道bom对象和dom 对象谁选渲染完毕  所以在didmount中 确保 这个组件 渲染完毕￼
123
为啥a 标签不写 javascript：void（0）了呢？￼
123
反正都是点击跳转我就不写a 标签了直接写span标签￼

