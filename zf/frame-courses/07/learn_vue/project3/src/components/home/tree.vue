<template>
  <fragment>
    <template v-for="item in renderList">
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
        <mytree :list='item.children' />
      </el-submenu>

    </template>
  </fragment>
</template>
<script>
// @ is an alias to /src
export default {
  name: "mytree",
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    renderList() {
      let ary = this.list || [];
      let userLevel = this.$store.state.userLevel;
      ary = ary.filter((item) => {
        return item.meta.level.includes(userLevel);
      });
      return ary;
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>