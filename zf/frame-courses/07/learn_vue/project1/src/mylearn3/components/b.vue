<template>
  <div>
    BBBBB
    <input
      type="text"
      v-model='bbb'
    >
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "bbb",
  data() {
    return { bbb: "" };
  },
  components: {},
  created() {
    console.log("B created");
  },
  destroyed() {
    console.log("B destroyed");
  },
  activated() {
    console.log("B 展示出来的了");
  },
  deactivated() {
    console.log("B 被隐藏了");
  },
};
</script>
<style lang="less">
</style>