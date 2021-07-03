<template>
  <div>
    <list :data='4'>
      <span slot-scope="www">hello{{www}}</span>
      <h2 slot='haha'>你好</h2>
      <h2 slot='haha'>你好66</h2>
      <template v-slot:hehe='obj'>
        <h3>我好{{obj}}</h3>
        <h3>我好66</h3>
      </template>
      <template #hehe='obj'>
        <h3>我好</h3>
        <h3>我好66{{obj}}</h3>
      </template>
    </list>
  </div>
</template>
<script>
// @ is an alias to /src
import list from "./components/list";
export default {
  name: "XXX",
  data() {
    return {};
  },
  components: { list },
};
</script>
<style lang="less">
</style>