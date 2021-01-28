# Vuex概念
先来看一张最经典的在官网内的图片
![Vuex](https://vuex.vuejs.org/vuex.png)

## Actions 和Mutations 的区别
Actions 是异步的 基于Promise
因为Actions可能从后端获取数据，所以需要异步操作


# VUEX 基本使用
mutations中要改变state，需要调用$store中的commit()方法 参数1是在mutations中的方法，第二个数字是参数，其中，不一定参数是state中东西的最终值，都是要看参数1中的方法，是如何感觉参数更改state的
在state里面的值 所有的组件都可以通过this.$store.state.xxx 来获取
如果同步代码 可以直接mutations 
但是 异步的话 要在actions中commit 到mutations
```js
actions:{
    f({commit},args) { // 这里解构 是因为commit在store 而store是第一个参数，直接解构
        commit('nameInMutations',args)
    }
},
mutations:{
    nameInMutations(state,args) {
        state.xxx = args
    }
}
```
可以得知：**要更改state 只能必须通过mutations**
在Vue中可以直接调用store中的commit方法来调用mutations中的函数
```js
store.commit('increment',payload)

mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
想要调用actions 就得调用dispatch方法
dispatch在$store内 ('NameInActions',args)

## getters
类似computer 取值`this.$store.getters.value`

