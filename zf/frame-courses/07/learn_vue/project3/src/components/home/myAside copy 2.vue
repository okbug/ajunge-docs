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
          <template v-for='item in menuList'>
            <el-menu-item
              v-if='!item.children'
              :index="item.path"
              :route='item.path'
            >
              <i :class="'el-icon-'+item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>

            <el-submenu
              v-else
              :index="item.path"
              :route='item.path'
            >
              <template slot="title">
                <i :class="'el-icon-'+item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>

              <template v-for='key in item.children'>
                <el-menu-item
                  v-if='!key.children'
                  :index="key.path"
                  :route='key.path'
                >
                  <i :class="'el-icon-'+key.meta.icon"></i>
                  <span slot="title">{{key.meta.title}}</span>
                </el-menu-item>

                <el-submenu
                  v-else
                  :index="key.path"
                  :route='key.path'
                >
                  <template slot="title">
                    <i :class="'el-icon-'+key.meta.icon"></i>
                    <span>{{key.meta.title}}</span>
                  </template>

                  <el-menu-item
                    v-for='k in key.children'
                    :index="k.path"
                    :route='k.path'
                  >
                    <i :class="'el-icon-'+k.meta.icon"></i>
                    <span slot="title">{{k.meta.title}}</span>
                  </el-menu-item>

                </el-submenu>
              </template>

            </el-submenu>
          </template>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { routes } from "@/router/index.js";
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
    menuList() {
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