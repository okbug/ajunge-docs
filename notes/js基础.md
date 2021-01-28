# Number中存在的问题
## 1. NaN(Not A Number)
NaN 不和任何东西相等。包括他自己 除非是Object.is() 方法 才可以判断 NaN 等于他自己
或者是 isNaN() 方法 

### parseFloat

用法 ： 从第一个字符开始解析 如果第一个不是数字，那么就返回NaN 
```js
typeof NaN === 'number' // true
parseFloat('12.5px') // 12.5
parseFloat('margin:10px') // NaN
```
把其他数据类型转换为数字的方法
    强转 基于底层   Number('value')
        或者一些隐式转换
            '1'*1  = 1
            '1'+0 = 10
    弱转 基于额外的方法 parseInt() parseFloat() 

!NaN = true
10+false = 10
10+undefined = NaN
NaN + [] = 'NaN'

# 底层机制

全局对象 GO (Global Object)
内置的属性和方法都放在一个单独的内存，称为堆内存（Heap）
栈内存 执行环境栈（ECStack） Execution Context Stack 执行上下文栈
全局执行上下文 EC(G) 在栈内存中 （进栈） 不会出栈   页面关闭会出栈    
VO 变量对象，每一个EC中都有一个自己的变量对象 函数私有上下文中叫做 AO（Activation Object) 是VO的一个分支
<!-- 块级执行上下文 -->

结构：
ECStack：
    GO
        VO(G) 全局变量对象
        other VO ...


var a = 1
var b = a 这个时候 b指向的是a的12的地址， 当给b重新赋值而不是

1. 创建一个值 1 或者是其他有值的变量 也可以是undefined
2. 创建一个变量
3. 让变量和值binding 一起

基本数据类型值，直接存储到栈内存中。
应用类型， 先开辟一个堆，把东西存储进去，最后把地址放到栈中供变量关联使用。
```js
let str = 100 + true + 21.2 + null + undefined + 'string' + [] + null + 9 + false
// 在加号两边出现字符串或者对象的情况，加号一定是字符串拼接 '1'+'1' => '11'
console.log(100 + true + 21.2 + null + undefined + 'string' + [] + null + 9 + false) // NaN string null 9 false
        // -----1---- + 21.2 + 0      + NaN
        // --------------NaN-------------------- + 'string' + '' + 'null' + '9' + 'false' 这里全都是字符串拼接

console.log([] == []) // false 
[] == false // true
console.log(![] == []) // true
// 双等的时候 如果两个类型不同，需要转换为相同类型才可以
```

对象转化为字符串，先调用valueOf获取原始值，没有的话就继续调用toString 方法。
![规则](https://www.cxwht.cn/usr/uploads/2020/10/50147784.png)






































