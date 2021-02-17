<template>
  <div>
    <h1 @click="handleClick">TESTVUE</h1>
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'name',
    data() {
      return {
        list:['A','B','C','D']
      }
    },
    methods: {
      handleClick() {
        this.list = ['D','C','B','A']
      }
    }
  }
</script>

<style>

</style>