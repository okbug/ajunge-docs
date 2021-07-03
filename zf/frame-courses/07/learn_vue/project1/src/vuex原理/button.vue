<template>
  <div>
    {{$store.getters.type}}
    <button @click='add'>+</button>
    <button @click='minus'>-</button>
    {{name}}
    {{count}}
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "./myvuex";
export default {
  name: "XXX",
  data() {
    return {
      name: "button",
    };
  },
  created() {
    console.log("button");
  },
  methods: {
    add() {
      this.$store.commit("changeCount", 5);
    },
    minus() {
      this.$store.commit("changeCount", -3);
    },
  },
  computed: {
    // count(){
    //   return this.$store.state.count
    // },
    ...mapState(["count"]),
  },
  components: {},
};
</script>
<style lang="less">
</style>