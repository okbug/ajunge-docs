SyncLoopHook 
Hughes
引用错了 
8753
还是waterfall 


promise应该是看then的值 

岁月小小
tapable就这9个钩子吗？ 
mtmt
我猜promise hook 看的返回值 是最后then的值
因为resolve还是reject 他们的then 的值是一样的
resolve(2) reject(2) => then(data) == 2
resolve() reject() => then(data) == undefined 
mtmt
iPad打字难 



这个tapble库面试的时候问得多吗 
张仁阳
https://img.zhufengpeixun.com/tapableimplentation.jpg 
14:44
岁月小小
type写死sync? 
张宝丰
后面肯定会改的。。 
岁月小小
type不是传进去比较好吗？ 

不添加launch.json也可以调试？ 
可以

感觉怪费劲，直接第一次就指向createCall的结果不就完事？ 
为什么不行!!!
创建call方法如果放在tap之前执行,taps 数组空的。创建出来的 这个call方法就 是空的

15:24
岁月小小
为啥不是for循环执行 
15:28
stair
为什么补delete options args 

都行


forEach是异步的呀 这样return不行吧 
岁月小小
子类的content做了啥？ 
岁月小小
子类的content只是指向父类的callTapsSeries？ 

为什么要这么封装代码 ?
是为了实现更加复杂 的功能
用到了惰性函数，发布订阅模式，工厂模式？还有别的吗？ 


先走一遍call  之后就不走了 每次还都执行tap钩子为什么要这么设计？ 

是不是可以理解eventEmitter 是一对一的， tapable是一对多？ 
aaa
1 
青衣
注册的时候添加的是什么数据呀 
eventEmitter 只用 一个实例，不同的事件用不事件类型区分
而tapable会有多个实例，每个事件都有一个hook实例

