<template>
  <div>
    list
    <router-link to='/list/a'>A</router-link>
    <router-link to='/list/b'>B</router-link>

    <keep-alive exclude='aaa'>
      <router-view></router-view>
    </keep-alive>

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
};
</script>
<style lang="less">
</style>