<template>
  <div>
    home
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
    //  router里边存放的都是各种方法
    //  route 里边存放的都是各种属性
    console.log(this.$route.query);
  },
  components: {},
};
</script>
<style lang="less">
</style>