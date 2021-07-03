<template>
  <div class='box'>
    <input
      :type="type"
      :value="value"
      @input='fn'
    >
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  props: ["value", "type"],
  methods: {
    fn(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style lang="less">
.box {
  input {
    width: 400px;
    height: 100px;
    font-size: 30px;
  }
}
</style>