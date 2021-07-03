<template>
  <div>
    {{count}}
    <mybutton />
    <todo />
    <button @click='fn(0)'>A</button><button @click='fn(1)'>B</button>
    <keep-alive :include='/aaa/'>
      <component :is="qqq"></component>
    </keep-alive>

  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
import mybutton from "./components/changeCount";
import todo from "./components/todo";
import aaa from "./components/a";
import bbb from "./components/b";
export default {
  name: "XXX",
  data() {
    return {
      qqq: aaa,
    };
  },
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    fn(n) {
      this.qqq = n ? bbb : aaa;
    },
  },
  components: { mybutton, todo },
};
</script>
<style lang="less">
</style>