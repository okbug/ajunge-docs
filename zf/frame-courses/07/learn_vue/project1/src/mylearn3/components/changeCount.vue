<template>
  <div>
    <button @click='add'>+</button>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapMutations } from "vuex";
import { ADDCOUNT } from "../store/types";
import { add } from "../store/api";
export default {
  name: "XXX",
  data() {
    return {};
  },
  methods: {
    add() {
      // this.$store.commit(ADDCOUNT, 10);
      add(10);
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>