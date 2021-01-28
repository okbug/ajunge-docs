# 组件通信
## 1. props 
······


## 2. emit/on
```js
// Parent.vue
<Child @eventName="someFunction"/>
 // Child.vue
 methods:{
     change() {
         this.$emit('eventName',/* 参数 可以多个*/e)
     }
 }
 //emit里面的第二个或多个参数是上面的函数的接受参数
```

## 3.v-model
原生语法糖
子组件接受一个prop为value，父组件来一个@input
子组件如何自定义一个v-model？
model:{
    prop:'value', // 默认value 可以改成其他的值
    event:'input' // 默认是input，可以改成emit中的其他事件名
}
## .sync
## attrs和listeners
## ref
    操作DOM 也可以获取组件的实例
# 跨级传递
## Provide/Inject
```js
// Parent.vue
provide() {
    return {
        parent:this
    }
}

// Grandson.vue
inject:['parent]

use = {{parent.xxx}}
```

## 兄弟组件通信
找到兄弟的共同父亲 然后再传递 （麻烦）
eventbus 事件总线  在任何组件中订阅



# 子组件如何监听父组件的mounted事件
首先 子组件比父组件先mounted 然后使用事件总线来发布事件。


# slot

## 基本用法
旧版；
```js
<div slot="slotName">
content
</div>
```
新版
```js
<template v-slot:slotName1></template> // 必须用这个标签
<template #slotName2></template>  //简写
```
而且在插槽中可以获取父组件中的数据 然后直接渲染上去

如果没有名字 那就是default 默认插槽


## 作用域插槽
子组件中的插槽传入数据 在父组件中可以获取 类似props
```js
// child
<div><slot name="childSlotName" :child_data_name="child_data_name">content</slot></div> 


// father
<template v-slot:childSlotName="{child_data_name}">{{child_data_name}}<template>
slot-scope="{child_data_name1}"  // 旧版 可以在div里面使用
```