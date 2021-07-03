<template>
  <div>
    <transition name="slide">
      <router-view></router-view>
    </transition>

    <div class="index_bot_box">
      <bot-nav />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import botnav from "../components/common/botNav";
export default {
  name: "XXX",
  data() {
    return {};
  },
  components: { "bot-nav": botnav },
};
</script>
<style lang="less">
.index_bot_box {
  height: 50px;
}
</style>