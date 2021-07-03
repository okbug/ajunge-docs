<template>
  <div>
    <aaa />
    <bbb />
  </div>
</template>
<script>
// @ is an alias to /src
import aaa from "./components/a";
import bbb from "./components/b";
export default {
  name: "XXX",
  data() {
    return {};
  },
  components: { aaa, bbb },
};
</script>
<style lang="less">
</style>