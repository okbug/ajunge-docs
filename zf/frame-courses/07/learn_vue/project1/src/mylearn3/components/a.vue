<template>
  <div>
    AAAAA
    <input
      type="text"
      v-model='aaa'
    >
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "aaa",
  data() {
    return {
      aaa: "",
    };
  },
  components: {},
  created() {
    console.log("A created");
  },
  destroyed() {
    console.log("A destroyed");
  },
  activated() {
    console.log("A 展示出来的了");
  },
  deactivated() {
    console.log("A 被隐藏了");
  },
};
</script>
<style lang="less">
</style>