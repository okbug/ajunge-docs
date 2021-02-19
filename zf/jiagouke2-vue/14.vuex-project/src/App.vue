<template>
  <div id="app">
    珠峰今年多少岁:{{age}}
    <br />
    我的年龄是:{{this.$store.getters.myAge}}
    <br />

    <button @click="$store.commit('changeAge',5)">同步更新age</button>
    <!-- <button @click="$store.commit('b/changeAge',10)">异步更新age</button> -->
  </div>
</template>
<script>
import { mapState, mapGetters } from "@/vuex";
import  {createNamespacedHelpers}from 'vuex'

// let {mapState:mapA,mapGetters} = createNamespacedHelpers('a')
// let {mapState:mapB,mapGetters} = createNamespacedHelpers('b')
export default {
  computed: {
    ...mapState(["age"]),
    ...mapGetters(["myAge"]),
    // age(){
    //   return this.$store.state.age
    // }
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>