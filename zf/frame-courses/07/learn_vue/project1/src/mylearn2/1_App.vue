<template>
  <div>
    hello
    <!-- <h1 ref='box'>{{name}}</h1>
    <h1 ref='box'>{{name}}</h1>
    <h1 ref='box'>{{name}}</h1>

    <h2
      v-for='i in 3'
      ref='box2'
    >{{name}}</h2>

    <child ref='child' /> -->

    <h3
      v-for='i in ary'
      ref='box3'
    >{{i}}</h3>
  </div>
</template>
<script>
// @ is an alias to /src
import child from "@/mylearn2/components/child";
export default {
  name: "XXX",
  data() {
    return {
      name: "zhufeng",
      ary: [1, 2, 3, 4],
    };
  },
  mounted() {
    // DOM的更新是一个异步操作
    console.log(this.$refs.box3.length);
    this.ary.pop();
    console.log(this.$refs.box3.length);
    // console.log(this.ary.length);
    this.$nextTick(() => {
      console.log(this.$refs.box3.length);
    });
    let _this = this;
    this.$nextTick(function () {
      console.log(_this.$refs.box3.length);
    });

    this.$nextTick(function () {
      console.log(this.$refs.box3.length);
    }, this);
    this.$nextTick("111");

    // this.ary.pop();
    // console.log(this.$refs.box3.length);

    // this.ary.pop();
    // console.log(this.$refs.box3.length);

    // this.ary.pop();
    // console.log(this.$refs.box3.length);
  },
  components: { child },
};
</script>
<style lang="less">
</style>