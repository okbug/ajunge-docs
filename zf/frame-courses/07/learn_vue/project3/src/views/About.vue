<template>
  <div class="about">
    <h1>This is an about page{{name}}</h1>
    <button @click='fn'>请求</button>
  </div>
</template>
<script>
import { getMsg } from "@/api/about.js";
import mixAbout from "@/mixin/about.js";
export default {
  mixins: [mixAbout],
  methods: {
    fn() {
      getMsg().then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
