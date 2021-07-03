<template>
  <div>
    {{list}}
    <button @click='fn'>儿子改</button>
    <my-button></my-button>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "child2",
  props: ["list", "a"],
  data() {
    return {
      name: "儿子",
    };
  },
  methods: {
    fn() {
      // this.list = [];
      console.log(this);
      // this.$listeners.click(1, 2, this.name);
      // this.$emit("click", 1, 3, this.name);
      this.$parent.ary = [666];
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>