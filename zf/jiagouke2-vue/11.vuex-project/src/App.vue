<template>
  <div id="app">
      珠峰今年多少岁:{{this.$store.state.age}} <br>
      我的年龄是:{{this.$store.getters.myAge}} <br>

      <button @click="$store.state.age = 100">111</button>
      <button @click="$store.commit('changeAge',5)">同步更新age</button>
      <button @click="$store.dispatch('changeAge',10)">异步更新age</button>
     
  </div>
</template>



<script>
export default {
  mounted(){
    console.log(this.$store);
  }
}
</script>