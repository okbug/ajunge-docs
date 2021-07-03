<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgba(0,0,0,0)"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router='true'
        >
          <mytree :list='menuList' />
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* 
  递归组件：  组件自己使用自己
*/
import { routes } from "@/router/index.js";
import mytree from "./tree";

export default {
  data() {
    return {
      // defaultActive: "/about",
    };
  },
  components: { mytree },
  computed: {
    defaultActive2() {
      return this.$route.path;
    },
    menuList() {
      if (this.$route.path == "/") {
        let ary = routes[0].children;
        let userLevel = this.$store.state.userLevel;
        ary = ary.filter((item) => {
          return item.meta.level.includes(userLevel);
        });
        this.$router.push(ary[0].path);
      }

      return routes[0].children;
    },
  },
  // watch: {
  //   // $route: function () {
  //   //   console.log(this.$route);
  //   //   this.defaultActive = this.$route.path;
  //   // },
  //   $route: {
  //     immediate: true,
  //     handler() {
  //       this.defaultActive = this.$route.path;
  //     },
  //   },
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less">
</style>