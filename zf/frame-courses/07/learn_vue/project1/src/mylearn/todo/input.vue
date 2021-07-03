<template>
  <div>
    <input
      type="text"
      v-model='todo'
      @keydown.enter="$emit('submit')"
    >
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  // props:['value'],
  props: {
    value: {
      type: String, //类型限制， [Array,Number]
      default() {
        return [];
      }, //若是数组或者对象的时候 需要写成 函数的格式
      required: true, // 这个参数是否必须传递
      validator(val) {
        // 组件的创造者 自己根据自己逻辑对用户自己传进来的数据进行校验
        return true;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    todo: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>