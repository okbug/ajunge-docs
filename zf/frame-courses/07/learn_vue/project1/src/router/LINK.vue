<template>
  <a :href='"#"+to'>
    <slot></slot>
  </a>
</template>
<script>
// @ is an alias to /src
export default {
  name: "LINK",
  props: {
    to: {
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
};
</script>
<style lang="less">
</style>