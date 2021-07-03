<template>
  <div>
    {{age}}
    <button @click='giveAge'>给age</button>
  </div>
</template>
<script>
// @ is an alias to /src
import bus from "./bus";
export default {
  name: "XXX",
  data() {
    return {
      age: 12,
    };
  },
  created() {
    bus.$on("getName", (name) => {
      this.age = name + this.age;
    });
  },
  mounted() {
    bus.$emit("getAge", this.age);
  },
  methods: {
    giveAge() {
      bus.$emit("getAge", this.age);
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>