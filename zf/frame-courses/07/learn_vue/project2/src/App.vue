<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
  <div id="app">
    {{obj}}
    <input
      type="text"
      v-model='name'
      @keydown.enter="fn"
    >
    <ul>
      <li
        v-for='(item,index) in list'
        :key='item.id'
      >
        {{item.value}}
        <button @click='del(index)'>X</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, onMounted, readonly } from "vue";
/* 
  ref 是吧一个值类型的内容转成响应式的

  若是 对象或者数组  那么需要使用reactive

*/
export default {
  setup(props) {
    let name = ref("珠峰");
    // console.log(name.value);
    let list = reactive([{ id: 1, value: "hello" }]);
    // console.log(list);

    let obj = readonly({ count: 1 });
    function submit() {
      console.log(name);
      list.push({
        id: Math.random(),
        value: name.value,
      });
      name.value = "";
      obj.count++;
    }
    console.log(1111);
    function del(n) {
      // list = reactive([]);
      list.splice(n, 1);
    }
    onMounted(() => {
      console.log("mounted");
    });
    return {
      name: name,
      list,
      fn: submit,
      del,
      obj,
    };
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
