<template>
  <div>
    <input
      type="text"
      v-model='name'
    >
    <h2 v-color>hello world {{name}}</h2>
    <my-child :qqq='name' />
    <!-- <my-child /> -->
    <!-- <my-child /> -->
    <!-- <my-child /> -->

    <my-button />
    <!-- <myChild /> -->
    <div v-permission.qqq='true'>6666</div>

  </div>
</template>
<script>
// @ is an alias to /src
import mychild from "./components/child";
// child 就是一个普通对象  只有当作组件使用的时候  才会把这个对象中的配置像转成 对应的实例
// A 组件使用了B组件  A就成为B的父组件
export default {
  name: "App1",
  data() {
    // 组件当中 data 都是一个函数返回对象的格式
    //  保证数据的独立性
    return {
      name: "父亲",
    };
  },
  beforeCreate() {
    console.log("父beforeCreate");
  },
  created() {
    console.log("父created");
  },
  beforeMount() {
    console.log("父beforeMount");
  },
  mounted() {
    console.log("父Mounted");
  },
  beforeUpdate() {
    console.log("父beforeUpdate");
  },
  updated() {
    console.log("父updated");
  },
  errorCaptured(err) {
    console.log(err);
  },
  methods: {
    fn() {
      console.log("执行");
    },
  },
  components: {
    "my-child": mychild,
    myChild: mychild,
  },
};
</script>
<style lang="less">
</style>