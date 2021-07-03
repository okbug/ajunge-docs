<template>
  <div>
    {{$store.state.count}}
    {{count123}}
    {{type}}
    <button @click='add'>+</button>
    <button @click='minus'>-</button>
    <home />
    <about />
    {{hello}}
  </div>
</template>
<script>
// @ is an alias to /src
import home from "./components/home";
import about from "./components/about";
import { mapState } from "vuex";
export default {
  name: "XXX",
  data() {
    return {};
  },
  computed: {
    // count123() {
    //   // console.log(this);
    //   return this.$store.state.count;
    // },
    ...mapState(["count123"]),
    // ...mapState("aaa", ["name"]),
    type() {
      return this.count % 2 ? "jishu" : "oushu";
    },
  },
  methods: {
    add() {
      this.$store.commit("changeCount", 12);
      // this.$store.commit("aaa/changeA", "hahaha");
      // 会把 所有模块中的 名字是 changA的mutation都执行了
    },
    minus() {
      this.$store.dispatch("asyncChangeCount", -5);
    },
  },
  components: { home, about },
};
</script>
<style lang="less">
</style>