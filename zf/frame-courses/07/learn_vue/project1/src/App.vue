<template>
  <div id="app">
    <div id="nav">
      <!-- 
        router-link-active
        router-link-exact-active  只有当页面路径跟 to的值完全一致的时候 才会调用
       -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about?q=1">About</router-link>
      <router-link to="/about?q=2">About</router-link>
      <!-- <router-link
        to="/list"
        active-class="qqq"
      >list</router-link> -->
    </div>
    <router-view />

    <!-- {{count}}{{username}}
    <button @click='add(25)'>+</button>
    <button @click='minus'>-</button> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    // add() {
    //   // this.$store.state.count += 200;
    //   this.$store.commit("add", 203);
    //   // this.$store.dispatch("asyncAdd", 500, 300);
    // },
    // minus() {},
    ...mapMutations(["add", "minus"]),
  },
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    ...mapState(["count"]),
    ...mapState("qqq", ["username"]),
    // ...mapState({
    //   count123: "count",
    //   username: (state) => state.qqq.username,
    // }),
  },
  watch: {
    $route() {
      //只要路径或者参数发生改变的时候 都会触发
      console.log("gaibian");
    },
  },
};
</script>

