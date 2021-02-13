<template>
  <div>
    <h1>Test {{msg}}</h1>
    <Name />
  </div>
</template>

<script>
import Name from './Name.vue'
  export default {
    components:{
      Name
    },
    data() {
      return {
        msg: '哈哈哈'
      }
    }
  }
</script>

<style>

</style>