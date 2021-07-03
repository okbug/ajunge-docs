<template>
  <button
    class='btn'
    @click='click'
  >
    <slot></slot>
  </button>
</template>
<script>
// @ is an alias to /src
export default {
  name: "my-button",
  data() {
    return {};
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
  },
  components: {},
};
</script>
<style lang="less">
.btn {
  color: #fff;
  background: #333;
}
</style>