<template>
  <div>
    <div v-if='loading'>loading...</div>
    <ul v-else-if='list.length'>
      <li v-for='item in list'>
        {{item}}
      </li>
    </ul>
    <div v-else>没有数据</div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["list", "loading"],
  data() {
    return {};
  },

  components: {},
};
</script>
<style lang="less">
</style>