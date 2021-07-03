<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <input
      type="text"
      v-model='msg'
    >
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ref } from "vue";

export default {
  name: "Home",
  setup(props) {
    let msg = ref("");
    return {
      msg,
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
