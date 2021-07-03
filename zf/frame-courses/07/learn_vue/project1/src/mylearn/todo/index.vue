<template>
  <div>
    <my-input
      v-model='todo'
      @submit='submit'
    />
    <my-list
      :list='listAry'
      @del='fn'
    />
  </div>
</template>
<script>
// @ is an alias to /src
import mylist from "./list";
import myinput from "./input";
export default {
  name: "XXX",
  data() {
    return {
      todo: "2342",
      listAry: [
        {
          text: "吃饭",
          id: Math.random(),
        },
      ],
    };
  },
  methods: {
    submit() {
      // console.log(222);
      this.listAry.unshift({
        text: this.todo,
        id: Math.random(),
      });
      this.todo = "";
    },
    fn(n) {
      this.listAry.splice(n, 1);
    },
  },
  components: {
    "my-list": mylist,
    "my-input": myinput,
  },
};
</script>
<style lang="less">
</style>