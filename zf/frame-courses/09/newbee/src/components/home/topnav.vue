<template>
  <div
    class="top_nav_box"
    :class="{bg:isAddClass}"
  >
    <div
      class="left_box"
      @click='$router.push("/list")'
    >left</div>
    <div
      class="middle_box"
      @click='$router.push("/search")'
    >中间</div>
    <div
      class="right_box"
      @click='$router.push("/user")'
    >右边</div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      isAddClass: false,
      flag: false,
    };
  },
  methods: {
    scroll(e) {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => {
          this.flag = false;
        }, 20);
        let st = document.documentElement.scrollTop || document.body.scrollTop;
        if (st > 50) {
          this.isAddClass = true;
        } else {
          this.isAddClass = false;
        }
      }
    },
  },
  created() {
    // window.onscroll = (e) => {
    //   let st = document.documentElement.scrollTop || document.body.scrollTop;
    //   if (st > 50) {
    //     this.isAddClass = true;
    //   } else {
    //     this.isAddClass = false;
    //   }
    // };
    window.addEventListener("scroll", this.scroll, false);
  },
  beforeDestroy() {
    // window.onscroll = null;
    window.removeEventListener("scroll", this.scroll, false);
  },
  components: {},
};
</script>
<style lang="less">
.top_nav_box {
  display: flex;
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  align-items: center;
  > div {
    flex: 1;
    background: transparent;
  }
  &.bg {
    background-color: red;
    color: #fff;
  }
}
</style>