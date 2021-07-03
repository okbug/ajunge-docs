<template>
  <div>
    APP
    {{$store.state.count}}
    {{name}}
    <mybutton />
  </div>
</template>
<script>
// @ is an alias to /src
import mybutton from "./button";
import mixin1 from "./mixin";
console.log(mybutton);
export default {
  name: "XXX",
  data() {
    return {};
  },
  components: { mybutton },
  mixins: [mixin1],
};
</script>
<style lang="less">
</style>