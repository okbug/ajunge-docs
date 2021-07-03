<template>
  <div>
    <input
      type="text"
      v-model='todo'
      @keydown.enter='submit'
    >
    <ul>
      <li
        v-for='item in list'
        :key='item.id'
      >
        {{item.val}}
        <button @click='del(item.id)'>X</button>
      </li>
    </ul>

  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
import { ADDTODO, REMOVETODO } from "../store/types";
export default {
  name: "XXX",
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("todo/" + ADDTODO, {
        id: Math.random(),
        val: this.todo,
      });
      this.todo = "";
    },
    del(id) {
      this.$store.dispatch("todo/" + REMOVETODO, id);
    },
  },
  computed: {
    list() {
      return this.$store.state.todo.todoList;
    },
    ...mapState("todo", ["todoList"]),
  },
  components: {},
};
</script>
<style lang="less">
</style>