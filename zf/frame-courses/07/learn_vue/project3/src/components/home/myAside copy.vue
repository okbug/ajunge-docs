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
          <el-menu-item
            index="/about"
            route='/about'
          >
            <i class="el-icon-menu"></i>
            <span slot="title">关于</span>
          </el-menu-item>
          <el-menu-item
            index="/user"
            route='/user'
          >
            <i class="el-icon-menu"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-menu-item
            index="/list"
            route='/list'
          >
            <i class="el-icon-menu"></i>
            <span slot="title">列表</span>
          </el-menu-item>
          <el-submenu index="/goods">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品规格</span>
            </template>
            <el-menu-item
              index="/goods/red"
              route='/goods/red'
            >
              <i class="el-icon-menu"></i>
              <span slot="title">红苹果</span>
            </el-menu-item>
            <el-menu-item
              index="/goods/green"
              route='/goods/green'
            >
              <i class="el-icon-menu"></i>
              <span slot="title">绿苹果</span>
            </el-menu-item>
            <el-menu-item
              index="/goods/yellow"
              route='/goods/yellow'
            >
              <i class="el-icon-menu"></i>
              <span slot="title">黄香蕉</span>
            </el-menu-item>
            <el-menu-item
              index="/goods/sweet"
              route='/goods/sweet'
            >
              <i class="el-icon-menu"></i>
              <span slot="title">甜不甜</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      // defaultActive: "/about",
    };
  },
  computed: {
    defaultActive2() {
      return this.$route.path;
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