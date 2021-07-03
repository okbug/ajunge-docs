<template>
  <ul>
    <li
      v-for='item,index in list'
      :key='item.id'
    >
      {{item.text}}
      <my-button @click='del(index)'>X</my-button>
    </li>
  </ul>
</template>
<script>
// @ is an alias to /src
import mybutton from "./button";
export default {
  name: "XXX",
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(n) {
      console.log(n);
      this.$emit("del", n);
    },
  },
  components: {
    "my-button": mybutton,
  },
};
</script>
<style lang="less">
</style>