<template>
  <div class="about">
    <h1>This is an about page {{count}}</h1>
    <button @click='add'>+</button>
    <button @click='changeCOunt(-5)'>-</button>
  </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore, mapMutations } from "vuex";
export default {
  setup(props) {
    let route = useRoute();
    let $store = useStore();
    onMounted(() => {
      console.log(route.query);
    });
    let count = computed(() => {
      return $store.state.count;
    });
    let { changeCOunt } = mapMutations(["changeCOunt"]);
    console.log(changeCOunt);
    function add() {
      $store.commit("changeCOunt", 10);
    }
    // let $store = store;
    return {
      count,
      add,
      changeCOunt,
      $store,
      // obj,
    };
  },
  // methods: {
  //   ...mapMutations(["changeCOunt"]),
  // },
};
</script>
