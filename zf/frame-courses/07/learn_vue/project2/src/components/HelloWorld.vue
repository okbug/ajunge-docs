<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click='fn'>about</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    console.log("props", props);
    let router = useRouter();
    function fn() {
      setTimeout(() => {
        router.push({
          path: "/about",
          query: { a: 123, b: 234 },
        });
      }, 1000);
    }
    return {
      ...props,
      fn,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
