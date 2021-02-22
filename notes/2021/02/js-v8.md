参考地址:
> https://juejin.cn/post/6844904016325902344
> 极客时间 - 浏览器工作原理与实践 专栏


垃圾回收机制
先说一下结论：
**JS中的垃圾回收有两种机制**



延伸点：
JS数据类型，以及存储地址和内存机制，WeakMap/WeakSet的弱引用
引用，闭包



重点： **Object类型⽐较特殊，它是由上述7种类型组成的⼀个包含了key-value对的数据类型**
这句话，体现了：Object的key不能是Object 7种包括：Null,Boolean,Number,Undefined,String,BigInt,Symbol

延伸：
Map的key可以是对象，WeakMap的key也可以
## Map和WeakMap的区别？
WeakMap的key只能是对象（一个引用地址），WeakMap和这个key是弱引用的关系，如果这个key中的引用被清除了，那么在WeakMap中的key也就被消除了。

# JS中的内存空间
在JavaScript的执⾏过程中， 主要有三种类型内存空间，分别是代码空间、 栈空间和堆空间
结论：
