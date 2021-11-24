

loader属于开发依赖还是生产依赖 
loader?

10:29
~~~
cross-env不用安装码? 
刚安装了 


10:33
小海
NODE_ENV 是node 内置的吗 
Don
开发 

process是内置的node进程对象
process.env对应的当前node执行的时候的环境变量对象
process.env.NODE_ENV




Lzb
自己定义的感觉像 
********************
一般用mode的多还是env的多 
Lzb
DefinePlugin 是不是也是定义了一个变量  赋值给了process.env 
DefinePlugin用用于定义变量，然后替换掉模块内的变量名
水星
为啥刚开始是在上面定义好再导出，后面就改成了直接导出 




--mode 不是也可以设置很多值吗 

为啥刚开始是在上面定义好再导出，后面就改成了直接导出 




11:00
路人
less 和less-loader 为什么不写道一个包里呢 
模块的设计原则 关注点分离
每个包只解决一个问题

魏知
sass文件的后缀是scss吗？ 
sass scss

sass word
sass
scss

.doc
.docx

11:34
小海
 css 模块化是 scoped 吗 
 相关
  css modules 模块化的CSS 它会对当前的类名或者说ID重命名，改成地应的hash值
  这样的话肯定可以保证类名不能重复
  scoped 作用是类似的
水星
Use里面的插件，会依次执行吗？还是会自动处理先后顺序 
从右往左依次执行的

14:10
滕小好
自己写的util文件也可以这样变成全局的吗？ 

new webpack.ProvidePlugin
的isarray好像写错了 

14:31
大先生
key是根据什么来写的，为什么Loadash不行 
14:39

14:52
tykdn
不同的路由怎么返回不同的静态资源，懒加载的话 


奋斗ing
proxy怎么处理的 简单实现

tykdn
就是那个devserver 


proxy的问题
接口请求我们都用绝对路径，不是相对路径
类似 abc.com/api/data/list 浏览器会直接请求对应的域名接口接口，不会把这个请求发给当前服务器
不是 /api/data/list 
 

