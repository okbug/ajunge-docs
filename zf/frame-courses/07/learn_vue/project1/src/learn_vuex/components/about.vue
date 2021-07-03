<template>
  <div>
    about
    <qqqq></qqqq>
    <!-- {{hello}}
    {{$store.state.count}}
    <router-link to="/about/a">wwwww</router-link>
    <router-view></router-view> -->
    <!-- <span v-show='false'>{{t}}</span> -->
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      hello: 999,
    };
  },
  created() {
    console.log(this);
  },
  methods: {
    gogo() {
      console.log(6666);
    },
  },
  watch: {
    $route() {
      // this.gogo();
    },
    $route: {
      immediate: true,
      handler() {
        this.gogo();
      },
    },
  },
  // computed: {
  //   t() {
  //     // console.log(this.$route.query);
  //     this.gogo();
  //     return this.$route.query;
  //   },
  // },
  components: {},
};
</script>
<style lang="less">
</style>