<template>
  <div class="home">
    <h1>{{obj}}{{mixName}} {{mixFn}} {{haha}}</h1>
    <button @click='a'>a</button>
    <button @click='b'>b</button>
    <ul>
      <li
        v-for='item in ary'
        ref='box'
      ></li>
    </ul>
    {{name}}
  </div>
</template>

<script>
// @ is an alias to /src
import qq from "./qqq";
export default {
  name: "Home",
  mixins: [qq],
  mounted() {
    // Dom更新是一个异步操作
    console.log(this.$refs.box.length);
    this.ary.pop();
    this.ary.pop();
    this.ary.pop();
    this.ary.pop();
    this.ary.push(100);
    this.$nextTick(() => {
      console.log(this.$refs.box.length);
    });
  },
  created() {
    this.name = 888;
    console.log("自己的created");
  },
  data() {
    return {
      name: "珠峰",
      obj: {
        a: 123,
      },
      ary: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    a() {
      this.obj.a = 1000;
    },
    b() {
      // this.obj.b = 3000;
      // this.$set(this.obj, "b", 3000);
      // push  pop  shift unshift reverse sort splice
      this.obj = {
        ...this.obj,
        b: 3000,
      };
      console.log(this);
    },
  },
};
</script>
