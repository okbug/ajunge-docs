<template>
  <div>
    <input
      type="text"
      v-model='todo'
      @keydown.enter='submit'
    >
    <ul>
      <li
        v-for='(item,index) in ary'
        :key='item.id'
      >
        <input type="checkbox">
        {{item.val}}
        <button @click='del(item.id)'>X</button>
      </li>
    </ul>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  data() {
    return {
      ary: [],
      todo: "",
    };
  },
  methods: {
    // push  pop shift unshift splice reverse sort
    submit() {
      this.ary.push({
        id: Math.random(),
        val: this.todo,
      });
      this.todo = "";
    },
    del(id) {
      this.ary = this.ary.filter((item) => item.id !== id);
    },
  },
};
</script>
<style lang="less">
</style>