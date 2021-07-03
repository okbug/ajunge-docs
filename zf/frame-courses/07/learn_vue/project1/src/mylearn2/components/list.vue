<template>
  <div>
    <header>
      <slot name='haha'></slot>
    </header>
    <ul>
      <li v-for='i in data'>
        <slot
          :qqq='i'
          :eee='666'
          rrr='aaa'
        ></slot>
      </li>
    </ul>
    <footer>
      <slot
        name='hehe'
        qqq='www'
      ></slot>
    </footer>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["data"],
  data() {
    return {};
  },
  components: {},
};
</script>
<style lang="less">
</style>