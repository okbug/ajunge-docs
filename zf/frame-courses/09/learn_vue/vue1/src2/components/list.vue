<template>
  <ul>
    <li v-for='item in data'>
      <slot :qqq='item'></slot>
    </li>
  </ul>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["data"],
  data() {
    return {};
  },
  components: {},
};
</script>
<style lang="less">
</style>