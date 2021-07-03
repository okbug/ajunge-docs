<template>
  <div>
    <h1>父亲租价那{{name}}</h1>
    <input
      type="text"
      v-model="name"
    >
    <!-- 父组件 app3 把 name这个变量对应的值 通过  name123这个属性传递给了 child1组件 -->
    <child1
      :name123="name"
      @getAge='fn'
    />
  </div>
</template>
<script>
// @ is an alias to /src
/* 
  父传子   自定义属性+props

  子传父  自定义事件+$emit

*/
import child1 from "./child/child1";
console.log(child1);
export default {
  data() {
    return {
      name: "珠峰",
    };
  },
  methods: {
    fn() {
      console.log(arguments);
    },
  },
  components: {
    child1,
  },
};
</script>
<style lang="less">
</style>