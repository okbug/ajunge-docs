<template>
  <div>
    {{name}}
    <button @click='getAge'>获取年龄</button>
  </div>
</template>
<script>
// @ is an alias to /src
import bus from "./bus";
export default {
  name: "XXX",
  data() {
    return {
      name: "珠峰",
    };
  },
  created() {
    bus.$on("getAge", (age) => {
      this.name = this.name + age;
    });
  },
  methods: {
    getAge() {},
  },
  components: {},
};
</script>
<style lang="less">
</style>