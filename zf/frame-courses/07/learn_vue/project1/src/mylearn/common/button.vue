<template>
  <button>hello</button>
</template>
<script>
// @ is an alias to /src
export default {
  name: "my-button",
  data() {
    return {};
  },
  created() {
    console.log("button", this);
  },
  components: {},
};
</script>
<style lang="less">
</style>