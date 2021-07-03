<template>
  <van-swipe
    :autoplay="3000"
    class='my-swipe'
    indicator-color='red'
  >
    <van-swipe-item
      v-for="(image, index) in data"
      :key="index"
    >
      <img v-lazy="image.carouselUrl" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
// @ is an alias to /src
export default {
  name: "banner",
  props: ["data"],
  data() {
    return {
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  components: {},
};
</script>
<style lang="less">
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    height: 150px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-swipe__indicator {
    background-color: blue;
  }
}
</style>