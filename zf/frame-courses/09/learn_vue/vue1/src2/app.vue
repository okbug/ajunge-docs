<template>
  <div>
    <my-child />
    <my-global />

    <my-button @click='fn'> hello </my-button>
    <my-button> hello2 </my-button>
    <my-button> hello3 </my-button>
    <my-button> hello 4</my-button>
    <my-button> hello5 </my-button>

    <mylist :data='ary'>
      <template slot-scope="www">
        <h1>name:{{www.qqq}}</h1>
        <i>time:{{www.qqq}}</i>
      </template>
    </mylist>

    <mylist :data='ary'>
      <template v-slot:default="www">
        <h1>name:{{www.qqq}}</h1>
        <i>time:{{www.qqq}}</i>
      </template>
    </mylist>

    <h1>------------------</h1>
    <mylist :data='ary'>
      <template v-slot="www">
        <h1>name:{{www.qqq}}</h1>
        <i>time:{{www.qqq}}</i>
      </template>
    </mylist>
    <h1>------------------</h1>
    <mylist :data='ary'>
      <template #default="www">
        <h1>name:{{www.qqq}}</h1>
        <i>time:{{www.qqq}}</i>
      </template>
    </mylist>

  </div>
</template>
<script>
// @ is an alias to /src
import child from "./components/child";
// import glo from "./common/global";
import mylist from "./components/list";
export default {
  name: "XXX",
  data() {
    return {
      ary: [111, 2222, 3333, 444, 555],
    };
  },
  methods: {
    fn() {
      console.log(6666);
    },
  },
  created() {
    console.log(this);
  },
  components: {
    "my-child": child,
    mylist,
    // "my-glo": glo,
  },
};
</script>
<style lang="less">
</style>