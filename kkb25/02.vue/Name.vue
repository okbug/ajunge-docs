<template>
  <div>
    NameVUE
    <button @click="handleClick">点我</button> <br>
    <input type="text" v-model="info" @keyup.enter="handleClick">
  </div>
</template>

<script>
  export default {
    name:'name',
    data() {
      return {
        info: ''
      }
    },
    methods:{
      handleClick() {
        let a = eval('this.' + this.info)
        console.log(a)
        console.log(a.toString())
      }
    }
  }
</script>

<style>

</style>