<template>
  <div>
    <router-link
      to="/"
      active-class="myactive"
      exact-active-class="wwww"
    >首页</router-link>
    <router-link to="/about">关于页</router-link>
    <!-- <router-link :to="{path:'/about',query:{name:name,age:18}}">关于页</router-link>

    <router-link to="/list/1234">list</router-link>
    <router-link :to="{name:'list',params:{myid:666}}">list</router-link> -->

    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
/* 
  路由传参   query   params
*/
export default {
  name: "XXX",
  data() {
    return { name: "zhufneg" };
  },
  components: {},
};
</script>
<style lang="less">
</style>