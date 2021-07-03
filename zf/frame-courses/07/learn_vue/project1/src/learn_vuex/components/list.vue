<template>
  <div>
    list
    <button @click='fn'>home</button>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {};
  },
  created() {
    console.log(this.$route.params.myid);
  },
  methods: {
    // $router 和 $route的区别     //  push  replace的区别
    fn() {
      setTimeout(() => {
        // 编程式导航
        this.$router.push("/"); // 会新增历史记录
        // this.$router.replace("/about"); // 是直接替换了当前的路径 不会新增历史记录
      }, 1000);
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>