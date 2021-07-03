<template>
  <div>
    <mychild
      :list="ary"
      a=1
      b=2
      c=3
      @click='fn'
    />
    {{ary}}
    <h2>{{name}}</h2>
    <myinput v-model='name'></myinput>

    <myinput
      :title='name'
      @update:title='(a)=>name=a'
    ></myinput>
    <myinput :title2.sync='name'></myinput>
    <!-- 
      v-model ='name'

      :value = 'name'
      @input = 'name=  xxx'
     -->
  </div>
</template>
<script>
/* 
  父传子 ： 自定义行内属性+props
  子传父:   自定义事件 + $emit

  儿子的属性$attrs + $listeners
  $attrs:这里边仿制的是 没有被 props接受的哪些数据 不是响应式的


  $parent子组件的属性  可以直接找到父组件实例
  $children 父组件的属性 可以直接调用到 子组件

*/
// @ is an alias to /src
import mychild from "./components/child2";
import myinput from "./common/input";
export default {
  name: "XXX",
  data() {
    return {
      ary: [1, 2, 3, 4],
      name: "之u风",
    };
  },
  methods: {
    fn(a, b, c) {
      console.log(arguments);
      this.ary.push(...arguments);
    },
  },
  components: { mychild, myinput },
};
</script>
<style lang="less">
</style>