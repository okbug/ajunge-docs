## 1. 他这个webpack那些loader和插件怎么自定义配置呀?
## 2. umi就是一个类似cra的存在吗?并不是

他的index入口文件在哪里啊。root那个 
1178747250
pages里边的每个页面能放到一个文件夹吗 
Tony
layouts里可以放其他文件吗？  可以，但是没有意义
136****2778
文件夹user和文件user不会冲突吗 有啥区别 
20:21
Tony
layouts下是一级路由 pages下是二级路由 



慕曦
wrappers 这里是固定的写法吗？ 是的
1178747250
只能用类组件吗 也可以函数组件
1178747250
每个组件都配权限的话，每个都写一遍吗，有没有类似于路由导航的钩子 有的
青衣
profile.wrapper 包裹的地方不太明白 
sun
history 没有引入  
开心麻花
props里为什么会有location对象 
Tony
history没有引入也可以用吗？ 
小闫
怎么把这个登录页放到全局layout之外呢，一般登录页都是一个独立页面 

两套路由
/login
/admin


22行要改 
青衣
理解了 
Tony
被route包裹了 
Tony
umi是个大黑盒子。。 
136****2778
history match location 
青衣
location/matchstate 
Tony
history location match 

他不是那个意思 怎么把这个登录页放到全局layout之外呢，一般登录页都是一个独立页面  
小闫

zyx
老师你用的是五笔输入法吗？是的 
Tony
因为layouts下 是一个全局的 如果login不想用这个layouts 那么这个想变应该是不能放东西了  其他组件哪些需要layout然后自己再添加 
Tony
感觉应该是要这么来实现 
1178747250
这个是扩展路由用的吗 


这些东西都是在配置 固定的位置 固定的用法  
Tony
跟生命周期函数一样  
1178747250
render在modifyClientRenderPps之前执行吗 
136****2778
./怎么去掉？ 
136****2778
怎么去掉./ 
青衣
如果后端没有返回，那component 不就找不到路由了吗 
136****2778
因为多了./ 
小行星
api.js 
136****2778
对 
136****2778
不需要./ 
青衣
动态路由再说下思路，有点快，没听太懂 
这种比前端写死路由有什么好处啊 
动态灵活，可以更好的控制权限
管理员 返回管理页面的路由配置
普通用户，不能返回管理员页面的路由配置
Tony
实现后端返回路由表 前端动态加载 不用umi怎么实现 
青衣
老的路由和后端返回的不会有重复，才会合并的吧 
1178747250
引用数据类型吧 
