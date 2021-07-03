<template>
  <div>
    全局组件

    <h1>{{countType}}:{{count}}</h1>
    <button @click='add'>+</button>
    <button @click='addajax'>+ajax</button>
    <button @click='minus'>-</button>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "my-global",
  data() {
    return {};
  },
  methods: {
    add() {
      this.$store.commit("changeCount", 1);
    },
    minus() {
      this.$store.commit("changeCount", -10);
    },
    addajax() {
      this.$store.dispatch("changeCountAjax", 5);
    },
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    countType() {
      return this.$store.getters.countType;
    },
  },
};
</script>
<style lang="less">
</style>