<template>
  <div>
    child
    child
    child
    child
    child
    child
    child
    <h2>父组件给的name123:{{name123}}</h2>
    <input
      type="text"
      v-model='age'
    >
    <button @click="qqq">qqq</button>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["name123"],
  data() {
    return {
      age: 100,
    };
  },
  created() {
    this.qqq();
  },
  methods: {
    qqq() {
      this.$emit("getAge", this.age, 1, 2, 3, 4, 5);
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>