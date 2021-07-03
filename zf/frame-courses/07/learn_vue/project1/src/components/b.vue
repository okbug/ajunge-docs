<template>
  <div>
    BB
    {{ary}}
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "bbb",
  data() {
    return {
      ary: [],
    };
  },
  // created() {
  //   this.ary.push(this.$route.query);
  // },
  activated() {
    this.ary.push(this.$route.query);
    // this.ary.push(this.$route.params);
    console.log(this);
  },
  components: {},
};
</script>
<style lang="less">
</style>