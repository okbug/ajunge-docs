<template>
  <div>
    <h1>{{name}}</h1>
    <input
      type="text"
      v-model="name"
    >
    <my-input
      type="text"
      v-model='name'
    />
    <!-- 
      v-model  ===   :value + @input 
     -->
  </div>
</template>
<script>
// @ is an alias to /src
import myinput from "./child/myinput";
export default {
  name: "XXX",
  data() {
    return {
      name: "珠峰",
    };
  },
  components: {
    "my-input": myinput,
  },
};
</script>
<style lang="less">
</style>