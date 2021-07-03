<template>
  <div>
    AA
    <input
      type="text"
      v-model='name'
      @keydown.13="fn"
    >
    <!-- <router-link :to='path_b'>到B组件</router-link>
    <router-link :to='{path:"/list/b",query:{name123:name}}'>到B组件</router-link> -->
    <!-- <router-link :to="path_b2">到B组件</router-link> -->
    <!-- <router-link :to="{name:'list_b',params:{name123:name,qqq:name}}">到B组件</router-link> -->
  </div>
</template>
<script>
/* 
   路由传递参数 的两种方式   query    params
   $route  属性或者参数
   $router 想使用编程式导航的时候 才会使用

*/
// @ is an alias to /src
export default {
  name: "aaa",
  data() {
    return { name: "" };
  },
  beforeRouteLeave(to, from, next) {
    // ...
    let bol = confirm("是否确认离开?");
    if (bol) {
      next();
    } else {
      console.log("haha");
    }
  },
  methods: {
    fn() {
      // 编程式导航
      console.log(666);
      this.$router.push(this.path_b);
      // this.$router.replace(this.path_b);
      /* 
        不管是 replace或者 push 参数等同于 :to后的参数
        push 会新增一个历史记录
        replace不会新增记录 是把当前路径替换了
      */
    },
  },
  computed: {
    path_b() {
      return "/list/b?name=" + this.name;
    },
    path_b2() {
      return "/list/b/" + this.name;
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>