
20:09
路人
url切换，浏览器会主动触发这个方法么￼
会的
20:13
daywang
都需要人为操作的吧￼
20:18
路人
这个history栈可以清空么￼




比如我有1 2 3 4 节，
在我不指路路径的同时，
我想从 1 跳到 4 带上参数，
我再从 4 返回到 1把参数再回来，

因为做这种目的，就是为了回填表单当前查询的做记录。￼



手动改url 会触发这个劫持的pushState方法么￼
daywang
参数怎么携带？
￼
daywang
page3没了么？￼

vue react angular 不管是什么前端路由，一般如果用的是浏览器路由的话，
只要重新刷新都 会报404 找不到页面

其实把这个路径请求发给webpack-dev-sever 这样的一个http服务

服务器会去当前的根目录里有没有这个样的一个路径文件，如果没有，重定向到首页


携带参数有以下几种方式
1.state
query 查询 字符串传参
search=query 查询 字符串
hash 传参
路由参数params


嘻哈
全部加上 exact 这个参数可以吗￼
如果没有二级路由可以加，如果有二级路由不能加
紫珏
老师，那个/user不是应该访问后端api吗？是的

为什么访问的是index.html页面，这里不是很理解
npm start webpack-dev-server
react-router-native
react-router-canvas
react-router-dom
react-router
history


react-router+history=react-router-dom




跨域的也是这里设置吧￼
可以实现跨域
devServer:{proxy:{xxx:xxx}}
21:20
daywang
1￼
21:30
路人
监听路由修改listen、 这个在哪发送 事件 ne ￼

是在history里发送的事件

紫阳
来得晚，问下，history库是哪里来的￼




小海
单页和 ssr 的主要区别是什么￼
spa 单页应用 1个html
mpa 多页应用 多个html

都是csr客户端渲染

ssr服务器端渲染



exact怎么实现的￼ 马上会讲

context pathname route path
pathname === path exact =true
exact =false
pathname.startsWith(path)=true  就可以。
21:56
daywang
notify 就是触发更新￼
路人
手动改路由，触发listen监听，可以实现么￼
紫阳
listener从哪定义的￼


是有个栈存储使用的路由地址。前进后退改变指针就行了？是的




daywang
平时应该用不到￼
小海
$是反向引用吗￼ 是的
daywang
$ 不是结尾么￼
$是不同地方有不同的含义
正则里表示结束 /$/
在replace里第2个参数中表示引用分组的结果 
文本中美元
2


daywang
| 是或者￼



redirect选用函数是组建是因为没什么渲染



21:59
daywang
redirect选用函数是组建是因为没什么渲染，静态的么￼
daywang
后面来个react小实战吧￼
Mr楊
老师,函数组件没有生命周期了, 那怎么能在需要的时候销毁 什么的啊????????



this.context 是啥￼
上下文对象
RouterContext.__currentValue
Provider组件赋的值

daywang
hook 的周期

函数

React.useEffect(()=>{
 console.log('创建');//didMount didUpdate
 return ()=>{//willUnmount
      console.log('销毁');
 }
});

router为什么不想vue能改 tag标签




10:42
路人
函数没执行？￼
daywang
像router没有内容的额就直接渲染 children￼



props 和 value 参数分别来自哪￼



useeffect 第二个参数要传下吧￼
