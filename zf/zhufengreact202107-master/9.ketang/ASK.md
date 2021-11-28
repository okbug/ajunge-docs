09:35
123
为啥types  有的是 是--save 

为啥types  有的是 是--save. 这个问题回答了吗￼
随便写的
按理说 --save-dev可以的
艾瑞
@types/* 我一般 -D￼
奋斗ing
语法提示￼
艾瑞
放在一个包的话，ts是如何检测.d.ts文件那￼
如果TS代码和它的类型声明放在一个模块里，不需要.d.ts文件

.d.ts一般用来给JS附加或者说追加类型声明的



放在一个包的话，ts是如何检测.d.ts文件那￼
不需要了
123
为啥types  有的是 是--save. 这个问题回答了吗￼
按理说都应该是--save-dev
奋斗ing
ts已经忘了￼
艾瑞
如果不需要的话是怎么找到这个语法提示啊￼
123
因为 库自己提供了 类型声明文件吗 所以不用写了吧￼
123
moduleResolution 是node的意思是 common js 吗￼
common js 模块的语法规范
模块解析如何查找模块
require('uuid');
123
glob  文件匹配，模式？￼
cbxm
路径分隔符是啥￼

glob是一个语法
能匹配一些文件
a/*/b/*/c.js

<h1>hello</h1>
react React17 React.createElement('h1');
react-jsx React17之后   require('jsx/transformer')('h1')

https://www.tslang.cn/docs/handbook/compiler-options.html



因为ts 只是 提供了类型支持呢  原来还有这么多 定义￼
C
webpack5吗现在￼
heroliang
额外的静态文件是怎么访问的呢￼
http://localhost:8080/kf.jpg
123
别名配置的越多  查找越快￼
别名是的

123
x 可有可无？￼
js
jsx?
ts 
tsx
@
什么时候用use 什么时候用loader？￼
如果你只有一个loader的时候 ，都行use loader
如果你有多个loader 只能用use

这个插件是干嘛使得呢？  感觉像antd 组件库￼
按需加载antd组件库


今天你学习了么
为什么有的插件写rules里有的写外面￼
rules写的加载则loader

module同级的plugins插件数组  webpack插件 ，给webpack增强功能的
presets同级的plugins插件数组 babel的插件，是增加babel的功能

C
style ：‘css’啥意思不懂 不是配置 antd的按需加载吗￼

dl
tsconfig.json 怎么飘红了￼
成成
.ts 文件也可以编译 react 文件吗？￼
xyw
适配可以配置么￼ 移动端 
123
contentBase是打包到本地内存里的目录吗￼
output.path 指定打包后的文件保存在哪个目录
contentBase是额外的静态目录 
http://localhost:8080/main.js
http://localhost:8080/kf.jpg
你有些文件想在通过浏览器访问，但是又不想打包编译



是给webpack 用的  plugin  给loader 用的插件￼
艾瑞
import React from 'react' 是不是可以不用写啦￼
新版的转译器可以不用写，旧版的需要写

123
loader  比babel 大 babel 只是解析js的 吧￼
loader可以是各种各样的，可以解析任何的类型的文件
babel只能解析js
C
哦这样￼
薛世洋1993
明白了￼
123
contentBase  是开发环境的静态文件路径￼
奋斗ing
离线地图包就不需要打包￼
heroliang
打包后dist里不会放额外静态文件目录 ?￼
不会


只是用来本地查看的￼
heroliang
经常看到打包后的dist里放有static￼

CopyWebpackPlugin



contentBase本地开发环境用的,dist是线上用的￼
123
打包后的static 是src/static 放的静态的图片  css 之类的 文件￼
123
打包看看￼

src下面放的是文件是需要打包的

static下面的文件是不参与打包



webpack Importloader
ABCD
Importloader  0是啥意思
123
直接 use：【‘style-loader’，‘css-loader’】￼
123
那url-loader的limit是限制src文件里引用的图片大小吧￼
url-loader 可以指定一个阈值
大于阈值的话拷贝文件到输出目录
小于阈值的话转成base64字符串内嵌在页面中
成成
"style-loader" 可以写成 { loader: 'style-loader'} 嘛？￼可以
123
 老师为啥不用sass 是因为 sass 编译很慢吗￼
cbxm
px转rem对行内样式不好使么￼
123
有没有把行内样式  提取的插件￼
-
老师, 能用上 cssModules 吗￼
ABCD
Rem的选项不知道啥意思￼


rem 根元素的像素
根元素.fontSize就是rem



cbxm
老师针对行内样式px2rem转换有解决方法么￼
行内样式是 办法
dl
这个上次更新也两年前了￼
11:04
123
+px￼
转换不考虑deviceRatio？￼



默认转换所有的css 文件吗￼  less



thunk支持dispatch函数￼
123
意思就是 type 是必须的  还要别的属性   属性名字是随意的￼
今天你学习了么
123看样子学了ts克啊￼
今天你学习了么
课￼
123
学了不用  很快就忘了￼
11:38
123
react-router6出来了有一些api变动￼
123
概念好多啊￼
11:43
123
&.  是 属性  增加￼
今天你学习了么
与￼
123
上面是&￼
123
| 或￼
今天你学习了么
你不是学过ts课程am￼



不知道传哪个泛型，点进去可以看到吗￼



1. css in js方案完整PK



home的props本来是父组件传入  
这里combinet的props 和store所以  直接函数里面就能拿到了？￼
别跟我重名
为啥不返回unknow￼



跟我重名
tsconfig 里面   lib 有css 配置吗 为啥能直接用呢￼
别跟我重名
CSSProperties 从哪里来的￼
别跟我重名
我要是li 上面写 点价事件就是 HTMLLIistElemtnt￼
别跟我重名
乱了 setCatergory 太多了￼


   currentTarget: C;
        target: T;

        currentTarget是绑定触发函数的元素￼

        

        
不能循环来写吗？￼
别跟我重名
老师  你直接用了 react 提供的dom  类型声明  是不是就不用再ts。config.js 中配置lib：[‘dom’]￼
大王
然后判断点击是哪个index来加类名￼



别跟我重名
ReactNode  是 react元素的any（ts 任意类型是any）￼
16:29
成成
font-size 好像没有￼
别跟我重名
没写span的字号￼
one
默认12￼
别跟我重名
继承的根元素的10rem￼
16:36
别跟我重名
vscode 这个插件 看这停奇怪的￼
别跟我重名
payload 是 promise 执行的返回值 ￼
16:45
楠楠
老师，history.push(path:"/login")   自动出来的这个path你是装了什么插件吗￼



如果 return 的 promise 写了 .then 和 .catch，会得到微任务执行完了之后的结果，
然后把这个结果用 promise 包装一下返回吗￼

返回promise 


20:35
rename
为啥  现在的chrome关闭浏览器  cookie 也不消失 要手动去清理 ￼
rename
第四行  是axios post 请求的写法吗？￼




怎么配跨域￼
cc
post请求参数放data:values这样，data才是请求体￼
大雨
你本地代理下呗￼
艾瑞
没有加OPTIONS的方法￼
rename
设置了* 还要 +options 才行是吗￼
rename
因为不是简单请求￼ GET是简单请求
艾瑞
加了header自定义属性会认为不是简单请求￼
艾瑞
所以会先发一个options请求，￼
cc
post请求参数应该放data里，data才是请求体，参数写错了￼
奋斗ing
卡了￼
rename撤回了一条消息
rename
怎么还有跨域问题￼





profile。tsx￼
cc
7行，data:values吧￼
rename
设置了自定义header头  token 默认header 头上没有这个字段￼
cc
7行，data:values吧￼
rename
address￼
rename
让你传address￼
rename
是不是token 验证不通过￼
xyw撤回了一条消息
peak
老师 没录屏哦￼




21:38
rename
老师等会儿再看看那个file的类型吧￼
rename
为啥我下载的element ui  组件里面没有看到类型声明￼

有些包库和声明2合1 redux
有些是分开的 react @types/react
rename
一样的 是不是多了个自定义的属性￼
rename
那个Blob  从哪里来的呢￼ 也是来自于DOM
rename撤回了一条消息
rename
info：File  应该也可以把￼

rename
post的hader content-Type不用改改吗？￼
不用改
defaults默认设置
Upload组件改写了Content-Type
成成
老师，actions 上传头像，可以添加 token 嘛￼




info：File  应该也可以把￼
rename
post的hader content-Type不用改改吗？￼
成成
老师，actions 上传头像，可以添加 token 嘛￼
21:48
rename
上传组件 把file 序列化了 就不用更改 上传的header的头的content-type？￼
Upload帮我们改了
rename
File 扩展了些自己定义的类型￼
rename
是个UploadFile￼



lessons 要加类型￼




xxxxx
下拉每一次都要加载吗￼
如果下拉的距离 大于30pX就加载

21:50
159****2783
为什么 useEffect 里不能 async await 啊￼




这个骨架屏可以一开始就先渲染嘛￼
