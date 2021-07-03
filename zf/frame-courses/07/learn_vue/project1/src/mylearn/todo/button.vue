<template>
  <button @click='$emit("click")'>
    <slot></slot>
  </button>
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