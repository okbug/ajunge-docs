<template>
  <img alt="Vue logo" src="./assets/logo.png"  />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <div class="color">hello</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>


<style >
.color{
  color:red
}
</style>