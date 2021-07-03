<template>
  <div>自己的input
    <input
      type="text"
      :value='value'
      @change='fn'
    >
    <input
      type="text"
      :value='title2'
      @input="fn2"
    >
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  props: ["value", "title2"],
  data() {
    return {};
  },
  methods: {
    fn(e) {
      this.$emit("input", e.target.value);
    },
    fn2(e) {
      this.$emit("update:title2", e.target.value);
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>