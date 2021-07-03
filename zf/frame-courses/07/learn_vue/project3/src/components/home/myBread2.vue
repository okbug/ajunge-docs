<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for='item in list'>
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {};
  },
  components: {},
  computed: {
    list() {
      // console.log(this.$route);
      let ary = this.$route.matched;

      return ary.map((item) => {
        return {
          path: item.path,
          title: item.meta.title,
        };
      });
    },
  },
};
</script>
<style lang="less">
</style>