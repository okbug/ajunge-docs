<template>
  <div class='user_box'>
    <div class="h50">
      <my-tab-bar
        title="商品详情"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
      >
      </my-tab-bar>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("updateCartNum");
  },
  methods: {
    onClickLeft() {},
  },
  components: {},
};
</script>
<style lang="less">
</style>