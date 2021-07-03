<template>
  <div>
    <button @click='gohome'>回到home</button>
    hello
    <my-global />
    <input
      type="text"
      v-model='name'
    />
    <input
      type="text"
      v-model='obj.a'
    />

    <h1
      v-color='col'
      v-once
    >{{fn()}}</h1>
    {{reverName}}
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: [],
  data() {
    return {
      name: "珠峰",
      age: 19,
      col: "red",
      obj: {
        a: 123,
      },
    };
  },
  methods: {
    gohome() {
      setTimeout(() => {
        //  push 会新增历史记录  replace不会
        // this.$router.push("/");
        this.$router.replace({ path: "/", query: { q: 123, b: 234 } });
      }, 1000);
    },
    fn() {
      // console.log(666);
      return this.name.split("").reverse().join("");
    },
  },
  computed: {
    reverName() {
      setTimeout(() => {
        // console.log(888, this.age);
      }, 1000);
      // 只有当依赖发生改变的时候 这个函数才会重新执行， reverName对应的值才会更新
      return this.name.split("").reverse().join("");
    },
    // reverName: {
    //   get() {},
    //   set() {},
    // },
  },
  watch: {
    // props  data  computed
    // name(newV, oldV) {
    //   console.log("watch", newV, oldV);
    // },
    // name: {
    //   immediate: true,
    //   handler(newV, oldV) {
    //     console.log("watch", newV, oldV);
    //   },
    // },
    obj: {
      immediate: true,
      deep: true,
      handler(newV, oldV) {
        console.log("watch", newV, oldV);
      },
    },
  },
  components: {},
};
</script>
<style lang="less">
</style>