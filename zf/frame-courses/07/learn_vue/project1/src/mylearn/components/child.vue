<template>
  <div>
    hello world
    {{ary}}
    <!-- <button
      @click='fn'
      v-color:[a]='"blue"'
    >哈哈</button> -->
    <button
      @click='fn'
      v-color='a'
    >哈哈</button>
    <my-button />
    {{qqq}}
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Child1",
  props: ["qqq"],
  data() {
    // 组件当中 data 都是一个函数返回对象的格式
    return {
      ary: [1, 2, 3, 4, 5],
      a: 1,
    };
  },
  beforeCreate() {
    console.log("子beforeCreate");
  },
  created() {
    console.log("子created");
  },
  beforeMount() {
    console.log("子beforeMount");
  },
  mounted() {
    console.log("子Mounted");
  },
  beforeUpdate() {
    console.log("子beforeUpdate");
  },
  updated() {
    console.log("子updated");
  },
  filters: {
    qq(val) {
      return val + "qq";
    },
  },
  methods: {
    fn() {
      this.ary.pop();
      this.a = "yellow";
      throw new Error("hello");
    },
  },
};
</script>
<style lang="less">
</style>